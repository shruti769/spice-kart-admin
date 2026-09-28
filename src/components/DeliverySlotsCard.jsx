import { useState } from 'react'
import DeliverySlotModal from '../modals/DeliverySlotModal'
import { DAY_NAMES, DAYS, datesInWindow, fmtShort, fmtTime, nextDateFor } from '../lib/slotDates'
import { copySlotsToAllDays, createSlots, deleteSlot, updateDeliverySettings, updateSlot, useDeliverySchedule, useDeliverySettings } from '../lib/delivery'

const FONT = 'Inter,system-ui,sans-serif'
const INK = '#17201A'
const MUTED = '#7C8A81'
const BORDER = '#E4E7E2'

const labelStyle = { font: `600 10.5px/1.2 ${FONT}`, letterSpacing: '.4px', color: MUTED, textTransform: 'uppercase', whiteSpace: 'nowrap' }
const selectStyle = { appearance: 'none', WebkitAppearance: 'none', height: '36px', padding: '0 32px 0 11px', border: `1px solid ${BORDER}`, borderRadius: '8px', background: '#fff', font: `500 12.5px/1.2 ${FONT}`, color: INK, outline: 'none', width: '100%', cursor: 'pointer' }
const iconBtn = { width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${BORDER}`, borderRadius: '7px', background: '#fff', cursor: 'pointer', padding: '0' }
const th = { ...labelStyle, padding: '11px 14px', textAlign: 'left', background: '#F6F7F4', borderBottom: `1px solid ${BORDER}` }
const td = { padding: '11px 14px', borderBottom: '1px solid #EFF1ED', font: `500 12.5px/1.2 ${FONT}`, color: INK, verticalAlign: 'middle' }

// [value saved in delivery_settings, label]
const BOOK_AHEAD = [[3, 'Up to 3 days'], [7, 'Up to 7 days'], [14, 'Up to 14 days']]
const CUT_OFF = [[30, '30 minutes before slot'], [60, '1 hour before slot'], [120, '2 hours before slot'], [240, '4 hours before slot']]

const fmtDur = (mins) => {
  const h = Math.floor(mins / 60), m = mins % 60
  return [h && `${h} hr${h > 1 ? 's' : ''}`, m && `${m} min`].filter(Boolean).join(' ')
}

function Toggle({ on, onChange, label }) {
  return (
    <button type="button" role="switch" aria-checked={on} aria-label={label} onClick={() => onChange(!on)} style={{ width: '38px', height: '22px', borderRadius: '11px', background: on ? '#1B5E30' : '#DCDDD8', position: 'relative', flex: 'none', display: 'block', border: '0', padding: '0', cursor: 'pointer', transition: 'background .15s' }}>
      <span style={{ position: 'absolute', top: '2.5px', left: on ? '18px' : '2.5px', width: '17px', height: '17px', borderRadius: '9px', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,.2)', display: 'block', transition: 'left .15s' }} />
    </button>
  )
}

function Select({ value, options, onChange }) {
  return (
    <span style={{ position: 'relative', display: 'block' }}>
      <select value={value} onChange={(e) => onChange(e.target.value)} style={selectStyle}>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
      <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ position: 'absolute', right: '11px', top: '11px', pointerEvents: 'none' }}>
        <path d="M5.5 8l4.5 4.5L14.5 8" stroke="#4A564E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

export default function DeliverySlotsCard({ v, ...rest }) {
  const { data: settings } = useDeliverySettings()
  const schedule = useDeliverySchedule()
  const { slots } = schedule.data
  const [day, setDay] = useState('Mon')
  const [modal, setModal] = useState(null) // null | { slot: null | slot }
  const defaultFee = settings.scheduled_fee

  const list = slots[day]
  const active = list.filter((s) => s.active)
  const capacity = active.reduce((n, s) => n + s.capacity, 0)

  // Runs a Supabase write, then shows `msg` (or the error).
  const run = async (task, msg) => {
    try {
      await task()
      v.flash(msg)
      return true
    } catch (e) {
      v.flash(e.message)
      return false
    }
  }

  const bookAhead = BOOK_AHEAD.find(([n]) => n === settings.book_ahead_days)?.[1] ?? `Up to ${settings.book_ahead_days} days`
  const cutOff = CUT_OFF.find(([n]) => n === settings.cutoff_minutes)?.[1] ?? `${settings.cutoff_minutes} minutes before slot`
  const setBookAhead = (label) => {
    const n = BOOK_AHEAD.find(([, l]) => l === label)[0]
    run(() => updateDeliverySettings({ book_ahead_days: n }), `Customers can now book ${label.toLowerCase()} ahead`)
  }
  const setCutOff = (label) => {
    const n = CUT_OFF.find(([, l]) => l === label)[0]
    run(() => updateDeliverySettings({ cutoff_minutes: n }), `Booking closes ${label}`)
  }

  const windowDays = settings.book_ahead_days
  const bookable = datesInWindow(day, windowDays)

  // The existing slot on day `d` that clashes with start–end, if any.
  const overlaps = (d, start, end, ignoreId) => slots[d].find((s) => s.id !== ignoreId && start < s.end && end > s.start)
  const setActive = (s, on) => run(() => updateSlot(s.id, { active: on }), `${day} ${fmtTime(s.start)} slot ${on ? 'turned on' : 'turned off'}`)

  const save = async (data, days) => {
    const ok = modal.slot
      ? await run(() => updateSlot(modal.slot.id, data), `${day} slot updated · ${fmtTime(data.start)} – ${fmtTime(data.end)}`)
      : await run(() => createSlots(data, days), `Slot added to ${days.join(', ')} · ${fmtTime(data.start)} – ${fmtTime(data.end)}`)
    if (ok) setModal(null)
  }

  const remove = (slot) => run(() => deleteSlot(slot.id), `Removed ${fmtTime(slot.start)} – ${fmtTime(slot.end)} from ${day}`)

  const copyToAll = () => {
    if (!window.confirm(`Replace the slots on every other day with ${day}'s ${list.length} slot${list.length === 1 ? '' : 's'}?`)) return
    run(() => copySlotsToAllDays(day, list), `${day} slots copied to all days`)
  }

  return (
    <div {...rest} style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '10px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <span style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
        <span style={{ display: 'flex', flexDirection: 'column', gap: '5px', minWidth: '0', flex: '1' }}>
          <span style={{ font: `600 13.5px/1.2 ${FONT}`, color: INK }}>Scheduled delivery slots</span>
          <span style={{ font: `400 11.5px/1.4 ${FONT}`, color: MUTED }}>Time windows customers can book at checkout. Changes apply to new bookings only.</span>
        </span>
        <button className="hv2" onClick={() => setModal({ slot: null })} style={{ display: 'flex', alignItems: 'center', gap: '7px', height: '34px', padding: '0 13px', border: '0', borderRadius: '8px', background: '#0B3D1F', color: '#fff', font: `600 12.5px/1.2 ${FONT}`, cursor: 'pointer', whiteSpace: 'nowrap', flex: 'none' }}>
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: 'none' }}>
            <path d="M10 4.5v11M4.5 10h11" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          Add slot
        </button>
      </span>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '11px' }}>
        <span style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={labelStyle}>BOOK AHEAD</span>
          <Select value={bookAhead} options={BOOK_AHEAD.map(([, l]) => l)} onChange={setBookAhead} />
        </span>
        <span style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={labelStyle}>BOOKING CUT-OFF</span>
          <Select value={cutOff} options={CUT_OFF.map(([, l]) => l)} onChange={setCutOff} />
        </span>
        <span style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={labelStyle}>DEFAULT SLOT FEE</span>
          <span style={{ display: 'flex', alignItems: 'center', height: '36px', padding: '0 11px', border: `1px solid ${BORDER}`, borderRadius: '8px', background: '#F6F7F4', font: `500 12.5px/1.2 ${FONT}`, color: '#4A564E', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            ${defaultFee.toFixed(2)} · scheduled fee
          </span>
        </span>
      </div>

      <span style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
        {DAYS.map((d) => {
          const on = d === day
          return (
            <button key={d} onClick={() => setDay(d)} aria-pressed={on} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', minWidth: '58px', padding: '8px 10px', border: `1px solid ${on ? '#0B3D1F' : BORDER}`, borderRadius: '8px', background: on ? '#0B3D1F' : '#fff', cursor: 'pointer' }}>
              <span style={{ font: `600 12.5px/1.2 ${FONT}`, color: on ? '#fff' : INK }}>{d}</span>
              <span style={{ font: `500 10.5px/1.2 ${FONT}`, color: on ? '#8BE000' : MUTED }}>{slots[d].length} slots</span>
            </button>
          )
        })}
      </span>

      <span style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '10px 12px', borderRadius: '8px', background: '#F6F7F4', font: `400 12px/1.5 ${FONT}`, color: '#4A564E' }}>
        <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: 'none', marginTop: '1px' }}>
          <path d="M15.5 8.5a5.5 5.5 0 10-1.2 4.6M15.8 4.6v4h-4" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span>
          <span style={{ fontWeight: 600, color: INK }}>Repeats every {DAY_NAMES[DAYS.indexOf(day)]}.</span>{' '}
          {bookable.length
            ? <>Customers can book now for {bookable.map(fmtShort).join(', ')}.</>
            : <>Next {day} is {fmtShort(nextDateFor(day))}, which opens for booking once it's within {windowDays} days.</>}
        </span>
      </span>

      <div style={{ border: `1px solid ${BORDER}`, borderRadius: '9px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={th}>Time window</th>
              <th style={th}>Capacity</th>
              <th style={th}>Fee</th>
              <th style={th}>Active</th>
              <th style={{ ...th, textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((s) => (
              <tr key={s.id} style={{ opacity: s.active ? 1 : 0.55 }}>
                <td style={td}>
                  <span style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ font: `600 12.5px/1.2 ${FONT}`, color: INK, whiteSpace: 'nowrap' }}>{fmtTime(s.start)} – {fmtTime(s.end)}</span>
                    <span style={{ font: `400 11px/1.2 ${FONT}`, color: MUTED }}>{fmtDur(s.end - s.start)}</span>
                  </span>
                </td>
                <td style={td}>{s.capacity} orders</td>
                <td style={td}>${(s.fee ?? defaultFee).toFixed(2)}</td>
                <td style={td}>
                  <Toggle on={s.active} label={`${fmtTime(s.start)} slot active`} onChange={(on) => setActive(s, on)} />
                </td>
                <td style={td}>
                  <span style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                    <button className="hv1" aria-label="Edit slot" onClick={() => setModal({ slot: s })} style={iconBtn}>
                      <svg width="13" height="13" viewBox="0 0 20 20" fill="none">
                        <path d="M12.8 4.2l3 3L8 15H5v-3l7.8-7.8z" stroke={INK} strokeWidth="1.6" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <button className="hv1" aria-label="Delete slot" onClick={() => remove(s)} style={{ ...iconBtn, borderColor: '#F0D5CF' }}>
                      <svg width="13" height="13" viewBox="0 0 20 20" fill="none">
                        <path d="M4.5 6h11M8 6V4.5h4V6M6 6l.7 9.5h6.6L14 6" stroke="#B3402F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </span>
                </td>
              </tr>
            ))}
            {!list.length && (
              <tr>
                <td colSpan="5" style={{ ...td, textAlign: 'center', color: MUTED, padding: '22px 14px' }}>
                  {schedule.loading ? 'Loading slots…' : schedule.status === 'error' ? `Couldn't load slots · ${schedule.error}` : `No slots on ${day}. Customers can't book scheduled delivery this day.`}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <span style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', background: '#F6F7F4' }}>
          <span style={{ font: `500 12px/1.3 ${FONT}`, color: '#4A564E', flex: '1', minWidth: '0' }}>
            {active.length} active slot{active.length === 1 ? '' : 's'} · {capacity} orders capacity
            {active.length > 0 && ` · ${fmtTime(Math.min(...active.map((s) => s.start)))} – ${fmtTime(Math.max(...active.map((s) => s.end)))}`}
          </span>
          <button className="hv1" onClick={copyToAll} style={{ height: '32px', padding: '0 12px', border: `1px solid ${BORDER}`, borderRadius: '8px', background: '#fff', color: INK, font: `600 12px/1.2 ${FONT}`, cursor: 'pointer', whiteSpace: 'nowrap' }}>
            Copy {day} to all days
          </button>
        </span>
      </div>

      {modal && <DeliverySlotModal slot={modal.slot} day={day} defaultFee={defaultFee} overlaps={overlaps} onClose={() => setModal(null)} onSave={save} />}
    </div>
  )
}
