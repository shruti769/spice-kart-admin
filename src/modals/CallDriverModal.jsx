import { Modal } from '../components/content/ui'
import { BORDER, DIVIDER, FONT, INK, MUTED, btnPrimary, btnSecondary, ellipsis, hintText, labelStyle } from '../components/content/styles'
import { driverInitials, minutesLeft, phoneLabel, telHref } from '../lib/drivers'
import { STATUS_PILL, statusLabel } from '../lib/orders'

/**
 * A driver's contact card: real phone with a tel: link, zone / vehicle, and their open orders.
 * Props: `driver`, `orders` (their open orders), `doneToday`, `now`, `onClose`, `onOpenOrder(order)`.
 * Rendered with only `v` (legacy global modal) there is no driver to show, so it says so.
 */
export default function CallDriverModal({ v, driver, orders = [], doneToday = 0, now, onClose, onOpenOrder }) {
  const close = onClose ?? v?.closeModal
  if (!close) return null
  if (!driver) {
    return (
      <Modal title="Call a driver" sub="Open a driver from Delivery › Drivers to see their phone number." onClose={close} footer={<button type="button" onClick={close} style={{ ...btnSecondary, marginLeft: 'auto' }}>Close</button>} />
    )
  }
  const inactive = driver.status !== 'active'
  const sub = [driver.zone, driver.vehicle, inactive ? 'Inactive' : `${orders.length} open order${orders.length === 1 ? '' : 's'}`, `${doneToday} delivered today`].filter(Boolean).join(' · ')
  return (
    <Modal
      title={driver.phone ? `Call ${driver.name}` : driver.name}
      sub={sub}
      onClose={close}
      footer={(
        <>
          <button type="button" onClick={close} style={{ ...btnSecondary, marginLeft: 'auto' }}>Close</button>
          {driver.phone && <a href={telHref(driver.phone)} style={{ ...btnPrimary, textDecoration: 'none' }}>Call now</a>}
        </>
      )}
    >
      <span style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '13px', borderRadius: '10px', background: '#F6F7F4', border: `1px solid ${BORDER}` }}>
        <span style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#0B3D1F', display: 'flex', alignItems: 'center', justifyContent: 'center', font: `700 15px/1.2 ${FONT}`, color: '#8BE000', flex: 'none' }}>
          {driverInitials(driver.name)}
        </span>
        <span style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '0' }}>
          {driver.phone
            ? <a href={telHref(driver.phone)} style={{ font: `700 14px/1.2 ${FONT}`, color: INK, whiteSpace: 'nowrap', textDecoration: 'none' }}>{phoneLabel(driver.phone)}</a>
            : <span style={{ font: `600 13px/1.2 ${FONT}`, color: MUTED }}>No phone number saved</span>}
          <span style={{ font: `400 11px/1.2 ${FONT}`, color: MUTED, ...ellipsis }}>
            {orders[0] ? `Handling #${orders[0].number}${orders.length > 1 ? ` + ${orders.length - 1} more` : ''}` : 'No open orders right now'}
          </span>
        </span>
        <span style={{ marginLeft: 'auto', font: `600 10px/1.2 ${FONT}`, padding: '5px 8px', borderRadius: '5px', whiteSpace: 'nowrap', flex: 'none', ...(inactive ? { color: '#5F6B62', background: '#EEF0EC' } : orders.length ? { color: '#1F5C8B', background: '#E8F1F8' } : { color: '#0B6B33', background: '#E9F6E3' }) }}>
          {inactive ? 'INACTIVE' : orders.length ? 'DELIVERING' : 'AVAILABLE'}
        </span>
      </span>

      {orders.length > 0 && (
        <span style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
          <span style={labelStyle}>Open orders</span>
          <div className="ad-scroll" style={{ border: `1px solid ${BORDER}`, borderRadius: '9px', maxHeight: '220px', overflowY: 'auto' }}>
            {orders.map((o, i) => {
              const [fg, bg] = STATUS_PILL[o.status] ?? STATUS_PILL.placed
              const m = now != null ? minutesLeft(o, now) : null
              return (
                <span key={o.id} style={{ display: 'flex', alignItems: 'center', gap: '9px', padding: '9px 12px', borderTop: i ? `1px solid ${DIVIDER}` : '0' }}>
                  <span style={{ font: `700 12px/1.2 ${FONT}`, color: INK, flex: 'none' }}>#{o.number}</span>
                  <span style={{ font: `600 10px/1.2 ${FONT}`, color: fg, background: bg, padding: '4px 7px', borderRadius: '5px', whiteSpace: 'nowrap', flex: 'none' }}>{statusLabel(o.status)}</span>
                  <span style={{ font: `400 11px/1.2 ${FONT}`, color: m != null && m < 0 ? '#A93826' : MUTED, ...ellipsis }}>
                    {[o.address_area || o.address_line, m == null ? '' : m < 0 ? `${-m} min late` : `due in ${m} min`].filter(Boolean).join(' · ')}
                  </span>
                  {onOpenOrder && (
                    <button type="button" onClick={() => onOpenOrder(o)} style={{ marginLeft: 'auto', height: '26px', padding: '0 9px', border: `1px solid ${BORDER}`, borderRadius: '6px', background: '#fff', font: `600 11px/1.2 ${FONT}`, color: INK, cursor: 'pointer', whiteSpace: 'nowrap', flex: 'none' }}>Open</button>
                  )}
                </span>
              )
            })}
          </div>
        </span>
      )}
      {driver.phone && <span style={hintText}>Call now opens your device’s phone app.</span>}
    </Modal>
  )
}
