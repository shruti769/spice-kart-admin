import GlobalSearch from '../components/GlobalSearch'

export default function Dashboard({ v }) {
  return (
    <>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "18px", padding: "24px 26px 2px" }}>
        <span style={{ display: "flex", flexDirection: "column", gap: "5px", minWidth: "0" }}>
          <span style={{ font: "700 20px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Good morning, {v.userFirstName}</span>
          <span style={{ font: "400 12.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>
            Here’s what’s happening with Spice Kart today · Monday, 21 September 2026
          </span>
        </span>
        <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px" }}>
          <GlobalSearch v={v} placeholder="Search anything…" width="210px" align="right" />
          <button className="hv1" onClick={v.openDateRange} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 12px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", color: "#17201A", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer" }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
              <circle cx="10" cy="10" r="7.2" stroke="#4A564E" strokeWidth="1.5" />
              <path d="M10 5.8V10l3 1.8" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Last 7 days
          </button>
          <button className="hv2" onClick={v.toast_export} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 13px", border: "0", borderRadius: "8px", background: "#0B3D1F", color: "#fff", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer" }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
              <path d="M10 3.6v9M6.4 9.2L10 12.8l3.6-3.6M3.6 16.4h12.8" stroke="#8BE000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Export report
          </button>
        </span>
      </div>
      <div className="ad-scroll" style={{ flex: "1", minHeight: "0", overflowY: "auto", padding: "20px 26px 30px", display: "flex", flexDirection: "column", gap: "18px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: "14px" }}>
          <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "15px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "26px", height: "26px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <rect x="4.4" y="4.2" width="11.2" height="12.4" rx="2" stroke="#4A564E" strokeWidth="1.5" />
                  <path d="M7.8 4.2v-.8a1 1 0 011-1h2.4a1 1 0 011 1v.8" stroke="#4A564E" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M7.4 8.8h5.2M7.4 11.4h5.2M7.4 14h3" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
              <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Today’s orders</span>
            </span>
            <span style={{ font: "700 23px/1.2 Inter,system-ui,sans-serif", color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>1,284</span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
              ▲ 12.5% vs yesterday
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
              <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Today’s revenue</span>
            </span>
            <span style={{ font: "700 23px/1.2 Inter,system-ui,sans-serif", color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>$38,420</span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
              ▲ 8.2% vs yesterday
            </span>
          </div>
          <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "15px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "26px", height: "26px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <circle cx="8.4" cy="7.4" r="2.8" stroke="#4A564E" strokeWidth="1.5" />
                  <path d="M3.4 16.5c.8-2.9 2.6-4.3 5-4.3s4.2 1.4 5 4.3" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M14 5.3a2.6 2.6 0 010 4.8M15.5 16.5c-.3-1.8-.9-3.1-1.8-4" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
              <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Active customers</span>
            </span>
            <span style={{ font: "700 23px/1.2 Inter,system-ui,sans-serif", color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>8,642</span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
              ▲ 4.6% this week
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
              <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Pending orders</span>
            </span>
            <span style={{ font: "700 23px/1.2 Inter,system-ui,sans-serif", color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>86</span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#8A6100", background: "#FBF1DE", padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
              Needs attention
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
              <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Low stock products</span>
            </span>
            <span style={{ font: "700 23px/1.2 Inter,system-ui,sans-serif", color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>42</span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#A93826", background: "#FAEDEA", padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
              Requires action
            </span>
          </div>
          <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "15px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "26px", height: "26px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <rect x="2.2" y="5.8" width="8.6" height="8" rx="1.4" stroke="#4A564E" strokeWidth="1.5" />
                  <path d="M10.8 8.6h3.3a1.4 1.4 0 011.03.45l1.5 1.63a1.4 1.4 0 01.37.95v2.17h-6.2V8.6z" stroke="#4A564E" strokeWidth="1.5" strokeLinejoin="round" />
                  <circle cx="6" cy="15.6" r="1.5" stroke="#4A564E" strokeWidth="1.5" />
                  <circle cx="14" cy="15.6" r="1.5" stroke="#4A564E" strokeWidth="1.5" />
                </svg>
              </span>
              <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Active deliveries</span>
            </span>
            <span style={{ font: "700 23px/1.2 Inter,system-ui,sans-serif", color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>124</span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", background: "#EEF0EC", padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
              Currently on the road
            </span>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1.55fr 1fr", gap: "18px" }}>
          <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "15px", display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
              <span style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <span style={{ font: "600 13.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Revenue & orders</span>
                <span style={{ font: "400 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Last 12 days · Collingwood store</span>
              </span>
              <span style={{ marginLeft: "auto", display: "flex", gap: "4px", padding: "3px", background: "#F6F7F4", border: "1px solid #E4E7E2", borderRadius: "8px" }}>
                <button onClick={v.rng6_0} style={{ font: "600 11px/1.2 Inter,system-ui,sans-serif", color: v.rng6_0Fg, background: v.rng6_0Bg, border: "0", padding: "6px 9px", borderRadius: "6px", whiteSpace: "nowrap", cursor: "pointer" }}>
                  Today
                </button>
                <button onClick={v.rng6_1} style={{ font: "600 11px/1.2 Inter,system-ui,sans-serif", color: v.rng6_1Fg, background: v.rng6_1Bg, border: "0", padding: "6px 9px", borderRadius: "6px", whiteSpace: "nowrap", cursor: "pointer" }}>
                  7D
                </button>
                <button onClick={v.rng6_2} style={{ font: "600 11px/1.2 Inter,system-ui,sans-serif", color: v.rng6_2Fg, background: v.rng6_2Bg, border: "0", padding: "6px 9px", borderRadius: "6px", whiteSpace: "nowrap", cursor: "pointer" }}>
                  30D
                </button>
                <button onClick={v.rng6_3} style={{ font: "600 11px/1.2 Inter,system-ui,sans-serif", color: v.rng6_3Fg, background: v.rng6_3Bg, border: "0", padding: "6px 9px", borderRadius: "6px", whiteSpace: "nowrap", cursor: "pointer" }}>
                  3M
                </button>
                <button onClick={v.rng6_4} style={{ font: "600 11px/1.2 Inter,system-ui,sans-serif", color: v.rng6_4Fg, background: v.rng6_4Bg, border: "0", padding: "6px 9px", borderRadius: "6px", whiteSpace: "nowrap", cursor: "pointer" }}>
                  Custom
                </button>
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", height: "158px", paddingTop: "4px" }}>
              <span style={{ flex: "1", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: "3px", height: "100%" }}>
                <span style={{ display: "block", height: "62%", background: "#DCE9D2", borderRadius: "4px 4px 0 0" }} />
                <span style={{ display: "block", height: "26%", background: "#F0F5E6", borderRadius: "0 0 4px 4px" }} />
              </span>
              <span style={{ flex: "1", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: "3px", height: "100%" }}>
                <span style={{ display: "block", height: "74%", background: "#DCE9D2", borderRadius: "4px 4px 0 0" }} />
                <span style={{ display: "block", height: "31%", background: "#F0F5E6", borderRadius: "0 0 4px 4px" }} />
              </span>
              <span style={{ flex: "1", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: "3px", height: "100%" }}>
                <span style={{ display: "block", height: "58%", background: "#DCE9D2", borderRadius: "4px 4px 0 0" }} />
                <span style={{ display: "block", height: "24%", background: "#F0F5E6", borderRadius: "0 0 4px 4px" }} />
              </span>
              <span style={{ flex: "1", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: "3px", height: "100%" }}>
                <span style={{ display: "block", height: "81%", background: "#DCE9D2", borderRadius: "4px 4px 0 0" }} />
                <span style={{ display: "block", height: "34%", background: "#F0F5E6", borderRadius: "0 0 4px 4px" }} />
              </span>
              <span style={{ flex: "1", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: "3px", height: "100%" }}>
                <span style={{ display: "block", height: "69%", background: "#DCE9D2", borderRadius: "4px 4px 0 0" }} />
                <span style={{ display: "block", height: "29%", background: "#F0F5E6", borderRadius: "0 0 4px 4px" }} />
              </span>
              <span style={{ flex: "1", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: "3px", height: "100%" }}>
                <span style={{ display: "block", height: "92%", background: "#DCE9D2", borderRadius: "4px 4px 0 0" }} />
                <span style={{ display: "block", height: "39%", background: "#F0F5E6", borderRadius: "0 0 4px 4px" }} />
              </span>
              <span style={{ flex: "1", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: "3px", height: "100%" }}>
                <span style={{ display: "block", height: "77%", background: "#DCE9D2", borderRadius: "4px 4px 0 0" }} />
                <span style={{ display: "block", height: "32%", background: "#F0F5E6", borderRadius: "0 0 4px 4px" }} />
              </span>
              <span style={{ flex: "1", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: "3px", height: "100%" }}>
                <span style={{ display: "block", height: "86%", background: "#DCE9D2", borderRadius: "4px 4px 0 0" }} />
                <span style={{ display: "block", height: "36%", background: "#F0F5E6", borderRadius: "0 0 4px 4px" }} />
              </span>
              <span style={{ flex: "1", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: "3px", height: "100%" }}>
                <span style={{ display: "block", height: "71%", background: "#DCE9D2", borderRadius: "4px 4px 0 0" }} />
                <span style={{ display: "block", height: "30%", background: "#F0F5E6", borderRadius: "0 0 4px 4px" }} />
              </span>
              <span style={{ flex: "1", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: "3px", height: "100%" }}>
                <span style={{ display: "block", height: "95%", background: "#DCE9D2", borderRadius: "4px 4px 0 0" }} />
                <span style={{ display: "block", height: "40%", background: "#F0F5E6", borderRadius: "0 0 4px 4px" }} />
              </span>
              <span style={{ flex: "1", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: "3px", height: "100%" }}>
                <span style={{ display: "block", height: "83%", background: "#DCE9D2", borderRadius: "4px 4px 0 0" }} />
                <span style={{ display: "block", height: "35%", background: "#F0F5E6", borderRadius: "0 0 4px 4px" }} />
              </span>
              <span style={{ flex: "1", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: "3px", height: "100%" }}>
                <span style={{ display: "block", height: "100%", background: "#0B3D1F", borderRadius: "4px 4px 0 0" }} />
                <span style={{ display: "block", height: "42%", background: "#8BE000", borderRadius: "0 0 4px 4px" }} />
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", borderTop: "1px solid #EFF1ED", paddingTop: "11px" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ width: "9px", height: "9px", borderRadius: "3px", background: "#0B3D1F", display: "block" }} />
                <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", whiteSpace: "nowrap" }}>Revenue · $38,420</span>
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ width: "9px", height: "9px", borderRadius: "3px", background: "#8BE000", display: "block" }} />
                <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", whiteSpace: "nowrap" }}>Orders · 1,284</span>
              </span>
              <span style={{ marginLeft: "auto", font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", whiteSpace: "nowrap" }}>▲ 8.2% vs previous period</span>
            </div>
          </div>
          <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "18px", display: "flex", flexDirection: "column", gap: "14px" }}>
            <span style={{ font: "600 13.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Order status</span>
            <div style={{ display: "flex", height: "9px", borderRadius: "5px", overflow: "hidden", background: "#EFF1ED" }}>
              <span style={{ width: "7%", background: "#8A6100", display: "block" }} />
              <span style={{ width: "11%", background: "#1F5C8B", display: "block" }} />
              <span style={{ width: "14%", background: "#C89A28", display: "block" }} />
              <span style={{ width: "12%", background: "#5BA05E", display: "block" }} />
              <span style={{ width: "22%", background: "#17693A", display: "block" }} />
              <span style={{ width: "28%", background: "#0B3D1F", display: "block" }} />
              <span style={{ width: "4%", background: "#A93826", display: "block" }} />
              <span style={{ width: "2%", background: "#8E9B92", display: "block" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "8px", padding: "5px 0" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "3px", background: "#8A6100", display: "block", flex: "none" }} />
                <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", whiteSpace: "nowrap" }}>Pending</span>
                <span style={{ marginLeft: "auto", font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>86</span>
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "8px", padding: "5px 0" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "3px", background: "#1F5C8B", display: "block", flex: "none" }} />
                <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", whiteSpace: "nowrap" }}>Confirmed</span>
                <span style={{ marginLeft: "auto", font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>142</span>
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "8px", padding: "5px 0" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "3px", background: "#C89A28", display: "block", flex: "none" }} />
                <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", whiteSpace: "nowrap" }}>Preparing</span>
                <span style={{ marginLeft: "auto", font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>178</span>
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "8px", padding: "5px 0" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "3px", background: "#5BA05E", display: "block", flex: "none" }} />
                <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", whiteSpace: "nowrap" }}>Ready for pickup</span>
                <span style={{ marginLeft: "auto", font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>154</span>
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "8px", padding: "5px 0" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "3px", background: "#17693A", display: "block", flex: "none" }} />
                <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", whiteSpace: "nowrap" }}>Out for delivery</span>
                <span style={{ marginLeft: "auto", font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>124</span>
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "8px", padding: "5px 0" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "3px", background: "#0B3D1F", display: "block", flex: "none" }} />
                <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", whiteSpace: "nowrap" }}>Delivered</span>
                <span style={{ marginLeft: "auto", font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>548</span>
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "8px", padding: "5px 0" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "3px", background: "#A93826", display: "block", flex: "none" }} />
                <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", whiteSpace: "nowrap" }}>Cancelled</span>
                <span style={{ marginLeft: "auto", font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>36</span>
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "8px", padding: "5px 0" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "3px", background: "#8E9B92", display: "block", flex: "none" }} />
                <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", whiteSpace: "nowrap" }}>Refunded</span>
                <span style={{ marginLeft: "auto", font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>16</span>
              </span>
            </div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1.55fr 1fr", gap: "18px", alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ font: "600 14px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Recent orders</span>
              <button onClick={v.nav_orders} style={{ marginLeft: "auto", border: "0", background: "transparent", font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#17693A", cursor: "pointer", whiteSpace: "nowrap", padding: "0" }}>
                View all orders →
              </button>
            </div>
            <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", overflow: "hidden", flex: "none" }}>
              {" "}
              <div style={{ display: "grid", gridTemplateColumns: "84px 1.3fr .8fr .8fr .9fr minmax(74px,.9fr) minmax(118px,1.2fr) minmax(50px,.9fr) 96px", gap: "14px", padding: "11px 16px", background: "#F6F7F4", borderBottom: "1px solid #E4E7E2" }}>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>
                  Order
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>
                  Customer
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>
                  Items
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>
                  Value
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>
                  Type
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>
                  Payment
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>
                  Status
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>
                  Time
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>
                  Actions
                </span>
              </div>
              {" "}
              <div className="hv3" style={{ display: "grid", gridTemplateColumns: "84px 1.3fr .8fr .8fr .9fr minmax(74px,.9fr) minmax(118px,1.2fr) minmax(50px,.9fr) 96px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>
                    #SK10482
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "28px", height: "28px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", flex: "none" }}>
                    JS
                  </span>
                  <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>
                    John Smith
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>8 items</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>$84.50</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>Express</span>
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
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>12:42 PM</span>
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
              <div className="hv3" style={{ display: "grid", gridTemplateColumns: "84px 1.3fr .8fr .8fr .9fr minmax(74px,.9fr) minmax(118px,1.2fr) minmax(50px,.9fr) 96px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>
                    #SK10481
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "28px", height: "28px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", flex: "none" }}>
                    PN
                  </span>
                  <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>
                    Priya Nair
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>12 items</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>
                    $132.20
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>Express</span>
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
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>12:36 PM</span>
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
              <div className="hv3" style={{ display: "grid", gridTemplateColumns: "84px 1.3fr .8fr .8fr .9fr minmax(74px,.9fr) minmax(118px,1.2fr) minmax(50px,.9fr) 96px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>
                    #SK10480
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "28px", height: "28px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", flex: "none" }}>
                    LO
                  </span>
                  <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>
                    Liam O’Brien
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>4 items</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>$36.90</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>
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
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>12:28 PM</span>
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
              <div className="hv3" style={{ display: "grid", gridTemplateColumns: "84px 1.3fr .8fr .8fr .9fr minmax(74px,.9fr) minmax(118px,1.2fr) minmax(50px,.9fr) 96px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>
                    #SK10479
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "28px", height: "28px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", flex: "none" }}>
                    MC
                  </span>
                  <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>
                    Mei Chen
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>9 items</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>$97.40</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>Express</span>
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
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>12:14 PM</span>
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
              <div className="hv3" style={{ display: "grid", gridTemplateColumns: "84px 1.3fr .8fr .8fr .9fr minmax(74px,.9fr) minmax(118px,1.2fr) minmax(50px,.9fr) 96px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>
                    #SK10478
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "28px", height: "28px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", flex: "none" }}>
                    DC
                  </span>
                  <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>
                    Daniel Cruz
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>3 items</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>$24.50</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>
                    Scheduled
                  </span>
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
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>11:58 AM</span>
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
              <div className="hv3" style={{ display: "grid", gridTemplateColumns: "84px 1.3fr .8fr .8fr .9fr minmax(74px,.9fr) minmax(118px,1.2fr) minmax(50px,.9fr) 96px", gap: "14px", padding: "13px 16px", alignItems: "center" }}>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>
                    #SK10477
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "28px", height: "28px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", flex: "none" }}>
                    AT
                  </span>
                  <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>
                    Ava Thompson
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>15 items</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>
                    $164.80
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>Express</span>
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
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip" }}>11:41 AM</span>
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
                <span style={{ font: "400 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Showing 6 of 1,284 orders</span>
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
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ font: "600 14px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Low stock alerts</span>
              <button onClick={v.nav_inv} style={{ marginLeft: "auto", border: "0", background: "transparent", font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#17693A", cursor: "pointer", whiteSpace: "nowrap", padding: "0" }}>
                Inventory →
              </button>
            </div>
            <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", overflow: "hidden", flex: "none" }}>
              {" "}
              <div style={{ display: "grid", gridTemplateColumns: "1.6fr .5fr .6fr .9fr 110px", gap: "14px", padding: "11px 16px", background: "#F6F7F4", borderBottom: "1px solid #E4E7E2" }}>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Product
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Stock
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Min
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Status
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Action
                </span>
              </div>
              {" "}
              <div className="hv3" style={{ display: "grid", gridTemplateColumns: "1.6fr .5fr .6fr .9fr 110px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ display: "flex", flexDirection: "column", gap: "3px", minWidth: "0" }}>
                    <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      Basmati Rice 5kg
                    </span>
                    <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      Grains, Rice & Cereals
                    </span>
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>6</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>min 25</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#A93826", background: "#FAEDEA", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                    Critical
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ marginLeft: "auto", display: "flex", gap: "6px" }}>
                    <button onClick={v.openStockAdj} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                      Update stock
                    </button>
                  </span>
                </span>
              </div>
              {" "}
              <div className="hv3" style={{ display: "grid", gridTemplateColumns: "1.6fr .5fr .6fr .9fr 110px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ display: "flex", flexDirection: "column", gap: "3px", minWidth: "0" }}>
                    <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      Paneer 500g
                    </span>
                    <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      Dairy & Refrigerated
                    </span>
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>11</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>min 30</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#A93826", background: "#FAEDEA", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                    Critical
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ marginLeft: "auto", display: "flex", gap: "6px" }}>
                    <button onClick={v.openStockAdj} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                      Update stock
                    </button>
                  </span>
                </span>
              </div>
              {" "}
              <div className="hv3" style={{ display: "grid", gridTemplateColumns: "1.6fr .5fr .6fr .9fr 110px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ display: "flex", flexDirection: "column", gap: "3px", minWidth: "0" }}>
                    <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      Fresh Coriander
                    </span>
                    <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      Fresh Produce
                    </span>
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>18</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>min 40</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#8A6100", background: "#FBF1DE", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                    Low Stock
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ marginLeft: "auto", display: "flex", gap: "6px" }}>
                    <button onClick={v.openStockAdj} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                      Update stock
                    </button>
                  </span>
                </span>
              </div>
              {" "}
              <div className="hv3" style={{ display: "grid", gridTemplateColumns: "1.6fr .5fr .6fr .9fr 110px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ display: "flex", flexDirection: "column", gap: "3px", minWidth: "0" }}>
                    <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      Garam Masala 100g
                    </span>
                    <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      Spices & Masalas
                    </span>
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>24</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>min 40</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#8A6100", background: "#FBF1DE", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                    Low Stock
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ marginLeft: "auto", display: "flex", gap: "6px" }}>
                    <button onClick={v.openStockAdj} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                      Update stock
                    </button>
                  </span>
                </span>
              </div>
              {" "}
              <div className="hv3" style={{ display: "grid", gridTemplateColumns: "1.6fr .5fr .6fr .9fr 110px", gap: "14px", padding: "13px 16px", alignItems: "center" }}>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ display: "flex", flexDirection: "column", gap: "3px", minWidth: "0" }}>
                    <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      Frozen Paratha 5pk
                    </span>
                    <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      Frozen Foods & Vegetables
                    </span>
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>31</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>min 45</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#8A6100", background: "#FBF1DE", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                    Low Stock
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ marginLeft: "auto", display: "flex", gap: "6px" }}>
                    <button onClick={v.openStockAdj} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                      Update stock
                    </button>
                  </span>
                </span>
              </div>
              {" "}
            </div>
            <div style={{ background: "#FBF6EA", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "13px 14px", display: "flex", alignItems: "center", gap: "11px", borderColor: "#EEE0C2" }}>
              <svg width="17" height="17" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                <path d="M10 3.6l7 12.2H3l7-12.2z" stroke="#8A6100" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M10 8v3.4" stroke="#8A6100" strokeWidth="1.6" strokeLinecap="round" />
                <circle cx="10" cy="13.6" r=".9" fill="#8A6100" />
              </svg>
              <span style={{ display: "flex", flexDirection: "column", gap: "3px", minWidth: "0" }}>
                <span style={{ font: "600 12px/1.2 Inter,system-ui,sans-serif", color: "#6B4E08", whiteSpace: "nowrap" }}>4 orders delayed past ETA</span>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#8A7340", whiteSpace: "nowrap" }}>Richmond zone · reassign drivers</span>
              </span>
              <button onClick={v.nav_del} style={{ marginLeft: "auto", height: "28px", padding: "0 10px", border: "0", borderRadius: "7px", background: "#8A6100", color: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
                Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
