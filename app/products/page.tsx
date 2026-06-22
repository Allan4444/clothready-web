import Link from 'next/link'
import type { Metadata } from 'next'
import { CATEGORIES, getCategoryName } from '@/lib/categories'

export const metadata: Metadata = {
  title: 'Products — Custom Activewear & Streetwear Manufacturer | ClothReady',
  description: 'ClothReady manufactures custom gym wear, hoodies, yoga pants, sports bras, joggers and streetwear in China. Browse all categories. MOQ 50 pieces.',
  alternates: { canonical: 'https://clothready.com/products' },
}

const CATEGORY_ICONS: Record<string, string> = {
  'gym-wear-manufacturer': '🏋️',
  'custom-hoodies-manufacturer': '🧥',
  'yoga-pants-manufacturer': '🧘',
  'activewear-manufacturer': '⚡',
  'streetwear-manufacturer': '🔥',
  'custom-joggers': '👖',
  'sports-bra-manufacturer': '💪',
  'oversized-tshirt-manufacturer': '👕',
  'custom-jackets-manufacturer': '🧤',
  'custom-swimsuits-manufacturer': '🏊',
}

export default function ProductsPage() {
  return (
    <main style={{ background: '#0a0a0a', color: '#fff', minHeight: '100vh' }}>
      <style>{`
        .prod-cat-card { background:#111; border:1px solid #1e1e1e; border-radius:14px; padding:1.75rem; cursor:pointer; transition:border-color 0.2s, background 0.2s; height:100%; text-decoration:none; display:block; }
        .prod-cat-card:hover { border-color:#ff4757; background:#141414; }
        .prod-order-card { background:#0a0a0a; border:1px solid #1e1e1e; border-radius:14px; padding:2rem; transition:border-color 0.2s; }
        .prod-order-card:hover { border-color:#ff4757; }
        .prod-order-card-green:hover { border-color:#2ed573; }
      `}</style>

      {/* Hero */}
      <section style={{ paddingTop: '120px', paddingBottom: '60px', background: 'linear-gradient(180deg,#111 0%,#0a0a0a 100%)', borderBottom: '1px solid #1e1e1e' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', background: 'rgba(255,71,87,0.1)', border: '1px solid rgba(255,71,87,0.2)', borderRadius: '50px', padding: '0.4rem 1rem', fontSize: '0.75rem', color: '#ff4757', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>
            Factory Direct · MOQ 50 Pieces
          </div>
          <h1 style={{ fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.25rem' }}>
            Custom Activewear &amp; Streetwear<br />
            <span style={{ background: 'linear-gradient(135deg,#ff4757,#ff6b6b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Manufacturer in China</span>
          </h1>
          <p style={{ color: '#aaa', fontSize: '1.1rem', lineHeight: 1.75, maxWidth: 600, margin: '0 auto 2rem' }}>
            Browse our specialized manufacturing categories. Each page covers fabrics, customization options, and FAQs — everything you need to start your order.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-primary">Get a Free Quote →</Link>
            <Link href="/products/custom" style={{ display: 'inline-flex', alignItems: 'center', padding: '0.75rem 1.5rem', border: '1px solid #333', borderRadius: '8px', color: '#aaa', textDecoration: 'none', fontSize: '0.9rem' }}>
              Custom Manufacturing →
            </Link>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '4rem 2rem' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem' }}>Product Categories</h2>
        <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '2.5rem' }}>Click any category to view products, fabrics, and customization details.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {CATEGORIES.map((cat) => (
            <Link key={cat.slug} href={`/products/${cat.slug}`} className="prod-cat-card">
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                {CATEGORY_ICONS[cat.slug] ?? '👗'}
              </div>
              <h3 style={{ color: '#fff', fontSize: '1rem', fontWeight: 700, marginBottom: '0.6rem' }}>
                {getCategoryName(cat.slug)}
              </h3>
              <p style={{ color: '#666', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                {cat.metaDesc.split('.')[0]}.
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {cat.products.slice(0, 2).map((p) => (
                  <span key={p.id} style={{ fontSize: '0.7rem', padding: '3px 8px', background: 'rgba(255,71,87,0.08)', border: '1px solid rgba(255,71,87,0.15)', borderRadius: '4px', color: '#ff6b6b' }}>
                    {p.tag}
                  </span>
                ))}
                <span style={{ fontSize: '0.7rem', padding: '3px 8px', background: '#1a1a1a', border: '1px solid #2e2e2e', borderRadius: '4px', color: '#555' }}>
                  MOQ 50
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Order Types */}
      <section style={{ background: '#111', borderTop: '1px solid #1e1e1e', borderBottom: '1px solid #1e1e1e' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '4rem 2rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '2rem', textAlign: 'center' }}>How Would You Like to Order?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1.5rem' }}>
            <Link href="/products/custom" style={{ textDecoration: 'none' }}>
              <div className="prod-order-card">
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🏭</div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.6rem', color: '#fff' }}>Custom Manufacturing</h3>
                <p style={{ color: '#666', fontSize: '0.875rem', lineHeight: 1.65, marginBottom: '1rem' }}>Your designs, your brand. We produce from your tech pack or sketch. MOQ 50 pieces.</p>
                <div style={{ color: '#ff4757', fontSize: '0.85rem', fontWeight: 600 }}>Browse Products →</div>
              </div>
            </Link>
            <Link href="/products/in-stock" style={{ textDecoration: 'none' }}>
              <div className="prod-order-card prod-order-card-green">
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🛒</div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.6rem', color: '#fff' }}>In-Stock Shop</h3>
                <p style={{ color: '#666', fontSize: '0.875rem', lineHeight: 1.65, marginBottom: '1rem' }}>Ready-to-ship wholesale. Buy 1–50 pieces at tiered prices. Ships within 3 days.</p>
                <div style={{ color: '#2ed573', fontSize: '0.85rem', fontWeight: 600 }}>Shop Now →</div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ maxWidth: 700, margin: '0 auto', padding: '5rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 800, marginBottom: '1rem' }}>
          Not Sure Where to Start?
        </h2>
        <p style={{ color: '#aaa', marginBottom: '2rem', lineHeight: 1.7 }}>
          Tell us what you need and our team will guide you through category selection, fabric choices, and pricing within 24 hours.
        </p>
        <Link href="/contact" className="btn btn-primary" style={{ fontSize: '1rem', padding: '0.875rem 2rem' }}>
          Talk to Our Team →
        </Link>
      </section>

    </main>
  )
}
