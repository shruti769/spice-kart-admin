import { useEffect, useMemo, useState } from 'react'
import AssignDriverModal from '../modals/AssignDriverModal'
import CallDriverModal from '../modals/CallDriverModal'
import {
  assignDriver, autoReassignDelayed, computeBoard, driverInitials, minutesLeft, notifyDelayedCustomers, phoneLabel, telHref, useDeliveryBoard,
} from '../lib/drivers'
import { STATUS_PILL, customerName, statusLabel } from '../lib/orders'
import { useStore } from '../lib/stores'

const FONT = 'Inter,system-ui,sans-serif'
const INK = '#17201A'
const MUTED = '#7C8A81'
const BORDER = '#E4E7E2'
const DCOLS = '1.5fr 1.1fr minmax(96px,1fr) 1.2fr .8fr .9fr .6fr 1fr 120px'

const ell = { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }
const TONE = { neutral: ['#7C8A81', '#EEF0EC'], good: ['#0B6B33', '#E9F6E3'], bad: ['#A93826', '#FAEDEA'], warn: ['#8A6100', '#FBF1DE'], blue: ['#1F5C8B', '#E8F1F8'] }
const pill = (tone, pad = '5px 8px') => ({ font: `600 10.5px/1.2 ${FONT}`, color: TONE[tone][0], background: TONE[tone][1], padding: pad, borderRadius: '5px', whiteSpace: 'nowrap', display: 'inline-block' })
const chip = (on) => ({ font: `600 11px/1.2 ${FONT}`, color: on ? '#0B3D1F' : '#4A564E', background: on ? '#F1F9DF' : '#fff', border: `1px solid ${on ? '#C7E88A' : BORDER}`, padding: '7px 10px', borderRadius: '7px', whiteSpace: 'nowrap', cursor: 'pointer' })
const underTab = (on) => ({ border: '0', background: 'transparent', padding: '10px 10px 9px', font: `600 11.5px/1.2 ${FONT}`, color: on ? '#0B3D1F' : MUTED, borderBottom: `2px solid ${on ? '#0B3D1F' : 'transparent'}`, cursor: 'pointer', whiteSpace: 'nowrap', marginBottom: '-1px' })
const smallBtn = { height: '26px', padding: '0 9px', border: `1px solid ${BORDER}`, borderRadius: '6px', background: '#fff', font: `600 11px/1.2 ${FONT}`, color: INK, cursor: 'pointer', whiteSpace: 'nowrap' }
const sqBtn = { width: '26px', height: '26px', border: `1px solid ${BORDER}`, borderRadius: '6px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: '0' }
const primaryBtn = { display: 'flex', alignItems: 'center', gap: '7px', height: '34px', padding: '0 13px', border: '0', borderRadius: '8px', background: '#0B3D1F', color: '#fff', font: `600 12.5px/1.2 ${FONT}`, cursor: 'pointer', whiteSpace: 'nowrap' }
const headCell = { font: `600 10.5px/1.2 ${FONT}`, letterSpacing: '.5px', color: MUTED, textTransform: 'uppercase', ...ell }
const card = { background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '10px', overflow: 'hidden', flex: 'none' }
const emptyBox = { padding: '28px 16px', textAlign: 'center', font: `400 12px/1.5 ${FONT}`, color: MUTED }

// ─── Icons ───────────────────────────────────────────────────────────────────────────────
const Pin = ({ c = '#4A564E', s = 15 }) => (
  <svg width={s} height={s} viewBox="0 0 20 20" fill="none" style={{ flex: 'none' }}>
    <path d="M10 17.5s5.4-4.7 5.4-8.6A5.4 5.4 0 004.6 8.9c0 3.9 5.4 8.6 5.4 8.6z" stroke={c} strokeWidth="1.5" />
    <circle cx="10" cy="8.6" r="1.9" stroke={c} strokeWidth="1.5" />
  </svg>
)
const Truck = ({ c = '#4A564E', s = 14 }) => (
  <svg width={s} height={s} viewBox="0 0 20 20" fill="none" style={{ flex: 'none' }}>
    <rect x="2.2" y="5.8" width="8.6" height="8" rx="1.4" stroke={c} strokeWidth="1.5" />
    <path d="M10.8 8.6h3.3a1.4 1.4 0 011.03.45l1.5 1.63a1.4 1.4 0 01.37.95v2.17h-6.2V8.6z" stroke={c} strokeWidth="1.5" strokeLinejoin="round" />
    <circle cx="6" cy="15.6" r="1.5" stroke={c} strokeWidth="1.5" />
    <circle cx="14" cy="15.6" r="1.5" stroke={c} strokeWidth="1.5" />
  </svg>
)
const Check = ({ c = '#4A564E', s = 14 }) => (
  <svg width={s} height={s} viewBox="0 0 20 20" fill="none" style={{ flex: 'none' }}><path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
)
const People = () => (
  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: 'none' }}>
    <circle cx="8.4" cy="7.4" r="2.8" stroke="#4A564E" strokeWidth="1.5" />
    <path d="M3.4 16.5c.8-2.9 2.6-4.3 5-4.3s4.2 1.4 5 4.3" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M14 5.3a2.6 2.6 0 010 4.8M15.5 16.5c-.3-1.8-.9-3.1-1.8-4" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)
const Warn = ({ c = '#4A564E', s = 14 }) => (
  <svg width={s} height={s} viewBox="0 0 20 20" fill="none" style={{ flex: 'none' }}>
    <path d="M10 3.6l7 12.2H3l7-12.2z" stroke={c} strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M10 8v3.4" stroke={c} strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="10" cy="13.6" r=".9" fill={c} />
  </svg>
)
const Clock = () => (
  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: 'none' }}>
    <circle cx="10" cy="10" r="7.2" stroke="#4A564E" strokeWidth="1.5" />
    <path d="M10 5.8V10l3 1.8" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)
const Chart = () => (
  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: 'none' }}>
    <path d="M3.4 3.4v12.2a1 1 0 001 1h12.2" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M6.8 13.2l3-3.4 2.4 2.2 3.6-4.4" stroke="#4A564E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const Search = () => (
  <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: 'none' }}>
    <circle cx="9" cy="9" r="6" stroke="#7C8A81" strokeWidth="1.6" />
    <path d="M13.4 13.4L18 18" stroke="#7C8A81" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
)
const Dots = () => (
  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: 'none' }}>
    <circle cx="5" cy="10" r="1.3" fill="#7C8A81" /><circle cx="10" cy="10" r="1.3" fill="#7C8A81" /><circle cx="15" cy="10" r="1.3" fill="#7C8A81" />
  </svg>
)
const Phone = () => (
  <svg width="13" height="13" viewBox="0 0 20 20" fill="none" style={{ flex: 'none' }}>
    <path d="M4.3 3.4h2.9a.9.9 0 01.86.63l.83 2.6a.9.9 0 01-.36 1l-1.44.99a9.4 9.4 0 004.29 4.29l.99-1.44a.9.9 0 011-.36l2.6.83a.9.9 0 01.63.86v2.9a1 1 0 01-1.09 1A13 13 0 013.3 4.49a1 1 0 011-1.09z" stroke="#7C8A81" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
)

function Kpi({ icon, label, value, tag, tone = 'neutral' }) {
  return (
    <div style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '10px', padding: '15px 16px', display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '0' }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ width: '26px', height: '26px', borderRadius: '7px', background: '#F6F7F4', border: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>{icon}</span>
        <span style={{ font: `500 11.5px/1.2 ${FONT}`, color: MUTED, ...ell }}>{label}</span>
      </span>
      <span style={{ font: `700 23px/1.2 ${FONT}`, color: INK, letterSpacing: '-.4px', whiteSpace: 'nowrap' }}>{value}</span>
      <span style={{ ...pill(tone, '4px 7px'), alignSelf: 'flex-start', maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tag}</span>
    </div>
  )
}

// ─── Display helpers ─────────────────────────────────────────────────────────────────────
const plural = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`
const fmt1 = (n) => n.toLocaleString('en-AU', { maximumFractionDigits: 1, minimumFractionDigits: 1 })
const time = (iso) => new Date(iso).toLocaleTimeString('en-AU', { hour: 'numeric', minute: '2-digit' })

/** [label, tone] for an order's ETA chip. */
function etaChip(o, now) {
  const m = minutesLeft(o, now)
  if (m == null) return [o.slot_label || 'No ETA set', 'neutral']
  if (m < 0) return [`${-m} min late`, 'bad']
  if (m <= 90) return [`${m} min`, 'good']
  const due = new Date(o.promised_by)
  const sameDay = new Date(now).toDateString() === due.toDateString()
  return [`Due ${sameDay ? '' : `${due.toLocaleDateString('en-AU', { day: 'numeric', month: 'short' })}, `}${time(o.promised_by)}`, 'neutral']
}

function updatedLabel(at, now) {
  if (!at) return 'Connecting…'
  const s = Math.max(0, Math.round((now - at) / 1000))
  if (s < 10) return 'Updated just now'
  if (s < 60) return `Updated ${s} sec ago`
  return `Updated ${Math.floor(s / 60)} min ago`
}

/** OpenStreetMap embed around `points` ([lat, lng][]), marker on `marker`. */
function osmEmbed(points, marker) {
  const lats = points.map((p) => p[0])
  const lngs = points.map((p) => p[1])
  let [s, n, w, e] = [Math.min(...lats), Math.max(...lats), Math.min(...lngs), Math.max(...lngs)]
  const padLat = Math.max((n - s) * 0.25, 0.012)
  const padLng = Math.max((e - w) * 0.25, 0.022)
  ;[s, n, w, e] = [s - padLat, n + padLat, w - padLng, e + padLng]
  return `https://www.openstreetmap.org/export/embed.html?bbox=${w.toFixed(5)},${s.toFixed(5)},${e.toFixed(5)},${n.toFixed(5)}&layer=mapnik&marker=${marker[0].toFixed(5)},${marker[1].toFixed(5)}`
}

export default function Delivery({ v }) {
  const board = useDeliveryBoard()
  const storeState = useStore()
  const store = storeState.store
  const [now, setNow] = useState(() => Date.now())
  const [zone, setZone] = useState('all')
  const [qTab, setQTab] = useState('all')
  const [dTab, setDTab] = useState('all')
  const [q, setQ] = useState('')
  const [dq, setDq] = useState('')
  const [selectedId, setSelectedId] = useState(null)
  const [menu, setMenu] = useState(null) // { id, top, left }
  const [assign, setAssign] = useState(null) // { orders, preselect }
  const [callId, setCallId] = useState(null)
  const [busy, setBusy] = useState(null)

  // Clock for "x min" / "Updated x sec ago"; a slow refetch keeps counts right even without Realtime.
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 5000)
    return () => clearInterval(t)
  }, [])
  const { refetch } = board
  useEffect(() => {
    const t = setInterval(refetch, 60000)
    return () => clearInterval(t)
  }, [refetch])

  const minuteNow = Math.floor(now / 30000) * 30000
  const data = board.data
  const b = useMemo(() => computeBoard(data, minuteNow), [data, minuteNow])
  const drivers = useMemo(() => data?.drivers ?? [], [data])
  const open = useMemo(() => data?.open ?? [], [data])
  const ready = Boolean(data)

  // ─── Queue ───
  const activeZone = zone !== 'all' && b.zones.includes(zone) ? zone : 'all'
  const zoneRows = useMemo(() => {
    const t = q.trim().toLowerCase().replace(/^#/, '')
    return open.filter((o) => {
      if (activeZone !== 'all' && (o.address_area || '').trim() !== activeZone && !(activeZone === 'Unknown area' && !(o.address_area || '').trim())) return false
      if (!t) return true
      return `${o.number} ${customerName(o.customer)} ${b.byId[o.driver_id]?.name ?? ''} ${o.address_line} ${o.address_area} ${o.postcode ?? ''}`.toLowerCase().includes(t)
    })
  }, [open, activeZone, q, b.byId])
  const lateIds = useMemo(() => new Set(b.delayed.map((o) => o.id)), [b.delayed])
  const tabs = {
    all: zoneRows,
    delayed: zoneRows.filter((o) => lateIds.has(o.id)),
    unassigned: zoneRows.filter((o) => !o.driver_id),
  }
  const queue = tabs[qTab]
  const selected = zoneRows.find((o) => o.id === selectedId) ?? zoneRows.find((o) => o.status === 'out_for_delivery') ?? zoneRows[0] ?? null
  const selDriver = selected?.driver_id ? b.byId[selected.driver_id] : null

  // ─── Map ───
  const storePt = store?.latitude != null ? [store.latitude, store.longitude] : null
  const destPt = selected?.delivery_lat != null ? [selected.delivery_lat, selected.delivery_lng] : null
  const mapSrc = destPt ? osmEmbed(storePt ? [storePt, destPt] : [destPt], destPt) : storePt ? osmEmbed([storePt], storePt) : null

  // ─── Drivers ───
  const driverKind = (d) => (d.status !== 'active' ? 'inactive' : b.load[d.id] ? 'delivering' : 'available')
  const driverCounts = { all: drivers.length, available: 0, delivering: 0, inactive: 0 }
  for (const d of drivers) driverCounts[driverKind(d)] += 1
  const dRows = drivers.filter((d) => {
    if (dTab !== 'all' && driverKind(d) !== dTab) return false
    const t = dq.trim().toLowerCase()
    return !t || `${d.name} ${d.phone ?? ''} ${d.zone} ${d.vehicle}`.toLowerCase().includes(t)
  })
  const maxLoad = Math.max(1, ...Object.values(b.load))
  const callDriver = callId ? drivers.find((d) => d.id === callId) : null

  // ─── Actions ───
  const openAssign = (orders, preselect) => { setMenu(null); setAssign({ orders, preselect }) }
  const assignUnassigned = () => openAssign(b.unassigned)
  const runRpc = async (kind) => {
    if (busy) return
    setBusy(kind)
    try {
      if (kind === 'reassign') {
        const n = await autoReassignDelayed()
        v.flash(n ? `${plural(n, 'delayed order')} reassigned to less busy drivers` : 'No less-busy active driver is free · nothing was reassigned')
      } else {
        const n = await notifyDelayedCustomers()
        v.flash(n ? `Delay notice sent to ${plural(n, 'customer')}` : 'These customers were already told in the last hour')
      }
      refetch()
    } catch (e) {
      v.flash(e.message)
    } finally {
      setBusy(null)
    }
  }
  const unassign = async (o) => {
    setMenu(null)
    try {
      await assignDriver([o.id], null)
      v.flash(`Driver removed from #${o.number}`)
      refetch()
    } catch (e) {
      v.flash(e.message)
    }
  }

  // ─── Copy ───
  let subtitle
  if (board.status === 'off') subtitle = 'Supabase keys are missing · add them to .env to load deliveries.'
  else if (!ready) subtitle = board.status === 'error' ? 'Couldn’t load deliveries' : 'Loading deliveries…'
  else subtitle = `${b.onRoad.length} out for delivery · ${plural(open.length, 'open order')} · ${b.delayed.length} delayed${b.unassigned.length ? ` · ${b.unassigned.length} unassigned` : ''}`

  const dash = '—'
  const avgDiff = b.avgToday != null && b.avgYesterday != null ? b.avgToday - b.avgYesterday : null
  const rateDiff = b.onTimeWeek != null && b.onTimeLastWeek != null ? b.onTimeWeek - b.onTimeLastWeek : null
  const delayedUnassigned = b.delayed.filter((o) => !o.driver_id).length

  const queueEmpty = !ready
    ? (board.status === 'error' ? board.error : board.status === 'off' ? 'Supabase isn’t configured' : 'Loading…')
    : !open.length ? 'No active deliveries · new orders appear here live'
      : qTab === 'delayed' ? 'No delayed orders · everything is on time'
        : qTab === 'unassigned' ? 'Every open order has a driver'
          : 'No orders match this zone or search'

  return (
    <>
      <div className="sk-topbar" style={{ display: 'flex', alignItems: 'flex-end', gap: '18px', padding: '24px 26px 2px' }}>
        <span style={{ display: 'flex', flexDirection: 'column', gap: '5px', minWidth: '0' }}>
          <span style={{ font: `700 20px/1.2 ${FONT}`, color: INK, whiteSpace: 'nowrap' }}>Delivery operations</span>
          <span style={{ font: `400 12.5px/1.2 ${FONT}`, color: MUTED, whiteSpace: 'nowrap' }}>{subtitle}</span>
        </span>
        <span className="r-wrap" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="r-full" style={{ display: 'flex', alignItems: 'center', gap: '8px', height: '34px', width: '220px', padding: '0 11px', border: `1px solid ${BORDER}`, borderRadius: '8px', background: '#fff' }}>
            <Search />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search order or driver…" style={{ border: '0', outline: 'none', background: 'transparent', font: `400 12.5px/1.2 ${FONT}`, color: INK, width: '100%', minWidth: '0' }} />
          </span>
          <button onClick={v.nav_settings} title="The delivery area is managed by postcodes in Settings" style={{ display: 'flex', alignItems: 'center', gap: '7px', height: '34px', padding: '0 12px', border: `1px solid ${BORDER}`, borderRadius: '8px', background: '#fff', color: INK, font: `600 12.5px/1.2 ${FONT}`, cursor: 'pointer', whiteSpace: 'nowrap' }}>
            <Pin />
            Manage zones
          </button>
          <button onClick={assignUnassigned} disabled={!ready} style={{ ...primaryBtn, opacity: ready ? 1 : 0.5 }}>
            <Check c="#8BE000" s={15} />
            Assign driver
          </button>
        </span>
      </div>
      <div className="ad-scroll sk-page" style={{ flex: '1', minHeight: '0', overflowY: 'auto', padding: '20px 26px 30px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div className="r-kpi" style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: '14px' }}>
          <Kpi icon={<Truck />} label="Active deliveries" value={ready ? b.onRoad.length : dash} tag="On the road now" />
          <Kpi icon={<Check />} label="Available drivers" value={ready ? b.available.length : dash}
            tag={!ready ? 'Ready to assign' : drivers.length ? (b.available.length ? 'Ready to assign' : 'None free right now') : 'No drivers yet — add one'}
            tone={ready && !b.available.length ? 'warn' : 'good'} />
          <Kpi icon={<People />} label="Busy drivers" value={ready ? b.busy.length : dash} tag={b.avgStops != null ? `Avg ${fmt1(b.avgStops)} stops each` : 'No stops assigned'} />
          <Kpi icon={<Warn />} label="Delayed orders" value={ready ? b.delayed.length : dash}
            tag={b.delayed.length ? b.delayedAreas.slice(0, 2).join(' · ') : 'All on time'} tone={b.delayed.length ? 'bad' : 'good'} />
          <Kpi icon={<Clock />} label="Avg delivery time" value={b.avgToday != null ? `${fmt1(b.avgToday)} min` : dash}
            tag={avgDiff != null ? `${avgDiff <= 0 ? '▼' : '▲'} ${fmt1(Math.abs(avgDiff))} min vs yesterday` : b.avgToday != null ? 'No express deliveries yesterday' : 'No express deliveries today'}
            tone={avgDiff == null ? 'neutral' : avgDiff <= 0 ? 'good' : 'warn'} />
          <Kpi icon={<Chart />} label="On-time rate" value={b.onTimeWeek != null ? `${fmt1(b.onTimeWeek)}%` : dash}
            tag={rateDiff != null ? `${rateDiff >= 0 ? '▲' : '▼'} ${fmt1(Math.abs(rateDiff))} pts vs last week` : b.onTimeWeek != null ? 'This week' : 'No deliveries this week'}
            tone={rateDiff == null ? 'neutral' : rateDiff >= 0 ? 'good' : 'warn'} />
        </div>

        {board.status === 'error' && (
          <div style={{ background: '#FAEDEA', border: '1px solid #F0D5CF', borderRadius: '10px', padding: '12px 16px', font: `500 12px/1.5 ${FONT}`, color: '#A93826' }}>{board.error}</div>
        )}

        {b.delayed.length > 0 && (
          <div style={{ background: '#FBF6EA', border: '1px solid #EEE0C2', borderRadius: '10px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 'none' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
              <Warn c="#8A6100" s={17} />
              <span style={{ font: `600 13px/1.2 ${FONT}`, color: '#6B4E08', ...ell }}>
                {b.delayed.length === 1 ? '1 order is past its ETA' : `${b.delayed.length} orders past their ETA`}
              </span>
              <span style={{ marginLeft: 'auto' }}>
                <span style={{ font: `600 10.5px/1.2 ${FONT}`, color: '#8A6100', background: '#F5E8CC', padding: '5px 8px', borderRadius: '5px', whiteSpace: 'nowrap', display: 'inline-block', textTransform: 'uppercase' }}>
                  {b.delayedAreas.slice(0, 3).join(' · ')}
                </span>
              </span>
            </span>
            <span style={{ font: `400 11px/1.6 ${FONT}`, color: '#8A7340' }}>
              {delayedUnassigned ? `${delayedUnassigned} of them ${delayedUnassigned === 1 ? 'has' : 'have'} no driver yet. ` : 'All of them have a driver. '}
              {b.active.length
                ? `${plural(b.available.length, 'active driver')} ${b.available.length === 1 ? 'is' : 'are'} free right now. Auto-reassign moves each delayed order to the least-busy active driver.`
                : 'There are no active drivers — add one to reassign these orders.'}
            </span>
            <span className="r-wrap" style={{ display: 'flex', gap: '9px' }}>
              <button onClick={() => runRpc('reassign')} disabled={Boolean(busy) || !b.active.length} style={{ height: '34px', padding: '0 13px', border: '0', borderRadius: '8px', background: '#8A6100', color: '#fff', font: `600 12px/1.2 ${FONT}`, cursor: busy || !b.active.length ? 'default' : 'pointer', whiteSpace: 'nowrap', opacity: busy || !b.active.length ? 0.55 : 1 }}>
                {busy === 'reassign' ? 'Reassigning…' : `Auto-reassign ${plural(b.delayed.length, 'order')}`}
              </button>
              <button onClick={() => runRpc('notify')} disabled={Boolean(busy)} style={{ height: '34px', padding: '0 12px', border: '1px solid #E2D2AC', borderRadius: '8px', background: '#fff', font: `600 12px/1.2 ${FONT}`, color: '#6B4E08', cursor: busy ? 'default' : 'pointer', whiteSpace: 'nowrap', opacity: busy ? 0.55 : 1 }}>
                {busy === 'notify' ? 'Notifying…' : 'Notify customers'}
              </button>
            </span>
          </div>
        )}

        <div className="r-stack" style={{ display: 'grid', gridTemplateColumns: '1.85fr 1fr', gap: '18px', alignItems: 'start' }}>
          {/* Live delivery map */}
          <div style={{ ...card, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '13px 16px', borderBottom: `1px solid ${BORDER}`, flexWrap: 'wrap' }}>
              <span style={{ font: `600 13.5px/1.2 ${FONT}`, color: INK, whiteSpace: 'nowrap' }}>Live delivery map</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', font: `500 10.5px/1.2 ${FONT}`, color: '#0B6B33', background: '#E9F6E3', padding: '5px 8px', borderRadius: '5px', whiteSpace: 'nowrap' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '3px', background: '#0B6B33', display: 'block' }} />
                {updatedLabel(board.updatedAt, now)}
              </span>
              <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '7px', flexWrap: 'wrap' }}>
                <button onClick={() => setZone('all')} style={chip(activeZone === 'all')}>All zones</button>
                {b.zones.slice(0, 5).map((z) => (
                  <button key={z} onClick={() => setZone(z)} style={chip(activeZone === z)}>{z}</button>
                ))}
              </span>
            </div>
            <div style={{ position: 'relative', height: '394px', background: '#EEF1EA', flex: 'none' }}>
              {mapSrc ? (
                <iframe key={mapSrc} title="Delivery map" src={mapSrc} loading="lazy" style={{ position: 'absolute', inset: '0', width: '100%', height: '100%', border: '0' }} />
              ) : (
                <span style={{ position: 'absolute', inset: '0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '20px', textAlign: 'center' }}>
                  <Pin c="#7C8A81" s={22} />
                  <span style={{ font: `600 12.5px/1.4 ${FONT}`, color: '#4A564E' }}>{storeState.loading || !ready ? 'Loading map…' : 'No map pin for the store yet'}</span>
                  {ready && (
                    <>
                      <span style={{ font: `400 11.5px/1.5 ${FONT}`, color: MUTED, maxWidth: '340px' }}>Set the store’s location in Settings to centre this map on it. Orders with a delivery pin from the app show here when selected.</span>
                      <button onClick={v.nav_settings} style={smallBtn}>Open settings</button>
                    </>
                  )}
                </span>
              )}
              {/* Selected order (OSM zoom controls sit top-left, so the callout sits top-right). */}
              <span style={{ position: 'absolute', top: '12px', right: '14px', maxWidth: '60%', display: 'flex', flexDirection: 'column', gap: '7px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '9px', background: 'rgba(255,255,255,.97)', border: `1px solid ${BORDER}`, borderRadius: '9px', padding: '9px 12px', boxShadow: '0 3px 10px rgba(16,24,16,.07)', minWidth: '0' }}>
                  <span style={{ width: '22px', height: '22px', borderRadius: '6px', background: '#8BE000', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                    <Truck c="#0B3D1F" s={13} />
                  </span>
                  <span style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: '0' }}>
                    <span style={{ font: `600 11.5px/1.2 ${FONT}`, color: INK, ...ell }}>
                      {selected ? `${selDriver?.name ?? 'Unassigned'} · #${selected.number}` : ready ? 'No active deliveries' : 'Loading…'}
                    </span>
                    <span style={{ font: `400 10px/1.2 ${FONT}`, color: MUTED, ...ell }}>
                      {selected
                        ? [statusLabel(selected.status), selected.address_area || selected.address_line, etaChip(selected, minuteNow)[0], selDriver ? `${plural(b.load[selDriver.id] || 0, 'stop')} for driver` : ''].filter(Boolean).join(' · ')
                        : 'Open orders show here as they come in'}
                    </span>
                  </span>
                  {selected && <button onClick={() => v.openOrder(selected)} style={{ ...smallBtn, flex: 'none' }}>Open</button>}
                </span>
              </span>
              {mapSrc && (
                <span style={{ position: 'absolute', bottom: '12px', left: '14px', maxWidth: '70%', display: 'flex', alignItems: 'center', gap: '14px', background: 'rgba(255,255,255,.97)', border: `1px solid ${BORDER}`, borderRadius: '9px', padding: '9px 13px', boxShadow: '0 3px 10px rgba(16,24,16,.07)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: '0' }}>
                    <span style={{ width: '9px', height: '9px', borderRadius: '3px', background: destPt ? '#1F5C8B' : '#0B3D1F', display: 'block', flex: 'none' }} />
                    <span style={{ font: `500 10.5px/1.2 ${FONT}`, color: '#4A564E', ...ell }}>
                      {destPt ? `Pin: #${selected.number} delivery address` : `Pin: ${store?.name || 'Store'}${selected ? ` · #${selected.number} has no map pin` : ''}`}
                    </span>
                  </span>
                  <span style={{ font: `500 9px/1.2 ${FONT}`, color: '#8A948B', whiteSpace: 'nowrap' }}>© OpenStreetMap</span>
                </span>
              )}
            </div>
          </div>

          {/* Live queue */}
          <div style={{ ...card, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '9px', padding: '13px 16px', borderBottom: `1px solid ${BORDER}` }}>
              <span style={{ font: `600 13.5px/1.2 ${FONT}`, color: INK, ...ell }}>Live queue</span>
              <span style={{ marginLeft: 'auto' }}>
                <span style={pill('good')}>{ready ? `${open.length} OPEN` : '—'}</span>
              </span>
            </div>
            <div style={{ display: 'flex', gap: '2px', padding: '0 16px', borderBottom: `1px solid ${BORDER}` }}>
              {[['all', 'All'], ['delayed', 'Delayed'], ['unassigned', 'Unassigned']].map(([k, label]) => (
                <button key={k} onClick={() => setQTab(k)} style={underTab(qTab === k)}>{label} · {tabs[k].length}</button>
              ))}
            </div>
            <div className="ad-scroll" style={{ maxHeight: '342px', overflowY: 'auto' }}>
              {queue.length === 0 && <div style={emptyBox}>{queueEmpty}</div>}
              {queue.map((o, i) => {
                const d = o.driver_id ? b.byId[o.driver_id] : null
                const late = lateIds.has(o.id)
                const [sfg, sbg] = late ? ['#8A6100', '#FBF1DE'] : (STATUS_PILL[o.status] ?? STATUS_PILL.placed)
                const [eta, etaTone] = etaChip(o, minuteNow)
                const on = selected?.id === o.id
                return (
                  <div key={o.id} className="hv3" onClick={() => setSelectedId(o.id)} style={{ padding: '12px 16px', borderBottom: i < queue.length - 1 ? '1px solid #EFF1ED' : '0', display: 'flex', flexDirection: 'column', gap: '8px', cursor: 'pointer', background: on ? '#F7FCEE' : undefined, boxShadow: on ? 'inset 3px 0 0 #8BE000' : undefined }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ font: `700 12px/1.2 ${FONT}`, color: INK, ...ell }}>#{o.number}</span>
                      <span style={{ marginLeft: 'auto' }}>
                        <span style={{ font: `600 10.5px/1.2 ${FONT}`, color: sfg, background: sbg, padding: '5px 8px', borderRadius: '5px', whiteSpace: 'nowrap', display: 'inline-block' }}>
                          {late ? `Delayed · ${statusLabel(o.status)}` : statusLabel(o.status)}
                        </span>
                      </span>
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '24px', height: '24px', borderRadius: '7px', background: '#F6F7F4', border: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', font: `600 9.5px/1.2 ${FONT}`, color: '#4A564E', flex: 'none' }}>
                        {d ? driverInitials(d.name) : '—'}
                      </span>
                      <span style={{ font: `500 11.5px/1.2 ${FONT}`, color: d ? INK : '#8A6100', ...ell }}>{d ? d.name : 'Unassigned'}</span>
                      <span style={{ marginLeft: 'auto', font: `400 11px/1.2 ${FONT}`, color: MUTED, ...ell }}>{customerName(o.customer)}</span>
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '7px', minWidth: '0' }}>
                      <Pin c="#7C8A81" s={13} />
                      <span style={{ font: `400 11px/1.2 ${FONT}`, color: MUTED, ...ell }}>{[o.address_line, o.address_area].filter(Boolean).join(', ')}</span>
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={pill(etaTone, '4px 7px')}>{eta}</span>
                      <span style={{ marginLeft: 'auto', display: 'flex', gap: '6px' }}>
                        <button onClick={(e) => { e.stopPropagation(); v.openOrder(o) }} style={smallBtn}>Open</button>
                        <button
                          aria-label="More"
                          onClick={(e) => {
                            e.stopPropagation()
                            const r = e.currentTarget.getBoundingClientRect()
                            setMenu(menu?.id === o.id ? null : { id: o.id, top: r.bottom + 4, left: Math.max(8, r.right - 180) })
                          }}
                          style={sqBtn}
                        >
                          <Dots />
                        </button>
                      </span>
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Zone performance (zones = delivery suburbs of today's and open orders) */}
        <div style={card}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '13px 16px', borderBottom: `1px solid ${BORDER}` }}>
            <span style={{ font: `600 13.5px/1.2 ${FONT}`, color: INK, ...ell }}>Zone performance</span>
            <span style={{ marginLeft: 'auto' }}>
              <span style={{ font: `400 11px/1.2 ${FONT}`, color: MUTED, ...ell }}>Today · live</span>
            </span>
          </div>
          {b.zonePerf.length === 0 ? (
            <div style={emptyBox}>{ready ? 'No deliveries today yet · zones fill in from the delivery suburbs of orders' : 'Loading…'}</div>
          ) : (
            <div className="r-stack-sm" style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '0' }}>
              {b.zonePerf.slice(0, 5).map((z, i, arr) => {
                const rateColor = z.onTime == null ? MUTED : z.onTime >= 90 ? '#17693A' : z.onTime >= 75 ? '#8A6100' : '#A93826'
                return (
                  <div key={z.name} style={{ padding: '15px 16px', borderRight: i < arr.length - 1 || arr.length < 5 ? '1px solid #EFF1ED' : '0', display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '0' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '7px', minWidth: '0' }}>
                      <Pin c="#7C8A81" s={13} />
                      <span style={{ font: `600 12px/1.2 ${FONT}`, color: INK, ...ell }}>{z.name}</span>
                    </span>
                    <span style={{ display: 'flex', alignItems: 'baseline', gap: '7px' }}>
                      <span style={{ font: `700 20px/1.2 ${FONT}`, color: INK, whiteSpace: 'nowrap' }}>{z.active}</span>
                      <span style={{ font: `400 11px/1.2 ${FONT}`, color: MUTED, ...ell }}>active · {z.delivered} delivered</span>
                    </span>
                    <span style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ font: `400 11px/1.2 ${FONT}`, color: MUTED, ...ell }}>Avg time</span>
                        <span style={{ marginLeft: 'auto', font: `600 11.5px/1.2 ${FONT}`, color: INK, whiteSpace: 'nowrap' }}>{z.avgMin != null ? `${fmt1(z.avgMin)} min` : dash}</span>
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ font: `400 11px/1.2 ${FONT}`, color: MUTED, ...ell }}>On time</span>
                        <span style={{ marginLeft: 'auto', font: `600 11.5px/1.2 ${FONT}`, color: rateColor, whiteSpace: 'nowrap' }}>{z.onTime != null ? `${Math.round(z.onTime)}%` : dash}</span>
                      </span>
                      <span style={{ height: '6px', borderRadius: '3px', background: '#EFF1ED', overflow: 'hidden', display: 'block' }}>
                        <span style={{ display: 'block', width: `${z.onTime ?? 0}%`, height: '100%', background: z.onTime != null && z.onTime < 85 ? '#C89A28' : '#8BE000', borderRadius: '3px' }} />
                      </span>
                    </span>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Drivers */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ font: `600 14px/1.2 ${FONT}`, color: INK, ...ell }}>Drivers</span>
            <span style={{ marginLeft: 'auto' }}>
              <span style={{ font: `400 11px/1.2 ${FONT}`, color: MUTED, ...ell }}>
                {ready ? `${plural(drivers.length, 'driver')}${store?.name ? ` · ${store.name}` : ''}` : ''}
              </span>
            </span>
          </span>
          <div className="r-table-wrap" style={card}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '9px', padding: '12px 16px', borderBottom: `1px solid ${BORDER}`, flexWrap: 'wrap' }}>
              <span className="r-full" style={{ display: 'flex', alignItems: 'center', gap: '8px', height: '34px', width: '230px', padding: '0 11px', border: `1px solid ${BORDER}`, borderRadius: '8px', background: '#fff' }}>
                <Search />
                <input value={dq} onChange={(e) => setDq(e.target.value)} placeholder="Search drivers…" style={{ border: '0', outline: 'none', background: 'transparent', font: `400 12.5px/1.2 ${FONT}`, color: INK, width: '100%', minWidth: '0' }} />
              </span>
              {[['all', 'All'], ['available', 'Available'], ['delivering', 'Delivering'], ['inactive', 'Inactive']].map(([k, label]) => (
                <button key={k} onClick={() => setDTab(k)} style={{ ...chip(dTab === k), font: `600 11.5px/1.2 ${FONT}`, padding: '8px 11px' }}>{label} · {driverCounts[k]}</button>
              ))}
              <button onClick={assignUnassigned} disabled={!ready} style={{ ...primaryBtn, marginLeft: 'auto', opacity: ready ? 1 : 0.5 }}>
                <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: 'none' }}><path d="M10 4.4v11.2M4.4 10h11.2" stroke="#8BE000" strokeWidth="1.8" strokeLinecap="round" /></svg>
                Assign orders
              </button>
            </div>
            <div className="r-table" style={{ '--r-min': '1000px', display: 'grid', gridTemplateColumns: DCOLS, gap: '14px', padding: '11px 16px', background: '#F6F7F4', borderBottom: `1px solid ${BORDER}` }}>
              {['Driver', 'Phone', 'Status', 'Load', 'This week', 'Vehicle', 'Today', 'Zone', 'Actions'].map((h) => <span key={h} style={headCell}>{h}</span>)}
            </div>
            {dRows.length === 0 && (
              <div style={{ ...emptyBox, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                {!ready ? (board.status === 'error' ? board.error : 'Loading…') : drivers.length ? 'No drivers match this filter.' : 'No drivers yet — add one to start assigning orders.'}
                {ready && !drivers.length && <button onClick={assignUnassigned} style={smallBtn}>+ Add driver</button>}
              </div>
            )}
            {dRows.map((d) => {
              const kind = driverKind(d)
              const n = b.load[d.id] || 0
              const late = b.lateLoad[d.id] || 0
              return (
                <div key={d.id} className="hv3 r-table" style={{ '--r-min': '1000px', display: 'grid', gridTemplateColumns: DCOLS, gap: '14px', padding: '13px 16px', borderBottom: '1px solid #EFF1ED', alignItems: 'center', opacity: kind === 'inactive' ? 0.7 : 1 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '9px', minWidth: '0' }}>
                    <span style={{ width: '28px', height: '28px', borderRadius: '7px', background: '#F6F7F4', border: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', font: `600 10.5px/1.2 ${FONT}`, color: '#4A564E', flex: 'none' }}>
                      {driverInitials(d.name)}
                    </span>
                    <button onClick={() => v.openDriver(d)} title={`Open ${d.name}`} style={{ border: '0', background: 'transparent', padding: '0', textAlign: 'left', cursor: 'pointer', minWidth: '0', font: `600 12.5px/1.2 ${FONT}`, color: INK, ...ell }}>{d.name}</button>
                  </span>
                  <span style={{ minWidth: '0', font: `400 11px/1.2 ${FONT}`, color: MUTED, ...ell }}>{phoneLabel(d.phone) || dash}</span>
                  <span style={{ minWidth: '0' }}>
                    <span style={pill(kind === 'inactive' ? 'neutral' : kind === 'delivering' ? 'blue' : 'good')}>
                      {kind === 'inactive' ? 'Inactive' : kind === 'delivering' ? 'Delivering' : 'Available'}
                    </span>
                  </span>
                  <span style={{ display: 'flex', flexDirection: 'column', gap: '5px', minWidth: '0' }}>
                    <span style={{ font: `600 11px/1.2 ${FONT}`, color: late ? '#8A6100' : INK, ...ell }}>{plural(n, 'open order')}{late ? ` · ${late} late` : ''}</span>
                    <span style={{ height: '5px', borderRadius: '3px', background: '#EFF1ED', overflow: 'hidden', display: 'block' }}>
                      <span style={{ display: 'block', width: `${(n / maxLoad) * 100}%`, height: '100%', background: late ? '#C89A28' : '#8BE000', borderRadius: '3px' }} />
                    </span>
                  </span>
                  <span style={{ minWidth: '0', font: `600 12.5px/1.2 ${FONT}`, color: INK, ...ell }}>{b.doneWeek[d.id] || 0}</span>
                  <span style={{ minWidth: '0', font: `400 11px/1.2 ${FONT}`, color: MUTED, ...ell }}>{d.vehicle || dash}</span>
                  <span style={{ minWidth: '0', font: `600 12.5px/1.2 ${FONT}`, color: INK, ...ell }}>{b.doneToday[d.id] || 0}</span>
                  <span style={{ minWidth: '0', font: `400 11px/1.2 ${FONT}`, color: MUTED, ...ell }}>{d.zone || dash}</span>
                  <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <button onClick={() => v.openDriver(d)} style={smallBtn}>View</button>
                    {d.phone ? (
                      <a href={telHref(d.phone)} aria-label={`Call ${d.name}`} title={`Call ${phoneLabel(d.phone)}`} style={sqBtn}><Phone /></a>
                    ) : (
                      <span title="No phone number saved" style={{ ...sqBtn, opacity: 0.4, cursor: 'default' }}><Phone /></span>
                    )}
                  </span>
                </div>
              )
            })}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: '#fff' }}>
              <span style={{ font: `400 11px/1.2 ${FONT}`, color: MUTED, ...ell }}>
                {ready ? `Showing ${dRows.length} of ${plural(drivers.length, 'driver')} · ${driverCounts.available} available, ${driverCounts.delivering} delivering` : ''}
              </span>
              <button onClick={assignUnassigned} disabled={!ready} style={{ marginLeft: 'auto', height: '30px', padding: '0 12px', border: `1px solid ${BORDER}`, borderRadius: '7px', background: '#fff', font: `600 11.5px/1.2 ${FONT}`, color: INK, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                Add or manage drivers →
              </button>
            </div>
          </div>
        </div>
      </div>

      {menu && (() => {
        const o = open.find((x) => x.id === menu.id)
        if (!o) return null
        const d = o.driver_id ? b.byId[o.driver_id] : null
        const item = { display: 'block', width: '100%', textAlign: 'left', border: '0', background: 'transparent', padding: '9px 12px', font: `500 12px/1.2 ${FONT}`, color: INK, cursor: 'pointer', whiteSpace: 'nowrap' }
        return (
          <>
            <div onClick={() => setMenu(null)} style={{ position: 'fixed', inset: '0', zIndex: '80' }} />
            <div style={{ position: 'fixed', top: `${menu.top}px`, left: `${menu.left}px`, width: '180px', zIndex: '81', background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '9px', boxShadow: '0 10px 28px rgba(10,18,12,.14)', padding: '4px', display: 'flex', flexDirection: 'column' }}>
              <button className="hv3" onClick={() => openAssign([o])} style={item}>{d ? 'Reassign driver' : 'Assign driver'}</button>
              {d && <button className="hv3" onClick={() => { setMenu(null); setCallId(d.id) }} style={item}>Contact {d.name.split(' ')[0]}</button>}
              {d && <button className="hv3" onClick={() => unassign(o)} style={{ ...item, color: '#A93826' }}>Remove driver</button>}
              <button className="hv3" onClick={() => { setMenu(null); v.openOrder(o) }} style={item}>Open order</button>
            </div>
          </>
        )
      })()}

      {assign && (
        <AssignDriverModal
          orders={assign.orders}
          preselect={assign.preselect}
          drivers={drivers}
          load={b.load}
          flash={v.flash}
          onClose={() => setAssign(null)}
          onAssigned={refetch}
          onDriversChanged={refetch}
        />
      )}
      {callDriver && (
        <CallDriverModal
          driver={callDriver}
          orders={open.filter((o) => o.driver_id === callDriver.id)}
          doneToday={b.doneToday[callDriver.id] || 0}
          now={minuteNow}
          onClose={() => setCallId(null)}
          onOpenOrder={(o) => { setCallId(null); v.openOrder(o) }}
        />
      )}
    </>
  )
}
