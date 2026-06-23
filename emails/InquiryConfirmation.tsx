import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Hr,
  Link,
} from '@react-email/components'

interface InquiryConfirmationProps {
  name: string
  email: string
  company?: string
  product?: string
  quantity?: string
  message?: string
}

export default function InquiryConfirmation({
  name,
  email,
  company,
  product,
  quantity,
  message,
}: InquiryConfirmationProps) {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif', margin: 0, padding: 0 }}>
        <Container style={{ maxWidth: 580, margin: '0 auto', padding: '40px 20px' }}>

          <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#111111', marginBottom: 4 }}>
            ClothReady
          </Text>
          <Hr style={{ borderColor: '#eeeeee', margin: '16px 0' }} />

          <Text style={{ fontSize: 16, color: '#111111', marginBottom: 8 }}>
            Hi {name},
          </Text>
          <Text style={{ fontSize: 15, color: '#444444', lineHeight: '1.6' }}>
            Thank you for reaching out to ClothReady. We&apos;ve received your inquiry and our team
            will get back to you within 24–48 hours.
          </Text>

          <Section style={{ backgroundColor: '#f7f7f7', borderRadius: 8, padding: '20px 24px', margin: '24px 0' }}>
            <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#111111', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Your Submission Summary
            </Text>
            {product && (
              <Text style={{ fontSize: 14, color: '#444444', margin: '4px 0' }}>
                <strong>Product Interest:</strong> {product}
              </Text>
            )}
            {quantity && (
              <Text style={{ fontSize: 14, color: '#444444', margin: '4px 0' }}>
                <strong>Quantity:</strong> {quantity}
              </Text>
            )}
            {company && (
              <Text style={{ fontSize: 14, color: '#444444', margin: '4px 0' }}>
                <strong>Company:</strong> {company}
              </Text>
            )}
            {message && (
              <Text style={{ fontSize: 14, color: '#444444', margin: '4px 0', lineHeight: '1.5' }}>
                <strong>Message:</strong> {message}
              </Text>
            )}
            <Text style={{ fontSize: 14, color: '#444444', margin: '4px 0' }}>
              <strong>Email:</strong> {email}
            </Text>
          </Section>

          <Text style={{ fontSize: 15, color: '#444444', lineHeight: '1.6' }}>
            In the meantime, feel free to browse our manufacturing categories at{' '}
            <Link href="https://clothready.com" style={{ color: '#111111', fontWeight: 'bold' }}>
              clothready.com
            </Link>
            .
          </Text>

          <Hr style={{ borderColor: '#eeeeee', margin: '32px 0 16px' }} />

          <Text style={{ fontSize: 12, color: '#999999', lineHeight: '1.6', margin: 0 }}>
            ClothReady &nbsp;|&nbsp;{' '}
            <Link href="mailto:info@clothready.com" style={{ color: '#999999' }}>
              info@clothready.com
            </Link>
            &nbsp;|&nbsp; Dongguan, China
          </Text>

        </Container>
      </Body>
    </Html>
  )
}
