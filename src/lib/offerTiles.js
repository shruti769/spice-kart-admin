import { useCallback, useEffect, useState } from 'react'
import { isSupabaseConfigured, supabase } from './supabase'
import { validateImage } from './categories'

// The app's Offers screen tiles live in `public.offer_tiles`:
//   kind 'deal' → "Shop the deals" image tiles · kind 'bank' → "Bank & payment offers" rows.
// The app shows tiles that are active and inside their starts_at / ends_at window.

export const FREE_DELIVERY_TOKEN = '{free_delivery_over}'

const BUCKET = 'product-images'
const IMAGE_PREFIX = 'offers/'
const IMAGE_EXT = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/svg+xml': 'svg' }

/** `asset:<name>` = artwork bundled with the app (copied to /public/offers for previews). */
export const tileImageSrc = (url) => (!url ? null : url.startsWith('asset:') ? `/offers/${url.slice(6)}.png` : url)

/** Replaces the free-delivery token for previews. */
export const tileText = (s, freeOver) => (s || '').split(FREE_DELIVERY_TOKEN).join(`$${Number(freeOver ?? 0).toFixed(0)}`)

// ─── Change notifications: every mounted useOfferTiles() refetches after a write ─────────
const listeners = new Set()
let cache = null
const notify = () => listeners.forEach((fn) => fn())

export async function fetchOfferTiles() {
  const { data, error } = await supabase.from('offer_tiles').select('*').order('sort').order('created_at')
  if (error) throw friendly(error)
  return data ?? []
}

/** All tiles: `{ status, rows, error, loading, refetch }` ('off' | 'loading' | 'error' | 'ready'). */
export function useOfferTiles() {
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
    fetchOfferTiles()
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
  if (error.code === '42501') return new Error('You don’t have permission to change offers')
  if (error.code === '23514') return new Error('Some values aren’t allowed · check the title and dates')
  if (error.code === '23503') return new Error('That category no longer exists')
  return error instanceof Error ? error : new Error(error.message || 'Unknown error')
}

async function write(run) {
  try {
    const { data, error } = await run()
    if (error) throw friendly(error)
    if (Array.isArray(data) && !data.length) throw new Error('This offer no longer exists or you don’t have permission to change it')
    return data
  } finally {
    notify()
  }
}

export const createOfferTile = (row) => write(() => supabase.from('offer_tiles').insert(row).select('id'))
export const updateOfferTile = (id, patch) => write(() => supabase.from('offer_tiles').update(patch).eq('id', id).select('id'))
export const setOfferTileActive = (id, active) => updateOfferTile(id, { active })

export async function deleteOfferTile(tile) {
  await write(() => supabase.from('offer_tiles').delete().eq('id', tile.id).select('id'))
  await removeOfferImage(tile.image_url)
}

// ─── Images (public `product-images` bucket, `offers/` prefix) ───────────────────────────
const randomId = () => globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`

/** Uploads deal artwork; returns its public URL. */
export async function uploadOfferImage(file) {
  const problem = validateImage(file)
  if (problem) throw new Error(problem)
  const path = `${IMAGE_PREFIX}${randomId()}.${IMAGE_EXT[file.type]}`
  const bucket = supabase.storage.from(BUCKET)
  const { error } = await bucket.upload(path, file, { contentType: file.type, upsert: false })
  if (error) throw friendly(error)
  return bucket.getPublicUrl(path).data.publicUrl
}

/** Best-effort removal of uploaded artwork (ignores bundled `asset:` art and anything outside `offers/`). */
export async function removeOfferImage(url) {
  const marker = `/object/public/${BUCKET}/`
  const i = url?.indexOf(marker) ?? -1
  if (i < 0) return
  const path = decodeURIComponent(url.slice(i + marker.length))
  if (!path.startsWith(IMAGE_PREFIX)) return
  try {
    await supabase.storage.from(BUCKET).remove([path])
  } catch {
    // Orphaned file; harmless.
  }
}
