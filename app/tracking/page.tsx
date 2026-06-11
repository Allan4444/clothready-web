'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import Reveal from '@/components/ui/Reveal'
import { trackingApi } from '@/lib/api'

function TrackingContent() {
  const sp = useSearchParams()
  const initialOrder = sp.get('order') || ''
  const [orderNo, setOrderNo] = useState(initialOrder)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    if (initialOrder) handleTrack(initialOrder)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleTrack(no: string) {
    if (!no) return
    setLoading(true)
    setData(null)
    try {
      const res = await trackingApi.track(no.trim().toUpperCase())
      setData(res)
    } catch (err: any) {
      toast.error(err.message || 'Order not found')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section className="section pt-32">
        <div className="container-1200 text-center">
          <Reveal>
            <div className="section-label"><i className="fas fa-search-location" /> Tracking</div>
            <h1 className="section-title">Track Your Order</h1>
            <p className="section-subtitle mx-auto">
              Enter your order number (e.g. CR-2026-0042 or SMP-2026-1234)
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-1200">
          <div className="max-w-2xl mx-auto mb-12">
            <div className="flex gap-3">
              <input
                type="text"
                value={orderNo}
                onChange={(e) => setOrderNo(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleTrack(orderNo)}
                placeholder="CR-2026-0042"
                className="flex-1 px-5 py-4 bg-white/5 border border-white/10 rounded-lg text-white text-lg font-mono focus:outline-none focus:border-primary"
              />
              <button
                onClick={() => handleTrack(orderNo)}
                disabled={loading}
                className="btn btn-primary disabled:opacity-60"
              >
                {loading ? '...' : 'Track'}
              </button>
            </div>
          </div>

          {data && (
            <Reveal>
              <div className="max-w-3xl mx-auto">
                {/* Order summary */}
                <div className="card mb-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <div>
                      <div className="text-xs text-gray-custom uppercase tracking-widest mb-1">Order</div>
                      <div className="text-xl font-mono font-bold">{data.order.order_no}</div>
                    </div>
                    <div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        data.order.status === 'shipped' ? 'bg-success/20 text-success' :
                        data.order.status === 'delivered' ? 'bg-success/30 text-success' :
                        'bg-primary/20 text-primary'
                      }`}>
                        {data.order.status}
                      </span>
                    </div>
                  </div>
                  {data.order.tracking_no && (
                    <div className="text-sm text-gray-custom">
                      Tracking: <span className="font-mono text-white">{data.order.tracking_no}</span>
                    </div>
                  )}
                </div>

                {/* Timeline */}
                <div className="card">
                  <h3 className="font-bold mb-6">Timeline</h3>
                  {data.events.length === 0 ? (
                    <p className="text-gray-custom text-center py-8">No tracking events yet.</p>
                  ) : (
                    <ol className="relative border-l-2 border-white/10 pl-6 space-y-6">
                      {data.events.map((ev: any) => (
                        <li key={ev.id} className="relative">
                          <span className={`absolute -left-[33px] top-1 w-4 h-4 rounded-full ${
                            ev.event_status === 'done' ? 'bg-success' :
                            ev.event_status === 'current' ? 'bg-primary ring-4 ring-primary/30' :
                            'bg-white/20'
                          }`} />
                          <div className="text-xs text-gray-custom mb-1">
                            {new Date(ev.event_time).toLocaleString()}
                          </div>
                          <h4 className="font-bold mb-1">{ev.title}</h4>
                          {ev.location && (
                            <div className="text-sm text-gray-custom">
                              <i className="fas fa-map-marker-alt text-primary mr-1" /> {ev.location}
                            </div>
                          )}
                          {ev.description && (
                            <p className="text-sm text-gray-custom mt-2">{ev.description}</p>
                          )}
                        </li>
                      ))}
                    </ol>
                  )}
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </>
  )
}

export default function TrackingPage() {
  return (
    <Suspense fallback={<div className="section pt-32 text-center">Loading...</div>}>
      <TrackingContent />
    </Suspense>
  )
}
