import { useState } from 'react'
import { Modal } from '../components/content/ui'
import { FONT, MUTED, btnPrimary, btnSecondary, errorText, hintText, inputStyle, labelStyle } from '../components/content/styles'
import { notifyCustomer } from '../lib/customers'
import { customerName } from '../lib/orders'

const TITLE_MAX = 65
const BODY_MAX = 178

/**
 * Sends one customer a notification (app inbox, plus a push when they've opted in to push).
 * Props: `customer` (customer_stats row + push_opt_in), `onClose`, `flash`.
 */
export default function NotifyCustomerModal({ customer, onClose, flash }) {
  if (!customer || !onClose) return null
  return <NotifyForm key={customer.id} customer={customer} onClose={onClose} flash={flash} />
}

function NotifyForm({ customer, onClose, flash }) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [tried, setTried] = useState(false)
  const name = customerName(customer)
  const titleErr = !title.trim() ? 'Enter a title' : ''

  const send = async () => {
    setTried(true)
    if (titleErr || busy) return
    setBusy(true)
    setError('')
    try {
      await notifyCustomer(customer.id, title, body)
      flash?.(customer.push_opt_in === false ? `Sent to ${name}’s app inbox` : `Notification sent to ${name}`)
      onClose()
    } catch (e) {
      setError(e.message)
      setBusy(false)
    }
  }

  const counter = (n, max) => <span style={{ ...hintText, marginLeft: 'auto' }}>{n}/{max}</span>

  return (
    <Modal
      width={480}
      busy={busy}
      onClose={onClose}
      title={(
        <span style={{ display: 'flex', alignItems: 'flex-start', gap: '11px' }}>
          <span style={{ width: '34px', height: '34px', borderRadius: '9px', background: '#F1F9DF', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
            <svg width="17" height="17" viewBox="0 0 20 20" fill="none"><path d="M5.2 8.4a4.8 4.8 0 019.6 0v3.4l1.4 2.2H3.8l1.4-2.2V8.4z" stroke="#0B3D1F" strokeWidth="1.5" strokeLinejoin="round" /><path d="M8.3 16.2a1.8 1.8 0 003.4 0" stroke="#0B3D1F" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </span>
          <span style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '0' }}>
            <span>Send notification</span>
            <span style={{ font: `400 11.5px/1.55 ${FONT}`, color: MUTED }}>To {name} only · it lands in their app inbox straight away.</span>
          </span>
        </span>
      )}
      footer={(
        <span style={{ marginLeft: 'auto', display: 'flex', gap: '9px' }}>
          <button type="button" onClick={onClose} disabled={busy} style={btnSecondary}>Cancel</button>
          <button type="button" onClick={send} disabled={busy} style={{ ...btnPrimary, opacity: busy ? 0.6 : 1 }}>{busy ? 'Sending…' : 'Send notification'}</button>
        </span>
      )}
    >
      {customer.push_opt_in === false && (
        <span style={{ padding: '10px 11px', borderRadius: '8px', background: '#FBF1DE', border: '1px solid #F1E0BC', font: `400 11.5px/1.5 ${FONT}`, color: '#8A6100' }}>
          {name} has turned off push notifications, so this won’t buzz their phone · they’ll see it in the app’s inbox.
        </span>
      )}
      <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <span style={{ display: 'flex', alignItems: 'center' }}><span style={labelStyle}>Title</span>{counter(title.length, TITLE_MAX)}</span>
        <input autoFocus value={title} onChange={(e) => setTitle(e.target.value)} maxLength={TITLE_MAX} disabled={busy} placeholder="e.g. Your refund is on its way" style={{ ...inputStyle, ...(tried && titleErr ? { borderColor: '#B3402F' } : null) }} />
        {tried && titleErr && <span style={errorText}>{titleErr}</span>}
      </label>
      <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <span style={{ display: 'flex', alignItems: 'center' }}><span style={labelStyle}>Message</span>{counter(body.length, BODY_MAX)}</span>
        <textarea value={body} onChange={(e) => setBody(e.target.value)} maxLength={BODY_MAX} disabled={busy} rows={3} placeholder="Optional" style={{ ...inputStyle, height: 'auto', padding: '9px 11px', font: `400 12px/1.5 ${FONT}`, resize: 'vertical' }} />
      </label>
      {error && <span style={{ ...errorText, font: `500 12px/1.4 ${FONT}` }}>{error}</span>}
    </Modal>
  )
}
