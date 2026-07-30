const STATS = [
  { icon: '🏭', n: '15+', l: 'Years Experience' },
  { icon: '📐', n: '50pcs', l: 'MOQ' },
  { icon: '⚡', n: '20–35 Days', l: 'Production' },
  { icon: '✅', n: '100%', l: 'QC Inspection' },
]

export default function TrustBar() {
  return (
    <section style={{ background: '#0d0d0d', borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="container-1200" style={{ padding: '1.75rem 2rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem' }}>
          {STATS.map((s) => (
            <div key={s.l} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 150 }}>
              <span style={{ fontSize: '1.6rem', lineHeight: 1 }}>{s.icon}</span>
              <div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ff4757', lineHeight: 1.2 }}>{s.n}</div>
                <div style={{ fontSize: '0.72rem', color: '#999', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.l}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
