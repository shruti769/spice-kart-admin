const itemStyle = { display: "flex", alignItems: "center", gap: "11px", width: "100%", border: "0", borderBottom: "1px solid #EFF1ED", background: "transparent", padding: "12px 16px", cursor: "pointer", textAlign: "left" }

function ActionItem({ className = "hv3", onClick, icon, title, subtitle, danger }) {
  return (
    <button className={className} onClick={onClick} style={itemStyle}>
      <span style={{ width: "30px", height: "30px", borderRadius: "8px", border: `1px solid ${danger ? "#EEDAD5" : "#E4E7E2"}`, background: danger ? "#FDF7F5" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
        {icon}
      </span>
      <span style={{ display: "flex", flexDirection: "column", gap: "3px", flex: "1", minWidth: "0" }}>
        <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: danger ? "#A93826" : "#17201A", whiteSpace: "nowrap" }}>{title}</span>
        <span style={{ font: "400 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>{subtitle}</span>
      </span>
    </button>
  )
}

/** Actions for one real product row (from Supabase): edit, adjust stock, delete. */
function ProductActions({ v, product }) {
  return (
    <div onClick={v.closeModal} style={{ position: "absolute", inset: "0", zIndex: "90", background: "rgba(14,22,16,.45)", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: "420px", maxWidth: "100%", background: "#fff", borderRadius: "14px", boxShadow: "0 26px 60px rgba(10,18,12,.3)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "16px 18px 14px", display: "flex", alignItems: "flex-start", gap: "11px", borderBottom: "1px solid #EFF1ED" }}>
          <span style={{ width: "34px", height: "34px", borderRadius: "9px", background: "#F1F9DF", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
            <svg width="17" height="17" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
              <path d="M2.4 10S5.3 5.4 10 5.4 17.6 10 17.6 10 14.7 14.6 10 14.6 2.4 10 2.4 10z" stroke="#0B3D1F" strokeWidth="1.5" strokeLinejoin="round" />
              <circle cx="10" cy="10" r="2.2" stroke="#0B3D1F" strokeWidth="1.5" />
            </svg>
          </span>
          <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0" }}>
            <span style={{ font: "700 15px/1.2 Inter,system-ui,sans-serif", color: "#17201A", overflowWrap: "anywhere" }}>{product.name}</span>
            <span style={{ font: "400 11.5px/1.55 Inter,system-ui,sans-serif", color: "#7C8A81" }}>
              {product.sku || "No SKU"} · choose what to do with this product. Deleting asks for confirmation.
            </span>
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <ActionItem
            onClick={() => v.editProduct(product)}
            title="Edit"
            subtitle="Change fields and save"
            icon={<svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}><path d="M4 15.2l9.1-9.1 2.8 2.8-9.1 9.1H4v-2.8z" stroke="#4A564E" strokeWidth="1.5" strokeLinejoin="round" /></svg>}
          />
          <ActionItem
            onClick={() => v.openStockAdjust(product)}
            title="Adjust stock"
            subtitle={`${product.stock_qty} on hand · add, remove or correct`}
            icon={
              <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                <rect x="3" y="8.8" width="6" height="7.8" rx="1.4" stroke="#4A564E" strokeWidth="1.5" />
                <rect x="11" y="8.8" width="6" height="7.8" rx="1.4" stroke="#4A564E" strokeWidth="1.5" />
                <rect x="7" y="3.4" width="6" height="4.6" rx="1.4" stroke="#4A564E" strokeWidth="1.5" />
              </svg>
            }
          />
          <ActionItem
            className="hv8"
            danger
            onClick={() => v.openDeleteProduct(product)}
            title="Delete"
            subtitle="Permanently remove this product"
            icon={<svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}><path d="M4.6 5.6h10.8M8 5.6V4.2h4v1.4M6.2 5.6l.7 10a1 1 0 001 .9h4.2a1 1 0 001-.9l.7-10" stroke="#A93826" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
          />
        </div>
        <div style={{ padding: "13px 18px 16px", display: "flex", borderTop: "1px solid #EFF1ED", background: "#F6F7F4" }}>
          <button onClick={v.closeModal} style={{ marginLeft: "auto", height: "36px", padding: "0 14px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer" }}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default function RowActionsModal({ v }) {
  if (v.actionProduct) return <ProductActions v={v} product={v.actionProduct} />
  return (
    <>
      <div onClick={v.closeModal} style={{ position: "absolute", inset: "0", zIndex: "90", background: "rgba(14,22,16,.45)", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px" }}>
        <div style={{ width: "420px", maxWidth: "100%", background: "#fff", borderRadius: "14px", boxShadow: "0 26px 60px rgba(10,18,12,.3)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "16px 18px 14px", display: "flex", alignItems: "flex-start", gap: "11px", borderBottom: "1px solid #EFF1ED" }}>
            <span style={{ width: "34px", height: "34px", borderRadius: "9px", background: "#F1F9DF", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
              <svg width="17" height="17" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                <path d="M2.4 10S5.3 5.4 10 5.4 17.6 10 17.6 10 14.7 14.6 10 14.6 2.4 10 2.4 10z" stroke="#0B3D1F" strokeWidth="1.5" strokeLinejoin="round" />
                <circle cx="10" cy="10" r="2.2" stroke="#0B3D1F" strokeWidth="1.5" />
              </svg>
            </span>
            <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0" }}>
              <span style={{ font: "700 15px/1.2 Inter,system-ui,sans-serif", color: "#17201A" }}>Row actions</span>
              <span style={{ font: "400 11.5px/1.55 Inter,system-ui,sans-serif", color: "#7C8A81" }}>
                Choose what to do with the selected record. Destructive actions ask for confirmation.
              </span>
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <button className="hv3" onClick={v.viewRecord} style={{ display: "flex", alignItems: "center", gap: "11px", width: "100%", border: "0", borderBottom: "1px solid #EFF1ED", background: "transparent", padding: "12px 16px", cursor: "pointer", textAlign: "left" }}>
              <span style={{ width: "30px", height: "30px", borderRadius: "8px", border: "1px solid #E4E7E2", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
                <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <path d="M2.4 10S5.3 5.4 10 5.4 17.6 10 17.6 10 14.7 14.6 10 14.6 2.4 10 2.4 10z" stroke="#4A564E" strokeWidth="1.5" strokeLinejoin="round" />
                  <circle cx="10" cy="10" r="2.2" stroke="#4A564E" strokeWidth="1.5" />
                </svg>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "3px", flex: "1", minWidth: "0" }}>
                <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>View details</span>
                <span style={{ font: "400 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Open the full record</span>
              </span>
            </button>
            <button className="hv3" onClick={v.editRecord} style={{ display: "flex", alignItems: "center", gap: "11px", width: "100%", border: "0", borderBottom: "1px solid #EFF1ED", background: "transparent", padding: "12px 16px", cursor: "pointer", textAlign: "left" }}>
              <span style={{ width: "30px", height: "30px", borderRadius: "8px", border: "1px solid #E4E7E2", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
                <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <path d="M4 15.2l9.1-9.1 2.8 2.8-9.1 9.1H4v-2.8z" stroke="#4A564E" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "3px", flex: "1", minWidth: "0" }}>
                <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Edit</span>
                <span style={{ font: "400 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Change fields and save</span>
              </span>
            </button>
            <button className="hv3" onClick={v.duplicateRecord} style={{ display: "flex", alignItems: "center", gap: "11px", width: "100%", border: "0", borderBottom: "1px solid #EFF1ED", background: "transparent", padding: "12px 16px", cursor: "pointer", textAlign: "left" }}>
              <span style={{ width: "30px", height: "30px", borderRadius: "8px", border: "1px solid #E4E7E2", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
                <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <rect x="6.6" y="6.6" width="9" height="9" rx="2" stroke="#4A564E" strokeWidth="1.5" />
                  <path d="M13 6.6V5.4a1.4 1.4 0 00-1.4-1.4H5.8A1.4 1.4 0 004.4 5.4v5.8A1.4 1.4 0 005.8 12.6H7" stroke="#4A564E" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "3px", flex: "1", minWidth: "0" }}>
                <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Duplicate</span>
                <span style={{ font: "400 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Create a copy as a draft</span>
              </span>
            </button>
            <button className="hv3" onClick={v.toast_export} style={{ display: "flex", alignItems: "center", gap: "11px", width: "100%", border: "0", borderBottom: "1px solid #EFF1ED", background: "transparent", padding: "12px 16px", cursor: "pointer", textAlign: "left" }}>
              <span style={{ width: "30px", height: "30px", borderRadius: "8px", border: "1px solid #E4E7E2", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
                <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <path d="M10 3.6v9M6.4 9.2L10 12.8l3.6-3.6M3.6 16.4h12.8" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "3px", flex: "1", minWidth: "0" }}>
                <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Export row</span>
                <span style={{ font: "400 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Download as CSV</span>
              </span>
            </button>
            <button className="hv3" onClick={v.archiveRecord} style={{ display: "flex", alignItems: "center", gap: "11px", width: "100%", border: "0", borderBottom: "1px solid #EFF1ED", background: "transparent", padding: "12px 16px", cursor: "pointer", textAlign: "left" }}>
              <span style={{ width: "30px", height: "30px", borderRadius: "8px", border: "1px solid #E4E7E2", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
                <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <rect x="3.2" y="4.4" width="13.6" height="3.4" rx="1.2" stroke="#4A564E" strokeWidth="1.5" />
                  <path d="M4.6 7.8h10.8v7.4a1.4 1.4 0 01-1.4 1.4H6a1.4 1.4 0 01-1.4-1.4V7.8z" stroke="#4A564E" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M8.2 11h3.6" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "3px", flex: "1", minWidth: "0" }}>
                <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Archive</span>
                <span style={{ font: "400 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Hide from lists, keep history</span>
              </span>
            </button>
            <button className="hv8" onClick={v.openDelete} style={{ display: "flex", alignItems: "center", gap: "11px", width: "100%", border: "0", borderBottom: "1px solid #EFF1ED", background: "transparent", padding: "12px 16px", cursor: "pointer", textAlign: "left" }}>
              <span style={{ width: "30px", height: "30px", borderRadius: "8px", border: "1px solid #EEDAD5", background: "#FDF7F5", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
                <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <path d="M4.6 5.6h10.8M8 5.6V4.2h4v1.4M6.2 5.6l.7 10a1 1 0 001 .9h4.2a1 1 0 001-.9l.7-10" stroke="#A93826" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "3px", flex: "1", minWidth: "0" }}>
                <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#A93826", whiteSpace: "nowrap" }}>Delete</span>
                <span style={{ font: "400 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Permanently remove this record</span>
              </span>
            </button>
          </div>
          <div style={{ padding: "13px 18px 16px", display: "flex", borderTop: "1px solid #EFF1ED", background: "#F6F7F4" }}>
            <button onClick={v.closeModal} style={{ marginLeft: "auto", height: "36px", padding: "0 14px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer" }}>
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
