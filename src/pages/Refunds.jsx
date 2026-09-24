export default function Refunds({ v }) {
  return (
    <>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "18px", padding: "24px 26px 2px" }}>
        <span style={{ display: "flex", flexDirection: "column", gap: "5px", minWidth: "0" }}>
          <span style={{ font: "700 20px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Refunds</span>
          <span style={{ font: "400 12.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>18 refunds today · $1,284 returned</span>
        </span>
        <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "8px", height: "34px", width: "230px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff" }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
              <circle cx="9" cy="9" r="6" stroke="#7C8A81" strokeWidth="1.6" />
              <path d="M13.4 13.4L18 18" stroke="#7C8A81" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <span style={{ font: "400 12.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              Search refund or order…
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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "14px" }}>
          <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "15px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "26px", height: "26px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <path d="M4 10a6 6 0 1 1 2 4.5" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M4 6.4V10h3.6" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Refunds today</span>
            </span>
            <span style={{ font: "700 23px/1.2 Inter,system-ui,sans-serif", color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>18</span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", background: "#EEF0EC", padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
              $1,284 total
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
              <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Awaiting review</span>
            </span>
            <span style={{ font: "700 23px/1.2 Inter,system-ui,sans-serif", color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>6</span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#8A6100", background: "#FBF1DE", padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
              Oldest 2 hrs
            </span>
          </div>
          <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "15px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "26px", height: "26px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#4A564E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Approved (30d)</span>
            </span>
            <span style={{ font: "700 23px/1.2 Inter,system-ui,sans-serif", color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>412</span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
              94.2% approval
            </span>
          </div>
          <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "15px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "26px", height: "26px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <path d="M3.4 3.4v12.2a1 1 0 001 1h12.2" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M6.8 13.2l3-3.4 2.4 2.2 3.6-4.4" stroke="#4A564E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Refund rate</span>
            </span>
            <span style={{ font: "700 23px/1.2 Inter,system-ui,sans-serif", color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>1.4%</span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
              ▼ 0.3% vs last month
            </span>
          </div>
        </div>
        <div className="ad-scroll" style={{ display: "flex", gap: "2px", borderBottom: "1px solid #E4E7E2", overflowX: "auto" }}>
          <button onClick={v.tb_refunds_0} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_refunds_0Fg, borderBottom: `2px solid ${v.tb_refunds_0Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
            All refunds
          </button>
          <button onClick={v.tb_refunds_1} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_refunds_1Fg, borderBottom: `2px solid ${v.tb_refunds_1Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
            Pending
          </button>
          <button onClick={v.tb_refunds_2} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_refunds_2Fg, borderBottom: `2px solid ${v.tb_refunds_2Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
            Approved
          </button>
          <button onClick={v.tb_refunds_3} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_refunds_3Fg, borderBottom: `2px solid ${v.tb_refunds_3Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
            Rejected
          </button>
          <button onClick={v.tb_refunds_4} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_refunds_4Fg, borderBottom: `2px solid ${v.tb_refunds_4Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
            Processing
          </button>
        </div>
        <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", overflow: "hidden", flex: "none" }}>
          {" "}
          <div style={{ display: "grid", gridTemplateColumns: ".8fr .8fr 1fr .7fr 1.1fr .9fr minmax(84px,.9fr) .9fr .9fr 96px", gap: "14px", padding: "11px 16px", background: "#F6F7F4", borderBottom: "1px solid #E4E7E2" }}>
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
              Processed
            </span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              Actions
            </span>
          </div>
          {" "}
          <div className="hv3" style={{ display: "grid", gridTemplateColumns: ".8fr .8fr 1fr .7fr 1.1fr .9fr minmax(84px,.9fr) .9fr .9fr 96px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
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
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>—</span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ marginLeft: "auto" }}>
                <button onClick={v.openRefund} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                  Review
                </button>
              </span>
            </span>
          </div>
          {" "}
          <div className="hv3" style={{ display: "grid", gridTemplateColumns: ".8fr .8fr 1fr .7fr 1.1fr .9fr minmax(84px,.9fr) .9fr .9fr 96px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
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
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Wallet</span>
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
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>—</span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ marginLeft: "auto" }}>
                <button onClick={v.openRefund} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                  Review
                </button>
              </span>
            </span>
          </div>
          {" "}
          <div className="hv3" style={{ display: "grid", gridTemplateColumns: ".8fr .8fr 1fr .7fr 1.1fr .9fr minmax(84px,.9fr) .9fr .9fr 96px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
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
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Yesterday
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ marginLeft: "auto" }}>
                <button onClick={v.openRefund} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                  Review
                </button>
              </span>
            </span>
          </div>
          {" "}
          <div className="hv3" style={{ display: "grid", gridTemplateColumns: ".8fr .8fr 1fr .7fr 1.1fr .9fr minmax(84px,.9fr) .9fr .9fr 96px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
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
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Yesterday
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ marginLeft: "auto" }}>
                <button onClick={v.openRefund} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                  Review
                </button>
              </span>
            </span>
          </div>
          {" "}
          <div className="hv3" style={{ display: "grid", gridTemplateColumns: ".8fr .8fr 1fr .7fr 1.1fr .9fr minmax(84px,.9fr) .9fr .9fr 96px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
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
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                2 days ago
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ marginLeft: "auto" }}>
                <button onClick={v.openRefund} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                  Review
                </button>
              </span>
            </span>
          </div>
          {" "}
          <div className="hv3" style={{ display: "grid", gridTemplateColumns: ".8fr .8fr 1fr .7fr 1.1fr .9fr minmax(84px,.9fr) .9fr .9fr 96px", gap: "14px", padding: "13px 16px", alignItems: "center" }}>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                RF-2183
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "500 12px/1.2 Inter,system-ui,sans-serif", color: "#17693A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>#SK10388</span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                John Smith
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>$14.40</span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Missing item
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Wallet</span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                Approved
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                3 days ago
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                3 days ago
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ marginLeft: "auto" }}>
                <button onClick={v.openRefund} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                  Review
                </button>
              </span>
            </span>
          </div>
          {" "}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderTop: "1px solid #E4E7E2", background: "#fff" }}>
            <span style={{ font: "400 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Showing 6 of 412 refunds</span>
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
      </div>
    </>
  )
}
