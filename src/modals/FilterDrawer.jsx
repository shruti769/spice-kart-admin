export default function FilterDrawer({ v }) {
  return (
    <>
      <div onClick={v.closeModal} style={{ position: "absolute", inset: "0", zIndex: "90", background: "rgba(14,22,16,.45)", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px" }}>
        <div style={{ width: "500px", maxWidth: "100%", background: "#fff", borderRadius: "14px", boxShadow: "0 26px 60px rgba(10,18,12,.3)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "16px 18px 14px", display: "flex", alignItems: "flex-start", gap: "11px", borderBottom: "1px solid #EFF1ED" }}>
            <span style={{ width: "34px", height: "34px", borderRadius: "9px", background: "#F1F9DF", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
              <svg width="17" height="17" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                <path d="M3 5.4h14M5.6 10h8.8M8.4 14.6h3.2" stroke="#0B3D1F" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </span>
            <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0" }}>
              <span style={{ font: "700 15px/1.2 Inter,system-ui,sans-serif", color: "#17201A" }}>Filters</span>
              <span style={{ font: "400 11.5px/1.55 Inter,system-ui,sans-serif", color: "#7C8A81" }}>Narrow this list. Active filters show as chips above the table.</span>
            </span>
          </div>
          <div style={{ padding: "15px 18px", display: "flex", flexDirection: "column", gap: "13px" }}>
            <span style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                ORDER STATUS
              </span>
              <span style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
                <span style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", background: "#fff", border: "1px solid #E4E7E2", padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap" }}>
                  All
                </span>
                <span style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", background: "#fff", border: "1px solid #E4E7E2", padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap" }}>
                  Pending
                </span>
                <span style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#0B3D1F", background: "#F1F9DF", border: "1px solid #C7E88A", padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap" }}>
                  Confirmed
                </span>
                <span style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", background: "#fff", border: "1px solid #E4E7E2", padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap" }}>
                  Preparing
                </span>
                <span style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", background: "#fff", border: "1px solid #E4E7E2", padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap" }}>
                  Out for delivery
                </span>
                <span style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", background: "#fff", border: "1px solid #E4E7E2", padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap" }}>
                  Delivered
                </span>
                <span style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", background: "#fff", border: "1px solid #E4E7E2", padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap" }}>
                  Cancelled
                </span>
              </span>
            </span>
            <span style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                PAYMENT STATUS
              </span>
              <span style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
                <span style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", background: "#fff", border: "1px solid #E4E7E2", padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap" }}>
                  All
                </span>
                <span style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#0B3D1F", background: "#F1F9DF", border: "1px solid #C7E88A", padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap" }}>
                  Paid
                </span>
                <span style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", background: "#fff", border: "1px solid #E4E7E2", padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap" }}>
                  Pending
                </span>
                <span style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", background: "#fff", border: "1px solid #E4E7E2", padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap" }}>
                  Failed
                </span>
                <span style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", background: "#fff", border: "1px solid #E4E7E2", padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap" }}>
                  Refunded
                </span>
              </span>
            </span>
            <span style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                DELIVERY TYPE
              </span>
              <span style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
                <span style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", background: "#fff", border: "1px solid #E4E7E2", padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap" }}>
                  All
                </span>
                <span style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#0B3D1F", background: "#F1F9DF", border: "1px solid #C7E88A", padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap" }}>
                  Express
                </span>
                <span style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", background: "#fff", border: "1px solid #E4E7E2", padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap" }}>
                  Scheduled
                </span>
              </span>
            </span>
            <span style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                ORDER VALUE
              </span>
              <span style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
                <span style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#0B3D1F", background: "#F1F9DF", border: "1px solid #C7E88A", padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap" }}>
                  Any
                </span>
                <span style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", background: "#fff", border: "1px solid #E4E7E2", padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap" }}>
                  Under $50
                </span>
                <span style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", background: "#fff", border: "1px solid #E4E7E2", padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap" }}>
                  $50 – $150
                </span>
                <span style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", background: "#fff", border: "1px solid #E4E7E2", padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap" }}>
                  Over $150
                </span>
              </span>
            </span>
          </div>
          <div style={{ padding: "13px 18px 16px", display: "flex", alignItems: "center", gap: "9px", borderTop: "1px solid #EFF1ED", background: "#F6F7F4" }}>
            <button onClick={v.clearFilters} style={{ height: "36px", padding: "0 14px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
              Clear all
            </button>
            <span style={{ marginLeft: "auto", display: "flex", gap: "9px" }}>
              <button onClick={v.closeModal} style={{ height: "36px", padding: "0 14px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer" }}>
                Cancel
              </button>
              <button onClick={v.confirmModal} style={{ height: "36px", padding: "0 15px", border: "0", borderRadius: "8px", background: "#0B3D1F", color: "#fff", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
                Show results
              </button>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
