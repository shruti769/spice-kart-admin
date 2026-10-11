import { useEffect, useRef, useState } from 'react'
import { supabase } from '../lib/supabase'
import { notifyProductsChanged } from '../lib/products'
import { saveProductPhoto } from '../lib/productPhotos'
import '../styles/catalogueImport.css'

const BASE = `${import.meta.env.BASE_URL}product-photo-samples/`
const PAGE_SIZE = 36

export default function ProductPhotoSamples({ onClose }) {
  const [rows, setRows] = useState([])
  const [pending, setPending] = useState([])
  const [selected, setSelected] = useState(new Set())
  const [busy, setBusy] = useState(false)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('Loading photos…')
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(0)
  const [progress, setProgress] = useState(null)
  const dialog = useRef(null)
  const cancel = useRef(false)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      const responses = await Promise.all([fetch(`${BASE}manifest.json`), fetch(`${BASE}unmatched.json`)])
      if (responses.some((res) => !res.ok)) throw new Error('Could not load product photos')
      const [photos, unverified] = await Promise.all(responses.map((res) => res.json()))
      const products = []
      for (let offset = 0; ; offset += 1000) {
        const { data, error } = await supabase.from('products').select('id,name,image_url').order('id').range(offset, offset + 999)
        if (error) throw error
        products.push(...data)
        if (data.length < 1000) break
      }
      const names = new Map()
      for (const product of products) names.set(product.name, [...(names.get(product.name) || []), product])
      const needsPhoto = (row) => names.get(row.name)?.length === 1 && (!names.get(row.name)[0].image_url || (row.replaceImageUrl && names.get(row.name)[0].image_url === row.replaceImageUrl))
      const ready = photos.filter(needsPhoto)
      if (!cancelled) {
        setRows(ready)
        setPending(unverified.filter(needsPhoto))
        setSelected(new Set(ready.map((row) => row.name)))
        setMessage(ready.length ? '' : 'No new photos to apply.')
        setLoading(false)
      }
    }
    load().catch((error) => { if (!cancelled) { setMessage(error.message); setLoading(false) } })
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    const previous = document.activeElement
    dialog.current?.focus()
    const keydown = (event) => {
      if (event.key === 'Escape' && !busy) onClose()
      if (event.key !== 'Tab') return
      const controls = [...dialog.current.querySelectorAll('button:not(:disabled), input:not(:disabled), a[href], summary')]
      const first = controls[0], last = controls.at(-1)
      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog.current)) { event.preventDefault(); last?.focus() }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
    }
    document.addEventListener('keydown', keydown)
    return () => { document.removeEventListener('keydown', keydown); previous?.focus() }
  }, [busy, onClose])

  const save = async () => {
    setBusy(true)
    cancel.current = false
    const batch = rows.filter((row) => selected.has(row.name))
    let saved = 0, skipped = 0, failed = 0, processed = 0, cursor = 0, stoppedError = ''
    const completed = new Set()
    const worker = async () => {
      while (cursor < batch.length && !cancel.current && !stoppedError) {
        const row = batch[cursor++]
        try {
          const result = await saveProductPhoto(supabase, row, BASE)
          if (result === 'saved') saved++
          else skipped++
          completed.add(row.name)
        } catch (error) {
          failed++
          if (/permission|row.level|unauthorized|jwt|bucket not found/i.test(error.message || '')) stoppedError = error.message
        }
        processed++
        setMessage(`Adding photos… ${processed} / ${batch.length}`)
        setProgress({ processed, total: batch.length })
      }
    }
    await Promise.all(Array.from({ length: Math.min(3, batch.length) }, worker))
    setRows((current) => current.filter((row) => !completed.has(row.name)))
    setSelected((current) => new Set([...current].filter((name) => !completed.has(name))))
    setPage(0)
    setProgress(null)
    setBusy(false)
    setMessage(`${saved} photos added · ${skipped} skipped · ${failed} failed.${stoppedError ? ` ${stoppedError}. Sign in as admin and retry.` : cancel.current ? ' Stopped. Remaining photos can be added later.' : failed ? ' Retry the remaining photos.' : ''}`)
    notifyProductsChanged()
  }
  const visible = rows.filter((row) => row.name.toLowerCase().includes(query.toLowerCase()))
  const pages = Math.max(1, Math.ceil(visible.length / PAGE_SIZE))
  const currentPage = Math.min(page, pages - 1)
  const toggle = (name, checked) => setSelected((current) => {
    const next = new Set(current)
    if (checked) next.add(name)
    else next.delete(name)
    return next
  })

  return <div className="ci-overlay"><div ref={dialog} tabIndex={-1} className="ci-dialog ci-dialog-wide" role="dialog" aria-modal="true" aria-labelledby="photo-samples-title">
    <header className="ci-header"><div className="ci-heading"><div><h2 id="photo-samples-title">Add product photos</h2><p>Matching photos, ready for your catalogue.</p></div></div><button className="ci-close" aria-label="Close photos" disabled={busy} onClick={onClose}>×</button></header>
    <div className="ci-body">
      <p className="ci-hint">Pack photos match the supplier listing. Generic photos show the product contents without a brand or size label. Photos marked Replace update the previous photo. Click Add photos to save them to your catalogue.</p>
      <div className="pp-toolbar"><label className="pp-search">Search products<input value={query} onChange={(event) => { setQuery(event.target.value); setPage(0) }} placeholder="Search by product name" /></label><button className="ci-secondary" disabled={busy || loading} onClick={() => setSelected(new Set(rows.map((row) => row.name)))}>Select all {rows.length}</button><button className="ci-secondary" disabled={busy} onClick={() => setSelected(new Set())}>Clear selection</button></div>
      {message && <p className="ci-message" role="status">{message}</p>}
      {progress && <progress className="pp-progress" value={progress.processed} max={progress.total} aria-label="Photos saved" />}
      <div className="pp-grid">{visible.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE).map((row) => <article key={row.name} className="pp-card">
        <img loading="lazy" src={`${BASE}${row.file}`} alt={row.name} />
        <label className="pp-name"><input type="checkbox" disabled={busy} checked={selected.has(row.name)} onChange={(event) => toggle(row.name, event.target.checked)} />{row.name}</label>
        <span className="pp-badge">{row.kind === 'generated' ? 'Generic · AI image' : row.kind === 'generic' ? 'Generic photo' : 'Pack photo'}</span>
        {row.replaceImageUrl && <span className="pp-badge">Replace previous photo</span>}
        {row.source && <a href={row.source} target="_blank" rel="noreferrer">View source ↗</a>}
      </article>)}</div>
      {pages > 1 && <nav className="pp-pagination" aria-label="Photo pages"><button className="ci-secondary" disabled={currentPage === 0} onClick={() => setPage(currentPage - 1)}>Previous</button><span>{currentPage + 1} / {pages}</span><button className="ci-secondary" disabled={currentPage === pages - 1} onClick={() => setPage(currentPage + 1)}>Next</button></nav>}
      {pending.length > 0 && <details className="pp-pending"><summary>{pending.length} products still need a matching photo</summary><p className="ci-hint">These photos could not be verified yet.</p><ul>{pending.filter((row) => row.name.toLowerCase().includes(query.toLowerCase())).map((row) => <li key={row.name}>{row.name}</li>)}</ul></details>}
    </div>
    <footer className="ci-footer"><span>{selected.size} photos selected</span><div>{busy ? <button className="ci-secondary" onClick={() => { cancel.current = true }}>Stop after current uploads</button> : <button className="ci-secondary" onClick={onClose}>Close</button>}<button className="ci-primary" disabled={busy || loading || !selected.size} onClick={save}>{busy ? 'Adding photos…' : `Add ${selected.size || ''} photos`}</button></div></footer>
  </div></div>
}
