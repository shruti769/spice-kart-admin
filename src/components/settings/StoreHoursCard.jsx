import { useState } from 'react'
import { updateBusinessSettings } from '../../lib/businessSettings'
import { BORDER, DANGER, FONT, INK, MUTED, btnPrimary, btnSecondary, errorText, hintText, iconBtn, inputStyle, labelStyle, withError } from '../content/styles'
import { Modal, PencilIcon, TrashIcon } from '../content/ui'

const DAYS = [['Mon', 'Monday'], ['Tue', 'Tuesday'], ['Wed', 'Wednesday'], ['Thu', 'Thursday'], ['Fri', 'Friday'], ['Sat', 'Saturday'], ['Sun', 'Sunday']]

/** "07:00" → "7:00 AM" */
const fmt = (t) => {
  const [h, m] = t.split(':').map(Number)
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`
}
const byOpen = (a, b) => a.open.localeCompare(b.open)
const todayMelbourne = () => new Date().toLocaleDateString('en-CA', { timeZone: 'Australia/Melbourne' })
/** 'YYYY-MM-DD' → 'Mon' … 'Sun' */
const weekdayOf = (iso) => {
  const [y, m, d] = iso.split('-').map(Number)
  return DAYS[(new Date(y, m - 1, d).getDay() + 6) % 7][0]
}
const longDate = (iso) => {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })
}
const overlaps = (a, b) => a.open < b.close && b.open < a.close

/** Add / edit one opening window. `editing`: { day, index } or null (add: the picked date gives the weekday). */
function HoursModal({ hours, editing, onClose, onSaved, v }) {
  const current = editing ? hours[editing.day][editing.index] : null
  const [date, setDate] = useState(editing ? '' : todayMelbourne())
  const [open, setOpen] = useState(current?.open ?? '09:00')
  const [close, setClose] = useState(current?.close ?? '17:00')
  const [errors, setErrors] = useState({})
  const [busy, setBusy] = useState(false)

  const save = async () => {
    const e = {}
    // The date's weekday; hours repeat on that weekday every week.
    const day = editing ? editing.day : date ? weekdayOf(date) : null
    if (!day) e.date = 'Pick a date'
    if (!open || !close) e.time = 'Pick both times'
    else if (close <= open) e.time = 'Closing time must be after opening time'
    const win = { open, close }
    if (!e.time) {
      const clash = day && (hours[day] ?? []).find((w, i) => !(editing && i === editing.index) && overlaps(w, win))
      if (clash) e.time = `Overlaps ${fmt(clash.open)} – ${fmt(clash.close)} already set for ${DAYS.find(([k]) => k === day)[1]}`
    }
    setErrors(e)
    if (Object.keys(e).length) return
    const next = { ...hours }
    next[day] = editing
      ? next[day].map((w, i) => (i === editing.index ? win : w)).sort(byOpen)
      : [...(next[day] ?? []), win].sort(byOpen)
    setBusy(true)
    try {
      await updateBusinessSettings({ hours: next })
      v.flash(`${DAYS.find(([k]) => k === day)[1]} hours ${editing ? 'updated' : 'added'} · ${fmt(open)} – ${fmt(close)}`)
      onSaved()
      onClose()
    } catch (err) {
      setBusy(false)
      setErrors({ time: err.message })
    }
  }

  return (
    <Modal
      title={editing ? `Edit ${DAYS.find(([k]) => k === editing.day)[1]} hours` : 'Add store hours'}
      sub="Melbourne time. Express orders are only accepted inside these hours."
      width={480}
      busy={busy}
      onClose={onClose}
      footer={(
        <span style={{ marginLeft: 'auto', display: 'flex', gap: '9px' }}>
          <button type="button" onClick={onClose} disabled={busy} style={btnSecondary}>Cancel</button>
          <button type="button" onClick={save} disabled={busy} style={{ ...btnPrimary, opacity: busy ? 0.7 : 1 }}>{busy ? 'Saving…' : 'Save hours'}</button>
        </span>
      )}
    >
      {!editing && (
        <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={labelStyle}>Date</span>
          <input type="date" value={date} min={todayMelbourne()} onChange={(e) => { setDate(e.target.value); setErrors((x) => ({ ...x, date: undefined })) }} style={withError(inputStyle, errors.date)} />
          {errors.date
            ? <span style={errorText}>{errors.date}</span>
            : <span style={hintText}>{date ? `${longDate(date)} · saved as ${DAYS.find(([k]) => k === weekdayOf(date))[1]} hours, every week` : 'The day is taken from the date'}</span>}
        </label>
      )}
      <div className="r-stack-sm" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={labelStyle}>Opens</span>
          <input type="time" step="900" value={open} onChange={(e) => { setOpen(e.target.value); setErrors((x) => ({ ...x, time: undefined })) }} style={withError(inputStyle, errors.time)} />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={labelStyle}>Closes</span>
          <input type="time" step="900" value={close} onChange={(e) => { setClose(e.target.value); setErrors((x) => ({ ...x, time: undefined })) }} style={withError(inputStyle, errors.time)} />
        </label>
      </div>
      {errors.time ? <span style={errorText}>{errors.time}</span> : <span style={hintText}>Need a lunch break? Add a second slot for the same day afterwards.</span>}
    </Modal>
  )
}

/** Settings → Store hours: opening windows per weekday, saved straight away. */
export default function StoreHoursCard({ v, hours: saved, openNow, disabled, onSaved }) {
  const hours = saved ?? {}
  const [modal, setModal] = useState(null) // null | { editing: null | { day, index } }
  const [busy, setBusy] = useState(false)
  const empty = !Object.values(hours).some((list) => list?.length)

  const remove = async (day, index) => {
    const w = hours[day][index]
    if (!window.confirm(`Remove ${fmt(w.open)} – ${fmt(w.close)} on ${DAYS.find(([k]) => k === day)[1]}?`)) return
    const next = { ...hours, [day]: hours[day].filter((_, i) => i !== index) }
    if (!next[day].length) delete next[day]
    setBusy(true)
    try {
      await updateBusinessSettings({ hours: next })
      v.flash(`${day} hours removed`)
      onSaved()
    } catch (e) {
      v.flash(e.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div data-section="hours" style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '10px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <span className="r-wrap" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span className="r-full" style={{ display: 'flex', flexDirection: 'column', gap: '5px', flex: '1' }}>
          <span style={{ font: `600 13.5px/1.2 ${FONT}`, color: INK }}>Store hours</span>
          <span style={{ font: `400 11.5px/1.4 ${FONT}`, color: MUTED }}>Melbourne time. Express orders are only accepted while the store is open; scheduled slots still work.</span>
        </span>
        {openNow != null && !empty && (
          <span style={{ font: `600 12px/1.2 ${FONT}`, color: openNow ? '#0B6B33' : DANGER, whiteSpace: 'nowrap' }}>● {openNow ? 'Open now' : 'Closed now'}</span>
        )}
        <button type="button" className="hv2" onClick={() => setModal({ editing: null })} disabled={disabled} style={{ ...btnPrimary, flex: 'none' }}>
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M10 4.5v11M4.5 10h11" stroke="#8BE000" strokeWidth="1.8" strokeLinecap="round" /></svg>
          Add store hours
        </button>
      </span>

      {empty ? (
        <span style={{ padding: '22px 16px', border: `1px dashed ${BORDER}`, borderRadius: '9px', textAlign: 'center', font: `400 12.5px/1.5 ${FONT}`, color: MUTED }}>
          No store hours yet, so the store counts as open all the time. Add hours to only take express orders while you’re open.
        </span>
      ) : (
        <div style={{ border: `1px solid ${BORDER}`, borderRadius: '9px', overflow: 'hidden', opacity: busy ? 0.6 : 1 }}>
          {DAYS.map(([k, name], i) => {
            const list = hours[k] ?? []
            return (
              <div key={k} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '11px 14px', borderTop: i ? '1px solid #EFF1ED' : '0' }}>
                <span style={{ width: '100px', flex: 'none', font: `600 12.5px/1.2 ${FONT}`, color: INK }}>{name}</span>
                <span style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', flex: '1' }}>
                  {list.length ? list.map((w, j) => (
                    <span key={`${w.open}-${w.close}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 5px 4px 12px', border: '1px solid #C7E88A', borderRadius: '8px', background: '#F7FCEE' }}>
                      <span style={{ font: `600 12.5px/1.2 ${FONT}`, color: '#0B3D1F', whiteSpace: 'nowrap' }}>{fmt(w.open)} – {fmt(w.close)}</span>
                      <button type="button" className="hv1" aria-label={`Edit ${name} ${fmt(w.open)}`} disabled={busy || disabled} onClick={() => setModal({ editing: { day: k, index: j } })} style={{ ...iconBtn, width: '26px', height: '26px' }}><PencilIcon /></button>
                      <button type="button" className="hv1" aria-label={`Remove ${name} ${fmt(w.open)}`} disabled={busy || disabled} onClick={() => remove(k, j)} style={{ ...iconBtn, width: '26px', height: '26px', borderColor: '#F0D5CF' }}><TrashIcon /></button>
                    </span>
                  )) : <span style={{ font: `500 12.5px/1.2 ${FONT}`, color: MUTED }}>Closed</span>}
                </span>
              </div>
            )
          })}
        </div>
      )}

      {modal && <HoursModal v={v} hours={hours} editing={modal.editing} onClose={() => setModal(null)} onSaved={onSaved} />}
    </div>
  )
}
