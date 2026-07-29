import { NextRequest, NextResponse } from 'next/server'
import { sbInsert } from '@/lib/supabase-admin-fetch'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      first_name, last_name, company, email, phone,
      country, product_category, quantity_range,
      target_delivery, message,
    } = body

    if (!first_name || !email) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 })
    }

    const record = await sbInsert('enquiries', {
      first_name,
      last_name: last_name || null,
      company: company || null,
      email,
      phone: phone || null,
      country: country || null,
      product_category: product_category || null,
      quantity_range: quantity_range || null,
      target_delivery: target_delivery || null,
      message: message || null,
      status: 'new',
    })

    return NextResponse.json({
      success: true,
      id: record.id,
      message: "Enquiry received. We'll reply within 24 hours.",
    })
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 })
  }
}
