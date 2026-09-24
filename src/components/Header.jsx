import GlobalSearch from './GlobalSearch'

export default function Header({ v }) {
  return (
    <>
      <header style={{ flex: "none", height: "60px", background: "#fff", borderBottom: "1px solid #E4E7E2", display: "flex", alignItems: "center", gap: "14px", padding: "0 26px" }}>
        <GlobalSearch v={v} placeholder="Search orders, products, customers…" width="300px" background="#F6F7F4" />
        <span style={{ position: "relative", display: "flex", flex: "none" }}>
          <button onClick={v.toggleStore} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 11px", border: `1px solid ${v.storeBd}`, borderRadius: "8px", background: v.storeBg, cursor: "pointer" }}>
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
              <path d="M10 17.5s5.4-4.7 5.4-8.6A5.4 5.4 0 004.6 8.9c0 3.9 5.4 8.6 5.4 8.6z" stroke="#4A564E" strokeWidth="1.5" />
              <circle cx="10" cy="8.6" r="1.9" stroke="#4A564E" strokeWidth="1.5" />
            </svg>
            <span style={{ font: "600 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>{v.storeName}</span>
            <span style={{ display: "flex", transform: `rotate(${v.storeRot})`, transition: "transform .15s" }}>
              <svg width="12" height="12" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                <path d="M7.6 4.4L13 10l-5.4 5.6" stroke="#7C8A81" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
          {v.storeOpen && (
            <>
              <span style={{ position: "absolute", top: "40px", left: "0", zIndex: "70", width: "298px", background: "#fff", border: "1px solid #E4E7E2", borderRadius: "11px", boxShadow: "0 16px 38px rgba(16,24,16,.18)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "9px", padding: "11px 13px", borderBottom: "1px solid #E4E7E2", background: "#F6F7F4" }}>
                  <span style={{ font: "600 10px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".6px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    Switch store
                  </span>
                  <span style={{ marginLeft: "auto", font: "500 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>5 locations</span>
                </span>
                <button className="hv7" onClick={v.pickStore0} style={{ display: "flex", alignItems: "center", gap: "11px", border: "0", borderBottom: "1px solid #EFF1ED", background: v.storeRowBg0, padding: "11px 13px", cursor: "pointer", textAlign: "left", width: "100%" }}>
                  <span style={{ width: "28px", height: "28px", borderRadius: "8px", background: v.storeIconBg0, border: `1px solid ${v.storeIconBd0}`, display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                      <path d="M10 17.5s5.4-4.7 5.4-8.6A5.4 5.4 0 004.6 8.9c0 3.9 5.4 8.6 5.4 8.6z" stroke="#4A564E" strokeWidth="1.5" />
                      <circle cx="10" cy="8.6" r="1.9" stroke="#4A564E" strokeWidth="1.5" />
                    </svg>
                  </span>
                  <span style={{ display: "flex", flexDirection: "column", gap: "3px", flex: "1", minWidth: "0" }}>
                    <span style={{ font: "600 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      Collingwood store
                    </span>
                    <span style={{ font: "400 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      118 Smith Street · flagship DC
                    </span>
                  </span>
                  <span style={{ display: "flex", flexDirection: "column", gap: "3px", alignItems: "flex-end", flex: "none" }}>
                    <span style={{ font: "500 10px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>1,284</span>
                    {v.storeSel0 && (
                      <>
                        <span style={{ display: "flex" }}>
                          <svg width="13" height="13" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                            <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#0B3D1F" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </>
                    )}
                  </span>
                </button>
                <button className="hv7" onClick={v.pickStore1} style={{ display: "flex", alignItems: "center", gap: "11px", border: "0", borderBottom: "1px solid #EFF1ED", background: v.storeRowBg1, padding: "11px 13px", cursor: "pointer", textAlign: "left", width: "100%" }}>
                  <span style={{ width: "28px", height: "28px", borderRadius: "8px", background: v.storeIconBg1, border: `1px solid ${v.storeIconBd1}`, display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                      <path d="M10 17.5s5.4-4.7 5.4-8.6A5.4 5.4 0 004.6 8.9c0 3.9 5.4 8.6 5.4 8.6z" stroke="#4A564E" strokeWidth="1.5" />
                      <circle cx="10" cy="8.6" r="1.9" stroke="#4A564E" strokeWidth="1.5" />
                    </svg>
                  </span>
                  <span style={{ display: "flex", flexDirection: "column", gap: "3px", flex: "1", minWidth: "0" }}>
                    <span style={{ font: "600 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      Richmond store
                    </span>
                    <span style={{ font: "400 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      92 Swan Street · metro east
                    </span>
                  </span>
                  <span style={{ display: "flex", flexDirection: "column", gap: "3px", alignItems: "flex-end", flex: "none" }}>
                    <span style={{ font: "500 10px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>612</span>
                    {v.storeSel1 && (
                      <>
                        <span style={{ display: "flex" }}>
                          <svg width="13" height="13" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                            <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#0B3D1F" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </>
                    )}
                  </span>
                </button>
                <button className="hv7" onClick={v.pickStore2} style={{ display: "flex", alignItems: "center", gap: "11px", border: "0", borderBottom: "1px solid #EFF1ED", background: v.storeRowBg2, padding: "11px 13px", cursor: "pointer", textAlign: "left", width: "100%" }}>
                  <span style={{ width: "28px", height: "28px", borderRadius: "8px", background: v.storeIconBg2, border: `1px solid ${v.storeIconBd2}`, display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                      <path d="M10 17.5s5.4-4.7 5.4-8.6A5.4 5.4 0 004.6 8.9c0 3.9 5.4 8.6 5.4 8.6z" stroke="#4A564E" strokeWidth="1.5" />
                      <circle cx="10" cy="8.6" r="1.9" stroke="#4A564E" strokeWidth="1.5" />
                    </svg>
                  </span>
                  <span style={{ display: "flex", flexDirection: "column", gap: "3px", flex: "1", minWidth: "0" }}>
                    <span style={{ font: "600 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      Carlton store
                    </span>
                    <span style={{ font: "400 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      188 Lygon Street · metro north
                    </span>
                  </span>
                  <span style={{ display: "flex", flexDirection: "column", gap: "3px", alignItems: "flex-end", flex: "none" }}>
                    <span style={{ font: "500 10px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>448</span>
                    {v.storeSel2 && (
                      <>
                        <span style={{ display: "flex" }}>
                          <svg width="13" height="13" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                            <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#0B3D1F" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </>
                    )}
                  </span>
                </button>
                <button className="hv7" onClick={v.pickStore3} style={{ display: "flex", alignItems: "center", gap: "11px", border: "0", borderBottom: "1px solid #EFF1ED", background: v.storeRowBg3, padding: "11px 13px", cursor: "pointer", textAlign: "left", width: "100%" }}>
                  <span style={{ width: "28px", height: "28px", borderRadius: "8px", background: v.storeIconBg3, border: `1px solid ${v.storeIconBd3}`, display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                      <path d="M10 17.5s5.4-4.7 5.4-8.6A5.4 5.4 0 004.6 8.9c0 3.9 5.4 8.6 5.4 8.6z" stroke="#4A564E" strokeWidth="1.5" />
                      <circle cx="10" cy="8.6" r="1.9" stroke="#4A564E" strokeWidth="1.5" />
                    </svg>
                  </span>
                  <span style={{ display: "flex", flexDirection: "column", gap: "3px", flex: "1", minWidth: "0" }}>
                    <span style={{ font: "600 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      South Yarra store
                    </span>
                    <span style={{ font: "400 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      410 Chapel Street · metro south
                    </span>
                  </span>
                  <span style={{ display: "flex", flexDirection: "column", gap: "3px", alignItems: "flex-end", flex: "none" }}>
                    <span style={{ font: "500 10px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>386</span>
                    {v.storeSel3 && (
                      <>
                        <span style={{ display: "flex" }}>
                          <svg width="13" height="13" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                            <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#0B3D1F" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </>
                    )}
                  </span>
                </button>
                <button className="hv7" onClick={v.pickStore4} style={{ display: "flex", alignItems: "center", gap: "11px", border: "0", borderBottom: "1px solid #EFF1ED", background: v.storeRowBg4, padding: "11px 13px", cursor: "pointer", textAlign: "left", width: "100%" }}>
                  <span style={{ width: "28px", height: "28px", borderRadius: "8px", background: v.storeIconBg4, border: `1px solid ${v.storeIconBd4}`, display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                      <path d="M10 17.5s5.4-4.7 5.4-8.6A5.4 5.4 0 004.6 8.9c0 3.9 5.4 8.6 5.4 8.6z" stroke="#4A564E" strokeWidth="1.5" />
                      <circle cx="10" cy="8.6" r="1.9" stroke="#4A564E" strokeWidth="1.5" />
                    </svg>
                  </span>
                  <span style={{ display: "flex", flexDirection: "column", gap: "3px", flex: "1", minWidth: "0" }}>
                    <span style={{ font: "600 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      All stores
                    </span>
                    <span style={{ font: "400 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      Melbourne metro rollup
                    </span>
                  </span>
                  <span style={{ display: "flex", flexDirection: "column", gap: "3px", alignItems: "flex-end", flex: "none" }}>
                    <span style={{ font: "500 10px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>2,730</span>
                    {v.storeSel4 && (
                      <>
                        <span style={{ display: "flex" }}>
                          <svg width="13" height="13" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                            <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#0B3D1F" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </>
                    )}
                  </span>
                </button>
                <button className="hv7" onClick={v.nav_settings} style={{ display: "flex", alignItems: "center", gap: "8px", border: "0", background: "#fff", padding: "11px 13px", cursor: "pointer", textAlign: "left", width: "100%" }}>
                  <span style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#17693A", whiteSpace: "nowrap" }}>Manage stores & delivery zones →</span>
                </button>
              </span>
            </>
          )}
        </span>
        <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px" }}>
          <button onClick={v.toast_help} aria-label="Help" style={{ width: "34px", height: "34px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
              <circle cx="10" cy="10" r="7.2" stroke="#4A564E" strokeWidth="1.5" />
              <path d="M8.1 8a1.9 1.9 0 013.8.3c0 1.3-1.9 1.5-1.9 2.9" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="10" cy="14" r=".9" fill="#4A564E" />
            </svg>
          </button>
          <button onClick={v.toast_notif} aria-label="Notifications" style={{ position: "relative", width: "34px", height: "34px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
              <path d="M6 8.8a4 4 0 118 0v2.9l1.32 2.14a.6.6 0 01-.51.91H5.19a.6.6 0 01-.51-.91L6 11.7V8.8z" stroke="#4A564E" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M8.4 16.4a1.7 1.7 0 003.2 0" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span style={{ position: "absolute", top: "-4px", right: "-4px", minWidth: "16px", height: "16px", padding: "0 4px", borderRadius: "8px", background: "#C4452F", color: "#fff", font: "700 9px/1.2 Inter,system-ui,sans-serif", lineHeight: "16px", textAlign: "center" }}>
              7
            </span>
          </button>
          <span style={{ width: "1px", height: "24px", background: "#E4E7E2" }} />
          <span style={{ display: "flex", alignItems: "center", gap: "9px" }}>
            <span style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#0B3D1F", display: "flex", alignItems: "center", justifyContent: "center", font: "700 11.5px/1.2 Inter,system-ui,sans-serif", color: "#8BE000" }}>
              {v.userInitials}
            </span>
            <span style={{ display: "flex", flexDirection: "column", gap: "2px", maxWidth: "180px" }}>
              <span style={{ font: "600 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{v.userName}</span>
              <span style={{ font: "400 10px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Administrator</span>
            </span>
          </span>
        </span>
      </header>
    </>
  )
}
