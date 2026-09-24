import { supabase } from './supabase'

/**
 * True when the user has a row in `public.admins`. RLS lets a signed-in user read only their
 * own row, so a missing row means "not an admin". Throws on network / database errors.
 */
export async function fetchIsAdmin(userId) {
  const { data, error } = await supabase.from('admins').select('user_id').eq('user_id', userId).maybeSingle()
  if (error) throw error
  return Boolean(data)
}
