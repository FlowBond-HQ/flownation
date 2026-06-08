import { createClient, type SupabaseClient } from '@supabase/supabase-js'

/**
 * Anon Supabase client for server-side use in route handlers.
 * Inserts are allowed via an RLS policy on `flownation_waitlist` (anon insert only).
 * Returns null if env is not configured so callers can degrade gracefully.
 */
export function createAnonClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()
  if (!url || !anon) return null
  return createClient(url, anon, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
