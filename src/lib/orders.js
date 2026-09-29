import { useCallback, useEffect, useRef, useState } from 'react'
import { isSupabaseConfigured, supabase } from './supabase'
import { useRealtime } from './notifications'

// Customer orders (schema: supabase/orders.sql, placed by the app's place_order() RPC).
// Lists refresh live through Supabase Realtime.

export const STATUSES = [
  ['placed', 'Placed'],
  ['confirmed', 'Confirmed'],
  ['picking', 'Picking'],
  ['packed', 'Packed'],
  ['out_for_delivery', 'Out for delivery'],
  ['delivered', 'Delivered'],
  ['cancelled', 'Cancelled'],
]
export const statusLabel = (s) => STATUSES.find(([k]) => k === s)?.[1] ?? s
/** The next step in the normal flow, or null. */
export const nextStatus = (s) => {
  const flow = ['placed', 'confirmed', 'picking', 'packed', 'out_for_delivery', 'delivered']
  const i = flow.indexOf(s)
  return i >= 0 && i < flow.length - 1 ? flow[i + 1] : null
}

/** [fg, bg] per order status. */
export const STATUS_PILL = {
  placed: ['#8A6100', '#FBF1DE'],
  confirmed: ['#2F4F9E', '#EEF2FB'],
  picking: ['#6A3FA0', '#F2ECFA'],
  packed: ['#0E6B6B', '#E4F4F3'],
  out_for_delivery: ['#1B5E30', '#E9F6E3'],
  delivered: ['#0B6B33', '#E9F6E3'],
  cancelled: ['#A93826', '#FAEDEA'],
}
export const PAYMENT_LABEL = { card: 'Card', apple_pay: 'Apple Pay', google_pay: 'Google Pay', payid: 'PayID', wallet: 'Wallet' }
export const PAYMENT_STATUS_PILL = {
  pending: ['Unpaid', '#8A6100', '#FBF1DE'],
  paid: ['Paid', '#0B6B33', '#E9F6E3'],
  failed: ['Failed', '#A93826', '#FAEDEA'],
  refunded: ['Refunded', '#5F6B62', '#EEF0EC'],
  partially_refunded: ['Part refunded', '#5F6B62', '#EEF0EC'],
}

function friendly(error) {
  if (error.code === '42P01' || error.code === 'PGRST205') return new Error('Orders aren’t set up yet · run supabase/orders.sql in the Supabase SQL Editor')
  if (error.code === 'PGRST202') return new Error('Cancelling needs supabase/order_admin.sql · run it in the Supabase SQL Editor')
  if (error.code === '42501') return new Error('You don’t have permission to change orders')
  return error instanceof Error ? error : new Error(error.message || 'Unknown error')
}

const LIST_SELECT = 'id, number, status, delivery_type, slot_label, promised_by, total, payment_method, payment_status, placed_at, address_area, customer:customers(first_name, last_name, mobile), order_items(qty)'

/** Recent orders (newest first), `limit` at a time, live. */
export function useOrders(limit) {
  const [state, setState] = useState(() => ({ status: isSupabaseConfigured ? 'loading' : 'off', rows: [], error: '' }))
  const [version, setVersion] = useState(0)
  const refetch = useCallback(() => setVersion((n) => n + 1), [])
  const timer = useRef(null)
  useRealtime(['orders'], () => {
    clearTimeout(timer.current)
    timer.current = setTimeout(refetch, 300)
  })
  useEffect(() => () => clearTimeout(timer.current), [])
  useEffect(() => {
    if (!isSupabaseConfigured) return
    let cancelled = false
    supabase.from('orders').select(LIST_SELECT).order('placed_at', { ascending: false }).limit(limit).then(({ data, error }) => {
      if (cancelled) return
      if (error) setState((st) => ({ status: 'error', rows: st.rows, error: friendly(error).message }))
      else setState({ status: 'ready', rows: data ?? [], error: '' })
    })
    return () => { cancelled = true }
  }, [version, limit])
  return { ...state, loading: state.status === 'loading', refetch }
}

/** Order counts per status (all time), live. */
export function useOrderCounts() {
  const [counts, setCounts] = useState(null)
  const [version, setVersion] = useState(0)
  useRealtime(['orders'], () => setVersion((n) => n + 1))
  useEffect(() => {
    if (!isSupabaseConfigured) return
    let cancelled = false
    const head = () => supabase.from('orders').select('id', { count: 'exact', head: true })
    Promise.all([
      head(),
      ...STATUSES.map(([k]) => head().eq('status', k)),
    ]).then((res) => {
      if (cancelled || res.some((r) => r.error)) return
      const out = { all: res[0].count }
      STATUSES.forEach(([k], i) => { out[k] = res[i + 1].count })
      setCounts(out)
    })
    return () => { cancelled = true }
  }, [version])
  return counts
}

const DETAIL_BASE = '*, customer:customers(id, first_name, last_name, mobile, email, created_at), order_items(id, product_id, name, image_url, qty, unit_price, line_total), payments(id, amount, method, status, card_brand, card_last4, failure_reason, created_at)'
// Relations from later SQL files (stores.sql, order_admin.sql): dropped if that file hasn't run yet.
const OPTIONAL_EMBEDS = [
  ['stores', 'store:stores(name, address_line, suburb, state, postcode, support_phone, support_email, abn)'],
  ['order_status_events', 'history:order_status_events(status, note, at)'],
]

/** One order with items, customer, payments and store, live. */
export function useOrder(id) {
  const [state, setState] = useState(() => ({ status: id && isSupabaseConfigured ? 'loading' : 'off', order: null, customerOrders: null, error: '' }))
  const [version, setVersion] = useState(0)
  useRealtime(['orders', 'payments', 'order_status_events'], () => setVersion((n) => n + 1))
  useEffect(() => {
    if (!id || !isSupabaseConfigured) return
    let cancelled = false
    ;(async () => {
      let embeds = OPTIONAL_EMBEDS
      let res
      for (;;) {
        res = await supabase.from('orders').select([DETAIL_BASE, ...embeds.map(([, e]) => e)].join(', ')).eq('id', id).maybeSingle()
        const missing = res.error && embeds.find(([t]) => (res.error.message || '').includes(t))
        if (!missing) break
        embeds = embeds.filter((e) => e !== missing)
      }
      if (cancelled) return
      if (res.error) return setState((st) => ({ ...st, status: 'error', error: friendly(res.error).message }))
      if (!res.data) return setState({ status: 'missing', order: null, customerOrders: null, error: '' })
      const { count } = await supabase.from('orders').select('id', { count: 'exact', head: true }).eq('customer_id', res.data.customer_id)
      if (!cancelled) setState({ status: 'ready', order: res.data, customerOrders: count ?? null, error: '' })
    })()
    return () => { cancelled = true }
  }, [id, version])
  return state
}

export async function setOrderStatus(id, status) {
  const { data, error } = await supabase.from('orders').update({ status }).eq('id', id).select('id')
  if (error) throw friendly(error)
  if (!data?.length) throw new Error('This order no longer exists or you don’t have permission to change it')
}

export async function cancelOrder(id, reason) {
  const { error } = await supabase.rpc('cancel_order', { p_id: id, p_reason: reason || null })
  if (error) throw friendly(error)
}

// ─── Display ─────────────────────────────────────────────────────────────────────────────
export const customerName = (c) => [c?.first_name, c?.last_name].filter(Boolean).join(' ') || 'Guest customer'
export const initials = (c) => (customerName(c).split(' ').map((w) => w[0]).join('').slice(0, 2) || '?').toUpperCase()
export const mobileLabel = (m) => (m ? `+61 ${m.slice(0, 3)} ${m.slice(3, 6)} ${m.slice(6)}` : '')
export const itemCount = (o) => (o.order_items ?? []).reduce((n, i) => n + i.qty, 0)
export const money = (n) => `$${Number(n || 0).toFixed(2)}`

/** "Today 12:42 PM", "Yesterday 9:10 AM", "24 Sep, 6:00 PM" */
export function placedLabel(iso, now = new Date()) {
  const d = new Date(iso)
  const time = d.toLocaleTimeString('en-AU', { hour: 'numeric', minute: '2-digit' })
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  if (d.getTime() >= start) return `Today ${time}`
  if (d.getTime() >= start - 864e5) return `Yesterday ${time}`
  return `${d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short' })}, ${time}`
}
