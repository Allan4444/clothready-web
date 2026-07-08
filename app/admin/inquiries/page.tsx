'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'

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
const STATUS_DISPLAY: Record<string, string> = { new: 'New', contacted: 'Contacted', quoted: 'Quoted', won: 'Won', lost: 'Lost' }
const STATUS_COLORS: Record<string, string> = { new: '#3b82f6', contacted: '#f59e0b', quoted: '#8b5cf6', won: '#10b981', lost: '#6b7280' }

// statuses that trigger a customer email notification
const EMAIL_ON_STATUS = new Set(['contacted', 'quoted', 'won'])

async function sendEmail(payload: { to: string; subject: string; type: string; data: Record<string, string> }) {
  await fetch('/api/admin/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
}

function StatusBadge({ status }: { status: string }) {
  const color = STATUS_COLORS[status?.toLowerCase()] || '#6b7280'
  return (
    <span style={{ background: color + '22', color, border: `1px solid ${color}44`, borderRadius: 99, padding: '2px 10px', fontSize: 12, fontWeight: 500, textTransform: 'capitalize' }}>
      {STATUS_DISPLAY[status?.toLowerCase()] || status || 'New'}
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

  // Reply modal state
  const [replyTarget, setReplyTarget] = useState<Inquiry | null>(null)
  const [replySubject, setReplySubject] = useState('')
  const [replyBody, setReplyBody] = useState('')
  const [replySending, setReplySending] = useState(false)
  const [replySuccess, setReplySuccess] = useState(false)

  useEffect(() => {
    async function load() {
      const res = await fetch('/api/admin/enquiries')
      const json = await res.json()
      const rows = (json.data || []) as Inquiry[]
      setInquiries(rows)
      setFiltered(rows)
      const now = new Date()
      const som = new Date(now.getFullYear(), now.getMonth(), 1)
      setThisMonth(rows.filter(r => new Date(r.created_at) >= som).length)
      setNewCount(rows.filter(r => (r.status || 'new').toLowerCase() === 'new').length)
      setWonCount(rows.filter(r => r.status?.toLowerCase() === 'won').length)
      setLoading(false)
    }
    load()
  }, [])

  useEffect(() => {
    setFiltered(statusFilter === 'All' ? inquiries : inquiries.filter(i => (i.status || 'new').toLowerCase() === statusFilter.toLowerCase()))
  }, [statusFilter, inquiries])

  async function updateStatus(row: Inquiry, status: string) {
    await fetch('/api/admin/enquiries', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: row.id, status }) })
    setInquiries(prev => prev.map(i => i.id === row.id ? { ...i, status } : i))

    // Auto-send status email for key milestones
    if (EMAIL_ON_STATUS.has(status)) {
      try {
        await sendEmail({
          to: row.email,
          subject: `Update on your ClothReady enquiry — ${STATUS_DISPLAY[status] || status}`,
          type: 'enquiry_status',
          data: { name: row.first_name, status },
        })
      } catch {}
    }
  }

  function openReply(row: Inquiry) {
    setReplyTarget(row)
    setReplySubject(`Re: Your ClothReady Enquiry — ${row.product_category || row.company}`)
    setReplyBody(`<p>Hi ${row.first_name},</p>\n\n<p>Thank you for your interest in ClothReady. </p>\n\n<p>Best regards,<br>ClothReady Team</p>`)
    setReplySuccess(false)
    setReplySending(false)
  }

  async function sendReply() {
    if (!replyTarget || !replySubject.trim() || !replyBody.trim()) return
    setReplySending(true)
    try {
      const res = await fetch('/api/admin/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: replyTarget.email, subject: replySubject, type: 'custom', data: { name: replyTarget.first_name, customBody: replyBody } }),
      })
      if (res.ok) { setReplySuccess(true) }
    } catch {}
    setReplySending(false)
  }

  if (loading) return <div style={{ color: '#555', padding: 40 }}>Loading...</div>

  const inputStyle: React.CSSProperties = { width: '100%', background: '#1a1a1a', border: '1px solid #2e2e2e', borderRadius: 6, padding: '8px 12px', color: '#fff', fontSize: 14, boxSizing: 'border-box', outline: 'none' }

  return (
    <div>
      {/* Stats */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        {[{ label: 'This Month', value: thisMonth }, { label: 'New', value: newCount }, { label: 'Won', value: wonCount }].map(s => (
          <div key={s.label} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 10, padding: '16px 24px', flex: 1 }}>
            <div style={{ color: '#666', fontSize: 13, marginBottom: 4 }}>{s.label}</div>
            <div style={{ color: '#fff', fontSize: 26, fontWeight: 700 }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {STATUSES.map(s => (
          <button key={s} onClick={() => setStatusFilter(s)}
            style={{ padding: '6px 14px', borderRadius: 99, border: '1px solid', borderColor: statusFilter === s ? '#ff4757' : '#333', background: statusFilter === s ? '#ff475722' : 'transparent', color: statusFilter === s ? '#ff4757' : '#888', fontSize: 13, cursor: 'pointer' }}>
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
                {['Name', 'Company', 'Email', 'Product', 'Quantity', 'Submitted', 'Status', ''].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '10px 14px', color: '#555', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(row => (
                <>
                  <tr key={row.id} style={{ borderBottom: '1px solid #161616', cursor: 'pointer' }}
                    onClick={() => setExpanded(expanded === row.id ? null : row.id)}
                    onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.background = '#161616'}
                    onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'}>
                    <td style={{ padding: '10px 14px', color: '#fff', fontSize: 14 }}>{row.first_name} {row.last_name}</td>
                    <td style={{ padding: '10px 14px', color: '#aaa', fontSize: 14 }}>{row.company}</td>
                    <td style={{ padding: '10px 14px', color: '#aaa', fontSize: 14 }}>{row.email}</td>
                    <td style={{ padding: '10px 14px', color: '#aaa', fontSize: 14 }}>{row.product_category}</td>
                    <td style={{ padding: '10px 14px', color: '#aaa', fontSize: 14 }}>{row.quantity_range}</td>
                    <td style={{ padding: '10px 14px', color: '#aaa', fontSize: 14 }}>{new Date(row.created_at).toLocaleDateString()}</td>
                    <td style={{ padding: '10px 14px' }} onClick={e => e.stopPropagation()}>
                      <select value={row.status || 'new'} onChange={e => updateStatus(row, e.target.value)}
                        style={{ background: '#1a1a1a', border: '1px solid #2e2e2e', borderRadius: 4, color: '#fff', padding: '3px 8px', fontSize: 13, cursor: 'pointer' }}>
                        {STATUSES.filter(s => s !== 'All').map(s => (
                          <option key={s} value={s}>{STATUS_DISPLAY[s] || s}</option>
                        ))}
                      </select>
                    </td>
                    <td style={{ padding: '10px 14px' }} onClick={e => e.stopPropagation()}>
                      <button onClick={() => openReply(row)}
                        style={{ background: '#ff475718', border: '1px solid #ff475744', borderRadius: 4, color: '#ff4757', padding: '4px 12px', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>
                        ✉ Reply
                      </button>
                    </td>
                  </tr>
                  {expanded === row.id && (
                    <tr key={row.id + '-exp'} style={{ borderBottom: '1px solid #1e1e1e' }}>
                      <td colSpan={8} style={{ padding: '16px 14px', background: '#0e0e0e' }}>
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

      {/* Reply Modal */}
      {replyTarget && (
        <div style={{ position: 'fixed', inset: 0, background: '#000000bb', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: 32, width: 580, maxHeight: '90vh', overflowY: 'auto' }}>
            {replySuccess ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                <h3 style={{ color: '#fff', margin: '0 0 8px' }}>Email sent!</h3>
                <p style={{ color: '#888', margin: '0 0 24px', fontSize: 14 }}>Your reply was sent to {replyTarget.email}</p>
                <button onClick={() => setReplyTarget(null)} style={{ background: '#ff4757', color: '#fff', border: 'none', borderRadius: 6, padding: '9px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Close</button>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                  <div>
                    <h2 style={{ color: '#fff', margin: '0 0 4px', fontSize: 18 }}>Reply to {replyTarget.first_name}</h2>
                    <p style={{ color: '#555', margin: 0, fontSize: 13 }}>{replyTarget.email}</p>
                  </div>
                  <button onClick={() => setReplyTarget(null)} style={{ background: 'none', border: 'none', color: '#555', fontSize: 20, cursor: 'pointer', lineHeight: 1 }}>×</button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div>
                    <label style={{ display: 'block', color: '#888', fontSize: 12, marginBottom: 5 }}>Subject</label>
                    <input type="text" value={replySubject} onChange={e => setReplySubject(e.target.value)} style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ display: 'block', color: '#888', fontSize: 12, marginBottom: 5 }}>Email Body (HTML supported)</label>
                    <textarea value={replyBody} onChange={e => setReplyBody(e.target.value)} rows={10}
                      style={{ ...inputStyle, resize: 'vertical', fontFamily: 'monospace', fontSize: 13 }} />
                  </div>
                  <div style={{ background: '#0e0e0e', border: '1px solid #1e1e1e', borderRadius: 6, padding: '10px 14px' }}>
                    <p style={{ color: '#555', fontSize: 12, margin: 0 }}>💡 The email will be wrapped in ClothReady branding automatically.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                  <button onClick={sendReply} disabled={replySending}
                    style={{ background: '#ff4757', color: '#fff', border: 'none', borderRadius: 6, padding: '9px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                    {replySending ? 'Sending...' : '✉ Send Email'}
                  </button>
                  <button onClick={() => setReplyTarget(null)}
                    style={{ background: 'transparent', border: '1px solid #333', color: '#aaa', borderRadius: 6, padding: '9px 20px', fontSize: 14, cursor: 'pointer' }}>
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
