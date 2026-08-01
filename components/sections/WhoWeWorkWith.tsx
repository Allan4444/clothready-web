import Reveal from '@/components/ui/Reveal'

const SEGMENTS = [
  { emoji: '🚀', title: 'Fitness Startups' },
  { emoji: '💪', title: 'Gym Apparel Brands' },
  { emoji: '👗', title: 'Fashion Labels' },
  { emoji: '📱', title: 'Influencer Brands' },
]

export default function WhoWeWorkWith() {
  return (
    <section className="section" style={{ background: '#f7f7f7' }}>
      <div className="container-1200">
        <Reveal>
          <div className="text-center mb-10">
            <div className="section-label"><i className="fas fa-users" /> Target Clients</div>
            <h2 className="section-title">We Work With:</h2>
            <p className="section-subtitle mx-auto">
              From first-time founders to established labels — if you need custom apparel at low MOQ, we&apos;re built for you
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="flex flex-wrap justify-center gap-4">
            {SEGMENTS.map((s) => (
              <div
                key={s.title}
                className="card"
                style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 1.5rem', minWidth: 220 }}
              >
                <span className="text-2xl">{s.emoji}</span>
                <span className="font-bold">{s.title}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
