export default function ChangePasswordModal({ v }) {
  return (
    <>
      <div onClick={v.closeModal} style={{ position: "absolute", inset: "0", zIndex: "90", background: "rgba(14,22,16,.45)", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px" }}>
        <div style={{ width: "440px", maxWidth: "100%", background: "#fff", borderRadius: "14px", boxShadow: "0 26px 60px rgba(10,18,12,.3)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "16px 18px 14px", display: "flex", alignItems: "flex-start", gap: "11px", borderBottom: "1px solid #EFF1ED" }}>
            <span style={{ width: "34px", height: "34px", borderRadius: "9px", background: "#F1F9DF", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
              <svg width="17" height="17" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                <rect x="4.6" y="8.6" width="10.8" height="8" rx="2" stroke="#0B3D1F" strokeWidth="1.5" />
                <path d="M7.2 8.6V6.8a2.8 2.8 0 015.6 0v1.8" stroke="#0B3D1F" strokeWidth="1.5" />
              </svg>
            </span>
            <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0" }}>
              <span style={{ font: "700 15px/1.2 Inter,system-ui,sans-serif", color: "#17201A" }}>Change your password</span>
              <span style={{ font: "400 11.5px/1.55 Inter,system-ui,sans-serif", color: "#7C8A81" }}>
                At least 12 characters with one uppercase and one number. You will be signed out of other sessions.
              </span>
            </span>
          </div>
          <div style={{ padding: "15px 18px", display: "flex", flexDirection: "column", gap: "11px" }}>
            <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                CURRENT PASSWORD
              </span>
              <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                ••••••••••••
              </span>
            </span>
            <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                NEW PASSWORD
              </span>
              <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                ••••••••••••••
              </span>
            </span>
            <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                CONFIRM NEW PASSWORD
              </span>
              <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                ••••••••••••••
              </span>
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ flex: "1", height: "6px", borderRadius: "3px", background: "#EFF1ED", overflow: "hidden", display: "block" }}>
                <span style={{ display: "block", width: "86%", height: "100%", background: "#8BE000", borderRadius: "3px" }} />
              </span>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", whiteSpace: "nowrap" }}>Strong</span>
            </span>
          </div>
          <div style={{ padding: "13px 18px 16px", display: "flex", alignItems: "center", gap: "9px", borderTop: "1px solid #EFF1ED", background: "#F6F7F4" }}>
            <span style={{ marginLeft: "auto", display: "flex", gap: "9px" }}>
              <button onClick={v.closeModal} style={{ height: "36px", padding: "0 14px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                Cancel
              </button>
              <button onClick={v.confirmModal} style={{ height: "36px", padding: "0 15px", border: "0", borderRadius: "8px", background: "#0B3D1F", color: "#fff", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
                Change password
              </button>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
