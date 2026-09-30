import { useEffect, useState } from 'react'
import { customerName } from '../lib/orders'
import { REFUND_REASONS, aud, decideRefund, methodLabel, refundOrder } from '../lib/payments'

const FONT = 'Inter,system-ui,sans-serif'
const INK = '#17201A'
const MUTED = '#7C8A81'
const BORDER = '#E4E7E2'
const label = { font: `600 10.5px/1.2 ${FONT}`, letterSpacing: '.4px', color: MUTED, textTransform: 'uppercase', whiteSpace: 'nowrap' }
const box = { display: 'flex', alignItems: 'center', height: '36px', padding: '0 11px', border: `1px solid ${BORDER}`, borderRadius: '8px', background: '#fff', font: `500 12.5px/1.2 ${FONT}`, color: INK, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', boxSizing: 'border-box', width: '100%', minWidth: '0', outline: 'none' }
const btn = { height: '36px', padding: '0 14px', border: `1px solid ${BORDER}`, borderRadius: '8px', background: '#fff', font: `600 12.5px/1.2 ${FONT}`, color: INK, cursor: 'pointer', whiteSpace: 'nowrap' }

/**
 * Refund an order (`order`, from the Payments list) or review a customer's refund request (`request`).
 * Props: `onClose()`, `onDone(message)`. Renders nothing without an order or request.
 */
export default function RefundModal(props) {
  if (!props.order && !props.request?.order) return null
  return <RefundDialog {...props} />
}

function RefundDialog({ order: orderProp, request, onClose, onDone }) {
  const order = request?.order ?? orderProp
  const left = order.left ?? 0
  // A request on an order with nothing paid (no payment provider yet) can still be approved, up to the
  // order total: decide_refund() marks it 'approved' (processing) and the refund is paid out manually.
  const unpaid = !!request && left <= 0
  const max = unpaid ? Number(order.total || 0) : left
  const suggested = request?.amount != null ? Math.min(Number(request.amount), max) : max
  const [amount, setAmount] = useState(() => (suggested > 0 ? suggested.toFixed(2) : ''))
  const [reason, setReason] = useState('')
  const [busy, setBusy] = useState('')
  const [error, setError] = useState('')
  const close = () => { if (!busy) onClose?.() }

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && !busy) onClose?.() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [busy, onClose])

  const who = customerName(request?.customer ?? order.customer)
  const amt = Math.round(Number(amount) * 100) / 100
  const amountError = !amount.trim() || !(amt > 0) ? 'Enter an amount' : amt > max + 0.001 ? (unpaid ? `At most ${aud(max)} (the order total)` : `At most ${aud(left)} is left to refund`) : ''
  const canRefund = max > 0

  const run = async (kind) => {
    if (busy) return
    if (kind !== 'reject' && amountError) { setError(amountError); return }
    setBusy(kind)
    setError('')
    try {
      if (request) {
        await decideRefund(request.id, kind !== 'reject', kind === 'reject' ? null : amt)
        onDone?.(kind === 'reject' ? `${request.number} rejected · customer notified` : unpaid ? `${request.number} approved · pay ${aud(amt)} back manually · customer notified` : `${request.number} approved · ${aud(amt)} recorded as refunded · customer notified`)
      } else {
        await refundOrder(order.id, amt, reason.trim())
        onDone?.(`${aud(amt)} refund recorded on #${order.number}`)
      }
      onClose?.()
    } catch (e) {
      setError(e.message)
      setBusy('')
    }
  }

  const title = request ? `Review refund ${request.number}` : `Refund order #${order.number}`
  const sub = request
    ? `${who} requested ${request.amount != null ? aud(request.amount) : 'a refund'} back on order #${order.number} — reason: ${(REFUND_REASONS[request.reason] ?? request.reason).toLowerCase()}.`
    : `${who} paid ${aud(order.paid)}${order.refunded > 0 ? ` · ${aud(order.refunded)} already refunded` : ''}.`

  return (
    <div className="sk-overlay" onClick={close} style={{ position: 'fixed', inset: '0', zIndex: '90', background: 'rgba(14,22,16,.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
      <div className="sk-modal" onClick={(e) => e.stopPropagation()} style={{ width: '500px', maxWidth: '100%', maxHeight: '100%', background: '#fff', borderRadius: '14px', boxShadow: '0 26px 60px rgba(10,18,12,.3)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '16px 18px 14px', display: 'flex', alignItems: 'flex-start', gap: '11px', borderBottom: '1px solid #EFF1ED' }}>
          <span style={{ width: '34px', height: '34px', borderRadius: '9px', background: '#E8F1F8', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
            <svg width="17" height="17" viewBox="0 0 20 20" fill="none" style={{ flex: 'none' }}>
              <path d="M4 10a6 6 0 1 1 2 4.5" stroke="#1F5C8B" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M4 6.4V10h3.6" stroke="#1F5C8B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '0' }}>
            <span style={{ font: `700 15px/1.2 ${FONT}`, color: INK }}>{title}</span>
            <span style={{ font: `400 11.5px/1.55 ${FONT}`, color: MUTED }}>{sub}</span>
          </span>
        </div>
        <div className="ad-scroll" style={{ padding: '15px 18px', display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto' }}>
          <div className="r-stack-sm" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '11px' }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: '0' }}>
              <span style={label}>Refund amount</span>
              <span style={{ ...box, gap: '4px', padding: '0', ...(error && error === amountError ? { borderColor: '#B3402F' } : null), opacity: canRefund ? 1 : 0.55 }}>
                <span style={{ paddingLeft: '11px', color: MUTED }}>$</span>
                <input value={amount} disabled={!canRefund || !!busy} inputMode="decimal" onChange={(e) => { setAmount(e.target.value.replace(/[^0-9.]/g, '')); setError('') }} placeholder="0.00" style={{ border: '0', outline: 'none', background: 'transparent', font: `500 12.5px/1.2 ${FONT}`, color: INK, width: '100%', minWidth: '0', height: '100%', padding: '0 11px 0 0' }} />
              </span>
            </label>
            <span style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: '0' }}>
              <span style={label}>Refund to</span>
              <span style={box}>{methodLabel(order)}</span>
            </span>
            <span style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: '0' }}>
              <span style={label}>Order total</span>
              <span style={box}>{aud(order.total)}</span>
            </span>
            <span style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: '0' }}>
              <span style={label}>Left to refund</span>
              <span style={box}>{aud(left)}</span>
            </span>
          </div>
          {request ? (
            <span style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={label}>Customer’s note</span>
              <span style={{ display: 'block', minHeight: '40px', padding: '10px 11px', border: `1px solid ${BORDER}`, borderRadius: '8px', background: '#F6F7F4', font: `400 12px/1.6 ${FONT}`, color: request.detail ? '#4A564E' : MUTED, whiteSpace: 'pre-wrap' }}>
                {request.detail || 'No details added.'}
              </span>
              {request.photo_url && (
                <a href={request.photo_url} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '10px', font: `600 11.5px/1.2 ${FONT}`, color: '#17693A', textDecoration: 'none' }}>
                  <img src={request.photo_url} alt="Customer’s photo" style={{ width: '72px', height: '72px', objectFit: 'cover', borderRadius: '8px', border: `1px solid ${BORDER}`, background: '#F6F7F4', flex: 'none' }} />
                  View the customer’s photo →
                </a>
              )}
            </span>
          ) : (
            <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={label}>Internal note</span>
              <textarea value={reason} onChange={(e) => setReason(e.target.value)} maxLength={500} disabled={!!busy} placeholder="Why is this being refunded? (optional)" style={{ display: 'block', minHeight: '56px', padding: '10px 11px', border: `1px solid ${BORDER}`, borderRadius: '8px', background: '#fff', font: `400 12px/1.6 ${FONT}`, color: '#4A564E', resize: 'vertical', outline: 'none', boxSizing: 'border-box', width: '100%' }} />
            </label>
          )}
          <span style={{ padding: '10px 11px', borderRadius: '8px', background: '#FBF1DE', font: `400 11.5px/1.5 ${FONT}`, color: '#6B4B00' }}>
            {unpaid
              ? `${order.paid > 0 ? 'This order has already been fully refunded in Spice Kart.' : 'Nothing was paid on this order in Spice Kart (no payment provider is connected yet).'} Approving marks the refund as Processing and tells the customer · pay them back yourself.`
              : canRefund
                ? 'This records the refund in Spice Kart only. No payment provider is connected yet, so no money moves · refund the customer yourself until one is.'
                : 'Nothing has been paid on this order yet, so there’s nothing to refund.'}
            {request && !canRefund ? ' You can still reject the request.' : ''}
          </span>
          {error && <span style={{ font: `400 11.5px/1.4 ${FONT}`, color: '#B3402F' }}>{error}</span>}
          {request && (
            <span style={{ display: 'flex', gap: '9px' }}>
              <button onClick={() => run('reject')} disabled={!!busy} style={{ flex: '1', height: '38px', border: '1px solid #EEDAD5', borderRadius: '8px', background: '#FDF7F5', font: `600 12.5px/1.2 ${FONT}`, color: '#A93826', cursor: busy ? 'default' : 'pointer', whiteSpace: 'nowrap', opacity: busy && busy !== 'reject' ? 0.5 : 1 }}>
                {busy === 'reject' ? 'Rejecting…' : 'Reject refund'}
              </button>
            </span>
          )}
        </div>
        <div style={{ padding: '13px 18px 16px', display: 'flex', alignItems: 'center', gap: '9px', borderTop: '1px solid #EFF1ED', background: '#F6F7F4' }}>
          <span style={{ marginLeft: 'auto', display: 'flex', gap: '9px' }}>
            <button onClick={close} disabled={!!busy} style={btn}>Close</button>
            <button onClick={() => run('approve')} disabled={!!busy || !canRefund} style={{ ...btn, padding: '0 15px', border: '0', background: '#0B3D1F', color: '#fff', opacity: !canRefund || (busy && busy !== 'approve') ? 0.45 : 1, cursor: !canRefund || busy ? 'default' : 'pointer' }}>
              {busy === 'approve' ? 'Saving…' : request ? 'Approve refund' : 'Record refund'}
            </button>
          </span>
        </div>
      </div>
    </div>
  )
}
