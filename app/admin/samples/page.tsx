'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { supabaseAdmin } from '@/lib/supabase-admin-client'

interface SampleOrder {
  id: string
  first_name?: string
  last_name?: string
  customer_name?: string
  product_type?: string
  product_category?: string
  quantity?: number
  quantity_range?: string
  created_at: string
  status: string
  notes?: string
  email?: string
  company?: string
}

const STATUSES = ['pending', 'in_production', 'shipped', 'approved']

const STATUS_DISPLAY: Record<string, string> = {
  pending: 'Pending',
  in_production: 'In Production',
  shipped: 'Shipped',
  approved: 'Approved',
}

const STATUS_COLORS: Record<string, string> = {
  pending: '#f59e0b',
  in_production: '#8b5cf6',
  shipped: '#3b82f6',
  approved: '#10b981',
}

function StatusBadge({ status }: { status: string }) {
  const color = STATUS_COLORS[status?.toLowerCase()] || '#6b7280'
  return (
    <span style={{
      background: color + '22',
      color,
      border: `1px solid ${color}44`,
      borderRadius: 99,
      padding: '2px 10px',
      fontSize: 12,
      fontWeight: 500,
    }}>
      {STATUS_DISPLAY[status?.toLowerCase()] || status || 'Pending'}
    </span>
  )
}

export default function SamplesPage() {
  const [orders, setOrders] = useState<SampleOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [notes, setNotes] = useState<Record<string, string>>({})

  useEffect(() => {
    async function load() {
      const { data } = await supabaseAdmin
        .from('sample_orders')
        .select('*')
        .order('created_at', { ascending: false })
      const rows = (data || []) as SampleOrder[]
      setOrders(rows)
      const n: Record<string, string> = {}
      rows.forEach(r => { n[r.id] = r.notes || '' })
      setNotes(n)
      setLoading(false)
    }
    load()
  }, [])

  async function updateStatus(id: string, status: string) {
    await supabaseAdmin.from('sample_orders').update({ status }).eq('id', id)
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o))
  }

  async function saveNotes(id: string) {
    await supabaseAdmin.from('sample_orders').update({ notes: notes[id] }).eq('id', id)
  }

  function getCustomerName(o: SampleOrder) {
    if (o.customer_name) return o.customer_name
    return [o.first_name, o.last_name].filter(Boolean).join(' ') || '—'
  }

  function getProduct(o: SampleOrder) {
    return o.product_type || o.product_category || '—'
  }

  function getQuantity(o: SampleOrder) {
    return o.quantity || o.quantity_range || '—'
  }

  if (loading) return <div style={{ color: '#555', padding: 40 }}>Loading...</div>

  return (
    <div>
      <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 10, overflow: 'hidden' }}>
        {orders.length === 0 ? (
          <div style={{ color: '#555', textAlign: 'center', padding: 48 }}>No records found</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1e1e1e' }}>
                {['Customer', 'Product Type', 'Quantity', 'Submitted', 'Status'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '10px 14px', color: '#555', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map(row => (
                <>
                  <tr
                    key={row.id}
                    style={{ borderBottom: '1px solid #161616', cursor: 'pointer' }}
                    onClick={() => setExpanded(expanded === row.id ? null : row.id)}
                    onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.background = '#161616'}
                    onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'}
                  >
                    <td style={{ padding: '10px 14px', color: '#fff', fontSize: 14 }}>{getCustomerName(row)}</td>
                    <td style={{ padding: '10px 14px', color: '#aaa', fontSize: 14 }}>{getProduct(row)}</td>
                    <td style={{ padding: '10px 14px', color: '#aaa', fontSize: 14 }}>{getQuantity(row)}</td>
                    <td style={{ padding: '10px 14px', color: '#aaa', fontSize: 14 }}>{new Date(row.created_at).toLocaleDateString()}</td>
                    <td style={{ padding: '10px 14px' }} onClick={e => e.stopPropagation()}>
                      <select
                        value={row.status || 'Pending'}
                        onChange={e => updateStatus(row.id, e.target.value)}
                        style={{
                          background: '#1a1a1a',
                          border: '1px solid #2e2e2e',
                          borderRadius: 4,
                          color: '#fff',
                          padding: '3px 8px',
                          fontSize: 13,
                          cursor: 'pointer',
                        }}
                      >
                        {STATUSES.map(s => <option key={s} value={s}>{STATUS_DISPLAY[s] || s}</option>)}
                      </select>
                    </td>
                  </tr>
                  {expanded === row.id && (
                    <tr key={row.id + '-exp'} style={{ borderBottom: '1px solid #1e1e1e' }}>
                      <td colSpan={5} style={{ padding: '16px 14px', background: '#0e0e0e' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                          {row.email && (
                            <div>
                              <div style={{ color: '#555', fontSize: 12, marginBottom: 4 }}>EMAIL</div>
                              <div style={{ color: '#ccc', fontSize: 14 }}>{row.email}</div>
                            </div>
                          )}
                          {row.company && (
                            <div>
                              <div style={{ color: '#555', fontSize: 12, marginBottom: 4 }}>COMPANY</div>
                              <div style={{ color: '#ccc', fontSize: 14 }}>{row.company}</div>
                            </div>
                          )}
                        </div>
                        <div>
                          <div style={{ color: '#555', fontSize: 12, marginBottom: 6 }}>INTERNAL NOTES</div>
                          <textarea
                            value={notes[row.id] || ''}
                            onChange={e => setNotes(prev => ({ ...prev, [row.id]: e.target.value }))}
                            onBlur={() => saveNotes(row.id)}
                            rows={3}
                            placeholder="Add notes..."
                            style={{
                              width: '100%',
                              background: '#1a1a1a',
                              border: '1px solid #2e2e2e',
                              borderRadius: 6,
                              padding: '8px 12px',
                              color: '#fff',
                              fontSize: 14,
                              resize: 'vertical',
                              boxSizing: 'border-box',
                              outline: 'none',
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
