import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Hr,
} from '@react-email/components'

interface InquiryNotificationProps {
  name: string
  email: string
  company?: string
  phone?: string
  product?: string
  quantity?: string
  message?: string
}

export default function InquiryNotification({
  name,
  email,
  company,
  phone,
  product,
  quantity,
  message,
}: InquiryNotificationProps) {
  const timestamp = new Date().toUTCString()

  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: '#ffffff', fontFamily: 'monospace', margin: 0, padding: 0 }}>
        <Container style={{ maxWidth: 600, margin: '0 auto', padding: '32px 20px' }}>

          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#111111', marginBottom: 4 }}>
            NEW INQUIRY — ClothReady Contact Form
          </Text>
          <Hr style={{ borderColor: '#cccccc', margin: '12px 0' }} />

          <Section>
            <Text style={{ fontSize: 14, color: '#111111', margin: '6px 0' }}>
              <strong>Name:</strong> {name}
            </Text>
            <Text style={{ fontSize: 14, color: '#111111', margin: '6px 0' }}>
              <strong>Company:</strong> {company || '—'}
            </Text>
            <Text style={{ fontSize: 14, color: '#111111', margin: '6px 0' }}>
              <strong>Email:</strong> {email}
            </Text>
            <Text style={{ fontSize: 14, color: '#111111', margin: '6px 0' }}>
              <strong>Phone:</strong> {phone || '—'}
            </Text>
            <Text style={{ fontSize: 14, color: '#111111', margin: '6px 0' }}>
              <strong>Product Interest:</strong> {product || '—'}
            </Text>
            <Text style={{ fontSize: 14, color: '#111111', margin: '6px 0' }}>
              <strong>Quantity:</strong> {quantity || '—'}
            </Text>
          </Section>

          <Hr style={{ borderColor: '#cccccc', margin: '16px 0' }} />

          <Text style={{ fontSize: 14, color: '#111111', margin: '6px 0', lineHeight: '1.6' }}>
            <strong>Message:</strong>
          </Text>
          <Text style={{ fontSize: 14, color: '#333333', margin: '4px 0', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>
            {message || '—'}
          </Text>

          <Hr style={{ borderColor: '#cccccc', margin: '24px 0 12px' }} />

          <Text style={{ fontSize: 12, color: '#888888', margin: 0 }}>
            Received: {timestamp}
          </Text>

        </Container>
      </Body>
    </Html>
  )
}
