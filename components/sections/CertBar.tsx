const CERTS = [
  { icon: 'fa-vial', label: 'Color Fastness Testing', sub: 'In-house fabric lab' },
  { icon: 'fa-ruler', label: 'AQL 2.5 Inspection', sub: 'Every bulk order' },
  { icon: 'fa-file-shield', label: 'BV / SGS', sub: 'Third-party inspection on request' },
  { icon: 'fa-globe', label: 'GCC Certified', sub: 'Compliance verified' },
  { icon: 'fa-leaf', label: 'OEKO-TEX Standard 100', sub: 'Certified fabrics' },
]

export default function CertBar() {
  return (
    <section style={{ background: 'var(--dark)' }}>
      <div className="container-1200" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.25rem' }}>
          {CERTS.map((c) => (
            <div
              key={c.label}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12,
                padding: '0.75rem 1.25rem', minWidth: 200,
              }}
            >
              <div style={{
                width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
                background: 'rgba(255,71,87,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <i className={`fas ${c.icon}`} style={{ color: '#ff4757', fontSize: '1rem' }} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#fff' }}>{c.label}</div>
                <div style={{ fontSize: '0.7rem', color: '#999' }}>{c.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
