import { useEffect, useRef, useState } from 'react'
import { isoToLocalInput, localInputToIso } from '../lib/coupons'
import { FREE_DELIVERY_TOKEN, createOfferTile, removeOfferImage, tileImageSrc, tileText, updateOfferTile, uploadOfferImage } from '../lib/offerTiles'
import { validateImage } from '../lib/categories'

const FONT = 'Inter,system-ui,sans-serif'
const INK = '#17201A'
const MUTED = '#7C8A81'
const DANGER = '#B3402F'
const BORDER = '#E4E7E2'

const labelStyle = { font: `600 10.5px/1.2 ${FONT}`, letterSpacing: '.4px', color: MUTED, textTransform: 'uppercase', whiteSpace: 'nowrap' }
const inputStyle = { height: '36px', padding: '0 11px', border: `1px solid ${BORDER}`, borderRadius: '8px', background: '#fff', font: `500 12.5px/1.2 ${FONT}`, color: INK, outline: 'none', width: '100%', minWidth: '0', boxSizing: 'border-box' }
const hint = { font: `400 11px/1.3 ${FONT}`, color: MUTED }
const errorText = { font: `400 11px/1.3 ${FONT}`, color: DANGER }
const withError = (style, err) => (err ? { ...style, borderColor: DANGER } : style)

function Field({ label, error, note, span, children }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', gridColumn: span ? 'span 2' : undefined, minWidth: 0 }}>
      <span style={labelStyle}>{label}</span>
      {children}
      {error ? <span style={errorText}>{error}</span> : note && <span style={hint}>{note}</span>}
    </label>
  )
}

/**
 * Create / edit one Offers-screen tile. `tile` is the row being edited (null = new `kind` tile).
 * Saves to Supabase itself and calls `onSaved(message)`.
 */
export default function OfferTileModal({ tile, kind, sort, categories, freeOver, onClose, onSaved }) {
  const isEdit = !!tile
  const isDeal = (tile?.kind ?? kind) === 'deal'
  const [form, setForm] = useState(() => ({
    title: tile?.title ?? '',
    subtitle: tile?.subtitle ?? '',
    category_id: tile?.category_id ?? '',
    icon: tile?.icon ?? 'card',
    badge: tile?.badge ?? '',
    starts_at: isoToLocalInput(tile?.starts_at),
    ends_at: isoToLocalInput(tile?.ends_at),
    active: tile?.active ?? true,
  }))
  const imageUrl = tile?.image_url ?? null
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const fileRef = useRef(null)
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && !saving) onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, saving])

  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview) }, [preview])

  const pickFile = (e) => {
    const f = e.target.files?.[0]
    e.target.value = ''
    if (!f) return
    const problem = validateImage(f)
    if (problem) return setErrors((x) => ({ ...x, image: problem }))
    setErrors((x) => ({ ...x, image: undefined }))
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }

  const submit = async () => {
    const next = {}
    if (!form.title.trim()) next.title = 'Enter a title'
    const starts = localInputToIso(form.starts_at)
    const ends = localInputToIso(form.ends_at)
    if (starts === undefined) next.starts_at = 'Invalid date'
    if (ends === undefined) next.ends_at = 'Invalid date'
    if (starts && ends && ends <= starts) next.ends_at = 'End must be after the start'
    if (isDeal && !file && !imageUrl) next.image = 'Add an image'
    setErrors(next)
    if (Object.keys(next).length) return

    setSaving(true)
    let uploaded = null
    try {
      if (file) uploaded = await uploadOfferImage(file)
      const row = {
        title: form.title.trim(),
        subtitle: form.subtitle.trim(),
        starts_at: starts,
        ends_at: ends,
        active: form.active,
        ...(isDeal
          ? { image_url: uploaded ?? imageUrl, category_id: form.category_id || null }
          : { icon: form.icon, badge: form.badge.trim() }),
      }
      if (isEdit) await updateOfferTile(tile.id, row)
      else await createOfferTile({ ...row, kind, sort })
      // Replaced artwork: drop the old upload.
      if (uploaded && tile?.image_url) removeOfferImage(tile.image_url)
      onSaved(`${isEdit ? 'Saved' : 'Added'} “${tileText(row.title, freeOver)}”${row.active ? '' : ' · paused'}`)
    } catch (e) {
      if (uploaded) removeOfferImage(uploaded)
      setErrors({ form: e.message })
      setSaving(false)
    }
  }

  const shownImage = preview ?? tileImageSrc(imageUrl)

  return (
    <div onClick={() => !saving && onClose()} style={{ position: 'fixed', inset: '0', zIndex: '90', background: 'rgba(14,22,16,.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
      <div onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" style={{ width: '520px', maxWidth: '100%', maxHeight: '100%', background: '#fff', borderRadius: '14px', boxShadow: '0 26px 60px rgba(10,18,12,.3)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '16px 18px 14px', display: 'flex', flexDirection: 'column', gap: '4px', borderBottom: '1px solid #EFF1ED' }}>
          <span style={{ font: `700 15px/1.2 ${FONT}`, color: INK }}>{isEdit ? 'Edit' : 'Add'} {isDeal ? 'deal tile' : 'bank & payment offer'}</span>
          <span style={{ font: `400 11.5px/1.5 ${FONT}`, color: MUTED }}>
            {isDeal ? 'Shown under “Shop the deals” on the app’s Offers screen. Tapping it opens the chosen category.' : 'Shown under “Bank & payment offers” on the app’s Offers screen.'}
          </span>
        </div>
        <div className="ad-scroll" style={{ padding: '15px 18px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '13px', overflowY: 'auto' }}>
          {isDeal && (
            <Field label="Image" error={errors.image} note="PNG, SVG or WebP, up to 1 MB · shown about 180 × 90" span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ width: '150px', height: '75px', borderRadius: '8px', border: `1px solid ${BORDER}`, background: '#F6F7F4', overflow: 'hidden', flex: 'none' }}>
                  {shownImage && <img src={shownImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
                </span>
                <button type="button" onClick={() => fileRef.current?.click()} style={{ height: '32px', padding: '0 12px', border: `1px solid ${BORDER}`, borderRadius: '8px', background: '#fff', font: `600 12px/1.2 ${FONT}`, color: INK, cursor: 'pointer' }}>
                  {shownImage ? 'Replace image' : 'Upload image'}
                </button>
                <input ref={fileRef} type="file" accept="image/png,image/svg+xml,image/webp,image/jpeg" onChange={pickFile} style={{ display: 'none' }} />
              </span>
            </Field>
          )}
          <Field label="Title" error={errors.title} note={`Use ${FREE_DELIVERY_TOKEN} to show the current free-delivery amount`} span>
            <input value={form.title} maxLength={60} onChange={set('title')} placeholder={isDeal ? 'e.g. Fresh vegetables' : 'e.g. 10% off with Visa cards'} style={withError(inputStyle, errors.title)} />
          </Field>
          <Field label="Subtitle" span>
            <input value={form.subtitle} maxLength={80} onChange={set('subtitle')} placeholder={isDeal ? 'e.g. Min spend $25' : 'e.g. Max $12 · min spend $40'} style={inputStyle} />
          </Field>
          {isDeal ? (
            <Field label="Opens category" note="Leave empty to open the Categories tab" span>
              <select value={form.category_id} onChange={set('category_id')} style={inputStyle}>
                <option value="">Categories tab</option>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </Field>
          ) : (
            <>
              <Field label="Icon">
                <select value={form.icon} onChange={set('icon')} style={inputStyle}>
                  <option value="card">Card</option>
                  <option value="wallet">Wallet / cashback</option>
                </select>
              </Field>
              <Field label="Badge" note="Small pill on the right">
                <input value={form.badge} maxLength={16} onChange={set('badge')} placeholder="e.g. Auto" style={inputStyle} />
              </Field>
            </>
          )}
          <Field label="Start" error={errors.starts_at} note="Empty = show now">
            <input type="datetime-local" value={form.starts_at} onChange={set('starts_at')} style={withError(inputStyle, errors.starts_at)} />
          </Field>
          <Field label="End" error={errors.ends_at} note="Empty = until paused">
            <input type="datetime-local" value={form.ends_at} onChange={set('ends_at')} style={withError(inputStyle, errors.ends_at)} />
          </Field>
          <label style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', gap: '9px', font: `500 12.5px/1.2 ${FONT}`, color: INK, cursor: 'pointer' }}>
            <input type="checkbox" checked={form.active} onChange={set('active')} style={{ margin: 0, accentColor: '#0B3D1F' }} />
            Active · shown in the app within its dates
          </label>
          {errors.form && <span style={{ ...errorText, gridColumn: 'span 2' }}>{errors.form}</span>}
        </div>
        <div style={{ padding: '13px 18px 16px', display: 'flex', justifyContent: 'flex-end', gap: '9px', borderTop: '1px solid #EFF1ED', background: '#F6F7F4' }}>
          <button onClick={onClose} disabled={saving} style={{ height: '36px', padding: '0 14px', border: `1px solid ${BORDER}`, borderRadius: '8px', background: '#fff', font: `600 12.5px/1.2 ${FONT}`, color: INK, cursor: 'pointer' }}>
            Cancel
          </button>
          <button onClick={submit} disabled={saving} style={{ height: '36px', padding: '0 15px', border: '0', borderRadius: '8px', background: '#0B3D1F', color: '#fff', font: `600 12.5px/1.2 ${FONT}`, cursor: saving ? 'wait' : 'pointer', opacity: saving ? 0.7 : 1 }}>
            {saving ? 'Saving…' : isEdit ? 'Save' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  )
}
