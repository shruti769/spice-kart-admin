import { useState } from 'react'
import { deleteProduct, notifyProductsChanged } from '../lib/products'
import { isSupabaseConfigured } from '../lib/supabase'

/** Confirmation for deleting one real product row (and its image object). */
function DeleteRealProduct({ v, product }) {
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')
  const close = () => { if (!deleting) v.closeModal() }
  const confirm = async () => {
    if (deleting) return
    if (!isSupabaseConfigured) return setError('Supabase is not configured')
    setDeleting(true)
    setError('')
    try {
      await deleteProduct(product)
    } catch (err) {
      setError(`Could not delete · ${err?.message || 'unknown error'}`)
      setDeleting(false)
      return
    }
    notifyProductsChanged()
    v.productDeleted(product)
  }
  const busy = deleting ? { opacity: ".6", cursor: "default" } : null
  return (
    <div className="sk-overlay" onClick={close} style={{ position: "absolute", inset: "0", zIndex: "90", background: "rgba(14,22,16,.45)", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px" }}>
      <div className="sk-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" style={{ width: "440px", maxWidth: "100%", background: "#fff", borderRadius: "14px", boxShadow: "0 26px 60px rgba(10,18,12,.3)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "16px 18px 14px", display: "flex", alignItems: "flex-start", gap: "11px", borderBottom: "1px solid #EFF1ED" }}>
          <span style={{ width: "34px", height: "34px", borderRadius: "9px", background: "#FAEDEA", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
            <svg width="17" height="17" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
              <path d="M4.6 5.6h10.8M8 5.6V4.2h4v1.4M6.2 5.6l.7 10a1 1 0 001 .9h4.2a1 1 0 001-.9l.7-10" stroke="#A93826" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0" }}>
            <span style={{ font: "700 15px/1.2 Inter,system-ui,sans-serif", color: "#17201A" }}>Are you sure you want to delete this product?</span>
            <span style={{ font: "400 11.5px/1.55 Inter,system-ui,sans-serif", color: "#7C8A81", overflowWrap: "anywhere" }}>
              {product.name}{product.sku ? ` (${product.sku})` : ""} will be permanently removed from the Spice Kart catalogue{product.image_url ? " along with its image" : ""}, and disappears from the customer app. This cannot be undone.
            </span>
          </span>
        </div>
        {!product.published || error ? (
          <div style={{ padding: "15px 18px", display: "flex", flexDirection: "column", gap: "10px" }}>
            {error && <span style={{ font: "500 11.5px/1.45 Inter,system-ui,sans-serif", color: "#B3402F" }}>{error}</span>}
            {!product.published && !error && (
              <span style={{ font: "400 11.5px/1.6 Inter,system-ui,sans-serif", color: "#7C8A81" }}>This product is a draft, so customers can’t see it yet.</span>
            )}
          </div>
        ) : null}
        <div style={{ padding: "13px 18px 16px", display: "flex", alignItems: "center", gap: "9px", borderTop: "1px solid #EFF1ED", background: "#F6F7F4" }}>
          <span style={{ marginLeft: "auto", display: "flex", gap: "9px" }}>
            <button onClick={close} disabled={deleting} style={{ height: "36px", padding: "0 14px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", cursor: "pointer", whiteSpace: "nowrap", ...busy }}>
              Cancel
            </button>
            <button onClick={confirm} disabled={deleting} aria-busy={deleting} style={{ height: "36px", padding: "0 15px", border: "0", borderRadius: "8px", background: "#A93826", color: "#fff", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap", ...busy }}>
              {deleting ? "Deleting…" : "Delete permanently"}
            </button>
          </span>
        </div>
      </div>
    </div>
  )
}

export default function DeleteProductModal({ v }) {
  if (v.actionProduct) return <DeleteRealProduct key={v.actionProduct.id} v={v} product={v.actionProduct} />
  // Only ever opened for a real product; nothing to show otherwise.
  return null
}
