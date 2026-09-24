export default function CategoryEditModal({ v }) {
  return (
    <>
      <div onClick={v.closeModal} style={{ position: "absolute", inset: "0", zIndex: "90", background: "rgba(14,22,16,.45)", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px" }}>
        <div style={{ width: "500px", maxWidth: "100%", background: "#fff", borderRadius: "14px", boxShadow: "0 26px 60px rgba(10,18,12,.3)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "16px 18px 14px", display: "flex", alignItems: "flex-start", gap: "11px", borderBottom: "1px solid #EFF1ED" }}>
            <span style={{ width: "34px", height: "34px", borderRadius: "9px", background: "#F1F9DF", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
              <svg width="17" height="17" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                <path d="M10 4.4v11.2M4.4 10h11.2" stroke="#0B3D1F" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </span>
            <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0" }}>
              <span style={{ font: "700 15px/1.2 Inter,system-ui,sans-serif", color: "#17201A" }}>Edit category</span>
              <span style={{ font: "400 11.5px/1.55 Inter,system-ui,sans-serif", color: "#7C8A81" }}>Dairy & Refrigerated · position 1 · 148 products mapped.</span>
            </span>
          </div>
          <div style={{ padding: "15px 18px", display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "11px" }}>
              <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                  CATEGORY NAME
                </span>
                <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Dairy & Refrigerated
                </span>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                  DISPLAY NAME IN APP
                </span>
                <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Dairy
                </span>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                  POSITION
                </span>
                <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  1 of 17
                </span>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                  PARENT CATEGORY
                </span>
                <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  None (top level)
                </span>
              </span>
            </div>
            <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase" }}>SUBCATEGORIES</span>
              <span style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
                <span style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", background: "#fff", border: "1px solid #E4E7E2", padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap" }}>
                  Milk
                </span>
                <span style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", background: "#fff", border: "1px solid #E4E7E2", padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap" }}>
                  Curd & yoghurt
                </span>
                <span style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", background: "#fff", border: "1px solid #E4E7E2", padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap" }}>
                  Paneer & cheese
                </span>
                <span style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", background: "#fff", border: "1px solid #E4E7E2", padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap" }}>
                  Butter & ghee
                </span>
                <span style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", background: "#fff", border: "1px solid #E4E7E2", padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap" }}>
                  Eggs
                </span>
                <span style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", background: "#fff", border: "1px solid #E4E7E2", padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap" }}>
                  Cream
                </span>
                <span style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", background: "#fff", border: "1px solid #E4E7E2", padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap" }}>
                  Buttermilk
                </span>
                <span style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", background: "#fff", border: "1px solid #E4E7E2", padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap" }}>
                  Lassi
                </span>
                <span style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#0B3D1F", background: "#F1F9DF", border: "1px dashed #C7E88A", padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap" }}>
                  + Add
                </span>
              </span>
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "11px", padding: "11px", borderRadius: "8px", border: "1px solid #E4E7E2" }}>
              <span style={{ display: "flex", flexDirection: "column", gap: "3px", flex: "1", minWidth: "0" }}>
                <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Enabled in app
                </span>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Customers can browse this aisle
                </span>
              </span>
              <span style={{ width: "38px", height: "22px", borderRadius: "11px", background: "#8BE000", position: "relative", flex: "none", display: "block" }}>
                <span style={{ position: "absolute", top: "2.5px", left: "18px", width: "17px", height: "17px", borderRadius: "9px", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,.2)", display: "block" }} />
              </span>
            </span>
          </div>
          <div style={{ padding: "13px 18px 16px", display: "flex", alignItems: "center", gap: "9px", borderTop: "1px solid #EFF1ED", background: "#F6F7F4" }}>
            <span style={{ marginLeft: "auto", display: "flex", gap: "9px" }}>
              <button onClick={v.closeModal} style={{ height: "36px", padding: "0 14px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                Cancel
              </button>
              <button onClick={v.confirmModal} style={{ height: "36px", padding: "0 15px", border: "0", borderRadius: "8px", background: "#0B3D1F", color: "#fff", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
                Save category
              </button>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
