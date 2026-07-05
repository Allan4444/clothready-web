import { NextResponse } from 'next/server'
import { sbSelect } from '@/lib/supabase-admin-fetch'

export async function GET() {
  try {
    const data = await sbSelect('tech_pack_templates', 'select=*&active=eq.true&order=display_order.asc,created_at.asc')
    return NextResponse.json({ data })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
