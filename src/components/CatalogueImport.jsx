import { useEffect, useRef, useState } from 'react'
import { readCatalogueFile, importCatalogue } from '../lib/catalogueImport'
import * as categories from '../lib/categories'
import { notifyProductsChanged } from '../lib/products'
import { isSupabaseConfigured, supabase } from '../lib/supabase'

import '../styles/catalogueImport.css'
export default function CatalogueImport({ onClose }) {
  const fileInput = useRef(null)
  const dialog = useRef(null)
  const [fileName, setFileName] = useState('')
  const [dragging, setDragging] = useState(false)
  const [reviewOnly, setReviewOnly] = useState(false)
  const [preview, setPreview] = useState(null)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [done, setDone] = useState(false)
  const selected = preview?.rows.filter((r) => r.selected && !r.issue) || []
  useEffect(() => {
    const previous = document.activeElement
    dialog.current?.focus()
    return () => previous?.focus()
  }, [])
  const read = async (file) => {
    if (!file) return
    setFileName(file.name); setReviewOnly(false)
    setBusy(true); setPreview(null); setMessage('Reading workbook…'); setDone(false)
    try { setPreview(await readCatalogueFile(file)); setMessage('') }
    catch (error) { setMessage(error.message) }
    finally { setBusy(false) }
  }
  const save = async () => {
    setBusy(true); setMessage('Checking existing products…')
    try {
      const result = await importCatalogue(selected, supabase, categories, ({ added }) => setMessage(`${added} products saved…`), preview.categoryDefinitions)
      setMessage(`Completed: ${result.added} products added, ${result.skipped} existing products skipped.`); setDone(true)
    } catch (error) { setMessage(error.message || 'Import failed. Retry skips products already saved.') }
    finally { categories.notifyCategoriesChanged(); notifyProductsChanged(); setBusy(false) }
  }
  const reviewCount = preview?.rows.filter((r) => r.issue).length || 0
  const visibleRows = preview?.rows.filter((r) => !reviewOnly || r.issue) || []
  const handleKey = (event) => {
    if (event.key === 'Escape' && !busy) onClose()
    if (event.key !== 'Tab') return
    const controls = [...dialog.current.querySelectorAll('button:not(:disabled), input:not(:disabled), [tabindex="0"]')].filter((el) => el.getClientRects().length)
    const first = controls[0], last = controls.at(-1)
    if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog.current)) { event.preventDefault(); last?.focus() }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
  }
  return <div className="ci-overlay">
    <div ref={dialog} tabIndex={-1} onKeyDown={handleKey} className={`ci-dialog ${preview ? 'ci-dialog-wide' : ''}`} role="dialog" aria-modal="true" aria-labelledby="import-title" aria-describedby="import-description">
      <header className="ci-header">
        <div className="ci-heading"><span className="ci-icon"><svg width="23" height="23" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6Z" stroke="currentColor" strokeWidth="1.6"/><path d="M14 3v6h6M8 13h8M8 17h8M12 13v4" stroke="currentColor" strokeWidth="1.6"/></svg></span><div><h2 id="import-title">Add products from Excel</h2><p id="import-description">Upload your file, review the list, and import.</p></div></div>
        <button className="ci-close" aria-label="Close import" disabled={busy} onClick={onClose}>×</button>
      </header>
      <div className="ci-body">
        <input ref={fileInput} className="ci-hidden" aria-label="Choose Excel file" type="file" accept=".xlsx" disabled={busy} onChange={(e) => { read(e.target.files[0]); e.target.value = '' }} />
        <button className={`ci-upload ${dragging ? 'ci-dragging' : ''} ${preview ? 'ci-upload-compact' : ''}`} disabled={busy} onClick={() => fileInput.current?.click()} onDragOver={(e) => { e.preventDefault(); if (!busy) setDragging(true) }} onDragLeave={() => setDragging(false)} onDrop={(e) => { e.preventDefault(); setDragging(false); if (!busy) read(e.dataTransfer.files[0]) }}>
          <span className="ci-upload-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 16V4m-4 4 4-4 4 4M4 15v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
          <span className="ci-upload-copy"><strong>{fileName || 'Drop your Excel file here'}</strong><span>{fileName ? 'Click to choose a different file' : 'or click to browse · .xlsx · up to 10 MB'}</span></span>
          <span className="ci-browse">{fileName ? 'Change file' : 'Choose file'}</span>
        </button>
        {!preview && <p className="ci-hint">Add categories and products together. You can add images later.</p>}
        {message && <div className={`ci-message ${done ? 'ci-success' : ''}`} role="status">{busy && <span className="ci-spinner" />}{message}</div>}
        {preview && <>
          <div className="ci-stats"><div><strong>{preview.categoryDefinitions.length}</strong><span>Categories</span></div><div><strong>{selected.length}</strong><span>Products selected</span></div><div className={reviewCount ? 'ci-stat-review' : ''}><strong>{reviewCount}</strong><span>Skipped rows</span></div></div>
          <div className="ci-preview-heading"><h3>Review products</h3><button className={`ci-filter ${reviewOnly ? 'ci-filter-active' : ''}`} onClick={() => setReviewOnly(!reviewOnly)}>{reviewOnly ? 'Show all products' : 'Show skipped rows'}</button></div>
          <p className="ci-hint">Edit categories or uncheck products. Rows with price issues or repeated names are skipped.</p>
          <div className="ci-table-wrap"><table className="ci-table">
            <thead><tr><th><span className="ci-sr-only">Select</span></th><th>Product</th><th>Category</th><th>Price</th><th>Status</th></tr></thead>
            <tbody>{visibleRows.map((row) => <tr key={row.id} className={row.issue ? 'ci-row-skipped' : ''}>
              <td><input aria-label={`Import ${row.name}, ${row.sheet} row ${row.row}`} type="checkbox" checked={row.selected} disabled={busy || done || !!row.issue} onChange={(e) => setPreview({ ...preview, rows: preview.rows.map((r) => r.id === row.id ? { ...r, selected: e.target.checked } : r) })} /></td>
              <td><strong className="ci-product-name">{row.name}</strong><span className="ci-row-detail">{row.sheet} · Row {row.row}</span></td>
              <td><input className="ci-category" aria-label={`Category for ${row.name}, row ${row.row}`} value={row.category} disabled={busy || done} onChange={(e) => setPreview({ ...preview, rows: preview.rows.map((r) => r.id === row.id ? { ...r, category: e.target.value } : r) })} />{row.subcategory && <span className="ci-row-detail">{row.subcategory}</span>}</td>
              <td className="ci-price">{row.price != null ? `$${row.price.toFixed(2)}` : '—'}</td><td><span className={`ci-badge ${row.issue ? 'ci-badge-review' : ''}`} title={row.issue || undefined}>{row.issue ? row.issue.startsWith('Repeated') ? 'Repeated name' : row.issue : 'Ready'}</span></td>
            </tr>)}</tbody>
          </table>{!visibleRows.length && <p className="ci-empty">No skipped rows.</p>}</div>
        </>}
        <details className="ci-details"><summary>Import details</summary><p>Sheet1 (3) is skipped. Existing product names are skipped. Imported products appear in the app, with stock tracking off. Fix skipped rows in Excel and upload again.</p></details>
      </div>
      <footer className="ci-footer"><span>{preview ? 'Check the list before importing.' : 'Your file is checked before import.'}</span><div><button className="ci-secondary" disabled={busy} onClick={onClose}>{done ? 'Done' : 'Cancel'}</button>{preview && !done && <button className="ci-primary" disabled={busy || !isSupabaseConfigured || !selected.length || selected.some((r) => !r.category.trim())} onClick={save}>{busy ? 'Importing…' : `Import ${selected.length} products`}</button>}</div></footer>
    </div>
  </div>
}
