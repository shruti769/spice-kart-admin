import { useCallback, useEffect, useState } from 'react'
import { isSupabaseConfigured, supabase } from './supabase'
import { uploadBannerImage, removeBannerImage } from './banners'

// Home screen content (Admin → Content). Schema: supabase/content.sql.
//   featured_categories · featured_products · featured_deals → ordered by `sort`
//   content_settings (one row) · seasonal_collections

function friendly(error) {
  if (error.code === '42P01' || error.code === 'PGRST205') return new Error('This content table doesn’t exist yet · run supabase/content.sql in the Supabase SQL Editor')
  if (error.code === '23505') return new Error('That’s already on the list')
  if (error.code === '23503') return new Error('That item no longer exists')
  if (error.code === '23514') return new Error('Some values aren’t allowed · check the name, text and dates')
  if (error.code === '42501') return new Error('You don’t have permission to change home content')
  return error instanceof Error ? error : new Error(error.message || 'Unknown error')
}

/** One table's rows with `{ status, rows, error, loading, refetch }`; every mounted hook refetches after `notify()`. */
function tableStore(table, order) {
  const listeners = new Set()
  let cache = null
  const notify = () => listeners.forEach((fn) => fn())

  async function fetchRows() {
    let q = supabase.from(table).select('*')
    for (const [col, ascending] of order) q = q.order(col, { ascending })
    const { data, error } = await q
    if (error) throw friendly(error)
    return data ?? []
  }

  function useRows() {
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
      fetchRows()
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

  /** Runs a write (`run` gets a factory for a fresh query builder), maps errors, and refreshes every hook for this table. */
  async function write(run) {
    try {
      const { data, error } = await run(() => supabase.from(table))
      if (error) throw friendly(error)
      return data
    } finally {
      notify()
    }
  }

  return { useRows, write }
}

// ─── Ordered lists (featured categories / products / deals) ──────────────────────────────
function orderedList(table, key) {
  const store = tableStore(table, [['sort', true], ['created_at', true]])
  return {
    useRows: store.useRows,
    /** Appends `ids` after the current `rows`. */
    add: (ids, rows) => {
      const start = rows.reduce((m, r) => Math.max(m, r.sort), -1) + 1
      return store.write((t) => t().insert(ids.map((id, i) => ({ [key]: id, sort: start + i }))))
    },
    remove: (id) => store.write((t) => t().delete().eq(key, id)),
    setVisible: (id, visible) => store.write((t) => t().update({ visible }).eq(key, id).select(key)),
    /** Moves rows[index] one step (dir −1 up, +1 down) and renumbers sort 0..n. */
    move: (rows, index, dir) => {
      const next = [...rows]
      const [row] = next.splice(index, 1)
      next.splice(index + dir, 0, row)
      const changed = next.map((r, i) => ({ id: r[key], sort: i })).filter((r, i) => next[i].sort !== r.sort)
      return store.write(async (t) => {
        const results = await Promise.all(changed.map((r) => t().update({ sort: r.sort }).eq(key, r.id)))
        return results.find((r) => r.error) ?? { data: null, error: null }
      })
    },
  }
}

export const featuredCategories = orderedList('featured_categories', 'category_id')
export const featuredProducts = orderedList('featured_products', 'product_id')
export const featuredDeals = orderedList('featured_deals', 'coupon_id')

/** The app shows this many featured categories. */
export const FEATURED_CATEGORY_SLOTS = 8

// ─── Settings (single row) ───────────────────────────────────────────────────────────────
export const OOS_OPTIONS = [
  ['move_end', 'Move to end'],
  ['hide', 'Hide from rail'],
  ['keep', 'Keep in place'],
]
export const SETTINGS_DEFAULTS = { featured_products_title: 'Bestsellers this week', featured_products_oos: 'move_end' }

const settingsStore = tableStore('content_settings', [['id', true]])
export function useContentSettings() {
  const s = settingsStore.useRows()
  return { ...s, data: { ...SETTINGS_DEFAULTS, ...(s.rows[0] ?? {}) } }
}
export const updateContentSettings = (patch) => settingsStore.write((t) => t().upsert({ id: true, ...patch }).select())

// ─── Seasonal collections ────────────────────────────────────────────────────────────────
const collectionsStore = tableStore('seasonal_collections', [['starts_on', false], ['created_at', false]])
export const useCollections = collectionsStore.useRows

/** 'scheduled' | 'live' | 'ended' (dates are inclusive, Melbourne time). */
export function collectionStatus(c, today = new Date().toLocaleDateString('en-CA', { timeZone: 'Australia/Melbourne' })) {
  if (c.starts_on > today) return 'scheduled'
  if (c.ends_on < today) return 'ended'
  return 'live'
}

/**
 * Creates or updates a collection. `cover`: { file } to upload a new one, { remove: true } to clear,
 * or null to keep. Uploaded covers go in the `banners` bucket under collections/.
 */
export async function saveCollection(original, values, cover) {
  let uploaded = null
  try {
    const row = { ...values }
    if (cover?.file) {
      uploaded = await uploadBannerImage(cover.file, 'collections/')
      row.cover_path = uploaded.path
      row.cover_url = uploaded.url
    } else if (cover?.remove) {
      row.cover_path = null
      row.cover_url = null
    }
    const saved = await collectionsStore.write((t) => (original ? t().update(row).eq('id', original.id).select() : t().insert(row).select()))
    if (original && !saved?.length) throw new Error('This collection no longer exists or you don’t have permission to change it')
    if (original?.cover_path && (cover?.file || cover?.remove)) await removeBannerImage(original.cover_path)
  } catch (e) {
    if (uploaded) await removeBannerImage(uploaded.path)
    throw e
  }
}

export async function deleteCollection(c) {
  const deleted = await collectionsStore.write((t) => t().delete().eq('id', c.id).select('id'))
  if (!deleted?.length) throw new Error('This collection no longer exists or you don’t have permission to delete it')
  await removeBannerImage(c.cover_path)
}
