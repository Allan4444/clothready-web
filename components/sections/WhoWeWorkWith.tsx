import Reveal from '@/components/ui/Reveal'

const ITEMS = [
  {
    emoji: '🎯',
    title: 'Fitness & Activewear Brands',
    desc: 'Gym wear, yoga, sports performance apparel',
    points: ['Need moisture-wicking, 4-way stretch fabrics', '50-500 pieces per design', 'Focus on fit and performance'],
  },
  {
    emoji: '👕',
    title: 'Streetwear & Casual Labels',
    desc: 'Hoodies, joggers, oversized tees',
    points: ['Premium cotton and fleece materials', 'Custom prints, embroidery, unique details', 'Building a lifestyle brand'],
  },
  {
    emoji: '🚀',
    title: 'New Brand Founders',
    desc: 'First-time entrepreneurs testing the market',
    points: ['Starting with 50-100 pieces', 'Need design & production guidance', 'Europe/USA market focus'],
  },
  {
    emoji: '📈',
    title: 'Growing Brands',
    desc: 'Established brands scaling production',
    points: ['500-5000+ pieces per order', 'Consistent quality needed', 'Multiple SKUs and seasonal collections'],
  },
]

export default function WhoWeWorkWith() {
  return (
    <section className="section bg-darker">
      <div className="container-1200">
        <Reveal>
          <div className="text-center mb-12">
            <div className="section-label"><i className="fas fa-users" /> Target Clients</div>
            <h2 className="section-title">Who We Work With</h2>
            <p className="section-subtitle mx-auto">
              We specialize in <strong className="text-white">fitness wear</strong> and{' '}
              <strong className="text-white">streetwear</strong> for small-to-medium European and American brands
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="grid-2">
            {ITEMS.map((item) => (
              <div key={item.title} className="card">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{item.emoji}</span>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                </div>
                <p className="text-gray-custom mb-4">{item.desc}</p>
                <ul className="space-y-2">
                  {item.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-gray-custom">
                      <i className="fas fa-check-circle text-success mt-1" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
