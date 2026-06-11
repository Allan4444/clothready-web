'use client'

import Reveal from '@/components/ui/Reveal'
import Link from 'next/link'

export const metadata = {
  title: 'Custom Manufacturing — OEM Fitness & Streetwear',
  description: 'Custom apparel manufacturing: fitness wear, activewear, streetwear. Your design, your brand. MOQ 50 pieces. Free tech pack development.',
}

const PRODUCTS = [
  { id: 'leggings', name: 'Leggings & Yoga Pants', cat: 'Fitness', img: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80', moq: 50, lead: '20-30 days', fabrics: ['Nylon/Spandex', '4-way stretch', 'Moisture-wicking'] },
  { id: 'sports-bra', name: 'Sports Bras & Tops', cat: 'Fitness', img: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&q=80', moq: 50, lead: '20-30 days', fabrics: ['Polyester/Spandex', 'Breathable mesh', 'Removable pads'] },
  { id: 'hoodie', name: 'Hoodies & Sweatshirts', cat: 'Streetwear', img: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&q=80', moq: 50, lead: '25-35 days', fabrics: ['French terry', 'Fleece 280-380gsm', 'Organic cotton'] },
  { id: 'joggers', name: 'Joggers & Pants', cat: 'Streetwear', img: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&q=80', moq: 50, lead: '20-30 days', fabrics: ['Cotton blend', 'Ripstop nylon', 'French terry'] },
  { id: 'tshirt', name: 'T-Shirts & Tanks', cat: 'Basics', img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80', moq: 50, lead: '15-25 days', fabrics: ['100% Cotton', 'Cotton/Poly blend', 'Pima cotton'] },
  { id: 'jacket', name: 'Jackets & Outerwear', cat: 'Outerwear', img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80', moq: 100, lead: '30-40 days', fabrics: ['Windbreaker nylon', 'Softshell', 'Down fill'] },
  { id: 'shorts', name: 'Shorts & Skorts', cat: 'Fitness', img: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&q=80', moq: 50, lead: '15-25 days', fabrics: ['Quick-dry poly', 'Woven stretch', 'Liner mesh'] },
  { id: 'sets', name: 'Matching Sets', cat: 'Fitness', img: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=600&q=80', moq: 50, lead: '25-35 days', fabrics: ['Seamless knit', 'Ribbed', 'Color-matched'] },
]

export default function CustomProductsPage() {
  return (
    <>
      <section className="section" style={{ paddingTop: '8rem' }}>
        <div className="container-1200 text-center">
          <Reveal>
            <div className="section-label"><i className="fas fa-industry" /> Custom Manufacturing</div>
            <h1 className="section-title">Your Design, Our Factory</h1>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Click any product to see details and request a custom sample
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container-1200">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '1.5rem' }}>
            {PRODUCTS.map(p => (
              <Reveal key={p.id}>
                <Link href={`/sample-order?product=${p.id}`} style={{ textDecoration: 'none' }}>
                  <div className="card" style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }}>
                    <div style={{ position: 'relative', overflow: 'hidden' }}>
                      <img
                        src={p.img} alt={p.name}
                        style={{ width: '100%', height: 220, objectFit: 'cover', display: 'block', transition: 'transform 0.4s' }}
                        onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                        onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
                      />
                      <span style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(255,71,87,0.9)', color: '#fff', padding: '3px 10px', borderRadius: 50, fontSize: '0.7rem', fontWeight: 700 }}>
                        {p.cat}
                      </span>
                    </div>
                    <div style={{ padding: '1.25rem' }}>
                      <h3 style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#fff' }}>{p.name}</h3>
                      <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: '#888', marginBottom: '0.75rem' }}>
                        <span>MOQ {p.moq} pcs</span>
                        <span>•</span>
                        <span>{p.lead}</span>
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                        {p.fabrics.map(f => (
                          <span key={f} style={{ fontSize: '0.65rem', padding: '2px 8px', background: 'rgba(255,255,255,0.06)', borderRadius: 50, color: '#aaa' }}>{f}</span>
                        ))}
                      </div>
                      <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ff4757', fontSize: '0.85rem', fontWeight: 600 }}>
                        Request Sample <i className="fas fa-arrow-right" style={{ fontSize: '0.7rem' }} />
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-darker">
        <div className="container-1200 text-center">
          <Reveal>
            <h2 className="section-title">Don&apos;t See Your Product?</h2>
            <p style={{ color: '#888', fontSize: '1.1rem', marginBottom: '2rem', maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
              We custom-manufacture almost any apparel category. Share your tech pack and we&apos;ll quote within 48 hours.
            </p>
            <Link href="/sample-order" className="btn btn-primary">
              Start Custom Project <i className="fas fa-arrow-right" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
