import { useEffect, useState } from 'react'
import { DAY_NAMES, DAYS, fmtDate, fmtShort, fmtTime, nextDateFor } from '../lib/slotDates'

const FONT = 'Inter,system-ui,sans-serif'
const INK = '#17201A'
const MUTED = '#7C8A81'
const DANGER = '#B3402F'
const BORDER = '#E4E7E2'

const labelStyle = { font: `600 10.5px/1.2 ${FONT}`, letterSpacing: '.4px', color: MUTED, textTransform: 'uppercase', whiteSpace: 'nowrap' }
const inputStyle = { height: '36px', padding: '0 11px', border: `1px solid ${BORDER}`, borderRadius: '8px', background: '#fff', font: `500 12.5px/1.2 ${FONT}`, color: INK, outline: 'none', width: '100%', minWidth: '0', boxSizing: 'border-box' }
const errorText = { font: `400 11px/1.3 ${FONT}`, color: DANGER }
const withError = (style, err) => (err ? { ...style, borderColor: DANGER } : style)
const hintText = { font: `400 11.5px/1.45 ${FONT}`, color: '#4A564E' }

// Which real dates the slot covers: first upcoming date of each day, then weekly.
function DatesHint({ days }) {
  if (!days.length) return <span style={hintText}>Pick the days this slot runs. It repeats on them every week.</span>
  const firsts = days.map((d) => [nextDateFor(d), d]).sort(([a], [b]) => a.localeCompare(b))
  if (firsts.length === 1) {
    const [date, d] = firsts[0]
    return <span style={hintText}>Starts <b style={{ color: INK }}>{fmtDate(date)}</b>, then repeats every {DAY_NAMES[DAYS.indexOf(d)]}.</span>
  }
  return <span style={hintText}>Starts <b style={{ color: INK }}>{firsts.map(([date]) => fmtDate(date)).join(', ')}</b>, then repeats on these days every week.</span>
}

const toInput = (mins) => `${String(Math.floor(mins / 60)).padStart(2, '0')}:${String(mins % 60).padStart(2, '0')}`
const fromInput = (str) => {
  const [h, m] = str.split(':').map(Number)
  return Number.isFinite(h) && Number.isFinite(m) ? h * 60 + m : null
}

// slot: existing slot when editing, otherwise null. day: the day tab the modal was opened from.
export default function DeliverySlotModal({ slot, day, defaultFee, overlaps, onClose, onSave }) {
  const isEdit = !!slot
  const [start, setStart] = useState(toInput(slot?.start ?? 9 * 60))
  const [end, setEnd] = useState(toInput(slot?.end ?? 11 * 60))
  const [capacity, setCapacity] = useState(String(slot?.capacity ?? 20))
  const [fee, setFee] = useState(slot?.fee == null ? '' : slot.fee.toFixed(2))
  const [days, setDays] = useState([day])
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const toggleDay = (d) => setDays((cur) => (cur.includes(d) ? cur.filter((x) => x !== d) : DAYS.filter((x) => x === d || cur.includes(x))))

  const submit = () => {
    const s = fromInput(start)
    const e = fromInput(end)
    const cap = Number(capacity)
    const feeNum = fee.trim() === '' ? null : Number(fee)
    const next = {}
    if (s == null) next.start = 'Pick a start time'
    if (e == null) next.end = 'Pick an end time'
    else if (s != null && e <= s) next.end = 'End must be after start'
    if (!Number.isInteger(cap) || cap < 1) next.capacity = 'Enter a whole number above 0'
    if (feeNum != null && (!Number.isFinite(feeNum) || feeNum < 0)) next.fee = 'Enter a valid amount'
    if (!days.length) next.days = 'Pick at least one day'
    if (!next.start && !next.end && days.length) {
      const clash = days.map((d) => [d, overlaps(d, s, e, slot?.id)]).filter(([, c]) => c)
      if (clash.length) {
        next.end = `Overlaps ${clash.map(([d, c]) => `${d} ${fmtTime(c.start)} – ${fmtTime(c.end)}${c.active ? '' : ' (off)'}`).join(', ')}. Change the time, or edit that slot.`
      }
    }
    setErrors(next)
    if (Object.keys(next).length) return
    onSave({ start: s, end: e, capacity: cap, fee: feeNum == null ? null : Math.round(feeNum * 100) / 100 }, days)
  }

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: '0', zIndex: '90', background: 'rgba(14,22,16,.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: '460px', maxWidth: '100%', background: '#fff', borderRadius: '14px', boxShadow: '0 26px 60px rgba(10,18,12,.3)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '16px 18px 14px', display: 'flex', alignItems: 'flex-start', gap: '11px', borderBottom: '1px solid #EFF1ED' }}>
          <span style={{ width: '34px', height: '34px', borderRadius: '9px', background: '#F1F9DF', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
            <svg width="17" height="17" viewBox="0 0 20 20" fill="none" style={{ flex: 'none' }}>
              <circle cx="10" cy="10" r="6.6" stroke="#0B3D1F" strokeWidth="1.5" />
              <path d="M10 6.6V10l2.2 1.6" stroke="#0B3D1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '0' }}>
            <span style={{ font: `700 15px/1.2 ${FONT}`, color: INK }}>{isEdit ? `Edit ${day} delivery slot` : 'Add delivery slot'}</span>
            <span style={{ font: `400 11.5px/1.55 ${FONT}`, color: MUTED }}>Customers see this window at checkout until the cut-off.</span>
          </span>
        </div>
        <div style={{ padding: '15px 18px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '13px 13px' }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={labelStyle}>START TIME</span>
            <input type="time" step="900" value={start} onChange={(e) => setStart(e.target.value)} style={withError(inputStyle, errors.start)} />
            {errors.start && <span style={errorText}>{errors.start}</span>}
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={labelStyle}>END TIME</span>
            <input type="time" step="900" value={end} onChange={(e) => setEnd(e.target.value)} style={withError(inputStyle, errors.end)} />
            {errors.end && <span style={errorText}>{errors.end}</span>}
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={labelStyle}>MAX ORDERS</span>
            <input type="number" min="1" step="1" value={capacity} onChange={(e) => setCapacity(e.target.value)} style={withError(inputStyle, errors.capacity)} />
            {errors.capacity && <span style={errorText}>{errors.capacity}</span>}
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={labelStyle}>SLOT FEE ($)</span>
            <input inputMode="decimal" value={fee} placeholder={`${defaultFee.toFixed(2)} (default)`} onChange={(e) => setFee(e.target.value)} style={withError(inputStyle, errors.fee)} />
            {errors.fee && <span style={errorText}>{errors.fee}</span>}
          </label>
          {!isEdit && (
            <span style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '7px' }}>
              <span style={labelStyle}>REPEAT ON</span>
              <span style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {DAYS.map((d) => {
                  const on = days.includes(d)
                  return (
                    <button key={d} type="button" aria-pressed={on} onClick={() => toggleDay(d)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', minWidth: '50px', padding: '6px 9px', border: `1px solid ${on ? '#C7E88A' : BORDER}`, borderRadius: '8px', background: on ? '#F1F9DF' : '#fff', color: on ? '#0B3D1F' : '#4A564E', cursor: 'pointer' }}>
                      <span style={{ font: `600 12px/1.2 ${FONT}` }}>{d}</span>
                      <span style={{ font: `500 10px/1.2 ${FONT}`, color: on ? '#0B6B33' : MUTED }}>{fmtShort(nextDateFor(d))}</span>
                    </button>
                  )
                })}
              </span>
              {errors.days ? <span style={errorText}>{errors.days}</span> : <DatesHint days={days} />}
            </span>
          )}
          {isEdit && (
            <span style={{ gridColumn: 'span 2', ...hintText }}>
              Changes apply every {DAY_NAMES[DAYS.indexOf(day)]} from <b style={{ color: INK }}>{fmtDate(nextDateFor(day))}</b>.
            </span>
          )}
        </div>
        <div style={{ padding: '13px 18px 16px', display: 'flex', alignItems: 'center', gap: '9px', borderTop: '1px solid #EFF1ED', background: '#F6F7F4' }}>
          <span style={{ marginLeft: 'auto', display: 'flex', gap: '9px' }}>
            <button onClick={onClose} style={{ height: '36px', padding: '0 14px', border: `1px solid ${BORDER}`, borderRadius: '8px', background: '#fff', font: `600 12.5px/1.2 ${FONT}`, color: INK, cursor: 'pointer', whiteSpace: 'nowrap' }}>
              Cancel
            </button>
            <button onClick={submit} style={{ height: '36px', padding: '0 15px', border: '0', borderRadius: '8px', background: '#0B3D1F', color: '#fff', font: `600 12.5px/1.2 ${FONT}`, cursor: 'pointer', whiteSpace: 'nowrap' }}>
              {isEdit ? 'Save slot' : 'Add slot'}
            </button>
          </span>
        </div>
      </div>
    </div>
  )
}
