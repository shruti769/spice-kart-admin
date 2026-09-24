export default function ContactCustomerModal({ v }) {
  return (
    <>
      <div onClick={v.closeModal} style={{ position: "absolute", inset: "0", zIndex: "90", background: "rgba(14,22,16,.45)", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px" }}>
        <div style={{ width: "470px", maxWidth: "100%", background: "#fff", borderRadius: "14px", boxShadow: "0 26px 60px rgba(10,18,12,.3)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "16px 18px 14px", display: "flex", alignItems: "flex-start", gap: "11px", borderBottom: "1px solid #EFF1ED" }}>
            <span style={{ width: "34px", height: "34px", borderRadius: "9px", background: "#E8F1F8", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
              <svg width="17" height="17" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                <path d="M3.4 5.6A1.8 1.8 0 015.2 3.8h9.6a1.8 1.8 0 011.8 1.8v5.6a1.8 1.8 0 01-1.8 1.8H8.4L4.6 16v-2.9h-.4a1.8 1.8 0 01-.8-1.5V5.6z" stroke="#1F5C8B" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
            </span>
            <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0" }}>
              <span style={{ font: "700 15px/1.2 Inter,system-ui,sans-serif", color: "#17201A" }}>Contact John Smith</span>
              <span style={{ font: "400 11.5px/1.55 Inter,system-ui,sans-serif", color: "#7C8A81" }}>Order #SK10482 · +61 412 663 208 · john.smith@outlook.com.au</span>
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <button className="hv3" onClick={v.toast_calling} style={{ display: "flex", alignItems: "center", gap: "11px", width: "100%", border: "0", borderBottom: "1px solid #EFF1ED", background: "transparent", padding: "12px 16px", cursor: "pointer", textAlign: "left" }}>
              <span style={{ width: "30px", height: "30px", borderRadius: "8px", border: "1px solid #E4E7E2", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
                <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <path d="M4.3 3.4h2.9a.9.9 0 01.86.63l.83 2.6a.9.9 0 01-.36 1l-1.44.99a9.4 9.4 0 004.29 4.29l.99-1.44a.9.9 0 011-.36l2.6.83a.9.9 0 01.63.86v2.9a1 1 0 01-1.09 1A13 13 0 013.3 4.49a1 1 0 011-1.09z" stroke="#4A564E" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "3px", flex: "1", minWidth: "0" }}>
                <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Call customer</span>
                <span style={{ font: "400 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Dials from the store line</span>
              </span>
            </button>
            <button className="hv3" onClick={v.toast_sms} style={{ display: "flex", alignItems: "center", gap: "11px", width: "100%", border: "0", borderBottom: "1px solid #EFF1ED", background: "transparent", padding: "12px 16px", cursor: "pointer", textAlign: "left" }}>
              <span style={{ width: "30px", height: "30px", borderRadius: "8px", border: "1px solid #E4E7E2", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
                <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <path d="M3.4 5.6A1.8 1.8 0 015.2 3.8h9.6a1.8 1.8 0 011.8 1.8v5.6a1.8 1.8 0 01-1.8 1.8H8.4L4.6 16v-2.9h-.4a1.8 1.8 0 01-.8-1.5V5.6z" stroke="#4A564E" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "3px", flex: "1", minWidth: "0" }}>
                <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Send SMS</span>
                <span style={{ font: "400 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Delivery and substitution updates</span>
              </span>
            </button>
            <button className="hv3" onClick={v.toast_email} style={{ display: "flex", alignItems: "center", gap: "11px", width: "100%", border: "0", borderBottom: "1px solid #EFF1ED", background: "transparent", padding: "12px 16px", cursor: "pointer", textAlign: "left" }}>
              <span style={{ width: "30px", height: "30px", borderRadius: "8px", border: "1px solid #E4E7E2", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
                <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <rect x="2.8" y="4.6" width="14.4" height="10.8" rx="2" stroke="#4A564E" strokeWidth="1.5" />
                  <path d="M3.4 6l6.6 4.6L16.6 6" stroke="#4A564E" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "3px", flex: "1", minWidth: "0" }}>
                <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Send email</span>
                <span style={{ font: "400 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Receipt, invoice or apology template</span>
              </span>
            </button>
          </div>
          <div style={{ padding: "15px 18px", display: "flex", flexDirection: "column", gap: "7px", borderTop: "1px solid #EFF1ED" }}>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
              QUICK MESSAGE
            </span>
            <span style={{ display: "block", minHeight: "56px", padding: "10px 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "400 12px/1.6 Inter,system-ui,sans-serif", color: "#4A564E" }}>
              Hi John, your order is being packed now and will arrive within 25 minutes. — Spice Kart
            </span>
          </div>
          <div style={{ padding: "13px 18px 16px", display: "flex", alignItems: "center", gap: "9px", borderTop: "1px solid #EFF1ED", background: "#F6F7F4" }}>
            <span style={{ marginLeft: "auto", display: "flex", gap: "9px" }}>
              <button onClick={v.closeModal} style={{ height: "36px", padding: "0 14px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                Close
              </button>
              <button onClick={v.confirmModal} style={{ height: "36px", padding: "0 15px", border: "0", borderRadius: "8px", background: "#0B3D1F", color: "#fff", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
                Send message
              </button>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
