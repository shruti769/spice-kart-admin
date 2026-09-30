import { useState } from 'react'
import { Modal } from '../components/content/ui'
import { FONT, MUTED, btnPrimary, btnSecondary, errorText, hintText, inputStyle, labelStyle, withError } from '../components/content/styles'
import { monthYear, parseMobile, updateCustomer } from '../lib/customers'
import { customerName } from '../lib/orders'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Edit a customer's name, email and mobile. Props: `customer` (customer_stats row), `onClose`, `onSaved`, `flash`. */
export default function EditCustomerModal({ customer, onClose, onSaved, flash }) {
  if (!customer || !onClose) return null
  return <EditCustomerForm key={customer.id} customer={customer} onClose={onClose} onSaved={onSaved} flash={flash} />
}

function EditCustomerForm({ customer, onClose, onSaved, flash }) {
  const [form, setForm] = useState(() => ({
    first_name: customer.first_name ?? '',
    last_name: customer.last_name ?? '',
    email: customer.email ?? '',
    mobile: customer.mobile ?? '',
  }))
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [tried, setTried] = useState(false)
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const mobile = parseMobile(form.mobile)
  const errs = {
    first_name: form.first_name.trim().length > 60 ? 'Up to 60 characters' : '',
    last_name: form.last_name.trim().length > 60 ? 'Up to 60 characters' : '',
    email: form.email.trim() && !EMAIL.test(form.email.trim()) ? 'Enter a valid email' : '',
    mobile: mobile === null ? 'Enter an Australian mobile, e.g. 0412 345 678' : '',
  }
  if (!form.first_name.trim() && !form.last_name.trim()) errs.first_name = 'Enter a name'
  const invalid = Object.values(errs).some(Boolean)

  const save = async () => {
    setTried(true)
    if (invalid || busy) return
    setBusy(true)
    setError('')
    try {
      await updateCustomer(customer.id, { ...form, mobile })
      flash?.('Customer details saved')
      onSaved?.()
      onClose()
    } catch (e) {
      setError(e.message)
      setBusy(false)
    }
  }

  const field = (k, label, props = {}) => (
    <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: '0' }}>
      <span style={labelStyle}>{label}</span>
      <input value={form[k]} onChange={set(k)} disabled={busy} style={withError(inputStyle, tried && errs[k])} {...props} />
      {tried && errs[k] && <span style={errorText}>{errs[k]}</span>}
    </label>
  )

  return (
    <Modal
      width={520}
      busy={busy}
      onClose={onClose}
      title={(
        <span style={{ display: 'flex', alignItems: 'flex-start', gap: '11px' }}>
          <span style={{ width: '34px', height: '34px', borderRadius: '9px', background: '#F1F9DF', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
            <svg width="17" height="17" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="7.4" r="3" stroke="#0B3D1F" strokeWidth="1.5" /><path d="M4.6 16.5c.9-3 3-4.3 5.4-4.3s4.5 1.3 5.4 4.3" stroke="#0B3D1F" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </span>
          <span style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '0' }}>
            <span>Edit customer</span>
            <span style={{ font: `400 11.5px/1.55 ${FONT}`, color: MUTED }}>
              {customerName(customer)} · customer since {monthYear(customer.created_at)}. Changes show in the app straight away.
            </span>
          </span>
        </span>
      )}
      footer={(
        <span style={{ marginLeft: 'auto', display: 'flex', gap: '9px' }}>
          <button type="button" onClick={onClose} disabled={busy} style={btnSecondary}>Cancel</button>
          <button type="button" onClick={save} disabled={busy} style={{ ...btnPrimary, opacity: busy ? 0.6 : 1 }}>{busy ? 'Saving…' : 'Save customer'}</button>
        </span>
      )}
    >
      <div className="r-stack-sm" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '11px' }}>
        {field('first_name', 'First name', { autoFocus: true, maxLength: 60 })}
        {field('last_name', 'Last name', { maxLength: 60 })}
        {field('email', 'Email', { type: 'email', maxLength: 254 })}
        {field('mobile', 'Mobile', { inputMode: 'tel', placeholder: '0412 345 678' })}
      </div>
      <span style={hintText}>This updates their profile only · it doesn’t change the email or number they sign in with.</span>
      {error && <span style={{ ...errorText, font: `500 12px/1.4 ${FONT}` }}>{error}</span>}
    </Modal>
  )
}
