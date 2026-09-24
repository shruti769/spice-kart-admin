export default function NewPromotion({ v }) {
  return (
    <>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "18px", padding: "24px 26px 2px" }}>
        <span style={{ display: "flex", flexDirection: "column", gap: "5px", minWidth: "0" }}>
          <span style={{ font: "700 20px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Create offer</span>
          <span style={{ font: "400 12.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Set up a new promotion for the Spice Kart app</span>
        </span>
        <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px" }}>
          <button className="hv1" onClick={v.nav_promo} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 12px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", color: "#17201A", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
            Discard
          </button>
          <button className="hv1" onClick={v.saveDraft} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 12px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", color: "#17201A", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
            Save as draft
          </button>
          <button className="hv2" onClick={v.publishItem} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 13px", border: "0", borderRadius: "8px", background: "#0B3D1F", color: "#fff", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
              <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#8BE000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Publish offer
          </button>
        </span>
      </div>
      <div className="ad-scroll" style={{ flex: "1", minHeight: "0", overflowY: "auto", padding: "20px 26px 30px", display: "flex", flexDirection: "column", gap: "18px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.7fr 1fr", gap: "18px", alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "18px", display: "flex", flexDirection: "column", gap: "14px" }}>
              <span style={{ font: "600 13.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A" }}>Offer type</span>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "8px" }}>
                <span style={{ padding: "11px 10px", border: "1px solid #E4E7E2", background: "#fff", borderRadius: "8px", font: "600 11.5px/1.35 Inter,system-ui,sans-serif", color: "#4A564E" }}>
                  Percentage discount
                </span>
                <span style={{ padding: "11px 10px", border: "1px solid #C7E88A", background: "#F1F9DF", borderRadius: "8px", font: "600 11.5px/1.35 Inter,system-ui,sans-serif", color: "#0B3D1F" }}>
                  Fixed amount
                </span>
                <span style={{ padding: "11px 10px", border: "1px solid #E4E7E2", background: "#fff", borderRadius: "8px", font: "600 11.5px/1.35 Inter,system-ui,sans-serif", color: "#4A564E" }}>
                  Free delivery
                </span>
                <span style={{ padding: "11px 10px", border: "1px solid #E4E7E2", background: "#fff", borderRadius: "8px", font: "600 11.5px/1.35 Inter,system-ui,sans-serif", color: "#4A564E" }}>
                  Buy X get Y
                </span>
                <span style={{ padding: "11px 10px", border: "1px solid #E4E7E2", background: "#fff", borderRadius: "8px", font: "600 11.5px/1.35 Inter,system-ui,sans-serif", color: "#4A564E" }}>
                  First-order discount
                </span>
                <span style={{ padding: "11px 10px", border: "1px solid #E4E7E2", background: "#fff", borderRadius: "8px", font: "600 11.5px/1.35 Inter,system-ui,sans-serif", color: "#4A564E" }}>
                  Category discount
                </span>
                <span style={{ padding: "11px 10px", border: "1px solid #E4E7E2", background: "#fff", borderRadius: "8px", font: "600 11.5px/1.35 Inter,system-ui,sans-serif", color: "#4A564E" }}>
                  Product discount
                </span>
                <span style={{ padding: "11px 10px", border: "1px solid #E4E7E2", background: "#fff", borderRadius: "8px", font: "600 11.5px/1.35 Inter,system-ui,sans-serif", color: "#4A564E" }}>
                  Wallet cashback
                </span>
              </div>
            </div>
            <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "18px", display: "flex", flexDirection: "column", gap: "14px" }}>
              <span style={{ font: "600 13.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Offer details</span>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "11px" }}>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    OFFER NAME
                  </span>
                  <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    First order $5 off
                  </span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    PROMO CODE
                  </span>
                  <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    SPICE5
                  </span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    DISCOUNT AMOUNT
                  </span>
                  <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    $5.00
                  </span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    MAXIMUM DISCOUNT
                  </span>
                  <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    $5.00
                  </span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    MINIMUM ORDER VALUE
                  </span>
                  <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    No minimum
                  </span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    USAGE LIMIT
                  </span>
                  <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    1 per customer
                  </span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px", gridColumn: "span 2" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    DESCRIPTION SHOWN IN APP
                  </span>
                  <span style={{ display: "block", minHeight: "60px", padding: "10px 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "400 12.5px/1.6 Inter,system-ui,sans-serif", color: "#4A564E" }}>
                    $5 off your first Spice Kart order. Applies automatically at checkout — no minimum spend.
                  </span>
                </span>
              </div>
            </div>
            <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "18px", display: "flex", flexDirection: "column", gap: "14px" }}>
              <span style={{ font: "600 13.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Schedule & eligibility</span>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "11px" }}>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    START DATE
                  </span>
                  <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    1 Sep 2026
                  </span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    END DATE
                  </span>
                  <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Ongoing
                  </span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    CUSTOMER ELIGIBILITY
                  </span>
                  <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    New customers only
                  </span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    TOTAL REDEMPTION CAP
                  </span>
                  <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    5,000 uses
                  </span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    APPLICABLE CATEGORIES
                  </span>
                  <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    All categories
                  </span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    EXCLUDED PRODUCTS
                  </span>
                  <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Alcohol, gift cards
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "18px", display: "flex", flexDirection: "column", gap: "13px" }}>
              <span style={{ font: "600 13.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A" }}>App preview</span>
              <span style={{ borderRadius: "10px", background: "linear-gradient(122deg,#0B3D1F 0%,#14572A 56%,#1F7135 100%)", padding: "14px", display: "flex", flexDirection: "column", gap: "9px" }}>
                <span style={{ font: "700 9px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".9px", color: "#8BE000", whiteSpace: "nowrap" }}>FIRST ORDER OFFER</span>
                <span style={{ font: "800 20px/1 Inter,system-ui", color: "#fff", whiteSpace: "nowrap" }}>$5 OFF</span>
                <span style={{ font: "500 10.5px/1.45 Inter,system-ui,sans-serif", color: "rgba(255,255,255,.72)" }}>Applies automatically at checkout on your first order.</span>
                <span style={{ font: "700 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: "1.2px", color: "#8BE000", border: "1px dashed rgba(139,224,0,.6)", background: "rgba(139,224,0,.08)", padding: "6px 9px", borderRadius: "6px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
                  SPICE5
                </span>
              </span>
            </div>
            <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "18px", display: "flex", flexDirection: "column", gap: "2px" }}>
              <span style={{ font: "600 13.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", paddingBottom: "6px" }}>Visibility</span>
              <span style={{ display: "flex", alignItems: "center", gap: "11px", padding: "10px 0", borderBottom: "1px solid #EFF1ED" }}>
                <span style={{ display: "flex", flexDirection: "column", gap: "3px", flex: "1", minWidth: "0" }}>
                  <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Show on Offers screen</span>
                </span>
                <span style={{ width: "38px", height: "22px", borderRadius: "11px", background: "#8BE000", position: "relative", flex: "none", display: "block" }}>
                  {" "}
                  <span style={{ position: "absolute", top: "2.5px", left: "18px", width: "17px", height: "17px", borderRadius: "9px", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,.2)", display: "block" }} />
                  {" "}
                </span>
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "11px", padding: "10px 0", borderBottom: "1px solid #EFF1ED" }}>
                <span style={{ display: "flex", flexDirection: "column", gap: "3px", flex: "1", minWidth: "0" }}>
                  <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Show as home banner</span>
                </span>
                <span style={{ width: "38px", height: "22px", borderRadius: "11px", background: "#DCDDD8", position: "relative", flex: "none", display: "block" }}>
                  {" "}
                  <span style={{ position: "absolute", top: "2.5px", left: "2.5px", width: "17px", height: "17px", borderRadius: "9px", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,.2)", display: "block" }} />
                  {" "}
                </span>
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "11px", padding: "10px 0", borderBottom: "1px solid #EFF1ED" }}>
                <span style={{ display: "flex", flexDirection: "column", gap: "3px", flex: "1", minWidth: "0" }}>
                  <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Stack with other offers</span>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81" }}>Allow alongside bank offers</span>
                </span>
                <span style={{ width: "38px", height: "22px", borderRadius: "11px", background: "#DCDDD8", position: "relative", flex: "none", display: "block" }}>
                  {" "}
                  <span style={{ position: "absolute", top: "2.5px", left: "2.5px", width: "17px", height: "17px", borderRadius: "9px", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,.2)", display: "block" }} />
                  {" "}
                </span>
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "11px", padding: "10px 0", borderBottom: "1px solid #EFF1ED" }}>
                <span style={{ display: "flex", flexDirection: "column", gap: "3px", flex: "1", minWidth: "0" }}>
                  <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Send push notification</span>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81" }}>Notify eligible customers</span>
                </span>
                <span style={{ width: "38px", height: "22px", borderRadius: "11px", background: "#8BE000", position: "relative", flex: "none", display: "block" }}>
                  {" "}
                  <span style={{ position: "absolute", top: "2.5px", left: "18px", width: "17px", height: "17px", borderRadius: "9px", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,.2)", display: "block" }} />
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
