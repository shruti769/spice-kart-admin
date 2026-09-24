import { useEffect, useState } from 'react'
import { isSupabaseConfigured, supabase } from './supabase'

/** Low-stock threshold: the product's own minimum, or 10 when none is set. */
const threshold = (p) => (p.min_stock != null ? p.min_stock : 10)

export const isOutOfStock = (p) => p.track_inventory && p.stock_qty <= 0
export const isLowStock = (p) => p.track_inventory && p.stock_qty > 0 && (p.min_stock != null ? p.stock_qty <= p.min_stock : p.stock_qty < 10)
/** Low stock and at or below half of the threshold. */
export const isCriticalStock = (p) => isLowStock(p) && p.stock_qty <= threshold(p) / 2
export const isOverstocked = (p) => p.track_inventory && p.max_stock != null && p.stock_qty > p.max_stock

/** [label, fg, bg] for a product's status pill. */
export function stockPill(p) {
  if (!p.track_inventory) return ['Not tracked', '#5F6B62', '#EEF0EC']
  if (isOutOfStock(p)) return ['Out of Stock', '#A93826', '#FAEDEA']
  if (isCriticalStock(p)) return ['Critical', '#A93826', '#FAEDEA']
  if (isLowStock(p)) return ['Low Stock', '#8A6100', '#FBF1DE']
  if (isOverstocked(p)) return ['Overstocked', '#5F6B62', '#EEF0EC']
  return ['In Stock', '#0B6B33', '#E9F6E3']
}

export function statusPill(p) {
  if (!p.published) return ['Draft', '#5F6B62', '#EEF0EC']
  if (!p.track_inventory) return ['Active', '#0B6B33', '#E9F6E3']
  return stockPill(p)
}

export function timeAgo(iso) {
  const mins = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 60000))
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins} min ago`
  const hrs = Math.round(mins / 60)
  if (hrs < 24) return `${hrs} hr${hrs === 1 ? '' : 's'} ago`
  const days = Math.round(hrs / 24)
  return `${days} day${days === 1 ? '' : 's'} ago`
}

/** Summary counts shown in page headers, tab badges and stat cards. */
export function productStats(rows) {
  const tracked = rows.filter((p) => p.track_inventory)
  const byCategory = {}
  rows.forEach((p) => { byCategory[p.category_id] = (byCategory[p.category_id] || 0) + 1 })
  return {
    total: rows.length,
    tracked: tracked.length,
    inStock: tracked.filter((p) => p.stock_qty > 0).length,
    low: rows.filter(isLowStock).length,
    out: rows.filter(isOutOfStock).length,
    byCategory,
  }
}

// ─── Change notifications: every mounted useProducts() refetches after a write ───────────
const listeners = new Set()
export function notifyProductsChanged() {
  listeners.forEach((fn) => fn())
}

/**
 * All products from Supabase (newest first). Fetches on mount (so a page using it refetches
 * every time it is opened) and again after notifyProductsChanged().
 * `status` is 'off' | 'loading' | 'error' | 'ready'; rows are kept while refetching.
 */
export function useProducts() {
  const [state, setState] = useState(() => ({ status: isSupabaseConfigured ? 'loading' : 'off', rows: [], error: '', fetchedAt: null }))
  const [version, setVersion] = useState(0)

  useEffect(() => {
    const refetch = () => setVersion((n) => n + 1)
    listeners.add(refetch)
    return () => { listeners.delete(refetch) }
  }, [])

  useEffect(() => {
    if (!isSupabaseConfigured) return
    let cancelled = false
    supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (cancelled) return
        if (error) setState({ status: 'error', rows: [], error: error.message, fetchedAt: null })
        else setState({ status: 'ready', rows: data ?? [], error: '', fetchedAt: new Date().toISOString() })
      })
    return () => { cancelled = true }
  }, [version])

  return state
}

// ─── Writes ──────────────────────────────────────────────────────────────────────────────
const BUCKET = 'product-images'

/** Storage path inside `product-images` for one of its public URLs, or null for anything else. */
export function productImagePath(url) {
  if (!url) return null
  const marker = `/storage/v1/object/public/${BUCKET}/`
  const i = url.indexOf(marker)
  if (i < 0) return null
  const path = decodeURIComponent(url.slice(i + marker.length).split(/[?#]/)[0])
  return path || null
}

/** Best-effort removal of a product image object; failures only leave an orphaned file. */
export async function removeProductImage(url) {
  const path = productImagePath(url)
  if (!path) return
  try {
    await supabase.storage.from(BUCKET).remove([path])
  } catch {
    // ignore
  }
}

/** Deletes a product row, then (best effort) its image object. */
export async function deleteProduct(row) {
  const { data, error } = await supabase.from('products').delete().eq('id', row.id).select('id')
  if (error) {
    if (error.code === '23503') throw new Error('This product is still referenced elsewhere (e.g. orders)')
    throw error
  }
  if (!data?.length) throw new Error('This product no longer exists or you don’t have permission to delete it')
  await removeProductImage(row.image_url)
}

/**
 * Applies a stock adjustment against the current on-hand value in the database.
 * `mode`: 'add' | 'remove' (qty is a delta) or 'set' (qty is the new total). Returns the new total.
 * The update only lands if stock_qty hasn't changed since it was read.
 */
export async function adjustProductStock(id, mode, qty) {
  const { data: current, error: readError } = await supabase.from('products').select('stock_qty').eq('id', id).maybeSingle()
  if (readError) throw readError
  if (!current) throw new Error('This product no longer exists')
  const next = mode === 'add' ? current.stock_qty + qty : mode === 'remove' ? current.stock_qty - qty : qty
  if (next < 0) throw new Error(`Only ${current.stock_qty} on hand · can’t remove ${qty}`)
  const { data, error } = await supabase
    .from('products')
    .update({ stock_qty: next })
    .eq('id', id)
    .eq('stock_qty', current.stock_qty)
    .select('stock_qty')
  if (error) throw error
  if (!data?.length) throw new Error('Stock changed while you were editing · try again')
  return next
}
