'use client'

import Link from 'next/link'
import Reveal from '@/components/ui/Reveal'

export default function BuildBrand() {
  return (
    <section style={{ background: '#0a0a0a', padding: '5rem 0' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 2rem' }}>
        <Reveal>
          <div className="text-center">
            <h2 className="section-title" style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', marginBottom: '0.5rem' }}>
              LET&apos;S BUILD YOUR BRAND
            </h2>
            <p style={{ color: '#888', fontSize: '1.05rem', marginBottom: '2.5rem' }}>
              Get your instant quote below.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2.5rem' }}>
            {[
              { icon: '', title: '24-Hour Response', sub: 'Guaranteed' },
              { icon: '', title: '100% Quality Inspection', sub: 'Every Order' },
              { icon: '', title: '20+ Years Production', sub: 'Experience' },
            ].map(f => (
              <div key={f.title} className="card" style={{ textAlign: 'center', padding: '1.5rem 1rem' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#ff4757' }}>{f.icon}</div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.25rem' }}>{f.title}</div>
                <div style={{ fontSize: '0.8rem', color: '#888' }}>{f.sub}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="card" style={{ padding: '2.5rem 2rem' }}>
            <div className="text-center" style={{ marginBottom: '2rem' }}>
              <Link href="/sample-order" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: 'linear-gradient(135deg, #ff4757, #ff6b6b)', color: '#fff',
                padding: '14px 32px', borderRadius: 50, fontWeight: 700, fontSize: '0.95rem',
                textDecoration: 'none', boxShadow: '0 8px 24px rgba(255,71,87,0.3)',
              }}>
                 GET YOUR QUOTE IN 24 HOURS
              </Link>
            </div>

            <h3 style={{ textAlign: 'center', fontWeight: 800, fontSize: '1.3rem', marginBottom: '1.5rem' }}>
              Start Your Million-Dollar Brand Today
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <Link href="/sample-order?type=new" style={{ textDecoration: 'none' }}>
                <div className="card" style={{ textAlign: 'center', padding: '2rem 1.5rem', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}></div>
                  <h4 style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#fff' }}>New Brand / First Time</h4>
                  <p style={{ fontSize: '0.85rem', color: '#888', lineHeight: 1.6 }}>
                    I&apos;m launching my first clothing brand or testing the market
                  </p>
                </div>
              </Link>
              <Link href="/sample-order?type=experienced" style={{ textDecoration: 'none' }}>
                <div className="card" style={{ textAlign: 'center', padding: '2rem 1.5rem', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}></div>
                  <h4 style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#fff' }}>Experienced Brand</h4>
                  <p style={{ fontSize: '0.85rem', color: '#888', lineHeight: 1.6 }}>
                    I already have a brand and I&apos;m looking to scale or switch manufacturers
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .section-title { font-size: 1.8rem !important; }
        }
      `}</style>
    </section>
  )
}
