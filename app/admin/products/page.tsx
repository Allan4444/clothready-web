'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState, useRef } from 'react'

interface Product {
  id: string
  name: string
  sku: string
  category: string
  description: string
  moq: number
  lead_time: string
  image_url: string
  status: string
  created_at: string
}

const CATEGORY_OPTIONS = [
  { value: 'fitness', label: 'Gym Wear' },
  { value: 'streetwear', label: 'Streetwear' },
  { value: 'woven', label: 'Woven' },
  { value: 'denim', label: 'Denim' },
  { value: 'sustainable', label: 'Sustainable' },
  { value: 'outerwear', label: 'Outerwear' },
  { value: 'other', label: 'Other' },
]

const CATEGORY_LABEL: Record<string, string> = Object.fromEntries(
  CATEGORY_OPTIONS.map(o => [o.value, o.label])
)

const FILTER_CATEGORIES = [{ value: 'All', label: 'All' }, ...CATEGORY_OPTIONS]

const EMPTY_FORM = {
  name: '',
  sku: '',
  slug: '',
  category: 'fitness',
  description: '',
  moq: 100,
  lead_time: '',
  image_url: '',
  price: 0,
  colors: 'Black, White, Navy, Charcoal, Red, Royal Blue, Forest Green, Burgundy, Beige, Pink, Olive, Camel',
  sizes: 'XS, S, M, L, XL, XXL, XXXL',
  images: '',
  status: 'active',
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filtered, setFiltered] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [catFilter, setCatFilter] = useState('All')
  const [showModal, setShowModal] = useState(false)
  const [editProduct, setEditProduct] = useState<Product | null>(null)
  const [form, setForm] = useState<typeof EMPTY_FORM>(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => { loadProducts() }, [])

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>, target: 'image_url' | 'images') {
    const files = e.target.files
    if (!files?.length) return
    setUploading(true)
    const urls: string[] = []
    for (const file of Array.from(files)) {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const json = await res.json()
      if (json.url) urls.push(json.url)
    }
    if (target === 'image_url' && urls[0]) {
      setForm(prev => ({ ...prev, image_url: urls[0] }))
    } else if (target === 'images') {
      setForm(prev => ({ ...prev, images: [(prev as any).images, ...urls].filter(Boolean).join('\n') }))
    }
    setUploading(false)
    e.target.value = ''
  }

  async function loadProducts() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/products')
      const json = await res.json()
      if (!res.ok) { setError(json.error || 'Failed to load'); setLoading(false); return }
      const rows = (json.data || []) as Product[]
      setProducts(rows)
      setFiltered(rows)
    } catch (e: any) {
      setError(e.message)
    }
    setLoading(false)
  }

  useEffect(() => {
    setFiltered(catFilter === 'All' ? products : products.filter(p => p.category === catFilter))
  }, [catFilter, products])

  function openAdd() { setEditProduct(null); setForm(EMPTY_FORM); setShowModal(true) }

  function openEdit(p: Product) {
    setEditProduct(p)
    const pa = p as any
    setForm({ name: p.name, sku: p.sku, slug: pa.slug || '', category: p.category, description: p.description, moq: p.moq, lead_time: p.lead_time, image_url: p.image_url, price: pa.price || 0, colors: Array.isArray(pa.colors) ? pa.colors.join(', ') : (pa.colors || ''), sizes: Array.isArray(pa.sizes) ? pa.sizes.join(', ') : (pa.sizes || ''), images: Array.isArray(pa.images) ? pa.images.join('\n') : (pa.images || ''), status: p.status || 'active' })
    setShowModal(true)
  }

  async function handleSave() {
    setSaving(true)
    try {
      const payload = {
        ...form,
        colors: form.colors ? form.colors.split(',').map((s: string) => s.trim()).filter(Boolean) : [],
        sizes: form.sizes ? form.sizes.split(',').map((s: string) => s.trim()).filter(Boolean) : [],
        images: form.images ? form.images.split('\n').map((s: string) => s.trim()).filter(Boolean) : [],
      }
      if (editProduct) {
        await fetch('/api/admin/products', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editProduct.id, ...payload }) })
      } else {
        await fetch('/api/admin/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      }
      await loadProducts()
      setShowModal(false)
    } catch {}
    setSaving(false)
  }

  async function toggleStatus(p: Product) {
    const newStatus = p.status === 'active' ? 'draft' : 'active'
    await fetch('/api/admin/products', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: p.id, status: newStatus }) })
    setProducts(prev => prev.map(x => x.id === p.id ? { ...x, status: newStatus } : x))
  }

  if (loading) return <div style={{ color: '#555', padding: 40 }}>Loading...</div>
  if (error) return <div style={{ color: '#ff4757', padding: 40 }}>Error: {error}</div>

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {FILTER_CATEGORIES.map(c => (
            <button key={c.value} onClick={() => setCatFilter(c.value)}
              style={{ padding: '5px 12px', borderRadius: 99, border: '1px solid', borderColor: catFilter === c.value ? '#ff4757' : '#333', background: catFilter === c.value ? '#ff475722' : 'transparent', color: catFilter === c.value ? '#ff4757' : '#888', fontSize: 12, cursor: 'pointer' }}>
              {c.label}
            </button>
          ))}
        </div>
        <button onClick={openAdd}
          style={{ background: '#ff4757', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 16px', fontSize: 14, fontWeight: 600, cursor: 'pointer', marginLeft: 12, whiteSpace: 'nowrap' }}>
          + Add Product
        </button>
      </div>

      <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 10, overflow: 'hidden' }}>
        {filtered.length === 0 ? (
          <div style={{ color: '#555', textAlign: 'center', padding: 48 }}>No records found</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1e1e1e' }}>
                {['Name', 'SKU', 'Category', 'MOQ', 'Lead Time', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '10px 14px', color: '#555', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(row => (
                <tr key={row.id} style={{ borderBottom: '1px solid #161616' }}
                  onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.background = '#161616'}
                  onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'}>
                  <td style={{ padding: '10px 14px', color: '#fff', fontSize: 14 }}>{row.name}</td>
                  <td style={{ padding: '10px 14px', color: '#aaa', fontSize: 14 }}>{row.sku}</td>
                  <td style={{ padding: '10px 14px', color: '#aaa', fontSize: 14 }}>{CATEGORY_LABEL[row.category] || row.category}</td>
                  <td style={{ padding: '10px 14px', color: '#aaa', fontSize: 14 }}>{row.moq}</td>
                  <td style={{ padding: '10px 14px', color: '#aaa', fontSize: 14 }}>{row.lead_time}</td>
                  <td style={{ padding: '10px 14px' }}>
                    <button onClick={() => toggleStatus(row)}
                      style={{ padding: '3px 12px', borderRadius: 99, border: 'none', background: row.status === 'active' ? '#10b98122' : '#6b728022', color: row.status === 'active' ? '#10b981' : '#6b7280', fontSize: 12, cursor: 'pointer', textTransform: 'capitalize' }}>
                      {row.status || 'draft'}
                    </button>
                  </td>
                  <td style={{ padding: '10px 14px' }}>
                    <button onClick={() => openEdit(row)}
                      style={{ background: 'transparent', border: '1px solid #333', borderRadius: 4, color: '#aaa', padding: '4px 12px', fontSize: 12, cursor: 'pointer' }}>
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: '#000000aa', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: 32, width: 480, maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ color: '#fff', margin: '0 0 24px', fontSize: 18 }}>{editProduct ? 'Edit Product' : 'Add Product'}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {([
                { key: 'name', label: 'Name', type: 'text' },
                { key: 'sku', label: 'SKU (required, unique)', type: 'text' },
                { key: 'slug', label: 'Slug (URL key, e.g. leggings)', type: 'text' },
                { key: 'price', label: 'Base Price (USD)', type: 'number' },
                { key: 'description', label: 'Description', type: 'text' },
                { key: 'moq', label: 'MOQ', type: 'number' },
                { key: 'lead_time', label: 'Lead Time', type: 'text' },
                { key: 'image_url', label: 'Main Image URL (or upload below)', type: 'text' },
              ] as { key: keyof typeof EMPTY_FORM; label: string; type: string }[]).map(field => (
                <div key={field.key}>
                  <label style={{ display: 'block', color: '#888', fontSize: 12, marginBottom: 5 }}>{field.label}</label>
                  <input type={field.type} value={form[field.key] as string | number}
                    onChange={e => setForm(prev => ({ ...prev, [field.key]: field.type === 'number' ? Number(e.target.value) : e.target.value }))}
                    style={{ width: '100%', background: '#1a1a1a', border: '1px solid #2e2e2e', borderRadius: 6, padding: '8px 12px', color: '#fff', fontSize: 14, boxSizing: 'border-box', outline: 'none' }}
                  />
                </div>
              ))}
              <div>
                <label style={{ display: 'block', color: '#888', fontSize: 12, marginBottom: 5 }}>Category</label>
                <select value={form.category} onChange={e => setForm(prev => ({ ...prev, category: e.target.value }))}
                  style={{ width: '100%', background: '#1a1a1a', border: '1px solid #2e2e2e', borderRadius: 6, padding: '8px 12px', color: '#fff', fontSize: 14, boxSizing: 'border-box' }}>
                  {CATEGORY_OPTIONS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', color: '#888', fontSize: 12, marginBottom: 5 }}>Status</label>
                <select value={form.status} onChange={e => setForm(prev => ({ ...prev, status: e.target.value }))}
                  style={{ width: '100%', background: '#1a1a1a', border: '1px solid #2e2e2e', borderRadius: 6, padding: '8px 12px', color: '#fff', fontSize: 14, boxSizing: 'border-box' }}>
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="discontinued">Discontinued</option>
                </select>
              </div>
              {/* Upload main image */}
              <div>
                <label style={{ display: 'block', color: '#888', fontSize: 12, marginBottom: 5 }}>Upload Main Image</label>
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#1a1a1a', border: '1px solid #2e2e2e', borderRadius: 6, padding: '7px 14px', color: '#aaa', fontSize: 13, cursor: 'pointer' }}>
                  {uploading ? 'Uploading...' : '📁 Choose File'}
                  <input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleUpload(e, 'image_url')} disabled={uploading} />
                </label>
                {(form as any).image_url && (
                  <img src={(form as any).image_url} alt="" style={{ marginTop: 8, height: 60, borderRadius: 6, objectFit: 'cover', display: 'block' }} />
                )}
              </div>

              <div>
                <label style={{ display: 'block', color: '#888', fontSize: 12, marginBottom: 5 }}>Colors (comma-separated)</label>
                <input type="text" value={(form as any).colors}
                  onChange={e => setForm(prev => ({ ...prev, colors: e.target.value }))}
                  placeholder="Black, White, Navy, Red..."
                  style={{ width: '100%', background: '#1a1a1a', border: '1px solid #2e2e2e', borderRadius: 6, padding: '8px 12px', color: '#fff', fontSize: 14, boxSizing: 'border-box', outline: 'none' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', color: '#888', fontSize: 12, marginBottom: 5 }}>Sizes (comma-separated)</label>
                <input type="text" value={(form as any).sizes}
                  onChange={e => setForm(prev => ({ ...prev, sizes: e.target.value }))}
                  placeholder="XS, S, M, L, XL, XXL, XXXL"
                  style={{ width: '100%', background: '#1a1a1a', border: '1px solid #2e2e2e', borderRadius: 6, padding: '8px 12px', color: '#fff', fontSize: 14, boxSizing: 'border-box', outline: 'none' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', color: '#888', fontSize: 12, marginBottom: 5 }}>Additional Images (one URL per line)</label>
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#1a1a1a', border: '1px solid #2e2e2e', borderRadius: 6, padding: '7px 14px', color: '#aaa', fontSize: 13, cursor: 'pointer', marginBottom: 8 }}>
                  {uploading ? 'Uploading...' : '📁 Upload Images (multi-select)'}
                  <input type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={e => handleUpload(e, 'images')} disabled={uploading} />
                </label>
                <textarea value={(form as any).images}
                  onChange={e => setForm(prev => ({ ...prev, images: e.target.value }))}
                  rows={3}
                  placeholder="https://... (auto-filled after upload, or paste URLs manually)"
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
