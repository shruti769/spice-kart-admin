import { useState } from 'react'
import { addPostcodes, parsePostcodes, removePostcode, setPostcodeActive, useDeliveryPostcodes } from '../lib/postcodes'

const FONT = 'Inter,system-ui,sans-serif'
const INK = '#17201A'
const MUTED = '#7C8A81'
const BORDER = '#E4E7E2'
const DANGER = '#B3402F'

const labelStyle = { font: `600 10.5px/1.2 ${FONT}`, letterSpacing: '.4px', color: MUTED, textTransform: 'uppercase', whiteSpace: 'nowrap' }
const input = { height: '36px', padding: '0 11px', border: `1px solid ${BORDER}`, borderRadius: '8px', background: '#fff', font: `500 12.5px/1.2 ${FONT}`, color: INK, outline: 'none', minWidth: 0 }
const btn = { height: '36px', padding: '0 14px', border: '0', borderRadius: '8px', background: '#1B5E30', color: '#fff', font: `600 12.5px/1 ${FONT}`, cursor: 'pointer', whiteSpace: 'nowrap' }

/**
 * Settings → Delivery area: the postcodes customers can order to. The customer app checks saved
 * addresses and checkout against the active ones; with none active, it delivers everywhere.
 */
export default function DeliveryPostcodesCard({ v, ...rest }) {
  const { data, status, error } = useDeliveryPostcodes()
  const [codes, setCodes] = useState('')
  const [suburb, setSuburb] = useState('')
  const [busy, setBusy] = useState(false)
  const active = data.filter((r) => r.active)

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

  const add = async (e) => {
    e.preventDefault()
    const { valid, invalid } = parsePostcodes(codes)
    if (invalid.length) return v.flash(`Not a 4-digit postcode: ${invalid.slice(0, 3).join(', ')}`)
    if (!valid.length) return v.flash('Enter one or more postcodes')
    setBusy(true)
    // A suburb name only makes sense for a single postcode.
    const ok = await run(
      () => addPostcodes(valid.map((postcode) => ({ postcode, suburb: valid.length === 1 ? suburb.trim() : '' }))),
      valid.length === 1 ? `Now delivering to ${valid[0]}` : `Now delivering to ${valid.length} postcodes`,
    )
    setBusy(false)
    if (ok) {
      setCodes('')
      setSuburb('')
    }
  }

  return (
    <div data-section="area" {...rest} style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '10px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '12px' }}>
        <span style={{ font: `600 13.5px/1.2 ${FONT}`, color: INK }}>Delivery area</span>
        <span style={{ font: `500 12px/1.2 ${FONT}`, color: MUTED }}>
          {active.length ? `${active.length} postcode${active.length === 1 ? '' : 's'} active` : 'Delivering everywhere'}
        </span>
      </div>
      <span style={{ font: `400 12px/1.5 ${FONT}`, color: MUTED }}>
        Customers can only save an address and order to these postcodes. While the list is empty, every postcode is accepted.
      </span>

      <form onSubmit={add} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.4fr) minmax(0,1fr) auto', gap: '10px', alignItems: 'end' }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={labelStyle}>Postcodes</span>
          <input value={codes} onChange={(e) => setCodes(e.target.value)} placeholder="3000, 3004, 3168" inputMode="numeric" style={input} />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={labelStyle}>Suburb (optional)</span>
          <input value={suburb} onChange={(e) => setSuburb(e.target.value)} placeholder="Melbourne" maxLength={60} disabled={parsePostcodes(codes).valid.length > 1} style={input} />
        </label>
        <button type="submit" disabled={busy} className="hv1" style={{ ...btn, opacity: busy ? 0.6 : 1 }}>
          {busy ? 'Adding…' : 'Add'}
        </button>
      </form>

      {status === 'error' && <span style={{ font: `500 12px/1.4 ${FONT}`, color: DANGER }}>{error}</span>}
      {status === 'loading' && <span style={{ font: `400 12px/1.4 ${FONT}`, color: MUTED }}>Loading postcodes…</span>}

      {data.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {data.map((r) => (
            <span
              key={r.postcode}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', height: '32px', padding: '0 6px 0 11px', border: `1px solid ${r.active ? '#CFE3C4' : BORDER}`, borderRadius: '16px', background: r.active ? '#F3F9EE' : '#F6F7F4', font: `500 12.5px/1 ${FONT}`, color: r.active ? INK : MUTED }}>
              <button
                type="button"
                title={r.active ? 'Pause deliveries to this postcode' : 'Resume deliveries to this postcode'}
                onClick={() => run(() => setPostcodeActive(r.postcode, !r.active), r.active ? `Paused ${r.postcode}` : `Delivering to ${r.postcode} again`)}
                style={{ border: '0', background: 'transparent', padding: '0', font: 'inherit', color: 'inherit', cursor: 'pointer', textDecoration: r.active ? 'none' : 'line-through' }}>
                <strong style={{ fontWeight: 600 }}>{r.postcode}</strong>
                {r.suburb && <span style={{ color: MUTED }}> · {r.suburb}</span>}
              </button>
              <button
                type="button"
                aria-label={`Remove ${r.postcode}`}
                onClick={() => run(() => removePostcode(r.postcode), `Removed ${r.postcode}`)}
                style={{ width: '20px', height: '20px', borderRadius: '10px', border: '0', background: 'transparent', color: MUTED, cursor: 'pointer', font: `500 14px/1 ${FONT}`, padding: '0' }}>
                ×
              </button>
            </span>
          ))}
        </div>
      )}
      {data.length > 0 && <span style={{ font: `400 11px/1.4 ${FONT}`, color: MUTED }}>Click a postcode to pause or resume it · × removes it.</span>}
    </div>
  )
}
