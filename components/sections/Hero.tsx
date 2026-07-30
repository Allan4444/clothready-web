import Link from 'next/link'

const FEATURES = [
  { icon: 'fa-shirt', label: 'MOQ Starting\nFrom 50 Pieces' },
  { icon: 'fa-medal', label: '15+ Years\nExperience' },
  { icon: 'fa-tag', label: 'Custom OEM &\nPrivate Label' },
  { icon: 'fa-box', label: 'Production Support\nFrom Design To Delivery' },
]

export default function Hero() {
  return (
    <section style={{ background: '#f7f7f7', paddingTop: '9rem', paddingBottom: '4rem' }}>
      <div className="container-1200">
        <div style={{ maxWidth: 640 }}>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3rem)', fontWeight: 900, lineHeight: 1.15, color: '#111', margin: 0 }}>
            Custom Activewear &amp; Streetwear Manufacturer<br />
            <span style={{ color: '#ff4757' }}>for Growing Brands</span>
          </h1>

          <p style={{ marginTop: '1.5rem', color: '#555', fontSize: '1.05rem', lineHeight: 1.75, maxWidth: 560 }}>
            Launch your clothing collection with a trusted China manufacturing partner.
            From 50-piece MOQ to full-scale production, ClothReady helps emerging brands create
            premium apparel with flexible customization and reliable quality control.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', marginTop: '2.5rem' }}>
            {FEATURES.map((f) => (
              <div key={f.icon} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 150 }}>
                <i className={`fas ${f.icon}`} style={{ color: '#ff4757', fontSize: '1.4rem', flexShrink: 0 }} />
                <span style={{ color: '#333', fontSize: '0.85rem', fontWeight: 600, lineHeight: 1.4, whiteSpace: 'pre-line' }}>
                  {f.label}
                </span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2.75rem', flexWrap: 'wrap' }}>
            <Link href="/contact" style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              padding: '1rem 2.25rem', background: '#ff4757', color: '#fff',
              fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.04em',
              textTransform: 'uppercase', textDecoration: 'none', borderRadius: 4,
            }}>
              Get Your Free Quote
            </Link>
            <Link href="/products/custom" style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              padding: '1rem 2.25rem', background: '#fff', color: '#111',
              border: '1px solid rgba(0,0,0,0.15)', fontWeight: 700, fontSize: '0.85rem',
              letterSpacing: '0.04em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: 4,
            }}>
              Explore Our Products
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
