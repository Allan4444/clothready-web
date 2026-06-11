import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tech Pack Service | ClothReady',
  description: 'Professional tech pack creation for garment manufacturing. Detailed technical drawings, construction specs, and BOM sheets ready for production.',
}

const steps = [
  { num: '01', title: 'Submit Your Design', body: 'Share your sketches, references, or mood board — anything that shows your vision.' },
  { num: '02', title: 'Consultation Call', body: 'Our technical team reviews your concept and clarifies construction details within 24 hours.' },
  { num: '03', title: 'Tech Pack Draft', body: 'We produce detailed flat drawings, measurement specs, material call-outs, and a full BOM sheet.' },
  { num: '04', title: 'Revisions & Sign-Off', body: 'Up to two revision rounds included. Once approved, your tech pack is production-ready.' },
]

const includes = [
  'Technical flat drawings (front & back)',
  'Full measurement spec sheet (graded sizes)',
  'Fabric & trim bill of materials (BOM)',
  'Stitching & construction details',
  'Label & packaging placements',
  'Colorway callouts',
  'Factory-ready PDF + editable file',
]

export default function TechPackPage() {
  return (
    <main style={{ background: '#0a0a0a', color: '#fff', minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{ padding: '7rem 2rem 5rem', textAlign: 'center', maxWidth: 760, margin: '0 auto' }}>
        <span style={{ display: 'inline-block', background: 'rgba(255,71,87,0.12)', color: '#ff4757', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '6px 16px', borderRadius: 50, marginBottom: '1.5rem' }}>
          Tech Pack Service
        </span>
        <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.5px', lineHeight: 1.1, marginBottom: '1.25rem' }}>
          Turn Your Idea Into<br />
          <span style={{ color: '#ff4757' }}>Production-Ready Specs</span>
        </h1>
        <p style={{ color: '#888', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
          A professional tech pack is the blueprint every manufacturer needs before cutting a single thread.
          Our team creates factory-ready documentation so your samples come out right — first time.
        </p>
        <Link
          href="/contact"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'linear-gradient(135deg, #ff4757, #ff6b6b)', color: '#fff', padding: '14px 36px', borderRadius: 50, fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none', letterSpacing: '0.05em', textTransform: 'uppercase', boxShadow: '0 8px 30px rgba(255,71,87,0.35)' }}
        >
          Get a Tech Pack Quote
        </Link>
      </section>

      {/* What's included */}
      <section style={{ padding: '4rem 2rem', maxWidth: 900, margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.2px', marginBottom: '2rem', textAlign: 'center' }}>
          What's Included
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
          {includes.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '1rem 1.25rem' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff4757', flexShrink: 0 }} />
              <span style={{ color: '#ccc', fontSize: '0.9rem' }}>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Process steps */}
      <section style={{ padding: '4rem 2rem', maxWidth: 900, margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.2px', marginBottom: '2.5rem', textAlign: 'center' }}>
          How It Works
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
          {steps.map(({ num, title, body }) => (
            <div key={num} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '1.75rem 1.5rem' }}>
              <div style={{ color: '#ff4757', fontWeight: 900, fontSize: '1.5rem', marginBottom: '0.75rem' }}>{num}</div>
              <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.6rem' }}>{title}</h3>
              <p style={{ color: '#777', fontSize: '0.875rem', lineHeight: 1.65 }}>{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '4rem 2rem 7rem', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: '3rem 2rem' }}>
          <h2 style={{ fontWeight: 900, fontSize: '1.6rem', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Ready to Start?</h2>
          <p style={{ color: '#777', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '2rem' }}>
            Contact us today and get your tech pack quote within 24 hours.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" style={{ display: 'inline-block', background: 'linear-gradient(135deg, #ff4757, #ff6b6b)', color: '#fff', padding: '12px 30px', borderRadius: 50, fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Contact Us
            </Link>
            <Link href="/sample-order" style={{ display: 'inline-block', background: 'transparent', color: '#fff', padding: '12px 30px', borderRadius: 50, fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none', letterSpacing: '0.05em', textTransform: 'uppercase', border: '1px solid rgba(255,255,255,0.2)' }}>
              Request a Sample
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
