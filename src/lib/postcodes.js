import { useCallback, useEffect, useState } from 'react'
import { isSupabaseConfigured, supabase } from './supabase'

// Delivery area: the postcodes the store delivers to (`public.delivery_postcodes`, from the
// customer app's 20260930000000_delivery_area.sql). The app checks addresses against the active
// ones and `place_order()` refuses the rest. With no active postcodes, every postcode is allowed.

const listeners = new Set()
const notify = () => listeners.forEach((fn) => fn())

function friendly(error) {
  if (error.code === '42501') return new Error('You don’t have permission to change the delivery area')
  if (error.code === '23505') return new Error('That postcode is already in the list')
  if (error.code === '42P01' || error.code === 'PGRST205') return new Error('Delivery area isn’t set up yet · run the customer app’s delivery_area migration')
  return new Error(error.message || 'Unknown error')
}

/** `{ status, data: [{ postcode, suburb, active }], error, loading }`, sorted by postcode. */
export function useDeliveryPostcodes() {
  const [state, setState] = useState({ status: isSupabaseConfigured ? 'loading' : 'off', data: [], error: '' })
  const [version, setVersion] = useState(0)
  const refetch = useCallback(() => setVersion((n) => n + 1), [])

  useEffect(() => {
    listeners.add(refetch)
    return () => { listeners.delete(refetch) }
  }, [refetch])

  useEffect(() => {
    if (!isSupabaseConfigured) return
    let cancelled = false
    supabase.from('delivery_postcodes').select('postcode, suburb, active').order('postcode').then(({ data, error }) => {
      if (cancelled) return
      if (error) setState((st) => ({ status: 'error', data: st.data, error: friendly(error).message }))
      else setState({ status: 'ready', data: data ?? [], error: '' })
    })
    return () => { cancelled = true }
  }, [version])

  return { ...state, loading: state.status === 'loading' }
}

async function write(run) {
  try {
    const { error } = await run()
    if (error) throw friendly(error)
  } finally {
    notify()
  }
}

/** Adds `[{ postcode, suburb }]` (existing postcodes are switched back on and keep their suburb unless one is given). */
export function addPostcodes(rows) {
  // Leave `suburb` out entirely when none is given, so re-adding a postcode doesn't blank it.
  const withSuburb = rows.some((r) => r.suburb)
  return write(() =>
    supabase.from('delivery_postcodes').upsert(
      rows.map((r) => ({ postcode: r.postcode, active: true, ...(withSuburb && { suburb: r.suburb ?? '' }) })),
      { onConflict: 'postcode' },
    ),
  )
}

export const setPostcodeActive = (postcode, active) => write(() => supabase.from('delivery_postcodes').update({ active }).eq('postcode', postcode))

export const removePostcode = (postcode) => write(() => supabase.from('delivery_postcodes').delete().eq('postcode', postcode))

/** "3000, 3004 3168\n3181" → ['3000', '3004', '3168', '3181'] plus anything that isn't a 4-digit postcode. */
export function parsePostcodes(text) {
  const parts = text.split(/[\s,;]+/).map((s) => s.trim()).filter(Boolean)
  const valid = [...new Set(parts.filter((p) => /^\d{4}$/.test(p)))]
  return { valid, invalid: parts.filter((p) => !/^\d{4}$/.test(p)) }
}
