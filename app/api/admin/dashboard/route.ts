import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { sbSelect } from '@/lib/supabase-admin-fetch'

function isAuthed() {
  return cookies().get('admin_auth')?.value === 'true'
}

export async function GET() {
  if (!isAuthed()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString()
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59).toISOString()

    const [all, recent] = await Promise.all([
      sbSelect('enquiries', 'select=created_at,status'),
      sbSelect('enquiries', 'select=id,first_name,last_name,company,product_category,created_at,status&order=created_at.desc&limit=5'),
    ])

    const allInquiries = all as any[]
    const statusCounts: Record<string, number> = {}
    let thisMonth = 0
    let lastMonth = 0

    for (const row of allInquiries) {
      const s = (row.status || 'new').toLowerCase()
      statusCounts[s] = (statusCounts[s] || 0) + 1
      if (row.created_at >= startOfMonth) thisMonth++
      else if (row.created_at >= startOfLastMonth && row.created_at <= endOfLastMonth) lastMonth++
    }

    let pendingSamples = 0
    try {
      const samples = await sbSelect('sample_orders', 'select=id&status=eq.pending')
      pendingSamples = samples.length
    } catch {}

    return NextResponse.json({ thisMonth, lastMonth, statusCounts, pendingSamples, recent })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
