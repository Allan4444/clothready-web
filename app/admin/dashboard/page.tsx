'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Inquiry {
  id: string
  first_name: string
  last_name: string
  company: string
  product_category: string
  created_at: string
  status: string
}

interface Stats {
  thisMonth: number
  lastMonth: number
  newCount: number
  wonCount: number
  pendingSamples: number
}

interface FunnelStage {
  label: string
  count: number
  color: string
}

const STATUS_COLORS: Record<string, string> = {
  new: '#3b82f6',
  'following up': '#f59e0b',
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

function StatCard({ label, value, sub }: { label: string; value: number | string; sub?: string }) {
  return (
    <div style={{
      background: '#111',
      border: '1px solid #1e1e1e',
      borderRadius: 10,
      padding: '20px 24px',
      flex: 1,
    }}>
      <div style={{ color: '#666', fontSize: 13, marginBottom: 8 }}>{label}</div>
      <div style={{ color: '#fff', fontSize: 28, fontWeight: 700 }}>{value}</div>
      {sub && <div style={{ color: '#555', fontSize: 12, marginTop: 4 }}>{sub}</div>}
    </div>
  )
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({ thisMonth: 0, lastMonth: 0, newCount: 0, wonCount: 0, pendingSamples: 0 })
  const [funnel, setFunnel] = useState<FunnelStage[]>([])
  const [recent, setRecent] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const now = new Date()
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
      const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString()
      const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59).toISOString()

      const [thisMonthRes, lastMonthRes, allRes, samplesRes, recentRes] = await Promise.all([
        supabase.from('inquiries').select('id', { count: 'exact', head: true }).gte('created_at', startOfMonth),
        supabase.from('inquiries').select('id', { count: 'exact', head: true }).gte('created_at', startOfLastMonth).lte('created_at', endOfLastMonth),
        supabase.from('inquiries').select('status'),
        supabase.from('sample_orders').select('id', { count: 'exact', head: true }).eq('status', 'Pending'),
        supabase.from('inquiries').select('id,first_name,last_name,company,product_category,created_at,status').order('created_at', { ascending: false }).limit(5),
      ])

      const allInquiries = allRes.data || []
      const statusCounts: Record<string, number> = {}
      for (const row of allInquiries) {
        const s = (row.status || 'New').toLowerCase()
        statusCounts[s] = (statusCounts[s] || 0) + 1
      }

      const total = allInquiries.length || 1
      const funnelStages: FunnelStage[] = [
        { label: 'New', count: statusCounts['new'] || 0, color: '#3b82f6' },
        { label: 'Following Up', count: statusCounts['following up'] || 0, color: '#f59e0b' },
        { label: 'Quoted', count: statusCounts['quoted'] || 0, color: '#8b5cf6' },
        { label: 'Won', count: statusCounts['won'] || 0, color: '#10b981' },
      ]

      setStats({
        thisMonth: thisMonthRes.count || 0,
        lastMonth: lastMonthRes.count || 0,
        newCount: statusCounts['new'] || 0,
        wonCount: statusCounts['won'] || 0,
        pendingSamples: samplesRes.count || 0,
      })
      setFunnel(funnelStages)
      setRecent((recentRes.data || []) as Inquiry[])
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <div style={{ color: '#555', padding: 40 }}>Loading...</div>

  const diff = stats.thisMonth - stats.lastMonth
  const diffLabel = diff > 0 ? `+${diff} vs last month` : diff < 0 ? `${diff} vs last month` : 'Same as last month'

  return (
    <div>
      {/* Stats row */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        <StatCard label="This Month's Inquiries" value={stats.thisMonth} sub={diffLabel} />
        <StatCard label="New Inquiries" value={stats.newCount} />
        <StatCard label="Won Deals" value={stats.wonCount} />
        <StatCard label="Pending Samples" value={stats.pendingSamples} />
      </div>

      {/* Funnel */}
      <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 10, padding: 24, marginBottom: 24 }}>
        <h2 style={{ margin: '0 0 20px', color: '#fff', fontSize: 15, fontWeight: 600 }}>Status Funnel</h2>
        <div style={{ display: 'flex', gap: 12 }}>
          {funnel.map(stage => {
            const total = funnel.reduce((a, b) => a + b.count, 0) || 1
            const pct = Math.round((stage.count / total) * 100)
            return (
              <div key={stage.label} style={{ flex: 1 }}>
                <div style={{ color: '#888', fontSize: 12, marginBottom: 6 }}>{stage.label}</div>
                <div style={{ background: '#1e1e1e', borderRadius: 4, height: 8, overflow: 'hidden', marginBottom: 6 }}>
                  <div style={{ background: stage.color, width: `${pct}%`, height: '100%', borderRadius: 4 }} />
                </div>
                <div style={{ color: '#fff', fontWeight: 700, fontSize: 18 }}>{stage.count}</div>
                <div style={{ color: '#555', fontSize: 12 }}>{pct}%</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Recent inquiries */}
      <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 10, padding: 24 }}>
        <h2 style={{ margin: '0 0 16px', color: '#fff', fontSize: 15, fontWeight: 600 }}>Recent Inquiries</h2>
        {recent.length === 0 ? (
          <div style={{ color: '#555', textAlign: 'center', padding: 32 }}>No records found</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1e1e1e' }}>
                {['Name', 'Company', 'Product', 'Submitted', 'Status'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: '#555', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recent.map(row => (
                <tr key={row.id} style={{ borderBottom: '1px solid #161616' }}
                  onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.background = '#161616'}
                  onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'}
                >
                  <td style={{ padding: '10px 12px', color: '#fff', fontSize: 14 }}>{row.first_name} {row.last_name}</td>
                  <td style={{ padding: '10px 12px', color: '#aaa', fontSize: 14 }}>{row.company}</td>
                  <td style={{ padding: '10px 12px', color: '#aaa', fontSize: 14 }}>{row.product_category}</td>
                  <td style={{ padding: '10px 12px', color: '#aaa', fontSize: 14 }}>{new Date(row.created_at).toLocaleDateString()}</td>
                  <td style={{ padding: '10px 12px' }}><StatusBadge status={row.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
