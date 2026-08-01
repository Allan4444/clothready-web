import Reveal from '@/components/ui/Reveal'

const SATELLITES = [
  { icon: 'fa-scroll', label: 'Fabric Mills', place: 'Guangzhou Zhongda Market', dist: '45 km' },
  { icon: 'fa-thumbtack', label: 'Trims & Zippers', place: 'Shenzhen', dist: '60 km' },
  { icon: 'fa-fill-drip', label: 'Dyeing & Printing', place: 'Foshan', dist: '70 km' },
  { icon: 'fa-shirt', label: 'Garment Cluster', place: 'Humen, Dongguan', dist: 'Same district' },
  { icon: 'fa-ship', label: 'Shenzhen / HK Port', place: 'Export Shipping', dist: '90 km' },
]

const CAPACITY = [
  { icon: 'fa-boxes-stacked', n: '20,000+', l: 'Pieces Monthly Capacity' },
  { icon: 'fa-warehouse', n: '1,000+ m²', l: 'Workshop Floor Area' },
  { icon: 'fa-people-group', n: '100+', l: 'Skilled Production Workers' },
]

export default function DongguanCluster() {
  return (
    <section className="section">
      <div className="container-1200">
        <Reveal>
          <div className="text-center mb-10">
            <div className="section-label"><i className="fas fa-map-location-dot" /> Why Dongguan</div>
            <h2 className="section-title">Located in the World's Factory</h2>
            <p className="section-subtitle mx-auto">
              Dongguan sits at the center of China's densest apparel supply chain — fabric, trims,
              dyeing, and printing are all within a couple hours' drive, not weeks of shipping.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="dg-cluster">
            <div className="dg-hub">
              <i className="fas fa-industry" style={{ fontSize: '1.6rem', color: '#ff4757', marginBottom: '0.5rem' }} />
              <div style={{ fontWeight: 800, fontSize: '1rem' }}>ClothReady Factory</div>
              <div style={{ fontSize: '0.78rem', color: '#888' }}>Dongguan, Guangdong, China</div>
            </div>
            <div className="dg-satellites">
              {SATELLITES.map((s) => (
                <div key={s.label} className="dg-node">
                  <i className={`fas ${s.icon}`} style={{ color: '#ff4757', fontSize: '1.1rem' }} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{s.label}</div>
                    <div style={{ fontSize: '0.72rem', color: '#888' }}>{s.place} · {s.dist}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="dg-capacity">
            {CAPACITY.map((c) => (
              <div key={c.l} className="dg-capacity-item">
                <i className={`fas ${c.icon}`} style={{ color: '#ff4757', fontSize: '1.6rem', marginBottom: '0.6rem' }} />
                <div style={{ fontWeight: 800, fontSize: '1.6rem' }}>{c.n}</div>
                <div style={{ fontSize: '0.8rem', color: '#888' }}>{c.l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <style>{`
        .dg-cluster { display: flex; flex-direction: column; align-items: center; gap: 2rem; margin-bottom: 3.5rem; }
        .dg-hub {
          text-align: center; padding: 1.5rem 2.5rem; border-radius: 16px;
          background: rgba(255,71,87,0.06); border: 1.5px solid rgba(255,71,87,0.3);
        }
        .dg-satellites { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; width: 100%; max-width: 1000px; }
        .dg-node {
          display: flex; align-items: center; gap: 0.75rem; padding: 1rem 1.25rem;
          border-radius: 12px; background: var(--glass, rgba(0,0,0,0.02));
        }
        body.light-page .dg-node { background: #f7f7f7; border: 1px solid rgba(0,0,0,0.06); }
        .dg-capacity { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; text-align: center; }
        .dg-capacity-item { padding: 2rem 1rem; border-radius: 16px; background: var(--glass, rgba(0,0,0,0.02)); }
        body.light-page .dg-capacity-item { background: #f7f7f7; border: 1px solid rgba(0,0,0,0.06); }
        @media (max-width: 768px) {
          .dg-capacity { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
