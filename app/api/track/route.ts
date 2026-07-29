import { NextRequest, NextResponse } from 'next/server'
import { sbSelect } from '@/lib/supabase-admin-fetch'

export async function GET(req: NextRequest) {
  const orderNo = req.nextUrl.searchParams.get('order')?.trim()
  if (!orderNo) {
    return NextResponse.json({ success: false, error: 'Missing order number' }, { status: 400 })
  }

  try {
    const rows = await sbSelect(
      'sample_orders',
      `select=*&order_no=eq.${encodeURIComponent(orderNo)}&limit=1`
    )
    if (!rows.length) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true, order: rows[0] })
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 })
  }
}
