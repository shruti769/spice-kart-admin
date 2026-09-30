import { supabase } from './supabase'
import { useLiveQuery } from './customers'
import { withFacts } from './payments'

// Customer support (schema: supabase/support.sql).
//   support_tickets / support_messages   the in-app chat, live both ways (the app's Contact support)
//   canned_replies                       saved answers for the inbox composer
//   help_articles                        the app's Help centre questions
// A customer message reopens a ticket; an agent reply moves it to Pending and notifies the customer.

export const TOPICS = [
  ['orders', 'Orders'],
  ['delivery', 'Delivery'],
  ['payments', 'Payments'],
  ['refunds', 'Refunds'],
  ['wallet', 'Wallet'],
  ['addresses', 'Addresses'],
  ['account', 'Account'],
  ['general', 'General'],
]
/** Help centre topics (the app's six topic screens). */
export const HELP_TOPICS = TOPICS.slice(0, 6)
export const topicLabel = (t) => TOPICS.find(([k]) => k === t)?.[1] ?? t

export const STATUSES = [
  ['open', 'Open'],
  ['pending', 'Pending'],
  ['resolved', 'Resolved'],
]
/** [label, fg, bg] */
export const STATUS_PILL = {
  open: ['Open', '#8A6100', '#FBF1DE'],
  pending: ['Pending', '#2F4F9E', '#EEF2FB'],
  resolved: ['Resolved', '#0B6B33', '#E9F6E3'],
}
export const PRIORITIES = [
  ['normal', 'Normal'],
  ['high', 'High'],
  ['urgent', 'Urgent'],
]
/** Coloured label next to the status pill (normal shows nothing). */
export const PRIORITY_TEXT = { high: ['High', '#A95A00'], urgent: ['Urgent', '#A93826'] }
export const CHANNEL_LABEL = { in_app: 'In-app chat', email: 'Email', phone: 'Phone' }

/** Text placeholders the app fills in Help centre articles. */
export const HELP_PLACEHOLDERS = ['{eta_minutes}', '{book_ahead_days}', '{express_fee}', '{free_over}', '{scheduled_fee}', '{handling_fee}', '{slot_cutoff}', '{delivery_area}']

const PHOTO_BUCKET = 'support-photos'

function friendly(error) {
  if (error?.code === '42P01' || error?.code === 'PGRST205' || error?.code === 'PGRST202' || error?.code === '42883') {
    return new Error('Support isn’t set up yet · run supabase/support.sql in the Supabase SQL Editor')
  }
  if (error?.code === '23514') return new Error('Some values aren’t allowed · check the text and try again')
  if (error?.code === '42501') return new Error('You don’t have permission to do that')
  return error instanceof Error ? error : new Error(error?.message || 'Unknown error')
}
const must = ({ data, error }) => {
  if (error && error.code !== 'PGRST103') throw friendly(error)
  return data
}
/** Safe for a PostgREST `or=(…)` filter value. */
const clean = (s) => s.replace(/[,()*%\\:"']/g, ' ').trim()

// ═══ Inbox ═══════════════════════════════════════════════════════════════════════════════
const TICKET_SELECT = 'id, number, subject, topic, channel, priority, status, assignee_id, last_message_at, last_message_preview, last_sender, first_response_at, resolved_at, csat, created_at, customer_id, order_id, customer:customers(id, first_name, last_name, email, mobile)'
export const TICKET_LIMIT = 200

/** `{ all, open, pending, resolved, avg_first_reply_min, csat_pct, rated }`. Live. */
export function useSupportSummary(deps = []) {
  return useLiveQuery(async () => must(await supabase.rpc('support_summary')), ['support_tickets'], deps)
}

/** Tickets for a status tab (`all` = every status), newest activity first. Search covers ticket number, subject, customer and order number. Live. */
export function useTickets({ status, q }) {
  return useLiveQuery(async () => {
    let x = supabase.from('support_tickets').select(TICKET_SELECT)
    if (status !== 'all') x = x.eq('status', status)
    const t = clean(q || '')
    if (t) {
      const words = t.split(/\s+/).filter(Boolean)
      const digits = t.replace(/\D/g, '')
      const [customers, orders] = await Promise.all([
        words.reduce((c, w) => c.or(`first_name.ilike.%${w}%,last_name.ilike.%${w}%,email.ilike.%${w}%`), supabase.from('customers').select('id')).limit(200),
        digits ? supabase.from('orders').select('id').ilike('number', `%${digits}%`).limit(50) : Promise.resolve({ data: [] }),
      ])
      const parts = [`number.ilike.%${t}%`, `subject.ilike.%${t}%`]
      if (customers.data?.length) parts.push(`customer_id.in.(${customers.data.map((c) => c.id).join(',')})`)
      if (orders.data?.length) parts.push(`order_id.in.(${orders.data.map((o) => o.id).join(',')})`)
      x = x.or(parts.join(','))
    }
    return must(await x.order('last_message_at', { ascending: false }).limit(TICKET_LIMIT)) ?? []
  }, ['support_tickets', 'customers'], [status, q])
}

/** One ticket (for a selection that isn't in the current list). Live. */
export function useTicket(id) {
  return useLiveQuery(async () => {
    if (!id) return null
    return must(await supabase.from('support_tickets').select(TICKET_SELECT).eq('id', id).maybeSingle())
  }, ['support_tickets'], [id])
}

/** The ticket's thread (internal notes included) with signed photo URLs. Live. */
export function useMessages(ticketId) {
  return useLiveQuery(async () => {
    if (!ticketId) return []
    const rows = must(await supabase.from('support_messages').select('id, sender, author_name, body, image_path, internal, created_at')
      .eq('ticket_id', ticketId).order('created_at').order('id')) ?? []
    const paths = rows.map((m) => m.image_path).filter(Boolean)
    if (paths.length) {
      const { data } = await supabase.storage.from(PHOTO_BUCKET).createSignedUrls(paths, 3600)
      const url = new Map((data ?? []).map((d) => [d.path, d.signedUrl]))
      rows.forEach((m) => { if (m.image_path) m.image_url = url.get(m.image_path) ?? null })
    }
    return rows
  }, ['support_messages'], [ticketId])
}

/** Right-hand panel: customer stats, the linked order (with refund facts) and earlier tickets. Live. */
export function useTicketContext(ticket) {
  const customerId = ticket?.customer_id ?? null
  const orderId = ticket?.order_id ?? null
  const ticketId = ticket?.id ?? null
  return useLiveQuery(async () => {
    if (!customerId) return null
    const [stats, order, tickets, orders] = await Promise.all([
      supabase.from('customer_stats').select('id, orders, total_spend, created_at, mobile, email').eq('id', customerId).maybeSingle(),
      orderId
        ? supabase.from('orders').select('id, number, status, total, delivery_fee, placed_at, delivered_at, payment_method, payment_status, customer:customers(first_name, last_name), order_items(id, name, qty, line_total), payments(id, amount, method, status, card_brand, card_last4, created_at)').eq('id', orderId).maybeSingle()
        : Promise.resolve({ data: null }),
      supabase.from('support_tickets').select('id, number, subject, status, created_at, resolved_at').eq('customer_id', customerId).order('created_at', { ascending: false }).limit(20),
      supabase.from('orders').select('id, number, status, placed_at').eq('customer_id', customerId).order('placed_at', { ascending: false }).limit(10),
    ])
    const all = must(tickets) ?? []
    const o = must(order)
    return {
      stats: must(stats),
      order: o ? withFacts(o) : null,
      openTickets: all.filter((t) => t.status !== 'resolved').length,
      previous: all.filter((t) => t.id !== ticketId).slice(0, 5),
      orders: must(orders) ?? [],
    }
  }, ['support_tickets', 'orders', 'payments'], [customerId, orderId, ticketId])
}

/** Sends a reply (customer sees it, status → Pending) or an internal note. */
export async function sendMessage(ticketId, body, internal = false) {
  must(await supabase.from('support_messages').insert({ ticket_id: ticketId, sender: 'agent', body: body.trim(), internal }))
}

/** status / priority / assignee_id / order_id */
export async function updateTicket(id, patch) {
  const data = must(await supabase.from('support_tickets').update(patch).eq('id', id).select('id'))
  if (!data?.length) throw new Error('This ticket no longer exists or you don’t have permission to change it')
}

/** Open (unresolved) ticket count for the sidebar badge. Live; re-read when the signed-in admin changes. */
export function useOpenTicketCount(authKey) {
  const q = useLiveQuery(async () => {
    if (!authKey) return 0
    const { count, error } = await supabase.from('support_tickets').select('id', { count: 'exact', head: true }).eq('status', 'open')
    return error ? 0 : count ?? 0
  }, ['support_tickets'], [authKey])
  return authKey ? q.data ?? 0 : 0
}

// ═══ Canned replies ══════════════════════════════════════════════════════════════════════
export function useCannedReplies() {
  return useLiveQuery(async () => must(await supabase.from('canned_replies').select('*').order('use_count', { ascending: false }).order('created_at')) ?? [], ['canned_replies'])
}
export async function saveCannedReply(id, row) {
  const res = id ? await supabase.from('canned_replies').update(row).eq('id', id).select('id') : await supabase.from('canned_replies').insert(row).select('id')
  must(res)
}
export async function deleteCannedReply(id) {
  must(await supabase.from('canned_replies').delete().eq('id', id))
}
/** Counts an insert from the composer (never blocks the agent). */
export function countCannedUse(id) {
  supabase.rpc('use_canned_reply', { p_id: id }).then(() => {}, () => {})
}

// ═══ Help centre ═════════════════════════════════════════════════════════════════════════
export function useHelpArticles() {
  return useLiveQuery(async () => must(await supabase.from('help_articles').select('*').order('sort').order('created_at')) ?? [], ['help_articles'])
}
export async function saveHelpArticle(id, row) {
  if (id) return must(await supabase.from('help_articles').update(row).eq('id', id).select('id'))
  // New articles go to the end of their topic.
  const { data: last } = await supabase.from('help_articles').select('sort').eq('topic', row.topic).order('sort', { ascending: false }).limit(1).maybeSingle()
  return must(await supabase.from('help_articles').insert({ ...row, sort: (last?.sort ?? 0) + 1 }).select('id'))
}
export async function deleteHelpArticle(id) {
  must(await supabase.from('help_articles').delete().eq('id', id))
}
/** Share of "Yes" votes, or null before anyone voted. */
export const helpfulPct = (a) => {
  const n = a.helpful_yes + a.helpful_no
  return n ? Math.round((a.helpful_yes / n) * 100) : null
}

// ═══ Display ═════════════════════════════════════════════════════════════════════════════
/** "now", "4 min", "2 h", "Yesterday", "24 Sep" */
export function ago(iso, now) {
  const mins = Math.max(0, Math.floor((now - new Date(iso).getTime()) / 60000))
  if (mins < 1) return 'now'
  if (mins < 60) return `${mins} min`
  if (mins < 24 * 60) return `${Math.floor(mins / 60)} h`
  if (mins < 48 * 60) return 'Yesterday'
  return new Date(iso).toLocaleDateString('en-AU', { day: 'numeric', month: 'short' })
}
/** "11:58 AM", with the date when not today. */
export function msgTime(iso, now) {
  const d = new Date(iso)
  const time = d.toLocaleTimeString('en-AU', { hour: 'numeric', minute: '2-digit' })
  return new Date(now).toDateString() === d.toDateString() ? time : `${d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short' })}, ${time}`
}
/** "12 Aug" */
export const shortDay = (iso) => new Date(iso).toLocaleDateString('en-AU', { day: 'numeric', month: 'short' })
