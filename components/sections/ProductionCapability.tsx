import Reveal from '@/components/ui/Reveal'

const SHOTS = [
  {
    img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&q=85',
    title: 'Automated Cutting',
    desc: 'Computer-controlled cutting tables ensure every panel is cut to spec — precision that hand-cutting cannot match.',
  },
  {
    img: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=900&q=85',
    title: 'Hanging Conveyor Line',
    desc: 'Overhead hanging conveyor system moves garments through sewing stations without creasing or handling damage.',
  },
  {
    img: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=900&q=85',
    title: 'Manual Quality Inspection',
    desc: 'Every garment is hand-measured against the spec sheet — tape measure in hand, no shortcuts before it reaches packing.',
  },
]

export default function ProductionCapability({ light = false }: { light?: boolean }) {
  const bg = light ? '#fff' : '#050505'
  const captionCol = light ? '#111' : '#fff'
  const descCol = light ? '#666' : '#999'

  return (
    <section style={{ background: bg, padding: '5rem 0' }}>
      <div className="container-1200">
        <Reveal>
          <div className="text-center" style={{ marginBottom: '2.5rem' }}>
            <div className="section-label"><i className="fas fa-industry" /> Inside The Factory</div>
            <h2 className="section-title">Production Capability</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Real production floor — precision, modern equipment, and manual inspection at every stage
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }} className="pc-grid">
            {SHOTS.map((s) => (
              <div key={s.title} style={{ borderRadius: 16, overflow: 'hidden', border: light ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.img} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <h3 style={{ fontWeight: 700, fontSize: '1rem', color: captionCol, marginBottom: '0.5rem' }}>{s.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: descCol, lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 900px) { .pc-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
