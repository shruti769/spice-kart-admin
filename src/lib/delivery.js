import { useCallback, useEffect, useState } from 'react'
import { isSupabaseConfigured, supabase } from './supabase'
import { DAYS } from './slotDates'

// Delivery settings (`public.delivery_settings`, one row) and weekly slots (`public.delivery_slots`).
// The customer app reads both for the
// cart's bill and the checkout's delivery time.

export const SETTINGS_DEFAULTS = {
  express_fee: 3.99,
  express_eta_minutes: 25,
  scheduled_fee: 2.99,
  handling_fee: 0.99,
  free_delivery_over: 50,
  book_ahead_days: 7,
  cutoff_minutes: 60,
}

const toSettings = (r) => ({
  ...SETTINGS_DEFAULTS,
  ...(r && {
    express_fee: Number(r.express_fee),
    express_eta_minutes: r.express_eta_minutes,
    scheduled_fee: Number(r.scheduled_fee),
    handling_fee: Number(r.handling_fee),
    free_delivery_over: Number(r.free_delivery_over),
    book_ahead_days: r.book_ahead_days,
    cutoff_minutes: r.cutoff_minutes,
  }),
})

/** DB row → the slot shape the Settings card uses. */
const toSlot = (r) => ({ id: r.id, weekday: r.weekday, start: r.start_min, end: r.end_min, capacity: r.capacity, fee: r.fee == null ? null : Number(r.fee), active: r.active })

function friendly(error) {
  if (error.code === '42501') return new Error('You don’t have permission to change delivery settings')
  if (error.code === '23514') return new Error('Some values aren’t allowed · check fees, times and capacity')
  return error instanceof Error ? error : new Error(error.message || 'Unknown error')
}

// ─── Shared fetch + change notifications (every mounted hook refetches after a write) ─────
function createResource(fetcher, empty) {
  const listeners = new Set()
  let cache = null
  const notify = () => listeners.forEach((fn) => fn())

  function useResource() {
    const [state, setState] = useState(() => (
      isSupabaseConfigured
        ? { status: cache ? 'ready' : 'loading', data: cache ?? empty, error: '' }
        : { status: 'off', data: empty, error: '' }
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
      fetcher()
        .then((data) => {
          cache = data
          if (!cancelled) setState({ status: 'ready', data, error: '' })
        })
        .catch((e) => {
          if (!cancelled) setState((st) => ({ status: 'error', data: st.data, error: e?.message || 'Unknown error' }))
        })
      return () => { cancelled = true }
    }, [version])

    return { ...state, loading: state.status === 'loading', refetch }
  }

  return { useResource, notify }
}

// ─── Settings ────────────────────────────────────────────────────────────────────────────
const settingsRes = createResource(async () => {
  const { data, error } = await supabase.from('delivery_settings').select('*').eq('id', 1).maybeSingle()
  if (error) throw friendly(error)
  return toSettings(data)
}, SETTINGS_DEFAULTS)

/** `{ status, data: settings, error, loading, refetch }` */
export const useDeliverySettings = settingsRes.useResource

export async function updateDeliverySettings(patch) {
  try {
    // The row is created by the migration, so this is always an update.
    const { data, error } = await supabase.from('delivery_settings').update(patch).eq('id', 1).select()
    if (error) throw friendly(error)
    if (!data?.length) throw new Error('Delivery settings are missing or you don’t have permission to change them · run the delivery migration')
    return toSettings(data[0])
  } finally {
    settingsRes.notify()
  }
}

// ─── Slots ───────────────────────────────────────────────────────────────────────────────
const emptySchedule = { slots: Object.fromEntries(DAYS.map((d) => [d, []])) }

const scheduleRes = createResource(async () => {
  const { data, error } = await supabase.from('delivery_slots').select('*').order('start_min')
  if (error) throw friendly(error)
  const byDay = Object.fromEntries(DAYS.map((d) => [d, []]))
  for (const r of data ?? []) byDay[r.weekday]?.push(toSlot(r))
  return { slots: byDay }
}, emptySchedule)

/** `{ status, data: { slots: { Mon: [slot] … } }, error, loading, refetch }` */
export const useDeliverySchedule = scheduleRes.useResource

async function write(run) {
  try {
    const { data, error } = await run()
    if (error) throw friendly(error)
    return data
  } finally {
    scheduleRes.notify()
  }
}

const slotRow = (s) => ({ start_min: s.start, end_min: s.end, capacity: s.capacity, fee: s.fee })

/** Adds the slot `{ start, end, capacity, fee }` to each of `days`. */
export const createSlots = (slot, days) =>
  write(() => supabase.from('delivery_slots').insert(days.map((weekday) => ({ ...slotRow(slot), weekday, active: true }))).select('id'))

export const updateSlot = (id, patch) => {
  const row = {}
  if ('start' in patch) row.start_min = patch.start
  if ('end' in patch) row.end_min = patch.end
  if ('capacity' in patch) row.capacity = patch.capacity
  if ('fee' in patch) row.fee = patch.fee
  if ('active' in patch) row.active = patch.active
  return write(() => supabase.from('delivery_slots').update(row).eq('id', id).select('id'))
}

export const deleteSlot = (id) => write(() => supabase.from('delivery_slots').delete().eq('id', id).select('id'))

/** Replaces every other day's slots with copies of `day`'s slots. */
export async function copySlotsToAllDays(day, slots) {
  const others = DAYS.filter((d) => d !== day)
  await write(() => supabase.from('delivery_slots').delete().in('weekday', others).select('id'))
  if (!slots.length) return
  await write(() => supabase.from('delivery_slots').insert(others.flatMap((weekday) => slots.map((s) => ({ ...slotRow(s), weekday, active: s.active })))).select('id'))
}
