const CERTS = [
  { icon: 'fa-vial', label: 'Color Fastness Testing', sub: 'In-house fabric lab' },
  { icon: 'fa-magnet', label: 'Needle Detection', sub: '100% metal-free scan' },
  { icon: 'fa-ruler', label: 'AQL 2.5 Inspection', sub: 'Every bulk order' },
  { icon: 'fa-file-shield', label: 'BV / SGS', sub: 'Third-party inspection on request' },
]

export default function CertBar() {
  return (
    <section style={{ background: '#fafafa', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
      <div className="container-1200" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.25rem' }}>
          {CERTS.map((c) => (
            <div
              key={c.label}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 12,
                padding: '0.75rem 1.25rem', minWidth: 200,
              }}
            >
              <div style={{
                width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
                background: 'rgba(255,71,87,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <i className={`fas ${c.icon}`} style={{ color: '#ff4757', fontSize: '1rem' }} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#111' }}>{c.label}</div>
                <div style={{ fontSize: '0.7rem', color: '#888' }}>{c.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
