import { useEffect, useState } from 'react'
import { aud, creditWallet, returnWalletToCard, walletReturnInfo } from '../lib/payments'

const FONT = 'Inter,system-ui,sans-serif'
const INK = '#17201A'
const MUTED = '#7C8A81'
const BORDER = '#E4E7E2'
const MAX_CREDIT = 500

/** Adds credit to a customer's wallet, and sends wallet money back to the card they topped up with. Credit that wasn't paid by card stays in the wallet. */
export default function WalletReturnCard({ customerId, flash, style }) {
  const [info, setInfo] = useState(null)
  const [amount, setAmount] = useState('')
  const [requestId, setRequestId] = useState(() => crypto.randomUUID())
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [credit, setCredit] = useState('')
  const [note, setNote] = useState('')
  const [crediting, setCrediting] = useState(false)
  const [creditError, setCreditError] = useState('')

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

  const addCredit = async () => {
    const amt = Math.round(Number(credit) * 100) / 100
    const reason = note.trim()
    if (crediting) return
    if (!(amt > 0) || amt > MAX_CREDIT) return setCreditError(`Enter an amount up to ${aud(MAX_CREDIT)}`)
    if (!reason) return setCreditError('Add a reason · the customer sees it in their wallet')
    if (!window.confirm(`Add ${aud(amt)} to this customer's wallet?`)) return
    setCrediting(true)
    setCreditError('')
    try {
      await creditWallet(customerId, amt, reason)
      flash?.(`${aud(amt)} added to the wallet`)
      setCredit('')
      setNote('')
    } catch (e) {
      setCreditError(`${e.message} · check the balance before trying again`)
    } finally {
      setCrediting(false)
    }
    // The balance on screen stays right whether or not the credit went through.
    walletReturnInfo(customerId).then(setInfo, () => {})
  }

  const field = { minWidth: 0, height: '36px', padding: '0 11px', border: `1px solid ${BORDER}`, borderRadius: '9px', font: `500 12.5px/1 ${FONT}`, color: INK, boxSizing: 'border-box' }

  return (
    <div style={style}>
      <span style={{ font: `700 13px/1.2 ${FONT}`, color: INK }}>Spice Kart Money</span>
      {!info && !error && <span style={{ font: `400 12px/1.4 ${FONT}`, color: MUTED }}>Loading…</span>}
      {info && (
        <>
          <span style={{ font: `400 12px/1.5 ${FONT}`, color: MUTED }}>
            Balance {aud(info.balance)}{info.credit > 0 ? ` (${aud(info.credit)} credit)` : ''} · {aud(info.returnable)} can go back to a card
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
      {info && (
        <>
          <span style={{ font: `600 12px/1.2 ${FONT}`, color: INK, marginTop: '6px' }}>Add credit</span>
          <span style={{ font: `400 11px/1.4 ${FONT}`, color: MUTED }}>Can only be spent on Spice Kart, and can't go back to a card</span>
          <span style={{ display: 'flex', gap: '8px' }}>
            <input
              aria-label="Credit amount"
              inputMode="decimal"
              value={credit}
              placeholder="Amount"
              onChange={(e) => { setCredit(e.target.value); setCreditError('') }}
              style={{ ...field, width: '90px', flexShrink: 0 }}
            />
            <input
              aria-label="Reason for the credit"
              value={note}
              maxLength={100}
              placeholder="Reason, shown to the customer"
              onChange={(e) => { setNote(e.target.value); setCreditError('') }}
              style={{ ...field, flex: 1 }}
            />
          </span>
          <button type="button" disabled={crediting} onClick={addCredit} style={{ alignSelf: 'flex-start', height: '36px', padding: '0 12px', border: `1px solid ${BORDER}`, borderRadius: '9px', background: '#fff', color: INK, font: `600 12.5px/1 ${FONT}`, cursor: 'pointer' }}>
            {crediting ? 'Adding…' : 'Add credit'}
          </button>
          {!!creditError && <span style={{ font: `400 12px/1.4 ${FONT}`, color: '#B3261E' }}>{creditError}</span>}
        </>
      )}
    </div>
  )
}
