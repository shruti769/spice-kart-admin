import { useMemo, useState } from 'react'
import { PAYMENT_LABEL, customerName, placedLabel } from '../lib/orders'
import {
  PAY_STATUSES, REFUND_REASONS, TX_LIMIT, aud, downloadTransactionsCsv, methodLabel, payStatus, txDate, txReference,
  useNow, usePaymentSummary, useRefundRequests, useTransactions,
} from '../lib/payments'
import RefundModal from '../modals/RefundModal'

const FONT = 'Inter,system-ui,sans-serif'
const INK = '#17201A'
const MUTED = '#7C8A81'
const BORDER = '#E4E7E2'
const PAGE_SIZE = 25
const COLS = '1.1fr .9fr 1.2fr .8fr 1.3fr minmax(96px,1fr) 1.1fr 76px'
const RCOLS = '.9fr .9fr 1.1fr .7fr 1.1fr 1.3fr minmax(84px,.9fr) .9fr 96px'
const TABS = [['all', 'All transactions'], ...PAY_STATUSES.map(([k, label]) => [k, label])]
const PERIODS = [['all', 'Any date'], ['today', 'Today'], ['7', 'Last 7 days'], ['30', 'Last 30 days']]

const head = { font: `600 10.5px/1.2 ${FONT}`, letterSpacing: '.5px', color: MUTED, textTransform: 'uppercase', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }
const ell = { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }
const cellWrap = { minWidth: '0', display: 'flex', alignItems: 'center', gap: '8px' }
const strong = { font: `700 12.5px/1.2 ${FONT}`, color: INK, ...ell }
const soft = { font: `400 11px/1.2 ${FONT}`, color: MUTED, ...ell }
const link = { font: `500 12px/1.2 ${FONT}`, color: '#17693A', ...ell }
const pill = (fg, bg) => ({ font: `600 10.5px/1.2 ${FONT}`, color: fg, background: bg, padding: '5px 8px', borderRadius: '5px', whiteSpace: 'nowrap', display: 'inline-block' })
const smallBtn = { height: '26px', padding: '0 9px', border: `1px solid ${BORDER}`, borderRadius: '6px', background: '#fff', font: `600 11px/1.2 ${FONT}`, color: INK, cursor: 'pointer', whiteSpace: 'nowrap' }
const topBtn = { display: 'flex', alignItems: 'center', gap: '7px', height: '34px', padding: '0 12px', border: `1px solid ${BORDER}`, borderRadius: '8px', background: '#fff', color: INK, font: `600 12.5px/1.2 ${FONT}`, cursor: 'pointer', whiteSpace: 'nowrap' }
const selectBox = { height: '32px', padding: '0 10px', border: `1px solid ${BORDER}`, borderRadius: '8px', background: '#fff', font: `500 12px/1.2 ${FONT}`, color: INK, cursor: 'pointer' }

const GREEN = ['#0B6B33', '#E9F6E3']
const RED = ['#A93826', '#FAEDEA']
const GREY = ['#7C8A81', '#EEF0EC']
const AMBER = ['#8A6100', '#FBF1DE']

const ICONS = {
  revenue: (
    <>
      <circle cx="10" cy="10" r="7.2" stroke="#4A564E" strokeWidth="1.5" />
      <path d="M10 5.6v8.8" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12.3 7.9c0-1.05-1.03-1.75-2.3-1.75s-2.3.7-2.3 1.75 1.03 1.55 2.3 1.85 2.3.8 2.3 1.85-1.03 1.75-2.3 1.75-2.3-.7-2.3-1.75" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  ok: <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#4A564E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
  failed: (
    <>
      <path d="M10 3.6l7 12.2H3l7-12.2z" stroke="#4A564E" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 8v3.4" stroke="#4A564E" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="10" cy="13.6" r=".9" fill="#4A564E" />
    </>
  ),
  refund: (
    <>
      <path d="M4 10a6 6 0 1 1 2 4.5" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4 6.4V10h3.6" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  pending: (
    <>
      <circle cx="10" cy="10" r="7.2" stroke="#4A564E" strokeWidth="1.5" />
      <path d="M10 5.8V10l3 1.8" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
}

function Kpi({ icon, label, value, note }) {
  const [text, fg, bg] = note
  return (
    <div style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '10px', padding: '15px 16px', display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '0' }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ width: '26px', height: '26px', borderRadius: '7px', background: '#F6F7F4', border: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: 'none' }}>{ICONS[icon]}</svg>
        </span>
        <span style={{ font: `500 11.5px/1.2 ${FONT}`, color: MUTED, whiteSpace: 'nowrap' }}>{label}</span>
      </span>
      <span style={{ font: `700 23px/1.2 ${FONT}`, color: INK, letterSpacing: '-.4px', ...ell }}>{value}</span>
      <span style={{ font: `600 10.5px/1.2 ${FONT}`, color: fg, background: bg, padding: '4px 7px', borderRadius: '5px', alignSelf: 'flex-start', ...ell, maxWidth: '100%', boxSizing: 'border-box' }}>{text}</span>
    </div>
  )
}

function Pager({ page, pages, onPage }) {
  if (pages <= 1) return null
  const from = Math.max(1, Math.min(page - 2, pages - 4))
  const nums = Array.from({ length: Math.min(5, pages) }, (_, i) => from + i)
  const sq = (on, disabled) => ({ minWidth: '28px', height: '28px', padding: '0 6px', boxSizing: 'border-box', border: on ? '0' : `1px solid ${BORDER}`, borderRadius: '6px', background: on ? '#0B3D1F' : '#fff', color: on ? '#fff' : '#4A564E', font: `${on ? 600 : 500} 11.5px/1.2 ${FONT}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: disabled || on ? 'default' : 'pointer', opacity: disabled ? 0.4 : 1 })
  return (
    <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '5px' }}>
      <button aria-label="Previous page" disabled={page <= 1} onClick={() => onPage(page - 1)} style={sq(false, page <= 1)}>
        <svg width="12" height="12" viewBox="0 0 20 20" fill="none"><path d="M12.4 4.4L6.8 10l5.6 5.6" stroke={MUTED} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      {nums.map((n) => <button key={n} onClick={() => onPage(n)} style={sq(n === page)}>{n}</button>)}
      <button aria-label="Next page" disabled={page >= pages} onClick={() => onPage(page + 1)} style={sq(false, page >= pages)}>
        <svg width="12" height="12" viewBox="0 0 20 20" fill="none"><path d="M7.6 4.4L13 10l-5.4 5.6" stroke={MUTED} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
    </span>
  )
}

const pct = (n) => `${(Math.round(n * 10) / 10).toLocaleString('en-AU')}%`

function summaryCards(s) {
  if (!s) return null
  const revenue = Number(s.revenue || 0)
  const prev = Number(s.prev_revenue || 0)
  const attempts = Number(s.succeeded || 0) + Number(s.failed || 0)
  let delta
  if (prev > 0) {
    const d = ((revenue - prev) / prev) * 100
    delta = [`${d >= 0 ? '▲' : '▼'} ${pct(Math.abs(d))} vs yesterday`, ...(d >= 0 ? GREEN : RED)]
  } else delta = [revenue > 0 ? 'No sales yesterday' : 'No payments yet today', ...GREY]
  return {
    revenue, attempts,
    rate: attempts ? (s.succeeded / attempts) * 100 : null,
    cards: [
      { icon: 'revenue', label: 'Today’s revenue', value: aud(revenue), note: delta },
      { icon: 'ok', label: 'Successful', value: Number(s.succeeded || 0).toLocaleString('en-AU'), note: attempts ? [`${pct((s.succeeded / attempts) * 100)} of attempts`, ...GREEN] : ['No attempts today', ...GREY] },
      { icon: 'failed', label: 'Failed', value: Number(s.failed || 0).toLocaleString('en-AU'), note: ['Card declines', ...(s.failed ? RED : GREY)] },
      { icon: 'refund', label: 'Refunds', value: aud(s.refunded_amount), note: [`${s.refunds} refund${s.refunds === 1 ? '' : 's'} today`, ...GREY] },
      { icon: 'pending', label: 'Pending', value: Number(s.pending || 0).toLocaleString('en-AU'), note: ['Awaiting payment', ...(s.pending ? AMBER : GREY)] },
    ],
  }
}

export default function Payments({ v }) {
  const [tab, setTab] = useState('all')
  const [q, setQ] = useState('')
  const [method, setMethod] = useState('all')
  const [period, setPeriod] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [page, setPage] = useState(1)
  const [refund, setRefund] = useState(null) // { order } | { request }
  const tx = useTransactions()
  const summary = usePaymentSummary()
  const requests = useRefundRequests(5)
  const now = useNow(60000)

  const all = useMemo(() => tx.data ?? [], [tx.data])
  const counts = useMemo(() => {
    const c = {}
    for (const o of all) c[o.payment_status] = (c[o.payment_status] || 0) + 1
    return c
  }, [all])

  const rows = useMemo(() => {
    const t = q.trim().toLowerCase().replace(/^#/, '')
    let since = 0
    if (period === 'today') { const d = new Date(now); d.setHours(0, 0, 0, 0); since = d.getTime() } else if (period !== 'all') since = now - Number(period) * 864e5
    return all.filter((o) => {
      if (tab !== 'all' && o.payment_status !== tab) return false
      if (method !== 'all' && (o.charge?.method ?? o.payment_method) !== method) return false
      if (since && new Date(o.placed_at).getTime() < since) return false
      if (!t) return true
      return `${o.number} ${customerName(o.customer)} ${o.payments.map((p) => p.reference ?? '').join(' ')}`.toLowerCase().includes(t)
    })
  }, [all, tab, method, period, q, now])

  const pages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE))
  const cur = Math.min(page, pages)
  const shown = rows.slice((cur - 1) * PAGE_SIZE, cur * PAGE_SIZE)
  const filterCount = (method !== 'all' ? 1 : 0) + (period !== 'all' ? 1 : 0)
  const filtered = tab !== 'all' || filterCount || q.trim()
  const reset = (fn) => (val) => { fn(val); setPage(1) }

  let message = null
  if (tx.status === 'off') message = 'Supabase keys are missing · add them to .env to load payments.'
  else if (tx.loading) message = 'Loading transactions…'
  else if (tx.status === 'error' && !all.length) message = tx.error
  else if (!rows.length) message = all.length ? 'No transactions match these filters.' : 'No transactions yet · orders placed in the app appear here instantly.'

  const s = summaryCards(summary.data)
  const today = new Date(now)
  let subtitle = 'Payments from the app appear live'
  if (s) {
    subtitle = s.attempts
      ? `${aud(s.revenue)} collected today · ${pct(s.rate)} success rate`
      : `No payments today yet · ${summary.data.pending} order${summary.data.pending === 1 ? '' : 's'} awaiting payment`
  }

  const exportCsv = () => {
    if (!rows.length) { v.flash?.('Nothing to export · no transactions match these filters'); return }
    downloadTransactionsCsv(rows)
    v.flash?.(`Exported ${rows.length} transaction${rows.length === 1 ? '' : 's'} to CSV`)
  }

  const req = requests.data
  let reqMessage = null
  if (requests.status === 'off') reqMessage = 'Supabase keys are missing.'
  else if (requests.loading) reqMessage = 'Loading refund requests…'
  else if (requests.status === 'error' && !req) reqMessage = requests.error
  else if (!req?.rows.length) reqMessage = 'No refund requests waiting · requests customers raise in the app appear here.'

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '18px', padding: '24px 26px 2px' }}>
        <span style={{ display: 'flex', flexDirection: 'column', gap: '5px', minWidth: '0' }}>
          <span style={{ font: `700 20px/1.2 ${FONT}`, color: INK, whiteSpace: 'nowrap' }}>Payments</span>
          <span style={{ font: `400 12.5px/1.2 ${FONT}`, color: MUTED, whiteSpace: 'nowrap' }}>{subtitle}</span>
        </span>
        <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px', height: '34px', width: '240px', padding: '0 11px', border: `1px solid ${BORDER}`, borderRadius: '8px', background: '#fff' }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: 'none' }}>
              <circle cx="9" cy="9" r="6" stroke={MUTED} strokeWidth="1.6" />
              <path d="M13.4 13.4L18 18" stroke={MUTED} strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <input value={q} onChange={(e) => { setQ(e.target.value); setPage(1) }} placeholder="Search transaction or order…" style={{ border: '0', outline: 'none', background: 'transparent', font: `400 12.5px/1.2 ${FONT}`, color: INK, width: '100%' }} />
          </span>
          <button className="hv1" onClick={() => setShowFilters((x) => !x)} aria-expanded={showFilters} style={{ ...topBtn, ...(showFilters || filterCount ? { borderColor: '#C7E88A', background: '#F1F9DF', color: '#0B3D1F' } : null) }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: 'none' }}>
              <path d="M3 5.4h14M5.6 10h8.8M8.4 14.6h3.2" stroke="#4A564E" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            Filter{filterCount ? ` · ${filterCount}` : ''}
          </button>
          <button className="hv1" onClick={exportCsv} disabled={tx.loading} style={topBtn}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: 'none' }}>
              <path d="M10 3.6v9M6.4 9.2L10 12.8l3.6-3.6M3.6 16.4h12.8" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Export
          </button>
        </span>
      </div>
      <div className="ad-scroll" style={{ flex: '1', minHeight: '0', overflowY: 'auto', padding: '20px 26px 30px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {summary.status === 'error' && <span style={{ font: `400 12px/1.4 ${FONT}`, color: '#A93826' }}>{summary.error}</span>}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '14px' }}>
          {(s?.cards ?? [
            { icon: 'revenue', label: 'Today’s revenue' }, { icon: 'ok', label: 'Successful' }, { icon: 'failed', label: 'Failed' },
            { icon: 'refund', label: 'Refunds' }, { icon: 'pending', label: 'Pending' },
          ]).map((c) => <Kpi key={c.icon} icon={c.icon} label={c.label} value={c.value ?? '—'} note={c.note ?? [summary.loading ? 'Loading…' : '—', ...GREY]} />)}
        </div>

        <div className="ad-scroll" style={{ display: 'flex', gap: '2px', borderBottom: `1px solid ${BORDER}`, overflowX: 'auto', flex: 'none' }}>
          {TABS.map(([k, label]) => {
            const on = tab === k
            const n = k === 'all' ? all.length : counts[k]
            return (
              <button key={k} onClick={() => reset(setTab)(k)} style={{ border: '0', background: 'transparent', padding: '0 12px 10px', font: `600 12.5px/1.2 ${FONT}`, color: on ? '#0B3D1F' : MUTED, borderBottom: `2px solid ${on ? '#0B3D1F' : 'transparent'}`, cursor: 'pointer', whiteSpace: 'nowrap', marginBottom: '-1px' }}>
                {label}{n ? ` · ${n.toLocaleString('en-AU')}` : ''}
              </button>
            )
          })}
        </div>

        {(showFilters || filtered) && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '-6px' }}>
            {showFilters && (
              <>
                <select value={method} onChange={(e) => reset(setMethod)(e.target.value)} style={selectBox} aria-label="Payment method">
                  <option value="all">Method: All</option>
                  {Object.entries(PAYMENT_LABEL).map(([k, label]) => <option key={k} value={k}>{label}</option>)}
                </select>
                <select value={period} onChange={(e) => reset(setPeriod)(e.target.value)} style={selectBox} aria-label="Placed">
                  {PERIODS.map(([k, label]) => <option key={k} value={k}>{k === 'all' ? 'Placed: Any date' : label}</option>)}
                </select>
              </>
            )}
            {filtered && (
              <button className="hv1" onClick={() => { setTab('all'); setMethod('all'); setPeriod('all'); setQ(''); setPage(1) }} style={{ ...selectBox, font: `600 12px/1.2 ${FONT}` }}>Clear filters</button>
            )}
          </div>
        )}

        <div style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '10px', overflow: 'hidden', flex: 'none' }}>
          <div style={{ display: 'grid', gridTemplateColumns: COLS, gap: '14px', padding: '11px 16px', background: '#F6F7F4', borderBottom: `1px solid ${BORDER}` }}>
            {['Transaction', 'Order', 'Customer', 'Amount', 'Method', 'Status', 'Date'].map((h) => <span key={h} style={head}>{h}</span>)}
            <span />
          </div>
          {message ? (
            <div style={{ padding: '32px 16px', textAlign: 'center', font: `400 12.5px/1.5 ${FONT}`, color: MUTED }}>{message}</div>
          ) : shown.map((o, i) => {
            const [, label, fg, bg] = payStatus(o.payment_status)
            const ref = txReference(o)
            const failed = o.payment_status === 'failed' && o.charge?.failure_reason
            return (
              <div key={o.id} className="hv3" onClick={() => v.openOrder(o)} style={{ display: 'grid', gridTemplateColumns: COLS, gap: '14px', padding: '13px 16px', borderBottom: i < shown.length - 1 ? '1px solid #EFF1ED' : '0', alignItems: 'center', cursor: 'pointer' }}>
                <span style={cellWrap}><span style={ref === '—' ? { ...soft, fontSize: '12px' } : strong} title={ref === '—' ? 'No payment attempt yet' : undefined}>{ref}</span></span>
                <span style={cellWrap}><span style={link}>#{o.number}</span></span>
                <span style={cellWrap}><span style={soft}>{customerName(o.customer)}</span></span>
                <span style={cellWrap}><span style={strong}>{aud(o.total)}</span></span>
                <span style={cellWrap}><span style={soft}>{methodLabel(o)}</span></span>
                <span style={cellWrap}><span style={pill(fg, bg)} title={failed || undefined}>{label}</span></span>
                <span style={cellWrap}><span style={soft}>{placedLabel(txDate(o), today)}</span></span>
                <span style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {o.left > 0 && (
                    <button className="hv1" onClick={(e) => { e.stopPropagation(); setRefund({ order: o }) }} style={smallBtn}>Refund</button>
                  )}
                </span>
              </div>
            )
          })}
          {!message && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderTop: `1px solid ${BORDER}`, background: '#fff' }}>
              <span style={{ font: `400 11.5px/1.2 ${FONT}`, color: MUTED, whiteSpace: 'nowrap' }}>
                Showing {((cur - 1) * PAGE_SIZE + 1).toLocaleString('en-AU')}–{((cur - 1) * PAGE_SIZE + shown.length).toLocaleString('en-AU')} of {rows.length.toLocaleString('en-AU')} transaction{rows.length === 1 ? '' : 's'}
                {all.length >= TX_LIMIT ? ` · from the latest ${TX_LIMIT.toLocaleString('en-AU')} orders` : ''}
              </span>
              <Pager page={cur} pages={pages} onPage={setPage} />
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ font: `600 14px/1.2 ${FONT}`, color: INK, whiteSpace: 'nowrap' }}>Refund requests</span>
            {req && (
              <span><span style={pill(...(req.total ? AMBER : GREY))}>{req.total ? `${req.total} AWAITING REVIEW` : 'NONE WAITING'}</span></span>
            )}
            <button onClick={v.nav_refunds} style={{ marginLeft: 'auto', border: '0', background: 'transparent', font: `600 11.5px/1.2 ${FONT}`, color: '#17693A', cursor: 'pointer', padding: '0', whiteSpace: 'nowrap' }}>
              All refunds →
            </button>
          </div>
          <div style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '10px', overflow: 'hidden', flex: 'none' }}>
            <div style={{ display: 'grid', gridTemplateColumns: RCOLS, gap: '14px', padding: '11px 16px', background: '#F6F7F4', borderBottom: `1px solid ${BORDER}` }}>
              {['Refund', 'Order', 'Customer', 'Amount', 'Reason', 'Method', 'Status', 'Requested', 'Actions'].map((h) => <span key={h} style={head}>{h}</span>)}
            </div>
            {reqMessage ? (
              <div style={{ padding: '26px 16px', textAlign: 'center', font: `400 12.5px/1.5 ${FONT}`, color: MUTED }}>{reqMessage}</div>
            ) : req.rows.map((r, i) => (
              <div key={r.id} className="hv3" style={{ display: 'grid', gridTemplateColumns: RCOLS, gap: '14px', padding: '13px 16px', borderBottom: i < req.rows.length - 1 ? '1px solid #EFF1ED' : '0', alignItems: 'center' }}>
                <span style={cellWrap}><span style={strong}>{r.number}</span></span>
                <span style={cellWrap}>
                  {r.order ? <button onClick={() => v.openOrder(r.order)} style={{ ...link, border: '0', background: 'transparent', padding: '0', cursor: 'pointer' }}>#{r.order.number}</button> : <span style={soft}>—</span>}
                </span>
                <span style={cellWrap}><span style={soft}>{customerName(r.customer ?? r.order?.customer)}</span></span>
                <span style={cellWrap}><span style={strong}>{r.amount != null ? aud(r.amount) : r.order ? aud(r.order.total) : '—'}</span></span>
                <span style={cellWrap}><span style={soft} title={r.detail || undefined}>{REFUND_REASONS[r.reason] ?? r.reason}</span></span>
                <span style={cellWrap}><span style={soft}>{r.order ? methodLabel(r.order) : '—'}</span></span>
                <span style={cellWrap}><span style={pill(...AMBER)}>Pending</span></span>
                <span style={cellWrap}><span style={soft}>{placedLabel(r.created_at, today)}</span></span>
                <span style={cellWrap}>
                  <span style={{ marginLeft: 'auto', display: 'flex', gap: '6px' }}>
                    <button onClick={() => r.order && setRefund({ request: r })} disabled={!r.order} style={smallBtn}>Review</button>
                  </span>
                </span>
              </div>
            ))}
          </div>
          {req && req.total > req.rows.length && (
            <span style={{ font: `400 11.5px/1.2 ${FONT}`, color: MUTED }}>Showing the latest {req.rows.length} of {req.total} · see All refunds for the rest.</span>
          )}
        </div>
      </div>
      {refund && (
        <RefundModal
          order={refund.order}
          request={refund.request}
          onClose={() => setRefund(null)}
          onDone={(msg) => { v.flash?.(msg); tx.refetch(); summary.refetch(); requests.refetch() }}
        />
      )}
    </>
  )
}
