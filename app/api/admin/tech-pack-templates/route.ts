import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { sbSelect, sbInsert, sbUpdate } from '@/lib/supabase-admin-fetch'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const HEADERS = {
  'Content-Type': 'application/json',
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Prefer': 'return=representation',
}

function isAuthed() {
  return cookies().get('admin_auth')?.value === 'true'
}

export async function GET() {
  if (!isAuthed()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const data = await sbSelect('tech_pack_templates', 'select=*&order=display_order.asc,created_at.asc')
    return NextResponse.json({ data })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthed()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const body = await req.json()
    const data = await sbInsert('tech_pack_templates', body)
    return NextResponse.json({ data })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  if (!isAuthed()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const { id, ...body } = await req.json()
    const data = await sbUpdate('tech_pack_templates', id, body)
    return NextResponse.json({ data })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthed()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const { id } = await req.json()
    const res = await fetch(`${SUPABASE_URL}/rest/v1/tech_pack_templates?id=eq.${id}`, {
      method: 'DELETE',
      headers: HEADERS,
    })
    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.message || data.error || JSON.stringify(data))
    }
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
