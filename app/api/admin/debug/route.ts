import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

export async function GET() {
  const cookieVal = cookies().get('admin_auth')?.value
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'NOT_SET'
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  const keyUsed = serviceKey || anonKey

  const debug = {
    authed: cookieVal === 'true',
    url_prefix: url.slice(0, 30),
    service_key_prefix: serviceKey ? serviceKey.slice(0, 20) : 'NOT_SET',
    anon_key_prefix: anonKey ? anonKey.slice(0, 20) : 'NOT_SET',
    key_used_prefix: keyUsed.slice(0, 20),
  }

  if (cookieVal !== 'true') {
    return NextResponse.json({ error: 'not authed', debug })
  }

  try {
    const sb = createClient(url, keyUsed)
    const { data, error } = await sb.from('products').select('id').limit(1)
    return NextResponse.json({ debug, supabase_error: error?.message || null, data })
  } catch (e: any) {
    return NextResponse.json({ debug, catch_error: e.message })
  }
}
