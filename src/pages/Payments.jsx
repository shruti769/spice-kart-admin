export default function Payments({ v }) {
  return (
    <>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "18px", padding: "24px 26px 2px" }}>
        <span style={{ display: "flex", flexDirection: "column", gap: "5px", minWidth: "0" }}>
          <span style={{ font: "700 20px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Payments</span>
          <span style={{ font: "400 12.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>$38,420 collected today · 99.2% success rate</span>
        </span>
        <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "8px", height: "34px", width: "240px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff" }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
              <circle cx="9" cy="9" r="6" stroke="#7C8A81" strokeWidth="1.6" />
              <path d="M13.4 13.4L18 18" stroke="#7C8A81" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <span style={{ font: "400 12.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              Search transaction or order…
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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "14px" }}>
          <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "15px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "26px", height: "26px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <circle cx="10" cy="10" r="7.2" stroke="#4A564E" strokeWidth="1.5" />
                  <path d="M10 5.6v8.8" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M12.3 7.9c0-1.05-1.03-1.75-2.3-1.75s-2.3.7-2.3 1.75 1.03 1.55 2.3 1.85 2.3.8 2.3 1.85-1.03 1.75-2.3 1.75-2.3-.7-2.3-1.75" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
              <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Today’s revenue</span>
            </span>
            <span style={{ font: "700 23px/1.2 Inter,system-ui,sans-serif", color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>$38,420</span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
              ▲ 8.2%
            </span>
          </div>
          <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "15px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "26px", height: "26px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#4A564E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Successful</span>
            </span>
            <span style={{ font: "700 23px/1.2 Inter,system-ui,sans-serif", color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>1,268</span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
              99.2% of attempts
            </span>
          </div>
          <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "15px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "26px", height: "26px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <path d="M10 3.6l7 12.2H3l7-12.2z" stroke="#4A564E" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M10 8v3.4" stroke="#4A564E" strokeWidth="1.6" strokeLinecap="round" />
                  <circle cx="10" cy="13.6" r=".9" fill="#4A564E" />
                </svg>
              </span>
              <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Failed</span>
            </span>
            <span style={{ font: "700 23px/1.2 Inter,system-ui,sans-serif", color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>10</span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#A93826", background: "#FAEDEA", padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
              Card declines
            </span>
          </div>
          <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "15px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "26px", height: "26px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <path d="M4 10a6 6 0 1 1 2 4.5" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M4 6.4V10h3.6" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Refunds</span>
            </span>
            <span style={{ font: "700 23px/1.2 Inter,system-ui,sans-serif", color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>$1,284</span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", background: "#EEF0EC", padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
              18 refunds
            </span>
          </div>
          <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "15px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "26px", height: "26px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <circle cx="10" cy="10" r="7.2" stroke="#4A564E" strokeWidth="1.5" />
                  <path d="M10 5.8V10l3 1.8" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
              <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Pending</span>
            </span>
            <span style={{ font: "700 23px/1.2 Inter,system-ui,sans-serif", color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>6</span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#8A6100", background: "#FBF1DE", padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
              Awaiting bank
            </span>
          </div>
        </div>
        <div className="ad-scroll" style={{ display: "flex", gap: "2px", borderBottom: "1px solid #E4E7E2", overflowX: "auto" }}>
          <button onClick={v.tb_pay_0} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_pay_0Fg, borderBottom: `2px solid ${v.tb_pay_0Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
            All transactions
          </button>
          <button onClick={v.tb_pay_1} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_pay_1Fg, borderBottom: `2px solid ${v.tb_pay_1Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
            Paid
          </button>
          <button onClick={v.tb_pay_2} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_pay_2Fg, borderBottom: `2px solid ${v.tb_pay_2Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
            Pending
          </button>
          <button onClick={v.tb_pay_3} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_pay_3Fg, borderBottom: `2px solid ${v.tb_pay_3Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
            Failed
          </button>
          <button onClick={v.tb_pay_4} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_pay_4Fg, borderBottom: `2px solid ${v.tb_pay_4Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
            Refunded
          </button>
          <button onClick={v.tb_pay_5} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_pay_5Fg, borderBottom: `2px solid ${v.tb_pay_5Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
            Partially Refunded
          </button>
        </div>
        <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", overflow: "hidden", flex: "none" }}>
          {" "}
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr .9fr 1.2fr .8fr 1.3fr minmax(96px,1fr) 1.1fr", gap: "14px", padding: "11px 16px", background: "#F6F7F4", borderBottom: "1px solid #E4E7E2" }}>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              Transaction
            </span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              Order
            </span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              Customer
            </span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              Amount
            </span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              Method
            </span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              Status
            </span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              Date
            </span>
          </div>
          {" "}
          <div className="hv3" style={{ display: "grid", gridTemplateColumns: "1.1fr .9fr 1.2fr .8fr 1.3fr minmax(96px,1fr) 1.1fr", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                TXN-99184
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "500 12px/1.2 Inter,system-ui,sans-serif", color: "#17693A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>#SK10482</span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                John Smith
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>$94.04</span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Visa · 4417
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                Paid
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Today 12:42 PM
              </span>
            </span>
          </div>
          {" "}
          <div className="hv3" style={{ display: "grid", gridTemplateColumns: "1.1fr .9fr 1.2fr .8fr 1.3fr minmax(96px,1fr) 1.1fr", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                TXN-99183
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "500 12px/1.2 Inter,system-ui,sans-serif", color: "#17693A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>#SK10481</span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Priya Nair
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                $132.20
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Apple Pay
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                Paid
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Today 12:36 PM
              </span>
            </span>
          </div>
          {" "}
          <div className="hv3" style={{ display: "grid", gridTemplateColumns: "1.1fr .9fr 1.2fr .8fr 1.3fr minmax(96px,1fr) 1.1fr", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                TXN-99182
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "500 12px/1.2 Inter,system-ui,sans-serif", color: "#17693A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>#SK10480</span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Liam O’Brien
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>$36.90</span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>PayID</span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#8A6100", background: "#FBF1DE", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                Pending
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Today 12:28 PM
              </span>
            </span>
          </div>
          {" "}
          <div className="hv3" style={{ display: "grid", gridTemplateColumns: "1.1fr .9fr 1.2fr .8fr 1.3fr minmax(96px,1fr) 1.1fr", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                TXN-99181
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "500 12px/1.2 Inter,system-ui,sans-serif", color: "#17693A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>#SK10479</span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Mei Chen</span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>$97.40</span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Mastercard · 8802
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                Paid
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Today 12:14 PM
              </span>
            </span>
          </div>
          {" "}
          <div className="hv3" style={{ display: "grid", gridTemplateColumns: "1.1fr .9fr 1.2fr .8fr 1.3fr minmax(96px,1fr) 1.1fr", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                TXN-99180
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "500 12px/1.2 Inter,system-ui,sans-serif", color: "#17693A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>#SK10478</span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Daniel Cruz
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>$24.50</span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Visa · 1129
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#1F5C8B", background: "#E8F1F8", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                Refunded
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Today 11:58 AM
              </span>
            </span>
          </div>
          {" "}
          <div className="hv3" style={{ display: "grid", gridTemplateColumns: "1.1fr .9fr 1.2fr .8fr 1.3fr minmax(96px,1fr) 1.1fr", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                TXN-99179
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "500 12px/1.2 Inter,system-ui,sans-serif", color: "#17693A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>#SK10477</span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Ava Thompson
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                $164.80
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Google Pay
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                Paid
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Today 11:41 AM
              </span>
            </span>
          </div>
          {" "}
          <div className="hv3" style={{ display: "grid", gridTemplateColumns: "1.1fr .9fr 1.2fr .8fr 1.3fr minmax(96px,1fr) 1.1fr", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                TXN-99178
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "500 12px/1.2 Inter,system-ui,sans-serif", color: "#17693A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>#SK10476</span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Rohit Sharma
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>$58.20</span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Visa · 6640
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#A93826", background: "#FAEDEA", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                Failed
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Today 11:22 AM
              </span>
            </span>
          </div>
          {" "}
          <div className="hv3" style={{ display: "grid", gridTemplateColumns: "1.1fr .9fr 1.2fr .8fr 1.3fr minmax(96px,1fr) 1.1fr", gap: "14px", padding: "13px 16px", alignItems: "center" }}>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                TXN-99177
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "500 12px/1.2 Inter,system-ui,sans-serif", color: "#17693A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>#SK10475</span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Emily Nguyen
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                $118.60
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Spice Kart Money
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                Paid
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Today 10:58 AM
              </span>
            </span>
          </div>
          {" "}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderTop: "1px solid #E4E7E2", background: "#fff" }}>
            <span style={{ font: "400 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Showing 8 of 1,284 transactions</span>
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
              <span style={{ width: "28px", height: "28px", border: "1px solid #E4E7E2", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", background: "#fff" }}>
                <svg width="12" height="12" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <path d="M7.6 4.4L13 10l-5.4 5.6" stroke="#7C8A81" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </span>
          </div>
          {" "}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ font: "600 14px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Refund requests</span>
            <span>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#8A6100", background: "#FBF1DE", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                6 AWAITING REVIEW
              </span>
            </span>
            <button onClick={v.nav_refunds} style={{ marginLeft: "auto", border: "0", background: "transparent", font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#17693A", cursor: "pointer", padding: "0", whiteSpace: "nowrap" }}>
              All refunds →
            </button>
          </div>
          <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", overflow: "hidden", flex: "none" }}>
            {" "}
            <div style={{ display: "grid", gridTemplateColumns: ".9fr .9fr 1.1fr .7fr 1.1fr 1.3fr minmax(84px,.9fr) .9fr 96px", gap: "14px", padding: "11px 16px", background: "#F6F7F4", borderBottom: "1px solid #E4E7E2" }}>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Refund
              </span>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Order
              </span>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Customer
              </span>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Amount
              </span>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Reason
              </span>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Method
              </span>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Status
              </span>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Requested
              </span>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Actions
              </span>
            </div>
            {" "}
            <div className="hv3" style={{ display: "grid", gridTemplateColumns: ".9fr .9fr 1.1fr .7fr 1.1fr 1.3fr minmax(84px,.9fr) .9fr 96px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
              <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  RF-2188
                </span>
              </span>
              <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ font: "500 12px/1.2 Inter,system-ui,sans-serif", color: "#17693A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>#SK10478</span>
              </span>
              <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Daniel Cruz
                </span>
              </span>
              <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>$24.50</span>
              </span>
              <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Missing item
                </span>
              </span>
              <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Visa · 1129
                </span>
              </span>
              <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#8A6100", background: "#FBF1DE", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                  Pending
                </span>
              </span>
              <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Today 12:02 PM
                </span>
              </span>
              <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ marginLeft: "auto", display: "flex", gap: "6px" }}>
                  <button onClick={v.openRefund} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                    Review
                  </button>
                </span>
              </span>
            </div>
            {" "}
            <div className="hv3" style={{ display: "grid", gridTemplateColumns: ".9fr .9fr 1.1fr .7fr 1.1fr 1.3fr minmax(84px,.9fr) .9fr 96px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
              <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  RF-2187
                </span>
              </span>
              <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ font: "500 12px/1.2 Inter,system-ui,sans-serif", color: "#17693A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>#SK10462</span>
              </span>
              <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Mei Chen</span>
              </span>
              <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>$6.50</span>
              </span>
              <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Damaged item
                </span>
              </span>
              <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Spice Kart Money
                </span>
              </span>
              <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#8A6100", background: "#FBF1DE", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                  Pending
                </span>
              </span>
              <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Today 10:14 AM
                </span>
              </span>
              <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ marginLeft: "auto", display: "flex", gap: "6px" }}>
                  <button onClick={v.openRefund} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                    Review
                  </button>
                </span>
              </span>
            </div>
            {" "}
            <div className="hv3" style={{ display: "grid", gridTemplateColumns: ".9fr .9fr 1.1fr .7fr 1.1fr 1.3fr minmax(84px,.9fr) .9fr 96px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
              <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  RF-2186
                </span>
              </span>
              <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ font: "500 12px/1.2 Inter,system-ui,sans-serif", color: "#17693A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>#SK10441</span>
              </span>
              <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Ava Thompson
                </span>
              </span>
              <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>$14.40</span>
              </span>
              <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Late delivery
                </span>
              </span>
              <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Apple Pay
                </span>
              </span>
              <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                  Approved
                </span>
              </span>
              <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Yesterday
                </span>
              </span>
              <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ marginLeft: "auto", display: "flex", gap: "6px" }}>
                  <button onClick={v.openRefund} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                    Review
                  </button>
                </span>
              </span>
            </div>
            {" "}
            <div className="hv3" style={{ display: "grid", gridTemplateColumns: ".9fr .9fr 1.1fr .7fr 1.1fr 1.3fr minmax(84px,.9fr) .9fr 96px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
              <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  RF-2185
                </span>
              </span>
              <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ font: "500 12px/1.2 Inter,system-ui,sans-serif", color: "#17693A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>#SK10428</span>
              </span>
              <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Liam O’Brien
                </span>
              </span>
              <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>$8.90</span>
              </span>
              <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Quality issue
                </span>
              </span>
              <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Visa · 4417
                </span>
              </span>
              <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                  Approved
                </span>
              </span>
              <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Yesterday
                </span>
              </span>
              <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ marginLeft: "auto", display: "flex", gap: "6px" }}>
                  <button onClick={v.openRefund} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                    Review
                  </button>
                </span>
              </span>
            </div>
            {" "}
            <div className="hv3" style={{ display: "grid", gridTemplateColumns: ".9fr .9fr 1.1fr .7fr 1.1fr 1.3fr minmax(84px,.9fr) .9fr 96px", gap: "14px", padding: "13px 16px", alignItems: "center" }}>
              <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  RF-2184
                </span>
              </span>
              <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ font: "500 12px/1.2 Inter,system-ui,sans-serif", color: "#17693A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>#SK10402</span>
              </span>
              <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Rohit Sharma
                </span>
              </span>
              <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>$32.00</span>
              </span>
              <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Order cancelled
                </span>
              </span>
              <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>PayID</span>
              </span>
              <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#A93826", background: "#FAEDEA", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                  Rejected
                </span>
              </span>
              <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  2 days ago
                </span>
              </span>
              <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ marginLeft: "auto", display: "flex", gap: "6px" }}>
                  <button onClick={v.openRefund} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                    Review
                  </button>
                </span>
              </span>
            </div>
            {" "}
          </div>
        </div>
      </div>
    </>
  )
}
