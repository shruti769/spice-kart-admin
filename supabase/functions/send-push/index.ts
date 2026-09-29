// Spice Kart · send-push Edge Function.
//
// Delivers pending rows of public.customer_notifications as phone push notifications through the
// Expo Push API (which forwards to FCM / APNs). Called every minute by public.notifications_tick()
// (pg_cron + pg_net) and straight after "Send now" / an order status change.
//
// It also delivers public.outbound_messages (business_settings.sql): order-confirmation emails
// (Resend), delivery SMS (Twilio), Slack low-stock alerts (incoming webhook) and the daily digest.
//
// Auth: the `x-dispatch-secret` header must equal the DISPATCH_SECRET function secret.
// Env (set with `supabase secrets set`): DISPATCH_SECRET, optional EXPO_ACCESS_TOKEN,
//   RESEND_API_KEY + RESEND_FROM (e.g. "Spice Kart <orders@yourdomain.com.au>") for email,
//   TWILIO_ACCOUNT_SID + TWILIO_AUTH_TOKEN + TWILIO_FROM (e.g. +61…) for SMS.
// SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are provided by Supabase automatically.
//
// Deploy: supabase functions deploy send-push --no-verify-jwt --project-ref <ref>

import { createClient } from 'jsr:@supabase/supabase-js@2'

const EXPO_URL = 'https://exp.host/--/api/v2/push/send'
const BATCH = 100 // Expo's per-request limit
const MAX_ROWS_PER_RUN = 2000

type Row = { id: number; customer_id: string; title: string; body: string; link: string | null; kind: string }
type Ticket = { status: 'ok' | 'error'; id?: string; message?: string; details?: { error?: string } }

const db = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, {
  auth: { persistSession: false },
})

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })
}

async function sendToExpo(messages: unknown[]): Promise<Ticket[]> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json', Accept: 'application/json' }
  const token = Deno.env.get('EXPO_ACCESS_TOKEN')
  if (token) headers.Authorization = `Bearer ${token}`
  const res = await fetch(EXPO_URL, { method: 'POST', headers, body: JSON.stringify(messages) })
  const out = await res.json().catch(() => null)
  if (!res.ok || !Array.isArray(out?.data)) throw new Error(`Expo push ${res.status}: ${JSON.stringify(out?.errors ?? out)}`)
  return out.data as Ticket[]
}

async function mark(ids: number[], push_status: string, push_error: string | null = null) {
  if (!ids.length) return
  const { error } = await db.from('customer_notifications').update({ push_status, push_error }).in('id', ids)
  if (error) throw error
}

// ─── Email / SMS / Slack ─────────────────────────────────────────────────────────────────
type Message = { id: number; channel: 'email' | 'sms' | 'slack'; recipient: string; subject: string | null; body: string }

async function deliver(m: Message): Promise<void> {
  if (m.channel === 'slack') {
    const res = await fetch(m.recipient, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text: m.body }) })
    if (!res.ok) throw new Error(`Slack ${res.status}: ${(await res.text()).slice(0, 200)}`)
    return
  }
  if (m.channel === 'email') {
    const key = Deno.env.get('RESEND_API_KEY'), from = Deno.env.get('RESEND_FROM')
    if (!key || !from) throw new Error('Email provider not set up · add RESEND_API_KEY and RESEND_FROM to the function secrets')
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to: [m.recipient], subject: m.subject ?? 'Spice Kart', text: m.body }),
    })
    if (!res.ok) throw new Error(`Resend ${res.status}: ${(await res.text()).slice(0, 200)}`)
    return
  }
  const sid = Deno.env.get('TWILIO_ACCOUNT_SID'), token = Deno.env.get('TWILIO_AUTH_TOKEN'), from = Deno.env.get('TWILIO_FROM')
  if (!sid || !token || !from) throw new Error('SMS provider not set up · add TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN and TWILIO_FROM to the function secrets')
  const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
    method: 'POST',
    headers: { Authorization: `Basic ${btoa(`${sid}:${token}`)}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ To: m.recipient, From: from, Body: m.body }),
  })
  if (!res.ok) throw new Error(`Twilio ${res.status}: ${(await res.text()).slice(0, 200)}`)
}

/** Delivers queued outbound messages; returns [sent, failed]. */
async function sendMessages(): Promise<[number, number]> {
  let sent = 0, failed = 0
  for (let round = 0; round < 10; round++) {
    const { data, error } = await db.rpc('claim_pending_messages', { p_limit: 100 })
    if (error) {
      // business_settings.sql not run yet: nothing to do.
      if (/claim_pending_messages/.test(error.message)) return [sent, failed]
      throw error
    }
    if (!data?.length) break
    for (const m of data as Message[]) {
      try {
        await deliver(m)
        await db.from('outbound_messages').update({ status: 'sent', sent_at: new Date().toISOString(), error: null }).eq('id', m.id)
        sent++
      } catch (e) {
        await db.from('outbound_messages').update({ status: 'failed', error: String((e as Error).message).slice(0, 300) }).eq('id', m.id)
        failed++
      }
    }
    if (data.length < 100) break
  }
  if (failed) {
    await db.rpc('raise_alert_service', {
      p_key: 'messages:failed',
      p_title: `${failed} email / SMS / Slack message${failed === 1 ? '' : 's'} failed to send`,
      p_body: 'Check the provider keys in the send-push function secrets. Details are in Settings → Notifications.',
    })
  }
  return [sent, failed]
}

Deno.serve(async (req) => {
  const secret = Deno.env.get('DISPATCH_SECRET')
  if (!secret || req.headers.get('x-dispatch-secret') !== secret) return json({ error: 'unauthorized' }, 401)

  let processed = 0, sent = 0, failed = 0, skipped = 0
  const deadTokens = new Set<string>()

  while (processed < MAX_ROWS_PER_RUN) {
    const { data: rows, error } = await db.rpc('claim_pending_notifications', { p_limit: 500 })
    if (error) return json({ error: error.message }, 500)
    if (!rows?.length) break
    processed += rows.length

    const customerIds = [...new Set(rows.map((r) => r.customer_id))]
    const { data: tokens, error: tokErr } = await db.from('push_tokens').select('token, customer_id').in('customer_id', customerIds)
    if (tokErr) return json({ error: tokErr.message }, 500)
    const byCustomer = new Map<string, string[]>()
    for (const t of tokens ?? []) byCustomer.set(t.customer_id, [...(byCustomer.get(t.customer_id) ?? []), t.token])

    // One Expo message per (row, device).
    const noDevice: number[] = []
    const messages: { row: Row; token: string; msg: Record<string, unknown> }[] = []
    for (const r of rows as Row[]) {
      const toks = byCustomer.get(r.customer_id)
      if (!toks?.length) { noDevice.push(r.id); continue }
      for (const token of toks) {
        messages.push({
          row: r,
          token,
          msg: {
            to: token,
            title: r.title,
            body: r.body,
            sound: 'default',
            channelId: r.kind === 'order_update' ? 'orders' : 'default',
            priority: r.kind === 'order_update' ? 'high' : 'default',
            data: { notificationId: r.id, link: r.link },
          },
        })
      }
    }
    await mark(noDevice, 'skipped', 'No registered device')
    skipped += noDevice.length

    // A row counts as sent if any of its devices accepted it.
    const okRows = new Set<number>()
    const errRows = new Map<number, string>()
    for (let i = 0; i < messages.length; i += BATCH) {
      const chunk = messages.slice(i, i + BATCH)
      let tickets: Ticket[]
      try {
        tickets = await sendToExpo(chunk.map((m) => m.msg))
      } catch (e) {
        for (const m of chunk) errRows.set(m.row.id, String((e as Error).message).slice(0, 300))
        continue
      }
      tickets.forEach((t, j) => {
        const m = chunk[j]
        if (t.status === 'ok') okRows.add(m.row.id)
        else {
          errRows.set(m.row.id, (t.details?.error ?? t.message ?? 'error').slice(0, 300))
          if (t.details?.error === 'DeviceNotRegistered') deadTokens.add(m.token)
        }
      })
    }
    const okIds = [...okRows]
    const errIds = [...errRows.keys()].filter((id) => !okRows.has(id))
    await mark(okIds, 'sent')
    for (const id of errIds) await mark([id], 'failed', errRows.get(id)!)
    sent += okIds.length
    failed += errIds.length

    if (rows.length < 500) break
  }

  if (deadTokens.size) await db.from('push_tokens').delete().in('token', [...deadTokens])
  if (failed > 0) {
    await db.rpc('raise_alert_service', {
      p_key: 'push:failed',
      p_title: `${failed} push notification${failed === 1 ? '' : 's'} failed to send`,
      p_body: 'Expo rejected them. Check the push credentials in EAS and the send-push function logs.',
    })
  }

  const [messagesSent, messagesFailed] = await sendMessages()
  return json({ processed, sent, failed, skipped, removedTokens: deadTokens.size, messagesSent, messagesFailed })
})
