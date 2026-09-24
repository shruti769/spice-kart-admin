import imgBasmatiRice from '../assets/images/basmati-rice.jpg'

export default function ProductDetail({ v }) {
  return (
    <>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "18px", padding: "24px 26px 2px" }}>
        <span style={{ display: "flex", flexDirection: "column", gap: "5px", minWidth: "0" }}>
          <span style={{ font: "700 20px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Basmati Rice 5kg</span>
          <span style={{ font: "400 12.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>SK-PAN-0142 · Grains, Rice & Cereals › Basmati</span>
        </span>
        <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px" }}>
          <button className="hv1" onClick={v.duplicateRecord} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 12px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", color: "#17201A", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
            Duplicate
          </button>
          <button className="hv1" onClick={v.archiveRecord} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 12px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", color: "#17201A", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
            Archive
          </button>
          <button onClick={v.openDelete} style={{ height: "34px", padding: "0 12px", border: "1px solid #EEDAD5", borderRadius: "8px", background: "#FDF7F5", color: "#A93826", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
            Delete
          </button>
          <button className="hv2" onClick={v.nav_editproduct} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 13px", border: "0", borderRadius: "8px", background: "#0B3D1F", color: "#fff", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
            Edit product
          </button>
        </span>
      </div>
      <div className="ad-scroll" style={{ flex: "1", minHeight: "0", overflowY: "auto", padding: "20px 26px 30px", display: "flex", flexDirection: "column", gap: "18px" }}>
        <button onClick={v.nav_products} style={{ display: "flex", alignItems: "center", gap: "6px", border: "0", background: "transparent", font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#17693A", cursor: "pointer", padding: "0", whiteSpace: "nowrap", alignSelf: "flex-start" }}>
          <svg width="13" height="13" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
            <path d="M12.4 4.4L6.8 10l5.6 5.6" stroke="#17693A" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to products
        </button>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.7fr", gap: "18px", alignItems: "start" }}>
          <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "18px", display: "flex", flexDirection: "column", gap: "14px" }}>
            <span style={{ position: "relative", height: "186px", borderRadius: "9px", overflow: "hidden", border: "1px solid #E4E7E2", background: "#F6F7F4", display: "block" }}>
              {" "}
              <img src={imgBasmatiRice} alt="" loading="lazy" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
              {" "}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#A93826", background: "#FAEDEA", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                Critical
              </span>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                ORGANIC
              </span>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#5F6B62", background: "#EEF0EC", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                IMPORTED
              </span>
            </span>
            <span style={{ display: "flex", alignItems: "baseline", gap: "9px" }}>
              <span style={{ font: "700 22px/1.2 Inter,system-ui,sans-serif", color: "#17201A" }}>$24.50</span>
              <span style={{ font: "400 13px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", textDecoration: "line-through" }}>$28.00</span>
            </span>
            <span style={{ display: "flex", justifyContent: "space-between", gap: "14px", whiteSpace: "nowrap", padding: "7px 0", borderTop: "1px solid #EFF1ED" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>SKU</span>
              <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                SK-PAN-0142
              </span>
            </span>
            <span style={{ display: "flex", justifyContent: "space-between", gap: "14px", whiteSpace: "nowrap", padding: "7px 0", borderTop: "1px solid #EFF1ED" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Brand</span>
              <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Pantry Co
              </span>
            </span>
            <span style={{ display: "flex", justifyContent: "space-between", gap: "14px", whiteSpace: "nowrap", padding: "7px 0", borderTop: "1px solid #EFF1ED" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Weight</span>
              <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>5 kg</span>
            </span>
            <span style={{ display: "flex", justifyContent: "space-between", gap: "14px", whiteSpace: "nowrap", padding: "7px 0", borderTop: "1px solid #EFF1ED" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Origin</span>
              <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>India</span>
            </span>
            <span style={{ display: "flex", justifyContent: "space-between", gap: "14px", whiteSpace: "nowrap", padding: "7px 0", borderTop: "1px solid #EFF1ED" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Warehouse
              </span>
              <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Collingwood DC
              </span>
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "14px" }}>
              <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "15px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "26px", height: "26px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                      <path d="M3.4 6.6L10 3.3l6.6 3.3L10 9.9 3.4 6.6z" stroke="#4A564E" strokeWidth="1.5" strokeLinejoin="round" />
                      <path d="M3.4 6.6v6.8L10 16.7l6.6-3.3V6.6" stroke="#4A564E" strokeWidth="1.5" strokeLinejoin="round" />
                      <path d="M10 9.9v6.8" stroke="#4A564E" strokeWidth="1.5" />
                    </svg>
                  </span>
                  <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Units sold (30d)</span>
                </span>
                <span style={{ font: "700 23px/1.2 Inter,system-ui,sans-serif", color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>1,842</span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
                  ▲ 14.2%
                </span>
              </div>
              <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "15px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "26px", height: "26px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                      <circle cx="10" cy="10" r="7.2" stroke="#4A564E" strokeWidth="1.5" />
                      <path d="M10 5.6v8.8" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M12.3 7.9c0-1.05-1.03-1.75-2.3-1.75s-2.3.7-2.3 1.75 1.03 1.55 2.3 1.85 2.3.8 2.3 1.85-1.03 1.75-2.3 1.75-2.3-.7-2.3-1.75" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </span>
                  <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Revenue (30d)</span>
                </span>
                <span style={{ font: "700 23px/1.2 Inter,system-ui,sans-serif", color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>$45,129</span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
                  ▲ 9.8%
                </span>
              </div>
              <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "15px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "26px", height: "26px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                      <rect x="3" y="8.8" width="6" height="7.8" rx="1.4" stroke="#4A564E" strokeWidth="1.5" />
                      <rect x="11" y="8.8" width="6" height="7.8" rx="1.4" stroke="#4A564E" strokeWidth="1.5" />
                      <rect x="7" y="3.4" width="6" height="4.6" rx="1.4" stroke="#4A564E" strokeWidth="1.5" />
                    </svg>
                  </span>
                  <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Current stock</span>
                </span>
                <span style={{ font: "700 23px/1.2 Inter,system-ui,sans-serif", color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>6</span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#A93826", background: "#FAEDEA", padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
                  Below minimum
                </span>
              </div>
              <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "15px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "26px", height: "26px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                      <path d="M10 3.2l2.1 4.3 4.7.7-3.4 3.3.8 4.7L10 14l-4.2 2.2.8-4.7L3.2 8.2l4.7-.7L10 3.2z" stroke="#4A564E" strokeWidth="1.5" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Return rate</span>
                </span>
                <span style={{ font: "700 23px/1.2 Inter,system-ui,sans-serif", color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>0.4%</span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
                  Healthy
                </span>
              </div>
            </div>
            <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "18px", display: "flex", flexDirection: "column", gap: "15px" }}>
              <span style={{ font: "600 13.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A" }}>Sales trend · last 14 days</span>
              <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", height: "112px" }}>
                <span style={{ flex: "1", height: "48%", background: "#DCE9D2", borderRadius: "4px 4px 0 0", display: "block" }} />
                <span style={{ flex: "1", height: "62%", background: "#DCE9D2", borderRadius: "4px 4px 0 0", display: "block" }} />
                <span style={{ flex: "1", height: "55%", background: "#DCE9D2", borderRadius: "4px 4px 0 0", display: "block" }} />
                <span style={{ flex: "1", height: "71%", background: "#DCE9D2", borderRadius: "4px 4px 0 0", display: "block" }} />
                <span style={{ flex: "1", height: "66%", background: "#DCE9D2", borderRadius: "4px 4px 0 0", display: "block" }} />
                <span style={{ flex: "1", height: "84%", background: "#DCE9D2", borderRadius: "4px 4px 0 0", display: "block" }} />
                <span style={{ flex: "1", height: "79%", background: "#DCE9D2", borderRadius: "4px 4px 0 0", display: "block" }} />
                <span style={{ flex: "1", height: "58%", background: "#DCE9D2", borderRadius: "4px 4px 0 0", display: "block" }} />
                <span style={{ flex: "1", height: "73%", background: "#DCE9D2", borderRadius: "4px 4px 0 0", display: "block" }} />
                <span style={{ flex: "1", height: "88%", background: "#DCE9D2", borderRadius: "4px 4px 0 0", display: "block" }} />
                <span style={{ flex: "1", height: "76%", background: "#DCE9D2", borderRadius: "4px 4px 0 0", display: "block" }} />
                <span style={{ flex: "1", height: "91%", background: "#DCE9D2", borderRadius: "4px 4px 0 0", display: "block" }} />
                <span style={{ flex: "1", height: "84%", background: "#DCE9D2", borderRadius: "4px 4px 0 0", display: "block" }} />
                <span style={{ flex: "1", height: "96%", background: "#0B3D1F", borderRadius: "4px 4px 0 0", display: "block" }} />
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <span style={{ font: "600 13.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A" }}>Recent orders with this product</span>
              <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", overflow: "hidden", flex: "none" }}>
                {" "}
                <div style={{ display: "grid", gridTemplateColumns: ".9fr 1.2fr .5fr .7fr 1fr 1fr", gap: "14px", padding: "11px 16px", background: "#F6F7F4", borderBottom: "1px solid #E4E7E2" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Order
                  </span>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Customer
                  </span>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Qty
                  </span>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Value
                  </span>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Status
                  </span>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Date
                  </span>
                </div>
                {" "}
                <div className="hv3" style={{ display: "grid", gridTemplateColumns: ".9fr 1.2fr .5fr .7fr 1fr 1fr", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                  <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      #SK10482
                    </span>
                  </span>
                  <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      John Smith
                    </span>
                  </span>
                  <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>2</span>
                  </span>
                  <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>$17.00</span>
                  </span>
                  <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#8A6100", background: "#FBF1DE", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                      Preparing
                    </span>
                  </span>
                  <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      Today 12:42 PM
                    </span>
                  </span>
                </div>
                {" "}
                <div className="hv3" style={{ display: "grid", gridTemplateColumns: ".9fr 1.2fr .5fr .7fr 1fr 1fr", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                  <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      #SK10469
                    </span>
                  </span>
                  <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      Rohit Sharma
                    </span>
                  </span>
                  <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>1</span>
                  </span>
                  <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>$8.50</span>
                  </span>
                  <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                      Delivered
                    </span>
                  </span>
                  <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      Today 9:14 AM
                    </span>
                  </span>
                </div>
                {" "}
                <div className="hv3" style={{ display: "grid", gridTemplateColumns: ".9fr 1.2fr .5fr .7fr 1fr 1fr", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                  <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      #SK10451
                    </span>
                  </span>
                  <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      Mei Chen
                    </span>
                  </span>
                  <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>3</span>
                  </span>
                  <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>$25.50</span>
                  </span>
                  <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                      Delivered
                    </span>
                  </span>
                  <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      Yesterday
                    </span>
                  </span>
                </div>
                {" "}
                <div className="hv3" style={{ display: "grid", gridTemplateColumns: ".9fr 1.2fr .5fr .7fr 1fr 1fr", gap: "14px", padding: "13px 16px", alignItems: "center" }}>
                  <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      #SK10438
                    </span>
                  </span>
                  <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      Ava Thompson
                    </span>
                  </span>
                  <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>1</span>
                  </span>
                  <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>$8.50</span>
                  </span>
                  <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                      Delivered
                    </span>
                  </span>
                  <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      Yesterday
                    </span>
                  </span>
                </div>
                {" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
