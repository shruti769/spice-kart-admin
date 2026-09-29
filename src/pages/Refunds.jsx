import { useMemo, useState } from 'react'
import RefundModal from '../modals/RefundModal'
import { customerName } from '../lib/orders'
import { REFUND_LIMIT, REFUND_REASONS, REFUND_STATUS, aud, downloadRefundsCsv, methodLabel, useNow, useRefundList } from '../lib/payments'
import { timeAgo } from '../lib/notifications'

const FONT = 'Inter,system-ui,sans-serif'
const INK = '#17201A'
const MUTED = '#7C8A81'
const BORDER = '#E4E7E2'
const PAGE_SIZE = 10
const COLS = '.8fr .8fr 1fr .7fr 1.1fr .9fr minmax(84px,.9fr) .9fr .9fr 96px'
const ell = { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }
const topBtn = { display: 'flex', alignItems: 'center', gap: '7px', height: '34px', padding: '0 12px', border: `1px solid ${BORDER}`, borderRadius: '8px', background: '#fff', color: INK, font: `600 12.5px/1.2 ${FONT}`, cursor: 'pointer', whiteSpace: 'nowrap' }
const selectBox = { height: '32px', padding: '0 10px', border: `1px solid ${BORDER}`, borderRadius: '8px', background: '#fff', font: `500 12px/1.2 ${FONT}`, color: INK, cursor: 'pointer' }
const head = { font: `600 10.5px/1.2 ${FONT}`, letterSpacing: '.5px', color: MUTED, textTransform: 'uppercase', ...ell }
const cellWrap = { minWidth: '0', display: 'flex', alignItems: 'center', gap: '8px' }
const strong = { font: `700 12.5px/1.2 ${FONT}`, color: INK, ...ell }
const soft = { font: `400 11px/1.2 ${FONT}`, color: MUTED, ...ell }
const linkBtn = { font: `500 12px/1.2 ${FONT}`, color: '#17693A', border: '0', background: 'transparent', padding: '0', cursor: 'pointer', textAlign: 'left', minWidth: '0', ...ell }
const smallBtn = { height: '26px', padding: '0 9px', border: `1px solid ${BORDER}`, borderRadius: '6px', background: '#fff', font: `600 11px/1.2 ${FONT}`, color: INK, cursor: 'pointer', whiteSpace: 'nowrap' }
const pill = (fg, bg) => ({ font: `600 10.5px/1.2 ${FONT}`, color: fg, background: bg, padding: '5px 8px', borderRadius: '5px', whiteSpace: 'nowrap', display: 'inline-block' })
const GOOD = ['#0B6B33', '#E9F6E3']
const BAD = ['#A93826', '#FAEDEA']
const GREY = ['#7C8A81', '#EEF0EC']
const AMBER = ['#8A6100', '#FBF1DE']
const BLUE = ['#1F5C8B', '#E8F1F8']
const badge = ([fg, bg]) => ({ font: `600 10.5px/1.2 ${FONT}`, color: fg, background: bg, padding: '4px 7px', borderRadius: '5px', alignSelf: 'flex-start', whiteSpace: 'nowrap' })
const pct = (n) => `${(Math.round(n * 10) / 10).toLocaleString('en-AU')}%`
const plural = (n, word) => `${n.toLocaleString('en-AU')} ${word}${n === 1 ? '' : 's'}`

// [key, label, statuses]
const TABS = [
  ['all', 'All refunds', null],
  ['pending', 'Pending', ['pending']],
  ['paid', 'Approved', ['paid']],
  ['rejected', 'Rejected', ['rejected']],
  ['approved', 'Processing', ['approved']],
]
const EMPTY_TAB = {
  pending: 'No refunds waiting for review.',
  paid: 'No approved refunds yet.',
  rejected: 'No rejected refunds.',
  approved: 'Nothing to pay out · approved refunds on unpaid orders show here until you pay them back manually.',
}

const Icons = {
  refund: (
    <>
      <path d="M4 10a6 6 0 1 1 2 4.5" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4 6.4V10h3.6" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  clock: (
    <>
      <circle cx="10" cy="10" r="7.2" stroke="#4A564E" strokeWidth="1.5" />
      <path d="M10 5.8V10l3 1.8" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  check: <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#4A564E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
  wallet: (
    <>
      <rect x="3" y="5.4" width="14" height="10.2" rx="2" stroke="#4A564E" strokeWidth="1.5" />
      <path d="M3 8.6h14M6.4 12.4h2.6" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
}

function Kpi({ icon, label, value, note, tone = GREY, title }) {
  return (
    <div title={title} style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '10px', padding: '15px 16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ width: '26px', height: '26px', borderRadius: '7px', background: '#F6F7F4', border: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: 'none' }}>{Icons[icon]}</svg>
        </span>
        <span style={{ font: `500 11.5px/1.2 ${FONT}`, color: MUTED, whiteSpace: 'nowrap' }}>{label}</span>
      </span>
      <span style={{ font: `700 23px/1.2 ${FONT}`, color: INK, letterSpacing: '-.4px', whiteSpace: 'nowrap' }}>{value}</span>
      <span style={badge(tone)}>{note}</span>
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

const ms = (iso) => (iso ? new Date(iso).getTime() : 0)
const granted = (r) => r.status === 'paid' || r.status === 'approved'

/** KPI numbers from all loaded requests at time `now` (local calendar months / day). */
function summarise(all, now) {
  const d = new Date(now)
  const today = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime()
  const month = new Date(d.getFullYear(), d.getMonth(), 1).getTime()
  const lastMonth = new Date(d.getFullYear(), d.getMonth() - 1, 1).getTime()
  const decidedIn = (a, b) => all.filter((r) => r.status !== 'pending' && ms(r.decided_at) >= a && ms(r.decided_at) < b)
  const rate = (rows) => (rows.length ? (100 * rows.filter(granted).length) / rows.length : null)
  const sum = (rows) => rows.reduce((n, r) => n + Number(r.amount || 0), 0)
  const monthDecided = decidedIn(month, Infinity)
  const monthGranted = monthDecided.filter(granted)
  const pending = all.filter((r) => r.status === 'pending')
  const processing = all.filter((r) => r.status === 'approved')
  const todayGranted = decidedIn(today, Infinity).filter(granted)
  return {
    requestedToday: all.filter((r) => ms(r.created_at) >= today).length,
    refundedToday: sum(todayGranted),
    refundedMonth: sum(monthGranted),
    grantedMonth: monthGranted.length,
    pending: pending.length,
    oldestPending: pending.reduce((min, r) => (!min || r.created_at < min ? r.created_at : min), null),
    rateMonth: rate(monthDecided),
    rateLastMonth: rate(decidedIn(lastMonth, month)),
    decidedMonth: monthDecided.length,
    processing: processing.length,
    processingSum: sum(processing),
  }
}

export default function Refunds({ v }) {
  const list = useRefundList()
  const now = useNow(60000)
  const [tab, setTab] = useState('all')
  const [q, setQ] = useState('')
  const [reason, setReason] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [page, setPage] = useState(1)
  const [review, setReview] = useState(null)

  const all = useMemo(() => list.data ?? [], [list.data])
  const counts = useMemo(() => {
    const c = { all: all.length }
    for (const r of all) c[r.status] = (c[r.status] || 0) + 1
    return c
  }, [all])
  const k = useMemo(() => summarise(all, now), [all, now])

  const rows = useMemo(() => {
    const statuses = TABS.find(([key]) => key === tab)?.[2]
    const t = q.trim().toLowerCase().replace(/^#/, '')
    return all.filter((r) => {
      if (statuses && !statuses.includes(r.status)) return false
      if (reason !== 'all' && r.reason !== reason) return false
      if (!t) return true
      return `${r.number} ${r.order?.number ?? ''} ${customerName(r.customer ?? r.order?.customer)}`.toLowerCase().includes(t)
    })
  }, [all, tab, reason, q])

  const pages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE))
  const cur = Math.min(page, pages)
  const shown = rows.slice((cur - 1) * PAGE_SIZE, cur * PAGE_SIZE)
  const filtered = reason !== 'all' || q.trim()

  let message = null
  if (list.status === 'off') message = 'Supabase keys are missing · add them to .env to load refunds.'
  else if (list.loading) message = 'Loading refunds…'
  else if (list.status === 'error' && !all.length) message = list.error
  else if (!all.length) message = 'No refund requests yet · when a customer asks for a refund in the app, it appears here for review.'
  else if (!rows.length) message = filtered ? 'No refunds match this search or filter.' : EMPTY_TAB[tab] ?? 'No refunds.'

  let subtitle = 'Refund requests from the app appear live'
  if (list.status === 'ready') {
    subtitle = k.requestedToday || k.refundedToday
      ? `${plural(k.requestedToday, 'request')} today · ${aud(k.refundedToday)} approved today`
      : `No refund requests today · ${k.pending} waiting for review`
  }

  const exportCsv = () => {
    if (!rows.length) { v.flash?.('Nothing to export · no refunds match these filters'); return }
    downloadRefundsCsv(rows)
    v.flash?.(`Exported ${plural(rows.length, 'refund')} to CSV`)
  }

  const rateDelta = k.rateMonth != null && k.rateLastMonth != null ? k.rateMonth - k.rateLastMonth : null
  const ready = list.status === 'ready' || all.length > 0
  const val = (x) => (ready ? x : '—')

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '18px', padding: '24px 26px 2px' }}>
        <span style={{ display: 'flex', flexDirection: 'column', gap: '5px', minWidth: '0' }}>
          <span style={{ font: `700 20px/1.2 ${FONT}`, color: INK, whiteSpace: 'nowrap' }}>Refunds</span>
          <span style={{ font: `400 12.5px/1.2 ${FONT}`, color: MUTED, whiteSpace: 'nowrap' }}>{subtitle}</span>
        </span>
        <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px', height: '34px', width: '230px', padding: '0 11px', border: `1px solid ${BORDER}`, borderRadius: '8px', background: '#fff' }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: 'none' }}>
              <circle cx="9" cy="9" r="6" stroke={MUTED} strokeWidth="1.6" />
              <path d="M13.4 13.4L18 18" stroke={MUTED} strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <input value={q} onChange={(e) => { setQ(e.target.value); setPage(1) }} placeholder="Search refund, order or customer…" style={{ border: '0', outline: 'none', background: 'transparent', font: `400 12.5px/1.2 ${FONT}`, color: INK, width: '100%', minWidth: '0' }} />
          </span>
          <button className="hv1" onClick={() => setShowFilters((x) => !x)} aria-expanded={showFilters} style={{ ...topBtn, ...(showFilters || reason !== 'all' ? { borderColor: '#C7E88A', background: '#F1F9DF', color: '#0B3D1F' } : null) }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: 'none' }}>
              <path d="M3 5.4h14M5.6 10h8.8M8.4 14.6h3.2" stroke="#4A564E" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            Filter{reason !== 'all' ? ' · 1' : ''}
          </button>
          <button className="hv1" onClick={exportCsv} disabled={list.loading} style={topBtn}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: 'none' }}>
              <path d="M10 3.6v9M6.4 9.2L10 12.8l3.6-3.6M3.6 16.4h12.8" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Export
          </button>
        </span>
      </div>
      <div className="ad-scroll" style={{ flex: '1', minHeight: '0', overflowY: 'auto', padding: '20px 26px 30px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {list.status === 'error' && all.length > 0 && <span style={{ font: `400 12px/1.4 ${FONT}`, color: '#A93826' }}>{list.error}</span>}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px' }}>
          <Kpi
            icon="refund"
            label="Refunded this month"
            value={val(aud(k.refundedMonth))}
            note={ready ? plural(k.grantedMonth, 'refund') + ' approved' : list.loading ? 'Loading…' : '—'}
            title="Approved refunds decided this month (recorded + processing)"
          />
          <Kpi
            icon="clock"
            label="Awaiting review"
            value={val(k.pending.toLocaleString('en-AU'))}
            note={!ready ? '—' : k.oldestPending ? `Oldest ${timeAgo(k.oldestPending, now).replace(' ago', '')}` : 'All caught up'}
            tone={k.oldestPending ? AMBER : ready ? GOOD : GREY}
          />
          <Kpi
            icon="check"
            label="Approval rate"
            value={val(k.rateMonth != null ? pct(k.rateMonth) : '—')}
            note={!ready ? '—' : k.rateMonth == null ? 'No decisions this month' : rateDelta == null ? `${plural(k.decidedMonth, 'decision')} this month` : rateDelta === 0 ? 'Same as last month' : `${rateDelta > 0 ? '▲' : '▼'} ${pct(Math.abs(rateDelta))} vs last month`}
            tone={rateDelta > 0 ? GOOD : rateDelta < 0 ? BAD : GREY}
            title="Approved ÷ decided, for requests decided this month"
          />
          <Kpi
            icon="wallet"
            label="Processing"
            value={val(k.processing.toLocaleString('en-AU'))}
            note={!ready ? '—' : k.processing ? `${aud(k.processingSum)} to pay back manually` : 'Nothing to pay out'}
            tone={k.processing ? BLUE : GREY}
            title="Approved on orders with nothing paid in Spice Kart (no payment provider yet) · pay these back yourself"
          />
        </div>
        <div className="ad-scroll" style={{ display: 'flex', gap: '2px', borderBottom: `1px solid ${BORDER}`, overflowX: 'auto', flex: 'none' }}>
          {TABS.map(([key, label]) => {
            const on = tab === key
            const n = counts[key] || 0
            return (
              <button key={key} onClick={() => { setTab(key); setPage(1) }} style={{ border: '0', background: 'transparent', padding: '0 12px 10px', font: `600 12.5px/1.2 ${FONT}`, color: on ? '#0B3D1F' : MUTED, borderBottom: `2px solid ${on ? '#0B3D1F' : 'transparent'}`, cursor: 'pointer', whiteSpace: 'nowrap', marginBottom: '-1px' }}>
                {label}{n ? ` · ${n.toLocaleString('en-AU')}` : ''}
              </button>
            )
          })}
        </div>

        {(showFilters || filtered) && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '-6px' }}>
            {showFilters && (
              <select value={reason} onChange={(e) => { setReason(e.target.value); setPage(1) }} style={selectBox} aria-label="Reason">
                <option value="all">Reason: All</option>
                {Object.entries(REFUND_REASONS).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
              </select>
            )}
            {filtered && (
              <button className="hv1" onClick={() => { setReason('all'); setQ(''); setPage(1) }} style={{ ...selectBox, font: `600 12px/1.2 ${FONT}` }}>Clear filters</button>
            )}
          </div>
        )}

        <div style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '10px', overflow: 'hidden', flex: 'none' }}>
          <div style={{ display: 'grid', gridTemplateColumns: COLS, gap: '14px', padding: '11px 16px', background: '#F6F7F4', borderBottom: `1px solid ${BORDER}` }}>
            {['Refund', 'Order', 'Customer', 'Amount', 'Reason', 'Method', 'Status', 'Requested', 'Processed', 'Actions'].map((h) => <span key={h} style={head}>{h}</span>)}
          </div>
          {message ? (
            <div style={{ padding: '32px 16px', textAlign: 'center', font: `400 12.5px/1.5 ${FONT}`, color: MUTED }}>{message}</div>
          ) : shown.map((r, i) => {
            const [, label, fg, bg] = REFUND_STATUS[r.status] ?? REFUND_STATUS.pending
            const custId = r.customer_id ?? r.order?.customer_id
            return (
              <div key={r.id} className="hv3" style={{ display: 'grid', gridTemplateColumns: COLS, gap: '14px', padding: '13px 16px', borderBottom: i < shown.length - 1 ? '1px solid #EFF1ED' : '0', alignItems: 'center' }}>
                <span style={cellWrap}><span style={strong}>{r.number}</span></span>
                <span style={cellWrap}>
                  {r.order ? <button onClick={() => v.openOrder(r.order)} style={linkBtn}>#{r.order.number}</button> : <span style={soft}>—</span>}
                </span>
                <span style={cellWrap}>
                  <button onClick={() => custId && v.openCustomer(custId)} disabled={!custId} style={{ ...linkBtn, font: `400 11px/1.2 ${FONT}`, color: MUTED }}>
                    {customerName(r.customer ?? r.order?.customer)}
                  </button>
                </span>
                <span style={cellWrap}>
                  {r.amount != null
                    ? <span style={strong}>{aud(r.amount)}</span>
                    : <span style={{ ...soft, fontSize: '12px' }} title="Order total · the refund amount is set when the request is approved">{r.order ? aud(r.order.total) : '—'}</span>}
                </span>
                <span style={cellWrap}><span style={soft} title={r.detail || undefined}>{REFUND_REASONS[r.reason] ?? r.reason}</span></span>
                <span style={cellWrap}><span style={soft}>{r.order ? methodLabel(r.order) : '—'}</span></span>
                <span style={cellWrap}><span style={pill(fg, bg)}>{label}</span></span>
                <span style={cellWrap}><span style={soft} title={new Date(r.created_at).toLocaleString('en-AU')}>{timeAgo(r.created_at, now)}</span></span>
                <span style={cellWrap}>
                  <span style={soft} title={r.decided_at ? new Date(r.decided_at).toLocaleString('en-AU') : undefined}>{r.decided_at ? timeAgo(r.decided_at, now) : '—'}</span>
                </span>
                <span style={cellWrap}>
                  <span style={{ marginLeft: 'auto' }}>
                    {r.status === 'pending' ? (
                      <button onClick={() => r.order && setReview(r)} disabled={!r.order} style={smallBtn}>Review</button>
                    ) : (
                      <button onClick={() => r.order && v.openOrder(r.order)} disabled={!r.order} style={smallBtn}>View order</button>
                    )}
                  </span>
                </span>
              </div>
            )
          })}
          {!message && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderTop: `1px solid ${BORDER}`, background: '#fff' }}>
              <span style={{ font: `400 11.5px/1.2 ${FONT}`, color: MUTED, whiteSpace: 'nowrap' }}>
                Showing {((cur - 1) * PAGE_SIZE + 1).toLocaleString('en-AU')}–{((cur - 1) * PAGE_SIZE + shown.length).toLocaleString('en-AU')} of {plural(rows.length, 'refund')}
                {all.length >= REFUND_LIMIT ? ` · from the latest ${REFUND_LIMIT.toLocaleString('en-AU')} requests` : ''}
              </span>
              <Pager page={cur} pages={pages} onPage={setPage} />
            </div>
          )}
        </div>
      </div>
      {review && (
        <RefundModal
          request={review}
          onClose={() => setReview(null)}
          onDone={(msg) => { v.flash?.(msg); list.refetch() }}
        />
      )}
    </>
  )
}
