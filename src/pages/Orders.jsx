export default function Orders({ v }) {
  return (
    <>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "18px", padding: "24px 26px 2px" }}>
        <span style={{ display: "flex", flexDirection: "column", gap: "5px", minWidth: "0" }}>
          <span style={{ font: "700 20px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Orders</span>
          <span style={{ font: "400 12.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>1,284 orders today · 86 need attention</span>
        </span>
        <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "8px", height: "34px", width: "230px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff" }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
              <circle cx="9" cy="9" r="6" stroke="#7C8A81" strokeWidth="1.6" />
              <path d="M13.4 13.4L18 18" stroke="#7C8A81" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <span style={{ font: "400 12.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              Search order ID, customer…
            </span>
          </span>
          <button className="hv1" onClick={v.openFilterDrawer} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 12px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", color: "#17201A", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
              <path d="M3 5.4h14M5.6 10h8.8M8.4 14.6h3.2" stroke="#4A564E" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            Filter
          </button>
          <button className="hv1" onClick={v.toast_export} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 12px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", color: "#17201A", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
              <path d="M10 3.6v9M6.4 9.2L10 12.8l3.6-3.6M3.6 16.4h12.8" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Export
          </button>
        </span>
      </div>
      <div className="ad-scroll" style={{ flex: "1", minHeight: "0", overflowY: "auto", padding: "20px 26px 30px", display: "flex", flexDirection: "column", gap: "18px" }}>
        <div className="ad-scroll" style={{ display: "flex", gap: "2px", borderBottom: "1px solid #E4E7E2", overflowX: "auto" }}>
          <button onClick={v.tb_orders_0} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_orders_0Fg, borderBottom: `2px solid ${v.tb_orders_0Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
            All
          </button>
          <button onClick={v.tb_orders_1} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_orders_1Fg, borderBottom: `2px solid ${v.tb_orders_1Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
            Pending
          </button>
          <button onClick={v.tb_orders_2} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_orders_2Fg, borderBottom: `2px solid ${v.tb_orders_2Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
            Confirmed
          </button>
          <button onClick={v.tb_orders_3} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_orders_3Fg, borderBottom: `2px solid ${v.tb_orders_3Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
            Preparing
          </button>
          <button onClick={v.tb_orders_4} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_orders_4Fg, borderBottom: `2px solid ${v.tb_orders_4Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
            Ready
          </button>
          <button onClick={v.tb_orders_5} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_orders_5Fg, borderBottom: `2px solid ${v.tb_orders_5Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
            Out for Delivery
          </button>
          <button onClick={v.tb_orders_6} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_orders_6Fg, borderBottom: `2px solid ${v.tb_orders_6Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
            Delivered
          </button>
          <button onClick={v.tb_orders_7} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_orders_7Fg, borderBottom: `2px solid ${v.tb_orders_7Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
            Cancelled
          </button>
          <button onClick={v.tb_orders_8} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_orders_8Fg, borderBottom: `2px solid ${v.tb_orders_8Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
            Refunded
          </button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
          <button onClick={v.cho_0} style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: v.cho_0Fg, background: v.cho_0Bg, border: `1px solid ${v.cho_0Bd}`, padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap", cursor: "pointer" }}>
            Status: All
          </button>
          <button onClick={v.cho_1} style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: v.cho_1Fg, background: v.cho_1Bg, border: `1px solid ${v.cho_1Bd}`, padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap", cursor: "pointer" }}>
            Payment: All
          </button>
          <button onClick={v.cho_2} style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: v.cho_2Fg, background: v.cho_2Bg, border: `1px solid ${v.cho_2Bd}`, padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap", cursor: "pointer" }}>
            Type: Express
          </button>
          <button onClick={v.cho_3} style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: v.cho_3Fg, background: v.cho_3Bg, border: `1px solid ${v.cho_3Bd}`, padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap", cursor: "pointer" }}>
            Today
          </button>
          <button onClick={v.cho_4} style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: v.cho_4Fg, background: v.cho_4Bg, border: `1px solid ${v.cho_4Bd}`, padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap", cursor: "pointer" }}>
            Value: any
          </button>
          <button onClick={v.clearFilters} style={{ border: "0", background: "transparent", font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#17693A", cursor: "pointer", whiteSpace: "nowrap", padding: "0" }}>
            Clear filters
          </button>
        </div>
        <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", overflow: "hidden", flex: "none" }}>
          {" "}
          <div style={{ display: "flex", alignItems: "center", gap: "9px", padding: "12px 16px", borderBottom: "1px solid #E4E7E2", flexWrap: "wrap" }}>
            <span style={{ font: "600 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>2 selected</span>
            <span style={{ width: "1px", height: "18px", background: "#E4E7E2" }} />
            <button className="hv1" onClick={v.openStatus} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 12px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", color: "#17201A", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
              Change status
            </button>
            <button className="hv1" onClick={v.openAssign} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 12px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", color: "#17201A", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
              Assign driver
            </button>
            <button className="hv1" onClick={v.openPrint} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 12px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", color: "#17201A", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
              Print invoices
            </button>
            <span style={{ marginLeft: "auto" }} />
            <button onClick={v.openCancel} style={{ height: "34px", padding: "0 12px", border: "1px solid #EEDAD5", borderRadius: "8px", background: "#FDF7F5", color: "#A93826", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
              Cancel orders
            </button>
          </div>
          {" "}
          <div style={{ display: "grid", gridTemplateColumns: "118px 1.3fr .8fr .8fr .9fr minmax(74px,.9fr) minmax(118px,1.2fr) 1.1fr 120px", gap: "14px", padding: "11px 16px", background: "#F6F7F4", borderBottom: "1px solid #E4E7E2" }}>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              Order
            </span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              Customer
            </span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              Items
            </span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              Value
            </span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              Type
            </span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              Payment
            </span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              Status
            </span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              Placed
            </span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              Actions
            </span>
          </div>
          {" "}
          <div className="hv3" style={{ display: "grid", gridTemplateColumns: "118px 1.3fr .8fr .8fr .9fr minmax(74px,.9fr) minmax(118px,1.2fr) 1.1fr 120px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "15px", height: "15px", border: "1.5px solid #E4E7E2", borderRadius: "4px", background: "#fff", display: "block", flex: "none" }} />
              <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                #SK10482
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "28px", height: "28px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", flex: "none" }}>
                JS
              </span>
              <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                John Smith
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>8 items</span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>$84.50</span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Express</span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                Paid
              </span>
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
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                <button onClick={v.openOrder} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                  View
                </button>
                <button onClick={v.openRowActions} aria-label="More" style={{ width: "26px", height: "26px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <circle cx="5" cy="10" r="1.3" fill="#7C8A81" />
                    <circle cx="10" cy="10" r="1.3" fill="#7C8A81" />
                    <circle cx="15" cy="10" r="1.3" fill="#7C8A81" />
                  </svg>
                </button>
              </span>
            </span>
          </div>
          {" "}
          <div className="hv3" style={{ display: "grid", gridTemplateColumns: "118px 1.3fr .8fr .8fr .9fr minmax(74px,.9fr) minmax(118px,1.2fr) 1.1fr 120px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "15px", height: "15px", border: "1.5px solid #E4E7E2", borderRadius: "4px", background: "#fff", display: "block", flex: "none" }} />
              <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                #SK10481
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "28px", height: "28px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", flex: "none" }}>
                PN
              </span>
              <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Priya Nair
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>12 items</span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                $132.20
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Express</span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                Paid
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#1F5C8B", background: "#E8F1F8", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                Out for Delivery
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Today 12:36 PM
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                <button onClick={v.openOrder} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                  View
                </button>
                <button onClick={v.openRowActions} aria-label="More" style={{ width: "26px", height: "26px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <circle cx="5" cy="10" r="1.3" fill="#7C8A81" />
                    <circle cx="10" cy="10" r="1.3" fill="#7C8A81" />
                    <circle cx="15" cy="10" r="1.3" fill="#7C8A81" />
                  </svg>
                </button>
              </span>
            </span>
          </div>
          {" "}
          <div className="hv3" style={{ display: "grid", gridTemplateColumns: "118px 1.3fr .8fr .8fr .9fr minmax(74px,.9fr) minmax(118px,1.2fr) 1.1fr 120px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "15px", height: "15px", border: "1.5px solid #E4E7E2", borderRadius: "4px", background: "#fff", display: "block", flex: "none" }} />
              <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                #SK10480
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "28px", height: "28px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", flex: "none" }}>
                LO
              </span>
              <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Liam O’Brien
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>4 items</span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>$36.90</span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Scheduled
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#8A6100", background: "#FBF1DE", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                Pending
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#1F5C8B", background: "#E8F1F8", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                Confirmed
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Today 12:28 PM
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                <button onClick={v.openOrder} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                  View
                </button>
                <button onClick={v.openRowActions} aria-label="More" style={{ width: "26px", height: "26px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <circle cx="5" cy="10" r="1.3" fill="#7C8A81" />
                    <circle cx="10" cy="10" r="1.3" fill="#7C8A81" />
                    <circle cx="15" cy="10" r="1.3" fill="#7C8A81" />
                  </svg>
                </button>
              </span>
            </span>
          </div>
          {" "}
          <div className="hv3" style={{ display: "grid", gridTemplateColumns: "118px 1.3fr .8fr .8fr .9fr minmax(74px,.9fr) minmax(118px,1.2fr) 1.1fr 120px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "15px", height: "15px", border: "1.5px solid #E4E7E2", borderRadius: "4px", background: "#fff", display: "block", flex: "none" }} />
              <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                #SK10479
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "28px", height: "28px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", flex: "none" }}>
                MC
              </span>
              <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Mei Chen
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>9 items</span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>$97.40</span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Express</span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                Paid
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                Delivered
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Today 12:14 PM
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                <button onClick={v.openOrder} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                  View
                </button>
                <button onClick={v.openRowActions} aria-label="More" style={{ width: "26px", height: "26px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <circle cx="5" cy="10" r="1.3" fill="#7C8A81" />
                    <circle cx="10" cy="10" r="1.3" fill="#7C8A81" />
                    <circle cx="15" cy="10" r="1.3" fill="#7C8A81" />
                  </svg>
                </button>
              </span>
            </span>
          </div>
          {" "}
          <div className="hv3" style={{ display: "grid", gridTemplateColumns: "118px 1.3fr .8fr .8fr .9fr minmax(74px,.9fr) minmax(118px,1.2fr) 1.1fr 120px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "15px", height: "15px", border: "1.5px solid #E4E7E2", borderRadius: "4px", background: "#fff", display: "block", flex: "none" }} />
              <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                #SK10478
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "28px", height: "28px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", flex: "none" }}>
                DC
              </span>
              <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Daniel Cruz
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>3 items</span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>$24.50</span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Refunded</span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#1F5C8B", background: "#E8F1F8", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                Refunded
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#A93826", background: "#FAEDEA", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                Cancelled
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Today 11:58 AM
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                <button onClick={v.openOrder} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                  View
                </button>
                <button onClick={v.openRowActions} aria-label="More" style={{ width: "26px", height: "26px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <circle cx="5" cy="10" r="1.3" fill="#7C8A81" />
                    <circle cx="10" cy="10" r="1.3" fill="#7C8A81" />
                    <circle cx="15" cy="10" r="1.3" fill="#7C8A81" />
                  </svg>
                </button>
              </span>
            </span>
          </div>
          {" "}
          <div className="hv3" style={{ display: "grid", gridTemplateColumns: "118px 1.3fr .8fr .8fr .9fr minmax(74px,.9fr) minmax(118px,1.2fr) 1.1fr 120px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "15px", height: "15px", border: "1.5px solid #E4E7E2", borderRadius: "4px", background: "#fff", display: "block", flex: "none" }} />
              <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                #SK10477
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "28px", height: "28px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", flex: "none" }}>
                AT
              </span>
              <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Ava Thompson
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>15 items</span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                $164.80
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Express</span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                Paid
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                Delivered
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Today 11:41 AM
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                <button onClick={v.openOrder} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                  View
                </button>
                <button onClick={v.openRowActions} aria-label="More" style={{ width: "26px", height: "26px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <circle cx="5" cy="10" r="1.3" fill="#7C8A81" />
                    <circle cx="10" cy="10" r="1.3" fill="#7C8A81" />
                    <circle cx="15" cy="10" r="1.3" fill="#7C8A81" />
                  </svg>
                </button>
              </span>
            </span>
          </div>
          {" "}
          <div className="hv3" style={{ display: "grid", gridTemplateColumns: "118px 1.3fr .8fr .8fr .9fr minmax(74px,.9fr) minmax(118px,1.2fr) 1.1fr 120px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "15px", height: "15px", border: "1.5px solid #E4E7E2", borderRadius: "4px", background: "#fff", display: "block", flex: "none" }} />
              <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                #SK10476
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "28px", height: "28px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", flex: "none" }}>
                RS
              </span>
              <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Rohit Sharma
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>6 items</span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>$58.20</span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Scheduled
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                Paid
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#1F5C8B", background: "#E8F1F8", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                Ready
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Today 11:22 AM
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                <button onClick={v.openOrder} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                  View
                </button>
                <button onClick={v.openRowActions} aria-label="More" style={{ width: "26px", height: "26px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <circle cx="5" cy="10" r="1.3" fill="#7C8A81" />
                    <circle cx="10" cy="10" r="1.3" fill="#7C8A81" />
                    <circle cx="15" cy="10" r="1.3" fill="#7C8A81" />
                  </svg>
                </button>
              </span>
            </span>
          </div>
          {" "}
          <div className="hv3" style={{ display: "grid", gridTemplateColumns: "118px 1.3fr .8fr .8fr .9fr minmax(74px,.9fr) minmax(118px,1.2fr) 1.1fr 120px", gap: "14px", padding: "13px 16px", alignItems: "center" }}>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "15px", height: "15px", border: "1.5px solid #E4E7E2", borderRadius: "4px", background: "#fff", display: "block", flex: "none" }} />
              <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                #SK10475
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "28px", height: "28px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", flex: "none" }}>
                EN
              </span>
              <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Emily Nguyen
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>11 items</span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                $118.60
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Express</span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                Paid
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                Delivered
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Today 10:58 AM
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                <button onClick={v.openOrder} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                  View
                </button>
                <button onClick={v.openRowActions} aria-label="More" style={{ width: "26px", height: "26px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <circle cx="5" cy="10" r="1.3" fill="#7C8A81" />
                    <circle cx="10" cy="10" r="1.3" fill="#7C8A81" />
                    <circle cx="15" cy="10" r="1.3" fill="#7C8A81" />
                  </svg>
                </button>
              </span>
            </span>
          </div>
          {" "}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderTop: "1px solid #E4E7E2", background: "#fff" }}>
            <span style={{ font: "400 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Showing 8 of 1,284 orders</span>
            <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "5px" }}>
              <span style={{ width: "28px", height: "28px", border: "1px solid #E4E7E2", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", background: "#fff" }}>
                <svg width="12" height="12" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <path d="M12.4 4.4L6.8 10l5.6 5.6" stroke="#7C8A81" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span style={{ minWidth: "28px", height: "28px", borderRadius: "6px", background: "#0B3D1F", color: "#fff", font: "600 11.5px/1.2 Inter,system-ui,sans-serif", display: "flex", alignItems: "center", justifyContent: "center" }}>
                1
              </span>
              <span style={{ minWidth: "28px", height: "28px", border: "1px solid #E4E7E2", borderRadius: "6px", font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", display: "flex", alignItems: "center", justifyContent: "center", background: "#fff" }}>
                2
              </span>
              <span style={{ minWidth: "28px", height: "28px", border: "1px solid #E4E7E2", borderRadius: "6px", font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", display: "flex", alignItems: "center", justifyContent: "center", background: "#fff" }}>
                3
              </span>
              <span style={{ width: "28px", height: "28px", border: "1px solid #E4E7E2", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", background: "#fff" }}>
                <svg width="12" height="12" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <path d="M7.6 4.4L13 10l-5.4 5.6" stroke="#7C8A81" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </span>
          </div>
          {" "}
        </div>
      </div>
    </>
  )
}
