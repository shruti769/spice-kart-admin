export default function AssignDriverModal({ v }) {
  return (
    <>
      <div onClick={v.closeModal} style={{ position: "absolute", inset: "0", zIndex: "90", background: "rgba(14,22,16,.45)", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px" }}>
        <div style={{ width: "470px", maxWidth: "100%", background: "#fff", borderRadius: "14px", boxShadow: "0 26px 60px rgba(10,18,12,.3)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "16px 18px 14px", display: "flex", alignItems: "flex-start", gap: "11px", borderBottom: "1px solid #EFF1ED" }}>
            <span style={{ width: "34px", height: "34px", borderRadius: "9px", background: "#F1F9DF", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
              <svg width="17" height="17" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                <rect x="2.2" y="5.8" width="8.6" height="8" rx="1.4" stroke="#0B3D1F" strokeWidth="1.5" />
                <path d="M10.8 8.6h3.3a1.4 1.4 0 011.03.45l1.5 1.63a1.4 1.4 0 01.37.95v2.17h-6.2V8.6z" stroke="#0B3D1F" strokeWidth="1.5" strokeLinejoin="round" />
                <circle cx="6" cy="15.6" r="1.5" stroke="#0B3D1F" strokeWidth="1.5" />
                <circle cx="14" cy="15.6" r="1.5" stroke="#0B3D1F" strokeWidth="1.5" />
              </svg>
            </span>
            <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0" }}>
              <span style={{ font: "700 15px/1.2 Inter,system-ui,sans-serif", color: "#17201A" }}>Assign a driver</span>
              <span style={{ font: "400 11.5px/1.55 Inter,system-ui,sans-serif", color: "#7C8A81" }}>
                2 orders are waiting in Richmond. 18 drivers are available across Melbourne metro.
              </span>
            </span>
          </div>
          <div style={{ padding: "15px 18px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
              AVAILABLE DRIVERS
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "11px", padding: "11px", border: "1px solid #C7E88A", background: "#F7FCEE", borderRadius: "9px" }}>
              <span style={{ width: "16px", height: "16px", borderRadius: "8px", border: "2px solid #8BE000", background: "#8BE000", display: "block", flex: "none" }} />
              <span style={{ width: "30px", height: "30px", borderRadius: "8px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", flex: "none" }}>
                JP
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "3px", minWidth: "0" }}>
                <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Jay Patel</span>
                <span style={{ font: "400 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Richmond · 0 stops · 2.1 km away</span>
              </span>
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "11px", padding: "11px", border: "1px solid #E4E7E2", background: "#fff", borderRadius: "9px" }}>
              <span style={{ width: "16px", height: "16px", borderRadius: "8px", border: "2px solid #C9D0C8", background: "transparent", display: "block", flex: "none" }} />
              <span style={{ width: "30px", height: "30px", borderRadius: "8px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", flex: "none" }}>
                CB
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "3px", minWidth: "0" }}>
                <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Chloe Baker</span>
                <span style={{ font: "400 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Melbourne CBD · 0 stops · 4.8 km away</span>
              </span>
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "11px", padding: "11px", border: "1px solid #E4E7E2", background: "#fff", borderRadius: "9px" }}>
              <span style={{ width: "16px", height: "16px", borderRadius: "8px", border: "2px solid #C9D0C8", background: "transparent", display: "block", flex: "none" }} />
              <span style={{ width: "30px", height: "30px", borderRadius: "8px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", flex: "none" }}>
                NB
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "3px", minWidth: "0" }}>
                <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Noah Brooks</span>
                <span style={{ font: "400 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Fitzroy · 0 stops · 5.6 km away</span>
              </span>
            </span>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "11px", paddingTop: "3px" }}>
              <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                  ORDERS TO ASSIGN
                </span>
                <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  #SK10476, #SK10474
                </span>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                  PRIORITY
                </span>
                <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Delayed first
                </span>
              </span>
            </div>
          </div>
          <div style={{ padding: "13px 18px 16px", display: "flex", alignItems: "center", gap: "9px", borderTop: "1px solid #EFF1ED", background: "#F6F7F4" }}>
            <span style={{ marginLeft: "auto", display: "flex", gap: "9px" }}>
              <button onClick={v.closeModal} style={{ height: "36px", padding: "0 14px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                Cancel
              </button>
              <button onClick={v.confirmModal} style={{ height: "36px", padding: "0 15px", border: "0", borderRadius: "8px", background: "#0B3D1F", color: "#fff", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
                Assign 2 orders
              </button>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
