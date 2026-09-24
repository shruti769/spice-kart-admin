import { useState } from 'react'
import { useCategories } from '../lib/categories'
import {
  CODE_PATTERN, DISCOUNT_TYPES, STATUS_PILL, couponStatus, createCoupon, deleteCoupon, isoToLocalInput, localInputToIso, money,
  sanitizeCode, updateCoupon, useCoupons,
} from '../lib/coupons'
import { isSupabaseConfigured } from '../lib/supabase'

const FONT = 'Inter,system-ui,sans-serif'
const ERROR_RED = '#B3402F'
const MAX_NUMERIC = 99999999 // numeric(10, 2)

const EMPTY_FORM = {
  code: '', title: '', description: '', discount_type: 'flat', value: '', max_discount: '', min_spend: '',
  category_id: '', starts_at: '', ends_at: '', active: true,
}

const numText = (x) => (x == null ? '' : String(Number(x)))
function rowToForm(row) {
  return {
    code: row.code ?? '',
    title: row.title ?? '',
    description: row.description ?? '',
    discount_type: row.discount_type ?? 'flat',
    value: row.discount_type === 'free_delivery' ? '' : numText(row.value),
    max_discount: numText(row.max_discount),
    min_spend: Number(row.min_spend) > 0 ? numText(row.min_spend) : '',
    category_id: row.category_id ?? '',
    starts_at: isoToLocalInput(row.starts_at),
    ends_at: isoToLocalInput(row.ends_at),
    active: row.active !== false,
  }
}

// ---- styles (match the original static field boxes) ----
const labelStyle = { font: `600 10.5px/1.2 ${FONT}`, letterSpacing: '.4px', color: '#7C8A81', textTransform: 'uppercase', whiteSpace: 'nowrap' }
const boxBase = { height: '36px', padding: '0 11px', border: '1px solid #E4E7E2', borderRadius: '8px', background: '#fff', font: `500 12.5px/1.2 ${FONT}`, color: '#17201A', width: '100%', minWidth: '0', boxSizing: 'border-box', outline: 'none' }
const areaBase = { display: 'block', minHeight: '60px', padding: '10px 11px', border: '1px solid #E4E7E2', borderRadius: '8px', background: '#fff', font: `400 12.5px/1.6 ${FONT}`, color: '#4A564E', width: '100%', boxSizing: 'border-box', outline: 'none', resize: 'vertical' }
const chevron = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M6 8l4 4 4-4' stroke='%237C8A81' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`
const withError = (style, err) => (err ? { ...style, borderColor: ERROR_RED } : style)
const cardStyle = { background: '#fff', border: '1px solid #E4E7E2', borderRadius: '10px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '14px' }
const cardTitle = { font: `600 13.5px/1.2 ${FONT}`, color: '#17201A', whiteSpace: 'nowrap' }
const btnSecondary = { display: 'flex', alignItems: 'center', gap: '7px', height: '34px', padding: '0 12px', border: '1px solid #E4E7E2', borderRadius: '8px', background: '#fff', color: '#17201A', font: `600 12.5px/1.2 ${FONT}`, cursor: 'pointer', whiteSpace: 'nowrap' }
const btnPrimary = { display: 'flex', alignItems: 'center', gap: '7px', height: '34px', padding: '0 13px', border: '0', borderRadius: '8px', background: '#0B3D1F', color: '#fff', font: `600 12.5px/1.2 ${FONT}`, cursor: 'pointer', whiteSpace: 'nowrap' }

function Field({ label, error, hint, span2, children }) {
  return (
    <span style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: '0', ...(span2 ? { gridColumn: 'span 2' } : null) }}>
      <span style={labelStyle}>{label}</span>
      {children}
      {error
        ? <span style={{ font: `500 11px/1.3 ${FONT}`, color: ERROR_RED }}>{error}</span>
        : hint && <span style={{ font: `400 11px/1.3 ${FONT}`, color: '#7C8A81' }}>{hint}</span>}
    </span>
  )
}

function TextInput({ value, onChange, error, ...rest }) {
  return <input className="sk-input" type="text" value={value} onChange={(e) => onChange(e.target.value)} style={withError(boxBase, error)} aria-invalid={Boolean(error)} {...rest} />
}

function NumberInput({ value, onChange, error, prefix, suffix, ...rest }) {
  return (
    <span className="sk-input-wrap" style={withError({ ...boxBase, display: 'flex', alignItems: 'center', gap: '4px' }, error)}>
      {prefix && <span style={{ color: '#7C8A81', flex: 'none' }}>{prefix}</span>}
      <input
        className="sk-input sk-input-bare"
        type="number"
        inputMode="decimal"
        min="0"
        step="0.01"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        style={{ ...boxBase, height: '34px', padding: '0', border: '0', background: 'transparent', flex: '1' }}
        {...rest}
      />
      {suffix && <span style={{ color: '#7C8A81', flex: 'none' }}>{suffix}</span>}
    </span>
  )
}

function Toggle({ on, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      style={{ width: '38px', height: '22px', borderRadius: '11px', background: on ? '#8BE000' : '#DCDDD8', position: 'relative', flex: 'none', display: 'block', border: '0', padding: '0', cursor: 'pointer', transition: 'background .15s' }}
    >
      <span style={{ position: 'absolute', top: '2.5px', left: on ? '18px' : '2.5px', width: '17px', height: '17px', borderRadius: '9px', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,.2)', display: 'block', transition: 'left .15s' }} />
    </button>
  )
}

// ---- validation (mirrors the `public.coupons` check constraints) ----
const toNumber = (s) => (String(s).trim() === '' ? null : Number(s))

function validate(f, takenCodes) {
  const errors = {}
  if (!f.code) errors.code = 'Promo code is required'
  else if (!CODE_PATTERN.test(f.code)) errors.code = 'Use 3–20 characters: A–Z, 0–9, - or _'
  else if (takenCodes.has(f.code)) errors.code = 'This code already exists'
  if (!f.title.trim()) errors.title = 'Offer name is required'

  const value = toNumber(f.value)
  if (f.discount_type === 'flat') {
    if (value === null) errors.value = 'Enter the discount amount'
    else if (Number.isNaN(value) || value <= 0) errors.value = 'Must be greater than $0'
    else if (value > MAX_NUMERIC) errors.value = 'That amount is too large'
  } else if (f.discount_type === 'percent') {
    if (value === null) errors.value = 'Enter the percentage off'
    else if (Number.isNaN(value) || value <= 0 || value > 100) errors.value = 'Enter a percentage above 0 and up to 100'
    const max = toNumber(f.max_discount)
    if (max !== null && (Number.isNaN(max) || max <= 0)) errors.max_discount = 'Must be greater than $0 (or leave empty)'
    else if (max !== null && max > MAX_NUMERIC) errors.max_discount = 'That amount is too large'
  }

  const minSpend = toNumber(f.min_spend)
  if (minSpend !== null && (Number.isNaN(minSpend) || minSpend < 0)) errors.min_spend = 'Enter $0 or more'
  else if (minSpend !== null && minSpend > MAX_NUMERIC) errors.min_spend = 'That amount is too large'

  const starts = localInputToIso(f.starts_at)
  const ends = localInputToIso(f.ends_at)
  if (starts === undefined) errors.starts_at = 'Enter a valid date and time'
  if (ends === undefined) errors.ends_at = 'Enter a valid date and time'
  if (starts && ends && new Date(ends) <= new Date(starts)) errors.ends_at = 'Must be after the start date'
  return errors
}

function toRow(f) {
  const isPercent = f.discount_type === 'percent'
  return {
    code: f.code,
    title: f.title.trim(),
    description: f.description.trim(),
    discount_type: f.discount_type,
    value: f.discount_type === 'free_delivery' ? 0 : Number(f.value),
    max_discount: isPercent && toNumber(f.max_discount) !== null ? Number(f.max_discount) : null,
    min_spend: toNumber(f.min_spend) ?? 0,
    category_id: f.category_id || null,
    starts_at: localInputToIso(f.starts_at),
    ends_at: localInputToIso(f.ends_at),
    active: f.active,
  }
}

export default function NewPromotion({ v }) {
  const editing = v.editingCoupon
  const [form, setForm] = useState(() => (editing ? rowToForm(editing) : EMPTY_FORM))
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const categoryState = useCategories()
  const coupons = useCoupons()

  const set = (key) => (value) => {
    setForm((f) => ({ ...f, [key]: value }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }))
  }
  const setType = (type) => {
    setForm((f) => ({ ...f, discount_type: type }))
    setErrors((e) => ({ ...e, value: undefined, max_discount: undefined }))
  }

  const categoryOptions = categoryState.rows.filter((c) => c.enabled || c.id === form.category_id)
  const categoryName = categoryState.rows.find((c) => c.id === form.category_id)?.name || form.category_id
  const takenCodes = new Set(coupons.rows.filter((c) => c.id !== editing?.id).map((c) => c.code))
  const isPercent = form.discount_type === 'percent'
  const isFree = form.discount_type === 'free_delivery'

  // Live preview + status of the values being edited.
  const valueNum = toNumber(form.value)
  const headline = isFree
    ? 'FREE DELIVERY'
    : valueNum > 0
      ? (isPercent ? `${valueNum}% OFF` : `${money(valueNum)} OFF`)
      : (isPercent ? '–% OFF' : '$– OFF')
  const conditions = [
    toNumber(form.min_spend) > 0 ? `Min spend ${money(form.min_spend)}` : null,
    form.category_id ? `On ${categoryName} only` : null,
    isPercent && toNumber(form.max_discount) > 0 ? `Up to ${money(form.max_discount)} off` : null,
  ].filter(Boolean).join(' · ')
  const previewStatus = couponStatus({
    active: form.active,
    starts_at: localInputToIso(form.starts_at) || null,
    ends_at: localInputToIso(form.ends_at) || null,
  })
  const [statusLabel, statusFg, statusBg] = STATUS_PILL[previewStatus]

  const save = async () => {
    if (saving) return
    const found = validate(form, takenCodes)
    setErrors(found)
    if (Object.keys(found).length) {
      return v.flash(found.code === 'This code already exists' ? 'Could not save · this code already exists' : 'Check the highlighted fields before saving')
    }
    if (!isSupabaseConfigured) return v.flash('Supabase keys are missing · add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to .env and restart the dev server')
    setSaving(true)
    try {
      const row = toRow(form)
      if (editing) await updateCoupon(editing.id, row)
      else await createCoupon(row)
      v.flash(editing ? `Coupon ${row.code} saved` : `Coupon ${row.code} created${row.active ? '' : ' · paused'}`)
      v.couponDone()
    } catch (err) {
      setSaving(false)
      if (err?.duplicate) {
        setErrors((e) => ({ ...e, code: 'This code already exists' }))
        v.flash('Could not save · this code already exists')
      } else {
        v.flash(`Could not save coupon · ${err?.message || 'unknown error'}`)
      }
    }
  }

  const remove = async () => {
    if (!editing || saving) return
    if (!confirmDelete) return setConfirmDelete(true)
    setSaving(true)
    try {
      await deleteCoupon(editing.id)
      v.flash(`Coupon ${editing.code} deleted`)
      v.couponDone()
    } catch (err) {
      setSaving(false)
      setConfirmDelete(false)
      v.flash(`Could not delete coupon · ${err?.message || 'unknown error'}`)
    }
  }

  const selectStyle = { ...boxBase, appearance: 'none', WebkitAppearance: 'none', paddingRight: '30px', cursor: 'pointer', backgroundImage: chevron, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center' }

  return (
    <>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "18px", padding: "24px 26px 2px" }}>
        <span style={{ display: "flex", flexDirection: "column", gap: "5px", minWidth: "0" }}>
          <span style={{ font: "700 20px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>{editing ? 'Edit coupon' : 'Create coupon'}</span>
          <span style={{ font: "400 12.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>
            {editing ? `${editing.code} · ${editing.title}` : 'Set up a new promo code for the Spice Kart app'}
          </span>
        </span>
        <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px" }}>
          <button className="hv1" onClick={v.couponDone} disabled={saving} style={btnSecondary}>
            {editing ? 'Cancel' : 'Discard'}
          </button>
          {editing && confirmDelete && (
            <button className="hv1" onClick={() => setConfirmDelete(false)} disabled={saving} style={btnSecondary}>
              Keep coupon
            </button>
          )}
          {editing && (
            <button
              className="hv1"
              onClick={remove}
              disabled={saving}
              style={{ ...btnSecondary, color: ERROR_RED, ...(confirmDelete ? { borderColor: ERROR_RED, background: '#FAEDEA' } : null) }}
            >
              {confirmDelete ? 'Confirm delete' : 'Delete'}
            </button>
          )}
          <button className="hv2" onClick={save} disabled={saving} style={{ ...btnPrimary, opacity: saving ? 0.7 : 1, cursor: saving ? 'default' : 'pointer' }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
              <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#8BE000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {saving ? 'Saving…' : editing ? 'Save changes' : 'Create coupon'}
          </button>
        </span>
      </div>
      <div className="ad-scroll" style={{ flex: "1", minHeight: "0", overflowY: "auto", padding: "20px 26px 30px", display: "flex", flexDirection: "column", gap: "18px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.7fr 1fr", gap: "18px", alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={cardStyle}>
              <span style={cardTitle}>Offer type</span>
              <div role="radiogroup" aria-label="Offer type" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "8px" }}>
                {DISCOUNT_TYPES.map(([type, label]) => {
                  const on = form.discount_type === type
                  return (
                    <button
                      key={type}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      onClick={() => setType(type)}
                      style={{ textAlign: 'left', padding: "11px 10px", border: `1px solid ${on ? '#C7E88A' : '#E4E7E2'}`, background: on ? '#F1F9DF' : '#fff', borderRadius: "8px", font: "600 11.5px/1.35 Inter,system-ui,sans-serif", color: on ? '#0B3D1F' : '#4A564E', cursor: 'pointer' }}
                    >
                      {label}
                    </button>
                  )
                })}
              </div>
            </div>
            <div style={cardStyle}>
              <span style={cardTitle}>Offer details</span>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "11px" }}>
                <Field label="OFFER NAME" error={errors.title}>
                  <TextInput value={form.title} onChange={set('title')} error={errors.title} placeholder="e.g. $5 off your first order" maxLength={80} />
                </Field>
                <Field label="PROMO CODE" error={errors.code} hint="3–20 characters: A–Z, 0–9, - or _">
                  <TextInput
                    value={form.code}
                    onChange={(s) => set('code')(sanitizeCode(s))}
                    error={errors.code}
                    placeholder="e.g. SPICE5"
                    autoCapitalize="characters"
                    spellCheck={false}
                    style={{ ...withError(boxBase, errors.code), letterSpacing: '.6px', fontWeight: 600 }}
                  />
                </Field>
                {!isFree && (
                  <Field label={isPercent ? 'PERCENTAGE OFF' : 'DISCOUNT AMOUNT'} error={errors.value}>
                    <NumberInput
                      value={form.value}
                      onChange={set('value')}
                      error={errors.value}
                      prefix={isPercent ? null : '$'}
                      suffix={isPercent ? '%' : null}
                      max={isPercent ? 100 : undefined}
                      placeholder={isPercent ? '20' : '5.00'}
                    />
                  </Field>
                )}
                {isPercent && (
                  <Field label="MAXIMUM DISCOUNT" error={errors.max_discount} hint="Optional cap · leave empty for no cap">
                    <NumberInput value={form.max_discount} onChange={set('max_discount')} error={errors.max_discount} prefix="$" placeholder="No cap" />
                  </Field>
                )}
                <Field label="MINIMUM ORDER VALUE" error={errors.min_spend} hint={form.category_id ? `Counts ${categoryName} items only` : 'Leave empty for no minimum'}>
                  <NumberInput value={form.min_spend} onChange={set('min_spend')} error={errors.min_spend} prefix="$" placeholder="No minimum" />
                </Field>
                <Field label="DESCRIPTION SHOWN IN APP" span2>
                  <textarea
                    className="sk-input"
                    rows={2}
                    value={form.description}
                    onChange={(e) => set('description')(e.target.value)}
                    placeholder="e.g. $5 off your first Spice Kart order. Min spend $25."
                    maxLength={300}
                    style={areaBase}
                  />
                </Field>
              </div>
            </div>
            <div style={cardStyle}>
              <span style={cardTitle}>Schedule & eligibility</span>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "11px" }}>
                <Field label="START DATE" error={errors.starts_at} hint="Leave empty to start immediately">
                  <input
                    className="sk-input"
                    type="datetime-local"
                    value={form.starts_at}
                    onChange={(e) => set('starts_at')(e.target.value)}
                    aria-invalid={Boolean(errors.starts_at)}
                    style={{ ...withError(boxBase, errors.starts_at), color: form.starts_at ? '#17201A' : '#A3ADA6' }}
                  />
                </Field>
                <Field label="END DATE" error={errors.ends_at} hint="Leave empty to run until paused">
                  <input
                    className="sk-input"
                    type="datetime-local"
                    value={form.ends_at}
                    min={form.starts_at || undefined}
                    onChange={(e) => set('ends_at')(e.target.value)}
                    aria-invalid={Boolean(errors.ends_at)}
                    style={{ ...withError(boxBase, errors.ends_at), color: form.ends_at ? '#17201A' : '#A3ADA6' }}
                  />
                </Field>
                <Field label="APPLICABLE CATEGORIES" hint={form.category_id ? 'Only this category’s items count towards the discount' : 'Applies to the whole cart'}>
                  <select
                    className="sk-input"
                    value={form.category_id}
                    onChange={(e) => set('category_id')(e.target.value)}
                    disabled={categoryState.status === 'loading' && !categoryState.rows.length}
                    style={selectStyle}
                  >
                    <option value="">All products</option>
                    {categoryOptions.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}{c.enabled ? '' : ' (hidden)'}</option>
                    ))}
                    {form.category_id && !categoryOptions.some((c) => c.id === form.category_id) && (
                      <option value={form.category_id}>{form.category_id}</option>
                    )}
                  </select>
                </Field>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ ...cardStyle, gap: "13px" }}>
              <span style={cardTitle}>App preview</span>
              <span style={{ borderRadius: "10px", background: "linear-gradient(122deg,#0B3D1F 0%,#14572A 56%,#1F7135 100%)", padding: "14px", display: "flex", flexDirection: "column", gap: "9px" }}>
                <span style={{ font: "700 9px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".9px", color: "#8BE000", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {(form.title.trim() || 'Your offer').toUpperCase()}
                </span>
                <span style={{ font: "800 20px/1 Inter,system-ui", color: "#fff", whiteSpace: "nowrap" }}>{headline}</span>
                {(form.description.trim() || conditions) && (
                  <span style={{ font: "500 10.5px/1.45 Inter,system-ui,sans-serif", color: "rgba(255,255,255,.72)" }}>
                    {form.description.trim() || conditions}
                  </span>
                )}
                <span style={{ font: "700 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: "1.2px", color: "#8BE000", border: "1px dashed rgba(139,224,0,.6)", background: "rgba(139,224,0,.08)", padding: "6px 9px", borderRadius: "6px", alignSelf: "flex-start", whiteSpace: "nowrap" }}>
                  {form.code || 'CODE'}
                </span>
              </span>
            </div>
            <div style={{ ...cardStyle, gap: "2px" }}>
              <span style={{ ...cardTitle, paddingBottom: "6px" }}>Visibility</span>
              <span style={{ display: "flex", alignItems: "center", gap: "11px", padding: "10px 0", borderBottom: "1px solid #EFF1ED" }}>
                <span style={{ display: "flex", flexDirection: "column", gap: "3px", flex: "1", minWidth: "0" }}>
                  <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Active</span>
                  <span style={{ font: "400 11px/1.35 Inter,system-ui,sans-serif", color: "#7C8A81" }}>Shown on the Offers screen and usable at checkout within its dates</span>
                </span>
                <Toggle on={form.active} onChange={set('active')} label="Active" />
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "11px", padding: "10px 0" }}>
                <span style={{ font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", flex: "1" }}>Status after saving</span>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", color: statusFg, background: statusBg, padding: "5px 8px", borderRadius: "5px", whiteSpace: "nowrap" }}>
                  {statusLabel}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
