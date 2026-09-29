import { useCallback, useEffect, useRef, useState } from 'react'
import { isSupabaseConfigured, supabase } from './supabase'
import { useRealtime } from './notifications'

// Customers (schema: supabase/orders.sql + supabase/admin_data.sql).
//   customer_stats (view)   one row per customer with orders / spend / last order / status
//   customer_summary()      KPI numbers for the Customers page
// Lists refresh live through Supabase Realtime (customers + orders).

export function friendly(error) {
  if (error?.code === '42P01' || error?.code === 'PGRST205' || error?.code === 'PGRST202') {
    return new Error('Customer data isn’t set up yet · run supabase/orders.sql and supabase/admin_data.sql in the Supabase SQL Editor')
  }
  if (error?.code === '23505') return new Error('Another customer already uses that email or mobile')
  if (error?.code === '23514') return new Error('Some values aren’t allowed · check the name, email and mobile')
  if (error?.code === '42501') return new Error('You don’t have permission to do that')
  return error instanceof Error ? error : new Error(error?.message || 'Unknown error')
}

/** `{ status, data, error, loading, refetch }` for `load()`, refetched (debounced) on realtime changes to `tables`. */
export function useLiveQuery(load, tables, deps = []) {
  const [state, setState] = useState(() => ({ status: isSupabaseConfigured ? 'loading' : 'off', data: null, error: '' }))
  const [version, setVersion] = useState(0)
  const timer = useRef(null)
  const refetch = useCallback(() => setVersion((n) => n + 1), [])
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

/** Current time (ms), ticking every `ms` so relative labels stay fresh. */
export function useNow(ms = 60000) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), ms)
    return () => clearInterval(t)
  }, [ms])
  return now
}

// ═══ List ════════════════════════════════════════════════════════════════════════════════
export const CUSTOMER_TABS = [
  ['all', 'All'],
  ['active', 'Active'],
  ['new', 'New'],
  ['returning', 'Returning'],
  ['inactive', 'Inactive'],
  ['suspended', 'Suspended'],
]

export const CUSTOMER_SORTS = [
  ['joined', 'Newest first'],
  ['last_order', 'Most recent order'],
  ['spend', 'Highest spend'],
  ['orders', 'Most orders'],
]

/** Safe for a PostgREST `or=(…)` filter value. */
const clean = (s) => s.replace(/[,()*%\\:"']/g, ' ').trim()
/** "+61 412 663 208" / "0412663208" / "412 663" → digits as stored (after +61). */
const mobileDigits = (s) => {
  let d = s.replace(/\D/g, '')
  if (d.startsWith('61') && d.length > 9) d = d.slice(2)
  else if (d.startsWith('0') && d.length > 1) d = d.slice(1)
  return d
}

/** Applies tab, search, marketing filter and sort to a customer_stats query. */
function applyFilters(query, { tab = 'all', q = '', marketing = 'any', sort = 'joined' }) {
  let x = query
  if (tab === 'active' || tab === 'inactive' || tab === 'suspended') x = x.eq('status', tab)
  else if (tab === 'new') x = x.gte('created_at', new Date(Date.now() - 7 * 864e5).toISOString())
  else if (tab === 'returning') x = x.gte('orders', 2)
  if (marketing === 'yes') x = x.eq('marketing_opt_in', true)
  else if (marketing === 'no') x = x.eq('marketing_opt_in', false)

  const term = q.trim()
  if (term) {
    if (/^[+\d\s()-]+$/.test(term)) {
      const d = mobileDigits(term)
      if (d) x = x.ilike('mobile', `%${d}%`)
    } else {
      for (const w of clean(term).split(/\s+/).filter(Boolean)) {
        x = x.or(`first_name.ilike.%${w}%,last_name.ilike.%${w}%,email.ilike.%${w}%`)
      }
    }
  }

  if (sort === 'last_order') x = x.order('last_order_at', { ascending: false, nullsFirst: false })
  else if (sort === 'spend') x = x.order('total_spend', { ascending: false })
  else if (sort === 'orders') x = x.order('orders', { ascending: false })
  return x.order('created_at', { ascending: false }).order('id')
}

/** One page of customers (`page` from 1) matching `filters`, with the total count. Live. */
export function useCustomers(filters, page, pageSize) {
  const key = JSON.stringify(filters)
  return useLiveQuery(async () => {
    const from = (page - 1) * pageSize
    const { data, error, count } = await applyFilters(supabase.from('customer_stats').select('*', { count: 'exact' }), filters)
      .range(from, from + pageSize - 1)
    // Asking past the end (e.g. after a filter change) is a 416 in PostgREST: treat as empty.
    if (error && error.code !== 'PGRST103') throw error
    return { rows: data ?? [], count: count ?? 0 }
  }, ['customers', 'orders'], [key, page, pageSize])
}

export const EXPORT_LIMIT = 5000

/** Every customer matching `filters` (up to EXPORT_LIMIT), for CSV export. */
export async function fetchCustomersForExport(filters) {
  const { data, error, count } = await applyFilters(supabase.from('customer_stats').select('*', { count: 'exact' }), filters).range(0, EXPORT_LIMIT - 1)
  if (error) throw friendly(error)
  return { rows: data ?? [], count: count ?? 0 }
}

/** KPI numbers from customer_summary(). Live. */
export function useCustomerSummary() {
  return useLiveQuery(async () => {
    const { data, error } = await supabase.rpc('customer_summary')
    if (error) throw error
    return data
  }, ['customers', 'orders'])
}

/** A customer's most recent orders. Live. */
export function useCustomerOrders(customerId, limit = 8) {
  return useLiveQuery(async () => {
    if (!customerId) return []
    const { data, error } = await supabase.from('orders')
      .select('id, number, status, total, placed_at, payment_status, order_items(qty)')
      .eq('customer_id', customerId).order('placed_at', { ascending: false }).limit(limit)
    if (error) throw error
    return data ?? []
  }, ['orders'], [customerId, limit])
}

// ═══ Detail page ═════════════════════════════════════════════════════════════════════════
export const DETAIL_ORDER_LIMIT = 1000

/**
 * Everything the Customer detail page shows, live:
 * `{ customer (customer_stats row + push_opt_in), orders (all, newest first, with items), refunds, reviews, reviewCount }`
 * or null when the customer doesn't exist. Refunds / reviews failing (e.g. a SQL file not run yet)
 * doesn't block the page: their error is returned as `refundsError` / `reviewsError`.
 */
export function useCustomerDetail(id) {
  return useLiveQuery(async () => {
    if (!id) return null
    const [stats, prefs, orders, refunds, reviews] = await Promise.all([
      supabase.from('customer_stats').select('*').eq('id', id).maybeSingle(),
      supabase.from('customers').select('push_opt_in').eq('id', id).maybeSingle(),
      supabase.from('orders')
        .select('id, number, status, total, payment_status, payment_method, placed_at, address_line, address_area, postcode, order_items(qty, name, product_id, image_url, line_total)')
        .eq('customer_id', id).order('placed_at', { ascending: false }).limit(DETAIL_ORDER_LIMIT),
      supabase.from('refund_requests')
        .select('id, number, reason, detail, amount, status, created_at, decided_at, order:orders(id, number)')
        .eq('customer_id', id).order('created_at', { ascending: false }),
      supabase.from('reviews')
        .select('id, rating, comment, status, created_at, product:products(name), order:orders(id, number)', { count: 'exact' })
        .eq('customer_id', id).order('created_at', { ascending: false }).limit(3),
    ])
    if (stats.error) throw stats.error
    if (!stats.data) return null
    if (orders.error) throw orders.error
    return {
      id,
      customer: { ...stats.data, push_opt_in: prefs.data?.push_opt_in ?? null },
      orders: orders.data ?? [],
      refunds: refunds.data ?? [],
      refundsError: refunds.error ? friendly(refunds.error).message : '',
      reviews: reviews.data ?? [],
      reviewCount: reviews.count ?? reviews.data?.length ?? 0,
      reviewsError: reviews.error ? friendly(reviews.error).message : '',
    }
  }, ['customers', 'orders', 'refund_requests', 'reviews'], [id])
}

/** Sends one customer an in-app notification (plus a push when they've opted in). */
export async function notifyCustomer(id, title, body) {
  const { error } = await supabase.rpc('notify_customer', { p_customer: id, p_title: title.trim(), p_body: body.trim() })
  if (!error) return
  if (error.code === 'PGRST202') throw new Error('Sending needs supabase/admin_data.sql · run it in the Supabase SQL Editor')
  if (error.code === '23514' || error.code === 'P0002') throw new Error(error.message)
  throw friendly(error)
}

// ═══ Changes ═════════════════════════════════════════════════════════════════════════════
async function updateCustomerRow(id, patch) {
  const { data, error } = await supabase.from('customers').update(patch).eq('id', id).select('id')
  if (error) throw friendly(error)
  if (!data?.length) throw new Error('This customer no longer exists or you don’t have permission to change them')
}

/** Normalises what an admin typed into the 9 stored digits, '' when empty, or null when invalid. */
export function parseMobile(input) {
  const t = (input ?? '').trim()
  if (!t) return ''
  const d = mobileDigits(t)
  return /^\d{9}$/.test(d) ? d : null
}

export const updateCustomer = (id, { first_name, last_name, email, mobile }) =>
  updateCustomerRow(id, {
    first_name: first_name.trim(),
    last_name: last_name.trim(),
    email: email.trim() || null,
    mobile: mobile || null,
  })

export const suspendCustomer = (id, reason) =>
  updateCustomerRow(id, { suspended_at: new Date().toISOString(), suspended_reason: reason.trim().slice(0, 300) || null })

export const unsuspendCustomer = (id) => updateCustomerRow(id, { suspended_at: null, suspended_reason: null })

// ═══ Display ═════════════════════════════════════════════════════════════════════════════
/** "$1,842.60" */
export const moneyAU = (n) => Number(n || 0).toLocaleString('en-AU', { style: 'currency', currency: 'AUD' })
/** "11,284" */
export const num = (n) => Number(n || 0).toLocaleString('en-AU')

const dayStart = (t) => { const d = new Date(t); d.setHours(0, 0, 0, 0); return d.getTime() }
/** "Today", "Yesterday", "3 days ago", "2 weeks ago", "4 months ago" · `empty` when no date. */
export function relativeDay(iso, now, empty = 'Never') {
  if (!iso) return empty
  const days = Math.round((dayStart(now) - dayStart(iso)) / 864e5)
  const ago = (n, unit) => `${n} ${unit}${n === 1 ? '' : 's'} ago`
  if (days <= 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7) return ago(days, 'day')
  if (days < 30) return ago(Math.floor(days / 7), 'week')
  if (days < 365) return ago(Math.floor(days / 30), 'month')
  return ago(Math.floor(days / 365), 'year')
}

/** "Mar 2026" */
export const monthYear = (iso) => (iso ? new Date(iso).toLocaleDateString('en-AU', { month: 'short', year: 'numeric' }) : '')

/** [label, fg, bg] for a customer_stats row. New = joined in the last 7 days and hasn't ordered recently. */
export function customerPill(c, now) {
  if (c.status === 'suspended') return ['Suspended', '#A93826', '#FAEDEA']
  if (c.status === 'active') return ['Active', '#0B6B33', '#E9F6E3']
  if (now - new Date(c.created_at).getTime() < 7 * 864e5) return ['New', '#2F4F9E', '#EEF2FB']
  return ['Inactive', '#5F6B62', '#EEF0EC']
}

// ═══ CSV ═════════════════════════════════════════════════════════════════════════════════
const csvCell = (v) => {
  let s = v == null ? '' : String(v)
  // Stop spreadsheets treating text as a formula.
  if (/^[=@\t\r]/.test(s) || /^[+-][^\d\s]/.test(s)) s = `'${s}`
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

/** Downloads `rows` (arrays) under `header` as a UTF-8 CSV file. */
export function downloadCsv(filename, header, rows) {
  const text = [header, ...rows].map((r) => r.map(csvCell).join(',')).join('\r\n')
  const url = URL.createObjectURL(new Blob([`\ufeff${text}`], { type: 'text/csv;charset=utf-8' }))
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

/** "2026-09-29" in local time, for file names. */
export const fileDate = () => new Date().toLocaleDateString('en-CA')
