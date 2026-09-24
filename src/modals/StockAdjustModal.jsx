import { useState } from 'react'
import { adjustProductStock, notifyProductsChanged } from '../lib/products'
import { isSupabaseConfigured } from '../lib/supabase'

const MODES = [['add', 'Add stock'], ['remove', 'Remove stock'], ['set', 'Correction']]
const fieldLabel = { font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }
const fieldBox = { display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", width: "100%", boxSizing: "border-box", outline: "none" }

/** Stock adjustment for one real product row: add / remove a quantity, or correct the on-hand total. */
function AdjustRealStock({ v, product }) {
  const [mode, setMode] = useState('add')
  const [qty, setQty] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const onHand = product.stock_qty ?? 0
  const n = qty.trim() === '' ? null : Number(qty)
  const valid = n !== null && Number.isInteger(n) && (mode === 'set' ? n >= 0 : n > 0)
  const next = !valid ? null : mode === 'add' ? onHand + n : mode === 'remove' ? onHand - n : n
  const problem = qty.trim() === '' ? '' : !valid ? (mode === 'set' ? 'Enter a whole number (0 or more)' : 'Enter a whole number above 0') : next < 0 ? `Only ${onHand} on hand` : ''
  const close = () => { if (!saving) v.closeModal() }

  const apply = async () => {
    if (saving) return
    if (!valid || next < 0) return setError(problem || 'Enter a quantity')
    if (!isSupabaseConfigured) return setError('Supabase is not configured')
    setSaving(true)
    setError('')
    let total
    try {
      total = await adjustProductStock(product.id, mode, n)
    } catch (err) {
      setError(`Could not update stock · ${err?.message || 'unknown error'}`)
      setSaving(false)
      return
    }
    notifyProductsChanged()
    v.closeModal()
    v.flash(`Stock updated · ${product.name} now ${total} unit${total === 1 ? '' : 's'}`)
  }

  const busy = saving ? { opacity: ".6", cursor: "default" } : null
  const shownError = error || problem
  return (
    <div onClick={close} style={{ position: "absolute", inset: "0", zIndex: "90", background: "rgba(14,22,16,.45)", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px" }}>
      <div onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" style={{ width: "500px", maxWidth: "100%", background: "#fff", borderRadius: "14px", boxShadow: "0 26px 60px rgba(10,18,12,.3)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "16px 18px 14px", display: "flex", alignItems: "flex-start", gap: "11px", borderBottom: "1px solid #EFF1ED" }}>
          <span style={{ width: "34px", height: "34px", borderRadius: "9px", background: "#F1F9DF", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
            <svg width="17" height="17" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
              <rect x="3" y="8.8" width="6" height="7.8" rx="1.4" stroke="#0B3D1F" strokeWidth="1.5" />
              <rect x="11" y="8.8" width="6" height="7.8" rx="1.4" stroke="#0B3D1F" strokeWidth="1.5" />
              <rect x="7" y="3.4" width="6" height="4.6" rx="1.4" stroke="#0B3D1F" strokeWidth="1.5" />
            </svg>
          </span>
          <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0" }}>
            <span style={{ font: "700 15px/1.2 Inter,system-ui,sans-serif", color: "#17201A", overflowWrap: "anywhere" }}>Stock adjustment · {product.name}</span>
            <span style={{ font: "400 11.5px/1.55 Inter,system-ui,sans-serif", color: "#7C8A81" }}>
              {[product.sku || "No SKU", product.warehouse, `${onHand} unit${onHand === 1 ? "" : "s"} on hand${product.min_stock != null ? `, minimum ${product.min_stock}` : ""}.`].filter(Boolean).join(" · ")}
            </span>
          </span>
        </div>
        <div style={{ padding: "15px 18px", display: "flex", flexDirection: "column", gap: "12px" }}>
          <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <span style={fieldLabel}>ADJUSTMENT TYPE</span>
            <span style={{ display: "flex", gap: "8px" }}>
              {MODES.map(([id, label]) => {
                const on = mode === id
                return (
                  <button key={id} type="button" aria-pressed={on} onClick={() => { setMode(id); setError('') }} disabled={saving} style={{ flex: "1", padding: "10px", border: `1px solid ${on ? "#C7E88A" : "#E4E7E2"}`, background: on ? "#F7FCEE" : "#fff", borderRadius: "8px", font: "600 12px/1.2 Inter,system-ui,sans-serif", color: on ? "#0B3D1F" : "#4A564E", textAlign: "center", whiteSpace: "nowrap", cursor: "pointer" }}>
                    {label}
                  </button>
                )
              })}
            </span>
          </span>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "11px" }}>
            <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <span style={fieldLabel}>{mode === 'set' ? "COUNTED ON HAND" : "QUANTITY"}</span>
              <input
                className="sk-input"
                type="number"
                inputMode="numeric"
                min={mode === 'set' ? "0" : "1"}
                step="1"
                autoFocus
                value={qty}
                onChange={(e) => { setQty(e.target.value); setError('') }}
                onKeyDown={(e) => { if (e.key === 'Enter') apply() }}
                placeholder={mode === 'set' ? String(onHand) : "e.g. 24"}
                aria-invalid={Boolean(shownError)}
                disabled={saving}
                style={{ ...fieldBox, ...(shownError ? { borderColor: "#B3402F" } : null) }}
              />
            </label>
            <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <span style={fieldLabel}>NEW ON-HAND TOTAL</span>
              <span style={{ ...fieldBox, background: "#F6F7F4", color: next === null || next < 0 ? "#A3ADA6" : "#17201A" }}>
                {next === null || next < 0 ? `${onHand} units` : `${next} unit${next === 1 ? "" : "s"}`}
              </span>
            </span>
          </div>
          {shownError ? (
            <span style={{ font: "500 11.5px/1.45 Inter,system-ui,sans-serif", color: "#B3402F" }}>{shownError}</span>
          ) : (
            <span style={{ font: "400 11.5px/1.6 Inter,system-ui,sans-serif", color: "#7C8A81" }}>
              {mode === 'set' ? "Sets the on-hand total to the counted quantity." : "Applied to the current on-hand total in the catalogue."} The customer app updates automatically.
            </span>
          )}
        </div>
        <div style={{ padding: "13px 18px 16px", display: "flex", alignItems: "center", gap: "9px", borderTop: "1px solid #EFF1ED", background: "#F6F7F4" }}>
          <span style={{ marginLeft: "auto", display: "flex", gap: "9px" }}>
            <button onClick={close} disabled={saving} style={{ height: "36px", padding: "0 14px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap", ...busy }}>
              Cancel
            </button>
            <button onClick={apply} disabled={saving} aria-busy={saving} style={{ height: "36px", padding: "0 15px", border: "0", borderRadius: "8px", background: "#0B3D1F", color: "#fff", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap", ...busy }}>
              {saving ? "Applying…" : "Apply adjustment"}
            </button>
          </span>
        </div>
      </div>
    </div>
  )
}

export default function StockAdjustModal({ v }) {
  if (v.actionProduct) return <AdjustRealStock key={v.actionProduct.id} v={v} product={v.actionProduct} />
  return (
    <>
      <div onClick={v.closeModal} style={{ position: "absolute", inset: "0", zIndex: "90", background: "rgba(14,22,16,.45)", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px" }}>
        <div style={{ width: "500px", maxWidth: "100%", background: "#fff", borderRadius: "14px", boxShadow: "0 26px 60px rgba(10,18,12,.3)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "16px 18px 14px", display: "flex", alignItems: "flex-start", gap: "11px", borderBottom: "1px solid #EFF1ED" }}>
            <span style={{ width: "34px", height: "34px", borderRadius: "9px", background: "#F1F9DF", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
              <svg width="17" height="17" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                <rect x="3" y="8.8" width="6" height="7.8" rx="1.4" stroke="#0B3D1F" strokeWidth="1.5" />
                <rect x="11" y="8.8" width="6" height="7.8" rx="1.4" stroke="#0B3D1F" strokeWidth="1.5" />
                <rect x="7" y="3.4" width="6" height="4.6" rx="1.4" stroke="#0B3D1F" strokeWidth="1.5" />
              </svg>
            </span>
            <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0" }}>
              <span style={{ font: "700 15px/1.2 Inter,system-ui,sans-serif", color: "#17201A" }}>Stock adjustment · Basmati Rice 5kg</span>
              <span style={{ font: "400 11.5px/1.55 Inter,system-ui,sans-serif", color: "#7C8A81" }}>SK-PAN-0142 · Collingwood DC · 6 units on hand, minimum 25.</span>
            </span>
          </div>
          <div style={{ padding: "15px 18px", display: "flex", flexDirection: "column", gap: "12px" }}>
            <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase" }}>ADJUSTMENT TYPE</span>
              <span style={{ display: "flex", gap: "8px" }}>
                <span style={{ flex: "1", padding: "10px", border: "1px solid #C7E88A", background: "#F7FCEE", borderRadius: "8px", font: "600 12px/1.2 Inter,system-ui,sans-serif", color: "#0B3D1F", textAlign: "center", whiteSpace: "nowrap" }}>
                  Add stock
                </span>
                <span style={{ flex: "1", padding: "10px", border: "1px solid #E4E7E2", background: "#fff", borderRadius: "8px", font: "600 12px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", textAlign: "center", whiteSpace: "nowrap" }}>
                  Remove stock
                </span>
                <span style={{ flex: "1", padding: "10px", border: "1px solid #E4E7E2", background: "#fff", borderRadius: "8px", font: "600 12px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", textAlign: "center", whiteSpace: "nowrap" }}>
                  Correction
                </span>
              </span>
            </span>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "11px" }}>
              <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                  QUANTITY
                </span>
                <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  + 120 units
                </span>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                  NEW ON-HAND TOTAL
                </span>
                <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  126 units
                </span>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                  REASON
                </span>
                <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Supplier delivery received
                </span>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                  REFERENCE
                </span>
                <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  PO-2026-4418
                </span>
              </span>
            </div>
            <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase" }}>NOTES</span>
              <span style={{ display: "block", minHeight: "52px", padding: "10px 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "400 12px/1.6 Inter,system-ui,sans-serif", color: "#4A564E" }}>
                Pallet received 21 Sep 8:40 AM. 2 bags damaged in transit, logged separately.
              </span>
            </span>
          </div>
          <div style={{ padding: "13px 18px 16px", display: "flex", alignItems: "center", gap: "9px", borderTop: "1px solid #EFF1ED", background: "#F6F7F4" }}>
            <span style={{ marginLeft: "auto", display: "flex", gap: "9px" }}>
              <button onClick={v.closeModal} style={{ height: "36px", padding: "0 14px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap" }}>
                Cancel
              </button>
              <button onClick={v.confirmModal} style={{ height: "36px", padding: "0 15px", border: "0", borderRadius: "8px", background: "#0B3D1F", color: "#fff", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
                Apply adjustment
              </button>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
