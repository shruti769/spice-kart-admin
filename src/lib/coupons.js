import { useCallback, useEffect, useState } from 'react'
import { isSupabaseConfigured, supabase } from './supabase'

// Coupons live in `public.coupons` (admins: full CRUD). The customer app reads coupons that
// are active and inside their starts_at / ends_at window.

export const CODE_PATTERN = /^[A-Z0-9_-]{3,20}$/
/** Uppercases and strips anything the DB check (`^[A-Z0-9_-]{3,20}$`) would reject. */
export const sanitizeCode = (s) => s.toUpperCase().replace(/[^A-Z0-9_-]/g, '').slice(0, 20)

export const DISCOUNT_TYPES = [
  ['percent', 'Percentage discount'],
  ['flat', 'Fixed amount'],
  ['free_delivery', 'Free delivery'],
]
export const typeLabel = (t) => ({ flat: 'Fixed amount', percent: 'Percentage', free_delivery: 'Free delivery' }[t] || t)

// ─── Display helpers ─────────────────────────────────────────────────────────────────────
/** "$5", "$4.50" */
export function money(n) {
  const x = Number(n)
  if (!Number.isFinite(x)) return '$0'
  return Number.isInteger(x) ? `$${x}` : `$${x.toFixed(2)}`
}

/** 'paused' (active=false) | 'scheduled' | 'expired' | 'live' */
export function couponStatus(c, now = Date.now()) {
  if (!c.active) return 'paused'
  if (c.starts_at && new Date(c.starts_at).getTime() > now) return 'scheduled'
  if (c.ends_at && new Date(c.ends_at).getTime() <= now) return 'expired'
  return 'live'
}

/** [label, fg, bg] for a status pill. */
export const STATUS_PILL = {
  live: ['Live', '#0B6B33', '#E9F6E3'],
  scheduled: ['Scheduled', '#8A6100', '#FBF1DE'],
  paused: ['Paused', '#5F6B62', '#EEF0EC'],
  expired: ['Expired', '#A93826', '#FAEDEA'],
}

/** "$5 off", "20% off · max $10", "Free delivery" */
export function discountSummary(c) {
  if (c.discount_type === 'free_delivery') return 'Free delivery'
  if (c.discount_type === 'percent') return `${Number(c.value)}% off${c.max_discount != null ? ` · max ${money(c.max_discount)}` : ''}`
  return `${money(c.value)} off`
}

export const minSpendLabel = (c) => (Number(c.min_spend) > 0 ? `Min spend ${money(c.min_spend)}` : 'No minimum')

const sameYear = (d) => d.getFullYear() === new Date().getFullYear()
const dayMonth = (d) => d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short', ...(sameYear(d) ? {} : { year: 'numeric' }) })

/** "1–30 Sep", "28 Sep – 5 Oct", "From 1 Oct", "Until 30 Sep", "Ongoing" */
export function periodLabel(c) {
  const s = c.starts_at ? new Date(c.starts_at) : null
  const e = c.ends_at ? new Date(c.ends_at) : null
  if (s && e) {
    if (s.getFullYear() === e.getFullYear() && s.getMonth() === e.getMonth() && sameYear(s)) {
      return s.getDate() === e.getDate() ? dayMonth(s) : `${s.getDate()}–${dayMonth(e)}`
    }
    return `${dayMonth(s)} – ${dayMonth(e)}`
  }
  if (s) return `From ${dayMonth(s)}`
  if (e) return `Until ${dayMonth(e)}`
  return 'Ongoing'
}

/** Full date/time window for tooltips. */
export function periodTitle(c) {
  const f = (iso) => new Date(iso).toLocaleString('en-AU', { dateStyle: 'medium', timeStyle: 'short' })
  if (!c.starts_at && !c.ends_at) return 'No start or end date'
  return `${c.starts_at ? f(c.starts_at) : 'Now'} → ${c.ends_at ? f(c.ends_at) : 'no end date'}`
}

/** ISO timestamp → value for `<input type="datetime-local">` (local time), or ''. */
export function isoToLocalInput(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  const p = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`
}

/** `datetime-local` value (local time) → ISO string, null when empty, NaN-date → undefined. */
export function localInputToIso(value) {
  if (!value) return null
  const d = new Date(value)
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString()
}

// ─── Change notifications: every mounted useCoupons() refetches after a write ────────────
const listeners = new Set()
let cache = null
export function notifyCouponsChanged() {
  listeners.forEach((fn) => fn())
}

export async function fetchCoupons() {
  const { data, error } = await supabase
    .from('coupons')
    .select('*')
    .order('sort', { ascending: true })
    .order('created_at', { ascending: false })
  if (error) throw error
  return data ?? []
}

/**
 * All coupons: `{ status, rows, error, loading, refetch }`. `status` is
 * 'off' | 'loading' | 'error' | 'ready'; `rows` keeps the last good data while refetching.
 */
export function useCoupons() {
  const [state, setState] = useState(() => (
    isSupabaseConfigured
      ? { status: cache ? 'ready' : 'loading', rows: cache ?? [], error: '' }
      : { status: 'off', rows: [], error: '' }
  ))
  const [version, setVersion] = useState(0)
  const refetch = useCallback(() => setVersion((n) => n + 1), [])

  useEffect(() => {
    listeners.add(refetch)
    return () => { listeners.delete(refetch) }
  }, [refetch])

  useEffect(() => {
    if (!isSupabaseConfigured) return
    let cancelled = false
    fetchCoupons()
      .then((rows) => {
        cache = rows
        if (!cancelled) setState({ status: 'ready', rows, error: '' })
      })
      .catch((e) => {
        if (!cancelled) setState((st) => ({ status: 'error', rows: st.rows, error: e?.message || 'Unknown error' }))
      })
    return () => { cancelled = true }
  }, [version])

  return { ...state, loading: state.status === 'loading', refetch }
}

// ─── Writes ──────────────────────────────────────────────────────────────────────────────
function friendly(error) {
  if (error.code === '23505') {
    const e = new Error('This code already exists')
    e.duplicate = true
    return e
  }
  if (error.code === '23503') return new Error('That category no longer exists')
  if (error.code === '23514') return new Error('Some values aren’t allowed · check the discount, dates and code')
  if (error.code === '42501') return new Error('You don’t have permission to change coupons')
  return error instanceof Error ? error : new Error(error.message || 'Unknown error')
}

export async function createCoupon(row) {
  try {
    const { data, error } = await supabase.from('coupons').insert(row).select().single()
    if (error) throw friendly(error)
    return data
  } finally {
    notifyCouponsChanged()
  }
}

export async function updateCoupon(id, patch) {
  try {
    const { data, error } = await supabase.from('coupons').update(patch).eq('id', id).select()
    if (error) throw friendly(error)
    if (!data?.length) throw new Error('This coupon no longer exists or you don’t have permission to change it')
    return data[0]
  } finally {
    notifyCouponsChanged()
  }
}

export const setCouponActive = (id, active) => updateCoupon(id, { active })

export async function deleteCoupon(id) {
  try {
    const { data, error } = await supabase.from('coupons').delete().eq('id', id).select('id')
    if (error) throw friendly(error)
    if (!data?.length) throw new Error('This coupon no longer exists or you don’t have permission to delete it')
  } finally {
    notifyCouponsChanged()
  }
}
