import imgBasmatiRice from '../assets/images/basmati-rice.jpg'
import imgFreshCoriander from '../assets/images/fresh-coriander.jpg'
import imgFullCreamMilk from '../assets/images/full-cream-milk.jpg'

export default function CustomerDetail({ v }) {
  return (
    <>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "18px", padding: "24px 26px 2px" }}>
        <span style={{ display: "flex", flexDirection: "column", gap: "5px", minWidth: "0" }}>
          <span style={{ font: "700 20px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>John Smith</span>
          <span style={{ font: "400 12.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Customer since March 2026 · Melbourne CBD</span>
        </span>
        <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px" }}>
          <button className="hv1" onClick={v.openNotifNew} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 12px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", color: "#17201A", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
            Send notification
          </button>
          <button className="hv1" onClick={v.openEditCustomer} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 12px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", color: "#17201A", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
            Edit customer
          </button>
          <button onClick={v.openSuspend} style={{ height: "34px", padding: "0 12px", border: "1px solid #EEDAD5", borderRadius: "8px", background: "#FDF7F5", color: "#A93826", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
            Suspend account
          </button>
        </span>
      </div>
      <div className="ad-scroll" style={{ flex: "1", minHeight: "0", overflowY: "auto", padding: "20px 26px 30px", display: "flex", flexDirection: "column", gap: "18px" }}>
        <button onClick={v.nav_cust} style={{ display: "flex", alignItems: "center", gap: "6px", border: "0", background: "transparent", font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#17693A", cursor: "pointer", padding: "0", whiteSpace: "nowrap", alignSelf: "flex-start" }}>
          <svg width="13" height="13" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
            <path d="M12.4 4.4L6.8 10l5.6 5.6" stroke="#17693A" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to customers
        </button>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "14px" }}>
          <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "15px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "26px", height: "26px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <rect x="4.4" y="4.2" width="11.2" height="12.4" rx="2" stroke="#4A564E" strokeWidth="1.5" />
                  <path d="M7.8 4.2v-.8a1 1 0 011-1h2.4a1 1 0 011 1v.8" stroke="#4A564E" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M7.4 8.8h5.2M7.4 11.4h5.2M7.4 14h3" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
              <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Total orders</span>
            </span>
            <span style={{ font: "700 23px/1.2 Inter,system-ui,sans-serif", color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>24</span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
              ▲ 3 this month
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
              <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Total spend</span>
            </span>
            <span style={{ font: "700 23px/1.2 Inter,system-ui,sans-serif", color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>$1,842.60</span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
              Lifetime value
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
              <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Average order</span>
            </span>
            <span style={{ font: "700 23px/1.2 Inter,system-ui,sans-serif", color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>$76.78</span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
              ▲ $4.20
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
              <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Refunds</span>
            </span>
            <span style={{ font: "700 23px/1.2 Inter,system-ui,sans-serif", color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>2</span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", background: "#EEF0EC", padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
              $14.40 total
            </span>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.8fr", gap: "18px", alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "18px", display: "flex", flexDirection: "column", gap: "14px" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "11px" }}>
                <span style={{ width: "46px", height: "46px", borderRadius: "12px", background: "#0B3D1F", display: "flex", alignItems: "center", justifyContent: "center", font: "700 16px/1.2 Inter,system-ui,sans-serif", color: "#8BE000", flex: "none" }}>
                  JS
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "3px", minWidth: "0" }}>
                  <span style={{ font: "700 14px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    John Smith
                  </span>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Customer ID #CU-20418
                  </span>
                </span>
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                  Active
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                  LOYAL
                </span>
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "8px", paddingTop: "4px", borderTop: "1px solid #EFF1ED" }}>
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <rect x="2.8" y="4.6" width="14.4" height="10.8" rx="2" stroke="#7C8A81" strokeWidth="1.5" />
                  <path d="M3.4 6l6.6 4.6L16.6 6" stroke="#7C8A81" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  john.smith@outlook.com.au
                </span>
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <path d="M4.3 3.4h2.9a.9.9 0 01.86.63l.83 2.6a.9.9 0 01-.36 1l-1.44.99a9.4 9.4 0 004.29 4.29l.99-1.44a.9.9 0 011-.36l2.6.83a.9.9 0 01.63.86v2.9a1 1 0 01-1.09 1A13 13 0 013.3 4.49a1 1 0 011-1.09z" stroke="#7C8A81" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  +61 412 663 208
                </span>
              </span>
            </div>
            <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "18px", display: "flex", flexDirection: "column", gap: "13px" }}>
              <span style={{ font: "600 13.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A" }}>Saved addresses</span>
              <span style={{ display: "flex", gap: "9px", alignItems: "flex-start", padding: "10px", border: "1px solid #E4E7E2", borderRadius: "8px" }}>
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <path d="M10 17.5s5.4-4.7 5.4-8.6A5.4 5.4 0 004.6 8.9c0 3.9 5.4 8.6 5.4 8.6z" stroke="#7C8A81" strokeWidth="1.5" />
                  <circle cx="10" cy="8.6" r="1.9" stroke="#7C8A81" strokeWidth="1.5" />
                </svg>
                <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Home</span>
                    <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                      DEFAULT
                    </span>
                  </span>
                  <span style={{ font: "400 11px/1.5 Inter,system-ui,sans-serif", color: "#7C8A81" }}>12/240 Collins Street, Melbourne VIC 3000</span>
                </span>
              </span>
              <span style={{ display: "flex", gap: "9px", alignItems: "flex-start", padding: "10px", border: "1px solid #E4E7E2", borderRadius: "8px" }}>
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <path d="M10 17.5s5.4-4.7 5.4-8.6A5.4 5.4 0 004.6 8.9c0 3.9 5.4 8.6 5.4 8.6z" stroke="#7C8A81" strokeWidth="1.5" />
                  <circle cx="10" cy="8.6" r="1.9" stroke="#7C8A81" strokeWidth="1.5" />
                </svg>
                <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Work</span>
                  </span>
                  <span style={{ font: "400 11px/1.5 Inter,system-ui,sans-serif", color: "#7C8A81" }}>Level 8, 420 Bourke Street, Melbourne VIC 3000</span>
                </span>
              </span>
            </div>
            <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "15px", display: "flex", flexDirection: "column", gap: "10px" }}>
              <span style={{ font: "600 13.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A" }}>Favourite products</span>
              <span style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                <span style={{ width: "30px", height: "30px", borderRadius: "7px", overflow: "hidden", background: "#F6F7F4", border: "1px solid #E4E7E2", flex: "none", display: "block", position: "relative" }}>
                  <img src={imgFullCreamMilk} alt="" loading="lazy" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
                </span>
                <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Full Cream Milk 2L
                </span>
                <span style={{ marginLeft: "auto" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    18 orders
                  </span>
                </span>
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                <span style={{ width: "30px", height: "30px", borderRadius: "7px", overflow: "hidden", background: "#F6F7F4", border: "1px solid #E4E7E2", flex: "none", display: "block", position: "relative" }}>
                  <img src={imgBasmatiRice} alt="" loading="lazy" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
                </span>
                <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Basmati Rice 5kg
                </span>
                <span style={{ marginLeft: "auto" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    11 orders
                  </span>
                </span>
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                <span style={{ width: "30px", height: "30px", borderRadius: "7px", overflow: "hidden", background: "#F6F7F4", border: "1px solid #E4E7E2", flex: "none", display: "block", position: "relative" }}>
                  <img src={imgFreshCoriander} alt="" loading="lazy" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
                </span>
                <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Fresh Coriander
                </span>
                <span style={{ marginLeft: "auto" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>9 orders</span>
                </span>
              </span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <span style={{ font: "600 13.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A" }}>Order history</span>
              <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", overflow: "hidden", flex: "none" }}>
                {" "}
                <div style={{ display: "grid", gridTemplateColumns: ".9fr .8fr .8fr minmax(84px,1fr) minmax(104px,1.1fr) 1.1fr", gap: "14px", padding: "11px 16px", background: "#F6F7F4", borderBottom: "1px solid #E4E7E2" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Order
                  </span>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Items
                  </span>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Value
                  </span>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Payment
                  </span>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Status
                  </span>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Date
                  </span>
                </div>
                {" "}
                <div className="hv3" style={{ display: "grid", gridTemplateColumns: ".9fr .8fr .8fr minmax(84px,1fr) minmax(104px,1.1fr) 1.1fr", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                  <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      #SK10482
                    </span>
                  </span>
                  <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>8 items</span>
                  </span>
                  <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>$94.04</span>
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
                    <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      Today 12:42 PM
                    </span>
                  </span>
                </div>
                {" "}
                <div className="hv3" style={{ display: "grid", gridTemplateColumns: ".9fr .8fr .8fr minmax(84px,1fr) minmax(104px,1.1fr) 1.1fr", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                  <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      #SK10402
                    </span>
                  </span>
                  <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>12 items</span>
                  </span>
                  <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      $132.20
                    </span>
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
                    <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      18 Sep 2026
                    </span>
                  </span>
                </div>
                {" "}
                <div className="hv3" style={{ display: "grid", gridTemplateColumns: ".9fr .8fr .8fr minmax(84px,1fr) minmax(104px,1.1fr) 1.1fr", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                  <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      #SK10344
                    </span>
                  </span>
                  <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>6 items</span>
                  </span>
                  <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>$58.90</span>
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
                    <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      12 Sep 2026
                    </span>
                  </span>
                </div>
                {" "}
                <div className="hv3" style={{ display: "grid", gridTemplateColumns: ".9fr .8fr .8fr minmax(84px,1fr) minmax(104px,1.1fr) 1.1fr", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                  <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      #SK10288
                    </span>
                  </span>
                  <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>4 items</span>
                  </span>
                  <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>$36.40</span>
                  </span>
                  <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#1F5C8B", background: "#E8F1F8", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                      Refunded
                    </span>
                  </span>
                  <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#1F5C8B", background: "#E8F1F8", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                      Refunded
                    </span>
                  </span>
                  <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      4 Sep 2026
                    </span>
                  </span>
                </div>
                {" "}
                <div className="hv3" style={{ display: "grid", gridTemplateColumns: ".9fr .8fr .8fr minmax(84px,1fr) minmax(104px,1.1fr) 1.1fr", gap: "14px", padding: "13px 16px", alignItems: "center" }}>
                  <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      #SK10201
                    </span>
                  </span>
                  <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>15 items</span>
                  </span>
                  <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      $164.80
                    </span>
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
                    <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      28 Aug 2026
                    </span>
                  </span>
                </div>
                {" "}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderTop: "1px solid #E4E7E2", background: "#fff" }}>
                  <span style={{ font: "400 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Showing 5 of 24 orders</span>
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
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
              <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "18px", display: "flex", flexDirection: "column", gap: "13px" }}>
                <span style={{ font: "600 13.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A" }}>Reviews left</span>
                <span style={{ display: "flex", flexDirection: "column", gap: "5px", padding: "10px", border: "1px solid #E4E7E2", borderRadius: "8px" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                    <span style={{ font: "600 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      Basmati Rice 5kg
                    </span>
                    <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "4px" }}>
                      <svg width="12" height="12" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                        <path d="M10 3.2l2.1 4.3 4.7.7-3.4 3.3.8 4.7L10 14l-4.2 2.2.8-4.7L3.2 8.2l4.7-.7L10 3.2z" stroke="#C89A28" strokeWidth="1.5" strokeLinejoin="round" />
                      </svg>
                      <span style={{ font: "700 11.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>5</span>
                    </span>
                  </span>
                  <span style={{ font: "400 11px/1.5 Inter,system-ui,sans-serif", color: "#7C8A81" }}>Great quality, fluffy every time.</span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "5px", padding: "10px", border: "1px solid #E4E7E2", borderRadius: "8px" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                    <span style={{ font: "600 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      Paneer 500g
                    </span>
                    <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "4px" }}>
                      <svg width="12" height="12" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                        <path d="M10 3.2l2.1 4.3 4.7.7-3.4 3.3.8 4.7L10 14l-4.2 2.2.8-4.7L3.2 8.2l4.7-.7L10 3.2z" stroke="#C89A28" strokeWidth="1.5" strokeLinejoin="round" />
                      </svg>
                      <span style={{ font: "700 11.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>4</span>
                    </span>
                  </span>
                  <span style={{ font: "400 11px/1.5 Inter,system-ui,sans-serif", color: "#7C8A81" }}>Fresh but packaging could be better.</span>
                </span>
              </div>
              <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "18px", display: "flex", flexDirection: "column", gap: "13px" }}>
                <span style={{ font: "600 13.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A" }}>Refund history</span>
                <span style={{ display: "flex", alignItems: "center", gap: "9px", padding: "10px", border: "1px solid #E4E7E2", borderRadius: "8px" }}>
                  <span style={{ display: "flex", flexDirection: "column", gap: "3px", minWidth: "0" }}>
                    <span style={{ font: "600 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>#SK10288</span>
                    <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      Missing item
                    </span>
                  </span>
                  <span style={{ marginLeft: "auto", display: "flex", flexDirection: "column", gap: "4px", alignItems: "flex-end" }}>
                    <span style={{ font: "700 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>$14.40</span>
                    <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                      Approved
                    </span>
                  </span>
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "9px", padding: "10px", border: "1px solid #E4E7E2", borderRadius: "8px" }}>
                  <span style={{ display: "flex", flexDirection: "column", gap: "3px", minWidth: "0" }}>
                    <span style={{ font: "600 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>#SK10102</span>
                    <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      Damaged item
                    </span>
                  </span>
                  <span style={{ marginLeft: "auto", display: "flex", flexDirection: "column", gap: "4px", alignItems: "flex-end" }}>
                    <span style={{ font: "700 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>$6.50</span>
                    <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                      Approved
                    </span>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
