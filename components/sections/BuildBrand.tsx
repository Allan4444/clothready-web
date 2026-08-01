'use client'

import Link from 'next/link'
import Reveal from '@/components/ui/Reveal'

export default function BuildBrand() {
  return (
    <section style={{ background: '#fff', padding: '5rem 0' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 2rem' }}>
        <Reveal>
          <div className="text-center">
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.5px', lineHeight: 1.1, marginBottom: '0.75rem', color: '#111' }}>
              LET'S BUILD YOUR BRAND
            </h2>
            <p style={{ color: '#666', fontSize: '1.05rem' }}>Get your instant quote below.</p>
          </div>
        </Reveal>
        <Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', margin: '2.5rem 0' }}>
            {[
              { icon: '⚡', title: '24-Hour Response', sub: 'Guaranteed' },
              { icon: '🛡️', title: '100% Quality Inspection', sub: 'Every Order' },
              { icon: '⭐', title: '20+ Years Production', sub: 'Experience' },
            ].map((item, i) => (
              <div key={i} style={{ background: '#f7f7f7', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 14, padding: '1.5rem 1rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>{item.icon}</div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.25rem', color: '#111' }}>{item.title}</div>
                <div style={{ color: '#666', fontSize: '0.85rem' }}>{item.sub}</div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal>
          <div style={{ background: '#f7f7f7', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 20, padding: '2.5rem 2rem' }}>
            <div className="text-center" style={{ marginBottom: '2rem' }}>
              <Link href="/sample-order" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'linear-gradient(135deg, #ff4757, #ff6b6b)', color: '#fff', padding: '14px 32px', borderRadius: 50, fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none', letterSpacing: '0.05em', textTransform: 'uppercase', boxShadow: '0 8px 30px rgba(255,71,87,0.35)' }}>
                {'🚀'} GET YOUR QUOTE IN 24 HOURS
              </Link>
            </div>
            <h3 className="text-center" style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: '1.5rem', color: '#111' }}>
              Start Your Million-Dollar Brand Today
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <Link href="/sample-order?type=new" className="bb-choice-card" style={{ textDecoration: 'none' }}>
                <div className="bb-choice-inner">
                  <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{'🌱'}</div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem', color: '#111' }}>New Brand / First Time</div>
                  <p style={{ color: '#666', fontSize: '0.85rem', lineHeight: 1.6 }}>I'm launching my first clothing brand or testing the market</p>
                  <span className="bb-choice-arrow">Get Started <i className="fas fa-arrow-right" /></span>
                </div>
              </Link>
              <Link href="/sample-order?type=experienced" className="bb-choice-card" style={{ textDecoration: 'none' }}>
                <div className="bb-choice-inner">
                  <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{'🚀'}</div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem', color: '#111' }}>Experienced Brand</div>
                  <p style={{ color: '#666', fontSize: '0.85rem', lineHeight: 1.6 }}>I already have a brand and I'm looking to scale or switch manufacturers</p>
                  <span className="bb-choice-arrow">Get Started <i className="fas fa-arrow-right" /></span>
                </div>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`
        .bb-choice-inner {
          background: #fff;
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 14px;
          padding: 2rem 1.5rem;
          text-align: center;
          cursor: pointer;
          transition: border-color 0.25s, background 0.25s, transform 0.25s, box-shadow 0.25s;
        }
        .bb-choice-arrow {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          margin-top: 1rem;
          color: #ff4757;
          font-weight: 700;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          opacity: 0;
          transform: translateY(4px);
          transition: opacity 0.25s, transform 0.25s;
        }
        .bb-choice-card:hover .bb-choice-inner {
          border-color: rgba(255,71,87,0.4);
          background: rgba(255,71,87,0.04);
          transform: translateY(-6px);
          box-shadow: 0 12px 30px rgba(255,71,87,0.15);
        }
        .bb-choice-card:hover .bb-choice-arrow {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  )
}
