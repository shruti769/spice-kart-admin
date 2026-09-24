export default function Customers({ v }) {
  return (
    <>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "18px", padding: "24px 26px 2px" }}>
        <span style={{ display: "flex", flexDirection: "column", gap: "5px", minWidth: "0" }}>
          <span style={{ font: "700 20px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Customers</span>
          <span style={{ font: "400 12.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>8,642 active customers · 214 new this week</span>
        </span>
        <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "8px", height: "34px", width: "230px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff" }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
              <circle cx="9" cy="9" r="6" stroke="#7C8A81" strokeWidth="1.6" />
              <path d="M13.4 13.4L18 18" stroke="#7C8A81" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <span style={{ font: "400 12.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              Search name, email, phone…
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
                  <circle cx="8.4" cy="7.4" r="2.8" stroke="#4A564E" strokeWidth="1.5" />
                  <path d="M3.4 16.5c.8-2.9 2.6-4.3 5-4.3s4.2 1.4 5 4.3" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M14 5.3a2.6 2.6 0 010 4.8M15.5 16.5c-.3-1.8-.9-3.1-1.8-4" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
              <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Total customers</span>
            </span>
            <span style={{ font: "700 23px/1.2 Inter,system-ui,sans-serif", color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>11,284</span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
              ▲ 6.2% this month
            </span>
          </div>
          <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "15px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "26px", height: "26px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <path d="M10 4.4v11.2M4.4 10h11.2" stroke="#4A564E" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </span>
              <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>New customers</span>
            </span>
            <span style={{ font: "700 23px/1.2 Inter,system-ui,sans-serif", color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>214</span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
              This week
            </span>
          </div>
          <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "15px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "26px", height: "26px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#4A564E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Active customers</span>
            </span>
            <span style={{ font: "700 23px/1.2 Inter,system-ui,sans-serif", color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>8,642</span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
              Ordered in 30 days
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
              <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Returning rate</span>
            </span>
            <span style={{ font: "700 23px/1.2 Inter,system-ui,sans-serif", color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>68.4%</span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
              ▲ 2.1%
            </span>
          </div>
        </div>
        <div className="ad-scroll" style={{ display: "flex", gap: "2px", borderBottom: "1px solid #E4E7E2", overflowX: "auto" }}>
          <button onClick={v.tb_cust_0} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_cust_0Fg, borderBottom: `2px solid ${v.tb_cust_0Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
            All
          </button>
          <button onClick={v.tb_cust_1} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_cust_1Fg, borderBottom: `2px solid ${v.tb_cust_1Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
            Active
          </button>
          <button onClick={v.tb_cust_2} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_cust_2Fg, borderBottom: `2px solid ${v.tb_cust_2Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
            New
          </button>
          <button onClick={v.tb_cust_3} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_cust_3Fg, borderBottom: `2px solid ${v.tb_cust_3Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
            Returning
          </button>
          <button onClick={v.tb_cust_4} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_cust_4Fg, borderBottom: `2px solid ${v.tb_cust_4Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
            Inactive
          </button>
          <button onClick={v.tb_cust_5} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_cust_5Fg, borderBottom: `2px solid ${v.tb_cust_5Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
            Suspended
          </button>
        </div>
        <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", overflow: "hidden", flex: "none" }}>
          {" "}
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1.6fr 1.1fr .6fr .9fr .9fr minmax(84px,.9fr) .7fr 120px", gap: "14px", padding: "11px 16px", background: "#F6F7F4", borderBottom: "1px solid #E4E7E2" }}>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              Customer
            </span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              Email
            </span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              Phone
            </span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              Orders
            </span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              Total spend
            </span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              Last order
            </span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              Status
            </span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              Joined
            </span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              Actions
            </span>
          </div>
          {" "}
          <div className="hv3" style={{ display: "grid", gridTemplateColumns: "1.4fr 1.6fr 1.1fr .6fr .9fr .9fr minmax(84px,.9fr) .7fr 120px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "28px", height: "28px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", flex: "none" }}>
                JS
              </span>
              <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                John Smith
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                john.smith@outlook.com.au
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                +61 412 663 208
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>24</span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                $1,842.60
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Today</span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                Active
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Mar 2026</span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                <button onClick={v.nav_custdetail} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
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
          <div className="hv3" style={{ display: "grid", gridTemplateColumns: "1.4fr 1.6fr 1.1fr .6fr .9fr .9fr minmax(84px,.9fr) .7fr 120px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "28px", height: "28px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", flex: "none" }}>
                PN
              </span>
              <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Priya Nair
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                priya.nair@gmail.com
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                +61 431 908 552
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>38</span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                $3,204.10
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Today</span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                Active
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Jan 2026</span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                <button onClick={v.nav_custdetail} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
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
          <div className="hv3" style={{ display: "grid", gridTemplateColumns: "1.4fr 1.6fr 1.1fr .6fr .9fr .9fr minmax(84px,.9fr) .7fr 120px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "28px", height: "28px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", flex: "none" }}>
                LO
              </span>
              <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Liam O’Brien
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                liam.obrien@bigpond.com
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                +61 402 771 340
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>12</span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                $742.80
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Yesterday
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                Active
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Jun 2026</span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                <button onClick={v.nav_custdetail} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
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
          <div className="hv3" style={{ display: "grid", gridTemplateColumns: "1.4fr 1.6fr 1.1fr .6fr .9fr .9fr minmax(84px,.9fr) .7fr 120px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "28px", height: "28px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", flex: "none" }}>
                MC
              </span>
              <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Mei Chen
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                mei.chen@icloud.com
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                +61 466 220 118
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>52</span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                $4,918.40
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Today</span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                Active
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Nov 2025</span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                <button onClick={v.nav_custdetail} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
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
          <div className="hv3" style={{ display: "grid", gridTemplateColumns: "1.4fr 1.6fr 1.1fr .6fr .9fr .9fr minmax(84px,.9fr) .7fr 120px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "28px", height: "28px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", flex: "none" }}>
                DC
              </span>
              <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Daniel Cruz
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                dcruz@hotmail.com
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                +61 419 553 907
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>3</span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                $118.20
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                2 weeks ago
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#5F6B62", background: "#EEF0EC", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                Inactive
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Aug 2026</span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                <button onClick={v.nav_custdetail} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
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
          <div className="hv3" style={{ display: "grid", gridTemplateColumns: "1.4fr 1.6fr 1.1fr .6fr .9fr .9fr minmax(84px,.9fr) .7fr 120px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "28px", height: "28px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", flex: "none" }}>
                AT
              </span>
              <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Ava Thompson
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                ava.t@gmail.com
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                +61 421 664 802
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>29</span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                $2,412.90
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Today</span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                Active
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Feb 2026</span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                <button onClick={v.nav_custdetail} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
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
          <div className="hv3" style={{ display: "grid", gridTemplateColumns: "1.4fr 1.6fr 1.1fr .6fr .9fr .9fr minmax(84px,.9fr) .7fr 120px", gap: "14px", padding: "13px 16px", alignItems: "center" }}>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "28px", height: "28px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", flex: "none" }}>
                RS
              </span>
              <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Rohit Sharma
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                rohit.sharma@gmail.com
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                +61 438 112 664
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>17</span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                $1,284.50
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                3 days ago
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                Active
              </span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>May 2026</span>
            </span>
            <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                <button onClick={v.nav_custdetail} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
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
            <span style={{ font: "400 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Showing 7 of 11,284 customers</span>
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
