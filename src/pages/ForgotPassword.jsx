import { useState } from 'react'
import imgSpiceKartLogo from '../assets/images/spice-kart-logo.png'
import { fetchIsAdmin } from '../lib/adminAuth'
import { nextSignInStep } from '../lib/businessSettings'
import { authLinkType, isSupabaseConfigured, supabase } from '../lib/supabase'

const RULES = [
  ['At least 12 characters', (p) => p.length >= 12],
  ['One uppercase letter', (p) => /[A-Z]/.test(p)],
  ['One number', (p) => /\d/.test(p)],
]

// v.passwordMode: 'request' = email a reset link · 'set' = opened from an invite / reset email.
export default function ForgotPassword({ v }) {
  const setting = v.passwordMode === 'set'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [pending, setPending] = useState(false)
  const [sent, setSent] = useState(false)

  const sendReset = async () => {
    if (pending) return
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) return v.authError('Enter your email to get a reset link')
    if (!isSupabaseConfigured) return v.authError('Supabase is not configured')
    setPending(true)
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: `${window.location.origin}/` })
    setPending(false)
    if (error) return v.authError(error.message)
    // Same message whether or not the email has an account (don't reveal who's staff).
    setSent(true)
  }

  const savePassword = async () => {
    if (pending) return
    if (!RULES.every(([, ok]) => ok(password))) return v.authError('Use at least 12 characters with an uppercase letter and a number')
    if (password !== confirm) return v.authError('The passwords don’t match')
    setPending(true)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) throw new Error('This link has expired · ask for a new one')
      const { error } = await supabase.auth.updateUser({ password })
      if (error) throw error
      window.history.replaceState(null, '', window.location.pathname)
      if (!(await fetchIsAdmin(session.user.id))) {
        await supabase.auth.signOut()
        throw new Error('Password saved, but this account isn’t an admin')
      }
      const step = await nextSignInStep()
      if (step.blocked) {
        await supabase.auth.signOut()
        throw new Error(step.blocked)
      }
      if (step === 'mfa' || step === 'enroll') return v.startTwoFactor(step, session.user.email)
      v.signedIn(session.user.email)
    } catch (e) {
      v.authError(e?.message || 'Couldn’t save your password')
      setPending(false)
    }
  }

  return (
    <>
      <div style={{ position: "absolute", inset: "0", zIndex: "60", display: "flex", background: "#fff" }}>
        <div style={{ flex: "1", minWidth: "0", background: "linear-gradient(150deg,#0B3D1F 0%,#14572A 52%,#1F7135 100%)", padding: "44px", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
          <span style={{ position: "absolute", right: "-90px", top: "-90px", width: "320px", height: "320px", borderRadius: "160px", background: "rgba(139,224,0,.1)", display: "block" }} />
          <span style={{ position: "absolute", right: "60px", bottom: "-60px", width: "180px", height: "180px", borderRadius: "90px", background: "rgba(139,224,0,.07)", display: "block" }} />
          <span style={{ display: "flex", alignItems: "center", gap: "11px", position: "relative" }}>
            <img src={imgSpiceKartLogo} alt="Spice Kart" style={{ width: "38px", height: "38px", borderRadius: "10px" }} />
            <span style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
              <span style={{ font: "700 16px/1.2 Inter,system-ui,sans-serif", color: "#fff", whiteSpace: "nowrap" }}>Spice Kart</span>
              <span style={{ font: "500 10px/1.2 Inter,system-ui,sans-serif", color: "rgba(255,255,255,.5)", letterSpacing: ".6px", whiteSpace: "nowrap" }}>OPERATIONS CONSOLE</span>
            </span>
          </span>
          <span style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "14px", position: "relative", maxWidth: "420px" }}>
            <span style={{ font: "700 30px/1.25 Inter,system-ui", color: "#fff", letterSpacing: "-.6px" }}>Run the whole grocery operation from one place.</span>
            <span style={{ font: "400 13px/1.7 Inter,system-ui,sans-serif", color: "rgba(255,255,255,.66)" }}>
              Orders, inventory, delivery, promotions and payments — live across Melbourne, Sydney and Brisbane metro.
            </span>
          </span>
        </div>
        <div style={{ width: "460px", flex: "none", display: "flex", flexDirection: "column", justifyContent: "center", padding: "44px 48px", gap: "18px" }}>
          <button onClick={async () => { if (setting) { await supabase.auth.signOut(); window.history.replaceState(null, '', window.location.pathname) } v.nav_login() }} style={{ display: "flex", alignItems: "center", gap: "6px", border: "0", background: "transparent", font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#17693A", cursor: "pointer", padding: "0", whiteSpace: "nowrap", alignSelf: "flex-start" }}>
            ← Back to sign in
          </button>
          <span style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
            <span style={{ font: "700 22px/1.2 Inter,system-ui,sans-serif", color: "#17201A" }}>{setting ? (authLinkType === 'invite' ? 'Welcome · set your password' : 'Choose a new password') : 'Reset your password'}</span>
            <span style={{ font: "400 12.5px/1.6 Inter,system-ui,sans-serif", color: "#7C8A81" }}>
              {setting
                ? 'You’ll use it with your email to sign in to the Spice Kart console.'
                : 'We’ll email a secure link to set a new password. It only works once and expires after a while.'}
            </span>
          </span>
          {setting ? <>
          {[['NEW PASSWORD', password, setPassword], ['CONFIRM PASSWORD', confirm, setConfirm]].map(([label, value, set], i) => (
            <span key={label} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>{label}</span>
              <input className="sk-input" type="password" autoComplete="new-password" autoFocus={i === 0} value={value} onChange={(e) => set(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && savePassword()}
                style={{ height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", width: "100%", boxSizing: "border-box", outline: "none" }} />
            </span>
          ))}
          <button onClick={savePassword} disabled={pending} style={{ opacity: pending ? 0.75 : 1, height: "44px", border: "0", borderRadius: "9px", background: "#0B3D1F", color: "#fff", font: "700 13.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", boxShadow: "0 6px 16px rgba(11,61,31,.2)" }}>
            {pending ? 'Saving…' : 'Save password & continue'}
          </button>
          </> : <>
          <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
              WORK EMAIL
            </span>
            <input
              className="sk-input"
              type="email"
              autoComplete="username"
              autoFocus
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendReset()}
              style={{ height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", width: "100%", boxSizing: "border-box", outline: "none" }}
            />
          </span>
          <button onClick={sendReset} disabled={pending} style={{ opacity: pending ? 0.75 : 1, height: "44px", border: "0", borderRadius: "9px", background: "#0B3D1F", color: "#fff", font: "700 13.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", boxShadow: "0 6px 16px rgba(11,61,31,.2)" }}>
            {pending ? 'Sending…' : 'Send reset link'}
          </button>
          {sent && <span style={{ display: "flex", alignItems: "center", gap: "9px", padding: "11px 12px", borderRadius: "9px", background: "#E9F6E3", border: "1px solid #CBE7BF" }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
              <rect x="2.8" y="4.6" width="14.4" height="10.8" rx="2" stroke="#0B6B33" strokeWidth="1.5" />
              <path d="M3.4 6l6.6 4.6L16.6 6" stroke="#0B6B33" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
            <span style={{ font: "500 11px/1.45 Inter,system-ui,sans-serif", color: "#0B5A2A" }}>If that email belongs to a staff account, a reset link is on its way. Check your inbox and spam folder.</span>
          </span>}
          </>}
          <span style={{ display: "flex", flexDirection: "column", gap: "9px", paddingTop: "6px", borderTop: "1px solid #EFF1ED" }}>
            <span style={{ font: "600 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A" }}>New password requirements</span>
            {RULES.map(([label, ok]) => {
              const met = setting && ok(password)
              return (
                <span key={label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <svg width="13" height="13" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke={met ? "#17693A" : "#C9CEC6"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: met ? "#17693A" : "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{label}</span>
                </span>
              )
            })}
          </span>
        </div>
      </div>
    </>
  )
}
