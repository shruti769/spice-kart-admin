import { useEffect, useMemo, useState } from 'react'
import { downloadCsv, fileDate, num, relativeDay, useNow } from '../lib/customers'
import { REVIEW_PILL, REVIEW_TABS, fetchReviewsForExport, productLabel, publishReview, useReviewSummary, useReviews } from '../lib/reviews'
import { customerName, initials } from '../lib/orders'
import ReplyReviewModal from '../modals/ReplyReviewModal'
import HideReviewModal from '../modals/HideReviewModal'

const FONT = 'Inter,system-ui,sans-serif'
const INK = '#17201A'
const MUTED = '#7C8A81'
const BORDER = '#E4E7E2'
const PAGE = 20
const COLS = '1.1fr 1.4fr .6fr 2.2fr .8fr minmax(110px,1.1fr) 190px'
const STAR = 'M10 3.2l2.1 4.3 4.7.7-3.4 3.3.8 4.7L10 14l-4.2 2.2.8-4.7L3.2 8.2l4.7-.7L10 3.2z'

const ellipsis = { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }
const head = { font: `600 10.5px/1.2 ${FONT}`, letterSpacing: '.5px', color: MUTED, textTransform: 'uppercase', ...ellipsis }
const cellWrap = { minWidth: '0', display: 'flex', alignItems: 'center', gap: '8px' }
const small = { font: `400 11px/1.2 ${FONT}`, color: MUTED, ...ellipsis }
const topBtn = { display: 'flex', alignItems: 'center', gap: '7px', height: '34px', padding: '0 12px', border: `1px solid ${BORDER}`, borderRadius: '8px', background: '#fff', color: INK, font: `600 12.5px/1.2 ${FONT}`, cursor: 'pointer', whiteSpace: 'nowrap' }
const rowBtn = { height: '26px', padding: '0 9px', border: `1px solid ${BORDER}`, borderRadius: '6px', background: '#fff', font: `600 11px/1.2 ${FONT}`, color: INK, cursor: 'pointer', whiteSpace: 'nowrap' }
const selectBox = { height: '32px', padding: '0 10px', border: `1px solid ${BORDER}`, borderRadius: '8px', background: '#fff', font: `500 12px/1.2 ${FONT}`, color: INK, cursor: 'pointer' }
const pillStyle = (fg, bg) => ({ font: `600 10.5px/1.2 ${FONT}`, color: fg, background: bg, padding: '5px 8px', borderRadius: '5px', whiteSpace: 'nowrap', display: 'inline-block' })
const BAR = { 5: '#8BE000', 4: '#8BE000', 3: '#E8C868', 2: '#D9A296', 1: '#D9A296' }

const Star = ({ size = 13, on = true }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" style={{ flex: 'none' }}>
    <path d={STAR} stroke={on ? '#C89A28' : '#D8DDD4'} strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
)

/** [1, '…', 4, 5, 6, '…', 12] */
function pageList(page, pages) {
  if (pages <= 7) return Array.from({ length: pages }, (_, i) => i + 1)
  const out = []
  for (const p of [...new Set([1, page - 1, page, page + 1, pages].filter((x) => x >= 1 && x <= pages))].sort((a, b) => a - b)) {
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

export default function Reviews({ v }) {
  const now = useNow()
  const [tab, setTab] = useState('all')
  const [input, setInput] = useState('')
  const [q, setQ] = useState('')
  const [rating, setRating] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [page, setPage] = useState(1)
  const [modal, setModal] = useState(null) // { kind: 'reply' | 'hide', row }
  const [publishing, setPublishing] = useState(null)
  const [exporting, setExporting] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => {
      setQ(input)
      setPage(1)
    }, 300)
    return () => clearTimeout(t)
  }, [input])

  const filters = useMemo(() => ({ tab, q, rating }), [tab, q, rating])
  const list = useReviews(filters, page, PAGE)
  const summary = useReviewSummary()
  const s = summary.data
  const rows = list.data?.rows ?? []
  const count = list.data?.count ?? 0
  const pages = Math.max(1, Math.ceil(count / PAGE))
  const filtered = tab !== 'all' || q.trim() || rating !== 'all'
  const refresh = () => { list.refetch(); summary.refetch() }
  const modalRow = modal ? rows.find((r) => r.id === modal.row.id) ?? modal.row : null

  const total = s?.count ?? 0
  const avg = s?.average == null ? null : Number(s.average)
  const tabCount = { all: s?.count, pending: s?.pending, published: s?.published, hidden: s?.hidden, replied: s?.replied }

  let subtitle = 'Customer reviews from the app appear here live'
  if (s) subtitle = total ? `${avg == null ? 'No published rating yet' : `${avg.toFixed(1)} average`} across ${num(total)} review${total === 1 ? '' : 's'}` : 'No reviews yet'
  else if (summary.status === 'error') subtitle = summary.error

  let message = null
  if (list.status === 'off') message = 'Supabase keys are missing · add them to .env to load reviews.'
  else if (list.loading) message = 'Loading reviews…'
  else if (list.status === 'error' && !rows.length) message = list.error
  else if (!rows.length) {
    if (page > 1 && count > 0) message = 'Nothing on this page · go back a page.'
    else if (filtered) message = 'No reviews match these filters.'
    else message = 'No reviews yet — they appear here when customers rate products in the app.'
  }

  const publish = async (r) => {
    if (publishing) return
    setPublishing(r.id)
    try {
      await publishReview(r.id)
      v.flash('Review published in the app')
      refresh()
    } catch (e) {
      v.flash(e.message)
    } finally {
      setPublishing(null)
    }
  }

  const exportCsv = async () => {
    if (exporting) return
    setExporting(true)
    try {
      const res = await fetchReviewsForExport(filters)
      if (!res.rows.length) {
        v.flash('Nothing to export · no reviews match these filters')
        return
      }
      downloadCsv(`reviews-${fileDate()}.csv`,
        ['Date', 'Customer', 'Customer email', 'Product', 'Rating', 'Review', 'Status', 'Reply', 'Replied', 'Hidden reason'],
        res.rows.map((r) => [
          new Date(r.created_at).toLocaleDateString('en-AU'), customerName(r.customer), r.customer?.email, productLabel(r), r.rating, r.comment,
          REVIEW_PILL[r.status]?.[0] ?? r.status, r.reply, r.replied_at ? new Date(r.replied_at).toLocaleDateString('en-AU') : '', r.hidden_reason,
        ]))
      v.flash(res.count > res.rows.length ? `Exported the first ${num(res.rows.length)} of ${num(res.count)} reviews` : `Exported ${num(res.rows.length)} review${res.rows.length === 1 ? '' : 's'}`)
    } catch (e) {
      v.flash(e.message)
    } finally {
      setExporting(false)
    }
  }

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '18px', padding: '24px 26px 2px' }}>
        <span style={{ display: 'flex', flexDirection: 'column', gap: '5px', minWidth: '0' }}>
          <span style={{ font: `700 20px/1.2 ${FONT}`, color: INK, whiteSpace: 'nowrap' }}>Reviews & ratings</span>
          <span style={{ font: `400 12.5px/1.2 ${FONT}`, color: MUTED, whiteSpace: 'nowrap' }}>{subtitle}</span>
        </span>
        <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px', height: '34px', width: '230px', padding: '0 11px', border: `1px solid ${BORDER}`, borderRadius: '8px', background: '#fff' }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: 'none' }}>
              <circle cx="9" cy="9" r="6" stroke={MUTED} strokeWidth="1.6" />
              <path d="M13.4 13.4L18 18" stroke={MUTED} strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Search reviews, products…" aria-label="Search reviews" style={{ border: '0', outline: 'none', background: 'transparent', font: `400 12.5px/1.2 ${FONT}`, color: INK, width: '100%', minWidth: '0' }} />
          </span>
          <button className="hv1" onClick={() => setShowFilters((x) => !x)} style={{ ...topBtn, ...(showFilters || rating !== 'all' ? { borderColor: '#0B3D1F' } : null) }}>
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
      <div className="ad-scroll" style={{ flex: '1', minHeight: '0', overflowY: 'auto', padding: '20px 26px 30px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2.4fr', gap: '18px', alignItems: 'start' }}>
          <div style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '10px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <span style={{ font: `600 13.5px/1.2 ${FONT}`, color: INK }}>Rating overview</span>
            <span style={{ display: 'flex', alignItems: 'flex-end', gap: '9px' }}>
              <span style={{ font: '700 34px/1 Inter,system-ui', color: INK, letterSpacing: '-1px' }}>{avg == null ? '—' : avg.toFixed(1)}</span>
              <span style={{ display: 'flex', flexDirection: 'column', gap: '4px', paddingBottom: '3px' }}>
                <span style={{ display: 'flex', gap: '2px' }}>
                  {[1, 2, 3, 4, 5].map((n) => <Star key={n} on={avg != null && n <= Math.round(avg)} />)}
                </span>
                <span style={small}>
                  {s ? `${num(total)} review${total === 1 ? '' : 's'}${avg != null && s.published !== total ? ` · avg of ${num(s.published)} published` : ''}` : summary.loading ? 'Loading…' : '—'}
                </span>
              </span>
            </span>
            {[5, 4, 3, 2, 1].map((n) => {
              const c = Number(s?.by_rating?.[n] ?? 0)
              const pct = total ? Math.round((c / total) * 100) : 0
              return (
                <span key={n} style={{ display: 'flex', alignItems: 'center', gap: '9px' }} title={`${num(c)} review${c === 1 ? '' : 's'}`}>
                  <span style={{ font: `500 11px/1.2 ${FONT}`, color: MUTED, width: '10px', flex: 'none' }}>{n}</span>
                  <Star size={11} />
                  <span style={{ flex: '1', height: '7px', borderRadius: '4px', background: '#EFF1ED', overflow: 'hidden', display: 'block' }}>
                    <span style={{ display: 'block', width: `${pct}%`, height: '100%', background: BAR[n], borderRadius: '4px' }} />
                  </span>
                  <span style={{ font: `600 11px/1.2 ${FONT}`, color: '#4A564E', width: '30px', textAlign: 'right', flex: 'none' }}>{pct}%</span>
                </span>
              )
            })}
            <span style={{ height: '1px', background: '#EFF1ED', display: 'block' }} />
            <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', whiteSpace: 'nowrap' }}>
              <span style={small}>Pending moderation</span>
              <button type="button" onClick={() => { setTab('pending'); setPage(1) }} style={{ ...pillStyle('#8A6100', '#FBF1DE'), border: '0', cursor: 'pointer' }}>{s ? num(s.pending) : '—'}</button>
            </span>
            <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', whiteSpace: 'nowrap' }}>
              <span style={small}>Hidden</span>
              <button type="button" onClick={() => { setTab('hidden'); setPage(1) }} style={{ ...pillStyle('#A93826', '#FAEDEA'), border: '0', cursor: 'pointer' }}>{s ? num(s.hidden) : '—'}</button>
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', minWidth: '0' }}>
            <div className="ad-scroll" style={{ display: 'flex', gap: '2px', borderBottom: `1px solid ${BORDER}`, overflowX: 'auto', flex: 'none' }}>
              {REVIEW_TABS.map(([key, label]) => {
                const on = tab === key
                const n = tabCount[key]
                return (
                  <button key={key} onClick={() => { setTab(key); setPage(1) }} style={{ border: '0', background: 'transparent', padding: '0 12px 10px', font: `600 12.5px/1.2 ${FONT}`, color: on ? '#0B3D1F' : MUTED, borderBottom: `2px solid ${on ? '#0B3D1F' : 'transparent'}`, cursor: 'pointer', whiteSpace: 'nowrap', marginBottom: '-1px' }}>
                    {label}{n ? ` · ${num(n)}` : ''}
                  </button>
                )
              })}
            </div>
            {showFilters && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <select value={rating} onChange={(e) => { setRating(e.target.value); setPage(1) }} style={selectBox} aria-label="Rating">
                  <option value="all">Rating: All</option>
                  {[5, 4, 3, 2, 1].map((n) => <option key={n} value={String(n)}>{n} star{n === 1 ? '' : 's'}</option>)}
                </select>
                {filtered && (
                  <button className="hv1" onClick={() => { setTab('all'); setInput(''); setQ(''); setRating('all'); setPage(1) }} style={{ ...selectBox, font: `600 12px/1.2 ${FONT}` }}>Clear filters</button>
                )}
              </div>
            )}
            <div style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '10px', overflow: 'hidden', flex: 'none' }}>
              <div style={{ display: 'grid', gridTemplateColumns: COLS, gap: '14px', padding: '11px 16px', background: '#F6F7F4', borderBottom: `1px solid ${BORDER}` }}>
                {['Customer', 'Product', 'Rating', 'Review', 'Date', 'Status'].map((h) => <span key={h} style={head}>{h}</span>)}
                <span style={{ ...head, textAlign: 'right' }}>Actions</span>
              </div>
              {message ? (
                <div style={{ padding: '32px 16px', textAlign: 'center', font: `400 12.5px/1.5 ${FONT}`, color: MUTED }}>{message}</div>
              ) : rows.map((r, i) => {
                const [pl, pfg, pbg] = REVIEW_PILL[r.status] ?? REVIEW_PILL.pending
                return (
                  <div key={r.id} className="hv3" style={{ display: 'grid', gridTemplateColumns: COLS, gap: '14px', padding: '13px 16px', borderBottom: i < rows.length - 1 ? '1px solid #EFF1ED' : '0', alignItems: 'center' }}>
                    <span style={cellWrap}>
                      <span style={{ width: '28px', height: '28px', borderRadius: '7px', background: '#F6F7F4', border: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', font: `600 10.5px/1.2 ${FONT}`, color: '#4A564E', flex: 'none' }}>{initials(r.customer)}</span>
                      <span style={{ font: `600 12.5px/1.2 ${FONT}`, color: INK, ...ellipsis }}>{customerName(r.customer)}</span>
                    </span>
                    <span style={cellWrap}>
                      <span style={{ width: '30px', height: '30px', borderRadius: '7px', overflow: 'hidden', background: '#F6F7F4', border: `1px solid ${BORDER}`, flex: 'none', display: 'block', position: 'relative' }}>
                        {r.product?.image_url && <img src={r.product.image_url} alt="" loading="lazy" style={{ position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover' }} />}
                      </span>
                      <span style={{ font: `500 12.5px/1.2 ${FONT}`, color: INK, ...ellipsis }} title={productLabel(r)}>{productLabel(r)}</span>
                    </span>
                    <span style={cellWrap}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Star />
                        <span style={{ font: `700 12.5px/1.2 ${FONT}`, color: INK }}>{r.rating}</span>
                      </span>
                    </span>
                    <span style={{ ...cellWrap, flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
                      <span style={{ font: `400 11.5px/1.5 ${FONT}`, color: r.comment ? '#4A564E' : MUTED, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', wordBreak: 'break-word' }} title={r.comment}>
                        {r.comment || 'Rating only · no comment'}
                      </span>
                      {r.reply && <span style={{ font: `500 10.5px/1.3 ${FONT}`, color: '#0B6B33', maxWidth: '100%', ...ellipsis }} title={r.reply}>↳ Replied {relativeDay(r.replied_at, now, '').toLowerCase()}</span>}
                    </span>
                    <span style={cellWrap}><span style={small}>{relativeDay(r.created_at, now)}</span></span>
                    <span style={cellWrap}><span style={pillStyle(pfg, pbg)} title={r.status === 'hidden' ? r.hidden_reason ?? undefined : undefined}>{pl}</span></span>
                    <span style={cellWrap}>
                      <span style={{ marginLeft: 'auto', display: 'flex', gap: '6px' }}>
                        {r.status === 'pending' && (
                          <button onClick={() => publish(r)} disabled={publishing === r.id} style={{ ...rowBtn, opacity: publishing === r.id ? 0.5 : 1 }}>
                            {publishing === r.id ? 'Publishing…' : 'Publish'}
                          </button>
                        )}
                        <button onClick={() => setModal({ kind: 'reply', row: r })} style={rowBtn}>{r.reply ? 'Edit reply' : 'Reply'}</button>
                        <button onClick={() => setModal({ kind: 'hide', row: r })} style={rowBtn}>{r.status === 'hidden' ? 'Unhide' : 'Hide'}</button>
                      </span>
                    </span>
                  </div>
                )
              })}
              {count > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderTop: `1px solid ${BORDER}`, background: '#fff' }}>
                  <span style={{ font: `400 11.5px/1.2 ${FONT}`, color: MUTED, whiteSpace: 'nowrap' }}>
                    {rows.length
                      ? `Showing ${num((page - 1) * PAGE + 1)}–${num((page - 1) * PAGE + rows.length)} of ${num(count)} review${count === 1 ? '' : 's'}`
                      : `${num(count)} review${count === 1 ? '' : 's'}`}
                  </span>
                  <Pager page={Math.min(page, pages)} pages={pages} onPage={setPage} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {modal?.kind === 'reply' && <ReplyReviewModal review={modalRow} now={now} onClose={() => setModal(null)} onDone={refresh} flash={v.flash} />}
      {modal?.kind === 'hide' && <HideReviewModal review={modalRow} onClose={() => setModal(null)} onDone={refresh} flash={v.flash} />}
    </>
  )
}
