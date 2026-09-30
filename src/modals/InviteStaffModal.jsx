import { useEffect, useState } from 'react'
import { ROLES, inviteStaff } from '../lib/staff'

const FONT = 'Inter,system-ui,sans-serif'
const INK = '#17201A'
const MUTED = '#7C8A81'
const BORDER = '#E4E7E2'
const DANGER = '#B3402F'
const label = { font: `600 10.5px/1.2 ${FONT}`, letterSpacing: '.4px', color: MUTED, textTransform: 'uppercase', whiteSpace: 'nowrap' }
const input = { height: '36px', padding: '0 11px', border: `1px solid ${BORDER}`, borderRadius: '8px', background: '#fff', font: `500 12.5px/1.2 ${FONT}`, color: INK, outline: 'none', width: '100%', minWidth: '0', boxSizing: 'border-box' }
const btn = { height: '36px', padding: '0 14px', border: `1px solid ${BORDER}`, borderRadius: '8px', background: '#fff', font: `600 12.5px/1.2 ${FONT}`, color: INK, cursor: 'pointer', whiteSpace: 'nowrap' }
const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

/** Invite a team member through the invite-admin Edge Function. Props: `onClose()`, `onDone(message)`. */
export default function InviteStaffModal(props) {
  if (!props.onClose) return null
  return <InviteDialog {...props} />
}

function InviteDialog({ onClose, onDone }) {
  const [form, setForm] = useState({ name: '', email: '', role: 'Customer Support', department: '' })
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [tried, setTried] = useState(false)
  const set = (k) => (e) => { setForm((f) => ({ ...f, [k]: e.target.value })); setError('') }
  const close = () => { if (!busy) onClose() }

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && !busy) onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [busy, onClose])

  const email = form.email.trim().toLowerCase()
  const emailError = !email ? 'Enter their work email' : !EMAIL.test(email) ? 'Enter a valid email' : ''
  const nameError = form.name.trim() ? '' : 'Enter their name'

  const submit = async (e) => {
    e?.preventDefault()
    setTried(true)
    if (busy || emailError || nameError) return
    setBusy(true)
    setError('')
    try {
      const res = await inviteStaff({ email, name: form.name.trim(), role: form.role, department: form.department.trim() })
      onDone?.(res?.status === 'active' ? `${email} already had an account · added to the team` : `Invite sent to ${email}`)
      onClose()
    } catch (err) {
      setError(err.message)
      setBusy(false)
    }
  }

  const bad = (err) => (tried && err ? { borderColor: DANGER } : null)

  return (
    <div className="sk-overlay" onClick={close} style={{ position: 'fixed', inset: '0', zIndex: '90', background: 'rgba(14,22,16,.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
      <form className="sk-modal" onSubmit={submit} onClick={(e) => e.stopPropagation()} style={{ width: '500px', maxWidth: '100%', maxHeight: '100%', background: '#fff', borderRadius: '14px', boxShadow: '0 26px 60px rgba(10,18,12,.3)', overflow: 'hidden', display: 'flex', flexDirection: 'column', margin: '0' }}>
        <div style={{ padding: '16px 18px 14px', display: 'flex', alignItems: 'flex-start', gap: '11px', borderBottom: '1px solid #EFF1ED' }}>
          <span style={{ width: '34px', height: '34px', borderRadius: '9px', background: '#F1F9DF', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
            <svg width="17" height="17" viewBox="0 0 20 20" fill="none" style={{ flex: 'none' }}>
              <circle cx="10" cy="7.4" r="3" stroke="#0B3D1F" strokeWidth="1.5" />
              <path d="M4.6 16.5c.9-3 3-4.3 5.4-4.3s4.5 1.3 5.4 4.3" stroke="#0B3D1F" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </span>
          <span style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '0' }}>
            <span style={{ font: `700 15px/1.2 ${FONT}`, color: INK }}>Invite a team member</span>
            <span style={{ font: `400 11.5px/1.55 ${FONT}`, color: MUTED }}>
              New emails get an invite link to set a password; an email that already has an account is added straight away. Two-factor setup is required on their first sign-in.
            </span>
          </span>
        </div>
        <div className="ad-scroll" style={{ padding: '15px 18px', display: 'flex', flexDirection: 'column', gap: '11px', overflowY: 'auto' }}>
          <div className="r-stack-sm" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '11px' }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: '0' }}>
              <span style={label}>Full name</span>
              <input autoFocus value={form.name} onChange={set('name')} maxLength={80} disabled={busy} placeholder="e.g. Priya Raman" style={{ ...input, ...bad(nameError) }} />
              {tried && nameError && <span style={{ font: `400 11px/1.3 ${FONT}`, color: DANGER }}>{nameError}</span>}
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: '0' }}>
              <span style={label}>Work email</span>
              <input type="email" value={form.email} onChange={set('email')} disabled={busy} placeholder="name@company.com.au" style={{ ...input, ...bad(emailError) }} />
              {tried && emailError && <span style={{ font: `400 11px/1.3 ${FONT}`, color: DANGER }}>{emailError}</span>}
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: '0' }}>
              <span style={label}>Role</span>
              <select value={form.role} onChange={set('role')} disabled={busy} style={{ ...input, cursor: 'pointer' }}>
                {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: '0' }}>
              <span style={label}>Department</span>
              <input value={form.department} onChange={set('department')} maxLength={60} disabled={busy} placeholder="e.g. Operations" style={input} />
            </label>
          </div>
          <span style={{ padding: '10px 11px', borderRadius: '8px', background: '#F6F7F4', border: `1px solid ${BORDER}`, font: `400 11.5px/1.5 ${FONT}`, color: '#4A564E' }}>
            Roles are labels for now · every active team member can use the whole admin until per-page permissions are added.
          </span>
          {error && <span style={{ font: `400 11.5px/1.4 ${FONT}`, color: DANGER }}>{error}</span>}
        </div>
        <div style={{ padding: '13px 18px 16px', display: 'flex', alignItems: 'center', gap: '9px', borderTop: '1px solid #EFF1ED', background: '#F6F7F4' }}>
          <span style={{ marginLeft: 'auto', display: 'flex', gap: '9px' }}>
            <button type="button" onClick={close} disabled={busy} style={btn}>Cancel</button>
            <button type="submit" disabled={busy} style={{ ...btn, padding: '0 15px', border: '0', background: '#0B3D1F', color: '#fff', opacity: busy ? 0.6 : 1, cursor: busy ? 'default' : 'pointer' }}>
              {busy ? 'Sending…' : 'Send invite'}
            </button>
          </span>
        </div>
      </form>
    </div>
  )
}
