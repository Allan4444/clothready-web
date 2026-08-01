import type { Metadata } from 'next'
import Link from 'next/link'
import { FABRIC_LIBRARY } from '@/lib/fabricLibrary'

export const metadata: Metadata = {
  title: 'Fabric Library | GSM, Composition & Stretch Specs | ClothReady',
  description: 'Browse ClothReady\'s fabric library — Nylon/Spandex, Polyester/Spandex, French Terry, and more with GSM weight, composition, and stretch factor for apparel buyers.',
}

const CATEGORIES = ['Activewear', 'Streetwear', 'Basics'] as const

export default function FabricLibraryPage() {
  return (
    <main style={{ minHeight: '100vh' }}>
      <section style={{ padding: '7rem 2rem 3rem', textAlign: 'center', maxWidth: 760, margin: '0 auto' }}>
        <span style={{ display: 'inline-block', background: 'rgba(255,71,87,0.1)', color: '#ff4757', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '6px 16px', borderRadius: 50, marginBottom: '1.5rem' }}>
          Fabric Library
        </span>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, lineHeight: 1.15, marginBottom: '1.25rem', color: '#111' }}>
          Fabrics We Work With
        </h1>
        <p style={{ color: '#666', fontSize: '1rem', lineHeight: 1.75 }}>
          Full technical specs for every fabric in our production line — composition, GSM weight,
          and stretch factor — so you can spec your garment with confidence before you ever request a sample.
        </p>
      </section>

      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem 6rem' }}>
        {CATEGORIES.map((cat) => {
          const fabrics = FABRIC_LIBRARY.filter((f) => f.category === cat)
          return (
            <div key={cat} style={{ marginBottom: '3.5rem' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1.5rem', color: '#111' }}>{cat} Fabrics</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
                {fabrics.map((f) => (
                  <div key={f.slug} style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 16, padding: '1.5rem', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                    <h3 style={{ fontWeight: 700, fontSize: '1rem', color: '#111', marginBottom: '1rem' }}>{f.name}</h3>
                    <dl style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', margin: 0 }}>
                      {[
                        { label: 'Composition', value: f.composition },
                        { label: 'Weight', value: f.weight },
                        { label: 'Stretch', value: f.stretch },
                        { label: 'Moisture', value: f.moisture },
                      ].map((row) => (
                        <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', fontSize: '0.82rem' }}>
                          <dt style={{ color: '#999', flexShrink: 0 }}>{row.label}</dt>
                          <dd style={{ margin: 0, color: '#333', fontWeight: 600, textAlign: 'right' }}>{row.value}</dd>
                        </div>
                      ))}
                    </dl>
                    <div style={{ marginTop: '1rem', paddingTop: '0.85rem', borderTop: '1px solid rgba(0,0,0,0.06)', display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {f.bestFor.map((b) => (
                        <span key={b} style={{ background: 'rgba(255,71,87,0.08)', border: '1px solid rgba(255,71,87,0.2)', color: '#ff4757', fontSize: '0.72rem', fontWeight: 600, padding: '3px 10px', borderRadius: 20 }}>
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}

        <div style={{ marginTop: '2rem', textAlign: 'center', background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 20, padding: '2.5rem 2rem', boxShadow: '0 2px 20px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: '0.5rem', color: '#111' }}>Need a Fabric Not Listed Here?</h3>
          <p style={{ color: '#777', fontSize: '0.9rem', marginBottom: '1.5rem' }}>We source to spec — send us your requirements and we'll find or match it.</p>
          <Link href="/contact" style={{ display: 'inline-block', background: 'linear-gradient(135deg, #ff4757, #ff6b6b)', color: '#fff', padding: '12px 32px', borderRadius: 50, fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  )
}
