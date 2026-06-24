import { createClient } from '@supabase/supabase-js'

// Admin client using service role key.
// Only used in /admin pages which are password-protected via middleware.
// NEXT_PUBLIC_SUPABASE_SERVICE_KEY must be set in your environment to the
// Supabase service_role secret (same value as SUPABASE_SERVICE_ROLE_KEY).
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY || 'placeholder'

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)
