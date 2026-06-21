'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/components/CartContext'
import { ShoppingBag, LogOut, Package, ChevronRight, User } from 'lucide-react'

export default function AccountPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { items, count } = useCart()

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')
  }, [status, router])

  if (status === 'loading') {
    return (
      <main style={{ minHeight: '100vh', paddingTop: '5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#aaa', fontSize: '0.9rem' }}>Loading…</div>
      </main>
    )
  }

  if (!session) return null

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <main style={{ minHeight: '100vh', paddingTop: '5rem', background: '#f7f7f8' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '3rem 1.5rem 6rem' }}>

        {/* Profile header */}
        <div style={{ background: '#fff', borderRadius: 20, padding: '2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
          <div style={{ position: 'relative', flexShrink: 0 }}>
            {session.user?.image
              ? <img src={session.user.image} alt="" style={{ width: 80, height: 80, borderRadius: '50%', display: 'block' }} />
              : <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg,#ff4757,#ff6b6b)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', fontWeight: 900, color: '#fff' }}>
                  {(session.user?.name || 'U')[0].toUpperCase()}
                </div>
            }
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 900, fontSize: '1.3rem', color: '#111', marginBottom: '0.2rem' }}>{session.user?.name}</div>
            <div style={{ color: '#888', fontSize: '0.88rem' }}>{session.user?.email}</div>
            <div style={{ marginTop: '0.5rem', display: 'inline-block', fontSize: '0.72rem', fontWeight: 700, color: '#ff4757', background: 'rgba(255,71,87,0.08)', borderRadius: 20, padding: '3px 10px', letterSpacing: '0.05em' }}>B2B Member</div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '9px 16px', border: '1px solid rgba(0,0,0,0.12)', borderRadius: 10, background: '#fff', color: '#777', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', flexShrink: 0 }}
          >
            <LogOut size={15} /> Sign Out
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>

          {/* Cart summary */}
          <div style={{ background: '#fff', borderRadius: 20, padding: '1.75rem', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShoppingBag size={18} color="#ff4757" />
                <span style={{ fontWeight: 800, color: '#111', fontSize: '0.95rem' }}>Current Cart</span>
              </div>
              <Link href="/cart" style={{ fontSize: '0.78rem', color: '#ff4757', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                View Cart <ChevronRight size={14} />
              </Link>
            </div>
            {items.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem 0', color: '#bbb', fontSize: '0.85rem' }}>
                <ShoppingBag size={32} color="#e0e0e0" style={{ margin: '0 auto 0.75rem' }} />
                Cart is empty
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
                  {items.slice(0, 3).map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img src={item.img} alt={item.name} style={{ width: 44, height: 44, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 600, fontSize: '0.82rem', color: '#111', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</div>
                        <div style={{ fontSize: '0.72rem', color: '#999' }}>{item.color} · {item.size} · ×{item.qty}</div>
                      </div>
                      <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#ff4757', flexShrink: 0 }}>${(item.price * item.qty).toFixed(2)}</div>
                    </div>
                  ))}
                  {items.length > 3 && <div style={{ fontSize: '0.75rem', color: '#aaa', textAlign: 'center' }}>+{items.length - 3} more items</div>}
                </div>
                <div style={{ borderTop: '1px solid rgba(0,0,0,0.07)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.82rem', color: '#888' }}>{count} pcs total</span>
                  <span style={{ fontWeight: 900, color: '#111', fontSize: '1rem' }}>${subtotal.toFixed(2)}</span>
                </div>
                <Link href="/cart"
                  style={{ display: 'block', marginTop: '1rem', padding: '11px', background: 'linear-gradient(135deg,#ff4757,#ff6b6b)', color: '#fff', borderRadius: 50, fontWeight: 700, fontSize: '0.88rem', textDecoration: 'none', textAlign: 'center', boxShadow: '0 4px 14px rgba(255,71,87,0.3)' }}
                >
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </div>

          {/* Order history placeholder */}
          <div style={{ background: '#fff', borderRadius: 20, padding: '1.75rem', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <Package size={18} color="#ff4757" />
              <span style={{ fontWeight: 800, color: '#111', fontSize: '0.95rem' }}>Order History</span>
            </div>
            <div style={{ textAlign: 'center', padding: '2rem 0', color: '#bbb', fontSize: '0.85rem' }}>
              <Package size={32} color="#e0e0e0" style={{ margin: '0 auto 0.75rem' }} />
              No orders yet
              <div style={{ marginTop: '1.25rem' }}>
                <Link href="/products/custom"
                  style={{ display: 'inline-block', padding: '10px 22px', background: 'linear-gradient(135deg,#ff4757,#ff6b6b)', color: '#fff', borderRadius: 50, fontWeight: 700, fontSize: '0.82rem', textDecoration: 'none' }}
                >
                  Browse Products
                </Link>
              </div>
            </div>
          </div>

          {/* Account info */}
          <div style={{ background: '#fff', borderRadius: 20, padding: '1.75rem', boxShadow: '0 2px 16px rgba(0,0,0,0.06)', gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <User size={18} color="#ff4757" />
              <span style={{ fontWeight: 800, color: '#111', fontSize: '0.95rem' }}>Account Info</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              {[
                { label: 'Full Name', value: session.user?.name || '—' },
                { label: 'Email', value: session.user?.email || '—' },
                { label: 'Sign-in Method', value: 'Google' },
              ].map(({ label, value }) => (
                <div key={label} style={{ padding: '1rem', background: '#f8f8f8', borderRadius: 12 }}>
                  <div style={{ fontSize: '0.7rem', color: '#aaa', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.35rem' }}>{label}</div>
                  <div style={{ fontWeight: 600, color: '#111', fontSize: '0.88rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .acc-grid { grid-template-columns: 1fr !important; }
          .acc-grid > div:last-child { grid-column: span 1 !important; }
        }
      `}</style>
    </main>
  )
}
