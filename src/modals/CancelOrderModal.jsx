export default function CancelOrderModal({ v }) {
  return (
    <>
      <div onClick={v.closeModal} style={{ position: "absolute", inset: "0", zIndex: "90", background: "rgba(14,22,16,.45)", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px" }}>
        <div style={{ width: "460px", maxWidth: "100%", background: "#fff", borderRadius: "14px", boxShadow: "0 26px 60px rgba(10,18,12,.3)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "16px 18px 14px", display: "flex", alignItems: "flex-start", gap: "11px", borderBottom: "1px solid #EFF1ED" }}>
            <span style={{ width: "34px", height: "34px", borderRadius: "9px", background: "#FAEDEA", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
              <svg width="17" height="17" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                <path d="M10 3.6l7 12.2H3l7-12.2z" stroke="#A93826" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M10 8v3.4" stroke="#A93826" strokeWidth="1.6" strokeLinecap="round" />
                <circle cx="10" cy="13.6" r=".9" fill="#A93826" />
              </svg>
            </span>
            <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0" }}>
              <span style={{ font: "700 15px/1.2 Inter,system-ui,sans-serif", color: "#17201A" }}>Cancel order #SK10482?</span>
              <span style={{ font: "400 11.5px/1.55 Inter,system-ui,sans-serif", color: "#7C8A81" }}>
                The customer will be notified and $94.04 refunded to their original payment method. This cannot be undone.
              </span>
            </span>
          </div>
          <div style={{ padding: "15px 18px", display: "flex", flexDirection: "column", gap: "11px" }}>
            <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase" }}>CANCELLATION REASON</span>
              <span style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "9px", padding: "10px 11px", border: "1px solid #E4E7E2", background: "#fff", borderRadius: "8px" }}>
                  <span style={{ width: "16px", height: "16px", borderRadius: "8px", border: "2px solid #C9D0C8", background: "transparent", display: "block", flex: "none" }} />
                  <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Customer requested
                  </span>
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "9px", padding: "10px 11px", border: "1px solid #C7E88A", background: "#F7FCEE", borderRadius: "8px" }}>
                  <span style={{ width: "16px", height: "16px", borderRadius: "8px", border: "2px solid #8BE000", background: "#8BE000", display: "block", flex: "none" }} />
                  <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Items unavailable
                  </span>
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "9px", padding: "10px 11px", border: "1px solid #E4E7E2", background: "#fff", borderRadius: "8px" }}>
                  <span style={{ width: "16px", height: "16px", borderRadius: "8px", border: "2px solid #C9D0C8", background: "transparent", display: "block", flex: "none" }} />
                  <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Delivery not possible
                  </span>
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "9px", padding: "10px 11px", border: "1px solid #E4E7E2", background: "#fff", borderRadius: "8px" }}>
                  <span style={{ width: "16px", height: "16px", borderRadius: "8px", border: "2px solid #C9D0C8", background: "transparent", display: "block", flex: "none" }} />
                  <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Payment issue
                  </span>
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "9px", padding: "10px 11px", border: "1px solid #E4E7E2", background: "#fff", borderRadius: "8px" }}>
                  <span style={{ width: "16px", height: "16px", borderRadius: "8px", border: "2px solid #C9D0C8", background: "transparent", display: "block", flex: "none" }} />
                  <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Suspected fraud
                  </span>
                </span>
              </span>
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "9px", padding: "10px 11px", borderRadius: "8px", background: "#FBF6EA", border: "1px solid #EEE0C2" }}>
              <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                <path d="M10 3.6l7 12.2H3l7-12.2z" stroke="#8A6100" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M10 8v3.4" stroke="#8A6100" strokeWidth="1.6" strokeLinecap="round" />
                <circle cx="10" cy="13.6" r=".9" fill="#8A6100" />
              </svg>
              <span style={{ font: "500 11px/1.45 Inter,system-ui,sans-serif", color: "#6B4E08" }}>
                Picking has already started — a $4.95 restocking fee applies to fresh items.
              </span>
            </span>
          </div>
          <div style={{ padding: "13px 18px 16px", display: "flex", alignItems: "center", gap: "9px", borderTop: "1px solid #EFF1ED", background: "#F6F7F4" }}>
            <span style={{ marginLeft: "auto", display: "flex", gap: "9px" }}>
              <button onClick={v.closeModal} style={{ height: "36px", padding: "0 14px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                Keep order
              </button>
              <button onClick={v.confirmModal} style={{ height: "36px", padding: "0 15px", border: "0", borderRadius: "8px", background: "#A93826", color: "#fff", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
                Cancel & refund
              </button>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
