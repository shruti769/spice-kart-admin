export default function StatusModal({ v }) {
  return (
    <>
      <div onClick={v.closeModal} style={{ position: "absolute", inset: "0", zIndex: "90", background: "rgba(14,22,16,.45)", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px" }}>
        <div style={{ width: "460px", maxWidth: "100%", background: "#fff", borderRadius: "14px", boxShadow: "0 26px 60px rgba(10,18,12,.3)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "16px 18px 14px", display: "flex", alignItems: "flex-start", gap: "11px", borderBottom: "1px solid #EFF1ED" }}>
            <span style={{ width: "34px", height: "34px", borderRadius: "9px", background: "#E8F1F8", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
              <svg width="17" height="17" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#1F5C8B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0" }}>
              <span style={{ font: "700 15px/1.2 Inter,system-ui,sans-serif", color: "#17201A" }}>Update order status</span>
              <span style={{ font: "400 11.5px/1.55 Inter,system-ui,sans-serif", color: "#7C8A81" }}>
                Order #SK10482 is currently Preparing. The customer is notified on every change.
              </span>
            </span>
          </div>
          <div style={{ padding: "15px 18px", display: "flex", flexDirection: "column", gap: "8px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 11px", border: "1px solid #E4E7E2", background: "#fff", borderRadius: "8px" }}>
              <span style={{ width: "16px", height: "16px", borderRadius: "8px", border: "2px solid #C9D0C8", background: "transparent", display: "block", flex: "none" }} />
              <span style={{ display: "flex", flexDirection: "column", gap: "2px", minWidth: "0" }}>
                <span style={{ font: "600 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Confirmed</span>
              </span>
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 11px", border: "1px solid #E4E7E2", background: "#fff", borderRadius: "8px" }}>
              <span style={{ width: "16px", height: "16px", borderRadius: "8px", border: "2px solid #C9D0C8", background: "transparent", display: "block", flex: "none" }} />
              <span style={{ display: "flex", flexDirection: "column", gap: "2px", minWidth: "0" }}>
                <span style={{ font: "600 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Preparing</span>
              </span>
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 11px", border: "1px solid #C7E88A", background: "#F7FCEE", borderRadius: "8px" }}>
              <span style={{ width: "16px", height: "16px", borderRadius: "8px", border: "2px solid #8BE000", background: "#8BE000", display: "block", flex: "none" }} />
              <span style={{ display: "flex", flexDirection: "column", gap: "2px", minWidth: "0" }}>
                <span style={{ font: "600 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Packed</span>
                <span style={{ font: "400 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Next step · notifies the customer</span>
              </span>
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 11px", border: "1px solid #E4E7E2", background: "#fff", borderRadius: "8px" }}>
              <span style={{ width: "16px", height: "16px", borderRadius: "8px", border: "2px solid #C9D0C8", background: "transparent", display: "block", flex: "none" }} />
              <span style={{ display: "flex", flexDirection: "column", gap: "2px", minWidth: "0" }}>
                <span style={{ font: "600 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Ready for pickup</span>
              </span>
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 11px", border: "1px solid #E4E7E2", background: "#fff", borderRadius: "8px" }}>
              <span style={{ width: "16px", height: "16px", borderRadius: "8px", border: "2px solid #C9D0C8", background: "transparent", display: "block", flex: "none" }} />
              <span style={{ display: "flex", flexDirection: "column", gap: "2px", minWidth: "0" }}>
                <span style={{ font: "600 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Out for delivery</span>
              </span>
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 11px", border: "1px solid #E4E7E2", background: "#fff", borderRadius: "8px" }}>
              <span style={{ width: "16px", height: "16px", borderRadius: "8px", border: "2px solid #C9D0C8", background: "transparent", display: "block", flex: "none" }} />
              <span style={{ display: "flex", flexDirection: "column", gap: "2px", minWidth: "0" }}>
                <span style={{ font: "600 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Delivered</span>
              </span>
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "9px", padding: "10px 11px", borderRadius: "8px", background: "#F6F7F4", border: "1px solid #E4E7E2", marginTop: "3px" }}>
              <span style={{ width: "19px", height: "19px", borderRadius: "5px", background: "#8BE000", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
                <svg width="13" height="13" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#0B3D1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Send a push notification</span>
            </span>
          </div>
          <div style={{ padding: "13px 18px 16px", display: "flex", alignItems: "center", gap: "9px", borderTop: "1px solid #EFF1ED", background: "#F6F7F4" }}>
            <span style={{ marginLeft: "auto", display: "flex", gap: "9px" }}>
              <button onClick={v.closeModal} style={{ height: "36px", padding: "0 14px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                Cancel
              </button>
              <button onClick={v.confirmModal} style={{ height: "36px", padding: "0 15px", border: "0", borderRadius: "8px", background: "#0B3D1F", color: "#fff", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
                Update status
              </button>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
