import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  return createClient(url, key)
}

function isAuthed() {
  return cookies().get('admin_auth')?.value === 'true'
}

export async function GET() {
  if (!isAuthed()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const sb = getAdminClient()

  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString()
  const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59).toISOString()

  const [thisMonthRes, lastMonthRes, allRes, samplesRes, recentRes] = await Promise.all([
    sb.from('enquiries').select('id', { count: 'exact', head: true }).gte('created_at', startOfMonth),
    sb.from('enquiries').select('id', { count: 'exact', head: true }).gte('created_at', startOfLastMonth).lte('created_at', endOfLastMonth),
    sb.from('enquiries').select('status'),
    sb.from('sample_orders').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
    sb.from('enquiries').select('id,first_name,last_name,company,product_category,created_at,status').order('created_at', { ascending: false }).limit(5),
  ])

  const allInquiries = allRes.data || []
  const statusCounts: Record<string, number> = {}
  for (const row of allInquiries) {
    const s = (row.status || 'new').toLowerCase()
    statusCounts[s] = (statusCounts[s] || 0) + 1
  }

  return NextResponse.json({
    thisMonth: thisMonthRes.count || 0,
    lastMonth: lastMonthRes.count || 0,
    statusCounts,
    pendingSamples: samplesRes.count || 0,
    recent: recentRes.data || [],
  })
}
