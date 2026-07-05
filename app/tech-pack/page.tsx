'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

const S = '#444'
const S2 = 'rgba(0,0,0,0.2)'
const S3 = 'rgba(0,0,0,0.15)'
const S4 = 'rgba(0,0,0,0.25)'
const S5 = 'rgba(0,0,0,0.3)'
const S6 = 'rgba(0,0,0,0.06)'
const F  = 'rgba(0,0,0,0.04)'

// Default SVG icons keyed by template name (case-insensitive match on first word)
const SVG_MAP: Record<string, JSX.Element> = {
  tshirt: (
    <svg viewBox="0 0 160 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: 140, height: 'auto' }}>
      <path d="M50 40 L20 70 L35 78 L35 150 L125 150 L125 78 L140 70 L110 40" stroke={S} strokeWidth="2" strokeLinejoin="round" fill="none"/>
      <path d="M50 40 Q80 55 110 40" stroke={S} strokeWidth="2" fill="none"/>
      <path d="M50 40 L20 70 L35 78 L50 60 Z" stroke={S} strokeWidth="1.5" fill={F}/>
      <path d="M110 40 L140 70 L125 78 L110 60 Z" stroke={S} strokeWidth="1.5" fill={F}/>
      <line x1="80" y1="55" x2="80" y2="150" stroke={S3} strokeWidth="1" strokeDasharray="4 3"/>
      <line x1="35" y1="144" x2="125" y2="144" stroke={S2} strokeWidth="1"/>
    </svg>
  ),
  hoodie: (
    <svg viewBox="0 0 160 190" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: 140, height: 'auto' }}>
      <path d="M48 55 L15 80 L30 90 L30 165 L130 165 L130 90 L145 80 L112 55" stroke={S} strokeWidth="2" strokeLinejoin="round" fill="none"/>
      <path d="M48 55 Q55 20 80 18 Q105 20 112 55" stroke={S} strokeWidth="2" fill="none"/>
      <path d="M55 55 Q62 30 80 28 Q98 30 105 55" stroke="rgba(0,0,0,0.25)" strokeWidth="1.5" fill="none"/>
      <path d="M48 55 L15 80 L30 90 L48 72 Z" stroke={S} strokeWidth="1.5" fill={F}/>
      <path d="M112 55 L145 80 L130 90 L112 72 Z" stroke={S} strokeWidth="1.5" fill={F}/>
      <path d="M55 120 L55 145 L105 145 L105 120 Q80 115 55 120 Z" stroke="rgba(0,0,0,0.35)" strokeWidth="1.5" fill={F}/>
      <line x1="80" y1="55" x2="80" y2="120" stroke={S4} strokeWidth="1.5" strokeDasharray="5 3"/>
      <line x1="30" y1="158" x2="130" y2="158" stroke={S2} strokeWidth="1"/>
    </svg>
  ),
  jogger: (
    <svg viewBox="0 0 160 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: 140, height: 'auto' }}>
      <rect x="30" y="20" width="100" height="18" rx="3" stroke={S} strokeWidth="2" fill={F}/>
      <path d="M30 38 L28 120 L65 120 L80 150 L95 120 L132 120 L130 38 Z" stroke={S} strokeWidth="2" fill="none"/>
      <rect x="28" y="150" width="37" height="16" rx="3" stroke={S} strokeWidth="1.5" fill={F}/>
      <rect x="95" y="150" width="37" height="16" rx="3" stroke={S} strokeWidth="1.5" fill={F}/>
    </svg>
  ),
  short: (
    <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: 140, height: 'auto' }}>
      <rect x="28" y="18" width="104" height="16" rx="3" stroke={S} strokeWidth="2" fill={F}/>
      <path d="M28 34 L25 110 L68 110 L80 125 L92 110 L135 110 L132 34 Z" stroke={S} strokeWidth="2" fill="none"/>
      <path d="M25 110 Q46 118 68 110" stroke={S} strokeWidth="2"/>
      <path d="M92 110 Q114 118 135 110" stroke={S} strokeWidth="2"/>
    </svg>
  ),
  pant: (
    <svg viewBox="0 0 160 210" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: 140, height: 'auto' }}>
      <rect x="28" y="18" width="104" height="14" rx="2" stroke={S} strokeWidth="2" fill={F}/>
      <path d="M28 32 L24 115 L62 115 L80 160 L98 115 L136 115 L132 32 Z" stroke={S} strokeWidth="2" fill="none"/>
      <path d="M24 115 L20 190 L62 190 L62 115" stroke={S} strokeWidth="2" fill="none"/>
      <path d="M98 115 L98 190 L140 190 L136 115" stroke={S} strokeWidth="2" fill="none"/>
    </svg>
  ),
  jacket: (
    <svg viewBox="0 0 160 190" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: 140, height: 'auto' }}>
      <path d="M50 35 L18 68 L32 78 L32 162 L128 162 L128 78 L142 68 L110 35" stroke={S} strokeWidth="2" strokeLinejoin="round" fill="none"/>
      <path d="M50 35 L65 28 L80 32 L95 28 L110 35" stroke={S} strokeWidth="2" fill="none"/>
      <line x1="80" y1="60" x2="80" y2="162" stroke={S4} strokeWidth="2"/>
      <path d="M50 35 L18 68 L32 78 L50 58 Z" stroke={S} strokeWidth="1.5" fill={F}/>
      <path d="M110 35 L142 68 L128 78 L110 58 Z" stroke={S} strokeWidth="1.5" fill={F}/>
    </svg>
  ),
  shirt: (
    <svg viewBox="0 0 160 185" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: 140, height: 'auto' }}>
      <path d="M50 38 L20 65 L35 75 L35 158 L125 158 L125 75 L140 65 L110 38" stroke={S} strokeWidth="2" strokeLinejoin="round" fill="none"/>
      <path d="M50 38 L65 30 L75 50 L80 38 L85 50 L95 30 L110 38" stroke={S} strokeWidth="2" fill="none"/>
      <line x1="80" y1="50" x2="80" y2="158" stroke={S3} strokeWidth="2"/>
      <path d="M50 38 L20 65 L35 75 L50 56 Z" stroke={S} strokeWidth="1.5" fill={F}/>
      <path d="M110 38 L140 65 L125 75 L110 56 Z" stroke={S} strokeWidth="1.5" fill={F}/>
    </svg>
  ),
  dress: (
    <svg viewBox="0 0 160 210" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: 140, height: 'auto' }}>
      <path d="M55 25 L42 45 L42 95 L118 95 L118 45 L105 25" stroke={S} strokeWidth="2" fill="none"/>
      <path d="M55 25 Q80 40 105 25" stroke={S} strokeWidth="2" fill="none"/>
      <path d="M42 95 L22 190 L138 190 L118 95 Z" stroke={S} strokeWidth="2" fill="none"/>
    </svg>
  ),
  sweater: (
    <svg viewBox="0 0 160 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: 140, height: 'auto' }}>
      <path d="M48 42 L18 72 L34 82 L34 155 L126 155 L126 82 L142 72 L112 42" stroke={S} strokeWidth="2" strokeLinejoin="round" fill="none"/>
      <path d="M48 42 Q80 56 112 42" stroke={S} strokeWidth="2.5" fill="none"/>
      <path d="M48 42 L18 72 L34 82 L48 62 Z" stroke={S} strokeWidth="1.5" fill={F}/>
      <path d="M112 42 L142 72 L126 82 L112 62 Z" stroke={S} strokeWidth="1.5" fill={F}/>
      <rect x="34" y="146" width="92" height="14" rx="2" stroke={S4} strokeWidth="1.5" fill={F}/>
    </svg>
  ),
}

const DEFAULT_SVG = (
  <svg viewBox="0 0 160 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: 140, height: 'auto' }}>
    <rect x="30" y="30" width="100" height="120" rx="8" stroke={S} strokeWidth="2" fill={F}/>
    <line x1="50" y1="60" x2="110" y2="60" stroke={S3} strokeWidth="1.5"/>
    <line x1="50" y1="80" x2="110" y2="80" stroke={S3} strokeWidth="1.5"/>
    <line x1="50" y1="100" x2="90" y2="100" stroke={S3} strokeWidth="1.5"/>
    <path d="M95 115 L120 140" stroke={S} strokeWidth="2"/>
    <circle cx="108" cy="128" r="12" stroke={S} strokeWidth="2" fill="none"/>
  </svg>
)

function getSvg(name: string) {
  const key = name.toLowerCase().replace(/[^a-z]/g, '')
  for (const [k, v] of Object.entries(SVG_MAP)) {
    if (key.startsWith(k) || key.includes(k)) return v
  }
  return DEFAULT_SVG
}

interface Template { id: string; name: string; file_url: string }

export default function TechPackPage() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/tech-pack-templates')
      .then(r => r.ok ? r.json() : { data: [] })
      .then(json => { setTemplates(json.data || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return (
    <main style={{ minHeight: '100vh' }}>
      <section style={{ padding: '7rem 2rem 3rem', textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
        <span style={{ display: 'inline-block', background: 'rgba(255,71,87,0.1)', color: '#ff4757', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '6px 16px', borderRadius: 50, marginBottom: '1.5rem' }}>
          Free Downloads
        </span>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.5px', lineHeight: 1.1, marginBottom: '1.1rem', color: '#111' }}>
          Tech Pack Templates
        </h1>
        <p style={{ color: '#666', fontSize: '1rem', lineHeight: 1.75 }}>
          Download our free garment tech pack templates. Each PDF includes flat technical drawings,
          a measurement spec table, material call-out fields, and construction notes — ready to fill in and send to any factory.
        </p>
      </section>

      <div style={{ maxWidth: 900, margin: '0 auto 3rem', padding: '0 2rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          {['Free to download', 'PDF — opens in browser', 'Factory-ready format'].map(t => (
            <span key={t} style={{ background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 50, padding: '6px 18px', fontSize: '0.8rem', color: '#555' }}>
              ✓ &nbsp;{t}
            </span>
          ))}
        </div>
      </div>

      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem 6rem' }}>
        {loading ? (
          <div style={{ textAlign: 'center', color: '#aaa', padding: '4rem 0' }}>Loading templates...</div>
        ) : templates.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#aaa', padding: '4rem 0' }}>No templates available yet. Check back soon.</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {templates.map(({ id, name, file_url }) => (
              <div key={id} style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 18, overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
                <div style={{ background: 'rgba(0,0,0,0.02)', padding: '2rem 1.5rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 200 }}>
                  {getSvg(name)}
                </div>
                <div style={{ padding: '1rem 1.25rem 1.4rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <p style={{ fontWeight: 700, fontSize: '1rem', margin: 0, color: '#111' }}>{name}</p>
                  <p style={{ color: '#888', fontSize: '0.78rem', margin: 0 }}>Spec sheet · BOM · Measurements</p>
                  {file_url ? (
                    <a href={file_url} target="_blank" rel="noopener noreferrer" className="tp-btn">
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M12 15V3M6 9l6 6 6-6M3 17v2a2 2 0 002 2h14a2 2 0 002-2v-2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Download PDF
                    </a>
                  ) : (
                    <span style={{ textAlign: 'center', color: '#aaa', fontSize: '0.8rem', padding: '9px 0', fontStyle: 'italic' }}>Coming soon</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: '4rem', textAlign: 'center', background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 20, padding: '3rem 2rem', boxShadow: '0 2px 20px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontWeight: 900, fontSize: '1.4rem', textTransform: 'uppercase', marginBottom: '0.6rem', color: '#111' }}>
            Need a Custom Tech Pack?
          </h2>
          <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: 500, margin: '0 auto 2rem' }}>
            Our technical team can create a complete, factory-ready tech pack for your specific design.
            Starting from your sketch or reference image — 7-day turnaround.
          </p>
          <Link href="/contact" style={{ display: 'inline-block', background: 'linear-gradient(135deg, #ff4757, #ff6b6b)', color: '#fff', padding: '13px 36px', borderRadius: 50, fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none', letterSpacing: '0.05em', textTransform: 'uppercase', boxShadow: '0 8px 30px rgba(255,71,87,0.3)' }}>
            Get a Custom Tech Pack
          </Link>
        </div>
      </section>

      <style>{`
        .tp-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          background: rgba(255,71,87,0.08);
          border: 1px solid rgba(255,71,87,0.25);
          color: #ff4757;
          border-radius: 50px;
          padding: 9px 0;
          font-weight: 700;
          font-size: 0.8rem;
          text-decoration: none;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          transition: background 0.2s;
        }
        .tp-btn:hover { background: rgba(255,71,87,0.16); }
      `}</style>
    </main>
  )
}
