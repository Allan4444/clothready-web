import Link from 'next/link'

const FEATURES = [
  { icon: 'fa-shirt', label: 'MOQ Starting\nFrom 50 Pieces' },
  { icon: 'fa-medal', label: '15+ Years\nExperience' },
  { icon: 'fa-tag', label: 'Custom OEM &\nPrivate Label' },
  { icon: 'fa-box', label: 'Production Support\nFrom Design To Delivery' },
]

export default function Hero() {
  return (
    <section className="hero-section relative flex items-center justify-center overflow-hidden pt-40 pb-8">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center opacity-95"
        style={{ backgroundImage: "url('https://tnsrlwrpwynpridhsbmt.supabase.co/storage/v1/object/public/product-images/1785580004231-bar05.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/15 to-black/40" />

      <div className="container-1200 relative z-10 text-center">
        <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontWeight: 900, lineHeight: 1.5, color: '#fff', margin: 0 }}>
          Custom Activewear &amp; Streetwear Manufacturer<br />
          <span style={{ color: '#ff4757' }}>for Growing Brands</span>
        </h1>

        <p style={{ marginTop: '2rem', color: 'rgba(255,255,255,0.8)', fontSize: '1.05rem', lineHeight: 2 }}>
          Launch your clothing collection with a trusted China manufacturing partner.
          From 50-piece MOQ to full-scale production, ClothReady helps emerging brands create
          premium apparel with flexible customization and reliable quality control.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', marginTop: '3.25rem' }}>
          {FEATURES.map((f) => (
            <div key={f.icon} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 150 }}>
              <i className={`fas ${f.icon}`} style={{ color: '#ff4757', fontSize: '1.4rem', flexShrink: 0 }} />
              <span style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 600, lineHeight: 1.4, whiteSpace: 'pre-line', textAlign: 'left' }}>
                {f.label}
              </span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '3.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/contact" className="hero-cta hero-cta-primary">
            Get Your Free Quote
          </Link>
          <Link href="/products/custom" className="hero-cta hero-cta-outline">
            Explore Our Products
          </Link>
        </div>
      </div>

      <style>{`
        .hero-section { height: 1020px; }
        @media (max-width: 900px) {
          .hero-section { height: auto; min-height: 92vh; }
        }
        .hero-cta {
          display: inline-flex; align-items: center; justify-content: center;
          padding: 1rem 2.25rem; font-weight: 700; font-size: 0.85rem;
          letter-spacing: 0.04em; text-transform: uppercase; text-decoration: none;
          border-radius: 50px; transition: transform 0.25s, box-shadow 0.25s, background 0.25s;
        }
        .hero-cta-primary { background: #ff4757; color: #fff; }
        .hero-cta-primary:hover { transform: translateY(-3px); box-shadow: 0 10px 28px rgba(255,71,87,0.4); }
        .hero-cta-outline { background: rgba(255,255,255,0.04); color: #fff; border: 1px solid rgba(255,255,255,0.25); }
        .hero-cta-outline:hover { transform: translateY(-3px); background: rgba(255,255,255,0.1); box-shadow: 0 10px 28px rgba(0,0,0,0.3); }
      `}</style>
    </section>
  )
}
