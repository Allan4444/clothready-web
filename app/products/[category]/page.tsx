import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { CATEGORIES, getCategoryBySlug, getCategoryName } from '@/lib/categories'

type Props = { params: { category: string } }

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cat = getCategoryBySlug(params.category)
  if (!cat) return { title: 'Not Found' }
  return {
    title: cat.metaTitle,
    description: cat.metaDesc,
    alternates: { canonical: `https://clothready.com/products/${cat.slug}` },
  }
}

export default function CategoryPage({ params }: Props) {
  const cat = getCategoryBySlug(params.category)
  if (!cat) notFound()

  return (
    <main style={{ background: '#0a0a0a', color: '#fff', minHeight: '100vh' }}>
      <style>{`
        .cat-card { background:#111; border:1px solid #1e1e1e; border-radius:12px; overflow:hidden; transition:border-color 0.2s; }
        .cat-card:hover { border-color:#333; }
        .cat-why { background:#0a0a0a; border:1px solid #1e1e1e; border-radius:12px; padding:1.75rem; }
        .cat-tag { font-size:0.7rem; padding:3px 8px; background:rgba(255,71,87,0.08); border:1px solid rgba(255,71,87,0.15); border-radius:4px; color:#ff6b6b; }
        .cat-related-link { padding:0.6rem 1.25rem; border:1px solid #2e2e2e; border-radius:8px; color:#aaa; text-decoration:none; font-size:0.875rem; transition:border-color 0.2s, color 0.2s; display:inline-block; }
        .cat-related-link:hover { border-color:#ff4757; color:#fff; }
        .cat-sample-btn { display:block; text-align:center; padding:0.6rem; background:transparent; border:1px solid #333; border-radius:6px; color:#aaa; text-decoration:none; font-size:0.85rem; transition:background 0.2s, border-color 0.2s, color 0.2s; }
        .cat-sample-btn:hover { background:#ff4757; border-color:#ff4757; color:#fff; }
        .cat-ghost-btn { display:inline-flex; align-items:center; gap:0.5rem; padding:0.75rem 1.5rem; border:1px solid #333; border-radius:8px; color:#aaa; text-decoration:none; font-size:0.9rem; transition:border-color 0.2s, color 0.2s; }
        .cat-ghost-btn:hover { border-color:#666; color:#fff; }
        .cat-cta-btn { display:inline-flex; align-items:center; padding:0.875rem 2rem; border:1px solid #333; border-radius:8px; color:#aaa; text-decoration:none; font-size:1rem; transition:border-color 0.2s, color 0.2s; }
        .cat-cta-btn:hover { border-color:#666; color:#fff; }
      `}</style>

      {/* Hero */}
      <section style={{ paddingTop: '120px', paddingBottom: '60px', background: 'linear-gradient(180deg,#111 0%,#0a0a0a 100%)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <Link href="/products" style={{ color: '#666', fontSize: '0.85rem', textDecoration: 'none' }}>Products</Link>
            <span style={{ color: '#444' }}>/</span>
            <span style={{ color: '#aaa', fontSize: '0.85rem' }}>{getCategoryName(cat.slug)}</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '1.25rem', maxWidth: 800 }}>
            {cat.h1}
          </h1>
          <p style={{ color: '#aaa', fontSize: '1.05rem', lineHeight: 1.75, maxWidth: 720, marginBottom: '2rem' }}>
            {cat.intro}
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-primary">
              Get Free Quote →
            </Link>
            <Link href="/products/custom" className="cat-ghost-btn">
              View All Custom →
            </Link>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '4rem 2rem' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '2rem' }}>
          {getCategoryName(cat.slug)} Products
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {cat.products.map((p) => (
            <div key={p.id} className="cat-card">
              <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
                <Image src={p.img} alt={p.name} fill style={{ objectFit: 'cover' }} />
                <span style={{ position: 'absolute', top: '12px', left: '12px', background: '#ff4757', color: '#fff', fontSize: '0.7rem', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {p.tag}
                </span>
              </div>
              <div style={{ padding: '1.25rem' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '1rem' }}>{p.name}</h3>
                <Link href="/contact" className="cat-sample-btn">
                  Request Sample
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why ClothReady */}
      <section style={{ background: '#111', borderTop: '1px solid #1e1e1e', borderBottom: '1px solid #1e1e1e' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '4rem 2rem' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '2.5rem', textAlign: 'center' }}>
            Why Choose ClothReady for {getCategoryName(cat.slug)}?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
            {cat.why.map((w, i) => (
              <div key={i} className="cat-why">
                <div style={{ width: 40, height: 40, background: 'linear-gradient(135deg,#ff4757,#ff6b6b)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>
                  {i + 1}
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.6rem' }}>{w.title}</h3>
                <p style={{ color: '#777', fontSize: '0.9rem', lineHeight: 1.65 }}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '4rem 2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem' }}>
          Frequently Asked Questions
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {cat.faqs.map((faq, i) => (
            <details key={i} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '10px', padding: '1.25rem 1.5rem', cursor: 'pointer' }}>
              <summary style={{ fontWeight: 600, fontSize: '0.95rem', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                {faq.q}
                <span style={{ flexShrink: 0, color: '#ff4757', fontSize: '1.2rem' }}>+</span>
              </summary>
              <p style={{ marginTop: '1rem', color: '#aaa', fontSize: '0.9rem', lineHeight: 1.7 }}>{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Related Categories */}
      {cat.relatedCategories.length > 0 && (
        <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem 4rem' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.5rem' }}>Related Categories</h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {cat.relatedCategories.map((slug) => (
              <Link key={slug} href={`/products/${slug}`} className="cat-related-link">
                {getCategoryName(slug)}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg,#1a0a0a,#0a0a1a)', borderTop: '1px solid #1e1e1e' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '5rem 2rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 800, marginBottom: '1rem' }}>
            Ready to Manufacture {getCategoryName(cat.slug)}?
          </h2>
          <p style={{ color: '#aaa', marginBottom: '2rem', lineHeight: 1.7 }}>
            Tell us your requirements and our team will respond within 24 hours with a quote, fabric options, and production timeline.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-primary" style={{ fontSize: '1rem', padding: '0.875rem 2rem' }}>
              Get a Free Quote
            </Link>
            <Link href="/products/custom" className="cat-cta-btn">
              Explore All Products
            </Link>
          </div>
          <p style={{ marginTop: '1.5rem', color: '#555', fontSize: '0.85rem' }}>
            MOQ 50 pcs · Samples in 7-10 days · Factory in Dongguan, China
          </p>
        </div>
      </section>

    </main>
  )
}
