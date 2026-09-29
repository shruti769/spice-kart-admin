import { useState } from 'react'
import { Modal } from '../components/content/ui'
import { FONT, MUTED, btnPrimary, btnSecondary, errorText, inputStyle, labelStyle, selectStyle } from '../components/content/styles'
import { suspendCustomer, unsuspendCustomer } from '../lib/customers'
import { customerName } from '../lib/orders'

const REASONS = ['Payment disputes', 'Suspected fraud', 'Abusive behaviour', 'Repeated failed deliveries', 'Other']

/**
 * Suspends a customer (they can't place orders until reinstated) or, when already suspended, reinstates them.
 * Props: `customer` (customer_stats row), `onClose`, `onDone`, `flash`.
 */
export default function SuspendCustomerModal({ customer, onClose, onDone, flash }) {
  if (!customer || !onClose) return null
  return <SuspendForm key={customer.id} customer={customer} onClose={onClose} onDone={onDone} flash={flash} />
}

function SuspendForm({ customer, onClose, onDone, flash }) {
  const reinstate = Boolean(customer.suspended_at)
  const [reason, setReason] = useState(REASONS[0])
  const [details, setDetails] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const name = customerName(customer)
  const needsDetails = reason === 'Other' && !details.trim()

  const confirm = async () => {
    if (busy || (!reinstate && needsDetails)) return
    setBusy(true)
    setError('')
    try {
      if (reinstate) await unsuspendCustomer(customer.id)
      else await suspendCustomer(customer.id, reason === 'Other' ? details : [reason, details.trim()].filter(Boolean).join(' · '))
      flash?.(reinstate ? `${name} reinstated · they can order again` : `${name} suspended · they can’t place new orders`)
      onDone?.()
      onClose()
    } catch (e) {
      setError(e.message)
      setBusy(false)
    }
  }

  const tone = reinstate ? ['#F1F9DF', '#0B3D1F'] : ['#FBF1DE', '#8A6100']
  return (
    <Modal
      width={440}
      busy={busy}
      onClose={onClose}
      title={(
        <span style={{ display: 'flex', alignItems: 'flex-start', gap: '11px' }}>
          <span style={{ width: '34px', height: '34px', borderRadius: '9px', background: tone[0], display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
            <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
              <rect x="4.6" y="8.6" width="10.8" height="8" rx="2" stroke={tone[1]} strokeWidth="1.5" />
              <path d={reinstate ? 'M7.2 8.6V6.8a2.8 2.8 0 015.4-1' : 'M7.2 8.6V6.8a2.8 2.8 0 015.6 0v1.8'} stroke={tone[1]} strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </span>
          <span style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '0' }}>
            <span>{reinstate ? `Reinstate ${name}?` : `Suspend ${name}?`}</span>
            <span style={{ font: `400 11.5px/1.55 ${FONT}`, color: MUTED }}>
              {reinstate
                ? 'They’ll be able to place orders in the app again straight away.'
                : 'They won’t be able to place new orders until reinstated. Open orders are unaffected.'}
            </span>
          </span>
        </span>
      )}
      footer={(
        <span style={{ marginLeft: 'auto', display: 'flex', gap: '9px' }}>
          <button type="button" onClick={onClose} disabled={busy} style={btnSecondary}>Cancel</button>
          <button type="button" onClick={confirm} disabled={busy || (!reinstate && needsDetails)} style={{ ...btnPrimary, background: reinstate ? '#0B3D1F' : '#A93826', opacity: busy || (!reinstate && needsDetails) ? 0.5 : 1 }}>
            {busy ? 'Saving…' : reinstate ? 'Reinstate account' : 'Suspend account'}
          </button>
        </span>
      )}
    >
      {reinstate ? (
        <span style={{ display: 'flex', flexDirection: 'column', gap: '6px', padding: '10px 11px', borderRadius: '8px', background: '#F6F7F4', border: '1px solid #E4E7E2' }}>
          <span style={labelStyle}>Suspended {new Date(customer.suspended_at).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          <span style={{ font: `400 12px/1.5 ${FONT}`, color: '#4A564E' }}>{customer.suspended_reason || 'No reason recorded'}</span>
        </span>
      ) : (
        <>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={labelStyle}>Reason</span>
            <select value={reason} onChange={(e) => setReason(e.target.value)} disabled={busy} style={selectStyle}>
              {REASONS.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={labelStyle}>{reason === 'Other' ? 'Details' : 'Details (optional)'}</span>
            <textarea value={details} onChange={(e) => setDetails(e.target.value)} disabled={busy} maxLength={250} rows={3} placeholder="Visible to admins only" style={{ ...inputStyle, height: 'auto', padding: '9px 11px', font: `400 12px/1.5 ${FONT}`, resize: 'vertical' }} />
          </label>
        </>
      )}
      {error && <span style={{ ...errorText, font: `500 12px/1.4 ${FONT}` }}>{error}</span>}
    </Modal>
  )
}
