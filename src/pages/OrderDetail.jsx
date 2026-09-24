import imgAlphonsoMangoes from '../assets/images/alphonso-mangoes.jpg'
import imgBasmatiRice from '../assets/images/basmati-rice.jpg'
import imgFreshCoriander from '../assets/images/fresh-coriander.jpg'
import imgFullCreamMilk from '../assets/images/full-cream-milk.jpg'
import imgGaramMasala from '../assets/images/garam-masala.jpg'
import imgOliveOil from '../assets/images/olive-oil.jpg'
import imgPaneer from '../assets/images/paneer.jpg'
import imgSourdoughLoaf from '../assets/images/sourdough-loaf.jpg'

export default function OrderDetail({ v }) {
  return (
    <>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "18px", padding: "24px 26px 2px" }}>
        <span style={{ display: "flex", flexDirection: "column", gap: "5px", minWidth: "0" }}>
          <span style={{ font: "700 20px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Order #SK10482</span>
          <span style={{ font: "400 12.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Placed today at 12:42 PM · Express delivery</span>
        </span>
        <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px" }}>
          <button className="hv1" onClick={v.openPrint} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 12px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", color: "#17201A", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
            Print invoice
          </button>
          <button className="hv1" onClick={v.openContact} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 12px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", color: "#17201A", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
            Contact customer
          </button>
          <button onClick={v.openCancel} style={{ height: "34px", padding: "0 12px", border: "1px solid #EEDAD5", borderRadius: "8px", background: "#FDF7F5", color: "#A93826", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
            Cancel order
          </button>
          <button className="hv2" onClick={v.openStatus} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 13px", border: "0", borderRadius: "8px", background: "#0B3D1F", color: "#fff", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
              <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#8BE000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Update status
          </button>
        </span>
      </div>
      <div className="ad-scroll" style={{ flex: "1", minHeight: "0", overflowY: "auto", padding: "20px 26px 30px", display: "flex", flexDirection: "column", gap: "18px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button onClick={v.nav_orders} style={{ display: "flex", alignItems: "center", gap: "6px", border: "0", background: "transparent", font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#17693A", cursor: "pointer", padding: "0", whiteSpace: "nowrap" }}>
            <svg width="13" height="13" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
              <path d="M12.4 4.4L6.8 10l5.6 5.6" stroke="#17693A" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to orders
          </button>
          <span style={{ width: "1px", height: "16px", background: "#E4E7E2" }} />
          <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#8A6100", background: "#FBF1DE", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
            Preparing
          </span>
          <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
            Paid
          </span>
          <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#1F5C8B", background: "#E8F1F8", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
            EXPRESS
          </span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "18px", alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", overflow: "hidden", flex: "none" }}>
              {" "}
              <div style={{ padding: "13px 14px", borderBottom: "1px solid #E4E7E2" }}>
                <span style={{ font: "600 13.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A" }}>Order items</span>
              </div>
              {" "}
              <div style={{ display: "grid", gridTemplateColumns: "2fr .9fr .7fr .7fr", gap: "12px", padding: "10px 14px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "9px", minWidth: "0" }}>
                  <span style={{ width: "30px", height: "30px", borderRadius: "7px", overflow: "hidden", background: "#F6F7F4", border: "1px solid #E4E7E2", flex: "none", display: "block", position: "relative" }}>
                    <img src={imgBasmatiRice} alt="" loading="lazy" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
                  </span>
                  <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Basmati Rice 5kg
                  </span>
                </span>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  2 × $8.50
                </span>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>—</span>
                <span style={{ textAlign: "right", display: "flex", justifyContent: "flex-end" }}>
                  <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>$17.00</span>
                </span>
              </div>
              {" "}
              <div style={{ display: "grid", gridTemplateColumns: "2fr .9fr .7fr .7fr", gap: "12px", padding: "10px 14px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "9px", minWidth: "0" }}>
                  <span style={{ width: "30px", height: "30px", borderRadius: "7px", overflow: "hidden", background: "#F6F7F4", border: "1px solid #E4E7E2", flex: "none", display: "block", position: "relative" }}>
                    <img src={imgPaneer} alt="" loading="lazy" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
                  </span>
                  <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Paneer 500g
                  </span>
                </span>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  1 × $7.90
                </span>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>−$1.00</span>
                <span style={{ textAlign: "right", display: "flex", justifyContent: "flex-end" }}>
                  <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>$6.90</span>
                </span>
              </div>
              {" "}
              <div style={{ display: "grid", gridTemplateColumns: "2fr .9fr .7fr .7fr", gap: "12px", padding: "10px 14px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "9px", minWidth: "0" }}>
                  <span style={{ width: "30px", height: "30px", borderRadius: "7px", overflow: "hidden", background: "#F6F7F4", border: "1px solid #E4E7E2", flex: "none", display: "block", position: "relative" }}>
                    <img src={imgFreshCoriander} alt="" loading="lazy" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
                  </span>
                  <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Fresh Coriander
                  </span>
                </span>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  1 × $2.50
                </span>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>—</span>
                <span style={{ textAlign: "right", display: "flex", justifyContent: "flex-end" }}>
                  <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>$2.50</span>
                </span>
              </div>
              {" "}
              <div style={{ display: "grid", gridTemplateColumns: "2fr .9fr .7fr .7fr", gap: "12px", padding: "10px 14px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "9px", minWidth: "0" }}>
                  <span style={{ width: "30px", height: "30px", borderRadius: "7px", overflow: "hidden", background: "#F6F7F4", border: "1px solid #E4E7E2", flex: "none", display: "block", position: "relative" }}>
                    <img src={imgGaramMasala} alt="" loading="lazy" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
                  </span>
                  <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Garam Masala 100g
                  </span>
                </span>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  2 × $4.20
                </span>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>—</span>
                <span style={{ textAlign: "right", display: "flex", justifyContent: "flex-end" }}>
                  <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>$8.40</span>
                </span>
              </div>
              {" "}
              <div style={{ display: "grid", gridTemplateColumns: "2fr .9fr .7fr .7fr", gap: "12px", padding: "10px 14px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "9px", minWidth: "0" }}>
                  <span style={{ width: "30px", height: "30px", borderRadius: "7px", overflow: "hidden", background: "#F6F7F4", border: "1px solid #E4E7E2", flex: "none", display: "block", position: "relative" }}>
                    <img src={imgFullCreamMilk} alt="" loading="lazy" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
                  </span>
                  <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Full Cream Milk 2L
                  </span>
                </span>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  3 × $4.50
                </span>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>—</span>
                <span style={{ textAlign: "right", display: "flex", justifyContent: "flex-end" }}>
                  <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>$13.50</span>
                </span>
              </div>
              {" "}
              <div style={{ display: "grid", gridTemplateColumns: "2fr .9fr .7fr .7fr", gap: "12px", padding: "10px 14px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "9px", minWidth: "0" }}>
                  <span style={{ width: "30px", height: "30px", borderRadius: "7px", overflow: "hidden", background: "#F6F7F4", border: "1px solid #E4E7E2", flex: "none", display: "block", position: "relative" }}>
                    <img src={imgAlphonsoMangoes} alt="" loading="lazy" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
                  </span>
                  <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Alphonso Mangoes
                  </span>
                </span>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  1 × $12.99
                </span>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>−$2.00</span>
                <span style={{ textAlign: "right", display: "flex", justifyContent: "flex-end" }}>
                  <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>$10.99</span>
                </span>
              </div>
              {" "}
              <div style={{ display: "grid", gridTemplateColumns: "2fr .9fr .7fr .7fr", gap: "12px", padding: "10px 14px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "9px", minWidth: "0" }}>
                  <span style={{ width: "30px", height: "30px", borderRadius: "7px", overflow: "hidden", background: "#F6F7F4", border: "1px solid #E4E7E2", flex: "none", display: "block", position: "relative" }}>
                    <img src={imgSourdoughLoaf} alt="" loading="lazy" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
                  </span>
                  <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Sourdough Loaf
                  </span>
                </span>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  1 × $6.50
                </span>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>—</span>
                <span style={{ textAlign: "right", display: "flex", justifyContent: "flex-end" }}>
                  <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>$6.50</span>
                </span>
              </div>
              {" "}
              <div style={{ display: "grid", gridTemplateColumns: "2fr .9fr .7fr .7fr", gap: "12px", padding: "10px 14px", alignItems: "center" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "9px", minWidth: "0" }}>
                  <span style={{ width: "30px", height: "30px", borderRadius: "7px", overflow: "hidden", background: "#F6F7F4", border: "1px solid #E4E7E2", flex: "none", display: "block", position: "relative" }}>
                    <img src={imgOliveOil} alt="" loading="lazy" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
                  </span>
                  <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Olive Oil 1L
                  </span>
                </span>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  1 × $18.71
                </span>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>—</span>
                <span style={{ textAlign: "right", display: "flex", justifyContent: "flex-end" }}>
                  <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>$18.71</span>
                </span>
              </div>
              {" "}
            </div>
            <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "18px", display: "flex", flexDirection: "column", gap: "14px" }}>
              <span style={{ font: "600 13.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A" }}>Delivery timeline</span>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ display: "flex", gap: "11px", alignItems: "flex-start" }}>
                  <span style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: "none", alignSelf: "stretch" }}>
                    <span style={{ width: "16px", height: "16px", borderRadius: "8px", background: "#8BE000", border: "2px solid #8BE000", display: "block" }} />
                    <span style={{ flex: "1", width: "2px", background: "#8BE000", minHeight: "20px", display: "block" }} />
                  </span>
                  <span style={{ display: "flex", flexDirection: "column", gap: "2px", paddingBottom: "14px" }}>
                    <span style={{ font: "600 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Order placed</span>
                    <span style={{ font: "400 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>12:42 PM</span>
                  </span>
                </span>
                <span style={{ display: "flex", gap: "11px", alignItems: "flex-start" }}>
                  <span style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: "none", alignSelf: "stretch" }}>
                    <span style={{ width: "16px", height: "16px", borderRadius: "8px", background: "#8BE000", border: "2px solid #8BE000", display: "block" }} />
                    <span style={{ flex: "1", width: "2px", background: "#8BE000", minHeight: "20px", display: "block" }} />
                  </span>
                  <span style={{ display: "flex", flexDirection: "column", gap: "2px", paddingBottom: "14px" }}>
                    <span style={{ font: "600 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Confirmed</span>
                    <span style={{ font: "400 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>12:43 PM</span>
                  </span>
                </span>
                <span style={{ display: "flex", gap: "11px", alignItems: "flex-start" }}>
                  <span style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: "none", alignSelf: "stretch" }}>
                    <span style={{ width: "16px", height: "16px", borderRadius: "8px", background: "#8BE000", border: "2px solid #8BE000", display: "block" }} />
                    <span style={{ flex: "1", width: "2px", background: "#8BE000", minHeight: "20px", display: "block" }} />
                  </span>
                  <span style={{ display: "flex", flexDirection: "column", gap: "2px", paddingBottom: "14px" }}>
                    <span style={{ font: "600 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Preparing</span>
                    <span style={{ font: "400 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>12:46 PM</span>
                  </span>
                </span>
                <span style={{ display: "flex", gap: "11px", alignItems: "flex-start" }}>
                  <span style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: "none", alignSelf: "stretch" }}>
                    <span style={{ width: "16px", height: "16px", borderRadius: "8px", background: "#fff", border: "2px solid #D8DDD4", display: "block" }} />
                    <span style={{ flex: "1", width: "2px", background: "#E8EBE5", minHeight: "20px", display: "block" }} />
                  </span>
                  <span style={{ display: "flex", flexDirection: "column", gap: "2px", paddingBottom: "14px" }}>
                    <span style={{ font: "600 12px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Packed</span>
                    <span style={{ font: "400 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Est. 12:54 PM</span>
                  </span>
                </span>
                <span style={{ display: "flex", gap: "11px", alignItems: "flex-start" }}>
                  <span style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: "none", alignSelf: "stretch" }}>
                    <span style={{ width: "16px", height: "16px", borderRadius: "8px", background: "#fff", border: "2px solid #D8DDD4", display: "block" }} />
                    <span style={{ flex: "1", width: "2px", background: "#E8EBE5", minHeight: "20px", display: "block" }} />
                  </span>
                  <span style={{ display: "flex", flexDirection: "column", gap: "2px", paddingBottom: "14px" }}>
                    <span style={{ font: "600 12px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Out for delivery</span>
                    <span style={{ font: "400 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Est. 12:58 PM</span>
                  </span>
                </span>
                <span style={{ display: "flex", gap: "11px", alignItems: "flex-start" }}>
                  <span style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: "none", alignSelf: "stretch" }}>
                    <span style={{ width: "16px", height: "16px", borderRadius: "8px", background: "#fff", border: "2px solid #D8DDD4", display: "block" }} />
                  </span>
                  <span style={{ display: "flex", flexDirection: "column", gap: "2px", paddingBottom: "0" }}>
                    <span style={{ font: "600 12px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Delivered</span>
                    <span style={{ font: "400 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Est. 1:12 PM</span>
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "15px", display: "flex", flexDirection: "column", gap: "10px" }}>
              <span style={{ font: "600 13.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A" }}>Order summary</span>
              <span style={{ display: "flex", justifyContent: "space-between", gap: "14px", whiteSpace: "nowrap" }}>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Subtotal</span>
                <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>$84.50</span>
              </span>
              <span style={{ display: "flex", justifyContent: "space-between", gap: "14px", whiteSpace: "nowrap" }}>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Discount</span>
                <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>−$3.00</span>
              </span>
              <span style={{ display: "flex", justifyContent: "space-between", gap: "14px", whiteSpace: "nowrap" }}>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Delivery fee
                </span>
                <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>$3.99</span>
              </span>
              <span style={{ display: "flex", justifyContent: "space-between", gap: "14px", whiteSpace: "nowrap" }}>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  GST (10%)
                </span>
                <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>$8.55</span>
              </span>
              <span style={{ height: "1px", background: "#EFF1ED", display: "block" }} />
              <span style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "14px" }}>
                <span style={{ font: "700 13px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Total</span>
                <span style={{ font: "700 18px/1.2 Inter,system-ui,sans-serif", color: "#17201A" }}>$94.04</span>
              </span>
            </div>
            <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "18px", display: "flex", flexDirection: "column", gap: "13px" }}>
              <span style={{ font: "600 13.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A" }}>Customer</span>
              <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ width: "28px", height: "28px", borderRadius: "7px", background: "#0B3D1F", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#8BE000", flex: "none" }}>
                  JS
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "3px", minWidth: "0" }}>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    John Smith
                  </span>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Customer since Mar 2026 · 24 orders
                  </span>
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
              <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <rect x="2.8" y="4.6" width="14.4" height="10.8" rx="2" stroke="#7C8A81" strokeWidth="1.5" />
                  <path d="M3.4 6l6.6 4.6L16.6 6" stroke="#7C8A81" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  john.smith@outlook.com.au
                </span>
              </span>
              <span style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <path d="M10 17.5s5.4-4.7 5.4-8.6A5.4 5.4 0 004.6 8.9c0 3.9 5.4 8.6 5.4 8.6z" stroke="#7C8A81" strokeWidth="1.5" />
                  <circle cx="10" cy="8.6" r="1.9" stroke="#7C8A81" strokeWidth="1.5" />
                </svg>
                <span style={{ font: "400 11px/1.5 Inter,system-ui,sans-serif", color: "#7C8A81" }}>12/240 Collins Street, Melbourne VIC 3000</span>
              </span>
              <button onClick={v.nav_custdetail} style={{ height: "32px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer" }}>
                View customer profile
              </button>
            </div>
            <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "18px", display: "flex", flexDirection: "column", gap: "13px" }}>
              <span style={{ font: "600 13.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A" }}>Delivery</span>
              <span style={{ display: "flex", justifyContent: "space-between", gap: "14px", whiteSpace: "nowrap" }}>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Type</span>
                <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Express delivery
                </span>
              </span>
              <span style={{ display: "flex", justifyContent: "space-between", gap: "14px", whiteSpace: "nowrap" }}>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Driver</span>
                <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Michael Ryan
                </span>
              </span>
              <span style={{ display: "flex", justifyContent: "space-between", gap: "14px", whiteSpace: "nowrap" }}>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>ETA</span>
                <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  25–35 min
                </span>
              </span>
              <span style={{ display: "flex", justifyContent: "space-between", gap: "14px", whiteSpace: "nowrap" }}>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Zone</span>
                <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Melbourne CBD
                </span>
              </span>
              <button onClick={v.nav_del} style={{ height: "32px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer" }}>
                Track on map
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
