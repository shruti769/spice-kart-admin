import { useEffect, useRef, useState } from 'react'
import { useCategories } from '../lib/categories'
import { notifyProductsChanged, removeProductImage } from '../lib/products'
import { isSupabaseConfigured, supabase } from '../lib/supabase'

const FONT = 'Inter,system-ui,sans-serif'
const ERROR_RED = '#B3402F'
const MAX_IMAGE_BYTES = 5 * 1024 * 1024
const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const ATTRIBUTES = ['Vegetarian', 'Vegan', 'Gluten Free', 'Organic', 'Halal', 'Imported', 'Frozen Foods & Vegetables', 'Bestseller']

const EMPTY_FORM = {
  name: '', sku: '', barcode: '', brand: '', category_id: '', subcategory: '', description: '',
  price: '', compare_at_price: '', cost_price: '',
  stock_qty: '', min_stock: '', max_stock: '', warehouse: '',
  weight: '', unit: '', size: '', country_of_origin: '', ingredients: '', storage: '',
  attributes: [],
  express_delivery: true, scheduled_delivery: true, track_inventory: true, published: true,
}

// Form values for an existing `public.products` row (edit mode).
const text = (x) => (x == null ? '' : String(x))
const money2 = (x) => (x == null || x === '' ? '' : Number(x).toFixed(2))
const flag = (x, fallback) => (typeof x === 'boolean' ? x : fallback)
function rowToForm(row) {
  return {
    name: text(row.name), sku: text(row.sku), barcode: text(row.barcode), brand: text(row.brand),
    category_id: text(row.category_id), subcategory: text(row.subcategory), description: text(row.description),
    price: money2(row.price), compare_at_price: money2(row.compare_at_price), cost_price: money2(row.cost_price),
    stock_qty: text(row.stock_qty), min_stock: text(row.min_stock), max_stock: text(row.max_stock), warehouse: text(row.warehouse),
    weight: text(row.weight), unit: text(row.unit), size: text(row.size), country_of_origin: text(row.country_of_origin),
    ingredients: text(row.ingredients), storage: text(row.storage),
    attributes: Array.isArray(row.attributes) ? row.attributes : [],
    express_delivery: flag(row.express_delivery, true), scheduled_delivery: flag(row.scheduled_delivery, true),
    track_inventory: flag(row.track_inventory, true), published: flag(row.published, true),
  }
}

// ---- styles (match the original static field boxes) ----
const labelStyle = { font: `600 10.5px/1.2 ${FONT}`, letterSpacing: '.4px', color: '#7C8A81', textTransform: 'uppercase', whiteSpace: 'nowrap' }
const boxBase = { height: '36px', padding: '0 11px', border: '1px solid #E4E7E2', borderRadius: '8px', background: '#fff', font: `500 12.5px/1.2 ${FONT}`, color: '#17201A', width: '100%', minWidth: '0', boxSizing: 'border-box', outline: 'none' }
const areaBase = { display: 'block', minHeight: '64px', padding: '10px 11px', border: '1px solid #E4E7E2', borderRadius: '8px', background: '#fff', font: `400 12.5px/1.6 ${FONT}`, color: '#4A564E', width: '100%', boxSizing: 'border-box', outline: 'none', resize: 'vertical' }
const chevron = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M6 8l4 4 4-4' stroke='%237C8A81' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`
const withError = (style, err) => (err ? { ...style, borderColor: ERROR_RED } : style)
const cardStyle = { background: '#fff', border: '1px solid #E4E7E2', borderRadius: '10px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '14px' }
const cardTitle = { font: `600 13.5px/1.2 ${FONT}`, color: '#17201A', whiteSpace: 'nowrap' }
const btnSecondary = { display: 'flex', alignItems: 'center', gap: '7px', height: '34px', padding: '0 12px', border: '1px solid #E4E7E2', borderRadius: '8px', background: '#fff', color: '#17201A', font: `600 12.5px/1.2 ${FONT}`, cursor: 'pointer', whiteSpace: 'nowrap' }

function Field({ label, error, span2, children }) {
  return (
    <span style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: '0', ...(span2 ? { gridColumn: 'span 2' } : null) }}>
      <span style={labelStyle}>{label}</span>
      {children}
      {error && <span style={{ font: `500 11px/1.3 ${FONT}`, color: ERROR_RED }}>{error}</span>}
    </span>
  )
}

function TextInput({ value, onChange, error, ...rest }) {
  return <input className="sk-input" type="text" value={value} onChange={(e) => onChange(e.target.value)} style={withError(boxBase, error)} aria-invalid={Boolean(error)} {...rest} />
}

function TextArea({ value, onChange, ...rest }) {
  return <textarea className="sk-input" rows={2} value={value} onChange={(e) => onChange(e.target.value)} style={areaBase} {...rest} />
}

function NumberInput({ value, onChange, error, prefix, integer, ...rest }) {
  const input = (
    <input
      className={prefix ? 'sk-input sk-input-bare' : 'sk-input'}
      type="number"
      inputMode={integer ? 'numeric' : 'decimal'}
      min="0"
      step={integer ? '1' : '0.01'}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-invalid={Boolean(error)}
      style={prefix ? { ...boxBase, height: '34px', padding: '0', border: '0', background: 'transparent', flex: '1' } : withError(boxBase, error)}
      {...rest}
    />
  )
  if (!prefix) return input
  return (
    <span className="sk-input-wrap" style={withError({ ...boxBase, display: 'flex', alignItems: 'center', gap: '4px' }, error)}>
      <span style={{ color: '#7C8A81', flex: 'none' }}>{prefix}</span>
      {input}
    </span>
  )
}

function Select({ value, onChange, error, children, ...rest }) {
  const style = { ...withError(boxBase, error), appearance: 'none', WebkitAppearance: 'none', paddingRight: '30px', cursor: 'pointer', backgroundImage: chevron, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center', color: value ? '#17201A' : '#A3ADA6' }
  return (
    <select className="sk-input" value={value} onChange={(e) => onChange(e.target.value)} style={style} aria-invalid={Boolean(error)} {...rest}>
      {children}
    </select>
  )
}

// Read-only computed value, styled like the other field boxes.
function ReadOnly({ children, muted }) {
  return (
    <span style={{ ...boxBase, display: 'flex', alignItems: 'center', background: '#F6F7F4', color: muted ? '#A3ADA6' : '#17201A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
      {children}
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

function ToggleRow({ title, subtitle, on, onChange }) {
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: '11px', padding: '10px 0', borderBottom: '1px solid #EFF1ED' }}>
      <span style={{ display: 'flex', flexDirection: 'column', gap: '3px', flex: '1', minWidth: '0' }}>
        <span style={{ font: `500 12.5px/1.2 ${FONT}`, color: '#17201A', whiteSpace: 'nowrap' }}>{title}</span>
        {subtitle && <span style={{ font: `400 11px/1.2 ${FONT}`, color: '#7C8A81' }}>{subtitle}</span>}
      </span>
      <Toggle on={on} onChange={onChange} label={title} />
    </span>
  )
}

// ---- helpers ----
const toNumber = (s) => (String(s).trim() === '' ? null : Number(s))
const optionalText = (s) => s.trim() || null

function discountLabel(price, compareAt) {
  if (!(price > 0) || !(compareAt > price)) return null
  return `${Math.floor((1 - price / compareAt) * 100)}% off`
}

function marginLabel(price, cost) {
  if (!(price > 0) || cost === null || Number.isNaN(cost)) return null
  return `${(((price - cost) / price) * 100).toFixed(1)}%`
}

function validate(f) {
  const errors = {}
  const price = toNumber(f.price)
  const compareAt = toNumber(f.compare_at_price)
  const cost = toNumber(f.cost_price)
  if (!f.name.trim()) errors.name = 'Product name is required'
  if (!f.category_id) errors.category_id = 'Choose a category'
  if (price === null) errors.price = 'Selling price is required'
  else if (Number.isNaN(price) || price <= 0) errors.price = 'Price must be greater than 0'
  if (compareAt !== null && (Number.isNaN(compareAt) || (price > 0 && compareAt < price))) errors.compare_at_price = 'Must be at least the selling price'
  if (cost !== null && (Number.isNaN(cost) || cost < 0)) errors.cost_price = 'Enter a valid cost'
  for (const key of ['stock_qty', 'min_stock', 'max_stock']) {
    const n = toNumber(f[key])
    if (n !== null && (!Number.isInteger(n) || n < 0)) errors[key] = 'Enter a whole number'
  }
  const min = toNumber(f.min_stock)
  const max = toNumber(f.max_stock)
  if (!errors.min_stock && !errors.max_stock && min !== null && max !== null && max < min) errors.max_stock = 'Must be at least the minimum level'
  return errors
}

// Row for `public.products`: trimmed strings, empty optional fields → null, numbers parsed.
// brand, description and weight are NOT NULL (default '') in the schema, so they stay strings.
function toRow(f, imageUrl) {
  return {
    name: f.name.trim(),
    brand: f.brand.trim(),
    sku: optionalText(f.sku),
    barcode: optionalText(f.barcode),
    category_id: f.category_id,
    subcategory: f.subcategory || null,
    description: f.description.trim(),
    price: Number(f.price),
    compare_at_price: toNumber(f.compare_at_price),
    cost_price: toNumber(f.cost_price),
    stock_qty: toNumber(f.stock_qty) ?? 0,
    min_stock: toNumber(f.min_stock),
    max_stock: toNumber(f.max_stock),
    warehouse: optionalText(f.warehouse),
    weight: f.weight.trim(),
    unit: optionalText(f.unit),
    size: optionalText(f.size),
    country_of_origin: optionalText(f.country_of_origin),
    ingredients: optionalText(f.ingredients),
    storage: optionalText(f.storage),
    attributes: f.attributes,
    image_url: imageUrl,
    express_delivery: f.express_delivery,
    scheduled_delivery: f.scheduled_delivery,
    track_inventory: f.track_inventory,
    published: f.published,
  }
}

function storagePath(file) {
  const ext = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' }[file.type] || 'img'
  const base = file.name.replace(/\.[^.]*$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60) || 'image'
  const id = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  return `${id}-${base}.${ext}`
}

export default function ProductForm({ v }) {
  const isAdd = v.isAddMode
  // The product being edited (null in add mode, or when edit mode was opened without one).
  const row = isAdd ? null : v.editingProduct
  const [form, setForm] = useState(() => (row ? rowToForm(row) : EMPTY_FORM))
  const [errors, setErrors] = useState({})
  const [imageFile, setImageFile] = useState(null)
  const [preview, setPreview] = useState(null)
  // Edit mode: the saved image was removed (saving clears image_url and deletes the object).
  const [imageRemoved, setImageRemoved] = useState(false)
  const [saving, setSaving] = useState(false)
  const fileInput = useRef(null)
  const scrollRef = useRef(null)
  const categoryState = useCategories()
  const categoriesLoading = categoryState.status === 'loading'
  const missingProduct = !isAdd && !row
  const navProducts = v.nav_products

  // Release the local preview URL when it is replaced or the form unmounts.
  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview) }, [preview])

  // Edit mode without a product (e.g. stale state): go back to the list.
  useEffect(() => { if (missingProduct) navProducts() }, [missingProduct, navProducts])

  const set = (key) => (value) => {
    setForm((f) => ({ ...f, [key]: value }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }))
  }
  const setCategory = (id) => {
    setForm((f) => ({ ...f, category_id: id, subcategory: '' }))
    if (errors.category_id) setErrors((e) => ({ ...e, category_id: undefined }))
  }
  const toggleAttribute = (name) => setForm((f) => ({
    ...f,
    attributes: f.attributes.includes(name) ? f.attributes.filter((a) => a !== name) : [...f.attributes, name],
  }))

  // Enabled categories only, but keep the product's current one selectable when editing.
  const categoryOptions = categoryState.rows.filter((c) => c.enabled || c.id === form.category_id)
  const category = categoryState.rows.find((c) => c.id === form.category_id)
  // Keep an unknown current subcategory (e.g. since renamed) visible instead of silently blanking it.
  // Categories are admin-created only; until one exists a new product can't be saved.
  const noCategories = isAdd && !categoriesLoading && categoryOptions.length === 0
  const subcategoryOptions = category ? (form.subcategory && !category.subcategories.includes(form.subcategory) ? [...category.subcategories, form.subcategory] : category.subcategories) : []
  const isRemovedSubcategory = (sc) => !!category && !category.subcategories.includes(sc)
  // Attributes saved on the product that aren't in the standard list stay visible (and toggleable).
  const attributeOptions = [...ATTRIBUTES, ...(row?.attributes ?? []).filter((a) => !ATTRIBUTES.includes(a))]
  // Image shown in the main slot: a newly picked file, else the saved image unless removed.
  const savedImage = row && !imageRemoved ? row.image_url : null
  const shownImage = preview || savedImage
  const subtitle = row
    ? [
        row.name,
        row.sku || 'no SKU',
        (categoryState.rows.find((c) => c.id === row.category_id)?.name || row.category_id) + (row.subcategory ? ` › ${row.subcategory}` : ''),
      ].join(' · ')
    : v.formSub
  const price = toNumber(form.price)
  const discount = discountLabel(price, toNumber(form.compare_at_price))
  const margin = marginLabel(price, toNumber(form.cost_price))

  const openPicker = () => { if (!saving) fileInput.current?.click() }
  const pickImage = (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    if (!IMAGE_TYPES.includes(file.type)) return v.flash('Use a JPG, PNG or WebP image')
    if (file.size > MAX_IMAGE_BYTES) return v.flash(`Image is ${(file.size / 1024 / 1024).toFixed(1)} MB · the limit is 5 MB`)
    setImageFile(file)
    setPreview(URL.createObjectURL(file))
  }
  const removeImage = (e) => {
    e.stopPropagation()
    setImageFile(null)
    setPreview(null)
    if (row) setImageRemoved(true)
  }

  const resetForm = () => {
    setForm(EMPTY_FORM)
    setErrors({})
    setImageFile(null)
    setPreview(null)
    scrollRef.current?.scrollTo({ top: 0 })
  }

  const save = async (addAnother) => {
    if (saving || noCategories) return
    if (!isAdd) return saveChanges()

    const found = validate(form)
    setErrors(found)
    if (Object.keys(found).length) return v.flash('Check the highlighted fields before saving')
    if (!isSupabaseConfigured) return v.flash('Supabase keys are missing · add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to .env and restart the dev server')

    setSaving(true)
    const bucket = supabase.storage.from('product-images')
    let uploadedPath = null
    try {
      let imageUrl = null
      if (imageFile) {
        const path = storagePath(imageFile)
        const { error: uploadError } = await bucket.upload(path, imageFile, { contentType: imageFile.type, upsert: false })
        if (uploadError) throw uploadError
        uploadedPath = path
        imageUrl = bucket.getPublicUrl(path).data.publicUrl
      }
      const { error: insertError } = await supabase.from('products').insert(toRow(form, imageUrl))
      if (insertError) throw insertError
    } catch (err) {
      // Don't leave an orphaned image behind if the row insert failed.
      if (uploadedPath) await bucket.remove([uploadedPath])
      if (err?.code === '23505') {
        setErrors((e) => ({ ...e, sku: 'This SKU is already in use' }))
        v.flash('Could not save · this SKU is already in use')
      } else {
        v.flash(`Could not save product · ${err?.message || 'unknown error'}`)
      }
      setSaving(false)
      return
    }

    notifyProductsChanged()
    v.flash(form.published ? 'Product saved · now live in the app' : 'Saved as draft')
    if (addAnother) {
      resetForm()
      setSaving(false)
    } else {
      v.nav_products()
    }
  }

  // Edit mode: update the row in place; replace / remove its image when that changed.
  const saveChanges = async () => {
    if (!row) return
    const found = validate(form)
    setErrors(found)
    if (Object.keys(found).length) return v.flash('Check the highlighted fields before saving')
    if (!isSupabaseConfigured) return v.flash('Supabase keys are missing · add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to .env and restart the dev server')

    setSaving(true)
    const bucket = supabase.storage.from('product-images')
    const oldUrl = row.image_url || null
    let uploadedPath = null
    let imageUrl = oldUrl
    try {
      if (imageFile) {
        const path = storagePath(imageFile)
        const { error: uploadError } = await bucket.upload(path, imageFile, { contentType: imageFile.type, upsert: false })
        if (uploadError) throw uploadError
        uploadedPath = path
        imageUrl = bucket.getPublicUrl(path).data.publicUrl
      } else if (imageRemoved) {
        imageUrl = null
      }
      const { data, error: updateError } = await supabase.from('products').update(toRow(form, imageUrl)).eq('id', row.id).select('id')
      if (updateError) throw updateError
      if (!data?.length) throw new Error('this product no longer exists or you don’t have permission to edit it')
    } catch (err) {
      // Don't leave an orphaned image behind if the row update failed.
      if (uploadedPath) await bucket.remove([uploadedPath])
      if (err?.code === '23505') {
        setErrors((e) => ({ ...e, sku: 'This SKU is already in use' }))
        v.flash('Could not save · this SKU is already in use')
      } else {
        v.flash(`Could not save product · ${err?.message || 'unknown error'}`)
      }
      setSaving(false)
      return
    }

    // The row no longer points at the old image: delete it (best effort).
    if (oldUrl && imageUrl !== oldUrl) await removeProductImage(oldUrl)
    notifyProductsChanged()
    v.flash('Product updated')
    v.nav_products()
  }

  const busy = saving ? { opacity: '.6', cursor: 'default' } : null
  const blocked = saving || noCategories
  const saveBusy = blocked ? { opacity: '.6', cursor: saving ? 'default' : 'not-allowed' } : null
  const blockedTitle = noCategories ? 'Add a category in Catalogue › Categories first' : undefined

  if (missingProduct) return null

  return (
    <>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "18px", padding: "24px 26px 2px" }}>
        <span style={{ display: "flex", flexDirection: "column", gap: "5px", minWidth: "0" }}>
          <span style={{ font: "700 20px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>{v.formTitle}</span>
          <span style={{ font: "400 12.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>{subtitle}</span>
        </span>
        <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px" }}>
          {row && (
            <button onClick={() => v.openDeleteProduct(row)} disabled={saving} style={{ ...btnSecondary, color: ERROR_RED, borderColor: "#EEDAD5", background: "#FDF7F5", ...busy }}>
              Delete product
            </button>
          )}
          <button className="hv1" onClick={v.nav_products} disabled={saving} style={{ ...btnSecondary, ...busy }}>
            Discard
          </button>
          {isAdd && (
            <>
              <button className="hv1" onClick={() => save(true)} disabled={blocked} title={blockedTitle} style={{ ...btnSecondary, ...saveBusy }}>
                {saving ? 'Saving…' : 'Save & add another'}
              </button>
            </>
          )}
          <button className="hv2" onClick={() => save(false)} disabled={blocked} title={blockedTitle} aria-busy={saving} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 13px", border: "0", borderRadius: "8px", background: "#0B3D1F", color: "#fff", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap", ...saveBusy }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
              <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#8BE000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {saving ? 'Saving…' : v.formCta}
          </button>
        </span>
      </div>
      <div ref={scrollRef} className="ad-scroll" style={{ flex: "1", minHeight: "0", overflowY: "auto", padding: "20px 26px 30px", display: "flex", flexDirection: "column", gap: "18px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.7fr 1fr", gap: "18px", alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={cardStyle}>
              <span style={cardTitle}>Basic information</span>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "11px" }}>
                <Field label="PRODUCT NAME" error={errors.name}>
                  <TextInput value={form.name} onChange={set('name')} error={errors.name} placeholder="e.g. Basmati Rice 5kg" maxLength={200} />
                </Field>
                <Field label="SKU" error={errors.sku}>
                  <TextInput value={form.sku} onChange={set('sku')} error={errors.sku} placeholder="e.g. SK-PAN-0142" maxLength={64} />
                </Field>
                <Field label="BARCODE">
                  <TextInput value={form.barcode} onChange={set('barcode')} placeholder="e.g. 9 312345 678907" maxLength={64} />
                </Field>
                <Field label="BRAND">
                  <TextInput value={form.brand} onChange={set('brand')} placeholder="e.g. Pantry Co" maxLength={120} />
                </Field>
                <Field label="CATEGORY" error={errors.category_id}>
                  <Select value={categoriesLoading ? '' : form.category_id} onChange={setCategory} error={errors.category_id} disabled={categoriesLoading || noCategories}>
                    <option value="" disabled>{categoriesLoading ? 'Loading categories…' : categoryState.status === 'error' && !categoryOptions.length ? 'Couldn’t load categories' : !categoryOptions.length ? 'No categories yet — add one in Catalogue › Categories' : 'Select a category'}</option>
                    {categoryOptions.map((c) => <option key={c.id} value={c.id}>{c.enabled ? c.name : `${c.name} (disabled)`}</option>)}
                    {!categoriesLoading && form.category_id && !category && <option value={form.category_id}>{form.category_id}</option>}
                  </Select>
                </Field>
                <Field label="SUBCATEGORY">
                  <Select value={form.subcategory} onChange={set('subcategory')} disabled={!category}>
                    <option value="">{categoriesLoading ? 'Loading…' : !category ? 'Choose a category first' : subcategoryOptions.length ? 'Select a subcategory' : 'No subcategories'}</option>
                    {subcategoryOptions.map((sc) => <option key={sc} value={sc}>{isRemovedSubcategory(sc) ? `${sc} (removed)` : sc}</option>)}
                  </Select>
                </Field>
                <Field label="DESCRIPTION" span2>
                  <TextArea value={form.description} onChange={set('description')} placeholder="e.g. Long-grain aged basmati rice, sourced from Punjab. Fluffy texture, ideal for biryani and pilaf." />
                </Field>
              </div>
            </div>
            <div style={cardStyle}>
              <span style={cardTitle}>Pricing</span>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "11px" }}>
                <Field label="SELLING PRICE (AUD)" error={errors.price}>
                  <NumberInput prefix="$" value={form.price} onChange={set('price')} error={errors.price} placeholder="24.50" />
                </Field>
                <Field label="COMPARE-AT PRICE" error={errors.compare_at_price}>
                  <NumberInput prefix="$" value={form.compare_at_price} onChange={set('compare_at_price')} error={errors.compare_at_price} placeholder="28.00" />
                </Field>
                <Field label="COST PRICE" error={errors.cost_price}>
                  <NumberInput prefix="$" value={form.cost_price} onChange={set('cost_price')} error={errors.cost_price} placeholder="17.20" />
                </Field>
                <Field label="GST">
                  <ReadOnly>10% included</ReadOnly>
                </Field>
                <Field label="DISCOUNT">
                  <ReadOnly muted={!discount}>{discount || 'Set a compare-at price'}</ReadOnly>
                </Field>
                <Field label="MARGIN">
                  <ReadOnly muted={!margin}>{margin || 'Set a cost price'}</ReadOnly>
                </Field>
              </div>
            </div>
            <div style={cardStyle}>
              <span style={cardTitle}>Inventory</span>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "11px" }}>
                <Field label="STOCK QUANTITY" error={errors.stock_qty}>
                  <NumberInput integer value={form.stock_qty} onChange={set('stock_qty')} error={errors.stock_qty} placeholder="0" />
                </Field>
                <Field label="MINIMUM LEVEL" error={errors.min_stock}>
                  <NumberInput integer value={form.min_stock} onChange={set('min_stock')} error={errors.min_stock} placeholder="e.g. 25" />
                </Field>
                <Field label="MAXIMUM LEVEL" error={errors.max_stock}>
                  <NumberInput integer value={form.max_stock} onChange={set('max_stock')} error={errors.max_stock} placeholder="e.g. 400" />
                </Field>
                <Field label="WAREHOUSE">
                  <TextInput value={form.warehouse} onChange={set('warehouse')} placeholder="e.g. Collingwood DC" maxLength={120} />
                </Field>
              </div>
            </div>
            <div style={cardStyle}>
              <span style={cardTitle}>Product information</span>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "11px" }}>
                <Field label="WEIGHT">
                  <TextInput value={form.weight} onChange={set('weight')} placeholder="e.g. 5 kg" maxLength={40} />
                </Field>
                <Field label="UNIT">
                  <TextInput value={form.unit} onChange={set('unit')} placeholder="e.g. Bag" maxLength={40} />
                </Field>
                <Field label="SIZE">
                  <TextInput value={form.size} onChange={set('size')} placeholder="e.g. 5kg" maxLength={40} />
                </Field>
                <Field label="COUNTRY OF ORIGIN">
                  <TextInput value={form.country_of_origin} onChange={set('country_of_origin')} placeholder="e.g. India" maxLength={80} />
                </Field>
                <Field label="INGREDIENTS" span2>
                  <TextArea value={form.ingredients} onChange={set('ingredients')} placeholder="e.g. 100% aged basmati rice." />
                </Field>
                <Field label="STORAGE" span2>
                  <TextArea value={form.storage} onChange={set('storage')} placeholder="e.g. Store in a cool, dry place away from direct sunlight." />
                </Field>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ ...cardStyle, gap: "13px" }}>
              <span style={{ font: "600 13.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A" }}>Product images</span>
              <input ref={fileInput} type="file" accept="image/jpeg,image/png,image/webp" onChange={pickImage} style={{ display: "none" }} />
              <span
                role="button"
                tabIndex={0}
                aria-label={shownImage ? 'Replace main image' : 'Upload main image'}
                onClick={openPicker}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openPicker() } }}
                style={{ position: "relative", height: "150px", borderRadius: "9px", overflow: "hidden", border: shownImage ? "1px solid #E4E7E2" : "1px dashed #C7C7C1", background: "#F6F7F4", display: "block", cursor: "pointer" }}
              >
                {shownImage ? (
                  <img src={shownImage} alt="" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <span style={{ position: "absolute", inset: "0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "7px" }}>
                    <svg width="22" height="22" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                      <path d="M10 13V4.6M6.6 8L10 4.6 13.4 8M4 13.4v1.4A1.6 1.6 0 005.6 16.4h8.8a1.6 1.6 0 001.6-1.6v-1.4" stroke="#7C8A81" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span style={{ font: "600 12px/1.2 Inter,system-ui,sans-serif", color: "#17201A" }}>Upload main image</span>
                    <span style={{ font: "400 11px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81" }}>JPG, PNG or WebP · up to 5 MB</span>
                  </span>
                )}
                <span style={{ position: "absolute", top: "8px", left: "8px", font: "600 9.5px/1.2 Inter,system-ui,sans-serif", color: "#0B3D1F", background: "#8BE000", padding: "4px 6px", borderRadius: "4px" }}>
                  MAIN
                </span>
                {shownImage && (
                  <button onClick={removeImage} disabled={saving} style={{ position: "absolute", top: "8px", right: "8px", border: "0", borderRadius: "5px", background: "rgba(23,32,26,.72)", color: "#fff", font: "600 10.5px/1.2 Inter,system-ui,sans-serif", padding: "5px 8px", cursor: "pointer" }}>
                    Remove
                  </button>
                )}
              </span>
              <span style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
                <button type="button" onClick={openPicker} aria-label="Add image" style={{ height: "56px", borderRadius: "8px", border: "1px dashed #C7C7C1", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: "0" }}>
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
                    <path d="M10 4.4v11.2M4.4 10h11.2" stroke="#7C8A81" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </button>
              </span>
            </div>
            <div style={{ ...cardStyle, gap: "13px" }}>
              <span style={{ font: "600 13.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A" }}>Attributes</span>
              <span style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
                {attributeOptions.map((name) => {
                  const on = form.attributes.includes(name)
                  return (
                    <button key={name} type="button" aria-pressed={on} onClick={() => toggleAttribute(name)} style={{ font: "600 11.5px/1.2 Inter,system-ui,sans-serif", color: on ? '#0B3D1F' : '#4A564E', background: on ? '#F1F9DF' : '#fff', border: `1px solid ${on ? '#C7E88A' : '#E4E7E2'}`, padding: "7px 10px", borderRadius: "7px", whiteSpace: "nowrap", cursor: "pointer" }}>
                      {name}
                    </button>
                  )
                })}
              </span>
            </div>
            <div style={{ ...cardStyle, gap: "2px" }}>
              <span style={{ font: "600 13.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", paddingBottom: "6px" }}>Delivery & visibility</span>
              <ToggleRow title="Express delivery" subtitle="Available for 25-minute delivery" on={form.express_delivery} onChange={set('express_delivery')} />
              <ToggleRow title="Scheduled delivery" subtitle="Available in booked windows" on={form.scheduled_delivery} onChange={set('scheduled_delivery')} />
              <ToggleRow title="Track inventory" on={form.track_inventory} onChange={set('track_inventory')} />
              <ToggleRow title="Publish immediately" subtitle={form.published ? 'Visible in the customer app' : 'Otherwise saved as draft'} on={form.published} onChange={set('published')} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
