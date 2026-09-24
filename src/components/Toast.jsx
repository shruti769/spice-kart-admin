export default function Toast({ v }) {
  return (
    <>
      <div style={{ position: "absolute", right: "22px", bottom: "22px", zIndex: "95", display: "flex", alignItems: "center", gap: "11px", background: "#17201A", borderRadius: "10px", padding: "12px 15px", boxShadow: "0 14px 34px rgba(10,18,12,.28)", maxWidth: "380px" }}>
        <span style={{ width: "22px", height: "22px", borderRadius: "11px", background: "#8BE000", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
            <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#0B3D1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span style={{ font: "500 12.5px/1.45 Inter,system-ui,sans-serif", color: "#fff" }}>{v.toast}</span>
        <button onClick={v.hideToast} aria-label="Dismiss" style={{ marginLeft: "auto", border: "0", background: "transparent", font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "rgba(255,255,255,.6)", cursor: "pointer", whiteSpace: "nowrap", padding: "0", flex: "none" }}>
          Dismiss
        </button>
      </div>
    </>
  )
}
