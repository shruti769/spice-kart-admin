import { useEffect, useState } from 'react'
import { aud, returnWalletToCard, walletReturnInfo } from '../lib/payments'

const FONT = 'Inter,system-ui,sans-serif'
const INK = '#17201A'
const MUTED = '#7C8A81'
const BORDER = '#E4E7E2'

/** Sends a customer's wallet money back to the card they topped up with. Credit that wasn't paid by card stays in the wallet. */
export default function WalletReturnCard({ customerId, flash, style }) {
  const [info, setInfo] = useState(null)
  const [amount, setAmount] = useState('')
  const [requestId, setRequestId] = useState(() => crypto.randomUUID())
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    walletReturnInfo(customerId).then(
      (data) => { if (!cancelled) setInfo(data) },
      (e) => { if (!cancelled) setError(e.message) },
    )
    return () => { cancelled = true }
  }, [customerId])

  const send = async () => {
    const amt = Math.round(Number(amount) * 100) / 100
    if (busy) return
    if (!(amt > 0) || amt > info.returnable) return setError(`Enter an amount up to ${aud(info.returnable)}`)
    if (!window.confirm(`Send ${aud(amt)} back to this customer's card? This can't be undone.`)) return
    setBusy(true)
    setError('')
    try {
      const { sent } = await returnWalletToCard(customerId, amt, requestId)
      flash?.(`${aud(sent)} sent back to the card`)
      setAmount('')
      setRequestId(crypto.randomUUID())
      setInfo(await walletReturnInfo(customerId))
    } catch (e) {
      setError(e.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div style={style}>
      <span style={{ font: `700 13px/1.2 ${FONT}`, color: INK }}>Spice Kart Money</span>
      {!info && !error && <span style={{ font: `400 12px/1.4 ${FONT}`, color: MUTED }}>Loading…</span>}
      {info && (
        <>
          <span style={{ font: `400 12px/1.5 ${FONT}`, color: MUTED }}>
            Balance {aud(info.balance)} · {aud(info.returnable)} can go back to a card
          </span>
          {info.returnable > 0 && (
            <span style={{ display: 'flex', gap: '8px' }}>
              <input
                aria-label="Amount to send back"
                inputMode="decimal"
                value={amount}
                placeholder={info.returnable.toFixed(2)}
                onChange={(e) => { setAmount(e.target.value); setError('') }}
                style={{ flex: 1, minWidth: 0, height: '36px', padding: '0 11px', border: `1px solid ${BORDER}`, borderRadius: '9px', font: `500 12.5px/1 ${FONT}`, color: INK }}
              />
              <button type="button" disabled={busy} onClick={send} style={{ height: '36px', padding: '0 12px', border: `1px solid ${BORDER}`, borderRadius: '9px', background: '#fff', font: `600 12px/1 ${FONT}`, color: INK, cursor: 'pointer', whiteSpace: 'nowrap', opacity: busy ? 0.5 : 1 }}>
                {busy ? 'Sending…' : 'Send to card'}
              </button>
            </span>
          )}
        </>
      )}
      {!!error && <span style={{ font: `400 12px/1.4 ${FONT}`, color: '#B3261E' }}>{error}</span>}
    </div>
  )
}
