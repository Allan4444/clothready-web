'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { supabaseAdmin } from '@/lib/supabase-admin-client'

interface Inquiry {
  id: string
  first_name: string
  last_name: string
  company: string
  email: string
  phone: string
  country: string
  product_category: string
  quantity_range: string
  target_delivery: string
  message: string
  created_at: string
  status: string
}

const STATUSES = ['All', 'new', 'contacted', 'quoted', 'won', 'lost']

const STATUS_DISPLAY: Record<string, string> = {
  new: 'New',
  contacted: 'Contacted',
  quoted: 'Quoted',
  won: 'Won',
  lost: 'Lost',
}

const STATUS_COLORS: Record<string, string> = {
  new: '#3b82f6',
  contacted: '#f59e0b',
  quoted: '#8b5cf6',
  won: '#10b981',
  lost: '#6b7280',
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
      textTransform: 'capitalize',
    }}>
      {status || 'New'}
    </span>
  )
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [filtered, setFiltered] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('All')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [thisMonth, setThisMonth] = useState(0)
  const [newCount, setNewCount] = useState(0)
  const [wonCount, setWonCount] = useState(0)

  useEffect(() => {
    async function load() {
      const { data } = await supabaseAdmin
        .from('enquiries')
        .select('*')
        .order('created_at', { ascending: false })

      const rows = (data || []) as Inquiry[]
      setInquiries(rows)
      setFiltered(rows)

      const now = new Date()
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
      setThisMonth(rows.filter(r => new Date(r.created_at) >= startOfMonth).length)
      setNewCount(rows.filter(r => (r.status || 'New').toLowerCase() === 'new').length)
      setWonCount(rows.filter(r => r.status?.toLowerCase() === 'won').length)
      setLoading(false)
    }
    load()
  }, [])

  useEffect(() => {
    if (statusFilter === 'All') {
      setFiltered(inquiries)
    } else {
      setFiltered(inquiries.filter(i => (i.status || 'New').toLowerCase() === statusFilter.toLowerCase()))
    }
  }, [statusFilter, inquiries])

  async function updateStatus(id: string, status: string) {
    await supabaseAdmin.from('enquiries').update({ status }).eq('id', id)
    setInquiries(prev => prev.map(i => i.id === id ? { ...i, status } : i))
  }

  if (loading) return <div style={{ color: '#555', padding: 40 }}>Loading...</div>

  return (
    <div>
      {/* Stats */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'This Month', value: thisMonth },
          { label: 'New', value: newCount },
          { label: 'Won', value: wonCount },
        ].map(s => (
          <div key={s.label} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 10, padding: '16px 24px', flex: 1 }}>
            <div style={{ color: '#666', fontSize: 13, marginBottom: 4 }}>{s.label}</div>
            <div style={{ color: '#fff', fontSize: 26, fontWeight: 700 }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {STATUSES.map(s => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            style={{
              padding: '6px 14px',
              borderRadius: 99,
              border: '1px solid',
              borderColor: statusFilter === s ? '#ff4757' : '#333',
              background: statusFilter === s ? '#ff475722' : 'transparent',
              color: statusFilter === s ? '#ff4757' : '#888',
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            {s === 'All' ? 'All' : STATUS_DISPLAY[s] || s}
          </button>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 10, overflow: 'hidden' }}>
        {filtered.length === 0 ? (
          <div style={{ color: '#555', textAlign: 'center', padding: 48 }}>No records found</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1e1e1e' }}>
                {['Name', 'Company', 'Email', 'Product', 'Quantity', 'Submitted', 'Status'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '10px 14px', color: '#555', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(row => (
                <>
                  <tr
                    key={row.id}
                    style={{ borderBottom: '1px solid #161616', cursor: 'pointer' }}
                    onClick={() => setExpanded(expanded === row.id ? null : row.id)}
                    onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.background = '#161616'}
                    onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'}
                  >
                    <td style={{ padding: '10px 14px', color: '#fff', fontSize: 14 }}>{row.first_name} {row.last_name}</td>
                    <td style={{ padding: '10px 14px', color: '#aaa', fontSize: 14 }}>{row.company}</td>
                    <td style={{ padding: '10px 14px', color: '#aaa', fontSize: 14 }}>{row.email}</td>
                    <td style={{ padding: '10px 14px', color: '#aaa', fontSize: 14 }}>{row.product_category}</td>
                    <td style={{ padding: '10px 14px', color: '#aaa', fontSize: 14 }}>{row.quantity_range}</td>
                    <td style={{ padding: '10px 14px', color: '#aaa', fontSize: 14 }}>{new Date(row.created_at).toLocaleDateString()}</td>
                    <td style={{ padding: '10px 14px' }} onClick={e => e.stopPropagation()}>
                      <select
                        value={row.status || 'New'}
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
                        {STATUSES.filter(s => s !== 'All').map(s => (
                          <option key={s} value={s}>{STATUS_DISPLAY[s] || s}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                  {expanded === row.id && (
                    <tr key={row.id + '-exp'} style={{ borderBottom: '1px solid #1e1e1e' }}>
                      <td colSpan={7} style={{ padding: '16px 14px', background: '#0e0e0e' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                          <div>
                            <div style={{ color: '#555', fontSize: 12, marginBottom: 4 }}>CONTACT</div>
                            <div style={{ color: '#ccc', fontSize: 14 }}>{row.phone}</div>
                            <div style={{ color: '#ccc', fontSize: 14 }}>{row.country}</div>
                          </div>
                          <div>
                            <div style={{ color: '#555', fontSize: 12, marginBottom: 4 }}>TARGET DELIVERY</div>
                            <div style={{ color: '#ccc', fontSize: 14 }}>{row.target_delivery || '—'}</div>
                          </div>
                          <div style={{ gridColumn: '1 / -1' }}>
                            <div style={{ color: '#555', fontSize: 12, marginBottom: 4 }}>MESSAGE</div>
                            <div style={{ color: '#ccc', fontSize: 14, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{row.message || '—'}</div>
                          </div>
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
