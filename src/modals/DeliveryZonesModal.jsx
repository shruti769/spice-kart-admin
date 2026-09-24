export default function DeliveryZonesModal({ v }) {
  return (
    <>
      <div onClick={v.closeModal} style={{ position: "absolute", inset: "0", zIndex: "90", background: "rgba(14,22,16,.45)", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px" }}>
        <div style={{ width: "500px", maxWidth: "100%", background: "#fff", borderRadius: "14px", boxShadow: "0 26px 60px rgba(10,18,12,.3)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "16px 18px 14px", display: "flex", alignItems: "flex-start", gap: "11px", borderBottom: "1px solid #EFF1ED" }}>
            <span style={{ width: "34px", height: "34px", borderRadius: "9px", background: "#F1F9DF", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
              <svg width="17" height="17" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                <path d="M10 17.5s5.4-4.7 5.4-8.6A5.4 5.4 0 004.6 8.9c0 3.9 5.4 8.6 5.4 8.6z" stroke="#0B3D1F" strokeWidth="1.5" />
                <circle cx="10" cy="8.6" r="1.9" stroke="#0B3D1F" strokeWidth="1.5" />
              </svg>
            </span>
            <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0" }}>
              <span style={{ font: "700 15px/1.2 Inter,system-ui,sans-serif", color: "#17201A" }}>Delivery zones</span>
              <span style={{ font: "400 11.5px/1.55 Inter,system-ui,sans-serif", color: "#7C8A81" }}>
                Five active zones across Melbourne metro. Changing a radius affects express eligibility immediately.
              </span>
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "11px", padding: "12px 16px", borderBottom: "1px solid #EFF1ED" }}>
              <span style={{ width: "30px", height: "30px", borderRadius: "8px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
                <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <path d="M10 17.5s5.4-4.7 5.4-8.6A5.4 5.4 0 004.6 8.9c0 3.9 5.4 8.6 5.4 8.6z" stroke="#4A564E" strokeWidth="1.5" />
                  <circle cx="10" cy="8.6" r="1.9" stroke="#4A564E" strokeWidth="1.5" />
                </svg>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "3px", flex: "1", minWidth: "0" }}>
                <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Melbourne CBD</span>
                <span style={{ font: "400 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>8 km radius · 22 min avg</span>
              </span>
              <span style={{ font: "600 10px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", flex: "none" }}>
                Active
              </span>
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "11px", padding: "12px 16px", borderBottom: "1px solid #EFF1ED" }}>
              <span style={{ width: "30px", height: "30px", borderRadius: "8px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
                <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <path d="M10 17.5s5.4-4.7 5.4-8.6A5.4 5.4 0 004.6 8.9c0 3.9 5.4 8.6 5.4 8.6z" stroke="#4A564E" strokeWidth="1.5" />
                  <circle cx="10" cy="8.6" r="1.9" stroke="#4A564E" strokeWidth="1.5" />
                </svg>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "3px", flex: "1", minWidth: "0" }}>
                <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Fitzroy & Collingwood</span>
                <span style={{ font: "400 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>6 km radius · 25 min avg</span>
              </span>
              <span style={{ font: "600 10px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", flex: "none" }}>
                Active
              </span>
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "11px", padding: "12px 16px", borderBottom: "1px solid #EFF1ED" }}>
              <span style={{ width: "30px", height: "30px", borderRadius: "8px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
                <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <path d="M10 17.5s5.4-4.7 5.4-8.6A5.4 5.4 0 004.6 8.9c0 3.9 5.4 8.6 5.4 8.6z" stroke="#4A564E" strokeWidth="1.5" />
                  <circle cx="10" cy="8.6" r="1.9" stroke="#4A564E" strokeWidth="1.5" />
                </svg>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "3px", flex: "1", minWidth: "0" }}>
                <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Richmond</span>
                <span style={{ font: "400 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>7 km radius · 31 min avg</span>
              </span>
              <span style={{ font: "600 10px/1.2 Inter,system-ui,sans-serif", color: "#8A6100", background: "#FBF1DE", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", flex: "none" }}>
                Review
              </span>
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "11px", padding: "12px 16px", borderBottom: "1px solid #EFF1ED" }}>
              <span style={{ width: "30px", height: "30px", borderRadius: "8px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
                <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <path d="M10 17.5s5.4-4.7 5.4-8.6A5.4 5.4 0 004.6 8.9c0 3.9 5.4 8.6 5.4 8.6z" stroke="#4A564E" strokeWidth="1.5" />
                  <circle cx="10" cy="8.6" r="1.9" stroke="#4A564E" strokeWidth="1.5" />
                </svg>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "3px", flex: "1", minWidth: "0" }}>
                <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Carlton & Parkville</span>
                <span style={{ font: "400 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>6 km radius · 29 min avg</span>
              </span>
              <span style={{ font: "600 10px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", flex: "none" }}>
                Active
              </span>
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "11px", padding: "12px 16px", borderBottom: "1px solid #EFF1ED" }}>
              <span style={{ width: "30px", height: "30px", borderRadius: "8px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
                <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <path d="M10 17.5s5.4-4.7 5.4-8.6A5.4 5.4 0 004.6 8.9c0 3.9 5.4 8.6 5.4 8.6z" stroke="#4A564E" strokeWidth="1.5" />
                  <circle cx="10" cy="8.6" r="1.9" stroke="#4A564E" strokeWidth="1.5" />
                </svg>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "3px", flex: "1", minWidth: "0" }}>
                <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>South Yarra</span>
                <span style={{ font: "400 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>9 km radius · 26 min avg</span>
              </span>
              <span style={{ font: "600 10px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", flex: "none" }}>
                Active
              </span>
            </span>
          </div>
          <div style={{ padding: "13px 18px 16px", display: "flex", alignItems: "center", gap: "9px", borderTop: "1px solid #EFF1ED", background: "#F6F7F4" }}>
            <span style={{ marginLeft: "auto", display: "flex", gap: "9px" }}>
              <button onClick={v.closeModal} style={{ height: "36px", padding: "0 14px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                Close
              </button>
              <button onClick={v.confirmModal} style={{ height: "36px", padding: "0 15px", border: "0", borderRadius: "8px", background: "#0B3D1F", color: "#fff", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
                Save zones
              </button>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
