import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { Resend } from 'resend'

function isAuthed() {
  return cookies().get('admin_auth')?.value === 'true'
}

const FROM = 'ClothReady <info@clothready.com>'
const BRAND_HEADER = `
  <div style="background:#111;padding:20px 28px;text-align:center;">
    <span style="color:#fff;font-size:18px;font-weight:900;letter-spacing:3px;">CLOTHREADY</span>
  </div>
`
const BRAND_FOOTER = `
  <div style="background:#f9f9f9;padding:16px;text-align:center;border-top:1px solid #eee;">
    <p style="color:#aaa;font-size:12px;margin:0;">
      © 2026 ClothReady &nbsp;·&nbsp;
      <a href="https://www.clothready.com" style="color:#aaa;text-decoration:none;">clothready.com</a>
      &nbsp;·&nbsp; info@clothready.com
    </p>
  </div>
`

function wrap(body: string) {
  return `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto;border:1px solid #eee;border-radius:8px;overflow:hidden;">
    ${BRAND_HEADER}
    <div style="padding:32px 28px;background:#fff;">${body}</div>
    ${BRAND_FOOTER}
  </div>`
}

function buildHtml(type: string, data: Record<string, string>): string {
  const { name, orderNo, status, courier, trackingNo, customBody, refId } = data

  if (type === 'enquiry_received') {
    return wrap(`
      <h2 style="color:#111;margin:0 0 16px;">Hi ${name},</h2>
      <p style="color:#555;line-height:1.8;margin:0 0 20px;">
        Thank you for contacting ClothReady.<br>
        Your enquiry has been received and our sourcing team will reply within <strong>24 hours</strong>.
      </p>
      <div style="background:#f5f5f5;padding:16px 20px;border-radius:8px;margin-bottom:28px;">
        <p style="margin:0;color:#888;font-size:13px;">Reference ID</p>
        <p style="margin:4px 0 0;font-weight:700;font-size:16px;color:#111;">${refId || ''}</p>
      </div>
      <a href="https://www.clothready.com/products/custom"
         style="background:#ff4757;color:#fff;padding:13px 28px;text-decoration:none;border-radius:6px;font-weight:700;display:inline-block;font-size:14px;">
        Browse Our Products →
      </a>
    `)
  }

  if (type === 'enquiry_status') {
    const labels: Record<string, string> = {
      new: '🆕 Received',
      reviewing: '🔍 Under Review',
      quoted: '💬 Quoted',
      'in-progress': '⚙️ In Progress',
      completed: '✅ Completed',
      cancelled: '❌ Cancelled',
    }
    const label = labels[status || ''] || status
    return wrap(`
      <h2 style="color:#111;margin:0 0 16px;">Hi ${name},</h2>
      <p style="color:#555;line-height:1.8;margin:0 0 20px;">
        There's an update on your enquiry with ClothReady.
      </p>
      <div style="background:#fff3f4;border-left:4px solid #ff4757;padding:16px 20px;border-radius:0 8px 8px 0;margin-bottom:28px;">
        <p style="margin:0;color:#888;font-size:13px;">Current Status</p>
        <p style="margin:6px 0 0;font-size:20px;font-weight:700;color:#111;">${label}</p>
      </div>
      <p style="color:#888;font-size:14px;">
        Questions? Reply to this email or contact us at
        <a href="mailto:info@clothready.com" style="color:#ff4757;">info@clothready.com</a>
      </p>
    `)
  }

  if (type === 'sample_confirmed') {
    return wrap(`
      <h2 style="color:#111;margin:0 0 16px;">Hi ${name}, your sample order is confirmed! 🎉</h2>
      <p style="color:#555;line-height:1.8;margin:0 0 20px;">
        Your sample order <strong>${orderNo}</strong> has been confirmed.<br>
        Production will begin within <strong>2 business days</strong>.
      </p>
      <div style="background:#fff8f0;border-left:4px solid #ff9800;padding:16px 20px;border-radius:0 8px 8px 0;margin-bottom:28px;">
        <p style="margin:0;font-size:14px;color:#555;line-height:1.8;">
          ⏱ Estimated lead time: <strong>5–7 working days</strong><br>
          📦 We'll notify you once it's shipped
        </p>
      </div>
      <a href="https://www.clothready.com/tracking?order=${orderNo}"
         style="background:#ff4757;color:#fff;padding:13px 28px;text-decoration:none;border-radius:6px;font-weight:700;display:inline-block;font-size:14px;">
        Track Your Order →
      </a>
    `)
  }

  if (type === 'sample_shipped') {
    return wrap(`
      <h2 style="color:#111;margin:0 0 16px;">🚀 Your Sample is on the Way, ${name}!</h2>
      <p style="color:#555;line-height:1.8;margin:0 0 20px;">
        Order <strong>${orderNo}</strong> has been dispatched and is heading your way.
      </p>
      <div style="background:#f0fff4;border-left:4px solid #2ed573;padding:16px 20px;border-radius:0 8px 8px 0;margin-bottom:28px;">
        <p style="margin:0;font-size:14px;color:#333;line-height:1.8;">
          📦 Courier: <strong>${courier || 'DHL'}</strong><br>
          🔢 Tracking No: <strong>${trackingNo || '—'}</strong>
        </p>
      </div>
      <a href="https://www.clothready.com/tracking?order=${orderNo}"
         style="background:#2ed573;color:#fff;padding:13px 28px;text-decoration:none;border-radius:6px;font-weight:700;display:inline-block;font-size:14px;">
        Track Shipment →
      </a>
    `)
  }

  if (type === 'custom') {
    return wrap(customBody || '')
  }

  return wrap(`<p>${customBody || ''}</p>`)
}

export async function POST(req: NextRequest) {
  if (!isAuthed()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const { to, subject, type, data } = body as {
      to: string
      subject: string
      type: string
      data: Record<string, string>
    }

    if (!to || !subject || !type) {
      return NextResponse.json({ error: 'Missing to/subject/type' }, { status: 400 })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    const html = buildHtml(type, data || {})

    await resend.emails.send({ from: FROM, to, subject, html })

    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
