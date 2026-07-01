import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const HEADERS = {
  'Content-Type': 'application/json',
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Prefer': 'return=representation',
}

function isAuthed() {
  return cookies().get('admin_auth')?.value === 'true'
}

const SEED_PRODUCTS = [
  {
    slug: 'leggings',
    name: 'Leggings & Yoga Pants',
    sku: 'CL-LEG-001',
    price: 14,
    description: 'High-performance leggings and yoga pants crafted from premium Nylon/Spandex blend. 4-way stretch construction allows full freedom of movement during any workout.',
    colors: ['Black', 'White', 'Navy', 'Charcoal', 'Red', 'Royal Blue', 'Forest Green', 'Burgundy', 'Beige', 'Pink', 'Olive', 'Camel'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
    images: ['https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=85'],
    status: 'active',
    category: 'bottoms',
  },
  {
    slug: 'sports-bra',
    name: 'Sports Bras & Tops',
    sku: 'CL-BRA-001',
    price: 10,
    description: 'Supportive sports bras and crop tops engineered for high-impact activities. Breathable mesh panels enhance airflow. Removable pads included.',
    colors: ['Black', 'White', 'Navy', 'Charcoal', 'Red', 'Royal Blue', 'Forest Green', 'Burgundy', 'Beige', 'Pink', 'Olive', 'Camel'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    images: ['https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=85'],
    status: 'active',
    category: 'tops',
  },
  {
    slug: 'hoodie',
    name: 'Hoodies & Sweatshirts',
    sku: 'CL-HOD-001',
    price: 20,
    description: 'Premium hoodies and sweatshirts in heavyweight French terry and fleece. Drop-shoulder or standard fit. Embroidery, screen print, and heat transfer customization available.',
    colors: ['Black', 'White', 'Navy', 'Charcoal', 'Red', 'Royal Blue', 'Forest Green', 'Burgundy', 'Beige', 'Pink', 'Olive', 'Camel'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
    images: ['https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&q=85'],
    status: 'active',
    category: 'tops',
  },
  {
    slug: 'joggers',
    name: 'Joggers & Track Pants',
    sku: 'CL-JOG-001',
    price: 16,
    description: 'Comfortable joggers and track pants in cotton blend and ripstop nylon. Elastic waistband with drawstring. Tapered or straight leg.',
    colors: ['Black', 'White', 'Navy', 'Charcoal', 'Red', 'Royal Blue', 'Forest Green', 'Burgundy', 'Beige', 'Pink', 'Olive', 'Camel'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
    images: ['https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=85'],
    status: 'active',
    category: 'bottoms',
  },
  {
    slug: 'tshirt',
    name: 'T-Shirts & Tanks',
    sku: 'CL-TEE-001',
    price: 7,
    description: 'Classic and fashion-fit tees and tanks in 100% cotton and cotton-poly blends. Screen print, DTG, embroidery, and heat transfer options.',
    colors: ['Black', 'White', 'Navy', 'Charcoal', 'Red', 'Royal Blue', 'Forest Green', 'Burgundy', 'Beige', 'Pink', 'Olive', 'Camel'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=85'],
    status: 'active',
    category: 'tops',
  },
  {
    slug: 'jacket',
    name: 'Jackets & Outerwear',
    sku: 'CL-JAC-001',
    price: 38,
    description: 'Technical and fashion outerwear in windbreaker nylon, softshell, and down-fill construction. YKK zippers. Custom lining, logo patch, and labeling available.',
    colors: ['Black', 'White', 'Navy', 'Charcoal', 'Red', 'Royal Blue', 'Forest Green', 'Burgundy', 'Beige', 'Pink', 'Olive', 'Camel'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
    images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=85'],
    status: 'active',
    category: 'outerwear',
  },
  {
    slug: 'shorts',
    name: 'Shorts & Skorts',
    sku: 'CL-SHO-001',
    price: 9,
    description: 'Quick-dry shorts and skorts for running, training, and casual wear. Built-in liner available. Side pockets and back zip pocket options.',
    colors: ['Black', 'White', 'Navy', 'Charcoal', 'Red', 'Royal Blue', 'Forest Green', 'Burgundy', 'Beige', 'Pink', 'Olive', 'Camel'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    images: ['https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=85'],
    status: 'active',
    category: 'bottoms',
  },
  {
    slug: 'sets',
    name: 'Matching Sets',
    sku: 'CL-SET-001',
    price: 29,
    description: "Coordinated two-piece matching sets in seamless knit and ribbed fabric. Perfect for your brand's core activewear collection. All pieces color-matched from the same dye lot.",
    colors: ['Black', 'White', 'Navy', 'Charcoal', 'Red', 'Royal Blue', 'Forest Green', 'Burgundy', 'Beige', 'Pink', 'Olive', 'Camel'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    images: ['https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=800&q=85'],
    status: 'active',
    category: 'sets',
  },
]

export async function POST() {
  if (!isAuthed()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    // Fetch existing products by slug
    const existingRes = await fetch(
      `${SUPABASE_URL}/rest/v1/products?slug=in.(${SEED_PRODUCTS.map(p => p.slug).join(',')})&select=id,slug`,
      { headers: HEADERS }
    )
    const existing: { id: string; slug: string }[] = existingRes.ok ? await existingRes.json() : []
    const existingBySlug = Object.fromEntries(existing.map(p => [p.slug, p.id]))

    const results = { inserted: 0, updated: 0, errors: [] as string[] }

    for (const product of SEED_PRODUCTS) {
      const existingId = existingBySlug[product.slug]
      if (existingId) {
        // Update existing
        const res = await fetch(`${SUPABASE_URL}/rest/v1/products?id=eq.${existingId}`, {
          method: 'PATCH',
          headers: HEADERS,
          body: JSON.stringify(product),
        })
        if (res.ok) results.updated++
        else results.errors.push(`update ${product.slug}: ${await res.text()}`)
      } else {
        // Insert new
        const res = await fetch(`${SUPABASE_URL}/rest/v1/products`, {
          method: 'POST',
          headers: HEADERS,
          body: JSON.stringify(product),
        })
        if (res.ok) results.inserted++
        else results.errors.push(`insert ${product.slug}: ${await res.text()}`)
      }
    }

    return NextResponse.json(results)
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
