import { useState } from 'react'
import GlobalSearch from '../components/GlobalSearch'
import { useCategoryNames } from '../lib/categories'
import { stockPill } from '../lib/products'
import { PAYMENT_STATUS_PILL, STATUS_PILL, customerName, initials, itemCount } from '../lib/orders'
import {
  TONE, aud, audShort, change, downloadCsv, fetchDailySeries, greeting, longDate, melbToday, num, rangeFor, shortTime, useClock,
  useDashboard, useRecentOrders,
} from '../lib/analytics'

const FONT = 'Inter,system-ui,sans-serif'
const PAGE = 6
const ORDER_COLS = '84px minmax(130px,1.3fr) minmax(56px,.8fr) minmax(64px,.8fr) minmax(70px,.9fr) minmax(74px,.9fr) minmax(104px,1.2fr) minmax(56px,.9fr) 96px'

const RANGES = [['today', 'Today'], ['7d', '7D'], ['30d', '30D'], ['3m', '3M'], ['custom', 'Custom']]
/** Order status panel rows: [key, label, colour]; "refunded" is a payment bucket. */
const STATUS_ROWS = [
  ['placed', 'Pending', '#8A6100'],
  ['confirmed', 'Confirmed', '#1F5C8B'],
  ['picking', 'Preparing', '#C89A28'],
  ['packed', 'Ready for pickup', '#5BA05E'],
  ['out_for_delivery', 'Out for delivery', '#17693A'],
  ['delivered', 'Delivered', '#0B3D1F'],
  ['cancelled', 'Cancelled', '#A93826'],
  ['refunded', 'Refunded', '#8E9B92'],
]
const DASH_STATUS_LABEL = Object.fromEntries(STATUS_ROWS.map(([k, l]) => [k, l]))
DASH_STATUS_LABEL.out_for_delivery = 'Out for Delivery'

const card = { background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "15px 16px", display: "flex", flexDirection: "column", gap: "10px" }
const iconBox = { width: "26px", height: "26px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center" }
const colHead = { font: `600 10.5px/1.2 ${FONT}`, letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }
const cellWrap = { minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }
const muted = { font: `400 11px/1.2 ${FONT}`, color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }
const strong = { font: `700 12.5px/1.2 ${FONT}`, color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }
const tag = (fg, bg) => ({ font: `600 10.5px/1.2 ${FONT}`, color: fg, background: bg, padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" })
const pagerBox = { width: "28px", height: "28px", border: "1px solid #E4E7E2", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", padding: "0" }
const dateInput = { height: "28px", padding: "0 8px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: `500 11.5px/1.2 ${FONT}`, color: "#17201A" }

function Kpi({ icon, label, value, note, tone }) {
  const [fg, bg] = TONE[tone] ?? tone
  return (
    <div style={card}>
      <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={iconBox}>{icon}</span>
        <span style={{ font: `500 11.5px/1.2 ${FONT}`, color: "#7C8A81", whiteSpace: "nowrap" }}>{label}</span>
      </span>
      <span style={{ font: `700 23px/1.2 ${FONT}`, color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>{value}</span>
      <span style={{ font: `600 10.5px/1.2 ${FONT}`, color: fg, background: bg, padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>{note}</span>
    </div>
  )
}

const svg = (children) => <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>{children}</svg>
const ICONS = {
  orders: svg(<>
    <rect x="4.4" y="4.2" width="11.2" height="12.4" rx="2" stroke="#4A564E" strokeWidth="1.5" />
    <path d="M7.8 4.2v-.8a1 1 0 011-1h2.4a1 1 0 011 1v.8" stroke="#4A564E" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M7.4 8.8h5.2M7.4 11.4h5.2M7.4 14h3" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
  </>),
  revenue: svg(<>
    <circle cx="10" cy="10" r="7.2" stroke="#4A564E" strokeWidth="1.5" />
    <path d="M10 5.6v8.8" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12.3 7.9c0-1.05-1.03-1.75-2.3-1.75s-2.3.7-2.3 1.75 1.03 1.55 2.3 1.85 2.3.8 2.3 1.85-1.03 1.75-2.3 1.75-2.3-.7-2.3-1.75" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
  </>),
  customers: svg(<>
    <circle cx="8.4" cy="7.4" r="2.8" stroke="#4A564E" strokeWidth="1.5" />
    <path d="M3.4 16.5c.8-2.9 2.6-4.3 5-4.3s4.2 1.4 5 4.3" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M14 5.3a2.6 2.6 0 010 4.8M15.5 16.5c-.3-1.8-.9-3.1-1.8-4" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
  </>),
  pending: svg(<>
    <circle cx="10" cy="10" r="7.2" stroke="#4A564E" strokeWidth="1.5" />
    <path d="M10 5.8V10l3 1.8" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
  </>),
  stock: svg(<>
    <rect x="3" y="8.8" width="6" height="7.8" rx="1.4" stroke="#4A564E" strokeWidth="1.5" />
    <rect x="11" y="8.8" width="6" height="7.8" rx="1.4" stroke="#4A564E" strokeWidth="1.5" />
    <rect x="7" y="3.4" width="6" height="4.6" rx="1.4" stroke="#4A564E" strokeWidth="1.5" />
  </>),
  delivery: svg(<>
    <rect x="2.2" y="5.8" width="8.6" height="8" rx="1.4" stroke="#4A564E" strokeWidth="1.5" />
    <path d="M10.8 8.6h3.3a1.4 1.4 0 011.03.45l1.5 1.63a1.4 1.4 0 01.37.95v2.17h-6.2V8.6z" stroke="#4A564E" strokeWidth="1.5" strokeLinejoin="round" />
    <circle cx="6" cy="15.6" r="1.5" stroke="#4A564E" strokeWidth="1.5" />
    <circle cx="14" cy="15.6" r="1.5" stroke="#4A564E" strokeWidth="1.5" />
  </>),
}

/** Up to five real products that are low on / out of stock, lowest stock first. */
function LowStockRows({ v, stats }) {
  const categoryNames = useCategoryNames()
  const rows = (stats.data?.lowStock ?? []).slice(0, 5)
  if (!rows.length) {
    const msg = { loading: 'Loading stock levels…', error: `Couldn't load products · ${stats.error}`, off: 'Supabase is not configured' }[stats.status] || 'No low-stock products · everything is above its minimum'
    return (
      <div style={{ padding: "18px 16px" }}>
        <span style={{ font: `400 11.5px/1.45 ${FONT}`, color: stats.status === "error" ? "#B3402F" : "#7C8A81" }}>{msg}</span>
      </div>
    )
  }
  return rows.map((p, i) => {
    const [label, fg, bg] = stockPill(p)
    return (
      <div key={p.id} className="hv3 r-table" style={{ display: "grid", gridTemplateColumns: "1.6fr .5fr .6fr .9fr 110px", gap: "14px", padding: "13px 16px", borderBottom: i === rows.length - 1 ? "0" : "1px solid #EFF1ED", alignItems: "center" }}>
        <span style={cellWrap}>
          <span style={{ display: "flex", flexDirection: "column", gap: "3px", minWidth: "0" }}>
            <span style={{ font: `600 12.5px/1.2 ${FONT}`, color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</span>
            <span style={{ font: `400 11px/1.2 ${FONT}`, color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{categoryNames[p.category_id] || p.category_id}</span>
          </span>
        </span>
        <span style={cellWrap}>
          <span style={{ font: `700 12.5px/1.2 ${FONT}`, color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.stock_qty}</span>
        </span>
        <span style={cellWrap}>
          <span style={{ font: `400 11px/1.2 ${FONT}`, color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.min_stock != null ? `min ${p.min_stock}` : "min 10"}</span>
        </span>
        <span style={cellWrap}>
          <span style={tag(fg, bg)}>{label}</span>
        </span>
        <span style={cellWrap}>
          <span style={{ marginLeft: "auto", display: "flex", gap: "6px" }}>
            <button onClick={v.nav_inv} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: `600 11px/1.2 ${FONT}`, color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
              Update stock
            </button>
          </span>
        </span>
      </div>
    )
  })
}

function RecentOrders({ v, now }) {
  const [page, setPage] = useState(0)
  const recent = useRecentOrders(page, PAGE)
  const rows = recent.data?.rows ?? []
  const total = recent.data?.total ?? 0
  const pages = Math.max(1, Math.ceil(total / PAGE))
  const first = Math.max(0, Math.min(page - 1, pages - 3))
  const pageNums = Array.from({ length: Math.min(3, pages) }, (_, i) => first + i)

  let message = null
  if (recent.status === 'off') message = 'Supabase keys are missing · add them to .env to load orders.'
  else if (recent.loading) message = 'Loading orders…'
  else if (recent.status === 'error' && !rows.length) message = recent.error
  else if (!rows.length) message = 'No orders yet · orders placed in the app appear here instantly.'

  return (
    <div className="r-table-wrap" style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", overflow: "hidden", flex: "none" }}>
      <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
      <div className="r-table" style={{ '--r-min': '900px', minWidth: "900px", display: "grid", gridTemplateColumns: ORDER_COLS, gap: "14px", padding: "11px 16px", background: "#F6F7F4", borderBottom: "1px solid #E4E7E2" }}>
        {['Order', 'Customer', 'Items', 'Value', 'Type', 'Payment', 'Status', 'Time', 'Actions'].map((h) => <span key={h} style={colHead}>{h}</span>)}
      </div>
      {message ? (
        <div style={{ padding: "18px 16px" }}>
          <span style={{ font: `400 11.5px/1.45 ${FONT}`, color: recent.status === "error" ? "#B3402F" : "#7C8A81" }}>{message}</span>
        </div>
      ) : rows.map((o, i) => {
        const [sfg, sbg] = STATUS_PILL[o.status] ?? STATUS_PILL.placed
        const [pl, pfg, pbg] = PAYMENT_STATUS_PILL[o.payment_status] ?? PAYMENT_STATUS_PILL.pending
        const n = itemCount(o)
        return (
          <div key={o.id} className="hv3 r-table" style={{ '--r-min': '900px', minWidth: "900px", display: "grid", gridTemplateColumns: ORDER_COLS, gap: "14px", padding: "13px 16px", borderBottom: i === rows.length - 1 ? "0" : "1px solid #EFF1ED", alignItems: "center" }}>
            <span style={cellWrap}><span style={strong}>#{o.number}</span></span>
            <span style={cellWrap}>
              <span style={{ width: "28px", height: "28px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", font: `600 10.5px/1.2 ${FONT}`, color: "#4A564E", flex: "none" }}>
                {initials(o.customer)}
              </span>
              <span style={{ font: `500 12.5px/1.2 ${FONT}`, color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>{customerName(o.customer)}</span>
            </span>
            <span style={cellWrap}><span style={muted}>{n} item{n === 1 ? '' : 's'}</span></span>
            <span style={cellWrap}><span style={strong}>{aud(o.total)}</span></span>
            <span style={cellWrap}><span style={muted}>{o.delivery_type === 'express' ? 'Express' : 'Scheduled'}</span></span>
            <span style={cellWrap}><span style={tag(pfg, pbg)}>{pl}</span></span>
            <span style={cellWrap}><span style={tag(sfg, sbg)}>{DASH_STATUS_LABEL[o.status] ?? o.status}</span></span>
            <span style={cellWrap}><span style={muted}>{shortTime(o.placed_at, now)}</span></span>
            <span style={cellWrap}>
              <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                <button onClick={() => v.openOrder(o)} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: `600 11px/1.2 ${FONT}`, color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                  View
                </button>
                <button onClick={() => v.openOrder(o)} aria-label="Open order" style={{ width: "26px", height: "26px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <circle cx="5" cy="10" r="1.3" fill="#7C8A81" />
                    <circle cx="10" cy="10" r="1.3" fill="#7C8A81" />
                    <circle cx="15" cy="10" r="1.3" fill="#7C8A81" />
                  </svg>
                </button>
              </span>
            </span>
          </div>
        )
      })}
      </div>
      <div className="r-wrap" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderTop: "1px solid #E4E7E2", background: "#fff" }}>
        <span style={{ font: `400 11.5px/1.2 ${FONT}`, color: "#7C8A81", whiteSpace: "nowrap" }}>
          {total ? `Showing ${page * PAGE + 1}–${page * PAGE + rows.length} of ${num(total)} order${total === 1 ? '' : 's'}` : 'Showing 0 orders'}
        </span>
        <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "5px" }}>
          <button aria-label="Newer orders" disabled={page === 0} onClick={() => setPage((p) => Math.max(0, p - 1))} style={{ ...pagerBox, cursor: page === 0 ? "default" : "pointer", opacity: page === 0 ? 0.5 : 1 }}>
            <svg width="12" height="12" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
              <path d="M12.4 4.4L6.8 10l5.6 5.6" stroke="#7C8A81" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {pageNums.map((p) => (p === page ? (
            <span key={p} style={{ minWidth: "28px", height: "28px", borderRadius: "6px", background: "#0B3D1F", color: "#fff", font: `600 11.5px/1.2 ${FONT}`, display: "flex", alignItems: "center", justifyContent: "center" }}>{p + 1}</span>
          ) : (
            <button key={p} onClick={() => setPage(p)} style={{ minWidth: "28px", height: "28px", border: "1px solid #E4E7E2", borderRadius: "6px", font: `500 11.5px/1.2 ${FONT}`, color: "#4A564E", display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", cursor: "pointer", padding: "0" }}>{p + 1}</button>
          )))}
          <button aria-label="Older orders" disabled={page >= pages - 1} onClick={() => setPage((p) => Math.min(pages - 1, p + 1))} style={{ ...pagerBox, cursor: page >= pages - 1 ? "default" : "pointer", opacity: page >= pages - 1 ? 0.5 : 1 }}>
            <svg width="12" height="12" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
              <path d="M7.6 4.4L13 10l-5.4 5.6" stroke="#7C8A81" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </span>
      </div>
    </div>
  )
}

export default function Dashboard({ v }) {
  const now = useClock()
  const today = melbToday(now)
  const [rng, setRng] = useState('7d')
  const [custom, setCustom] = useState(null)
  const [exporting, setExporting] = useState(false)
  const range = rangeFor(rng, today, custom)
  const stats = useDashboard(today, range)
  const d = stats.data
  const ready = Boolean(d)

  const pickRange = (k) => {
    if (k === 'custom' && !custom) setCustom({ from: range.fromDay, to: range.toDay })
    setRng(k)
  }
  const exportReport = async () => {
    if (exporting) return
    setExporting(true)
    try {
      const rows = await fetchDailySeries(range)
      const totals = rows.reduce((t, r) => ({ orders: t.orders + r.orders, revenue: t.revenue + Number(r.revenue), fresh: t.fresh + r.new_customers }), { orders: 0, revenue: 0, fresh: 0 })
      downloadCsv(`spice-kart-dashboard_${range.fromDay}_to_${range.toDay}.csv`, [
        ['Date', 'Orders', 'Revenue (AUD)', 'New customers', 'Total customers'],
        ...rows.map((r) => [r.day, r.orders, Number(r.revenue).toFixed(2), r.new_customers, r.total_customers]),
        ['Total', totals.orders, totals.revenue.toFixed(2), totals.fresh, rows.at(-1)?.total_customers ?? ''],
      ])
      v.flash(`Report downloaded · ${range.label}`)
    } catch (e) {
      v.flash(`Couldn’t export · ${e.message}`)
    } finally {
      setExporting(false)
    }
  }

  // KPI cards
  const tOrders = change(d?.today.current.orders, d?.today.previous.orders)
  const tRevenue = change(d?.today.current.revenue, d?.today.previous.revenue)
  const active = change(d?.month.current.customers, d?.month.previous.customers)
  const rRevenue = change(d?.range.current.revenue, d?.range.previous.revenue)
  const lowCount = d?.lowStock.length ?? 0

  // Chart
  const buckets = d?.buckets ?? []
  const maxRev = Math.max(0, ...buckets.map((b) => b.revenue))
  const maxOrd = Math.max(0, ...buckets.map((b) => b.orders))
  const barGap = buckets.length <= 14 ? "8px" : buckets.length <= 24 ? "4px" : "2px"
  const empty = ready && !maxRev && !maxOrd

  // Order status
  const statusTotal = STATUS_ROWS.reduce((n, [k]) => n + (Number(d?.status[k]) || 0), 0)

  return (
    <>
      <div className="sk-topbar" style={{ display: "flex", alignItems: "flex-end", gap: "18px", padding: "24px 26px 2px" }}>
        <span style={{ display: "flex", flexDirection: "column", gap: "5px", minWidth: "0" }}>
          <span style={{ font: `700 20px/1.2 ${FONT}`, color: "#17201A", whiteSpace: "nowrap" }}>{greeting(now)}, {v.userFirstName}</span>
          <span style={{ font: `400 12.5px/1.2 ${FONT}`, color: "#7C8A81", whiteSpace: "nowrap" }}>
            Here’s what’s happening with Spice Kart today · {longDate(now)}
          </span>
        </span>
        <span className="r-wrap" style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px" }}>
          <GlobalSearch v={v} placeholder="Search anything…" width="210px" align="right" />
          <button className="hv1" onClick={() => pickRange('custom')} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 12px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", color: "#17201A", font: `600 12.5px/1.2 ${FONT}`, cursor: "pointer" }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
              <circle cx="10" cy="10" r="7.2" stroke="#4A564E" strokeWidth="1.5" />
              <path d="M10 5.8V10l3 1.8" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            {range.label}
          </button>
          <button className="hv2" onClick={exportReport} disabled={exporting} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 13px", border: "0", borderRadius: "8px", background: "#0B3D1F", color: "#fff", font: `600 12.5px/1.2 ${FONT}`, cursor: exporting ? "wait" : "pointer" }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
              <path d="M10 3.6v9M6.4 9.2L10 12.8l3.6-3.6M3.6 16.4h12.8" stroke="#8BE000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {exporting ? 'Exporting…' : 'Export report'}
          </button>
        </span>
      </div>
      <div className="ad-scroll sk-page" style={{ flex: "1", minHeight: "0", overflowY: "auto", padding: "20px 26px 30px", display: "flex", flexDirection: "column", gap: "18px" }}>
        {stats.status === 'error' && (
          <span style={{ font: `400 12px/1.45 ${FONT}`, color: "#B3402F" }}>Couldn’t load dashboard numbers · {stats.error}</span>
        )}
        {stats.status === 'off' && (
          <span style={{ font: `400 12px/1.45 ${FONT}`, color: "#7C8A81" }}>Supabase keys are missing · add them to .env to load live numbers.</span>
        )}
        <div className="r-kpi" style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: "14px" }}>
          <Kpi icon={ICONS.orders} label="Today’s orders" value={ready ? num(d.today.current.orders) : '—'} note={ready ? `${tOrders.text} vs yesterday` : '—'} tone={ready ? tOrders.tone : 'flat'} />
          <Kpi icon={ICONS.revenue} label="Today’s revenue" value={ready ? audShort(d.today.current.revenue) : '—'} note={ready ? `${tRevenue.text} vs yesterday` : '—'} tone={ready ? tRevenue.tone : 'flat'} />
          <Kpi icon={ICONS.customers} label="Active customers" value={ready ? num(d.month.current.customers) : '—'} note={ready ? `${active.text} vs prior 30d` : '—'} tone={ready ? active.tone : 'flat'} />
          <Kpi icon={ICONS.pending} label="Pending orders" value={ready ? num(d.pending) : '—'} note={ready && !d.pending ? 'All caught up' : 'Needs attention'} tone={ready && !d.pending ? 'flat' : ['#8A6100', '#FBF1DE']} />
          <Kpi icon={ICONS.stock} label="Low stock products" value={ready ? num(lowCount) : '—'} note={ready && !lowCount ? 'All above minimum' : 'Requires action'} tone={ready && !lowCount ? 'flat' : 'bad'} />
          <Kpi icon={ICONS.delivery} label="Active deliveries" value={ready ? num(d.onRoad) : '—'} note="Currently on the road" tone="flat" />
        </div>
        <div className="r-stack" style={{ display: "grid", gridTemplateColumns: "1.55fr 1fr", gap: "18px" }}>
          <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "15px", display: "flex", flexDirection: "column", gap: "14px" }}>
            <div className="r-wrap" style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
              <span style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <span style={{ font: `600 13.5px/1.2 ${FONT}`, color: "#17201A", whiteSpace: "nowrap" }}>Revenue & orders</span>
                <span style={{ font: `400 11.5px/1.2 ${FONT}`, color: "#7C8A81", whiteSpace: "nowrap" }}>{range.label} · {d?.bucketUnit ?? (range.days === 1 ? 'hourly' : 'daily')}</span>
              </span>
              <span style={{ marginLeft: "auto", display: "flex", gap: "4px", padding: "3px", background: "#F6F7F4", border: "1px solid #E4E7E2", borderRadius: "8px" }}>
                {RANGES.map(([k, label]) => (
                  <button key={k} onClick={() => pickRange(k)} style={{ font: `600 11px/1.2 ${FONT}`, color: rng === k ? "#ffffff" : "#4A564E", background: rng === k ? "#0B3D1F" : "transparent", border: "0", padding: "6px 9px", borderRadius: "6px", whiteSpace: "nowrap", cursor: "pointer" }}>
                    {label}
                  </button>
                ))}
              </span>
            </div>
            {rng === 'custom' && custom && (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <input type="date" aria-label="From" value={custom.from} max={today} onChange={(e) => e.target.value && setCustom((c) => ({ ...c, from: e.target.value }))} style={dateInput} />
                <span style={{ font: `400 11.5px/1.2 ${FONT}`, color: "#7C8A81" }}>to</span>
                <input type="date" aria-label="To" value={custom.to} max={today} onChange={(e) => e.target.value && setCustom((c) => ({ ...c, to: e.target.value }))} style={dateInput} />
              </div>
            )}
            <div style={{ position: "relative", display: "flex", alignItems: "flex-end", gap: barGap, height: "158px", paddingTop: "4px" }}>
              {buckets.map((b, i) => {
                const last = i === buckets.length - 1
                return (
                  <span key={b.key} title={`${b.label} · ${aud(b.revenue)} · ${b.orders} order${b.orders === 1 ? '' : 's'}`} style={{ flex: "1", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: "3px", height: "100%", minWidth: "0" }}>
                    <span style={{ display: "block", height: `${maxRev ? (b.revenue / maxRev) * 58 : 0}%`, background: last ? "#0B3D1F" : "#DCE9D2", borderRadius: "4px 4px 0 0" }} />
                    <span style={{ display: "block", height: `${maxOrd ? (b.orders / maxOrd) * 40 : 0}%`, background: last ? "#8BE000" : "#F0F5E6", borderRadius: "0 0 4px 4px" }} />
                  </span>
                )
              })}
              {(empty || !ready) && (
                <span style={{ position: "absolute", inset: "0", display: "flex", alignItems: "center", justifyContent: "center", font: `400 11.5px/1.2 ${FONT}`, color: "#7C8A81", borderBottom: "1px solid #EFF1ED" }}>
                  {ready ? 'No orders in this period' : stats.loading ? 'Loading…' : ''}
                </span>
              )}
            </div>
            <div className="r-wrap" style={{ display: "flex", alignItems: "center", gap: "16px", borderTop: "1px solid #EFF1ED", paddingTop: "11px" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ width: "9px", height: "9px", borderRadius: "3px", background: "#0B3D1F", display: "block" }} />
                <span style={{ font: `500 11.5px/1.2 ${FONT}`, color: "#4A564E", whiteSpace: "nowrap" }}>Revenue · {ready ? audShort(d.range.current.revenue) : '—'}</span>
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ width: "9px", height: "9px", borderRadius: "3px", background: "#8BE000", display: "block" }} />
                <span style={{ font: `500 11.5px/1.2 ${FONT}`, color: "#4A564E", whiteSpace: "nowrap" }}>Orders · {ready ? num(d.range.current.orders) : '—'}</span>
              </span>
              {ready && (
                <span style={{ marginLeft: "auto", font: `600 11.5px/1.2 ${FONT}`, color: TONE[rRevenue.tone][0], whiteSpace: "nowrap" }}>{rRevenue.text} vs previous period</span>
              )}
            </div>
          </div>
          <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "18px", display: "flex", flexDirection: "column", gap: "14px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: `600 13.5px/1.2 ${FONT}`, color: "#17201A", whiteSpace: "nowrap" }}>Order status</span>
              <span style={{ marginLeft: "auto", font: `400 11px/1.2 ${FONT}`, color: "#7C8A81", whiteSpace: "nowrap" }}>{range.label}</span>
            </span>
            <div style={{ display: "flex", height: "9px", borderRadius: "5px", overflow: "hidden", background: "#EFF1ED" }}>
              {statusTotal > 0 && STATUS_ROWS.map(([k, , color]) => (
                <span key={k} style={{ width: `${((Number(d?.status[k]) || 0) / statusTotal) * 100}%`, background: color, display: "block" }} />
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              {STATUS_ROWS.map(([k, label, color]) => (
                <span key={k} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "5px 0" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "3px", background: color, display: "block", flex: "none" }} />
                  <span style={{ font: `500 11.5px/1.2 ${FONT}`, color: "#4A564E", whiteSpace: "nowrap" }}>{label}</span>
                  <span style={{ marginLeft: "auto", font: `600 11.5px/1.2 ${FONT}`, color: "#17201A", whiteSpace: "nowrap" }}>{ready ? num(d.status[k]) : '—'}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="r-stack" style={{ display: "grid", gridTemplateColumns: "1.55fr 1fr", gap: "18px", alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ font: `600 14px/1.2 ${FONT}`, color: "#17201A", whiteSpace: "nowrap" }}>Recent orders</span>
              <button onClick={v.nav_orders} style={{ marginLeft: "auto", border: "0", background: "transparent", font: `600 11.5px/1.2 ${FONT}`, color: "#17693A", cursor: "pointer", whiteSpace: "nowrap", padding: "0" }}>
                View all orders →
              </button>
            </div>
            <RecentOrders v={v} now={now} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ font: `600 14px/1.2 ${FONT}`, color: "#17201A", whiteSpace: "nowrap" }}>Low stock alerts</span>
              <button onClick={v.nav_inv} style={{ marginLeft: "auto", border: "0", background: "transparent", font: `600 11.5px/1.2 ${FONT}`, color: "#17693A", cursor: "pointer", whiteSpace: "nowrap", padding: "0" }}>
                Inventory →
              </button>
            </div>
            <div className="r-table-wrap" style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", overflow: "hidden", flex: "none" }}>
              <div className="r-table" style={{ display: "grid", gridTemplateColumns: "1.6fr .5fr .6fr .9fr 110px", gap: "14px", padding: "11px 16px", background: "#F6F7F4", borderBottom: "1px solid #E4E7E2" }}>
                {['Product', 'Stock', 'Min', 'Status', 'Action'].map((h) => <span key={h} style={{ ...colHead, textOverflow: "ellipsis" }}>{h}</span>)}
              </div>
              <LowStockRows v={v} stats={stats} />
            </div>
            {d?.delayed.count > 0 && (
              <div style={{ background: "#FBF6EA", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "13px 14px", display: "flex", alignItems: "center", gap: "11px", borderColor: "#EEE0C2" }}>
                <svg width="17" height="17" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <path d="M10 3.6l7 12.2H3l7-12.2z" stroke="#8A6100" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M10 8v3.4" stroke="#8A6100" strokeWidth="1.6" strokeLinecap="round" />
                  <circle cx="10" cy="13.6" r=".9" fill="#8A6100" />
                </svg>
                <span style={{ display: "flex", flexDirection: "column", gap: "3px", minWidth: "0" }}>
                  <span style={{ font: `600 12px/1.2 ${FONT}`, color: "#6B4E08", whiteSpace: "nowrap" }}>
                    {d.delayed.count} order{d.delayed.count === 1 ? '' : 's'} delayed past ETA
                  </span>
                  <span style={{ font: `400 11px/1.2 ${FONT}`, color: "#8A7340", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {d.delayed.zones.length === 0 ? 'Check assignments' : d.delayed.zones.length === 1 ? `${d.delayed.zones[0]} zone` : `${d.delayed.zones[0]} +${d.delayed.zones.length - 1} more zone${d.delayed.zones.length === 2 ? '' : 's'}`} · reassign drivers
                  </span>
                </span>
                <button onClick={v.nav_del} style={{ marginLeft: "auto", height: "28px", padding: "0 10px", border: "0", borderRadius: "7px", background: "#8A6100", color: "#fff", font: `600 11px/1.2 ${FONT}`, cursor: "pointer", whiteSpace: "nowrap" }}>
                  Review
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
