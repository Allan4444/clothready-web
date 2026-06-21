'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/components/CartContext'
import { useSession, signIn } from 'next-auth/react'
import { Trash2, ShoppingBag, ChevronRight, ShieldCheck } from 'lucide-react'
import { toast } from 'sonner'

type Step = 'cart' | 'shipping' | 'confirm'

const INPUT: React.CSSProperties = {
  width: '100%', padding: '11px 14px', background: '#f6f6f6',
  border: '1px solid rgba(0,0,0,0.1)', borderRadius: 10,
  fontSize: '0.88rem', color: '#111', outline: 'none',
  boxSizing: 'border-box',
}

export default function CartPage() {
  const { items, count, updateQty, removeItem, clearCart } = useCart()
  const { data: session } = useSession()
  const [step, setStep] = useState<Step>('cart')
  const [shipping, setShipping] = useState({
    name: '', company: '', email: '', phone: '',
    address: '', city: '', state: '', zip: '', country: '',
  })
  const [submitting, setSubmitting] = useState(false)

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0)
  const totalQty = count

  function handleCheckout() {
    if (!session) {
      toast.error('Please sign in to proceed to checkout')
      return
    }
    if (items.length === 0) return
    // Pre-fill email from session
    if (session.user?.email && !shipping.email) {
      setShipping(s => ({ ...s, email: session.user?.email || '', name: session.user?.name || '' }))
    }
    setStep('shipping')
  }

  async function handleSubmitOrder(e: React.FormEvent) {
    e.preventDefault()
    const required = ['name','email','phone','address','city','country']
    for (const k of required) {
      if (!shipping[k as keyof typeof shipping]) {
        toast.error('Please fill in all required fields')
        return
      }
    }
    setSubmitting(true)
    await new Promise(r => setTimeout(r, 1200))
    setSubmitting(false)
    setStep('confirm')
    clearCart()
  }

  /* ── Empty cart ── */
  if (items.length === 0 && step === 'cart') {
    return (
      <main style={{ minHeight: '100vh', paddingTop: '5rem', background: '#fafafa' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', padding: '6rem 2rem', textAlign: 'center' }}>
          <ShoppingBag size={64} color="#ddd" style={{ marginBottom: '1.5rem' }} />
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111', marginBottom: '0.75rem' }}>Your cart is empty</h1>
          <p style={{ color: '#888', marginBottom: '2rem' }}>Add products to get started.</p>
          <Link href="/products/custom" style={{ display: 'inline-block', padding: '13px 32px', background: 'linear-gradient(135deg,#ff4757,#ff6b6b)', color: '#fff', borderRadius: 50, fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem' }}>Browse Products</Link>
        </div>
      </main>
    )
  }

  /* ── Order confirmed ── */
  if (step === 'confirm') {
    return (
      <main style={{ minHeight: '100vh', paddingTop: '5rem', background: '#fafafa' }}>
        <div style={{ maxWidth: 560, margin: '0 auto', padding: '6rem 2rem', textAlign: 'center' }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,71,87,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <ShieldCheck size={40} color="#ff4757" />
          </div>
          <h1 style={{ fontSize: '1.7rem', fontWeight: 900, color: '#111', marginBottom: '0.75rem' }}>Order Submitted!</h1>
          <p style={{ color: '#666', lineHeight: 1.7, marginBottom: '0.5rem' }}>Thank you, <strong>{shipping.name}</strong>.</p>
          <p style={{ color: '#666', lineHeight: 1.7, marginBottom: '2rem' }}>Our team will review your order and contact you at <strong>{shipping.email}</strong> within 1 business day with a proforma invoice and payment details.</p>
          <Link href="/products/custom" style={{ display: 'inline-block', padding: '13px 32px', background: 'linear-gradient(135deg,#ff4757,#ff6b6b)', color: '#fff', borderRadius: 50, fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem' }}>Continue Shopping</Link>
        </div>
      </main>
    )
  }

  return (
    <main style={{ minHeight: '100vh', paddingTop: '5rem', background: '#fafafa' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '3rem 1.5rem 6rem' }}>

        {/* Breadcrumb / steps */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', color: '#bbb', marginBottom: '2.5rem' }}>
          <span style={{ color: step === 'cart' ? '#ff4757' : '#111', fontWeight: step === 'cart' ? 700 : 400, cursor: step !== 'cart' ? 'pointer' : 'default' }} onClick={() => setStep('cart')}>Cart ({totalQty})</span>
          <ChevronRight size={14} />
          <span style={{ color: step === 'shipping' ? '#ff4757' : '#bbb', fontWeight: step === 'shipping' ? 700 : 400 }}>Shipping Info</span>
          <ChevronRight size={14} />
          <span style={{ color: step === 'confirm' ? '#ff4757' : '#bbb', fontWeight: step === 'confirm' ? 700 : 400 }}>Confirm</span>
        </div>

        {/* ── CART STEP ── */}
        {step === 'cart' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '2rem', alignItems: 'start' }}>

            {/* Items */}
            <div>
              <h1 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#111', marginBottom: '1.5rem' }}>Shopping Cart</h1>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {items.map((item, idx) => (
                  <div key={idx} style={{ background: '#fff', borderRadius: 16, padding: '1.25rem', border: '1px solid rgba(0,0,0,0.07)', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.img} alt={item.name} style={{ width: 90, height: 90, objectFit: 'cover', borderRadius: 10, flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, color: '#111', fontSize: '0.95rem', marginBottom: '0.25rem' }}>{item.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#999', marginBottom: '0.65rem' }}>
                        SKU: {item.sku} &nbsp;·&nbsp; Color: {item.color} &nbsp;·&nbsp; Size: {item.size}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                        {/* Qty stepper */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <button onClick={() => updateQty(idx, item.qty - 1)}
                            style={{ width: 30, height: 30, borderRadius: '50%', border: '1px solid rgba(0,0,0,0.15)', background: '#f5f5f5', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333' }}>
                            −
                          </button>
                          <span style={{ minWidth: 28, textAlign: 'center', fontWeight: 700, color: '#111' }}>{item.qty}</span>
                          <button onClick={() => updateQty(idx, item.qty + 1)}
                            style={{ width: 30, height: 30, borderRadius: '50%', border: '1px solid rgba(0,0,0,0.15)', background: '#f5f5f5', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333' }}>
                            +
                          </button>
                        </div>
                        <span style={{ fontSize: '0.8rem', color: '#888' }}>${item.price.toFixed(2)} / pc</span>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontWeight: 800, color: '#ff4757', fontSize: '1.05rem', marginBottom: '0.5rem' }}>
                        ${(item.price * item.qty).toFixed(2)}
                      </div>
                      <button onClick={() => removeItem(idx)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ccc', padding: 4 }}
                        title="Remove"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div style={{ background: '#fff', borderRadius: 18, padding: '1.75rem', border: '1px solid rgba(0,0,0,0.07)', position: 'sticky', top: '5.5rem' }}>
              <h2 style={{ fontWeight: 800, color: '#111', fontSize: '1rem', marginBottom: '1.25rem' }}>Order Summary</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.25rem' }}>
                {items.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#666' }}>
                    <span style={{ flex: 1, marginRight: '0.5rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name} × {item.qty}</span>
                    <span style={{ fontWeight: 600, color: '#333', flexShrink: 0 }}>${(item.price * item.qty).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: '1px solid rgba(0,0,0,0.07)', paddingTop: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#888', marginBottom: '0.4rem' }}>
                  <span>Subtotal ({totalQty} pcs)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#888', marginBottom: '1rem' }}>
                  <span>Shipping</span>
                  <span>TBD</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 900, color: '#111', fontSize: '1.05rem' }}>
                  <span>Estimated Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
              </div>

              {!session && (
                <div style={{ background: 'rgba(255,71,87,0.05)', border: '1px solid rgba(255,71,87,0.15)', borderRadius: 10, padding: '0.85rem', marginBottom: '1rem', fontSize: '0.8rem', color: '#ff4757', textAlign: 'center' }}>
                  Please sign in to place your order
                </div>
              )}

              {!session ? (
                <button onClick={() => signIn('google')}
                  style={{ width: '100%', padding: '13px', background: 'linear-gradient(135deg,#ff4757,#ff6b6b)', color: '#fff', border: 'none', borderRadius: 50, fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', boxShadow: '0 6px 20px rgba(255,71,87,0.3)' }}
                >
                  Sign in with Google to Checkout
                </button>
              ) : (
                <button onClick={handleCheckout}
                  style={{ width: '100%', padding: '13px', background: 'linear-gradient(135deg,#ff4757,#ff6b6b)', color: '#fff', border: 'none', borderRadius: 50, fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', boxShadow: '0 6px 20px rgba(255,71,87,0.3)' }}
                >
                  Proceed to Checkout →
                </button>
              )}

              <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.75rem', color: '#bbb', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}>
                <ShieldCheck size={13} /> Secure checkout
              </div>
            </div>
          </div>
        )}

        {/* ── SHIPPING STEP ── */}
        {step === 'shipping' && (
          <form onSubmit={handleSubmitOrder}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '2rem', alignItems: 'start' }}>
              <div>
                <h1 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#111', marginBottom: '1.75rem' }}>Shipping Information</h1>
                <div style={{ background: '#fff', borderRadius: 18, padding: '1.75rem', border: '1px solid rgba(0,0,0,0.07)' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.4rem' }}>Full Name *</label>
                      <input style={INPUT} value={shipping.name} onChange={e => setShipping(s => ({...s, name: e.target.value}))} placeholder="Your full name" required />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.4rem' }}>Company</label>
                      <input style={INPUT} value={shipping.company} onChange={e => setShipping(s => ({...s, company: e.target.value}))} placeholder="Company name" />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.4rem' }}>Email *</label>
                      <input style={INPUT} type="email" value={shipping.email} onChange={e => setShipping(s => ({...s, email: e.target.value}))} placeholder="your@email.com" required />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.4rem' }}>Phone *</label>
                      <input style={INPUT} type="tel" value={shipping.phone} onChange={e => setShipping(s => ({...s, phone: e.target.value}))} placeholder="+1 234 567 8900" required />
                    </div>
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.4rem' }}>Address *</label>
                    <input style={INPUT} value={shipping.address} onChange={e => setShipping(s => ({...s, address: e.target.value}))} placeholder="Street address" required />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.4rem' }}>City *</label>
                      <input style={INPUT} value={shipping.city} onChange={e => setShipping(s => ({...s, city: e.target.value}))} placeholder="City" required />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.4rem' }}>State / Province</label>
                      <input style={INPUT} value={shipping.state} onChange={e => setShipping(s => ({...s, state: e.target.value}))} placeholder="State" />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.4rem' }}>Zip / Postcode</label>
                      <input style={INPUT} value={shipping.zip} onChange={e => setShipping(s => ({...s, zip: e.target.value}))} placeholder="ZIP" />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.4rem' }}>Country *</label>
                    <input style={INPUT} value={shipping.country} onChange={e => setShipping(s => ({...s, country: e.target.value}))} placeholder="Country" required />
                  </div>
                </div>
              </div>

              {/* Summary sidebar */}
              <div style={{ background: '#fff', borderRadius: 18, padding: '1.75rem', border: '1px solid rgba(0,0,0,0.07)', position: 'sticky', top: '5.5rem' }}>
                <h2 style={{ fontWeight: 800, color: '#111', fontSize: '1rem', marginBottom: '1.25rem' }}>Order Summary</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.25rem' }}>
                  {items.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#666' }}>
                      <span style={{ flex: 1, marginRight: '0.5rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name} × {item.qty}</span>
                      <span style={{ fontWeight: 600, color: '#333', flexShrink: 0 }}>${(item.price * item.qty).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div style={{ borderTop: '1px solid rgba(0,0,0,0.07)', paddingTop: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 900, color: '#111', fontSize: '1.05rem' }}>
                    <span>Total</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#aaa', marginTop: '0.4rem' }}>Shipping cost will be confirmed by our team</div>
                </div>
                <button type="submit" disabled={submitting}
                  style={{ width: '100%', padding: '13px', background: submitting ? '#ccc' : 'linear-gradient(135deg,#ff4757,#ff6b6b)', color: '#fff', border: 'none', borderRadius: 50, fontWeight: 700, fontSize: '0.9rem', cursor: submitting ? 'not-allowed' : 'pointer', boxShadow: submitting ? 'none' : '0 6px 20px rgba(255,71,87,0.3)' }}
                >
                  {submitting ? 'Submitting…' : 'Submit Order →'}
                </button>
                <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.75rem', color: '#bbb', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}>
                  <ShieldCheck size={13} /> Our team will send you a proforma invoice
                </div>
              </div>
            </div>
          </form>
        )}

      </div>

      <style>{`
        @media (max-width: 768px) {
          .cart-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
