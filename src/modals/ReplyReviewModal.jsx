import { useState } from 'react'
import { Modal } from '../components/content/ui'
import { FONT, MUTED, btnPrimary, btnSecondary, errorText, hintText, inputStyle, labelStyle } from '../components/content/styles'
import { productLabel, replyToReview } from '../lib/reviews'
import { relativeDay } from '../lib/customers'
import { customerName } from '../lib/orders'

const STAR = 'M10 3.2l2.1 4.3 4.7.7-3.4 3.3.8 4.7L10 14l-4.2 2.2.8-4.7L3.2 8.2l4.7-.7L10 3.2z'

/**
 * Reply to a review (the customer is notified; a pending review is published with the reply).
 * Props: `review`, `now` (ms), `onClose`, `onDone`, `flash`.
 */
export default function ReplyReviewModal({ review, now, onClose, onDone, flash }) {
  if (!review || !onClose) return null
  return <ReplyForm key={review.id} review={review} now={now} onClose={onClose} onDone={onDone} flash={flash} />
}

function ReplyForm({ review, now, onClose, onDone, flash }) {
  const [text, setText] = useState(review.reply ?? '')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const first = review.customer?.first_name?.trim()
  const hi = first ? `Hi ${first}, ` : 'Hi, '
  const product = review.product?.name
  const templates = [
    ['Thank the customer', `${hi}thanks so much for the review${product ? ` of our ${product}` : ''}! We’re glad you enjoyed it.`],
    ['Apologise', `${hi}we’re sorry this didn’t meet expectations. Please reach out to our support team through the app so we can make it right.`],
    ['Follow up', `${hi}thanks for the feedback — we’ve shared it with our team and we’re looking into it.`],
  ]

  const save = async (value) => {
    if (busy) return
    setBusy(true)
    setError('')
    try {
      await replyToReview(review, value)
      flash?.(value.trim() ? 'Reply posted · the customer has been notified' : 'Reply removed')
      onDone?.()
      onClose()
    } catch (e) {
      setError(e.message)
      setBusy(false)
    }
  }

  const empty = !text.trim()
  return (
    <Modal
      width={470}
      busy={busy}
      onClose={onClose}
      title={(
        <span style={{ display: 'flex', alignItems: 'flex-start', gap: '11px' }}>
          <span style={{ width: '34px', height: '34px', borderRadius: '9px', background: '#FBF1DE', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
            <svg width="17" height="17" viewBox="0 0 20 20" fill="none"><path d={STAR} stroke="#8A6100" strokeWidth="1.5" strokeLinejoin="round" /></svg>
          </span>
          <span style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '0' }}>
            <span>{review.reply ? 'Edit reply' : 'Reply to review'}</span>
            <span style={{ font: `400 11.5px/1.55 ${FONT}`, color: MUTED }}>
              {customerName(review.customer)} · {review.rating} star{review.rating === 1 ? '' : 's'} on {productLabel(review)}. The customer is notified of your reply.
            </span>
          </span>
        </span>
      )}
      footer={(
        <>
          {review.reply && (
            <button type="button" onClick={() => save('')} disabled={busy} style={{ ...btnSecondary, color: '#A93826' }}>Remove reply</button>
          )}
          <span style={{ marginLeft: 'auto', display: 'flex', gap: '9px' }}>
            <button type="button" onClick={onClose} disabled={busy} style={btnSecondary}>Cancel</button>
            <button type="button" onClick={() => save(text)} disabled={busy || empty} style={{ ...btnPrimary, opacity: busy || empty ? 0.5 : 1 }}>
              {busy ? 'Saving…' : review.reply ? 'Update reply' : 'Post reply'}
            </button>
          </span>
        </>
      )}
    >
      <span style={{ display: 'flex', flexDirection: 'column', gap: '6px', padding: '11px', borderRadius: '9px', background: '#F6F7F4', border: '1px solid #E4E7E2' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <svg width="13" height="13" viewBox="0 0 20 20" fill="none"><path d={STAR} stroke="#C89A28" strokeWidth="1.5" strokeLinejoin="round" /></svg>
          <span style={{ font: `600 11.5px/1.2 ${FONT}`, color: '#17201A' }}>{review.rating.toFixed(1)} · {relativeDay(review.created_at, now ?? new Date(review.created_at).getTime())}</span>
        </span>
        <span style={{ font: `400 11.5px/1.55 ${FONT}`, color: '#4A564E', whiteSpace: 'pre-wrap' }}>{review.comment || 'No written comment · rating only'}</span>
      </span>
      <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <span style={labelStyle}>Your reply</span>
        <textarea autoFocus value={text} onChange={(e) => setText(e.target.value)} disabled={busy} rows={4} maxLength={1000} placeholder="Write a reply…" style={{ ...inputStyle, height: 'auto', padding: '10px 11px', font: `400 12px/1.6 ${FONT}`, resize: 'vertical' }} />
      </label>
      <span style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
        {templates.map(([label, body]) => (
          <button key={label} type="button" onClick={() => setText(body)} disabled={busy} style={{ font: `600 11px/1.2 ${FONT}`, color: '#4A564E', background: '#fff', border: '1px solid #E4E7E2', padding: '7px 10px', borderRadius: '7px', whiteSpace: 'nowrap', cursor: 'pointer' }}>
            {label}
          </button>
        ))}
      </span>
      {review.status === 'pending' && <span style={hintText}>Posting a reply also publishes this review in the app.</span>}
      {error && <span style={{ ...errorText, font: `500 12px/1.4 ${FONT}` }}>{error}</span>}
    </Modal>
  )
}
