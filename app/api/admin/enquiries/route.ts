import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { sbSelect, sbUpdate } from '@/lib/supabase-admin-fetch'

function isAuthed() {
  return cookies().get('admin_auth')?.value === 'true'
}

export async function GET(req: NextRequest) {
  if (!isAuthed()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const email = req.nextUrl.searchParams.get('email')
    let params = 'select=*&order=created_at.desc'
    if (email) params += `&email=eq.${encodeURIComponent(email)}`
    const data = await sbSelect('enquiries', params)
    return NextResponse.json({ data })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  if (!isAuthed()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const { id, ...body } = await req.json()
    const data = await sbUpdate('enquiries', id, body)
    return NextResponse.json({ data })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
