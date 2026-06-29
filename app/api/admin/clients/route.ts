import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { sbSelect } from '@/lib/supabase-admin-fetch'

function isAuthed() {
  return cookies().get('admin_auth')?.value === 'true'
}

export async function GET() {
  if (!isAuthed()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const data = await sbSelect('clients', 'select=*&order=created_at.desc')
    return NextResponse.json({ data })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
