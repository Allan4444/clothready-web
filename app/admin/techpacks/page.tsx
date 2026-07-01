'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'

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

const EMPTY_FORM = {
  customer_name: '',
  company: '',
  email: '',
  product_type: '',
  file_url: '',
  file_name: '',
  status: 'Received',
  notes: '',
}

function StatusBadge({ status }: { status: string }) {
  const color = STATUS_COLORS[status?.toLowerCase()] || '#6b7280'
  return (
    <span style={{ background: color + '22', color, border: `1px solid ${color}44`, borderRadius: 99, padding: '2px 10px', fontSize: 12, fontWeight: 500 }}>
      {status || 'Received'}
    </span>
  )
}

export default function TechPacksPage() {
  const [techPacks, setTechPacks] = useState<TechPack[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [notes, setNotes] = useState<Record<string, string>>({})
  const [thisMonth, setThisMonth] = useState(0)
  const [pendingCount, setPendingCount] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [editItem, setEditItem] = useState<TechPack | null>(null)
  const [form, setForm] = useState<typeof EMPTY_FORM>(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  useEffect(() => { loadData() }, [])

  async function loadData() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/techpacks')
      const json = await res.json()
      if (!res.ok) { setError(json.error || 'Failed to load'); setLoading(false); return }
      const rows = (json.data || []) as TechPack[]
      setTechPacks(rows)
      const n: Record<string, string> = {}
      rows.forEach(r => { n[r.id] = r.notes || '' })
      setNotes(n)
      const now = new Date()
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
      setThisMonth(rows.filter(r => new Date(r.created_at) >= startOfMonth).length)
      setPendingCount(rows.filter(r => ['received', 'under review'].includes(r.status?.toLowerCase())).length)
    } catch (e: any) { setError(e.message) }
    setLoading(false)
  }

  async function updateStatus(id: string, status: string) {
    await fetch('/api/admin/techpacks', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status }) })
    setTechPacks(prev => prev.map(t => t.id === id ? { ...t, status } : t))
  }

  async function saveNotes(id: string) {
    await fetch('/api/admin/techpacks', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, notes: notes[id] }) })
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    fd.append('bucket', 'tech-packs')
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
    const json = await res.json()
    if (json.url) {
      setForm(prev => ({ ...prev, file_url: json.url, file_name: file.name }))
    }
    setUploading(false)
    e.target.value = ''
  }

  function openAdd() { setEditItem(null); setForm(EMPTY_FORM); setShowModal(true) }

  function openEdit(t: TechPack) {
    setEditItem(t)
    setForm({ customer_name: t.customer_name, company: t.company, email: t.email, product_type: t.product_type, file_url: t.file_url, file_name: t.file_name, status: t.status, notes: t.notes })
    setShowModal(true)
  }

  async function handleSave() {
    setSaving(true)
    try {
      if (editItem) {
        await fetch('/api/admin/techpacks', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editItem.id, ...form }) })
      } else {
        await fetch('/api/admin/techpacks', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      }
      await loadData()
      setShowModal(false)
    } catch {}
    setSaving(false)
  }

  if (loading) return <div style={{ color: '#555', padding: 40 }}>Loading...</div>
  if (error) return <div style={{ color: '#ff4757', padding: 40 }}>Error: {error}</div>

  return (
    <div>
      {/* Stats */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        {[{ label: 'This Month Received', value: thisMonth }, { label: 'Pending Review', value: pendingCount }].map(s => (
          <div key={s.label} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 10, padding: '16px 24px', flex: 1 }}>
            <div style={{ color: '#666', fontSize: 13, marginBottom: 4 }}>{s.label}</div>
            <div style={{ color: '#fff', fontSize: 26, fontWeight: 700 }}>{s.value}</div>
          </div>
        ))}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button onClick={openAdd}
            style={{ background: '#ff4757', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>
            + Add Tech Pack
          </button>
        </div>
      </div>

      <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 10, overflow: 'hidden' }}>
        {techPacks.length === 0 ? (
          <div style={{ color: '#555', textAlign: 'center', padding: 48 }}>No records found</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1e1e1e' }}>
                {['Customer', 'Company', 'Email', 'Product Type', 'File', 'Submitted', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '10px 14px', color: '#555', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {techPacks.map(row => (
                <>
                  <tr key={row.id} style={{ borderBottom: '1px solid #161616', cursor: 'pointer' }}
                    onClick={() => setExpanded(expanded === row.id ? null : row.id)}
                    onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.background = '#161616'}
                    onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'}>
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
                      <select value={row.status || 'Received'} onChange={e => updateStatus(row.id, e.target.value)}
                        style={{ background: '#1a1a1a', border: '1px solid #2e2e2e', borderRadius: 4, color: '#fff', padding: '3px 8px', fontSize: 13, cursor: 'pointer' }}>
                        {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td style={{ padding: '10px 14px' }} onClick={e => e.stopPropagation()}>
                      <button onClick={() => openEdit(row)}
                        style={{ background: 'transparent', border: '1px solid #333', borderRadius: 4, color: '#aaa', padding: '4px 12px', fontSize: 12, cursor: 'pointer' }}>
                        Edit
                      </button>
                    </td>
                  </tr>
                  {expanded === row.id && (
                    <tr key={row.id + '-exp'} style={{ borderBottom: '1px solid #1e1e1e' }}>
                      <td colSpan={8} style={{ padding: '16px 14px', background: '#0e0e0e' }}>
                        <div style={{ color: '#555', fontSize: 12, marginBottom: 6 }}>INTERNAL NOTES</div>
                        <textarea value={notes[row.id] || ''} onChange={e => setNotes(prev => ({ ...prev, [row.id]: e.target.value }))}
                          onBlur={() => saveNotes(row.id)} rows={3} placeholder="Add internal notes..."
                          style={{ width: '100%', background: '#1a1a1a', border: '1px solid #2e2e2e', borderRadius: 6, padding: '8px 12px', color: '#fff', fontSize: 14, resize: 'vertical', boxSizing: 'border-box', outline: 'none' }}
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

      {/* Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: '#000000aa', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: 32, width: 500, maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ color: '#fff', margin: '0 0 24px', fontSize: 18 }}>{editItem ? 'Edit Tech Pack' : 'Add Tech Pack'}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {([
                { key: 'customer_name', label: 'Customer Name' },
                { key: 'company', label: 'Company' },
                { key: 'email', label: 'Email' },
                { key: 'product_type', label: 'Product Type' },
              ] as { key: keyof typeof EMPTY_FORM; label: string }[]).map(field => (
                <div key={field.key}>
                  <label style={{ display: 'block', color: '#888', fontSize: 12, marginBottom: 5 }}>{field.label}</label>
                  <input type="text" value={form[field.key]}
                    onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                    style={{ width: '100%', background: '#1a1a1a', border: '1px solid #2e2e2e', borderRadius: 6, padding: '8px 12px', color: '#fff', fontSize: 14, boxSizing: 'border-box', outline: 'none' }}
                  />
                </div>
              ))}

              {/* File upload */}
              <div>
                <label style={{ display: 'block', color: '#888', fontSize: 12, marginBottom: 5 }}>Tech Pack File (PDF, AI, PSD, etc.)</label>
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#1a1a1a', border: '1px solid #2e2e2e', borderRadius: 6, padding: '7px 14px', color: '#aaa', fontSize: 13, cursor: 'pointer' }}>
                  {uploading ? 'Uploading...' : '📎 Upload File'}
                  <input type="file" accept=".pdf,.ai,.psd,.eps,.png,.jpg,.jpeg,.zip,.dwg,.dxf" style={{ display: 'none' }} onChange={handleUpload} disabled={uploading} />
                </label>
                {form.file_url && (
                  <div style={{ marginTop: 8, fontSize: 13, color: '#3b82f6' }}>
                    ✓ {form.file_name || 'File uploaded'}
                    <a href={form.file_url} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 8, color: '#3b82f6' }}>View</a>
                  </div>
                )}
              </div>

              <div>
                <label style={{ display: 'block', color: '#888', fontSize: 12, marginBottom: 5 }}>File URL (or paste manually)</label>
                <input type="text" value={form.file_url} placeholder="https://..."
                  onChange={e => setForm(prev => ({ ...prev, file_url: e.target.value }))}
                  style={{ width: '100%', background: '#1a1a1a', border: '1px solid #2e2e2e', borderRadius: 6, padding: '8px 12px', color: '#fff', fontSize: 14, boxSizing: 'border-box', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', color: '#888', fontSize: 12, marginBottom: 5 }}>Status</label>
                <select value={form.status} onChange={e => setForm(prev => ({ ...prev, status: e.target.value }))}
                  style={{ width: '100%', background: '#1a1a1a', border: '1px solid #2e2e2e', borderRadius: 6, padding: '8px 12px', color: '#fff', fontSize: 14, boxSizing: 'border-box' }}>
                  {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', color: '#888', fontSize: 12, marginBottom: 5 }}>Notes</label>
                <textarea value={form.notes} onChange={e => setForm(prev => ({ ...prev, notes: e.target.value }))}
                  rows={3} placeholder="Internal notes..."
                  style={{ width: '100%', background: '#1a1a1a', border: '1px solid #2e2e2e', borderRadius: 6, padding: '8px 12px', color: '#fff', fontSize: 14, boxSizing: 'border-box', outline: 'none', resize: 'vertical' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
              <button onClick={handleSave} disabled={saving}
                style={{ background: '#ff4757', color: '#fff', border: 'none', borderRadius: 6, padding: '9px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                {saving ? 'Saving...' : 'Save'}
              </button>
              <button onClick={() => setShowModal(false)}
                style={{ background: 'transparent', border: '1px solid #333', color: '#aaa', borderRadius: 6, padding: '9px 20px', fontSize: 14, cursor: 'pointer' }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
