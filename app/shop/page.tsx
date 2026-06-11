'use client'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import Reveal from '@/components/ui/Reveal'
import Link from 'next/link'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

function calcPrice(qty: number, unitPrice: number) {
  let d = 1.0
  if (qty >= 11) d = 0.70
  else if (qty >= 4) d = 0.85
  return { final: unitPrice * d, saved: unitPrice * qty * (1 - d), total: unitPrice * qty * d, discount: d }
}

function PriceTiers() {
  return (
    <div className="grid-3" style={{ margin: '2rem 0' }}>
      {[
        { range: '1–3 pcs', label: 'Full Price', color: 'rgba(255,255,255,0.06)' },
        { range: '4–10 pcs', label: '15% Off', color: 'rgba(255,71,87,0.12)' },
        { range: '11–50 pcs', label: '30% Off', color: 'rgba(255,71,87,0.25)' },
      ].map(t => (
        <div key={t.range} className="card" style={{ background: t.color, textAlign: 'center' }}>
          <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: 4 }}>{t.range}</div>
          <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#ff4757' }}>{t.label}</div>
        </div>
      ))}
    </div>
  )
}

function ProductCard({ p, onAdd }: { p: any; onAdd: (p: any, q: number) => void }) {
  const [qty, setQty] = useState(1)
  const price = calcPrice(qty, p.unit_price)

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ background: '#1a1a1a', borderRadius: 12, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>
        {p.category === 'fitness' ? '🏋️' : '👕'}
      </div>
      <h3 style={{ fontWeight: 700 }}>{p.name}</h3>
      <p style={{ color: '#888', fontSize: '0.9rem', flex: 1 }}>{p.description}</p>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ff4757' }}>
            ${price.final.toFixed(2)}
          </span>
          {price.discount < 1 && (
            <span style={{ fontSize: '0.8rem', color: '#888', marginLeft: 8, textDecoration: 'line-through' }}>
              ${p.unit_price.toFixed(2)}
            </span>
          )}
          <div style={{ fontSize: '0.75rem', color: '#666' }}>per piece</div>
        </div>
        <div style={{ fontSize: '0.8rem', color: p.stock_qty < 20 ? '#ff4757' : '#888' }}>
          {p.stock_qty < 20 ? `Only ${p.stock_qty} left` : `${p.stock_qty} in stock`}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <button onClick={() => setQty(Math.max(1, qty - 1))} className="btn btn-outline" style={{ padding: '6px 12px', minWidth: 0 }}>−</button>
        <input type="number" value={qty} min={1} max={50}
          onChange={e => setQty(Math.max(1, Math.min(50, parseInt(e.target.value) || 1)))}
          style={{ width: 56, textAlign: 'center', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: 8, padding: '6px' }} />
        <button onClick={() => setQty(Math.min(50, qty + 1))} className="btn btn-outline" style={{ padding: '6px 12px', minWidth: 0 }}>+</button>
        {qty >= 4 && (
          <span style={{ fontSize: '0.75rem', color: '#ff4757', fontWeight: 600, marginLeft: 4 }}>
            {qty >= 11 ? '30% OFF!' : '15% OFF!'}
          </span>
        )}
      </div>

      {qty > 1 && (
        <div style={{ background: 'rgba(255,71,87,0.08)', borderRadius: 8, padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}>
          Total: <strong style={{ color: '#ff4757' }}>${price.total.toFixed(2)}</strong>
          {price.saved > 0.01 && <span style={{ color: '#2ed573', marginLeft: 8 }}>Save ${price.saved.toFixed(2)}</span>}
        </div>
      )}

      <button onClick={() => onAdd(p, qty)} disabled={p.stock_qty === 0} className="btn btn-primary" style={{ justifyContent: 'center', width: '100%' }}>
        {p.stock_qty === 0 ? 'Out of Stock' : 'Add to Cart'}
      </button>
    </div>
  )
}

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API}/api/shop/products`)
      .then(r => r.json())
      .then(d => { setProducts(d.data || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const addToCart = (product: any, qty: number) => {
    toast.success(`Added ${qty} × ${product.name} to cart`)
  }

  return (
    <>
      <section className="section" style={{ paddingTop: '8rem' }}>
        <div className="container-1200 text-center">
          <Reveal>
            <div className="section-label">
              <i className="fas fa-store" /> Ready to Ship — 3 Day Delivery
            </div>
            <h1 className="section-title">Shop Collection</h1>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              No MOQ headaches. Buy 1–50 pieces at tiered wholesale prices.
            </p>
            <PriceTiers />
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container-1200">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: '#888' }}>Loading products...</div>
          ) : products.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: '#888' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏪</div>
              <p>Products coming soon. Contact us for custom orders.</p>
              <Link href="/sample-order" className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-flex' }}>
                Request Custom Sample <i className="fas fa-arrow-right" />
              </Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {products.map(p => <ProductCard key={p.id} p={p} onAdd={addToCart} />)}
            </div>
          )}
        </div>
      </section>

      <section className="section bg-darker">
        <div className="container-1200 text-center">
          <Reveal>
            <h2 className="section-title">Need Custom Manufacturing?</h2>
            <p style={{ color: '#888', fontSize: '1.1rem', marginBottom: '2rem', maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
              For orders over 50 pieces or custom designs, get a personalized quote from our team.
            </p>
            <Link href="/sample-order" className="btn btn-white">
              Get Custom Quote <i className="fas fa-arrow-right" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
