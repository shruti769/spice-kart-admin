import { useCategoryNames } from '../lib/categories'
import { moneyAU, num, useNow } from '../lib/customers'
import { STATUS_PILL, customerName, placedLabel, statusLabel } from '../lib/orders'
import { isCriticalStock, isLowStock, isOutOfStock, isOverstocked, statusPill, useProductDetail } from '../lib/products'

const FONT = 'Inter,system-ui,sans-serif'
const GREEN = ['#0B6B33', '#E9F6E3']
const AMBER = ['#8A6100', '#FBF1DE']
const RED = ['#A93826', '#FAEDEA']
const GREY = ['#5F6B62', '#EEF0EC']
const ORDER_GRID = '.9fr 1.2fr .5fr .7fr 1fr 1fr'

const btn = { display: 'flex', alignItems: 'center', gap: '7px', height: '34px', padding: '0 12px', border: '1px solid #E4E7E2', borderRadius: '8px', background: '#fff', color: '#17201A', font: `600 12.5px/1.2 ${FONT}`, cursor: 'pointer', whiteSpace: 'nowrap' }
const primaryBtn = { ...btn, padding: '0 13px', border: '0', background: '#0B3D1F', color: '#fff' }
const card = { background: '#fff', border: '1px solid #E4E7E2', borderRadius: '10px' }
const pill = ([fg, bg], pad = '5px 8px') => ({ font: `600 10.5px/1.2 ${FONT}`, color: fg, background: bg, padding: pad, borderRadius: '5px', whiteSpace: 'nowrap', display: 'inline-block' })
const kpiPill = (colors) => ({ ...pill(colors, '4px 7px'), alignSelf: 'flex-start', maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis' })
const ellipsis = { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }
const muted = { font: `400 11px/1.2 ${FONT}`, color: '#7C8A81', ...ellipsis }
const headCell = { font: `600 10.5px/1.2 ${FONT}`, letterSpacing: '.5px', color: '#7C8A81', textTransform: 'uppercase', ...ellipsis }
const cell = { minWidth: '0', display: 'flex', alignItems: 'center', gap: '8px' }
const dayLabel = (t) => new Date(t).toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'short' })

/** Stock card pill: Critical / Below minimum / Healthy (plus the out / untracked / overstocked cases). */
function stockState(p) {
  if (!p.track_inventory) return ['Not tracked', GREY]
  if (isOutOfStock(p)) return ['Out of stock', RED]
  if (isCriticalStock(p)) return ['Critical', RED]
  if (isLowStock(p)) return [p.min_stock != null ? 'Below minimum' : 'Low stock', AMBER]
  if (isOverstocked(p)) return ['Above maximum', GREY]
  return ['Healthy', GREEN]
}

/** Last 30 days vs the 30 before: [label, colors, tooltip]. */
function trend(cur, prev, fmt) {
  const title = `Last 30 days ${fmt(cur)} · previous 30 days ${fmt(prev)}`
  if (prev === 0) return [cur === 0 ? 'No sales in 60 days' : 'No sales in prior 30d', GREY, title]
  const pct = ((cur - prev) / prev) * 100
  if (Math.abs(pct) < 0.05) return ['0.0% vs prior 30d', GREY, title]
  return [`${pct > 0 ? '▲' : '▼'} ${Math.abs(pct).toFixed(1)}%`, pct > 0 ? GREEN : RED, title]
}

function Message({ title, text, children }) {
  return (
    <div style={{ ...card, padding: '40px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', textAlign: 'center' }}>
      <span style={{ font: `600 14px/1.2 ${FONT}`, color: '#17201A' }}>{title}</span>
      {text && <span style={{ font: `400 12px/1.45 ${FONT}`, color: '#7C8A81', maxWidth: '400px' }}>{text}</span>}
      {children && <span style={{ display: 'flex', gap: '8px' }}>{children}</span>}
    </div>
  )
}

function BackLink({ v }) {
  return (
    <button onClick={v.nav_products} style={{ display: 'flex', alignItems: 'center', gap: '6px', border: '0', background: 'transparent', font: `600 11.5px/1.2 ${FONT}`, color: '#17693A', cursor: 'pointer', padding: '0', whiteSpace: 'nowrap', alignSelf: 'flex-start' }}>
      <svg width="13" height="13" viewBox="0 0 20 20" fill="none" style={{ flex: 'none' }}>
        <path d="M12.4 4.4L6.8 10l5.6 5.6" stroke="#17693A" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Back to products
    </button>
  )
}

function InfoRow({ label, value }) {
  return (
    <span style={{ display: 'flex', justifyContent: 'space-between', gap: '14px', whiteSpace: 'nowrap', padding: '7px 0', borderTop: '1px solid #EFF1ED' }}>
      <span style={{ font: `400 11px/1.2 ${FONT}`, color: '#7C8A81', ...ellipsis }}>{label}</span>
      <span title={value || undefined} style={{ font: `600 12.5px/1.2 ${FONT}`, color: value ? '#17201A' : '#7C8A81', ...ellipsis }}>{value || '—'}</span>
    </span>
  )
}

function Kpi({ icon, label, value, pillLabel, colors, title, children }) {
  return (
    <div style={{ ...card, padding: '15px 16px', display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '0' }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ width: '26px', height: '26px', borderRadius: '7px', background: '#F6F7F4', border: '1px solid #E4E7E2', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: 'none' }}>{icon}</svg>
        </span>
        <span style={{ font: `500 11.5px/1.2 ${FONT}`, color: '#7C8A81', ...ellipsis }}>{label}</span>
      </span>
      <span style={{ font: `700 23px/1.2 ${FONT}`, color: '#17201A', letterSpacing: '-.4px', ...ellipsis }}>{value}</span>
      <span style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '0' }}>
        <span title={title} style={kpiPill(colors)}>{pillLabel}</span>
        {children}
      </span>
    </div>
  )
}

const ICONS = {
  units: (
    <>
      <path d="M3.4 6.6L10 3.3l6.6 3.3L10 9.9 3.4 6.6z" stroke="#4A564E" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M3.4 6.6v6.8L10 16.7l6.6-3.3V6.6" stroke="#4A564E" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 9.9v6.8" stroke="#4A564E" strokeWidth="1.5" />
    </>
  ),
  revenue: (
    <>
      <circle cx="10" cy="10" r="7.2" stroke="#4A564E" strokeWidth="1.5" />
      <path d="M10 5.6v8.8" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12.3 7.9c0-1.05-1.03-1.75-2.3-1.75s-2.3.7-2.3 1.75 1.03 1.55 2.3 1.85 2.3.8 2.3 1.85-1.03 1.75-2.3 1.75-2.3-.7-2.3-1.75" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  stock: (
    <>
      <rect x="3" y="8.8" width="6" height="7.8" rx="1.4" stroke="#4A564E" strokeWidth="1.5" />
      <rect x="11" y="8.8" width="6" height="7.8" rx="1.4" stroke="#4A564E" strokeWidth="1.5" />
      <rect x="7" y="3.4" width="6" height="4.6" rx="1.4" stroke="#4A564E" strokeWidth="1.5" />
    </>
  ),
  star: <path d="M10 3.2l2.1 4.3 4.7.7-3.4 3.3.8 4.7L10 14l-4.2 2.2.8-4.7L3.2 8.2l4.7-.7L10 3.2z" stroke="#4A564E" strokeWidth="1.5" strokeLinejoin="round" />,
}

function RecentOrders({ v, detail, now }) {
  const rows = detail.recent
  let body
  if (detail.salesError && !rows.length) {
    body = <div style={{ padding: '13px 16px' }}><span style={{ ...muted, whiteSpace: 'normal', color: '#B3402F' }}>Couldn’t load orders · {detail.salesError}</span></div>
  } else if (!rows.length) {
    body = (
      <div style={{ padding: '30px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', textAlign: 'center' }}>
        <span style={{ font: `600 13px/1.2 ${FONT}`, color: '#17201A' }}>No orders yet</span>
        <span style={{ font: `400 12px/1.45 ${FONT}`, color: '#7C8A81' }}>Orders that include this product appear here.</span>
      </div>
    )
  } else {
    body = rows.map((o, i) => {
      const qty = (o.order_items ?? []).reduce((n, it) => n + Number(it.qty || 0), 0)
      const value = (o.order_items ?? []).reduce((n, it) => n + Number(it.line_total || 0), 0)
      const open = () => v.openOrder(o)
      return (
        <div
          key={o.id}
          className="hv3"
          role="button"
          tabIndex={0}
          onClick={open}
          onKeyDown={(e) => { if (e.target === e.currentTarget && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); open() } }}
          style={{ display: 'grid', gridTemplateColumns: ORDER_GRID, gap: '14px', padding: '13px 16px', borderBottom: i === rows.length - 1 ? '0' : '1px solid #EFF1ED', alignItems: 'center', cursor: 'pointer' }}
        >
          <span style={cell}><span style={{ font: `700 12.5px/1.2 ${FONT}`, color: '#17201A', ...ellipsis }}>#{o.number}</span></span>
          <span style={cell}>
            <button
              onClick={(e) => { e.stopPropagation(); if (o.customer_id) v.openCustomer(o.customer_id) }}
              style={{ border: '0', background: 'transparent', padding: '0', cursor: o.customer_id ? 'pointer' : 'default', font: `500 12.5px/1.2 ${FONT}`, color: '#17201A', textAlign: 'left', minWidth: '0', ...ellipsis }}
            >
              {customerName(o.customer)}
            </button>
          </span>
          <span style={cell}><span style={muted}>{num(qty)}</span></span>
          <span style={cell}><span style={{ font: `600 12.5px/1.2 ${FONT}`, color: '#17201A', ...ellipsis }}>{moneyAU(value)}</span></span>
          <span style={cell}><span style={pill(STATUS_PILL[o.status] ?? GREY)}>{statusLabel(o.status)}</span></span>
          <span style={cell}><span style={muted}>{placedLabel(o.placed_at, new Date(now))}</span></span>
        </div>
      )
    })
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <span style={{ font: `600 13.5px/1.2 ${FONT}`, color: '#17201A' }}>Recent orders with this product</span>
      <div style={{ ...card, overflow: 'hidden', flex: 'none' }}>
        <div style={{ display: 'grid', gridTemplateColumns: ORDER_GRID, gap: '14px', padding: '11px 16px', background: '#F6F7F4', borderBottom: '1px solid #E4E7E2' }}>
          {['Order', 'Customer', 'Qty', 'Value', 'Status', 'Date'].map((h) => <span key={h} style={headCell}>{h}</span>)}
        </div>
        {body}
      </div>
    </div>
  )
}

function SalesTrend({ sales, error }) {
  const max = Math.max(0, ...sales.daily.map((d) => d.units))
  const total = sales.daily.reduce((n, d) => n + d.units, 0)
  return (
    <div style={{ ...card, padding: '18px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ font: `600 13.5px/1.2 ${FONT}`, color: '#17201A' }}>Sales trend · last 14 days</span>
        <span style={{ marginLeft: 'auto', ...muted }}>{error ? '' : total ? `${num(total)} unit${total === 1 ? '' : 's'} sold` : 'No sales in the last 14 days'}</span>
      </span>
      {error ? (
        <span style={{ ...muted, whiteSpace: 'normal', color: '#B3402F' }}>Couldn’t load sales · {error}</span>
      ) : (
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '112px' }}>
          {sales.daily.map((d, i) => (
            <span
              key={d.day}
              title={`${dayLabel(d.day)} · ${num(d.units)} unit${d.units === 1 ? '' : 's'} · ${moneyAU(d.revenue)}`}
              style={{ flex: '1', height: max && d.units ? `${Math.max(4, (d.units / max) * 100)}%` : '3px', background: i === sales.daily.length - 1 ? '#0B3D1F' : d.units ? '#DCE9D2' : '#EFF1ED', borderRadius: '4px 4px 0 0', display: 'block' }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function ProductDetail({ v }) {
  const id = v.productId
  const q = useProductDetail(id)
  const categoryNames = useCategoryNames()
  const now = useNow()

  const shell = (title, subtitle, content) => (
    <>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '18px', padding: '24px 26px 2px' }}>
        <span style={{ display: 'flex', flexDirection: 'column', gap: '5px', minWidth: '0' }}>
          <span style={{ font: `700 20px/1.2 ${FONT}`, color: '#17201A', ...ellipsis }}>{title}</span>
          <span style={{ font: `400 12.5px/1.2 ${FONT}`, color: '#7C8A81', ...ellipsis }}>{subtitle}</span>
        </span>
      </div>
      <div className="ad-scroll" style={{ flex: '1', minHeight: '0', overflowY: 'auto', padding: '20px 26px 30px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <BackLink v={v} />
        {content}
      </div>
    </>
  )

  if (!id) {
    return shell('Product', 'Catalogue', (
      <Message title="Pick a product from the catalogue" text="Open a product’s actions in the catalogue and choose View details to see its sales, stock and recent orders.">
        <button className="hv2" onClick={v.nav_products} style={primaryBtn}>Go to catalogue</button>
      </Message>
    ))
  }
  const detail = q.data && q.data.id === id ? q.data : null
  if (q.status === 'off') return shell('Product', 'Catalogue', <Message title="Supabase isn’t configured" text="Add the project URL and key to .env to load products." />)
  if (!detail && q.status === 'error') {
    return shell('Product', 'Catalogue', (
      <Message title="Couldn’t load this product" text={q.error}>
        <button onClick={q.refetch} style={btn}>Retry</button>
      </Message>
    ))
  }
  if (!detail && (q.status === 'loading' || q.data !== null)) return shell('Loading product…', 'Catalogue', <Message title="Loading product…" />)
  if (!detail) {
    return shell('Product not found', 'Catalogue', (
      <Message title="This product no longer exists" text="It may have been deleted. Pick another product from the catalogue.">
        <button className="hv2" onClick={v.nav_products} style={primaryBtn}>Go to catalogue</button>
      </Message>
    ))
  }

  const p = detail.product
  const { sales, rating } = detail
  const category = categoryNames[p.category_id] || p.category_id
  const subtitle = [p.sku || 'No SKU', [category, p.subcategory].filter(Boolean).join(' › ')].filter(Boolean).join(' · ')
  const [statusLabelText, statusFg, statusBg] = statusPill(p)
  const [stockLabel, stockColors] = stockState(p)
  const compareAt = p.compare_at_price != null && Number(p.compare_at_price) > Number(p.price) ? Number(p.compare_at_price) : null
  const salesKnown = !detail.salesError
  const [unitsPill, unitsColors, unitsTitle] = salesKnown ? trend(sales.units30, sales.unitsPrev, num) : ['Unavailable', GREY, detail.salesError]
  const [revPill, revColors, revTitle] = salesKnown ? trend(sales.revenue30, sales.revenuePrev, moneyAU) : ['Unavailable', GREY, detail.salesError]
  const ratingColors = rating.avg == null ? GREY : rating.avg >= 4 ? GREEN : rating.avg >= 3 ? AMBER : RED

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '18px', padding: '24px 26px 2px' }}>
        <span style={{ display: 'flex', flexDirection: 'column', gap: '5px', minWidth: '0' }}>
          <span title={p.name} style={{ font: `700 20px/1.2 ${FONT}`, color: '#17201A', ...ellipsis }}>{p.name}</span>
          <span title={subtitle} style={{ font: `400 12.5px/1.2 ${FONT}`, color: '#7C8A81', ...ellipsis }}>{subtitle}</span>
        </span>
        <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button className="hv1" onClick={() => v.duplicateRecord(p)} style={btn}>Duplicate</button>
          <button className="hv1" onClick={() => v.archiveRecord(p)} title={p.published ? 'Hide from the app · sales history is kept' : 'Make visible in the app again'} style={btn}>
            {p.published ? 'Archive' : 'Publish'}
          </button>
          <button onClick={() => v.openDeleteProduct(p)} style={{ height: '34px', padding: '0 12px', border: '1px solid #EEDAD5', borderRadius: '8px', background: '#FDF7F5', color: '#A93826', font: `600 12.5px/1.2 ${FONT}`, cursor: 'pointer', whiteSpace: 'nowrap' }}>
            Delete
          </button>
          <button className="hv2" onClick={() => v.editProduct(p)} style={primaryBtn}>Edit product</button>
        </span>
      </div>
      <div className="ad-scroll" style={{ flex: '1', minHeight: '0', overflowY: 'auto', padding: '20px 26px 30px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <BackLink v={v} />
        {q.status === 'error' && <span style={{ ...muted, whiteSpace: 'normal', color: '#B3402F' }}>Couldn’t refresh · {q.error} · showing the last loaded data</span>}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.7fr', gap: '18px', alignItems: 'start' }}>
          <div style={{ ...card, padding: '18px', display: 'flex', flexDirection: 'column', gap: '14px', minWidth: '0' }}>
            <span style={{ position: 'relative', height: '186px', borderRadius: '9px', overflow: 'hidden', border: '1px solid #E4E7E2', background: '#F6F7F4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {p.image_url
                ? <img src={p.image_url} alt="" loading="lazy" style={{ position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover' }} />
                : <span style={muted}>No image</span>}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={pill([statusFg, statusBg])}>{statusLabelText}</span>
              {(p.attributes ?? []).map((a) => <span key={a} style={pill(GREEN)}>{a.toUpperCase()}</span>)}
            </span>
            <span style={{ display: 'flex', alignItems: 'baseline', gap: '9px' }}>
              <span style={{ font: `700 22px/1.2 ${FONT}`, color: '#17201A' }}>{moneyAU(p.price)}</span>
              {compareAt != null && <span style={{ font: `400 13px/1.2 ${FONT}`, color: '#7C8A81', textDecoration: 'line-through' }}>{moneyAU(compareAt)}</span>}
            </span>
            <InfoRow label="SKU" value={p.sku} />
            <InfoRow label="Brand" value={p.brand} />
            <InfoRow label="Weight" value={p.weight || p.size} />
            <InfoRow label="Origin" value={p.country_of_origin} />
            <InfoRow label="Warehouse" value={p.warehouse} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', minWidth: '0' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: '14px' }}>
              <Kpi icon={ICONS.units} label="Units sold (30d)" value={salesKnown ? num(sales.units30) : '—'} pillLabel={unitsPill} colors={unitsColors} title={unitsTitle} />
              <Kpi icon={ICONS.revenue} label="Revenue (30d)" value={salesKnown ? moneyAU(sales.revenue30) : '—'} pillLabel={revPill} colors={revColors} title={revTitle} />
              <Kpi
                icon={ICONS.stock}
                label="Current stock"
                value={p.track_inventory ? num(p.stock_qty) : '—'}
                pillLabel={stockLabel}
                colors={stockColors}
                title={p.track_inventory ? [p.min_stock != null && `Minimum ${p.min_stock}`, p.max_stock != null && `Maximum ${p.max_stock}`].filter(Boolean).join(' · ') || 'No minimum set · low below 10' : 'Inventory tracking is off'}
              >
                <button onClick={() => v.openStockAdjust(p)} style={{ border: '0', background: 'transparent', padding: '0', font: `600 10.5px/1.2 ${FONT}`, color: '#17693A', cursor: 'pointer', whiteSpace: 'nowrap' }}>Adjust</button>
              </Kpi>
              <Kpi
                icon={ICONS.star}
                label="Rating"
                value={rating.avg == null ? '—' : `${rating.avg.toFixed(1)} ★`}
                pillLabel={detail.reviewsError ? 'Unavailable' : rating.count ? `${num(rating.count)} review${rating.count === 1 ? '' : 's'}` : 'No reviews yet'}
                colors={detail.reviewsError ? GREY : ratingColors}
                title={detail.reviewsError || 'Published reviews for this product'}
              />
            </div>
            <SalesTrend sales={sales} error={detail.salesError} />
            <RecentOrders v={v} detail={detail} now={now} />
          </div>
        </div>
      </div>
    </>
  )
}
