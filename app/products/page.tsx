import Link from 'next/link'
import Reveal from '@/components/ui/Reveal'

export const metadata = {
  title: 'Products — Custom Manufacturing & In-Stock Shop',
  description: 'Browse custom OEM manufacturing services and ready-to-ship fitness wear & streetwear. MOQ from 50 pieces or buy 1-50 from stock.',
}

export default function ProductsPage() {
  return (
    <section className="section" style={{ paddingTop: '8rem', minHeight: '80vh' }}>
      <div className="container-1200">
        <Reveal>
          <div className="text-center" style={{ marginBottom: '3rem' }}>
            <div className="section-label"><i className="fas fa-tshirt" /> Our Products</div>
            <h1 className="section-title">How Would You Like to Order?</h1>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Custom manufacturing for your brand, or ready-to-ship from our stock
            </p>
          </div>
        </Reveal>

        <div className="grid-2" style={{ maxWidth: 900, margin: '0 auto' }}>
          <Reveal>
            <Link href="/products/custom" style={{ textDecoration: 'none' }}>
              <div className="card" style={{ textAlign: 'center', padding: '3rem 2rem', cursor: 'pointer', minHeight: 320, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>🏭</div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem', color: '#fff' }}>Custom Manufacturing</h2>
                <p style={{ color: '#888', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                  Your designs, your brand. We manufacture from your tech pack or sketch. MOQ 50 pieces.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  {['OEM/ODM', 'Private Label', 'MOQ 50pcs', 'Your Design'].map(t => (
                    <span key={t} style={{ fontSize: '0.7rem', padding: '4px 10px', background: 'rgba(255,71,87,0.1)', border: '1px solid rgba(255,71,87,0.2)', borderRadius: 50, color: '#ff4757' }}>{t}</span>
                  ))}
                </div>
                <span className="btn btn-primary" style={{ pointerEvents: 'none' }}>
                  Browse & Get Quote <i className="fas fa-arrow-right" />
                </span>
              </div>
            </Link>
          </Reveal>

          <Reveal>
            <Link href="/products/in-stock" style={{ textDecoration: 'none' }}>
              <div className="card" style={{ textAlign: 'center', padding: '3rem 2rem', cursor: 'pointer', minHeight: 320, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>🛒</div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem', color: '#fff' }}>In-Stock Shop</h2>
                <p style={{ color: '#888', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                  Ready-to-ship collection. Buy 1–50 pieces at tiered wholesale prices. Ships in 3 days.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  {['No MOQ', '3-Day Ship', '15-30% Off', 'Buy Now'].map(t => (
                    <span key={t} style={{ fontSize: '0.7rem', padding: '4px 10px', background: 'rgba(46,213,115,0.1)', border: '1px solid rgba(46,213,115,0.2)', borderRadius: 50, color: '#2ed573' }}>{t}</span>
                  ))}
                </div>
                <span className="btn btn-outline" style={{ pointerEvents: 'none', borderColor: '#2ed573', color: '#2ed573' }}>
                  Shop Now <i className="fas fa-shopping-bag" />
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
