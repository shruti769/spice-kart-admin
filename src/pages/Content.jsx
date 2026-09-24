import imgAlphonsoMangoes from '../assets/images/alphonso-mangoes.jpg'
import imgBasmatiRice from '../assets/images/basmati-rice.jpg'
import imgFreshCoriander from '../assets/images/fresh-coriander.jpg'
import imgFullCreamMilk from '../assets/images/full-cream-milk.jpg'
import imgSourdoughLoaf from '../assets/images/sourdough-loaf.jpg'
import imgSpicesMasalas from '../assets/images/spices-masalas.jpg'

export default function Content({ v }) {
  return (
    <>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "18px", padding: "24px 26px 2px" }}>
        <span style={{ display: "flex", flexDirection: "column", gap: "5px", minWidth: "0" }}>
          <span style={{ font: "700 20px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Content</span>
          <span style={{ font: "400 12.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>
            Homepage banners, featured collections and announcements
          </span>
        </span>
        <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "8px", height: "34px", width: "210px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff" }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
              <circle cx="9" cy="9" r="6" stroke="#7C8A81" strokeWidth="1.6" />
              <path d="M13.4 13.4L18 18" stroke="#7C8A81" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <span style={{ font: "400 12.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              Search content…
            </span>
          </span>
          <button className="hv1" onClick={v.previewApp} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 12px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", color: "#17201A", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
            Preview app
          </button>
          <button className="hv2" onClick={v.openBannerNew} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 13px", border: "0", borderRadius: "8px", background: "#0B3D1F", color: "#fff", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
              <path d="M10 4.4v11.2M4.4 10h11.2" stroke="#8BE000" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            Create banner
          </button>
        </span>
      </div>
      <div className="ad-scroll" style={{ flex: "1", minHeight: "0", overflowY: "auto", padding: "20px 26px 30px", display: "flex", flexDirection: "column", gap: "18px" }}>
        <div className="ad-scroll" style={{ display: "flex", gap: "2px", borderBottom: "1px solid #E4E7E2", overflowX: "auto" }}>
          <button onClick={v.tb_content_0} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_content_0Fg, borderBottom: `2px solid ${v.tb_content_0Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
            Banners
          </button>
          <button onClick={v.tb_content_1} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_content_1Fg, borderBottom: `2px solid ${v.tb_content_1Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
            Featured categories
          </button>
          <button onClick={v.tb_content_2} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_content_2Fg, borderBottom: `2px solid ${v.tb_content_2Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
            Featured products
          </button>
          <button onClick={v.tb_content_3} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_content_3Fg, borderBottom: `2px solid ${v.tb_content_3Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
            Deals
          </button>
          <button onClick={v.tb_content_4} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_content_4Fg, borderBottom: `2px solid ${v.tb_content_4Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
            Seasonal collections
          </button>
          <button onClick={v.tb_content_5} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_content_5Fg, borderBottom: `2px solid ${v.tb_content_5Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
            Announcements
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "14px" }}>
          <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", overflow: "hidden", flex: "none", display: "flex", flexDirection: "column" }}>
            <span style={{ position: "relative", height: "118px", background: "#F6F7F4", display: "block" }}>
              {" "}
              <img src={imgFreshCoriander} alt="" loading="lazy" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
              {" "}
              <span style={{ position: "absolute", top: "8px", right: "8px" }}>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                  Live
                </span>
              </span>
              {" "}
            </span>
            <span style={{ padding: "12px 13px", display: "flex", flexDirection: "column", gap: "6px" }}>
              <span style={{ font: "600 13px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Fresh picks for your kitchen
              </span>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Shop now → Fresh Produce
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "8px", paddingTop: "7px", borderTop: "1px solid #EFF1ED", marginTop: "3px" }}>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>1–30 Sep</span>
                <span style={{ marginLeft: "auto", display: "flex", gap: "6px" }}>
                  <button onClick={v.openBannerNew} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                    Edit
                  </button>
                  <button onClick={v.openDelete} style={{ height: "26px", padding: "0 9px", border: "1px solid #EEDAD5", borderRadius: "6px", background: "#FDF7F5", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#A93826", cursor: "pointer", whiteSpace: "nowrap" }}>
                    Remove
                  </button>
                </span>
              </span>
            </span>
          </div>
          <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", overflow: "hidden", flex: "none", display: "flex", flexDirection: "column" }}>
            <span style={{ position: "relative", height: "118px", background: "#F6F7F4", display: "block" }}>
              {" "}
              <img src={imgBasmatiRice} alt="" loading="lazy" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
              {" "}
              <span style={{ position: "absolute", top: "8px", right: "8px" }}>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                  Live
                </span>
              </span>
              {" "}
            </span>
            <span style={{ padding: "12px 13px", display: "flex", flexDirection: "column", gap: "6px" }}>
              <span style={{ font: "600 13px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Stock up & save on staples
              </span>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Shop now → Pantry
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "8px", paddingTop: "7px", borderTop: "1px solid #EFF1ED", marginTop: "3px" }}>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  19–26 Sep
                </span>
                <span style={{ marginLeft: "auto", display: "flex", gap: "6px" }}>
                  <button onClick={v.openBannerNew} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                    Edit
                  </button>
                  <button onClick={v.openDelete} style={{ height: "26px", padding: "0 9px", border: "1px solid #EEDAD5", borderRadius: "6px", background: "#FDF7F5", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#A93826", cursor: "pointer", whiteSpace: "nowrap" }}>
                    Remove
                  </button>
                </span>
              </span>
            </span>
          </div>
          <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", overflow: "hidden", flex: "none", display: "flex", flexDirection: "column" }}>
            <span style={{ position: "relative", height: "118px", background: "#F6F7F4", display: "block" }}>
              {" "}
              <img src={imgAlphonsoMangoes} alt="" loading="lazy" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
              {" "}
              <span style={{ position: "absolute", top: "8px", right: "8px" }}>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#8A6100", background: "#FBF1DE", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                  Scheduled
                </span>
              </span>
              {" "}
            </span>
            <span style={{ padding: "12px 13px", display: "flex", flexDirection: "column", gap: "6px" }}>
              <span style={{ font: "600 13px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Spring produce sale
              </span>
              <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                See offers → Offers screen
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "8px", paddingTop: "7px", borderTop: "1px solid #EFF1ED", marginTop: "3px" }}>
                <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>1–31 Oct</span>
                <span style={{ marginLeft: "auto", display: "flex", gap: "6px" }}>
                  <button onClick={v.openBannerNew} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                    Edit
                  </button>
                  <button onClick={v.openDelete} style={{ height: "26px", padding: "0 9px", border: "1px solid #EEDAD5", borderRadius: "6px", background: "#FDF7F5", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#A93826", cursor: "pointer", whiteSpace: "nowrap" }}>
                    Remove
                  </button>
                </span>
              </span>
            </span>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px", alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <span style={{ font: "600 14px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Featured categories · app order</span>
            <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", overflow: "hidden", flex: "none" }}>
              {" "}
              <div style={{ display: "grid", gridTemplateColumns: "70px 1.8fr 1fr minmax(80px,.9fr)", gap: "14px", padding: "11px 16px", background: "#F6F7F4", borderBottom: "1px solid #E4E7E2" }}>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Position
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Category
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Products
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Status
                </span>
              </div>
              {" "}
              <div className="hv3" style={{ display: "grid", gridTemplateColumns: "70px 1.8fr 1fr minmax(80px,.9fr)", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "700 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>1</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "30px", height: "30px", borderRadius: "7px", overflow: "hidden", background: "#F6F7F4", border: "1px solid #E4E7E2", flex: "none", display: "block", position: "relative" }}>
                    <img src={imgFreshCoriander} alt="" loading="lazy" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
                  </span>
                  <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Fresh Produce
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    312 products
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                    Live
                  </span>
                </span>
              </div>
              {" "}
              <div className="hv3" style={{ display: "grid", gridTemplateColumns: "70px 1.8fr 1fr minmax(80px,.9fr)", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "700 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>2</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "30px", height: "30px", borderRadius: "7px", overflow: "hidden", background: "#F6F7F4", border: "1px solid #E4E7E2", flex: "none", display: "block", position: "relative" }}>
                    <img src={imgFullCreamMilk} alt="" loading="lazy" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
                  </span>
                  <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Dairy & Refrigerated
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    148 products
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                    Live
                  </span>
                </span>
              </div>
              {" "}
              <div className="hv3" style={{ display: "grid", gridTemplateColumns: "70px 1.8fr 1fr minmax(80px,.9fr)", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "700 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>3</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "30px", height: "30px", borderRadius: "7px", overflow: "hidden", background: "#F6F7F4", border: "1px solid #E4E7E2", flex: "none", display: "block", position: "relative" }}>
                    <img src={imgSpicesMasalas} alt="" loading="lazy" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
                  </span>
                  <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Spices & Masalas
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    204 products
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                    Live
                  </span>
                </span>
              </div>
              {" "}
              <div className="hv3" style={{ display: "grid", gridTemplateColumns: "70px 1.8fr 1fr minmax(80px,.9fr)", gap: "14px", padding: "13px 16px", alignItems: "center" }}>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "700 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>4</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "30px", height: "30px", borderRadius: "7px", overflow: "hidden", background: "#F6F7F4", border: "1px solid #E4E7E2", flex: "none", display: "block", position: "relative" }}>
                    <img src={imgSourdoughLoaf} alt="" loading="lazy" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
                  </span>
                  <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Bakery & Bread
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    74 products
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                    Live
                  </span>
                </span>
              </div>
              {" "}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <span style={{ font: "600 14px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>App announcements</span>
            <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", overflow: "hidden", flex: "none" }}>
              {" "}
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1.2fr 1fr minmax(80px,.9fr)", gap: "14px", padding: "11px 16px", background: "#F6F7F4", borderBottom: "1px solid #E4E7E2" }}>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Message
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Audience
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Period
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Status
                </span>
              </div>
              {" "}
              <div className="hv3" style={{ display: "grid", gridTemplateColumns: "2fr 1.2fr 1fr minmax(80px,.9fr)", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Public holiday delivery hours
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    All customers
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    25–27 Sep
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#8A6100", background: "#FBF1DE", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                    Scheduled
                  </span>
                </span>
              </div>
              {" "}
              <div className="hv3" style={{ display: "grid", gridTemplateColumns: "2fr 1.2fr 1fr minmax(80px,.9fr)", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    New General Foods aisle live
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    All customers
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Ongoing</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                    Live
                  </span>
                </span>
              </div>
              {" "}
              <div className="hv3" style={{ display: "grid", gridTemplateColumns: "2fr 1.2fr 1fr minmax(80px,.9fr)", gap: "14px", padding: "13px 16px", alignItems: "center" }}>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Wallet cashback now 5%
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Frequent customers
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>1–30 Sep</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                    Live
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
