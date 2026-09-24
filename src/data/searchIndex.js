import imgBasmatiRice from '../assets/images/basmati-rice.jpg'
import imgPaneer from '../assets/images/paneer.jpg'
import imgFreshCoriander from '../assets/images/fresh-coriander.jpg'
import imgGaramMasala from '../assets/images/garam-masala.jpg'
import imgFullCreamMilk from '../assets/images/full-cream-milk.jpg'
import imgAlphonsoMangoes from '../assets/images/alphonso-mangoes.jpg'
import imgSourdoughLoaf from '../assets/images/sourdough-loaf.jpg'
import imgOliveOil from '../assets/images/olive-oil.jpg'
import imgTurmericPowder from '../assets/images/turmeric-powder.jpg'

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

const PRODUCTS = [
  ['Basmati Rice 5kg', 'SK-PAN-0142', 'Grains, Rice & Cereals', '$24.50', 'Critical · 6 left', imgBasmatiRice],
  ['Paneer 500g', 'SK-DAI-0088', 'Dairy & Refrigerated', '$7.90', 'Low stock · 11 left', imgPaneer],
  ['Fresh Coriander', 'SK-FRU-0118', 'Fresh Produce', '$2.50', 'Low stock · 18 left', imgFreshCoriander],
  ['Garam Masala 100g', 'SK-SPI-0017', 'Spices & Masalas', '$4.20', 'Low stock · 24 left', imgGaramMasala],
  ['Full Cream Milk 2L', 'SK-DAI-0002', 'Dairy & Refrigerated', '$4.50', 'In stock', imgFullCreamMilk],
  ['Alphonso Mangoes 1kg', 'SK-FRU-0231', 'Fresh Produce', '$12.99', 'In stock', imgAlphonsoMangoes],
  ['Sourdough Loaf', 'SK-BAK-0054', 'Bakery & Bread', '$6.50', 'Out of stock', imgSourdoughLoaf],
  ['Olive Oil 1L', 'SK-PAN-0301', 'Grains, Rice & Cereals', '$18.71', 'In stock', imgOliveOil],
  ['Turmeric Powder 200g', 'SK-SPI-0004', 'Spices & Masalas', '$3.80', 'In stock', imgTurmericPowder],
  ['Frozen Paratha 5pk', '', 'Frozen Foods & Vegetables', '', 'Low stock · 31 left', null],
].map(([name, sku, category, price, stock, image]) => ({
  group: 'Products', title: name, subtitle: [sku, category].filter(Boolean).join(' · '),
  meta: price || stock, keywords: stock, image, go: 'nav_proddetail',
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

const CATEGORIES = [
  'Dairy & Refrigerated', 'Bakery & Bread', 'Fresh Produce', 'Flours', 'Pulses & Lentils', 'Spices & Masalas',
  'Grains, Rice & Cereals', 'Oil & Ghee', 'Snacks & Savouries', 'Instant & Ready to Eat', 'Tea & Beverages',
  'Condiments, Pickles & Paste', 'Sweeteners & Miscellaneous Baking', 'Frozen Foods & Vegetables',
  'Fasting Foods', 'General Foods', 'Pooja/Festival',
].map((name) => ({ group: 'Categories', title: name, subtitle: 'Catalogue category', badge: 'CA', go: 'nav_cats' }))

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

const INDEX = [...PAGES, ...ORDERS, ...PRODUCTS, ...CUSTOMERS, ...DRIVERS, ...CATEGORIES].map((r) => ({
  ...r,
  haystack: [r.title, r.subtitle, r.meta, r.keywords].filter(Boolean).join(' ').toLowerCase().replace(/[#’']/g, ''),
}))

const GROUP_LIMIT = 4

/** Records matching every word of `query`, grouped in display order, at most 4 per group. */
export function searchConsole(query) {
  const words = query.toLowerCase().replace(/[#’']/g, '').split(/\s+/).filter(Boolean)
  if (!words.length) return []
  const counts = {}
  return INDEX.filter((r) => {
    if (!words.every((w) => r.haystack.includes(w))) return false
    counts[r.group] = (counts[r.group] || 0) + 1
    return counts[r.group] <= GROUP_LIMIT
  })
}
