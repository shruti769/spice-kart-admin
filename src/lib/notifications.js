import { useCallback, useEffect, useRef, useState } from 'react'
import { isSupabaseConfigured, supabase } from './supabase'

// Notifications (schema: supabase/orders.sql + supabase/notifications.sql).
//   admin_alerts    → Notification centre + the header bell (live via Supabase Realtime)
//   push_campaigns  → Notifications › Campaigns; push_campaign_stats has per-campaign delivery counts

function friendly(error) {
  if (error.code === '42P01' || error.code === 'PGRST205' || error.code === 'PGRST202') {
    return new Error('Notifications aren’t set up yet · run supabase/orders.sql and supabase/notifications.sql in the Supabase SQL Editor')
  }
  if (error.code === '23514') return new Error('Some values aren’t allowed · check the title, message and schedule')
  if (error.code === '42501') return new Error('You don’t have permission to do that')
  return error instanceof Error ? error : new Error(error.message || 'Unknown error')
}

let channelSeq = 0
/** Calls `onChange` whenever any row of `tables` changes (Supabase Realtime; RLS applies). */
export function useRealtime(tables, onChange) {
  const cb = useRef(onChange)
  useEffect(() => { cb.current = onChange })
  const key = tables.join(',')
  useEffect(() => {
    if (!isSupabaseConfigured) return
    const ch = supabase.channel(`admin-${key}-${++channelSeq}`)
    for (const table of key.split(',')) ch.on('postgres_changes', { event: '*', schema: 'public', table }, () => cb.current())
    ch.subscribe()
    return () => { supabase.removeChannel(ch) }
  }, [key])
}

/** `{ status, data, error, loading, refetch }` for an async loader, refetched on realtime changes to `tables`. */
function useLive(load, tables, deps = []) {
  const [state, setState] = useState(() => ({ status: isSupabaseConfigured ? 'loading' : 'off', data: null, error: '' }))
  const [version, setVersion] = useState(0)
  const refetch = useCallback(() => setVersion((n) => n + 1), [])
  // Collapse bursts of changes (e.g. a campaign fanning out) into one refetch.
  const timer = useRef(null)
  useRealtime(tables, () => {
    clearTimeout(timer.current)
    timer.current = setTimeout(refetch, 300)
  })
  useEffect(() => () => clearTimeout(timer.current), [])
  useEffect(() => {
    if (!isSupabaseConfigured) return
    let cancelled = false
    load()
      .then((data) => { if (!cancelled) setState({ status: 'ready', data, error: '' }) })
      .catch((e) => { if (!cancelled) setState((st) => ({ status: 'error', data: st.data, error: friendly(e).message })) })
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [version, ...deps])
  return { ...state, loading: state.status === 'loading', refetch }
}

const must = ({ data, error, count }) => {
  if (error) throw friendly(error)
  return count ?? data
}

// ═══ Alerts ══════════════════════════════════════════════════════════════════════════════
export const ALERT_CATEGORIES = [
  ['operations', 'Operations'],
  ['inventory', 'Inventory'],
  ['payments', 'Payments'],
  ['reviews', 'Reviews'],
  ['system', 'System'],
]

/** Recent alerts (newest first), `limit` at a time; unresolved and resolved. */
export function useAlerts(limit) {
  return useLive(
    async () => must(await supabase.from('admin_alerts').select('*').order('created_at', { ascending: false }).limit(limit)),
    ['admin_alerts'],
    [limit],
  )
}

/** Unread, unresolved alerts: `{ total, byCategory, critical, oldest }`. */
export function useUnreadAlerts() {
  return useLive(async () => {
    const rows = must(await supabase.from('admin_alerts').select('category, severity, created_at').is('read_at', null).is('resolved_at', null))
    const byCategory = {}
    for (const r of rows) byCategory[r.category] = (byCategory[r.category] || 0) + 1
    return {
      total: rows.length,
      byCategory,
      critical: rows.filter((r) => r.severity === 'critical').length,
      oldest: rows.reduce((m, r) => (!m || r.created_at < m ? r.created_at : m), null),
    }
  }, ['admin_alerts'])
}

export async function markAlertRead(id) {
  const { data: { user } } = await supabase.auth.getUser()
  must(await supabase.from('admin_alerts').update({ read_at: new Date().toISOString(), read_by: user?.id ?? null }).eq('id', id).select('id'))
}

export async function markAllAlertsRead() {
  const { data: { user } } = await supabase.auth.getUser()
  return must(await supabase.from('admin_alerts').update({ read_at: new Date().toISOString(), read_by: user?.id ?? null }).is('read_at', null).select('id')).length
}

/** Live counts for the "Needs attention" panel. */
export function useAttentionCounts() {
  return useLive(async () => {
    const head = (q) => q.then(must)
    const [delayed, failedPayments, pendingRefunds, pendingReviews, stockAlerts] = await Promise.all([
      head(supabase.from('orders').select('id', { count: 'exact', head: true }).not('status', 'in', '(delivered,cancelled)').lt('promised_by', new Date().toISOString())),
      head(supabase.from('orders').select('id', { count: 'exact', head: true }).eq('payment_status', 'failed').neq('status', 'cancelled')),
      head(supabase.from('refund_requests').select('id', { count: 'exact', head: true }).eq('status', 'pending')),
      head(supabase.from('reviews').select('id', { count: 'exact', head: true }).eq('status', 'pending')),
      head(supabase.from('admin_alerts').select('id', { count: 'exact', head: true }).eq('category', 'inventory').is('resolved_at', null)),
    ])
    return { delayed, failedPayments, pendingRefunds, pendingReviews, lowStock: stockAlerts }
  }, ['admin_alerts', 'orders', 'refund_requests', 'reviews'])
}

// ═══ Campaigns ═══════════════════════════════════════════════════════════════════════════
export const CAMPAIGN_TYPES = [
  ['promotional', 'Promotional'],
  ['order_update', 'Order update'],
  ['system', 'System'],
]
export const campaignTypeLabel = (t) => CAMPAIGN_TYPES.find(([k]) => k === t)?.[1] ?? t

export const AUDIENCES = [
  ['all', 'All customers'],
  ['new', 'New customers', 'Joined in the last 30 days'],
  ['inactive', 'Inactive customers', 'No order in 30+ days'],
  ['frequent', 'Frequent customers', '3+ orders in 60 days'],
  ['melbourne', 'Melbourne metro', 'Postcodes 3000–3207'],
]
export const audienceLabel = (a) => AUDIENCES.find(([k]) => k === a)?.[1] ?? a

/** Screens a notification can open ('page:<name>'); categories are 'category:<id>'. */
export const LINK_PAGES = ['Home', 'Offers page', 'Orders', 'Wallet', 'Cart']

/** 'draft' | 'scheduled' | 'sending' (due, waiting for the minutely job) | 'sent' | 'cancelled' */
export function campaignStatus(c, now = Date.now()) {
  if (c.status === 'scheduled' && new Date(c.scheduled_at).getTime() <= now) return 'sending'
  return c.status
}

/** Campaigns (newest first) with `stats` from push_campaign_stats. */
export function useCampaigns() {
  const live = useLive(async () => {
    const [campaigns, stats] = await Promise.all([
      supabase.from('push_campaigns').select('*').order('created_at', { ascending: false }).then(must),
      supabase.from('push_campaign_stats').select('*').then(must),
    ])
    const byId = Object.fromEntries(stats.map((s) => [s.campaign_id, s]))
    return campaigns.map((c) => ({ ...c, stats: byId[c.id] ?? null }))
  }, ['push_campaigns'])
  // Delivery / open counts change without touching push_campaigns: poll them while open.
  const { refetch } = live
  useEffect(() => {
    if (!isSupabaseConfigured) return
    const t = setInterval(refetch, 20000)
    return () => clearInterval(t)
  }, [refetch])
  return live
}

/** Order-update pushes sent automatically in the last 30 days. */
export function useAutomatedStats() {
  return useLive(async () => {
    const since = new Date(Date.now() - 30 * 864e5).toISOString()
    const q = () => supabase.from('customer_notifications').select('id', { count: 'exact', head: true }).eq('kind', 'order_update').gte('created_at', since)
    const [total, opened] = await Promise.all([q().then(must), q().not('opened_at', 'is', null).then(must)])
    return { total, opened }
  }, ['push_campaigns'])
}

export async function saveCampaign(id, row) {
  const res = id
    ? await supabase.from('push_campaigns').update(row).eq('id', id).select()
    : await supabase.from('push_campaigns').insert(row).select()
  const data = must(res)
  if (!data?.length) throw new Error('This campaign no longer exists, has already been sent, or you don’t have permission to change it')
  return data[0]
}

export const deleteCampaign = async (id) => {
  const data = must(await supabase.from('push_campaigns').delete().eq('id', id).select('id'))
  if (!data.length) throw new Error('This campaign no longer exists or you don’t have permission to delete it')
}

/** Sends now (fans out to inboxes + triggers push). Returns the number of recipients. */
export const sendCampaignNow = async (id) => must(await supabase.rpc('send_campaign_now', { p_id: id }))

/** `{ audience_size, reachable }` for the form's reach estimate. */
export async function campaignReach(audience, type) {
  const rows = must(await supabase.rpc('campaign_reach', { p_audience: audience, p_type: type }))
  return rows?.[0] ?? { audience_size: 0, reachable: 0 }
}

// ═══ Display ═════════════════════════════════════════════════════════════════════════════
/** "just now", "5 min ago", "3 hrs ago", "2 days ago" */
export function timeAgo(iso, now = Date.now()) {
  const s = Math.max(0, (now - new Date(iso).getTime()) / 1000)
  if (s < 60) return 'just now'
  if (s < 3600) return `${Math.floor(s / 60)} min ago`
  if (s < 86400) { const h = Math.floor(s / 3600); return `${h} hr${h === 1 ? '' : 's'} ago` }
  const d = Math.floor(s / 86400)
  return `${d} day${d === 1 ? '' : 's'} ago`
}

/** 'Today' | 'Yesterday' | 'Earlier this week' | 'Older' */
export function dayGroup(iso, now = new Date()) {
  const d = new Date(iso)
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  if (d.getTime() >= start) return 'Today'
  if (d.getTime() >= start - 864e5) return 'Yesterday'
  if (d.getTime() >= start - 6 * 864e5) return 'Earlier this week'
  return 'Older'
}

/** "24 Sep, 6:00 PM" */
export const dateTime = (iso) => new Date(iso).toLocaleString('en-AU', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' })
