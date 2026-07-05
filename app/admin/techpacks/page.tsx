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

interface Template {
  id: string
  name: string
  file_url: string
  display_order: number
  active: boolean
}

const STATUSES = ['Received', 'Under Review', 'Quoted', 'In Production']
const STATUS_COLORS: Record<string, string> = {
  received: '#3b82f6',
  'under review': '#f59e0b',
  quoted: '#8b5cf6',
  'in production': '#10b981',
}

const EMPTY_TP_FORM = {
  customer_name: '', company: '', email: '', product_type: '',
  file_url: '', file_name: '', status: 'Received', notes: '',
}

const EMPTY_TPL_FORM = { name: '', file_url: '', display_order: 0, active: true }

function StatusBadge({ status }: { status: string }) {
  const color = STATUS_COLORS[status?.toLowerCase()] || '#6b7280'
  return (
    <span style={{ background: color + '22', color, border: `1px solid ${color}44`, borderRadius: 99, padding: '2px 10px', fontSize: 12, fontWeight: 500 }}>
      {status || 'Received'}
    </span>
  )
}

export default function TechPacksPage() {
  const [tab, setTab] = useState<'submissions' | 'templates'>('submissions')

  // ── Submissions state ──
  const [techPacks, setTechPacks] = useState<TechPack[]>([])
  const [tpLoading, setTpLoading] = useState(true)
  const [tpError, setTpError] = useState('')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [notes, setNotes] = useState<Record<string, string>>({})
  const [thisMonth, setThisMonth] = useState(0)
  const [pendingCount, setPendingCount] = useState(0)
  const [showTpModal, setShowTpModal] = useState(false)
  const [editTp, setEditTp] = useState<TechPack | null>(null)
  const [tpForm, setTpForm] = useState<typeof EMPTY_TP_FORM>(EMPTY_TP_FORM)
  const [tpSaving, setTpSaving] = useState(false)
  const [tpUploading, setTpUploading] = useState(false)

  // ── Templates state ──
  const [templates, setTemplates] = useState<Template[]>([])
  const [tplLoading, setTplLoading] = useState(false)
  const [tplError, setTplError] = useState('')
  const [showTplModal, setShowTplModal] = useState(false)
  const [editTpl, setEditTpl] = useState<Template | null>(null)
  const [tplForm, setTplForm] = useState<typeof EMPTY_TPL_FORM>(EMPTY_TPL_FORM)
  const [tplSaving, setTplSaving] = useState(false)
  const [tplUploading, setTplUploading] = useState(false)

  useEffect(() => { loadSubmissions() }, [])

  // ── Submissions ──
  async function loadSubmissions() {
    setTpLoading(true); setTpError('')
    try {
      const res = await fetch('/api/admin/techpacks')
      const json = await res.json()
      if (!res.ok) { setTpError(json.error || 'Failed'); setTpLoading(false); return }
      const rows = (json.data || []) as TechPack[]
      setTechPacks(rows)
      const n: Record<string, string> = {}
      rows.forEach(r => { n[r.id] = r.notes || '' })
      setNotes(n)
      const now = new Date()
      const som = new Date(now.getFullYear(), now.getMonth(), 1)
      setThisMonth(rows.filter(r => new Date(r.created_at) >= som).length)
      setPendingCount(rows.filter(r => ['received', 'under review'].includes(r.status?.toLowerCase())).length)
    } catch (e: any) { setTpError(e.message) }
    setTpLoading(false)
  }

  async function updateStatus(id: string, status: string) {
    await fetch('/api/admin/techpacks', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status }) })
    setTechPacks(prev => prev.map(t => t.id === id ? { ...t, status } : t))
  }

  async function saveNotes(id: string) {
    await fetch('/api/admin/techpacks', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, notes: notes[id] }) })
  }

  async function handleTpUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return
    setTpUploading(true)
    const fd = new FormData(); fd.append('file', file); fd.append('bucket', 'tech-packs')
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
    const json = await res.json()
    if (json.url) setTpForm(prev => ({ ...prev, file_url: json.url, file_name: file.name }))
    setTpUploading(false); e.target.value = ''
  }

  function openAddTp() { setEditTp(null); setTpForm(EMPTY_TP_FORM); setShowTpModal(true) }
  function openEditTp(t: TechPack) {
    setEditTp(t)
    setTpForm({ customer_name: t.customer_name, company: t.company, email: t.email, product_type: t.product_type, file_url: t.file_url, file_name: t.file_name, status: t.status, notes: t.notes })
    setShowTpModal(true)
  }

  async function handleTpSave() {
    setTpSaving(true)
    try {
      if (editTp) {
        await fetch('/api/admin/techpacks', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editTp.id, ...tpForm }) })
      } else {
        await fetch('/api/admin/techpacks', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(tpForm) })
      }
      await loadSubmissions(); setShowTpModal(false)
    } catch {}
    setTpSaving(false)
  }

  // ── Templates ──
  async function loadTemplates() {
    setTplLoading(true); setTplError('')
    try {
      const res = await fetch('/api/admin/tech-pack-templates')
      const json = await res.json()
      if (!res.ok) { setTplError(json.error || 'Failed'); setTplLoading(false); return }
      setTemplates(json.data || [])
    } catch (e: any) { setTplError(e.message) }
    setTplLoading(false)
  }

  async function handleTplUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return
    setTplUploading(true)
    const fd = new FormData(); fd.append('file', file); fd.append('bucket', 'tech-packs')
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
    const json = await res.json()
    if (json.url) setTplForm(prev => ({ ...prev, file_url: json.url }))
    setTplUploading(false); e.target.value = ''
  }

  function openAddTpl() { setEditTpl(null); setTplForm(EMPTY_TPL_FORM); setShowTplModal(true) }
  function openEditTpl(t: Template) {
    setEditTpl(t)
    setTplForm({ name: t.name, file_url: t.file_url || '', display_order: t.display_order, active: t.active })
    setShowTplModal(true)
  }

  async function handleTplSave() {
    setTplSaving(true)
    try {
      if (editTpl) {
        await fetch('/api/admin/tech-pack-templates', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editTpl.id, ...tplForm }) })
      } else {
        await fetch('/api/admin/tech-pack-templates', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(tplForm) })
      }
      await loadTemplates(); setShowTplModal(false)
    } catch {}
    setTplSaving(false)
  }

  async function handleTplDelete(id: string) {
    if (!confirm('Delete this template?')) return
    await fetch('/api/admin/tech-pack-templates', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    setTemplates(prev => prev.filter(t => t.id !== id))
  }

  async function toggleTemplateActive(t: Template) {
    await fetch('/api/admin/tech-pack-templates', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: t.id, active: !t.active }) })
    setTemplates(prev => prev.map(x => x.id === t.id ? { ...x, active: !x.active } : x))
  }

  function handleTabChange(t: 'submissions' | 'templates') {
    setTab(t)
    if (t === 'templates' && templates.length === 0 && !tplLoading) loadTemplates()
  }

  const inputStyle: React.CSSProperties = { width: '100%', background: '#1a1a1a', border: '1px solid #2e2e2e', borderRadius: 6, padding: '8px 12px', color: '#fff', fontSize: 14, boxSizing: 'border-box', outline: 'none' }

  return (
    <div>
      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 24, background: '#111', border: '1px solid #1e1e1e', borderRadius: 8, padding: 4, width: 'fit-content' }}>
        {[
          { key: 'submissions', label: 'Customer Submissions' },
          { key: 'templates', label: 'Download Templates' },
        ].map(({ key, label }) => (
          <button key={key} onClick={() => handleTabChange(key as any)}
            style={{ padding: '7px 18px', borderRadius: 6, border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              background: tab === key ? '#ff4757' : 'transparent',
              color: tab === key ? '#fff' : '#666' }}>
            {label}
          </button>
        ))}
      </div>

      {/* ── SUBMISSIONS TAB ── */}
      {tab === 'submissions' && (
        <>
          <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
            {[{ label: 'This Month Received', value: thisMonth }, { label: 'Pending Review', value: pendingCount }].map(s => (
              <div key={s.label} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 10, padding: '16px 24px', flex: 1 }}>
                <div style={{ color: '#666', fontSize: 13, marginBottom: 4 }}>{s.label}</div>
                <div style={{ color: '#fff', fontSize: 26, fontWeight: 700 }}>{s.value}</div>
              </div>
            ))}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <button onClick={openAddTp} style={{ background: '#ff4757', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                + Add Submission
              </button>
            </div>
          </div>

          <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 10, overflow: 'hidden' }}>
            {tpLoading ? <div style={{ color: '#555', padding: 40 }}>Loading...</div>
              : tpError ? <div style={{ color: '#ff4757', padding: 40 }}>Error: {tpError}</div>
              : techPacks.length === 0 ? <div style={{ color: '#555', textAlign: 'center', padding: 48 }}>No records found</div>
              : (
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
                            {row.file_url ? <a href={row.file_url} download={row.file_name} target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', textDecoration: 'none', fontSize: 13 }}>{row.file_name || 'Download'}</a> : '—'}
                          </td>
                          <td style={{ padding: '10px 14px', color: '#aaa', fontSize: 14 }}>{new Date(row.created_at).toLocaleDateString()}</td>
                          <td style={{ padding: '10px 14px' }} onClick={e => e.stopPropagation()}>
                            <select value={row.status || 'Received'} onChange={e => updateStatus(row.id, e.target.value)}
                              style={{ background: '#1a1a1a', border: '1px solid #2e2e2e', borderRadius: 4, color: '#fff', padding: '3px 8px', fontSize: 13, cursor: 'pointer' }}>
                              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                          </td>
                          <td style={{ padding: '10px 14px' }} onClick={e => e.stopPropagation()}>
                            <button onClick={() => openEditTp(row)} style={{ background: 'transparent', border: '1px solid #333', borderRadius: 4, color: '#aaa', padding: '4px 12px', fontSize: 12, cursor: 'pointer' }}>Edit</button>
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
        </>
      )}

      {/* ── TEMPLATES TAB ── */}
      {tab === 'templates' && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <p style={{ color: '#666', fontSize: 13, margin: 0 }}>
              These templates appear on the public <strong style={{ color: '#aaa' }}>/tech-pack</strong> page for customers to download.
            </p>
            <button onClick={openAddTpl} style={{ background: '#ff4757', color: '#fff', border: 'none', borderRadius: 6, padding: '9px 18px', fontSize: 14, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>
              + Add Template
            </button>
          </div>

          <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 10, overflow: 'hidden' }}>
            {tplLoading ? <div style={{ color: '#555', padding: 40 }}>Loading...</div>
              : tplError ? <div style={{ color: '#ff4757', padding: 40 }}>Error: {tplError}</div>
              : templates.length === 0 ? (
                <div style={{ color: '#555', textAlign: 'center', padding: 48 }}>
                  <div style={{ marginBottom: 12 }}>No templates yet.</div>
                  <div style={{ fontSize: 13 }}>Click "+ Add Template" to add your first downloadable PDF template.</div>
                </div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #1e1e1e' }}>
                      {['Order', 'Name', 'PDF File', 'Status', 'Actions'].map(h => (
                        <th key={h} style={{ textAlign: 'left', padding: '10px 14px', color: '#555', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {templates.map(row => (
                      <tr key={row.id} style={{ borderBottom: '1px solid #161616' }}
                        onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.background = '#161616'}
                        onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'}>
                        <td style={{ padding: '10px 14px', color: '#555', fontSize: 14, width: 60 }}>{row.display_order}</td>
                        <td style={{ padding: '10px 14px', color: '#fff', fontSize: 14, fontWeight: 600 }}>{row.name}</td>
                        <td style={{ padding: '10px 14px', fontSize: 14 }}>
                          {row.file_url
                            ? <a href={row.file_url} target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', textDecoration: 'none', fontSize: 13 }}>View PDF ↗</a>
                            : <span style={{ color: '#555', fontSize: 13 }}>No file uploaded</span>}
                        </td>
                        <td style={{ padding: '10px 14px' }}>
                          <button onClick={() => toggleTemplateActive(row)}
                            style={{ background: row.active ? '#10b98122' : '#6b728022', color: row.active ? '#10b981' : '#6b7280', border: `1px solid ${row.active ? '#10b98144' : '#6b728044'}`, borderRadius: 99, padding: '2px 10px', fontSize: 12, cursor: 'pointer', fontWeight: 500 }}>
                            {row.active ? 'Visible' : 'Hidden'}
                          </button>
                        </td>
                        <td style={{ padding: '10px 14px', display: 'flex', gap: 8 }}>
                          <button onClick={() => openEditTpl(row)} style={{ background: 'transparent', border: '1px solid #333', borderRadius: 4, color: '#aaa', padding: '4px 12px', fontSize: 12, cursor: 'pointer' }}>Edit</button>
                          <button onClick={() => handleTplDelete(row.id)} style={{ background: 'transparent', border: '1px solid #3f1f1f', borderRadius: 4, color: '#ff4757', padding: '4px 12px', fontSize: 12, cursor: 'pointer' }}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
          </div>
        </>
      )}

      {/* ── Submission Modal ── */}
      {showTpModal && (
        <div style={{ position: 'fixed', inset: 0, background: '#000000aa', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: 32, width: 500, maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ color: '#fff', margin: '0 0 24px', fontSize: 18 }}>{editTp ? 'Edit Submission' : 'Add Submission'}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {([{ key: 'customer_name', label: 'Customer Name' }, { key: 'company', label: 'Company' }, { key: 'email', label: 'Email' }, { key: 'product_type', label: 'Product Type' }] as { key: keyof typeof EMPTY_TP_FORM; label: string }[]).map(f => (
                <div key={f.key}>
                  <label style={{ display: 'block', color: '#888', fontSize: 12, marginBottom: 5 }}>{f.label}</label>
                  <input type="text" value={tpForm[f.key] as string} onChange={e => setTpForm(prev => ({ ...prev, [f.key]: e.target.value }))} style={inputStyle} />
                </div>
              ))}
              <div>
                <label style={{ display: 'block', color: '#888', fontSize: 12, marginBottom: 5 }}>Upload File</label>
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#1a1a1a', border: '1px solid #2e2e2e', borderRadius: 6, padding: '7px 14px', color: '#aaa', fontSize: 13, cursor: 'pointer' }}>
                  {tpUploading ? 'Uploading...' : '📎 Upload'}
                  <input type="file" style={{ display: 'none' }} onChange={handleTpUpload} disabled={tpUploading} />
                </label>
                {tpForm.file_url && <div style={{ marginTop: 6, fontSize: 13, color: '#3b82f6' }}>✓ {tpForm.file_name || 'Uploaded'}</div>}
              </div>
              <div>
                <label style={{ display: 'block', color: '#888', fontSize: 12, marginBottom: 5 }}>Status</label>
                <select value={tpForm.status} onChange={e => setTpForm(prev => ({ ...prev, status: e.target.value }))} style={{ ...inputStyle }}>
                  {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', color: '#888', fontSize: 12, marginBottom: 5 }}>Notes</label>
                <textarea value={tpForm.notes} onChange={e => setTpForm(prev => ({ ...prev, notes: e.target.value }))} rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
              <button onClick={handleTpSave} disabled={tpSaving} style={{ background: '#ff4757', color: '#fff', border: 'none', borderRadius: 6, padding: '9px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>{tpSaving ? 'Saving...' : 'Save'}</button>
              <button onClick={() => setShowTpModal(false)} style={{ background: 'transparent', border: '1px solid #333', color: '#aaa', borderRadius: 6, padding: '9px 20px', fontSize: 14, cursor: 'pointer' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Template Modal ── */}
      {showTplModal && (
        <div style={{ position: 'fixed', inset: 0, background: '#000000aa', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: 32, width: 480 }}>
            <h2 style={{ color: '#fff', margin: '0 0 24px', fontSize: 18 }}>{editTpl ? 'Edit Template' : 'Add Template'}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ display: 'block', color: '#888', fontSize: 12, marginBottom: 5 }}>Template Name (shown to customers)</label>
                <input type="text" value={tplForm.name} placeholder="e.g. T-Shirt" onChange={e => setTplForm(prev => ({ ...prev, name: e.target.value }))} style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', color: '#888', fontSize: 12, marginBottom: 5 }}>Upload PDF File</label>
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#1a1a1a', border: '1px solid #2e2e2e', borderRadius: 6, padding: '8px 16px', color: '#aaa', fontSize: 13, cursor: 'pointer' }}>
                  {tplUploading ? 'Uploading...' : '📤 Upload PDF'}
                  <input type="file" accept=".pdf" style={{ display: 'none' }} onChange={handleTplUpload} disabled={tplUploading} />
                </label>
                {tplForm.file_url && (
                  <div style={{ marginTop: 8, fontSize: 13, color: '#10b981' }}>
                    ✓ File uploaded —&nbsp;
                    <a href={tplForm.file_url} target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6' }}>Preview</a>
                  </div>
                )}
              </div>
              <div>
                <label style={{ display: 'block', color: '#888', fontSize: 12, marginBottom: 5 }}>Or paste PDF URL directly</label>
                <input type="text" value={tplForm.file_url} placeholder="https://..." onChange={e => setTplForm(prev => ({ ...prev, file_url: e.target.value }))} style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', color: '#888', fontSize: 12, marginBottom: 5 }}>Display Order (lower = first)</label>
                <input type="number" value={tplForm.display_order} onChange={e => setTplForm(prev => ({ ...prev, display_order: parseInt(e.target.value) || 0 }))} style={{ ...inputStyle, width: 100 }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <input type="checkbox" id="tpl-active" checked={tplForm.active} onChange={e => setTplForm(prev => ({ ...prev, active: e.target.checked }))} />
                <label htmlFor="tpl-active" style={{ color: '#aaa', fontSize: 14, cursor: 'pointer' }}>Visible on website</label>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
              <button onClick={handleTplSave} disabled={tplSaving} style={{ background: '#ff4757', color: '#fff', border: 'none', borderRadius: 6, padding: '9px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>{tplSaving ? 'Saving...' : 'Save'}</button>
              <button onClick={() => setShowTplModal(false)} style={{ background: 'transparent', border: '1px solid #333', color: '#aaa', borderRadius: 6, padding: '9px 20px', fontSize: 14, cursor: 'pointer' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
