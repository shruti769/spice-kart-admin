import { useEffect, useMemo, useRef, useState } from 'react'
import { IMAGE_TYPES, compressImage, validateImage } from '../../lib/banners'
import { collectionStatus, deleteCollection, saveCollection, useCollections } from '../../lib/content'
import { useProducts } from '../../lib/products'
import { BORDER, DIVIDER, FONT, INK, MUTED, PILL, btnPrimary, btnSecondary, ellipsis, errorText, hintText, inputStyle, labelStyle, shortDate, todayMelbourne, withError } from './styles'
import { Modal, Pill, SectionHead, Toggle, TrashIcon } from './ui'

const STATUS = { scheduled: PILL.scheduled, live: PILL.live, ended: PILL.ended }

function CollectionModal({ v, collection, onClose }) {
  const isEdit = !!collection
  const products = useProducts()
  const [name, setName] = useState(collection?.name ?? '')
  const [tagline, setTagline] = useState(collection?.tagline ?? '')
  const [starts, setStarts] = useState(collection?.starts_on ?? todayMelbourne())
  const [ends, setEnds] = useState(collection?.ends_on ?? '')
  const [picked, setPicked] = useState(collection?.product_ids ?? [])
  const [showOnHome, setShowOnHome] = useState(collection?.show_on_home ?? true)
  const [cover, setCover] = useState(null) // { file, url } | { remove: true } | null (keep)
  const [q, setQ] = useState('')
  const [errors, setErrors] = useState({})
  const [busy, setBusy] = useState(false)
  const fileInput = useRef(null)

  useEffect(() => () => { if (cover?.url) URL.revokeObjectURL(cover.url) }, [cover])

  const coverUrl = cover?.url ?? (cover?.remove ? null : collection?.cover_url) ?? null
  const shown = useMemo(() => {
    const t = q.trim().toLowerCase()
    return t ? products.rows.filter((p) => p.name.toLowerCase().includes(t)) : products.rows
  }, [products.rows, q])
  const toggle = (id) => {
    setPicked((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]))
    setErrors((e) => ({ ...e, products: undefined }))
  }
  const pickCover = async (chosen) => {
    if (!chosen) return
    const file = await compressImage(chosen)
    const problem = validateImage(file)
    if (problem) return setErrors((e) => ({ ...e, cover: problem }))
    setErrors((e) => ({ ...e, cover: undefined }))
    setCover({ file, url: URL.createObjectURL(file) })
  }

  const save = async () => {
    if (busy) return
    const next = {}
    if (!name.trim()) next.name = 'Give the collection a name'
    if (!starts) next.starts = 'Pick a start date'
    if (!ends) next.ends = 'Pick an end date'
    else if (starts && ends < starts) next.ends = 'End date must be on or after the start'
    if (!picked.length) next.products = 'Pick at least one product'
    setErrors(next)
    if (Object.keys(next).length) return
    setBusy(true)
    try {
      // Drop products deleted from the catalogue since the collection was saved.
      const ids = picked.filter((id) => products.rows.some((p) => p.id === id))
      await saveCollection(collection, { name: name.trim(), tagline: tagline.trim(), starts_on: starts, ends_on: ends, product_ids: ids, show_on_home: showOnHome }, cover)
      v.flash(isEdit ? `“${name.trim()}” saved` : `“${name.trim()}” created`)
      onClose()
    } catch (e) {
      setBusy(false)
      v.flash(`Could not save collection · ${e.message}`)
    }
  }

  return (
    <Modal
      title={isEdit ? 'Edit seasonal collection' : 'New seasonal collection'}
      sub="Status is set automatically from the dates: Scheduled, Live or Ended."
      width={640}
      busy={busy}
      onClose={onClose}
      footer={(
        <span style={{ marginLeft: 'auto', display: 'flex', gap: '9px' }}>
          <button type="button" onClick={onClose} disabled={busy} style={btnSecondary}>Cancel</button>
          <button type="button" onClick={save} disabled={busy} style={{ ...btnPrimary, opacity: busy ? 0.7 : 1 }}>{busy ? 'Saving…' : isEdit ? 'Save collection' : 'Create collection'}</button>
        </span>
      )}
    >
      <input ref={fileInput} type="file" accept={IMAGE_TYPES.join(',')} hidden onChange={(e) => { pickCover(e.target.files?.[0]); e.target.value = '' }} />
      <span style={{ position: 'relative', height: '170px', borderRadius: '10px', overflow: 'hidden', border: `1px ${coverUrl ? 'solid' : 'dashed'} ${errors.cover ? '#B3402F' : '#C9CEC6'}`, background: '#F6F7F4', display: 'block', flex: 'none' }}>
        {coverUrl && <img src={coverUrl} alt="Collection cover" style={{ position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover' }} />}
        <span style={{ position: 'absolute', right: '10px', bottom: '10px', display: 'flex', gap: '7px' }}>
          {coverUrl && <button type="button" onClick={() => setCover({ remove: true })} style={{ ...btnSecondary, height: '30px', font: `600 12px/1.2 ${FONT}` }}>Remove</button>}
          <button type="button" onClick={() => fileInput.current?.click()} style={{ ...btnSecondary, height: '30px', font: `600 12px/1.2 ${FONT}` }}>
            <svg width="13" height="13" viewBox="0 0 20 20" fill="none"><path d="M10 13V4m0 0L6.5 7.5M10 4l3.5 3.5M4.5 13.5v2h11v-2" stroke={INK} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            {coverUrl ? 'Replace cover' : 'Upload cover · 1200×600'}
          </button>
        </span>
      </span>
      {errors.cover && <span style={errorText}>{errors.cover}</span>}
      <div className="r-stack-sm" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '13px' }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={labelStyle}>Collection name</span>
          <input value={name} maxLength={40} placeholder="e.g. Diwali Essentials" onChange={(e) => { setName(e.target.value); setErrors((x) => ({ ...x, name: undefined })) }} style={withError(inputStyle, errors.name)} />
          {errors.name && <span style={errorText}>{errors.name}</span>}
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={labelStyle}>Tagline</span>
          <input value={tagline} maxLength={60} placeholder="e.g. Sweets, diyas & dry fruits" onChange={(e) => setTagline(e.target.value)} style={inputStyle} />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={labelStyle}>Starts</span>
          <input type="date" value={starts} onChange={(e) => { setStarts(e.target.value); setErrors((x) => ({ ...x, starts: undefined })) }} style={withError(inputStyle, errors.starts)} />
          {errors.starts && <span style={errorText}>{errors.starts}</span>}
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={labelStyle}>Ends</span>
          <input type="date" value={ends} min={starts || undefined} onChange={(e) => { setEnds(e.target.value); setErrors((x) => ({ ...x, ends: undefined })) }} style={withError(inputStyle, errors.ends)} />
          {errors.ends && <span style={errorText}>{errors.ends}</span>}
        </label>
      </div>
      <span style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ ...labelStyle, flex: '1' }}>Products</span>
          <span style={{ font: `600 12px/1.2 ${FONT}`, color: picked.length ? INK : MUTED }}>{picked.length} selected</span>
        </span>
        {products.rows.length > 12 && <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products…" style={inputStyle} />}
        <span className="ad-scroll" style={{ display: 'flex', flexWrap: 'wrap', gap: '7px', maxHeight: '170px', overflowY: 'auto' }}>
          {products.status === 'loading' && <span style={hintText}>Loading products…</span>}
          {products.status === 'ready' && !products.rows.length && <span style={hintText}>No products in the catalogue yet.</span>}
          {shown.map((p) => {
            const on = picked.includes(p.id)
            return (
              <button key={p.id} type="button" aria-pressed={on} onClick={() => toggle(p.id)} style={{ height: '32px', padding: '0 12px', border: `1px solid ${on ? '#9FD35A' : BORDER}`, borderRadius: '16px', background: on ? '#F1F9DF' : '#fff', color: on ? '#0B3D1F' : INK, font: `600 12px/1.2 ${FONT}`, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                {on && '✓ '}{p.name}
              </button>
            )
          })}
        </span>
        {errors.products && <span style={errorText}>{errors.products}</span>}
      </span>
      <span style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px', border: `1px solid ${BORDER}`, borderRadius: '9px' }}>
        <span style={{ display: 'flex', flexDirection: 'column', gap: '3px', flex: '1' }}>
          <span style={{ font: `600 12.5px/1.2 ${FONT}`, color: INK }}>Show tile on home screen</span>
          <span style={hintText}>Only while the collection is live</span>
        </span>
        <Toggle on={showOnHome} label="Show tile on home screen" onChange={setShowOnHome} />
      </span>
    </Modal>
  )
}

/** Content › Seasonal collections: time-boxed product edits with their own landing page. */
export default function CollectionsTab({ v, adding, setAdding }) {
  const collections = useCollections()
  const [editing, setEditing] = useState(null)
  const [removing, setRemoving] = useState(null)

  const remove = async (c) => {
    if (removing || !window.confirm(`Delete the collection “${c.name}”? Its landing page and home tile go away straight away.`)) return
    setRemoving(c.id)
    try {
      await deleteCollection(c)
      v.flash(`“${c.name}” deleted`)
    } catch (e) {
      v.flash(`Could not delete collection · ${e.message}`)
    } finally {
      setRemoving(null)
    }
  }

  let message = null
  if (collections.status === 'off') message = 'Supabase keys are missing · add them to .env to manage home content.'
  else if (collections.loading) message = 'Loading…'
  else if (collections.status === 'error') message = `Couldn’t load collections · ${collections.error}`

  return (
    <>
      <SectionHead title="Seasonal collections" sub="Curated, time-boxed product edits (festivals, holidays). Each gets its own landing page and a home tile while live." />
      {message ? (
        <div style={{ padding: '26px 16px', border: `1px dashed ${BORDER}`, borderRadius: '10px', background: '#fff', textAlign: 'center', font: `400 12.5px/1.5 ${FONT}`, color: MUTED }}>{message}</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(230px,1fr))', gap: '16px' }}>
          {collections.rows.map((c) => {
            const n = c.product_ids?.length ?? 0
            return (
              <div key={c.id} style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '10px', overflow: 'hidden', display: 'flex', flexDirection: 'column', opacity: removing === c.id ? 0.5 : 1 }}>
                <span style={{ position: 'relative', height: '140px', background: '#F6F7F4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {c.cover_url
                    ? <img src={c.cover_url} alt="" loading="lazy" style={{ position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <span style={{ font: `400 11px/1.2 ${FONT}`, color: MUTED }}>No cover</span>}
                  <span style={{ position: 'absolute', top: '9px', right: '9px' }}><Pill pill={STATUS[collectionStatus(c)]} /></span>
                </span>
                <span style={{ padding: '13px 15px', display: 'flex', flexDirection: 'column', gap: '6px', flex: '1' }}>
                  <span style={{ font: `600 13.5px/1.2 ${FONT}`, color: INK, ...ellipsis }}>{c.name}</span>
                  <span style={{ font: `400 11.5px/1.2 ${FONT}`, color: MUTED, ...ellipsis }}>{n} product{n === 1 ? '' : 's'} · {c.show_on_home ? 'home tile on' : 'no home tile'}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: 'auto', paddingTop: '10px', borderTop: `1px solid ${DIVIDER}` }}>
                    <span style={{ font: `400 11.5px/1.2 ${FONT}`, color: MUTED, flex: '1', ...ellipsis }}>{shortDate(c.starts_on)} – {shortDate(c.ends_on)}</span>
                    <button type="button" className="hv1" onClick={() => setEditing(c)} style={{ ...btnSecondary, height: '30px', font: `600 12px/1.2 ${FONT}` }}>Edit</button>
                    <button type="button" className="hv1" aria-label={`Delete ${c.name}`} disabled={!!removing} onClick={() => remove(c)} style={{ ...btnSecondary, width: '30px', height: '30px', padding: '0', justifyContent: 'center', borderColor: '#F0D5CF' }}><TrashIcon /></button>
                  </span>
                </span>
              </div>
            )
          })}
          <button type="button" onClick={() => setAdding(true)} style={{ minHeight: '250px', border: '1.5px dashed #CDD3C9', borderRadius: '10px', background: 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', cursor: 'pointer' }}>
            <span style={{ width: '36px', height: '36px', border: `1px solid ${BORDER}`, borderRadius: '9px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', font: `400 18px/1 ${FONT}`, color: INK }}>+</span>
            <span style={{ font: `600 13px/1.2 ${FONT}`, color: INK }}>New collection</span>
          </button>
        </div>
      )}
      {(adding || editing) && (
        <CollectionModal
          key={editing?.id ?? 'new'}
          v={v}
          collection={editing}
          onClose={() => { setAdding(false); setEditing(null) }}
        />
      )}
    </>
  )
}
