'use client'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import Link from 'next/link'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

const MOCK_PRODUCTS = [
  { id: 'mock-1', name: 'Performance Leggings — Black',    category: 'fitness',    unit_price: 22.00, stock_qty: 48,  description: 'High-waist 4-way stretch nylon/spandex leggings. Moisture-wicking, squat-proof. Sizes XS–XL.', img: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=85', tags: ['Nylon/Spandex', 'High-Waist', 'Squat-Proof'] },
  { id: 'mock-2', name: 'Ribbed Sports Bra — Sage',        category: 'fitness',    unit_price: 16.00, stock_qty: 35,  description: 'Medium-support ribbed sports bra. Removable pads, wide underband. Sizes XS–XL.', img: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&q=85', tags: ['Ribbed Knit', 'Removable Pads', 'Medium Support'] },
  { id: 'mock-3', name: 'Oversized Fleece Hoodie — Ecru',  category: 'streetwear', unit_price: 38.00, stock_qty: 22,  description: '380gsm French terry fleece. Oversized fit, kangaroo pocket, ribbed cuffs. Sizes S–XXL.', img: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&q=85', tags: ['380gsm Fleece', 'Oversized', 'Unisex'] },
  { id: 'mock-4', name: 'Tapered Jogger — Charcoal',       category: 'streetwear', unit_price: 28.00, stock_qty: 40,  description: 'Cotton-blend tapered joggers. Drawstring waist, zip pockets, ribbed ankle cuffs. Sizes S–XXL.', img: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&q=85', tags: ['Cotton Blend', 'Zip Pockets', 'Tapered Leg'] },
  { id: 'mock-5', name: 'Heavyweight Tee — White',         category: 'basics',     unit_price: 12.00, stock_qty: 120, description: '220gsm 100% cotton boxy-fit tee. Pre-shrunk, reinforced neck seam. Sizes XS–XXL.', img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=85', tags: ['220gsm Cotton', 'Boxy Fit', 'Pre-Shrunk'] },
  { id: 'mock-6', name: 'Matching Set — Dusty Rose',       category: 'fitness',    unit_price: 46.00, stock_qty: 15,  description: 'High-waist leggings + sports bra set in seamless ribbed knit. Color-matched. Sizes XS–XL.', img: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=600&q=85', tags: ['Set', 'Seamless', 'Color-Matched'] },
]

function calcPrice(qty: number, unitPrice: number) {
  const discount = qty >= 11 ? 0.70 : qty >= 4 ? 0.85 : 1.0
  return { final: unitPrice * discount, saved: unitPrice * qty * (1 - discount), total: unitPrice * qty * discount, discount }
}

function ProductCard({ p, onAdd }: { p: any; onAdd: (p: any, q: number) => void }) {
  const [qty, setQty] = useState(1)
  const price = calcPrice(qty, p.unit_price)
  const lowStock = p.stock_qty < 20

  return (
    <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 16, overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 2px 16px rgba(0,0,0,0.06)', transition: 'transform 0.25s, box-shadow 0.25s' }}
      onMouseOver={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 36px rgba(0,0,0,0.12)' }}
      onMouseOut={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 16px rgba(0,0,0,0.06)' }}
    >
      <Link href={`/products/in-stock/${p.id}`} style={{ textDecoration: 'none', display: 'block', position: 'relative', overflow: 'hidden' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.img || ''} alt={p.name} style={{ width: '100%', height: 300, objectFit: 'cover', display: 'block', transition: 'transform 0.5s' }}
          onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.06)')}
          onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
        />
        {lowStock && <span style={{ position: 'absolute', top: 12, left: 12, background: '#ff4757', color: '#fff', fontSize: '0.65rem', fontWeight: 700, padding: '3px 10px', borderRadius: 50 }}>LOW STOCK</span>}
        <div style={{ position: 'absolute', bottom: 12, left: 12, display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
          {(p.tags || []).slice(0, 2).map((t: string) => (
            <span key={t} style={{ background: 'rgba(0,0,0,0.55)', color: '#fff', fontSize: '0.6rem', padding: '2px 8px', borderRadius: 50 }}>{t}</span>
          ))}
        </div>
      </Link>
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
        <Link href={`/products/in-stock/${p.id}`} style={{ textDecoration: 'none' }}>
          <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: '#111', margin: 0 }}>{p.name}</h3>
        </Link>
        <p style={{ color: '#777', fontSize: '0.82rem', lineHeight: 1.6, margin: 0, flex: 1 }}>{p.description}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ff4757' }}>${price.final.toFixed(2)}</span>
              {price.discount < 1 && <span style={{ fontSize: '0.8rem', color: '#aaa', textDecoration: 'line-through' }}>${p.unit_price.toFixed(2)}</span>}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#aaa' }}>per piece</div>
          </div>
          <div style={{ fontSize: '0.75rem', color: lowStock ? '#ff4757' : '#aaa' }}>
            {lowStock ? `Only ${p.stock_qty} left` : `${p.stock_qty} in stock`}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.1)', color: '#111', cursor: 'pointer', fontSize: '1rem', lineHeight: 1 }}>−</button>
          <input type="number" value={qty} min={1} max={50} onChange={e => setQty(Math.max(1, Math.min(50, parseInt(e.target.value) || 1)))} style={{ width: 52, textAlign: 'center', background: '#f5f5f5', border: '1px solid rgba(0,0,0,0.1)', color: '#111', borderRadius: 8, padding: '6px 4px', fontSize: '0.9rem' }} />
          <button onClick={() => setQty(Math.min(50, qty + 1))} style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.1)', color: '#111', cursor: 'pointer', fontSize: '1rem', lineHeight: 1 }}>+</button>
          {qty >= 4 && <span style={{ fontSize: '0.72rem', color: '#2a9d5c', fontWeight: 700 }}>{qty >= 11 ? '30% OFF' : '15% OFF'}</span>}
        </div>
        {qty > 1 && (
          <div style={{ background: 'rgba(255,71,87,0.06)', border: '1px solid rgba(255,71,87,0.15)', borderRadius: 8, padding: '0.5rem 0.75rem', fontSize: '0.82rem', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#111' }}>Total: <strong style={{ color: '#ff4757' }}>${price.total.toFixed(2)}</strong></span>
            {price.saved > 0.01 && <span style={{ color: '#2a9d5c' }}>Save ${price.saved.toFixed(2)}</span>}
          </div>
        )}
        <button onClick={() => onAdd(p, qty)} disabled={p.stock_qty === 0} style={{ width: '100%', padding: '11px', borderRadius: 50, background: p.stock_qty === 0 ? 'rgba(0,0,0,0.08)' : 'linear-gradient(135deg,#ff4757,#ff6b6b)', color: p.stock_qty === 0 ? '#aaa' : '#fff', fontWeight: 700, fontSize: '0.85rem', border: 'none', cursor: p.stock_qty === 0 ? 'not-allowed' : 'pointer', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
          {p.stock_qty === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    fetch(`${API}/api/shop/products`)
      .then(r => r.json())
      .then(d => { setProducts(d.data?.length ? d.data : MOCK_PRODUCTS); setLoading(false) })
      .catch(() => { setProducts(MOCK_PRODUCTS); setLoading(false) })
  }, [])

  const addToCart = (product: any, qty: number) => {
    setCartCount(c => c + qty)
    toast.success(`Added ${qty} × ${product.name}`, {
      description: qty >= 11 ? '30% discount applied!' : qty >= 4 ? '15% discount applied!' : undefined,
    })
  }

  return (
    <main style={{ minHeight: '100vh' }}>
      {/* Hero */}
      <section style={{ padding: '7rem 2rem 3.5rem', textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
        <span style={{ display: 'inline-block', background: 'rgba(46,180,95,0.1)', color: '#2a9d5c', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '6px 16px', borderRadius: 50, marginBottom: '1.5rem' }}>
          In Stock — Ships in 3 Days
        </span>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1.1, marginBottom: '1rem', letterSpacing: '-0.5px' }}>
          Shop the Collection
        </h1>
        <p style={{ color: '#777', fontSize: '1rem', lineHeight: 1.75, marginBottom: '2rem' }}>
          No MOQ. Buy 1–50 pieces at tiered wholesale prices. Ready-to-ship from stock.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { range: '1–3 pcs',  label: 'Full Price', bg: 'rgba(0,0,0,0.04)', c: '#666' },
            { range: '4–10 pcs', label: '15% Off',   bg: 'rgba(255,71,87,0.08)', c: '#ff4757' },
            { range: '11–50 pcs', label: '30% Off',   bg: 'rgba(255,71,87,0.15)', c: '#ff4757' },
          ].map(t => (
            <div key={t.range} style={{ background: t.bg, border: '1px solid rgba(0,0,0,0.08)', borderRadius: 12, padding: '0.6rem 1.2rem', textAlign: 'center', minWidth: 110 }}>
              <div style={{ fontSize: '0.72rem', color: '#999', marginBottom: 2 }}>{t.range}</div>
              <div style={{ fontWeight: 800, fontSize: '1rem', color: t.c }}>{t.label}</div>
            </div>
          ))}
        </div>
      </section>

      {cartCount > 0 && (
        <div style={{ padding: '0 3rem 1rem' }}>
          <div style={{ background: 'rgba(42,157,92,0.08)', border: '1px solid rgba(42,157,92,0.2)', borderRadius: 12, padding: '0.75rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#2a9d5c', fontWeight: 700, fontSize: '0.9rem' }}>{cartCount} items in cart</span>
            <Link href="/contact" style={{ color: '#2a9d5c', fontSize: '0.82rem', textDecoration: 'none', fontWeight: 600 }}>Checkout via WhatsApp →</Link>
          </div>
        </div>
      )}

      {/* Full-width product grid */}
      <section style={{ padding: '0 3rem 3rem' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '5rem', color: '#aaa' }}>Loading products…</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px,1fr))', gap: '2rem' }}>
            {products.map(p => <ProductCard key={p.id} p={p} onAdd={addToCart} />)}
          </div>
        )}
      </section>

      {/* Bottom CTA */}
      <section style={{ maxWidth: 860, margin: '0 auto', padding: '0 3rem 6rem' }}>
        <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 24, padding: '3rem 2.5rem', textAlign: 'center', boxShadow: '0 2px 20px rgba(0,0,0,0.06)' }}>
          <h2 style={{ fontWeight: 900, fontSize: '1.4rem', textTransform: 'uppercase', marginBottom: '0.6rem', color: '#111' }}>Need Custom Manufacturing?</h2>
          <p style={{ color: '#777', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: 480, margin: '0 auto 2rem' }}>
            For orders over 50 pieces or fully custom designs, get a personalized quote from our team.
          </p>
          <Link href="/products/custom" style={{ display: 'inline-block', background: 'linear-gradient(135deg,#ff4757,#ff6b6b)', color: '#fff', padding: '13px 32px', borderRadius: 50, fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none', letterSpacing: '0.05em', textTransform: 'uppercase', boxShadow: '0 8px 30px rgba(255,71,87,0.3)' }}>
            Custom Manufacturing →
          </Link>
        </div>
      </section>
    </main>
  )
}
