'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { toast } from 'sonner'

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']

const COLORS = [
  { name: 'Black',        hex: '#1a1a1a' },
  { name: 'White',        hex: '#f0f0f0', border: true },
  { name: 'Navy',         hex: '#1e3a5f' },
  { name: 'Charcoal',     hex: '#4a4a4a' },
  { name: 'Red',          hex: '#e53935' },
  { name: 'Royal Blue',   hex: '#1565c0' },
  { name: 'Forest Green', hex: '#2e7d32' },
  { name: 'Burgundy',     hex: '#880e4f' },
  { name: 'Beige',        hex: '#d4b896' },
  { name: 'Pink',         hex: '#f48fb1' },
  { name: 'Olive',        hex: '#6d7c3a' },
  { name: 'Camel',        hex: '#c8a96e' },
]

const TIERS = [
  { label: '≥ 1 pcs',  disc: '',       mult: 1.00 },
  { label: '≥ 5 pcs',  disc: '10% OFF', mult: 0.90 },
  { label: '≥ 10 pcs', disc: '20% OFF', mult: 0.80 },
  { label: '≥ 30 pcs', disc: '30% OFF', mult: 0.70 },
]

function getActiveTier(qty: number) {
  if (qty >= 30) return 3
  if (qty >= 10) return 2
  if (qty >= 5)  return 1
  return 0
}

const MOCK: Record<string, { name: string; sku: string; basePrice: number; imgs: string[]; description: string; details: string[] }> = {
  leggings: {
    name: 'Leggings & Yoga Pants', sku: 'CL-LEG-001', basePrice: 14,
    imgs: [
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=85',
      'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=800&q=85',
      'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=85',
    ],
    description: 'High-performance leggings and yoga pants crafted from premium Nylon/Spandex blend. 4-way stretch construction allows full freedom of movement during any workout. Flatlock seams prevent chafing. Available in custom colors with your brand label.',
    details: ['Fabric: 80% Nylon / 20% Spandex', 'Weight: 230–280 gsm', '4-way stretch, moisture-wicking', 'Wide elastic waistband, no-roll', 'MOQ: 50 pcs per colorway', 'Lead time: 20–30 days'],
  },
  'sports-bra': {
    name: 'Sports Bras & Tops', sku: 'CL-BRA-001', basePrice: 10,
    imgs: [
      'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=85',
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=85',
      'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=800&q=85',
    ],
    description: 'Supportive sports bras and crop tops engineered for high-impact activities. Breathable mesh panels enhance airflow. Removable pads included. Custom logo, label, and colorways available.',
    details: ['Fabric: 75% Polyester / 25% Spandex', 'Weight: 200–240 gsm', 'Breathable mesh lining', 'Removable padding included', 'MOQ: 50 pcs per colorway', 'Lead time: 20–30 days'],
  },
  hoodie: {
    name: 'Hoodies & Sweatshirts', sku: 'CL-HOD-001', basePrice: 20,
    imgs: [
      'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&q=85',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=85',
      'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=85',
    ],
    description: 'Premium hoodies and sweatshirts in heavyweight French terry and fleece. Drop-shoulder or standard fit. Embroidery, screen print, and heat transfer customization available.',
    details: ['Fabric: French Terry / Fleece', 'Weight: 280–380 gsm', 'Ribbed cuffs and hem', 'Kangaroo pocket optional', 'MOQ: 50 pcs per colorway', 'Lead time: 25–35 days'],
  },
  joggers: {
    name: 'Joggers & Track Pants', sku: 'CL-JOG-001', basePrice: 16,
    imgs: [
      'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=85',
      'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&q=85',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=85',
    ],
    description: 'Comfortable joggers and track pants in cotton blend and ripstop nylon. Elastic waistband with drawstring. Tapered or straight leg. Side pockets and back pocket available.',
    details: ['Fabric: Cotton Blend / Ripstop Nylon', 'Weight: 250–320 gsm', 'Elastic waistband + drawstring', 'Side zip pockets optional', 'MOQ: 50 pcs per colorway', 'Lead time: 20–30 days'],
  },
  tshirt: {
    name: 'T-Shirts & Tanks', sku: 'CL-TEE-001', basePrice: 7,
    imgs: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=85',
      'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=85',
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=85',
    ],
    description: 'Classic and fashion-fit tees and tanks in 100% cotton and cotton-poly blends. Screen print, DTG, embroidery, and heat transfer options. Your brand woven label and hang tag included.',
    details: ['Fabric: 100% Cotton / Cotton-Poly Blend', 'Weight: 160–220 gsm', 'Crew neck / V-neck / round hem', 'Pre-shrunk', 'MOQ: 50 pcs per colorway', 'Lead time: 15–25 days'],
  },
  jacket: {
    name: 'Jackets & Outerwear', sku: 'CL-JAC-001', basePrice: 38,
    imgs: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=85',
      'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&q=85',
      'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=85',
    ],
    description: 'Technical and fashion outerwear in windbreaker nylon, softshell, and down-fill construction. YKK zippers. Custom lining, logo patch, and labeling available.',
    details: ['Fabric: Windbreaker Nylon / Softshell', 'Water-resistant DWR coating', 'YKK zippers', 'Custom lining options', 'MOQ: 100 pcs per colorway', 'Lead time: 30–40 days'],
  },
  shorts: {
    name: 'Shorts & Skorts', sku: 'CL-SHO-001', basePrice: 9,
    imgs: [
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=85',
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=85',
      'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=85',
    ],
    description: 'Quick-dry shorts and skorts for running, training, and casual wear. Built-in liner available. Side pockets and back zip pocket options. Full color sublimation available.',
    details: ['Fabric: Quick-dry Polyester / Woven Stretch', 'Weight: 140–180 gsm', 'Built-in liner optional', 'Side + back zip pockets', 'MOQ: 50 pcs per colorway', 'Lead time: 15–25 days'],
  },
  sets: {
    name: 'Matching Sets', sku: 'CL-SET-001', basePrice: 29,
    imgs: [
      'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=800&q=85',
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=85',
      'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=85',
    ],
    description: 'Coordinated two-piece matching sets in seamless knit and ribbed fabric. Perfect for your brand\'s core activewear collection. All pieces color-matched from the same dye lot.',
    details: ['Fabric: Seamless Knit / Ribbed Jersey', 'Weight: 220–260 gsm', 'Same-dye-lot color matching', 'Bra + leggings / shorts options', 'MOQ: 50 sets per colorway', 'Lead time: 25–35 days'],
  },
}

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const product = MOCK[id as string]

  const [activeImg, setActiveImg]     = useState(0)
  const [qty, setQty]                 = useState(1)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [selectedSize, setSelectedSize]   = useState<string | null>(null)

  if (!product) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '5rem' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ color: '#111', marginBottom: '1rem' }}>Product not found</h1>
          <Link href="/products/custom" style={{ color: '#ff4757', textDecoration: 'none' }}>← Back to Products</Link>
        </div>
      </main>
    )
  }

  const activeTier = getActiveTier(qty)
  const unitPrice  = (product.basePrice * TIERS[activeTier].mult).toFixed(2)

  return (
    <main style={{ minHeight: '100vh', paddingTop: '5rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '3rem 2rem 6rem' }}>

        {/* Breadcrumb */}
        <div style={{ fontSize: '0.8rem', color: '#999', marginBottom: '2.5rem' }}>
          <Link href="/products/custom" style={{ color: '#999', textDecoration: 'none' }}>Products</Link>
          <span style={{ margin: '0 0.5rem' }}>›</span>
          <span style={{ color: '#333' }}>{product.name}</span>
        </div>

        <div className="pd-grid">

          {/* ── Left: image gallery ── */}
          <div>
            <div style={{ borderRadius: 18, overflow: 'hidden', background: '#f5f5f5', aspectRatio: '4/5' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.imgs[activeImg]}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'opacity 0.25s' }}
              />
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem' }}>
              {product.imgs.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  style={{ flex: 1, aspectRatio: '1', borderRadius: 10, overflow: 'hidden', border: i === activeImg ? '2px solid #ff4757' : '2px solid transparent', cursor: 'pointer', padding: 0, background: 'none', transition: 'border-color 0.2s' }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </button>
              ))}
            </div>
          </div>

          {/* ── Right: details ── */}
          <div>
            <div style={{ fontSize: '0.72rem', color: '#aaa', letterSpacing: '0.12em', marginBottom: '0.35rem', textTransform: 'uppercase' }}>SKU: {product.sku}</div>
            <h1 style={{ fontSize: 'clamp(1.5rem,3vw,2.1rem)', fontWeight: 900, color: '#111', marginBottom: '1.75rem', lineHeight: 1.2 }}>
              {product.name}
            </h1>

            {/* Tiered pricing */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '0.5rem', marginBottom: '1.75rem' }}>
              {TIERS.map((t, i) => (
                <div key={i} style={{ textAlign: 'center', padding: '0.8rem 0.25rem', borderRadius: 12, background: i === activeTier ? 'rgba(255,71,87,0.06)' : '#f8f8f8', border: `1.5px solid ${i === activeTier ? 'rgba(255,71,87,0.35)' : 'rgba(0,0,0,0.08)'}`, transition: 'all 0.2s' }}>
                  <div style={{ fontSize: '0.62rem', color: i === activeTier ? '#ff4757' : '#aaa', fontWeight: 700, marginBottom: '0.3rem', letterSpacing: '0.04em' }}>{t.label}</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 900, color: i === activeTier ? '#ff4757' : '#111' }}>
                    ${(product.basePrice * t.mult).toFixed(2)}
                  </div>
                  {t.disc && <div style={{ fontSize: '0.58rem', color: '#ff4757', fontWeight: 700, marginTop: '0.2rem' }}>{t.disc}</div>}
                </div>
              ))}
            </div>

            {/* Quantity */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#777', fontWeight: 600, marginBottom: '0.6rem' }}>Quantity</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(0,0,0,0.15)', background: '#fff', cursor: 'pointer', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333' }}>−</button>
                <span style={{ minWidth: 44, textAlign: 'center', fontSize: '1.05rem', fontWeight: 700, color: '#111' }}>{qty}</span>
                <button onClick={() => setQty(q => q + 1)} style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(0,0,0,0.15)', background: '#fff', cursor: 'pointer', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333' }}>+</button>
                <span style={{ fontSize: '0.8rem', color: '#999' }}>Unit: <strong style={{ color: '#111' }}>${unitPrice}</strong></span>
              </div>
            </div>

            {/* Color */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#777', fontWeight: 600, marginBottom: '0.6rem' }}>
                Color{selectedColor ? `: ${selectedColor}` : ''}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {COLORS.map(c => (
                  <button
                    key={c.name}
                    title={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    style={{
                      width: 30, height: 30, borderRadius: 7,
                      background: c.hex,
                      border: selectedColor === c.name ? '2.5px solid #ff4757' : `1.5px solid ${c.border ? '#ccc' : 'transparent'}`,
                      cursor: 'pointer',
                      outline: selectedColor === c.name ? '2px solid rgba(255,71,87,0.25)' : 'none',
                      outlineOffset: 2,
                      transition: 'all 0.15s',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Size */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#777', fontWeight: 600, marginBottom: '0.6rem' }}>Size</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {SIZES.map(s => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    style={{
                      padding: '8px 16px', borderRadius: 8,
                      border: `1.5px solid ${selectedSize === s ? '#ff4757' : 'rgba(0,0,0,0.14)'}`,
                      background: selectedSize === s ? 'rgba(255,71,87,0.06)' : '#fff',
                      color: selectedSize === s ? '#ff4757' : '#333',
                      fontWeight: selectedSize === s ? 700 : 500,
                      fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.15s',
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2.5rem' }}>
              <button
                onClick={() => toast.success('Added! Our team will send a quote within 24 hours.')}
                style={{ width: '100%', padding: '15px', background: 'linear-gradient(135deg,#ff4757,#ff6b6b)', color: '#fff', border: 'none', borderRadius: 50, fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', letterSpacing: '0.06em', textTransform: 'uppercase', boxShadow: '0 6px 24px rgba(255,71,87,0.3)', transition: 'transform 0.2s,box-shadow 0.2s' }}
                onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 32px rgba(255,71,87,0.4)' }}
                onMouseOut={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(255,71,87,0.3)' }}
              >
                Add to Cart
              </button>
              <Link
                href={`/sample-order?product=${id}`}
                style={{ width: '100%', padding: '15px', background: '#fff', color: '#111', border: '1.5px solid rgba(0,0,0,0.18)', borderRadius: 50, fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none', letterSpacing: '0.06em', textTransform: 'uppercase', textAlign: 'center', display: 'block', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
              >
                Order a Sample
              </Link>
            </div>

            {/* Description */}
            <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '1.75rem' }}>
              <h3 style={{ fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#111', marginBottom: '0.9rem' }}>Description</h3>
              <p style={{ color: '#555', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '1.1rem' }}>{product.description}</p>
              <ul style={{ paddingLeft: '1.2rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                {product.details.map(d => (
                  <li key={d} style={{ color: '#666', fontSize: '0.85rem', lineHeight: 1.5 }}>{d}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .pd-grid {
          display: grid;
          grid-template-columns: 55% 45%;
          gap: 3.5rem;
          align-items: start;
        }
        @media (max-width: 768px) {
          .pd-grid { grid-template-columns: 1fr; gap: 2rem; }
        }
      `}</style>
    </main>
  )
}
