'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'

interface Customer {
  id: string
  company: string
  contact_name: string
  email: string
  phone: string
  country: string
  created_at: string
}

interface Inquiry {
  id: string
  product_category: string
  quantity_range: string
  created_at: string
  status: string
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [filtered, setFiltered] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [customerInquiries, setCustomerInquiries] = useState<Record<string, Inquiry[]>>({})

  useEffect(() => {
    async function load() {
      const res = await fetch('/api/admin/clients')
      const json = await res.json()
      const rows = (json.data || []) as Customer[]
      setCustomers(rows)
      setFiltered(rows)
      setLoading(false)
    }
    load()
  }, [])

  useEffect(() => {
    const q = search.toLowerCase()
    if (!q) {
      setFiltered(customers)
    } else {
      setFiltered(customers.filter(c =>
        c.company?.toLowerCase().includes(q) ||
        c.contact_name?.toLowerCase().includes(q)
      ))
    }
  }, [search, customers])

  async function loadInquiries(email: string, customerId: string) {
    if (customerInquiries[customerId]) return
    const res = await fetch(`/api/admin/enquiries?email=${encodeURIComponent(email)}`)
    const json = await res.json()
    setCustomerInquiries(prev => ({ ...prev, [customerId]: (json.data || []) as Inquiry[] }))
  }

  function handleExpand(c: Customer) {
    if (expanded === c.id) {
      setExpanded(null)
    } else {
      setExpanded(c.id)
      loadInquiries(c.email, c.id)
    }
  }

  if (loading) return <div style={{ color: '#555', padding: 40 }}>Loading...</div>

  return (
    <div>
      {/* Search */}
      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Search by company or contact name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            background: '#1a1a1a',
            border: '1px solid #2e2e2e',
            borderRadius: 6,
            padding: '9px 14px',
            color: '#fff',
            fontSize: 14,
            width: 320,
            outline: 'none',
          }}
        />
      </div>

      <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 10, overflow: 'hidden' }}>
        {filtered.length === 0 ? (
          <div style={{ color: '#555', textAlign: 'center', padding: 48 }}>No records found</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1e1e1e' }}>
                {['Company', 'Contact', 'Email', 'Phone', 'Country', 'First Contact'].map(h => (
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
                    onClick={() => handleExpand(row)}
                    onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.background = '#161616'}
                    onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'}
                  >
                    <td style={{ padding: '10px 14px', color: '#fff', fontSize: 14 }}>{row.company}</td>
                    <td style={{ padding: '10px 14px', color: '#aaa', fontSize: 14 }}>{row.contact_name}</td>
                    <td style={{ padding: '10px 14px', color: '#aaa', fontSize: 14 }}>{row.email}</td>
                    <td style={{ padding: '10px 14px', color: '#aaa', fontSize: 14 }}>{row.phone || '—'}</td>
                    <td style={{ padding: '10px 14px', color: '#aaa', fontSize: 14 }}>{row.country || '—'}</td>
                    <td style={{ padding: '10px 14px', color: '#aaa', fontSize: 14 }}>{new Date(row.created_at).toLocaleDateString()}</td>
                  </tr>
                  {expanded === row.id && (
                    <tr key={row.id + '-exp'} style={{ borderBottom: '1px solid #1e1e1e' }}>
                      <td colSpan={6} style={{ padding: '16px 14px', background: '#0e0e0e' }}>
                        <div style={{ color: '#555', fontSize: 12, marginBottom: 10 }}>INQUIRIES FROM THIS CUSTOMER</div>
                        {!customerInquiries[row.id] ? (
                          <div style={{ color: '#555', fontSize: 13 }}>Loading...</div>
                        ) : customerInquiries[row.id].length === 0 ? (
                          <div style={{ color: '#555', fontSize: 13 }}>No inquiries found</div>
                        ) : (
                          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                              <tr>
                                {['Product', 'Quantity', 'Date', 'Status'].map(h => (
                                  <th key={h} style={{ textAlign: 'left', padding: '6px 12px', color: '#444', fontSize: 11, fontWeight: 600 }}>{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {customerInquiries[row.id].map(inq => (
                                <tr key={inq.id}>
                                  <td style={{ padding: '6px 12px', color: '#ccc', fontSize: 13 }}>{inq.product_category}</td>
                                  <td style={{ padding: '6px 12px', color: '#ccc', fontSize: 13 }}>{inq.quantity_range}</td>
                                  <td style={{ padding: '6px 12px', color: '#ccc', fontSize: 13 }}>{new Date(inq.created_at).toLocaleDateString()}</td>
                                  <td style={{ padding: '6px 12px', color: '#ccc', fontSize: 13 }}>{inq.status || 'New'}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
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
