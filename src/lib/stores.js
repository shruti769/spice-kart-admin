import { useCallback, useEffect, useState } from 'react'
import { isSupabaseConfigured, supabase } from './supabase'

// The store customers buy from: the single primary row of `public.stores` (schema:
// supabase/stores.sql). Every new order is linked to it by the database.

export const AU_STATES = ['VIC', 'NSW', 'QLD', 'SA', 'WA', 'TAS', 'ACT', 'NT']

function friendly(error) {
  if (error.code === '42P01' || error.code === 'PGRST205') return new Error('The stores table doesn’t exist yet · run supabase/stores.sql in the Supabase SQL Editor')
  if (error.code === '23514') return new Error('Some store details aren’t valid · check the email, ABN and postcode')
  if (error.code === '42501') return new Error('You don’t have permission to change the store')
  return error instanceof Error ? error : new Error(error.message || 'Unknown error')
}

const listeners = new Set()
let cache // undefined = not loaded, null = no store yet

/** The primary store: `{ status, store, error, loading }`; `store` is null until one is added. */
export function useStore() {
  const [state, setState] = useState(() => (
    !isSupabaseConfigured ? { status: 'off', store: null, error: '' }
      : cache !== undefined ? { status: 'ready', store: cache, error: '' }
        : { status: 'loading', store: null, error: '' }
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
    supabase.from('stores').select('*').eq('is_primary', true).maybeSingle().then(({ data, error }) => {
      if (cancelled) return
      if (error) setState((st) => ({ status: 'error', store: st.store, error: friendly(error).message }))
      else {
        cache = data
        setState({ status: 'ready', store: data, error: '' })
      }
    })
    return () => { cancelled = true }
  }, [version])
  return { ...state, loading: state.status === 'loading', refetch }
}

/** Creates the store (when `id` is null) or updates it. */
export async function saveStore(id, row) {
  try {
    const { data, error } = id
      ? await supabase.from('stores').update(row).eq('id', id).select()
      : await supabase.from('stores').insert({ ...row, is_primary: true }).select()
    if (error) throw friendly(error)
    if (!data?.length) throw new Error('The store no longer exists or you don’t have permission to change it')
    return data[0]
  } finally {
    listeners.forEach((fn) => fn())
  }
}

/** "118 Smith Street, Collingwood VIC 3066" */
export const storeAddress = (s) => [s?.address_line, [s?.suburb, s?.state, s?.postcode].filter(Boolean).join(' ')].filter(Boolean).join(', ')
