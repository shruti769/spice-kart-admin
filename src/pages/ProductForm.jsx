import imgBasmatiRice from '../assets/images/basmati-rice.jpg'
import imgInstantReadyToEat from '../assets/images/instant-ready-to-eat.jpg'
import imgSpicesMasalas from '../assets/images/spices-masalas.jpg'

export default function ProductForm({ v }) {
  return (
    <>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "18px", padding: "24px 26px 2px" }}>
        <span style={{ display: "flex", flexDirection: "column", gap: "5px", minWidth: "0" }}>
          <span style={{ font: "700 20px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>{v.formTitle}</span>
          <span style={{ font: "400 12.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>{v.formSub}</span>
        </span>
        <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px" }}>
          <button className="hv1" onClick={v.nav_products} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 12px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", color: "#17201A", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
            Discard
          </button>
          {v.isAddMode && (
            <>
              <button className="hv1" onClick={v.saveAndAdd} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 12px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", color: "#17201A", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
                Save & add another
              </button>
            </>
          )}
          <button className="hv2" onClick={v.saveProduct} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 13px", border: "0", borderRadius: "8px", background: "#0B3D1F", color: "#fff", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
              <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#8BE000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {v.formCta}
          </button>
        </span>
      </div>
      <div className="ad-scroll" style={{ flex: "1", minHeight: "0", overflowY: "auto", padding: "20px 26px 30px", display: "flex", flexDirection: "column", gap: "18px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.7fr 1fr", gap: "18px", alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "18px", display: "flex", flexDirection: "column", gap: "14px" }}>
              <span style={{ font: "600 13.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Basic information</span>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "11px" }}>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    PRODUCT NAME
                  </span>
                  <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Basmati Rice 5kg
                  </span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    SKU
                  </span>
                  <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    SK-PAN-0142
                  </span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    BARCODE
                  </span>
                  <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    9 312345 678907
                  </span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    BRAND
                  </span>
                  <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Pantry Co
                  </span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    CATEGORY
                  </span>
                  <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Grains, Rice & Cereals
                  </span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    SUBCATEGORY
                  </span>
                  <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Rice & grains
                  </span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px", gridColumn: "span 2" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    DESCRIPTION
                  </span>
                  <span style={{ display: "block", minHeight: "64px", padding: "10px 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "400 12.5px/1.6 Inter,system-ui,sans-serif", color: "#4A564E" }}>
                    Long-grain aged basmati rice, sourced from Punjab. Fluffy texture, ideal for biryani and pilaf.
                  </span>
                </span>
              </div>
            </div>
            <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "18px", display: "flex", flexDirection: "column", gap: "14px" }}>
              <span style={{ font: "600 13.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Pricing</span>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "11px" }}>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    SELLING PRICE (AUD)
                  </span>
                  <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    $24.50
                  </span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    COMPARE-AT PRICE
                  </span>
                  <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    $28.00
                  </span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    COST PRICE
                  </span>
                  <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    $17.20
                  </span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    GST
                  </span>
                  <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    10% included
                  </span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    DISCOUNT
                  </span>
                  <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    12% off
                  </span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    MARGIN
                  </span>
                  <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    29.8%
                  </span>
                </span>
              </div>
            </div>
            <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "18px", display: "flex", flexDirection: "column", gap: "14px" }}>
              <span style={{ font: "600 13.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Inventory</span>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "11px" }}>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    STOCK QUANTITY
                  </span>
                  <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    6
                  </span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    MINIMUM LEVEL
                  </span>
                  <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    25
                  </span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    MAXIMUM LEVEL
                  </span>
                  <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    400
                  </span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    WAREHOUSE
                  </span>
                  <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Collingwood DC
                  </span>
                </span>
              </div>
            </div>
            <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "18px", display: "flex", flexDirection: "column", gap: "14px" }}>
              <span style={{ font: "600 13.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Product information</span>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "11px" }}>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    WEIGHT
                  </span>
                  <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    5 kg
                  </span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    UNIT
                  </span>
                  <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Bag
                  </span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    SIZE
                  </span>
                  <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    5kg
                  </span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    COUNTRY OF ORIGIN
                  </span>
                  <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    India
                  </span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px", gridColumn: "span 2" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    INGREDIENTS
                  </span>
                  <span style={{ display: "block", minHeight: "64px", padding: "10px 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "400 12.5px/1.6 Inter,system-ui,sans-serif", color: "#4A564E" }}>
                    100% aged basmati rice.
                  </span>
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px", gridColumn: "span 2" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    STORAGE
                  </span>
                  <span style={{ display: "block", minHeight: "64px", padding: "10px 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "400 12.5px/1.6 Inter,system-ui,sans-serif", color: "#4A564E" }}>
                    Store in a cool, dry place away from direct sunlight.
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "18px", display: "flex", flexDirection: "column", gap: "13px" }}>
              <span style={{ font: "600 13.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A" }}>Product images</span>
              <span style={{ position: "relative", height: "150px", borderRadius: "9px", overflow: "hidden", border: "1px solid #E4E7E2", background: "#F6F7F4", display: "block" }}>
                {" "}
                <img src={imgBasmatiRice} alt="" loading="lazy" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
                {" "}
                <span style={{ position: "absolute", top: "8px", left: "8px", font: "600 9.5px/1.2 Inter,system-ui,sans-serif", color: "#0B3D1F", background: "#8BE000", padding: "4px 6px", borderRadius: "4px" }}>
                  MAIN
                </span>
                {" "}
              </span>
              <span style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
                <span style={{ position: "relative", height: "56px", borderRadius: "8px", overflow: "hidden", border: "1px solid #E4E7E2", background: "#F6F7F4", display: "block" }}>
                  <img src={imgInstantReadyToEat} alt="" loading="lazy" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
                </span>
                <span style={{ position: "relative", height: "56px", borderRadius: "8px", overflow: "hidden", border: "1px solid #E4E7E2", background: "#F6F7F4", display: "block" }}>
                  <img src={imgSpicesMasalas} alt="" loading="lazy" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
                </span>
                <span style={{ height: "56px", borderRadius: "8px", border: "1px dashed #C7C7C1", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <path d="M10 4.4v11.2M4.4 10h11.2" stroke="#7C8A81" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </span>
              </span>
            </div>
            <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "18px", display: "flex", flexDirection: "column", gap: "13px" }}>
              <span style={{ font: "600 13.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A" }}>Attributes</span>
              <span style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
                <button onClick={v.cha_0} style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: v.cha_0Fg, background: v.cha_0Bg, border: `1px solid ${v.cha_0Bd}`, padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap", cursor: "pointer" }}>
                  Vegetarian
                </button>
                <button onClick={v.cha_1} style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: v.cha_1Fg, background: v.cha_1Bg, border: `1px solid ${v.cha_1Bd}`, padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap", cursor: "pointer" }}>
                  Vegan
                </button>
                <button onClick={v.cha_2} style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: v.cha_2Fg, background: v.cha_2Bg, border: `1px solid ${v.cha_2Bd}`, padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap", cursor: "pointer" }}>
                  Gluten Free
                </button>
                <button onClick={v.cha_3} style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: v.cha_3Fg, background: v.cha_3Bg, border: `1px solid ${v.cha_3Bd}`, padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap", cursor: "pointer" }}>
                  Organic
                </button>
                <button onClick={v.cha_4} style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: v.cha_4Fg, background: v.cha_4Bg, border: `1px solid ${v.cha_4Bd}`, padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap", cursor: "pointer" }}>
                  Halal
                </button>
                <button onClick={v.cha_5} style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: v.cha_5Fg, background: v.cha_5Bg, border: `1px solid ${v.cha_5Bd}`, padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap", cursor: "pointer" }}>
                  Imported
                </button>
                <button onClick={v.cha_6} style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: v.cha_6Fg, background: v.cha_6Bg, border: `1px solid ${v.cha_6Bd}`, padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap", cursor: "pointer" }}>
                  Frozen Foods & Vegetables
                </button>
                <button onClick={v.cha_7} style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: v.cha_7Fg, background: v.cha_7Bg, border: `1px solid ${v.cha_7Bd}`, padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap", cursor: "pointer" }}>
                  Bestseller
                </button>
              </span>
            </div>
            <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "18px", display: "flex", flexDirection: "column", gap: "2px" }}>
              <span style={{ font: "600 13.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", paddingBottom: "6px" }}>Delivery & visibility</span>
              <span style={{ display: "flex", alignItems: "center", gap: "11px", padding: "10px 0", borderBottom: "1px solid #EFF1ED" }}>
                <span style={{ display: "flex", flexDirection: "column", gap: "3px", flex: "1", minWidth: "0" }}>
                  <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Express delivery</span>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81" }}>Available for 25-minute delivery</span>
                </span>
                <span style={{ width: "38px", height: "22px", borderRadius: "11px", background: "#8BE000", position: "relative", flex: "none", display: "block" }}>
                  {" "}
                  <span style={{ position: "absolute", top: "2.5px", left: "18px", width: "17px", height: "17px", borderRadius: "9px", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,.2)", display: "block" }} />
                  {" "}
                </span>
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "11px", padding: "10px 0", borderBottom: "1px solid #EFF1ED" }}>
                <span style={{ display: "flex", flexDirection: "column", gap: "3px", flex: "1", minWidth: "0" }}>
                  <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Scheduled delivery</span>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81" }}>Available in booked windows</span>
                </span>
                <span style={{ width: "38px", height: "22px", borderRadius: "11px", background: "#8BE000", position: "relative", flex: "none", display: "block" }}>
                  {" "}
                  <span style={{ position: "absolute", top: "2.5px", left: "18px", width: "17px", height: "17px", borderRadius: "9px", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,.2)", display: "block" }} />
                  {" "}
                </span>
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "11px", padding: "10px 0", borderBottom: "1px solid #EFF1ED" }}>
                <span style={{ display: "flex", flexDirection: "column", gap: "3px", flex: "1", minWidth: "0" }}>
                  <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Track inventory</span>
                </span>
                <span style={{ width: "38px", height: "22px", borderRadius: "11px", background: "#8BE000", position: "relative", flex: "none", display: "block" }}>
                  {" "}
                  <span style={{ position: "absolute", top: "2.5px", left: "18px", width: "17px", height: "17px", borderRadius: "9px", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,.2)", display: "block" }} />
                  {" "}
                </span>
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "11px", padding: "10px 0", borderBottom: "1px solid #EFF1ED" }}>
                <span style={{ display: "flex", flexDirection: "column", gap: "3px", flex: "1", minWidth: "0" }}>
                  <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Publish immediately</span>
                  <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81" }}>Otherwise saved as draft</span>
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
