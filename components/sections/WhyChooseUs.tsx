import Reveal from '@/components/ui/Reveal'

const ITEMS = [
  {
    icon: 'fa-user-group',
    title: 'Low MOQ For New Brands',
    desc: 'Start your first collection with only 50 pieces per style. Test your ideas, reduce inventory risk, and scale when your market grows.',
  },
  {
    icon: 'fa-award',
    title: '15+ Years Manufacturing Experience',
    desc: 'With years of apparel production expertise, we understand fabric selection, garment construction, and the details that make products successful.',
  },
  {
    icon: 'fa-pen-ruler',
    title: 'Complete OEM & Private Label Support',
    desc: 'From your first concept to finished products, our team supports design development, sampling, customization, and production.',
  },
  {
    icon: 'fa-shield-halved',
    title: 'Strict Quality Control',
    desc: 'Every order follows a professional inspection process to ensure consistent quality before shipment.',
  },
]

export default function WhyChooseUs() {
  return (
    <section style={{ background: 'var(--dark)' }}>
      <div className="container-1200" style={{ padding: '4rem 2rem' }}>
        <Reveal>
          <h2 style={{ textAlign: 'center', color: '#fff', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, marginBottom: '3rem' }}>
            Why Brands Choose ClothReady
          </h2>
        </Reveal>

        <Reveal>
          <div className="why-grid">
            {ITEMS.map((item, i) => (
              <div key={item.title} className="why-item" style={{ borderLeft: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{
                  width: 56, height: 56, borderRadius: '50%', margin: '0 auto 1.25rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 0 0 8px rgba(255,71,87,0.08), 0 0 24px rgba(255,71,87,0.25)',
                }}>
                  <i className={`fas ${item.icon}`} style={{ color: '#ff4757', fontSize: '1.6rem' }} />
                </div>
                <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '1rem', marginBottom: '0.75rem' }}>{item.title}</h3>
                <p style={{ color: '#999', fontSize: '0.85rem', lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <style>{`
        .why-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; text-align: center; }
        .why-item { padding: 0 2rem; }
        @media (max-width: 900px) {
          .why-grid { grid-template-columns: repeat(2, 1fr); gap: 2.5rem 0; }
          .why-item { border-left: none !important; }
        }
        @media (max-width: 540px) {
          .why-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
