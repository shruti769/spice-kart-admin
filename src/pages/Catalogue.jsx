import { useState } from 'react'
import CategoryTile from '../components/CategoryTile'
import LiveProductRows, { InventoryRows, ListFooter } from '../components/LiveProductRows'
import { useCategories } from '../lib/categories'
import { downloadCsv, exportProductsCsv, fileDate, isCriticalStock, isLowStock, isOutOfStock, isOverstocked, productStats, stockPill, timeAgo, useProducts } from '../lib/products'

// Product-list sub-tabs, in the same order as the tab buttons.
const PRODUCT_TABS = [
  { filter: () => true, emptyTitle: 'No products yet', emptyText: '' },
  { filter: (p) => p.published, emptyTitle: 'No active products', emptyText: 'Published products appear here.' },
  { filter: (p) => !p.published, emptyTitle: 'No draft products', emptyText: 'Unpublished products appear here.' },
  { filter: isOutOfStock, emptyTitle: 'Nothing is out of stock', emptyText: 'Tracked products with no stock left appear here.' },
  { filter: () => false, emptyTitle: 'No archived products', emptyText: 'Archiving products isn’t available yet.' },
]
// Inventory sub-tabs; every list only includes products with inventory tracking on.
const INV_TABS = [
  { filter: () => true, emptyTitle: 'No tracked stock', emptyText: 'Products with inventory tracking on appear here.' },
  { filter: isCriticalStock, emptyTitle: 'No critical stock', emptyText: 'Products at or below half their minimum stock appear here.' },
  { filter: isLowStock, emptyTitle: 'No low-stock items', emptyText: 'Products at or below their minimum stock (or under 10 units) appear here.' },
  { filter: isOutOfStock, emptyTitle: 'Nothing is out of stock', emptyText: 'Tracked products with no stock left appear here.' },
  { filter: isOverstocked, emptyTitle: 'Nothing is overstocked', emptyText: 'Products above their maximum stock appear here.' },
]
const num = (n) => n.toLocaleString('en-AU')

// Local list filters (products tab chips + search, inventory tab chips). '' = any.
const NO_FILTERS = { q: '', category: '', brand: '', stock: '', attribute: '', price: '' }
const NO_INV_FILTERS = { warehouse: '', category: '' }
const STOCK_FILTERS = [
  ['in', 'In stock', (p) => p.track_inventory && p.stock_qty > 0 && !isLowStock(p)],
  ['low', 'Low', isLowStock],
  ['out', 'Out of stock', isOutOfStock],
  ['untracked', 'Not tracked', (p) => !p.track_inventory],
]
const PRICE_FILTERS = [
  ['u5', 'Under $5', (x) => x < 5],
  ['5-10', '$5 – $10', (x) => x >= 5 && x < 10],
  ['10-25', '$10 – $25', (x) => x >= 10 && x < 25],
  ['25+', '$25 and over', (x) => x >= 25],
]
const uniqueSorted = (values) => [...new Set(values.map((x) => (x || '').trim()).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'en-AU'))

function matchesFilters(p, f) {
  if (f.category && p.category_id !== f.category) return false
  if (f.brand && (p.brand || '').trim() !== f.brand) return false
  if (f.stock && !STOCK_FILTERS.find(([k]) => k === f.stock)[2](p)) return false
  if (f.attribute && !(p.attributes ?? []).includes(f.attribute)) return false
  if (f.price && !PRICE_FILTERS.find(([k]) => k === f.price)[2](Number(p.price))) return false
  const q = f.q.trim().toLowerCase()
  if (q && ![p.name, p.sku, p.brand, p.barcode].some((x) => (x || '').toLowerCase().includes(q))) return false
  return true
}

/** A filter chip that is a native select: "Label: All" until a value is picked (then highlighted). */
function FilterChip({ label, value, onChange, options, anyLabel = 'All' }) {
  const on = value !== ''
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={`Filter by ${label.toLowerCase()}`}
      style={{ appearance: "none", WebkitAppearance: "none", font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: on ? "#0B3D1F" : "#4A564E", background: on ? "#F1F9DF" : "#fff", border: `1px solid ${on ? "#C7E88A" : "#E4E7E2"}`, padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap", cursor: "pointer", outline: "none", maxWidth: "220px" }}
    >
      <option value="">{label}: {anyLabel}</option>
      {on && !options.some(([k]) => k === value) && <option value={value}>{label}: {value}</option>}
      {options.map(([k, text]) => <option key={k} value={k}>{label}: {text}</option>)}
    </select>
  )
}

function CategoryRow({ v, c, index, count, last }) {
  const disabled = !c.enabled
  const edit = () => v.openCategoryEdit(c)
  return (
    <div
      className="hv3"
      role="button"
      tabIndex={0}
      onClick={edit}
      onKeyDown={(e) => { if (e.target === e.currentTarget && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); edit() } }}
      style={{ display: "grid", gridTemplateColumns: "74px 2fr 1.2fr .8fr minmax(86px,1fr) 120px", gap: "14px", padding: "13px 16px", borderBottom: last ? "0" : "1px solid #EFF1ED", alignItems: "center", cursor: "pointer" }}
    >
      <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
        <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
          <circle cx="7.5" cy="5" r="1.2" fill="#C3C9C1" />
          <circle cx="12.5" cy="5" r="1.2" fill="#C3C9C1" />
          <circle cx="7.5" cy="10" r="1.2" fill="#C3C9C1" />
          <circle cx="12.5" cy="10" r="1.2" fill="#C3C9C1" />
          <circle cx="7.5" cy="15" r="1.2" fill="#C3C9C1" />
          <circle cx="12.5" cy="15" r="1.2" fill="#C3C9C1" />
        </svg>
        <span style={{ font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.sort ?? index + 1}</span>
      </span>
      <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "9px" }}>
        <CategoryTile name={c.short_name || c.name} bg={c.bg_color} src={c.image_url} />
        <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.name}</span>
      </span>
      <span style={{ minWidth: "0" }}>
        <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {c.subcategories.length} subcategor{c.subcategories.length === 1 ? "y" : "ies"}
        </span>
      </span>
      <span style={{ minWidth: "0" }}>
        <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{count}</span>
      </span>
      <span style={{ minWidth: "0" }}>
        <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: disabled ? "#5F6B62" : "#0B6B33", background: disabled ? "#EEF0EC" : "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
          {disabled ? "Disabled" : "Enabled"}
        </span>
      </span>
      <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
        <button onClick={(e) => { e.stopPropagation(); edit() }} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
          Edit
        </button>
        <button onClick={(e) => { e.stopPropagation(); edit() }} aria-label={`Edit ${c.name}`} style={{ width: "26px", height: "26px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
            <circle cx="5" cy="10" r="1.3" fill="#7C8A81" />
            <circle cx="10" cy="10" r="1.3" fill="#7C8A81" />
            <circle cx="15" cy="10" r="1.3" fill="#7C8A81" />
          </svg>
        </button>
      </span>
    </div>
  )
}

export default function Catalogue({ v }) {
  // One fetch per visit to the catalogue, shared by every tab below.
  const products = useProducts()
  const categoryState = useCategories()
  const categories = categoryState.rows
  const catsLoaded = categoryState.status === 'ready' || categoryState.status === 'off'
  const catStat = (n) => (catsLoaded ? num(n) : '—')
  const subcategoryCount = categories.reduce((n, c) => n + c.subcategories.length, 0)
  const disabledCats = categories.filter((c) => !c.enabled)
  const categoryIds = new Set(categories.map((c) => c.id))
  const loaded = products.status === 'ready'
  const stats = productStats(products.rows)
  const stat = (n) => (loaded ? num(n) : '—')
  const mapped = products.rows.filter((p) => categoryIds.has(p.category_id)).length
  const [filters, setFilters] = useState(NO_FILTERS)
  const [invFilters, setInvFilters] = useState(NO_INV_FILTERS)
  const setFilter = (k) => (val) => setFilters((f) => ({ ...f, [k]: val }))
  const setInvFilter = (k) => (val) => setInvFilters((f) => ({ ...f, [k]: val }))
  const filtering = Object.keys(NO_FILTERS).some((k) => filters[k].trim() !== '')
  const categoryNames = Object.fromEntries(categories.map((c) => [c.id, c.name]))
  const categoryOptions = categories.map((c) => [c.id, c.name])
  const brandOptions = uniqueSorted(products.rows.map((p) => p.brand)).map((b) => [b, b])
  const attributeOptions = uniqueSorted(products.rows.flatMap((p) => p.attributes ?? [])).map((a) => [a, a])
  const warehouseOptions = uniqueSorted(products.rows.filter((p) => p.track_inventory).map((p) => p.warehouse)).map((w) => [w, w])
  const productTab = PRODUCT_TABS[v.catProductTab] ? v.catProductTab : 0
  const invTab = INV_TABS[v.catStockTab] ? v.catStockTab : 0
  const productRows = products.rows.filter((p) => PRODUCT_TABS[productTab].filter(p) && matchesFilters(p, filters))
  const invMatches = (p) => (!invFilters.warehouse || (p.warehouse || '').trim() === invFilters.warehouse) && (!invFilters.category || p.category_id === invFilters.category)
  const invRows = products.rows
    .filter((p) => p.track_inventory && INV_TABS[invTab].filter(p) && invMatches(p))
    .sort((a, b) => a.stock_qty - b.stock_qty)
  const invFiltering = invFilters.warehouse !== '' || invFilters.category !== ''

  // Real CSV downloads of what each tab currently lists.
  const exportCurrent = () => {
    if (v.isCats) {
      if (!catsLoaded) return v.flash('Categories are still loading')
      if (!categories.length) return v.flash('No categories to export')
      downloadCsv(`categories-${fileDate()}.csv`, ['Order', 'Category', 'ID', 'Subcategories', 'Products', 'Status'],
        categories.map((c, i) => [c.sort ?? i + 1, c.name, c.id, c.subcategories.join('; '), loaded ? stats.byCategory[c.id] || 0 : '', c.enabled ? 'Enabled' : 'Disabled']))
      return v.flash(`Exported ${num(categories.length)} categor${categories.length === 1 ? 'y' : 'ies'} to CSV`)
    }
    if (!loaded) return v.flash('Products are still loading')
    const rows = v.isInv ? invRows : productRows
    if (!rows.length) return v.flash('Nothing to export in this view')
    exportProductsCsv(rows, categoryNames, `${v.isInv ? 'inventory' : 'products'}-${fileDate()}.csv`)
    v.flash(`Exported ${num(rows.length)} product${rows.length === 1 ? '' : 's'} to CSV`)
  }
  // Tracked products at or below their minimum (or out), in the current warehouse / category filter.
  const exportReorder = () => {
    if (!loaded) return v.flash('Products are still loading')
    const rows = products.rows.filter((p) => p.track_inventory && (isLowStock(p) || isOutOfStock(p)) && invMatches(p)).sort((a, b) => a.stock_qty - b.stock_qty)
    if (!rows.length) return v.flash(invFiltering ? 'Nothing needs reordering in this filter' : 'Nothing needs reordering')
    downloadCsv(`reorder-report-${fileDate()}.csv`, ['Name', 'Brand', 'SKU', 'Category', 'Warehouse', 'On hand', 'Min stock', 'Max stock', 'Status', 'Reorder to max'],
      rows.map((p) => [p.name, p.brand, p.sku, categoryNames[p.category_id] || p.category_id, p.warehouse, p.stock_qty, p.min_stock ?? '', p.max_stock ?? '', stockPill(p)[0], p.max_stock != null ? Math.max(0, p.max_stock - p.stock_qty) : '']))
    v.flash(`Reorder report · ${num(rows.length)} product${rows.length === 1 ? '' : 's'}`)
  }
  return (
    <>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "18px", padding: "24px 26px 2px" }}>
        <span style={{ display: "flex", flexDirection: "column", gap: "5px", minWidth: "0" }}>
          <span style={{ font: "700 20px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Catalogue</span>
          <span style={{ font: "400 12.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>
            {loaded ? `${num(stats.total)} product${stats.total === 1 ? "" : "s"} across ${categories.length} categories · ${num(stats.low + stats.out)} need restocking` : "Loading products…"}
          </span>
        </span>
        <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "8px", height: "34px", width: "230px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff" }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
              <circle cx="9" cy="9" r="6" stroke="#7C8A81" strokeWidth="1.6" />
              <path d="M13.4 13.4L18 18" stroke="#7C8A81" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <span style={{ font: "400 12.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {v.catSearch}
            </span>
          </span>
          <button onClick={exportCurrent} title="Download what this tab lists as CSV" style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 12px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", color: "#17201A", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
              <path d="M10 3.6v9M6.4 9.2L10 12.8l3.6-3.6M3.6 16.4h12.8" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Export
          </button>
          {v.isProducts && (
            <>
              <button onClick={v.nav_addproduct} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 13px", border: "0", borderRadius: "8px", background: "#0B3D1F", color: "#fff", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
                <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <path d="M10 4.4v11.2M4.4 10h11.2" stroke="#8BE000" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                Add product
              </button>
            </>
          )}
          {v.isCats && (
            <>
              <button onClick={v.openCategoryCreate} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 13px", border: "0", borderRadius: "8px", background: "#0B3D1F", color: "#fff", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
                <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <path d="M10 4.4v11.2M4.4 10h11.2" stroke="#8BE000" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                Add category
              </button>
            </>
          )}
          {v.isInv && (
            <>
              <button onClick={() => v.flash('Bulk stock updates coming soon · use Adjust on a row')} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 13px", border: "0", borderRadius: "8px", background: "#0B3D1F", color: "#fff", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
                <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#8BE000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Bulk update
              </button>
            </>
          )}
        </span>
      </div>
      <div className="ad-scroll" style={{ flex: "1", minHeight: "0", overflowY: "auto", padding: "20px 26px 30px", display: "flex", flexDirection: "column", gap: "18px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "2px", borderBottom: "1px solid #E4E7E2" }}>
          <button onClick={v.ct_products} style={{ display: "flex", alignItems: "center", gap: "8px", border: "0", background: "transparent", padding: "0 14px 11px", font: "600 13px/1.2 Inter,system-ui,sans-serif", color: v.ct_productsFg, borderBottom: `2px solid ${v.ct_productsBd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
            {" Products"}
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: v.ct_productsFg, background: v.ct_productsBg, padding: "4px 7px", borderRadius: "5px", whiteSpace: "nowrap" }}>
              {loaded ? num(stats.total) : "—"}
            </span>
          </button>
          <button onClick={v.ct_cats} style={{ display: "flex", alignItems: "center", gap: "8px", border: "0", background: "transparent", padding: "0 14px 11px", font: "600 13px/1.2 Inter,system-ui,sans-serif", color: v.ct_catsFg, borderBottom: `2px solid ${v.ct_catsBd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
            {" Categories"}
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: v.ct_catsFg, background: v.ct_catsBg, padding: "4px 7px", borderRadius: "5px", whiteSpace: "nowrap" }}>
              {catStat(categories.length)}
            </span>
          </button>
          <button onClick={v.ct_inv} style={{ display: "flex", alignItems: "center", gap: "8px", border: "0", background: "transparent", padding: "0 14px 11px", font: "600 13px/1.2 Inter,system-ui,sans-serif", color: v.ct_invFg, borderBottom: `2px solid ${v.ct_invBd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
            {" Inventory"}
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: v.ct_invFg, background: v.ct_invBg, padding: "4px 7px", borderRadius: "5px", whiteSpace: "nowrap" }}>
              {loaded ? `${num(stats.tracked)} SKUs` : "—"}
            </span>
          </button>
          <span style={{ marginLeft: "auto", paddingBottom: "10px" }}>
            {" "}
            <span style={{ font: "400 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>{loaded ? `${num(stats.low)} items low on stock · ${num(stats.out)} out of stock` : ""}</span>
            {" "}
          </span>
        </div>
        {v.isProducts && (
          <>
            <div className="ad-scroll" style={{ display: "flex", gap: "2px", borderBottom: "1px solid #E4E7E2", overflowX: "auto" }}>
              <button onClick={v.tb_catalogue_0} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_catalogue_0Fg, borderBottom: `2px solid ${v.tb_catalogue_0Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
                All products
              </button>
              <button onClick={v.tb_catalogue_1} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_catalogue_1Fg, borderBottom: `2px solid ${v.tb_catalogue_1Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
                Active
              </button>
              <button onClick={v.tb_catalogue_2} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_catalogue_2Fg, borderBottom: `2px solid ${v.tb_catalogue_2Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
                Draft
              </button>
              <button onClick={v.tb_catalogue_3} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_catalogue_3Fg, borderBottom: `2px solid ${v.tb_catalogue_3Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
                Out of stock
              </button>
              <button onClick={v.tb_catalogue_4} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_catalogue_4Fg, borderBottom: `2px solid ${v.tb_catalogue_4Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
                Archived
              </button>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
              <FilterChip label="Category" value={filters.category} onChange={setFilter('category')} options={categoryOptions} />
              <FilterChip label="Brand" value={filters.brand} onChange={setFilter('brand')} options={brandOptions} />
              <FilterChip label="Stock" value={filters.stock} onChange={setFilter('stock')} options={STOCK_FILTERS.map(([k, t]) => [k, t])} anyLabel="any" />
              <FilterChip label="Attribute" value={filters.attribute} onChange={setFilter('attribute')} options={attributeOptions} anyLabel="any" />
              <FilterChip label="Price" value={filters.price} onChange={setFilter('price')} options={PRICE_FILTERS.map(([k, t]) => [k, t])} anyLabel="any" />
            </div>
            <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", overflow: "hidden", flex: "none" }}>
              {" "}
              <div style={{ display: "flex", alignItems: "center", gap: "9px", padding: "12px 16px", borderBottom: "1px solid #E4E7E2", flexWrap: "wrap" }}>
                <span className="sk-input-wrap" style={{ display: "flex", alignItems: "center", gap: "8px", height: "34px", width: "200px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", boxSizing: "border-box" }}>
                  <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <circle cx="9" cy="9" r="6" stroke="#7C8A81" strokeWidth="1.6" />
                    <path d="M13.4 13.4L18 18" stroke="#7C8A81" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                  <input
                    className="sk-input sk-input-bare"
                    type="search"
                    value={filters.q}
                    onChange={(e) => setFilter('q')(e.target.value)}
                    placeholder="Filter this list…"
                    aria-label="Filter products by name, SKU, brand or barcode"
                    style={{ flex: "1", minWidth: "0", height: "32px", border: "0", outline: "none", background: "transparent", padding: "0", font: "400 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A" }}
                  />
                </span>
                <button className="hv1" onClick={() => setFilters(NO_FILTERS)} disabled={!filtering} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 12px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", color: filtering ? "#17201A" : "#A3ADA6", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: filtering ? "pointer" : "default", whiteSpace: "nowrap" }}>
                  Clear filters
                </button>
                <button className="hv1" onClick={() => v.flash('Bulk category assignment coming soon')} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 12px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", color: "#17201A", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
                  Assign category
                </button>
                <span style={{ marginLeft: "auto", font: "400 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Sorted by newest first</span>
              </div>
              {" "}
              <div style={{ display: "grid", gridTemplateColumns: "2.1fr 1fr 1fr .7fr .6fr minmax(96px,1fr) .9fr 120px", gap: "14px", padding: "11px 16px", background: "#F6F7F4", borderBottom: "1px solid #E4E7E2" }}>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Product
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  SKU
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Category
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Price
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Stock
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Status
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Updated
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Actions
                </span>
              </div>
              {" "}
              <LiveProductRows v={v} products={products} rows={productRows} emptyTitle={filtering ? 'No products match these filters' : PRODUCT_TABS[productTab].emptyTitle} emptyText={filtering ? 'Change or clear the filters to see more products.' : PRODUCT_TABS[productTab].emptyText} />
              <ListFooter shown={productRows.length} total={stats.total} noun="products" />
              {" "}
            </div>
          </>
        )}
        {v.isCats && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "14px" }}>
              <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "15px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "26px", height: "26px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                      <rect x="3.2" y="3.2" width="6" height="6" rx="1.5" stroke="#4A564E" strokeWidth="1.5" />
                      <rect x="10.8" y="3.2" width="6" height="6" rx="1.5" stroke="#4A564E" strokeWidth="1.5" />
                      <rect x="3.2" y="10.8" width="6" height="6" rx="1.5" stroke="#4A564E" strokeWidth="1.5" />
                      <rect x="10.8" y="10.8" width="6" height="6" rx="1.5" stroke="#4A564E" strokeWidth="1.5" />
                    </svg>
                  </span>
                  <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Total categories</span>
                </span>
                <span style={{ font: "700 23px/1.2 Inter,system-ui,sans-serif", color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>{catStat(categories.length)}</span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", background: "#EEF0EC", padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
                  {catsLoaded ? `${num(categories.length - disabledCats.length)} live in the app` : "Loading…"}
                </span>
              </div>
              <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "15px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "26px", height: "26px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                      <path d="M3.4 6.6L10 3.3l6.6 3.3L10 9.9 3.4 6.6z" stroke="#4A564E" strokeWidth="1.5" strokeLinejoin="round" />
                      <path d="M3.4 6.6v6.8L10 16.7l6.6-3.3V6.6" stroke="#4A564E" strokeWidth="1.5" strokeLinejoin="round" />
                      <path d="M10 9.9v6.8" stroke="#4A564E" strokeWidth="1.5" />
                    </svg>
                  </span>
                  <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Subcategories</span>
                </span>
                <span style={{ font: "700 23px/1.2 Inter,system-ui,sans-serif", color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>{catStat(subcategoryCount)}</span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", background: "#EEF0EC", padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
                  {catsLoaded && categories.length ? `~${Math.round((subcategoryCount / categories.length) * 10) / 10} per category` : "Across all aisles"}
                </span>
              </div>
              <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "15px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "26px", height: "26px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                      <rect x="3" y="8.8" width="6" height="7.8" rx="1.4" stroke="#4A564E" strokeWidth="1.5" />
                      <rect x="11" y="8.8" width="6" height="7.8" rx="1.4" stroke="#4A564E" strokeWidth="1.5" />
                      <rect x="7" y="3.4" width="6" height="4.6" rx="1.4" stroke="#4A564E" strokeWidth="1.5" />
                    </svg>
                  </span>
                  <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Products mapped</span>
                </span>
                <span style={{ font: "700 23px/1.2 Inter,system-ui,sans-serif", color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>{stat(mapped)}</span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
                  {!loaded ? "Loading…" : stats.total ? `${Math.round((mapped / stats.total) * 1000) / 10}% coverage` : "No products yet"}
                </span>
              </div>
              <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "15px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "26px", height: "26px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                      <path d="M10 3.6l7 12.2H3l7-12.2z" stroke="#4A564E" strokeWidth="1.5" strokeLinejoin="round" />
                      <path d="M10 8v3.4" stroke="#4A564E" strokeWidth="1.6" strokeLinecap="round" />
                      <circle cx="10" cy="13.6" r=".9" fill="#4A564E" />
                    </svg>
                  </span>
                  <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Disabled</span>
                </span>
                <span style={{ font: "700 23px/1.2 Inter,system-ui,sans-serif", color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>{catStat(disabledCats.length)}</span>
                <span title={disabledCats.map((c) => c.name).join(', ')} style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: disabledCats.length ? "#8A6100" : "#0B6B33", background: disabledCats.length ? "#FBF1DE" : "#E9F6E3", padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap", maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {!catsLoaded ? "Loading…" : disabledCats.length ? `${disabledCats.map((c) => c.name).join(', ')} · hidden` : "All categories live"}
                </span>
              </div>
            </div>
            <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", overflow: "hidden", flex: "none" }}>
              {" "}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 16px", borderBottom: "1px solid #E4E7E2", flexWrap: "wrap" }}>
                <span style={{ font: "600 13.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Main categories
                </span>
                <span>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#5F6B62", background: "#EEF0EC", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                    SORTED BY ORDER
                  </span>
                </span>
                <span style={{ marginLeft: "auto" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Order matches the customer app aisle strip · edit a category to change it
                  </span>
                </span>
              </div>
              {" "}
              <div style={{ display: "grid", gridTemplateColumns: "74px 2fr 1.2fr .8fr minmax(86px,1fr) 120px", gap: "14px", padding: "11px 16px", background: "#F6F7F4", borderBottom: "1px solid #E4E7E2" }}>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Order
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Category
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Structure
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Products
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Status
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Actions
                </span>
              </div>
              {" "}
              {categoryState.status === 'loading' || (categoryState.status === 'error' && categories.length > 0) ? (
                <div style={{ padding: "13px 16px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.4 Inter,system-ui,sans-serif", color: categoryState.status === 'error' ? "#B3402F" : "#7C8A81" }}>
                    {categoryState.status === 'loading' ? "Loading categories from Supabase…" : `Couldn't load categories from Supabase · ${categoryState.error}`}
                  </span>
                  {categoryState.status === 'error' && <button onClick={categoryState.refetch} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer" }}>Retry</button>}
                </div>
              ) : categories.length === 0 ? (
                <div style={{ padding: "40px 16px", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", textAlign: "center" }}>
                  <span style={{ font: "600 14px/1.2 Inter,system-ui,sans-serif", color: "#17201A" }}>No categories yet</span>
                  <span style={{ font: "400 12px/1.45 Inter,system-ui,sans-serif", color: categoryState.status === 'error' ? "#B3402F" : "#7C8A81", maxWidth: "380px" }}>
                    {categoryState.status === 'error' ? `Couldn't load categories from Supabase · ${categoryState.error}` : categoryState.status === 'off' ? "Supabase is not configured · categories can't be loaded or created." : "Create the first aisle for the customer app · upload its image and add its subcategories."}
                  </span>
                  <span style={{ display: "flex", gap: "8px" }}>
                    {categoryState.status === 'error' && <button onClick={categoryState.refetch} style={{ height: "34px", padding: "0 12px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer" }}>Retry</button>}
                    <button onClick={v.openCategoryCreate} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 13px", border: "0", borderRadius: "8px", background: "#0B3D1F", color: "#fff", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
                      <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                        <path d="M10 4.4v11.2M4.4 10h11.2" stroke="#8BE000" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                      Add category
                    </button>
                  </span>
                </div>
              ) : null}
              {categoryState.status !== 'loading' && categories.map((c, i) => <CategoryRow key={c.id} v={v} c={c} index={i} count={loaded ? num(stats.byCategory[c.id] || 0) : "—"} last={i === categories.length - 1} />)}
            </div>
          </>
        )}
        {v.isInv && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "14px" }}>
              <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "15px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "26px", height: "26px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                      <path d="M3.4 6.6L10 3.3l6.6 3.3L10 9.9 3.4 6.6z" stroke="#4A564E" strokeWidth="1.5" strokeLinejoin="round" />
                      <path d="M3.4 6.6v6.8L10 16.7l6.6-3.3V6.6" stroke="#4A564E" strokeWidth="1.5" strokeLinejoin="round" />
                      <path d="M10 9.9v6.8" stroke="#4A564E" strokeWidth="1.5" />
                    </svg>
                  </span>
                  <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Total products</span>
                </span>
                <span style={{ font: "700 23px/1.2 Inter,system-ui,sans-serif", color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>{stat(stats.total)}</span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", background: "#EEF0EC", padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
                  Tracked inventory
                </span>
              </div>
              <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "15px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "26px", height: "26px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                      <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#4A564E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>In stock</span>
                </span>
                <span style={{ font: "700 23px/1.2 Inter,system-ui,sans-serif", color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>{stat(stats.inStock)}</span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
                  {!loaded ? "Loading…" : stats.tracked ? `${Math.round((stats.inStock / stats.tracked) * 1000) / 10}% availability` : "No tracked stock"}
                </span>
              </div>
              <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "15px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "26px", height: "26px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                      <path d="M10 3.6l7 12.2H3l7-12.2z" stroke="#4A564E" strokeWidth="1.5" strokeLinejoin="round" />
                      <path d="M10 8v3.4" stroke="#4A564E" strokeWidth="1.6" strokeLinecap="round" />
                      <circle cx="10" cy="13.6" r=".9" fill="#4A564E" />
                    </svg>
                  </span>
                  <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Low stock</span>
                </span>
                <span style={{ font: "700 23px/1.2 Inter,system-ui,sans-serif", color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>{stat(stats.low)}</span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#8A6100", background: "#FBF1DE", padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
                  Reorder soon
                </span>
              </div>
              <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "15px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "26px", height: "26px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                      <path d="M10 3.6l7 12.2H3l7-12.2z" stroke="#4A564E" strokeWidth="1.5" strokeLinejoin="round" />
                      <path d="M10 8v3.4" stroke="#4A564E" strokeWidth="1.6" strokeLinecap="round" />
                      <circle cx="10" cy="13.6" r=".9" fill="#4A564E" />
                    </svg>
                  </span>
                  <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Out of stock</span>
                </span>
                <span style={{ font: "700 23px/1.2 Inter,system-ui,sans-serif", color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>{stat(stats.out)}</span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#A93826", background: "#FAEDEA", padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
                  Lost sales risk
                </span>
              </div>
            </div>
            <div className="ad-scroll" style={{ display: "flex", gap: "2px", borderBottom: "1px solid #E4E7E2", overflowX: "auto" }}>
              <button onClick={v.tb_catalogue2_0} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_catalogue2_0Fg, borderBottom: `2px solid ${v.tb_catalogue2_0Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
                All stock
              </button>
              <button onClick={v.tb_catalogue2_1} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_catalogue2_1Fg, borderBottom: `2px solid ${v.tb_catalogue2_1Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
                Critical
              </button>
              <button onClick={v.tb_catalogue2_2} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_catalogue2_2Fg, borderBottom: `2px solid ${v.tb_catalogue2_2Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
                Low stock
              </button>
              <button onClick={v.tb_catalogue2_3} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_catalogue2_3Fg, borderBottom: `2px solid ${v.tb_catalogue2_3Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
                Out of stock
              </button>
              <button onClick={v.tb_catalogue2_4} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_catalogue2_4Fg, borderBottom: `2px solid ${v.tb_catalogue2_4Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
                Overstocked
              </button>
            </div>
            <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", overflow: "hidden", flex: "none" }}>
              {" "}
              <div style={{ display: "flex", alignItems: "center", gap: "9px", padding: "12px 16px", borderBottom: "1px solid #E4E7E2", flexWrap: "wrap" }}>
                <FilterChip label="Warehouse" value={invFilters.warehouse} onChange={setInvFilter('warehouse')} options={warehouseOptions} />
                <FilterChip label="Category" value={invFilters.category} onChange={setInvFilter('category')} options={categoryOptions} />
                <button className="hv1" onClick={exportReorder} title="Download tracked products at or below their minimum stock as CSV" style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 12px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", color: "#17201A", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
                  Reorder report
                </button>
                <span style={{ marginLeft: "auto", font: "400 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>{products.fetchedAt ? `Last sync ${timeAgo(products.fetchedAt).toLowerCase()}` : "Syncing…"}</span>
              </div>
              {" "}
              <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1fr .7fr .7fr .8fr .8fr minmax(104px,1.1fr) .9fr 90px", gap: "14px", padding: "11px 16px", background: "#F6F7F4", borderBottom: "1px solid #E4E7E2" }}>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Product / SKU
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Category
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  On hand
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Reserved
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Available
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Minimum
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Status
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Updated
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Action
                </span>
              </div>
              {" "}
              <InventoryRows v={v} products={products} rows={invRows} emptyTitle={invFiltering ? 'No tracked products match these filters' : INV_TABS[invTab].emptyTitle} emptyText={invFiltering ? 'Change the warehouse or category filter to see more.' : INV_TABS[invTab].emptyText} />
              <ListFooter shown={invRows.length} total={stats.tracked} noun="tracked products" />
              {" "}
            </div>
          </>
        )}
      </div>
    </>
  )
}
