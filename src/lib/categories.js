import { useCallback, useEffect, useMemo, useState } from 'react'
import { isSupabaseConfigured, supabase } from './supabase'

// Supabase (`public.categories` + `public.subcategories`) is the only source of categories.
// There are no bundled/placeholder categories: admins create every one (image and
// subcategories included) from Catalogue › Categories.

export const DEFAULT_BG = '#F1F3EE'
const BUCKET = 'product-images'
const IMAGE_PREFIX = 'categories/'
export const MAX_IMAGE_BYTES = 1024 * 1024
// PNG, SVG and WebP are advertised; JPEG is accepted silently.
export const IMAGE_TYPES = ['image/png', 'image/svg+xml', 'image/webp', 'image/jpeg']
const IMAGE_EXT = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/svg+xml': 'svg' }

/** Pastel tile colours, assigned to new categories by position (cycling). */
export const TILE_PALETTE = ['#EFFACF', '#F6ECEF', '#FBF7E0', '#ECF1E7', '#EDF5F8', '#F7E2CE', '#FAF6CF', '#E6FEF3', '#F3F2EC', '#FCEDED', '#DFF3B4', '#E7F5FE', '#EEEEFE']
export const tileColorFor = (position) => TILE_PALETTE[(Math.max(1, position) - 1) % TILE_PALETTE.length]

/** Lowercase slug: a-z, 0-9 and single dashes ("Dairy & Eggs" → "dairy-and-eggs"). */
export const slugify = (name) => name.toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
export const isValidSlug = (id) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)
export const isValidHex = (hex) => /^#[0-9a-fA-F]{6}$/.test(hex)

/** `slugify(name)` made unique against `taken` ids by appending -2, -3… */
export function uniqueSlug(name, taken) {
  const base = slugify(name) || 'category'
  const used = new Set(taken)
  if (!used.has(base)) return base
  let n = 2
  while (used.has(`${base}-${n}`)) n += 1
  return `${base}-${n}`
}

// ─── Change notifications: every mounted useCategories() refetches after a write ─────────
const listeners = new Set()
let cache = null
export function notifyCategoriesChanged() {
  listeners.forEach((fn) => fn())
}

/** Categories (with ordered subcategory names), ordered by `sort` then `name`. */
export async function fetchCategories() {
  const [cats, subs] = await Promise.all([
    supabase.from('categories').select('id, name, short_name, sort, image_url, bg_color, enabled').order('sort').order('name'),
    supabase.from('subcategories').select('category_id, name, sort').order('sort').order('name'),
  ])
  if (cats.error) throw cats.error
  if (subs.error) throw subs.error
  const byCat = {}
  for (const s of subs.data ?? []) (byCat[s.category_id] ||= []).push(s.name)
  return (cats.data ?? []).map((c) => ({ ...c, subcategories: byCat[c.id] ?? [] }))
}

/**
 * Live categories: `{ status, rows, error, loading, refetch }`. `status` is
 * 'off' | 'loading' | 'error' | 'ready'; `rows` keeps the last good data while refetching.
 * Every mounted instance refetches automatically after any write helper below.
 */
export function useCategories() {
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
    fetchCategories()
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

/** `{ [id]: name }` for labelling products. */
export function useCategoryNames() {
  const { rows } = useCategories()
  return useMemo(() => Object.fromEntries(rows.map((c) => [c.id, c.name])), [rows])
}

// ─── Errors ──────────────────────────────────────────────────────────────────────────────
function friendly(error, duplicateMsg) {
  if (error.code === '23503') return new Error('Move or delete this category’s products first')
  if (error.code === '23505' && duplicateMsg) return new Error(duplicateMsg)
  if (error.code === '42501') return new Error('You don’t have permission to change categories')
  return error instanceof Error ? error : new Error(error.message || 'Unknown error')
}

// ─── Categories ──────────────────────────────────────────────────────────────────────────
export async function createCategory(row) {
  const { error } = await supabase.from('categories').insert(row)
  if (error) throw friendly(error, `A category with id "${row.id}" already exists`)
}

export async function updateCategory(id, patch) {
  const { error } = await supabase.from('categories').update(patch).eq('id', id)
  if (error) throw friendly(error)
}

/** Deletes a category (its subcategories cascade). Fails while products still use it. */
export async function deleteCategory(id) {
  const { error } = await supabase.from('categories').delete().eq('id', id)
  if (error) throw friendly(error)
}

// ─── Subcategories ───────────────────────────────────────────────────────────────────────
export async function addSubcategory(categoryId, name, sort) {
  const { error } = await supabase.from('subcategories').insert({ category_id: categoryId, name, sort })
  if (error) throw friendly(error, `Subcategory "${name}" already exists`)
}

/** Renames a subcategory and re-points products that used the old name. */
export async function renameSubcategory(categoryId, oldName, newName) {
  const { error } = await supabase.from('subcategories').update({ name: newName }).eq('category_id', categoryId).eq('name', oldName)
  if (error) throw friendly(error, `Subcategory "${newName}" already exists`)
  const { error: e2 } = await supabase.from('products').update({ subcategory: newName }).eq('category_id', categoryId).eq('subcategory', oldName)
  if (e2) throw friendly(e2)
}

export async function deleteSubcategory(categoryId, name) {
  const { error } = await supabase.from('subcategories').delete().eq('category_id', categoryId).eq('name', name)
  if (error) throw friendly(error)
}

/** Sets `sort` = 1..n following the order of `names`. */
export async function reorderSubcategories(categoryId, names) {
  for (const [i, name] of names.entries()) {
    const { error } = await supabase.from('subcategories').update({ sort: i + 1 }).eq('category_id', categoryId).eq('name', name)
    if (error) throw friendly(error)
  }
}

// ─── Images (public `product-images` bucket, `categories/` prefix) ───────────────────────
/** Error message for an unusable file, or null. */
export function validateImage(file) {
  if (!IMAGE_TYPES.includes(file.type)) return 'Use a PNG, SVG or WebP image'
  if (file.size > MAX_IMAGE_BYTES) return `Image is ${(file.size / 1024 / 1024).toFixed(1)} MB · the limit is 1 MB`
  return null
}

const randomId = () => globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`

/** Uploads a category image; returns `{ path, url }` (public URL). */
export async function uploadCategoryImage(file, categoryId) {
  const problem = validateImage(file)
  if (problem) throw new Error(problem)
  const ext = IMAGE_EXT[file.type]
  const path = `${IMAGE_PREFIX}${categoryId}-${randomId()}.${ext}`
  const bucket = supabase.storage.from(BUCKET)
  const { error } = await bucket.upload(path, file, { contentType: file.type, upsert: false })
  if (error) throw friendly(error)
  return { path, url: bucket.getPublicUrl(path).data.publicUrl }
}

/** Best-effort removal of an uploaded category image (ignores anything outside `categories/`). */
export async function removeCategoryImage(urlOrPath) {
  if (!urlOrPath) return
  const marker = `/object/public/${BUCKET}/`
  const i = urlOrPath.indexOf(marker)
  const path = i >= 0 ? decodeURIComponent(urlOrPath.slice(i + marker.length).split('?')[0]) : urlOrPath
  if (!path.startsWith(IMAGE_PREFIX)) return
  try {
    await supabase.storage.from(BUCKET).remove([path])
  } catch {
    // Orphaned file only; not worth failing the save.
  }
}

// ─── Save / delete from the edit modal ───────────────────────────────────────────────────
/**
 * Renumbers `sort` to 1..n following `ids` (only rows whose sort changes are written).
 * `current` maps id → current sort.
 */
export async function reorderCategories(ids, current = {}) {
  for (const [i, id] of ids.entries()) {
    if (current[id] === i + 1) continue
    const { error } = await supabase.from('categories').update({ sort: i + 1 }).eq('id', id)
    if (error) throw friendly(error)
  }
}

/**
 * Creates or updates a category and syncs its subcategories.
 * - `values`: { id (create only), name, short_name, sort, bg_color, enabled }
 * - `order`: optional `{ ids, current }` → after saving, renumber every category's `sort`
 *   to 1..n in that order (see reorderCategories).
 * - `subs`: edited list in display order, `[{ name, original }]` where `original` is the stored
 *   name (null for new rows). Stored names missing from `subs` are deleted.
 * - `image`: `{ file }` to upload, `{ remove: true }` to clear, or null to keep.
 */
export async function saveCategory({ original, values, subs, image, order }) {
  const id = original ? original.id : values.id
  let uploaded = null
  try {
    let imageUrl = original?.image_url ?? null
    if (image?.file) {
      uploaded = await uploadCategoryImage(image.file, id)
      imageUrl = uploaded.url
    } else if (image?.remove) {
      imageUrl = null
    }

    const row = { name: values.name, short_name: values.short_name, sort: values.sort, bg_color: values.bg_color, enabled: values.enabled, image_url: imageUrl }
    if (original) await updateCategory(id, row)
    else await createCategory({ id, ...row })
    uploaded = null // the row references the new image now; keep it even if a later step fails

    // Subcategories: deletes → renames (via temporary names so swaps can't collide) → inserts → sort.
    const kept = new Set(subs.filter((s) => s.original).map((s) => s.original))
    for (const name of (original?.subcategories ?? []).filter((n) => !kept.has(n))) await deleteSubcategory(id, name)

    const renames = subs.filter((s) => s.original && s.original !== s.name)
    if (renames.length) {
      // Capture affected products up front so swapped names don't merge.
      const affected = []
      for (const r of renames) {
        const { data, error } = await supabase.from('products').select('id').eq('category_id', id).eq('subcategory', r.original)
        if (error) throw friendly(error)
        affected.push((data ?? []).map((p) => p.id))
      }
      const token = randomId()
      const tmp = (i) => `__rename_${token}_${i}`
      for (const [i, r] of renames.entries()) {
        const { error } = await supabase.from('subcategories').update({ name: tmp(i) }).eq('category_id', id).eq('name', r.original)
        if (error) throw friendly(error)
      }
      for (const [i, r] of renames.entries()) {
        const { error } = await supabase.from('subcategories').update({ name: r.name }).eq('category_id', id).eq('name', tmp(i))
        if (error) throw friendly(error, `Subcategory "${r.name}" already exists`)
        if (affected[i].length) {
          const { error: pe } = await supabase.from('products').update({ subcategory: r.name }).in('id', affected[i])
          if (pe) throw friendly(pe)
        }
      }
    }

    for (const [i, s] of subs.entries()) {
      if (!s.original) await addSubcategory(id, s.name, i + 1)
    }
    await reorderSubcategories(id, subs.map((s) => s.name))
    if (order) await reorderCategories(order.ids, order.current)

    // Old image replaced or removed: tidy up storage.
    if (original?.image_url && original.image_url !== imageUrl) await removeCategoryImage(original.image_url)
    return id
  } catch (e) {
    if (uploaded) await removeCategoryImage(uploaded.path)
    throw e
  } finally {
    notifyCategoriesChanged()
  }
}

/** Deletes a category and its uploaded image. */
export async function removeCategory(category) {
  try {
    await deleteCategory(category.id)
    await removeCategoryImage(category.image_url)
  } finally {
    notifyCategoriesChanged()
  }
}
