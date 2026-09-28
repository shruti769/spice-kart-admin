import { useState } from 'react'
import { AUDIENCES, LINK_PAGES, PLACEMENTS, TYPES, createAnnouncement, typeMeta, updateAnnouncement } from '../lib/announcements'
import { useCategories } from '../lib/categories'
import { isSupabaseConfigured } from '../lib/supabase'
import { BORDER, FONT, INK, MUTED, btnPrimary, btnSecondary, errorText, hintText, inputStyle, labelStyle, selectStyle, todayMelbourne, withError } from '../components/content/styles'
import { Modal } from '../components/content/ui'

function Segmented({ options, value, onChange, label }) {
  return (
    <span role="radiogroup" aria-label={label} style={{ display: 'flex', gap: '3px', padding: '3px', background: '#EEF0EC', borderRadius: '9px' }}>
      {options.map(([k, text]) => {
        const on = value === k
        return (
          <button key={k} type="button" role="radio" aria-checked={on} onClick={() => onChange(k)} style={{ flex: '1', height: '30px', border: '0', borderRadius: '7px', background: on ? '#fff' : 'transparent', boxShadow: on ? '0 1px 2px rgba(0,0,0,.12)' : 'none', font: `600 12.5px/1.2 ${FONT}`, color: on ? INK : MUTED, cursor: 'pointer' }}>
            {text}
          </button>
        )
      })}
    </span>
  )
}

// announcement: row when editing, otherwise null.
export default function AnnouncementModal({ v, announcement, onClose }) {
  const isEdit = !!announcement
  const { rows: categories } = useCategories()
  const [title, setTitle] = useState(announcement?.title ?? '')
  const [message, setMessage] = useState(announcement?.message ?? '')
  const [type, setType] = useState(announcement?.type ?? 'info')
  const [placement, setPlacement] = useState(announcement?.placement ?? 'top_bar')
  const [audience, setAudience] = useState(announcement?.audience ?? 'all')
  const [link, setLink] = useState(announcement?.link ?? '')
  const [starts, setStarts] = useState(announcement?.starts_on ?? todayMelbourne())
  const [ends, setEnds] = useState(announcement?.ends_on ?? '')
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)

  const [, , dot, tint] = typeMeta(type)

  const save = async () => {
    if (saving) return
    const next = {}
    if (!title.trim()) next.title = 'Give the announcement a title'
    if (!starts) next.starts = 'Pick a start date'
    if (starts && ends && ends < starts) next.ends = 'End date must be on or after the start'
    setErrors(next)
    if (Object.keys(next).length) return
    if (!isSupabaseConfigured) return v.flash('Supabase keys are missing · add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to .env and restart the dev server')
    setSaving(true)
    const row = { title: title.trim(), message: message.trim(), type, placement, audience, link: link || null, starts_on: starts, ends_on: ends || null }
    try {
      if (isEdit) await updateAnnouncement(announcement.id, row)
      else await createAnnouncement({ ...row, active: true })
      v.flash(isEdit ? 'Announcement saved' : 'Announcement published')
      onClose()
    } catch (err) {
      setSaving(false)
      v.flash(`Could not save announcement · ${err?.message || 'unknown error'}`)
    }
  }

  return (
    <Modal
      title={isEdit ? 'Edit announcement' : 'New announcement'}
      sub="Shown in the app between the start and end dates."
      width={560}
      busy={saving}
      onClose={onClose}
      footer={(
        <span style={{ marginLeft: 'auto', display: 'flex', gap: '9px' }}>
          <button type="button" onClick={onClose} disabled={saving} style={btnSecondary}>Cancel</button>
          <button type="button" onClick={save} disabled={saving} style={{ ...btnPrimary, opacity: saving ? 0.7 : 1 }}>{saving ? 'Saving…' : isEdit ? 'Save' : 'Publish'}</button>
        </span>
      )}
    >
      <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <span style={labelStyle}>Title</span>
        <input autoFocus value={title} maxLength={60} placeholder="e.g. Public holiday delivery hours" onChange={(e) => { setTitle(e.target.value); setErrors((x) => ({ ...x, title: undefined })) }} style={withError(inputStyle, errors.title)} />
        {errors.title && <span style={errorText}>{errors.title}</span>}
      </label>
      <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <span style={labelStyle}>Message</span>
        <textarea value={message} maxLength={200} rows={3} placeholder="What should customers know?" onChange={(e) => setMessage(e.target.value)} style={{ ...inputStyle, height: 'auto', padding: '10px 11px', font: `400 12.5px/1.5 ${FONT}`, resize: 'vertical' }} />
        <span style={hintText}>{message.length}/200</span>
      </label>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '13px' }}>
        <span style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={labelStyle}>Type</span>
          <Segmented label="Type" options={TYPES.map(([k, l]) => [k, l])} value={type} onChange={setType} />
        </span>
        <span style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={labelStyle}>Placement</span>
          <Segmented label="Placement" options={PLACEMENTS} value={placement} onChange={setPlacement} />
        </span>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={labelStyle}>Audience</span>
          <select value={audience} onChange={(e) => setAudience(e.target.value)} style={selectStyle}>
            {AUDIENCES.map(([k, l]) => <option key={k} value={k}>{l}</option>)}
          </select>
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={labelStyle}>Tap opens</span>
          <select value={link} onChange={(e) => setLink(e.target.value)} style={selectStyle}>
            <option value="">Nothing</option>
            <optgroup label="Screen">
              {LINK_PAGES.map((p) => <option key={p} value={`page:${p}`}>{p}</option>)}
            </optgroup>
            {categories.length > 0 && (
              <optgroup label="Category">
                {categories.map((c) => <option key={c.id} value={`category:${c.id}`}>{c.name}</option>)}
              </optgroup>
            )}
          </select>
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={labelStyle}>Starts</span>
          <input type="date" value={starts} onChange={(e) => { setStarts(e.target.value); setErrors((x) => ({ ...x, starts: undefined })) }} style={withError(inputStyle, errors.starts)} />
          {errors.starts && <span style={errorText}>{errors.starts}</span>}
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={labelStyle}>Ends (optional)</span>
          <input type="date" value={ends} min={starts || undefined} onChange={(e) => { setEnds(e.target.value); setErrors((x) => ({ ...x, ends: undefined })) }} style={withError(inputStyle, errors.ends)} />
          {errors.ends ? <span style={errorText}>{errors.ends}</span> : <span style={hintText}>Empty = ongoing</span>}
        </label>
      </div>
      <span style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
        <span style={labelStyle}>App preview</span>
        <span style={{ display: 'flex', gap: '10px', padding: '12px 14px', borderRadius: placement === 'popup' ? '12px' : '8px', background: tint, border: `1px solid ${BORDER}`, ...(placement === 'popup' ? { margin: '0 50px', boxShadow: '0 8px 22px rgba(10,18,12,.12)' } : null) }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '4px', background: dot, flex: 'none', marginTop: '4px' }} />
          <span style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '0' }}>
            <span style={{ font: `600 13px/1.3 ${FONT}`, color: title.trim() ? INK : MUTED }}>{title.trim() || 'Announcement title'}</span>
            <span style={{ font: `400 12px/1.4 ${FONT}`, color: '#4A564E' }}>{message.trim() || 'Your message will appear here.'}</span>
          </span>
        </span>
      </span>
    </Modal>
  )
}
