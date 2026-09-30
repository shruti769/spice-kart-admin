import { useEffect, useMemo, useState } from 'react'
import {
  CUSTOMER_SORTS, CUSTOMER_TABS, customerPill, downloadCsv, fetchCustomersForExport, fileDate, moneyAU, monthYear, num,
  relativeDay, useCustomerSummary, useCustomers, useNow,
} from '../lib/customers'
import { customerName, initials, mobileLabel } from '../lib/orders'
import EditCustomerModal from '../modals/EditCustomerModal'
import SuspendCustomerModal from '../modals/SuspendCustomerModal'

const FONT = 'Inter,system-ui,sans-serif'
const INK = '#17201A'
const MUTED = '#7C8A81'
const BORDER = '#E4E7E2'
const PAGE = 20
const COLS = '1.4fr 1.6fr 1.1fr .6fr .9fr .9fr minmax(84px,.9fr) .7fr 120px'

const ellipsis = { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }
const head = { font: `600 10.5px/1.2 ${FONT}`, letterSpacing: '.5px', color: MUTED, textTransform: 'uppercase', ...ellipsis }
const cellWrap = { minWidth: '0', display: 'flex', alignItems: 'center', gap: '8px' }
const small = { font: `400 11px/1.2 ${FONT}`, color: MUTED, ...ellipsis }
const strong = { font: `600 12.5px/1.2 ${FONT}`, color: INK, ...ellipsis }
const topBtn = { display: 'flex', alignItems: 'center', gap: '7px', height: '34px', padding: '0 12px', border: `1px solid ${BORDER}`, borderRadius: '8px', background: '#fff', color: INK, font: `600 12.5px/1.2 ${FONT}`, cursor: 'pointer', whiteSpace: 'nowrap' }
const selectBox = { height: '32px', padding: '0 10px', border: `1px solid ${BORDER}`, borderRadius: '8px', background: '#fff', font: `500 12px/1.2 ${FONT}`, color: INK, cursor: 'pointer' }
const pillStyle = (fg, bg, pad = '5px 8px') => ({ font: `600 10.5px/1.2 ${FONT}`, color: fg, background: bg, padding: pad, borderRadius: '5px', whiteSpace: 'nowrap', display: 'inline-block' })
const TONE = { up: ['#0B6B33', '#E9F6E3'], down: ['#A93826', '#FAEDEA'], flat: ['#5F6B62', '#EEF0EC'] }

const ICONS = {
  total: (
    <>
      <circle cx="8.4" cy="7.4" r="2.8" stroke="#4A564E" strokeWidth="1.5" />
      <path d="M3.4 16.5c.8-2.9 2.6-4.3 5-4.3s4.2 1.4 5 4.3" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 5.3a2.6 2.6 0 010 4.8M15.5 16.5c-.3-1.8-.9-3.1-1.8-4" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  new: <path d="M10 4.4v11.2M4.4 10h11.2" stroke="#4A564E" strokeWidth="1.8" strokeLinecap="round" />,
  active: <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#4A564E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
  returning: (
    <>
      <path d="M3.4 3.4v12.2a1 1 0 001 1h12.2" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6.8 13.2l3-3.4 2.4 2.2 3.6-4.4" stroke="#4A564E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
}

function Kpi({ icon, label, value, pill }) {
  const [text, tone] = pill
  const [fg, bg] = TONE[tone]
  return (
    <div style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '10px', padding: '15px 16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ width: '26px', height: '26px', borderRadius: '7px', background: '#F6F7F4', border: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: 'none' }}>{ICONS[icon]}</svg>
        </span>
        <span style={{ font: `500 11.5px/1.2 ${FONT}`, color: MUTED, whiteSpace: 'nowrap' }}>{label}</span>
      </span>
      <span style={{ font: `700 23px/1.2 ${FONT}`, color: INK, letterSpacing: '-.4px', whiteSpace: 'nowrap' }}>{value}</span>
      {text && <span style={{ ...pillStyle(fg, bg, '4px 7px'), alignSelf: 'flex-start' }}>{text}</span>}
    </div>
  )
}

/** KPI card values from customer_summary(). */
function kpis(s) {
  if (!s) return { total: ['—', ['', 'flat']], week: ['—', ['', 'flat']], active: ['—', ['', 'flat']], returning: ['—', ['', 'flat']] }
  const arrow = (d) => (d > 0 ? '▲' : d < 0 ? '▼' : '')
  const tone = (d) => (d > 0 ? 'up' : d < 0 ? 'down' : 'flat')

  let growth
  if (s.total_month_ago > 0) {
    const g = ((s.total - s.total_month_ago) / s.total_month_ago) * 100
    growth = g ? [`${arrow(g)} ${Math.abs(g).toFixed(1)}% this month`, tone(g)] : ['No change this month', 'flat']
  } else growth = s.new_month > 0 ? [`+${num(s.new_month)} this month`, 'up'] : ['No sign-ups yet', 'flat']

  let returning = ['—', ['No orders yet', 'flat']]
  if (s.buyers > 0) {
    const rate = (s.returning / s.buyers) * 100
    let pill = [`${num(s.returning)} of ${num(s.buyers)} buyers`, 'flat']
    if (s.buyers_month_ago > 0) {
      const d = rate - (s.returning_month_ago / s.buyers_month_ago) * 100
      pill = Math.abs(d) >= 0.05 ? [`${arrow(d)} ${Math.abs(d).toFixed(1)} pts vs last month`, tone(d)] : ['Same as last month', 'flat']
    }
    returning = [`${rate.toFixed(1)}%`, pill]
  }
  return {
    total: [num(s.total), growth],
    week: [num(s.new_week), ['This week', 'up']],
    active: [num(s.active), ['Ordered in 30 days', 'up']],
    returning,
  }
}

/** [1, '…', 4, 5, 6, '…', 12] */
function pageList(page, pages) {
  if (pages <= 7) return Array.from({ length: pages }, (_, i) => i + 1)
  const set = [1, page - 1, page, page + 1, pages].filter((p) => p >= 1 && p <= pages)
  const out = []
  for (const p of [...new Set(set)].sort((a, b) => a - b)) {
    if (out.length && p - out[out.length - 1] > 1) out.push('…')
    out.push(p)
  }
  return out
}

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
  return (
    <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '5px' }}>
      {arrow(-1)}
      {pageList(page, pages).map((p, i) => (p === '…' ? (
        <span key={`gap${i}`} style={{ minWidth: '18px', textAlign: 'center', font: `500 11.5px/1.2 ${FONT}`, color: MUTED }}>…</span>
      ) : p === page ? (
        <span key={p} style={{ minWidth: '28px', height: '28px', padding: '0 6px', boxSizing: 'border-box', borderRadius: '6px', background: '#0B3D1F', color: '#fff', font: `600 11.5px/1.2 ${FONT}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{p}</span>
      ) : (
        <button key={p} type="button" onClick={() => onPage(p)} style={{ minWidth: '28px', height: '28px', padding: '0 6px', border: `1px solid ${BORDER}`, borderRadius: '6px', font: `500 11.5px/1.2 ${FONT}`, color: '#4A564E', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', cursor: 'pointer' }}>{p}</button>
      )))}
      {arrow(1)}
    </span>
  )
}

export default function Customers({ v }) {
  const now = useNow()
  const [tab, setTab] = useState('all')
  const [input, setInput] = useState('')
  const [q, setQ] = useState('')
  const [marketing, setMarketing] = useState('any')
  const [sort, setSort] = useState('joined')
  const [showFilters, setShowFilters] = useState(false)
  const [page, setPage] = useState(1)
  const [menu, setMenu] = useState(null) // { row, top, right }
  const [modal, setModal] = useState(null) // { kind: 'edit' | 'suspend', row }
  const [exporting, setExporting] = useState(false)

  // Debounced search: query 300ms after typing stops.
  useEffect(() => {
    const t = setTimeout(() => {
      setQ(input)
      setPage(1)
    }, 300)
    return () => clearTimeout(t)
  }, [input])

  const filters = useMemo(() => ({ tab, q, marketing, sort }), [tab, q, marketing, sort])
  const list = useCustomers(filters, page, PAGE)
  const summary = useCustomerSummary()
  const s = summary.data
  const k = kpis(s)

  const rows = list.data?.rows ?? []
  const count = list.data?.count ?? 0
  const pages = Math.max(1, Math.ceil(count / PAGE))
  const filtered = tab !== 'all' || q.trim() || marketing !== 'any'

  const refresh = () => { list.refetch(); summary.refetch() }
  const pick = (fn) => (value) => { fn(value); setPage(1) }
  const open = (kind, row) => { setMenu(null); setModal({ kind, row }) }
  // Keep an open modal in sync with live data.
  const modalRow = modal ? rows.find((r) => r.id === modal.row.id) ?? modal.row : null

  let message = null
  if (list.status === 'off') message = 'Supabase keys are missing · add them to .env to load customers.'
  else if (list.loading) message = 'Loading customers…'
  else if (list.status === 'error' && !rows.length) message = list.error
  else if (!rows.length) {
    if (page > 1 && count > 0) message = 'Nothing on this page · go back a page.'
    else if (filtered) message = 'No customers match these filters.'
    else message = 'No customers yet — they appear when someone signs up in the app.'
  }

  let subtitle = 'Customers who sign up in the app appear here live'
  if (s) subtitle = `${num(s.active)} active customer${s.active === 1 ? '' : 's'} · ${num(s.new_week)} new this week`
  else if (summary.status === 'error') subtitle = summary.error

  const exportCsv = async () => {
    if (exporting) return
    setExporting(true)
    try {
      const res = await fetchCustomersForExport(filters)
      if (!res.rows.length) {
        v.flash('Nothing to export · no customers match these filters')
        return
      }
      downloadCsv(`customers-${fileDate()}.csv`,
        ['First name', 'Last name', 'Email', 'Mobile', 'Suburb', 'Postcode', 'Orders', 'Total spend (AUD)', 'Last order', 'Status', 'Joined', 'Marketing opt-in', 'Suspended reason'],
        res.rows.map((c) => [
          c.first_name, c.last_name, c.email, mobileLabel(c.mobile), c.suburb, c.postcode, c.orders, Number(c.total_spend || 0).toFixed(2),
          c.last_order_at ? new Date(c.last_order_at).toLocaleDateString('en-AU') : '', c.status,
          new Date(c.created_at).toLocaleDateString('en-AU'), c.marketing_opt_in ? 'Yes' : 'No', c.suspended_reason,
        ]))
      v.flash(res.count > res.rows.length ? `Exported the first ${num(res.rows.length)} of ${num(res.count)} customers` : `Exported ${num(res.rows.length)} customer${res.rows.length === 1 ? '' : 's'}`)
    } catch (e) {
      v.flash(e.message)
    } finally {
      setExporting(false)
    }
  }

  return (
    <>
      <div className="sk-topbar" style={{ display: 'flex', alignItems: 'flex-end', gap: '18px', padding: '24px 26px 2px' }}>
        <span style={{ display: 'flex', flexDirection: 'column', gap: '5px', minWidth: '0' }}>
          <span style={{ font: `700 20px/1.2 ${FONT}`, color: INK, whiteSpace: 'nowrap' }}>Customers</span>
          <span style={{ font: `400 12.5px/1.2 ${FONT}`, color: MUTED, whiteSpace: 'nowrap' }}>{subtitle}</span>
        </span>
        <span className="r-wrap" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="r-full" style={{ display: 'flex', alignItems: 'center', gap: '8px', height: '34px', width: '230px', padding: '0 11px', border: `1px solid ${BORDER}`, borderRadius: '8px', background: '#fff' }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: 'none' }}>
              <circle cx="9" cy="9" r="6" stroke={MUTED} strokeWidth="1.6" />
              <path d="M13.4 13.4L18 18" stroke={MUTED} strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Search name, email, phone…" aria-label="Search customers" style={{ border: '0', outline: 'none', background: 'transparent', font: `400 12.5px/1.2 ${FONT}`, color: INK, width: '100%', minWidth: '0' }} />
          </span>
          <button className="hv1" onClick={() => setShowFilters((x) => !x)} style={{ ...topBtn, ...(showFilters || marketing !== 'any' || sort !== 'joined' ? { borderColor: '#0B3D1F' } : null) }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: 'none' }}>
              <path d="M3 5.4h14M5.6 10h8.8M8.4 14.6h3.2" stroke="#4A564E" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            Filter
          </button>
          <button className="hv1" onClick={exportCsv} disabled={exporting} style={{ ...topBtn, opacity: exporting ? 0.6 : 1 }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: 'none' }}>
              <path d="M10 3.6v9M6.4 9.2L10 12.8l3.6-3.6M3.6 16.4h12.8" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {exporting ? 'Exporting…' : 'Export'}
          </button>
        </span>
      </div>
      <div className="ad-scroll sk-page" style={{ flex: '1', minHeight: '0', overflowY: 'auto', padding: '20px 26px 30px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div className="r-kpi" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px' }}>
          <Kpi icon="total" label="Total customers" value={k.total[0]} pill={k.total[1]} />
          <Kpi icon="new" label="New customers" value={k.week[0]} pill={k.week[1]} />
          <Kpi icon="active" label="Active customers" value={k.active[0]} pill={k.active[1]} />
          <Kpi icon="returning" label="Returning rate" value={k.returning[0]} pill={k.returning[1]} />
        </div>
        <div className="ad-scroll" style={{ display: 'flex', gap: '2px', borderBottom: `1px solid ${BORDER}`, overflowX: 'auto', flex: 'none' }}>
          {CUSTOMER_TABS.map(([key, label]) => {
            const on = tab === key
            const n = key === 'suspended' ? s?.suspended : null
            return (
              <button key={key} onClick={() => pick(setTab)(key)} style={{ border: '0', background: 'transparent', padding: '0 12px 10px', font: `600 12.5px/1.2 ${FONT}`, color: on ? '#0B3D1F' : MUTED, borderBottom: `2px solid ${on ? '#0B3D1F' : 'transparent'}`, cursor: 'pointer', whiteSpace: 'nowrap', marginBottom: '-1px' }}>
                {label}{n ? ` · ${num(n)}` : ''}
              </button>
            )
          })}
        </div>

        {showFilters && (
          <div className="r-wrap" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '-4px' }}>
            <select value={marketing} onChange={(e) => pick(setMarketing)(e.target.value)} style={selectBox} aria-label="Marketing opt-in">
              <option value="any">Marketing: Any</option>
              <option value="yes">Opted in to marketing</option>
              <option value="no">Not opted in</option>
            </select>
            <select value={sort} onChange={(e) => pick(setSort)(e.target.value)} style={selectBox} aria-label="Sort">
              {CUSTOMER_SORTS.map(([key, label]) => <option key={key} value={key}>Sort: {label}</option>)}
            </select>
            {(filtered || sort !== 'joined') && (
              <button className="hv1" onClick={() => { setTab('all'); setInput(''); setQ(''); setMarketing('any'); setSort('joined'); setPage(1) }} style={{ ...selectBox, font: `600 12px/1.2 ${FONT}` }}>Clear filters</button>
            )}
          </div>
        )}

        <div className="r-table-wrap" style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '10px', overflow: 'hidden', flex: 'none' }}>
          <div className="r-table" style={{ '--r-min': '980px', display: 'grid', gridTemplateColumns: COLS, gap: '14px', padding: '11px 16px', background: '#F6F7F4', borderBottom: `1px solid ${BORDER}` }}>
            {['Customer', 'Email', 'Phone', 'Orders', 'Total spend', 'Last order', 'Status', 'Joined', 'Actions'].map((h) => <span key={h} style={head}>{h}</span>)}
          </div>
          {message ? (
            <div style={{ padding: '32px 16px', textAlign: 'center', font: `400 12.5px/1.5 ${FONT}`, color: MUTED }}>{message}</div>
          ) : rows.map((c, i) => {
            const [pl, pfg, pbg] = customerPill(c, now)
            return (
              <div key={c.id} className="hv3 r-table" style={{ '--r-min': '980px', display: 'grid', gridTemplateColumns: COLS, gap: '14px', padding: '13px 16px', borderBottom: i < rows.length - 1 ? '1px solid #EFF1ED' : '0', alignItems: 'center' }}>
                <span style={cellWrap}>
                  <span style={{ width: '28px', height: '28px', borderRadius: '7px', background: '#F6F7F4', border: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', font: `600 10.5px/1.2 ${FONT}`, color: '#4A564E', flex: 'none' }}>{initials(c)}</span>
                  <span style={strong} title={customerName(c)}>{customerName(c)}</span>
                </span>
                <span style={cellWrap}><span style={small} title={c.email ?? ''}>{c.email || '—'}</span></span>
                <span style={cellWrap}><span style={small}>{mobileLabel(c.mobile) || '—'}</span></span>
                <span style={cellWrap}><span style={strong}>{num(c.orders)}</span></span>
                <span style={cellWrap}><span style={{ ...strong, fontWeight: 700 }}>{moneyAU(c.total_spend)}</span></span>
                <span style={cellWrap}><span style={small}>{relativeDay(c.last_order_at, now)}</span></span>
                <span style={cellWrap}><span style={pillStyle(pfg, pbg)} title={c.suspended_reason ?? undefined}>{pl}</span></span>
                <span style={cellWrap}><span style={small}>{monthYear(c.created_at)}</span></span>
                <span style={cellWrap}>
                  <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <button onClick={() => v.openCustomer(c)} style={{ height: '26px', padding: '0 9px', border: `1px solid ${BORDER}`, borderRadius: '6px', background: '#fff', font: `600 11px/1.2 ${FONT}`, color: INK, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                      View
                    </button>
                    <button
                      onClick={(e) => {
                        const r = e.currentTarget.getBoundingClientRect()
                        setMenu(menu?.row.id === c.id ? null : { row: c, top: r.bottom + 4, right: window.innerWidth - r.right })
                      }}
                      aria-label="More actions"
                      style={{ width: '26px', height: '26px', border: `1px solid ${BORDER}`, borderRadius: '6px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: '0' }}
                    >
                      <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: 'none' }}>
                        <circle cx="5" cy="10" r="1.3" fill={MUTED} />
                        <circle cx="10" cy="10" r="1.3" fill={MUTED} />
                        <circle cx="15" cy="10" r="1.3" fill={MUTED} />
                      </svg>
                    </button>
                  </span>
                </span>
              </div>
            )
          })}
          {count > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderTop: `1px solid ${BORDER}`, background: '#fff' }}>
              <span style={{ font: `400 11.5px/1.2 ${FONT}`, color: MUTED, whiteSpace: 'nowrap' }}>
                {rows.length
                  ? `Showing ${num((page - 1) * PAGE + 1)}–${num((page - 1) * PAGE + rows.length)} of ${num(count)} customer${count === 1 ? '' : 's'}`
                  : `${num(count)} customer${count === 1 ? '' : 's'}`}
              </span>
              <Pager page={Math.min(page, pages)} pages={pages} onPage={setPage} />
            </div>
          )}
        </div>
      </div>

      {menu && (
        <div onClick={() => setMenu(null)} style={{ position: 'fixed', inset: '0', zIndex: '80' }}>
          <div onClick={(e) => e.stopPropagation()} style={{ position: 'fixed', top: `${menu.top}px`, right: `${menu.right}px`, minWidth: '170px', background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '9px', boxShadow: '0 12px 30px rgba(10,18,12,.16)', padding: '5px', display: 'flex', flexDirection: 'column' }}>
            {[
              ['View details', () => { setMenu(null); v.openCustomer(menu.row) }],
              ['Edit details', () => open('edit', menu.row)],
              [menu.row.suspended_at ? 'Reinstate account' : 'Suspend account', () => open('suspend', menu.row), !menu.row.suspended_at],
            ].map(([label, fn, danger]) => (
              <button key={label} className="hv3" onClick={fn} style={{ textAlign: 'left', border: '0', background: 'transparent', padding: '8px 10px', borderRadius: '6px', font: `500 12.5px/1.2 ${FONT}`, color: danger ? '#A93826' : INK, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {modal?.kind === 'edit' && <EditCustomerModal customer={modalRow} onClose={() => setModal(null)} onSaved={refresh} flash={v.flash} />}
      {modal?.kind === 'suspend' && <SuspendCustomerModal customer={modalRow} onClose={() => setModal(null)} onDone={refresh} flash={v.flash} />}
    </>
  )
}
