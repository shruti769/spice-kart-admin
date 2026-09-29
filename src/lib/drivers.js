import { useCallback, useEffect, useRef, useState } from 'react'
import { isSupabaseConfigured, supabase } from './supabase'
import { useRealtime } from './notifications'

// Delivery board: drivers + open orders + recent deliveries (schema: supabase/orders.sql,
// supabase/admin_data.sql). There is no rider app yet, so drivers have no live GPS position;
// everything here comes from orders.driver_id / status / promised_by / delivered_at.

function friendly(error) {
  const msg = error?.message || ''
  if (error.code === '42P01' || error.code === 'PGRST205' || (error.code === '42703' && msg.includes('driver'))) {
    return new Error('Drivers aren’t set up yet · run supabase/admin_data.sql in the Supabase SQL Editor')
  }
  if (error.code === 'PGRST202') return new Error('This needs supabase/admin_data.sql · run it in the Supabase SQL Editor')
  if (error.code === '23514') return new Error('Some driver details aren’t valid · check the name (max 80), phone (max 20), vehicle and zone')
  if (error.code === '42501') return new Error('You don’t have permission to do that')
  return error instanceof Error ? error : new Error(msg || 'Unknown error')
}

const must = ({ data, error }) => {
  if (error) throw friendly(error)
  return data
}

export const OPEN_STATUSES = ['placed', 'confirmed', 'picking', 'packed', 'out_for_delivery']
const OPEN_BASE = 'id, number, status, delivery_type, slot_label, promised_by, placed_at, address_line, address_area, postcode, driver_id, assigned_at, total, customer:customers(first_name, last_name, mobile)'
const PINS = ', delivery_lat, delivery_lng'

const DAY = 864e5
export const startOfDay = (t) => { const d = new Date(t); return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime() }
/** Monday 00:00 of the week containing `t` (local time). */
export const startOfWeek = (t) => { const d = new Date(startOfDay(t)); return d.getTime() - ((d.getDay() + 6) % 7) * DAY }

async function loadBoard() {
  const since = new Date(startOfWeek(Date.now()) - 7 * DAY).toISOString()
  const openQuery = (cols) => supabase.from('orders').select(cols).in('status', OPEN_STATUSES).order('promised_by', { ascending: true, nullsFirst: false }).limit(500)
  const [drivers, openRes, delivered] = await Promise.all([
    supabase.from('drivers').select('*').order('name').then(must),
    openQuery(OPEN_BASE + PINS),
    supabase.from('orders').select('id, driver_id, delivery_type, placed_at, delivered_at, promised_by, address_area')
      .eq('status', 'delivered').gte('delivered_at', since).limit(5000).then(must),
  ])
  let open = openRes
  // delivery_lat / delivery_lng come from the customer app's delivery-area migration; load without them if it hasn't run.
  let hasPins = true
  if (open.error && (open.error.message || '').includes('delivery_l')) {
    open = await openQuery(OPEN_BASE)
    hasPins = false
  }
  return { drivers, open: must(open), delivered, hasPins }
}

/** `{ status, data, error, loading, refetch, updatedAt }`, refetched (debounced) on orders / drivers changes. */
export function useDeliveryBoard() {
  const [state, setState] = useState(() => ({ status: isSupabaseConfigured ? 'loading' : 'off', data: null, error: '', updatedAt: null }))
  const [version, setVersion] = useState(0)
  const refetch = useCallback(() => setVersion((n) => n + 1), [])
  const timer = useRef(null)
  useRealtime(['orders', 'drivers'], () => {
    clearTimeout(timer.current)
    timer.current = setTimeout(refetch, 300)
  })
  useEffect(() => () => clearTimeout(timer.current), [])
  useEffect(() => {
    if (!isSupabaseConfigured) return
    let cancelled = false
    loadBoard()
      .then((data) => { if (!cancelled) setState({ status: 'ready', data, error: '', updatedAt: Date.now() }) })
      .catch((e) => { if (!cancelled) setState((st) => ({ ...st, status: 'error', error: friendly(e).message })) })
    return () => { cancelled = true }
  }, [version])
  return { ...state, loading: state.status === 'loading', refetch }
}

// ─── Derived numbers ─────────────────────────────────────────────────────────────────────
const avg = (xs) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : null)
const mins = (a, b) => (new Date(b).getTime() - new Date(a).getTime()) / 60000
const onTimeRate = (rows) => {
  const withEta = rows.filter((o) => o.promised_by)
  return withEta.length ? (100 * withEta.filter((o) => new Date(o.delivered_at) <= new Date(o.promised_by)).length) / withEta.length : null
}
export const isLate = (o, now) => Boolean(o.promised_by) && new Date(o.promised_by).getTime() < now
const area = (o) => (o.address_area || '').trim() || 'Unknown area'

/** Everything the Delivery page shows, from `useDeliveryBoard().data` at time `now`. */
export function computeBoard(data, now) {
  const drivers = data?.drivers ?? []
  const open = data?.open ?? []
  const delivered = data?.delivered ?? []
  const today = startOfDay(now)
  const yesterday = today - DAY
  const week = startOfWeek(now)
  const lastWeek = week - 7 * DAY

  const byId = Object.fromEntries(drivers.map((d) => [d.id, d]))
  const load = {}
  const lateLoad = {}
  const doneToday = {}
  const doneWeek = {}
  for (const o of open) {
    if (!o.driver_id) continue
    load[o.driver_id] = (load[o.driver_id] || 0) + 1
    if (isLate(o, now)) lateLoad[o.driver_id] = (lateLoad[o.driver_id] || 0) + 1
  }
  const at = (o) => new Date(o.delivered_at).getTime()
  const todays = delivered.filter((o) => at(o) >= today)
  for (const o of delivered) {
    if (!o.driver_id) continue
    if (at(o) >= today) doneToday[o.driver_id] = (doneToday[o.driver_id] || 0) + 1
    if (at(o) >= week) doneWeek[o.driver_id] = (doneWeek[o.driver_id] || 0) + 1
  }

  const active = drivers.filter((d) => d.status === 'active')
  const available = active.filter((d) => !load[d.id])
  const busy = active.filter((d) => load[d.id])
  const delayed = open.filter((o) => isLate(o, now))
  const areaCounts = (rows) => {
    const m = {}
    for (const o of rows) m[area(o)] = (m[area(o)] || 0) + 1
    return Object.entries(m).sort((a, b) => b[1] - a[1])
  }

  const expressMins = (rows) => avg(rows.filter((o) => o.delivery_type === 'express').map((o) => mins(o.placed_at, o.delivered_at)))
  const zones = areaCounts(open).map(([name]) => name)
  const perZone = {}
  for (const o of [...open, ...todays]) {
    const k = area(o)
    perZone[k] ??= { name: k, active: 0, today: [] }
    if (o.delivered_at) perZone[k].today.push(o)
    else perZone[k].active += 1
  }
  const zonePerf = Object.values(perZone)
    .map((z) => ({ name: z.name, active: z.active, delivered: z.today.length, avgMin: expressMins(z.today), onTime: onTimeRate(z.today) }))
    .sort((a, b) => (b.active + b.delivered) - (a.active + a.delivered))

  return {
    byId,
    load,
    lateLoad,
    doneToday,
    doneWeek,
    active,
    available,
    busy,
    onRoad: open.filter((o) => o.status === 'out_for_delivery'),
    delayed,
    unassigned: open.filter((o) => !o.driver_id),
    delayedAreas: areaCounts(delayed).map(([name]) => name),
    avgStops: busy.length ? busy.reduce((n, d) => n + load[d.id], 0) / busy.length : null,
    avgToday: expressMins(todays),
    avgYesterday: expressMins(delivered.filter((o) => at(o) >= yesterday && at(o) < today)),
    onTimeWeek: onTimeRate(delivered.filter((o) => at(o) >= week)),
    onTimeLastWeek: onTimeRate(delivered.filter((o) => at(o) >= lastWeek && at(o) < week)),
    zones,
    zonePerf,
  }
}

/** Minutes until `promised_by` (negative = late), or null without a promise. */
export const minutesLeft = (o, now) => (o.promised_by ? Math.round((new Date(o.promised_by).getTime() - now) / 60000) : null)
export const driverInitials = (name) => ((name || '').trim().split(/\s+/).map((w) => w[0]).join('').slice(0, 2) || '?').toUpperCase()

// ─── One driver (Driver detail page) ─────────────────────────────────────────────────────
const HISTORY_COLS = 'id, number, status, delivery_type, promised_by, placed_at, assigned_at, delivered_at, address_line, address_area, total, driver_id, customer_id, customer:customers(first_name, last_name, mobile)'
/** Start of the calendar month before the one containing `t` (local time). */
const startOfLastMonth = (t) => { const d = new Date(t); return new Date(d.getFullYear(), d.getMonth() - 1, 1).getTime() }

async function loadDriver(id) {
  const since = new Date(startOfLastMonth(Date.now())).toISOString()
  const [driver, drivers, open, delivered, deliveredTotal, lastAssigned] = await Promise.all([
    supabase.from('drivers').select('*').eq('id', id).maybeSingle().then(must),
    supabase.from('drivers').select('*').order('name').then(must),
    // All open orders: this driver's current ones, the unassigned ones (Assign order) and everyone's load.
    supabase.from('orders').select(OPEN_BASE + ', customer_id').in('status', OPEN_STATUSES)
      .order('promised_by', { ascending: true, nullsFirst: false }).limit(1000).then(must),
    supabase.from('orders').select(HISTORY_COLS).eq('driver_id', id).eq('status', 'delivered').gte('delivered_at', since)
      .order('delivered_at', { ascending: false }).limit(5000).then(must),
    supabase.from('orders').select('id', { count: 'exact', head: true }).eq('driver_id', id).eq('status', 'delivered')
      .then((r) => { if (r.error) throw friendly(r.error); return r.count ?? 0 }),
    supabase.from('orders').select('assigned_at').eq('driver_id', id).not('assigned_at', 'is', null)
      .order('assigned_at', { ascending: false }).limit(1).then(must),
  ])
  return { driver, drivers, open, delivered, deliveredTotal, lastAssignedAt: lastAssigned?.[0]?.assigned_at ?? null }
}

/** `{ status: 'off'|'loading'|'ready'|'missing'|'error', data, error, refetch }` for one driver, live on orders / drivers. */
export function useDriverDetail(id) {
  const [state, setState] = useState(() => ({ key: null, status: 'loading', data: null, error: '' }))
  const [version, setVersion] = useState(0)
  const refetch = useCallback(() => setVersion((n) => n + 1), [])
  const timer = useRef(null)
  useRealtime(['orders', 'drivers'], () => {
    clearTimeout(timer.current)
    timer.current = setTimeout(refetch, 300)
  })
  useEffect(() => () => clearTimeout(timer.current), [])
  useEffect(() => {
    if (!id || !isSupabaseConfigured) return
    let cancelled = false
    loadDriver(id)
      .then((data) => { if (!cancelled) setState({ key: id, status: data.driver ? 'ready' : 'missing', data, error: '' }) })
      .catch((e) => { if (!cancelled) setState((st) => ({ ...st, key: id, status: st.key === id && st.data ? 'ready' : 'error', error: friendly(e).message })) })
    return () => { cancelled = true }
  }, [id, version])
  if (!isSupabaseConfigured) return { status: 'off', data: null, error: '', refetch }
  // A different driver than the one loaded: show loading rather than the previous driver.
  if (state.key !== id) return { status: 'loading', data: null, error: '', refetch }
  return { ...state, refetch }
}

/** Numbers for the Driver detail page from `useDriverDetail().data` at time `now`. */
export function computeDriver(data, now) {
  const id = data.driver.id
  const mine = data.open.filter((o) => o.driver_id === id)
  const delivered = data.delivered
  const at = (o) => new Date(o.delivered_at).getTime()
  const today = startOfDay(now)
  const week = startOfWeek(now)
  const lastWeek = week - 7 * DAY
  const d = new Date(now)
  const month = new Date(d.getFullYear(), d.getMonth(), 1).getTime()
  const lastMonth = startOfLastMonth(now)
  const between = (a, b) => delivered.filter((o) => at(o) >= a && at(o) < b)
  const thisMonth = delivered.filter((o) => at(o) >= month)
  const expressThisMonth = thisMonth.filter((o) => o.delivery_type === 'express')
  const load = {}
  for (const o of data.open) if (o.driver_id) load[o.driver_id] = (load[o.driver_id] || 0) + 1
  // Deliveries per local day, oldest first, last 14 days including today.
  const days = Array.from({ length: 14 }, (_, i) => {
    const start = new Date(d.getFullYear(), d.getMonth(), d.getDate() - (13 - i)).getTime()
    const end = new Date(d.getFullYear(), d.getMonth(), d.getDate() - (12 - i)).getTime()
    return { start, count: between(start, end).length }
  })
  return {
    mine,
    late: mine.filter((o) => isLate(o, now)).length,
    unassigned: data.open.filter((o) => !o.driver_id),
    load,
    today: delivered.filter((o) => at(o) >= today).length,
    week: delivered.filter((o) => at(o) >= week).length,
    lastWeek: between(lastWeek, week).length,
    onTimeMonth: onTimeRate(thisMonth),
    onTimeLastMonth: onTimeRate(between(lastMonth, month)),
    avgExpressMin: avgMinutes(expressThisMonth),
    expressCount: expressThisMonth.length,
    days,
    lastDeliveredAt: delivered[0]?.delivered_at ?? null,
  }
}
const avgMinutes = (rows) => avg(rows.map((o) => mins(o.placed_at, o.delivered_at)))

// ─── Writes ──────────────────────────────────────────────────────────────────────────────
/** Sets (or clears, with null) the driver of the given orders. Returns how many changed. */
export async function assignDriver(orderIds, driverId) {
  const data = must(await supabase.from('orders').update({ driver_id: driverId }).in('id', orderIds).select('id'))
  if (!data?.length) throw new Error('These orders no longer exist or you don’t have permission to change them')
  return data.length
}

/** Creates a driver (without `id`) or updates one. Returns the saved row. */
export async function saveDriver(id, row) {
  const clean = {
    ...row,
    ...(row.name !== undefined ? { name: row.name.trim() } : null),
    ...(row.phone !== undefined ? { phone: row.phone.trim() || null } : null),
    ...(row.vehicle !== undefined ? { vehicle: row.vehicle.trim() } : null),
    ...(row.zone !== undefined ? { zone: row.zone.trim() } : null),
  }
  const res = id
    ? await supabase.from('drivers').update(clean).eq('id', id).select()
    : await supabase.from('drivers').insert(clean).select()
  const data = must(res)
  if (!data?.length) throw new Error('This driver no longer exists or you don’t have permission to change it')
  return data[0]
}

export const setDriverStatus = (id, status) => saveDriver(id, { status })

/** Moves delayed orders to the least-busy active driver. Returns how many moved. */
export const autoReassignDelayed = async () => must(await supabase.rpc('auto_reassign_delayed')) ?? 0
/** Sends the "running late" notice (once per order per hour). Returns how many customers were told. */
export const notifyDelayedCustomers = async () => must(await supabase.rpc('notify_delayed_customers')) ?? 0

/** "+61 412 887 001" for Australian mobiles, else as entered. */
export function phoneLabel(p) {
  const d = (p || '').replace(/[^\d+]/g, '')
  const m = d.match(/^(?:\+?61|0)(4\d{8})$/)
  if (m) return `+61 ${m[1].slice(0, 3)} ${m[1].slice(3, 6)} ${m[1].slice(6)}`
  return p || ''
}
export const telHref = (p) => `tel:${(p || '').replace(/[^\d+]/g, '')}`
