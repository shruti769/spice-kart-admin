import { supabase } from './supabase'
import { EXPORT_LIMIT, friendly, useLiveQuery } from './customers'

// Product reviews (schema: supabase/orders.sql + supabase/admin_data.sql).
// Setting `reply` notifies the customer (reviews_on_reply trigger). Live via Supabase Realtime.

export const REVIEW_TABS = [
  ['all', 'All reviews'],
  ['pending', 'Pending Review'],
  ['published', 'Published'],
  ['hidden', 'Hidden'],
  ['replied', 'Replied'],
]

/** [label, fg, bg] per review status. */
export const REVIEW_PILL = {
  published: ['Published', '#0B6B33', '#E9F6E3'],
  pending: ['Pending Review', '#8A6100', '#FBF1DE'],
  hidden: ['Hidden', '#A93826', '#FAEDEA'],
}

const SELECT = 'id, rating, comment, status, reply, replied_at, hidden_reason, created_at, order_id, customer_id, product_id, customer:customers(first_name, last_name, email), product:products(name, image_url)'
const clean = (s) => s.replace(/[,()*%\\:"']/g, ' ').trim()

/**
 * Runs the filtered reviews query for rows `from`–`to`. Search covers the comment, product name and
 * customer name. The range is applied here because an async function can't hand back an unrun
 * query builder: awaiting it runs the query.
 */
async function reviewsQuery({ tab = 'all', q = '', rating = 'all' }, select, opts, from, to) {
  let x = supabase.from('reviews').select(select, opts)
  if (tab === 'pending' || tab === 'published' || tab === 'hidden') x = x.eq('status', tab)
  else if (tab === 'replied') x = x.not('reply', 'is', null)
  if (rating !== 'all') x = x.eq('rating', Number(rating))

  const t = clean(q)
  if (t) {
    const words = t.split(/\s+/).filter(Boolean)
    const [products, customers] = await Promise.all([
      supabase.from('products').select('id').ilike('name', `%${t}%`).limit(200),
      words.reduce((c, w) => c.or(`first_name.ilike.%${w}%,last_name.ilike.%${w}%,email.ilike.%${w}%`), supabase.from('customers').select('id')).limit(200),
    ])
    const parts = [`comment.ilike.%${t}%`]
    if (products.data?.length) parts.push(`product_id.in.(${products.data.map((p) => p.id).join(',')})`)
    if (customers.data?.length) parts.push(`customer_id.in.(${customers.data.map((c) => c.id).join(',')})`)
    x = x.or(parts.join(','))
  }
  return x.order('created_at', { ascending: false }).order('id').range(from, to)
}

/** One page of reviews (`page` from 1) with the total count. Live. */
export function useReviews(filters, page, pageSize) {
  return useLiveQuery(async () => {
    const from = (page - 1) * pageSize
    const { data, error, count } = await reviewsQuery(filters, SELECT, { count: 'exact' }, from, from + pageSize - 1)
    if (error && error.code !== 'PGRST103') throw error
    return { rows: data ?? [], count: count ?? 0 }
  }, ['reviews'], [JSON.stringify(filters), page, pageSize])
}

/** `{ count, average, published, pending, hidden, replied, by_rating }` from review_summary(). Live. */
export function useReviewSummary() {
  return useLiveQuery(async () => {
    const { data, error } = await supabase.rpc('review_summary')
    if (error) throw error
    return data
  }, ['reviews'])
}

export async function fetchReviewsForExport(filters) {
  const { data, error, count } = await reviewsQuery(filters, SELECT, { count: 'exact' }, 0, EXPORT_LIMIT - 1)
  if (error) throw friendly(error)
  return { rows: data ?? [], count: count ?? 0 }
}

async function updateReview(id, patch) {
  const { data, error } = await supabase.from('reviews').update(patch).eq('id', id).select('id')
  if (error) throw friendly(error)
  if (!data?.length) throw new Error('This review no longer exists or you don’t have permission to change it')
}

/** Saves the reply (the customer is notified); a pending review is published with it. `reply` '' removes it. */
export const replyToReview = (review, reply) => {
  const text = reply.trim()
  return updateReview(review.id, text
    ? { reply: text, ...(review.status === 'pending' ? { status: 'published' } : null) }
    : { reply: null })
}
export const hideReview = (id, reason) => updateReview(id, { status: 'hidden', hidden_reason: reason.trim().slice(0, 300) || null })
export const publishReview = (id) => updateReview(id, { status: 'published', hidden_reason: null })

export const productLabel = (r) => r.product?.name ?? (r.order_id ? 'Whole order' : 'General feedback')
