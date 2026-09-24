import { useEffect, useRef, useState } from 'react'
import { removeCategory, saveCategory, tileColorFor, uniqueSlug, useCategories, validateImage } from '../lib/categories'
import { isSupabaseConfigured } from '../lib/supabase'

const FONT = 'Inter,system-ui,sans-serif'
const INK = '#17201A'
const MUTED = '#7C8A81'
const DANGER = '#B3402F'
const BORDER = '#E4E7E2'
const DIVIDER = '#EDEDE9'

const labelStyle = { font: `600 10.5px/1.2 ${FONT}`, letterSpacing: '.6px', color: MUTED, textTransform: 'uppercase', whiteSpace: 'nowrap' }
const inputStyle = { height: '40px', padding: '0 12px', border: `1px solid ${BORDER}`, borderRadius: '9px', background: '#fff', font: `500 13.5px/1.2 ${FONT}`, color: INK, outline: 'none', width: '100%', minWidth: '0', boxSizing: 'border-box' }
const errorText = { font: `400 11.5px/1.3 ${FONT}`, color: DANGER }
const withError = (style, err) => (err ? { ...style, borderColor: DANGER } : style)
const btnBase = { height: '40px', padding: '0 18px', borderRadius: '10px', font: `600 13.5px/1.2 ${FONT}`, cursor: 'pointer', whiteSpace: 'nowrap' }
const btnSecondary = { ...btnBase, border: `1px solid ${BORDER}`, background: '#fff', color: INK }
const btnPrimary = { ...btnBase, border: '0', background: '#1B3C22', color: '#fff', fontWeight: 700 }
const chipStyle = { display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 14px', border: `1px solid ${BORDER}`, borderRadius: '9px', background: '#fff', font: `600 13px/1.2 ${FONT}`, color: INK, whiteSpace: 'nowrap', position: 'relative', boxSizing: 'border-box' }
const addChipStyle = { ...chipStyle, background: '#F4FAE8', border: '1px dashed #B9DE7A', color: '#1B3C22', cursor: 'pointer' }
const chipInputStyle = { ...chipStyle, width: '160px', outline: 'none', cursor: 'text', padding: '7px 12px' }
const smallAction = { height: '24px', padding: '0 9px', border: `1px solid ${BORDER}`, borderRadius: '6px', background: 'rgba(255,255,255,.94)', font: `600 11px/1.2 ${FONT}`, color: INK, cursor: 'pointer', whiteSpace: 'nowrap' }

function Toggle({ on, onChange, label }) {
  return (
    <button type="button" role="switch" aria-checked={on} aria-label={label} onClick={() => onChange(!on)} style={{ width: '42px', height: '24px', borderRadius: '12px', background: on ? '#8BE000' : '#DCDDD8', position: 'relative', flex: 'none', display: 'block', border: '0', padding: '0', cursor: 'pointer', transition: 'background .15s' }}>
      <span style={{ position: 'absolute', top: '3px', left: on ? '21px' : '3px', width: '18px', height: '18px', borderRadius: '9px', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,.2)', display: 'block', transition: 'left .15s' }} />
    </button>
  )
}

let subKey = 0
const newKey = () => `s${++subKey}`
const norm = (s) => s.trim().toLowerCase()

function CategoryForm({ v, all, original }) {
  const isAdd = !original
  const total = isAdd ? all.length + 1 : all.length // M in "N of M"
  const initialPos = isAdd ? total : Math.max(1, all.findIndex((c) => c.id === original.id) + 1)

  const [name, setName] = useState(original?.name ?? '')
  const [shortName, setShortName] = useState(original?.short_name ?? '')
  const [enabled, setEnabled] = useState(original?.enabled ?? true)
  const [posText, setPosText] = useState(String(initialPos))
  const [subs, setSubs] = useState(() => (original?.subcategories ?? []).map((n) => ({ key: newKey(), name: n, original: n })))
  const [adding, setAdding] = useState(false)
  const [addText, setAddText] = useState('')
  const [editingKey, setEditingKey] = useState(null)
  const [editText, setEditText] = useState('')
  const [hoverKey, setHoverKey] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [imageRemoved, setImageRemoved] = useState(false)
  const [preview, setPreview] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const [errors, setErrors] = useState({})
  const [busy, setBusy] = useState(null) // null | 'save' | 'delete'
  const [confirmDelete, setConfirmDelete] = useState(false)
  const fileInput = useRef(null)

  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview) }, [preview])

  const clearError = (key) => { if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined })) }
  // POSITION: whole number clamped to 1..M; anything unparsable falls back to the starting value.
  const position = (() => {
    const n = Math.round(Number(posText))
    return posText !== '' && Number.isFinite(n) ? Math.min(total, Math.max(1, n)) : initialPos
  })()
  // New categories get a pastel from the palette by position; edits keep their stored colour.
  const tileColor = isAdd ? tileColorFor(position) : original.bg_color || tileColorFor(position)

  // ---- image ----
  const currentImage = preview || (!imageRemoved && original?.image_url) || null
  const openPicker = () => { if (!busy) fileInput.current?.click() }
  const takeFile = (file) => {
    if (!file) return
    const problem = validateImage(file)
    if (problem) {
      setErrors((e) => ({ ...e, image: problem }))
      return
    }
    setImageFile(file)
    setPreview(URL.createObjectURL(file))
    setImageRemoved(false)
    clearError('image')
  }
  const pickImage = (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    takeFile(file)
  }
  const onDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    if (!busy) takeFile(e.dataTransfer.files?.[0])
  }
  const removeImage = () => {
    setImageFile(null)
    setPreview(null)
    setImageRemoved(true)
  }

  // ---- subcategories ----
  const isDuplicate = (text, exceptKey) => subs.some((s) => s.key !== exceptKey && norm(s.name) === norm(text))
  const commitAdd = (keepOpen) => {
    const n = addText.trim()
    if (n && isDuplicate(n)) {
      setErrors((e) => ({ ...e, subs: `“${n}” is already in the list` }))
    } else {
      if (n) setSubs((list) => [...list, { key: newKey(), name: n, original: null }])
      clearError('subs')
    }
    setAddText('')
    if (!keepOpen) setAdding(false)
  }
  const startRename = (s) => {
    if (busy) return
    setEditingKey(s.key)
    setEditText(s.name)
  }
  const commitRename = () => {
    const n = editText.trim()
    const key = editingKey
    setEditingKey(null)
    if (!n) return
    if (isDuplicate(n, key)) {
      setErrors((e) => ({ ...e, subs: `“${n}” is already in the list` }))
      return
    }
    clearError('subs')
    setSubs((list) => list.map((s) => (s.key === key ? { ...s, name: n } : s)))
  }
  const deleteSub = (key) => setSubs((list) => list.filter((s) => s.key !== key))

  // ---- save / delete ----
  const save = async () => {
    if (busy) return
    const found = {}
    if (!name.trim()) found.name = 'Category name is required'
    if (!shortName.trim()) found.short_name = 'Display name is required'
    if (isAdd && !currentImage) found.image = 'Upload an image for this category'
    setErrors(found)
    const problems = Object.values(found)
    if (problems.length) return v.flash(problems.length === 1 ? problems[0] : 'Check the highlighted fields before saving')
    if (!isSupabaseConfigured) return v.flash('Supabase is not configured · category not saved')

    const trimmedName = name.trim()
    const id = isAdd ? uniqueSlug(trimmedName, all.map((c) => c.id)) : original.id
    let sort
    let order = null
    if (position !== initialPos) {
      // Moved: renumber every category to 1..M in the new order.
      const others = all.filter((c) => c.id !== id)
      const ids = others.map((c) => c.id)
      ids.splice(position - 1, 0, id)
      order = { ids, current: { ...Object.fromEntries(others.map((c) => [c.id, c.sort])), [id]: position } }
      sort = position
    } else {
      sort = isAdd ? all.reduce((m, c) => Math.max(m, c.sort ?? 0), 0) + 1 : original.sort
    }

    setBusy('save')
    try {
      await saveCategory({
        original,
        values: { id, name: trimmedName, short_name: shortName.trim(), sort, bg_color: tileColor, enabled },
        subs: subs.map((s) => ({ name: s.name.trim(), original: s.original })),
        image: imageFile ? { file: imageFile } : imageRemoved && original?.image_url ? { remove: true } : null,
        order,
      })
      v.closeModal()
      v.flash(isAdd ? `Category created · ${trimmedName}` : `Category saved · ${trimmedName}`)
    } catch (e) {
      setBusy(null)
      v.flash(`Couldn’t save category · ${e.message}`)
    }
  }

  const doDelete = async () => {
    if (busy) return
    if (!isSupabaseConfigured) return v.flash('Supabase is not configured · category not deleted')
    setBusy('delete')
    try {
      await removeCategory(original)
      v.closeModal()
      v.flash(`Category deleted · ${original.name}`)
    } catch (e) {
      setBusy(null)
      setConfirmDelete(false)
      v.flash(e.message === 'Move or delete this category’s products first' ? e.message : `Couldn’t delete category · ${e.message}`)
    }
  }

  const dim = busy ? { opacity: 0.6, cursor: 'default' } : null

  return (
    <>
      {/* Header */}
      <div style={{ padding: '20px 24px 18px', display: 'flex', alignItems: 'center', gap: '14px', borderBottom: `1px solid ${DIVIDER}`, flex: 'none' }}>
        <span style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#F1F9DF', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
          {isAdd ? (
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M10 4v12M4 10h12" stroke="#1B3C22" strokeWidth="2" strokeLinecap="round" /></svg>
          ) : (
            <svg width="17" height="17" viewBox="0 0 20 20" fill="none"><path d="M12.8 4.2l3 3L7.5 15.5H4.5v-3l8.3-8.3z" stroke="#1B3C22" strokeWidth="1.7" strokeLinejoin="round" /></svg>
          )}
        </span>
        <span style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '0' }}>
          <span style={{ font: `700 19px/1.2 ${FONT}`, color: INK }}>{isAdd ? 'Add category' : 'Edit category'}</span>
          <span style={{ font: `400 13.5px/1.4 ${FONT}`, color: MUTED }}>
            {isAdd ? 'New top-level aisle · added to the end of the category rail.' : `${original.name} · position ${initialPos} of ${total} in the category rail.`}
          </span>
        </span>
      </div>

      {/* Body */}
      <div className="ad-scroll" style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto', minHeight: '0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '150px minmax(0,1fr)', gap: '22px', alignItems: 'start' }}>
          {/* Left: image */}
          <span style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '0' }}>
            <span style={labelStyle}>Image / icon</span>
            <input ref={fileInput} type="file" accept="image/png,image/svg+xml,image/webp,image/jpeg" onChange={pickImage} style={{ display: 'none' }} />
            <span
              role="button"
              tabIndex={0}
              aria-label={currentImage ? 'Category image' : 'Upload image'}
              onClick={currentImage ? undefined : openPicker}
              onKeyDown={(e) => { if (e.target === e.currentTarget && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openPicker() } }}
              onDragOver={(e) => { e.preventDefault(); if (!busy) setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
              style={{ width: '150px', height: '150px', boxSizing: 'border-box', border: `1.5px dashed ${dragOver ? '#8BE000' : errors.image ? DANGER : '#D5D8D2'}`, borderRadius: '10px', background: dragOver ? '#F4FAE8' : currentImage ? tileColor : '#FAFBF8', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: currentImage ? 'default' : 'pointer', position: 'relative', overflow: 'hidden', outline: 'none' }}
            >
              {currentImage ? (
                <>
                  <img src={currentImage} alt="" style={{ position: 'absolute', inset: '8px', width: 'calc(100% - 16px)', height: 'calc(100% - 16px)', objectFit: 'contain' }} />
                  <span style={{ position: 'absolute', left: '6px', right: '6px', bottom: '6px', display: 'flex', justifyContent: 'center', gap: '5px' }}>
                    <button type="button" onClick={openPicker} disabled={Boolean(busy)} style={{ ...smallAction, ...dim }}>Replace</button>
                    <button type="button" onClick={removeImage} disabled={Boolean(busy)} style={{ ...smallAction, color: DANGER, ...dim }}>Remove</button>
                  </span>
                </>
              ) : (
                <>
                  <span style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#fff', border: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '4px', boxSizing: 'border-box' }}>
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M10 13.5V4M6.2 7.6L10 3.8l3.8 3.8M4 16h12" stroke={INK} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  <span style={{ font: `600 13px/1.2 ${FONT}`, color: INK }}>Upload image</span>
                  <span style={{ font: `400 11.5px/1.2 ${FONT}`, color: MUTED }}>or drag &amp; drop</span>
                </>
              )}
            </span>
            {errors.image && <span style={errorText}>{errors.image}</span>}
            <span style={{ font: `400 11px/1.45 ${FONT}`, color: MUTED }}>PNG, SVG or WebP · square, 512×512 · max 1 MB</span>
          </span>

          {/* Right: names, position, preview */}
          <span style={{ display: 'flex', flexDirection: 'column', gap: '14px', minWidth: '0' }}>
            <span style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
              <span style={labelStyle}>Category name</span>
              <input className="sk-input sk-cat-input" value={name} onChange={(e) => { setName(e.target.value); clearError('name') }} placeholder="e.g. Dairy & Refrigerated" autoFocus={isAdd} maxLength={80} style={withError(inputStyle, errors.name)} />
              {errors.name && <span style={errorText}>{errors.name}</span>}
            </span>
            <span style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{ display: 'flex', flexDirection: 'column', gap: '7px', flex: '1', minWidth: '0' }}>
                <span style={labelStyle}>Display name in app</span>
                <input className="sk-input sk-cat-input" value={shortName} onChange={(e) => { setShortName(e.target.value); clearError('short_name') }} placeholder="e.g. Dairy" maxLength={40} style={withError(inputStyle, errors.short_name)} />
                {errors.short_name && <span style={errorText}>{errors.short_name}</span>}
              </span>
              <span style={{ display: 'flex', flexDirection: 'column', gap: '7px', width: '110px', flex: 'none' }}>
                <span style={labelStyle}>Position</span>
                <label className="sk-input-wrap" style={{ ...inputStyle, display: 'flex', alignItems: 'center', gap: '5px', cursor: 'text' }}>
                  <input
                    className="sk-input sk-input-bare"
                    type="number"
                    min={1}
                    max={total}
                    step={1}
                    value={posText}
                    aria-label={`Position, 1 to ${total}`}
                    onChange={(e) => setPosText(e.target.value)}
                    onBlur={() => setPosText(String(position))}
                    style={{ width: `${Math.max(1, posText.length) + 0.5}ch`, minWidth: '0', border: '0', outline: 'none', padding: '0', background: 'transparent', font: `500 13.5px/1.2 ${FONT}`, color: INK }}
                  />
                  <span style={{ font: `500 13.5px/1.2 ${FONT}`, color: MUTED, whiteSpace: 'nowrap' }}>of {total}</span>
                </label>
              </span>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#F4F5F2', borderRadius: '10px', padding: '12px' }}>
              <span style={{ width: '48px', height: '48px', borderRadius: '12px', background: currentImage ? tileColor : '#E9EEF7', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flex: 'none', position: 'relative' }}>
                {currentImage ? (
                  <img src={currentImage} alt="" style={{ position: 'absolute', inset: '4px', width: 'calc(100% - 8px)', height: 'calc(100% - 8px)', objectFit: 'contain' }} />
                ) : (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3.5" y="3.5" width="13" height="13" rx="2.5" stroke="#9AA6BD" strokeWidth="1.5" strokeDasharray="2.6 2.2" /></svg>
                )}
              </span>
              <span style={{ display: 'flex', flexDirection: 'column', gap: '5px', minWidth: '0' }}>
                <span style={labelStyle}>App preview</span>
                <span style={{ font: `700 14px/1.2 ${FONT}`, color: INK, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{shortName.trim() || 'Category name'}</span>
              </span>
            </span>
          </span>
        </div>

        {/* Subcategories */}
        <span style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
          <span style={labelStyle}>Subcategories</span>
          <span style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
            {subs.map((s) => (editingKey === s.key ? (
              <input
                key={s.key}
                className="sk-input sk-cat-input"
                autoFocus
                value={editText}
                maxLength={60}
                aria-label={`Rename ${s.name}`}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={commitRename}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') { e.preventDefault(); e.currentTarget.blur() }
                  if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); setEditingKey(null) }
                }}
                style={chipInputStyle}
              />
            ) : (
              <span
                key={s.key}
                title="Double-click to rename"
                onMouseEnter={() => setHoverKey(s.key)}
                onMouseLeave={() => setHoverKey((k) => (k === s.key ? null : k))}
                onDoubleClick={() => startRename(s)}
                style={{ ...chipStyle, cursor: 'default', userSelect: 'none' }}
              >
                {s.name}
                {hoverKey === s.key && !busy && (
                  <button
                    type="button"
                    aria-label={`Remove ${s.name}`}
                    onClick={() => deleteSub(s.key)}
                    style={{ position: 'absolute', top: '-7px', right: '-7px', width: '18px', height: '18px', borderRadius: '9px', border: `1px solid ${BORDER}`, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0', cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,.12)' }}
                  >
                    <svg width="8" height="8" viewBox="0 0 20 20" fill="none"><path d="M5 5l10 10M15 5L5 15" stroke={DANGER} strokeWidth="2.6" strokeLinecap="round" /></svg>
                  </button>
                )}
              </span>
            )))}
            {adding ? (
              <input
                className="sk-input sk-cat-input"
                autoFocus
                value={addText}
                maxLength={60}
                placeholder="Subcategory name"
                aria-label="New subcategory name"
                onChange={(e) => { setAddText(e.target.value); clearError('subs') }}
                onBlur={() => commitAdd(false)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') { e.preventDefault(); commitAdd(true) }
                  if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); setAddText(''); setAdding(false) }
                }}
                style={{ ...chipInputStyle, borderColor: '#B9DE7A' }}
              />
            ) : (
              <button type="button" onClick={() => setAdding(true)} disabled={Boolean(busy)} style={{ ...addChipStyle, ...dim }}>
                <svg width="12" height="12" viewBox="0 0 20 20" fill="none"><path d="M10 4v12M4 10h12" stroke="#1B3C22" strokeWidth="2.2" strokeLinecap="round" /></svg>
                Add
              </button>
            )}
          </span>
          {errors.subs && <span style={errorText}>{errors.subs}</span>}
        </span>

        {/* Enabled */}
        <span style={{ display: 'flex', alignItems: 'center', gap: '12px', border: `1px solid ${BORDER}`, borderRadius: '12px', padding: '14px 16px' }}>
          <span style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: '1', minWidth: '0' }}>
            <span style={{ font: `500 14px/1.2 ${FONT}`, color: INK }}>Enabled in app</span>
            <span style={{ font: `400 12px/1.3 ${FONT}`, color: MUTED }}>Customers can browse this aisle</span>
          </span>
          <Toggle on={enabled} onChange={setEnabled} label="Enabled in app" />
        </span>
      </div>

      {/* Footer */}
      <div style={{ padding: '14px 24px', display: 'flex', alignItems: 'center', gap: '10px', borderTop: `1px solid ${DIVIDER}`, background: '#F7F8F5', flex: 'none' }}>
        {!isAdd && (confirmDelete ? (
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ font: `600 12.5px/1.2 ${FONT}`, color: DANGER, whiteSpace: 'nowrap' }}>Delete this category?</span>
            <button type="button" onClick={doDelete} disabled={Boolean(busy)} style={{ ...btnBase, height: '32px', padding: '0 12px', border: '0', background: DANGER, color: '#fff', fontSize: '12.5px', ...dim }}>{busy === 'delete' ? 'Deleting…' : 'Delete'}</button>
            <button type="button" onClick={() => setConfirmDelete(false)} disabled={Boolean(busy)} style={{ ...btnSecondary, height: '32px', padding: '0 12px', fontSize: '12.5px', ...dim }}>Keep</button>
          </span>
        ) : (
          <button type="button" onClick={() => setConfirmDelete(true)} disabled={Boolean(busy)} style={{ border: '0', background: 'transparent', padding: '0', font: `600 13.5px/1.2 ${FONT}`, color: DANGER, cursor: 'pointer', whiteSpace: 'nowrap', ...dim }}>Delete category</button>
        ))}
        <span style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
          <button type="button" onClick={v.closeModal} disabled={Boolean(busy)} style={{ ...btnSecondary, ...dim }}>Cancel</button>
          <button type="button" onClick={save} disabled={Boolean(busy)} style={{ ...btnPrimary, ...dim }}>{busy === 'save' ? 'Saving…' : isAdd ? 'Create category' : 'Save changes'}</button>
        </span>
      </div>
    </>
  )
}

export default function CategoryEditModal({ v }) {
  const categories = useCategories()
  // Prefer the freshest copy of the row being edited.
  const original = v.editingCategory ? categories.rows.find((c) => c.id === v.editingCategory.id) ?? v.editingCategory : null
  const waiting = categories.status === 'loading'
  return (
    <div onClick={v.closeModal} style={{ position: 'absolute', inset: '0', zIndex: '90', background: 'rgba(14,22,16,.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: '560px', maxWidth: '100%', maxHeight: '100%', background: '#fff', borderRadius: '18px', boxShadow: '0 26px 60px rgba(10,18,12,.3)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {waiting ? (
          <span style={{ padding: '40px 24px', textAlign: 'center', font: `400 13px/1.2 ${FONT}`, color: MUTED }}>Loading categories…</span>
        ) : (
          <CategoryForm key={original?.id ?? 'new'} v={v} all={categories.rows} original={original} />
        )}
      </div>
    </div>
  )
}
