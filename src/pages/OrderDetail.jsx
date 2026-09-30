import { useState } from 'react'
import {
  PAYMENT_LABEL, PAYMENT_STATUS_PILL, STATUSES, STATUS_PILL, cancelOrder, customerName, initials, mobileLabel, money, nextStatus,
  placedLabel, setOrderStatus, statusLabel, useOrder,
} from '../lib/orders'
import { storeAddress } from '../lib/stores'
import { useBusinessSettings } from '../lib/businessSettings'

const FONT = 'Inter,system-ui,sans-serif'
const INK = '#17201A'
const MUTED = '#7C8A81'
const BORDER = '#E4E7E2'
const DANGER = '#A93826'
const FLOW = STATUSES.filter(([k]) => k !== 'cancelled')

const card = { background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '12px', overflow: 'hidden' }
const cardHead = { padding: '16px 20px', borderBottom: '1px solid #EFF1ED', font: `600 14px/1.2 ${FONT}`, color: INK }
const btn = { display: 'flex', alignItems: 'center', gap: '7px', height: '36px', padding: '0 14px', border: `1px solid ${BORDER}`, borderRadius: '8px', background: '#fff', color: INK, font: `600 12.5px/1.2 ${FONT}`, cursor: 'pointer', whiteSpace: 'nowrap' }
const pill = (fg, bg) => ({ font: `600 11px/1.2 ${FONT}`, color: fg, background: bg, padding: '5px 9px', borderRadius: '6px', whiteSpace: 'nowrap' })
const kv = { display: 'flex', justifyContent: 'space-between', gap: '12px', font: `400 12.5px/1.3 ${FONT}`, color: MUTED }
const time = (iso) => new Date(iso).toLocaleTimeString('en-AU', { hour: 'numeric', minute: '2-digit' })
const dayTime = (iso) => new Date(iso).toLocaleString('en-AU', { weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' })
const mapsUrl = (lat, lng) => `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
/** Great-circle distance between two map pins, in km. */
function distanceKm(lat1, lng1, lat2, lng2) {
  const rad = (d) => (d * Math.PI) / 180
  const a = Math.sin(rad(lat2 - lat1) / 2) ** 2 + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(rad(lng2 - lng1) / 2) ** 2
  return 12742 * Math.asin(Math.sqrt(a))
}
const fmtKm = (km) => (km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(km < 10 ? 1 : 0)} km`)
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))

const Icon = ({ d }) => (
  <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: 'none' }}><path d={d} stroke="#7C8A81" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
)
const PHONE = 'M5.2 3.5h2.6l1.3 3.2-1.7 1.1a8.4 8.4 0 004.8 4.8l1.1-1.7 3.2 1.3v2.6a1.6 1.6 0 01-1.7 1.6C8.6 16 4 11.4 3.6 5.2a1.6 1.6 0 011.6-1.7z'
const MAIL = 'M3.5 5.5h13v9h-13zM3.5 5.8L10 10.6l6.5-4.8'
const PIN = 'M10 17.5s5.4-4.7 5.4-8.6A5.4 5.4 0 004.6 8.9c0 3.9 5.4 8.6 5.4 8.6zM10 10.5a1.9 1.9 0 100-3.8 1.9 1.9 0 000 3.8z'

/** Opens a printable tax invoice in a new window. */
/** GST inside a GST-inclusive total at `rate` percent. */
const gstIn = (total, rate) => (Number(total) * rate) / (100 + rate)

function printInvoice(o, rate) {
  const s = o.store
  const gst = gstIn(o.total, rate)
  const rows = (o.order_items ?? []).map((i) => `<tr><td>${esc(i.name)}</td><td class=r>${i.qty}</td><td class=r>${money(i.unit_price)}</td><td class=r>${money(i.line_total)}</td></tr>`).join('')
  const line = (k, val) => `<tr><td colspan=3 class=r>${k}</td><td class=r>${val}</td></tr>`
  const w = window.open('', '_blank', 'width=720,height=900')
  if (!w) return false
  w.document.write(`<!doctype html><html><head><meta charset=utf-8><title>Invoice #${esc(o.number)}</title><style>
    body{font:13px/1.5 Inter,system-ui,sans-serif;color:#17201A;margin:40px}h1{font-size:20px;margin:0 0 4px}.m{color:#7C8A81}
    table{width:100%;border-collapse:collapse;margin-top:20px}th,td{padding:8px 6px;border-bottom:1px solid #E4E7E2;text-align:left}.r{text-align:right}
    .t td{font-weight:700;font-size:15px;border:0}.head{display:flex;justify-content:space-between;gap:20px}</style></head><body>
    <div class=head><div><h1>Tax invoice</h1><div class=m>#${esc(o.number)} · ${esc(new Date(o.placed_at).toLocaleString('en-AU'))}</div></div>
    <div class=r><b>${esc(s?.name ?? 'Spice Kart')}</b>${s?.abn ? `<div class=m>ABN ${esc(s.abn)}</div>` : ''}<div class=m>${esc(storeAddress(s))}</div>${s?.support_email ? `<div class=m>${esc(s.support_email)}</div>` : ''}</div></div>
    <p><b>Bill to</b><br>${esc(customerName(o.customer))}<br><span class=m>${esc(o.address_line)}</span></p>
    <table><thead><tr><th>Item</th><th class=r>Qty</th><th class=r>Price</th><th class=r>Total</th></tr></thead><tbody>${rows}
    ${line('Subtotal', money(o.subtotal))}${Number(o.discount) ? line(`Discount${o.coupon_code ? ` (${esc(o.coupon_code)})` : ''}`, `−${money(o.discount)}`) : ''}
    ${line('Delivery fee', money(o.delivery_fee))}${line('Handling fee', money(o.handling_fee))}
    <tr class=t><td colspan=3 class=r>Total (AUD)</td><td class=r>${money(o.total)}</td></tr>${line('Includes GST of', money(gst))}</tbody></table>
    <p class=m>Payment: ${esc(PAYMENT_LABEL[o.payment_method] ?? o.payment_method)} · ${esc((PAYMENT_STATUS_PILL[o.payment_status] ?? ['Unpaid'])[0])}</p>
    <script>window.onload=()=>{window.print()}</script></body></html>`)
  w.document.close()
  return true
}

function Popover({ onClose, children }) {
  return (
    <>
      <span onClick={onClose} style={{ position: 'fixed', inset: '0', zIndex: '60' }} />
      <span style={{ position: 'absolute', top: '42px', right: '0', zIndex: '61', minWidth: '220px', background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '10px', boxShadow: '0 14px 34px rgba(10,18,12,.16)', padding: '6px', display: 'flex', flexDirection: 'column' }}>
        {children}
      </span>
    </>
  )
}
const menuItem = { display: 'flex', alignItems: 'center', gap: '9px', padding: '9px 10px', border: '0', borderRadius: '7px', background: 'transparent', font: `500 12.5px/1.2 ${FONT}`, color: INK, cursor: 'pointer', textAlign: 'left', textDecoration: 'none' }

function Message({ v, children }) {
  return (
    <div style={{ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', padding: '40px', font: `400 13px/1.5 ${FONT}`, color: MUTED, textAlign: 'center' }}>
      {children}
      <button className="hv1" onClick={v.nav_orders} style={btn}>Back to orders</button>
    </div>
  )
}

export default function OrderDetail({ v }) {
  const { status, order: o, customerOrders, error } = useOrder(v.orderId)
  const gstRate = Number(useBusinessSettings().data?.gst_rate ?? 10)
  const [busy, setBusy] = useState(false)
  const [menu, setMenu] = useState(null) // 'contact' | 'status' | null
  const [confirmCancel, setConfirmCancel] = useState(false)
  const [reason, setReason] = useState('')

  if (!v.orderId) return <Message v={v}>Pick an order from the Orders list to see its details.</Message>
  if (status === 'loading') return <Message v={v}>Loading order…</Message>
  if (status === 'missing') return <Message v={v}>This order no longer exists.</Message>
  if (status === 'error' || !o) return <Message v={v}>{error || 'Couldn’t load this order.'}</Message>

  const run = async (task, msg) => {
    setBusy(true)
    try {
      await task()
      v.flash(msg)
      return true
    } catch (e) {
      v.flash(e.message)
      return false
    } finally {
      setBusy(false)
    }
  }
  const changeStatus = (s) => {
    setMenu(null)
    if (s === o.status) return
    run(() => setOrderStatus(o.id, s), `Order #${o.number} → ${statusLabel(s)} · customer notified`)
  }
  const doCancel = async () => {
    const ok = await run(() => cancelOrder(o.id, reason), `Order #${o.number} cancelled · stock put back · customer notified`)
    if (ok) { setConfirmCancel(false); setReason('') }
  }

  const cancelled = o.status === 'cancelled'
  const done = o.status === 'delivered'
  const next = nextStatus(o.status)
  const [sfg, sbg] = STATUS_PILL[o.status] ?? STATUS_PILL.placed
  const [pl, pfg, pbg] = PAYMENT_STATUS_PILL[o.payment_status] ?? PAYMENT_STATUS_PILL.pending
  const items = o.order_items ?? []
  const late = !cancelled && !done && o.promised_by && new Date(o.promised_by) < new Date()
  const c = o.customer
  const typeLabel = o.delivery_type === 'express' ? 'Express delivery' : 'Scheduled delivery'
  const zone = o.address_area || (o.address_line.match(/,\s*([^,]+?)\s+[A-Z]{2,3}\s+\d{4}$/)?.[1] ?? '—')

  // Timeline: when each step was reached (latest time per status) from order_status_events.
  const reachedAt = {}
  for (const e of o.history ?? []) reachedAt[e.status] = e.at
  if (!reachedAt.placed) reachedAt.placed = o.placed_at
  const stepIndex = FLOW.findIndex(([k]) => k === o.status)
  const timeline = cancelled
    ? [...FLOW.filter(([k]) => reachedAt[k]), ['cancelled', 'Cancelled']]
    : FLOW

  return (
    <>
      <div className="sk-topbar" style={{ display: 'flex', alignItems: 'flex-start', gap: '18px', padding: '24px 26px 4px' }}>
        <span style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: '0' }}>
          <span style={{ font: `700 22px/1.2 ${FONT}`, color: INK, whiteSpace: 'nowrap' }}>Order #{o.number}</span>
          <span style={{ font: `400 13px/1.2 ${FONT}`, color: MUTED }}>Placed {placedLabel(o.placed_at).replace(/^Today /, 'today at ').replace(/^Yesterday /, 'yesterday at ')} · {typeLabel}</span>
        </span>
        <span className="r-wrap" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button className="hv1" onClick={() => { if (!printInvoice(o, gstRate)) v.flash('Allow pop-ups for this site to print the invoice') }} style={btn}>Print invoice</button>
          <span style={{ position: 'relative' }}>
            <button className="hv1" onClick={() => setMenu(menu === 'contact' ? null : 'contact')} style={btn}>Contact customer</button>
            {menu === 'contact' && (
              <Popover onClose={() => setMenu(null)}>
                {c?.mobile && <a className="hv3" href={`tel:+61${c.mobile}`} style={menuItem}><Icon d={PHONE} />Call {mobileLabel(c.mobile)}</a>}
                {c?.mobile && <a className="hv3" href={`sms:+61${c.mobile}`} style={menuItem}><Icon d={MAIL} />Send SMS</a>}
                {c?.email && <a className="hv3" href={`mailto:${c.email}?subject=${encodeURIComponent(`Your Spice Kart order #${o.number}`)}`} style={menuItem}><Icon d={MAIL} />Email {c.email}</a>}
                {!c?.mobile && !c?.email && <span style={{ ...menuItem, color: MUTED, cursor: 'default' }}>No phone or email on this customer yet</span>}
              </Popover>
            )}
          </span>
          {!cancelled && !done && (
            <button className="hv1" onClick={() => setConfirmCancel(true)} disabled={busy} style={{ ...btn, color: DANGER, borderColor: '#F0D5CF', background: '#FDF7F5' }}>Cancel order</button>
          )}
          {!cancelled && (
            <span style={{ position: 'relative' }}>
              <button className="hv2" disabled={busy} onClick={() => setMenu(menu === 'status' ? null : 'status')} style={{ ...btn, border: '0', background: '#0B3D1F', color: '#fff', opacity: busy ? 0.7 : 1 }}>
                <svg width="15" height="15" viewBox="0 0 20 20" fill="none"><path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#8BE000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                {busy ? 'Updating…' : 'Update status'}
              </button>
              {menu === 'status' && (
                <Popover onClose={() => setMenu(null)}>
                  {FLOW.map(([k, l]) => {
                    const cur = k === o.status
                    return (
                      <button key={k} className="hv3" onClick={() => changeStatus(k)} style={{ ...menuItem, fontWeight: cur || k === next ? 700 : 500, background: cur ? '#F1F9DF' : 'transparent' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '4px', background: (STATUS_PILL[k] ?? [])[0] }} />
                        <span style={{ flex: '1' }}>{l}</span>
                        {cur ? <span style={{ font: `500 11px/1 ${FONT}`, color: MUTED }}>current</span> : k === next ? <span style={{ font: `500 11px/1 ${FONT}`, color: '#1B5E30' }}>next</span> : null}
                      </button>
                    )
                  })}
                </Popover>
              )}
            </span>
          )}
        </span>
      </div>

      <div className="ad-scroll sk-page" style={{ flex: '1', minHeight: '0', overflowY: 'auto', padding: '12px 26px 30px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <span className="r-wrap" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button onClick={v.nav_orders} style={{ display: 'flex', alignItems: 'center', gap: '6px', border: '0', background: 'transparent', padding: '0 12px 0 0', borderRight: `1px solid ${BORDER}`, font: `600 13px/1.2 ${FONT}`, color: '#1B5E30', cursor: 'pointer' }}>
            <svg width="13" height="13" viewBox="0 0 20 20" fill="none"><path d="M12.4 4.4L7 10l5.4 5.6" stroke="#1B5E30" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Back to orders
          </button>
          <span style={pill(sfg, sbg)}>{statusLabel(o.status)}</span>
          <span style={pill(pfg, pbg)}>{pl}</span>
          <span style={pill('#2F4F9E', '#EEF2FB')}>{o.delivery_type === 'express' ? 'EXPRESS' : 'SCHEDULED'}</span>
          {late && <span style={pill(DANGER, '#FAEDEA')}>Late</span>}
        </span>

        {confirmCancel && (
          <div style={{ ...card, border: '1px solid #F0D5CF', background: '#FDF7F5', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span style={{ font: `600 14px/1.2 ${FONT}`, color: DANGER }}>Cancel order #{o.number}?</span>
            <span style={{ font: `400 12.5px/1.5 ${FONT}`, color: '#4A564E' }}>
              The stock it took goes back on the shelf and the customer gets a notification.{o.payment_status === 'paid' ? ' The payment was captured, so raise a refund as well.' : ''}
            </span>
            <input value={reason} maxLength={200} onChange={(e) => setReason(e.target.value)} placeholder="Reason (optional), e.g. Out of stock, customer request" style={{ height: '36px', padding: '0 11px', border: `1px solid ${BORDER}`, borderRadius: '8px', font: `500 12.5px/1.2 ${FONT}`, outline: 'none', background: '#fff' }} />
            <span style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <button className="hv1" onClick={() => setConfirmCancel(false)} disabled={busy} style={btn}>Keep order</button>
              <button className="hv1" onClick={doCancel} disabled={busy} style={{ ...btn, border: '0', background: DANGER, color: '#fff' }}>{busy ? 'Cancelling…' : 'Cancel order'}</button>
            </span>
          </div>
        )}

        <div className="r-stack" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.75fr) minmax(290px,1fr)', gap: '18px', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', minWidth: '0' }}>
            <div style={card}>
              <div style={cardHead}>Order items · {items.reduce((n, i) => n + i.qty, 0)}</div>
              {items.map((it, i) => (
                <div key={it.id} style={{ display: 'grid', gridTemplateColumns: '44px minmax(0,1fr) 110px 90px', gap: '14px', alignItems: 'center', padding: '12px 20px', borderTop: i ? '1px solid #EFF1ED' : '0' }}>
                  <span style={{ width: '44px', height: '44px', borderRadius: '8px', overflow: 'hidden', background: '#F6F7F4', border: `1px solid ${BORDER}`, position: 'relative' }}>
                    {it.image_url && <img src={it.image_url} alt="" style={{ position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover' }} />}
                  </span>
                  <span style={{ display: 'flex', flexDirection: 'column', gap: '3px', minWidth: '0' }}>
                    <span style={{ font: `500 13.5px/1.25 ${FONT}`, color: INK }}>{it.name}</span>
                    {!it.product_id && <span style={{ font: `400 11px/1.2 ${FONT}`, color: MUTED }}>Product since deleted</span>}
                  </span>
                  <span style={{ font: `400 12.5px/1.2 ${FONT}`, color: MUTED }}>{it.qty} × {money(it.unit_price)}</span>
                  <span style={{ font: `700 13.5px/1.2 ${FONT}`, color: INK, textAlign: 'right' }}>{money(it.line_total)}</span>
                </div>
              ))}
            </div>

            <div style={card}>
              <div style={cardHead}>Delivery timeline</div>
              <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column' }}>
                {timeline.map(([k, l], i) => {
                  const isCancel = k === 'cancelled'
                  const reached = isCancel || (cancelled ? true : i <= stepIndex)
                  const current = isCancel || (!cancelled && i === stepIndex)
                  const at = reachedAt[k]
                  const color = isCancel ? DANGER : reached ? '#8BE000' : '#DCDDD8'
                  return (
                    <div key={k} style={{ display: 'flex', gap: '14px' }}>
                      <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '22px', flex: 'none' }}>
                        <span style={{ width: '20px', height: '20px', borderRadius: '10px', background: color, boxShadow: current && !isCancel ? '0 0 0 4px #EAF7D4' : 'none', flex: 'none' }} />
                        {i < timeline.length - 1 && <span style={{ width: '3px', flex: '1', minHeight: '26px', background: reached && (cancelled || i < stepIndex) ? '#8BE000' : '#E4E7E2' }} />}
                      </span>
                      <span style={{ display: 'flex', flexDirection: 'column', gap: '3px', paddingBottom: '16px' }}>
                        <span style={{ font: `${current ? 700 : 600} 13.5px/1.2 ${FONT}`, color: reached ? (isCancel ? DANGER : INK) : MUTED }}>{l}</span>
                        <span style={{ font: `400 12px/1.2 ${FONT}`, color: MUTED }}>
                          {at ? time(at) : k === 'delivered' && o.promised_by ? `Due by ${dayTime(o.promised_by)}` : 'Pending'}
                          {isCancel && o.cancel_reason ? ` · ${o.cancel_reason}` : ''}
                        </span>
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ ...card, padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span style={{ font: `600 14px/1.2 ${FONT}`, color: INK, paddingBottom: '4px' }}>Order summary</span>
              <span style={kv}><span>Subtotal</span><span style={{ color: INK, fontWeight: 600 }}>{money(o.subtotal)}</span></span>
              {Number(o.discount) > 0 && <span style={kv}><span>Discount{o.coupon_code ? ` · ${o.coupon_code}` : ''}</span><span style={{ color: INK, fontWeight: 600 }}>−{money(o.discount)}</span></span>}
              <span style={kv}><span>Delivery fee</span><span style={{ color: INK, fontWeight: 600 }}>{Number(o.delivery_fee) ? money(o.delivery_fee) : 'Free'}</span></span>
              <span style={kv}><span>Handling fee</span><span style={{ color: INK, fontWeight: 600 }}>{money(o.handling_fee)}</span></span>
              <span style={kv}><span>GST ({gstRate}%, included)</span><span style={{ color: INK, fontWeight: 600 }}>{money(gstIn(o.total, gstRate))}</span></span>
              <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: `1px solid ${BORDER}`, paddingTop: '12px', marginTop: '2px' }}>
                <span style={{ font: `700 14px/1.2 ${FONT}`, color: INK }}>Total</span>
                <span style={{ font: `700 22px/1.2 ${FONT}`, color: INK }}>{money(o.total)}</span>
              </span>
              <span style={{ font: `400 11.5px/1.4 ${FONT}`, color: MUTED }}>
                {PAYMENT_LABEL[o.payment_method] ?? o.payment_method} · {pl}
                {(o.payments ?? []).filter((p) => p.status === 'failed').map((p) => ` · declined${p.card_last4 ? ` (•••• ${p.card_last4})` : ''}${p.failure_reason ? `: ${p.failure_reason}` : ''}`).join('')}
              </span>
            </div>

            <div style={{ ...card, padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <span style={{ font: `600 14px/1.2 ${FONT}`, color: INK }}>Customer</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
                <span style={{ width: '38px', height: '38px', borderRadius: '9px', background: '#1B3C22', color: '#8BE000', font: `700 12.5px/38px ${FONT}`, textAlign: 'center', flex: 'none' }}>{initials(c)}</span>
                <span style={{ display: 'flex', flexDirection: 'column', gap: '3px', minWidth: '0' }}>
                  <span style={{ font: `600 14px/1.2 ${FONT}`, color: INK }}>{customerName(c)}</span>
                  <span style={{ font: `400 12px/1.2 ${FONT}`, color: MUTED }}>
                    {c?.created_at ? `Customer since ${new Date(c.created_at).toLocaleDateString('en-AU', { month: 'short', year: 'numeric' })}` : 'Customer'}
                    {customerOrders != null ? ` · ${customerOrders} order${customerOrders === 1 ? '' : 's'}` : ''}
                  </span>
                </span>
              </span>
              {c?.mobile && <a href={`tel:+61${c.mobile}`} style={{ display: 'flex', alignItems: 'center', gap: '10px', font: `400 12.5px/1.3 ${FONT}`, color: '#4A564E', textDecoration: 'none' }}><Icon d={PHONE} />{mobileLabel(c.mobile)}</a>}
              {c?.email && <a href={`mailto:${c.email}`} style={{ display: 'flex', alignItems: 'center', gap: '10px', font: `400 12.5px/1.3 ${FONT}`, color: '#4A564E', textDecoration: 'none' }}><Icon d={MAIL} />{c.email}</a>}
              <span style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', font: `400 12.5px/1.4 ${FONT}`, color: '#4A564E' }}><Icon d={PIN} />{o.address_line}</span>
              {o.delivery_notes && <span style={{ font: `400 12px/1.4 ${FONT}`, color: MUTED }}>Delivery note: {o.delivery_notes}</span>}
            </div>

            <div style={{ ...card, padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '11px' }}>
              <span style={{ font: `600 14px/1.2 ${FONT}`, color: INK }}>Delivery</span>
              <span style={kv}><span>Type</span><span style={{ color: INK, fontWeight: 600 }}>{typeLabel}</span></span>
              {o.slot_label && <span style={kv}><span>Slot</span><span style={{ color: INK, fontWeight: 600, textAlign: 'right' }}>{o.slot_label}</span></span>}
              <span style={kv}><span>Driver</span><span style={{ color: MUTED }}>Not assigned yet</span></span>
              <span style={kv}>
                <span>{done ? 'Delivered' : 'ETA'}</span>
                <span style={{ color: late ? DANGER : INK, fontWeight: 600, textAlign: 'right' }}>
                  {done && o.delivered_at ? dayTime(o.delivered_at) : cancelled ? '—' : o.promised_by ? `by ${dayTime(o.promised_by)}${late ? ' · late' : ''}` : '—'}
                </span>
              </span>
              <span style={kv}><span>Zone</span><span style={{ color: INK, fontWeight: 600, textAlign: 'right' }}>{zone}</span></span>
              {o.store && <span style={kv}><span>From</span><span style={{ color: INK, fontWeight: 600, textAlign: 'right' }}>{o.store.name}</span></span>}
              {o.order_lat != null && (
                <span style={kv}>
                  <span>Ordered from</span>
                  <a href={mapsUrl(o.order_lat, o.order_lng)} target="_blank" rel="noreferrer" style={{ color: INK, fontWeight: 600, textAlign: 'right' }}>
                    {o.delivery_lat != null ? `${fmtKm(distanceKm(o.order_lat, o.order_lng, o.delivery_lat, o.delivery_lng))} from address` : 'View on map'}
                    {o.order_accuracy_m != null && <span style={{ color: MUTED, fontWeight: 400 }}> · ±{Math.round(o.order_accuracy_m)} m</span>}
                  </a>
                </span>
              )}
              {/* The customer's map pin when the app has one (GPS or geocoded), else the address text. */}
              <a className="hv1" href={o.delivery_lat != null ? mapsUrl(o.delivery_lat, o.delivery_lng) : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(o.address_line)}`} target="_blank" rel="noreferrer" style={{ ...btn, justifyContent: 'center', textDecoration: 'none', marginTop: '4px' }}>
                Track on map
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
