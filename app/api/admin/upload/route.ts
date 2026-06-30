import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

function isAuthed() {
  return cookies().get('admin_auth')?.value === 'true'
}

export async function POST(req: NextRequest) {
  if (!isAuthed()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const formData = await req.formData()
  const file = formData.get('file') as File | null
  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

  const ext = file.name.split('.').pop() || 'jpg'
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const arrayBuffer = await file.arrayBuffer()

  const res = await fetch(
    `${SUPABASE_URL}/storage/v1/object/product-images/${fileName}`,
    {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': file.type || 'image/jpeg',
        'x-upsert': 'true',
      },
      body: arrayBuffer,
    }
  )

  if (!res.ok) {
    const err = await res.text()
    return NextResponse.json({ error: err }, { status: 500 })
  }

  const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/product-images/${fileName}`
  return NextResponse.json({ url: publicUrl })
}
