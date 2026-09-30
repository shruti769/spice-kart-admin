import { useState } from 'react'
import { moneyAU, num, useCustomerDetail, useNow } from '../lib/customers'
import { PAYMENT_STATUS_PILL, STATUS_PILL, customerName, initials, itemCount, mobileLabel, placedLabel, statusLabel } from '../lib/orders'
import { REFUND_REASONS } from '../lib/payments'
import EditCustomerModal from '../modals/EditCustomerModal'
import SuspendCustomerModal from '../modals/SuspendCustomerModal'
import NotifyCustomerModal from '../modals/NotifyCustomerModal'

// Customer detail (customer_stats + orders + refund_requests + reviews), live via Supabase Realtime.

const FONT = 'Inter,system-ui,sans-serif'
const INK = '#17201A'
const MUTED = '#7C8A81'
const BORDER = '#E4E7E2'
const PAGE = 5
const COLS = '.9fr .8fr .8fr minmax(84px,1fr) minmax(104px,1.1fr) 1.1fr'

const ellipsis = { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }
const topBtn = { display: 'flex', alignItems: 'center', gap: '7px', height: '34px', padding: '0 12px', border: `1px solid ${BORDER}`, borderRadius: '8px', background: '#fff', color: INK, font: `600 12.5px/1.2 ${FONT}`, cursor: 'pointer', whiteSpace: 'nowrap' }
const card = (pad = '18px', gap = '13px') => ({ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '10px', padding: pad, display: 'flex', flexDirection: 'column', gap })
const cardTitle = { font: `600 13.5px/1.2 ${FONT}`, color: INK }
const pill = (fg, bg) => ({ font: `600 10.5px/1.2 ${FONT}`, color: fg, background: bg, padding: '5px 8px', borderRadius: '5px', whiteSpace: 'nowrap', display: 'inline-block' })
const kpiPill = (fg, bg) => ({ font: `600 10.5px/1.2 ${FONT}`, color: fg, background: bg, padding: '4px 7px', borderRadius: '5px', alignSelf: 'flex-start', whiteSpace: 'nowrap' })
const GREEN = ['#0B6B33', '#E9F6E3']
const GREY = ['#7C8A81', '#EEF0EC']
const small = { font: `400 11px/1.2 ${FONT}`, color: MUTED, ...ellipsis }
const head = { font: `600 10.5px/1.2 ${FONT}`, letterSpacing: '.5px', color: MUTED, textTransform: 'uppercase', ...ellipsis }
const cellWrap = { minWidth: '0', display: 'flex', alignItems: 'center', gap: '8px' }
const empty = { font: `400 11.5px/1.5 ${FONT}`, color: MUTED }

/** [label, fg, bg] per refund request status. Approved = agreed but no refund recorded yet (nothing was paid). */
const REFUND_PILL = {
  pending: ['Pending', '#8A6100', '#FBF1DE'],
  approved: ['Processing', '#2F4F9E', '#EEF2FB'],
  paid: ['Refunded', '#1F5C8B', '#E8F1F8'],
  rejected: ['Rejected', '#A93826', '#FAEDEA'],
}

const fullDate = (iso) => new Date(iso).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })
/** "Today 12:42 PM" / "Yesterday 9:10 AM" / "18 Sep 2026" */
function orderDate(iso, now) {
  const label = placedLabel(iso, new Date(now))
  return label.startsWith('Today') || label.startsWith('Yesterday') ? label : fullDate(iso)
}
const plural = (n, word) => `${num(n)} ${word}${n === 1 ? '' : 's'}`

/**
 * Segment badge, derived only from real numbers:
 *   'LOYAL' → 5 or more non-cancelled orders; 'NEW' → joined in the last 30 days; otherwise no badge.
 */
function segment(c, now) {
  if (Number(c.orders) >= 5) return 'LOYAL'
  if (now - new Date(c.created_at).getTime() < 30 * 864e5) return 'NEW'
  return null
}

function statusPill(c) {
  if (c.status === 'suspended') return ['Suspended', '#A93826', '#FAEDEA']
  if (c.status === 'active') return ['Active', '#0B6B33', '#E9F6E3']
  return ['Inactive', '#5F6B62', '#EEF0EC']
}

/** Top products across non-cancelled orders: how many orders had each, and units bought. */
function favourites(orders, limit = 3) {
  const map = new Map()
  for (const o of orders) {
    if (o.status === 'cancelled') continue
    const seen = new Set()
    for (const i of o.order_items ?? []) {
      const key = i.product_id ?? `name:${i.name}`
      const f = map.get(key) ?? { key, name: i.name, image: i.image_url, orders: 0, units: 0 }
      if (!f.image && i.image_url) f.image = i.image_url
      f.units += i.qty
      if (!seen.has(key)) { f.orders += 1; seen.add(key) }
      map.set(key, f)
    }
  }
  return [...map.values()].sort((a, b) => b.orders - a.orders || b.units - a.units || a.name.localeCompare(b.name)).slice(0, limit)
}

/** Distinct delivery addresses from their orders, most recently used first. */
function addresses(orders, limit = 3) {
  const map = new Map()
  for (const o of orders) {
    const key = `${o.address_line}|${o.address_area}`.toLowerCase()
    const a = map.get(key) ?? { key, line: o.address_line, area: o.address_area, postcode: o.postcode, last: o.placed_at, count: 0 }
    a.count += 1
    map.set(key, a)
  }
  return [...map.values()].slice(0, limit)
}

function Kpi({ icon, label, value, note, tone = GREEN }) {
  return (
    <div style={card('15px 16px', '10px')}>
      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ width: '26px', height: '26px', borderRadius: '7px', background: '#F6F7F4', border: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: 'none' }}>{icon}</svg>
        </span>
        <span style={{ font: `500 11.5px/1.2 ${FONT}`, color: MUTED, whiteSpace: 'nowrap' }}>{label}</span>
      </span>
      <span style={{ font: `700 23px/1.2 ${FONT}`, color: INK, letterSpacing: '-.4px', whiteSpace: 'nowrap' }}>{value}</span>
      <span style={kpiPill(...tone)}>{note}</span>
    </div>
  )
}

const ICONS = {
  orders: (
    <>
      <rect x="4.4" y="4.2" width="11.2" height="12.4" rx="2" stroke="#4A564E" strokeWidth="1.5" />
      <path d="M7.8 4.2v-.8a1 1 0 011-1h2.4a1 1 0 011 1v.8" stroke="#4A564E" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M7.4 8.8h5.2M7.4 11.4h5.2M7.4 14h3" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  spend: (
    <>
      <circle cx="10" cy="10" r="7.2" stroke="#4A564E" strokeWidth="1.5" />
      <path d="M10 5.6v8.8" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12.3 7.9c0-1.05-1.03-1.75-2.3-1.75s-2.3.7-2.3 1.75 1.03 1.55 2.3 1.85 2.3.8 2.3 1.85-1.03 1.75-2.3 1.75-2.3-.7-2.3-1.75" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  average: (
    <>
      <path d="M3.4 3.4v12.2a1 1 0 001 1h12.2" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6.8 13.2l3-3.4 2.4 2.2 3.6-4.4" stroke="#4A564E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  refunds: (
    <>
      <path d="M10 3.6l7 12.2H3l7-12.2z" stroke="#4A564E" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 8v3.4" stroke="#4A564E" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="10" cy="13.6" r=".9" fill="#4A564E" />
    </>
  ),
}

const PinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: 'none' }}>
    <path d="M10 17.5s5.4-4.7 5.4-8.6A5.4 5.4 0 004.6 8.9c0 3.9 5.4 8.6 5.4 8.6z" stroke="#7C8A81" strokeWidth="1.5" />
    <circle cx="10" cy="8.6" r="1.9" stroke="#7C8A81" strokeWidth="1.5" />
  </svg>
)

function Pager({ page, pages, onPage }) {
  const arrow = (dir) => {
    const target = page + dir
    const off = target < 1 || target > pages
    return (
      <button type="button" aria-label={dir < 0 ? 'Previous page' : 'Next page'} disabled={off} onClick={() => onPage(target)} style={{ width: '28px', height: '28px', border: `1px solid ${BORDER}`, borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', padding: '0', cursor: off ? 'default' : 'pointer', opacity: off ? 0.45 : 1 }}>
        <svg width="12" height="12" viewBox="0 0 20 20" fill="none" style={{ flex: 'none' }}>
          <path d={dir < 0 ? 'M12.4 4.4L6.8 10l5.6 5.6' : 'M7.6 4.4L13 10l-5.4 5.6'} stroke={MUTED} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    )
  }
  // Up to 5 page numbers around the current page.
  const start = Math.max(1, Math.min(page - 2, pages - 4))
  const nums = Array.from({ length: Math.min(5, pages) }, (_, i) => start + i)
  return (
    <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '5px' }}>
      {arrow(-1)}
      {nums.map((p) => (p === page ? (
        <span key={p} style={{ minWidth: '28px', height: '28px', padding: '0 6px', boxSizing: 'border-box', borderRadius: '6px', background: '#0B3D1F', color: '#fff', font: `600 11.5px/1.2 ${FONT}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{p}</span>
      ) : (
        <button key={p} type="button" onClick={() => onPage(p)} style={{ minWidth: '28px', height: '28px', padding: '0 6px', border: `1px solid ${BORDER}`, borderRadius: '6px', font: `500 11.5px/1.2 ${FONT}`, color: '#4A564E', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', cursor: 'pointer' }}>{p}</button>
      )))}
      {arrow(1)}
    </span>
  )
}

function Message({ v, children }) {
  return (
    <div style={{ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', padding: '40px', font: `400 13px/1.5 ${FONT}`, color: MUTED, textAlign: 'center' }}>
      {children}
      <button className="hv1" onClick={v.nav_cust} style={topBtn}>Go to customers</button>
    </div>
  )
}

export default function CustomerDetail({ v }) {
  const now = useNow()
  const detail = useCustomerDetail(v.custId)
  const [page, setPage] = useState(1)
  const [modal, setModal] = useState(null) // 'notify' | 'edit' | 'suspend'

  if (!v.custId) return <Message v={v}>Pick a customer from Customers to see their profile, orders and refunds.</Message>
  if (detail.status === 'off') return <Message v={v}>Supabase keys are missing · add them to .env to load customers.</Message>
  // Ignore data still held from a previously opened customer.
  const d = detail.data?.id === v.custId ? detail.data : null
  if (!d) {
    if (detail.status === 'error') return <Message v={v}>{detail.error}</Message>
    if (detail.loading || detail.data) return <Message v={v}>Loading customer…</Message>
    return <Message v={v}>This customer no longer exists.</Message>
  }

  const { customer: c, orders, refunds, reviews } = d
  const name = customerName(c)
  const suspended = Boolean(c.suspended_at)

  // KPIs
  const monthStart = new Date(now)
  monthStart.setDate(1)
  monthStart.setHours(0, 0, 0, 0)
  const counted = orders.filter((o) => o.status !== 'cancelled')
  const thisMonth = counted.filter((o) => new Date(o.placed_at) >= monthStart).length
  const orderCount = Number(c.orders) || 0
  const avg = orderCount ? Number(c.total_spend) / orderCount : 0
  const settled = refunds.filter((r) => (r.status === 'approved' || r.status === 'paid') && r.amount != null)
  const refundTotal = settled.reduce((n, r) => n + Number(r.amount), 0)
  const pendingRefunds = refunds.filter((r) => r.status === 'pending').length
  let refundNote = 'No requests'
  if (settled.length) refundNote = `${moneyAU(refundTotal)} total`
  else if (pendingRefunds) refundNote = `${num(pendingRefunds)} pending`
  else if (refunds.length) refundNote = 'None approved'

  const [sl, sfg, sbg] = statusPill(c)
  const badge = segment(c, now)
  const places = addresses(orders)
  const favs = favourites(orders)
  const location = c.suburb || places[0]?.area || ''

  // Order history (client-side pages of 5; `orders` holds up to DETAIL_ORDER_LIMIT of them).
  const pages = Math.max(1, Math.ceil(orders.length / PAGE))
  const cur = Math.min(page, pages)
  const shown = orders.slice((cur - 1) * PAGE, cur * PAGE)

  return (
    <>
      <div className="sk-topbar" style={{ display: 'flex', alignItems: 'flex-end', gap: '18px', padding: '24px 26px 2px' }}>
        <span style={{ display: 'flex', flexDirection: 'column', gap: '5px', minWidth: '0' }}>
          <span style={{ font: `700 20px/1.2 ${FONT}`, color: INK, ...ellipsis }}>{name}</span>
          <span style={{ font: `400 12.5px/1.2 ${FONT}`, color: MUTED, whiteSpace: 'nowrap' }}>
            Customer since {new Date(c.created_at).toLocaleDateString('en-AU', { month: 'long', year: 'numeric' })}{location ? ` · ${location}` : ''}
          </span>
        </span>
        <span className="r-wrap" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button className="hv1" onClick={() => setModal('notify')} style={topBtn}>Send notification</button>
          <button className="hv1" onClick={() => setModal('edit')} style={topBtn}>Edit customer</button>
          {suspended ? (
            <button className="hv1" onClick={() => setModal('suspend')} style={topBtn}>Reinstate account</button>
          ) : (
            <button onClick={() => setModal('suspend')} style={{ height: '34px', padding: '0 12px', border: '1px solid #EEDAD5', borderRadius: '8px', background: '#FDF7F5', color: '#A93826', font: `600 12.5px/1.2 ${FONT}`, cursor: 'pointer', whiteSpace: 'nowrap' }}>
              Suspend account
            </button>
          )}
        </span>
      </div>
      <div className="ad-scroll sk-page" style={{ flex: '1', minHeight: '0', overflowY: 'auto', padding: '20px 26px 30px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <button onClick={v.nav_cust} style={{ display: 'flex', alignItems: 'center', gap: '6px', border: '0', background: 'transparent', font: `600 11.5px/1.2 ${FONT}`, color: '#17693A', cursor: 'pointer', padding: '0', whiteSpace: 'nowrap', alignSelf: 'flex-start' }}>
          <svg width="13" height="13" viewBox="0 0 20 20" fill="none" style={{ flex: 'none' }}>
            <path d="M12.4 4.4L6.8 10l5.6 5.6" stroke="#17693A" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to customers
        </button>
        {detail.status === 'error' && <span style={{ font: `500 12px/1.4 ${FONT}`, color: '#A93826' }}>Couldn’t refresh · {detail.error}</span>}

        <div className="r-kpi" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px' }}>
          <Kpi icon={ICONS.orders} label="Total orders" value={num(orderCount)} note={thisMonth ? `▲ ${num(thisMonth)} this month` : 'None this month'} tone={thisMonth ? GREEN : GREY} />
          <Kpi icon={ICONS.spend} label="Total spend" value={moneyAU(c.total_spend)} note="Lifetime value" />
          <Kpi icon={ICONS.average} label="Average order" value={orderCount ? moneyAU(avg) : '—'} note={orderCount ? `Across ${plural(orderCount, 'order')}` : 'No orders yet'} tone={orderCount ? GREEN : GREY} />
          <Kpi icon={ICONS.refunds} label="Refunds" value={num(refunds.length)} note={refundNote} tone={GREY} />
        </div>

        <div className="r-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: '18px', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={card('18px', '14px')}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
                <span style={{ width: '46px', height: '46px', borderRadius: '12px', background: '#0B3D1F', display: 'flex', alignItems: 'center', justifyContent: 'center', font: `700 16px/1.2 ${FONT}`, color: '#8BE000', flex: 'none' }}>
                  {initials(c)}
                </span>
                <span style={{ display: 'flex', flexDirection: 'column', gap: '3px', minWidth: '0' }}>
                  <span style={{ font: `700 14px/1.2 ${FONT}`, color: INK, ...ellipsis }}>{name}</span>
                  <span style={small} title={c.id}>Customer ID #{c.id.slice(0, 8).toUpperCase()}</span>
                </span>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={pill(sfg, sbg)} title={c.suspended_reason ?? undefined}>{sl}</span>
                {badge && <span style={pill(...(badge === 'NEW' ? ['#2F4F9E', '#EEF2FB'] : GREEN))}>{badge}</span>}
              </span>
              {suspended && (
                <span style={{ font: `400 11px/1.5 ${FONT}`, color: '#A93826' }}>
                  Suspended {fullDate(c.suspended_at)}{c.suspended_reason ? ` · ${c.suspended_reason}` : ''}
                </span>
              )}
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '4px', borderTop: '1px solid #EFF1ED' }}>
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: 'none' }}>
                  <rect x="2.8" y="4.6" width="14.4" height="10.8" rx="2" stroke="#7C8A81" strokeWidth="1.5" />
                  <path d="M3.4 6l6.6 4.6L16.6 6" stroke="#7C8A81" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
                <span style={small} title={c.email ?? ''}>{c.email || 'No email on file'}</span>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: 'none' }}>
                  <path d="M4.3 3.4h2.9a.9.9 0 01.86.63l.83 2.6a.9.9 0 01-.36 1l-1.44.99a9.4 9.4 0 004.29 4.29l.99-1.44a.9.9 0 011-.36l2.6.83a.9.9 0 01.63.86v2.9a1 1 0 01-1.09 1A13 13 0 013.3 4.49a1 1 0 011-1.09z" stroke="#7C8A81" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
                <span style={small}>{mobileLabel(c.mobile) || 'No mobile on file'}</span>
              </span>
            </div>

            <div style={card()}>
              <span style={cardTitle}>Delivery addresses</span>
              {places.length === 0 && <span style={empty}>No deliveries yet · addresses appear once they order.</span>}
              {places.map((a, i) => (
                <span key={a.key} style={{ display: 'flex', gap: '9px', alignItems: 'flex-start', padding: '10px', border: `1px solid ${BORDER}`, borderRadius: '8px' }}>
                  <PinIcon />
                  <span style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '0' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ font: `600 12.5px/1.2 ${FONT}`, color: INK, ...ellipsis }}>{a.area || (a.postcode ? `Postcode ${a.postcode}` : 'Delivery address')}</span>
                      {i === 0 && <span style={pill(...GREEN)}>MOST RECENT</span>}
                    </span>
                    <span style={{ font: `400 11px/1.5 ${FONT}`, color: MUTED }}>{a.line}</span>
                    <span style={{ font: `400 10.5px/1.4 ${FONT}`, color: MUTED }}>{plural(a.count, 'order')} · last {fullDate(a.last)}</span>
                  </span>
                </span>
              ))}
            </div>

            <div style={card('15px', '10px')}>
              <span style={cardTitle}>Favourite products</span>
              {favs.length === 0 && <span style={empty}>Nothing yet · their most-bought products show here.</span>}
              {favs.map((f) => (
                <span key={f.key} style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                  <span style={{ width: '30px', height: '30px', borderRadius: '7px', overflow: 'hidden', background: '#F6F7F4', border: `1px solid ${BORDER}`, flex: 'none', display: 'block', position: 'relative' }}>
                    {f.image && <img src={f.image} alt="" loading="lazy" style={{ position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover' }} />}
                  </span>
                  <span style={{ font: `500 12.5px/1.2 ${FONT}`, color: INK, ...ellipsis }} title={f.name}>{f.name}</span>
                  <span style={{ marginLeft: 'auto', flex: 'none' }}>
                    <span style={small}>{plural(f.orders, 'order')} · {plural(f.units, 'unit')}</span>
                  </span>
                </span>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span style={cardTitle}>Order history</span>
              <div className="r-table-wrap" style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '10px', overflow: 'hidden', flex: 'none' }}>
                <div className="r-table" style={{ display: 'grid', gridTemplateColumns: COLS, gap: '14px', padding: '11px 16px', background: '#F6F7F4', borderBottom: `1px solid ${BORDER}` }}>
                  {['Order', 'Items', 'Value', 'Payment', 'Status', 'Date'].map((h) => <span key={h} style={head}>{h}</span>)}
                </div>
                {shown.length === 0 && (
                  <div style={{ padding: '26px 16px', textAlign: 'center', font: `400 12.5px/1.5 ${FONT}`, color: MUTED }}>No orders yet · they appear here live when {c.first_name || 'this customer'} orders in the app.</div>
                )}
                {shown.map((o, i) => {
                  const [pl, pfg, pbg] = PAYMENT_STATUS_PILL[o.payment_status] ?? PAYMENT_STATUS_PILL.pending
                  const [ofg, obg] = STATUS_PILL[o.status] ?? STATUS_PILL.placed
                  const items = itemCount(o)
                  return (
                    <div
                      key={o.id}
                      className="hv3 r-table"
                      role="button"
                      tabIndex={0}
                      onClick={() => v.openOrder(o)}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); v.openOrder(o) } }}
                      style={{ display: 'grid', gridTemplateColumns: COLS, gap: '14px', padding: '13px 16px', borderBottom: i < shown.length - 1 ? '1px solid #EFF1ED' : '0', alignItems: 'center', cursor: 'pointer' }}
                    >
                      <span style={cellWrap}><span style={{ font: `700 12.5px/1.2 ${FONT}`, color: INK, ...ellipsis }}>#{o.number}</span></span>
                      <span style={cellWrap}><span style={small}>{plural(items, 'item')}</span></span>
                      <span style={cellWrap}><span style={{ font: `600 12.5px/1.2 ${FONT}`, color: INK, ...ellipsis }}>{moneyAU(o.total)}</span></span>
                      <span style={cellWrap}><span style={pill(pfg, pbg)}>{pl}</span></span>
                      <span style={cellWrap}><span style={pill(ofg, obg)}>{statusLabel(o.status)}</span></span>
                      <span style={cellWrap}><span style={small}>{orderDate(o.placed_at, now)}</span></span>
                    </div>
                  )
                })}
                {orders.length > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderTop: `1px solid ${BORDER}`, background: '#fff' }}>
                    <span style={{ font: `400 11.5px/1.2 ${FONT}`, color: MUTED, whiteSpace: 'nowrap' }}>
                      Showing {num((cur - 1) * PAGE + 1)}–{num((cur - 1) * PAGE + shown.length)} of {plural(orders.length, 'order')}
                    </span>
                    {pages > 1 && <Pager page={cur} pages={pages} onPage={setPage} />}
                  </div>
                )}
              </div>
            </div>

            <div className="r-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
              <div style={card()}>
                <span style={cardTitle}>Reviews left{d.reviewCount > reviews.length ? ` · ${num(d.reviewCount)}` : ''}</span>
                {d.reviewsError && <span style={empty}>{d.reviewsError}</span>}
                {!d.reviewsError && reviews.length === 0 && <span style={empty}>No reviews yet.</span>}
                {reviews.map((r) => (
                  <span key={r.id} style={{ display: 'flex', flexDirection: 'column', gap: '5px', padding: '10px', border: `1px solid ${BORDER}`, borderRadius: '8px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                      <span style={{ font: `600 12px/1.2 ${FONT}`, color: INK, ...ellipsis }}>
                        {r.product?.name ?? (r.order ? `Order #${r.order.number}` : 'Product removed')}
                      </span>
                      {r.status !== 'published' && <span style={{ ...small, flex: 'none' }}>{r.status === 'hidden' ? 'Hidden' : 'Awaiting review'}</span>}
                      <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <svg width="12" height="12" viewBox="0 0 20 20" fill="none" style={{ flex: 'none' }}>
                          <path d="M10 3.2l2.1 4.3 4.7.7-3.4 3.3.8 4.7L10 14l-4.2 2.2.8-4.7L3.2 8.2l4.7-.7L10 3.2z" stroke="#C89A28" strokeWidth="1.5" strokeLinejoin="round" />
                        </svg>
                        <span style={{ font: `700 11.5px/1.2 ${FONT}`, color: INK }}>{r.rating}</span>
                      </span>
                    </span>
                    <span style={{ font: `400 11px/1.5 ${FONT}`, color: MUTED }}>{r.comment || 'No comment · rating only.'}</span>
                  </span>
                ))}
              </div>

              <div style={card()}>
                <span style={cardTitle}>Refund history</span>
                {d.refundsError && <span style={empty}>{d.refundsError}</span>}
                {!d.refundsError && refunds.length === 0 && <span style={empty}>No refund requests.</span>}
                {refunds.slice(0, 5).map((r) => {
                  const [rl, rfg, rbg] = REFUND_PILL[r.status] ?? REFUND_PILL.pending
                  return (
                    <button
                      key={r.id}
                      type="button"
                      className="hv3"
                      onClick={() => r.order && v.openOrder(r.order)}
                      title={r.detail || undefined}
                      style={{ display: 'flex', alignItems: 'center', gap: '9px', padding: '10px', border: `1px solid ${BORDER}`, borderRadius: '8px', background: '#fff', textAlign: 'left', cursor: r.order ? 'pointer' : 'default', width: '100%' }}
                    >
                      <span style={{ display: 'flex', flexDirection: 'column', gap: '3px', minWidth: '0' }}>
                        <span style={{ font: `600 12px/1.2 ${FONT}`, color: INK, ...ellipsis }}>{r.order ? `#${r.order.number}` : r.number}</span>
                        <span style={small}>{REFUND_REASONS[r.reason] ?? r.reason} · {fullDate(r.created_at)}</span>
                      </span>
                      <span style={{ marginLeft: 'auto', display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end' }}>
                        <span style={{ font: `700 12px/1.2 ${FONT}`, color: INK, whiteSpace: 'nowrap' }}>{r.amount != null ? moneyAU(r.amount) : '—'}</span>
                        <span style={pill(rfg, rbg)} title={r.status === 'approved' ? 'Approved · refund not recorded yet' : undefined}>{rl}</span>
                      </span>
                    </button>
                  )
                })}
                {refunds.length > 5 && <span style={empty}>+ {plural(refunds.length - 5, 'older request')}</span>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {modal === 'notify' && <NotifyCustomerModal customer={c} onClose={() => setModal(null)} flash={v.flash} />}
      {modal === 'edit' && <EditCustomerModal customer={c} onClose={() => setModal(null)} onSaved={detail.refetch} flash={v.flash} />}
      {modal === 'suspend' && <SuspendCustomerModal customer={c} onClose={() => setModal(null)} onDone={detail.refetch} flash={v.flash} />}
    </>
  )
}
