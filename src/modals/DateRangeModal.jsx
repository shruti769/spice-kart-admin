export default function DateRangeModal({ v }) {
  return (
    <>
      <div onClick={v.closeModal} style={{ position: "absolute", inset: "0", zIndex: "90", background: "rgba(14,22,16,.45)", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px" }}>
        <div style={{ width: "460px", maxWidth: "100%", background: "#fff", borderRadius: "14px", boxShadow: "0 26px 60px rgba(10,18,12,.3)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "16px 18px 14px", display: "flex", alignItems: "flex-start", gap: "11px", borderBottom: "1px solid #EFF1ED" }}>
            <span style={{ width: "34px", height: "34px", borderRadius: "9px", background: "#F1F9DF", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
              <svg width="17" height="17" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                <circle cx="10" cy="10" r="7.2" stroke="#0B3D1F" strokeWidth="1.5" />
                <path d="M10 5.8V10l3 1.8" stroke="#0B3D1F" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
            <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0" }}>
              <span style={{ font: "700 15px/1.2 Inter,system-ui,sans-serif", color: "#17201A" }}>Date range</span>
              <span style={{ font: "400 11.5px/1.55 Inter,system-ui,sans-serif", color: "#7C8A81" }}>Applies to every chart, KPI and table on this page.</span>
            </span>
          </div>
          <div style={{ padding: "15px 18px", display: "flex", flexDirection: "column", gap: "11px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
              <span style={{ padding: "11px 10px", border: "1px solid #E4E7E2", background: "#fff", borderRadius: "8px", font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", textAlign: "center", whiteSpace: "nowrap" }}>
                Today
              </span>
              <span style={{ padding: "11px 10px", border: "1px solid #E4E7E2", background: "#fff", borderRadius: "8px", font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", textAlign: "center", whiteSpace: "nowrap" }}>
                Yesterday
              </span>
              <span style={{ padding: "11px 10px", border: "1px solid #E4E7E2", background: "#fff", borderRadius: "8px", font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", textAlign: "center", whiteSpace: "nowrap" }}>
                Last 7 days
              </span>
              <span style={{ padding: "11px 10px", border: "1px solid #C7E88A", background: "#F7FCEE", borderRadius: "8px", font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#0B3D1F", textAlign: "center", whiteSpace: "nowrap" }}>
                Last 30 days
              </span>
              <span style={{ padding: "11px 10px", border: "1px solid #E4E7E2", background: "#fff", borderRadius: "8px", font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", textAlign: "center", whiteSpace: "nowrap" }}>
                Last 90 days
              </span>
              <span style={{ padding: "11px 10px", border: "1px solid #E4E7E2", background: "#fff", borderRadius: "8px", font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", textAlign: "center", whiteSpace: "nowrap" }}>
                12 months
              </span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "11px" }}>
              <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                  FROM
                </span>
                <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  22 Aug 2026
                </span>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                  TO
                </span>
                <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  21 Sep 2026
                </span>
              </span>
            </div>
            <span style={{ display: "flex", alignItems: "center", gap: "9px", padding: "10px 11px", borderRadius: "8px", background: "#F6F7F4", border: "1px solid #E4E7E2" }}>
              <span style={{ width: "19px", height: "19px", borderRadius: "5px", background: "#8BE000", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
                <svg width="13" height="13" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#0B3D1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Compare with the previous period</span>
            </span>
          </div>
          <div style={{ padding: "13px 18px 16px", display: "flex", alignItems: "center", gap: "9px", borderTop: "1px solid #EFF1ED", background: "#F6F7F4" }}>
            <span style={{ marginLeft: "auto", display: "flex", gap: "9px" }}>
              <button onClick={v.closeModal} style={{ height: "36px", padding: "0 14px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                Cancel
              </button>
              <button onClick={v.confirmModal} style={{ height: "36px", padding: "0 15px", border: "0", borderRadius: "8px", background: "#0B3D1F", color: "#fff", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
                Apply range
              </button>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
