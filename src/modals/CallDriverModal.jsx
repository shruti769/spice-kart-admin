export default function CallDriverModal({ v }) {
  return (
    <>
      <div onClick={v.closeModal} style={{ position: "absolute", inset: "0", zIndex: "90", background: "rgba(14,22,16,.45)", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px" }}>
        <div style={{ width: "470px", maxWidth: "100%", background: "#fff", borderRadius: "14px", boxShadow: "0 26px 60px rgba(10,18,12,.3)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "16px 18px 14px", display: "flex", alignItems: "flex-start", gap: "11px", borderBottom: "1px solid #EFF1ED" }}>
            <span style={{ width: "34px", height: "34px", borderRadius: "9px", background: "#F1F9DF", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
              <svg width="17" height="17" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                <path d="M4.3 3.4h2.9a.9.9 0 01.86.63l.83 2.6a.9.9 0 01-.36 1l-1.44.99a9.4 9.4 0 004.29 4.29l.99-1.44a.9.9 0 011-.36l2.6.83a.9.9 0 01.63.86v2.9a1 1 0 01-1.09 1A13 13 0 013.3 4.49a1 1 0 011-1.09z" stroke="#0B3D1F" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
            </span>
            <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0" }}>
              <span style={{ font: "700 15px/1.2 Inter,system-ui,sans-serif", color: "#17201A" }}>Call Michael Ryan</span>
              <span style={{ font: "400 11.5px/1.55 Inter,system-ui,sans-serif", color: "#7C8A81" }}>Driver #DR-1042 · Melbourne CBD · 2 active stops · on shift until 4:00 PM</span>
            </span>
          </div>
          <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: "13px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "12px", padding: "13px", borderRadius: "10px", background: "#F6F7F4", border: "1px solid #E4E7E2" }}>
              <span style={{ width: "44px", height: "44px", borderRadius: "12px", background: "#0B3D1F", display: "flex", alignItems: "center", justifyContent: "center", font: "700 15px/1.2 Inter,system-ui,sans-serif", color: "#8BE000", flex: "none" }}>
                MR
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0" }}>
                <span style={{ font: "700 14px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>+61 412 887 001</span>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Currently delivering #SK10482 · ETA 8 min</span>
              </span>
              <span style={{ marginLeft: "auto", font: "600 10px/1.2 Inter,system-ui,sans-serif", color: "#1F5C8B", background: "#E8F1F8", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", flex: "none" }}>
                DELIVERING
              </span>
            </span>
            <span style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                OR SEND A QUICK MESSAGE
              </span>
              <span style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
                <span style={{ font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", background: "#fff", border: "1px solid #E4E7E2", padding: "8px 10px", borderRadius: "7px", whiteSpace: "nowrap" }}>
                  Customer not home
                </span>
                <span style={{ font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", background: "#fff", border: "1px solid #E4E7E2", padding: "8px 10px", borderRadius: "7px", whiteSpace: "nowrap" }}>
                  Call the customer
                </span>
                <span style={{ font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", background: "#fff", border: "1px solid #E4E7E2", padding: "8px 10px", borderRadius: "7px", whiteSpace: "nowrap" }}>
                  Return to store
                </span>
                <span style={{ font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", background: "#fff", border: "1px solid #E4E7E2", padding: "8px 10px", borderRadius: "7px", whiteSpace: "nowrap" }}>
                  Running late?
                </span>
              </span>
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "9px", padding: "10px 11px", borderRadius: "8px", background: "#F7FAF2", border: "1px solid #E4EBD8" }}>
              <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                <path d="M3.4 5.6A1.8 1.8 0 015.2 3.8h9.6a1.8 1.8 0 011.8 1.8v5.6a1.8 1.8 0 01-1.8 1.8H8.4L4.6 16v-2.9h-.4a1.8 1.8 0 01-.8-1.5V5.6z" stroke="#0B7A32" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
              <span style={{ font: "500 11px/1.45 Inter,system-ui,sans-serif", color: "#3F5B43" }}>Calls are recorded for quality and route disputes.</span>
            </span>
          </div>
          <div style={{ padding: "13px 18px 16px", display: "flex", alignItems: "center", gap: "9px", borderTop: "1px solid #EFF1ED", background: "#F6F7F4" }}>
            <span style={{ marginLeft: "auto", display: "flex", gap: "9px" }}>
              <button onClick={v.closeModal} style={{ height: "36px", padding: "0 14px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                Close
              </button>
              <button onClick={v.confirmModal} style={{ height: "36px", padding: "0 15px", border: "0", borderRadius: "8px", background: "#0B3D1F", color: "#fff", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
                Call now
              </button>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
