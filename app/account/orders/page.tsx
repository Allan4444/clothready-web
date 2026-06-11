'use client'

import Link from 'next/link'
import Reveal from '@/components/ui/Reveal'

const DEMO_ORDERS = [
  { no: 'SHO-20260610-A3B2', date: '2026-06-10', items: 'Oversized Hoodie × 3', total: '$136.50', status: 'Processing', tracking: null },
  { no: 'SMP-2026-0847', date: '2026-06-05', items: 'Custom Leggings Sample × 2', total: '$90.00', status: 'Shipped', tracking: 'DHL 1Z999AA1012' },
  { no: 'SHO-20260528-F1E4', date: '2026-05-28', items: 'Sports Bra Set × 10', total: '$226.10', status: 'Delivered', tracking: 'FedEx 7489201' },
]

export default function OrdersPage() {
  return (
    <section className="section" style={{ paddingTop: '8rem' }}>
      <div className="container-1200" style={{ maxWidth: 800 }}>
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <Link href="/account" style={{ color: '#888', fontSize: '0.85rem', textDecoration: 'none' }}>
              <i className="fas fa-arrow-left" /> My Account
            </Link>
          </div>
          <h1 className="section-title" style={{ fontSize: 'clamp(1.5rem,4vw,2rem)', marginBottom: '2rem' }}>
            <i className="fas fa-box" style={{ color: '#ff4757', marginRight: '0.5rem' }} />
            My Orders & Tracking
          </h1>
        </Reveal>

        {DEMO_ORDERS.length === 0 ? (
          <Reveal>
            <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</div>
              <h3 style={{ marginBottom: '0.5rem' }}>No orders yet</h3>
              <p style={{ color: '#888', marginBottom: '1.5rem' }}>Start shopping or request a custom sample</p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/products/in-stock" className="btn btn-primary">Shop Now</Link>
                <Link href="/products/custom" className="btn btn-outline">Custom Order</Link>
              </div>
            </div>
          </Reveal>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {DEMO_ORDERS.map(order => (
              <Reveal key={order.no}>
                <div className="card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div>
                      <div style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '1rem' }}>{order.no}</div>
                      <div style={{ fontSize: '0.8rem', color: '#888', marginTop: 2 }}>{order.date}</div>
                    </div>
                    <span style={{
                      padding: '4px 12px', borderRadius: 50, fontSize: '0.75rem', fontWeight: 700,
                      background: order.status === 'Delivered' ? 'rgba(46,213,115,0.15)' :
                                  order.status === 'Shipped' ? 'rgba(255,165,2,0.15)' : 'rgba(255,71,87,0.15)',
                      color: order.status === 'Delivered' ? '#2ed573' :
                             order.status === 'Shipped' ? '#ffa502' : '#ff4757',
                    }}>
                      {order.status}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.9rem', marginBottom: '0.75rem' }}>{order.items}</div>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#ff4757', marginBottom: '1rem' }}>{order.total}</div>

                  {order.tracking && (
                    <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <i className="fas fa-truck" style={{ color: '#ffa502' }} />
                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#888' }}>Tracking Number</div>
                        <div style={{ fontFamily: 'monospace', fontWeight: 600, fontSize: '0.9rem' }}>{order.tracking}</div>
                      </div>
                    </div>
                  )}

                  {!order.tracking && order.status === 'Processing' && (
                    <div style={{ fontSize: '0.85rem', color: '#888' }}>
                      <i className="fas fa-spinner fa-spin" style={{ marginRight: '0.5rem' }} />
                      Tracking info will be available once shipped
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
