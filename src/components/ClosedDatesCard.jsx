import { useState } from 'react'
import { addClosedDate, removeClosedDate, useClosedDates } from '../lib/delivery'
import { fmtDate, todayISO } from '../lib/slotDates'

const FONT = 'Inter,system-ui,sans-serif'
const INK = '#17201A'
const MUTED = '#7C8A81'
const BORDER = '#E4E7E2'

const inputStyle = { height: '36px', padding: '0 11px', border: `1px solid ${BORDER}`, borderRadius: '9px', font: `500 12.5px/1 ${FONT}`, color: INK, background: '#fff', minWidth: 0 }
const buttonStyle = { height: '36px', padding: '0 14px', border: `1px solid ${BORDER}`, borderRadius: '9px', font: `600 12.5px/1 ${FONT}`, color: INK, background: '#fff', cursor: 'pointer', whiteSpace: 'nowrap' }

/** Dates with no delivery at all, such as public holidays. The app hides them and the server refuses orders for them. */
export default function ClosedDatesCard({ v, ...rest }) {
  const { data: dates, status, error } = useClosedDates()
  const [date, setDate] = useState('')
  const [reason, setReason] = useState('')
  const [busy, setBusy] = useState(false)
  const today = todayISO()
  const upcoming = dates.filter((d) => d.date >= today)

  const run = async (action, done) => {
    setBusy(true)
    try {
      await action()
      v.flash?.(done)
      return true
    } catch (e) {
      v.flash?.(e.message)
      return false
    } finally {
      setBusy(false)
    }
  }

  const add = async () => {
    if (!date || busy) return
    if (await run(() => addClosedDate(date, reason), `Delivery closed on ${fmtDate(date)}`)) {
      setDate('')
      setReason('')
    }
  }

  return (
    <div {...rest} style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px', border: `1px solid ${BORDER}`, borderRadius: '12px', background: '#fff' }}>
      <span style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
        <span style={{ font: `700 14px/1.3 ${FONT}`, color: INK }}>Closed dates</span>
        <span style={{ font: `400 11.5px/1.4 ${FONT}`, color: MUTED }}>No express or scheduled delivery on these days, such as public holidays</span>
      </span>
      <span className="r-stack-sm" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <input type="date" aria-label="Date to close" value={date} min={today} onChange={(e) => setDate(e.target.value)} style={inputStyle} />
        <input aria-label="Reason" value={reason} placeholder="Reason (optional)" maxLength={80} onChange={(e) => setReason(e.target.value)} style={{ ...inputStyle, flex: 1 }} />
        <button type="button" disabled={!date || busy} onClick={add} style={{ ...buttonStyle, opacity: !date || busy ? 0.5 : 1 }}>Close this date</button>
      </span>
      {status === 'error' && <span style={{ font: `400 12px/1.4 ${FONT}`, color: '#B3261E' }}>{error}</span>}
      {status === 'ready' && !upcoming.length && <span style={{ font: `400 12px/1.4 ${FONT}`, color: MUTED }}>No closed dates coming up</span>}
      {upcoming.map((d) => (
        <span key={d.date} style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingTop: '10px', borderTop: '1px solid #EFF1ED' }}>
          <span style={{ flex: 1, minWidth: 0, font: `500 12.5px/1.3 ${FONT}`, color: INK }}>
            {fmtDate(d.date, true)}
            {d.reason ? <span style={{ color: MUTED }}> · {d.reason}</span> : null}
            {d.closed_slot_ids?.length ? <span style={{ color: MUTED }}> · {d.closed_slot_ids.length} window{d.closed_slot_ids.length === 1 ? '' : 's'} only</span> : null}
          </span>
          <button type="button" disabled={busy} onClick={() => run(() => removeClosedDate(d.date), `Delivery reopened on ${fmtDate(d.date)}`)} style={buttonStyle}>Reopen</button>
        </span>
      ))}
    </div>
  )
}
