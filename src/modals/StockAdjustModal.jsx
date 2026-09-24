export default function StockAdjustModal({ v }) {
  return (
    <>
      <div onClick={v.closeModal} style={{ position: "absolute", inset: "0", zIndex: "90", background: "rgba(14,22,16,.45)", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px" }}>
        <div style={{ width: "500px", maxWidth: "100%", background: "#fff", borderRadius: "14px", boxShadow: "0 26px 60px rgba(10,18,12,.3)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "16px 18px 14px", display: "flex", alignItems: "flex-start", gap: "11px", borderBottom: "1px solid #EFF1ED" }}>
            <span style={{ width: "34px", height: "34px", borderRadius: "9px", background: "#F1F9DF", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
              <svg width="17" height="17" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                <rect x="3" y="8.8" width="6" height="7.8" rx="1.4" stroke="#0B3D1F" strokeWidth="1.5" />
                <rect x="11" y="8.8" width="6" height="7.8" rx="1.4" stroke="#0B3D1F" strokeWidth="1.5" />
                <rect x="7" y="3.4" width="6" height="4.6" rx="1.4" stroke="#0B3D1F" strokeWidth="1.5" />
              </svg>
            </span>
            <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0" }}>
              <span style={{ font: "700 15px/1.2 Inter,system-ui,sans-serif", color: "#17201A" }}>Stock adjustment · Basmati Rice 5kg</span>
              <span style={{ font: "400 11.5px/1.55 Inter,system-ui,sans-serif", color: "#7C8A81" }}>SK-PAN-0142 · Collingwood DC · 6 units on hand, minimum 25.</span>
            </span>
          </div>
          <div style={{ padding: "15px 18px", display: "flex", flexDirection: "column", gap: "12px" }}>
            <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase" }}>ADJUSTMENT TYPE</span>
              <span style={{ display: "flex", gap: "8px" }}>
                <span style={{ flex: "1", padding: "10px", border: "1px solid #C7E88A", background: "#F7FCEE", borderRadius: "8px", font: "600 12px/1.2 Inter,system-ui,sans-serif", color: "#0B3D1F", textAlign: "center", whiteSpace: "nowrap" }}>
                  Add stock
                </span>
                <span style={{ flex: "1", padding: "10px", border: "1px solid #E4E7E2", background: "#fff", borderRadius: "8px", font: "600 12px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", textAlign: "center", whiteSpace: "nowrap" }}>
                  Remove stock
                </span>
                <span style={{ flex: "1", padding: "10px", border: "1px solid #E4E7E2", background: "#fff", borderRadius: "8px", font: "600 12px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", textAlign: "center", whiteSpace: "nowrap" }}>
                  Correction
                </span>
              </span>
            </span>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "11px" }}>
              <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                  QUANTITY
                </span>
                <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  + 120 units
                </span>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                  NEW ON-HAND TOTAL
                </span>
                <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  126 units
                </span>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                  REASON
                </span>
                <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Supplier delivery received
                </span>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                  REFERENCE
                </span>
                <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  PO-2026-4418
                </span>
              </span>
            </div>
            <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase" }}>NOTES</span>
              <span style={{ display: "block", minHeight: "52px", padding: "10px 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "400 12px/1.6 Inter,system-ui,sans-serif", color: "#4A564E" }}>
                Pallet received 21 Sep 8:40 AM. 2 bags damaged in transit, logged separately.
              </span>
            </span>
          </div>
          <div style={{ padding: "13px 18px 16px", display: "flex", alignItems: "center", gap: "9px", borderTop: "1px solid #EFF1ED", background: "#F6F7F4" }}>
            <span style={{ marginLeft: "auto", display: "flex", gap: "9px" }}>
              <button onClick={v.closeModal} style={{ height: "36px", padding: "0 14px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                Cancel
              </button>
              <button onClick={v.confirmModal} style={{ height: "36px", padding: "0 15px", border: "0", borderRadius: "8px", background: "#0B3D1F", color: "#fff", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
                Apply adjustment
              </button>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
