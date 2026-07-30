import Link from 'next/link'
import type { FaqLandingPage } from '@/lib/faqLandingPages'
import FaqAccordion from '@/components/sections/FaqAccordion'
import FaqJsonLd from '@/components/seo/FaqJsonLd'

export default function FaqLandingPageView({ page }: { page: FaqLandingPage }) {
  return (
    <main style={{ minHeight: '100vh' }}>
      <FaqJsonLd items={page.faqs} />

      <section style={{ padding: '7rem 2rem 3rem', textAlign: 'center', maxWidth: 760, margin: '0 auto' }}>
        <span style={{ display: 'inline-block', background: 'rgba(255,71,87,0.1)', color: '#ff4757', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '6px 16px', borderRadius: 50, marginBottom: '1.5rem' }}>
          FAQ
        </span>
        <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 900, lineHeight: 1.15, marginBottom: '1.25rem', color: '#111' }}>
          {page.h1}
        </h1>
        <p style={{ color: '#666', fontSize: '1rem', lineHeight: 1.75 }}>{page.intro}</p>
      </section>

      <section style={{ maxWidth: 820, margin: '0 auto', padding: '0 2rem 6rem' }}>
        <FaqAccordion items={page.faqs} />

        <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
          <Link href="/faq" style={{ color: '#ff4757', fontSize: '0.9rem', textDecoration: 'none', fontWeight: 600 }}>
            View the Full FAQ (20 Questions) →
          </Link>
        </div>

        <div style={{ marginTop: '2.5rem', textAlign: 'center', background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 20, padding: '2.5rem 2rem', boxShadow: '0 2px 20px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: '0.5rem', color: '#111' }}>Still Have Questions?</h3>
          <p style={{ color: '#777', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Our team responds within 24 hours.</p>
          <Link href="/contact" style={{ display: 'inline-block', background: 'linear-gradient(135deg, #ff4757, #ff6b6b)', color: '#fff', padding: '12px 32px', borderRadius: 50, fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  )
}
