import { useState } from 'react'
import { CARD_BRANDS, WALLETS, useOutboundSummary } from '../../lib/businessSettings'
import { BORDER, DANGER, FONT, INK, MUTED, errorText, hintText, inputStyle, labelStyle, selectStyle, withError } from '../content/styles'
import { Toggle } from '../content/ui'

// Controlled cards for Settings. `form` is the business_settings draft, `set(patch)` edits it,
// `errors` maps field → message. Saving happens with the page's "Save settings".

const cardStyle = { background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '10px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '14px' }

export function CardTitle({ title, dirty, note }) {
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <span style={{ font: `600 13.5px/1.2 ${FONT}`, color: INK, whiteSpace: 'nowrap' }}>{title}</span>
      {dirty && <span style={{ padding: '3px 8px', borderRadius: '6px', background: '#FFF4DB', color: '#8A5A00', font: `600 10.5px/1.2 ${FONT}` }}>Unsaved changes</span>}
      {note && <span style={{ marginLeft: 'auto', font: `500 11.5px/1.2 ${FONT}`, color: MUTED }}>{note}</span>}
    </span>
  )
}

export function Field({ label, error, hint, span2, children }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: '0', ...(span2 ? { gridColumn: 'span 2' } : null) }}>
      <span style={labelStyle}>{label}</span>
      {children}
      {error ? <span style={errorText}>{error}</span> : hint && <span style={hintText}>{hint}</span>}
    </label>
  )
}

export function Money({ value, onChange, error, disabled, suffix }) {
  return (
    <span style={withError({ ...inputStyle, display: 'flex', alignItems: 'center', gap: '6px' }, error)}>
      {!suffix && <span style={{ color: MUTED }}>$</span>}
      <input type="number" inputMode="decimal" min="0" step="0.01" value={value} disabled={disabled} onChange={(e) => onChange(e.target.value)} style={{ flex: '1', minWidth: '0', border: '0', outline: 'none', background: 'transparent', font: 'inherit', color: 'inherit', padding: '0' }} />
      {suffix && <span style={{ color: MUTED }}>{suffix}</span>}
    </span>
  )
}

export function ToggleRow({ title, sub, on, onChange, disabled, children, last }) {
  return (
    <span style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '11px 0', borderBottom: last ? '0' : '1px solid #EFF1ED' }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
        <span style={{ display: 'flex', flexDirection: 'column', gap: '3px', flex: '1', minWidth: '0' }}>
          <span style={{ font: `500 12.5px/1.2 ${FONT}`, color: INK }}>{title}</span>
          {sub && <span style={{ font: `400 11px/1.4 ${FONT}`, color: MUTED }}>{sub}</span>}
        </span>
        <Toggle on={on} onChange={onChange} label={title} disabled={disabled} />
      </span>
      {on && children}
    </span>
  )
}

function Check({ on, label, onChange, disabled }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: '7px', height: '32px', padding: '0 11px', border: `1px solid ${on ? '#9FD35A' : BORDER}`, borderRadius: '8px', background: on ? '#F1F9DF' : '#fff', font: `600 12px/1.2 ${FONT}`, color: on ? '#0B3D1F' : INK, cursor: disabled ? 'default' : 'pointer' }}>
      <input type="checkbox" checked={on} disabled={disabled} onChange={(e) => onChange(e.target.checked)} style={{ margin: '0', accentColor: '#0B3D1F' }} />
      {label}
    </label>
  )
}

// ─── Payments & tax ──────────────────────────────────────────────────────────────────────
export function PaymentsCard({ form, set, errors, disabled, dirty }) {
  const brand = (k, on) => set({ card_brands: on ? CARD_BRANDS.map(([b]) => b).filter((b) => b === k || form.card_brands.includes(b)) : form.card_brands.filter((b) => b !== k) })
  const methods = [form.accept_card, form.accept_apple_pay, form.accept_google_pay, form.accept_payid].filter(Boolean).length
  return (
    <div data-section="payments" style={cardStyle}>
      <CardTitle title="Payments & tax" dirty={dirty} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '12px' }}>
        <Field label="GST rate" error={errors.gst_rate} hint="Shown on invoices and in the app">
          <Money value={form.gst_rate} onChange={(x) => set({ gst_rate: x })} error={errors.gst_rate} disabled={disabled} suffix="%" />
        </Field>
        <Field label="Prices">
          <select value={form.prices_include_gst ? 'incl' : 'excl'} disabled={disabled} onChange={(e) => set({ prices_include_gst: e.target.value === 'incl' })} style={selectStyle}>
            <option value="incl">Include GST</option>
            <option value="excl">Exclude GST (added at checkout)</option>
          </select>
        </Field>
        <Field label="Refund destination" hint="Where approved refunds go by default">
          <select value={form.refund_destination} disabled={disabled} onChange={(e) => set({ refund_destination: e.target.value })} style={selectStyle}>
            <option value="wallet">Spice Kart Money (wallet)</option>
            <option value="original">Original payment method</option>
          </select>
        </Field>
        <Field label="Restocking fee (max)" error={errors.restocking_fee_max} hint="Most a return can be charged">
          <Money value={form.restocking_fee_max} onChange={(x) => set({ restocking_fee_max: x })} error={errors.restocking_fee_max} disabled={disabled} />
        </Field>
        <Field label="Card payments" span2 error={errors.payment_methods}>
          <span style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
            <Check on={form.accept_card} label="Accept cards" disabled={disabled} onChange={(on) => set({ accept_card: on })} />
            {form.accept_card && CARD_BRANDS.map(([k, l]) => <Check key={k} on={form.card_brands.includes(k)} label={l} disabled={disabled} onChange={(on) => brand(k, on)} />)}
          </span>
        </Field>
        <Field label="Wallets" span2 hint={`${methods} payment method${methods === 1 ? '' : 's'} on · the app hides the others and the server refuses them`}>
          <span style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
            {WALLETS.map(([k, l]) => <Check key={k} on={form[k]} label={l} disabled={disabled} onChange={(on) => set({ [k]: on })} />)}
          </span>
        </Field>
        <Field label="Payout schedule" hint="Used once a payment provider is connected">
          <select value={form.payout_schedule} disabled={disabled} onChange={(e) => set({ payout_schedule: e.target.value })} style={selectStyle}>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </Field>
      </div>
    </div>
  )
}

// ─── Notifications ───────────────────────────────────────────────────────────────────────
const PROVIDER_HINT = {
  email: 'Needs RESEND_API_KEY + RESEND_FROM in the send-push function secrets',
  sms: 'Needs TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN + TWILIO_FROM in the send-push function secrets',
}
function QueueNote({ stats, channel }) {
  const s = stats?.[channel]
  if (!s) return <span style={{ font: `400 11px/1.4 ${FONT}`, color: MUTED }}>Nothing sent in the last 7 days. {PROVIDER_HINT[channel] ?? ''}</span>
  return (
    <span style={{ font: `400 11px/1.4 ${FONT}`, color: s.failed ? DANGER : MUTED }}>
      Last 7 days: {s.sent} sent{s.pending ? ` · ${s.pending} waiting` : ''}{s.failed ? ` · ${s.failed} failed · ${s.lastError}` : ''}
    </span>
  )
}

export function NotificationsCard({ form, set, errors, disabled, dirty }) {
  const stats = useOutboundSummary()
  const [emailText, setEmailText] = useState(null)
  const emails = emailText ?? form.digest_emails.join(', ')
  return (
    <div data-section="notifications" style={{ ...cardStyle, gap: '2px' }}>
      <span style={{ paddingBottom: '6px' }}><CardTitle title="Notifications" dirty={dirty} /></span>
      <ToggleRow title="Order confirmation email" sub="Sent to the customer on every order (when they have an email)" on={form.notify_order_email} disabled={disabled} onChange={(on) => set({ notify_order_email: on })}>
        <QueueNote stats={stats} channel="email" />
      </ToggleRow>
      <ToggleRow title="Delivery SMS updates" sub="“On the way” and “delivered” texts to the customer’s mobile" on={form.notify_delivery_sms} disabled={disabled} onChange={(on) => set({ notify_delivery_sms: on })}>
        <QueueNote stats={stats} channel="sms" />
      </ToggleRow>
      <ToggleRow title="Promotional push" sub="Marketing campaigns from Notifications · when off, promotional campaigns can’t be sent" on={form.allow_promo_push} disabled={disabled} onChange={(on) => set({ allow_promo_push: on })} />
      <ToggleRow title="Low stock alerts to Slack" sub="Posts each new low / out-of-stock alert to a Slack channel" on={form.slack_low_stock} disabled={disabled} onChange={(on) => set({ slack_low_stock: on })}>
        <Field label="Slack incoming webhook URL" error={errors.slack_webhook_url} hint="Slack → Apps → Incoming Webhooks → pick the channel → copy the URL">
          <input value={form.slack_webhook_url ?? ''} placeholder="https://hooks.slack.com/services/…" disabled={disabled} onChange={(e) => set({ slack_webhook_url: e.target.value.trim() || null })} style={withError(inputStyle, errors.slack_webhook_url)} />
        </Field>
        <QueueNote stats={stats} channel="slack" />
      </ToggleRow>
      <ToggleRow title="Daily operations digest" sub="Yesterday’s orders, revenue, new customers, stock and alerts, emailed each morning" on={form.daily_digest} disabled={disabled} onChange={(on) => set({ daily_digest: on })} last>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 160px', gap: '12px' }}>
          <Field label="Send to" error={errors.digest_emails} hint="Emails, separated by commas">
            <input
              value={emails}
              placeholder="ops@yourstore.com.au, owner@yourstore.com.au"
              disabled={disabled}
              onChange={(e) => {
                setEmailText(e.target.value)
                set({ digest_emails: e.target.value.split(/[,\s]+/).map((s) => s.trim()).filter(Boolean) })
              }}
              style={withError(inputStyle, errors.digest_emails)}
            />
          </Field>
          <Field label="At (Melbourne)">
            <select value={form.digest_hour} disabled={disabled} onChange={(e) => set({ digest_hour: Number(e.target.value) })} style={selectStyle}>
              {Array.from({ length: 24 }, (_, h) => <option key={h} value={h}>{`${h % 12 || 12}:00 ${h < 12 ? 'AM' : 'PM'}`}</option>)}
            </select>
          </Field>
        </div>
        <QueueNote stats={stats} channel="email" />
      </ToggleRow>
    </div>
  )
}
