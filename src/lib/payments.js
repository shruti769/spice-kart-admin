import { useCallback, useEffect, useRef, useState } from 'react'
import { isSupabaseConfigured, supabase } from './supabase'
import { useRealtime } from './notifications'
import { PAYMENT_LABEL, PAYMENT_STATUS_PILL, customerName } from './orders'

// Payments page (schema: supabase/orders.sql + supabase/admin_data.sql).
//   transactions  → one row per order, with its payment attempts (payments table)
//   summary       → payment_summary() RPC (today, Melbourne)
//   refunds       → refund_order() / decide_refund() RPCs. No payment provider is connected yet,
//                   so a refund is recorded in the database only; no money moves.

function friendly(error) {
  if (error.code === '42P01' || error.code === 'PGRST205') return new Error('Payments aren’t set up yet · run supabase/orders.sql in the Supabase SQL Editor')
  if (error.code === 'PGRST202' || error.code === '42883') return new Error('Payments need supabase/admin_data.sql · run it in the Supabase SQL Editor')
  if (error.code === '42501') return new Error('You don’t have permission to do that')
  return error instanceof Error ? error : new Error(error.message || 'Unknown error')
}

const must = ({ data, error, count }) => {
  if (error) throw friendly(error)
  return count ?? data
}

/** `{ status, data, error, loading, refetch }` for an async loader, refetched on realtime changes to `tables`. */
function useLive(load, tables, deps = [], pollMs = 0) {
  const [state, setState] = useState(() => ({ status: isSupabaseConfigured ? 'loading' : 'off', data: null, error: '' }))
  const [version, setVersion] = useState(0)
  const refetch = useCallback(() => setVersion((n) => n + 1), [])
  const timer = useRef(null)
  useRealtime(tables, () => {
    clearTimeout(timer.current)
    timer.current = setTimeout(refetch, 300)
  })
  useEffect(() => () => clearTimeout(timer.current), [])
  useEffect(() => {
    if (!isSupabaseConfigured || !pollMs) return
    const t = setInterval(refetch, pollMs)
    return () => clearInterval(t)
  }, [refetch, pollMs])
  useEffect(() => {
    if (!isSupabaseConfigured) return
    let cancelled = false
    load()
      .then((data) => { if (!cancelled) setState({ status: 'ready', data, error: '' }) })
      .catch((e) => { if (!cancelled) setState((st) => ({ status: 'error', data: st.data, error: friendly(e).message })) })
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [version, ...deps])
  return { ...state, loading: state.status === 'loading', refetch }
}

/** Current time in ms, ticking every `ms` (keeps "Today" / relative labels fresh without impure renders). */
export function useNow(ms = 60000) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), ms)
    return () => clearInterval(t)
  }, [ms])
  return now
}

// ═══ Transactions ════════════════════════════════════════════════════════════════════════
/** How many of the latest orders the Payments list loads (filtering / search / paging are local). */
export const TX_LIMIT = 1000

const PAY_COLS = 'id, amount, method, status, card_brand, card_last4, failure_reason, created_at'
// reference / refund_reason come from admin_data.sql; fall back without them if it hasn't run yet.
const txSelect = (full) => `id, number, status, total, payment_method, payment_status, placed_at, customer:customers(first_name, last_name), payments(${PAY_COLS}${full ? ', reference, refund_reason' : ''})`

/** Latest orders (newest first) with their payment attempts, live. */
export function useTransactions() {
  return useLive(async () => {
    const q = (full) => supabase.from('orders').select(txSelect(full)).order('placed_at', { ascending: false }).limit(TX_LIMIT)
    let res = await q(true)
    if (res.error && /reference|refund_reason/.test(res.error.message || '')) res = await q(false)
    return (must(res) ?? []).map(withFacts)
  }, ['orders', 'payments'])
}

/** Adds `charge` (latest non-refund payment), `paid`, `refunded`, `left` to an order row. */
export function withFacts(o) {
  const pays = [...(o.payments ?? [])].sort((a, b) => (a.created_at < b.created_at ? 1 : -1))
  const sum = (s) => pays.filter((p) => p.status === s).reduce((n, p) => n + Number(p.amount || 0), 0)
  const paid = sum('succeeded')
  const refunded = sum('refunded')
  return {
    ...o,
    payments: pays,
    charge: pays.find((p) => p.status !== 'refunded') ?? null,
    last: pays[0] ?? null,
    paid,
    refunded,
    left: Math.max(0, Math.round((paid - refunded) * 100) / 100),
  }
}

/** Payment status tabs and pills: [key, label, fg, bg]. */
export const PAY_STATUSES = [
  ['paid', 'Paid'],
  ['pending', 'Pending'],
  ['failed', 'Failed'],
  ['refunded', 'Refunded'],
  ['partially_refunded', 'Partially Refunded'],
].map(([k, label]) => [k, label, PAYMENT_STATUS_PILL[k][1], PAYMENT_STATUS_PILL[k][2]])
export const payStatus = (s) => PAY_STATUSES.find(([k]) => k === s) ?? PAY_STATUSES[1]

const BRANDS = { visa: 'Visa', mastercard: 'Mastercard', amex: 'Amex', american_express: 'Amex', discover: 'Discover', jcb: 'JCB', unionpay: 'UnionPay', diners: 'Diners' }
const brandLabel = (b) => BRANDS[String(b).toLowerCase()] ?? String(b).charAt(0).toUpperCase() + String(b).slice(1)

/** "Visa · 4417" when the card is known, else "Apple Pay" / "Card" etc. */
export function methodLabel(o) {
  const p = o.charge
  if (p?.card_last4) return `${p.card_brand ? brandLabel(p.card_brand) : 'Card'} · ${p.card_last4}`
  const m = p?.method ?? o.payment_method
  return PAYMENT_LABEL[m] ?? m ?? '—'
}

/** Transaction reference for the list ("—" before any payment attempt). */
export const txReference = (o) => o.charge?.reference ?? o.last?.reference ?? '—'
/** When the latest payment event happened, else when the order was placed. */
export const txDate = (o) => o.last?.created_at ?? o.placed_at

export const aud = (n) => Number(n || 0).toLocaleString('en-AU', { style: 'currency', currency: 'AUD' })

// ═══ Summary ═════════════════════════════════════════════════════════════════════════════
/** Today's payment_summary() (Melbourne day), live; re-read every minute so the day rolls over. */
export function usePaymentSummary() {
  return useLive(async () => must(await supabase.rpc('payment_summary')), ['orders', 'payments'], [], 60000)
}

// ═══ Refund requests ═════════════════════════════════════════════════════════════════════
export const REFUND_REASONS = {
  missing_item: 'Missing item',
  damaged_item: 'Damaged item',
  delivery_issue: 'Delivery issue',
  payment_issue: 'Payment issue',
  refund_issue: 'Refund issue',
  other: 'Other',
}

/** Pending refund requests (newest first, `limit`) and how many are pending in total, live. */
export function useRefundRequests(limit = 5) {
  return useLive(async () => {
    const select = (full) => `id, number, reason, detail, photo_url, amount, status, created_at, customer:customers(first_name, last_name), order:orders(id, number, total, payment_method, payment_status, placed_at, customer:customers(first_name, last_name), payments(${PAY_COLS}${full ? ', reference' : ''}))`
    const q = (full) => supabase.from('refund_requests').select(select(full), { count: 'exact' }).eq('status', 'pending').order('created_at', { ascending: false }).limit(limit)
    let res = await q(true)
    if (res.error && /reference/.test(res.error.message || '')) res = await q(false)
    if (res.error) throw friendly(res.error)
    return {
      total: res.count ?? res.data.length,
      rows: (res.data ?? []).map((r) => ({ ...r, order: r.order ? withFacts(r.order) : null })),
    }
  }, ['refund_requests', 'payments'], [limit])
}

/** How many of the latest refund requests the Refunds page loads (tabs / search / paging are local). */
export const REFUND_LIMIT = 2000

/** Every refund request (newest first, up to REFUND_LIMIT) with its order + payments, live. */
export function useRefundList() {
  return useLive(async () => {
    const select = (full) => `id, number, order_id, customer_id, reason, detail, photo_url, amount, status, created_at, decided_at, customer:customers(first_name, last_name), order:orders(id, number, total, payment_method, payment_status, placed_at, customer_id, customer:customers(first_name, last_name), payments(${PAY_COLS}${full ? ', reference' : ''}))`
    const q = (full) => supabase.from('refund_requests').select(select(full)).order('created_at', { ascending: false }).limit(REFUND_LIMIT)
    let res = await q(true)
    if (res.error && /reference/.test(res.error.message || '')) res = await q(false)
    return (must(res) ?? []).map((r) => ({ ...r, order: r.order ? withFacts(r.order) : null }))
  }, ['refund_requests', 'orders', 'payments'])
}

/**
 * Refund request statuses as the Refunds page shows them: [key, label, fg, bg].
 * paid = approved and recorded on the order's payment; approved = approved but nothing was paid
 * on the order (no payment provider yet) → "Processing", pay the customer back manually.
 */
export const REFUND_STATUS = {
  pending: ['pending', 'Pending', '#8A6100', '#FBF1DE'],
  paid: ['paid', 'Approved', '#0B6B33', '#E9F6E3'],
  rejected: ['rejected', 'Rejected', '#A93826', '#FAEDEA'],
  approved: ['approved', 'Processing', '#1F5C8B', '#E8F1F8'],
}

/** Downloads the given refund requests as a CSV file. */
export function downloadRefundsCsv(rows) {
  const head = ['Refund', 'Order', 'Customer', 'Amount (AUD)', 'Order total (AUD)', 'Reason', 'Details', 'Method', 'Status', 'Requested', 'Processed', 'Photo']
  const lines = [head, ...rows.map((r) => [
    r.number,
    r.order?.number ?? '',
    customerName(r.customer ?? r.order?.customer),
    r.amount != null ? Number(r.amount).toFixed(2) : '',
    r.order ? Number(r.order.total || 0).toFixed(2) : '',
    REFUND_REASONS[r.reason] ?? r.reason,
    r.detail,
    r.order ? methodLabel(r.order) : '',
    (REFUND_STATUS[r.status] ?? [])[1] ?? r.status,
    isoLocal(r.created_at),
    isoLocal(r.decided_at),
    r.photo_url ?? '',
  ])].map((r) => r.map(csvCell).join(','))
  saveCsv(lines, 'refunds')
}

// ═══ Actions ═════════════════════════════════════════════════════════════════════════════
/** Records a refund (amount null = everything that's left). Returns the refund payment row. */
export async function refundOrder(orderId, amount, reason) {
  return must(await supabase.rpc('refund_order', { p_order: orderId, p_amount: amount ?? null, p_reason: reason || null }))
}

/** Approve (records the refund) or reject a customer's refund request. */
export async function decideRefund(requestId, approve, amount) {
  return must(await supabase.rpc('decide_refund', { p_request: requestId, p_approve: approve, p_amount: approve ? amount ?? null : null }))
}

// ═══ Export ══════════════════════════════════════════════════════════════════════════════
const csvCell = (v) => {
  const s = v == null ? '' : String(v)
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}
const BOM = String.fromCharCode(0xfeff) // lets Excel read the CSV as UTF-8
const isoLocal = (iso) => (iso ? new Date(iso).toLocaleString('en-AU', { dateStyle: 'short', timeStyle: 'short' }) : '')

/** Downloads the given transaction rows as a CSV file. */
export function downloadTransactionsCsv(rows) {
  const head = ['Transaction', 'Order', 'Customer', 'Amount (AUD)', 'Method', 'Payment status', 'Paid (AUD)', 'Refunded (AUD)', 'Order status', 'Placed', 'Last payment event']
  const lines = [head, ...rows.map((o) => [
    txReference(o) === '—' ? '' : txReference(o),
    o.number,
    customerName(o.customer),
    Number(o.total || 0).toFixed(2),
    methodLabel(o),
    payStatus(o.payment_status)[1],
    o.paid.toFixed(2),
    o.refunded.toFixed(2),
    o.status,
    isoLocal(o.placed_at),
    isoLocal(o.last?.created_at),
  ])].map((r) => r.map(csvCell).join(','))
  saveCsv(lines, 'transactions')
}

function saveCsv(lines, name) {
  const blob = new Blob([`${BOM}${lines.join('\r\n')}\r\n`], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `spice-kart-${name}-${new Date().toLocaleDateString('en-CA', { timeZone: 'Australia/Melbourne' })}.csv`
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
