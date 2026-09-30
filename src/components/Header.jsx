import GlobalSearch from './GlobalSearch'
import { useUnreadAlerts } from '../lib/notifications'
import { useStore } from '../lib/stores'

/** The store customers order from; opens Settings → General, where it's added and edited. */
function StoreBadge({ v }) {
  const { store, status } = useStore()
  const missing = status === 'ready' && !store
  return (
    <button className="r-hide-sm" onClick={v.nav_settings} title={missing ? 'Add your store in Settings' : 'Store details in Settings'} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 11px", border: `1px solid ${missing ? '#F0D9A8' : '#E4E7E2'}`, borderRadius: "8px", background: missing ? '#FBF1DE' : '#fff', cursor: "pointer", flex: "none" }}>
      <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
        <path d="M10 17.5s5.4-4.7 5.4-8.6A5.4 5.4 0 004.6 8.9c0 3.9 5.4 8.6 5.4 8.6z" stroke={missing ? '#8A6100' : '#4A564E'} strokeWidth="1.5" />
        <circle cx="10" cy="8.6" r="1.9" stroke={missing ? '#8A6100' : '#4A564E'} strokeWidth="1.5" />
      </svg>
      <span style={{ font: "600 12px/1.2 Inter,system-ui,sans-serif", color: missing ? '#8A6100' : '#17201A', whiteSpace: "nowrap", maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis" }}>
        {store?.name ?? (missing ? 'Add your store' : status === 'error' ? 'Store not set up' : '…')}
      </span>
    </button>
  )
}

/** Live count of unread, unresolved admin alerts (hidden at zero). */
function BellBadge() {
  const n = useUnreadAlerts().data?.total ?? 0
  if (!n) return null
  return (
    <span style={{ position: "absolute", top: "-4px", right: "-4px", minWidth: "16px", height: "16px", padding: "0 4px", borderRadius: "8px", background: "#C4452F", color: "#fff", font: "700 9px/1.2 Inter,system-ui,sans-serif", lineHeight: "16px", textAlign: "center" }}>
      {n > 99 ? '99+' : n}
    </span>
  )
}

export default function Header({ v, onMenu }) {
  const { store } = useStore()
  // Help: the store's support contact from Settings → General (or a pointer to add one).
  const help = () => {
    const contact = [store?.support_email, store?.support_phone].filter(Boolean).join(' · ')
    if (contact) v.flash(`Support: ${contact}`)
    else { v.flash('Add a support email or phone in Settings → General'); v.nav_settings() }
  }
  return (
    <>
      <header className="sk-header" style={{ flex: "none", height: "60px", background: "#fff", borderBottom: "1px solid #E4E7E2", display: "flex", alignItems: "center", gap: "14px", padding: "0 26px" }}>
        <button className="sk-menu-btn" onClick={onMenu} aria-label="Open menu" style={{ width: "34px", height: "34px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", alignItems: "center", justifyContent: "center", cursor: "pointer", flex: "none", padding: "0" }}>
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
            <path d="M3.6 5.6h12.8M3.6 10h12.8M3.6 14.4h12.8" stroke="#4A564E" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
        <GlobalSearch v={v} placeholder="Search orders, customers, products, drivers…" width="300px" background="#F6F7F4" />
        <StoreBadge v={v} />
        <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px" }}>
          <button onClick={help} aria-label="Help" title="Store support contact" style={{ width: "34px", height: "34px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
              <circle cx="10" cy="10" r="7.2" stroke="#4A564E" strokeWidth="1.5" />
              <path d="M8.1 8a1.9 1.9 0 013.8.3c0 1.3-1.9 1.5-1.9 2.9" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="10" cy="14" r=".9" fill="#4A564E" />
            </svg>
          </button>
          <button onClick={v.toast_notif} aria-label="Notifications" style={{ position: "relative", width: "34px", height: "34px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
              <path d="M6 8.8a4 4 0 118 0v2.9l1.32 2.14a.6.6 0 01-.51.91H5.19a.6.6 0 01-.51-.91L6 11.7V8.8z" stroke="#4A564E" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M8.4 16.4a1.7 1.7 0 003.2 0" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <BellBadge />
          </button>
          <span className="r-hide-sm" style={{ width: "1px", height: "24px", background: "#E4E7E2" }} />
          <span style={{ display: "flex", alignItems: "center", gap: "9px" }}>
            <span style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#0B3D1F", display: "flex", alignItems: "center", justifyContent: "center", font: "700 11.5px/1.2 Inter,system-ui,sans-serif", color: "#8BE000" }}>
              {v.userInitials}
            </span>
            <span className="r-hide-sm" style={{ display: "flex", flexDirection: "column", gap: "2px", maxWidth: "180px" }}>
              <span style={{ font: "600 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{v.userName}</span>
              <span style={{ font: "400 10px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>{v.userRole}</span>
            </span>
          </span>
        </span>
      </header>
    </>
  )
}
