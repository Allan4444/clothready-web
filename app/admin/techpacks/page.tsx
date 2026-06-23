'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface TechPack {
  id: string
  customer_name: string
  company: string
  email: string
  product_type: string
  file_url: string
  file_name: string
  status: string
  notes: string
  created_at: string
}

const STATUSES = ['Received', 'Under Review', 'Quoted', 'In Production']

const STATUS_COLORS: Record<string, string> = {
  received: '#3b82f6',
  'under review': '#f59e0b',
  quoted: '#8b5cf6',
  'in production': '#10b981',
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
      {status || 'Received'}
    </span>
  )
}

export default function TechPacksPage() {
  const [techPacks, setTechPacks] = useState<TechPack[]>([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [notes, setNotes] = useState<Record<string, string>>({})
  const [thisMonth, setThisMonth] = useState(0)
  const [pendingCount, setPendingCount] = useState(0)

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('tech_packs')
        .select('*')
        .order('created_at', { ascending: false })
      const rows = (data || []) as TechPack[]
      setTechPacks(rows)
      const n: Record<string, string> = {}
      rows.forEach(r => { n[r.id] = r.notes || '' })
      setNotes(n)

      const now = new Date()
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
      setThisMonth(rows.filter(r => new Date(r.created_at) >= startOfMonth).length)
      setPendingCount(rows.filter(r => ['received', 'under review'].includes(r.status?.toLowerCase())).length)
      setLoading(false)
    }
    load()
  }, [])

  async function updateStatus(id: string, status: string) {
    await supabase.from('tech_packs').update({ status }).eq('id', id)
    setTechPacks(prev => prev.map(t => t.id === id ? { ...t, status } : t))
  }

  async function saveNotes(id: string) {
    await supabase.from('tech_packs').update({ notes: notes[id] }).eq('id', id)
  }

  if (loading) return <div style={{ color: '#555', padding: 40 }}>Loading...</div>

  return (
    <div>
      {/* Stats */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'This Month Received', value: thisMonth },
          { label: 'Pending Review', value: pendingCount },
        ].map(s => (
          <div key={s.label} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 10, padding: '16px 24px', flex: 1 }}>
            <div style={{ color: '#666', fontSize: 13, marginBottom: 4 }}>{s.label}</div>
            <div style={{ color: '#fff', fontSize: 26, fontWeight: 700 }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 10, overflow: 'hidden' }}>
        {techPacks.length === 0 ? (
          <div style={{ color: '#555', textAlign: 'center', padding: 48 }}>No records found</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1e1e1e' }}>
                {['Customer', 'Company', 'Email', 'Product Type', 'File', 'Submitted', 'Status'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '10px 14px', color: '#555', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {techPacks.map(row => (
                <>
                  <tr
                    key={row.id}
                    style={{ borderBottom: '1px solid #161616', cursor: 'pointer' }}
                    onClick={() => setExpanded(expanded === row.id ? null : row.id)}
                    onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.background = '#161616'}
                    onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'}
                  >
                    <td style={{ padding: '10px 14px', color: '#fff', fontSize: 14 }}>{row.customer_name}</td>
                    <td style={{ padding: '10px 14px', color: '#aaa', fontSize: 14 }}>{row.company}</td>
                    <td style={{ padding: '10px 14px', color: '#aaa', fontSize: 14 }}>{row.email}</td>
                    <td style={{ padding: '10px 14px', color: '#aaa', fontSize: 14 }}>{row.product_type}</td>
                    <td style={{ padding: '10px 14px', fontSize: 14 }} onClick={e => e.stopPropagation()}>
                      {row.file_url ? (
                        <a href={row.file_url} download={row.file_name} target="_blank" rel="noopener noreferrer"
                          style={{ color: '#3b82f6', textDecoration: 'none', fontSize: 13 }}>
                          {row.file_name || 'Download'}
                        </a>
                      ) : '—'}
                    </td>
                    <td style={{ padding: '10px 14px', color: '#aaa', fontSize: 14 }}>{new Date(row.created_at).toLocaleDateString()}</td>
                    <td style={{ padding: '10px 14px' }} onClick={e => e.stopPropagation()}>
                      <select
                        value={row.status || 'Received'}
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
                        {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                  </tr>
                  {expanded === row.id && (
                    <tr key={row.id + '-exp'} style={{ borderBottom: '1px solid #1e1e1e' }}>
                      <td colSpan={7} style={{ padding: '16px 14px', background: '#0e0e0e' }}>
                        <div style={{ color: '#555', fontSize: 12, marginBottom: 6 }}>INTERNAL NOTES</div>
                        <textarea
                          value={notes[row.id] || ''}
                          onChange={e => setNotes(prev => ({ ...prev, [row.id]: e.target.value }))}
                          onBlur={() => saveNotes(row.id)}
                          rows={3}
                          placeholder="Add internal notes..."
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
