import Reveal from '@/components/ui/Reveal'
import Link from 'next/link'

export const metadata = {
  title: 'Products — Fitness Wear & Streetwear Manufacturer',
  description: 'Browse our product capabilities: fitness wear, activewear, streetwear, hoodies, joggers, tees, leggings. MOQ from 50 pieces. Custom OEM/ODM available.',
}

const CATEGORIES = [
  { name: 'Fitness & Activewear', img: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=600&q=80', items: ['Leggings & Yoga Pants', 'Sports Bras & Tops', 'Compression Wear', 'Track Suits'] },
  { name: 'Streetwear', img: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&q=80', items: ['Hoodies & Sweatshirts', 'Oversized Tees', 'Joggers & Pants', 'Bomber Jackets'] },
  { name: 'Casual & Lifestyle', img: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&q=80', items: ['Polo Shirts', 'Crewneck Sweaters', 'Casual Pants', 'Outerwear'] },
  { name: 'Custom OEM/ODM', img: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&q=80', items: ['Tech Pack Development', 'Pattern Making', 'Sample Production', 'Bulk Manufacturing'] },
]

export default function ProductsPage() {
  return (
    <>
      <section className="section pt-32">
        <div className="container-1200 text-center">
          <Reveal>
            <div className="section-label"><i className="fas fa-tshirt" /> Capabilities</div>
            <h1 className="section-title">Our Products</h1>
            <p className="section-subtitle mx-auto">
              Fitness wear, streetwear, and casual apparel — from concept to delivery
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-1200">
          <div className="grid-2">
            {CATEGORIES.map((cat) => (
              <Reveal key={cat.name}>
                <div className="card overflow-hidden p-0">
                  <div className="aspect-[16/9] overflow-hidden">
                    <img src={cat.img} alt={cat.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3">{cat.name}</h3>
                    <ul className="space-y-2 mb-4">
                      {cat.items.map((i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-custom">
                          <i className="fas fa-check text-success" /> {i}
                        </li>
                      ))}
                    </ul>
                    <Link href="/sample-order" className="btn btn-outline text-sm w-full justify-center">
                      Request Sample <i className="fas fa-arrow-right" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-darker">
        <div className="container-1200 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Don&apos;t See What You Need?</h2>
            <p className="text-lg text-gray-custom mb-8 max-w-2xl mx-auto">
              We custom-manufacture almost any apparel category. Share your tech pack and we&apos;ll quote within 48 hours.
            </p>
            <Link href="/sample-order" className="btn btn-primary">
              Start Custom Project <i className="fas fa-arrow-right" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
