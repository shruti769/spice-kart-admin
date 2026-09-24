import { useRef, useState } from 'react'
import imgSpiceKartLogo from '../assets/images/spice-kart-logo.png'

const CODE_LENGTH = 6

export default function TwoFactor({ v }) {
  const [digits, setDigits] = useState(() => Array(CODE_LENGTH).fill(''))
  const boxes = useRef([])
  const focusBox = (i) => boxes.current[Math.max(0, Math.min(CODE_LENGTH - 1, i))]?.focus()

  // Dummy verification: any 6 digits sign the user in.
  const verify = () => {
    if (digits.some((d) => !d)) {
      focusBox(digits.findIndex((d) => !d))
      return v.authError('Enter the 6-digit code to continue')
    }
    v.verify2fa()
  }
  const typeDigit = (i, value) => {
    const d = value.replace(/\D/g, '').slice(-1)
    setDigits((prev) => prev.map((x, j) => (j === i ? d : x)))
    if (d) focusBox(i + 1)
  }
  const keyDown = (i, e) => {
    if (e.key === 'Enter') verify()
    else if (e.key === 'Backspace' && !digits[i]) focusBox(i - 1)
    else if (e.key === 'ArrowLeft') focusBox(i - 1)
    else if (e.key === 'ArrowRight') focusBox(i + 1)
  }
  const paste = (e) => {
    const code = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, CODE_LENGTH)
    if (!code) return
    e.preventDefault()
    setDigits(Array.from({ length: CODE_LENGTH }, (_, j) => code[j] || ''))
    focusBox(code.length)
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
          <button onClick={v.nav_login} style={{ display: "flex", alignItems: "center", gap: "6px", border: "0", background: "transparent", font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#17693A", cursor: "pointer", padding: "0", whiteSpace: "nowrap", alignSelf: "flex-start" }}>
            ← Back to sign in
          </button>
          <span style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
            <span style={{ font: "700 22px/1.2 Inter,system-ui,sans-serif", color: "#17201A" }}>Two-factor verification</span>
            <span style={{ font: "400 12.5px/1.6 Inter,system-ui,sans-serif", color: "#7C8A81" }}>
              Enter the 6-digit code from your authenticator app for {v.authEmail}.
            </span>
          </span>
          <span style={{ display: "flex", gap: "9px" }}>
            {digits.map((d, i) => (
              <input
                key={i}
                ref={(el) => (boxes.current[i] = el)}
                className="sk-otp"
                inputMode="numeric"
                autoComplete={i === 0 ? "one-time-code" : "off"}
                autoFocus={i === 0}
                maxLength={1}
                aria-label={`Digit ${i + 1}`}
                value={d}
                onChange={(e) => typeDigit(i, e.target.value)}
                onKeyDown={(e) => keyDown(i, e)}
                onPaste={paste}
                style={{ flex: "1", minWidth: "0", height: "52px", border: d ? "1px solid #C7E88A" : "1px solid #E4E7E2", background: d ? "#F7FCEE" : "#FAFAF8", borderRadius: "9px", textAlign: "center", font: "700 20px/1.2 Inter,system-ui,sans-serif", color: "#17201A", outline: "none", padding: "0", boxSizing: "border-box" }}
              />
            ))}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              Code expires in 0:42
            </span>
            <button onClick={v.recoveryCode} style={{ marginLeft: "auto", border: "0", background: "transparent", font: "600 12px/1.2 Inter,system-ui,sans-serif", color: "#17693A", cursor: "pointer", whiteSpace: "nowrap", padding: "0" }}>
              Use a recovery code
            </button>
          </span>
          <button onClick={verify} style={{ height: "44px", border: "0", borderRadius: "9px", background: "#0B3D1F", color: "#fff", font: "700 13.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", boxShadow: "0 6px 16px rgba(11,61,31,.2)" }}>
            Verify & continue
          </button>
          <span style={{ display: "flex", alignItems: "center", gap: "9px", padding: "11px 12px", borderRadius: "9px", background: "#F6F7F4", border: "1px solid #E4E7E2" }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
              <rect x="4.6" y="8.6" width="10.8" height="8" rx="2" stroke="#17693A" strokeWidth="1.5" />
              <path d="M7.2 8.6V6.8a2.8 2.8 0 015.6 0v1.8" stroke="#17693A" strokeWidth="1.5" />
            </svg>
            <span style={{ font: "500 11px/1.45 Inter,system-ui,sans-serif", color: "#4A564E" }}>Never share this code. Spice Kart staff will never ask for it.</span>
          </span>
        </div>
      </div>
    </>
  )
}
