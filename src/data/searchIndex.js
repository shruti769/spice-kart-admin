// Records shown across the console, collected for the global search.
// `go` names the view-model handler that opens the matching screen.

const ORDERS = [
  ['#SK10482', 'John Smith', '8 items · $84.50 · Express', 'Preparing'],
  ['#SK10481', 'Priya Nair', '12 items · $132.20 · Express', 'Out for Delivery'],
  ['#SK10480', 'Liam O’Brien', '4 items · $36.90 · Scheduled', 'Confirmed'],
  ['#SK10479', 'Mei Chen', '9 items · $97.40 · Express', 'Delivered'],
  ['#SK10478', 'Daniel Cruz', '3 items · $24.50 · Scheduled', 'Cancelled'],
  ['#SK10477', 'Ava Thompson', '15 items · $164.80 · Express', 'Delivered'],
  ['#SK10476', 'Rohit Sharma', '6 items · $58.20 · Scheduled', 'Ready'],
  ['#SK10475', 'Emily Nguyen', '11 items · $118.60 · Express', 'Delivered'],
].map(([id, customer, detail, status]) => ({
  group: 'Orders', title: `${id} · ${customer}`, subtitle: detail, meta: status, badge: 'OR', go: 'openOrder',
}))

const CUSTOMERS = [
  ['John Smith', 'john.smith@outlook.com.au', '+61 412 663 208', 24],
  ['Priya Nair', 'priya.nair@gmail.com', '+61 431 908 552', 38],
  ['Liam O’Brien', 'liam.obrien@bigpond.com', '+61 402 771 340', 12],
  ['Mei Chen', 'mei.chen@icloud.com', '+61 466 220 118', 52],
  ['Daniel Cruz', 'dcruz@hotmail.com', '+61 419 553 907', 3],
  ['Ava Thompson', 'ava.t@gmail.com', '+61 421 664 802', 29],
  ['Rohit Sharma', 'rohit.sharma@gmail.com', '+61 438 112 664', 17],
].map(([name, email, phone, orders]) => ({
  group: 'Customers', title: name, subtitle: `${email} · ${phone}`, meta: `${orders} orders`,
  keywords: `${phone.replace(/\s/g, '')} obrien`, badge: initials(name), go: 'nav_custdetail',
}))

const DRIVERS = [
  ['Michael Ryan', '+61 412 887 001', 'Melbourne CBD', 'Delivering'],
  ['Sofia Almeida', '+61 431 220 664', 'Fitzroy', 'Delivering'],
  ['Tom Fletcher', '+61 402 118 559', 'Carlton', 'Delayed'],
  ['Aisha Khan', '+61 466 773 210', 'South Yarra', 'Delivering'],
  ['Jay Patel', '+61 419 664 803', 'Richmond', 'Delayed'],
  ['Chloe Baker', '+61 438 002 176', 'Melbourne CBD', 'Available'],
  ['Noah Brooks', '+61 427 118 903', 'Fitzroy', 'Available'],
  ['Ruby Carter', '+61 414 552 018', '—', 'Offline'],
].map(([name, phone, zone, status]) => ({
  group: 'Drivers', title: name, subtitle: `Driver · ${zone} · ${phone}`, meta: status,
  keywords: phone.replace(/\s/g, ''), badge: initials(name), go: 'nav_driver',
}))

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

const INDEX = [...PAGES, ...ORDERS, ...CUSTOMERS, ...DRIVERS].map(withHaystack)

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
