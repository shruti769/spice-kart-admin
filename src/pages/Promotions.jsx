import { useMemo, useState } from 'react'
import { useCategoryNames } from '../lib/categories'
import {
  STATUS_PILL, couponStatus, deleteCoupon, discountSummary, minSpendLabel, periodLabel, periodTitle, setCouponActive, typeLabel, useCoupons,
} from '../lib/coupons'

const FONT = 'Inter,system-ui,sans-serif'
const GRID = '1.5fr 1fr 1fr 1fr .9fr .9fr .9fr minmax(84px,.9fr) 120px'
const WEEK_MS = 7 * 24 * 60 * 60 * 1000
// Tab index (v.promoTab) → status filter.
const TAB_STATUS = [null, 'live', 'scheduled', 'paused', 'expired']

const headCell = { font: `600 10.5px/1.2 ${FONT}`, letterSpacing: '.5px', color: '#7C8A81', textTransform: 'uppercase', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }
const cell = { minWidth: '0', display: 'flex', alignItems: 'center', gap: '8px' }
const strong = { font: `600 12.5px/1.2 ${FONT}`, color: '#17201A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }
const muted = { font: `400 11px/1.2 ${FONT}`, color: '#7C8A81', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }
const statCard = { background: '#fff', border: '1px solid #E4E7E2', borderRadius: '10px', padding: '15px 16px', display: 'flex', flexDirection: 'column', gap: '10px' }
const statIcon = { width: '26px', height: '26px', borderRadius: '7px', background: '#F6F7F4', border: '1px solid #E4E7E2', display: 'flex', alignItems: 'center', justifyContent: 'center' }
const statLabel = { font: `500 11.5px/1.2 ${FONT}`, color: '#7C8A81', whiteSpace: 'nowrap' }
const statValue = { font: `700 23px/1.2 ${FONT}`, color: '#17201A', letterSpacing: '-.4px', whiteSpace: 'nowrap' }
const statPill = (fg, bg) => ({ font: `600 10.5px/1.2 ${FONT}`, color: fg, background: bg, padding: '4px 7px', borderRadius: '5px', alignSelf: 'flex-start', whiteSpace: 'nowrap' })
const tabBtn = (fg, bd) => ({ border: '0', background: 'transparent', padding: '0 12px 10px', font: `600 12.5px/1.2 ${FONT}`, color: fg, borderBottom: `2px solid ${bd}`, cursor: 'pointer', whiteSpace: 'nowrap', marginBottom: '-1px' })
const primaryBtn = { display: 'flex', alignItems: 'center', gap: '7px', height: '34px', padding: '0 13px', border: '0', borderRadius: '8px', background: '#0B3D1F', color: '#fff', font: `600 12.5px/1.2 ${FONT}`, cursor: 'pointer', whiteSpace: 'nowrap' }
const smallBtn = { height: '26px', padding: '0 9px', border: '1px solid #E4E7E2', borderRadius: '6px', background: '#fff', font: `600 11px/1.2 ${FONT}`, color: '#17201A', cursor: 'pointer', whiteSpace: 'nowrap' }
const menuItem = { display: 'block', width: '100%', textAlign: 'left', border: '0', background: 'transparent', padding: '8px 12px', font: `500 12px/1.2 ${FONT}`, color: '#17201A', cursor: 'pointer', whiteSpace: 'nowrap' }

const PlusIcon = () => (
  <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: 'none' }}>
    <path d="M10 4.4v11.2M4.4 10h11.2" stroke="#8BE000" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
)

function StatCard({ icon, label, value, note, noteFg = '#7C8A81', noteBg = '#EEF0EC' }) {
  return (
    <div style={statCard}>
      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={statIcon}>{icon}</span>
        <span style={statLabel}>{label}</span>
      </span>
      <span style={statValue}>{value}</span>
      <span style={statPill(noteFg, noteBg)}>{note}</span>
    </div>
  )
}

// A full-width message inside the table (loading, error, empty).
function TableMessage({ title, subtitle, action }) {
  return (
    <div style={{ padding: '38px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', textAlign: 'center' }}>
      <span style={{ font: `600 13.5px/1.2 ${FONT}`, color: '#17201A' }}>{title}</span>
      {subtitle && <span style={{ font: `400 12px/1.4 ${FONT}`, color: '#7C8A81' }}>{subtitle}</span>}
      {action && <span style={{ marginTop: '6px' }}>{action}</span>}
    </div>
  )
}

export default function Promotions({ v }) {
  const coupons = useCoupons()
  const categoryNames = useCategoryNames()
  const [query, setQuery] = useState('')
  // Row "More" menu: { id, top, left } in viewport coordinates (the table clips overflow).
  const [menu, setMenu] = useState(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState(null)
  const [busyId, setBusyId] = useState(null)
  const [now] = useState(() => Date.now())

  const withStatus = useMemo(() => coupons.rows.map((c) => ({ c, status: couponStatus(c, now) })), [coupons.rows, now])
  const liveCount = withStatus.filter((x) => x.status === 'live').length
  const endingSoon = withStatus.filter((x) => x.status === 'live' && x.c.ends_at && new Date(x.c.ends_at).getTime() - now <= WEEK_MS).length
  const total = coupons.rows.length

  const tabStatus = TAB_STATUS[v.promoTab] ?? null
  const q = query.trim().toLowerCase()
  const shown = withStatus.filter(({ c, status }) => (
    (!tabStatus || status === tabStatus)
    && (!q || [c.code, c.title, c.description].some((s) => (s || '').toLowerCase().includes(q)))
  ))

  const closeMenu = () => { setMenu(null); setConfirmDeleteId(null) }
  const openMenu = (e, id) => {
    e.stopPropagation()
    if (menu?.id === id) return closeMenu()
    const r = e.currentTarget.getBoundingClientRect()
    setConfirmDeleteId(null)
    setMenu({ id, top: r.bottom + 4, left: Math.max(8, r.right - 170) })
  }
  const menuCoupon = menu ? coupons.rows.find((c) => c.id === menu.id) : null

  const toggleActive = async (c) => {
    closeMenu()
    if (busyId) return
    setBusyId(c.id)
    try {
      await setCouponActive(c.id, !c.active)
      v.flash(c.active ? `${c.code} paused · hidden from the app` : `${c.code} activated`)
    } catch (e) {
      v.flash(`Could not update ${c.code} · ${e.message}`)
    } finally {
      setBusyId(null)
    }
  }

  const remove = async (c) => {
    if (confirmDeleteId !== c.id) return setConfirmDeleteId(c.id)
    closeMenu()
    setBusyId(c.id)
    try {
      await deleteCoupon(c.id)
      v.flash(`Coupon ${c.code} deleted`)
    } catch (e) {
      v.flash(`Could not delete ${c.code} · ${e.message}`)
    } finally {
      setBusyId(null)
    }
  }

  const createBtn = (
    <button className="hv2" onClick={v.openPromoNew} style={primaryBtn}>
      <PlusIcon />
      Create coupon
    </button>
  )

  let body
  if (coupons.status === 'off') {
    body = <TableMessage title="Supabase isn’t configured" subtitle="Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to .env and restart the dev server." />
  } else if (coupons.status === 'loading' && !total) {
    body = <TableMessage title="Loading coupons…" />
  } else if (coupons.status === 'error' && !total) {
    body = <TableMessage title="Couldn’t load coupons" subtitle={coupons.error} action={<button onClick={coupons.refetch} style={smallBtn}>Retry</button>} />
  } else if (!total) {
    body = <TableMessage title="No coupons yet" subtitle="Create a promo code customers can apply at checkout in the Spice Kart app." action={createBtn} />
  } else if (!shown.length) {
    body = <TableMessage title="No coupons match" subtitle={q ? `Nothing matches “${query.trim()}” in this view.` : 'There are no coupons in this view.'} />
  } else {
    body = shown.map(({ c, status }, i) => {
      const [pillLabel, pillFg, pillBg] = STATUS_PILL[status]
      const last = i === shown.length - 1
      const busy = busyId === c.id
      return (
        <div
          key={c.id}
          className="hv3"
          onClick={() => v.editCoupon(c)}
          style={{ display: 'grid', gridTemplateColumns: GRID, gap: '14px', padding: '13px 16px', borderBottom: last ? '0' : '1px solid #EFF1ED', alignItems: 'center', cursor: 'pointer', opacity: busy ? 0.55 : 1 }}
        >
          <span style={cell}>
            <span style={{ display: 'flex', flexDirection: 'column', gap: '3px', minWidth: '0' }}>
              <span style={strong} title={c.title}>{c.title}</span>
              <span style={muted} title={c.description || undefined}>{c.description || typeLabel(c.discount_type)}</span>
            </span>
          </span>
          <span style={cell}>
            <span style={{ font: `700 11px/1.2 ${FONT}`, letterSpacing: '.8px', color: '#0B3D1F', background: '#F1F9DF', border: '1px dashed #C7E88A', padding: '5px 7px', borderRadius: '5px', whiteSpace: 'nowrap' }}>
              {c.code}
            </span>
          </span>
          <span style={cell}><span style={muted}>{typeLabel(c.discount_type)}</span></span>
          <span style={cell}><span style={strong} title={discountSummary(c)}>{discountSummary(c)}</span></span>
          <span style={cell}><span style={muted}>{minSpendLabel(c)}</span></span>
          <span style={cell}>
            <span style={muted} title={c.category_id ? categoryNames[c.category_id] || c.category_id : 'All products'}>
              {c.category_id ? categoryNames[c.category_id] || c.category_id : 'All products'}
            </span>
          </span>
          <span style={cell}><span style={muted} title={periodTitle(c)}>{periodLabel(c)}</span></span>
          <span style={cell}>
            <span style={{ font: `600 10.5px/1.2 ${FONT}`, color: pillFg, background: pillBg, padding: '5px 8px', borderRadius: '5px', whiteSpace: 'nowrap', display: 'inline-block' }}>
              {pillLabel}
            </span>
          </span>
          <span style={cell}>
            <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button onClick={(e) => { e.stopPropagation(); v.editCoupon(c) }} style={smallBtn}>
                Edit
              </button>
              <button
                onClick={(e) => openMenu(e, c.id)}
                disabled={busy}
                aria-label="More"
                aria-expanded={menu?.id === c.id}
                style={{ width: '26px', height: '26px', border: `1px solid ${menu?.id === c.id ? '#0B3D1F' : '#E4E7E2'}`, borderRadius: '6px', background: menu?.id === c.id ? '#F1F9DF' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: busy ? 'default' : 'pointer' }}
              >
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: 'none' }}>
                  <circle cx="5" cy="10" r="1.3" fill="#7C8A81" />
                  <circle cx="10" cy="10" r="1.3" fill="#7C8A81" />
                  <circle cx="15" cy="10" r="1.3" fill="#7C8A81" />
                </svg>
              </button>
            </span>
          </span>
        </div>
      )
    })
  }

  const tabs = ['All offers', 'Active', 'Scheduled', 'Paused', 'Expired']

  return (
    <>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "18px", padding: "24px 26px 2px" }}>
        <span style={{ display: "flex", flexDirection: "column", gap: "5px", minWidth: "0" }}>
          <span style={{ font: "700 20px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Offers & promotions</span>
          <span style={{ font: "400 12.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>
            {coupons.status === 'ready' || total ? `${liveCount} live · ${total} coupon${total === 1 ? '' : 's'} in total` : 'Promo codes customers apply at checkout'}
          </span>
        </span>
        <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px" }}>
          <span className="sk-input-wrap" style={{ display: "flex", alignItems: "center", gap: "8px", height: "34px", width: "230px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", boxSizing: "border-box" }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
              <circle cx="9" cy="9" r="6" stroke="#7C8A81" strokeWidth="1.6" />
              <path d="M13.4 13.4L18 18" stroke="#7C8A81" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <input
              className="sk-input sk-input-bare"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search offers, promo codes…"
              aria-label="Search coupons"
              style={{ flex: "1", minWidth: "0", height: "32px", border: "0", outline: "none", background: "transparent", padding: "0", font: "400 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A" }}
            />
          </span>
          <button className="hv1" onClick={v.toast_export} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 12px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", color: "#17201A", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
              <path d="M10 3.6v9M6.4 9.2L10 12.8l3.6-3.6M3.6 16.4h12.8" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Export
          </button>
          {createBtn}
        </span>
      </div>
      <div className="ad-scroll" onScroll={menu ? closeMenu : undefined} style={{ flex: "1", minHeight: "0", overflowY: "auto", padding: "20px 26px 30px", display: "flex", flexDirection: "column", gap: "18px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "14px" }}>
          <StatCard
            label="Live coupons"
            value={coupons.status === 'ready' || total ? liveCount : '—'}
            note={endingSoon ? `${endingSoon} ending this week` : 'None ending this week'}
            icon={(
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                <path d="M10.5 3.2H16a.8.8 0 01.8.8v5.5a1.4 1.4 0 01-.41.99l-6.4 6.4a1.4 1.4 0 01-1.98 0l-4.7-4.7a1.4 1.4 0 010-1.98l6.4-6.4a1.4 1.4 0 01.79-.61z" stroke="#4A564E" strokeWidth="1.5" strokeLinejoin="round" />
                <circle cx="13.3" cy="6.7" r="1.15" stroke="#4A564E" strokeWidth="1.4" />
              </svg>
            )}
          />
          <StatCard
            label="Redemptions (30d)"
            value="—"
            note="Needs order data"
            icon={(
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#4A564E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          />
          <StatCard
            label="Discount given"
            value="—"
            note="Needs order data"
            icon={(
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                <circle cx="10" cy="10" r="7.2" stroke="#4A564E" strokeWidth="1.5" />
                <path d="M10 5.6v8.8" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M12.3 7.9c0-1.05-1.03-1.75-2.3-1.75s-2.3.7-2.3 1.75 1.03 1.55 2.3 1.85 2.3.8 2.3 1.85-1.03 1.75-2.3 1.75-2.3-.7-2.3-1.75" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            )}
          />
          <StatCard
            label="Avg order uplift"
            value="—"
            note="Needs order data"
            icon={(
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                <path d="M3.4 3.4v12.2a1 1 0 001 1h12.2" stroke="#4A564E" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M6.8 13.2l3-3.4 2.4 2.2 3.6-4.4" stroke="#4A564E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          />
        </div>
        <div className="ad-scroll" style={{ display: "flex", gap: "2px", borderBottom: "1px solid #E4E7E2", overflowX: "auto" }}>
          {tabs.map((label, i) => (
            <button key={label} onClick={v[`tb_promo_${i}`]} style={tabBtn(v[`tb_promo_${i}Fg`], v[`tb_promo_${i}Bd`])}>
              {label}
            </button>
          ))}
        </div>
        <div style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", overflow: "hidden", flex: "none" }}>
          <div style={{ display: "grid", gridTemplateColumns: GRID, gap: "14px", padding: "11px 16px", background: "#F6F7F4", borderBottom: "1px solid #E4E7E2" }}>
            {['Offer', 'Code', 'Type', 'Discount', 'Min order', 'Applies to', 'Period', 'Status', 'Actions'].map((h) => (
              <span key={h} style={headCell}>{h}</span>
            ))}
          </div>
          {body}
          {total > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderTop: "1px solid #E4E7E2", background: "#fff" }}>
              <span style={{ font: "400 11.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>
                Showing {shown.length} of {total} coupon{total === 1 ? '' : 's'}
              </span>
              {coupons.status === 'error' && (
                <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px', font: `500 11.5px/1.2 ${FONT}`, color: '#A93826' }}>
                  Couldn’t refresh · {coupons.error}
                  <button onClick={coupons.refetch} style={smallBtn}>Retry</button>
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      {menu && menuCoupon && (
        <>
          <div onClick={closeMenu} style={{ position: 'fixed', inset: '0', zIndex: 40 }} />
          <div role="menu" style={{ position: 'fixed', top: `${menu.top}px`, left: `${menu.left}px`, width: '170px', zIndex: 41, background: '#fff', border: '1px solid #E4E7E2', borderRadius: '8px', boxShadow: '0 8px 24px rgba(23,32,26,.12)', padding: '4px 0' }}>
            <button role="menuitem" className="hv3" style={menuItem} onClick={() => { closeMenu(); v.editCoupon(menuCoupon) }}>Edit coupon</button>
            <button role="menuitem" className="hv3" style={menuItem} onClick={() => toggleActive(menuCoupon)}>
              {menuCoupon.active ? 'Pause (hide from app)' : 'Activate'}
            </button>
            <button
              role="menuitem"
              className="hv3"
              style={{ ...menuItem, color: '#B3402F', fontWeight: confirmDeleteId === menuCoupon.id ? 700 : 500 }}
              onClick={() => remove(menuCoupon)}
            >
              {confirmDeleteId === menuCoupon.id ? 'Click again to delete' : 'Delete coupon'}
            </button>
          </div>
        </>
      )}
    </>
  )
}
