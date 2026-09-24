import imgAlphonsoMangoes from '../assets/images/alphonso-mangoes.jpg'
import imgBasmatiRice from '../assets/images/basmati-rice.jpg'
import imgFullCreamMilk from '../assets/images/full-cream-milk.jpg'
import imgGaramMasala from '../assets/images/garam-masala.jpg'
import imgSourdoughLoaf from '../assets/images/sourdough-loaf.jpg'

export default function Analytics({ v }) {
  return (
    <>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "18px", padding: "24px 26px 2px" }}>
        <span style={{ display: "flex", flexDirection: "column", gap: "5px", minWidth: "0" }}>
          <span style={{ font: "700 20px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Analytics</span>
          <span style={{ font: "400 12.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>
            Performance across orders, customers, products and delivery
          </span>
        </span>
        <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px" }}>
          <button className="hv1" onClick={v.openDateRange} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 12px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", color: "#17201A", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
              <circle cx="10" cy="10" r="7.2" stroke="#4A564E" strokeWidth="1.5" />
              <path d="M10 5.8V10l3 1.8" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Last 30 days
          </button>
          <button className="hv1" onClick={v.openDateRange} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 12px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", color: "#17201A", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
            Compare
          </button>
          <button className="hv2" onClick={v.toast_export} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 13px", border: "0", borderRadius: "8px", background: "#0B3D1F", color: "#fff", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
              <path d="M10 3.6v9M6.4 9.2L10 12.8l3.6-3.6M3.6 16.4h12.8" stroke="#8BE000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Export report
          </button>
        </span>
      </div>
      <div className="ad-scroll" style={{ flex: "1", minHeight: "0", overflowY: "auto", padding: "20px 26px 30px", display: "flex", flexDirection: "column", gap: "18px" }}>
        <div className="ad-scroll" style={{ display: "flex", gap: "2px", borderBottom: "1px solid #E4E7E2", overflowX: "auto" }}>
          <button onClick={v.tb_analytics_0} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_analytics_0Fg, borderBottom: `2px solid ${v.tb_analytics_0Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
            Overview
          </button>
          <button onClick={v.tb_analytics_1} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_analytics_1Fg, borderBottom: `2px solid ${v.tb_analytics_1Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
            Sales
          </button>
          <button onClick={v.tb_analytics_2} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_analytics_2Fg, borderBottom: `2px solid ${v.tb_analytics_2Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
            Orders
          </button>
          <button onClick={v.tb_analytics_3} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_analytics_3Fg, borderBottom: `2px solid ${v.tb_analytics_3Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
            Customers
          </button>
          <button onClick={v.tb_analytics_4} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_analytics_4Fg, borderBottom: `2px solid ${v.tb_analytics_4Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
            Products
          </button>
          <button onClick={v.tb_analytics_5} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_analytics_5Fg, borderBottom: `2px solid ${v.tb_analytics_5Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
            Inventory
          </button>
          <button onClick={v.tb_analytics_6} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_analytics_6Fg, borderBottom: `2px solid ${v.tb_analytics_6Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
            Delivery
          </button>
        </div>
        <div style={{ display: "flex", gap: "6px", padding: "2px", background: "#F6F7F4", border: "1px solid #E4E7E2", borderRadius: "8px", alignSelf: "flex-start" }}>
          <button onClick={v.rng7_0} style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: v.rng7_0Fg, background: v.rng7_0Bg, border: "0", padding: "7px 11px", borderRadius: "6px", whiteSpace: "nowrap", cursor: "pointer" }}>
            7 days
          </button>
          <button onClick={v.rng7_1} style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: v.rng7_1Fg, background: v.rng7_1Bg, border: "0", padding: "7px 11px", borderRadius: "6px", whiteSpace: "nowrap", cursor: "pointer" }}>
            30 days
          </button>
          <button onClick={v.rng7_2} style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: v.rng7_2Fg, background: v.rng7_2Bg, border: "0", padding: "7px 11px", borderRadius: "6px", whiteSpace: "nowrap", cursor: "pointer" }}>
            90 days
          </button>
          <button onClick={v.rng7_3} style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: v.rng7_3Fg, background: v.rng7_3Bg, border: "0", padding: "7px 11px", borderRadius: "6px", whiteSpace: "nowrap", cursor: "pointer" }}>
            12 months
          </button>
          <button onClick={v.rng7_4} style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: v.rng7_4Fg, background: v.rng7_4Bg, border: "0", padding: "7px 11px", borderRadius: "6px", whiteSpace: "nowrap", cursor: "pointer" }}>
            Custom
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "14px" }}>
          <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "15px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "26px", height: "26px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <circle cx="10" cy="10" r="7.2" stroke="#4A564E" strokeWidth="1.5" />
                  <path d="M10 5.6v8.8" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M12.3 7.9c0-1.05-1.03-1.75-2.3-1.75s-2.3.7-2.3 1.75 1.03 1.55 2.3 1.85 2.3.8 2.3 1.85-1.03 1.75-2.3 1.75-2.3-.7-2.3-1.75" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
              <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Revenue</span>
            </span>
            <span style={{ font: "700 23px/1.2 Inter,system-ui,sans-serif", color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>$1.12M</span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
              ▲ 11.4% vs prior
            </span>
          </div>
          <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "15px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "26px", height: "26px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <rect x="4.4" y="4.2" width="11.2" height="12.4" rx="2" stroke="#4A564E" strokeWidth="1.5" />
                  <path d="M7.8 4.2v-.8a1 1 0 011-1h2.4a1 1 0 011 1v.8" stroke="#4A564E" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M7.4 8.8h5.2M7.4 11.4h5.2M7.4 14h3" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
              <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Orders</span>
            </span>
            <span style={{ font: "700 23px/1.2 Inter,system-ui,sans-serif", color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>38,204</span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
              ▲ 9.2%
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
              <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Average order value</span>
            </span>
            <span style={{ font: "700 23px/1.2 Inter,system-ui,sans-serif", color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>$29.40</span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
              ▲ $1.20
            </span>
          </div>
          <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "15px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "26px", height: "26px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <path d="M4 10a6 6 0 1 1 2 4.5" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M4 6.4V10h3.6" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Repeat purchase rate</span>
            </span>
            <span style={{ font: "700 23px/1.2 Inter,system-ui,sans-serif", color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>68.4%</span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
              ▲ 2.1%
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
              <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Cancellation rate</span>
            </span>
            <span style={{ font: "700 23px/1.2 Inter,system-ui,sans-serif", color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>2.8%</span>
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
              ▼ 0.4%
            </span>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
          <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "18px", display: "flex", flexDirection: "column", gap: "14px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ font: "600 13.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Revenue over time
              </span>
              <span style={{ marginLeft: "auto" }}>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                  ▲ 11.4%
                </span>
              </span>
            </span>
            <svg viewBox="0 0 320 110" preserveAspectRatio="none" style={{ width: "100%", height: "110px", display: "block" }}>
              <polyline points="4,92 30,84 56,88 82,70 108,74 134,58 160,62 186,44 212,50 238,34 264,38 290,22 316,14" fill="none" stroke="#0B3D1F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>22 Aug</span>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>5 Sep</span>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>21 Sep</span>
            </span>
          </div>
          <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "18px", display: "flex", flexDirection: "column", gap: "14px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ font: "600 13.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Customer growth
              </span>
              <span style={{ marginLeft: "auto" }}>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                  ▲ 6.2%
                </span>
              </span>
            </span>
            <svg viewBox="0 0 320 110" preserveAspectRatio="none" style={{ width: "100%", height: "110px", display: "block" }}>
              <polyline points="4,96 30,92 56,86 82,82 108,74 134,72 160,64 186,58 212,54 238,44 264,40 290,30 316,20" fill="none" stroke="#1F5C8B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>22 Aug</span>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>5 Sep</span>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>21 Sep</span>
            </span>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "18px", alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <span style={{ font: "600 13.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              Top products
            </span>
            <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", overflow: "hidden", flex: "none" }}>
              {" "}
              <div style={{ display: "grid", gridTemplateColumns: "2fr .7fr .9fr", gap: "14px", padding: "11px 16px", background: "#F6F7F4", borderBottom: "1px solid #E4E7E2" }}>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Product
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Units
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Revenue
                </span>
              </div>
              {" "}
              <div className="hv3" style={{ display: "grid", gridTemplateColumns: "2fr .7fr .9fr", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "30px", height: "30px", borderRadius: "7px", overflow: "hidden", background: "#F6F7F4", border: "1px solid #E4E7E2", flex: "none", display: "block", position: "relative" }}>
                    <img src={imgFullCreamMilk} alt="" loading="lazy" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
                  </span>
                  <span style={{ font: "500 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Full Cream Milk 2L
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>8,412</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    $37,854
                  </span>
                </span>
              </div>
              {" "}
              <div className="hv3" style={{ display: "grid", gridTemplateColumns: "2fr .7fr .9fr", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "30px", height: "30px", borderRadius: "7px", overflow: "hidden", background: "#F6F7F4", border: "1px solid #E4E7E2", flex: "none", display: "block", position: "relative" }}>
                    <img src={imgBasmatiRice} alt="" loading="lazy" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
                  </span>
                  <span style={{ font: "500 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Basmati Rice 5kg
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>1,842</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    $45,129
                  </span>
                </span>
              </div>
              {" "}
              <div className="hv3" style={{ display: "grid", gridTemplateColumns: "2fr .7fr .9fr", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "30px", height: "30px", borderRadius: "7px", overflow: "hidden", background: "#F6F7F4", border: "1px solid #E4E7E2", flex: "none", display: "block", position: "relative" }}>
                    <img src={imgAlphonsoMangoes} alt="" loading="lazy" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
                  </span>
                  <span style={{ font: "500 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Alphonso Mangoes 1kg
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>2,204</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    $28,630
                  </span>
                </span>
              </div>
              {" "}
              <div className="hv3" style={{ display: "grid", gridTemplateColumns: "2fr .7fr .9fr", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "30px", height: "30px", borderRadius: "7px", overflow: "hidden", background: "#F6F7F4", border: "1px solid #E4E7E2", flex: "none", display: "block", position: "relative" }}>
                    <img src={imgGaramMasala} alt="" loading="lazy" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
                  </span>
                  <span style={{ font: "500 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Garam Masala 100g
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>3,108</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    $13,053
                  </span>
                </span>
              </div>
              {" "}
              <div className="hv3" style={{ display: "grid", gridTemplateColumns: "2fr .7fr .9fr", gap: "14px", padding: "13px 16px", alignItems: "center" }}>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "30px", height: "30px", borderRadius: "7px", overflow: "hidden", background: "#F6F7F4", border: "1px solid #E4E7E2", flex: "none", display: "block", position: "relative" }}>
                    <img src={imgSourdoughLoaf} alt="" loading="lazy" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
                  </span>
                  <span style={{ font: "500 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Sourdough Loaf
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>1,986</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    $12,909
                  </span>
                </span>
              </div>
              {" "}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <span style={{ font: "600 13.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              Category performance
            </span>
            <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "18px", display: "flex", flexDirection: "column", gap: "13px" }}>
              <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                  <span style={{ font: "500 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Fresh Produce
                  </span>
                  <span style={{ marginLeft: "auto" }}>
                    <span style={{ font: "700 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>$284K</span>
                  </span>
                </span>
                <span style={{ height: "7px", borderRadius: "4px", background: "#EFF1ED", overflow: "hidden", display: "block" }}>
                  <span style={{ display: "block", width: "92%", height: "100%", background: "#0B3D1F", borderRadius: "4px" }} />
                </span>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                  <span style={{ font: "500 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Grains, Rice & Cereals
                  </span>
                  <span style={{ marginLeft: "auto" }}>
                    <span style={{ font: "700 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>$241K</span>
                  </span>
                </span>
                <span style={{ height: "7px", borderRadius: "4px", background: "#EFF1ED", overflow: "hidden", display: "block" }}>
                  <span style={{ display: "block", width: "78%", height: "100%", background: "#0B3D1F", borderRadius: "4px" }} />
                </span>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                  <span style={{ font: "500 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Dairy & Refrigerated
                  </span>
                  <span style={{ marginLeft: "auto" }}>
                    <span style={{ font: "700 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>$198K</span>
                  </span>
                </span>
                <span style={{ height: "7px", borderRadius: "4px", background: "#EFF1ED", overflow: "hidden", display: "block" }}>
                  <span style={{ display: "block", width: "71%", height: "100%", background: "#0B3D1F", borderRadius: "4px" }} />
                </span>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                  <span style={{ font: "500 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Spices & Masalas
                  </span>
                  <span style={{ marginLeft: "auto" }}>
                    <span style={{ font: "700 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>$132K</span>
                  </span>
                </span>
                <span style={{ height: "7px", borderRadius: "4px", background: "#EFF1ED", overflow: "hidden", display: "block" }}>
                  <span style={{ display: "block", width: "54%", height: "100%", background: "#0B3D1F", borderRadius: "4px" }} />
                </span>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                  <span style={{ font: "500 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Bakery & Bread
                  </span>
                  <span style={{ marginLeft: "auto" }}>
                    <span style={{ font: "700 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>$96K</span>
                  </span>
                </span>
                <span style={{ height: "7px", borderRadius: "4px", background: "#EFF1ED", overflow: "hidden", display: "block" }}>
                  <span style={{ display: "block", width: "41%", height: "100%", background: "#0B3D1F", borderRadius: "4px" }} />
                </span>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                  <span style={{ font: "500 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Snacks & Savouries
                  </span>
                  <span style={{ marginLeft: "auto" }}>
                    <span style={{ font: "700 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>$74K</span>
                  </span>
                </span>
                <span style={{ height: "7px", borderRadius: "4px", background: "#EFF1ED", overflow: "hidden", display: "block" }}>
                  <span style={{ display: "block", width: "33%", height: "100%", background: "#0B3D1F", borderRadius: "4px" }} />
                </span>
              </span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <span style={{ font: "600 13.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              Delivery performance
            </span>
            <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "18px", display: "flex", flexDirection: "column", gap: "14px" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "10px", paddingBottom: "9px", borderBottom: "1px solid #EFF1ED" }}>
                <span style={{ display: "flex", flexDirection: "column", gap: "3px", minWidth: "0" }}>
                  <span style={{ font: "500 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Average delivery time
                  </span>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    ▼ 1.2 min
                  </span>
                </span>
                <span style={{ marginLeft: "auto" }}>
                  <span style={{ font: "700 14px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>24.8 min</span>
                </span>
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "10px", paddingBottom: "9px", borderBottom: "1px solid #EFF1ED" }}>
                <span style={{ display: "flex", flexDirection: "column", gap: "3px", minWidth: "0" }}>
                  <span style={{ font: "500 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    On-time rate
                  </span>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>▲ 1.8%</span>
                </span>
                <span style={{ marginLeft: "auto" }}>
                  <span style={{ font: "700 14px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>94.6%</span>
                </span>
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "10px", paddingBottom: "9px", borderBottom: "1px solid #EFF1ED" }}>
                <span style={{ display: "flex", flexDirection: "column", gap: "3px", minWidth: "0" }}>
                  <span style={{ font: "500 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Express share
                  </span>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>▲ 4.2%</span>
                </span>
                <span style={{ marginLeft: "auto" }}>
                  <span style={{ font: "700 14px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>72.4%</span>
                </span>
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "10px", paddingBottom: "9px", borderBottom: "1px solid #EFF1ED" }}>
                <span style={{ display: "flex", flexDirection: "column", gap: "3px", minWidth: "0" }}>
                  <span style={{ font: "500 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Failed deliveries
                  </span>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>▼ 0.1%</span>
                </span>
                <span style={{ marginLeft: "auto" }}>
                  <span style={{ font: "700 14px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>0.6%</span>
                </span>
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "10px", paddingBottom: "9px", borderBottom: "1px solid #EFF1ED" }}>
                <span style={{ display: "flex", flexDirection: "column", gap: "3px", minWidth: "0" }}>
                  <span style={{ font: "500 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Refund rate
                  </span>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>▼ 0.3%</span>
                </span>
                <span style={{ marginLeft: "auto" }}>
                  <span style={{ font: "700 14px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>1.4%</span>
                </span>
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "10px", paddingBottom: "9px", borderBottom: "1px solid #EFF1ED" }}>
                <span style={{ display: "flex", flexDirection: "column", gap: "3px", minWidth: "0" }}>
                  <span style={{ font: "500 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Average driver rating
                  </span>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Stable</span>
                </span>
                <span style={{ marginLeft: "auto" }}>
                  <span style={{ font: "700 14px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>4.8</span>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
