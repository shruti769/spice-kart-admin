import { supabase } from './supabase'

/**
 * True when the user has an active row in `public.admins`. RLS lets a signed-in user read their
 * own row, so a missing row means "not an admin"; staff set to inactive in Staff & Admins are
 * refused too. An invited admin signing in for the first time becomes active.
 * Throws on network / database errors.
 */
export async function fetchIsAdmin(userId) {
  const { data, error } = await supabase.from('admins').select('*').eq('user_id', userId).maybeSingle()
  if (error) throw error
  if (!data || data.status === 'inactive') return false
  // Before supabase/admin_data.sql runs this function doesn't exist; nothing to update then.
  if (data.status === 'invited') await supabase.rpc('staff_signed_in').then(() => {}, () => {})
  return true
}
