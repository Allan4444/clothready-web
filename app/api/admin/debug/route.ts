import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  const cookieVal = cookies().get('admin_auth')?.value
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'NOT_SET'
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  const keyUsed = serviceKey || anonKey

  const debug = {
    authed: cookieVal === 'true',
    url_prefix: url.slice(0, 40),
    service_key_set: !!serviceKey,
    service_key_length: serviceKey.length,
    anon_key_length: anonKey.length,
    keys_identical: serviceKey === anonKey,
  }

  // Try direct REST fetch
  let fetchResult: any = null
  try {
    const res = await fetch(`${url}/rest/v1/products?select=id&limit=1`, {
      headers: {
        'apikey': keyUsed,
        'Authorization': `Bearer ${keyUsed}`,
      }
    })
    const text = await res.text()
    fetchResult = { status: res.status, body: text.slice(0, 200) }
  } catch (e: any) {
    fetchResult = { catch_error: e.message }
  }

  return NextResponse.json({ debug, fetchResult })
}
