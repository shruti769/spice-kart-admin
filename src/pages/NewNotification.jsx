import imgSpiceKartLogo from '../assets/images/spice-kart-logo.png'

export default function NewNotification({ v }) {
  return (
    <>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "18px", padding: "24px 26px 2px" }}>
        <span style={{ display: "flex", flexDirection: "column", gap: "5px", minWidth: "0" }}>
          <span style={{ font: "700 20px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Create notification</span>
          <span style={{ font: "400 12.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Send a push notification to Spice Kart customers</span>
        </span>
        <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px" }}>
          <button className="hv1" onClick={v.nav_notif} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 12px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", color: "#17201A", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
            Cancel
          </button>
          <button className="hv1" onClick={v.saveDraft} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 12px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", color: "#17201A", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
            Save as draft
          </button>
          <button className="hv2" onClick={v.publishItem} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 13px", border: "0", borderRadius: "8px", background: "#0B3D1F", color: "#fff", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
              <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#8BE000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Schedule send
          </button>
        </span>
      </div>
      <div className="ad-scroll" style={{ flex: "1", minHeight: "0", overflowY: "auto", padding: "20px 26px 30px", display: "flex", flexDirection: "column", gap: "18px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "18px", alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "18px", display: "flex", flexDirection: "column", gap: "14px" }}>
              <span style={{ font: "600 13.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Message</span>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "11px" }}>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    TITLE
                  </span>
                  <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    20% off fresh produce
                  </span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    NOTIFICATION TYPE
                  </span>
                  <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Promotional
                  </span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px", gridColumn: "span 2" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    MESSAGE
                  </span>
                  <span style={{ display: "block", minHeight: "60px", padding: "10px 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "400 12.5px/1.6 Inter,system-ui,sans-serif", color: "#4A564E" }}>
                    Stock up on Victorian-grown veg this week — 20% off everything in the Fresh Produce aisle. Min spend $25.
                  </span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    CTA LABEL
                  </span>
                  <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Shop now
                  </span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    DESTINATION
                  </span>
                  <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Category → Fresh Produce
                  </span>
                </span>
              </div>
            </div>
            <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "18px", display: "flex", flexDirection: "column", gap: "14px" }}>
              <span style={{ font: "600 13.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A" }}>Audience</span>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "8px" }}>
                <span style={{ padding: "11px 10px", border: "1px solid #C7E88A", background: "#F1F9DF", borderRadius: "8px", font: "600 11.5px/1.35 Inter,system-ui,sans-serif", color: "#0B3D1F" }}>
                  All customers
                </span>
                <span style={{ padding: "11px 10px", border: "1px solid #E4E7E2", background: "#fff", borderRadius: "8px", font: "600 11.5px/1.35 Inter,system-ui,sans-serif", color: "#4A564E" }}>
                  New customers
                </span>
                <span style={{ padding: "11px 10px", border: "1px solid #E4E7E2", background: "#fff", borderRadius: "8px", font: "600 11.5px/1.35 Inter,system-ui,sans-serif", color: "#4A564E" }}>
                  Inactive customers
                </span>
                <span style={{ padding: "11px 10px", border: "1px solid #E4E7E2", background: "#fff", borderRadius: "8px", font: "600 11.5px/1.35 Inter,system-ui,sans-serif", color: "#4A564E" }}>
                  Frequent customers
                </span>
                <span style={{ padding: "11px 10px", border: "1px solid #E4E7E2", background: "#fff", borderRadius: "8px", font: "600 11.5px/1.35 Inter,system-ui,sans-serif", color: "#4A564E" }}>
                  Melbourne metro
                </span>
                <span style={{ padding: "11px 10px", border: "1px solid #E4E7E2", background: "#fff", borderRadius: "8px", font: "600 11.5px/1.35 Inter,system-ui,sans-serif", color: "#4A564E" }}>
                  Custom segment
                </span>
              </div>
              <span style={{ display: "flex", alignItems: "center", gap: "9px", padding: "11px", borderRadius: "8px", background: "#F6F7F4", border: "1px solid #E4E7E2" }}>
                <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <circle cx="8.4" cy="7.4" r="2.8" stroke="#4A564E" strokeWidth="1.5" />
                  <path d="M3.4 16.5c.8-2.9 2.6-4.3 5-4.3s4.2 1.4 5 4.3" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M14 5.3a2.6 2.6 0 010 4.8M15.5 16.5c-.3-1.8-.9-3.1-1.8-4" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span style={{ font: "500 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Estimated reach: 486,204 customers</span>
                <span style={{ marginLeft: "auto" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    92% push-enabled
                  </span>
                </span>
              </span>
            </div>
            <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "18px", display: "flex", flexDirection: "column", gap: "14px" }}>
              <span style={{ font: "600 13.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Schedule</span>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "11px" }}>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    SEND
                  </span>
                  <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Scheduled
                  </span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    DATE & TIME
                  </span>
                  <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    22 Sep 2026, 8:00 AM AEST
                  </span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    TIME ZONE
                  </span>
                  <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Customer local time
                  </span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    FREQUENCY CAP
                  </span>
                  <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Max 1 promo per day
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "18px", display: "flex", flexDirection: "column", gap: "13px" }}>
              <span style={{ font: "600 13.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A" }}>Device preview</span>
              <span style={{ borderRadius: "12px", background: "#F6F7F4", border: "1px solid #E4E7E2", padding: "14px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <span style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "12px", padding: "11px", display: "flex", gap: "10px", boxShadow: "0 4px 12px rgba(16,24,16,.06)" }}>
                  <img src={imgSpiceKartLogo} alt="" style={{ width: "32px", height: "32px", borderRadius: "8px", flex: "none" }} />
                  <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                      <span style={{ font: "700 11.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        Spice Kart
                      </span>
                      <span style={{ marginLeft: "auto" }}>
                        <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>now</span>
                      </span>
                    </span>
                    <span style={{ font: "600 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      20% off fresh produce
                    </span>
                    <span style={{ font: "400 11px/1.45 Inter,system-ui,sans-serif", color: "#4A564E" }}>Stock up on Victorian-grown veg this week — min spend $25.</span>
                  </span>
                </span>
                <span style={{ font: "400 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", textAlign: "center" }}>iOS lock screen</span>
              </span>
            </div>
            <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "18px", display: "flex", flexDirection: "column", gap: "2px" }}>
              <span style={{ font: "600 13.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", paddingBottom: "6px" }}>Channels</span>
              <span style={{ display: "flex", alignItems: "center", gap: "11px", padding: "10px 0", borderBottom: "1px solid #EFF1ED" }}>
                <span style={{ display: "flex", flexDirection: "column", gap: "3px", flex: "1", minWidth: "0" }}>
                  <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Push notification</span>
                </span>
                <span style={{ width: "38px", height: "22px", borderRadius: "11px", background: "#8BE000", position: "relative", flex: "none", display: "block" }}>
                  {" "}
                  <span style={{ position: "absolute", top: "2.5px", left: "18px", width: "17px", height: "17px", borderRadius: "9px", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,.2)", display: "block" }} />
                  {" "}
                </span>
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "11px", padding: "10px 0", borderBottom: "1px solid #EFF1ED" }}>
                <span style={{ display: "flex", flexDirection: "column", gap: "3px", flex: "1", minWidth: "0" }}>
                  <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>In-app inbox</span>
                </span>
                <span style={{ width: "38px", height: "22px", borderRadius: "11px", background: "#8BE000", position: "relative", flex: "none", display: "block" }}>
                  {" "}
                  <span style={{ position: "absolute", top: "2.5px", left: "18px", width: "17px", height: "17px", borderRadius: "9px", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,.2)", display: "block" }} />
                  {" "}
                </span>
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "11px", padding: "10px 0", borderBottom: "1px solid #EFF1ED" }}>
                <span style={{ display: "flex", flexDirection: "column", gap: "3px", flex: "1", minWidth: "0" }}>
                  <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Email</span>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81" }}>Also send as an email campaign</span>
                </span>
                <span style={{ width: "38px", height: "22px", borderRadius: "11px", background: "#DCDDD8", position: "relative", flex: "none", display: "block" }}>
                  {" "}
                  <span style={{ position: "absolute", top: "2.5px", left: "2.5px", width: "17px", height: "17px", borderRadius: "9px", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,.2)", display: "block" }} />
                  {" "}
                </span>
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "11px", padding: "10px 0", borderBottom: "1px solid #EFF1ED" }}>
                <span style={{ display: "flex", flexDirection: "column", gap: "3px", flex: "1", minWidth: "0" }}>
                  <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>SMS</span>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81" }}>Charges apply per message</span>
                </span>
                <span style={{ width: "38px", height: "22px", borderRadius: "11px", background: "#DCDDD8", position: "relative", flex: "none", display: "block" }}>
                  {" "}
                  <span style={{ position: "absolute", top: "2.5px", left: "2.5px", width: "17px", height: "17px", borderRadius: "9px", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,.2)", display: "block" }} />
                  {" "}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
