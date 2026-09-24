import { useState } from 'react'
import imgSpiceKartLogo from '../assets/images/spice-kart-logo.png'

const inputStyle = { height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", width: "100%", boxSizing: "border-box", outline: "none" }

export default function Login({ v }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)

  // Dummy sign-in: any non-empty email and password continue to the 2FA step.
  const submit = () => {
    if (!email.trim() || !password) return v.authError('Enter your email and password to sign in')
    v.signIn(email.trim())
  }
  const submitOnEnter = (e) => {
    if (e.key === 'Enter') submit()
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
          <span style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
            <span style={{ font: "700 22px/1.2 Inter,system-ui,sans-serif", color: "#17201A" }}>Sign in</span>
            <span style={{ font: "400 12.5px/1.6 Inter,system-ui,sans-serif", color: "#7C8A81" }}>Use your Spice Kart staff account to access the operations console.</span>
          </span>
          <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
              EMAIL ADDRESS
            </span>
            <input
              className="sk-input"
              type="email"
              autoComplete="username"
              autoFocus
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={submitOnEnter}
              style={inputStyle}
            />
          </span>
          <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
              PASSWORD
            </span>
            <input
              className="sk-input"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={submitOnEnter}
              style={inputStyle}
            />
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "9px" }}>
            <button
              type="button"
              role="checkbox"
              aria-checked={remember}
              aria-label="Remember me for 30 days"
              onClick={() => setRemember((r) => !r)}
              style={{ width: "18px", height: "18px", borderRadius: "5px", background: remember ? "#8BE000" : "#fff", border: remember ? "0" : "1px solid #C9CEC6", padding: "0", display: "flex", alignItems: "center", justifyContent: "center", flex: "none", cursor: "pointer" }}
            >
              {remember && (
                <svg width="12" height="12" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#0B3D1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
            <span onClick={() => setRemember((r) => !r)} style={{ font: "500 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", cursor: "pointer" }}>
              Remember me for 30 days
            </span>
            <button onClick={v.nav_forgot} style={{ marginLeft: "auto", border: "0", background: "transparent", font: "600 12px/1.2 Inter,system-ui,sans-serif", color: "#17693A", cursor: "pointer", whiteSpace: "nowrap", padding: "0" }}>
              Forgot password?
            </button>
          </span>
          <button className="hv2" onClick={submit} style={{ height: "44px", border: "0", borderRadius: "9px", background: "#0B3D1F", color: "#fff", font: "700 13.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", boxShadow: "0 6px 16px rgba(11,61,31,.2)" }}>
            Sign in
          </button>
          <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ flex: "1", height: "1px", background: "#E4E7E2", display: "block" }} />
            <span style={{ font: "500 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>or</span>
            <span style={{ flex: "1", height: "1px", background: "#E4E7E2", display: "block" }} />
          </span>
          <button onClick={v.signIn} style={{ height: "42px", border: "1px solid #E4E7E2", borderRadius: "9px", background: "#fff", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "9px" }}>
            <svg width="15" height="15" viewBox="0 0 18 18" fill="none">
              <path d="M9 7.4v3.1h4.3c-.2 1-1.2 3-4.3 3a4.5 4.5 0 010-9c1.3 0 2.2.6 2.7 1l2.1-2A7.4 7.4 0 009 1.5a7.5 7.5 0 100 15c4.3 0 7.2-3 7.2-7.3 0-.6 0-1-.1-1.4H9z" fill="#3F3F3B" />
            </svg>
            {"Continue with Google SSO "}
          </button>
          <span style={{ display: "flex", alignItems: "center", gap: "9px", padding: "11px 12px", borderRadius: "9px", background: "#F6F7F4", border: "1px solid #E4E7E2", marginTop: "4px" }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
              <rect x="4.6" y="8.6" width="10.8" height="8" rx="2" stroke="#17693A" strokeWidth="1.5" />
              <path d="M7.2 8.6V6.8a2.8 2.8 0 015.6 0v1.8" stroke="#17693A" strokeWidth="1.5" />
            </svg>
            <span style={{ font: "500 11px/1.45 Inter,system-ui,sans-serif", color: "#4A564E" }}>Two-factor authentication is required for all admin accounts.</span>
          </span>
          <span style={{ font: "400 10.5px/1.6 Inter,system-ui,sans-serif", color: "#7C8A81", marginTop: "auto" }}>
            Spice Kart Pty Ltd · ABN 41 998 220 117. Access is logged and monitored. Contact it@spicekart.com.au for help.
          </span>
        </div>
      </div>
    </>
  )
}
