import { useMemo, useState } from 'react'
import AssignDriverModal from '../modals/AssignDriverModal'
import CallDriverModal from '../modals/CallDriverModal'
import { Modal } from '../components/content/ui'
import { btnPrimary, btnSecondary } from '../components/content/styles'
import { computeDriver, driverInitials, minutesLeft, phoneLabel, setDriverStatus, telHref, useDriverDetail } from '../lib/drivers'
import { STATUS_PILL, customerName, money, statusLabel } from '../lib/orders'
import { useNow } from '../lib/payments'
import { timeAgo } from '../lib/notifications'

const FONT = 'Inter,system-ui,sans-serif'
const INK = '#17201A'
const MUTED = '#7C8A81'
const BORDER = '#E4E7E2'
const ell = { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }
const topBtn = { display: 'flex', alignItems: 'center', gap: '7px', height: '34px', padding: '0 12px', border: `1px solid ${BORDER}`, borderRadius: '8px', background: '#fff', color: INK, font: `600 12.5px/1.2 ${FONT}`, cursor: 'pointer', whiteSpace: 'nowrap', textDecoration: 'none' }
const card = { background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '10px', padding: '15px 16px', display: 'flex', flexDirection: 'column', gap: '10px' }
const iconBox = { width: '26px', height: '26px', borderRadius: '7px', background: '#F6F7F4', border: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }
const GOOD = ['#0B6B33', '#E9F6E3']
const BAD = ['#A93826', '#FAEDEA']
const GREY = ['#7C8A81', '#EEF0EC']
const AMBER = ['#8A6100', '#FBF1DE']
const badge = ([fg, bg]) => ({ font: `600 10.5px/1.2 ${FONT}`, color: fg, background: bg, padding: '4px 7px', borderRadius: '5px', alignSelf: 'flex-start', whiteSpace: 'nowrap' })
const pill = (fg, bg) => ({ font: `600 10.5px/1.2 ${FONT}`, color: fg, background: bg, padding: '5px 8px', borderRadius: '5px', whiteSpace: 'nowrap', display: 'inline-block' })
const head = { font: `600 10.5px/1.2 ${FONT}`, letterSpacing: '.5px', color: MUTED, textTransform: 'uppercase', ...ell }
const cellWrap = { minWidth: '0', display: 'flex', alignItems: 'center', gap: '8px' }
const COLS = '.9fr 1.1fr 1.8fr minmax(118px,1.2fr) .6fr .7fr'
const RECENT = 10
const plural = (n, word, many = `${word}s`) => `${n.toLocaleString('en-AU')} ${n === 1 ? word : many}`
const pct = (n) => `${(Math.round(n * 10) / 10).toLocaleString('en-AU')}%`

/** "8 min", "1 hr 20 min", "2 days" */
function span(m) {
  if (m < 60) return `${m} min`
  if (m < 1440) { const h = Math.floor(m / 60); const r = m % 60; return r ? `${h} hr ${r} min` : `${h} hr` }
  const d = Math.round(m / 1440)
  return `${d} day${d === 1 ? '' : 's'}`
}

const Icons = {
  truck: (
    <>
      <rect x="2.2" y="5.8" width="8.6" height="8" rx="1.4" stroke="#4A564E" strokeWidth="1.5" />
      <path d="M10.8 8.6h3.3a1.4 1.4 0 011.03.45l1.5 1.63a1.4 1.4 0 01.37.95v2.17h-6.2V8.6z" stroke="#4A564E" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="6" cy="15.6" r="1.5" stroke="#4A564E" strokeWidth="1.5" />
      <circle cx="14" cy="15.6" r="1.5" stroke="#4A564E" strokeWidth="1.5" />
    </>
  ),
  check: <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#4A564E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
  bolt: <path d="M11 2.8L4.6 11h4.6l-.8 6.2L15.4 9h-4.6l.2-6.2z" stroke="#4A564E" strokeWidth="1.5" strokeLinejoin="round" />,
  clock: (
    <>
      <circle cx="10" cy="10" r="7.2" stroke="#4A564E" strokeWidth="1.5" />
      <path d="M10 5.8V10l3 1.8" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  list: (
    <>
      <rect x="4.4" y="4.2" width="11.2" height="12.4" rx="2" stroke="#4A564E" strokeWidth="1.5" />
      <path d="M7.8 4.2v-.8a1 1 0 011-1h2.4a1 1 0 011 1v.8" stroke="#4A564E" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M7.4 8.8h5.2M7.4 11.4h5.2M7.4 14h3" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
}

function Kpi({ icon, label, value, note, tone = GREY, title }) {
  return (
    <div style={card} title={title}>
      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={iconBox}>
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: 'none' }}>{Icons[icon]}</svg>
        </span>
        <span style={{ font: `500 11.5px/1.2 ${FONT}`, color: MUTED, whiteSpace: 'nowrap' }}>{label}</span>
      </span>
      <span style={{ font: `700 23px/1.2 ${FONT}`, color: INK, letterSpacing: '-.4px', whiteSpace: 'nowrap' }}>{value}</span>
      <span style={badge(tone)}>{note}</span>
    </div>
  )
}

function InfoRow({ label, children }) {
  return (
    <span style={{ display: 'flex', justifyContent: 'space-between', gap: '14px', whiteSpace: 'nowrap', padding: '7px 0', borderTop: '1px solid #EFF1ED' }}>
      <span style={{ font: `400 11px/1.2 ${FONT}`, color: MUTED, ...ell }}>{label}</span>
      <span style={{ font: `600 12.5px/1.2 ${FONT}`, color: INK, ...ell }}>{children}</span>
    </span>
  )
}

function Message({ v, children }) {
  return (
    <div style={{ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', padding: '40px', font: `400 13px/1.5 ${FONT}`, color: MUTED, textAlign: 'center' }}>
      {children}
      <button className="hv1" onClick={v.nav_del} style={topBtn}>Back to delivery</button>
    </div>
  )
}

export default function DriverDetail({ v }) {
  const detail = useDriverDetail(v.driverId)
  const now = useNow(30000)
  const [modal, setModal] = useState(null) // 'call' | 'assign' | 'status'
  const [busy, setBusy] = useState(false)
  const data = detail.data
  const s = useMemo(() => (data?.driver ? computeDriver(data, now) : null), [data, now])

  if (!v.driverId) return <Message v={v}>Pick a driver from Delivery to see their details.</Message>
  if (detail.status === 'off') return <Message v={v}>Supabase keys are missing · add them to .env to load drivers.</Message>
  if (detail.status === 'loading') return <Message v={v}>Loading driver…</Message>
  if (detail.status === 'missing') return <Message v={v}>This driver no longer exists.</Message>
  if (detail.status === 'error' || !s) return <Message v={v}>{detail.error || 'Couldn’t load this driver.'}</Message>

  const d = data.driver
  const inactive = d.status !== 'active'
  const kind = inactive ? 'inactive' : s.mine.length ? 'delivering' : 'available'
  const [kindLabel, kfg, kbg] = { inactive: ['Inactive', '#5F6B62', '#EEF0EC'], delivering: ['Delivering', '#1F5C8B', '#E8F1F8'], available: ['Available', '#0B6B33', '#E9F6E3'] }[kind]
  const joined = new Date(d.created_at).toLocaleDateString('en-AU', { month: 'long', year: 'numeric' })

  // KPI notes
  const weekDelta = s.week - s.lastWeek
  const onTimeDelta = s.onTimeMonth != null && s.onTimeLastMonth != null ? s.onTimeMonth - s.onTimeLastMonth : null

  // Table: current orders first (soonest due), then the latest deliveries.
  const rows = [...s.mine, ...data.delivered.slice(0, RECENT)]
  const maxDay = Math.max(0, ...s.days.map((x) => x.count))
  const dayFmt = (t) => new Date(t).toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'short' })

  const toggleStatus = async () => {
    setBusy(true)
    try {
      const next = inactive ? 'active' : 'inactive'
      await setDriverStatus(d.id, next)
      v.flash(`${d.name} ${next === 'active' ? 'reactivated' : 'suspended'}`)
      setModal(null)
      detail.refetch()
    } catch (e) {
      v.flash(e.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <div className="sk-topbar" style={{ display: 'flex', alignItems: 'flex-end', gap: '18px', padding: '24px 26px 2px' }}>
        <span style={{ display: 'flex', flexDirection: 'column', gap: '5px', minWidth: '0' }}>
          <span style={{ font: `700 20px/1.2 ${FONT}`, color: INK, ...ell }}>{d.name}</span>
          <span style={{ font: `400 12.5px/1.2 ${FONT}`, color: MUTED, ...ell }}>
            Driver · {d.zone ? `${d.zone} zone` : 'No zone set'}{d.vehicle ? ` · ${d.vehicle}` : ''}
          </span>
        </span>
        <span className="r-wrap" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button className="hv1" onClick={() => setModal('call')} style={topBtn}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: 'none' }}>
              <path d="M4.3 3.4h2.9a.9.9 0 01.86.63l.83 2.6a.9.9 0 01-.36 1l-1.44.99a9.4 9.4 0 004.29 4.29l.99-1.44a.9.9 0 011-.36l2.6.83a.9.9 0 01.63.86v2.9a1 1 0 01-1.09 1A13 13 0 013.3 4.49a1 1 0 011-1.09z" stroke="#4A564E" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
            Contact driver
          </button>
          <button className="hv1" onClick={() => setModal('assign')} disabled={inactive} title={inactive ? 'Reactivate this driver to assign orders' : undefined} style={{ ...topBtn, opacity: inactive ? 0.5 : 1, cursor: inactive ? 'default' : 'pointer' }}>
            Assign order
          </button>
          {inactive ? (
            <button onClick={() => setModal('status')} style={{ ...topBtn, border: '1px solid #C7E88A', background: '#F1F9DF', color: '#0B3D1F' }}>Reactivate</button>
          ) : (
            <button onClick={() => setModal('status')} style={{ ...topBtn, border: '1px solid #EEDAD5', background: '#FDF7F5', color: '#A93826' }}>Suspend</button>
          )}
        </span>
      </div>
      <div className="ad-scroll sk-page" style={{ flex: '1', minHeight: '0', overflowY: 'auto', padding: '20px 26px 30px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <button onClick={v.nav_del} style={{ display: 'flex', alignItems: 'center', gap: '6px', border: '0', background: 'transparent', font: `600 11.5px/1.2 ${FONT}`, color: '#17693A', cursor: 'pointer', padding: '0', whiteSpace: 'nowrap', alignSelf: 'flex-start' }}>
          <svg width="13" height="13" viewBox="0 0 20 20" fill="none" style={{ flex: 'none' }}>
            <path d="M12.4 4.4L6.8 10l5.6 5.6" stroke="#17693A" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to delivery
        </button>
        {detail.error && <span style={{ font: `400 12px/1.4 ${FONT}`, color: '#A93826' }}>{detail.error}</span>}
        <div className="r-kpi" style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '14px' }}>
          <Kpi icon="truck" label="Today’s deliveries" value={s.today.toLocaleString('en-AU')} note={`${data.deliveredTotal.toLocaleString('en-AU')} completed all time`} />
          <Kpi
            icon="check"
            label="This week"
            value={s.week.toLocaleString('en-AU')}
            note={weekDelta === 0 ? `Same as last week (${s.lastWeek})` : `${weekDelta > 0 ? '▲' : '▼'} ${Math.abs(weekDelta)} vs last week`}
            tone={weekDelta > 0 ? GOOD : weekDelta < 0 ? BAD : GREY}
            title="Deliveries since Monday, compared with the whole of last week"
          />
          <Kpi
            icon="bolt"
            label="Avg delivery time"
            value={s.avgExpressMin != null ? `${Math.round(s.avgExpressMin)} min` : '—'}
            note={s.expressCount ? `From ${plural(s.expressCount, 'express order')} this month` : 'No express deliveries this month'}
            title="Express orders delivered this month: time from order placed to delivered"
          />
          <Kpi
            icon="clock"
            label="On-time rate"
            value={s.onTimeMonth != null ? pct(s.onTimeMonth) : '—'}
            note={s.onTimeMonth == null ? 'No deliveries this month' : onTimeDelta == null ? 'This month' : onTimeDelta === 0 ? 'Same as last month' : `${onTimeDelta > 0 ? '▲' : '▼'} ${pct(Math.abs(onTimeDelta))} vs last month`}
            tone={onTimeDelta > 0 ? GOOD : onTimeDelta < 0 ? BAD : GREY}
            title="Deliveries this month that arrived by the promised time"
          />
          <Kpi
            icon="list"
            label="Active orders"
            value={s.mine.length.toLocaleString('en-AU')}
            note={s.late ? `${s.late} running late` : s.mine.length ? 'All on time' : 'None right now'}
            tone={s.late ? AMBER : GREY}
          />
        </div>
        <div className="r-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '18px', alignItems: 'start' }}>
          <div style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '10px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
              <span style={{ width: '46px', height: '46px', borderRadius: '12px', background: '#0B3D1F', display: 'flex', alignItems: 'center', justifyContent: 'center', font: `700 16px/1.2 ${FONT}`, color: '#8BE000', flex: 'none' }}>
                {driverInitials(d.name)}
              </span>
              <span style={{ display: 'flex', flexDirection: 'column', gap: '3px', minWidth: '0' }}>
                <span style={{ font: `700 14px/1.2 ${FONT}`, color: INK, ...ell }}>{d.name}</span>
                <span style={{ font: `400 11px/1.2 ${FONT}`, color: MUTED, ...ell }}>Joined {joined}</span>
              </span>
            </span>
            <span>
              <span style={pill(kfg, kbg)}>{kindLabel}</span>
            </span>
            <InfoRow label="Phone">
              {d.phone ? <a href={telHref(d.phone)} style={{ color: INK, textDecoration: 'none' }}>{phoneLabel(d.phone)}</a> : <span style={{ color: MUTED, fontWeight: 400 }}>Not saved</span>}
            </InfoRow>
            <InfoRow label="Vehicle">{d.vehicle || <span style={{ color: MUTED, fontWeight: 400 }}>Not set</span>}</InfoRow>
            <InfoRow label="Zone">{d.zone || <span style={{ color: MUTED, fontWeight: 400 }}>Not set</span>}</InfoRow>
            <InfoRow label="Last assigned">
              {data.lastAssignedAt ? <span title={new Date(data.lastAssignedAt).toLocaleString('en-AU')}>{timeAgo(data.lastAssignedAt, now)}</span> : <span style={{ color: MUTED, fontWeight: 400 }}>Never</span>}
            </InfoRow>
            <InfoRow label="Last delivery">
              {s.lastDeliveredAt ? <span title={new Date(s.lastDeliveredAt).toLocaleString('en-AU')}>{timeAgo(s.lastDeliveredAt, now)}</span> : <span style={{ color: MUTED, fontWeight: 400 }}>{data.deliveredTotal ? 'Over a month ago' : 'None yet'}</span>}
            </InfoRow>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', minWidth: '0' }}>
            <div style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '10px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <span style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                <span style={{ font: `600 13.5px/1.2 ${FONT}`, color: INK }}>Deliveries per day · last 14 days</span>
                <span style={{ marginLeft: 'auto', font: `400 11px/1.2 ${FONT}`, color: MUTED, whiteSpace: 'nowrap' }}>
                  {maxDay ? `${plural(s.days.reduce((n, x) => n + x.count, 0), 'delivery', 'deliveries')} · best day ${maxDay}` : 'No deliveries in the last 14 days'}
                </span>
              </span>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '104px' }}>
                {s.days.map((x, i) => (
                  <span
                    key={x.start}
                    title={`${dayFmt(x.start)} · ${plural(x.count, 'delivery', 'deliveries')}`}
                    style={{ flex: '1', height: maxDay ? `${Math.max(3, (x.count / maxDay) * 100)}%` : '3%', background: i === s.days.length - 1 ? '#0B3D1F' : '#DCE9D2', borderRadius: '4px 4px 0 0', display: 'block', opacity: x.count ? 1 : 0.5 }}
                  />
                ))}
              </div>
            </div>
            <div className="r-table-wrap" style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '10px', overflow: 'hidden', flex: 'none' }}>
              <div className="r-table" style={{ display: 'grid', gridTemplateColumns: COLS, gap: '14px', padding: '11px 16px', background: '#F6F7F4', borderBottom: `1px solid ${BORDER}` }}>
                {['Order', 'Customer', 'Address', 'Status', 'ETA', 'Value'].map((h) => <span key={h} style={head}>{h}</span>)}
              </div>
              {rows.length === 0 && (
                <div style={{ padding: '26px 16px', textAlign: 'center', font: `400 12.5px/1.5 ${FONT}`, color: MUTED }}>
                  No current orders and no deliveries in the last month.{!inactive && ' Use Assign order to give this driver work.'}
                </div>
              )}
              {rows.map((o, i) => {
                const [fg, bg] = STATUS_PILL[o.status] ?? STATUS_PILL.placed
                let eta = '—'
                let etaColor = MUTED
                if (o.status === 'delivered') {
                  if (o.promised_by) {
                    const late = Math.round((new Date(o.delivered_at) - new Date(o.promised_by)) / 60000)
                    eta = late > 0 ? `${span(late)} late` : 'On time'
                    etaColor = late > 0 ? '#A93826' : '#0B6B33'
                  }
                } else {
                  const m = minutesLeft(o, now)
                  if (m != null) {
                    eta = m < 0 ? `${span(-m)} late` : span(m)
                    if (m < 0) etaColor = '#A93826'
                  }
                }
                return (
                  <div key={o.id} className="hv3 r-table" onClick={() => v.openOrder(o)} style={{ display: 'grid', gridTemplateColumns: COLS, gap: '14px', padding: '13px 16px', borderBottom: i < rows.length - 1 ? '1px solid #EFF1ED' : '0', alignItems: 'center', cursor: 'pointer' }}>
                    <span style={cellWrap}><span style={{ font: `700 12.5px/1.2 ${FONT}`, color: INK, ...ell }}>#{o.number}</span></span>
                    <span style={cellWrap}>
                      <button onClick={(e) => { e.stopPropagation(); v.openCustomer(o.customer_id) }} style={{ border: '0', background: 'transparent', padding: '0', cursor: 'pointer', textAlign: 'left', minWidth: '0', font: `500 12.5px/1.2 ${FONT}`, color: INK, ...ell }}>
                        {customerName(o.customer)}
                      </button>
                    </span>
                    <span style={cellWrap}>
                      <span style={{ font: `400 11px/1.2 ${FONT}`, color: MUTED, ...ell }} title={o.address_line}>{[o.address_line, o.address_area].filter(Boolean).join(', ')}</span>
                    </span>
                    <span style={cellWrap}><span style={pill(fg, bg)}>{statusLabel(o.status)}</span></span>
                    <span style={cellWrap}>
                      <span style={{ font: `400 11px/1.2 ${FONT}`, color: etaColor, ...ell }} title={o.promised_by ? `Promised by ${new Date(o.promised_by).toLocaleString('en-AU')}` : 'No promised time'}>{eta}</span>
                    </span>
                    <span style={cellWrap}><span style={{ font: `600 12.5px/1.2 ${FONT}`, color: INK, ...ell }}>{money(o.total)}</span></span>
                  </div>
                )
              })}
              {data.delivered.length > RECENT && (
                <div style={{ padding: '11px 16px', borderTop: `1px solid ${BORDER}`, font: `400 11.5px/1.2 ${FONT}`, color: MUTED }}>
                  Showing the latest {RECENT} of {plural(data.delivered.length, 'delivery', 'deliveries')} since the start of last month
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {modal === 'call' && (
        <CallDriverModal
          driver={d}
          orders={s.mine}
          doneToday={s.today}
          now={now}
          onClose={() => setModal(null)}
          onOpenOrder={(o) => { setModal(null); v.openOrder(o) }}
        />
      )}
      {modal === 'assign' && (
        <AssignDriverModal
          orders={s.unassigned}
          preselect={s.unassigned.length === 1 ? [s.unassigned[0].id] : []}
          preselectDriver={d.id}
          drivers={data.drivers}
          load={s.load}
          flash={v.flash}
          onClose={() => setModal(null)}
          onAssigned={detail.refetch}
          onDriversChanged={detail.refetch}
        />
      )}
      {modal === 'status' && (
        <Modal
          title={inactive ? `Reactivate ${d.name}?` : `Suspend ${d.name}?`}
          sub={inactive
            ? 'They’ll show as available on the Delivery board and can be assigned orders again.'
            : `They’ll be marked inactive and won’t be offered for new orders or auto-reassignment.${s.mine.length ? ` Their ${plural(s.mine.length, 'open order')} stay assigned to them · reassign ${s.mine.length === 1 ? 'it' : 'them'} from Delivery if needed.` : ''}`}
          busy={busy}
          onClose={() => setModal(null)}
          footer={(
            <>
              <button type="button" onClick={() => setModal(null)} disabled={busy} style={{ ...btnSecondary, marginLeft: 'auto' }}>Cancel</button>
              <button type="button" onClick={toggleStatus} disabled={busy} style={{ ...btnPrimary, ...(inactive ? null : { background: '#A93826' }), opacity: busy ? 0.5 : 1 }}>
                {busy ? 'Saving…' : inactive ? 'Reactivate' : 'Suspend driver'}
              </button>
            </>
          )}
        />
      )}
    </>
  )
}
