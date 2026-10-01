import { useEffect, useRef, useState } from 'react'
import imgFreshCoriander from '../assets/images/fresh-coriander.jpg'
import { useCategories } from '../lib/categories'
import {
  FEATURE_PLACEMENT, FEATURE_RATIO, IMAGE_TYPES, PAGES, PLACEMENTS, STATUS_PILL, bannerStatus, compressImage, createBanner, deleteBanner, placementLabel, removeBannerImage,
  updateBanner, uploadBannerImage, validateImage,
} from '../lib/banners'
import { isSupabaseConfigured } from '../lib/supabase'

const FONT = 'Inter,system-ui,sans-serif'
const ERROR_RED = '#B3402F'

const EMPTY_FORM = {
  title: '', subtitle: '', cta: 'Shop now', destination: '', starts: '', ends: '', placement: PLACEMENTS[0][0], priority: '1',
  allCustomers: true, melbourneOnly: false, newCustomers: true, trackClicks: true,
}

// The destination <select> value is "category:<id>" or "page:<name>".
function rowToForm(row) {
  return {
    title: row.title ?? '',
    subtitle: row.subtitle ?? '',
    cta: row.cta_label ?? '',
    destination: row.destination_type ? `${row.destination_type}:${row.destination}` : '',
    starts: row.starts_on ?? '',
    ends: row.ends_on ?? '',
    placement: row.placement ?? PLACEMENTS[0][0],
    priority: String(row.priority ?? 1),
    allCustomers: row.all_customers !== false,
    melbourneOnly: !!row.melbourne_only,
    newCustomers: row.new_customers !== false,
    trackClicks: row.track_clicks !== false,
  }
}

function toRow(f, status) {
  const i = f.destination.indexOf(':')
  return {
    title: f.title.trim(),
    subtitle: f.subtitle.trim(),
    cta_label: f.cta.trim(),
    destination_type: i > 0 ? f.destination.slice(0, i) : null,
    destination: i > 0 ? f.destination.slice(i + 1) : null,
    starts_on: f.starts || null,
    ends_on: f.ends || null,
    placement: f.placement,
    priority: Number(f.priority) || 1,
    status,
    all_customers: f.allCustomers,
    melbourne_only: f.melbourneOnly,
    new_customers: f.newCustomers,
    track_clicks: f.trackClicks,
  }
}

// ---- styles (match the original static field boxes) ----
const labelStyle = { font: `600 10.5px/1.2 ${FONT}`, letterSpacing: '.4px', color: '#7C8A81', textTransform: 'uppercase', whiteSpace: 'nowrap' }
const boxBase = { height: '36px', padding: '0 11px', border: '1px solid #E4E7E2', borderRadius: '8px', background: '#fff', font: `500 12.5px/1.2 ${FONT}`, color: '#17201A', width: '100%', minWidth: '0', boxSizing: 'border-box', outline: 'none' }
const selectBase = { ...boxBase, appearance: 'none', WebkitAppearance: 'none', paddingRight: '30px', background: '#fff', cursor: 'pointer' }
const withError = (style, err) => (err ? { ...style, borderColor: ERROR_RED } : style)
const cardStyle = { background: '#fff', border: '1px solid #E4E7E2', borderRadius: '10px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '14px' }
const cardTitle = { font: `600 13.5px/1.2 ${FONT}`, color: '#17201A', whiteSpace: 'nowrap' }
const btnSecondary = { display: 'flex', alignItems: 'center', gap: '7px', height: '34px', padding: '0 12px', border: '1px solid #E4E7E2', borderRadius: '8px', background: '#fff', color: '#17201A', font: `600 12.5px/1.2 ${FONT}`, cursor: 'pointer', whiteSpace: 'nowrap' }
const btnPrimary = { display: 'flex', alignItems: 'center', gap: '7px', height: '34px', padding: '0 13px', border: '0', borderRadius: '8px', background: '#0B3D1F', color: '#fff', font: `600 12.5px/1.2 ${FONT}`, cursor: 'pointer', whiteSpace: 'nowrap' }

function Field({ label, error, hint, span2, children }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: '0', ...(span2 ? { gridColumn: 'span 2' } : null) }}>
      <span style={labelStyle}>{label}</span>
      {children}
      {error
        ? <span style={{ font: `500 11px/1.3 ${FONT}`, color: ERROR_RED }}>{error}</span>
        : hint && <span style={{ font: `400 11px/1.3 ${FONT}`, color: '#7C8A81' }}>{hint}</span>}
    </label>
  )
}

function Toggle({ on, onChange, label }) {
  return (
    <button type="button" role="switch" aria-checked={on} aria-label={label} onClick={() => onChange(!on)} style={{ width: '38px', height: '22px', borderRadius: '11px', background: on ? '#8BE000' : '#DCDDD8', position: 'relative', flex: 'none', display: 'block', border: '0', padding: '0', cursor: 'pointer', transition: 'background .15s' }}>
      <span style={{ position: 'absolute', top: '2.5px', left: on ? '18px' : '2.5px', width: '17px', height: '17px', borderRadius: '9px', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,.2)', display: 'block', transition: 'left .15s' }} />
    </button>
  )
}

// ---- validation (mirrors the `public.banners` check constraints) ----
function validate(f, publishing, hasImage) {
  const errors = {}
  if (!f.title.trim()) errors.title = 'Title is required'
  if (f.starts && f.ends && f.ends < f.starts) errors.ends = 'End date must be on or after the start date'
  const p = Number(f.priority)
  if (!Number.isInteger(p) || p < 1 || p > 10) errors.priority = 'Enter a whole number from 1 to 10'
  if (!publishing) return errors
  if (!f.cta.trim()) errors.cta = 'Button label is required to publish'
  if (!f.destination) errors.destination = 'Pick where the banner links to'
  if (!f.starts) errors.starts = 'Pick a start date'
  if (!f.ends) errors.ends = errors.ends || 'Pick an end date'
  if (f.placement === FEATURE_PLACEMENT && !hasImage) errors.image = 'Feature banners need an image to publish'
  return errors
}

export default function NewBanner({ v }) {
  const editing = v.editingBanner
  const { rows: categories } = useCategories()
  const [form, setForm] = useState(() => (editing ? rowToForm(editing) : EMPTY_FORM))
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  // Image: a newly picked file, or the saved one unless removed.
  const [picked, setPicked] = useState(null) // { file, url }
  const [savedImageRemoved, setSavedImageRemoved] = useState(false)
  const fileInput = useRef(null)

  useEffect(() => () => { if (picked) URL.revokeObjectURL(picked.url) }, [picked])

  const set = (key) => (value) => {
    setForm((f) => ({ ...f, [key]: value }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }))
  }
  const onText = (key) => (e) => set(key)(e.target.value)

  const savedImageUrl = !savedImageRemoved ? editing?.image_url : null
  const imageUrl = picked?.url ?? savedImageUrl ?? null
  const isFeature = form.placement === FEATURE_PLACEMENT

  const pickImage = async (chosen) => {
    if (!chosen) return
    const file = await compressImage(chosen)
    const problem = validateImage(file)
    if (problem) return setErrors((e) => ({ ...e, image: problem }))
    setErrors((e) => ({ ...e, image: undefined }))
    setPicked({ file, url: URL.createObjectURL(file) })
  }
  const removeImage = () => {
    setPicked(null)
    setSavedImageRemoved(true)
  }

  const save = async (publishing) => {
    if (saving) return
    const found = validate(form, publishing, !!imageUrl)
    setErrors(found)
    if (Object.keys(found).length) return v.flash('Check the highlighted fields before saving')
    if (!isSupabaseConfigured) return v.flash('Supabase keys are missing · add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to .env and restart the dev server')
    setSaving(true)
    let uploaded = null
    try {
      const row = toRow(form, publishing ? 'published' : 'draft')
      if (picked) {
        uploaded = await uploadBannerImage(picked.file)
        row.image_path = uploaded.path
        row.image_url = uploaded.url
      } else if (savedImageRemoved) {
        row.image_path = null
        row.image_url = null
      }
      if (editing) await updateBanner(editing.id, row)
      else await createBanner(row)
      // The old file is unused once the row points elsewhere.
      if (editing?.image_path && (picked || savedImageRemoved)) await removeBannerImage(editing.image_path)
      v.flash(`Banner “${row.title}” ${publishing ? (editing?.status === 'published' ? 'saved' : 'published') : 'saved as a draft'}`)
      v.bannerDone()
    } catch (err) {
      if (uploaded) await removeBannerImage(uploaded.path)
      setSaving(false)
      v.flash(`Could not save banner · ${err?.message || 'unknown error'}`)
    }
  }

  const remove = async () => {
    if (!editing || saving) return
    if (!confirmDelete) return setConfirmDelete(true)
    setSaving(true)
    try {
      await deleteBanner(editing)
      v.flash(`Banner “${editing.title}” deleted`)
      v.bannerDone()
    } catch (err) {
      setSaving(false)
      setConfirmDelete(false)
      v.flash(`Could not delete banner · ${err?.message || 'unknown error'}`)
    }
  }

  const categoryOptions = categories.filter((c) => c.enabled !== false || form.destination === `category:${c.id}`)
  const title = form.title.trim() || 'Banner title'
  const subtitle = form.subtitle.trim()
  const [statusLabel, statusFg, statusBg] = editing ? STATUS_PILL[bannerStatus(editing)] : []
  const isLive = editing?.status === 'published'
  const busy = { disabled: saving, style: { opacity: saving ? 0.7 : 1, cursor: saving ? 'default' : 'pointer' } }

  return (
    <>
      <div className="sk-topbar" style={{ display: 'flex', alignItems: 'flex-end', gap: '18px', padding: '24px 26px 2px' }}>
        <span style={{ display: 'flex', flexDirection: 'column', gap: '5px', minWidth: '0' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
            <span style={{ font: `700 20px/1.2 ${FONT}`, color: '#17201A', whiteSpace: 'nowrap' }}>{editing ? 'Edit banner' : 'Create banner'}</span>
            {editing && <span style={{ font: `600 10.5px/1.2 ${FONT}`, color: statusFg, background: statusBg, padding: '4px 8px', borderRadius: '5px' }}>{statusLabel}</span>}
          </span>
          <span style={{ font: `400 12.5px/1.2 ${FONT}`, color: '#7C8A81', whiteSpace: 'nowrap' }}>{editing ? editing.title : 'Homepage banner for the Spice Kart app'}</span>
        </span>
        <span className="r-wrap" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button className="hv1" onClick={v.bannerDone} disabled={saving} style={btnSecondary}>{editing ? 'Cancel' : 'Discard'}</button>
          {editing && confirmDelete && <button className="hv1" onClick={() => setConfirmDelete(false)} disabled={saving} style={btnSecondary}>Keep banner</button>}
          {editing && (
            <button className="hv1" onClick={remove} disabled={saving} style={{ ...btnSecondary, color: ERROR_RED, ...(confirmDelete ? { borderColor: ERROR_RED, background: '#FAEDEA' } : null) }}>
              {confirmDelete ? 'Confirm delete' : 'Delete'}
            </button>
          )}
          <button className="hv1" onClick={() => save(false)} disabled={busy.disabled} style={{ ...btnSecondary, ...busy.style }}>
            {isLive ? 'Unpublish · save as draft' : 'Save as draft'}
          </button>
          <button className="hv2" onClick={() => save(true)} disabled={busy.disabled} style={{ ...btnPrimary, ...busy.style }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: 'none' }}>
              <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#8BE000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {saving ? 'Saving…' : isLive ? 'Save changes' : 'Publish banner'}
          </button>
        </span>
      </div>
      <div className="ad-scroll sk-page" style={{ flex: '1', minHeight: '0', overflowY: 'auto', padding: '20px 26px 30px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div className="r-stack" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '18px', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={cardStyle}>
              <span style={cardTitle}>Banner content</span>
              <div className="r-stack-sm" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '11px' }}>
                <Field label="Title" error={errors.title} hint={`${form.title.length}/40`}>
                  <input className="sk-input" value={form.title} maxLength={40} placeholder="e.g. Fresh picks for your kitchen" onChange={onText('title')} style={withError(boxBase, errors.title)} />
                </Field>
                <Field label="Subtitle" hint={`${form.subtitle.length}/40 · shown as the tag`}>
                  <input className="sk-input" value={form.subtitle} maxLength={40} placeholder="e.g. Up to 20% off" onChange={onText('subtitle')} style={boxBase} />
                </Field>
                <Field label="CTA label" error={errors.cta}>
                  <input className="sk-input" value={form.cta} maxLength={20} placeholder="e.g. Shop now" onChange={onText('cta')} style={withError(boxBase, errors.cta)} />
                </Field>
                <Field label="Destination" error={errors.destination}>
                  <select value={form.destination} onChange={onText('destination')} style={withError(selectBase, errors.destination)}>
                    <option value="">Select…</option>
                    {categoryOptions.length > 0 && (
                      <optgroup label="Category">
                        {categoryOptions.map((c) => <option key={c.id} value={`category:${c.id}`}>Category → {c.name}</option>)}
                      </optgroup>
                    )}
                    <optgroup label="Page">
                      {PAGES.map((d) => <option key={d} value={`page:${d}`}>{d}</option>)}
                    </optgroup>
                  </select>
                </Field>
                <Field label="Start date" error={errors.starts}>
                  <input className="sk-input" type="date" value={form.starts} onChange={onText('starts')} style={withError(boxBase, errors.starts)} />
                </Field>
                <Field label="End date" error={errors.ends} hint="Last day the banner shows">
                  <input className="sk-input" type="date" value={form.ends} min={form.starts || undefined} onChange={onText('ends')} style={withError(boxBase, errors.ends)} />
                </Field>
                <Field label="Placement">
                  <select value={form.placement} onChange={onText('placement')} style={selectBase}>
                    {PLACEMENTS.map(([k, label]) => <option key={k} value={k}>{label}</option>)}
                  </select>
                </Field>
                <Field label="Priority" error={errors.priority} hint="1 shows first">
                  <input className="sk-input" type="number" min="1" max="10" step="1" value={form.priority} onChange={onText('priority')} style={withError(boxBase, errors.priority)} />
                </Field>
              </div>
            </div>
            <div style={{ ...cardStyle, gap: '13px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ ...cardTitle, flex: '1' }}>Banner image</span>
                {imageUrl && <button type="button" className="hv1" onClick={removeImage} style={{ ...btnSecondary, height: '30px', font: `600 12px/1.2 ${FONT}` }}>Remove</button>}
                <button type="button" className="hv1" onClick={() => fileInput.current?.click()} style={{ ...btnSecondary, height: '30px', font: `600 12px/1.2 ${FONT}` }}>{imageUrl ? 'Replace' : 'Upload image'}</button>
              </span>
              <input ref={fileInput} type="file" accept={IMAGE_TYPES.join(',')} hidden onChange={(e) => { pickImage(e.target.files?.[0]); e.target.value = '' }} />
              <button type="button" onClick={() => fileInput.current?.click()} style={{ position: 'relative', height: '160px', borderRadius: '9px', overflow: 'hidden', border: `1px ${imageUrl ? 'solid' : 'dashed'} ${errors.image ? ERROR_RED : '#C9CEC6'}`, background: '#F6F7F4', display: 'block', padding: '0', cursor: 'pointer' }}>
                {imageUrl
                  ? <img src={imageUrl} alt="Banner" style={{ position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <span style={{ font: `500 12.5px/1.4 ${FONT}`, color: '#4A564E' }}>Click to upload a banner image<br /><span style={{ color: '#7C8A81', fontWeight: 400 }}>The preview uses a sample image until you add one</span></span>}
              </button>
              <span style={{ font: `400 11px/1.2 ${FONT}`, color: errors.image ? ERROR_RED : '#7C8A81' }}>{errors.image ?? `Recommended ${isFeature ? '1080 × 1175px (large, sharp photo)' : '1200 × 420px'} · JPG, PNG or WebP · under 400 KB`}</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ ...cardStyle, gap: '13px' }}>
              <span style={cardTitle}>App preview</span>
              <span style={{ border: '1px solid #E4E7E2', borderRadius: '12px', padding: '12px', background: '#F6F7F4', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {isFeature ? (
                  <span style={{ position: 'relative', aspectRatio: String(FEATURE_RATIO), borderRadius: '10px', overflow: 'hidden', background: '#E7F1DA', display: 'block' }}>
                    <img src={imageUrl ?? imgFreshCoriander} alt="" style={{ position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover' }} />
                    <span style={{ position: 'absolute', left: '0', right: '0', bottom: '0', padding: '44px 12px 12px', display: 'flex', flexDirection: 'column', gap: '6px', background: 'linear-gradient(180deg,rgba(12,43,26,0) 0%,rgba(12,43,26,.55) 40%,rgba(12,43,26,.92) 100%)' }}>
                      {subtitle && (
                        <span style={{ font: `700 9px/1.2 ${FONT}`, letterSpacing: '.7px', color: '#0B3D1F', background: '#8BE000', padding: '4px 6px', borderRadius: '4px', alignSelf: 'flex-start', maxWidth: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textTransform: 'uppercase' }}>
                          {subtitle}
                        </span>
                      )}
                      <span style={{ font: `800 15px/1.2 ${FONT}`, color: form.title.trim() ? '#fff' : 'rgba(255,255,255,.6)', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{title}</span>
                      {form.cta.trim() && <span style={{ font: `700 10px/1.2 ${FONT}`, color: '#0B3D1F', background: '#8BE000', padding: '6px 9px', borderRadius: '6px', alignSelf: 'flex-start', whiteSpace: 'nowrap' }}>{form.cta.trim()} →</span>}
                    </span>
                  </span>
                ) : (
                <span style={{ position: 'relative', height: '96px', borderRadius: '10px', overflow: 'hidden', flex: 'none', background: '#E7F1DA', border: '1px solid #D8E4C8', display: 'block' }}>
                  <img src={imageUrl ?? imgFreshCoriander} alt="" style={{ position: 'absolute', right: '0', top: '0', width: '112px', height: '100%', objectFit: 'cover' }} />
                  <span style={{ position: 'absolute', left: '0', top: '0', bottom: '0', width: '186px', padding: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '5px', background: 'linear-gradient(90deg,#E7F1DA 74%,rgba(231,241,218,0))' }}>
                    {subtitle && (
                      <span style={{ font: `700 9px/1.2 ${FONT}`, letterSpacing: '.7px', color: '#0B3D1F', background: '#8BE000', padding: '4px 6px', borderRadius: '4px', alignSelf: 'flex-start', maxWidth: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textTransform: 'uppercase' }}>
                        {subtitle}
                      </span>
                    )}
                    <span style={{ font: `700 13px/1.25 ${FONT}`, color: form.title.trim() ? '#0B3D1F' : '#8FA394', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{title}</span>
                    {form.cta.trim() && <span style={{ font: `600 10px/1.2 ${FONT}`, color: '#4C6B52', whiteSpace: 'nowrap' }}>{form.cta.trim()} →</span>}
                  </span>
                </span>
                )}
                <span style={{ font: `400 10.5px/1.2 ${FONT}`, color: '#7C8A81', textAlign: 'center' }}>{placementLabel(form.placement)}, position {form.priority || '–'}</span>
              </span>
            </div>
            <div style={{ ...cardStyle, gap: '2px' }}>
              <span style={{ ...cardTitle, paddingBottom: '6px' }}>Targeting</span>
              {[
                ['allCustomers', 'All customers'],
                ['melbourneOnly', 'Melbourne metro only'],
                ['newCustomers', 'Show to new customers'],
                ['trackClicks', 'Track banner clicks'],
              ].map(([key, label]) => (
                <span key={key} style={{ display: 'flex', alignItems: 'center', gap: '11px', padding: '10px 0', borderBottom: '1px solid #EFF1ED' }}>
                  <span style={{ font: `500 12.5px/1.2 ${FONT}`, color: '#17201A', whiteSpace: 'nowrap', flex: '1', minWidth: '0' }}>{label}</span>
                  <Toggle on={form[key]} label={label} onChange={set(key)} />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
