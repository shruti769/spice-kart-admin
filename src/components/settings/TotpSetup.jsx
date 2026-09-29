import { useEffect, useState } from 'react'
import { startTotpEnrollment, verifyTotp } from '../../lib/businessSettings'
import { BORDER, FONT, INK, MUTED, errorText, inputStyle } from '../content/styles'

/** Authenticator-app enrolment: QR code → 6-digit code → verified. Calls `onDone()` when verified. */
export default function TotpSetup({ onDone, onCancel }) {
  const [enroll, setEnroll] = useState(null) // { id, qr, secret }
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    let cancelled = false
    startTotpEnrollment()
      .then((e) => { if (!cancelled) setEnroll(e) })
      .catch((e) => { if (!cancelled) setError(e.message) })
    return () => { cancelled = true }
  }, [])

  const verify = async () => {
    if (!/^\d{6}$/.test(code)) return setError('Enter the 6-digit code from your app')
    setBusy(true)
    setError('')
    try {
      await verifyTotp(enroll.id, code)
      onDone()
    } catch (e) {
      setError(e.message)
      setBusy(false)
    }
  }

  return (
    <span style={{ display: 'flex', gap: '16px', padding: '14px', border: `1px solid ${BORDER}`, borderRadius: '10px', background: '#FAFBF8' }}>
      <span style={{ width: '150px', height: '150px', flex: 'none', background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {enroll ? <img src={enroll.qr} alt="QR code for your authenticator app" style={{ width: '136px', height: '136px' }} /> : <span style={{ font: `400 11px/1.3 ${FONT}`, color: MUTED }}>{error ? '—' : 'Loading…'}</span>}
      </span>
      <span style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '0', flex: '1' }}>
        <span style={{ font: `600 12.5px/1.3 ${FONT}`, color: INK }}>1. Scan with Google Authenticator, Microsoft Authenticator or 1Password</span>
        {enroll && <span style={{ font: `400 11px/1.4 ${FONT}`, color: MUTED, wordBreak: 'break-all' }}>Can’t scan? Enter this key: <b style={{ color: INK }}>{enroll.secret}</b></span>}
        <span style={{ font: `600 12.5px/1.3 ${FONT}`, color: INK, paddingTop: '4px' }}>2. Enter the 6-digit code it shows</span>
        <span style={{ display: 'flex', gap: '8px' }}>
          <input value={code} inputMode="numeric" autoComplete="one-time-code" maxLength={6} placeholder="123456" disabled={!enroll || busy}
            onChange={(e) => { setCode(e.target.value.replace(/\D/g, '')); setError('') }} onKeyDown={(e) => { if (e.key === 'Enter') verify() }}
            style={{ ...inputStyle, width: '130px', letterSpacing: '3px', font: `600 14px/1.2 ${FONT}` }} />
          <button type="button" onClick={verify} disabled={!enroll || busy} style={{ height: '36px', padding: '0 14px', border: '0', borderRadius: '8px', background: '#0B3D1F', color: '#fff', font: `600 12.5px/1.2 ${FONT}`, cursor: 'pointer', opacity: busy ? 0.7 : 1 }}>
            {busy ? 'Checking…' : 'Verify & turn on'}
          </button>
          {onCancel && <button type="button" onClick={onCancel} disabled={busy} style={{ height: '36px', padding: '0 12px', border: `1px solid ${BORDER}`, borderRadius: '8px', background: '#fff', font: `600 12.5px/1.2 ${FONT}`, color: INK, cursor: 'pointer' }}>Cancel</button>}
        </span>
        {error && <span style={errorText}>{error}</span>}
      </span>
    </span>
  )
}
