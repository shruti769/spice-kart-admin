// Spice Kart · invite-admin Edge Function (Admin → Staff & Admins → Invite member).
//
// POST { email, name, role, department, redirectTo?, resend? } with the signed-in admin's JWT
// (supabase.functions.invoke sends it). Checks the caller is an admin, then:
//   • new email      → emails a Supabase invite (they set a password) and adds them as 'invited'
//   • existing email → adds that account to public.admins as 'active' (they sign in as usual)
//
// Deploy: supabase functions deploy invite-admin --use-api --project-ref <ref>
// SUPABASE_URL, SUPABASE_ANON_KEY and SUPABASE_SERVICE_ROLE_KEY are provided by Supabase.

import { createClient } from 'jsr:@supabase/supabase-js@2'

const ROLES = ['Super Admin', 'Operations Manager', 'Inventory Manager', 'Order Manager', 'Customer Support', 'Content Manager']
const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, 'Content-Type': 'application/json' } })

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors })
  if (req.method !== 'POST') return json({ error: 'POST only' }, 405)

  const url = Deno.env.get('SUPABASE_URL')!
  const authHeader = req.headers.get('Authorization') ?? ''
  const caller = createClient(url, Deno.env.get('SUPABASE_ANON_KEY')!, { global: { headers: { Authorization: authHeader } }, auth: { persistSession: false } })
  const { data: me } = await caller.auth.getUser()
  if (!me?.user) return json({ error: 'Sign in again' }, 401)
  const { data: isAdmin } = await caller.rpc('is_admin')
  if (!isAdmin) return json({ error: 'Only admins can invite staff' }, 403)

  let body: { email?: string; name?: string; role?: string; department?: string; redirectTo?: string; resend?: boolean }
  try { body = await req.json() } catch { return json({ error: 'Bad request' }, 400) }
  const email = (body.email ?? '').trim().toLowerCase()
  const name = (body.name ?? '').trim().slice(0, 80)
  const role = ROLES.includes(body.role ?? '') ? body.role! : 'Customer Support'
  const department = (body.department ?? '').trim().slice(0, 60)
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return json({ error: 'Enter a valid email' }, 400)

  const admin = createClient(url, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, { auth: { persistSession: false } })
  const { data: existingId } = await admin.rpc('user_id_by_email', { p_email: email })

  // Resend: a new invite email while they're still 'invited' (falls back to a set-password link).
  if (body.resend) {
    const { data: row } = existingId
      ? await admin.from('admins').select('status').eq('user_id', existingId).maybeSingle()
      : { data: null }
    if (!row) return json({ error: 'No pending invite for that email' }, 404)
    if (row.status !== 'invited') return json({ error: 'They’ve already joined · they can use “Forgot password” to sign in' }, 409)
    const again = await admin.auth.admin.inviteUserByEmail(email, { redirectTo: body.redirectTo })
    if (again.error) {
      const reset = await admin.auth.resetPasswordForEmail(email, { redirectTo: body.redirectTo })
      if (reset.error) return json({ error: `Couldn’t resend: ${reset.error.message}` }, 400)
    }
    await admin.from('admins').update({ invited_at: new Date().toISOString() }).eq('user_id', existingId)
    return json({ ok: true, status: 'invited', resent: true })
  }

  let userId = existingId as string | null
  let status: 'invited' | 'active' = 'active'
  if (!userId) {
    const { data, error } = await admin.auth.admin.inviteUserByEmail(email, { redirectTo: body.redirectTo, data: { name } })
    if (error) return json({ error: `Couldn’t send the invite: ${error.message}` }, 400)
    userId = data.user.id
    status = 'invited'
  }

  const { data: already } = await admin.from('admins').select('user_id').eq('user_id', userId).maybeSingle()
  if (already) return json({ error: 'That person is already on the team' }, 409)

  const { error: insErr } = await admin.from('admins').insert({
    user_id: userId, name, email, role, department, status, invited_by: me.user.id, invited_at: new Date().toISOString(),
  })
  if (insErr) return json({ error: insErr.message }, 400)
  return json({ ok: true, status })
})
