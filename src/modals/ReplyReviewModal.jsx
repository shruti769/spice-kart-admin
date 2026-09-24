export default function ReplyReviewModal({ v }) {
  return (
    <>
      <div onClick={v.closeModal} style={{ position: "absolute", inset: "0", zIndex: "90", background: "rgba(14,22,16,.45)", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px" }}>
        <div style={{ width: "470px", maxWidth: "100%", background: "#fff", borderRadius: "14px", boxShadow: "0 26px 60px rgba(10,18,12,.3)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "16px 18px 14px", display: "flex", alignItems: "flex-start", gap: "11px", borderBottom: "1px solid #EFF1ED" }}>
            <span style={{ width: "34px", height: "34px", borderRadius: "9px", background: "#FBF1DE", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
              <svg width="17" height="17" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                <path d="M10 3.2l2.1 4.3 4.7.7-3.4 3.3.8 4.7L10 14l-4.2 2.2.8-4.7L3.2 8.2l4.7-.7L10 3.2z" stroke="#8A6100" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
            </span>
            <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0" }}>
              <span style={{ font: "700 15px/1.2 Inter,system-ui,sans-serif", color: "#17201A" }}>Reply to review</span>
              <span style={{ font: "400 11.5px/1.55 Inter,system-ui,sans-serif", color: "#7C8A81" }}>Mei Chen · 5 stars on Basmati Rice 5kg. Your reply is public in the app.</span>
            </span>
          </div>
          <div style={{ padding: "15px 18px", display: "flex", flexDirection: "column", gap: "11px" }}>
            <span style={{ display: "flex", flexDirection: "column", gap: "6px", padding: "11px", borderRadius: "9px", background: "#F6F7F4", border: "1px solid #E4E7E2" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <svg width="13" height="13" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <path d="M10 3.2l2.1 4.3 4.7.7-3.4 3.3.8 4.7L10 14l-4.2 2.2.8-4.7L3.2 8.2l4.7-.7L10 3.2z" stroke="#C89A28" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
                <span style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A" }}>5.0 · 2 days ago</span>
              </span>
              <span style={{ font: "400 11.5px/1.55 Inter,system-ui,sans-serif", color: "#4A564E" }}>Great quality — fluffy every single time. Delivery was quick too.</span>
            </span>
            <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                YOUR REPLY
              </span>
              <span style={{ display: "block", minHeight: "64px", padding: "10px 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "400 12px/1.6 Inter,system-ui,sans-serif", color: "#4A564E" }}>
                Thanks Mei! We age our basmati for 12 months before it hits the shelf — glad it shows. See you next order.
              </span>
            </span>
            <span style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
              <span style={{ font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", background: "#fff", border: "1px solid #E4E7E2", padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap" }}>
                Thank the customer
              </span>
              <span style={{ font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", background: "#fff", border: "1px solid #E4E7E2", padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap" }}>
                Apologise & refund
              </span>
              <span style={{ font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", background: "#fff", border: "1px solid #E4E7E2", padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap" }}>
                Explain sourcing
              </span>
            </span>
          </div>
          <div style={{ padding: "13px 18px 16px", display: "flex", alignItems: "center", gap: "9px", borderTop: "1px solid #EFF1ED", background: "#F6F7F4" }}>
            <span style={{ marginLeft: "auto", display: "flex", gap: "9px" }}>
              <button onClick={v.closeModal} style={{ height: "36px", padding: "0 14px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                Cancel
              </button>
              <button onClick={v.confirmModal} style={{ height: "36px", padding: "0 15px", border: "0", borderRadius: "8px", background: "#0B3D1F", color: "#fff", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
                Post reply
              </button>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
