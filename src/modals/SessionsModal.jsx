export default function SessionsModal({ v }) {
  return (
    <>
      <div onClick={v.closeModal} style={{ position: "absolute", inset: "0", zIndex: "90", background: "rgba(14,22,16,.45)", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px" }}>
        <div style={{ width: "500px", maxWidth: "100%", background: "#fff", borderRadius: "14px", boxShadow: "0 26px 60px rgba(10,18,12,.3)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "16px 18px 14px", display: "flex", alignItems: "flex-start", gap: "11px", borderBottom: "1px solid #EFF1ED" }}>
            <span style={{ width: "34px", height: "34px", borderRadius: "9px", background: "#E8F1F8", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
              <svg width="17" height="17" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                <circle cx="10" cy="10" r="7.2" stroke="#1F5C8B" strokeWidth="1.5" />
                <path d="M10 5.8V10l3 1.8" stroke="#1F5C8B" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
            <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0" }}>
              <span style={{ font: "700 15px/1.2 Inter,system-ui,sans-serif", color: "#17201A" }}>Login history</span>
              <span style={{ font: "400 11.5px/1.55 Inter,system-ui,sans-serif", color: "#7C8A81" }}>
                Last 30 days for {v.authEmail}. Anything unfamiliar should be reported to IT.
              </span>
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "11px", padding: "12px 16px", borderBottom: "1px solid #EFF1ED" }}>
              <span style={{ width: "30px", height: "30px", borderRadius: "8px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
                <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <rect x="4.6" y="8.6" width="10.8" height="8" rx="2" stroke="#4A564E" strokeWidth="1.5" />
                  <path d="M7.2 8.6V6.8a2.8 2.8 0 015.6 0v1.8" stroke="#4A564E" strokeWidth="1.5" />
                </svg>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "3px", flex: "1", minWidth: "0" }}>
                <span style={{ font: "600 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Chrome · macOS</span>
                <span style={{ font: "400 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Melbourne VIC · 203.0.113.41</span>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "4px", alignItems: "flex-end", flex: "none" }}>
                <span style={{ font: "400 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Now · current session</span>
                <span style={{ font: "600 9.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "4px 6px", borderRadius: "4px", whiteSpace: "nowrap" }}>
                  THIS DEVICE
                </span>
              </span>
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "11px", padding: "12px 16px", borderBottom: "1px solid #EFF1ED" }}>
              <span style={{ width: "30px", height: "30px", borderRadius: "8px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
                <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <rect x="4.6" y="8.6" width="10.8" height="8" rx="2" stroke="#4A564E" strokeWidth="1.5" />
                  <path d="M7.2 8.6V6.8a2.8 2.8 0 015.6 0v1.8" stroke="#4A564E" strokeWidth="1.5" />
                </svg>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "3px", flex: "1", minWidth: "0" }}>
                <span style={{ font: "600 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Chrome · macOS</span>
                <span style={{ font: "400 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Melbourne VIC · 203.0.113.41</span>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "4px", alignItems: "flex-end", flex: "none" }}>
                <span style={{ font: "400 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Today 8:02 AM</span>
              </span>
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "11px", padding: "12px 16px", borderBottom: "1px solid #EFF1ED" }}>
              <span style={{ width: "30px", height: "30px", borderRadius: "8px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
                <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <rect x="4.6" y="8.6" width="10.8" height="8" rx="2" stroke="#4A564E" strokeWidth="1.5" />
                  <path d="M7.2 8.6V6.8a2.8 2.8 0 015.6 0v1.8" stroke="#4A564E" strokeWidth="1.5" />
                </svg>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "3px", flex: "1", minWidth: "0" }}>
                <span style={{ font: "600 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Safari · iPhone</span>
                <span style={{ font: "400 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Melbourne VIC · 49.195.20.8</span>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "4px", alignItems: "flex-end", flex: "none" }}>
                <span style={{ font: "400 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Yesterday 6:41 PM</span>
              </span>
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "11px", padding: "12px 16px", borderBottom: "1px solid #EFF1ED" }}>
              <span style={{ width: "30px", height: "30px", borderRadius: "8px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
                <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <rect x="4.6" y="8.6" width="10.8" height="8" rx="2" stroke="#4A564E" strokeWidth="1.5" />
                  <path d="M7.2 8.6V6.8a2.8 2.8 0 015.6 0v1.8" stroke="#4A564E" strokeWidth="1.5" />
                </svg>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "3px", flex: "1", minWidth: "0" }}>
                <span style={{ font: "600 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Chrome · Windows</span>
                <span style={{ font: "400 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Sydney NSW · 139.130.4.5</span>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "4px", alignItems: "flex-end", flex: "none" }}>
                <span style={{ font: "400 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>19 Sep, 9:12 AM</span>
              </span>
            </span>
          </div>
          <div style={{ padding: "13px 18px 16px", display: "flex", alignItems: "center", gap: "9px", borderTop: "1px solid #EFF1ED", background: "#F6F7F4" }}>
            <button onClick={v.confirmModal} style={{ height: "36px", padding: "0 14px", border: "1px solid #EEDAD5", borderRadius: "8px", background: "#FDF7F5", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#A93826", cursor: "pointer", whiteSpace: "nowrap" }}>
              Sign out other sessions
            </button>
            <button onClick={v.closeModal} style={{ marginLeft: "auto", height: "36px", padding: "0 14px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer" }}>
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
