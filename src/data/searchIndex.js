// Global search: static pages plus live Supabase records (orders, customers, products, drivers).
// A record opens its screen with `open(v)` when present, else the view-model handler named `go`.
import { supabase } from '../lib/supabase'

const PAGES = [
  ['Dashboard', 'nav_dash', 'home overview'], ['Analytics', 'nav_analytics', 'reports'],
  ['Orders', 'nav_orders', ''], ['Delivery', 'nav_del', 'drivers map zones'],
  ['Catalogue', 'nav_catalogue', 'products'], ['Inventory', 'nav_inv', 'stock'],
  ['Customers', 'nav_cust', ''], ['Reviews', 'nav_rev', 'ratings'],
  ['Offers & Promotions', 'nav_promo', 'coupons discounts'], ['Content', 'nav_content', 'banners'],
  ['Notifications', 'nav_notif', 'push'], ['Payments', 'nav_pay', 'payouts'], ['Refunds', 'nav_refunds', ''],
  ['Staff & Admins', 'nav_staff', 'team users'], ['Settings', 'nav_settings', ''],
  ['Add product', 'nav_addproduct', 'new product create'],
].map(([name, go, keywords]) => ({ group: 'Pages', title: name, subtitle: 'Go to page', keywords, badge: '→', go }))

function initials(name) {
  return name.split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase()
}

const withHaystack = (r) => ({
  ...r,
  haystack: [r.title, r.subtitle, r.meta, r.keywords].filter(Boolean).join(' ').toLowerCase().replace(/[#’']/g, ''),
})

const INDEX = PAGES.map(withHaystack)

/** Search records for live categories (rows from useCategories). */
export function categoryRecords(categories) {
  return categories.map((c) => withHaystack({
    group: 'Categories', title: c.name, subtitle: c.enabled ? 'Catalogue category' : 'Catalogue category · disabled',
    keywords: [c.short_name, ...(c.subcategories ?? [])].filter(Boolean).join(' '), image: c.image_url || undefined, badge: 'CA', go: 'nav_cats',
  }))
}

const GROUP_LIMIT = 4

/**
 * Records matching every word of `query`, grouped in display order, at most 4 per group.
 * `extra` are additional records (e.g. categoryRecords(...)) appended after the static ones.
 */
export function searchConsole(query, extra = []) {
  const words = query.toLowerCase().replace(/[#’']/g, '').split(/\s+/).filter(Boolean)
  if (!words.length) return []
  const counts = {}
  return [...INDEX, ...extra].filter((r) => {
    if (!words.every((w) => r.haystack.includes(w))) return false
    counts[r.group] = (counts[r.group] || 0) + 1
    return counts[r.group] <= GROUP_LIMIT
  })
}

const STATUS = { placed: 'Placed', confirmed: 'Confirmed', picking: 'Picking', packed: 'Packed', out_for_delivery: 'Out for delivery', delivered: 'Delivered', cancelled: 'Cancelled' }
const money = (n) => `$${Number(n || 0).toFixed(2)}`
const nameOf = (c) => [c?.first_name, c?.last_name].filter(Boolean).join(' ') || 'Guest customer'
const phoneOf = (m) => (m ? `+61 ${m.slice(0, 3)} ${m.slice(3, 6)} ${m.slice(6)}` : '')
// Characters PostgREST's or() filter treats specially.
const clean = (q) => q.replace(/[,()*%\\]/g, ' ').trim()

/** Live matches from Supabase, grouped Orders → Customers → Products → Drivers (4 each). */
export async function liveSearch(query) {
  const q = clean(query.replace(/^#/, ''))
  if (q.length < 2) return []
  const like = `%${q}%`
  const digits = q.replace(/\D/g, '').replace(/^61/, '').replace(/^0/, '')
  const [orders, customers, products, drivers] = await Promise.all([
    supabase.from('orders').select('id, number, status, total, delivery_type, customer:customers(first_name, last_name)')
      .ilike('number', `%${q.replace(/^sk/i, '')}%`).order('placed_at', { ascending: false }).limit(GROUP_LIMIT),
    supabase.from('customer_stats').select('id, first_name, last_name, email, mobile, orders')
      .or([`first_name.ilike.${like}`, `last_name.ilike.${like}`, `email.ilike.${like}`, ...(digits.length >= 3 ? [`mobile.ilike.%${digits}%`] : [])].join(','))
      .order('last_order_at', { ascending: false, nullsFirst: false }).limit(GROUP_LIMIT),
    supabase.from('products').select('id, name, price, stock_qty, image_url, published').ilike('name', like).limit(GROUP_LIMIT),
    supabase.from('drivers').select('id, name, phone, zone, status').or(`name.ilike.${like},phone.ilike.${like}`).limit(GROUP_LIMIT),
  ])
  const out = []
  for (const o of orders.data ?? []) out.push({
    group: 'Orders', title: `#${o.number} · ${nameOf(o.customer)}`, subtitle: `${money(o.total)} · ${o.delivery_type === 'express' ? 'Express' : 'Scheduled'}`,
    meta: STATUS[o.status] ?? o.status, badge: 'OR', open: (v) => v.openOrder(o),
  })
  for (const c of customers.data ?? []) out.push({
    group: 'Customers', title: nameOf(c), subtitle: [c.email, phoneOf(c.mobile)].filter(Boolean).join(' · ') || 'No contact details',
    meta: `${c.orders} order${c.orders === 1 ? '' : 's'}`, badge: initials(nameOf(c)), open: (v) => v.openCustomer(c.id),
  })
  for (const p of products.data ?? []) out.push({
    group: 'Products', title: p.name, subtitle: `${money(p.price)} · ${p.stock_qty} in stock${p.published ? '' : ' · unpublished'}`,
    image: p.image_url || undefined, badge: 'PR', open: (v) => v.openProduct(p.id),
  })
  for (const d of drivers.data ?? []) out.push({
    group: 'Drivers', title: d.name, subtitle: ['Driver', d.zone, d.phone].filter(Boolean).join(' · '),
    meta: d.status === 'active' ? 'Active' : 'Inactive', badge: initials(d.name), open: (v) => v.openDriver(d.id),
  })
  return out
}
