import { useState } from 'react'
import {
  TONE, aud, audShort, change, dayLabel, downloadCsv, linePoints, melbToday, num, pct, rangeFor, ratio, useAnalytics, useClock,
} from '../lib/analytics'

const FONT = 'Inter,system-ui,sans-serif'

const TABS = ['Overview', 'Sales', 'Orders', 'Customers', 'Products', 'Inventory', 'Delivery']
const RANGES = [['7d', '7 days'], ['30d', '30 days'], ['90d', '90 days'], ['12m', '12 months'], ['custom', 'Custom']]
/** Which sections each tab shows. */
const SECTIONS = {
  Overview: ['kpis', 'revenue', 'customers', 'top', 'category', 'delivery'],
  Sales: ['kpis', 'revenue', 'top', 'category'],
  Orders: ['kpis', 'revenue', 'delivery'],
  Customers: ['kpis', 'customers'],
  Products: ['top', 'category'],
  Inventory: ['top', 'category'],
  Delivery: ['delivery'],
}

const card = { background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "15px 16px", display: "flex", flexDirection: "column", gap: "10px" }
const iconBox = { width: "26px", height: "26px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center" }
const title = { font: `600 13.5px/1.2 ${FONT}`, color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }
const axis = { font: `400 11px/1.2 ${FONT}`, color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }
const colHead = { font: `600 10.5px/1.2 ${FONT}`, letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }
const cellWrap = { minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }
const emptyText = { font: `400 11.5px/1.45 ${FONT}`, color: "#7C8A81" }
const dateInput = { height: "30px", padding: "0 8px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: `500 11.5px/1.2 ${FONT}`, color: "#17201A" }
const headerBtn = { display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 12px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", color: "#17201A", font: `600 12.5px/1.2 ${FONT}`, cursor: "pointer", whiteSpace: "nowrap" }

const svg = (children) => <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>{children}</svg>
const ICONS = {
  revenue: svg(<>
    <circle cx="10" cy="10" r="7.2" stroke="#4A564E" strokeWidth="1.5" />
    <path d="M10 5.6v8.8" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12.3 7.9c0-1.05-1.03-1.75-2.3-1.75s-2.3.7-2.3 1.75 1.03 1.55 2.3 1.85 2.3.8 2.3 1.85-1.03 1.75-2.3 1.75-2.3-.7-2.3-1.75" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
  </>),
  orders: svg(<>
    <rect x="4.4" y="4.2" width="11.2" height="12.4" rx="2" stroke="#4A564E" strokeWidth="1.5" />
    <path d="M7.8 4.2v-.8a1 1 0 011-1h2.4a1 1 0 011 1v.8" stroke="#4A564E" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M7.4 8.8h5.2M7.4 11.4h5.2M7.4 14h3" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
  </>),
  aov: svg(<>
    <path d="M3.4 3.4v12.2a1 1 0 001 1h12.2" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M6.8 13.2l3-3.4 2.4 2.2 3.6-4.4" stroke="#4A564E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </>),
  repeat: svg(<>
    <path d="M4 10a6 6 0 1 1 2 4.5" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M4 6.4V10h3.6" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </>),
  cancel: svg(<>
    <path d="M10 3.6l7 12.2H3l7-12.2z" stroke="#4A564E" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M10 8v3.4" stroke="#4A564E" strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="10" cy="13.6" r=".9" fill="#4A564E" />
  </>),
}

function Kpi({ icon, label, value, delta, prior }) {
  const [fg, bg] = TONE[delta.tone]
  return (
    <div style={card}>
      <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={iconBox}>{icon}</span>
        <span style={{ font: `500 11.5px/1.2 ${FONT}`, color: "#7C8A81", whiteSpace: "nowrap" }}>{label}</span>
      </span>
      <span style={{ font: `700 23px/1.2 ${FONT}`, color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>{value}</span>
      <span style={{ font: `600 10.5px/1.2 ${FONT}`, color: fg, background: bg, padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>{delta.text}</span>
      {prior != null && <span style={{ font: `400 11px/1.2 ${FONT}`, color: "#7C8A81", whiteSpace: "nowrap" }}>Prior period · {prior}</span>}
    </div>
  )
}

function LineCard({ label, delta, values, prevValues, color, days, yearLabels, compare, emptyMsg }) {
  const [fg, bg] = TONE[delta.tone]
  const max = Math.max(0, ...values, ...(compare ? prevValues : []))
  const ticks = days.length ? [days[0], days[Math.floor((days.length - 1) / 2)], days[days.length - 1]] : []
  return (
    <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "18px", display: "flex", flexDirection: "column", gap: "14px" }}>
      <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={title}>{label}</span>
        <span style={{ marginLeft: "auto" }}>
          <span style={{ font: `600 10.5px/1.2 ${FONT}`, color: fg, background: bg, padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>{delta.text}</span>
        </span>
      </span>
      <span style={{ position: "relative", display: "block" }}>
        <svg viewBox="0 0 320 110" preserveAspectRatio="none" style={{ width: "100%", height: "110px", display: "block" }}>
          {compare && prevValues.length > 0 && (
            <polyline points={linePoints(prevValues, max)} fill="none" stroke="#B9C3BC" strokeWidth="1.8" strokeDasharray="4 4" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          )}
          <polyline points={linePoints(values, max)} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {emptyMsg && (
          <span style={{ position: "absolute", inset: "0", display: "flex", alignItems: "center", justifyContent: "center", ...emptyText }}>{emptyMsg}</span>
        )}
      </span>
      <span style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
        {ticks.map((d, i) => <span key={i} style={axis}>{dayLabel(d, { year: yearLabels })}</span>)}
      </span>
    </div>
  )
}

function DeliveryRow({ label, value, delta }) {
  return (
    <span style={{ display: "flex", alignItems: "center", gap: "10px", paddingBottom: "9px", borderBottom: "1px solid #EFF1ED" }}>
      <span style={{ display: "flex", flexDirection: "column", gap: "3px", minWidth: "0" }}>
        <span style={{ font: `500 12px/1.2 ${FONT}`, color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{label}</span>
        <span style={{ font: `400 11px/1.2 ${FONT}`, color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{delta}</span>
      </span>
      <span style={{ marginLeft: "auto" }}>
        <span style={{ font: `700 14px/1.2 ${FONT}`, color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{value}</span>
      </span>
    </span>
  )
}

export default function Analytics({ v }) {
  const now = useClock()
  const today = melbToday(now)
  const [tab, setTab] = useState('Overview')
  const [rng, setRng] = useState('30d')
  const [custom, setCustom] = useState(null)
  const [compare, setCompare] = useState(false)
  const range = rangeFor(rng, today, custom)
  const stats = useAnalytics(range)
  const d = stats.data
  const ready = Boolean(d)
  const show = new Set(SECTIONS[tab])

  const pickRange = (k) => {
    if (k === 'custom' && !custom) setCustom({ from: range.fromDay, to: range.toDay })
    setRng(k)
  }

  // KPIs
  const cur = d?.kpis.current ?? {}
  const prev = d?.kpis.previous ?? {}
  const repeatRate = ratio(cur.repeat_customers, cur.customers)
  const prevRepeatRate = ratio(prev.repeat_customers, prev.customers)
  const cancelRate = ratio(cur.cancelled, cur.placed)
  const prevCancelRate = ratio(prev.cancelled, prev.placed)
  const pending = { text: '—', tone: 'flat' }
  const dRevenue = ready ? change(cur.revenue, prev.revenue) : pending
  const dOrders = ready ? change(cur.orders, prev.orders) : pending
  const dAov = ready ? change(cur.aov, prev.aov, { mode: 'money' }) : pending
  const dRepeat = ready ? change(repeatRate ?? 0, prevRepeatRate, { mode: 'pp' }) : pending
  const dCancel = ready ? change(cancelRate ?? 0, prevCancelRate, { mode: 'pp', upIsGood: false }) : pending

  // Charts
  const series = d?.series ?? []
  const prevSeries = d?.prevSeries ?? []
  const days = series.map((r) => r.day)
  const revenue = series.map((r) => Number(r.revenue))
  const prevRevenue = prevSeries.map((r) => Number(r.revenue))
  const customers = series.map((r) => r.total_customers)
  const prevCustomers = prevSeries.map((r) => r.total_customers)
  const custBase = series.length ? series[0].total_customers - series[0].new_customers : 0
  const custEnd = series.length ? series[series.length - 1].total_customers : 0
  const dCustomers = ready ? change(custEnd, custBase) : pending
  const yearLabels = range.days > 180
  const chartMsg = (values, msg) => (!ready ? (stats.loading ? 'Loading…' : '') : values.some((x) => x > 0) ? '' : msg)

  // Categories
  const cats = (d?.categories ?? []).slice(0, 6)
  const maxCat = Math.max(0, ...cats.map((c) => Number(c.revenue)))

  // Delivery
  const dc = d?.delivery?.current ?? {}
  const dp = d?.delivery?.previous ?? {}
  const refundRate = ratio(d?.status.refunded, cur.placed)
  const prevRefundRate = ratio(d?.prevStatus.refunded, prev.placed)
  const deliveryRows = [
    ['Average delivery time', dc.avg_minutes != null ? `${Number(dc.avg_minutes).toFixed(1)} min` : '—', change(dc.avg_minutes, dp.avg_minutes, { mode: 'min', upIsGood: false })],
    ['On-time rate', pct(dc.on_time_rate), change(dc.on_time_rate, dp.on_time_rate, { mode: 'pp' })],
    ['Express share', pct(dc.express_share), change(dc.express_share, dp.express_share, { mode: 'pp' })],
    ['Orders delivered', num(dc.delivered), change(dc.delivered, dp.delivered)],
    ['Refund rate', pct(refundRate ?? 0), change(refundRate ?? 0, prevRefundRate, { mode: 'pp', upIsGood: false })],
  ]

  const exportReport = () => {
    if (!ready) return v.flash(stats.status === 'error' ? `Couldn’t export · ${stats.error}` : 'Numbers are still loading')
    const rows = [
      ['Spice Kart analytics', range.label, `${range.fromDay} to ${range.toDay}`],
      [],
      ['Metric', 'This period', 'Prior period'],
      ['Revenue (AUD)', Number(cur.revenue).toFixed(2), Number(prev.revenue).toFixed(2)],
      ['Orders', cur.orders, prev.orders],
      ['Average order value (AUD)', Number(cur.aov).toFixed(2), Number(prev.aov).toFixed(2)],
      ['Repeat purchase rate (%)', repeatRate?.toFixed(1) ?? '', prevRepeatRate?.toFixed(1) ?? ''],
      ['Cancellation rate (%)', cancelRate?.toFixed(1) ?? '', prevCancelRate?.toFixed(1) ?? ''],
      ['New customers', cur.new_customers, prev.new_customers],
      ['Average delivery time (min, express)', dc.avg_minutes ?? '', dp.avg_minutes ?? ''],
      ['On-time rate (%)', dc.on_time_rate ?? '', dp.on_time_rate ?? ''],
      ['Express share (%)', dc.express_share ?? '', dp.express_share ?? ''],
      ['Refund rate (%)', refundRate?.toFixed(1) ?? '', prevRefundRate?.toFixed(1) ?? ''],
      [],
      ['Date', 'Orders', 'Revenue (AUD)', 'New customers', 'Total customers'],
      ...series.map((r) => [r.day, r.orders, Number(r.revenue).toFixed(2), r.new_customers, r.total_customers]),
      [],
      ['Top product', 'Units', 'Revenue (AUD)'],
      ...d.top.map((p) => [p.name, p.units, Number(p.revenue).toFixed(2)]),
      [],
      ['Category', 'Units', 'Revenue (AUD)'],
      ...d.categories.map((c) => [c.name, c.units, Number(c.revenue).toFixed(2)]),
    ]
    downloadCsv(`spice-kart-analytics_${range.fromDay}_to_${range.toDay}.csv`, rows)
    v.flash(`Report downloaded · ${range.label}`)
  }

  const bottom = ['top', 'category', 'delivery'].filter((k) => show.has(k))
  const charts = ['revenue', 'customers'].filter((k) => show.has(k))

  return (
    <>
      <div className="sk-topbar" style={{ display: "flex", alignItems: "flex-end", gap: "18px", padding: "24px 26px 2px" }}>
        <span style={{ display: "flex", flexDirection: "column", gap: "5px", minWidth: "0" }}>
          <span style={{ font: `700 20px/1.2 ${FONT}`, color: "#17201A", whiteSpace: "nowrap" }}>Analytics</span>
          <span style={{ font: `400 12.5px/1.2 ${FONT}`, color: "#7C8A81", whiteSpace: "nowrap" }}>
            Performance across orders, customers, products and delivery
          </span>
        </span>
        <span className="r-wrap" style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px" }}>
          <button className="hv1" onClick={() => pickRange('custom')} style={headerBtn}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
              <circle cx="10" cy="10" r="7.2" stroke="#4A564E" strokeWidth="1.5" />
              <path d="M10 5.8V10l3 1.8" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            {range.label}
          </button>
          <button className="hv1" onClick={() => setCompare((c) => !c)} aria-pressed={compare} style={compare ? { ...headerBtn, background: "#F1F9DF", borderColor: "#C7E88A", color: "#0B3D1F" } : headerBtn}>
            Compare
          </button>
          <button className="hv2" onClick={exportReport} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 13px", border: "0", borderRadius: "8px", background: "#0B3D1F", color: "#fff", font: `600 12.5px/1.2 ${FONT}`, cursor: "pointer", whiteSpace: "nowrap" }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
              <path d="M10 3.6v9M6.4 9.2L10 12.8l3.6-3.6M3.6 16.4h12.8" stroke="#8BE000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Export report
          </button>
        </span>
      </div>
      <div className="ad-scroll sk-page" style={{ flex: "1", minHeight: "0", overflowY: "auto", padding: "20px 26px 30px", display: "flex", flexDirection: "column", gap: "18px" }}>
        <div className="ad-scroll" style={{ display: "flex", gap: "2px", borderBottom: "1px solid #E4E7E2", overflowX: "auto" }}>
          {TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: `600 12.5px/1.2 ${FONT}`, color: tab === t ? "#0B3D1F" : "#7C8A81", borderBottom: `2px solid ${tab === t ? "#0B3D1F" : "transparent"}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
              {t}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          <div className="r-wrap" style={{ display: "flex", gap: "6px", padding: "2px", background: "#F6F7F4", border: "1px solid #E4E7E2", borderRadius: "8px", alignSelf: "flex-start" }}>
            {RANGES.map(([k, label]) => (
              <button key={k} onClick={() => pickRange(k)} style={{ font: `600 11.5px/1.2 ${FONT}`, color: rng === k ? "#ffffff" : "#4A564E", background: rng === k ? "#0B3D1F" : "transparent", border: "0", padding: "7px 11px", borderRadius: "6px", whiteSpace: "nowrap", cursor: "pointer" }}>
                {label}
              </button>
            ))}
          </div>
          {rng === 'custom' && custom && (
            <span className="r-wrap" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input type="date" aria-label="From" value={custom.from} max={today} onChange={(e) => e.target.value && setCustom((c) => ({ ...c, from: e.target.value }))} style={dateInput} />
              <span style={{ font: `400 11.5px/1.2 ${FONT}`, color: "#7C8A81" }}>to</span>
              <input type="date" aria-label="To" value={custom.to} max={today} onChange={(e) => e.target.value && setCustom((c) => ({ ...c, to: e.target.value }))} style={dateInput} />
            </span>
          )}
          {stats.status === 'error' && <span style={{ font: `400 12px/1.45 ${FONT}`, color: "#B3402F" }}>Couldn’t load analytics · {stats.error}</span>}
          {stats.status === 'off' && <span style={{ font: `400 12px/1.45 ${FONT}`, color: "#7C8A81" }}>Supabase keys are missing · add them to .env to load live numbers.</span>}
        </div>
        {show.has('kpis') && (
          <div className="r-kpi" style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "14px" }}>
            <Kpi icon={ICONS.revenue} label="Revenue" value={ready ? audShort(cur.revenue) : '—'} delta={ready ? { ...dRevenue, text: `${dRevenue.text} vs prior` } : dRevenue} prior={compare && ready ? audShort(prev.revenue) : null} />
            <Kpi icon={ICONS.orders} label="Orders" value={ready ? num(cur.orders) : '—'} delta={dOrders} prior={compare && ready ? num(prev.orders) : null} />
            <Kpi icon={ICONS.aov} label="Average order value" value={ready ? aud(cur.aov) : '—'} delta={dAov} prior={compare && ready ? aud(prev.aov) : null} />
            <Kpi icon={ICONS.repeat} label="Repeat purchase rate" value={ready ? pct(repeatRate ?? 0) : '—'} delta={dRepeat} prior={compare && ready ? pct(prevRepeatRate) : null} />
            <Kpi icon={ICONS.cancel} label="Cancellation rate" value={ready ? pct(cancelRate ?? 0) : '—'} delta={dCancel} prior={compare && ready ? pct(prevCancelRate) : null} />
          </div>
        )}
        {charts.length > 0 && (
          <div className="r-stack" style={{ display: "grid", gridTemplateColumns: `repeat(${charts.length},1fr)`, gap: "18px" }}>
            {show.has('revenue') && (
              <LineCard label="Revenue over time" delta={dRevenue} values={revenue} prevValues={prevRevenue} color="#0B3D1F" days={days} yearLabels={yearLabels} compare={compare} emptyMsg={chartMsg(revenue, 'No revenue in this period')} />
            )}
            {show.has('customers') && (
              <LineCard label="Customer growth" delta={dCustomers} values={customers} prevValues={prevCustomers} color="#1F5C8B" days={days} yearLabels={yearLabels} compare={compare} emptyMsg={chartMsg(customers, 'No customers yet')} />
            )}
          </div>
        )}
        {bottom.length > 0 && (
          <div className="r-stack" style={{ display: "grid", gridTemplateColumns: `repeat(${bottom.length},1fr)`, gap: "18px", alignItems: "start" }}>
            {show.has('top') && (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <span style={title}>Top products</span>
                <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", overflow: "hidden", flex: "none" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "2fr .7fr .9fr", gap: "14px", padding: "11px 16px", background: "#F6F7F4", borderBottom: "1px solid #E4E7E2" }}>
                    {['Product', 'Units', 'Revenue'].map((h) => <span key={h} style={colHead}>{h}</span>)}
                  </div>
                  {!d?.top.length ? (
                    <div style={{ padding: "18px 16px" }}><span style={emptyText}>{!ready ? (stats.loading ? 'Loading…' : '—') : 'No products sold in this period'}</span></div>
                  ) : d.top.map((p, i) => (
                    <div key={p.product_id ?? p.name} className="hv3" style={{ display: "grid", gridTemplateColumns: "2fr .7fr .9fr", gap: "14px", padding: "13px 16px", borderBottom: i === d.top.length - 1 ? "0" : "1px solid #EFF1ED", alignItems: "center" }}>
                      <span style={cellWrap}>
                        <span style={{ width: "30px", height: "30px", borderRadius: "7px", overflow: "hidden", background: "#F6F7F4", border: "1px solid #E4E7E2", flex: "none", display: "block", position: "relative" }}>
                          {p.image_url && <img src={p.image_url} alt="" loading="lazy" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />}
                        </span>
                        <span style={{ font: `500 12px/1.2 ${FONT}`, color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</span>
                      </span>
                      <span style={cellWrap}>
                        <span style={{ font: `600 12.5px/1.2 ${FONT}`, color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{num(p.units)}</span>
                      </span>
                      <span style={cellWrap}>
                        <span style={{ font: `700 12.5px/1.2 ${FONT}`, color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{audShort(p.revenue)}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {show.has('category') && (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <span style={title}>Category performance</span>
                <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "18px", display: "flex", flexDirection: "column", gap: "13px" }}>
                  {!cats.length ? (
                    <span style={emptyText}>{!ready ? (stats.loading ? 'Loading…' : '—') : 'No category sales in this period'}</span>
                  ) : cats.map((c) => (
                    <span key={c.category_id} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                        <span style={{ font: `500 12px/1.2 ${FONT}`, color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.name}</span>
                        <span style={{ marginLeft: "auto" }}>
                          <span style={{ font: `700 12px/1.2 ${FONT}`, color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{audShort(c.revenue)}</span>
                        </span>
                      </span>
                      <span style={{ height: "7px", borderRadius: "4px", background: "#EFF1ED", overflow: "hidden", display: "block" }}>
                        <span style={{ display: "block", width: `${maxCat ? (Number(c.revenue) / maxCat) * 100 : 0}%`, height: "100%", background: "#0B3D1F", borderRadius: "4px" }} />
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            )}
            {show.has('delivery') && (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <span style={title}>Delivery performance</span>
                <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "18px", display: "flex", flexDirection: "column", gap: "14px" }}>
                  {deliveryRows.map(([label, value, delta]) => (
                    <DeliveryRow key={label} label={label} value={ready ? value : '—'} delta={ready ? delta.text : '—'} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}
