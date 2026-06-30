import { NextRequest, NextResponse } from 'next/server'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/products?slug=eq.${encodeURIComponent(slug)}&limit=1`,
    { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
  )
  const data = await res.json()
  if (!res.ok || !data.length) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(data[0])
}
