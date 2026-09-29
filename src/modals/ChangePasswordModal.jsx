import { useState } from 'react'
import { changePassword } from '../lib/businessSettings'
import { FONT, MUTED, btnPrimary, btnSecondary, errorText, hintText, inputStyle, labelStyle, withError } from '../components/content/styles'
import { Modal } from '../components/content/ui'

/** 0–4 from length and character variety. */
function strength(pw) {
  let s = 0
  if (pw.length >= 12) s++
  if (pw.length >= 16) s++
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++
  if (/\d/.test(pw) && /[^A-Za-z0-9]/.test(pw)) s++
  return s
}
const LEVELS = [['Too weak', '#B3402F'], ['Weak', '#B3402F'], ['Okay', '#8A6100'], ['Strong', '#0B6B33'], ['Very strong', '#0B6B33']]

export default function ChangePasswordModal({ v }) {
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [confirm, setConfirm] = useState('')
  const [errors, setErrors] = useState({})
  const [busy, setBusy] = useState(false)
  const score = strength(next)
  const [label, color] = LEVELS[score]

  const submit = async () => {
    if (busy) return
    const e = {}
    if (!current) e.current = 'Enter your current password'
    if (next.length < 12) e.next = 'At least 12 characters'
    else if (!/[A-Z]/.test(next) || !/\d/.test(next)) e.next = 'Include an uppercase letter and a number'
    else if (next === current) e.next = 'Choose a different password'
    if (confirm !== next) e.confirm = 'Passwords don’t match'
    setErrors(e)
    if (Object.keys(e).length) return
    setBusy(true)
    try {
      await changePassword(current, next)
      v.flash('Password changed · other sessions signed out')
      v.closeModal()
    } catch (err) {
      setBusy(false)
      setErrors(/current password/i.test(err.message) ? { current: err.message } : { next: err.message })
    }
  }

  const field = (key, lbl, value, set, hint) => (
    <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <span style={labelStyle}>{lbl}</span>
      <input type="password" value={value} autoComplete={key === 'current' ? 'current-password' : 'new-password'} onChange={(e) => { set(e.target.value); setErrors((x) => ({ ...x, [key]: undefined })) }} onKeyDown={(e) => { if (e.key === 'Enter') submit() }} style={withError(inputStyle, errors[key])} />
      {errors[key] ? <span style={errorText}>{errors[key]}</span> : hint && <span style={hintText}>{hint}</span>}
    </label>
  )

  return (
    <Modal
      title="Change your password"
      sub="At least 12 characters with one uppercase letter and one number. You’ll be signed out everywhere else."
      width={440}
      busy={busy}
      onClose={v.closeModal}
      footer={(
        <span style={{ marginLeft: 'auto', display: 'flex', gap: '9px' }}>
          <button type="button" onClick={v.closeModal} disabled={busy} style={btnSecondary}>Cancel</button>
          <button type="button" onClick={submit} disabled={busy} style={{ ...btnPrimary, opacity: busy ? 0.7 : 1 }}>{busy ? 'Changing…' : 'Change password'}</button>
        </span>
      )}
    >
      {field('current', 'Current password', current, setCurrent)}
      {field('next', 'New password', next, setNext)}
      {next && (
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '-4px' }}>
          <span style={{ flex: '1', height: '6px', borderRadius: '3px', background: '#EFF1ED', overflow: 'hidden' }}>
            <span style={{ display: 'block', width: `${(score / 4) * 100}%`, height: '100%', background: color, borderRadius: '3px', transition: 'width .15s' }} />
          </span>
          <span style={{ font: `600 10.5px/1.2 ${FONT}`, color, whiteSpace: 'nowrap' }}>{label}</span>
        </span>
      )}
      {field('confirm', 'Confirm new password', confirm, setConfirm)}
      <span style={{ font: `400 11px/1.4 ${FONT}`, color: MUTED }}>Your current session stays signed in.</span>
    </Modal>
  )
}
