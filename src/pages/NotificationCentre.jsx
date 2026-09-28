import { useEffect, useMemo, useState } from 'react'
import { ALERT_CATEGORIES, dayGroup, markAlertRead, markAllAlertsRead, timeAgo, useAlerts, useAttentionCounts, useUnreadAlerts } from '../lib/notifications'

const FONT = 'Inter,system-ui,sans-serif'
const INK = '#17201A'
const MUTED = '#7C8A81'
const BORDER = '#E4E7E2'
const PAGE = 30

const btn = { display: 'flex', alignItems: 'center', gap: '7px', height: '34px', padding: '0 12px', border: `1px solid ${BORDER}`, borderRadius: '8px', background: '#fff', color: INK, font: `600 12.5px/1.2 ${FONT}`, cursor: 'pointer', whiteSpace: 'nowrap' }
const smallBtn = { height: '28px', padding: '0 10px', border: `1px solid ${BORDER}`, borderRadius: '7px', background: '#fff', color: INK, font: `600 11.5px/1.2 ${FONT}`, cursor: 'pointer', whiteSpace: 'nowrap' }

/** [fg, bg] per severity. */
const SEVERITY = {
  critical: ['#A93826', '#FAEDEA'],
  warning: ['#8A6100', '#FBF1DE'],
  info: ['#2F4F9E', '#EEF2FB'],
}
const CATEGORY_ICON = {
  operations: 'M3.5 12.5V7.8l6.5-4 6.5 4v4.7M6.5 16.5v-5h7v5',
  inventory: 'M3.8 6.7L10 3.6l6.2 3.1v6.6L10 16.4l-6.2-3.1V6.7zM3.8 6.7L10 9.8l6.2-3.1M10 9.8v6.6',
  payments: 'M3.2 6h13.6v8.4H3.2zM3.2 8.8h13.6',
  reviews: 'M10 3.6l1.9 4 4.3.5-3.2 2.9.9 4.3L10 13.1l-3.9 2.2.9-4.3-3.2-2.9 4.3-.5z',
  system: 'M10 6.8a3.2 3.2 0 110 6.4 3.2 3.2 0 010-6.4zM10 2.8v2M10 15.2v2M2.8 10h2M15.2 10h2',
}

function StatTile({ label, value, note, tone = SEVERITY.info }) {
  return (
    <div style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '10px', padding: '15px 16px', display: 'flex', flexDirection: 'column', gap: '9px' }}>
      <span style={{ font: `500 11.5px/1.2 ${FONT}`, color: MUTED }}>{label}</span>
      <span style={{ font: `700 23px/1.2 ${FONT}`, color: INK, letterSpacing: '-.4px' }}>{value}</span>
      {note && <span style={{ font: `600 10.5px/1.2 ${FONT}`, color: tone[0], background: tone[1], padding: '4px 7px', borderRadius: '5px', alignSelf: 'flex-start', whiteSpace: 'nowrap' }}>{note}</span>}
    </div>
  )
}

export default function NotificationCentre({ v }) {
  const [limit, setLimit] = useState(PAGE)
  const [cat, setCat] = useState('all')
  const [showResolved, setShowResolved] = useState(false)
  const [busy, setBusy] = useState(null)
  const alerts = useAlerts(limit)
  const unread = useUnreadAlerts()
  const attention = useAttentionCounts()
  // Re-render every minute so "5 min ago" stays current.
  const [, tick] = useState(0)
  useEffect(() => {
    const t = setInterval(() => tick((n) => n + 1), 60000)
    return () => clearInterval(t)
  }, [])

  const go = {
    del: v.nav_del, inv: v.nav_inv, orders: v.nav_orders, pay: v.nav_pay, refunds: v.nav_refunds, rev: v.nav_rev,
    promo: v.nav_promo, notif: v.nav_notif, settings: v.nav_settings,
  }
  const rows = useMemo(() => (alerts.data ?? []).filter((a) => (cat === 'all' || a.category === cat) && (showResolved || !a.resolved_at)), [alerts.data, cat, showResolved])
  const groups = useMemo(() => {
    const out = []
    for (const a of rows) {
      const g = dayGroup(a.updated_at ?? a.created_at)
      if (!out.length || out[out.length - 1][0] !== g) out.push([g, []])
      out[out.length - 1][1].push(a)
    }
    return out
  }, [rows])

  const u = unread.data ?? { total: 0, byCategory: {}, critical: 0, oldest: null }
  const resolvedToday = (alerts.data ?? []).filter((a) => a.resolved_at && dayGroup(a.resolved_at) === 'Today').length

  const markOne = async (a) => {
    setBusy(a.id)
    try { await markAlertRead(a.id) } catch (e) { v.flash(e.message) } finally { setBusy(null) }
  }
  const markAll = async () => {
    setBusy('all')
    try {
      const n = await markAllAlertsRead()
      v.flash(n ? `${n} alert${n === 1 ? '' : 's'} marked as read` : 'Nothing unread')
    } catch (e) {
      v.flash(e.message)
    } finally {
      setBusy(null)
    }
  }

  let message = null
  if (alerts.status === 'off') message = 'Supabase keys are missing · add them to .env to load alerts.'
  else if (alerts.loading) message = 'Loading alerts…'
  else if (alerts.status === 'error' && !alerts.data) message = alerts.error
  else if (!rows.length) message = cat === 'all' ? 'All clear · no open alerts right now. New ones appear here the moment they happen.' : 'No open alerts in this category.'

  const tabs = [['all', 'All'], ...ALERT_CATEGORIES]
  const hasMore = (alerts.data?.length ?? 0) >= limit

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '18px', padding: '24px 26px 2px' }}>
        <span style={{ display: 'flex', flexDirection: 'column', gap: '5px', minWidth: '0' }}>
          <span style={{ font: `700 20px/1.2 ${FONT}`, color: INK, whiteSpace: 'nowrap' }}>Notification centre</span>
          <span style={{ font: `400 12.5px/1.2 ${FONT}`, color: MUTED, whiteSpace: 'nowrap' }}>
            {u.total} unread alert{u.total === 1 ? '' : 's'} · operations, inventory, payments, reviews and system · live
          </span>
        </span>
        <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button className="hv1" onClick={v.nav_notif} style={btn}>Campaigns</button>
          <button className="hv1" onClick={markAll} disabled={busy === 'all' || !u.total} style={{ ...btn, opacity: !u.total ? 0.5 : 1 }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none"><path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#4A564E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Mark all read
          </button>
        </span>
      </div>
      <div className="ad-scroll" style={{ flex: '1', minHeight: '0', overflowY: 'auto', padding: '20px 26px 30px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px' }}>
          <StatTile label="Unread" value={u.total} note={u.oldest ? `Oldest ${timeAgo(u.oldest)}` : 'Nothing waiting'} tone={u.total ? SEVERITY.critical : ['#0B6B33', '#E9F6E3']} />
          <StatTile label="Critical" value={u.critical} note={u.critical ? 'Needs action now' : 'None open'} tone={u.critical ? SEVERITY.critical : ['#0B6B33', '#E9F6E3']} />
          <StatTile label="Delayed orders" value={attention.data?.delayed ?? '–'} note="Past promised window" tone={SEVERITY.warning} />
          <StatTile label="Resolved today" value={resolvedToday} note="Closed automatically" tone={['#0B6B33', '#E9F6E3']} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 290px', gap: '18px', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px', borderBottom: `1px solid ${BORDER}` }}>
              {tabs.map(([k, label]) => {
                const on = cat === k
                const n = k === 'all' ? u.total : u.byCategory[k] || 0
                return (
                  <button key={k} onClick={() => setCat(k)} style={{ border: '0', background: 'transparent', padding: '0 12px 10px', font: `600 12.5px/1.2 ${FONT}`, color: on ? '#0B3D1F' : MUTED, borderBottom: `2px solid ${on ? '#0B3D1F' : 'transparent'}`, cursor: 'pointer', whiteSpace: 'nowrap', marginBottom: '-1px' }}>
                    {label}{n ? ` · ${n}` : ''}
                  </button>
                )
              })}
              <label style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px', paddingBottom: '10px', font: `500 12px/1.2 ${FONT}`, color: MUTED, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                <input type="checkbox" checked={showResolved} onChange={(e) => setShowResolved(e.target.checked)} style={{ margin: '0', accentColor: '#0B3D1F' }} />
                Show resolved
              </label>
            </div>

            {message ? (
              <div style={{ padding: '34px 16px', border: `1px dashed ${BORDER}`, borderRadius: '10px', background: '#fff', textAlign: 'center', font: `400 12.5px/1.5 ${FONT}`, color: MUTED }}>{message}</div>
            ) : groups.map(([g, list]) => (
              <div key={g} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ font: `600 11px/1.2 ${FONT}`, letterSpacing: '.5px', color: MUTED, textTransform: 'uppercase', paddingTop: '4px' }}>{g}</span>
                <div style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '10px', overflow: 'hidden' }}>
                  {list.map((a, i) => {
                    const [fg, bg] = SEVERITY[a.severity] ?? SEVERITY.info
                    const isUnread = !a.read_at && !a.resolved_at
                    return (
                      <div key={a.id} style={{ display: 'flex', gap: '13px', padding: '14px 16px', borderTop: i ? '1px solid #EFF1ED' : '0', background: isUnread ? '#FCFDF9' : '#fff', opacity: a.resolved_at ? 0.6 : 1 }}>
                        <span style={{ width: '32px', height: '32px', borderRadius: '8px', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                          <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d={CATEGORY_ICON[a.category] ?? CATEGORY_ICON.system} stroke={fg} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </span>
                        <span style={{ display: 'flex', flexDirection: 'column', gap: '5px', flex: '1', minWidth: '0' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {isUnread && <span style={{ width: '7px', height: '7px', borderRadius: '4px', background: fg, flex: 'none' }} />}
                            <span style={{ font: `${isUnread ? 700 : 600} 13px/1.3 ${FONT}`, color: INK }}>{a.title}</span>
                          </span>
                          {a.body && <span style={{ font: `400 12px/1.5 ${FONT}`, color: '#4A564E' }}>{a.body}</span>}
                          <span style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '3px', flexWrap: 'wrap' }}>
                            <span style={{ font: `400 11px/1.2 ${FONT}`, color: MUTED }}>{timeAgo(a.updated_at ?? a.created_at)} · {ALERT_CATEGORIES.find(([k]) => k === a.category)?.[1]}</span>
                            {a.resolved_at && <span style={{ font: `600 10.5px/1.2 ${FONT}`, color: '#0B6B33', background: '#E9F6E3', padding: '3px 7px', borderRadius: '5px' }}>Resolved</span>}
                            <span style={{ marginLeft: 'auto', display: 'flex', gap: '6px' }}>
                              {a.link && go[a.link] && <button className="hv1" onClick={go[a.link]} style={smallBtn}>{a.link_label || 'Open'}</button>}
                              {isUnread && <button className="hv1" onClick={() => markOne(a)} disabled={busy === a.id} style={{ ...smallBtn, color: MUTED }}>Mark read</button>}
                            </span>
                          </span>
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
            {!message && hasMore && (
              <button className="hv1" onClick={() => setLimit((n) => n + PAGE)} style={{ ...btn, alignSelf: 'center' }}>Load older alerts</button>
            )}
          </div>

          <div style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '10px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px', position: 'sticky', top: '0' }}>
            <span style={{ font: `600 13.5px/1.2 ${FONT}`, color: INK, paddingBottom: '8px' }}>Needs attention</span>
            {[
              ['Delayed orders', attention.data?.delayed, v.nav_del],
              ['Failed payments', attention.data?.failedPayments, v.nav_pay],
              ['Low stock items', attention.data?.lowStock, v.nav_inv],
              ['Refunds to review', attention.data?.pendingRefunds, v.nav_refunds],
              ['Reviews to moderate', attention.data?.pendingReviews, v.nav_rev],
            ].map(([label, n, onClick]) => (
              <button key={label} className="hv3" onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 4px', border: '0', borderBottom: '1px solid #EFF1ED', background: 'transparent', cursor: 'pointer', textAlign: 'left' }}>
                <span style={{ font: `500 12.5px/1.2 ${FONT}`, color: '#4A564E', flex: '1' }}>{label}</span>
                <span style={{ font: `700 12.5px/1.2 ${FONT}`, color: n ? '#A93826' : MUTED, background: n ? '#FAEDEA' : '#F1F3EE', padding: '4px 8px', borderRadius: '6px', minWidth: '24px', textAlign: 'center' }}>{n ?? '–'}</span>
              </button>
            ))}
            {attention.status === 'error' && <span style={{ font: `400 11px/1.4 ${FONT}`, color: '#A93826', paddingTop: '8px' }}>{attention.error}</span>}
            <span style={{ font: `400 11px/1.5 ${FONT}`, color: MUTED, paddingTop: '10px' }}>
              Counts update live. Alerts close themselves when the problem is fixed, e.g. a product is restocked or a refund is decided.
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
