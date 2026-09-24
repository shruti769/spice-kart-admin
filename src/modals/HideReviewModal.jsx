export default function HideReviewModal({ v }) {
  return (
    <>
      <div onClick={v.closeModal} style={{ position: "absolute", inset: "0", zIndex: "90", background: "rgba(14,22,16,.45)", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px" }}>
        <div style={{ width: "440px", maxWidth: "100%", background: "#fff", borderRadius: "14px", boxShadow: "0 26px 60px rgba(10,18,12,.3)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "16px 18px 14px", display: "flex", alignItems: "flex-start", gap: "11px", borderBottom: "1px solid #EFF1ED" }}>
            <span style={{ width: "34px", height: "34px", borderRadius: "9px", background: "#FBF1DE", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
              <svg width="17" height="17" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                <path d="M2.4 10S5.3 5.4 10 5.4 17.6 10 17.6 10 14.7 14.6 10 14.6 2.4 10 2.4 10z" stroke="#8A6100" strokeWidth="1.5" strokeLinejoin="round" />
                <circle cx="10" cy="10" r="2.2" stroke="#8A6100" strokeWidth="1.5" />
              </svg>
            </span>
            <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0" }}>
              <span style={{ font: "700 15px/1.2 Inter,system-ui,sans-serif", color: "#17201A" }}>Hide this review?</span>
              <span style={{ font: "400 11.5px/1.55 Inter,system-ui,sans-serif", color: "#7C8A81" }}>
                It stops showing in the app immediately but stays in your moderation history and still counts toward the product rating.
              </span>
            </span>
          </div>
          <div style={{ padding: "15px 18px", display: "flex", flexDirection: "column", gap: "8px" }}>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
              REASON
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 11px", border: "1px solid #E4E7E2", background: "#fff", borderRadius: "8px" }}>
              <span style={{ width: "16px", height: "16px", borderRadius: "8px", border: "2px solid #C9D0C8", background: "transparent", display: "block", flex: "none" }} />
              <span style={{ display: "flex", flexDirection: "column", gap: "2px", minWidth: "0" }}>
                <span style={{ font: "600 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Offensive language</span>
              </span>
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 11px", border: "1px solid #C7E88A", background: "#F7FCEE", borderRadius: "8px" }}>
              <span style={{ width: "16px", height: "16px", borderRadius: "8px", border: "2px solid #8BE000", background: "#8BE000", display: "block", flex: "none" }} />
              <span style={{ display: "flex", flexDirection: "column", gap: "2px", minWidth: "0" }}>
                <span style={{ font: "600 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Spam or promotional</span>
              </span>
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 11px", border: "1px solid #E4E7E2", background: "#fff", borderRadius: "8px" }}>
              <span style={{ width: "16px", height: "16px", borderRadius: "8px", border: "2px solid #C9D0C8", background: "transparent", display: "block", flex: "none" }} />
              <span style={{ display: "flex", flexDirection: "column", gap: "2px", minWidth: "0" }}>
                <span style={{ font: "600 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Not about this product</span>
              </span>
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 11px", border: "1px solid #E4E7E2", background: "#fff", borderRadius: "8px" }}>
              <span style={{ width: "16px", height: "16px", borderRadius: "8px", border: "2px solid #C9D0C8", background: "transparent", display: "block", flex: "none" }} />
              <span style={{ display: "flex", flexDirection: "column", gap: "2px", minWidth: "0" }}>
                <span style={{ font: "600 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Names a staff member</span>
              </span>
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 11px", border: "1px solid #E4E7E2", background: "#fff", borderRadius: "8px" }}>
              <span style={{ width: "16px", height: "16px", borderRadius: "8px", border: "2px solid #C9D0C8", background: "transparent", display: "block", flex: "none" }} />
              <span style={{ display: "flex", flexDirection: "column", gap: "2px", minWidth: "0" }}>
                <span style={{ font: "600 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Other</span>
              </span>
            </span>
          </div>
          <div style={{ padding: "13px 18px 16px", display: "flex", alignItems: "center", gap: "9px", borderTop: "1px solid #EFF1ED", background: "#F6F7F4" }}>
            <span style={{ marginLeft: "auto", display: "flex", gap: "9px" }}>
              <button onClick={v.closeModal} style={{ height: "36px", padding: "0 14px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                Cancel
              </button>
              <button onClick={v.confirmModal} style={{ height: "36px", padding: "0 15px", border: "0", borderRadius: "8px", background: "#0B3D1F", color: "#fff", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
                Hide review
              </button>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
