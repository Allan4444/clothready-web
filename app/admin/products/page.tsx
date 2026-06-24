'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { supabaseAdmin } from '@/lib/supabase-admin-client'

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

// DB category values → display names
const CATEGORY_OPTIONS: { value: string; label: string }[] = [
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
  category: 'fitness',
  description: '',
  moq: 100,
  lead_time: '',
  image_url: '',
  status: 'active',
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filtered, setFiltered] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [catFilter, setCatFilter] = useState('All')
  const [showModal, setShowModal] = useState(false)
  const [editProduct, setEditProduct] = useState<Product | null>(null)
  const [form, setForm] = useState<typeof EMPTY_FORM>(EMPTY_FORM)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadProducts()
  }, [])

  async function loadProducts() {
    const { data } = await supabaseAdmin.from('products').select('*').order('created_at', { ascending: false })
    const rows = (data || []) as Product[]
    setProducts(rows)
    setFiltered(rows)
    setLoading(false)
  }

  useEffect(() => {
    if (catFilter === 'All') {
      setFiltered(products)
    } else {
      setFiltered(products.filter(p => p.category === catFilter))
    }
  }, [catFilter, products])

  function openAdd() {
    setEditProduct(null)
    setForm(EMPTY_FORM)
    setShowModal(true)
  }

  function openEdit(p: Product) {
    setEditProduct(p)
    setForm({
      name: p.name,
      sku: p.sku,
      category: p.category,
      description: p.description,
      moq: p.moq,
      lead_time: p.lead_time,
      image_url: p.image_url,
      status: p.status || 'active',
    })
    setShowModal(true)
  }

  async function handleSave() {
    setSaving(true)
    if (editProduct) {
      await supabaseAdmin.from('products').update(form).eq('id', editProduct.id)
    } else {
      await supabaseAdmin.from('products').insert([form])
    }
    await loadProducts()
    setShowModal(false)
    setSaving(false)
  }

  async function toggleStatus(p: Product) {
    const newStatus = p.status === 'active' ? 'draft' : 'active'
    await supabaseAdmin.from('products').update({ status: newStatus }).eq('id', p.id)
    setProducts(prev => prev.map(x => x.id === p.id ? { ...x, status: newStatus } : x))
  }

  if (loading) return <div style={{ color: '#555', padding: 40 }}>Loading...</div>

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {FILTER_CATEGORIES.map(c => (
            <button
              key={c.value}
              onClick={() => setCatFilter(c.value)}
              style={{
                padding: '5px 12px',
                borderRadius: 99,
                border: '1px solid',
                borderColor: catFilter === c.value ? '#ff4757' : '#333',
                background: catFilter === c.value ? '#ff475722' : 'transparent',
                color: catFilter === c.value ? '#ff4757' : '#888',
                fontSize: 12,
                cursor: 'pointer',
              }}
            >
              {c.label}
            </button>
          ))}
        </div>
        <button
          onClick={openAdd}
          style={{ background: '#ff4757', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 16px', fontSize: 14, fontWeight: 600, cursor: 'pointer', marginLeft: 12, whiteSpace: 'nowrap' }}
        >
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
                <tr
                  key={row.id}
                  style={{ borderBottom: '1px solid #161616' }}
                  onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.background = '#161616'}
                  onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'}
                >
                  <td style={{ padding: '10px 14px', color: '#fff', fontSize: 14 }}>{row.name}</td>
                  <td style={{ padding: '10px 14px', color: '#aaa', fontSize: 14 }}>{row.sku}</td>
                  <td style={{ padding: '10px 14px', color: '#aaa', fontSize: 14 }}>{CATEGORY_LABEL[row.category] || row.category}</td>
                  <td style={{ padding: '10px 14px', color: '#aaa', fontSize: 14 }}>{row.moq}</td>
                  <td style={{ padding: '10px 14px', color: '#aaa', fontSize: 14 }}>{row.lead_time}</td>
                  <td style={{ padding: '10px 14px' }}>
                    <button
                      onClick={() => toggleStatus(row)}
                      style={{
                        padding: '3px 12px',
                        borderRadius: 99,
                        border: 'none',
                        background: row.status === 'active' ? '#10b98122' : '#6b728022',
                        color: row.status === 'active' ? '#10b981' : '#6b7280',
                        fontSize: 12,
                        cursor: 'pointer',
                        textTransform: 'capitalize',
                      }}
                    >
                      {row.status || 'draft'}
                    </button>
                  </td>
                  <td style={{ padding: '10px 14px' }}>
                    <button
                      onClick={() => openEdit(row)}
                      style={{ background: 'transparent', border: '1px solid #333', borderRadius: 4, color: '#aaa', padding: '4px 12px', fontSize: 12, cursor: 'pointer' }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: '#000000aa', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: 32, width: 480, maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ color: '#fff', margin: '0 0 24px', fontSize: 18 }}>{editProduct ? 'Edit Product' : 'Add Product'}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {([
                { key: 'name', label: 'Name', type: 'text' },
                { key: 'sku', label: 'SKU (required, unique)', type: 'text' },
                { key: 'description', label: 'Description', type: 'text' },
                { key: 'moq', label: 'MOQ', type: 'number' },
                { key: 'lead_time', label: 'Lead Time', type: 'text' },
                { key: 'image_url', label: 'Image URL', type: 'text' },
              ] as { key: keyof typeof EMPTY_FORM; label: string; type: string }[]).map(field => (
                <div key={field.key}>
                  <label style={{ display: 'block', color: '#888', fontSize: 12, marginBottom: 5 }}>{field.label}</label>
                  <input
                    type={field.type}
                    value={form[field.key] as string | number}
                    onChange={e => setForm(prev => ({ ...prev, [field.key]: field.type === 'number' ? Number(e.target.value) : e.target.value }))}
                    style={{ width: '100%', background: '#1a1a1a', border: '1px solid #2e2e2e', borderRadius: 6, padding: '8px 12px', color: '#fff', fontSize: 14, boxSizing: 'border-box', outline: 'none' }}
                  />
                </div>
              ))}
              <div>
                <label style={{ display: 'block', color: '#888', fontSize: 12, marginBottom: 5 }}>Category</label>
                <select
                  value={form.category}
                  onChange={e => setForm(prev => ({ ...prev, category: e.target.value }))}
                  style={{ width: '100%', background: '#1a1a1a', border: '1px solid #2e2e2e', borderRadius: 6, padding: '8px 12px', color: '#fff', fontSize: 14, boxSizing: 'border-box' }}
                >
                  {CATEGORY_OPTIONS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', color: '#888', fontSize: 12, marginBottom: 5 }}>Status</label>
                <select
                  value={form.status}
                  onChange={e => setForm(prev => ({ ...prev, status: e.target.value }))}
                  style={{ width: '100%', background: '#1a1a1a', border: '1px solid #2e2e2e', borderRadius: 6, padding: '8px 12px', color: '#fff', fontSize: 14, boxSizing: 'border-box' }}
                >
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="discontinued">Discontinued</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
              <button
                onClick={handleSave}
                disabled={saving}
                style={{ background: '#ff4757', color: '#fff', border: 'none', borderRadius: 6, padding: '9px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
              <button
                onClick={() => setShowModal(false)}
                style={{ background: 'transparent', border: '1px solid #333', color: '#aaa', borderRadius: 6, padding: '9px 20px', fontSize: 14, cursor: 'pointer' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
