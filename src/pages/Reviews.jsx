import imgAlphonsoMangoes from '../assets/images/alphonso-mangoes.jpg'
import imgBasmatiRice from '../assets/images/basmati-rice.jpg'
import imgFullCreamMilk from '../assets/images/full-cream-milk.jpg'
import imgGaramMasala from '../assets/images/garam-masala.jpg'
import imgPaneer from '../assets/images/paneer.jpg'
import imgSourdoughLoaf from '../assets/images/sourdough-loaf.jpg'

export default function Reviews({ v }) {
  return (
    <>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "18px", padding: "24px 26px 2px" }}>
        <span style={{ display: "flex", flexDirection: "column", gap: "5px", minWidth: "0" }}>
          <span style={{ font: "700 20px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Reviews & ratings</span>
          <span style={{ font: "400 12.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>4.7 average across 18,402 reviews</span>
        </span>
        <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "8px", height: "34px", width: "230px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff" }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
              <circle cx="9" cy="9" r="6" stroke="#7C8A81" strokeWidth="1.6" />
              <path d="M13.4 13.4L18 18" stroke="#7C8A81" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <span style={{ font: "400 12.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              Search reviews, products…
            </span>
          </span>
          <button className="hv1" onClick={v.openFilterDrawer} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 12px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", color: "#17201A", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
              <path d="M3 5.4h14M5.6 10h8.8M8.4 14.6h3.2" stroke="#4A564E" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            Filter
          </button>
          <button className="hv1" onClick={v.toast_export} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 12px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", color: "#17201A", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
              <path d="M10 3.6v9M6.4 9.2L10 12.8l3.6-3.6M3.6 16.4h12.8" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Export
          </button>
        </span>
      </div>
      <div className="ad-scroll" style={{ flex: "1", minHeight: "0", overflowY: "auto", padding: "20px 26px 30px", display: "flex", flexDirection: "column", gap: "18px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2.4fr", gap: "18px", alignItems: "start" }}>
          <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "18px", display: "flex", flexDirection: "column", gap: "14px" }}>
            <span style={{ font: "600 13.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A" }}>Rating overview</span>
            <span style={{ display: "flex", alignItems: "flex-end", gap: "9px" }}>
              <span style={{ font: "700 34px/1 Inter,system-ui", color: "#17201A", letterSpacing: "-1px" }}>4.7</span>
              <span style={{ display: "flex", flexDirection: "column", gap: "4px", paddingBottom: "3px" }}>
                <span style={{ display: "flex", gap: "2px" }}>
                  <svg width="13" height="13" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <path d="M10 3.2l2.1 4.3 4.7.7-3.4 3.3.8 4.7L10 14l-4.2 2.2.8-4.7L3.2 8.2l4.7-.7L10 3.2z" stroke="#C89A28" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                  <svg width="13" height="13" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <path d="M10 3.2l2.1 4.3 4.7.7-3.4 3.3.8 4.7L10 14l-4.2 2.2.8-4.7L3.2 8.2l4.7-.7L10 3.2z" stroke="#C89A28" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                  <svg width="13" height="13" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <path d="M10 3.2l2.1 4.3 4.7.7-3.4 3.3.8 4.7L10 14l-4.2 2.2.8-4.7L3.2 8.2l4.7-.7L10 3.2z" stroke="#C89A28" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                  <svg width="13" height="13" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <path d="M10 3.2l2.1 4.3 4.7.7-3.4 3.3.8 4.7L10 14l-4.2 2.2.8-4.7L3.2 8.2l4.7-.7L10 3.2z" stroke="#C89A28" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                  <svg width="13" height="13" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <path d="M10 3.2l2.1 4.3 4.7.7-3.4 3.3.8 4.7L10 14l-4.2 2.2.8-4.7L3.2 8.2l4.7-.7L10 3.2z" stroke="#D8DDD4" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                </span>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  18,402 reviews
                </span>
              </span>
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "9px" }}>
              <span style={{ font: "500 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", width: "10px", flex: "none" }}>5</span>
              <svg width="11" height="11" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                <path d="M10 3.2l2.1 4.3 4.7.7-3.4 3.3.8 4.7L10 14l-4.2 2.2.8-4.7L3.2 8.2l4.7-.7L10 3.2z" stroke="#C89A28" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
              <span style={{ flex: "1", height: "7px", borderRadius: "4px", background: "#EFF1ED", overflow: "hidden", display: "block" }}>
                <span style={{ display: "block", width: "68%", height: "100%", background: "#8BE000", borderRadius: "4px" }} />
              </span>
              <span style={{ font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", width: "26px", textAlign: "right", flex: "none" }}>68%</span>
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "9px" }}>
              <span style={{ font: "500 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", width: "10px", flex: "none" }}>4</span>
              <svg width="11" height="11" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                <path d="M10 3.2l2.1 4.3 4.7.7-3.4 3.3.8 4.7L10 14l-4.2 2.2.8-4.7L3.2 8.2l4.7-.7L10 3.2z" stroke="#C89A28" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
              <span style={{ flex: "1", height: "7px", borderRadius: "4px", background: "#EFF1ED", overflow: "hidden", display: "block" }}>
                <span style={{ display: "block", width: "19%", height: "100%", background: "#8BE000", borderRadius: "4px" }} />
              </span>
              <span style={{ font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", width: "26px", textAlign: "right", flex: "none" }}>19%</span>
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "9px" }}>
              <span style={{ font: "500 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", width: "10px", flex: "none" }}>3</span>
              <svg width="11" height="11" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                <path d="M10 3.2l2.1 4.3 4.7.7-3.4 3.3.8 4.7L10 14l-4.2 2.2.8-4.7L3.2 8.2l4.7-.7L10 3.2z" stroke="#C89A28" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
              <span style={{ flex: "1", height: "7px", borderRadius: "4px", background: "#EFF1ED", overflow: "hidden", display: "block" }}>
                <span style={{ display: "block", width: "7%", height: "100%", background: "#E8C868", borderRadius: "4px" }} />
              </span>
              <span style={{ font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", width: "26px", textAlign: "right", flex: "none" }}>7%</span>
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "9px" }}>
              <span style={{ font: "500 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", width: "10px", flex: "none" }}>2</span>
              <svg width="11" height="11" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                <path d="M10 3.2l2.1 4.3 4.7.7-3.4 3.3.8 4.7L10 14l-4.2 2.2.8-4.7L3.2 8.2l4.7-.7L10 3.2z" stroke="#C89A28" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
              <span style={{ flex: "1", height: "7px", borderRadius: "4px", background: "#EFF1ED", overflow: "hidden", display: "block" }}>
                <span style={{ display: "block", width: "3%", height: "100%", background: "#D9A296", borderRadius: "4px" }} />
              </span>
              <span style={{ font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", width: "26px", textAlign: "right", flex: "none" }}>3%</span>
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "9px" }}>
              <span style={{ font: "500 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", width: "10px", flex: "none" }}>1</span>
              <svg width="11" height="11" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                <path d="M10 3.2l2.1 4.3 4.7.7-3.4 3.3.8 4.7L10 14l-4.2 2.2.8-4.7L3.2 8.2l4.7-.7L10 3.2z" stroke="#C89A28" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
              <span style={{ flex: "1", height: "7px", borderRadius: "4px", background: "#EFF1ED", overflow: "hidden", display: "block" }}>
                <span style={{ display: "block", width: "3%", height: "100%", background: "#D9A296", borderRadius: "4px" }} />
              </span>
              <span style={{ font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", width: "26px", textAlign: "right", flex: "none" }}>3%</span>
            </span>
            <span style={{ height: "1px", background: "#EFF1ED", display: "block" }} />
            <span style={{ display: "flex", justifyContent: "space-between", gap: "12px", whiteSpace: "nowrap" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Pending moderation
              </span>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#8A6100", background: "#FBF1DE", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                14
              </span>
            </span>
            <span style={{ display: "flex", justifyContent: "space-between", gap: "12px", whiteSpace: "nowrap" }}>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Hidden</span>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#A93826", background: "#FAEDEA", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                6
              </span>
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div className="ad-scroll" style={{ display: "flex", gap: "2px", borderBottom: "1px solid #E4E7E2", overflowX: "auto" }}>
              <button onClick={v.tb_rev_0} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_rev_0Fg, borderBottom: `2px solid ${v.tb_rev_0Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
                All reviews
              </button>
              <button onClick={v.tb_rev_1} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_rev_1Fg, borderBottom: `2px solid ${v.tb_rev_1Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
                Pending Review
              </button>
              <button onClick={v.tb_rev_2} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_rev_2Fg, borderBottom: `2px solid ${v.tb_rev_2Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
                Published
              </button>
              <button onClick={v.tb_rev_3} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_rev_3Fg, borderBottom: `2px solid ${v.tb_rev_3Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
                Hidden
              </button>
              <button onClick={v.tb_rev_4} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_rev_4Fg, borderBottom: `2px solid ${v.tb_rev_4Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
                Replied
              </button>
            </div>
            <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", overflow: "hidden", flex: "none" }}>
              {" "}
              <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1.4fr .6fr 2.2fr .8fr minmax(110px,1.1fr) 140px", gap: "14px", padding: "11px 16px", background: "#F6F7F4", borderBottom: "1px solid #E4E7E2" }}>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Customer
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Product
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Rating
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Review
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Date
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Status
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Actions
                </span>
              </div>
              {" "}
              <div className="hv3" style={{ display: "grid", gridTemplateColumns: "1.1fr 1.4fr .6fr 2.2fr .8fr minmax(110px,1.1fr) 140px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "28px", height: "28px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", flex: "none" }}>
                    MC
                  </span>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Mei Chen
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "30px", height: "30px", borderRadius: "7px", overflow: "hidden", background: "#F6F7F4", border: "1px solid #E4E7E2", flex: "none", display: "block", position: "relative" }}>
                    <img src={imgBasmatiRice} alt="" loading="lazy" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
                  </span>
                  <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Basmati Rice 5kg
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <svg width="13" height="13" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                      <path d="M10 3.2l2.1 4.3 4.7.7-3.4 3.3.8 4.7L10 14l-4.2 2.2.8-4.7L3.2 8.2l4.7-.7L10 3.2z" stroke="#C89A28" strokeWidth="1.5" strokeLinejoin="round" />
                    </svg>
                    <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>5</span>
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11.5px/1.5 Inter,system-ui,sans-serif", color: "#4A564E", overflow: "hidden", display: "block" }}>
                    Great quality — fluffy every single time. Delivery was quick too.
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Today</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                    Published
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ marginLeft: "auto", display: "flex", gap: "6px" }}>
                    <button onClick={v.openReply} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                      Reply
                    </button>
                    <button onClick={v.openHideReview} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                      Hide
                    </button>
                  </span>
                </span>
              </div>
              {" "}
              <div className="hv3" style={{ display: "grid", gridTemplateColumns: "1.1fr 1.4fr .6fr 2.2fr .8fr minmax(110px,1.1fr) 140px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "28px", height: "28px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", flex: "none" }}>
                    JS
                  </span>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    John Smith
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "30px", height: "30px", borderRadius: "7px", overflow: "hidden", background: "#F6F7F4", border: "1px solid #E4E7E2", flex: "none", display: "block", position: "relative" }}>
                    <img src={imgPaneer} alt="" loading="lazy" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
                  </span>
                  <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Paneer 500g
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <svg width="13" height="13" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                      <path d="M10 3.2l2.1 4.3 4.7.7-3.4 3.3.8 4.7L10 14l-4.2 2.2.8-4.7L3.2 8.2l4.7-.7L10 3.2z" stroke="#C89A28" strokeWidth="1.5" strokeLinejoin="round" />
                    </svg>
                    <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>4</span>
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11.5px/1.5 Inter,system-ui,sans-serif", color: "#4A564E", overflow: "hidden", display: "block" }}>
                    Fresh but the packaging could be sturdier for delivery.
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Today</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                    Published
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ marginLeft: "auto", display: "flex", gap: "6px" }}>
                    <button onClick={v.openReply} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                      Reply
                    </button>
                    <button onClick={v.openHideReview} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                      Hide
                    </button>
                  </span>
                </span>
              </div>
              {" "}
              <div className="hv3" style={{ display: "grid", gridTemplateColumns: "1.1fr 1.4fr .6fr 2.2fr .8fr minmax(110px,1.1fr) 140px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "28px", height: "28px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", flex: "none" }}>
                    DC
                  </span>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Daniel Cruz
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "30px", height: "30px", borderRadius: "7px", overflow: "hidden", background: "#F6F7F4", border: "1px solid #E4E7E2", flex: "none", display: "block", position: "relative" }}>
                    <img src={imgSourdoughLoaf} alt="" loading="lazy" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
                  </span>
                  <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Sourdough Loaf
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <svg width="13" height="13" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                      <path d="M10 3.2l2.1 4.3 4.7.7-3.4 3.3.8 4.7L10 14l-4.2 2.2.8-4.7L3.2 8.2l4.7-.7L10 3.2z" stroke="#C89A28" strokeWidth="1.5" strokeLinejoin="round" />
                    </svg>
                    <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>2</span>
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11.5px/1.5 Inter,system-ui,sans-serif", color: "#4A564E", overflow: "hidden", display: "block" }}>
                    Arrived squashed at the bottom of the bag. Disappointing.
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Yesterday
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#8A6100", background: "#FBF1DE", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                    Pending Review
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ marginLeft: "auto", display: "flex", gap: "6px" }}>
                    <button onClick={v.openReply} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                      Reply
                    </button>
                    <button onClick={v.openHideReview} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                      Hide
                    </button>
                  </span>
                </span>
              </div>
              {" "}
              <div className="hv3" style={{ display: "grid", gridTemplateColumns: "1.1fr 1.4fr .6fr 2.2fr .8fr minmax(110px,1.1fr) 140px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "28px", height: "28px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", flex: "none" }}>
                    PN
                  </span>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Priya Nair
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "30px", height: "30px", borderRadius: "7px", overflow: "hidden", background: "#F6F7F4", border: "1px solid #E4E7E2", flex: "none", display: "block", position: "relative" }}>
                    <img src={imgGaramMasala} alt="" loading="lazy" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
                  </span>
                  <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Garam Masala 100g
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <svg width="13" height="13" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                      <path d="M10 3.2l2.1 4.3 4.7.7-3.4 3.3.8 4.7L10 14l-4.2 2.2.8-4.7L3.2 8.2l4.7-.7L10 3.2z" stroke="#C89A28" strokeWidth="1.5" strokeLinejoin="round" />
                    </svg>
                    <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>5</span>
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11.5px/1.5 Inter,system-ui,sans-serif", color: "#4A564E", overflow: "hidden", display: "block" }}>
                    Best masala I’ve bought in Melbourne. Very aromatic.
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Yesterday
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                    Published
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ marginLeft: "auto", display: "flex", gap: "6px" }}>
                    <button onClick={v.openReply} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                      Reply
                    </button>
                    <button onClick={v.openHideReview} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                      Hide
                    </button>
                  </span>
                </span>
              </div>
              {" "}
              <div className="hv3" style={{ display: "grid", gridTemplateColumns: "1.1fr 1.4fr .6fr 2.2fr .8fr minmax(110px,1.1fr) 140px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "28px", height: "28px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", flex: "none" }}>
                    AT
                  </span>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Ava Thompson
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "30px", height: "30px", borderRadius: "7px", overflow: "hidden", background: "#F6F7F4", border: "1px solid #E4E7E2", flex: "none", display: "block", position: "relative" }}>
                    <img src={imgAlphonsoMangoes} alt="" loading="lazy" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
                  </span>
                  <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Alphonso Mangoes 1kg
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <svg width="13" height="13" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                      <path d="M10 3.2l2.1 4.3 4.7.7-3.4 3.3.8 4.7L10 14l-4.2 2.2.8-4.7L3.2 8.2l4.7-.7L10 3.2z" stroke="#C89A28" strokeWidth="1.5" strokeLinejoin="round" />
                    </svg>
                    <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>3</span>
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11.5px/1.5 Inter,system-ui,sans-serif", color: "#4A564E", overflow: "hidden", display: "block" }}>
                    Tasty but two were overripe on arrival.
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    2 days ago
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#8A6100", background: "#FBF1DE", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                    Pending Review
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ marginLeft: "auto", display: "flex", gap: "6px" }}>
                    <button onClick={v.openReply} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                      Reply
                    </button>
                    <button onClick={v.openHideReview} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                      Hide
                    </button>
                  </span>
                </span>
              </div>
              {" "}
              <div className="hv3" style={{ display: "grid", gridTemplateColumns: "1.1fr 1.4fr .6fr 2.2fr .8fr minmax(110px,1.1fr) 140px", gap: "14px", padding: "13px 16px", alignItems: "center" }}>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "28px", height: "28px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center", font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", flex: "none" }}>
                    RS
                  </span>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Rohit Sharma
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "30px", height: "30px", borderRadius: "7px", overflow: "hidden", background: "#F6F7F4", border: "1px solid #E4E7E2", flex: "none", display: "block", position: "relative" }}>
                    <img src={imgFullCreamMilk} alt="" loading="lazy" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
                  </span>
                  <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Full Cream Milk 2L
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <svg width="13" height="13" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                      <path d="M10 3.2l2.1 4.3 4.7.7-3.4 3.3.8 4.7L10 14l-4.2 2.2.8-4.7L3.2 8.2l4.7-.7L10 3.2z" stroke="#C89A28" strokeWidth="1.5" strokeLinejoin="round" />
                    </svg>
                    <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>1</span>
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11.5px/1.5 Inter,system-ui,sans-serif", color: "#4A564E", overflow: "hidden", display: "block" }}>
                    Left in the sun, milk was warm. Had to request a refund.
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    2 days ago
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#A93826", background: "#FAEDEA", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                    Hidden
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ marginLeft: "auto", display: "flex", gap: "6px" }}>
                    <button onClick={v.openReply} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                      Reply
                    </button>
                    <button onClick={v.openHideReview} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                      Hide
                    </button>
                  </span>
                </span>
              </div>
              {" "}
              <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderTop: "1px solid #E4E7E2", background: "#fff" }}>
                <span style={{ font: "400 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Showing 6 of 18,402 reviews</span>
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
        </div>
      </div>
    </>
  )
}
