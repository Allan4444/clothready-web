'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Reveal from '@/components/ui/Reveal'

const STEPS = ['pending', 'in_production', 'shipped', 'approved']
const STEP_LABELS: Record<string, string> = {
  pending: 'Pending Confirmation',
  in_production: 'In Production',
  shipped: 'Shipped',
  approved: 'Delivered / Approved',
}

interface Order {
  order_no: string
  status: string
  contact_name?: string
  company?: string
  garment_type?: string
  product_type?: string
  sample_qty?: number
  courier?: string
  courier_name?: string
  tracking_no?: string
  created_at: string
  notes?: string
}

function TrackingContent() {
  const params = useSearchParams()
  const [orderNo, setOrderNo] = useState(params.get('order') || '')
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searched, setSearched] = useState(false)

  async function lookup(no: string) {
    if (!no.trim()) return
    setLoading(true)
    setError('')
    setOrder(null)
    setSearched(true)
    try {
      const res = await fetch(`/api/track?order=${encodeURIComponent(no.trim())}`)
      const json = await res.json()
      if (!res.ok || !json.success) {
        setError(json.error || 'Order not found')
      } else {
        setOrder(json.order)
      }
    } catch {
      setError('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  useEffect(() => {
    const initial = params.get('order')
    if (initial) lookup(initial)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const activeStep = order ? STEPS.indexOf((order.status || 'pending').toLowerCase()) : -1

  return (
    <>
      <section className="section pt-32">
        <div className="container-1200 text-center">
          <Reveal>
            <div className="section-label"><i className="fas fa-truck" /> Order Tracking</div>
            <h1 className="section-title">Track Your Sample Order</h1>
            <p className="section-subtitle mx-auto">Enter your order number to check the current status</p>
          </Reveal>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-1200">
          <div className="card max-w-xl mx-auto">
            <form
              onSubmit={e => { e.preventDefault(); lookup(orderNo) }}
              style={{ display: 'flex', gap: '0.75rem' }}
            >
              <input
                type="text"
                value={orderNo}
                onChange={e => setOrderNo(e.target.value)}
                placeholder="e.g. SMP-2026-8691"
                style={{
                  flex: 1, padding: '12px 16px', borderRadius: 10,
                  background: '#f8f8f8', border: '1px solid rgba(0,0,0,0.12)',
                  color: '#111', fontSize: '0.9rem', outline: 'none',
                }}
              />
              <button type="submit" disabled={loading} className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>
                {loading ? 'Searching...' : (<>Track <i className="fas fa-search" /></>)}
              </button>
            </form>
          </div>

          {searched && !loading && (
            <div className="max-w-xl mx-auto" style={{ marginTop: '2rem' }}>
              {error && (
                <div className="card" style={{ textAlign: 'center', padding: '2.5rem 1.5rem' }}>
                  <div style={{ width: 56, height: 56, background: 'rgba(255,71,87,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                    <i className="fas fa-exclamation" style={{ color: '#ff4757', fontSize: '1.3rem' }} />
                  </div>
                  <h3 style={{ fontWeight: 800, marginBottom: '0.4rem', color: '#111' }}>Order Not Found</h3>
                  <p style={{ color: '#777', fontSize: '0.88rem' }}>
                    Double check the order number, or contact us at{' '}
                    <a href="mailto:info@clothready.com" style={{ color: '#ff4757' }}>info@clothready.com</a>
                  </p>
                </div>
              )}

              {order && (
                <div className="card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                    <div>
                      <div style={{ color: '#999', fontSize: '0.78rem', marginBottom: 4 }}>Order Number</div>
                      <div style={{ fontWeight: 800, fontSize: '1.3rem', color: '#111', fontFamily: 'monospace' }}>{order.order_no}</div>
                    </div>
                    <span style={{
                      background: 'rgba(255,71,87,0.1)', color: '#ff4757', fontWeight: 700,
                      fontSize: '0.78rem', padding: '5px 14px', borderRadius: 99, whiteSpace: 'nowrap',
                    }}>
                      {STEP_LABELS[(order.status || 'pending').toLowerCase()] || order.status}
                    </span>
                  </div>

                  {/* Progress steps */}
                  <div style={{ display: 'flex', marginBottom: '2rem' }}>
                    {STEPS.map((s, i) => (
                      <div key={s} style={{ flex: 1, textAlign: 'center', position: 'relative' }}>
                        <div style={{
                          width: 28, height: 28, borderRadius: '50%', margin: '0 auto 8px',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          background: i <= activeStep ? '#ff4757' : '#eee',
                          color: i <= activeStep ? '#fff' : '#aaa',
                          fontSize: '0.75rem', fontWeight: 700, position: 'relative', zIndex: 1,
                        }}>
                          {i < activeStep ? <i className="fas fa-check" /> : i + 1}
                        </div>
                        {i < STEPS.length - 1 && (
                          <div style={{
                            position: 'absolute', top: 14, left: '50%', width: '100%', height: 2,
                            background: i < activeStep ? '#ff4757' : '#eee', zIndex: 0,
                          }} />
                        )}
                        <div style={{ fontSize: '0.68rem', color: i <= activeStep ? '#111' : '#aaa', fontWeight: i === activeStep ? 700 : 400 }}>
                          {STEP_LABELS[s]}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '1.25rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <div style={{ color: '#999', fontSize: '0.75rem', marginBottom: 2 }}>Product</div>
                      <div style={{ color: '#333', fontSize: '0.9rem' }}>{order.garment_type || order.product_type || '—'}</div>
                    </div>
                    <div>
                      <div style={{ color: '#999', fontSize: '0.75rem', marginBottom: 2 }}>Quantity</div>
                      <div style={{ color: '#333', fontSize: '0.9rem' }}>{order.sample_qty ?? '—'}</div>
                    </div>
                    <div>
                      <div style={{ color: '#999', fontSize: '0.75rem', marginBottom: 2 }}>Submitted</div>
                      <div style={{ color: '#333', fontSize: '0.9rem' }}>{new Date(order.created_at).toLocaleDateString()}</div>
                    </div>
                    {order.tracking_no && (
                      <div>
                        <div style={{ color: '#999', fontSize: '0.75rem', marginBottom: 2 }}>
                          Tracking No. {order.courier_name || order.courier ? `(${order.courier_name || order.courier})` : ''}
                        </div>
                        <div style={{ color: '#333', fontSize: '0.9rem', fontFamily: 'monospace' }}>{order.tracking_no}</div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default function TrackingPage() {
  return (
    <Suspense fallback={null}>
      <TrackingContent />
    </Suspense>
  )
}
