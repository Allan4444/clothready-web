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
    <main style={{ background: '#fff', color: '#111', minHeight: '100vh' }}>
      <style>{`
        .cc-keypoint { background:#f8f8f8; border:1px solid #ebebeb; border-radius:10px; padding:1.25rem 1.5rem; }
        .cc-make-item { background:#fff; border:1px solid #e8e8e8; border-radius:10px; padding:1rem 1.25rem; display:flex; align-items:center; justify-content:space-between; gap:1rem; }
        .cc-fabric-card { background:#fff; border:1px solid #e8e8e8; border-radius:12px; padding:1.5rem; }
        .cc-pricing-row { display:flex; align-items:baseline; gap:0.75rem; padding:0.875rem 0; border-bottom:1px solid #f0f0f0; }
        .cc-step { display:flex; gap:1.25rem; align-items:flex-start; }
        .cc-why-card { background:#fff; border:1px solid #e8e8e8; border-radius:12px; padding:1.75rem; }
        .cc-faq details { background:#fff; border:1px solid #e8e8e8; border-radius:10px; padding:1.25rem 1.5rem; cursor:pointer; }
        .cc-related-link { padding:0.6rem 1.25rem; border:1px solid #e0e0e0; border-radius:8px; color:#555; text-decoration:none; font-size:0.875rem; transition:border-color 0.2s, color 0.2s, background 0.2s; display:inline-block; }
        .cc-related-link:hover { border-color:#ff4757; color:#ff4757; background:#fff5f5; }
        .cc-sample-btn { display:block; text-align:center; padding:0.6rem; background:transparent; border:1px solid #e0e0e0; border-radius:6px; color:#666; text-decoration:none; font-size:0.85rem; transition:background 0.2s, border-color 0.2s, color 0.2s; }
        .cc-sample-btn:hover { background:#ff4757; border-color:#ff4757; color:#fff; }
        .cc-ghost-btn { display:inline-flex; align-items:center; gap:0.5rem; padding:0.75rem 1.5rem; border:1px solid #d0d0d0; border-radius:8px; color:#555; text-decoration:none; font-size:0.9rem; transition:border-color 0.2s, color 0.2s; }
        .cc-ghost-btn:hover { border-color:#999; color:#111; }
        details summary::-webkit-details-marker { display:none; }
      `}</style>

      {/* 1. Hero */}
      <section style={{ paddingTop: '100px', paddingBottom: '60px', background: '#f5f5f5', borderBottom: '1px solid #e8e8e8' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <Link href="/products" style={{ color: '#999', fontSize: '0.85rem', textDecoration: 'none' }}>Products</Link>
            <span style={{ color: '#ccc' }}>/</span>
            <span style={{ color: '#555', fontSize: '0.85rem' }}>{getCategoryName(cat.slug)}</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '1.25rem', maxWidth: 800, color: '#111' }}>
            {cat.h1}
          </h1>
          <p style={{ color: '#555', fontSize: '1.05rem', lineHeight: 1.75, maxWidth: 720, marginBottom: '1rem' }}>
            {cat.intro}
          </p>
          <p style={{ color: '#555', fontSize: '1.05rem', lineHeight: 1.75, maxWidth: 720, marginBottom: '2rem' }}>
            {cat.intro2}
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-primary">
              {cat.ctaText} →
            </Link>
            <Link href="/products" className="cc-ghost-btn">
              View All Products →
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Key Points */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '3rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          {cat.keyPoints.map((point, i) => (
            <div key={i} className="cc-keypoint">
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <span style={{ color: '#ff4757', fontSize: '1.1rem', lineHeight: 1, flexShrink: 0, marginTop: '2px' }}>✓</span>
                <span style={{ color: '#333', fontSize: '0.9rem', lineHeight: 1.6, fontWeight: 500 }}>{point}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. What We Can Make */}
      <section style={{ background: '#f8f8f8', borderTop: '1px solid #ebebeb', borderBottom: '1px solid #ebebeb' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '4rem 2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', color: '#111' }}>What We Can Make</h2>
          <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '2rem' }}>All styles are fully customizable with your branding, colors, and specs.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.75rem' }}>
            {cat.whatWeMake.map((item, i) => (
              <div key={i} className="cc-make-item">
                <span style={{ color: '#111', fontSize: '0.9rem', fontWeight: 500 }}>{item.name}</span>
                <span style={{ background: 'rgba(255,71,87,0.08)', border: '1px solid rgba(255,71,87,0.2)', color: '#ff4757', fontSize: '0.72rem', fontWeight: 700, padding: '3px 10px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                  {item.moq}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Fabrics & Performance */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '4rem 2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', color: '#111' }}>Fabrics &amp; Performance</h2>
        <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '2rem' }}>We source from certified mills. All fabrics tested before bulk production approval.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
          {cat.fabrics.map((f, i) => (
            <div key={i} className="cc-fabric-card">
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#111', marginBottom: '0.5rem' }}>{f.name}</h3>
              <div style={{ display: 'inline-block', background: '#f5f5f5', border: '1px solid #eee', borderRadius: '6px', padding: '3px 10px', fontSize: '0.78rem', color: '#555', marginBottom: '0.75rem' }}>{f.spec}</div>
              <p style={{ color: '#666', fontSize: '0.85rem', lineHeight: 1.6 }}><strong style={{ color: '#888', fontWeight: 600 }}>Best for:</strong> {f.use}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. MOQ, Lead Time & Pricing */}
      <section style={{ background: '#f8f8f8', borderTop: '1px solid #ebebeb', borderBottom: '1px solid #ebebeb' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '4rem 2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', color: '#111' }}>MOQ, Lead Time &amp; Pricing</h2>
          <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '2rem' }}>Transparent pricing. No hidden fees. Sample cost credited back on bulk orders.</p>
          <div style={{ background: '#fff', border: '1px solid #e8e8e8', borderRadius: '12px', padding: '0.5rem 1.5rem', overflow: 'hidden' }}>
            {cat.pricing.map((row, i) => (
              <div key={i} className="cc-pricing-row" style={{ borderBottom: i === cat.pricing.length - 1 ? 'none' : undefined }}>
                <span style={{ color: '#888', fontSize: '0.85rem', fontWeight: 600, minWidth: 180, flexShrink: 0 }}>{row.label}</span>
                <span style={{ color: '#111', fontSize: '0.9rem' }}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Our Process */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '4rem 2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', color: '#111' }}>Our Process for Small Brands</h2>
        <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '2.5rem' }}>We have simplified manufacturing so small and growing brands can work with us as easily as large ones.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          {cat.process.map((step, i) => (
            <div key={i} className="cc-step">
              <div style={{ width: 40, height: 40, background: 'linear-gradient(135deg,#ff4757,#ff6b6b)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.9rem', fontWeight: 800, color: '#fff' }}>
                {i + 1}
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#111', marginBottom: '0.35rem' }}>{step.title}</h3>
                <p style={{ color: '#555', fontSize: '0.9rem', lineHeight: 1.65 }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Why Brands Choose Us */}
      <section style={{ background: '#f8f8f8', borderTop: '1px solid #ebebeb', borderBottom: '1px solid #ebebeb' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '4rem 2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '2.5rem', textAlign: 'center', color: '#111' }}>
            Why Brands Choose ClothReady
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {cat.why.map((w, i) => (
              <div key={i} className="cc-why-card">
                <div style={{ width: 40, height: 40, background: 'linear-gradient(135deg,#ff4757,#ff6b6b)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>
                  {i + 1}
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.6rem', color: '#111' }}>{w.title}</h3>
                <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.65 }}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Gallery */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '4rem 2rem' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '2rem', color: '#111' }}>
          Sample Products
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.25rem' }}>
          {cat.products.map((p) => (
            <div key={p.id} style={{ background: '#fff', border: '1px solid #e8e8e8', borderRadius: '12px', overflow: 'hidden' }}>
              <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
                <Image src={p.img} alt={p.name} fill style={{ objectFit: 'cover' }} />
                <span style={{ position: 'absolute', top: '10px', left: '10px', background: '#ff4757', color: '#fff', fontSize: '0.68rem', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                  {p.tag}
                </span>
              </div>
              <div style={{ padding: '1rem 1.25rem' }}>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.75rem', color: '#111' }}>{p.name}</h3>
                <Link href="/contact" className="cc-sample-btn">Request Sample</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. FAQ */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '0 2rem 4rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem', color: '#111' }}>
          Frequently Asked Questions
        </h2>
        <div className="cc-faq" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {cat.faqs.map((faq, i) => (
            <details key={i}>
              <summary style={{ fontWeight: 600, fontSize: '0.95rem', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', color: '#111' }}>
                {faq.q}
                <span style={{ flexShrink: 0, color: '#ff4757', fontSize: '1.2rem' }}>+</span>
              </summary>
              <p style={{ marginTop: '1rem', color: '#555', fontSize: '0.9rem', lineHeight: 1.7 }}>{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* 9. Related Categories */}
      {cat.relatedCategories.length > 0 && (
        <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem 4rem' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.5rem', color: '#111' }}>Related Categories</h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {cat.relatedCategories.map((slug) => (
              <Link key={slug} href={`/products/${slug}`} className="cc-related-link">
                {getCategoryName(slug)}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 10. CTA */}
      <section style={{ background: '#f5f5f5', borderTop: '1px solid #e8e8e8' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '5rem 2rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 800, marginBottom: '1rem', color: '#111' }}>
            Ready to Manufacture {getCategoryName(cat.slug)}?
          </h2>
          <p style={{ color: '#555', marginBottom: '2rem', lineHeight: 1.7 }}>
            Tell us your requirements and our team will respond within 24 hours with a quote, fabric options, and production timeline.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-primary" style={{ fontSize: '1rem', padding: '0.875rem 2rem' }}>
              {cat.ctaText}
            </Link>
            <Link href="/products" className="cc-ghost-btn">
              Browse All Categories
            </Link>
          </div>
          <p style={{ marginTop: '1.5rem', color: '#aaa', fontSize: '0.85rem' }}>
            MOQ 50 pcs · Samples in 7-10 days · Factory in Dongguan, China
          </p>
        </div>
      </section>
    </main>
  )
}
