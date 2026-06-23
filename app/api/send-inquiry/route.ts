import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { render } from '@react-email/render'
import InquiryConfirmation from '../../../emails/InquiryConfirmation'
import InquiryNotification from '../../../emails/InquiryNotification'

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const body = await req.json()
    const { name, email, company, phone, product, quantity, message } = body

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: 'name and email are required' },
        { status: 400 }
      )
    }

    const [confirmationHtml, notificationHtml] = await Promise.all([
      render(
        InquiryConfirmation({ name, email, company, product, quantity, message })
      ),
      render(
        InquiryNotification({ name, email, company, phone, product, quantity, message })
      ),
    ])

    await Promise.all([
      resend.emails.send({
        from: 'noreply@clothready.com',
        to: email,
        subject: 'We received your inquiry — ClothReady',
        html: confirmationHtml,
      }),
      resend.emails.send({
        from: 'noreply@clothready.com',
        to: 'info@clothready.com',
        subject: `New Inquiry: ${name} — ${company || email}`,
        html: notificationHtml,
      }),
    ])

    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
