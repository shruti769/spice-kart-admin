import imgSpiceKartLogo from '../assets/images/spice-kart-logo.png'

export default function Sidebar({ v }) {
  return (
    <>
      <aside style={{ width: "236px", flex: "none", background: "#0B3D1F", display: "flex", flexDirection: "column", padding: "18px 13px 14px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "9px", padding: "0 4px 16px" }}>
          <img src={imgSpiceKartLogo} alt="Spice Kart" style={{ width: "30px", height: "30px", borderRadius: "8px" }} />
          <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <span style={{ font: "700 13.5px/1.2 Inter,system-ui,sans-serif", color: "#fff", whiteSpace: "nowrap" }}>Spice Kart</span>
            <span style={{ font: "500 9.5px/1.2 Inter,system-ui,sans-serif", color: "rgba(255,255,255,.5)", letterSpacing: ".5px", whiteSpace: "nowrap" }}>OPERATIONS</span>
          </span>
        </div>
        <nav className="sk-nav" style={{ display: "flex", flexDirection: "column", gap: "2px", flex: "1", minHeight: "0", overflowY: "auto", overflowX: "hidden" }}>
          <span style={{ display: "block", font: "700 9.5px/1 Inter,system-ui", letterSpacing: ".9px", color: "rgba(255,255,255,.34)", padding: "14px 10px 7px", whiteSpace: "nowrap" }}>
            OVERVIEW
          </span>
          <button className="hv9" onClick={v.nav_dash} style={{ display: "flex", alignItems: "center", gap: "10px", width: "100%", border: "0", background: v.navBg_dash, color: v.navFg_dash, borderRadius: "8px", padding: "0 10px", height: "37px", cursor: "pointer", textAlign: "left", position: "relative" }}>
            <span style={{ display: "flex", width: "17px", flex: "none" }}>
              <svg width="17" height="17" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                <rect x="3.2" y="3.2" width="6" height="7.4" rx="1.6" stroke="currentColor" strokeWidth="1.5" />
                <rect x="11" y="3.2" width="5.8" height="4.4" rx="1.6" stroke="currentColor" strokeWidth="1.5" />
                <rect x="3.2" y="13" width="6" height="3.8" rx="1.6" stroke="currentColor" strokeWidth="1.5" />
                <rect x="11" y="10" width="5.8" height="6.8" rx="1.6" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </span>
            <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Dashboard</span>
          </button>
          <button className="hv9" onClick={v.nav_analytics} style={{ display: "flex", alignItems: "center", gap: "10px", width: "100%", border: "0", background: v.navBg_analytics, color: v.navFg_analytics, borderRadius: "8px", padding: "0 10px", height: "37px", cursor: "pointer", textAlign: "left", position: "relative" }}>
            <span style={{ display: "flex", width: "17px", flex: "none" }}>
              <svg width="17" height="17" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                <path d="M3.4 3.4v12.2a1 1 0 001 1h12.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M6.8 13.2l3-3.4 2.4 2.2 3.6-4.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Analytics</span>
          </button>
          <span style={{ display: "block", font: "700 9.5px/1 Inter,system-ui", letterSpacing: ".9px", color: "rgba(255,255,255,.34)", padding: "14px 10px 7px", whiteSpace: "nowrap" }}>
            OPERATIONS
          </span>
          <button className="hv9" onClick={v.nav_orders} style={{ display: "flex", alignItems: "center", gap: "10px", width: "100%", border: "0", background: v.navBg_orders, color: v.navFg_orders, borderRadius: "8px", padding: "0 10px", height: "37px", cursor: "pointer", textAlign: "left", position: "relative" }}>
            <span style={{ display: "flex", width: "17px", flex: "none" }}>
              <svg width="17" height="17" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                <rect x="4.4" y="4.2" width="11.2" height="12.4" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M7.8 4.2v-.8a1 1 0 011-1h2.4a1 1 0 011 1v.8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M7.4 8.8h5.2M7.4 11.4h5.2M7.4 14h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
            <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Orders</span>
          </button>
          <button className="hv9" onClick={v.nav_del} style={{ display: "flex", alignItems: "center", gap: "10px", width: "100%", border: "0", background: v.navBg_del, color: v.navFg_del, borderRadius: "8px", padding: "0 10px", height: "37px", cursor: "pointer", textAlign: "left", position: "relative" }}>
            <span style={{ display: "flex", width: "17px", flex: "none" }}>
              <svg width="17" height="17" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                <rect x="2.2" y="5.8" width="8.6" height="8" rx="1.4" stroke="currentColor" strokeWidth="1.5" />
                <path d="M10.8 8.6h3.3a1.4 1.4 0 011.03.45l1.5 1.63a1.4 1.4 0 01.37.95v2.17h-6.2V8.6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <circle cx="6" cy="15.6" r="1.5" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="14" cy="15.6" r="1.5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </span>
            <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Delivery</span>
          </button>
          <button className="hv9" onClick={v.nav_catalogue} style={{ display: "flex", alignItems: "center", gap: "10px", width: "100%", border: "0", background: v.navBg_catalogue, color: v.navFg_catalogue, borderRadius: "8px", padding: "0 10px", height: "37px", cursor: "pointer", textAlign: "left", position: "relative" }}>
            <span style={{ display: "flex", width: "17px", flex: "none" }}>
              <svg width="17" height="17" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                <path d="M3.4 6.6L10 3.3l6.6 3.3L10 9.9 3.4 6.6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M3.4 6.6v6.8L10 16.7l6.6-3.3V6.6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M10 9.9v6.8" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </span>
            <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Catalogue</span>
          </button>
          <span style={{ display: "block", font: "700 9.5px/1 Inter,system-ui", letterSpacing: ".9px", color: "rgba(255,255,255,.34)", padding: "14px 10px 7px", whiteSpace: "nowrap" }}>
            CUSTOMERS
          </span>
          <button className="hv9" onClick={v.nav_cust} style={{ display: "flex", alignItems: "center", gap: "10px", width: "100%", border: "0", background: v.navBg_cust, color: v.navFg_cust, borderRadius: "8px", padding: "0 10px", height: "37px", cursor: "pointer", textAlign: "left", position: "relative" }}>
            <span style={{ display: "flex", width: "17px", flex: "none" }}>
              <svg width="17" height="17" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                <circle cx="8.4" cy="7.4" r="2.8" stroke="currentColor" strokeWidth="1.5" />
                <path d="M3.4 16.5c.8-2.9 2.6-4.3 5-4.3s4.2 1.4 5 4.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M14 5.3a2.6 2.6 0 010 4.8M15.5 16.5c-.3-1.8-.9-3.1-1.8-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
            <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Customers</span>
          </button>
          <button className="hv9" onClick={v.nav_rev} style={{ display: "flex", alignItems: "center", gap: "10px", width: "100%", border: "0", background: v.navBg_rev, color: v.navFg_rev, borderRadius: "8px", padding: "0 10px", height: "37px", cursor: "pointer", textAlign: "left", position: "relative" }}>
            <span style={{ display: "flex", width: "17px", flex: "none" }}>
              <svg width="17" height="17" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                <path d="M10 3.2l2.1 4.3 4.7.7-3.4 3.3.8 4.7L10 14l-4.2 2.2.8-4.7L3.2 8.2l4.7-.7L10 3.2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
            </span>
            <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Reviews</span>
          </button>
          <span style={{ display: "block", font: "700 9.5px/1 Inter,system-ui", letterSpacing: ".9px", color: "rgba(255,255,255,.34)", padding: "14px 10px 7px", whiteSpace: "nowrap" }}>
            GROWTH
          </span>
          <button className="hv9" onClick={v.nav_promo} style={{ display: "flex", alignItems: "center", gap: "10px", width: "100%", border: "0", background: v.navBg_promo, color: v.navFg_promo, borderRadius: "8px", padding: "0 10px", height: "37px", cursor: "pointer", textAlign: "left", position: "relative" }}>
            <span style={{ display: "flex", width: "17px", flex: "none" }}>
              <svg width="17" height="17" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                <path d="M10.5 3.2H16a.8.8 0 01.8.8v5.5a1.4 1.4 0 01-.41.99l-6.4 6.4a1.4 1.4 0 01-1.98 0l-4.7-4.7a1.4 1.4 0 010-1.98l6.4-6.4a1.4 1.4 0 01.79-.61z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <circle cx="13.3" cy="6.7" r="1.15" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </span>
            <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Offers & Promotions</span>
          </button>
          <button className="hv9" onClick={v.nav_content} style={{ display: "flex", alignItems: "center", gap: "10px", width: "100%", border: "0", background: v.navBg_content, color: v.navFg_content, borderRadius: "8px", padding: "0 10px", height: "37px", cursor: "pointer", textAlign: "left", position: "relative" }}>
            <span style={{ display: "flex", width: "17px", flex: "none" }}>
              <svg width="17" height="17" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                <rect x="2.8" y="4.2" width="14.4" height="11.6" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="7.4" cy="8.4" r="1.4" stroke="currentColor" strokeWidth="1.4" />
                <path d="M3.4 13.8l4-3.4 4.6 4 2.2-1.8 3.2 2.6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
            </span>
            <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Content</span>
          </button>
          <span style={{ display: "block", font: "700 9.5px/1 Inter,system-ui", letterSpacing: ".9px", color: "rgba(255,255,255,.34)", padding: "14px 10px 7px", whiteSpace: "nowrap" }}>
            FINANCE
          </span>
          <button className="hv9" onClick={v.nav_pay} style={{ display: "flex", alignItems: "center", gap: "10px", width: "100%", border: "0", background: v.navBg_pay, color: v.navFg_pay, borderRadius: "8px", padding: "0 10px", height: "37px", cursor: "pointer", textAlign: "left", position: "relative" }}>
            <span style={{ display: "flex", width: "17px", flex: "none" }}>
              <svg width="17" height="17" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                <rect x="2.6" y="4.8" width="14.8" height="10.4" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M2.6 8.4h14.8" stroke="currentColor" strokeWidth="1.5" />
                <path d="M5.4 12.4h2.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
            <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Payments</span>
          </button>
          <span style={{ display: "block", font: "700 9.5px/1 Inter,system-ui", letterSpacing: ".9px", color: "rgba(255,255,255,.34)", padding: "14px 10px 7px", whiteSpace: "nowrap" }}>
            ADMIN
          </span>
          <button className="hv9" onClick={v.nav_staff} style={{ display: "flex", alignItems: "center", gap: "10px", width: "100%", border: "0", background: v.navBg_staff, color: v.navFg_staff, borderRadius: "8px", padding: "0 10px", height: "37px", cursor: "pointer", textAlign: "left", position: "relative" }}>
            <span style={{ display: "flex", width: "17px", flex: "none" }}>
              <svg width="17" height="17" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                <circle cx="7.8" cy="7.2" r="2.8" stroke="currentColor" strokeWidth="1.5" />
                <path d="M3 16.4c.7-2.8 2.5-4.2 4.8-4.2s4.1 1.4 4.8 4.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M13.2 9.6l1.6 1.6 3.2-3.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Staff & Admins</span>
          </button>
          <button className="hv9" onClick={v.nav_settings} style={{ display: "flex", alignItems: "center", gap: "10px", width: "100%", border: "0", background: v.navBg_settings, color: v.navFg_settings, borderRadius: "8px", padding: "0 10px", height: "37px", cursor: "pointer", textAlign: "left", position: "relative" }}>
            <span style={{ display: "flex", width: "17px", flex: "none" }}>
              <svg width="17" height="17" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                <path d="M3.8 6.2h12.4M3.8 13.8h12.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="8" cy="6.2" r="2.1" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="13" cy="13.8" r="2.1" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </span>
            <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Settings</span>
          </button>
        </nav>
        <div style={{ borderTop: "1px solid rgba(255,255,255,.1)", paddingTop: "10px", marginTop: "10px", display: "flex", alignItems: "center", gap: "9px" }}>
          <span style={{ width: "30px", height: "30px", borderRadius: "8px", background: "#8BE000", display: "flex", alignItems: "center", justifyContent: "center", font: "700 11px/1.2 Inter,system-ui,sans-serif", color: "#0B3D1F", flex: "none" }}>
            {v.userInitials}
          </span>
          <span style={{ display: "flex", flexDirection: "column", gap: "2px", minWidth: "0", flex: "1" }}>
            <span style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{v.userName}</span>
            <span style={{ font: "400 10px/1.2 Inter,system-ui,sans-serif", color: "rgba(255,255,255,.5)", whiteSpace: "nowrap" }}>Super Admin</span>
          </span>
          <button onClick={v.logout} aria-label="Log out" style={{ width: "26px", height: "26px", border: "0", borderRadius: "7px", background: "rgba(255,255,255,.08)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flex: "none" }}>
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
              <path d="M12 6.2V4.4a1.4 1.4 0 00-1.4-1.4H4.8a1.4 1.4 0 00-1.4 1.4v11.2a1.4 1.4 0 001.4 1.4h5.8a1.4 1.4 0 001.4-1.4v-1.8" stroke="rgba(255,255,255,.75)" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M8.6 10h8.2M14.2 7.2L17 10l-2.8 2.8" stroke="rgba(255,255,255,.75)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </aside>
    </>
  )
}
