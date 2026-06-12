'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { toast } from 'sonner'

const MOCK_PRODUCTS: Record<string, any> = {
  'mock-1': {
    id: 'mock-1',
    name: 'Performance Leggings — Black',
    unit_price: 22.00,
    stock_qty: 48,
    description: 'High-waist 4-way stretch nylon/spandex leggings designed for high-intensity training. Features moisture-wicking fabric, squat-proof construction, and a wide waistband for extra support.',
    material: '80% Nylon, 20% Spandex',
    tags: ['Nylon/Spandex', 'High-Waist', 'Squat-Proof', 'Moisture-Wicking'],
    colors: ['Black', 'Navy', 'Charcoal', 'Burgundy'],
    images: [
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=85',
      'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=85',
      'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=800&q=85',
      'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=85',
    ],
  },
  'mock-2': {
    id: 'mock-2',
    name: 'Ribbed Sports Bra — Sage',
    unit_price: 16.00,
    stock_qty: 35,
    description: 'Medium-support ribbed sports bra with removable pads and a wide underband for a comfortable, secure fit. The ribbed texture adds stretch and structure simultaneously.',
    material: '92% Polyester, 8% Elastane',
    tags: ['Ribbed Knit', 'Removable Pads', 'Medium Support'],
    colors: ['Sage', 'Dusty Rose', 'Ecru', 'Black'],
    images: [
      'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=85',
      'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=800&q=85',
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=85',
    ],
  },
  'mock-3': {
    id: 'mock-3',
    name: 'Oversized Fleece Hoodie — Ecru',
    unit_price: 38.00,
    stock_qty: 22,
    description: '380gsm French terry fleece hoodie with an intentionally oversized silhouette. Features a kangaroo pocket, ribbed cuffs and hem, and a relaxed drawstring hood. Unisex sizing.',
    material: '60% Cotton, 40% Polyester, 380gsm',
    tags: ['380gsm Fleece', 'Oversized', 'Unisex', 'Kangaroo Pocket'],
    colors: ['Ecru', 'Charcoal', 'Black', 'Stone'],
    images: [
      'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&q=85',
      'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=85',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=85',
    ],
  },
  'mock-4': {
    id: 'mock-4',
    name: 'Tapered Jogger — Charcoal',
    unit_price: 28.00,
    stock_qty: 40,
    description: 'Cotton-blend tapered joggers with a drawstring waist, two zip side pockets, and ribbed ankle cuffs. The tapered cut creates a modern silhouette without restricting movement.',
    material: '70% Cotton, 30% Polyester',
    tags: ['Cotton Blend', 'Zip Pockets', 'Tapered Leg', 'Drawstring'],
    colors: ['Charcoal', 'Black', 'Navy', 'Olive'],
    images: [
      'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=85',
      'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&q=85',
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=85',
    ],
  },
  'mock-5': {
    id: 'mock-5',
    name: 'Heavyweight Tee — White',
    unit_price: 12.00,
    stock_qty: 120,
    description: '220gsm 100% ring-spun cotton boxy-fit tee. Pre-shrunk and treated for colorfastness. Features a reinforced neck seam and double-stitched hem for durability.',
    material: '100% Ring-Spun Cotton, 220gsm',
    tags: ['220gsm Cotton', 'Boxy Fit', 'Pre-Shrunk', 'Unisex'],
    colors: ['White', 'Black', 'Ecru', 'Slate'],
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=85',
      'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&q=85',
      'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=85',
    ],
  },
  'mock-6': {
    id: 'mock-6',
    name: 'Matching Set — Dusty Rose',
    unit_price: 46.00,
    stock_qty: 15,
    description: 'High-waist leggings and sports bra set in seamless ribbed knit. Perfectly color-matched for a coordinated look. The seamless construction eliminates chafing and provides a second-skin feel.',
    material: '75% Nylon, 25% Spandex, Seamless',
    tags: ['Set', 'Seamless', 'Color-Matched', 'Ribbed'],
    colors: ['Dusty Rose', 'Sage', 'Lavender', 'Black'],
    images: [
      'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=800&q=85',
      'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=85',
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=85',
    ],
  },
}

const COLOR_MAP: Record<string, string> = {
  Black: '#1a1a1a', Navy: '#1b2a4a', Charcoal: '#3d3d3d', Burgundy: '#6d2b3d',
  Sage: '#8faa8b', 'Dusty Rose': '#c9958a', Ecru: '#d4c9b0', Stone: '#b5a99a',
  White: '#f5f5f5', Slate: '#6b7280', Olive: '#6b7349', Lavender: '#b8a9c9',
}

const SIZES = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL']

function calcTier(qty: number) {
  if (qty >= 11) return { label: '20% OFF', multiplier: 0.80 }
  if (qty >= 4) return { label: '10% OFF', multiplier: 0.90 }
  return { label: 'Full Price', multiplier: 1.0 }
}

export default function ProductDetailPage() {
  const params = useParams()
  const id = params?.id as string
  const product = MOCK_PRODUCTS[id]

  const [activeImg, setActiveImg] = useState(0)
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [sizeQtys, setSizeQtys] = useState<Record<string, number>>(
    Object.fromEntries(SIZES.map(s => [s, 0]))
  )
  const [tab, setTab] = useState<'description' | 'shipping' | 'returns'>('description')

  const totalQty = useMemo(() => Object.values(sizeQtys).reduce((a, b) => a + b, 0), [sizeQtys])
  const tier = calcTier(totalQty)
  const unitFinal = product ? product.unit_price * tier.multiplier : 0
  const totalPrice = unitFinal * totalQty

  if (!product) {
    return (
      <main style={{ background: '#0a0a0a', color: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 900 }}>Product Not Found</h1>
        <Link href="/products/in-stock" style={{ color: '#ff4757', textDecoration: 'none' }}>← Back to Shop</Link>
      </main>
    )
  }

  const toggleColor = (c: string) =>
    setSelectedColors(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c])

  const setSizeQty = (size: string, val: number) =>
    setSizeQtys(prev => ({ ...prev, [size]: Math.max(0, Math.min(50, val)) }))

  const handleOrder = () => {
    if (totalQty === 0) { toast.error('Please select at least 1 item'); return }
    if (selectedColors.length === 0) { toast.error('Please select at least one color'); return }
    const breakdown = SIZES.filter(s => sizeQtys[s] > 0).map(s => `${s}×${sizeQtys[s]}`).join(', ')
    const msg = `Hi! I'd like to order:\n${product.name}\nSizes: ${breakdown}\nColors: ${selectedColors.join(', ')}\nTotal: ${totalQty} pcs — $${totalPrice.toFixed(2)}`
    const waUrl = `https://wa.me/8613412044008?text=${encodeURIComponent(msg)}`
    window.open(waUrl, '_blank')
    toast.success('Opening WhatsApp…')
  }

  return (
    <main style={{ background: '#0a0a0a', color: '#fff', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* Breadcrumb */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '7rem 2rem 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#555', marginBottom: '2rem' }}>
          <Link href="/" style={{ color: '#555', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <Link href="/products/in-stock" style={{ color: '#555', textDecoration: 'none' }}>In Stock</Link>
          <span>/</span>
          <span style={{ color: '#aaa' }}>{product.name}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>

          {/* ── Left: Image Gallery ── */}
          <div>
            <div style={{ borderRadius: 16, overflow: 'hidden', marginBottom: '1rem', background: '#111', aspectRatio: '4/5', position: 'relative' }}>
              <img
                src={product.images[activeImg]}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'opacity 0.3s' }}
              />
              {product.stock_qty < 20 && (
                <span style={{ position: 'absolute', top: 14, left: 14, background: '#ff4757', color: '#fff', fontSize: '0.7rem', fontWeight: 700, padding: '4px 12px', borderRadius: 50 }}>LOW STOCK</span>
              )}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {product.images.map((img: string, i: number) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  style={{ flex: 1, aspectRatio: '1', borderRadius: 10, overflow: 'hidden', border: activeImg === i ? '2px solid #ff4757' : '2px solid transparent', cursor: 'pointer', padding: 0, background: 'none' }}>
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </button>
              ))}
            </div>
          </div>

          {/* ── Right: Product Info ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                {product.tags.map((t: string) => (
                  <span key={t} style={{ background: 'rgba(255,255,255,0.07)', color: '#aaa', fontSize: '0.68rem', padding: '3px 10px', borderRadius: 50 }}>{t}</span>
                ))}
              </div>
              <h1 style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 900, lineHeight: 1.2, marginBottom: '0.5rem' }}>{product.name}</h1>
              <p style={{ color: '#666', fontSize: '0.85rem' }}>Material: {product.material}</p>
            </div>

            {/* Tier pricing display */}
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '1rem 1.25rem' }}>
              <div style={{ fontSize: '0.72rem', color: '#555', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Tiered Pricing</div>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {[
                  { range: '1–3 pcs', label: 'Full Price', price: product.unit_price, highlight: totalQty > 0 && totalQty <= 3 },
                  { range: '4–10 pcs', label: '10% OFF', price: product.unit_price * 0.90, highlight: totalQty >= 4 && totalQty <= 10 },
                  { range: '11+ pcs', label: '20% OFF', price: product.unit_price * 0.80, highlight: totalQty >= 11 },
                ].map(t => (
                  <div key={t.range} style={{ flex: 1, minWidth: 90, background: t.highlight ? 'rgba(255,71,87,0.12)' : 'rgba(255,255,255,0.03)', border: t.highlight ? '1px solid rgba(255,71,87,0.4)' : '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '0.6rem 0.75rem', textAlign: 'center', transition: 'all 0.2s' }}>
                    <div style={{ fontSize: '0.65rem', color: '#555', marginBottom: 2 }}>{t.range}</div>
                    <div style={{ fontWeight: 800, color: t.highlight ? '#ff4757' : '#888', fontSize: '0.85rem' }}>{t.label}</div>
                    <div style={{ fontSize: '0.75rem', color: t.highlight ? '#fff' : '#555' }}>${t.price.toFixed(2)}/pc</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Color selector */}
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.6rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Color {selectedColors.length > 0 && <span style={{ color: '#ff4757' }}>({selectedColors.join(', ')})</span>}
              </div>
              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                {product.colors.map((c: string) => (
                  <button key={c} onClick={() => toggleColor(c)} title={c}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '5px 12px 5px 5px', borderRadius: 50, border: selectedColors.includes(c) ? '2px solid #ff4757' : '2px solid rgba(255,255,255,0.15)', background: selectedColors.includes(c) ? 'rgba(255,71,87,0.1)' : 'transparent', cursor: 'pointer', transition: 'all 0.2s' }}>
                    <span style={{ width: 18, height: 18, borderRadius: '50%', background: COLOR_MAP[c] || '#888', display: 'inline-block', border: c === 'White' || c === 'Ecru' ? '1px solid rgba(255,255,255,0.2)' : 'none' }} />
                    <span style={{ fontSize: '0.75rem', color: selectedColors.includes(c) ? '#fff' : '#888' }}>{c}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size quantity inputs */}
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.75rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Size & Quantity</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                {SIZES.map(size => (
                  <div key={size} style={{ background: sizeQtys[size] > 0 ? 'rgba(255,71,87,0.08)' : 'rgba(255,255,255,0.03)', border: sizeQtys[size] > 0 ? '1px solid rgba(255,71,87,0.3)' : '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '0.75rem', transition: 'all 0.2s' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: sizeQtys[size] > 0 ? '#ff4757' : '#666', marginBottom: '0.4rem', textAlign: 'center' }}>{size}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', justifyContent: 'center' }}>
                      <button onClick={() => setSizeQty(size, sizeQtys[size] - 1)}
                        style={{ width: 26, height: 26, borderRadius: 6, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', cursor: 'pointer', fontSize: '0.9rem', lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                      <input type="number" value={sizeQtys[size]} min={0} max={50}
                        onChange={e => setSizeQty(size, parseInt(e.target.value) || 0)}
                        style={{ width: 36, textAlign: 'center', background: 'transparent', border: 'none', color: '#fff', fontSize: '0.9rem', fontWeight: 700, outline: 'none' }} />
                      <button onClick={() => setSizeQty(size, sizeQtys[size] + 1)}
                        style={{ width: 26, height: 26, borderRadius: 6, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', cursor: 'pointer', fontSize: '0.9rem', lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order summary */}
            {totalQty > 0 && (
              <div style={{ background: 'rgba(255,71,87,0.07)', border: '1px solid rgba(255,71,87,0.2)', borderRadius: 14, padding: '1rem 1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <span style={{ color: '#aaa', fontSize: '0.85rem' }}>Total quantity</span>
                  <span style={{ fontWeight: 700 }}>{totalQty} pcs</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <span style={{ color: '#aaa', fontSize: '0.85rem' }}>Unit price</span>
                  <span style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    {tier.multiplier < 1 && <span style={{ color: '#555', textDecoration: 'line-through', fontSize: '0.8rem' }}>${product.unit_price.toFixed(2)}</span>}
                    <span style={{ fontWeight: 700, color: '#ff4757' }}>${unitFinal.toFixed(2)}</span>
                    <span style={{ background: '#ff4757', color: '#fff', fontSize: '0.65rem', fontWeight: 700, padding: '2px 8px', borderRadius: 50 }}>{tier.label}</span>
                  </span>
                </div>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: '0.6rem', paddingTop: '0.6rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 700, fontSize: '1rem' }}>Total</span>
                  <span style={{ fontWeight: 900, fontSize: '1.4rem', color: '#ff4757' }}>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            )}

            {/* CTA */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={handleOrder}
                style={{ flex: 1, padding: '14px', borderRadius: 50, background: 'linear-gradient(135deg,#ff4757,#ff6b6b)', color: '#fff', fontWeight: 700, fontSize: '0.9rem', border: 'none', cursor: 'pointer', letterSpacing: '0.04em', textTransform: 'uppercase', boxShadow: '0 8px 24px rgba(255,71,87,0.3)' }}>
                <i className="fab fa-whatsapp" style={{ marginRight: 8 }} />
                Order via WhatsApp
              </button>
              <Link href="/products/in-stock"
                style={{ padding: '14px 20px', borderRadius: 50, border: '1px solid rgba(255,255,255,0.15)', color: '#aaa', textDecoration: 'none', display: 'flex', alignItems: 'center', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
                ← Back
              </Link>
            </div>

            <div style={{ fontSize: '0.78rem', color: '#555', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <span><i className="fas fa-truck" style={{ marginRight: 5 }} />Ships in 3 days</span>
              <span><i className="fas fa-shield-alt" style={{ marginRight: 5 }} />Quality guaranteed</span>
              <span><i className="fas fa-box" style={{ marginRight: 5 }} />{product.stock_qty} in stock</span>
            </div>
          </div>
        </div>

        {/* ── Tabs: Description / Shipping / Returns ── */}
        <div style={{ marginTop: '4rem' }}>
          <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: '2rem', gap: '0' }}>
            {(['description', 'shipping', 'returns'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)}
                style={{ padding: '0.75rem 1.5rem', background: 'none', border: 'none', borderBottom: tab === t ? '2px solid #ff4757' : '2px solid transparent', color: tab === t ? '#fff' : '#555', fontWeight: tab === t ? 700 : 400, fontSize: '0.875rem', cursor: 'pointer', textTransform: 'capitalize', transition: 'color 0.2s', marginBottom: -1, letterSpacing: '0.03em' }}>
                {t === 'description' ? 'Description' : t === 'shipping' ? 'Shipping Information' : 'Return Policy'}
              </button>
            ))}
          </div>

          <div style={{ maxWidth: 720, color: '#aaa', lineHeight: 1.85, fontSize: '0.9rem' }}>
            {tab === 'description' && (
              <div>
                <p style={{ marginBottom: '1rem' }}>{product.description}</p>
                <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <li>Material: {product.material}</li>
                  <li>Available sizes: {SIZES.join(', ')}</li>
                  <li>Available colors: {product.colors.join(', ')}</li>
                  <li>MOQ: 1 piece — no minimum order required</li>
                  <li>Max order: 50 pieces per SKU</li>
                </ul>
              </div>
            )}
            {tab === 'shipping' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { icon: 'fa-clock', title: 'Processing Time', body: 'In-stock orders are processed and dispatched within 1–2 business days of payment confirmation.' },
                  { icon: 'fa-plane', title: 'International Shipping', body: 'We ship worldwide via DHL Express (3–5 days) and ePacket (7–14 days). Shipping cost calculated at checkout based on destination and weight.' },
                  { icon: 'fa-ship', title: 'Sea Freight (10+ pcs)', body: 'Orders of 10+ pieces may qualify for consolidated sea freight. Contact us via WhatsApp for a freight quote before placing your order.' },
                  { icon: 'fa-file-alt', title: 'Customs & Duties', body: 'Import duties and taxes are the buyer\'s responsibility. We provide accurate commercial invoices to facilitate customs clearance.' },
                ].map(item => (
                  <div key={item.title} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '1rem 1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                      <i className={`fas ${item.icon}`} style={{ color: '#ff4757', fontSize: '0.85rem', width: 16 }} />
                      <span style={{ fontWeight: 700, color: '#ddd', fontSize: '0.875rem' }}>{item.title}</span>
                    </div>
                    <p style={{ margin: 0, paddingLeft: '1.6rem' }}>{item.body}</p>
                  </div>
                ))}
              </div>
            )}
            {tab === 'returns' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { icon: 'fa-check-circle', title: 'Defect & Quality Issues', body: 'If you receive items with manufacturing defects, wrong items, or items that significantly differ from the product description, we will offer a full replacement or refund. Contact us within 7 days of delivery with photos.' },
                  { icon: 'fa-times-circle', title: 'Change of Mind', body: 'As a B2B wholesale platform, we do not accept returns for change of mind or incorrect size selection. Please review our size guides carefully before ordering.' },
                  { icon: 'fa-exclamation-triangle', title: 'Damaged in Transit', body: 'Inspect your order upon arrival. If items arrive damaged due to shipping, document the damage and contact us within 48 hours. We will work with the courier to resolve the claim.' },
                  { icon: 'fa-comments', title: 'How to Contact Us', body: 'For any return or refund queries, please WhatsApp us at +86 134 1204 4008 or email info@clothready.com. Include your order reference and photos of any issues.' },
                ].map(item => (
                  <div key={item.title} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '1rem 1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                      <i className={`fas ${item.icon}`} style={{ color: '#ff4757', fontSize: '0.85rem', width: 16 }} />
                      <span style={{ fontWeight: 700, color: '#ddd', fontSize: '0.875rem' }}>{item.title}</span>
                    </div>
                    <p style={{ margin: 0, paddingLeft: '1.6rem' }}>{item.body}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .product-detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
