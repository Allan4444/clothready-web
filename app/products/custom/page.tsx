import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Custom Manufacturing | ClothReady',
  description: 'OEM/ODM custom garment manufacturing from 50 pieces. Fitness wear, streetwear, private label. 20–35 day lead time.',
}

const STEPS = [
  { n: '01', title: 'Share Your Design', desc: 'Send us your tech pack, sketch, or reference image. We\'ll review within 24 hours and confirm feasibility.' },
  { n: '02', title: 'Sample Production', desc: 'We produce 1–3 samples in 7–14 days. Sample cost (USD 50–200) is fully credited to your bulk order.' },
  { n: '03', title: 'Approve & Deposit', desc: 'Approve the sample, pay 30% deposit. We lock your production slot and order all materials.' },
  { n: '04', title: 'Bulk Production', desc: 'Full production in 20–35 days with inline QC checks. Progress photos sent on request.' },
  { n: '05', title: 'Final QC & Ship', desc: '100% final inspection, QC report with photos. Ship via DHL / FedEx / sea freight to your door.' },
]

const PRODUCTS = [
  { id: 'leggings',   name: 'Leggings & Yoga Pants',   cat: 'Fitness',    img: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=85', moq: 50,  lead: '20–30 days', price: 'USD 8–18 / pc',    fabrics: ['Nylon/Spandex', '4-way stretch', 'Moisture-wicking'] },
  { id: 'sports-bra', name: 'Sports Bras & Tops',      cat: 'Fitness',    img: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=85', moq: 50,  lead: '20–30 days', price: 'USD 6–14 / pc',    fabrics: ['Polyester/Spandex', 'Breathable mesh', 'Removable pads'] },
  { id: 'hoodie',     name: 'Hoodies & Sweatshirts',   cat: 'Streetwear', img: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&q=85', moq: 50,  lead: '25–35 days', price: 'USD 12–28 / pc',   fabrics: ['French terry', 'Fleece 280–380gsm', 'Organic cotton'] },
  { id: 'joggers',    name: 'Joggers & Track Pants',   cat: 'Streetwear', img: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=85', moq: 50,  lead: '20–30 days', price: 'USD 10–22 / pc',   fabrics: ['Cotton blend', 'Ripstop nylon', 'French terry'] },
  { id: 'tshirt',     name: 'T-Shirts & Tanks',        cat: 'Basics',     img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=85', moq: 50,  lead: '15–25 days', price: 'USD 4–10 / pc',    fabrics: ['100% Cotton', 'Cotton/Poly blend', 'Pima cotton'] },
  { id: 'jacket',     name: 'Jackets & Outerwear',     cat: 'Outerwear',  img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=85', moq: 100, lead: '30–40 days', price: 'USD 20–55 / pc',   fabrics: ['Windbreaker nylon', 'Softshell', 'Down fill'] },
  { id: 'shorts',     name: 'Shorts & Skorts',         cat: 'Fitness',    img: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=85', moq: 50,  lead: '15–25 days', price: 'USD 5–12 / pc',    fabrics: ['Quick-dry poly', 'Woven stretch', 'Liner mesh'] },
  { id: 'sets',       name: 'Matching Sets',           cat: 'Fitness',    img: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=800&q=85', moq: 50,  lead: '25–35 days', price: 'USD 18–40 / set',  fabrics: ['Seamless knit', 'Ribbed', 'Color-matched'] },
]

const GUARANTEES = [
  'MOQ from 50 pieces', 'Free design review', 'Sample in 7–14 days',
  'Sample cost credited', 'QC report + photos', 'DDP shipping available',
]

export default function CustomProductsPage() {
  return (
    <main style={{ minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{ padding: '7rem 2rem 4rem', textAlign: 'center', maxWidth: 760, margin: '0 auto' }}>
        <span style={{ display: 'inline-block', background: 'rgba(255,71,87,0.1)', color: '#ff4757', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '6px 16px', borderRadius: 50, marginBottom: '1.5rem' }}>
          Custom Manufacturing
        </span>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1.1, marginBottom: '1.25rem', letterSpacing: '-0.5px' }}>
          Your Design.<br />Our Factory.
        </h1>
        <p style={{ color: '#777', fontSize: '1.05rem', lineHeight: 1.75, marginBottom: '2.5rem' }}>
          OEM / ODM manufacturing for fitness wear and streetwear brands.
          MOQ 50 pieces. Direct from our Dongguan factory.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/sample-order" style={{ display: 'inline-block', background: 'linear-gradient(135deg,#ff4757,#ff6b6b)', color: '#fff', padding: '13px 32px', borderRadius: 50, fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none', letterSpacing: '0.04em', textTransform: 'uppercase', boxShadow: '0 8px 30px rgba(255,71,87,0.3)' }}>
            Request a Sample
          </Link>
          <a href="https://wa.me/8613412044008" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', background: 'rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.15)', color: '#111', padding: '13px 32px', borderRadius: 50, fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            WhatsApp Us
          </a>
        </div>
      </section>

      {/* Guarantees strip */}
      <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', borderBottom: '1px solid rgba(0,0,0,0.08)', background: '#fff' }}>
        <div style={{ padding: '1.25rem 3rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem 3rem' }}>
          {GUARANTEES.map((g) => (
            <span key={g} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#444' }}>
              <span style={{ color: '#ff4757', fontWeight: 900 }}>✓</span>{g}
            </span>
          ))}
        </div>
      </div>

      {/* Product grid — full width */}
      <section style={{ padding: '5rem 3rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 900, textTransform: 'uppercase', marginBottom: '0.75rem' }}>What We Manufacture</h2>
          <p style={{ color: '#777', fontSize: '0.95rem' }}>Click any category to start a sample order</p>
        </div>
        <div className="custom-product-grid">
          {PRODUCTS.map(p => (
            <Link key={p.id} href={`/sample-order?product=${p.id}`} style={{ textDecoration: 'none' }} className="product-card-link">
              <div className="product-card" style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 2px 20px rgba(0,0,0,0.06)' }}>
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.img} alt={p.name} style={{ width: '100%', height: 360, objectFit: 'cover', display: 'block' }} />
                  <span style={{ position: 'absolute', top: 14, left: 14, background: 'rgba(255,71,87,0.9)', color: '#fff', padding: '4px 12px', borderRadius: 50, fontSize: '0.7rem', fontWeight: 700 }}>{p.cat}</span>
                  <span style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(0,0,0,0.6)', color: '#fff', padding: '4px 12px', borderRadius: 50, fontSize: '0.7rem' }}>{p.price}</span>
                </div>
                <div style={{ padding: '1.4rem' }}>
                  <h3 style={{ fontWeight: 700, marginBottom: '0.4rem', color: '#111', fontSize: '1.05rem' }}>{p.name}</h3>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.78rem', color: '#777', marginBottom: '0.75rem' }}>
                    <span>MOQ {p.moq} pcs</span><span>·</span><span>{p.lead}</span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1rem' }}>
                    {p.fabrics.map(f => (
                      <span key={f} style={{ fontSize: '0.65rem', padding: '3px 10px', background: 'rgba(0,0,0,0.05)', borderRadius: 50, color: '#666' }}>{f}</span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#ff4757', fontSize: '0.85rem', fontWeight: 700 }}>
                    Request Sample →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works — full width */}
      <section style={{ padding: '5rem 3rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 900, textTransform: 'uppercase', marginBottom: '0.5rem' }}>How It Works</h2>
          <p style={{ color: '#777', fontSize: '0.95rem' }}>From your idea to delivery in 5 clear steps</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px,1fr))', gap: '1.25rem' }}>
          {STEPS.map(s => (
            <div key={s.n} style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', borderRadius: 16, padding: '1.75rem 1.4rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 900, color: '#ff4757', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>{s.n}</div>
              <h4 style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.5rem', color: '#111' }}>{s.title}</h4>
              <p style={{ color: '#777', fontSize: '0.82rem', lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ maxWidth: 860, margin: '0 auto', padding: '0 3rem 6rem' }}>
        <div style={{ background: 'linear-gradient(135deg, rgba(255,71,87,0.08), rgba(255,71,87,0.03))', border: '1px solid rgba(255,71,87,0.2)', borderRadius: 24, padding: '3rem 2.5rem', textAlign: 'center' }}>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.4rem,3vw,1.9rem)', textTransform: 'uppercase', marginBottom: '0.75rem', color: '#111' }}>Ready to Start?</h2>
          <p style={{ color: '#777', fontSize: '0.95rem', lineHeight: 1.7, maxWidth: 500, margin: '0 auto 2rem' }}>
            Don&apos;t have a tech pack? Share a reference image or sketch and we&apos;ll quote within 48 hours.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/sample-order" style={{ display: 'inline-block', background: 'linear-gradient(135deg,#ff4757,#ff6b6b)', color: '#fff', padding: '13px 32px', borderRadius: 50, fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none', letterSpacing: '0.05em', textTransform: 'uppercase', boxShadow: '0 8px 30px rgba(255,71,87,0.3)' }}>
              Start Sample Order
            </Link>
            <Link href="/contact" style={{ display: 'inline-block', background: 'rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.15)', color: '#111', padding: '13px 32px', borderRadius: 50, fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Ask a Question
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .custom-product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }
        .product-card { transition: transform 0.25s, box-shadow 0.25s; }
        .product-card-link:hover .product-card { transform: translateY(-5px); box-shadow: 0 12px 40px rgba(0,0,0,0.12) !important; }
        .product-card img { transition: transform 0.5s; }
        .product-card-link:hover .product-card img { transform: scale(1.06); }
        @media (max-width: 768px) {
          .custom-product-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  )
}
