export default function NotificationCentre({ v }) {
  return (
    <>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "18px", padding: "24px 26px 2px" }}>
        <span style={{ display: "flex", flexDirection: "column", gap: "5px", minWidth: "0" }}>
          <span style={{ font: "700 20px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Notification centre</span>
          <span style={{ font: "400 12.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>
            7 unread alerts · operations, inventory, payments and system
          </span>
        </span>
        <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "8px", height: "34px", width: "230px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff" }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
              <circle cx="9" cy="9" r="6" stroke="#7C8A81" strokeWidth="1.6" />
              <path d="M13.4 13.4L18 18" stroke="#7C8A81" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <span style={{ font: "400 12.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Search alerts…</span>
          </span>
          <button onClick={v.nav_notif} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 12px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", color: "#17201A", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
            Campaigns
          </button>
          <button onClick={v.markAllRead} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 12px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", color: "#17201A", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
              <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#4A564E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Mark all read
          </button>
          <button onClick={v.nav_settings} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 13px", border: "0", borderRadius: "8px", background: "#0B3D1F", color: "#fff", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
              <path d="M3.8 6.2h12.4M3.8 13.8h12.4" stroke="#8BE000" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="8" cy="6.2" r="2.1" stroke="#8BE000" strokeWidth="1.5" />
              <circle cx="13" cy="13.8" r="2.1" stroke="#8BE000" strokeWidth="1.5" />
            </svg>
            Alert settings
          </button>
        </span>
      </div>
      <div className="ad-scroll" style={{ flex: "1", minHeight: "0", overflowY: "auto", padding: "20px 26px 30px", display: "flex", flexDirection: "column", gap: "18px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "14px" }}>
          <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "15px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "26px", height: "26px", borderRadius: "7px", background: "#FAEDEA", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <path d="M6 8.8a4 4 0 118 0v2.9l1.32 2.14a.6.6 0 01-.51.91H5.19a.6.6 0 01-.51-.91L6 11.7V8.8z" stroke="#A93826" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M8.4 16.4a1.7 1.7 0 003.2 0" stroke="#A93826" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
              <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Unread</span>
            </span>
            <span style={{ font: "700 23px/1.2 Inter,system-ui,sans-serif", color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>7</span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#A93826", background: "#FAEDEA", padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
              Oldest 2 hrs ago
            </span>
          </div>
          <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "15px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "26px", height: "26px", borderRadius: "7px", background: "#FBF1DE", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <path d="M10 3.6l7 12.2H3l7-12.2z" stroke="#8A6100" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M10 8v3.4" stroke="#8A6100" strokeWidth="1.6" strokeLinecap="round" />
                  <circle cx="10" cy="13.6" r=".9" fill="#8A6100" />
                </svg>
              </span>
              <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Needs action</span>
            </span>
            <span style={{ font: "700 23px/1.2 Inter,system-ui,sans-serif", color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>4</span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#8A6100", background: "#FBF1DE", padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
              Delayed orders
            </span>
          </div>
          <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "15px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "26px", height: "26px", borderRadius: "7px", background: "#E9F6E3", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#0B6B33" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Resolved today</span>
            </span>
            <span style={{ font: "700 23px/1.2 Inter,system-ui,sans-serif", color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>18</span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
              By you and the team
            </span>
          </div>
          <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "15px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "26px", height: "26px", borderRadius: "7px", background: "#EEF0EC", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <path d="M3.8 6.2h12.4M3.8 13.8h12.4" stroke="#5F6B62" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="8" cy="6.2" r="2.1" stroke="#5F6B62" strokeWidth="1.5" />
                  <circle cx="13" cy="13.8" r="2.1" stroke="#5F6B62" strokeWidth="1.5" />
                </svg>
              </span>
              <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Muted channels</span>
            </span>
            <span style={{ font: "700 23px/1.2 Inter,system-ui,sans-serif", color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>2</span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#5F6B62", background: "#EEF0EC", padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
              SMS and email digest
            </span>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1.9fr 1fr", gap: "18px", alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div className="ad-scroll" style={{ display: "flex", gap: "2px", borderBottom: "1px solid #E4E7E2", overflowX: "auto" }}>
              <button onClick={v.tb_notifcentre_0} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_notifcentre_0Fg, borderBottom: `2px solid ${v.tb_notifcentre_0Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
                All · 7
              </button>
              <button onClick={v.tb_notifcentre_1} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_notifcentre_1Fg, borderBottom: `2px solid ${v.tb_notifcentre_1Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
                Operations · 4
              </button>
              <button onClick={v.tb_notifcentre_2} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_notifcentre_2Fg, borderBottom: `2px solid ${v.tb_notifcentre_2Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
                Inventory · 2
              </button>
              <button onClick={v.tb_notifcentre_3} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_notifcentre_3Fg, borderBottom: `2px solid ${v.tb_notifcentre_3Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
                Payments · 1
              </button>
              <button onClick={v.tb_notifcentre_4} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_notifcentre_4Fg, borderBottom: `2px solid ${v.tb_notifcentre_4Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
                Reviews
              </button>
              <button onClick={v.tb_notifcentre_5} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_notifcentre_5Fg, borderBottom: `2px solid ${v.tb_notifcentre_5Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
                System
              </button>
            </div>
            <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", overflow: "hidden", flex: "none" }}>
              {" "}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 16px", background: "#F6F7F4", borderBottom: "1px solid #E4E7E2" }}>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                  Today
                </span>
                <span style={{ font: "500 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>· 5 alerts</span>
              </div>
              {" "}
              <div className="hv7" style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "14px 16px", borderBottom: "1px solid #EFF1ED", background: "#FBFCF9" }}>
                <span style={{ width: "32px", height: "32px", borderRadius: "9px", background: "#FAEDEA", display: "flex", alignItems: "center", justifyContent: "center", flex: "none", marginTop: "1px" }}>
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <path d="M10 3.6l7 12.2H3l7-12.2z" stroke="#A93826" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M10 8v3.4" stroke="#A93826" strokeWidth="1.6" strokeLinecap="round" />
                    <circle cx="10" cy="13.6" r=".9" fill="#A93826" />
                  </svg>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "5px", flex: "1", minWidth: "0" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ width: "7px", height: "7px", borderRadius: "4px", background: "#8BE000", display: "block", flex: "none" }} />
                    <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      4 orders delayed past ETA in Richmond
                    </span>
                    <span style={{ marginLeft: "auto", font: "400 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", flex: "none" }}>2 hrs ago</span>
                  </span>
                  <span style={{ font: "400 11.5px/1.55 Inter,system-ui,sans-serif", color: "#4A564E" }}>
                    Orders #SK10474, #SK10468, #SK10461 and #SK10457 are 8–14 minutes past their promised window. Two drivers are unassigned.
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "8px", paddingTop: "3px" }}>
                    <button onClick={v.nav_del} style={{ height: "28px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "7px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                      Open delivery board
                    </button>
                    <button onClick={v.markRead} style={{ border: "0", background: "transparent", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", cursor: "pointer", whiteSpace: "nowrap", padding: "0" }}>
                      Mark read
                    </button>
                  </span>
                </span>
              </div>
              {" "}
              <div className="hv7" style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "14px 16px", borderBottom: "1px solid #EFF1ED", background: "#FBFCF9" }}>
                <span style={{ width: "32px", height: "32px", borderRadius: "9px", background: "#FBF1DE", display: "flex", alignItems: "center", justifyContent: "center", flex: "none", marginTop: "1px" }}>
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <rect x="3" y="8.8" width="6" height="7.8" rx="1.4" stroke="#8A6100" strokeWidth="1.5" />
                    <rect x="11" y="8.8" width="6" height="7.8" rx="1.4" stroke="#8A6100" strokeWidth="1.5" />
                    <rect x="7" y="3.4" width="6" height="4.6" rx="1.4" stroke="#8A6100" strokeWidth="1.5" />
                  </svg>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "5px", flex: "1", minWidth: "0" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ width: "7px", height: "7px", borderRadius: "4px", background: "#8BE000", display: "block", flex: "none" }} />
                    <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      Basmati Rice 5kg has dropped to 6 units
                    </span>
                    <span style={{ marginLeft: "auto", font: "400 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", flex: "none" }}>2 hrs ago</span>
                  </span>
                  <span style={{ font: "400 11.5px/1.55 Inter,system-ui,sans-serif", color: "#4A564E" }}>
                    Below the minimum level of 25. At the current rate this sells out in roughly 4 hours across Collingwood DC.
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "8px", paddingTop: "3px" }}>
                    <button onClick={v.openStockAdj} style={{ height: "28px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "7px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                      Adjust stock
                    </button>
                    <button onClick={v.markRead} style={{ border: "0", background: "transparent", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", cursor: "pointer", whiteSpace: "nowrap", padding: "0" }}>
                      Mark read
                    </button>
                  </span>
                </span>
              </div>
              {" "}
              <div className="hv7" style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "14px 16px", borderBottom: "1px solid #EFF1ED", background: "#FBFCF9" }}>
                <span style={{ width: "32px", height: "32px", borderRadius: "9px", background: "#FAEDEA", display: "flex", alignItems: "center", justifyContent: "center", flex: "none", marginTop: "1px" }}>
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <rect x="2.6" y="4.8" width="14.8" height="10.4" rx="2" stroke="#A93826" strokeWidth="1.5" />
                    <path d="M2.6 8.4h14.8" stroke="#A93826" strokeWidth="1.5" />
                    <path d="M5.4 12.4h2.8" stroke="#A93826" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "5px", flex: "1", minWidth: "0" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ width: "7px", height: "7px", borderRadius: "4px", background: "#8BE000", display: "block", flex: "none" }} />
                    <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      Payment failed on order #SK10476
                    </span>
                    <span style={{ marginLeft: "auto", font: "400 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", flex: "none" }}>3 hrs ago</span>
                  </span>
                  <span style={{ font: "400 11.5px/1.55 Inter,system-ui,sans-serif", color: "#4A564E" }}>
                    Visa ending 6640 was declined by the issuing bank. The order is on hold and the customer has not been charged.
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "8px", paddingTop: "3px" }}>
                    <button onClick={v.nav_pay} style={{ height: "28px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "7px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                      Review transaction
                    </button>
                    <button onClick={v.markRead} style={{ border: "0", background: "transparent", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", cursor: "pointer", whiteSpace: "nowrap", padding: "0" }}>
                      Mark read
                    </button>
                  </span>
                </span>
              </div>
              {" "}
              <div className="hv7" style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "14px 16px", borderBottom: "1px solid #EFF1ED", background: "#FBFCF9" }}>
                <span style={{ width: "32px", height: "32px", borderRadius: "9px", background: "#FBF1DE", display: "flex", alignItems: "center", justifyContent: "center", flex: "none", marginTop: "1px" }}>
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <rect x="3" y="8.8" width="6" height="7.8" rx="1.4" stroke="#8A6100" strokeWidth="1.5" />
                    <rect x="11" y="8.8" width="6" height="7.8" rx="1.4" stroke="#8A6100" strokeWidth="1.5" />
                    <rect x="7" y="3.4" width="6" height="4.6" rx="1.4" stroke="#8A6100" strokeWidth="1.5" />
                  </svg>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "5px", flex: "1", minWidth: "0" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ width: "7px", height: "7px", borderRadius: "4px", background: "#8BE000", display: "block", flex: "none" }} />
                    <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      Sourdough Loaf is out of stock
                    </span>
                    <span style={{ marginLeft: "auto", font: "400 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", flex: "none" }}>4 hrs ago</span>
                  </span>
                  <span style={{ font: "400 11.5px/1.55 Inter,system-ui,sans-serif", color: "#4A564E" }}>
                    Bakery · 12 customers viewed this product in the last hour. Consider substituting Wholemeal Loaf.
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "8px", paddingTop: "3px" }}>
                    <button onClick={v.nav_inv} style={{ height: "28px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "7px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                      Open inventory
                    </button>
                    <button onClick={v.markRead} style={{ border: "0", background: "transparent", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", cursor: "pointer", whiteSpace: "nowrap", padding: "0" }}>
                      Mark read
                    </button>
                  </span>
                </span>
              </div>
              {" "}
              <div className="hv7" style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "14px 16px", borderBottom: "1px solid #EFF1ED", background: "#FBFCF9" }}>
                <span style={{ width: "32px", height: "32px", borderRadius: "9px", background: "#FBF1DE", display: "flex", alignItems: "center", justifyContent: "center", flex: "none", marginTop: "1px" }}>
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <path d="M10 3.2l2.1 4.3 4.7.7-3.4 3.3.8 4.7L10 14l-4.2 2.2.8-4.7L3.2 8.2l4.7-.7L10 3.2z" stroke="#8A6100" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "5px", flex: "1", minWidth: "0" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ width: "7px", height: "7px", borderRadius: "4px", background: "#8BE000", display: "block", flex: "none" }} />
                    <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      New 1-star review needs moderation
                    </span>
                    <span style={{ marginLeft: "auto", font: "400 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", flex: "none" }}>5 hrs ago</span>
                  </span>
                  <span style={{ font: "400 11.5px/1.55 Inter,system-ui,sans-serif", color: "#4A564E" }}>
                    Rohit Sharma reported warm milk on delivery for Full Cream Milk 2L and has requested a refund.
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "8px", paddingTop: "3px" }}>
                    <button onClick={v.nav_rev} style={{ height: "28px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "7px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                      Moderate review
                    </button>
                    <button onClick={v.markRead} style={{ border: "0", background: "transparent", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", cursor: "pointer", whiteSpace: "nowrap", padding: "0" }}>
                      Mark read
                    </button>
                  </span>
                </span>
              </div>
              {" "}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 16px", background: "#F6F7F4", borderBottom: "1px solid #E4E7E2" }}>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                  Yesterday
                </span>
                <span style={{ font: "500 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>· 2 alerts</span>
              </div>
              {" "}
              <div className="hv7" style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "14px 16px", borderBottom: "1px solid #EFF1ED", background: "#FBFCF9" }}>
                <span style={{ width: "32px", height: "32px", borderRadius: "9px", background: "#E8F1F8", display: "flex", alignItems: "center", justifyContent: "center", flex: "none", marginTop: "1px" }}>
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <circle cx="8.4" cy="7.4" r="2.8" stroke="#1F5C8B" strokeWidth="1.5" />
                    <path d="M3.4 16.5c.8-2.9 2.6-4.3 5-4.3s4.2 1.4 5 4.3" stroke="#1F5C8B" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M14 5.3a2.6 2.6 0 010 4.8M15.5 16.5c-.3-1.8-.9-3.1-1.8-4" stroke="#1F5C8B" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "5px", flex: "1", minWidth: "0" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ width: "7px", height: "7px", borderRadius: "4px", background: "#8BE000", display: "block", flex: "none" }} />
                    <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      Refund request RF-2187 awaiting approval
                    </span>
                    <span style={{ marginLeft: "auto", font: "400 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", flex: "none" }}>Yesterday 10:14 AM</span>
                  </span>
                  <span style={{ font: "400 11.5px/1.55 Inter,system-ui,sans-serif", color: "#4A564E" }}>Mei Chen requested $6.50 back for a damaged item on order #SK10462.</span>
                  <span style={{ display: "flex", alignItems: "center", gap: "8px", paddingTop: "3px" }}>
                    <button onClick={v.openRefund} style={{ height: "28px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "7px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                      Review refund
                    </button>
                    <button onClick={v.markRead} style={{ border: "0", background: "transparent", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", cursor: "pointer", whiteSpace: "nowrap", padding: "0" }}>
                      Mark read
                    </button>
                  </span>
                </span>
              </div>
              {" "}
              <div className="hv7" style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "14px 16px", borderBottom: "1px solid #EFF1ED", background: "#FBFCF9" }}>
                <span style={{ width: "32px", height: "32px", borderRadius: "9px", background: "#E9F6E3", display: "flex", alignItems: "center", justifyContent: "center", flex: "none", marginTop: "1px" }}>
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <rect x="4.4" y="4.2" width="11.2" height="12.4" rx="2" stroke="#0B6B33" strokeWidth="1.5" />
                    <path d="M7.8 4.2v-.8a1 1 0 011-1h2.4a1 1 0 011 1v.8" stroke="#0B6B33" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M7.4 8.8h5.2M7.4 11.4h5.2M7.4 14h3" stroke="#0B6B33" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "5px", flex: "1", minWidth: "0" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ width: "7px", height: "7px", borderRadius: "4px", background: "#8BE000", display: "block", flex: "none" }} />
                    <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      Daily order volume hit a new record
                    </span>
                    <span style={{ marginLeft: "auto", font: "400 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", flex: "none" }}>Yesterday 9:02 PM</span>
                  </span>
                  <span style={{ font: "400 11.5px/1.55 Inter,system-ui,sans-serif", color: "#4A564E" }}>
                    1,412 orders completed — 11.4% above the previous best Friday. Average delivery time held at 24.8 minutes.
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "8px", paddingTop: "3px" }}>
                    <button onClick={v.nav_analytics} style={{ height: "28px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "7px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                      View analytics
                    </button>
                    <button onClick={v.markRead} style={{ border: "0", background: "transparent", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", cursor: "pointer", whiteSpace: "nowrap", padding: "0" }}>
                      Mark read
                    </button>
                  </span>
                </span>
              </div>
              {" "}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 16px", background: "#F6F7F4", borderBottom: "1px solid #E4E7E2" }}>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                  Earlier this week
                </span>
                <span style={{ font: "500 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>· 3 alerts · all resolved</span>
              </div>
              {" "}
              <div className="hv7" style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "14px 16px", borderBottom: "1px solid #EFF1ED", background: "#fff" }}>
                <span style={{ width: "32px", height: "32px", borderRadius: "9px", background: "#EEF0EC", display: "flex", alignItems: "center", justifyContent: "center", flex: "none", marginTop: "1px" }}>
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <path d="M3.8 6.2h12.4M3.8 13.8h12.4" stroke="#5F6B62" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="8" cy="6.2" r="2.1" stroke="#5F6B62" strokeWidth="1.5" />
                    <circle cx="13" cy="13.8" r="2.1" stroke="#5F6B62" strokeWidth="1.5" />
                  </svg>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "5px", flex: "1", minWidth: "0" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      Public holiday hours published
                    </span>
                    <span style={{ marginLeft: "auto", font: "400 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", flex: "none" }}>19 Sep</span>
                  </span>
                  <span style={{ font: "400 11.5px/1.55 Inter,system-ui,sans-serif", color: "#4A564E" }}>
                    Store hours for 25–27 September were updated to 9:00 AM – 6:00 PM and pushed to the app.
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "8px", paddingTop: "3px" }}>
                    <button onClick={v.nav_settings} style={{ height: "28px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "7px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                      Open settings
                    </button>
                    <button onClick={v.markRead} style={{ border: "0", background: "transparent", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", cursor: "pointer", whiteSpace: "nowrap", padding: "0" }}>
                      Mark read
                    </button>
                  </span>
                </span>
              </div>
              {" "}
              <div className="hv7" style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "14px 16px", borderBottom: "1px solid #EFF1ED", background: "#fff" }}>
                <span style={{ width: "32px", height: "32px", borderRadius: "9px", background: "#E9F6E3", display: "flex", alignItems: "center", justifyContent: "center", flex: "none", marginTop: "1px" }}>
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <rect x="2.2" y="5.8" width="8.6" height="8" rx="1.4" stroke="#0B6B33" strokeWidth="1.5" />
                    <path d="M10.8 8.6h3.3a1.4 1.4 0 011.03.45l1.5 1.63a1.4 1.4 0 01.37.95v2.17h-6.2V8.6z" stroke="#0B6B33" strokeWidth="1.5" strokeLinejoin="round" />
                    <circle cx="6" cy="15.6" r="1.5" stroke="#0B6B33" strokeWidth="1.5" />
                    <circle cx="14" cy="15.6" r="1.5" stroke="#0B6B33" strokeWidth="1.5" />
                  </svg>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "5px", flex: "1", minWidth: "0" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      Driver roster filled for the weekend
                    </span>
                    <span style={{ marginLeft: "auto", font: "400 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", flex: "none" }}>18 Sep</span>
                  </span>
                  <span style={{ font: "400 11.5px/1.55 Inter,system-ui,sans-serif", color: "#4A564E" }}>
                    All 22 delivery shifts across Melbourne metro are covered. Two drivers remain on standby.
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "8px", paddingTop: "3px" }}>
                    <button onClick={v.nav_del} style={{ height: "28px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "7px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                      View drivers
                    </button>
                    <button onClick={v.markRead} style={{ border: "0", background: "transparent", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", cursor: "pointer", whiteSpace: "nowrap", padding: "0" }}>
                      Mark read
                    </button>
                  </span>
                </span>
              </div>
              {" "}
              <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", background: "#fff" }}>
                <span style={{ font: "400 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Showing 9 of 184 alerts from the last 30 days</span>
                <button onClick={v.loadOlder} style={{ marginLeft: "auto", height: "30px", padding: "0 12px", border: "1px solid #E4E7E2", borderRadius: "7px", background: "#fff", font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                  Load older alerts
                </button>
              </div>
              {" "}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "18px", display: "flex", flexDirection: "column", gap: "13px" }}>
              <span style={{ font: "600 13.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Needs action now</span>
              <button onClick={v.nav_del} style={{ display: "flex", alignItems: "center", gap: "10px", border: "0", background: "transparent", padding: "9px 0", borderBottom: "1px solid #EFF1ED", cursor: "pointer", textAlign: "left", width: "100%" }}>
                <span style={{ width: "7px", height: "7px", borderRadius: "4px", background: "#A93826", display: "block", flex: "none" }} />
                <span style={{ font: "500 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Delayed orders
                </span>
                <span style={{ marginLeft: "auto", font: "700 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>4</span>
              </button>
              <button onClick={v.nav_pay} style={{ display: "flex", alignItems: "center", gap: "10px", border: "0", background: "transparent", padding: "9px 0", borderBottom: "1px solid #EFF1ED", cursor: "pointer", textAlign: "left", width: "100%" }}>
                <span style={{ width: "7px", height: "7px", borderRadius: "4px", background: "#A93826", display: "block", flex: "none" }} />
                <span style={{ font: "500 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Failed payments
                </span>
                <span style={{ marginLeft: "auto", font: "700 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>1</span>
              </button>
              <button onClick={v.nav_inv} style={{ display: "flex", alignItems: "center", gap: "10px", border: "0", background: "transparent", padding: "9px 0", borderBottom: "1px solid #EFF1ED", cursor: "pointer", textAlign: "left", width: "100%" }}>
                <span style={{ width: "7px", height: "7px", borderRadius: "4px", background: "#8A6100", display: "block", flex: "none" }} />
                <span style={{ font: "500 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Low stock items
                </span>
                <span style={{ marginLeft: "auto", font: "700 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>42</span>
              </button>
              <button onClick={v.openRefund} style={{ display: "flex", alignItems: "center", gap: "10px", border: "0", background: "transparent", padding: "9px 0", borderBottom: "1px solid #EFF1ED", cursor: "pointer", textAlign: "left", width: "100%" }}>
                <span style={{ width: "7px", height: "7px", borderRadius: "4px", background: "#8A6100", display: "block", flex: "none" }} />
                <span style={{ font: "500 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Refunds to review
                </span>
                <span style={{ marginLeft: "auto", font: "700 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>6</span>
              </button>
              <button onClick={v.nav_rev} style={{ display: "flex", alignItems: "center", gap: "10px", border: "0", background: "transparent", padding: "9px 0", borderBottom: "1px solid #EFF1ED", cursor: "pointer", textAlign: "left", width: "100%" }}>
                <span style={{ width: "7px", height: "7px", borderRadius: "4px", background: "#1F5C8B", display: "block", flex: "none" }} />
                <span style={{ font: "500 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Reviews to moderate
                </span>
                <span style={{ marginLeft: "auto", font: "700 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>14</span>
              </button>
              <button onClick={v.nav_dash} style={{ border: "0", background: "transparent", font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#17693A", cursor: "pointer", whiteSpace: "nowrap", padding: "0", alignSelf: "flex-start" }}>
                Open dashboard →
              </button>
            </div>
            <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "18px", display: "flex", flexDirection: "column", gap: "2px" }}>
              <span style={{ font: "600 13.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", paddingBottom: "7px", whiteSpace: "nowrap" }}>Alert channels</span>
              <span style={{ display: "flex", alignItems: "center", gap: "11px", padding: "11px 0", borderBottom: "1px solid #EFF1ED" }}>
                <span style={{ display: "flex", flexDirection: "column", gap: "3px", flex: "1", minWidth: "0" }}>
                  <span style={{ font: "500 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>In-app alerts</span>
                  <span style={{ font: "400 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Always on for critical operations</span>
                </span>
                <span style={{ width: "36px", height: "21px", borderRadius: "11px", background: "#8BE000", position: "relative", flex: "none", display: "block" }}>
                  {" "}
                  <span style={{ position: "absolute", top: "2.5px", left: "17px", width: "16px", height: "16px", borderRadius: "8px", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,.2)", display: "block" }} />
                  {" "}
                </span>
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "11px", padding: "11px 0", borderBottom: "1px solid #EFF1ED" }}>
                <span style={{ display: "flex", flexDirection: "column", gap: "3px", flex: "1", minWidth: "0" }}>
                  <span style={{ font: "500 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Email digest</span>
                  <span style={{ font: "400 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Summary at 7:00 AM AEST</span>
                </span>
                <span style={{ width: "36px", height: "21px", borderRadius: "11px", background: "#DCDDD8", position: "relative", flex: "none", display: "block" }}>
                  {" "}
                  <span style={{ position: "absolute", top: "2.5px", left: "2.5px", width: "16px", height: "16px", borderRadius: "8px", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,.2)", display: "block" }} />
                  {" "}
                </span>
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "11px", padding: "11px 0", borderBottom: "1px solid #EFF1ED" }}>
                <span style={{ display: "flex", flexDirection: "column", gap: "3px", flex: "1", minWidth: "0" }}>
                  <span style={{ font: "500 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Slack · #spicekart-ops</span>
                  <span style={{ font: "400 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Delayed orders and low stock</span>
                </span>
                <span style={{ width: "36px", height: "21px", borderRadius: "11px", background: "#8BE000", position: "relative", flex: "none", display: "block" }}>
                  {" "}
                  <span style={{ position: "absolute", top: "2.5px", left: "17px", width: "16px", height: "16px", borderRadius: "8px", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,.2)", display: "block" }} />
                  {" "}
                </span>
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "11px", padding: "11px 0", borderBottom: "1px solid #EFF1ED" }}>
                <span style={{ display: "flex", flexDirection: "column", gap: "3px", flex: "1", minWidth: "0" }}>
                  <span style={{ font: "500 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>SMS escalation</span>
                  <span style={{ font: "400 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Only for failed payments</span>
                </span>
                <span style={{ width: "36px", height: "21px", borderRadius: "11px", background: "#DCDDD8", position: "relative", flex: "none", display: "block" }}>
                  {" "}
                  <span style={{ position: "absolute", top: "2.5px", left: "2.5px", width: "16px", height: "16px", borderRadius: "8px", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,.2)", display: "block" }} />
                  {" "}
                </span>
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "11px", padding: "11px 0", borderBottom: "1px solid #EFF1ED" }}>
                <span style={{ display: "flex", flexDirection: "column", gap: "3px", flex: "1", minWidth: "0" }}>
                  <span style={{ font: "500 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Weekend alerts</span>
                  <span style={{ font: "400 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Route to the on-call manager</span>
                </span>
                <span style={{ width: "36px", height: "21px", borderRadius: "11px", background: "#8BE000", position: "relative", flex: "none", display: "block" }}>
                  {" "}
                  <span style={{ position: "absolute", top: "2.5px", left: "17px", width: "16px", height: "16px", borderRadius: "8px", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,.2)", display: "block" }} />
                  {" "}
                </span>
              </span>
            </div>
            <div style={{ background: "#FBF6EA", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "18px", display: "flex", flexDirection: "column", gap: "11px", borderColor: "#EEE0C2" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                <svg width="17" height="17" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <path d="M10 3.6l7 12.2H3l7-12.2z" stroke="#8A6100" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M10 8v3.4" stroke="#8A6100" strokeWidth="1.6" strokeLinecap="round" />
                  <circle cx="10" cy="13.6" r=".9" fill="#8A6100" />
                </svg>
                <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#6B4E08", whiteSpace: "nowrap" }}>Escalation is on</span>
              </span>
              <span style={{ font: "400 11px/1.6 Inter,system-ui,sans-serif", color: "#8A7340" }}>
                Unread critical alerts are escalated to Sarah Mitchell (Operations Manager) after 15 minutes. Two alerts are close to escalating.
              </span>
              <button onClick={v.nav_staff} style={{ height: "32px", border: "0", borderRadius: "8px", background: "#8A6100", color: "#fff", font: "600 11.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
                Manage escalation
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
