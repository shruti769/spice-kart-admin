export default function Delivery({ v }) {
  return (
    <>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "18px", padding: "24px 26px 2px" }}>
        <span style={{ display: "flex", flexDirection: "column", gap: "5px", minWidth: "0" }}>
          <span style={{ font: "700 20px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Delivery operations</span>
          <span style={{ font: "400 12.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>
            124 active deliveries across Melbourne metro · 4 need attention
          </span>
        </span>
        <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "8px", height: "34px", width: "220px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff" }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
              <circle cx="9" cy="9" r="6" stroke="#7C8A81" strokeWidth="1.6" />
              <path d="M13.4 13.4L18 18" stroke="#7C8A81" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <span style={{ font: "400 12.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Search order or driver…</span>
          </span>
          <button onClick={v.openZones} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 12px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", color: "#17201A", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
              <path d="M10 17.5s5.4-4.7 5.4-8.6A5.4 5.4 0 004.6 8.9c0 3.9 5.4 8.6 5.4 8.6z" stroke="#4A564E" strokeWidth="1.5" />
              <circle cx="10" cy="8.6" r="1.9" stroke="#4A564E" strokeWidth="1.5" />
            </svg>
            Manage zones
          </button>
          <button onClick={v.openAssign} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 13px", border: "0", borderRadius: "8px", background: "#0B3D1F", color: "#fff", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
              <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#8BE000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Assign driver
          </button>
        </span>
      </div>
      <div className="ad-scroll" style={{ flex: "1", minHeight: "0", overflowY: "auto", padding: "20px 26px 30px", display: "flex", flexDirection: "column", gap: "18px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: "14px" }}>
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
              On the road now
            </span>
          </div>
          <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "15px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "26px", height: "26px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#4A564E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Available drivers</span>
            </span>
            <span style={{ font: "700 23px/1.2 Inter,system-ui,sans-serif", color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>18</span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
              Ready to assign
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
              <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Busy drivers</span>
            </span>
            <span style={{ font: "700 23px/1.2 Inter,system-ui,sans-serif", color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>42</span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", background: "#EEF0EC", padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
              Avg 2.9 stops each
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
              <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Delayed orders</span>
            </span>
            <span style={{ font: "700 23px/1.2 Inter,system-ui,sans-serif", color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>4</span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#A93826", background: "#FAEDEA", padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
              Richmond · Carlton
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
              <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Avg delivery time</span>
            </span>
            <span style={{ font: "700 23px/1.2 Inter,system-ui,sans-serif", color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>24.8 min</span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
              ▼ 1.2 min vs yesterday
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
              <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>On-time rate</span>
            </span>
            <span style={{ font: "700 23px/1.2 Inter,system-ui,sans-serif", color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>94.6%</span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
              ▲ 1.8% this week
            </span>
          </div>
        </div>
        <div style={{ background: "#FBF6EA", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "16px", display: "flex", flexDirection: "column", gap: "12px", borderColor: "#EEE0C2", flex: "none" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "9px" }}>
            <svg width="17" height="17" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
              <path d="M10 3.6l7 12.2H3l7-12.2z" stroke="#8A6100" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M10 8v3.4" stroke="#8A6100" strokeWidth="1.6" strokeLinecap="round" />
              <circle cx="10" cy="13.6" r=".9" fill="#8A6100" />
            </svg>
            <span style={{ font: "600 13px/1.2 Inter,system-ui,sans-serif", color: "#6B4E08", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              4 orders past their ETA
            </span>
            <span style={{ marginLeft: "auto" }}>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#8A6100", background: "#F5E8CC", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                RICHMOND · CARLTON
              </span>
            </span>
          </span>
          <span style={{ font: "400 11px/1.6 Inter,system-ui,sans-serif", color: "#8A7340" }}>
            Two drivers are handling 3+ stops each while 18 drivers sit available. Reassigning now recovers roughly 14 minutes per order.
          </span>
          <span style={{ display: "flex", gap: "9px" }}>
            <button onClick={v.autoReassign} style={{ height: "34px", padding: "0 13px", border: "0", borderRadius: "8px", background: "#8A6100", color: "#fff", font: "600 12px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
              Auto-reassign 4 orders
            </button>
            <button onClick={v.notifyCustomers} style={{ height: "34px", padding: "0 12px", border: "1px solid #E2D2AC", borderRadius: "8px", background: "#fff", font: "600 12px/1.2 Inter,system-ui,sans-serif", color: "#6B4E08", cursor: "pointer", whiteSpace: "nowrap" }}>
              Notify customers
            </button>
          </span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1.85fr 1fr", gap: "18px", alignItems: "start" }}>
          <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", overflow: "hidden", flex: "none", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "13px 16px", borderBottom: "1px solid #E4E7E2", flexWrap: "wrap" }}>
              <span style={{ font: "600 13.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Live delivery map</span>
              <span style={{ display: "flex", alignItems: "center", gap: "6px", font: "500 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "3px", background: "#0B6B33", display: "block" }} />
                Updated 12 sec ago
              </span>
              <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "7px" }}>
                <button onClick={v.tb_del_0} style={{ font: "600 11px/1.2 Inter,system-ui,sans-serif", color: v.tb_del_0Fg, background: v.tb_del_0Bg, border: `1px solid ${v.tb_del_0Bd}`, padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap", cursor: "pointer" }}>
                  All zones
                </button>
                <button onClick={v.tb_del_1} style={{ font: "600 11px/1.2 Inter,system-ui,sans-serif", color: v.tb_del_1Fg, background: v.tb_del_1Bg, border: `1px solid ${v.tb_del_1Bd}`, padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap", cursor: "pointer" }}>
                  CBD
                </button>
                <button onClick={v.tb_del_2} style={{ font: "600 11px/1.2 Inter,system-ui,sans-serif", color: v.tb_del_2Fg, background: v.tb_del_2Bg, border: `1px solid ${v.tb_del_2Bd}`, padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap", cursor: "pointer" }}>
                  Fitzroy
                </button>
                <button onClick={v.tb_del_3} style={{ font: "600 11px/1.2 Inter,system-ui,sans-serif", color: v.tb_del_3Fg, background: v.tb_del_3Bg, border: `1px solid ${v.tb_del_3Bd}`, padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap", cursor: "pointer" }}>
                  Richmond
                </button>
                <button onClick={v.tb_del_4} style={{ font: "600 11px/1.2 Inter,system-ui,sans-serif", color: v.tb_del_4Fg, background: v.tb_del_4Bg, border: `1px solid ${v.tb_del_4Bd}`, padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap", cursor: "pointer" }}>
                  Carlton
                </button>
                <button onClick={v.tb_del_5} style={{ font: "600 11px/1.2 Inter,system-ui,sans-serif", color: v.tb_del_5Fg, background: v.tb_del_5Bg, border: `1px solid ${v.tb_del_5Bd}`, padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap", cursor: "pointer" }}>
                  South Yarra
                </button>
              </span>
            </div>
            <div style={{ position: "relative", height: "394px", background: "#EEF1EA", flex: "none" }}>
              {" "}
              <svg viewBox="0 0 712 394" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: "0", width: "100%", height: "100%" }}>
                <rect x="-20" y="-20" width="752" height="434" fill="#EEF1EA" />
                <polygon points="13,169 242,154 270,199 33,214" fill="#E6E9E0" />
                <polygon points="324,141 392,141 392,175 324,175" fill="#DCE8D0" />
                <polygon points="203,87 273,87 273,122 203,122" fill="#DCE8D0" />
                <polygon points="350,191 445,191 445,237 350,237" fill="#DCE8D0" />
                <polygon points="267,277 388,277 388,336 267,336" fill="#DCE8D0" />
                <polygon points="277,153 315,153 315,177 277,177" fill="#DCE8D0" />
                <path d="M731.1 229.1 L673.9 239.6 L623.0 231.5 L578.5 246.0 L528.9 263.7 L476.8 266.9 L422.1 250.8 L381.4 231.5 L353.5 213.9 L315.3 203.4 L267.0 207.4 L216.1 217.1 L165.3 226.7 L111.9 223.5 L63.6 213.9 L12.7 210.6 L-38.1 217.1" stroke="#C3DCE8" strokeWidth="11" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M731.1 229.1 L673.9 239.6 L623.0 231.5 L578.5 246.0 L528.9 263.7 L476.8 266.9 L422.1 250.8 L381.4 231.5 L353.5 213.9 L315.3 203.4 L267.0 207.4 L216.1 217.1 L165.3 226.7 L111.9 223.5 L63.6 213.9 L12.7 210.6 L-38.1 217.1" stroke="#D8EAF3" strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M523.8 30.5 L531.5 104.5 L540.4 176.9 L549.3 239.6" stroke="#DDE2D6" strokeWidth="8" fill="none" strokeLinecap="round" />
                <path d="M400.5 104.5 L406.9 168.8 L414.5 241.2 L422.1 313.6" stroke="#DDE2D6" strokeWidth="8" fill="none" strokeLinecap="round" />
                <path d="M216.1 25.7 L343.3 30.5 L470.4 33.8 L584.9 38.6" stroke="#DDE2D6" strokeWidth="8" fill="none" strokeLinecap="round" />
                <path d="M95.4 106.1 L241.6 112.5 L394.1 119.0 L531.5 124.6" stroke="#DDE2D6" strokeWidth="8" fill="none" strokeLinecap="round" />
                <path d="M139.9 60.3 L165.3 136.7 L180.5 205.0" stroke="#DDE2D6" strokeWidth="8" fill="none" strokeLinecap="round" />
                <path d="M216.1 209.0 L292.4 273.4 L343.3 329.7 L381.4 387.6" stroke="#DDE2D6" strokeWidth="8" fill="none" strokeLinecap="round" />
                <path d="M12.7 201.0 L165.3 199.4 L292.4 197.8" stroke="#DDE2D6" strokeWidth="8" fill="none" strokeLinecap="round" />
                <path d="M523.8 30.5 L531.5 104.5 L540.4 176.9 L549.3 239.6" stroke="#FBFCF9" strokeWidth="5" fill="none" strokeLinecap="round" />
                <path d="M400.5 104.5 L406.9 168.8 L414.5 241.2 L422.1 313.6" stroke="#FBFCF9" strokeWidth="5" fill="none" strokeLinecap="round" />
                <path d="M216.1 25.7 L343.3 30.5 L470.4 33.8 L584.9 38.6" stroke="#FBFCF9" strokeWidth="5" fill="none" strokeLinecap="round" />
                <path d="M95.4 106.1 L241.6 112.5 L394.1 119.0 L531.5 124.6" stroke="#FBFCF9" strokeWidth="5" fill="none" strokeLinecap="round" />
                <path d="M139.9 60.3 L165.3 136.7 L180.5 205.0" stroke="#FBFCF9" strokeWidth="5" fill="none" strokeLinecap="round" />
                <path d="M216.1 209.0 L292.4 273.4 L343.3 329.7 L381.4 387.6" stroke="#FBFCF9" strokeWidth="5" fill="none" strokeLinecap="round" />
                <path d="M12.7 201.0 L165.3 199.4 L292.4 197.8" stroke="#FBFCF9" strokeWidth="5" fill="none" strokeLinecap="round" />
                <path d="M391.6 36.2 L396.7 80.4 L401.8 122.2" stroke="#E2E6DB" strokeWidth="5.5" fill="none" strokeLinecap="round" />
                <path d="M330.6 33.8 L336.9 80.4 L343.3 124.6" stroke="#E2E6DB" strokeWidth="5.5" fill="none" strokeLinecap="round" />
                <path d="M178.0 4.0 L181.8 44.2 L185.6 84.4" stroke="#E2E6DB" strokeWidth="5.5" fill="none" strokeLinecap="round" />
                <path d="M251.7 24.1 L256.8 84.4 L261.9 130.2" stroke="#E2E6DB" strokeWidth="5.5" fill="none" strokeLinecap="round" />
                <path d="M506.0 265.3 L511.1 321.6 L516.2 384.3" stroke="#E2E6DB" strokeWidth="5.5" fill="none" strokeLinecap="round" />
                <path d="M422.1 207.4 L534.0 209.0 L648.4 210.6" stroke="#E2E6DB" strokeWidth="5.5" fill="none" strokeLinecap="round" />
                <path d="M419.6 266.9 L534.0 263.7 L654.8 260.5" stroke="#E2E6DB" strokeWidth="5.5" fill="none" strokeLinecap="round" />
                <path d="M422.1 289.4 L546.7 291.1 L673.9 292.7" stroke="#E2E6DB" strokeWidth="5.5" fill="none" strokeLinecap="round" />
                <path d="M292.4 48.2 L419.6 51.4 L540.4 54.7" stroke="#E2E6DB" strokeWidth="5.5" fill="none" strokeLinecap="round" />
                <path d="M139.9 32.2 L267.0 35.4" stroke="#E2E6DB" strokeWidth="5.5" fill="none" strokeLinecap="round" />
                <path d="M553.1 225.1 L673.9 229.9" stroke="#E2E6DB" strokeWidth="5.5" fill="none" strokeLinecap="round" />
                <path d="M391.6 36.2 L396.7 80.4 L401.8 122.2" stroke="#FBFCF9" strokeWidth="3.2" fill="none" strokeLinecap="round" />
                <path d="M330.6 33.8 L336.9 80.4 L343.3 124.6" stroke="#FBFCF9" strokeWidth="3.2" fill="none" strokeLinecap="round" />
                <path d="M178.0 4.0 L181.8 44.2 L185.6 84.4" stroke="#FBFCF9" strokeWidth="3.2" fill="none" strokeLinecap="round" />
                <path d="M251.7 24.1 L256.8 84.4 L261.9 130.2" stroke="#FBFCF9" strokeWidth="3.2" fill="none" strokeLinecap="round" />
                <path d="M506.0 265.3 L511.1 321.6 L516.2 384.3" stroke="#FBFCF9" strokeWidth="3.2" fill="none" strokeLinecap="round" />
                <path d="M422.1 207.4 L534.0 209.0 L648.4 210.6" stroke="#FBFCF9" strokeWidth="3.2" fill="none" strokeLinecap="round" />
                <path d="M419.6 266.9 L534.0 263.7 L654.8 260.5" stroke="#FBFCF9" strokeWidth="3.2" fill="none" strokeLinecap="round" />
                <path d="M422.1 289.4 L546.7 291.1 L673.9 292.7" stroke="#FBFCF9" strokeWidth="3.2" fill="none" strokeLinecap="round" />
                <path d="M292.4 48.2 L419.6 51.4 L540.4 54.7" stroke="#FBFCF9" strokeWidth="3.2" fill="none" strokeLinecap="round" />
                <path d="M139.9 32.2 L267.0 35.4" stroke="#FBFCF9" strokeWidth="3.2" fill="none" strokeLinecap="round" />
                <path d="M553.1 225.1 L673.9 229.9" stroke="#FBFCF9" strokeWidth="3.2" fill="none" strokeLinecap="round" />
                <circle cx="391.6" cy="104.5" r="104" fill="#8BE000" fillOpacity=".06" stroke="#B6D96A" strokeWidth="1.4" strokeDasharray="8 8" />
                <path d="M391.6 104.5 L396.7 82.0 L401.8 56.3 L422.1 51.4 L476.8 53.1 L523.8 54.7 L531.5 88.4 L536.5 122.2" stroke="#8BE000" strokeWidth="4.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M536.5 122.2 L541.6 160.8 L546.7 201.0 L582.3 207.4" stroke="#BAC8AE" strokeWidth="3.2" fill="none" strokeLinecap="round" strokeDasharray="9 9" />
                <path d="M414.5 241.2 L470.4 263.7 L534.0 262.1 L592.5 260.5" stroke="#1F5C8B" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeOpacity=".65" />
                <path d="M261.9 104.5 L292.4 49.8 L343.3 46.6 L391.6 45.0" stroke="#C89A28" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeOpacity=".75" />
                <text x="89" y="183" textAnchor="start" fontFamily="Inter, system-ui, sans-serif" fontSize="11" fontWeight="700" fill="#5F6B62" letterSpacing=".3">Melbourne CBD</text>
                <text x="193" y="47" textAnchor="start" fontFamily="Inter, system-ui, sans-serif" fontSize="10" fontWeight="600" fill="#7C8A81" letterSpacing=".3">Carlton</text>
                <text x="343" y="64" textAnchor="start" fontFamily="Inter, system-ui, sans-serif" fontSize="10" fontWeight="600" fill="#7C8A81" letterSpacing=".3">Fitzroy</text>
                <text x="455" y="74" textAnchor="start" fontFamily="Inter, system-ui, sans-serif" fontSize="10" fontWeight="600" fill="#7C8A81" letterSpacing=".3">Collingwood</text>
                <text x="579" y="191" textAnchor="end" fontFamily="Inter, system-ui, sans-serif" fontSize="10" fontWeight="600" fill="#7C8A81" letterSpacing=".3">Richmond</text>
                <text x="331" y="122" textAnchor="start" fontFamily="Inter, system-ui, sans-serif" fontSize="9.5" fontWeight="600" fill="#7C8A81" letterSpacing=".3">
                  East Melbourne
                </text>
                <text x="528" y="339" textAnchor="end" fontFamily="Inter, system-ui, sans-serif" fontSize="10" fontWeight="600" fill="#7C8A81" letterSpacing=".3">South Yarra</text>
                <text x="490" y="289" textAnchor="middle" fontFamily="Inter, system-ui, sans-serif" fontSize="9.5" fontWeight="600" fill="#94A096" letterSpacing=".3">Cremorne</text>
                <text x="95" y="248" textAnchor="start" fontFamily="Inter, system-ui, sans-serif" fontSize="9.5" fontWeight="600" fill="#94A096" letterSpacing=".3">Southbank</text>
                <text x="636" y="90" textAnchor="end" fontFamily="Inter, system-ui, sans-serif" fontSize="9.5" fontWeight="600" fill="#94A096" letterSpacing=".3">Abbotsford</text>
                <text x="224" y="195" textAnchor="start" fontFamily="Inter, system-ui, sans-serif" fontSize="9" fontWeight="600" fill="#6B93A8" letterSpacing=".3">Yarra River</text>
                <circle cx="582.3" cy="207.4" r="7.5" fill="#fff" stroke="#0B3D1F" strokeWidth="3.2" />
                <circle cx="592.5" cy="260.5" r="7.5" fill="#fff" stroke="#1F5C8B" strokeWidth="3.2" />
                <circle cx="391.6" cy="45.0" r="7.5" fill="#fff" stroke="#C89A28" strokeWidth="3.2" />
                <circle cx="511.1" cy="321.6" r="7.5" fill="#fff" stroke="#8A6100" strokeWidth="3.2" />
                <circle cx="185.6" cy="84.4" r="7.5" fill="#fff" stroke="#8A6100" strokeWidth="3.2" />
                <circle cx="534.0" cy="262.1" r="7.5" fill="#1F5C8B" />
                <circle cx="343.3" cy="46.6" r="7.5" fill="#C89A28" />
                <circle cx="531.5" cy="88.4" r="19" fill="#8BE000" fillOpacity=".3" />
                <circle cx="531.5" cy="88.4" r="9" fill="#fff" stroke="#0B3D1F" strokeWidth="3.2" />
                <rect x="383" y="96" width="17" height="17" rx="4" fill="#0B3D1F" />
                <path d="M388 105l2.8 2.8 5.2-5.2" stroke="#8BE000" strokeWidth="1.9" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {" "}
              <span style={{ position: "absolute", top: "12px", left: "14px", display: "flex", flexDirection: "column", gap: "7px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "9px", background: "rgba(255,255,255,.97)", border: "1px solid #E4E7E2", borderRadius: "9px", padding: "9px 12px", boxShadow: "0 3px 10px rgba(16,24,16,.07)" }}>
                  <span style={{ width: "22px", height: "22px", borderRadius: "6px", background: "#8BE000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="13" height="13" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                      <rect x="2.2" y="5.8" width="8.6" height="8" rx="1.4" stroke="#0B3D1F" strokeWidth="1.5" />
                      <path d="M10.8 8.6h3.3a1.4 1.4 0 011.03.45l1.5 1.63a1.4 1.4 0 01.37.95v2.17h-6.2V8.6z" stroke="#0B3D1F" strokeWidth="1.5" strokeLinejoin="round" />
                      <circle cx="6" cy="15.6" r="1.5" stroke="#0B3D1F" strokeWidth="1.5" />
                      <circle cx="14" cy="15.6" r="1.5" stroke="#0B3D1F" strokeWidth="1.5" />
                    </svg>
                  </span>
                  <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    <span style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      Michael Ryan · #SK10482
                    </span>
                    <span style={{ font: "400 10px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>1.8 km away · ETA 8 min · 2 stops left</span>
                  </span>
                </span>
              </span>
              {" "}
              <span style={{ position: "absolute", bottom: "12px", right: "14px", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "5px" }}>
                <span style={{ display: "flex", alignItems: "flex-end", gap: "0", height: "9px" }}>
                  <span style={{ width: "1.5px", height: "9px", background: "#8A948B", display: "block" }} />
                  <span style={{ width: "62px", height: "1.5px", background: "#8A948B", display: "block", marginBottom: "0" }} />
                  <span style={{ width: "1.5px", height: "9px", background: "#8A948B", display: "block" }} />
                </span>
                <span style={{ font: "500 9px/1.2 Inter,system-ui,sans-serif", color: "#8A948B", whiteSpace: "nowrap" }}>1 km · Melbourne metro, VIC</span>
              </span>
              {" "}
              <span style={{ position: "absolute", bottom: "12px", left: "14px", display: "flex", alignItems: "center", gap: "14px", background: "rgba(255,255,255,.97)", border: "1px solid #E4E7E2", borderRadius: "9px", padding: "9px 13px", boxShadow: "0 3px 10px rgba(16,24,16,.07)" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ width: "9px", height: "9px", borderRadius: "3px", background: "#8BE000", display: "block" }} />
                  <span style={{ font: "500 10.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", whiteSpace: "nowrap" }}>On time</span>
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ width: "9px", height: "9px", borderRadius: "3px", background: "#C89A28", display: "block" }} />
                  <span style={{ font: "500 10.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", whiteSpace: "nowrap" }}>Delayed</span>
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ width: "9px", height: "9px", borderRadius: "3px", background: "#0B3D1F", display: "block" }} />
                  <span style={{ font: "500 10.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", whiteSpace: "nowrap" }}>Store pickup</span>
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ width: "9px", height: "9px", borderRadius: "3px", background: "#1F5C8B", display: "block" }} />
                  <span style={{ font: "500 10.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", whiteSpace: "nowrap" }}>Destination</span>
                </span>
              </span>
              {" "}
              <span style={{ position: "absolute", top: "12px", right: "14px", display: "flex", flexDirection: "column", gap: "6px" }}>
                <span style={{ width: "30px", height: "30px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "rgba(255,255,255,.97)", display: "flex", alignItems: "center", justifyContent: "center", font: "600 15px/1.2 Inter,system-ui,sans-serif", color: "#4A564E" }}>
                  +
                </span>
                <span style={{ width: "30px", height: "30px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "rgba(255,255,255,.97)", display: "flex", alignItems: "center", justifyContent: "center", font: "600 15px/1.2 Inter,system-ui,sans-serif", color: "#4A564E" }}>
                  −
                </span>
                <span style={{ width: "30px", height: "30px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "rgba(255,255,255,.97)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <path d="M10 17.5s5.4-4.7 5.4-8.6A5.4 5.4 0 004.6 8.9c0 3.9 5.4 8.6 5.4 8.6z" stroke="#4A564E" strokeWidth="1.5" />
                    <circle cx="10" cy="8.6" r="1.9" stroke="#4A564E" strokeWidth="1.5" />
                  </svg>
                </span>
              </span>
              {" "}
            </div>
          </div>
          <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", overflow: "hidden", flex: "none", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "9px", padding: "13px 16px", borderBottom: "1px solid #E4E7E2" }}>
              <span style={{ font: "600 13.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Live queue
              </span>
              <span style={{ marginLeft: "auto" }}>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                  124 ACTIVE
                </span>
              </span>
            </div>
            <div style={{ display: "flex", gap: "2px", padding: "0 16px", borderBottom: "1px solid #E4E7E2" }}>
              <button onClick={v.tb_del2_0} style={{ border: "0", background: "transparent", padding: "10px 10px 9px", font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_del2_0Fg, borderBottom: `2px solid ${v.tb_del2_0Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
                All · 124
              </button>
              <button onClick={v.tb_del2_1} style={{ border: "0", background: "transparent", padding: "10px 10px 9px", font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_del2_1Fg, borderBottom: `2px solid ${v.tb_del2_1Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
                Delayed · 4
              </button>
              <button onClick={v.tb_del2_2} style={{ border: "0", background: "transparent", padding: "10px 10px 9px", font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_del2_2Fg, borderBottom: `2px solid ${v.tb_del2_2Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
                Unassigned · 2
              </button>
            </div>
            <div className="ad-scroll" style={{ maxHeight: "342px", overflowY: "auto" }}>
              {" "}
              <div className="hv3" style={{ padding: "12px 16px", borderBottom: "1px solid #EFF1ED", display: "flex", flexDirection: "column", gap: "8px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "700 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>#SK10482</span>
                  <span style={{ marginLeft: "auto" }}>
                    <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#1F5C8B", background: "#E8F1F8", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                      Out for Delivery
                    </span>
                  </span>
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "24px", height: "24px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", font: "600 9.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", flex: "none" }}>
                    MR
                  </span>
                  <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Michael Ryan
                  </span>
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                  <svg width="13" height="13" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <path d="M10 17.5s5.4-4.7 5.4-8.6A5.4 5.4 0 004.6 8.9c0 3.9 5.4 8.6 5.4 8.6z" stroke="#7C8A81" strokeWidth="1.5" />
                    <circle cx="10" cy="8.6" r="1.9" stroke="#7C8A81" strokeWidth="1.5" />
                  </svg>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    240 Collins St, Melbourne
                  </span>
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "4px 7px", borderRadius: "5px", whiteSpace: "nowrap" }}>
                    8 min
                  </span>
                  <span style={{ marginLeft: "auto", display: "flex", gap: "6px" }}>
                    <button onClick={v.openOrder} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                      Open
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
              <div className="hv3" style={{ padding: "12px 16px", borderBottom: "1px solid #EFF1ED", display: "flex", flexDirection: "column", gap: "8px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "700 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>#SK10481</span>
                  <span style={{ marginLeft: "auto" }}>
                    <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#1F5C8B", background: "#E8F1F8", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                      Out for Delivery
                    </span>
                  </span>
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "24px", height: "24px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", font: "600 9.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", flex: "none" }}>
                    SA
                  </span>
                  <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Sofia Almeida
                  </span>
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                  <svg width="13" height="13" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <path d="M10 17.5s5.4-4.7 5.4-8.6A5.4 5.4 0 004.6 8.9c0 3.9 5.4 8.6 5.4 8.6z" stroke="#7C8A81" strokeWidth="1.5" />
                    <circle cx="10" cy="8.6" r="1.9" stroke="#7C8A81" strokeWidth="1.5" />
                  </svg>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    18 Gertrude St, Fitzroy
                  </span>
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "4px 7px", borderRadius: "5px", whiteSpace: "nowrap" }}>
                    14 min
                  </span>
                  <span style={{ marginLeft: "auto", display: "flex", gap: "6px" }}>
                    <button onClick={v.openOrder} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                      Open
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
              <div className="hv3" style={{ padding: "12px 16px", borderBottom: "1px solid #EFF1ED", display: "flex", flexDirection: "column", gap: "8px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "700 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>#SK10474</span>
                  <span style={{ marginLeft: "auto" }}>
                    <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#8A6100", background: "#FBF1DE", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                      Delayed
                    </span>
                  </span>
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "24px", height: "24px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", font: "600 9.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", flex: "none" }}>
                    TF
                  </span>
                  <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Tom Fletcher
                  </span>
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                  <svg width="13" height="13" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <path d="M10 17.5s5.4-4.7 5.4-8.6A5.4 5.4 0 004.6 8.9c0 3.9 5.4 8.6 5.4 8.6z" stroke="#7C8A81" strokeWidth="1.5" />
                    <circle cx="10" cy="8.6" r="1.9" stroke="#7C8A81" strokeWidth="1.5" />
                  </svg>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    7 Lygon St, Carlton
                  </span>
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#8A6100", background: "#FBF1DE", padding: "4px 7px", borderRadius: "5px", whiteSpace: "nowrap" }}>
                    22 min late
                  </span>
                  <span style={{ marginLeft: "auto", display: "flex", gap: "6px" }}>
                    <button onClick={v.openOrder} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                      Open
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
              <div className="hv3" style={{ padding: "12px 16px", borderBottom: "1px solid #EFF1ED", display: "flex", flexDirection: "column", gap: "8px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "700 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>#SK10468</span>
                  <span style={{ marginLeft: "auto" }}>
                    <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#8A6100", background: "#FBF1DE", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                      Delayed
                    </span>
                  </span>
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "24px", height: "24px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", font: "600 9.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", flex: "none" }}>
                    JP
                  </span>
                  <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Jay Patel
                  </span>
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                  <svg width="13" height="13" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <path d="M10 17.5s5.4-4.7 5.4-8.6A5.4 5.4 0 004.6 8.9c0 3.9 5.4 8.6 5.4 8.6z" stroke="#7C8A81" strokeWidth="1.5" />
                    <circle cx="10" cy="8.6" r="1.9" stroke="#7C8A81" strokeWidth="1.5" />
                  </svg>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    12 Brunswick St, Fitzroy
                  </span>
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#8A6100", background: "#FBF1DE", padding: "4px 7px", borderRadius: "5px", whiteSpace: "nowrap" }}>
                    18 min late
                  </span>
                  <span style={{ marginLeft: "auto", display: "flex", gap: "6px" }}>
                    <button onClick={v.openOrder} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                      Open
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
              <div className="hv3" style={{ padding: "12px 16px", borderBottom: "1px solid #EFF1ED", display: "flex", flexDirection: "column", gap: "8px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "700 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>#SK10476</span>
                  <span style={{ marginLeft: "auto" }}>
                    <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#1F5C8B", background: "#E8F1F8", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                      Ready
                    </span>
                  </span>
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "24px", height: "24px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", font: "600 9.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", flex: "none" }}>
                    —
                  </span>
                  <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Unassigned
                  </span>
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                  <svg width="13" height="13" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <path d="M10 17.5s5.4-4.7 5.4-8.6A5.4 5.4 0 004.6 8.9c0 3.9 5.4 8.6 5.4 8.6z" stroke="#7C8A81" strokeWidth="1.5" />
                    <circle cx="10" cy="8.6" r="1.9" stroke="#7C8A81" strokeWidth="1.5" />
                  </svg>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    92 Swan St, Richmond
                  </span>
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#1F5C8B", background: "#E8F1F8", padding: "4px 7px", borderRadius: "5px", whiteSpace: "nowrap" }}>
                    Awaiting driver
                  </span>
                  <span style={{ marginLeft: "auto", display: "flex", gap: "6px" }}>
                    <button onClick={v.openOrder} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                      Open
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
              <div className="hv3" style={{ padding: "12px 16px", borderBottom: "1px solid #EFF1ED", display: "flex", flexDirection: "column", gap: "8px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "700 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>#SK10471</span>
                  <span style={{ marginLeft: "auto" }}>
                    <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#1F5C8B", background: "#E8F1F8", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                      Out for Delivery
                    </span>
                  </span>
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "24px", height: "24px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", font: "600 9.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", flex: "none" }}>
                    AK
                  </span>
                  <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Aisha Khan
                  </span>
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                  <svg width="13" height="13" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <path d="M10 17.5s5.4-4.7 5.4-8.6A5.4 5.4 0 004.6 8.9c0 3.9 5.4 8.6 5.4 8.6z" stroke="#7C8A81" strokeWidth="1.5" />
                    <circle cx="10" cy="8.6" r="1.9" stroke="#7C8A81" strokeWidth="1.5" />
                  </svg>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    410 Chapel St, South Yarra
                  </span>
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "4px 7px", borderRadius: "5px", whiteSpace: "nowrap" }}>
                    6 min
                  </span>
                  <span style={{ marginLeft: "auto", display: "flex", gap: "6px" }}>
                    <button onClick={v.openOrder} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                      Open
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
              <div className="hv3" style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: "8px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "700 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>#SK10465</span>
                  <span style={{ marginLeft: "auto" }}>
                    <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#8A6100", background: "#FBF1DE", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                      Packing
                    </span>
                  </span>
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "24px", height: "24px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", font: "600 9.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", flex: "none" }}>
                    CB
                  </span>
                  <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Chloe Baker
                  </span>
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                  <svg width="13" height="13" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <path d="M10 17.5s5.4-4.7 5.4-8.6A5.4 5.4 0 004.6 8.9c0 3.9 5.4 8.6 5.4 8.6z" stroke="#7C8A81" strokeWidth="1.5" />
                    <circle cx="10" cy="8.6" r="1.9" stroke="#7C8A81" strokeWidth="1.5" />
                  </svg>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    88 Errol St, North Melbourne
                  </span>
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#8A6100", background: "#FBF1DE", padding: "4px 7px", borderRadius: "5px", whiteSpace: "nowrap" }}>
                    Packing
                  </span>
                  <span style={{ marginLeft: "auto", display: "flex", gap: "6px" }}>
                    <button onClick={v.openOrder} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                      Open
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
            </div>
          </div>
        </div>
        <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", overflow: "hidden", flex: "none" }}>
          {" "}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "13px 16px", borderBottom: "1px solid #E4E7E2" }}>
            <span style={{ font: "600 13.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              Zone performance
            </span>
            <span style={{ marginLeft: "auto" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Today · live
              </span>
            </span>
          </div>
          {" "}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "0" }}>
            <div style={{ padding: "15px 16px", borderRight: "1px solid #EFF1ED", display: "flex", flexDirection: "column", gap: "10px" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                <svg width="13" height="13" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <path d="M10 17.5s5.4-4.7 5.4-8.6A5.4 5.4 0 004.6 8.9c0 3.9 5.4 8.6 5.4 8.6z" stroke="#7C8A81" strokeWidth="1.5" />
                  <circle cx="10" cy="8.6" r="1.9" stroke="#7C8A81" strokeWidth="1.5" />
                </svg>
                <span style={{ font: "600 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Melbourne CBD
                </span>
              </span>
              <span style={{ display: "flex", alignItems: "baseline", gap: "7px" }}>
                <span style={{ font: "700 20px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>48</span>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>active</span>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Avg time</span>
                  <span style={{ marginLeft: "auto" }}>
                    <span style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      22.4 min
                    </span>
                  </span>
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>On time</span>
                  <span style={{ marginLeft: "auto" }}>
                    <span style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#17693A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>96%</span>
                  </span>
                </span>
                <span style={{ height: "6px", borderRadius: "3px", background: "#EFF1ED", overflow: "hidden", display: "block" }}>
                  <span style={{ display: "block", width: "92%", height: "100%", background: "#8BE000", borderRadius: "3px" }} />
                </span>
              </span>
            </div>
            <div style={{ padding: "15px 16px", borderRight: "1px solid #EFF1ED", display: "flex", flexDirection: "column", gap: "10px" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                <svg width="13" height="13" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <path d="M10 17.5s5.4-4.7 5.4-8.6A5.4 5.4 0 004.6 8.9c0 3.9 5.4 8.6 5.4 8.6z" stroke="#7C8A81" strokeWidth="1.5" />
                  <circle cx="10" cy="8.6" r="1.9" stroke="#7C8A81" strokeWidth="1.5" />
                </svg>
                <span style={{ font: "600 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Fitzroy & Collingwood
                </span>
              </span>
              <span style={{ display: "flex", alignItems: "baseline", gap: "7px" }}>
                <span style={{ font: "700 20px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>31</span>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>active</span>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Avg time</span>
                  <span style={{ marginLeft: "auto" }}>
                    <span style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      24.8 min
                    </span>
                  </span>
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>On time</span>
                  <span style={{ marginLeft: "auto" }}>
                    <span style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#17693A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>94%</span>
                  </span>
                </span>
                <span style={{ height: "6px", borderRadius: "3px", background: "#EFF1ED", overflow: "hidden", display: "block" }}>
                  <span style={{ display: "block", width: "78%", height: "100%", background: "#8BE000", borderRadius: "3px" }} />
                </span>
              </span>
            </div>
            <div style={{ padding: "15px 16px", borderRight: "1px solid #EFF1ED", display: "flex", flexDirection: "column", gap: "10px" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                <svg width="13" height="13" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <path d="M10 17.5s5.4-4.7 5.4-8.6A5.4 5.4 0 004.6 8.9c0 3.9 5.4 8.6 5.4 8.6z" stroke="#7C8A81" strokeWidth="1.5" />
                  <circle cx="10" cy="8.6" r="1.9" stroke="#7C8A81" strokeWidth="1.5" />
                </svg>
                <span style={{ font: "600 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Richmond</span>
              </span>
              <span style={{ display: "flex", alignItems: "baseline", gap: "7px" }}>
                <span style={{ font: "700 20px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>22</span>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>active</span>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Avg time</span>
                  <span style={{ marginLeft: "auto" }}>
                    <span style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      31.2 min
                    </span>
                  </span>
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>On time</span>
                  <span style={{ marginLeft: "auto" }}>
                    <span style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#8A6100", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>81%</span>
                  </span>
                </span>
                <span style={{ height: "6px", borderRadius: "3px", background: "#EFF1ED", overflow: "hidden", display: "block" }}>
                  <span style={{ display: "block", width: "54%", height: "100%", background: "#C89A28", borderRadius: "3px" }} />
                </span>
              </span>
            </div>
            <div style={{ padding: "15px 16px", borderRight: "1px solid #EFF1ED", display: "flex", flexDirection: "column", gap: "10px" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                <svg width="13" height="13" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <path d="M10 17.5s5.4-4.7 5.4-8.6A5.4 5.4 0 004.6 8.9c0 3.9 5.4 8.6 5.4 8.6z" stroke="#7C8A81" strokeWidth="1.5" />
                  <circle cx="10" cy="8.6" r="1.9" stroke="#7C8A81" strokeWidth="1.5" />
                </svg>
                <span style={{ font: "600 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Carlton & Parkville
                </span>
              </span>
              <span style={{ display: "flex", alignItems: "baseline", gap: "7px" }}>
                <span style={{ font: "700 20px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>14</span>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>active</span>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Avg time</span>
                  <span style={{ marginLeft: "auto" }}>
                    <span style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      28.6 min
                    </span>
                  </span>
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>On time</span>
                  <span style={{ marginLeft: "auto" }}>
                    <span style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#17693A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>88%</span>
                  </span>
                </span>
                <span style={{ height: "6px", borderRadius: "3px", background: "#EFF1ED", overflow: "hidden", display: "block" }}>
                  <span style={{ display: "block", width: "66%", height: "100%", background: "#8BE000", borderRadius: "3px" }} />
                </span>
              </span>
            </div>
            <div style={{ padding: "15px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                <svg width="13" height="13" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <path d="M10 17.5s5.4-4.7 5.4-8.6A5.4 5.4 0 004.6 8.9c0 3.9 5.4 8.6 5.4 8.6z" stroke="#7C8A81" strokeWidth="1.5" />
                  <circle cx="10" cy="8.6" r="1.9" stroke="#7C8A81" strokeWidth="1.5" />
                </svg>
                <span style={{ font: "600 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  South Yarra
                </span>
              </span>
              <span style={{ display: "flex", alignItems: "baseline", gap: "7px" }}>
                <span style={{ font: "700 20px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>9</span>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>active</span>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Avg time</span>
                  <span style={{ marginLeft: "auto" }}>
                    <span style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      26.1 min
                    </span>
                  </span>
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>On time</span>
                  <span style={{ marginLeft: "auto" }}>
                    <span style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#17693A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>92%</span>
                  </span>
                </span>
                <span style={{ height: "6px", borderRadius: "3px", background: "#EFF1ED", overflow: "hidden", display: "block" }}>
                  <span style={{ display: "block", width: "72%", height: "100%", background: "#8BE000", borderRadius: "3px" }} />
                </span>
              </span>
            </div>
          </div>
          {" "}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ font: "600 14px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Drivers</span>
            <span style={{ marginLeft: "auto" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                60 drivers · Collingwood DC
              </span>
            </span>
          </span>
          <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", overflow: "hidden", flex: "none" }}>
            {" "}
            <div style={{ display: "flex", alignItems: "center", gap: "9px", padding: "12px 16px", borderBottom: "1px solid #E4E7E2", flexWrap: "wrap" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "8px", height: "34px", width: "230px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff" }}>
                <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <circle cx="9" cy="9" r="6" stroke="#7C8A81" strokeWidth="1.6" />
                  <path d="M13.4 13.4L18 18" stroke="#7C8A81" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
                <span style={{ font: "400 12.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Search drivers…</span>
              </span>
              <button onClick={v.tb_del3_0} style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_del3_0Fg, background: v.tb_del3_0Bg, border: `1px solid ${v.tb_del3_0Bd}`, padding: "8px 11px", borderRadius: "7px", whiteSpace: "nowrap", cursor: "pointer" }}>
                All · 60
              </button>
              <button onClick={v.tb_del3_1} style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_del3_1Fg, background: v.tb_del3_1Bg, border: `1px solid ${v.tb_del3_1Bd}`, padding: "8px 11px", borderRadius: "7px", whiteSpace: "nowrap", cursor: "pointer" }}>
                Available · 18
              </button>
              <button onClick={v.tb_del3_2} style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_del3_2Fg, background: v.tb_del3_2Bg, border: `1px solid ${v.tb_del3_2Bd}`, padding: "8px 11px", borderRadius: "7px", whiteSpace: "nowrap", cursor: "pointer" }}>
                Delivering · 42
              </button>
              <button onClick={v.tb_del3_3} style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_del3_3Fg, background: v.tb_del3_3Bg, border: `1px solid ${v.tb_del3_3Bd}`, padding: "8px 11px", borderRadius: "7px", whiteSpace: "nowrap", cursor: "pointer" }}>
                Offline · 6
              </button>
              <button onClick={v.openAssign} style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 13px", border: "0", borderRadius: "8px", background: "#0B3D1F", color: "#fff", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
                <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <path d="M10 4.4v11.2M4.4 10h11.2" stroke="#8BE000" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                Assign orders
              </button>
            </div>
            {" "}
            <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1.1fr minmax(96px,1fr) 1.2fr .8fr .7fr .6fr 1fr 120px", gap: "14px", padding: "11px 16px", background: "#F6F7F4", borderBottom: "1px solid #E4E7E2" }}>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Driver
              </span>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Phone
              </span>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Status
              </span>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Load
              </span>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Completed
              </span>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Rating
              </span>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Today
              </span>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Zone
              </span>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Actions
              </span>
            </div>
            {" "}
            <div className="hv3" style={{ display: "grid", gridTemplateColumns: "1.5fr 1.1fr minmax(96px,1fr) 1.2fr .8fr .7fr .6fr 1fr 120px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "9px", minWidth: "0" }}>
                <span style={{ width: "28px", height: "28px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", flex: "none" }}>
                  MR
                </span>
                <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Michael Ryan
                </span>
              </span>
              <span style={{ minWidth: "0" }}>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  +61 412 887 001
                </span>
              </span>
              <span style={{ minWidth: "0" }}>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#1F5C8B", background: "#E8F1F8", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                  Delivering
                </span>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "5px", minWidth: "0" }}>
                <span style={{ font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>2 of 3 stops</span>
                <span style={{ height: "5px", borderRadius: "3px", background: "#EFF1ED", overflow: "hidden", display: "block" }}>
                  <span style={{ display: "block", width: "67%", height: "100%", background: "#8BE000", borderRadius: "3px" }} />
                </span>
              </span>
              <span style={{ minWidth: "0" }}>
                <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>1,482</span>
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "4px", minWidth: "0" }}>
                <svg width="12" height="12" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <path d="M10 3.2l2.1 4.3 4.7.7-3.4 3.3.8 4.7L10 14l-4.2 2.2.8-4.7L3.2 8.2l4.7-.7L10 3.2z" stroke="#C89A28" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
                <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>4.9</span>
              </span>
              <span style={{ minWidth: "0" }}>
                <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>14</span>
              </span>
              <span style={{ minWidth: "0" }}>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Melbourne CBD
                </span>
              </span>
              <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                <button onClick={v.nav_driver} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                  View
                </button>
                <button onClick={v.openCallDriver} aria-label="Call driver" style={{ width: "26px", height: "26px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <svg width="13" height="13" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <path d="M4.3 3.4h2.9a.9.9 0 01.86.63l.83 2.6a.9.9 0 01-.36 1l-1.44.99a9.4 9.4 0 004.29 4.29l.99-1.44a.9.9 0 011-.36l2.6.83a.9.9 0 01.63.86v2.9a1 1 0 01-1.09 1A13 13 0 013.3 4.49a1 1 0 011-1.09z" stroke="#7C8A81" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                </button>
              </span>
            </div>
            {" "}
            <div className="hv3" style={{ display: "grid", gridTemplateColumns: "1.5fr 1.1fr minmax(96px,1fr) 1.2fr .8fr .7fr .6fr 1fr 120px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "9px", minWidth: "0" }}>
                <span style={{ width: "28px", height: "28px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", flex: "none" }}>
                  SA
                </span>
                <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Sofia Almeida
                </span>
              </span>
              <span style={{ minWidth: "0" }}>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  +61 431 220 664
                </span>
              </span>
              <span style={{ minWidth: "0" }}>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#1F5C8B", background: "#E8F1F8", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                  Delivering
                </span>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "5px", minWidth: "0" }}>
                <span style={{ font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#8A6100", whiteSpace: "nowrap" }}>3 of 3 stops</span>
                <span style={{ height: "5px", borderRadius: "3px", background: "#EFF1ED", overflow: "hidden", display: "block" }}>
                  <span style={{ display: "block", width: "100%", height: "100%", background: "#C89A28", borderRadius: "3px" }} />
                </span>
              </span>
              <span style={{ minWidth: "0" }}>
                <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>986</span>
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "4px", minWidth: "0" }}>
                <svg width="12" height="12" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <path d="M10 3.2l2.1 4.3 4.7.7-3.4 3.3.8 4.7L10 14l-4.2 2.2.8-4.7L3.2 8.2l4.7-.7L10 3.2z" stroke="#C89A28" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
                <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>4.8</span>
              </span>
              <span style={{ minWidth: "0" }}>
                <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>11</span>
              </span>
              <span style={{ minWidth: "0" }}>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Fitzroy</span>
              </span>
              <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                <button onClick={v.nav_driver} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                  View
                </button>
                <button onClick={v.openCallDriver} aria-label="Call driver" style={{ width: "26px", height: "26px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <svg width="13" height="13" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <path d="M4.3 3.4h2.9a.9.9 0 01.86.63l.83 2.6a.9.9 0 01-.36 1l-1.44.99a9.4 9.4 0 004.29 4.29l.99-1.44a.9.9 0 011-.36l2.6.83a.9.9 0 01.63.86v2.9a1 1 0 01-1.09 1A13 13 0 013.3 4.49a1 1 0 011-1.09z" stroke="#7C8A81" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                </button>
              </span>
            </div>
            {" "}
            <div className="hv3" style={{ display: "grid", gridTemplateColumns: "1.5fr 1.1fr minmax(96px,1fr) 1.2fr .8fr .7fr .6fr 1fr 120px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "9px", minWidth: "0" }}>
                <span style={{ width: "28px", height: "28px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", flex: "none" }}>
                  TF
                </span>
                <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Tom Fletcher
                </span>
              </span>
              <span style={{ minWidth: "0" }}>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  +61 402 118 559
                </span>
              </span>
              <span style={{ minWidth: "0" }}>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#8A6100", background: "#FBF1DE", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                  Delayed
                </span>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "5px", minWidth: "0" }}>
                <span style={{ font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#8A6100", whiteSpace: "nowrap" }}>3 of 3 stops</span>
                <span style={{ height: "5px", borderRadius: "3px", background: "#EFF1ED", overflow: "hidden", display: "block" }}>
                  <span style={{ display: "block", width: "100%", height: "100%", background: "#C89A28", borderRadius: "3px" }} />
                </span>
              </span>
              <span style={{ minWidth: "0" }}>
                <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>1,204</span>
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "4px", minWidth: "0" }}>
                <svg width="12" height="12" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <path d="M10 3.2l2.1 4.3 4.7.7-3.4 3.3.8 4.7L10 14l-4.2 2.2.8-4.7L3.2 8.2l4.7-.7L10 3.2z" stroke="#C89A28" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
                <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>4.6</span>
              </span>
              <span style={{ minWidth: "0" }}>
                <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>9</span>
              </span>
              <span style={{ minWidth: "0" }}>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Carlton</span>
              </span>
              <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                <button onClick={v.nav_driver} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                  View
                </button>
                <button onClick={v.openCallDriver} aria-label="Call driver" style={{ width: "26px", height: "26px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <svg width="13" height="13" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <path d="M4.3 3.4h2.9a.9.9 0 01.86.63l.83 2.6a.9.9 0 01-.36 1l-1.44.99a9.4 9.4 0 004.29 4.29l.99-1.44a.9.9 0 011-.36l2.6.83a.9.9 0 01.63.86v2.9a1 1 0 01-1.09 1A13 13 0 013.3 4.49a1 1 0 011-1.09z" stroke="#7C8A81" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                </button>
              </span>
            </div>
            {" "}
            <div className="hv3" style={{ display: "grid", gridTemplateColumns: "1.5fr 1.1fr minmax(96px,1fr) 1.2fr .8fr .7fr .6fr 1fr 120px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "9px", minWidth: "0" }}>
                <span style={{ width: "28px", height: "28px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", flex: "none" }}>
                  AK
                </span>
                <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Aisha Khan
                </span>
              </span>
              <span style={{ minWidth: "0" }}>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  +61 466 773 210
                </span>
              </span>
              <span style={{ minWidth: "0" }}>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#1F5C8B", background: "#E8F1F8", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                  Delivering
                </span>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "5px", minWidth: "0" }}>
                <span style={{ font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>2 of 3 stops</span>
                <span style={{ height: "5px", borderRadius: "3px", background: "#EFF1ED", overflow: "hidden", display: "block" }}>
                  <span style={{ display: "block", width: "67%", height: "100%", background: "#8BE000", borderRadius: "3px" }} />
                </span>
              </span>
              <span style={{ minWidth: "0" }}>
                <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>742</span>
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "4px", minWidth: "0" }}>
                <svg width="12" height="12" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <path d="M10 3.2l2.1 4.3 4.7.7-3.4 3.3.8 4.7L10 14l-4.2 2.2.8-4.7L3.2 8.2l4.7-.7L10 3.2z" stroke="#C89A28" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
                <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>4.9</span>
              </span>
              <span style={{ minWidth: "0" }}>
                <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>12</span>
              </span>
              <span style={{ minWidth: "0" }}>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  South Yarra
                </span>
              </span>
              <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                <button onClick={v.nav_driver} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                  View
                </button>
                <button onClick={v.openCallDriver} aria-label="Call driver" style={{ width: "26px", height: "26px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <svg width="13" height="13" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <path d="M4.3 3.4h2.9a.9.9 0 01.86.63l.83 2.6a.9.9 0 01-.36 1l-1.44.99a9.4 9.4 0 004.29 4.29l.99-1.44a.9.9 0 011-.36l2.6.83a.9.9 0 01.63.86v2.9a1 1 0 01-1.09 1A13 13 0 013.3 4.49a1 1 0 011-1.09z" stroke="#7C8A81" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                </button>
              </span>
            </div>
            {" "}
            <div className="hv3" style={{ display: "grid", gridTemplateColumns: "1.5fr 1.1fr minmax(96px,1fr) 1.2fr .8fr .7fr .6fr 1fr 120px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "9px", minWidth: "0" }}>
                <span style={{ width: "28px", height: "28px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", flex: "none" }}>
                  JP
                </span>
                <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Jay Patel
                </span>
              </span>
              <span style={{ minWidth: "0" }}>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  +61 419 664 803
                </span>
              </span>
              <span style={{ minWidth: "0" }}>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#8A6100", background: "#FBF1DE", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                  Delayed
                </span>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "5px", minWidth: "0" }}>
                <span style={{ font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#8A6100", whiteSpace: "nowrap" }}>3 of 3 stops</span>
                <span style={{ height: "5px", borderRadius: "3px", background: "#EFF1ED", overflow: "hidden", display: "block" }}>
                  <span style={{ display: "block", width: "100%", height: "100%", background: "#C89A28", borderRadius: "3px" }} />
                </span>
              </span>
              <span style={{ minWidth: "0" }}>
                <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>1,618</span>
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "4px", minWidth: "0" }}>
                <svg width="12" height="12" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <path d="M10 3.2l2.1 4.3 4.7.7-3.4 3.3.8 4.7L10 14l-4.2 2.2.8-4.7L3.2 8.2l4.7-.7L10 3.2z" stroke="#C89A28" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
                <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>4.7</span>
              </span>
              <span style={{ minWidth: "0" }}>
                <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>8</span>
              </span>
              <span style={{ minWidth: "0" }}>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Richmond</span>
              </span>
              <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                <button onClick={v.nav_driver} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                  View
                </button>
                <button onClick={v.openCallDriver} aria-label="Call driver" style={{ width: "26px", height: "26px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <svg width="13" height="13" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <path d="M4.3 3.4h2.9a.9.9 0 01.86.63l.83 2.6a.9.9 0 01-.36 1l-1.44.99a9.4 9.4 0 004.29 4.29l.99-1.44a.9.9 0 011-.36l2.6.83a.9.9 0 01.63.86v2.9a1 1 0 01-1.09 1A13 13 0 013.3 4.49a1 1 0 011-1.09z" stroke="#7C8A81" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                </button>
              </span>
            </div>
            {" "}
            <div className="hv3" style={{ display: "grid", gridTemplateColumns: "1.5fr 1.1fr minmax(96px,1fr) 1.2fr .8fr .7fr .6fr 1fr 120px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "9px", minWidth: "0" }}>
                <span style={{ width: "28px", height: "28px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", flex: "none" }}>
                  CB
                </span>
                <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Chloe Baker
                </span>
              </span>
              <span style={{ minWidth: "0" }}>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  +61 438 002 176
                </span>
              </span>
              <span style={{ minWidth: "0" }}>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                  Available
                </span>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "5px", minWidth: "0" }}>
                <span style={{ font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>0 of 3 stops</span>
                <span style={{ height: "5px", borderRadius: "3px", background: "#EFF1ED", overflow: "hidden", display: "block" }}>
                  <span style={{ display: "block", width: "0%", height: "100%", background: "#8BE000", borderRadius: "3px" }} />
                </span>
              </span>
              <span style={{ minWidth: "0" }}>
                <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>512</span>
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "4px", minWidth: "0" }}>
                <svg width="12" height="12" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <path d="M10 3.2l2.1 4.3 4.7.7-3.4 3.3.8 4.7L10 14l-4.2 2.2.8-4.7L3.2 8.2l4.7-.7L10 3.2z" stroke="#C89A28" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
                <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>4.5</span>
              </span>
              <span style={{ minWidth: "0" }}>
                <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>6</span>
              </span>
              <span style={{ minWidth: "0" }}>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Melbourne CBD
                </span>
              </span>
              <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                <button onClick={v.nav_driver} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                  View
                </button>
                <button onClick={v.openCallDriver} aria-label="Call driver" style={{ width: "26px", height: "26px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <svg width="13" height="13" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <path d="M4.3 3.4h2.9a.9.9 0 01.86.63l.83 2.6a.9.9 0 01-.36 1l-1.44.99a9.4 9.4 0 004.29 4.29l.99-1.44a.9.9 0 011-.36l2.6.83a.9.9 0 01.63.86v2.9a1 1 0 01-1.09 1A13 13 0 013.3 4.49a1 1 0 011-1.09z" stroke="#7C8A81" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                </button>
              </span>
            </div>
            {" "}
            <div className="hv3" style={{ display: "grid", gridTemplateColumns: "1.5fr 1.1fr minmax(96px,1fr) 1.2fr .8fr .7fr .6fr 1fr 120px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "9px", minWidth: "0" }}>
                <span style={{ width: "28px", height: "28px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", flex: "none" }}>
                  NB
                </span>
                <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Noah Brooks
                </span>
              </span>
              <span style={{ minWidth: "0" }}>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  +61 427 118 903
                </span>
              </span>
              <span style={{ minWidth: "0" }}>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                  Available
                </span>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "5px", minWidth: "0" }}>
                <span style={{ font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>0 of 3 stops</span>
                <span style={{ height: "5px", borderRadius: "3px", background: "#EFF1ED", overflow: "hidden", display: "block" }}>
                  <span style={{ display: "block", width: "0%", height: "100%", background: "#8BE000", borderRadius: "3px" }} />
                </span>
              </span>
              <span style={{ minWidth: "0" }}>
                <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>864</span>
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "4px", minWidth: "0" }}>
                <svg width="12" height="12" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <path d="M10 3.2l2.1 4.3 4.7.7-3.4 3.3.8 4.7L10 14l-4.2 2.2.8-4.7L3.2 8.2l4.7-.7L10 3.2z" stroke="#C89A28" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
                <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>4.8</span>
              </span>
              <span style={{ minWidth: "0" }}>
                <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>7</span>
              </span>
              <span style={{ minWidth: "0" }}>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Fitzroy</span>
              </span>
              <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                <button onClick={v.nav_driver} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                  View
                </button>
                <button onClick={v.openCallDriver} aria-label="Call driver" style={{ width: "26px", height: "26px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <svg width="13" height="13" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <path d="M4.3 3.4h2.9a.9.9 0 01.86.63l.83 2.6a.9.9 0 01-.36 1l-1.44.99a9.4 9.4 0 004.29 4.29l.99-1.44a.9.9 0 011-.36l2.6.83a.9.9 0 01.63.86v2.9a1 1 0 01-1.09 1A13 13 0 013.3 4.49a1 1 0 011-1.09z" stroke="#7C8A81" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                </button>
              </span>
            </div>
            {" "}
            <div className="hv3" style={{ display: "grid", gridTemplateColumns: "1.5fr 1.1fr minmax(96px,1fr) 1.2fr .8fr .7fr .6fr 1fr 120px", gap: "14px", padding: "13px 16px", alignItems: "center" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "9px", minWidth: "0" }}>
                <span style={{ width: "28px", height: "28px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", flex: "none" }}>
                  RC
                </span>
                <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Ruby Carter
                </span>
              </span>
              <span style={{ minWidth: "0" }}>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  +61 414 552 018
                </span>
              </span>
              <span style={{ minWidth: "0" }}>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#5F6B62", background: "#EEF0EC", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                  Offline
                </span>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "5px", minWidth: "0" }}>
                <span style={{ font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>0 of 3 stops</span>
                <span style={{ height: "5px", borderRadius: "3px", background: "#EFF1ED", overflow: "hidden", display: "block" }}>
                  <span style={{ display: "block", width: "0%", height: "100%", background: "#8BE000", borderRadius: "3px" }} />
                </span>
              </span>
              <span style={{ minWidth: "0" }}>
                <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>1,092</span>
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "4px", minWidth: "0" }}>
                <svg width="12" height="12" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <path d="M10 3.2l2.1 4.3 4.7.7-3.4 3.3.8 4.7L10 14l-4.2 2.2.8-4.7L3.2 8.2l4.7-.7L10 3.2z" stroke="#C89A28" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
                <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>4.7</span>
              </span>
              <span style={{ minWidth: "0" }}>
                <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>0</span>
              </span>
              <span style={{ minWidth: "0" }}>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>—</span>
              </span>
              <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                <button onClick={v.nav_driver} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                  View
                </button>
                <button onClick={v.openCallDriver} aria-label="Call driver" style={{ width: "26px", height: "26px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <svg width="13" height="13" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <path d="M4.3 3.4h2.9a.9.9 0 01.86.63l.83 2.6a.9.9 0 01-.36 1l-1.44.99a9.4 9.4 0 004.29 4.29l.99-1.44a.9.9 0 011-.36l2.6.83a.9.9 0 01.63.86v2.9a1 1 0 01-1.09 1A13 13 0 013.3 4.49a1 1 0 011-1.09z" stroke="#7C8A81" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                </button>
              </span>
            </div>
            {" "}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderTop: "1px solid #E4E7E2", background: "#fff" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Showing 8 of 60 drivers · 18 available, 42 delivering
              </span>
              <button onClick={v.nav_driver} style={{ marginLeft: "auto", height: "30px", padding: "0 12px", border: "1px solid #E4E7E2", borderRadius: "7px", background: "#fff", font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                Driver management →
              </button>
            </div>
            {" "}
          </div>
        </div>
      </div>
    </>
  )
}
