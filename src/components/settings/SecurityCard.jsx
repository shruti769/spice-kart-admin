import { useCallback, useEffect, useState } from 'react'
import { TIMEOUTS, listTotpFactors, removeTotp } from '../../lib/businessSettings'
import { BORDER, DANGER, FONT, INK, MUTED, selectStyle } from '../content/styles'
import { CardTitle, ToggleRow } from './BusinessCards'
import TotpSetup from './TotpSetup'

const btn = { display: 'flex', alignItems: 'center', gap: '7px', height: '34px', padding: '0 12px', border: `1px solid ${BORDER}`, borderRadius: '8px', background: '#fff', color: INK, font: `600 12.5px/1.2 ${FONT}`, cursor: 'pointer', whiteSpace: 'nowrap' }

/** Settings → Security. Toggles save with "Save settings"; 2FA set-up and the buttons act straight away. */
export default function SecurityCard({ v, form, set, disabled, dirty }) {
  const [factors, setFactors] = useState(null)
  const [settingUp, setSettingUp] = useState(false)

  const loadFactors = useCallback(() => {
    listTotpFactors().then(setFactors).catch(() => setFactors([]))
  }, [])
  useEffect(() => {
    loadFactors()
  }, [loadFactors])

  const verified = (factors ?? []).filter((f) => f.status === 'verified')
  const remove = async () => {
    if (!window.confirm('Turn off two-factor for your account? You’ll only need your password to sign in.')) return
    try {
      for (const f of verified) await removeTotp(f.id)
      v.flash('Two-factor turned off for your account')
      loadFactors()
    } catch (e) {
      v.flash(e.message)
    }
  }

  return (
    <div data-section="security" style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '10px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
      <span style={{ paddingBottom: '6px' }}><CardTitle title="Security" dirty={dirty} /></span>

      <span style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '11px 0', borderBottom: '1px solid #EFF1ED' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
          <span style={{ display: 'flex', flexDirection: 'column', gap: '3px', flex: '1' }}>
            <span style={{ font: `500 12.5px/1.2 ${FONT}`, color: INK }}>Two-factor on your account</span>
            <span style={{ font: `400 11px/1.4 ${FONT}`, color: verified.length ? '#0B6B33' : MUTED }}>
              {factors == null ? 'Checking…' : verified.length ? 'On · a code from your authenticator app is asked at sign-in' : 'Off · only your password is needed'}
            </span>
          </span>
          {factors != null && (verified.length
            ? <button type="button" className="hv1" onClick={remove} style={{ ...btn, color: DANGER, borderColor: '#F0D5CF' }}>Turn off</button>
            : !settingUp && <button type="button" className="hv1" onClick={() => setSettingUp(true)} style={btn}>Set up</button>)}
        </span>
        {settingUp && <TotpSetup onCancel={() => setSettingUp(false)} onDone={() => { setSettingUp(false); loadFactors(); v.flash('Two-factor is on for your account') }} />}
      </span>

      <ToggleRow
        title="Require two-factor for all admins"
        sub="Admins without a verified authenticator can’t read or change anything until they set it up at sign-in. Turn it on for your own account first."
        on={form.require_2fa}
        disabled={disabled}
        onChange={(on) => set({ require_2fa: on })}
      />
      <ToggleRow
        title="Single sign-on (Google)"
        sub="Shows “Continue with Google” on the admin sign-in page. Also turn on Google in Supabase → Authentication → Sign In / Providers. Only accounts in the admins list get in."
        on={form.allow_google_sso}
        disabled={disabled}
        onChange={(on) => set({ allow_google_sso: on })}
      />
      <span className="r-wrap" style={{ display: 'flex', alignItems: 'center', gap: '11px', padding: '11px 0', borderBottom: '1px solid #EFF1ED' }}>
        <span style={{ display: 'flex', flexDirection: 'column', gap: '3px', flex: '1' }}>
          <span style={{ font: `500 12.5px/1.2 ${FONT}`, color: INK }}>Session timeout</span>
          <span style={{ font: `400 11px/1.4 ${FONT}`, color: MUTED }}>Signs an admin out after this long without using the console</span>
        </span>
        <select value={form.session_timeout_minutes} disabled={disabled} onChange={(e) => set({ session_timeout_minutes: Number(e.target.value) })} style={{ ...selectStyle, width: '150px' }}>
          {TIMEOUTS.map(([m, l]) => <option key={m} value={m}>{l}</option>)}
        </select>
      </span>

      <span className="r-wrap" style={{ display: 'flex', alignItems: 'center', gap: '9px', paddingTop: '12px' }}>
        <button type="button" className="hv1" onClick={v.openPassword} style={btn}>
          <svg width="15" height="15" viewBox="0 0 20 20" fill="none"><rect x="4.6" y="8.6" width="10.8" height="8" rx="2" stroke="#4A564E" strokeWidth="1.5" /><path d="M7.2 8.6V6.8a2.8 2.8 0 015.6 0v1.8" stroke="#4A564E" strokeWidth="1.5" /></svg>
          Change password
        </button>
        <button type="button" className="hv1" onClick={v.openSessions} style={btn}>View login history</button>
      </span>
    </div>
  )
}
