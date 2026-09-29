import { useEffect, useState } from 'react'
import { isSupabaseConfigured, supabase } from './supabase'
import { downloadCsv, fileDate, useLiveQuery } from './customers'

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

/** Copies a product as an unpublished draft ("… (copy)", no SKU/barcode, same image). Returns the new row. */
export async function duplicateProduct(row) {
  const { data: full, error: readError } = await supabase.from('products').select('*').eq('id', row.id).maybeSingle()
  if (readError) throw readError
  if (!full) throw new Error('This product no longer exists')
  // eslint-disable-next-line no-unused-vars
  const { id, created_at, updated_at, sku, barcode, ...rest } = full
  const { data, error } = await supabase
    .from('products')
    .insert({ ...rest, name: `${full.name} (copy)`.slice(0, 200), sku: null, barcode: null, published: false })
    .select()
    .single()
  if (error) throw error
  notifyProductsChanged()
  return data
}

/** Publishes or archives (hides from the app) a product. Sales history is kept either way. */
export async function setProductPublished(id, published) {
  const { data, error } = await supabase.from('products').update({ published }).eq('id', id).select('id')
  if (error) throw error
  if (!data?.length) throw new Error('This product no longer exists or you don’t have permission to change it')
  notifyProductsChanged()
}

// ─── Product detail page ─────────────────────────────────────────────────────────────────
const DAY_MS = 864e5
const PAGE = 1000

/** Every page of a PostgREST query (built fresh by `build(from, to)`), up to `max` rows. */
async function fetchAll(build, max = 20000) {
  const out = []
  for (let from = 0; from < max; from += PAGE) {
    const { data, error } = await build(from, from + PAGE - 1)
    if (error) throw error
    out.push(...(data ?? []))
    if (!data || data.length < PAGE) break
  }
  return out
}

const salesError = (e) => (e?.code === '42P01' || e?.code === 'PGRST205' || e?.code === 'PGRST200'
  ? 'Order data isn’t set up yet · run supabase/orders.sql in the Supabase SQL Editor'
  : e?.message || 'Unknown error')

/**
 * Everything the Product detail page shows for one product, live (products, order_items,
 * orders and reviews changes refetch it, debounced):
 * `{ product, sales: { units30, revenue30, unitsPrev, revenuePrev, daily: [{ day, units, revenue }×14] },
 *    recent: orders (newest first, each with this product's order_items), rating: { avg, count },
 *    salesError, reviewsError }` or `null` when the product doesn't exist.
 * Sales exclude cancelled orders; the recent list shows every status.
 */
export function useProductDetail(id, recentLimit = 6) {
  return useLiveQuery(async () => {
    if (!id) return null
    const now = Date.now()
    const since = new Date(now - 60 * DAY_MS).toISOString()
    const [prod, sales, recent, reviews] = await Promise.allSettled([
      supabase.from('products').select('*').eq('id', id).maybeSingle(),
      fetchAll((from, to) => supabase.from('orders')
        .select('id, placed_at, order_items!inner(qty, line_total)')
        .eq('order_items.product_id', id).neq('status', 'cancelled').gte('placed_at', since)
        .order('placed_at', { ascending: false }).order('id').range(from, to)),
      supabase.from('orders')
        .select('id, number, status, placed_at, customer_id, customer:customers(first_name, last_name), order_items!inner(qty, line_total)')
        .eq('order_items.product_id', id).order('placed_at', { ascending: false }).limit(recentLimit),
      fetchAll((from, to) => supabase.from('reviews').select('id, rating').eq('product_id', id).eq('status', 'published').order('id').range(from, to)),
    ])
    if (prod.status === 'rejected') throw prod.reason
    if (prod.value.error) throw new Error(prod.value.error.message)
    if (!prod.value.data) return null

    // 14 local calendar days ending today, then the two 30-day windows.
    const today = new Date(now)
    const daily = Array.from({ length: 14 }, (_, i) => {
      const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 13 + i)
      return { day: d.getTime(), units: 0, revenue: 0 }
    })
    const s = { units30: 0, revenue30: 0, unitsPrev: 0, revenuePrev: 0, daily }
    if (sales.status === 'fulfilled') {
      for (const o of sales.value) {
        const t = new Date(o.placed_at).getTime()
        const units = (o.order_items ?? []).reduce((n, i) => n + Number(i.qty || 0), 0)
        const revenue = (o.order_items ?? []).reduce((n, i) => n + Number(i.line_total || 0), 0)
        if (t >= now - 30 * DAY_MS) { s.units30 += units; s.revenue30 += revenue } else { s.unitsPrev += units; s.revenuePrev += revenue }
        for (let i = daily.length - 1; i >= 0; i--) {
          if (t >= daily[i].day) { daily[i].units += units; daily[i].revenue += revenue; break }
        }
      }
    }
    const recentRes = recent.status === 'fulfilled' ? recent.value : { error: recent.reason }
    const ratings = reviews.status === 'fulfilled' ? reviews.value.map((r) => Number(r.rating)) : []
    return {
      id,
      product: prod.value.data,
      sales: s,
      recent: recentRes.error ? [] : recentRes.data ?? [],
      salesError: sales.status === 'rejected' ? salesError(sales.reason) : recentRes.error ? salesError(recentRes.error) : '',
      rating: { count: ratings.length, avg: ratings.length ? ratings.reduce((a, b) => a + b, 0) / ratings.length : null },
      reviewsError: reviews.status === 'rejected' ? salesError(reviews.reason) : '',
    }
  }, ['products', 'order_items', 'orders', 'reviews'], [id, recentLimit])
}

// ─── CSV export ──────────────────────────────────────────────────────────────────────────
export { downloadCsv, fileDate }

const csvMoney = (n) => (n == null || n === '' ? '' : Number(n).toFixed(2))

/** Downloads `rows` (products rows) as a CSV; `categoryNames` maps category_id → name. */
export function exportProductsCsv(rows, categoryNames, filename = `products-${fileDate()}.csv`) {
  downloadCsv(filename,
    ['Name', 'Brand', 'SKU', 'Barcode', 'Category', 'Subcategory', 'Price (AUD)', 'Compare at (AUD)', 'Cost (AUD)', 'Stock tracked', 'On hand', 'Min stock', 'Max stock', 'Stock status', 'Warehouse', 'Weight', 'Unit', 'Size', 'Origin', 'Attributes', 'Published', 'Express delivery', 'Scheduled delivery', 'Created', 'Updated'],
    rows.map((p) => [
      p.name, p.brand, p.sku, p.barcode, categoryNames[p.category_id] || p.category_id, p.subcategory,
      csvMoney(p.price), csvMoney(p.compare_at_price), csvMoney(p.cost_price),
      p.track_inventory ? 'Yes' : 'No', p.track_inventory ? p.stock_qty : '', p.min_stock ?? '', p.max_stock ?? '', stockPill(p)[0],
      p.warehouse, p.weight, p.unit, p.size, p.country_of_origin, (p.attributes ?? []).join('; '),
      p.published ? 'Yes' : 'No', p.express_delivery ? 'Yes' : 'No', p.scheduled_delivery ? 'Yes' : 'No',
      p.created_at ? new Date(p.created_at).toLocaleString('en-AU') : '', p.updated_at ? new Date(p.updated_at).toLocaleString('en-AU') : '',
    ]))
}
