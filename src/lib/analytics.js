import { useCallback, useEffect, useRef, useState } from 'react'
import { isSupabaseConfigured, supabase } from './supabase'
import { useRealtime } from './notifications'
import { isLowStock, isOutOfStock } from './products'

// Dashboard + Analytics numbers (schema: supabase/orders.sql + the admin_* RPCs in supabase/admin_data.sql).
// Days are Melbourne days; everything refetches live through Supabase Realtime.

const TZ = 'Australia/Melbourne'
const LIVE_TABLES = ['orders', 'order_items', 'customers', 'products', 'admin_alerts']

function friendly(error) {
  if (error.code === 'PGRST202' || error.code === '42883') return new Error('Dashboard numbers need supabase/admin_data.sql · run it in the Supabase SQL Editor')
  if (error.code === '42P01' || error.code === 'PGRST205') return new Error('Orders aren’t set up yet · run supabase/orders.sql in the Supabase SQL Editor')
  if (error.code === '42501') return new Error('Only admins can see these numbers')
  return error instanceof Error ? error : new Error(error.message || 'Unknown error')
}

const must = ({ data, error, count }) => {
  if (error) throw friendly(error)
  return count ?? data
}

// ═══ Melbourne dates ═════════════════════════════════════════════════════════════════════
const partsFmt = new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23' })
function melbParts(date) {
  const p = Object.fromEntries(partsFmt.formatToParts(date).map((x) => [x.type, x.value]))
  return { y: +p.year, m: +p.month, d: +p.day, h: +p.hour % 24, min: +p.minute, s: +p.second }
}
/** Melbourne UTC offset (ms) at `date`. */
function offsetMs(date) {
  const p = melbParts(date)
  return Date.UTC(p.y, p.m - 1, p.d, p.h, p.min, p.s) - Math.floor(date.getTime() / 1000) * 1000
}
const pad = (n) => String(n).padStart(2, '0')

/** Today's Melbourne date as 'YYYY-MM-DD'. */
export function melbToday(now = Date.now()) {
  const p = melbParts(new Date(now))
  return `${p.y}-${pad(p.m)}-${pad(p.d)}`
}
/** The current hour (0-23) in Melbourne. */
export const melbHour = (now = Date.now()) => melbParts(new Date(now)).h
/** The instant a Melbourne day ('YYYY-MM-DD') starts. */
export function melbStart(ymd) {
  const [y, m, d] = ymd.split('-').map(Number)
  const guess = Date.UTC(y, m - 1, d)
  let t = guess - offsetMs(new Date(guess))
  t = guess - offsetMs(new Date(t))
  return new Date(t)
}
export function addDays(ymd, n) {
  const [y, m, d] = ymd.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d + n)).toISOString().slice(0, 10)
}
const daysBetween = (a, b) => Math.round((Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`)) / 864e5)
/** "22 Aug" (or "Aug 25" style with `year`). */
export function dayLabel(ymd, opts = {}) {
  return new Date(`${ymd}T00:00:00Z`).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', ...(opts.year ? { year: 'numeric' } : {}), timeZone: 'UTC' })
}
/** "Monday, 21 September 2026" in Melbourne. */
export const longDate = (now = Date.now()) => new Date(now).toLocaleDateString('en-AU', { timeZone: TZ, weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
/** "Good morning" / "Good afternoon" / "Good evening" by the Melbourne clock. */
export function greeting(now = Date.now()) {
  const h = melbHour(now)
  return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening'
}
/** "12:42 PM" today, else "24 Sep". */
export function shortTime(iso, now = Date.now()) {
  const d = new Date(iso)
  if (melbToday(d.getTime()) === melbToday(now)) return d.toLocaleTimeString('en-AU', { timeZone: TZ, hour: 'numeric', minute: '2-digit' })
  return d.toLocaleDateString('en-AU', { timeZone: TZ, day: 'numeric', month: 'short' })
}

/** Ticks every `ms` so pages can re-derive "now" / "today" without calling Date.now() in render. */
export function useClock(ms = 30000) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), ms)
    return () => clearInterval(t)
  }, [ms])
  return now
}

const RANGE_DAYS = { today: 1, '7d': 7, '30d': 30, '3m': 90, '90d': 90, '12m': 365 }
const RANGE_LABEL = { today: 'Today', '7d': 'Last 7 days', '30d': 'Last 30 days', '3m': 'Last 3 months', '90d': 'Last 90 days', '12m': 'Last 12 months' }

/**
 * `{ fromDay, toDay (inclusive), from, to (ISO, [from, to)), days, label }` for a range key,
 * relative to Melbourne `today`; 'custom' uses `custom = { from, to }` ('YYYY-MM-DD', inclusive).
 */
export function rangeFor(key, today, custom) {
  let fromDay, toDay
  if (key === 'custom' && custom?.from && custom?.to) {
    ;[fromDay, toDay] = custom.from <= custom.to ? [custom.from, custom.to] : [custom.to, custom.from]
  } else {
    toDay = today
    fromDay = addDays(today, -((RANGE_DAYS[key] ?? 7) - 1))
  }
  const days = daysBetween(fromDay, toDay) + 1
  const sameYear = fromDay.slice(0, 4) === toDay.slice(0, 4)
  const label = key === 'custom'
    ? (fromDay === toDay ? dayLabel(fromDay, { year: true }) : `${dayLabel(fromDay, { year: !sameYear })} – ${dayLabel(toDay, { year: true })}`)
    : RANGE_LABEL[key]
  return { key, fromDay, toDay, from: melbStart(fromDay).toISOString(), to: melbStart(addDays(toDay, 1)).toISOString(), days, label }
}

// ═══ Formatting ══════════════════════════════════════════════════════════════════════════
export const aud = (n, dp = 2) => Number(n || 0).toLocaleString('en-AU', { style: 'currency', currency: 'AUD', minimumFractionDigits: dp, maximumFractionDigits: dp })
/** "$0.00", "$842.50", "$38,420", "$284K", "$1.12M" */
export function audShort(n) {
  n = Number(n) || 0
  const a = Math.abs(n)
  if (a >= 1e6) return `$${(n / 1e6).toFixed(2)}M`
  if (a >= 1e5) return `$${Math.round(n / 1e3)}K`
  if (a >= 1e4) return aud(n, 0)
  return aud(n)
}
export const num = (n) => Number(n || 0).toLocaleString('en-AU')
export const pct = (n) => (n == null ? '—' : `${Number(n).toFixed(1)}%`)
/** part / whole as a percentage, or null when whole is 0. */
export const ratio = (part, whole) => (Number(whole) > 0 ? (100 * Number(part || 0)) / Number(whole) : null)

/** [fg, bg] for a change pill. */
export const TONE = { good: ['#0B6B33', '#E9F6E3'], bad: ['#A93826', '#FAEDEA'], flat: ['#7C8A81', '#EEF0EC'] }

/**
 * Change between two values: `{ text, tone }`.
 * mode 'pct' = relative % change; 'pp' = percentage points; 'money' = $ difference; 'min' = minutes.
 */
export function change(cur, prev, { mode = 'pct', upIsGood = true } = {}) {
  if (cur == null) return { text: 'No data yet', tone: 'flat' }
  if (prev == null) return { text: 'No prior data', tone: 'flat' }
  cur = Number(cur) || 0
  prev = Number(prev) || 0
  if (mode === 'pct' && prev === 0) {
    return cur === 0 ? { text: 'No change', tone: 'flat' } : { text: '▲ from 0', tone: upIsGood ? 'good' : 'bad' }
  }
  const d = mode === 'pct' ? ((cur - prev) / prev) * 100 : cur - prev
  if (Math.abs(d) < 0.05) return { text: 'No change', tone: 'flat' }
  const up = d > 0
  const mag = mode === 'money' ? aud(Math.abs(d)) : mode === 'min' ? `${Math.abs(d).toFixed(1)} min` : `${Math.abs(d).toFixed(1)}%`
  return { text: `${up ? '▲' : '▼'} ${mag}`, tone: up === upIsGood ? 'good' : 'bad' }
}

/** SVG polyline points for a 320×110 chart (baseline y=100, peak y=14). */
export function linePoints(values, max = Math.max(0, ...values)) {
  if (!values.length) return '4,100 316,100'
  const y = (v) => (max > 0 ? 100 - (Number(v) / max) * 86 : 100).toFixed(1)
  if (values.length === 1) return `4,${y(values[0])} 316,${y(values[0])}`
  const step = 312 / (values.length - 1)
  return values.map((v, i) => `${(4 + i * step).toFixed(1)},${y(v)}`).join(' ')
}

/** Downloads rows (arrays of cells) as a CSV file. */
export function downloadCsv(filename, rows) {
  const esc = (v) => {
    const s = v == null ? '' : String(v)
    return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
  }
  const blob = new Blob([`${String.fromCharCode(0xfeff)}${rows.map((r) => r.map(esc).join(',')).join('\r\n')}`], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

// ═══ Live loader ═════════════════════════════════════════════════════════════════════════
/** `{ status, data, error, loading, refetch }`; refetched (debounced) on realtime changes and every `pollMs`. */
function useLiveData(load, deps, pollMs = 0) {
  const [state, setState] = useState(() => ({ status: isSupabaseConfigured ? 'loading' : 'off', data: null, error: '' }))
  const [version, setVersion] = useState(0)
  const refetch = useCallback(() => setVersion((n) => n + 1), [])
  const timer = useRef(null)
  useRealtime(LIVE_TABLES, () => {
    clearTimeout(timer.current)
    timer.current = setTimeout(refetch, 300)
  })
  useEffect(() => () => clearTimeout(timer.current), [])
  useEffect(() => {
    if (!isSupabaseConfigured || !pollMs) return
    const t = setInterval(refetch, pollMs)
    return () => clearInterval(t)
  }, [pollMs, refetch])
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

const rpc = (fn, args) => supabase.rpc(fn, args).then(must)
const head = () => supabase.from('orders').select('id', { count: 'exact', head: true })

/** Chart buckets: hourly for a single day, daily up to a month, weekly beyond. */
function bucketSeries(series, range, hourly) {
  if (hourly) return hourly
  const rows = (series ?? []).map((r) => ({ key: r.day, label: dayLabel(r.day), orders: r.orders, revenue: Number(r.revenue) }))
  if (rows.length <= 31) return rows
  const out = []
  for (let end = rows.length; end > 0; end -= 7) {
    const chunk = rows.slice(Math.max(0, end - 7), end)
    out.unshift({
      key: chunk[0].key,
      label: `Week of ${chunk[0].label}`,
      orders: chunk.reduce((n, r) => n + r.orders, 0),
      revenue: chunk.reduce((n, r) => n + r.revenue, 0),
    })
  }
  return out
}

// ═══ Dashboard ═══════════════════════════════════════════════════════════════════════════
/**
 * Everything on the dashboard except the recent-orders table.
 * `today` = Melbourne 'YYYY-MM-DD' (from useClock); `range` = rangeFor(...) for the chart + status panel.
 */
export function useDashboard(today, range) {
  return useLiveData(async () => {
    const todayFrom = melbStart(today).toISOString()
    const todayTo = melbStart(addDays(today, 1)).toISOString()
    const monthFrom = melbStart(addDays(today, -29)).toISOString()
    const single = range.days === 1
    const [kToday, kMonth, kRange, status, series, dayOrders, pending, onRoad, delayed, products] = await Promise.all([
      rpc('admin_kpis', { p_from: todayFrom, p_to: todayTo }),
      rpc('admin_kpis', { p_from: monthFrom, p_to: todayTo }),
      rpc('admin_kpis', { p_from: range.from, p_to: range.to }),
      rpc('admin_status_counts', { p_from: range.from, p_to: range.to }),
      rpc('admin_daily_series', { p_from: range.from, p_to: range.to }),
      single
        ? supabase.from('orders').select('placed_at, total').gte('placed_at', range.from).lt('placed_at', range.to).neq('status', 'cancelled').then(must)
        : null,
      head().in('status', ['placed', 'confirmed']).then(must),
      head().eq('status', 'out_for_delivery').then(must),
      supabase.from('orders').select('id, address_area').not('status', 'in', '(delivered,cancelled)').lt('promised_by', new Date().toISOString()).then(must),
      supabase.from('products').select('id, name, category_id, stock_qty, min_stock, max_stock, track_inventory').eq('track_inventory', true).then(must),
    ])

    let hourly = null
    if (single) {
      const lastHour = range.toDay === today ? melbHour() : 23
      hourly = Array.from({ length: lastHour + 1 }, (_, h) => ({
        key: String(h),
        label: new Date(Date.UTC(2000, 0, 1, h)).toLocaleTimeString('en-AU', { hour: 'numeric', timeZone: 'UTC' }),
        orders: 0,
        revenue: 0,
      }))
      for (const o of dayOrders ?? []) {
        const b = hourly[melbHour(new Date(o.placed_at).getTime())]
        if (b) { b.orders += 1; b.revenue += Number(o.total) }
      }
    }

    const areas = {}
    for (const o of delayed) if (o.address_area) areas[o.address_area] = (areas[o.address_area] || 0) + 1
    const zones = Object.entries(areas).sort((a, b) => b[1] - a[1]).map(([a]) => a)

    const lowStock = products.filter((p) => isLowStock(p) || isOutOfStock(p)).sort((a, b) => a.stock_qty - b.stock_qty)

    return {
      today: kToday,
      month: kMonth,
      range: kRange,
      status: status ?? {},
      series: series ?? [],
      buckets: bucketSeries(series, range, hourly),
      bucketUnit: single ? 'hourly' : (series ?? []).length > 31 ? 'weekly' : 'daily',
      pending,
      onRoad,
      delayed: { count: delayed.length, zones },
      lowStock,
    }
  }, [today, range.from, range.to], 60000)
}

const LIST_SELECT = 'id, number, status, delivery_type, total, payment_method, payment_status, placed_at, address_area, customer:customers(first_name, last_name), order_items(qty)'

/** One page of the latest orders plus the total count. */
export function useRecentOrders(page, pageSize) {
  return useLiveData(async () => {
    const start = page * pageSize
    const res = await supabase.from('orders').select(LIST_SELECT, { count: 'exact' }).order('placed_at', { ascending: false }).range(start, start + pageSize - 1)
    if (res.error) throw friendly(res.error)
    return { rows: res.data ?? [], total: res.count ?? 0 }
  }, [page, pageSize])
}

/** Daily series for the CSV export (fetched on demand). */
export const fetchDailySeries = (range) => rpc('admin_daily_series', { p_from: range.from, p_to: range.to }).then((r) => r ?? [])

// ═══ Analytics ═══════════════════════════════════════════════════════════════════════════
/** Analytics numbers for `range` and the equal period before it. */
export function useAnalytics(range) {
  return useLiveData(async () => {
    const len = Date.parse(range.to) - Date.parse(range.from)
    const prevFrom = new Date(Date.parse(range.from) - len).toISOString()
    const [kpis, series, prevSeries, top, categories, delivery, status, prevStatus] = await Promise.all([
      rpc('admin_kpis', { p_from: range.from, p_to: range.to }),
      rpc('admin_daily_series', { p_from: range.from, p_to: range.to }),
      rpc('admin_daily_series', { p_from: prevFrom, p_to: range.from }),
      rpc('admin_top_products', { p_from: range.from, p_to: range.to, p_limit: 5 }),
      rpc('admin_category_performance', { p_from: range.from, p_to: range.to }),
      rpc('admin_delivery_performance', { p_from: range.from, p_to: range.to }),
      rpc('admin_status_counts', { p_from: range.from, p_to: range.to }),
      rpc('admin_status_counts', { p_from: prevFrom, p_to: range.from }),
    ])
    return {
      kpis,
      series: series ?? [],
      prevSeries: prevSeries ?? [],
      top: top ?? [],
      categories: categories ?? [],
      delivery,
      status: status ?? {},
      prevStatus: prevStatus ?? {},
    }
  }, [range.from, range.to])
}
