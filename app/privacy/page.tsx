import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | ClothReady',
  description: 'How ClothReady collects, uses, and protects your information.',
}

const sectionStyle: React.CSSProperties = { marginBottom: '2rem' }
const h2Style: React.CSSProperties = { fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.6rem', color: '#111' }
const pStyle: React.CSSProperties = { color: '#555', fontSize: '0.92rem', lineHeight: 1.8 }

export default function PrivacyPage() {
  return (
    <main style={{ minHeight: '100vh' }}>
      <section style={{ padding: '7rem 2rem 2rem', maxWidth: 760, margin: '0 auto' }}>
        <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 900, marginBottom: '0.5rem', color: '#111' }}>
          Privacy Policy
        </h1>
        <p style={{ color: '#999', fontSize: '0.85rem', marginBottom: '2.5rem' }}>Last updated: 2026</p>

        <div style={sectionStyle}>
          <h2 style={h2Style}>What We Collect</h2>
          <p style={pStyle}>
            When you submit an enquiry, sample order, or contact form on this site, we collect the
            information you provide — such as your name, company, email, phone number, country,
            product requirements, and any files you attach (e.g. tech packs, design references).
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>How We Use It</h2>
          <p style={pStyle}>
            We use this information solely to respond to your enquiry, prepare quotes, process
            sample or bulk orders, and communicate with you about your order status. We do not
            sell or rent your personal data to third parties.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>Data Storage</h2>
          <p style={pStyle}>
            Your data is stored securely in our database and is only accessible to authorized
            ClothReady staff. Uploaded files are stored in a secure cloud storage bucket.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>Your Rights</h2>
          <p style={pStyle}>
            You may request access to, correction of, or deletion of your personal data at any
            time by emailing us at{' '}
            <a href="mailto:info@clothready.com" style={{ color: '#ff4757' }}>info@clothready.com</a>.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>Contact</h2>
          <p style={pStyle}>
            Questions about this policy? Reach us at{' '}
            <a href="mailto:info@clothready.com" style={{ color: '#ff4757' }}>info@clothready.com</a>
            {' '}or via WhatsApp at{' '}
            <a href="https://wa.me/8613412044008" target="_blank" rel="noopener noreferrer" style={{ color: '#ff4757' }}>
              +86 134 1204 4008
            </a>.
          </p>
        </div>
      </section>
    </main>
  )
}
