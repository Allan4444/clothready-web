const STATS = [
  { icon: 'fa-calendar-days', n: '15+', l: 'Years Experience' },
  { icon: 'fa-shirt', n: '50pcs', l: 'MOQ' },
  { icon: 'fa-clock', n: '20–35 Days', l: 'Production' },
  { icon: 'fa-shield-halved', n: '100%', l: 'QC Inspection' },
]

export default function TrustBar() {
  return (
    <section style={{ background: 'var(--dark)' }}>
      <div className="container-1200" style={{ padding: '3rem 2rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '3rem' }}>
          {STATS.map((s) => (
            <div key={s.l} style={{ display: 'flex', alignItems: 'center', gap: '1rem', minWidth: 180 }}>
              <i className={`fas ${s.icon}`} style={{ color: '#ff4757', fontSize: '1.8rem', flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>{s.n}</div>
                <div style={{ fontSize: '0.8rem', color: '#999', letterSpacing: '0.02em' }}>{s.l}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
