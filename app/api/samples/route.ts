import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { sbInsert } from '@/lib/supabase-admin-fetch'

function genOrderNo() {
  const year = new Date().getFullYear()
  const suffix = Math.floor(1000 + Math.random() * 9000)
  return `SMP-${year}-${suffix}`
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      contact_name, company, email, country,
      garment_type, fabric, sample_qty, bulk_qty,
      requirements, courier,
    } = body

    if (!contact_name || !company || !email || !country || !garment_type) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 })
    }

    const order_no = genOrderNo()
    const record = await sbInsert('sample_orders', {
      order_no,
      contact_name,
      company,
      email,
      country,
      garment_type,
      fabric: fabric || null,
      sample_qty: sample_qty || 1,
      bulk_qty: bulk_qty || null,
      requirements: requirements || null,
      courier: courier || 'DHL',
      status: 'pending',
    })

    try {
      const resend = new Resend(process.env.RESEND_API_KEY)
      await resend.emails.send({
        from: 'ClothReady <info@clothready.com>',
        to: 'info@clothready.com',
        subject: `🧪 New Sample Order — ${order_no}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;">
            <h2 style="color:#ff4757;">New Sample Order Received</h2>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:8px;color:#888;">Order No</td><td style="padding:8px;font-weight:bold;">${order_no}</td></tr>
              <tr><td style="padding:8px;color:#888;">Name</td><td style="padding:8px;font-weight:bold;">${contact_name}</td></tr>
              <tr><td style="padding:8px;color:#888;">Company</td><td style="padding:8px;font-weight:bold;">${company}</td></tr>
              <tr><td style="padding:8px;color:#888;">Email</td><td style="padding:8px;font-weight:bold;">${email}</td></tr>
              <tr><td style="padding:8px;color:#888;">Country</td><td style="padding:8px;font-weight:bold;">${country}</td></tr>
              <tr><td style="padding:8px;color:#888;">Garment</td><td style="padding:8px;font-weight:bold;">${garment_type}</td></tr>
              <tr><td style="padding:8px;color:#888;">Fabric</td><td style="padding:8px;font-weight:bold;">${fabric || '—'}</td></tr>
              <tr><td style="padding:8px;color:#888;">Sample Qty</td><td style="padding:8px;font-weight:bold;">${sample_qty || 1}</td></tr>
              <tr><td style="padding:8px;color:#888;">Bulk Qty</td><td style="padding:8px;font-weight:bold;">${bulk_qty || '—'}</td></tr>
            </table>
            <p style="color:#555;white-space:pre-wrap;margin-top:16px;"><strong>Requirements:</strong><br>${(requirements || '—').replace(/\n/g, '<br>')}</p>
          </div>
        `,
      })
    } catch {}

    return NextResponse.json({
      success: true,
      id: record.id,
      order_no,
      message: "Sample order submitted. We'll confirm within 48 hours.",
    })
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 })
  }
}
