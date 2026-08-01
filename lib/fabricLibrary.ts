export interface Fabric {
  slug: string
  name: string
  composition: string
  weight: string
  stretch: string
  moisture: string
  bestFor: string[]
  category: 'Activewear' | 'Streetwear' | 'Basics'
}

export const FABRIC_LIBRARY: Fabric[] = [
  {
    slug: 'nylon-spandex-80-20',
    name: 'Nylon/Spandex (80/20)',
    composition: '80% Nylon, 20% Spandex',
    weight: '200–230 GSM',
    stretch: '4-way stretch, ~35–45% elongation',
    moisture: 'Moisture-wicking',
    bestFor: ['Leggings', 'Compression wear', 'Sports bras'],
    category: 'Activewear',
  },
  {
    slug: 'polyester-spandex-88-12',
    name: 'Polyester/Spandex (88/12)',
    composition: '88% Polyester, 12% Spandex',
    weight: '180–210 GSM',
    stretch: '4-way stretch, ~30–40% elongation',
    moisture: 'Moisture-wicking, quick-dry',
    bestFor: ['Training tees', 'Tanks', 'Matching sets'],
    category: 'Activewear',
  },
  {
    slug: 'nylon-spandex-75-25-compression',
    name: 'Nylon/Spandex (75/25) — Compression',
    composition: '75% Nylon, 25% Spandex',
    weight: '250 GSM',
    stretch: '4-way stretch, ~45–55% elongation (high recovery)',
    moisture: 'Moisture-wicking',
    bestFor: ['Compression leggings', 'High-impact sports bras'],
    category: 'Activewear',
  },
  {
    slug: 'repreve-recycled-nylon',
    name: 'Recycled REPREVE® Nylon',
    composition: 'GRS-certified recycled nylon/spandex blend',
    weight: '200–220 GSM',
    stretch: '4-way stretch, ~35–45% elongation',
    moisture: 'Moisture-wicking',
    bestFor: ['Sustainable activewear lines', 'Eco-conscious brands'],
    category: 'Activewear',
  },
  {
    slug: 'french-terry',
    name: 'French Terry',
    composition: 'Cotton/Poly blend, brushed interior loop',
    weight: '320–380 GSM',
    stretch: '2-way stretch, ~15–20% elongation',
    moisture: 'Breathable, low moisture-wicking',
    bestFor: ['Premium hoodies', 'Sweatshirts', 'Joggers'],
    category: 'Streetwear',
  },
  {
    slug: 'cotton-poly-fleece',
    name: 'Cotton/Poly Fleece',
    composition: '80% Cotton, 20% Polyester',
    weight: '280–320 GSM',
    stretch: '2-way stretch, ~10–15% elongation',
    moisture: 'Breathable',
    bestFor: ['Everyday hoodies', 'Crewnecks', 'Budget-friendly warm-ups'],
    category: 'Streetwear',
  },
  {
    slug: 'ripstop-nylon',
    name: 'Ripstop Nylon',
    composition: '100% Nylon, ripstop weave',
    weight: '180–220 GSM',
    stretch: 'Minimal stretch, woven',
    moisture: 'Water-resistant (with DWR)',
    bestFor: ['Joggers', 'Windbreakers', 'Track pants'],
    category: 'Streetwear',
  },
  {
    slug: 'cotton-100',
    name: '100% Cotton',
    composition: '100% Combed Cotton',
    weight: '160–220 GSM',
    stretch: 'No stretch, woven/knit',
    moisture: 'Breathable, absorbent',
    bestFor: ['T-shirts', 'Tanks', 'Classic fit basics'],
    category: 'Basics',
  },
  {
    slug: 'cotton-poly-blend',
    name: 'Cotton/Poly Blend (Tri-Blend)',
    composition: '50% Cotton, 25% Poly, 25% Rayon',
    weight: '150–180 GSM',
    stretch: 'Slight stretch, soft drape',
    moisture: 'Breathable, quick-dry',
    bestFor: ['Fashion-fit tees', 'Vintage-wash graphics'],
    category: 'Basics',
  },
  {
    slug: 'seamless-knit',
    name: 'Seamless Ribbed Knit',
    composition: '92% Nylon, 8% Spandex, seamless construction',
    weight: '220–260 GSM',
    stretch: '4-way stretch, ~40–50% elongation',
    moisture: 'Moisture-wicking',
    bestFor: ['Matching sets', 'Bodysuits', 'Seamless leggings'],
    category: 'Activewear',
  },
]

export function getFabricBySlug(slug: string): Fabric | undefined {
  return FABRIC_LIBRARY.find((f) => f.slug === slug)
}
