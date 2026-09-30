import { useEffect, useRef, useState } from "react"
import DeliveryPostcodesCard from "../components/DeliveryPostcodesCard"
import DeliverySlotsCard from "../components/DeliverySlotsCard"
import { updateDeliverySettings, useDeliverySettings } from "../lib/delivery"
import StoreMapPicker from "../components/StoreMapPicker"
import { AU_STATES, saveStore, useStore } from "../lib/stores"
import { fetchStoreConfig, updateBusinessSettings, useBusinessSettings } from "../lib/businessSettings"
import { Field, Money, NotificationsCard, PaymentsCard } from "../components/settings/BusinessCards"
import StoreHoursCard from "../components/settings/StoreHoursCard"
import SecurityCard from "../components/settings/SecurityCard"

// business_settings columns edited on this page, by card.
const PAYMENT_KEYS = ["gst_rate", "prices_include_gst", "refund_destination", "accept_card", "card_brands", "accept_apple_pay", "accept_google_pay", "accept_payid", "restocking_fee_max", "payout_schedule"]
const NOTIFY_KEYS = ["notify_order_email", "notify_delivery_sms", "allow_promo_push", "slack_low_stock", "slack_webhook_url", "daily_digest", "digest_emails", "digest_hour"]
const SECURITY_KEYS = ["require_2fa", "allow_google_sso", "session_timeout_minutes"]
// Store hours save straight from their own popup (StoreHoursCard), so they aren't in the draft.
const BIZ_KEYS = ["min_order_value", ...PAYMENT_KEYS, ...NOTIFY_KEYS, ...SECURITY_KEYS]
const NUMERIC = { min_order_value: [0, 10000], gst_rate: [0, 100], restocking_fee_max: [0, 1000] }
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b) || (a != null && b != null && typeof a !== "object" && String(a) === String(b))

/** Draft → `{ patch, errors }` for the changed business settings. */
function parseBusiness(draft, saved) {
  const patch = {}
  const errors = {}
  for (const k of BIZ_KEYS) {
    if (same(draft[k], saved[k])) continue
    if (NUMERIC[k]) {
      const n = Number(draft[k])
      const [min, max] = NUMERIC[k]
      if (String(draft[k]).trim() === "" || !Number.isFinite(n) || n < min || n > max) errors[k] = `Enter ${min}–${max}`
      else patch[k] = Math.round(n * 100) / 100
    } else patch[k] = draft[k]
  }
  if (draft.slack_low_stock && !/^https:\/\/hooks\.slack\.com\//.test(draft.slack_webhook_url ?? "")) errors.slack_webhook_url = "Paste the Slack webhook URL (starts with https://hooks.slack.com/)"
  if (draft.daily_digest && !draft.digest_emails.length) errors.digest_emails = "Add at least one email"
  if (draft.digest_emails.some((e) => !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e))) errors.digest_emails = "Check the email addresses"
  if (![draft.accept_card, draft.accept_apple_pay, draft.accept_google_pay, draft.accept_payid].some(Boolean)) errors.payment_methods = "Keep at least one payment method on"
  if (draft.accept_card && !draft.card_brands.length) errors.payment_methods = "Pick at least one card brand, or turn cards off"
  return { patch, errors }
}

// [stores column, label, placeholder, full width] — the store customers order from.
const STORE_FIELDS = [
  ["name", "STORE NAME", "e.g. Spice Kart Collingwood"],
  ["support_email", "SUPPORT EMAIL", "e.g. help@spicekart.com.au"],
  ["support_phone", "SUPPORT PHONE", "e.g. 1800 774 235"],
  ["abn", "ABN", "11 digits"],
  ["address_line", "STREET ADDRESS", "e.g. 118 Smith Street", true],
  ["suburb", "SUBURB", "e.g. Collingwood"],
  ["postcode", "POSTCODE", "e.g. 3066"],
]
const STORE_KEYS = [...STORE_FIELDS.map(([k]) => k), "state", "latitude", "longitude"]
const toStoreForm = (store) => Object.fromEntries(STORE_KEYS.map((k) => [k, store?.[k] == null ? (k === "state" ? "VIC" : "") : String(store[k])]))

/** Form strings → `{ row, errors }` (empty optional fields become null). */
function parseStoreForm(form) {
  const t = (k) => form[k].trim()
  const errors = {}
  if (!t("name")) errors.name = "The store needs a name"
  if (t("support_email") && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(t("support_email"))) errors.support_email = "Enter a valid email"
  if (t("abn") && !/^\d{11}$/.test(t("abn").replace(/\s/g, ""))) errors.abn = "An ABN has 11 digits"
  if (t("postcode") && !/^\d{4}$/.test(t("postcode"))) errors.postcode = "4 digits"
  const row = {
    name: t("name"),
    support_email: t("support_email") || null,
    support_phone: t("support_phone") || null,
    abn: t("abn") || null,
    address_line: t("address_line"),
    suburb: t("suburb"),
    state: form.state,
    postcode: t("postcode") || null,
    latitude: form.latitude === "" ? null : Number(form.latitude),
    longitude: form.longitude === "" ? null : Number(form.longitude),
  }
  return { row, errors }
}

// [delivery_settings column, label, unit] — edited here and saved with "Save settings".
const DELIVERY_FIELDS = [
  ["express_fee", "EXPRESS DELIVERY FEE", "$"],
  ["scheduled_fee", "SCHEDULED DELIVERY FEE", "$"],
  ["handling_fee", "HANDLING FEE", "$"],
  ["free_delivery_over", "FREE DELIVERY THRESHOLD", "$"],
  ["express_eta_minutes", "EXPRESS ETA", "minutes"],
]

const toDeliveryForm = (settings) => Object.fromEntries(DELIVERY_FIELDS.map(([k]) => [k, String(settings[k])]))

/** Form strings → `{ patch, errors }`. */
function parseDeliveryForm(form) {
  const patch = {}
  const errors = {}
  for (const [k, , unit] of DELIVERY_FIELDS) {
    const n = Number(form[k])
    if (form[k].trim() === "" || !Number.isFinite(n) || n < 0) errors[k] = "Enter 0 or more"
    else if (unit === "minutes" && (!Number.isInteger(n) || n < 1 || n > 600)) errors[k] = "Whole minutes, 1–600"
    else patch[k] = unit === "$" ? Math.round(n * 100) / 100 : n
  }
  return { patch, errors }
}

const SECTIONS = [
  { id: "general", label: "General" },
  { id: "delivery", label: "Delivery" },
  { id: "slots", label: "Scheduled delivery slots" },
  { id: "payments", label: "Payments & tax" },
  { id: "notifications", label: "Notifications" },
  { id: "hours", label: "Store hours" },
  { id: "security", label: "Security" },
]

export default function Settings({ v }) {
  const [active, setActive] = useState("general")
  const scrollRef = useRef(null)
  const lockRef = useRef(null)
  const lockTimer = useRef(null)

  const delivery = useDeliverySettings()
  const [deliveryDraft, setDeliveryDraft] = useState(null) // null = showing the saved values
  const [deliveryErrors, setDeliveryErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const savedForm = toDeliveryForm(delivery.data)
  const deliveryForm = deliveryDraft ?? savedForm
  const deliveryDirty = !!deliveryDraft && DELIVERY_FIELDS.some(([k]) => deliveryDraft[k] !== savedForm[k])

  const storeQ = useStore()
  const [storeDraft, setStoreDraft] = useState(null) // null = showing the saved store
  const [storeErrors, setStoreErrors] = useState({})
  const savedStoreForm = toStoreForm(storeQ.store)
  const storeForm = storeDraft ?? savedStoreForm
  const storeDirty = !!storeDraft && STORE_KEYS.some((k) => storeDraft[k] !== savedStoreForm[k])
  const setStoreField = (k, val) => {
    setStoreDraft({ ...storeForm, [k]: val })
    if (storeErrors[k]) setStoreErrors((e) => ({ ...e, [k]: undefined }))
  }
  // A place picked on the map fills several fields at once.
  const patchStore = (patch) => {
    setStoreDraft({ ...storeForm, ...patch })
    setStoreErrors((e) => Object.fromEntries(Object.entries(e).filter(([k]) => !(k in patch))))
  }

  const biz = useBusinessSettings()
  const [bizDraft, setBizDraft] = useState(null)
  const [bizErrors, setBizErrors] = useState({})
  const bizForm = bizDraft ?? biz.data ?? {
    min_order_value: 0, gst_rate: 10, prices_include_gst: true, refund_destination: "wallet", accept_card: true, card_brands: [], accept_apple_pay: true,
    accept_google_pay: true, accept_payid: true, restocking_fee_max: 0, payout_schedule: "daily", notify_order_email: false, notify_delivery_sms: false,
    allow_promo_push: true, slack_low_stock: false, slack_webhook_url: null, daily_digest: false, digest_emails: [], digest_hour: 7, hours: {}, public_holidays: [],
    require_2fa: false, allow_google_sso: false, session_timeout_minutes: 30, ip_allowlist_enabled: false, ip_allowlist: [],
  }
  const bizDisabled = biz.status !== "ready"
  const bizDirtyIn = (keys) => !!bizDraft && !!biz.data && keys.some((k) => !same(bizDraft[k], biz.data[k]))
  const bizDirty = bizDirtyIn(BIZ_KEYS)
  const setBiz = (patch) => {
    setBizDraft({ ...bizForm, ...patch })
    setBizErrors((e) => Object.fromEntries(Object.entries(e).filter(([k]) => !Object.keys(patch).some((p) => k === p || k.startsWith(`${p}.`)) && k !== "payment_methods")))
  }
  const [openNow, setOpenNow] = useState(null)
  useEffect(() => {
    let cancelled = false
    fetchStoreConfig().then((c) => { if (!cancelled) setOpenNow(c?.open_now ?? null) })
    return () => { cancelled = true }
  }, [biz.data])

  const saveSettings = async () => {
    const { patch, errors } = parseDeliveryForm(deliveryForm)
    const store = storeDirty ? parseStoreForm(storeForm) : { errors: {} }
    const business = bizDirty ? parseBusiness(bizForm, biz.data) : { patch: {}, errors: {} }
    setDeliveryErrors(errors)
    setStoreErrors(store.errors)
    setBizErrors(business.errors)
    if (Object.keys(store.errors).length) return v.flash("Check the highlighted store details")
    if (Object.keys(errors).length || Object.keys(business.errors).length) return v.flash("Check the highlighted fields")
    if (!deliveryDirty && !storeDirty && !bizDirty) {
      v.saveSettings()
      return
    }
    setSaving(true)
    try {
      if (storeDirty) {
        await saveStore(storeQ.store?.id ?? null, store.row)
        setStoreDraft(null)
      }
      if (deliveryDirty) {
        await updateDeliverySettings(patch)
        setDeliveryDraft(null)
      }
      if (bizDirty && Object.keys(business.patch).length) {
        await updateBusinessSettings(business.patch)
        setBizDraft(null)
        biz.refetch()
      } else if (bizDirty) setBizDraft(null)
      v.flash(storeDirty && !storeQ.store ? `${store.row.name} added · new orders go to this store` : "Settings saved")
    } catch (e) {
      v.flash(e.message)
    } finally {
      setSaving(false)
    }
  }

  const discardChanges = () => {
    setDeliveryDraft(null)
    setDeliveryErrors({})
    setStoreDraft(null)
    setStoreErrors({})
    setBizDraft(null)
    setBizErrors({})
    v.discardChanges()
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onScroll = () => {
      // After a nav click, hold the clicked section until the smooth scroll settles.
      if (lockRef.current) {
        clearTimeout(lockTimer.current)
        lockTimer.current = setTimeout(() => { lockRef.current = null }, 150)
        return
      }
      const top = el.getBoundingClientRect().top
      const cards = SECTIONS.map((s) => ({ id: s.id, top: el.querySelector(`[data-section="${s.id}"]`).getBoundingClientRect().top - top }))
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 2
      let current = cards[0]
      for (const c of cards) if (c.top <= 40) current = c
      // The last cards may never reach the top; highlight the final one once scrolled to the end.
      if (atBottom) current = cards[cards.length - 1]
      setActive(current.id)
    }
    el.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      el.removeEventListener("scroll", onScroll)
      clearTimeout(lockTimer.current)
    }
  }, [])

  const goTo = (id) => {
    const el = scrollRef.current
    const card = el.querySelector(`[data-section="${id}"]`)
    lockRef.current = id
    clearTimeout(lockTimer.current)
    lockTimer.current = setTimeout(() => { lockRef.current = null }, 150)
    setActive(id)
    el.scrollTo({ top: el.scrollTop + card.getBoundingClientRect().top - el.getBoundingClientRect().top - 20, behavior: "smooth" })
  }

  return (
    <>
      <div className="sk-topbar" style={{ display: "flex", alignItems: "flex-end", gap: "18px", padding: "24px 26px 2px" }}>
        <span style={{ display: "flex", flexDirection: "column", gap: "5px", minWidth: "0" }}>
          <span style={{ font: "700 20px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Settings</span>
          <span style={{ font: "400 12.5px/1.2 Inter,system-ui,sans-serif", color: "#7C8A81", whiteSpace: "nowrap" }}>{storeQ.store ? `Store configuration for ${storeQ.store.name}` : "Store configuration"}</span>
        </span>
        <span className="r-wrap" style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px" }}>
          <button className="hv1" onClick={discardChanges}style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 12px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", color: "#17201A", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>
            Discard changes
          </button>
          <button className="hv2" onClick={saveSettings} disabled={saving} style={{ display: "flex", alignItems: "center", gap: "7px", height: "34px", padding: "0 13px", border: "0", borderRadius: "8px", background: "#0B3D1F", color: "#fff", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: saving ? "wait" : "pointer", opacity: saving ? 0.7 : 1, whiteSpace: "nowrap" }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flex: "none" }}>
              <path d="M4.6 10.4l3.4 3.4 7.4-7.4" stroke="#8BE000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Save settings
          </button>
        </span>
      </div>
      <div ref={scrollRef} className="ad-scroll sk-page" style={{ flex: "1", minHeight: "0", overflowY: "auto", padding: "20px 26px 30px", display: "flex", flexDirection: "column", gap: "18px" }}>
        <div className="r-stack-sm" style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "18px", alignItems: "start" }}>
          <div className="r-hide-sm" style={{ position: "sticky", top: "0", background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "8px", display: "flex", flexDirection: "column", gap: "2px" }}>
            {SECTIONS.map((s) => (
              <button key={s.id} className="hv6" onClick={() => goTo(s.id)} style={{ display: "flex", alignItems: "center", gap: "9px", border: "0", background: active === s.id ? "#F1F9DF" : "transparent", color: active === s.id ? "#0B3D1F" : "#4A564E", borderRadius: "7px", padding: "0 10px", height: "34px", font: "600 12.5px/1.2 Inter,system-ui,sans-serif", cursor: "pointer", textAlign: "left" }}>
                {s.label}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div data-section="general" style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "18px", display: "flex", flexDirection: "column", gap: "14px" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ font: "600 13.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>General · your store</span>
                {storeDirty && <span style={{ padding: "3px 8px", borderRadius: "6px", background: "#FFF4DB", color: "#8A5A00", font: "600 10.5px/1.2 Inter,system-ui,sans-serif" }}>Unsaved changes</span>}
                {storeQ.status === "error" && <span style={{ font: "400 11.5px/1.2 Inter,system-ui,sans-serif", color: "#B3402F" }}>Couldn't load · {storeQ.error}</span>}
              </span>
              {storeQ.status === "ready" && !storeQ.store && (
                <span style={{ padding: "10px 12px", borderRadius: "8px", background: "#FBF1DE", color: "#8A6100", font: "500 12px/1.45 Inter,system-ui,sans-serif" }}>
                  No store yet. Add your store's details and press Save settings. Every customer order goes to this store, and the app can't take orders until it exists.
                </span>
              )}
              <div className="r-stack-sm" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "11px" }}>
                {STORE_FIELDS.map(([key, label, placeholder, wide]) => (
                  <label key={key} style={{ display: "flex", flexDirection: "column", gap: "6px", ...(wide ? { gridColumn: "span 2" } : null) }}>
                    <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>{label}</span>
                    <input value={storeForm[key]} placeholder={placeholder} disabled={storeQ.loading} maxLength={key === "address_line" ? 120 : 60} onChange={(e) => setStoreField(key, e.target.value)} style={{ height: "36px", padding: "0 11px", border: `1px solid ${storeErrors[key] ? "#B3402F" : "#E4E7E2"}`, borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", outline: "none", minWidth: "0" }} />
                    {storeErrors[key] && <span style={{ font: "400 11px/1.3 Inter,system-ui,sans-serif", color: "#B3402F" }}>{storeErrors[key]}</span>}
                  </label>
                ))}
                <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>STATE</span>
                  <select value={storeForm.state} disabled={storeQ.loading} onChange={(e) => setStoreField("state", e.target.value)} style={{ height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", outline: "none", cursor: "pointer" }}>
                    {AU_STATES.map((st) => <option key={st}>{st}</option>)}
                  </select>
                </label>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>CURRENCY · TIME ZONE</span>
                  <span style={{ display: "flex", alignItems: "center", height: "36px", padding: "0 11px", border: "1px solid #E4E7E2", borderRadius: "8px", background: "#F6F7F4", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#4A564E", whiteSpace: "nowrap" }}>
                    AUD ($) · Australia/Melbourne
                  </span>
                </span>
                <StoreMapPicker form={storeForm} onChange={patchStore} disabled={storeQ.loading} />
              </div>
            </div>
            <div data-section="delivery" style={{ background: "#fff", border: "1px solid #E4E7E2", borderRadius: "10px", padding: "18px", display: "flex", flexDirection: "column", gap: "14px" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ font: "600 13.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A", whiteSpace: "nowrap" }}>Delivery</span>
                {deliveryDirty && <span style={{ padding: "3px 8px", borderRadius: "6px", background: "#FFF4DB", color: "#8A5A00", font: "600 10.5px/1.2 Inter,system-ui,sans-serif" }}>Unsaved changes</span>}
                {delivery.status === "error" && <span style={{ font: "400 11.5px/1.2 Inter,system-ui,sans-serif", color: "#B3402F" }}>Couldn't load · {delivery.error}</span>}
              </span>
              <div className="r-stack-sm" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "11px" }}>
                {DELIVERY_FIELDS.map(([key, label, unit]) => (
                  <label key={key} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <span style={{ font: "600 10.5px/1.2 Inter,system-ui,sans-serif", letterSpacing: ".4px", color: "#7C8A81", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                      {label}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "6px", height: "36px", padding: "0 11px", border: `1px solid ${deliveryErrors[key] ? "#B3402F" : "#E4E7E2"}`, borderRadius: "8px", background: "#fff", font: "500 12.5px/1.2 Inter,system-ui,sans-serif", color: "#17201A" }}>
                      {unit === "$" && <span style={{ color: "#7C8A81" }}>$</span>}
                      <input type="number" inputMode="decimal" min="0" step={unit === "$" ? "0.01" : "1"} value={deliveryForm[key]} disabled={delivery.loading} onChange={(e) => setDeliveryDraft({ ...deliveryForm, [key]: e.target.value })} style={{ flex: "1", minWidth: "0", border: "0", outline: "none", background: "transparent", font: "inherit", color: "inherit", padding: "0" }} />
                      {unit !== "$" && <span style={{ color: "#7C8A81", whiteSpace: "nowrap" }}>{unit}</span>}
                    </span>
                    {deliveryErrors[key] && <span style={{ font: "400 11px/1.3 Inter,system-ui,sans-serif", color: "#B3402F" }}>{deliveryErrors[key]}</span>}
                  </label>
                ))}
                <Field label="MINIMUM ORDER VALUE" error={bizErrors.min_order_value} hint="Orders below this are refused at checkout · 0 = no minimum">
                  <Money value={bizForm.min_order_value} onChange={(x) => setBiz({ min_order_value: x })} error={bizErrors.min_order_value} disabled={bizDisabled} />
                </Field>
              </div>
            </div>
            <DeliverySlotsCard v={v} data-section="slots" />
            <DeliveryPostcodesCard v={v} />
            {biz.status === "error" && (
              <span style={{ padding: "12px 14px", borderRadius: "10px", background: "#FBF1DE", color: "#8A6100", font: "500 12.5px/1.5 Inter,system-ui,sans-serif" }}>
                Payments, notifications, store hours and security can’t load yet · {biz.error}
              </span>
            )}
            <PaymentsCard form={bizForm} set={setBiz} errors={bizErrors} disabled={bizDisabled} dirty={bizDirtyIn(PAYMENT_KEYS)} />
            <NotificationsCard form={bizForm} set={setBiz} errors={bizErrors} disabled={bizDisabled} dirty={bizDirtyIn(NOTIFY_KEYS)} />
            <StoreHoursCard v={v} hours={biz.data?.hours} openNow={openNow} disabled={bizDisabled} onSaved={biz.refetch} />
            <SecurityCard v={v} form={bizForm} set={setBiz} disabled={bizDisabled} dirty={bizDirtyIn(SECURITY_KEYS)} />
          </div>
        </div>
      </div>
    </>
  )
}
