import imgAlphonsoMangoes from '../assets/images/alphonso-mangoes.jpg'
import imgBasmatiRice from '../assets/images/basmati-rice.jpg'
import imgCondimentsPickles from '../assets/images/condiments-pickles.jpg'
import imgFlours from '../assets/images/flours.jpg'
import imgFreshCoriander from '../assets/images/fresh-coriander.jpg'
import imgFullCreamMilk from '../assets/images/full-cream-milk.jpg'
import imgGaramMasala from '../assets/images/garam-masala.jpg'
import imgInstantReadyToEat from '../assets/images/instant-ready-to-eat.jpg'
import imgOliveOil from '../assets/images/olive-oil.jpg'
import imgPaneer from '../assets/images/paneer.jpg'
import imgPulsesLentils from '../assets/images/pulses-lentils.jpg'
import imgSnacksSavouries from '../assets/images/snacks-savouries.jpg'
import imgSourdoughLoaf from '../assets/images/sourdough-loaf.jpg'
import imgSpicesMasalas from '../assets/images/spices-masalas.jpg'
import imgSweetenersBaking from '../assets/images/sweeteners-baking.jpg'
import imgTeaBeverages from '../assets/images/tea-beverages.jpg'
import imgTurmericPowder from '../assets/images/turmeric-powder.jpg'

export default function Catalogue({ v }) {
  return (
    <>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "18px", padding: "24px 26px 2px" }}>
        <span style={{ display: "flex", flexDirection: "column", gap: "5px", minWidth: "0" }}>
          <span style={{ font: "700 20px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Catalogue</span>
          <span style={{ font: "400 12.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>
            2,418 products across 17 categories · 42 need restocking
          </span>
        </span>
        <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "8px", height: "34px", width: "230px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff" }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
              <circle cx="9" cy="9" r="6" stroke="#7C8A81" strokeWidth="1.6" />
              <path d="M13.4 13.4L18 18" stroke="#7C8A81" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <span style={{ font: "400 12.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {v.catSearch}
            </span>
          </span>
          <button onClick={v.toast_export} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 12px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", color: "#17201A", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
              <path d="M10 3.6v9M6.4 9.2L10 12.8l3.6-3.6M3.6 16.4h12.8" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Export
          </button>
          {v.isProducts && (
            <>
              <button onClick={v.nav_addproduct} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 13px", border: "0", borderRadius: "8px", background: "#0B3D1F", color: "#fff", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
                <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <path d="M10 4.4v11.2M4.4 10h11.2" stroke="#8BE000" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                Add product
              </button>
            </>
          )}
          {v.isCats && (
            <>
              <button onClick={v.openCatEdit} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 13px", border: "0", borderRadius: "8px", background: "#0B3D1F", color: "#fff", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
                <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <path d="M10 4.4v11.2M4.4 10h11.2" stroke="#8BE000" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                Add category
              </button>
            </>
          )}
          {v.isInv && (
            <>
              <button onClick={v.openStockAdj} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 13px", border: "0", borderRadius: "8px", background: "#0B3D1F", color: "#fff", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
                <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                  <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#8BE000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Bulk update
              </button>
            </>
          )}
        </span>
      </div>
      <div className="ad-scroll" style={{ flex: "1", minHeight: "0", overflowY: "auto", padding: "20px 26px 30px", display: "flex", flexDirection: "column", gap: "18px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "2px", borderBottom: "1px solid #E4E7E2" }}>
          <button onClick={v.ct_products} style={{ display: "flex", alignItems: "center", gap: "8px", border: "0", background: "transparent", padding: "0 14px 11px", font: "600 13px/1.2 Inter,system-ui,sans-serif", color: v.ct_productsFg, borderBottom: `2px solid ${v.ct_productsBd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
            {" Products"}
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: v.ct_productsFg, background: v.ct_productsBg, padding: "4px 7px", borderRadius: "5px", whiteSpace: "nowrap" }}>
              2,418
            </span>
          </button>
          <button onClick={v.ct_cats} style={{ display: "flex", alignItems: "center", gap: "8px", border: "0", background: "transparent", padding: "0 14px 11px", font: "600 13px/1.2 Inter,system-ui,sans-serif", color: v.ct_catsFg, borderBottom: `2px solid ${v.ct_catsBd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
            {" Categories"}
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: v.ct_catsFg, background: v.ct_catsBg, padding: "4px 7px", borderRadius: "5px", whiteSpace: "nowrap" }}>
              17
            </span>
          </button>
          <button onClick={v.ct_inv} style={{ display: "flex", alignItems: "center", gap: "8px", border: "0", background: "transparent", padding: "0 14px 11px", font: "600 13px/1.2 Inter,system-ui,sans-serif", color: v.ct_invFg, borderBottom: `2px solid ${v.ct_invBd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
            {" Inventory"}
            <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: v.ct_invFg, background: v.ct_invBg, padding: "4px 7px", borderRadius: "5px", whiteSpace: "nowrap" }}>
              2,418 SKUs
            </span>
          </button>
          <span style={{ marginLeft: "auto", paddingBottom: "10px" }}>
            {" "}
            <span style={{ font: "400 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>42 items low on stock · 72 out of stock</span>
            {" "}
          </span>
        </div>
        {v.isProducts && (
          <>
            <div className="ad-scroll" style={{ display: "flex", gap: "2px", borderBottom: "1px solid #E4E7E2", overflowX: "auto" }}>
              <button onClick={v.tb_catalogue_0} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_catalogue_0Fg, borderBottom: `2px solid ${v.tb_catalogue_0Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
                All products
              </button>
              <button onClick={v.tb_catalogue_1} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_catalogue_1Fg, borderBottom: `2px solid ${v.tb_catalogue_1Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
                Active
              </button>
              <button onClick={v.tb_catalogue_2} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_catalogue_2Fg, borderBottom: `2px solid ${v.tb_catalogue_2Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
                Draft
              </button>
              <button onClick={v.tb_catalogue_3} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_catalogue_3Fg, borderBottom: `2px solid ${v.tb_catalogue_3Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
                Out of stock
              </button>
              <button onClick={v.tb_catalogue_4} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_catalogue_4Fg, borderBottom: `2px solid ${v.tb_catalogue_4Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
                Archived
              </button>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
              <button onClick={v.chp_0} style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: v.chp_0Fg, background: v.chp_0Bg, border: `1px solid ${v.chp_0Bd}`, padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap", cursor: "pointer" }}>
                Category: All
              </button>
              <button onClick={v.chp_1} style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: v.chp_1Fg, background: v.chp_1Bg, border: `1px solid ${v.chp_1Bd}`, padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap", cursor: "pointer" }}>
                Brand: All
              </button>
              <button onClick={v.chp_2} style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: v.chp_2Fg, background: v.chp_2Bg, border: `1px solid ${v.chp_2Bd}`, padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap", cursor: "pointer" }}>
                Stock: Low
              </button>
              <button onClick={v.chp_3} style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: v.chp_3Fg, background: v.chp_3Bg, border: `1px solid ${v.chp_3Bd}`, padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap", cursor: "pointer" }}>
                Dietary: any
              </button>
              <button onClick={v.chp_4} style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: v.chp_4Fg, background: v.chp_4Bg, border: `1px solid ${v.chp_4Bd}`, padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap", cursor: "pointer" }}>
                Price: any
              </button>
            </div>
            <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", overflow: "hidden", flex: "none" }}>
              {" "}
              <div style={{ display: "flex", alignItems: "center", gap: "9px", padding: "12px 16px", borderBottom: "1px solid #E4E7E2", flexWrap: "wrap" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "8px", height: "34px", width: "200px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff" }}>
                  <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <circle cx="9" cy="9" r="6" stroke="#7C8A81" strokeWidth="1.6" />
                    <path d="M13.4 13.4L18 18" stroke="#7C8A81" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                  <span style={{ font: "400 12.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Filter this list…
                  </span>
                </span>
                <button className="hv1" onClick={v.openFilterDrawer} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 12px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", color: "#17201A", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
                  Bulk edit
                </button>
                <button className="hv1" onClick={v.openCatEdit} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 12px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", color: "#17201A", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
                  Assign category
                </button>
                <span style={{ marginLeft: "auto", font: "400 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Sorted by stock · ascending</span>
              </div>
              {" "}
              <div style={{ display: "grid", gridTemplateColumns: "2.1fr 1fr 1fr .7fr .6fr minmax(96px,1fr) .9fr 120px", gap: "14px", padding: "11px 16px", background: "#F6F7F4", borderBottom: "1px solid #E4E7E2" }}>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Product
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  SKU
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Category
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Price
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Stock
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Status
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Updated
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Actions
                </span>
              </div>
              {" "}
              <div className="hv3" style={{ display: "grid", gridTemplateColumns: "2.1fr 1fr 1fr .7fr .6fr minmax(96px,1fr) .9fr 120px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "15px", height: "15px", border: "1.5px solid #E4E7E2", borderRadius: "4px", background: "#fff", display: "block", flex: "none" }} />
                  <span style={{ width: "30px", height: "30px", borderRadius: "7px", overflow: "hidden", background: "#F6F7F4", border: "1px solid #E4E7E2", flex: "none", display: "block", position: "relative" }}>
                    <img src={imgBasmatiRice} alt="" loading="lazy" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
                  </span>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Basmati Rice 5kg
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    SK-PAN-0142
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Grains, Rice & Cereals
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>$24.50</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>6</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#A93826", background: "#FAEDEA", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                    Critical
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    2 hrs ago
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ position: "relative", marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                    <button onClick={v.nav_editproduct} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                      Edit
                    </button>
                    <button onClick={v.rowMenu0} aria-label="More actions" style={{ width: "26px", height: "26px", border: `1px solid ${v.rowBd0}`, borderRadius: "6px", background: v.rowBg0, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                      <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                        <circle cx="5" cy="10" r="1.3" fill="#7C8A81" />
                        <circle cx="10" cy="10" r="1.3" fill="#7C8A81" />
                        <circle cx="15" cy="10" r="1.3" fill="#7C8A81" />
                      </svg>
                    </button>
                    {v.rowOpen0 && (
                      <>
                        <span style={{ position: "absolute", top: "31px", right: "0", zIndex: "40", display: "flex", alignItems: "center", gap: "6px", background: "#fff", border: "1px solid #E4E7E2", borderRadius: "9px", padding: "6px", boxShadow: "0 10px 26px rgba(16,24,16,.16)" }}>
                          <button className="hv4" onClick={v.openAbout} aria-label="About product" style={{ width: "30px", height: "30px", border: "1px solid #E4E7E2", borderRadius: "7px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                              <circle cx="10" cy="10" r="7.2" stroke="#17201A" strokeWidth="1.5" />
                              <path d="M10 9.2v4.4" stroke="#17201A" strokeWidth="1.6" strokeLinecap="round" />
                              <circle cx="10" cy="6.6" r=".95" fill="#17201A" />
                            </svg>
                          </button>
                          <button className="hv5" onClick={v.openDeleteProduct} aria-label="Delete product" style={{ width: "30px", height: "30px", border: "1px solid #EEDAD5", borderRadius: "7px", background: "#FDF7F5", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                              <path d="M4.6 5.6h10.8M8 5.6V4.2h4v1.4M6.2 5.6l.7 10a1 1 0 001 .9h4.2a1 1 0 001-.9l.7-10" stroke="#A93826" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>
                        </span>
                      </>
                    )}
                  </span>
                </span>
              </div>
              {" "}
              <div className="hv3" style={{ display: "grid", gridTemplateColumns: "2.1fr 1fr 1fr .7fr .6fr minmax(96px,1fr) .9fr 120px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "15px", height: "15px", border: "1.5px solid #E4E7E2", borderRadius: "4px", background: "#fff", display: "block", flex: "none" }} />
                  <span style={{ width: "30px", height: "30px", borderRadius: "7px", overflow: "hidden", background: "#F6F7F4", border: "1px solid #E4E7E2", flex: "none", display: "block", position: "relative" }}>
                    <img src={imgPaneer} alt="" loading="lazy" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
                  </span>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Paneer 500g
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    SK-DAI-0088
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Dairy & Refrigerated
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>$7.90</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>11</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#8A6100", background: "#FBF1DE", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                    Low Stock
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    4 hrs ago
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ position: "relative", marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                    <button onClick={v.nav_editproduct} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                      Edit
                    </button>
                    <button onClick={v.rowMenu1} aria-label="More actions" style={{ width: "26px", height: "26px", border: `1px solid ${v.rowBd1}`, borderRadius: "6px", background: v.rowBg1, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                      <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                        <circle cx="5" cy="10" r="1.3" fill="#7C8A81" />
                        <circle cx="10" cy="10" r="1.3" fill="#7C8A81" />
                        <circle cx="15" cy="10" r="1.3" fill="#7C8A81" />
                      </svg>
                    </button>
                    {v.rowOpen1 && (
                      <>
                        <span style={{ position: "absolute", top: "31px", right: "0", zIndex: "40", display: "flex", alignItems: "center", gap: "6px", background: "#fff", border: "1px solid #E4E7E2", borderRadius: "9px", padding: "6px", boxShadow: "0 10px 26px rgba(16,24,16,.16)" }}>
                          <button className="hv4" onClick={v.openAbout} aria-label="About product" style={{ width: "30px", height: "30px", border: "1px solid #E4E7E2", borderRadius: "7px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                              <circle cx="10" cy="10" r="7.2" stroke="#17201A" strokeWidth="1.5" />
                              <path d="M10 9.2v4.4" stroke="#17201A" strokeWidth="1.6" strokeLinecap="round" />
                              <circle cx="10" cy="6.6" r=".95" fill="#17201A" />
                            </svg>
                          </button>
                          <button className="hv5" onClick={v.openDeleteProduct} aria-label="Delete product" style={{ width: "30px", height: "30px", border: "1px solid #EEDAD5", borderRadius: "7px", background: "#FDF7F5", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                              <path d="M4.6 5.6h10.8M8 5.6V4.2h4v1.4M6.2 5.6l.7 10a1 1 0 001 .9h4.2a1 1 0 001-.9l.7-10" stroke="#A93826" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>
                        </span>
                      </>
                    )}
                  </span>
                </span>
              </div>
              {" "}
              <div className="hv3" style={{ display: "grid", gridTemplateColumns: "2.1fr 1fr 1fr .7fr .6fr minmax(96px,1fr) .9fr 120px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "15px", height: "15px", border: "1.5px solid #E4E7E2", borderRadius: "4px", background: "#fff", display: "block", flex: "none" }} />
                  <span style={{ width: "30px", height: "30px", borderRadius: "7px", overflow: "hidden", background: "#F6F7F4", border: "1px solid #E4E7E2", flex: "none", display: "block", position: "relative" }}>
                    <img src={imgAlphonsoMangoes} alt="" loading="lazy" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
                  </span>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Alphonso Mangoes 1kg
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    SK-FRU-0231
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Fresh Produce
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>$12.99</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>86</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                    In Stock
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Today</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ position: "relative", marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                    <button onClick={v.nav_editproduct} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                      Edit
                    </button>
                    <button onClick={v.rowMenu2} aria-label="More actions" style={{ width: "26px", height: "26px", border: `1px solid ${v.rowBd2}`, borderRadius: "6px", background: v.rowBg2, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                      <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                        <circle cx="5" cy="10" r="1.3" fill="#7C8A81" />
                        <circle cx="10" cy="10" r="1.3" fill="#7C8A81" />
                        <circle cx="15" cy="10" r="1.3" fill="#7C8A81" />
                      </svg>
                    </button>
                    {v.rowOpen2 && (
                      <>
                        <span style={{ position: "absolute", top: "31px", right: "0", zIndex: "40", display: "flex", alignItems: "center", gap: "6px", background: "#fff", border: "1px solid #E4E7E2", borderRadius: "9px", padding: "6px", boxShadow: "0 10px 26px rgba(16,24,16,.16)" }}>
                          <button className="hv4" onClick={v.openAbout} aria-label="About product" style={{ width: "30px", height: "30px", border: "1px solid #E4E7E2", borderRadius: "7px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                              <circle cx="10" cy="10" r="7.2" stroke="#17201A" strokeWidth="1.5" />
                              <path d="M10 9.2v4.4" stroke="#17201A" strokeWidth="1.6" strokeLinecap="round" />
                              <circle cx="10" cy="6.6" r=".95" fill="#17201A" />
                            </svg>
                          </button>
                          <button className="hv5" onClick={v.openDeleteProduct} aria-label="Delete product" style={{ width: "30px", height: "30px", border: "1px solid #EEDAD5", borderRadius: "7px", background: "#FDF7F5", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                              <path d="M4.6 5.6h10.8M8 5.6V4.2h4v1.4M6.2 5.6l.7 10a1 1 0 001 .9h4.2a1 1 0 001-.9l.7-10" stroke="#A93826" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>
                        </span>
                      </>
                    )}
                  </span>
                </span>
              </div>
              {" "}
              <div className="hv3" style={{ display: "grid", gridTemplateColumns: "2.1fr 1fr 1fr .7fr .6fr minmax(96px,1fr) .9fr 120px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "15px", height: "15px", border: "1.5px solid #E4E7E2", borderRadius: "4px", background: "#fff", display: "block", flex: "none" }} />
                  <span style={{ width: "30px", height: "30px", borderRadius: "7px", overflow: "hidden", background: "#F6F7F4", border: "1px solid #E4E7E2", flex: "none", display: "block", position: "relative" }}>
                    <img src={imgGaramMasala} alt="" loading="lazy" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
                  </span>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Garam Masala 100g
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    SK-SPI-0017
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Spices & Masalas
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>$4.20</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>24</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#8A6100", background: "#FBF1DE", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                    Low Stock
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Yesterday
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ position: "relative", marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                    <button onClick={v.nav_editproduct} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                      Edit
                    </button>
                    <button onClick={v.rowMenu3} aria-label="More actions" style={{ width: "26px", height: "26px", border: `1px solid ${v.rowBd3}`, borderRadius: "6px", background: v.rowBg3, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                      <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                        <circle cx="5" cy="10" r="1.3" fill="#7C8A81" />
                        <circle cx="10" cy="10" r="1.3" fill="#7C8A81" />
                        <circle cx="15" cy="10" r="1.3" fill="#7C8A81" />
                      </svg>
                    </button>
                    {v.rowOpen3 && (
                      <>
                        <span style={{ position: "absolute", top: "31px", right: "0", zIndex: "40", display: "flex", alignItems: "center", gap: "6px", background: "#fff", border: "1px solid #E4E7E2", borderRadius: "9px", padding: "6px", boxShadow: "0 10px 26px rgba(16,24,16,.16)" }}>
                          <button className="hv4" onClick={v.openAbout} aria-label="About product" style={{ width: "30px", height: "30px", border: "1px solid #E4E7E2", borderRadius: "7px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                              <circle cx="10" cy="10" r="7.2" stroke="#17201A" strokeWidth="1.5" />
                              <path d="M10 9.2v4.4" stroke="#17201A" strokeWidth="1.6" strokeLinecap="round" />
                              <circle cx="10" cy="6.6" r=".95" fill="#17201A" />
                            </svg>
                          </button>
                          <button className="hv5" onClick={v.openDeleteProduct} aria-label="Delete product" style={{ width: "30px", height: "30px", border: "1px solid #EEDAD5", borderRadius: "7px", background: "#FDF7F5", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                              <path d="M4.6 5.6h10.8M8 5.6V4.2h4v1.4M6.2 5.6l.7 10a1 1 0 001 .9h4.2a1 1 0 001-.9l.7-10" stroke="#A93826" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>
                        </span>
                      </>
                    )}
                  </span>
                </span>
              </div>
              {" "}
              <div className="hv3" style={{ display: "grid", gridTemplateColumns: "2.1fr 1fr 1fr .7fr .6fr minmax(96px,1fr) .9fr 120px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "15px", height: "15px", border: "1.5px solid #E4E7E2", borderRadius: "4px", background: "#fff", display: "block", flex: "none" }} />
                  <span style={{ width: "30px", height: "30px", borderRadius: "7px", overflow: "hidden", background: "#F6F7F4", border: "1px solid #E4E7E2", flex: "none", display: "block", position: "relative" }}>
                    <img src={imgFullCreamMilk} alt="" loading="lazy" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
                  </span>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Full Cream Milk 2L
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    SK-DAI-0002
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Dairy & Refrigerated
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>$4.50</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>212</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                    In Stock
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Today</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ position: "relative", marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                    <button onClick={v.nav_editproduct} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                      Edit
                    </button>
                    <button onClick={v.rowMenu4} aria-label="More actions" style={{ width: "26px", height: "26px", border: `1px solid ${v.rowBd4}`, borderRadius: "6px", background: v.rowBg4, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                      <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                        <circle cx="5" cy="10" r="1.3" fill="#7C8A81" />
                        <circle cx="10" cy="10" r="1.3" fill="#7C8A81" />
                        <circle cx="15" cy="10" r="1.3" fill="#7C8A81" />
                      </svg>
                    </button>
                    {v.rowOpen4 && (
                      <>
                        <span style={{ position: "absolute", top: "31px", right: "0", zIndex: "40", display: "flex", alignItems: "center", gap: "6px", background: "#fff", border: "1px solid #E4E7E2", borderRadius: "9px", padding: "6px", boxShadow: "0 10px 26px rgba(16,24,16,.16)" }}>
                          <button className="hv4" onClick={v.openAbout} aria-label="About product" style={{ width: "30px", height: "30px", border: "1px solid #E4E7E2", borderRadius: "7px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                              <circle cx="10" cy="10" r="7.2" stroke="#17201A" strokeWidth="1.5" />
                              <path d="M10 9.2v4.4" stroke="#17201A" strokeWidth="1.6" strokeLinecap="round" />
                              <circle cx="10" cy="6.6" r=".95" fill="#17201A" />
                            </svg>
                          </button>
                          <button className="hv5" onClick={v.openDeleteProduct} aria-label="Delete product" style={{ width: "30px", height: "30px", border: "1px solid #EEDAD5", borderRadius: "7px", background: "#FDF7F5", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                              <path d="M4.6 5.6h10.8M8 5.6V4.2h4v1.4M6.2 5.6l.7 10a1 1 0 001 .9h4.2a1 1 0 001-.9l.7-10" stroke="#A93826" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>
                        </span>
                      </>
                    )}
                  </span>
                </span>
              </div>
              {" "}
              <div className="hv3" style={{ display: "grid", gridTemplateColumns: "2.1fr 1fr 1fr .7fr .6fr minmax(96px,1fr) .9fr 120px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "15px", height: "15px", border: "1.5px solid #E4E7E2", borderRadius: "4px", background: "#fff", display: "block", flex: "none" }} />
                  <span style={{ width: "30px", height: "30px", borderRadius: "7px", overflow: "hidden", background: "#F6F7F4", border: "1px solid #E4E7E2", flex: "none", display: "block", position: "relative" }}>
                    <img src={imgSourdoughLoaf} alt="" loading="lazy" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
                  </span>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Sourdough Loaf
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    SK-BAK-0054
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Bakery & Bread
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>$6.50</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>0</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#A93826", background: "#FAEDEA", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                    Out of Stock
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>1 hr ago</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ position: "relative", marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                    <button onClick={v.nav_editproduct} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                      Edit
                    </button>
                    <button onClick={v.rowMenu5} aria-label="More actions" style={{ width: "26px", height: "26px", border: `1px solid ${v.rowBd5}`, borderRadius: "6px", background: v.rowBg5, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                      <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                        <circle cx="5" cy="10" r="1.3" fill="#7C8A81" />
                        <circle cx="10" cy="10" r="1.3" fill="#7C8A81" />
                        <circle cx="15" cy="10" r="1.3" fill="#7C8A81" />
                      </svg>
                    </button>
                    {v.rowOpen5 && (
                      <>
                        <span style={{ position: "absolute", top: "31px", right: "0", zIndex: "40", display: "flex", alignItems: "center", gap: "6px", background: "#fff", border: "1px solid #E4E7E2", borderRadius: "9px", padding: "6px", boxShadow: "0 10px 26px rgba(16,24,16,.16)" }}>
                          <button className="hv4" onClick={v.openAbout} aria-label="About product" style={{ width: "30px", height: "30px", border: "1px solid #E4E7E2", borderRadius: "7px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                              <circle cx="10" cy="10" r="7.2" stroke="#17201A" strokeWidth="1.5" />
                              <path d="M10 9.2v4.4" stroke="#17201A" strokeWidth="1.6" strokeLinecap="round" />
                              <circle cx="10" cy="6.6" r=".95" fill="#17201A" />
                            </svg>
                          </button>
                          <button className="hv5" onClick={v.openDeleteProduct} aria-label="Delete product" style={{ width: "30px", height: "30px", border: "1px solid #EEDAD5", borderRadius: "7px", background: "#FDF7F5", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                              <path d="M4.6 5.6h10.8M8 5.6V4.2h4v1.4M6.2 5.6l.7 10a1 1 0 001 .9h4.2a1 1 0 001-.9l.7-10" stroke="#A93826" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>
                        </span>
                      </>
                    )}
                  </span>
                </span>
              </div>
              {" "}
              <div className="hv3" style={{ display: "grid", gridTemplateColumns: "2.1fr 1fr 1fr .7fr .6fr minmax(96px,1fr) .9fr 120px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "15px", height: "15px", border: "1.5px solid #E4E7E2", borderRadius: "4px", background: "#fff", display: "block", flex: "none" }} />
                  <span style={{ width: "30px", height: "30px", borderRadius: "7px", overflow: "hidden", background: "#F6F7F4", border: "1px solid #E4E7E2", flex: "none", display: "block", position: "relative" }}>
                    <img src={imgOliveOil} alt="" loading="lazy" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
                  </span>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Olive Oil 1L
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    SK-PAN-0301
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Grains, Rice & Cereals
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>$18.71</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>64</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                    In Stock
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Yesterday
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ position: "relative", marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                    <button onClick={v.nav_editproduct} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                      Edit
                    </button>
                    <button onClick={v.rowMenu6} aria-label="More actions" style={{ width: "26px", height: "26px", border: `1px solid ${v.rowBd6}`, borderRadius: "6px", background: v.rowBg6, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                      <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                        <circle cx="5" cy="10" r="1.3" fill="#7C8A81" />
                        <circle cx="10" cy="10" r="1.3" fill="#7C8A81" />
                        <circle cx="15" cy="10" r="1.3" fill="#7C8A81" />
                      </svg>
                    </button>
                    {v.rowOpen6 && (
                      <>
                        <span style={{ position: "absolute", top: "31px", right: "0", zIndex: "40", display: "flex", alignItems: "center", gap: "6px", background: "#fff", border: "1px solid #E4E7E2", borderRadius: "9px", padding: "6px", boxShadow: "0 10px 26px rgba(16,24,16,.16)" }}>
                          <button className="hv4" onClick={v.openAbout} aria-label="About product" style={{ width: "30px", height: "30px", border: "1px solid #E4E7E2", borderRadius: "7px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                              <circle cx="10" cy="10" r="7.2" stroke="#17201A" strokeWidth="1.5" />
                              <path d="M10 9.2v4.4" stroke="#17201A" strokeWidth="1.6" strokeLinecap="round" />
                              <circle cx="10" cy="6.6" r=".95" fill="#17201A" />
                            </svg>
                          </button>
                          <button className="hv5" onClick={v.openDeleteProduct} aria-label="Delete product" style={{ width: "30px", height: "30px", border: "1px solid #EEDAD5", borderRadius: "7px", background: "#FDF7F5", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                              <path d="M4.6 5.6h10.8M8 5.6V4.2h4v1.4M6.2 5.6l.7 10a1 1 0 001 .9h4.2a1 1 0 001-.9l.7-10" stroke="#A93826" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>
                        </span>
                      </>
                    )}
                  </span>
                </span>
              </div>
              {" "}
              <div className="hv3" style={{ display: "grid", gridTemplateColumns: "2.1fr 1fr 1fr .7fr .6fr minmax(96px,1fr) .9fr 120px", gap: "14px", padding: "13px 16px", alignItems: "center" }}>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "15px", height: "15px", border: "1.5px solid #E4E7E2", borderRadius: "4px", background: "#fff", display: "block", flex: "none" }} />
                  <span style={{ width: "30px", height: "30px", borderRadius: "7px", overflow: "hidden", background: "#F6F7F4", border: "1px solid #E4E7E2", flex: "none", display: "block", position: "relative" }}>
                    <img src={imgTurmericPowder} alt="" loading="lazy" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
                  </span>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Turmeric Powder 200g
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    SK-SPI-0004
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Spices & Masalas
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>$3.80</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>148</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                    In Stock
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    3 days ago
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ position: "relative", marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                    <button onClick={v.nav_editproduct} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                      Edit
                    </button>
                    <button onClick={v.rowMenu7} aria-label="More actions" style={{ width: "26px", height: "26px", border: `1px solid ${v.rowBd7}`, borderRadius: "6px", background: v.rowBg7, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                      <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                        <circle cx="5" cy="10" r="1.3" fill="#7C8A81" />
                        <circle cx="10" cy="10" r="1.3" fill="#7C8A81" />
                        <circle cx="15" cy="10" r="1.3" fill="#7C8A81" />
                      </svg>
                    </button>
                    {v.rowOpen7 && (
                      <>
                        <span style={{ position: "absolute", top: "31px", right: "0", zIndex: "40", display: "flex", alignItems: "center", gap: "6px", background: "#fff", border: "1px solid #E4E7E2", borderRadius: "9px", padding: "6px", boxShadow: "0 10px 26px rgba(16,24,16,.16)" }}>
                          <button className="hv4" onClick={v.openAbout} aria-label="About product" style={{ width: "30px", height: "30px", border: "1px solid #E4E7E2", borderRadius: "7px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                              <circle cx="10" cy="10" r="7.2" stroke="#17201A" strokeWidth="1.5" />
                              <path d="M10 9.2v4.4" stroke="#17201A" strokeWidth="1.6" strokeLinecap="round" />
                              <circle cx="10" cy="6.6" r=".95" fill="#17201A" />
                            </svg>
                          </button>
                          <button className="hv5" onClick={v.openDeleteProduct} aria-label="Delete product" style={{ width: "30px", height: "30px", border: "1px solid #EEDAD5", borderRadius: "7px", background: "#FDF7F5", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                              <path d="M4.6 5.6h10.8M8 5.6V4.2h4v1.4M6.2 5.6l.7 10a1 1 0 001 .9h4.2a1 1 0 001-.9l.7-10" stroke="#A93826" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>
                        </span>
                      </>
                    )}
                  </span>
                </span>
              </div>
              {" "}
              <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderTop: "1px solid #E4E7E2", background: "#fff" }}>
                <span style={{ font: "400 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Showing 8 of 2,418 products</span>
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
                  <span style={{ minWidth: "28px", height: "28px", border: "1px solid #E4E7E2", borderRadius: "6px", font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", display: "flex", alignItems: "center", justifyContent: "center", background: "#fff" }}>
                    3
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
          </>
        )}
        {v.isCats && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "14px" }}>
              <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "15px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "26px", height: "26px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                      <rect x="3.2" y="3.2" width="6" height="6" rx="1.5" stroke="#4A564E" strokeWidth="1.5" />
                      <rect x="10.8" y="3.2" width="6" height="6" rx="1.5" stroke="#4A564E" strokeWidth="1.5" />
                      <rect x="3.2" y="10.8" width="6" height="6" rx="1.5" stroke="#4A564E" strokeWidth="1.5" />
                      <rect x="10.8" y="10.8" width="6" height="6" rx="1.5" stroke="#4A564E" strokeWidth="1.5" />
                    </svg>
                  </span>
                  <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Total categories</span>
                </span>
                <span style={{ font: "700 23px/1.2 Inter,system-ui,sans-serif", color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>17</span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", background: "#EEF0EC", padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
                  Full grocery taxonomy
                </span>
              </div>
              <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "15px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "26px", height: "26px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                      <path d="M3.4 6.6L10 3.3l6.6 3.3L10 9.9 3.4 6.6z" stroke="#4A564E" strokeWidth="1.5" strokeLinejoin="round" />
                      <path d="M3.4 6.6v6.8L10 16.7l6.6-3.3V6.6" stroke="#4A564E" strokeWidth="1.5" strokeLinejoin="round" />
                      <path d="M10 9.9v6.8" stroke="#4A564E" strokeWidth="1.5" />
                    </svg>
                  </span>
                  <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Subcategories</span>
                </span>
                <span style={{ font: "700 23px/1.2 Inter,system-ui,sans-serif", color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>75</span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", background: "#EEF0EC", padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
                  Across all aisles
                </span>
              </div>
              <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "15px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "26px", height: "26px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                      <rect x="3" y="8.8" width="6" height="7.8" rx="1.4" stroke="#4A564E" strokeWidth="1.5" />
                      <rect x="11" y="8.8" width="6" height="7.8" rx="1.4" stroke="#4A564E" strokeWidth="1.5" />
                      <rect x="7" y="3.4" width="6" height="4.6" rx="1.4" stroke="#4A564E" strokeWidth="1.5" />
                    </svg>
                  </span>
                  <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Products mapped</span>
                </span>
                <span style={{ font: "700 23px/1.2 Inter,system-ui,sans-serif", color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>2,418</span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
                  98.4% coverage
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
                  <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Disabled</span>
                </span>
                <span style={{ font: "700 23px/1.2 Inter,system-ui,sans-serif", color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>1</span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#8A6100", background: "#FBF1DE", padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
                  Pooja/Festival · seasonal
                </span>
              </div>
            </div>
            <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", overflow: "hidden", flex: "none" }}>
              {" "}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 16px", borderBottom: "1px solid #E4E7E2", flexWrap: "wrap" }}>
                <span style={{ font: "600 13.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Main categories
                </span>
                <span>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#5F6B62", background: "#EEF0EC", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                    DRAG TO REORDER
                  </span>
                </span>
                <span style={{ marginLeft: "auto" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Order matches the customer app aisle strip
                  </span>
                </span>
              </div>
              {" "}
              <div style={{ display: "grid", gridTemplateColumns: "74px 2fr 1.2fr .8fr minmax(86px,1fr) 120px", gap: "14px", padding: "11px 16px", background: "#F6F7F4", borderBottom: "1px solid #E4E7E2" }}>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Order
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Category
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Structure
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Products
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Status
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Actions
                </span>
              </div>
              {" "}
              <div className="hv3" style={{ display: "grid", gridTemplateColumns: "74px 2fr 1.2fr .8fr minmax(86px,1fr) 120px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <circle cx="7.5" cy="5" r="1.2" fill="#C3C9C1" />
                    <circle cx="12.5" cy="5" r="1.2" fill="#C3C9C1" />
                    <circle cx="7.5" cy="10" r="1.2" fill="#C3C9C1" />
                    <circle cx="12.5" cy="10" r="1.2" fill="#C3C9C1" />
                    <circle cx="7.5" cy="15" r="1.2" fill="#C3C9C1" />
                    <circle cx="12.5" cy="15" r="1.2" fill="#C3C9C1" />
                  </svg>
                  <span style={{ font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>1</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "9px" }}>
                  <span style={{ width: "30px", height: "30px", borderRadius: "7px", overflow: "hidden", background: "#F6F7F4", border: "1px solid #E4E7E2", flex: "none", display: "block", position: "relative" }}>
                    <img src={imgFullCreamMilk} alt="" loading="lazy" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
                  </span>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Dairy & Refrigerated
                  </span>
                </span>
                <span style={{ minWidth: "0" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    5 subcategories
                  </span>
                </span>
                <span style={{ minWidth: "0" }}>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>148</span>
                </span>
                <span style={{ minWidth: "0" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                    Enabled
                  </span>
                </span>
                <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                  <button onClick={v.openCatEdit} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                    Edit
                  </button>
                  <button onClick={v.openRowActions} aria-label="More" style={{ width: "26px", height: "26px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                      <circle cx="5" cy="10" r="1.3" fill="#7C8A81" />
                      <circle cx="10" cy="10" r="1.3" fill="#7C8A81" />
                      <circle cx="15" cy="10" r="1.3" fill="#7C8A81" />
                    </svg>
                  </button>
                </span>
              </div>
              {" "}
              <div className="hv3" style={{ display: "grid", gridTemplateColumns: "74px 2fr 1.2fr .8fr minmax(86px,1fr) 120px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <circle cx="7.5" cy="5" r="1.2" fill="#C3C9C1" />
                    <circle cx="12.5" cy="5" r="1.2" fill="#C3C9C1" />
                    <circle cx="7.5" cy="10" r="1.2" fill="#C3C9C1" />
                    <circle cx="12.5" cy="10" r="1.2" fill="#C3C9C1" />
                    <circle cx="7.5" cy="15" r="1.2" fill="#C3C9C1" />
                    <circle cx="12.5" cy="15" r="1.2" fill="#C3C9C1" />
                  </svg>
                  <span style={{ font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>2</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "9px" }}>
                  <span style={{ width: "30px", height: "30px", borderRadius: "7px", overflow: "hidden", background: "#F6F7F4", border: "1px solid #E4E7E2", flex: "none", display: "block", position: "relative" }}>
                    <img src={imgSourdoughLoaf} alt="" loading="lazy" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
                  </span>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Bakery & Bread
                  </span>
                </span>
                <span style={{ minWidth: "0" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    3 subcategories
                  </span>
                </span>
                <span style={{ minWidth: "0" }}>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>74</span>
                </span>
                <span style={{ minWidth: "0" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                    Enabled
                  </span>
                </span>
                <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                  <button onClick={v.openCatEdit} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                    Edit
                  </button>
                  <button onClick={v.openRowActions} aria-label="More" style={{ width: "26px", height: "26px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                      <circle cx="5" cy="10" r="1.3" fill="#7C8A81" />
                      <circle cx="10" cy="10" r="1.3" fill="#7C8A81" />
                      <circle cx="15" cy="10" r="1.3" fill="#7C8A81" />
                    </svg>
                  </button>
                </span>
              </div>
              {" "}
              <div className="hv3" style={{ display: "grid", gridTemplateColumns: "74px 2fr 1.2fr .8fr minmax(86px,1fr) 120px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <circle cx="7.5" cy="5" r="1.2" fill="#C3C9C1" />
                    <circle cx="12.5" cy="5" r="1.2" fill="#C3C9C1" />
                    <circle cx="7.5" cy="10" r="1.2" fill="#C3C9C1" />
                    <circle cx="12.5" cy="10" r="1.2" fill="#C3C9C1" />
                    <circle cx="7.5" cy="15" r="1.2" fill="#C3C9C1" />
                    <circle cx="12.5" cy="15" r="1.2" fill="#C3C9C1" />
                  </svg>
                  <span style={{ font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>3</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "9px" }}>
                  <span style={{ width: "30px", height: "30px", borderRadius: "7px", overflow: "hidden", background: "#F6F7F4", border: "1px solid #E4E7E2", flex: "none", display: "block", position: "relative" }}>
                    <img src={imgFreshCoriander} alt="" loading="lazy" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
                  </span>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Fresh Produce
                  </span>
                </span>
                <span style={{ minWidth: "0" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    2 subcategories
                  </span>
                </span>
                <span style={{ minWidth: "0" }}>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>312</span>
                </span>
                <span style={{ minWidth: "0" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                    Enabled
                  </span>
                </span>
                <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                  <button onClick={v.openCatEdit} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                    Edit
                  </button>
                  <button onClick={v.openRowActions} aria-label="More" style={{ width: "26px", height: "26px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                      <circle cx="5" cy="10" r="1.3" fill="#7C8A81" />
                      <circle cx="10" cy="10" r="1.3" fill="#7C8A81" />
                      <circle cx="15" cy="10" r="1.3" fill="#7C8A81" />
                    </svg>
                  </button>
                </span>
              </div>
              {" "}
              <div className="hv3" style={{ display: "grid", gridTemplateColumns: "74px 2fr 1.2fr .8fr minmax(86px,1fr) 120px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <circle cx="7.5" cy="5" r="1.2" fill="#C3C9C1" />
                    <circle cx="12.5" cy="5" r="1.2" fill="#C3C9C1" />
                    <circle cx="7.5" cy="10" r="1.2" fill="#C3C9C1" />
                    <circle cx="12.5" cy="10" r="1.2" fill="#C3C9C1" />
                    <circle cx="7.5" cy="15" r="1.2" fill="#C3C9C1" />
                    <circle cx="12.5" cy="15" r="1.2" fill="#C3C9C1" />
                  </svg>
                  <span style={{ font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>4</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "9px" }}>
                  <span style={{ width: "30px", height: "30px", borderRadius: "7px", overflow: "hidden", background: "#F6F7F4", border: "1px solid #E4E7E2", flex: "none", display: "block", position: "relative" }}>
                    <img src={imgFlours} alt="" loading="lazy" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
                  </span>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Flours</span>
                </span>
                <span style={{ minWidth: "0" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    4 subcategories
                  </span>
                </span>
                <span style={{ minWidth: "0" }}>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>96</span>
                </span>
                <span style={{ minWidth: "0" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                    Enabled
                  </span>
                </span>
                <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                  <button onClick={v.openCatEdit} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                    Edit
                  </button>
                  <button onClick={v.openRowActions} aria-label="More" style={{ width: "26px", height: "26px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                      <circle cx="5" cy="10" r="1.3" fill="#7C8A81" />
                      <circle cx="10" cy="10" r="1.3" fill="#7C8A81" />
                      <circle cx="15" cy="10" r="1.3" fill="#7C8A81" />
                    </svg>
                  </button>
                </span>
              </div>
              {" "}
              <div className="hv3" style={{ display: "grid", gridTemplateColumns: "74px 2fr 1.2fr .8fr minmax(86px,1fr) 120px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <circle cx="7.5" cy="5" r="1.2" fill="#C3C9C1" />
                    <circle cx="12.5" cy="5" r="1.2" fill="#C3C9C1" />
                    <circle cx="7.5" cy="10" r="1.2" fill="#C3C9C1" />
                    <circle cx="12.5" cy="10" r="1.2" fill="#C3C9C1" />
                    <circle cx="7.5" cy="15" r="1.2" fill="#C3C9C1" />
                    <circle cx="12.5" cy="15" r="1.2" fill="#C3C9C1" />
                  </svg>
                  <span style={{ font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>5</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "9px" }}>
                  <span style={{ width: "30px", height: "30px", borderRadius: "7px", overflow: "hidden", background: "#F6F7F4", border: "1px solid #E4E7E2", flex: "none", display: "block", position: "relative" }}>
                    <img src={imgPulsesLentils} alt="" loading="lazy" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
                  </span>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Pulses & Lentils
                  </span>
                </span>
                <span style={{ minWidth: "0" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    6 subcategories
                  </span>
                </span>
                <span style={{ minWidth: "0" }}>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>128</span>
                </span>
                <span style={{ minWidth: "0" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                    Enabled
                  </span>
                </span>
                <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                  <button onClick={v.openCatEdit} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                    Edit
                  </button>
                  <button onClick={v.openRowActions} aria-label="More" style={{ width: "26px", height: "26px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                      <circle cx="5" cy="10" r="1.3" fill="#7C8A81" />
                      <circle cx="10" cy="10" r="1.3" fill="#7C8A81" />
                      <circle cx="15" cy="10" r="1.3" fill="#7C8A81" />
                    </svg>
                  </button>
                </span>
              </div>
              {" "}
              <div className="hv3" style={{ display: "grid", gridTemplateColumns: "74px 2fr 1.2fr .8fr minmax(86px,1fr) 120px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <circle cx="7.5" cy="5" r="1.2" fill="#C3C9C1" />
                    <circle cx="12.5" cy="5" r="1.2" fill="#C3C9C1" />
                    <circle cx="7.5" cy="10" r="1.2" fill="#C3C9C1" />
                    <circle cx="12.5" cy="10" r="1.2" fill="#C3C9C1" />
                    <circle cx="7.5" cy="15" r="1.2" fill="#C3C9C1" />
                    <circle cx="12.5" cy="15" r="1.2" fill="#C3C9C1" />
                  </svg>
                  <span style={{ font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>6</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "9px" }}>
                  <span style={{ width: "30px", height: "30px", borderRadius: "7px", overflow: "hidden", background: "#F6F7F4", border: "1px solid #E4E7E2", flex: "none", display: "block", position: "relative" }}>
                    <img src={imgSpicesMasalas} alt="" loading="lazy" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
                  </span>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Spices & Masalas
                  </span>
                </span>
                <span style={{ minWidth: "0" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    8 subcategories
                  </span>
                </span>
                <span style={{ minWidth: "0" }}>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>204</span>
                </span>
                <span style={{ minWidth: "0" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                    Enabled
                  </span>
                </span>
                <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                  <button onClick={v.openCatEdit} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                    Edit
                  </button>
                  <button onClick={v.openRowActions} aria-label="More" style={{ width: "26px", height: "26px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                      <circle cx="5" cy="10" r="1.3" fill="#7C8A81" />
                      <circle cx="10" cy="10" r="1.3" fill="#7C8A81" />
                      <circle cx="15" cy="10" r="1.3" fill="#7C8A81" />
                    </svg>
                  </button>
                </span>
              </div>
              {" "}
              <div className="hv3" style={{ display: "grid", gridTemplateColumns: "74px 2fr 1.2fr .8fr minmax(86px,1fr) 120px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <circle cx="7.5" cy="5" r="1.2" fill="#C3C9C1" />
                    <circle cx="12.5" cy="5" r="1.2" fill="#C3C9C1" />
                    <circle cx="7.5" cy="10" r="1.2" fill="#C3C9C1" />
                    <circle cx="12.5" cy="10" r="1.2" fill="#C3C9C1" />
                    <circle cx="7.5" cy="15" r="1.2" fill="#C3C9C1" />
                    <circle cx="12.5" cy="15" r="1.2" fill="#C3C9C1" />
                  </svg>
                  <span style={{ font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>7</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "9px" }}>
                  <span style={{ width: "30px", height: "30px", borderRadius: "7px", overflow: "hidden", background: "#F6F7F4", border: "1px solid #E4E7E2", flex: "none", display: "block", position: "relative" }}>
                    <img src={imgBasmatiRice} alt="" loading="lazy" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
                  </span>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Grains, Rice & Cereals
                  </span>
                </span>
                <span style={{ minWidth: "0" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    5 subcategories
                  </span>
                </span>
                <span style={{ minWidth: "0" }}>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>186</span>
                </span>
                <span style={{ minWidth: "0" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                    Enabled
                  </span>
                </span>
                <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                  <button onClick={v.openCatEdit} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                    Edit
                  </button>
                  <button onClick={v.openRowActions} aria-label="More" style={{ width: "26px", height: "26px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                      <circle cx="5" cy="10" r="1.3" fill="#7C8A81" />
                      <circle cx="10" cy="10" r="1.3" fill="#7C8A81" />
                      <circle cx="15" cy="10" r="1.3" fill="#7C8A81" />
                    </svg>
                  </button>
                </span>
              </div>
              {" "}
              <div className="hv3" style={{ display: "grid", gridTemplateColumns: "74px 2fr 1.2fr .8fr minmax(86px,1fr) 120px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <circle cx="7.5" cy="5" r="1.2" fill="#C3C9C1" />
                    <circle cx="12.5" cy="5" r="1.2" fill="#C3C9C1" />
                    <circle cx="7.5" cy="10" r="1.2" fill="#C3C9C1" />
                    <circle cx="12.5" cy="10" r="1.2" fill="#C3C9C1" />
                    <circle cx="7.5" cy="15" r="1.2" fill="#C3C9C1" />
                    <circle cx="12.5" cy="15" r="1.2" fill="#C3C9C1" />
                  </svg>
                  <span style={{ font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>8</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "9px" }}>
                  <span style={{ width: "30px", height: "30px", borderRadius: "7px", overflow: "hidden", background: "#F6F7F4", border: "1px solid #E4E7E2", flex: "none", display: "block", position: "relative" }}>
                    <img src={imgOliveOil} alt="" loading="lazy" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
                  </span>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Oil & Ghee
                  </span>
                </span>
                <span style={{ minWidth: "0" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    3 subcategories
                  </span>
                </span>
                <span style={{ minWidth: "0" }}>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>64</span>
                </span>
                <span style={{ minWidth: "0" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                    Enabled
                  </span>
                </span>
                <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                  <button onClick={v.openCatEdit} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                    Edit
                  </button>
                  <button onClick={v.openRowActions} aria-label="More" style={{ width: "26px", height: "26px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                      <circle cx="5" cy="10" r="1.3" fill="#7C8A81" />
                      <circle cx="10" cy="10" r="1.3" fill="#7C8A81" />
                      <circle cx="15" cy="10" r="1.3" fill="#7C8A81" />
                    </svg>
                  </button>
                </span>
              </div>
              {" "}
              <div className="hv3" style={{ display: "grid", gridTemplateColumns: "74px 2fr 1.2fr .8fr minmax(86px,1fr) 120px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <circle cx="7.5" cy="5" r="1.2" fill="#C3C9C1" />
                    <circle cx="12.5" cy="5" r="1.2" fill="#C3C9C1" />
                    <circle cx="7.5" cy="10" r="1.2" fill="#C3C9C1" />
                    <circle cx="12.5" cy="10" r="1.2" fill="#C3C9C1" />
                    <circle cx="7.5" cy="15" r="1.2" fill="#C3C9C1" />
                    <circle cx="12.5" cy="15" r="1.2" fill="#C3C9C1" />
                  </svg>
                  <span style={{ font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>9</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "9px" }}>
                  <span style={{ width: "30px", height: "30px", borderRadius: "7px", overflow: "hidden", background: "#F6F7F4", border: "1px solid #E4E7E2", flex: "none", display: "block", position: "relative" }}>
                    <img src={imgSnacksSavouries} alt="" loading="lazy" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
                  </span>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Snacks & Savouries
                  </span>
                </span>
                <span style={{ minWidth: "0" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    5 subcategories
                  </span>
                </span>
                <span style={{ minWidth: "0" }}>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>268</span>
                </span>
                <span style={{ minWidth: "0" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                    Enabled
                  </span>
                </span>
                <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                  <button onClick={v.openCatEdit} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                    Edit
                  </button>
                  <button onClick={v.openRowActions} aria-label="More" style={{ width: "26px", height: "26px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                      <circle cx="5" cy="10" r="1.3" fill="#7C8A81" />
                      <circle cx="10" cy="10" r="1.3" fill="#7C8A81" />
                      <circle cx="15" cy="10" r="1.3" fill="#7C8A81" />
                    </svg>
                  </button>
                </span>
              </div>
              {" "}
              <div className="hv3" style={{ display: "grid", gridTemplateColumns: "74px 2fr 1.2fr .8fr minmax(86px,1fr) 120px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <circle cx="7.5" cy="5" r="1.2" fill="#C3C9C1" />
                    <circle cx="12.5" cy="5" r="1.2" fill="#C3C9C1" />
                    <circle cx="7.5" cy="10" r="1.2" fill="#C3C9C1" />
                    <circle cx="12.5" cy="10" r="1.2" fill="#C3C9C1" />
                    <circle cx="7.5" cy="15" r="1.2" fill="#C3C9C1" />
                    <circle cx="12.5" cy="15" r="1.2" fill="#C3C9C1" />
                  </svg>
                  <span style={{ font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>10</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "9px" }}>
                  <span style={{ width: "30px", height: "30px", borderRadius: "7px", overflow: "hidden", background: "#F6F7F4", border: "1px solid #E4E7E2", flex: "none", display: "block", position: "relative" }}>
                    <img src={imgInstantReadyToEat} alt="" loading="lazy" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
                  </span>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Instant & Ready to Eat
                  </span>
                </span>
                <span style={{ minWidth: "0" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    4 subcategories
                  </span>
                </span>
                <span style={{ minWidth: "0" }}>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>142</span>
                </span>
                <span style={{ minWidth: "0" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                    Enabled
                  </span>
                </span>
                <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                  <button onClick={v.openCatEdit} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                    Edit
                  </button>
                  <button onClick={v.openRowActions} aria-label="More" style={{ width: "26px", height: "26px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                      <circle cx="5" cy="10" r="1.3" fill="#7C8A81" />
                      <circle cx="10" cy="10" r="1.3" fill="#7C8A81" />
                      <circle cx="15" cy="10" r="1.3" fill="#7C8A81" />
                    </svg>
                  </button>
                </span>
              </div>
              {" "}
              <div className="hv3" style={{ display: "grid", gridTemplateColumns: "74px 2fr 1.2fr .8fr minmax(86px,1fr) 120px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <circle cx="7.5" cy="5" r="1.2" fill="#C3C9C1" />
                    <circle cx="12.5" cy="5" r="1.2" fill="#C3C9C1" />
                    <circle cx="7.5" cy="10" r="1.2" fill="#C3C9C1" />
                    <circle cx="12.5" cy="10" r="1.2" fill="#C3C9C1" />
                    <circle cx="7.5" cy="15" r="1.2" fill="#C3C9C1" />
                    <circle cx="12.5" cy="15" r="1.2" fill="#C3C9C1" />
                  </svg>
                  <span style={{ font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>11</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "9px" }}>
                  <span style={{ width: "30px", height: "30px", borderRadius: "7px", overflow: "hidden", background: "#F6F7F4", border: "1px solid #E4E7E2", flex: "none", display: "block", position: "relative" }}>
                    <img src={imgTeaBeverages} alt="" loading="lazy" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
                  </span>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Tea & Beverages
                  </span>
                </span>
                <span style={{ minWidth: "0" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    6 subcategories
                  </span>
                </span>
                <span style={{ minWidth: "0" }}>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>198</span>
                </span>
                <span style={{ minWidth: "0" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                    Enabled
                  </span>
                </span>
                <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                  <button onClick={v.openCatEdit} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                    Edit
                  </button>
                  <button onClick={v.openRowActions} aria-label="More" style={{ width: "26px", height: "26px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                      <circle cx="5" cy="10" r="1.3" fill="#7C8A81" />
                      <circle cx="10" cy="10" r="1.3" fill="#7C8A81" />
                      <circle cx="15" cy="10" r="1.3" fill="#7C8A81" />
                    </svg>
                  </button>
                </span>
              </div>
              {" "}
              <div className="hv3" style={{ display: "grid", gridTemplateColumns: "74px 2fr 1.2fr .8fr minmax(86px,1fr) 120px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <circle cx="7.5" cy="5" r="1.2" fill="#C3C9C1" />
                    <circle cx="12.5" cy="5" r="1.2" fill="#C3C9C1" />
                    <circle cx="7.5" cy="10" r="1.2" fill="#C3C9C1" />
                    <circle cx="12.5" cy="10" r="1.2" fill="#C3C9C1" />
                    <circle cx="7.5" cy="15" r="1.2" fill="#C3C9C1" />
                    <circle cx="12.5" cy="15" r="1.2" fill="#C3C9C1" />
                  </svg>
                  <span style={{ font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>12</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "9px" }}>
                  <span style={{ width: "30px", height: "30px", borderRadius: "7px", overflow: "hidden", background: "#F6F7F4", border: "1px solid #E4E7E2", flex: "none", display: "block", position: "relative" }}>
                    <img src={imgCondimentsPickles} alt="" loading="lazy" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
                  </span>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Condiments, Pickles & Paste
                  </span>
                </span>
                <span style={{ minWidth: "0" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    5 subcategories
                  </span>
                </span>
                <span style={{ minWidth: "0" }}>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>116</span>
                </span>
                <span style={{ minWidth: "0" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                    Enabled
                  </span>
                </span>
                <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                  <button onClick={v.openCatEdit} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                    Edit
                  </button>
                  <button onClick={v.openRowActions} aria-label="More" style={{ width: "26px", height: "26px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                      <circle cx="5" cy="10" r="1.3" fill="#7C8A81" />
                      <circle cx="10" cy="10" r="1.3" fill="#7C8A81" />
                      <circle cx="15" cy="10" r="1.3" fill="#7C8A81" />
                    </svg>
                  </button>
                </span>
              </div>
              {" "}
              <div className="hv3" style={{ display: "grid", gridTemplateColumns: "74px 2fr 1.2fr .8fr minmax(86px,1fr) 120px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <circle cx="7.5" cy="5" r="1.2" fill="#C3C9C1" />
                    <circle cx="12.5" cy="5" r="1.2" fill="#C3C9C1" />
                    <circle cx="7.5" cy="10" r="1.2" fill="#C3C9C1" />
                    <circle cx="12.5" cy="10" r="1.2" fill="#C3C9C1" />
                    <circle cx="7.5" cy="15" r="1.2" fill="#C3C9C1" />
                    <circle cx="12.5" cy="15" r="1.2" fill="#C3C9C1" />
                  </svg>
                  <span style={{ font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>13</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "9px" }}>
                  <span style={{ width: "30px", height: "30px", borderRadius: "7px", overflow: "hidden", background: "#F6F7F4", border: "1px solid #E4E7E2", flex: "none", display: "block", position: "relative" }}>
                    <img src={imgSweetenersBaking} alt="" loading="lazy" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
                  </span>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Sweeteners & Miscellaneous Baking
                  </span>
                </span>
                <span style={{ minWidth: "0" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    4 subcategories
                  </span>
                </span>
                <span style={{ minWidth: "0" }}>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>88</span>
                </span>
                <span style={{ minWidth: "0" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                    Enabled
                  </span>
                </span>
                <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                  <button onClick={v.openCatEdit} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                    Edit
                  </button>
                  <button onClick={v.openRowActions} aria-label="More" style={{ width: "26px", height: "26px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                      <circle cx="5" cy="10" r="1.3" fill="#7C8A81" />
                      <circle cx="10" cy="10" r="1.3" fill="#7C8A81" />
                      <circle cx="15" cy="10" r="1.3" fill="#7C8A81" />
                    </svg>
                  </button>
                </span>
              </div>
              {" "}
              <div className="hv3" style={{ display: "grid", gridTemplateColumns: "74px 2fr 1.2fr .8fr minmax(86px,1fr) 120px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <circle cx="7.5" cy="5" r="1.2" fill="#C3C9C1" />
                    <circle cx="12.5" cy="5" r="1.2" fill="#C3C9C1" />
                    <circle cx="7.5" cy="10" r="1.2" fill="#C3C9C1" />
                    <circle cx="12.5" cy="10" r="1.2" fill="#C3C9C1" />
                    <circle cx="7.5" cy="15" r="1.2" fill="#C3C9C1" />
                    <circle cx="12.5" cy="15" r="1.2" fill="#C3C9C1" />
                  </svg>
                  <span style={{ font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>14</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "9px" }}>
                  <span style={{ width: "30px", height: "30px", borderRadius: "7px", overflow: "hidden", background: "#F6F7F4", border: "1px solid #E4E7E2", flex: "none", display: "block", position: "relative" }}>
                    <img src={imgAlphonsoMangoes} alt="" loading="lazy" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
                  </span>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Frozen Foods & Vegetables
                  </span>
                </span>
                <span style={{ minWidth: "0" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    4 subcategories
                  </span>
                </span>
                <span style={{ minWidth: "0" }}>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>118</span>
                </span>
                <span style={{ minWidth: "0" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                    Enabled
                  </span>
                </span>
                <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                  <button onClick={v.openCatEdit} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                    Edit
                  </button>
                  <button onClick={v.openRowActions} aria-label="More" style={{ width: "26px", height: "26px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                      <circle cx="5" cy="10" r="1.3" fill="#7C8A81" />
                      <circle cx="10" cy="10" r="1.3" fill="#7C8A81" />
                      <circle cx="15" cy="10" r="1.3" fill="#7C8A81" />
                    </svg>
                  </button>
                </span>
              </div>
              {" "}
              <div className="hv3" style={{ display: "grid", gridTemplateColumns: "74px 2fr 1.2fr .8fr minmax(86px,1fr) 120px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <circle cx="7.5" cy="5" r="1.2" fill="#C3C9C1" />
                    <circle cx="12.5" cy="5" r="1.2" fill="#C3C9C1" />
                    <circle cx="7.5" cy="10" r="1.2" fill="#C3C9C1" />
                    <circle cx="12.5" cy="10" r="1.2" fill="#C3C9C1" />
                    <circle cx="7.5" cy="15" r="1.2" fill="#C3C9C1" />
                    <circle cx="12.5" cy="15" r="1.2" fill="#C3C9C1" />
                  </svg>
                  <span style={{ font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>15</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "9px" }}>
                  <span style={{ width: "30px", height: "30px", borderRadius: "7px", overflow: "hidden", background: "#F6F7F4", border: "1px solid #E4E7E2", flex: "none", display: "block", position: "relative" }}>
                    <img src={imgInstantReadyToEat} alt="" loading="lazy" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
                  </span>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Fasting Foods
                  </span>
                </span>
                <span style={{ minWidth: "0" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    3 subcategories
                  </span>
                </span>
                <span style={{ minWidth: "0" }}>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>42</span>
                </span>
                <span style={{ minWidth: "0" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                    Enabled
                  </span>
                </span>
                <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                  <button onClick={v.openCatEdit} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                    Edit
                  </button>
                  <button onClick={v.openRowActions} aria-label="More" style={{ width: "26px", height: "26px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                      <circle cx="5" cy="10" r="1.3" fill="#7C8A81" />
                      <circle cx="10" cy="10" r="1.3" fill="#7C8A81" />
                      <circle cx="15" cy="10" r="1.3" fill="#7C8A81" />
                    </svg>
                  </button>
                </span>
              </div>
              {" "}
              <div className="hv3" style={{ display: "grid", gridTemplateColumns: "74px 2fr 1.2fr .8fr minmax(86px,1fr) 120px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <circle cx="7.5" cy="5" r="1.2" fill="#C3C9C1" />
                    <circle cx="12.5" cy="5" r="1.2" fill="#C3C9C1" />
                    <circle cx="7.5" cy="10" r="1.2" fill="#C3C9C1" />
                    <circle cx="12.5" cy="10" r="1.2" fill="#C3C9C1" />
                    <circle cx="7.5" cy="15" r="1.2" fill="#C3C9C1" />
                    <circle cx="12.5" cy="15" r="1.2" fill="#C3C9C1" />
                  </svg>
                  <span style={{ font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>16</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "9px" }}>
                  <span style={{ width: "30px", height: "30px", borderRadius: "7px", overflow: "hidden", background: "#F6F7F4", border: "1px solid #E4E7E2", flex: "none", display: "block", position: "relative" }}>
                    <img src={imgPaneer} alt="" loading="lazy" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
                  </span>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    General Foods
                  </span>
                </span>
                <span style={{ minWidth: "0" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    5 subcategories
                  </span>
                </span>
                <span style={{ minWidth: "0" }}>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>134</span>
                </span>
                <span style={{ minWidth: "0" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                    Enabled
                  </span>
                </span>
                <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                  <button onClick={v.openCatEdit} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                    Edit
                  </button>
                  <button onClick={v.openRowActions} aria-label="More" style={{ width: "26px", height: "26px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                      <circle cx="5" cy="10" r="1.3" fill="#7C8A81" />
                      <circle cx="10" cy="10" r="1.3" fill="#7C8A81" />
                      <circle cx="15" cy="10" r="1.3" fill="#7C8A81" />
                    </svg>
                  </button>
                </span>
              </div>
              {" "}
              <div className="hv3" style={{ display: "grid", gridTemplateColumns: "74px 2fr 1.2fr .8fr minmax(86px,1fr) 120px", gap: "14px", padding: "13px 16px", alignItems: "center" }}>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <circle cx="7.5" cy="5" r="1.2" fill="#C3C9C1" />
                    <circle cx="12.5" cy="5" r="1.2" fill="#C3C9C1" />
                    <circle cx="7.5" cy="10" r="1.2" fill="#C3C9C1" />
                    <circle cx="12.5" cy="10" r="1.2" fill="#C3C9C1" />
                    <circle cx="7.5" cy="15" r="1.2" fill="#C3C9C1" />
                    <circle cx="12.5" cy="15" r="1.2" fill="#C3C9C1" />
                  </svg>
                  <span style={{ font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>17</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "9px" }}>
                  <span style={{ width: "30px", height: "30px", borderRadius: "7px", overflow: "hidden", background: "#F6F7F4", border: "1px solid #E4E7E2", flex: "none", display: "block", position: "relative" }}>
                    <img src={imgGaramMasala} alt="" loading="lazy" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
                  </span>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Pooja/Festival
                  </span>
                </span>
                <span style={{ minWidth: "0" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    3 subcategories
                  </span>
                </span>
                <span style={{ minWidth: "0" }}>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>36</span>
                </span>
                <span style={{ minWidth: "0" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#5F6B62", background: "#EEF0EC", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                    Disabled
                  </span>
                </span>
                <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                  <button onClick={v.openCatEdit} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                    Edit
                  </button>
                  <button onClick={v.openRowActions} aria-label="More" style={{ width: "26px", height: "26px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                      <circle cx="5" cy="10" r="1.3" fill="#7C8A81" />
                      <circle cx="10" cy="10" r="1.3" fill="#7C8A81" />
                      <circle cx="15" cy="10" r="1.3" fill="#7C8A81" />
                    </svg>
                  </button>
                </span>
              </div>
              {" "}
            </div>
          </>
        )}
        {v.isInv && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "14px" }}>
              <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "15px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "26px", height: "26px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                      <path d="M3.4 6.6L10 3.3l6.6 3.3L10 9.9 3.4 6.6z" stroke="#4A564E" strokeWidth="1.5" strokeLinejoin="round" />
                      <path d="M3.4 6.6v6.8L10 16.7l6.6-3.3V6.6" stroke="#4A564E" strokeWidth="1.5" strokeLinejoin="round" />
                      <path d="M10 9.9v6.8" stroke="#4A564E" strokeWidth="1.5" />
                    </svg>
                  </span>
                  <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Total products</span>
                </span>
                <span style={{ font: "700 23px/1.2 Inter,system-ui,sans-serif", color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>2,418</span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", background: "#EEF0EC", padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
                  Tracked inventory
                </span>
              </div>
              <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "15px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "26px", height: "26px", borderRadius: "7px", background: "#F6F7F4", border: "1px solid #E4E7E2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                      <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#4A564E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>In stock</span>
                </span>
                <span style={{ font: "700 23px/1.2 Inter,system-ui,sans-serif", color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>2,304</span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
                  95.3% availability
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
                  <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Low stock</span>
                </span>
                <span style={{ font: "700 23px/1.2 Inter,system-ui,sans-serif", color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>42</span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#8A6100", background: "#FBF1DE", padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
                  Reorder soon
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
                  <span style={{ font: "500 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Out of stock</span>
                </span>
                <span style={{ font: "700 23px/1.2 Inter,system-ui,sans-serif", color: "#17201A", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>72</span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#A93826", background: "#FAEDEA", padding: "4px 7px", borderRadius: "5px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
                  Lost sales risk
                </span>
              </div>
            </div>
            <div className="ad-scroll" style={{ display: "flex", gap: "2px", borderBottom: "1px solid #E4E7E2", overflowX: "auto" }}>
              <button onClick={v.tb_catalogue2_0} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_catalogue2_0Fg, borderBottom: `2px solid ${v.tb_catalogue2_0Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
                All stock
              </button>
              <button onClick={v.tb_catalogue2_1} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_catalogue2_1Fg, borderBottom: `2px solid ${v.tb_catalogue2_1Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
                Critical
              </button>
              <button onClick={v.tb_catalogue2_2} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_catalogue2_2Fg, borderBottom: `2px solid ${v.tb_catalogue2_2Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
                Low stock
              </button>
              <button onClick={v.tb_catalogue2_3} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_catalogue2_3Fg, borderBottom: `2px solid ${v.tb_catalogue2_3Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
                Out of stock
              </button>
              <button onClick={v.tb_catalogue2_4} style={{ border: "0", background: "transparent", padding: "0 12px 10px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: v.tb_catalogue2_4Fg, borderBottom: `2px solid ${v.tb_catalogue2_4Bd}`, cursor: "pointer", whiteSpace: "nowrap", marginBottom: "-1px" }}>
                Overstocked
              </button>
            </div>
            <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", overflow: "hidden", flex: "none" }}>
              {" "}
              <div style={{ display: "flex", alignItems: "center", gap: "9px", padding: "12px 16px", borderBottom: "1px solid #E4E7E2", flexWrap: "wrap" }}>
                <button onClick={v.chi_0} style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: v.chi_0Fg, background: v.chi_0Bg, border: `1px solid ${v.chi_0Bd}`, padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap", cursor: "pointer" }}>
                  Warehouse: Collingwood DC
                </button>
                <button onClick={v.chi_1} style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: v.chi_1Fg, background: v.chi_1Bg, border: `1px solid ${v.chi_1Bd}`, padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap", cursor: "pointer" }}>
                  Category: All
                </button>
                <button className="hv1" onClick={v.toast_export} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 12px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", color: "#17201A", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
                  Reorder report
                </button>
                <span style={{ marginLeft: "auto", font: "400 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Last sync 4 minutes ago</span>
              </div>
              {" "}
              <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1fr .7fr .7fr .8fr .8fr minmax(104px,1.1fr) .9fr 90px", gap: "14px", padding: "11px 16px", background: "#F6F7F4", borderBottom: "1px solid #E4E7E2" }}>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Product / SKU
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Category
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  On hand
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Reserved
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Available
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Minimum
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Status
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Updated
                </span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".5px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Action
                </span>
              </div>
              {" "}
              <div className="hv3" style={{ display: "grid", gridTemplateColumns: "1.8fr 1fr .7fr .7fr .8fr .8fr minmax(104px,1.1fr) .9fr 90px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ display: "flex", flexDirection: "column", gap: "3px", minWidth: "0" }}>
                    <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      Basmati Rice 5kg
                    </span>
                    <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      SK-PAN-0142
                    </span>
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Grains, Rice & Cereals
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>6</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>2</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>4</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>min 25</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#A93826", background: "#FAEDEA", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                    Critical
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    2 hrs ago
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ marginLeft: "auto" }}>
                    <button onClick={v.openStockAdj} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                      Adjust
                    </button>
                  </span>
                </span>
              </div>
              {" "}
              <div className="hv3" style={{ display: "grid", gridTemplateColumns: "1.8fr 1fr .7fr .7fr .8fr .8fr minmax(104px,1.1fr) .9fr 90px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ display: "flex", flexDirection: "column", gap: "3px", minWidth: "0" }}>
                    <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      Paneer 500g
                    </span>
                    <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      SK-DAI-0088
                    </span>
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Dairy & Refrigerated
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>11</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>3</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>8</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>min 30</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#8A6100", background: "#FBF1DE", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                    Low Stock
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    4 hrs ago
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ marginLeft: "auto" }}>
                    <button onClick={v.openStockAdj} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                      Adjust
                    </button>
                  </span>
                </span>
              </div>
              {" "}
              <div className="hv3" style={{ display: "grid", gridTemplateColumns: "1.8fr 1fr .7fr .7fr .8fr .8fr minmax(104px,1.1fr) .9fr 90px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ display: "flex", flexDirection: "column", gap: "3px", minWidth: "0" }}>
                    <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      Sourdough Loaf
                    </span>
                    <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      SK-BAK-0054
                    </span>
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Bakery & Bread
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>0</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>0</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>0</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>min 20</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#A93826", background: "#FAEDEA", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                    Out of Stock
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>1 hr ago</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ marginLeft: "auto" }}>
                    <button onClick={v.openStockAdj} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                      Adjust
                    </button>
                  </span>
                </span>
              </div>
              {" "}
              <div className="hv3" style={{ display: "grid", gridTemplateColumns: "1.8fr 1fr .7fr .7fr .8fr .8fr minmax(104px,1.1fr) .9fr 90px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ display: "flex", flexDirection: "column", gap: "3px", minWidth: "0" }}>
                    <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      Fresh Coriander
                    </span>
                    <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      SK-FRU-0118
                    </span>
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Fresh Produce
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>18</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>4</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>14</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>min 40</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#8A6100", background: "#FBF1DE", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                    Low Stock
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Today</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ marginLeft: "auto" }}>
                    <button onClick={v.openStockAdj} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                      Adjust
                    </button>
                  </span>
                </span>
              </div>
              {" "}
              <div className="hv3" style={{ display: "grid", gridTemplateColumns: "1.8fr 1fr .7fr .7fr .8fr .8fr minmax(104px,1.1fr) .9fr 90px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ display: "flex", flexDirection: "column", gap: "3px", minWidth: "0" }}>
                    <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      Garam Masala 100g
                    </span>
                    <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      SK-SPI-0017
                    </span>
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Spices & Masalas
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>24</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>2</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>22</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>min 40</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#8A6100", background: "#FBF1DE", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                    Low Stock
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Yesterday
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ marginLeft: "auto" }}>
                    <button onClick={v.openStockAdj} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                      Adjust
                    </button>
                  </span>
                </span>
              </div>
              {" "}
              <div className="hv3" style={{ display: "grid", gridTemplateColumns: "1.8fr 1fr .7fr .7fr .8fr .8fr minmax(104px,1.1fr) .9fr 90px", gap: "14px", padding: "13px 16px", borderBottom: "1px solid #EFF1ED", alignItems: "center" }}>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ display: "flex", flexDirection: "column", gap: "3px", minWidth: "0" }}>
                    <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      Full Cream Milk 2L
                    </span>
                    <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      SK-DAI-0002
                    </span>
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Dairy & Refrigerated
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>212</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>18</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>194</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>min 80</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                    In Stock
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Today</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ marginLeft: "auto" }}>
                    <button onClick={v.openStockAdj} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                      Adjust
                    </button>
                  </span>
                </span>
              </div>
              {" "}
              <div className="hv3" style={{ display: "grid", gridTemplateColumns: "1.8fr 1fr .7fr .7fr .8fr .8fr minmax(104px,1.1fr) .9fr 90px", gap: "14px", padding: "13px 16px", alignItems: "center" }}>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ display: "flex", flexDirection: "column", gap: "3px", minWidth: "0" }}>
                    <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      Turmeric Powder 200g
                    </span>
                    <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      SK-SPI-0004
                    </span>
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Spices & Masalas
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "700 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>148</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>6</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>142</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>min 60</span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: "#0B6B33", background: "#E9F6E3", padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap", display: "inline-block" }}>
                    In Stock
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    3 days ago
                  </span>
                </span>
                <span style={{ minWidth: "0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ marginLeft: "auto" }}>
                    <button onClick={v.openStockAdj} style={{ height: "26px", padding: "0 9px", border: "1px solid #E4E7E2", borderRadius: "6px", background: "#fff", font: "600 11px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                      Adjust
                    </button>
                  </span>
                </span>
              </div>
              {" "}
              <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderTop: "1px solid #E4E7E2", background: "#fff" }}>
                <span style={{ font: "400 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>Showing 7 of 42 low-stock items</span>
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
          </>
        )}
      </div>
    </>
  )
}
