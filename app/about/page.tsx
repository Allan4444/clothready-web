'use client'

import Reveal from '@/components/ui/Reveal'
import Link from 'next/link'
import SocialFeed from '@/components/sections/SocialFeed'

const FEATURES = [
  { icon: 'fa-handshake', title: 'Direct Factory Access', desc: 'No middlemen. You work directly with factory owners and production managers.' },
  { icon: 'fa-microscope', title: 'Rigorous Quality Control', desc: '7-point inspection process ensures every piece meets your standards.' },
  { icon: 'fa-rocket', title: 'Fast Turnaround', desc: '20-35 days from first call to delivery. Rush orders available.' },
  { icon: 'fa-users', title: 'Small Brand Friendly', desc: '50-piece MOQ means you can test the market without massive inventory risk.' },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="section" style={{ paddingTop: '8rem' }}>
        <div className="container-1200 text-center">
          <Reveal>
            <div className="section-label"><i className="fas fa-info-circle" /> Our Story</div>
            <h1 className="section-title">About ClothReady</h1>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              20+ years specializing in fitness wear and streetwear for global brands
            </p>
          </Reveal>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container-1200">
          <Reveal>
            <div className="text-center">
              <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.5rem)', fontWeight: 800, marginBottom: '1.25rem' }}>Why Choose ClothReady?</h2>
              <p style={{ fontSize: '1.05rem', color: '#888', maxWidth: 720, margin: '0 auto 3rem', lineHeight: 1.8 }}>
                We&apos;re not just a factory — we&apos;re your strategic manufacturing partner. With over 15 years of
                specialized experience in fitness and leisure wear, we understand the unique challenges small and
                medium brands face.
              </p>
            </div>
          </Reveal>

          <div className="grid-4">
            {FEATURES.map((f) => (
              <Reveal key={f.title}>
                <div className="card" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem 1.5rem' }}>
                  <div style={{ width: 64, height: 64, background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                    <i className={`fas ${f.icon}`} style={{ fontSize: '1.4rem', color: '#0a0a0a' }} />
                  </div>
                  <h4 style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '1.05rem' }}>{f.title}</h4>
                  <p style={{ fontSize: '0.9rem', color: '#888', lineHeight: 1.7 }}>{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Social Feed */}
      <SocialFeed />

      {/* CTA */}
      <section className="section">
        <div className="container-1200 text-center">
          <Reveal>
            <h2 className="section-title">Ready to Work Together?</h2>
            <p style={{ color: '#888', fontSize: '1.1rem', marginBottom: '2rem', maxWidth: 600, margin: '0 auto 2rem' }}>
              From your first sketch to the final shipment — we&apos;re with you every step.
            </p>
            <Link href="/products/custom" className="btn btn-primary">
              Start Your Project <i className="fas fa-arrow-right" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
