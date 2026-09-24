export default function Settings({ v }) {
  return (
    <>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "18px", padding: "24px 26px 2px" }}>
        <span style={{ display: "flex", flexDirection: "column", gap: "5px", minWidth: "0" }}>
          <span style={{ font: "700 20px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Settings</span>
          <span style={{ font: "400 12.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Store configuration for Spice Kart Australia</span>
        </span>
        <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px" }}>
          <button className="hv1" onClick={v.discardChanges} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 12px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", color: "#17201A", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
            Discard changes
          </button>
          <button className="hv2" onClick={v.saveSettings} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 13px", border: "0", borderRadius: "8px", background: "#0B3D1F", color: "#fff", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
              <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#8BE000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Save settings
          </button>
        </span>
      </div>
      <div className="ad-scroll" style={{ flex: "1", minHeight: "0", overflowY: "auto", padding: "20px 26px 30px", display: "flex", flexDirection: "column", gap: "18px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "18px", alignItems: "start" }}>
          <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "8px", display: "flex", flexDirection: "column", gap: "2px" }}>
            <button className="hv6" onClick={v.tb_settings_0} style={{ display: "flex", alignItems: "center", gap: "9px", border: "0", background: "#F1F9DF", color: "#0B3D1F", borderRadius: "7px", padding: "0 10px", height: "34px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", textAlign: "left" }}>
              General
            </button>
            <button className="hv6" onClick={v.tb_settings_1} style={{ display: "flex", alignItems: "center", gap: "9px", border: "0", background: "transparent", color: "#4A564E", borderRadius: "7px", padding: "0 10px", height: "34px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", textAlign: "left" }}>
              Delivery
            </button>
            <button className="hv6" onClick={v.tb_settings_2} style={{ display: "flex", alignItems: "center", gap: "9px", border: "0", background: "transparent", color: "#4A564E", borderRadius: "7px", padding: "0 10px", height: "34px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", textAlign: "left" }}>
              Payments
            </button>
            <button className="hv6" onClick={v.tb_settings_3} style={{ display: "flex", alignItems: "center", gap: "9px", border: "0", background: "transparent", color: "#4A564E", borderRadius: "7px", padding: "0 10px", height: "34px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", textAlign: "left" }}>
              Notifications
            </button>
            <button className="hv6" onClick={v.tb_settings_4} style={{ display: "flex", alignItems: "center", gap: "9px", border: "0", background: "transparent", color: "#4A564E", borderRadius: "7px", padding: "0 10px", height: "34px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", textAlign: "left" }}>
              Store hours
            </button>
            <button className="hv6" onClick={v.tb_settings_5} style={{ display: "flex", alignItems: "center", gap: "9px", border: "0", background: "transparent", color: "#4A564E", borderRadius: "7px", padding: "0 10px", height: "34px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", textAlign: "left" }}>
              Security
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "18px", display: "flex", flexDirection: "column", gap: "14px" }}>
              <span style={{ font: "600 13.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>General</span>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "11px" }}>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    STORE NAME
                  </span>
                  <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Spice Kart Australia
                  </span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    SUPPORT EMAIL
                  </span>
                  <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    help@spicekart.com.au
                  </span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    SUPPORT PHONE
                  </span>
                  <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    1800 774 235
                  </span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    ABN
                  </span>
                  <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    41 998 220 117
                  </span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px", gridColumn: "span 2" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    BUSINESS ADDRESS
                  </span>
                  <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    118 Smith Street, Collingwood VIC 3066
                  </span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    CURRENCY
                  </span>
                  <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    AUD ($)
                  </span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    TIME ZONE
                  </span>
                  <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Australia/Melbourne (AEST)
                  </span>
                </span>
              </div>
            </div>
            <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "18px", display: "flex", flexDirection: "column", gap: "14px" }}>
              <span style={{ font: "600 13.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Delivery</span>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "11px" }}>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    EXPRESS DELIVERY FEE
                  </span>
                  <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    $3.99
                  </span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    SCHEDULED DELIVERY FEE
                  </span>
                  <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    $2.99
                  </span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    FREE DELIVERY THRESHOLD
                  </span>
                  <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    $199.00
                  </span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    MINIMUM ORDER VALUE
                  </span>
                  <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    $15.00
                  </span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    DELIVERY RADIUS
                  </span>
                  <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    18 km from store
                  </span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    EXPRESS ETA
                  </span>
                  <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    25 minutes
                  </span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    SCHEDULED SLOT LENGTH
                  </span>
                  <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    30 minutes
                  </span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    SLOTS PER DAY
                  </span>
                  <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    22 windows
                  </span>
                </span>
              </div>
            </div>
            <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "18px", display: "flex", flexDirection: "column", gap: "14px" }}>
              <span style={{ font: "600 13.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Payments & tax</span>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "11px" }}>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    GST RATE
                  </span>
                  <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    10% (included in price)
                  </span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    REFUND DESTINATION
                  </span>
                  <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Spice Kart Money by default
                  </span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    CARD PAYMENTS
                  </span>
                  <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Visa, Mastercard, Amex
                  </span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    WALLETS
                  </span>
                  <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Apple Pay, Google Pay, PayID
                  </span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    RESTOCKING FEE
                  </span>
                  <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    $4.95 max
                  </span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    PAYOUT SCHEDULE
                  </span>
                  <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Daily · 6:00 AM
                  </span>
                </span>
              </div>
            </div>
            <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "18px", display: "flex", flexDirection: "column", gap: "2px" }}>
              <span style={{ font: "600 13.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", paddingBottom: "6px" }}>Notifications</span>
              <span style={{ display: "flex", alignItems: "center", gap: "11px", padding: "10px 0", borderBottom: "1px solid #EFF1ED" }}>
                <span style={{ display: "flex", flexDirection: "column", gap: "3px", flex: "1", minWidth: "0" }}>
                  <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Order confirmation email</span>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81" }}>Sent to the customer on every order</span>
                </span>
                <span style={{ width: "38px", height: "22px", borderRadius: "11px", background: "#8BE000", position: "relative", flex: "none", display: "block" }}>
                  {" "}
                  <span style={{ position: "absolute", top: "2.5px", left: "18px", width: "17px", height: "17px", borderRadius: "9px", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,.2)", display: "block" }} />
                  {" "}
                </span>
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "11px", padding: "10px 0", borderBottom: "1px solid #EFF1ED" }}>
                <span style={{ display: "flex", flexDirection: "column", gap: "3px", flex: "1", minWidth: "0" }}>
                  <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Delivery SMS updates</span>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81" }}>Out-for-delivery and arrival alerts</span>
                </span>
                <span style={{ width: "38px", height: "22px", borderRadius: "11px", background: "#8BE000", position: "relative", flex: "none", display: "block" }}>
                  {" "}
                  <span style={{ position: "absolute", top: "2.5px", left: "18px", width: "17px", height: "17px", borderRadius: "9px", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,.2)", display: "block" }} />
                  {" "}
                </span>
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "11px", padding: "10px 0", borderBottom: "1px solid #EFF1ED" }}>
                <span style={{ display: "flex", flexDirection: "column", gap: "3px", flex: "1", minWidth: "0" }}>
                  <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Promotional push</span>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81" }}>Marketing campaigns and offers</span>
                </span>
                <span style={{ width: "38px", height: "22px", borderRadius: "11px", background: "#8BE000", position: "relative", flex: "none", display: "block" }}>
                  {" "}
                  <span style={{ position: "absolute", top: "2.5px", left: "18px", width: "17px", height: "17px", borderRadius: "9px", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,.2)", display: "block" }} />
                  {" "}
                </span>
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "11px", padding: "10px 0", borderBottom: "1px solid #EFF1ED" }}>
                <span style={{ display: "flex", flexDirection: "column", gap: "3px", flex: "1", minWidth: "0" }}>
                  <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Low stock alerts to Slack</span>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81" }}>#spicekart-ops channel</span>
                </span>
                <span style={{ width: "38px", height: "22px", borderRadius: "11px", background: "#8BE000", position: "relative", flex: "none", display: "block" }}>
                  {" "}
                  <span style={{ position: "absolute", top: "2.5px", left: "18px", width: "17px", height: "17px", borderRadius: "9px", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,.2)", display: "block" }} />
                  {" "}
                </span>
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "11px", padding: "10px 0", borderBottom: "1px solid #EFF1ED" }}>
                <span style={{ display: "flex", flexDirection: "column", gap: "3px", flex: "1", minWidth: "0" }}>
                  <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Daily operations digest</span>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81" }}>Emailed at 7:00 AM AEST</span>
                </span>
                <span style={{ width: "38px", height: "22px", borderRadius: "11px", background: "#DCDDD8", position: "relative", flex: "none", display: "block" }}>
                  {" "}
                  <span style={{ position: "absolute", top: "2.5px", left: "2.5px", width: "17px", height: "17px", borderRadius: "9px", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,.2)", display: "block" }} />
                  {" "}
                </span>
              </span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
              <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "18px", display: "flex", flexDirection: "column", gap: "14px" }}>
                <span style={{ font: "600 13.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Store hours</span>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(1,1fr)", gap: "11px" }}>
                  <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                      MONDAY – FRIDAY
                    </span>
                    <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      7:00 AM – 10:00 PM
                    </span>
                  </span>
                  <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                      SATURDAY
                    </span>
                    <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      7:00 AM – 10:00 PM
                    </span>
                  </span>
                  <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                      SUNDAY
                    </span>
                    <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      8:00 AM – 9:00 PM
                    </span>
                  </span>
                  <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                      PUBLIC HOLIDAYS
                    </span>
                    <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      9:00 AM – 6:00 PM
                    </span>
                  </span>
                </div>
              </div>
              <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "18px", display: "flex", flexDirection: "column", gap: "2px" }}>
                <span style={{ font: "600 13.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", paddingBottom: "6px" }}>Security</span>
                <span style={{ display: "flex", alignItems: "center", gap: "11px", padding: "10px 0", borderBottom: "1px solid #EFF1ED" }}>
                  <span style={{ display: "flex", flexDirection: "column", gap: "3px", flex: "1", minWidth: "0" }}>
                    <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Two-factor authentication</span>
                    <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81" }}>Required for all admin accounts</span>
                  </span>
                  <span style={{ width: "38px", height: "22px", borderRadius: "11px", background: "#8BE000", position: "relative", flex: "none", display: "block" }}>
                    {" "}
                    <span style={{ position: "absolute", top: "2.5px", left: "18px", width: "17px", height: "17px", borderRadius: "9px", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,.2)", display: "block" }} />
                    {" "}
                  </span>
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "11px", padding: "10px 0", borderBottom: "1px solid #EFF1ED" }}>
                  <span style={{ display: "flex", flexDirection: "column", gap: "3px", flex: "1", minWidth: "0" }}>
                    <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Single sign-on (Google)</span>
                  </span>
                  <span style={{ width: "38px", height: "22px", borderRadius: "11px", background: "#8BE000", position: "relative", flex: "none", display: "block" }}>
                    {" "}
                    <span style={{ position: "absolute", top: "2.5px", left: "18px", width: "17px", height: "17px", borderRadius: "9px", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,.2)", display: "block" }} />
                    {" "}
                  </span>
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "11px", padding: "10px 0", borderBottom: "1px solid #EFF1ED" }}>
                  <span style={{ display: "flex", flexDirection: "column", gap: "3px", flex: "1", minWidth: "0" }}>
                    <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Session timeout after 30 min</span>
                  </span>
                  <span style={{ width: "38px", height: "22px", borderRadius: "11px", background: "#8BE000", position: "relative", flex: "none", display: "block" }}>
                    {" "}
                    <span style={{ position: "absolute", top: "2.5px", left: "18px", width: "17px", height: "17px", borderRadius: "9px", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,.2)", display: "block" }} />
                    {" "}
                  </span>
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "11px", padding: "10px 0", borderBottom: "1px solid #EFF1ED" }}>
                  <span style={{ display: "flex", flexDirection: "column", gap: "3px", flex: "1", minWidth: "0" }}>
                    <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>IP allowlist</span>
                    <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81" }}>Restrict admin access by IP</span>
                  </span>
                  <span style={{ width: "38px", height: "22px", borderRadius: "11px", background: "#DCDDD8", position: "relative", flex: "none", display: "block" }}>
                    {" "}
                    <span style={{ position: "absolute", top: "2.5px", left: "2.5px", width: "17px", height: "17px", borderRadius: "9px", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,.2)", display: "block" }} />
                    {" "}
                  </span>
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "9px", paddingTop: "10px" }}>
                  <button className="hv1" onClick={v.openPassword} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 12px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", color: "#17201A", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
                    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                      <rect x="4.6" y="8.6" width="10.8" height="8" rx="2" stroke="#4A564E" strokeWidth="1.5" />
                      <path d="M7.2 8.6V6.8a2.8 2.8 0 015.6 0v1.8" stroke="#4A564E" strokeWidth="1.5" />
                    </svg>
                    Change password
                  </button>
                  <button className="hv1" onClick={v.openSessions} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 12px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", color: "#17201A", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
                    View login history
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
