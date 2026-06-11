'use client'

import Link from 'next/link'
import Reveal from '@/components/ui/Reveal'

export default function BuildBrand() {
  return (
    <section style={{ background: '#0a0a0a', padding: '5rem 0' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 2rem' }}>
        <Reveal>
          <div className="text-center">
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '-0.5px',
              lineHeight: 1.1,
              marginBottom: '0.75rem',
            }}>
              Let&apos;s Build Your Brand
            </h2>
            <p style={{ color: '#888', fontSize: '1.05rem' }}>
              Get your instant quote below.
            </p>
          </div>
        </Reveal>

        {/* 3 feature cards */}
        <Reveal>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
            margin: '2.5rem 0',
          }}>
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 14,
              padding: '1.5rem 1rem',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>⚡</div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.25rem' }}>24-Hour Response</div>
              <div style={{ color: '#888', fontSize: '0.85rem' }}>Guaranteed</div>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 14,
              padding: '1.5rem 1rem',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>🛡️</div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.25rem' }}>100% Quality Inspection</div>
              <div style={{ color: '#888', fontSize: '0.85rem' }}>Every Order</div>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 14,
              padding: '1.5rem 1rem',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>⭐</div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.25rem' }}>20+ Years Production</div>
              <div style={{ color: '#888', fontSize: '0.85rem' }}>Experience</div>
            </div>
          </div>
        </Reveal>

        {/* Quote card */}
        <Reveal>
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 20,
            padding: '2.5rem 2rem',
          }}>
            {/* CTA button */}
            <div className="text-center" style={{ marginBottom: '2rem' }}>
              <Link href="/sample-order" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'linear-gradient(135deg, #ff4757, #ff6b6b)',
                color: '#fff',
                padding: '14px 32px',
                borderRadius: 50,
                fontWeight: 700,
                fontSize: '0.9rem',
                textDecoration: 'none',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                boxShadow: '0 8px 30px rgba(255,71,87,0.35)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}>
                🚀 Get Your Quote in 24 Hours
              </Link>
            </div>

            {/* Title */}
            <h3 className="text-center" style={{
              fontWeight: 800,
              fontSize: '1.2rem',
              marginBottom: '1.5rem',
            }}>
              Start Your Million-Dollar Brand Today
            </h3>

            {/* Two option cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
            }}>
              <Link href="/sample-order?type=new" style={{ textDecoration: 'none' }}>
                <div style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 14,
                  padding: '2rem 1.5rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'border-color 0.3s, transform 0.2s',
                }}
                onMouseOver={e => { e.currentTarget.style.borderColor = 'rgba(255,71,87,0.4)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🌱</div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem', color: '#fff' }}>
                    New Brand / First Time
                  </div>
                  <p style={{ color: '#888', fontSize: '0.85rem', lineHeight: 1.6 }}>
                    I&apos;m launching my first clothing brand or testing the market
                  </p>
                </div>
              </Link>

              <Link href="/sample-order?type=experienced" style={{ textDecoration: 'none' }}>
                <div style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 14,
                  padding: '2rem 1.5rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'border-color 0.3s, transform 0.2s',
                }}
                onMouseOver={e => { e.currentTarget.style.borderColor = 'rgba(255,71,87,0.4)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🚀</div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem', color: '#fff' }}>
                    Experienced Brand
                  </div>
                  <p style={{ color: '#888', fontSize: '0.85rem', lineHeight: 1.6 }}>
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
          .text-center h2 { font-size: 1.8rem !important; }
        }
      `}</style>
    </section>
  )
}
