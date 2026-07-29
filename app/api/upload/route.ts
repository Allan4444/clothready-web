import { NextRequest, NextResponse } from 'next/server'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const BUCKET = 'inquiry-attachments'
const MAX_SIZE = 15 * 1024 * 1024 // 15MB
const ALLOWED_EXT = new Set(['pdf', 'ai', 'psd', 'eps', 'jpg', 'jpeg', 'png', 'zip', 'doc', 'docx'])

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('file') as File | null
  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: 'File too large (max 15MB)' }, { status: 400 })
  }

  const ext = (file.name.split('.').pop() || '').toLowerCase()
  if (!ALLOWED_EXT.has(ext)) {
    return NextResponse.json({ error: `File type .${ext} not allowed` }, { status: 400 })
  }

  const originalName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-')
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${originalName}`
  const arrayBuffer = await file.arrayBuffer()

  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/${BUCKET}/${fileName}`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': file.type || 'application/octet-stream',
      'x-upsert': 'true',
    },
    body: arrayBuffer,
  })

  if (!res.ok) {
    const err = await res.text()
    return NextResponse.json({ error: err }, { status: 500 })
  }

  const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${fileName}`
  return NextResponse.json({ url: publicUrl, name: file.name })
}
