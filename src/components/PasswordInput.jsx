import { useState } from 'react'

/** A password field with an eye button that shows / hides what's typed. */
export default function PasswordInput({ style, ...props }) {
  const [shown, setShown] = useState(false)
  return (
    <span style={{ position: "relative", display: "block", width: "100%" }}>
      <input {...props} type={shown ? "text" : "password"} style={{ ...style, paddingRight: "38px" }} />
      <button
        type="button"
        className="sk-pw-toggle"
        onClick={() => setShown((s) => !s)}
        onMouseDown={(e) => e.preventDefault()}
        aria-label={shown ? "Hide password" : "Show password"}
        aria-pressed={shown}
        title={shown ? "Hide password" : "Show password"}
      >
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
          <path d="M1.9 10s2.9-5.4 8.1-5.4 8.1 5.4 8.1 5.4-2.9 5.4-8.1 5.4S1.9 10 1.9 10z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
          {!shown && <path d="M3.5 3.5l13 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />}
        </svg>
      </button>
    </span>
  )
}
