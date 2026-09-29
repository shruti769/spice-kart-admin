import { useCallback, useEffect, useState } from 'react'
import { fetchMySessions, signOutOtherSessions } from '../lib/businessSettings'
import { BORDER, FONT, INK, MUTED, btnPrimary, btnSecondary } from '../components/content/styles'
import { Modal } from '../components/content/ui'

/** "Chrome on macOS" from a user-agent string. */
function device(ua) {
  if (!ua) return 'Unknown device'
  const browser = /Edg\//.test(ua) ? 'Edge' : /Chrome\//.test(ua) ? 'Chrome' : /Firefox\//.test(ua) ? 'Firefox' : /Safari\//.test(ua) ? 'Safari' : 'Browser'
  const os = /iPhone|iPad/.test(ua) ? 'iOS' : /Android/.test(ua) ? 'Android' : /Mac OS X/.test(ua) ? 'macOS' : /Windows/.test(ua) ? 'Windows' : /Linux/.test(ua) ? 'Linux' : ''
  return os ? `${browser} on ${os}` : browser
}
const when = (iso) => (iso ? new Date(iso).toLocaleString('en-AU', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' }) : '—')

export default function SessionsModal({ v }) {
  const [rows, setRows] = useState(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const load = useCallback(() => {
    fetchMySessions().then(setRows).catch((e) => setError(e.message))
  }, [])
  useEffect(() => { load() }, [load])

  const others = (rows ?? []).filter((r) => !r.current).length
  const signOutOthers = async () => {
    setBusy(true)
    try {
      await signOutOtherSessions()
      v.flash(`Signed out of ${others} other session${others === 1 ? '' : 's'}`)
      load()
    } catch (e) {
      v.flash(e.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <Modal
      title="Login history"
      sub="Where your account is signed in. Sessions end when they sign out or expire."
      width={560}
      busy={busy}
      onClose={v.closeModal}
      footer={(
        <span style={{ marginLeft: 'auto', display: 'flex', gap: '9px' }}>
          <button type="button" onClick={v.closeModal} disabled={busy} style={btnSecondary}>Close</button>
          <button type="button" onClick={signOutOthers} disabled={busy || !others} style={{ ...btnPrimary, opacity: busy || !others ? 0.5 : 1 }}>
            {busy ? 'Signing out…' : `Sign out other sessions${others ? ` (${others})` : ''}`}
          </button>
        </span>
      )}
    >
      {error && <span style={{ font: `400 12.5px/1.5 ${FONT}`, color: '#B3402F' }}>{error}</span>}
      {!error && rows == null && <span style={{ font: `400 12.5px/1.5 ${FONT}`, color: MUTED }}>Loading…</span>}
      {rows?.length === 0 && <span style={{ font: `400 12.5px/1.5 ${FONT}`, color: MUTED }}>No sessions found.</span>}
      {rows?.length > 0 && (
        <div style={{ border: `1px solid ${BORDER}`, borderRadius: '9px', overflow: 'hidden' }}>
          {rows.map((r, i) => (
            <div key={r.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '11px 14px', borderTop: i ? '1px solid #EFF1ED' : '0', background: r.current ? '#F7FCEE' : '#fff' }}>
              <span style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: '1', minWidth: '0' }}>
                <span style={{ font: `600 12.5px/1.2 ${FONT}`, color: INK }}>
                  {device(r.user_agent)}
                  {r.current && <span style={{ marginLeft: '8px', font: `600 10.5px/1.2 ${FONT}`, color: '#0B6B33', background: '#E9F6E3', padding: '3px 7px', borderRadius: '5px' }}>This device</span>}
                </span>
                <span style={{ font: `400 11.5px/1.3 ${FONT}`, color: MUTED }}>
                  {r.ip || 'Unknown IP'} · signed in {when(r.created_at)}{r.aal === 'aal2' ? ' · with 2FA' : ''}
                </span>
              </span>
              <span style={{ font: `400 11.5px/1.3 ${FONT}`, color: MUTED, textAlign: 'right' }}>Last active<br />{when(r.updated_at)}</span>
            </div>
          ))}
        </div>
      )}
    </Modal>
  )
}
