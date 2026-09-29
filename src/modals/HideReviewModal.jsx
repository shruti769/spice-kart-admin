import { useState } from 'react'
import { Modal } from '../components/content/ui'
import { FONT, INK, MUTED, btnPrimary, btnSecondary, errorText, inputStyle, labelStyle } from '../components/content/styles'
import { hideReview, productLabel, publishReview } from '../lib/reviews'
import { customerName } from '../lib/orders'

const REASONS = ['Offensive language', 'Spam or promotional', 'Not about this product', 'Names a staff member', 'Other']

/**
 * Hides a review from the app (with a reason) or, when it's hidden, shows it again.
 * Props: `review`, `onClose`, `onDone`, `flash`.
 */
export default function HideReviewModal({ review, onClose, onDone, flash }) {
  if (!review || !onClose) return null
  return <HideForm key={review.id} review={review} onClose={onClose} onDone={onDone} flash={flash} />
}

function HideForm({ review, onClose, onDone, flash }) {
  const unhide = review.status === 'hidden'
  const [reason, setReason] = useState(REASONS[0])
  const [other, setOther] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const blocked = !unhide && reason === 'Other' && !other.trim()

  const confirm = async () => {
    if (busy || blocked) return
    setBusy(true)
    setError('')
    try {
      if (unhide) await publishReview(review.id)
      else await hideReview(review.id, reason === 'Other' ? other : reason)
      flash?.(unhide ? 'Review is visible in the app again' : 'Review hidden from the app')
      onDone?.()
      onClose()
    } catch (e) {
      setError(e.message)
      setBusy(false)
    }
  }

  return (
    <Modal
      width={440}
      busy={busy}
      onClose={onClose}
      title={(
        <span style={{ display: 'flex', alignItems: 'flex-start', gap: '11px' }}>
          <span style={{ width: '34px', height: '34px', borderRadius: '9px', background: '#FBF1DE', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
            <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
              <path d="M2.4 10S5.3 5.4 10 5.4 17.6 10 17.6 10 14.7 14.6 10 14.6 2.4 10 2.4 10z" stroke="#8A6100" strokeWidth="1.5" strokeLinejoin="round" />
              <circle cx="10" cy="10" r="2.2" stroke="#8A6100" strokeWidth="1.5" />
            </svg>
          </span>
          <span style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '0' }}>
            <span>{unhide ? 'Show this review again?' : 'Hide this review?'}</span>
            <span style={{ font: `400 11.5px/1.55 ${FONT}`, color: MUTED }}>
              {unhide
                ? `${customerName(review.customer)} · ${review.rating}★ on ${productLabel(review)}. It’s published in the app again straight away.`
                : 'It stops showing in the app immediately but stays here in your moderation history.'}
            </span>
          </span>
        </span>
      )}
      footer={(
        <span style={{ marginLeft: 'auto', display: 'flex', gap: '9px' }}>
          <button type="button" onClick={onClose} disabled={busy} style={btnSecondary}>Cancel</button>
          <button type="button" onClick={confirm} disabled={busy || blocked} style={{ ...btnPrimary, opacity: busy || blocked ? 0.5 : 1 }}>
            {busy ? 'Saving…' : unhide ? 'Show review' : 'Hide review'}
          </button>
        </span>
      )}
    >
      {unhide ? (
        <span style={{ display: 'flex', flexDirection: 'column', gap: '6px', padding: '10px 11px', borderRadius: '8px', background: '#F6F7F4', border: '1px solid #E4E7E2' }}>
          <span style={labelStyle}>Hidden because</span>
          <span style={{ font: `400 12px/1.5 ${FONT}`, color: '#4A564E' }}>{review.hidden_reason || 'No reason recorded'}</span>
        </span>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={labelStyle}>Reason</span>
          {REASONS.map((r) => {
            const on = reason === r
            return (
              <button key={r} type="button" onClick={() => setReason(r)} disabled={busy} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 11px', border: `1px solid ${on ? '#C7E88A' : '#E4E7E2'}`, background: on ? '#F7FCEE' : '#fff', borderRadius: '8px', cursor: 'pointer', textAlign: 'left' }}>
                <span style={{ width: '16px', height: '16px', borderRadius: '8px', border: `2px solid ${on ? '#8BE000' : '#C9D0C8'}`, background: on ? '#8BE000' : 'transparent', display: 'block', flex: 'none', boxSizing: 'border-box' }} />
                <span style={{ font: `600 12px/1.2 ${FONT}`, color: INK, whiteSpace: 'nowrap' }}>{r}</span>
              </button>
            )
          })}
          {reason === 'Other' && (
            <input autoFocus value={other} onChange={(e) => setOther(e.target.value)} maxLength={300} disabled={busy} placeholder="Why is it being hidden?" style={inputStyle} />
          )}
        </div>
      )}
      {error && <span style={{ ...errorText, font: `500 12px/1.4 ${FONT}` }}>{error}</span>}
    </Modal>
  )
}
