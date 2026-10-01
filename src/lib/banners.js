import { useCallback, useEffect, useState } from 'react'
import { isSupabaseConfigured, supabase } from './supabase'

// Banners live in `public.banners` (admins: full CRUD) with images in the public `banners`
// bucket. The customer app reads published banners whose dates include today.
// Schema: supabase/banners.sql.

const BUCKET = 'banners'
export const MAX_IMAGE_BYTES = 400 * 1024
export const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const IMAGE_EXT = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' }

export const PLACEMENTS = [
  ['home_top', 'Home · top carousel'],
  ['home_middle', 'Home · middle strip'],
  ['home_feature', 'Home · feature (above Deals for you)'],
  ['category_top', 'Category page · top'],
]
/** Large full-width placement: photo with the copy over a dark fade at the bottom; needs an image to publish. */
export const FEATURE_PLACEMENT = 'home_feature'
export const FEATURE_RATIO = 1080 / 1175
export const placementLabel = (p) => PLACEMENTS.find(([k]) => k === p)?.[1] ?? p
export const PAGES = ['Offers page', 'New arrivals', 'Home']

// ─── Display helpers ─────────────────────────────────────────────────────────────────────
/** Today in Melbourne as 'YYYY-MM-DD' — the same clock the read policy uses. */
const todayMelbourne = () => new Date().toLocaleDateString('en-CA', { timeZone: 'Australia/Melbourne' })

/** 'draft' | 'scheduled' | 'live' | 'expired' */
export function bannerStatus(b, today = todayMelbourne()) {
  if (b.status !== 'published') return 'draft'
  if (b.starts_on && b.starts_on > today) return 'scheduled'
  if (b.ends_on && b.ends_on < today) return 'expired'
  return 'live'
}

/** [label, fg, bg] for a status pill. */
export const STATUS_PILL = {
  live: ['Live', '#0B6B33', '#E9F6E3'],
  scheduled: ['Scheduled', '#8A6100', '#FBF1DE'],
  draft: ['Draft', '#5F6B62', '#EEF0EC'],
  expired: ['Expired', '#A93826', '#FAEDEA'],
}

const toDate = (iso) => {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}
const sameYear = (d) => d.getFullYear() === new Date().getFullYear()
const dayMonth = (d) => d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short', ...(sameYear(d) ? {} : { year: 'numeric' }) })

/** "1–30 Sep", "28 Sep – 5 Oct", or `empty` when there are no dates. Works on any row with starts_on / ends_on. */
export function periodLabel(b, empty = 'No dates') {
  const s = b.starts_on ? toDate(b.starts_on) : null
  const e = b.ends_on ? toDate(b.ends_on) : null
  if (s && e) {
    if (s.getFullYear() === e.getFullYear() && s.getMonth() === e.getMonth() && sameYear(s)) {
      return s.getDate() === e.getDate() ? dayMonth(s) : `${s.getDate()}–${dayMonth(e)}`
    }
    return `${dayMonth(s)} – ${dayMonth(e)}`
  }
  if (s) return `From ${dayMonth(s)}`
  if (e) return `Until ${dayMonth(e)}`
  return empty
}

/** "Shop now → Fresh Produce"; `categoryNames` maps category id → name. */
export function destinationLabel(b, categoryNames = {}) {
  const target = b.destination_type === 'category' ? categoryNames[b.destination] ?? 'Deleted category' : b.destination
  return target ? `${b.cta_label || 'Open'} → ${target}` : 'No destination yet'
}

// ─── Change notifications: every mounted useBanners() refetches after a write ────────────
const listeners = new Set()
let cache = null
export function notifyBannersChanged() {
  listeners.forEach((fn) => fn())
}

export async function fetchBanners() {
  const { data, error } = await supabase
    .from('banners')
    .select('*')
    .order('placement', { ascending: true })
    .order('priority', { ascending: true })
    .order('created_at', { ascending: false })
  if (error) throw friendly(error)
  return data ?? []
}

/**
 * All banners: `{ status, rows, error, loading, refetch }`. `status` is
 * 'off' | 'loading' | 'error' | 'ready'; `rows` keeps the last good data while refetching.
 */
export function useBanners() {
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
    fetchBanners()
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
  if (error.code === '42P01' || error.code === 'PGRST205') return new Error('The banners table doesn’t exist yet · run supabase/banners.sql in the Supabase SQL Editor')
  if (error.code === '23514') return new Error('Some values aren’t allowed · check the title, dates and destination')
  if (error.code === '42501') return new Error('You don’t have permission to change banners')
  if (/bucket not found/i.test(error.message || '')) return new Error('The banners image bucket doesn’t exist yet · run supabase/banners.sql in the Supabase SQL Editor')
  if (/row-level security/i.test(error.message || '')) return new Error('You don’t have permission to upload banner images')
  return error instanceof Error ? error : new Error(error.message || 'Unknown error')
}

/** Error message for an unusable image file, or null. */
export function validateImage(file) {
  if (!IMAGE_TYPES.includes(file.type)) return 'Use a JPG, PNG or WebP image'
  if (file.size > MAX_IMAGE_BYTES) return `Image is ${Math.round(file.size / 1024)} KB · the limit is 400 KB`
  return null
}

const MAX_SIDE = 1600

/**
 * Re-encodes an oversized banner photo as WebP so it fits the 400 KB limit: caps the
 * longest side at 1600px, then lowers quality step by step until it fits. Files that
 * already fit are returned unchanged; on any failure the original file is returned.
 */
export async function compressImage(file) {
  if (!file || !IMAGE_TYPES.includes(file.type) || file.size <= MAX_IMAGE_BYTES) return file
  try {
    const bitmap = await createImageBitmap(file)
    const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height))
    const canvas = document.createElement('canvas')
    canvas.width = Math.round(bitmap.width * scale)
    canvas.height = Math.round(bitmap.height * scale)
    const ctx = canvas.getContext('2d')
    ctx.imageSmoothingQuality = 'high'
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
    bitmap.close?.()
    let blob = null
    for (const quality of [0.9, 0.82, 0.74, 0.66, 0.58, 0.5]) {
      blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/webp', quality))
      if (!blob || blob.type !== 'image/webp') return file
      if (blob.size <= MAX_IMAGE_BYTES) break
    }
    if (blob.size >= file.size) return file
    return new File([blob], file.name.replace(/\.[^.]+$/, '') + '.webp', { type: 'image/webp' })
  } catch {
    return file
  }
}

const randomId = () => globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`

/** Uploads an image to the `banners` bucket (optionally under `prefix`, e.g. 'collections/'); returns `{ path, url }`. */
export async function uploadBannerImage(file, prefix = '') {
  const problem = validateImage(file)
  if (problem) throw new Error(problem)
  const path = `${prefix}${randomId()}.${IMAGE_EXT[file.type]}`
  const bucket = supabase.storage.from(BUCKET)
  const { error } = await bucket.upload(path, file, { contentType: file.type, upsert: false })
  if (error) throw friendly(error)
  return { path, url: bucket.getPublicUrl(path).data.publicUrl }
}

/** Best-effort removal of an uploaded banner image. */
export async function removeBannerImage(path) {
  if (!path) return
  try {
    await supabase.storage.from(BUCKET).remove([path])
  } catch {
    // Orphaned file only; not worth failing the save.
  }
}

export async function createBanner(row) {
  try {
    const { data, error } = await supabase.from('banners').insert(row).select().single()
    if (error) throw friendly(error)
    return data
  } finally {
    notifyBannersChanged()
  }
}

export async function updateBanner(id, patch) {
  try {
    const { data, error } = await supabase.from('banners').update(patch).eq('id', id).select()
    if (error) throw friendly(error)
    if (!data?.length) throw new Error('This banner no longer exists or you don’t have permission to change it')
    return data[0]
  } finally {
    notifyBannersChanged()
  }
}

/** Deletes the row, then its image. */
export async function deleteBanner(banner) {
  try {
    const { data, error } = await supabase.from('banners').delete().eq('id', banner.id).select('id')
    if (error) throw friendly(error)
    if (!data?.length) throw new Error('This banner no longer exists or you don’t have permission to delete it')
    await removeBannerImage(banner.image_path)
  } finally {
    notifyBannersChanged()
  }
}
