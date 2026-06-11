'use client'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Tech Pack Templates | ClothReady',
  description: 'Download free garment tech pack PDF templates for Tee, Hoodie, Jogger, Short, Pant, Jacket, Shirt, Dress, and Sweater. Ready for factory production.',
}

const products = [
  {
    name: 'T-Shirt',
    file: '/tech-packs/techpack-tshirt.pdf',
    svg: (
      <svg viewBox="0 0 160 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: 140, height: 'auto' }}>
        {/* Body */}
        <path d="M50 40 L20 70 L35 78 L35 150 L125 150 L125 78 L140 70 L110 40" stroke="white" strokeWidth="2" strokeLinejoin="round" fill="none"/>
        {/* Collar */}
        <path d="M50 40 Q80 55 110 40" stroke="white" strokeWidth="2" fill="none"/>
        {/* Sleeve left */}
        <path d="M50 40 L20 70 L35 78 L50 60 Z" stroke="white" strokeWidth="1.5" fill="rgba(255,255,255,0.05)"/>
        {/* Sleeve right */}
        <path d="M110 40 L140 70 L125 78 L110 60 Z" stroke="white" strokeWidth="1.5" fill="rgba(255,255,255,0.05)"/>
        {/* Center seam */}
        <line x1="80" y1="55" x2="80" y2="150" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="4 3"/>
        {/* Hem */}
        <line x1="35" y1="144" x2="125" y2="144" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
      </svg>
    ),
  },
  {
    name: 'Hoodie',
    file: '/tech-packs/techpack-hoodie.pdf',
    svg: (
      <svg viewBox="0 0 160 190" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: 140, height: 'auto' }}>
        {/* Body */}
        <path d="M48 55 L15 80 L30 90 L30 165 L130 165 L130 90 L145 80 L112 55" stroke="white" strokeWidth="2" strokeLinejoin="round" fill="none"/>
        {/* Hood */}
        <path d="M48 55 Q55 20 80 18 Q105 20 112 55" stroke="white" strokeWidth="2" fill="none"/>
        {/* Hood inner */}
        <path d="M55 55 Q62 30 80 28 Q98 30 105 55" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" fill="none"/>
        {/* Sleeves */}
        <path d="M48 55 L15 80 L30 90 L48 72 Z" stroke="white" strokeWidth="1.5" fill="rgba(255,255,255,0.05)"/>
        <path d="M112 55 L145 80 L130 90 L112 72 Z" stroke="white" strokeWidth="1.5" fill="rgba(255,255,255,0.05)"/>
        {/* Kangaroo pocket */}
        <path d="M55 120 L55 145 L105 145 L105 120 Q80 115 55 120 Z" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="rgba(255,255,255,0.05)"/>
        {/* Zipper */}
        <line x1="80" y1="55" x2="80" y2="120" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeDasharray="5 3"/>
        {/* Hem */}
        <line x1="30" y1="158" x2="130" y2="158" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
      </svg>
    ),
  },
  {
    name: 'Jogger',
    file: '/tech-packs/techpack-jogger.pdf',
    svg: (
      <svg viewBox="0 0 160 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: 140, height: 'auto' }}>
        {/* Waistband */}
        <rect x="30" y="20" width="100" height="18" rx="3" stroke="white" strokeWidth="2" fill="rgba(255,255,255,0.05)"/>
        {/* Body */}
        <path d="M30 38 L28 120 L65 120 L80 150 L95 120 L132 120 L130 38 Z" stroke="white" strokeWidth="2" fill="none"/>
        {/* Left leg cuff */}
        <path d="M28 150 Q46 158 65 150" stroke="white" strokeWidth="2" fill="none"/>
        <rect x="28" y="150" width="37" height="16" rx="3" stroke="white" strokeWidth="1.5" fill="rgba(255,255,255,0.05)"/>
        {/* Right leg cuff */}
        <rect x="95" y="150" width="37" height="16" rx="3" stroke="white" strokeWidth="1.5" fill="rgba(255,255,255,0.05)"/>
        {/* Crotch seam */}
        <path d="M65 120 Q80 130 95 120" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
        {/* Drawstring */}
        <line x1="70" y1="29" x2="64" y2="44" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
        <line x1="90" y1="29" x2="96" y2="44" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
        {/* Side pockets */}
        <path d="M35 55 L32 85" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
        <path d="M125 55 L128 85" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    name: 'Short',
    file: '/tech-packs/techpack-short.pdf',
    svg: (
      <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: 140, height: 'auto' }}>
        {/* Waistband */}
        <rect x="28" y="18" width="104" height="16" rx="3" stroke="white" strokeWidth="2" fill="rgba(255,255,255,0.05)"/>
        {/* Body */}
        <path d="M28 34 L25 110 L68 110 L80 125 L92 110 L135 110 L132 34 Z" stroke="white" strokeWidth="2" fill="none"/>
        {/* Leg openings */}
        <path d="M25 110 Q46 118 68 110" stroke="white" strokeWidth="2"/>
        <path d="M92 110 Q114 118 135 110" stroke="white" strokeWidth="2"/>
        {/* Crotch seam */}
        <path d="M68 110 Q80 120 92 110" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
        {/* Drawstring */}
        <line x1="68" y1="26" x2="62" y2="38" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
        <line x1="92" y1="26" x2="98" y2="38" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
        {/* Side panels */}
        <line x1="35" y1="34" x2="32" y2="108" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="4 3"/>
        <line x1="125" y1="34" x2="128" y2="108" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="4 3"/>
      </svg>
    ),
  },
  {
    name: 'Pant',
    file: '/tech-packs/techpack-pant.pdf',
    svg: (
      <svg viewBox="0 0 160 210" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: 140, height: 'auto' }}>
        {/* Waistband */}
        <rect x="28" y="18" width="104" height="14" rx="2" stroke="white" strokeWidth="2" fill="rgba(255,255,255,0.05)"/>
        {/* Body */}
        <path d="M28 32 L24 115 L62 115 L80 160 L98 115 L136 115 L132 32 Z" stroke="white" strokeWidth="2" fill="none"/>
        {/* Left leg */}
        <path d="M24 115 L20 190 L62 190 L62 115" stroke="white" strokeWidth="2" fill="none"/>
        {/* Right leg */}
        <path d="M98 115 L98 190 L140 190 L136 115" stroke="white" strokeWidth="2" fill="none"/>
        {/* Hem */}
        <line x1="20" y1="184" x2="62" y2="184" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
        <line x1="98" y1="184" x2="140" y2="184" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
        {/* Fly */}
        <path d="M75 32 L80 65 L85 32" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
        {/* Side seam */}
        <line x1="28" y1="32" x2="24" y2="190" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="4 3"/>
        <line x1="132" y1="32" x2="136" y2="190" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="4 3"/>
      </svg>
    ),
  },
  {
    name: 'Jacket',
    file: '/tech-packs/techpack-jacket.pdf',
    svg: (
      <svg viewBox="0 0 160 190" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: 140, height: 'auto' }}>
        {/* Body */}
        <path d="M50 35 L18 68 L32 78 L32 162 L128 162 L128 78 L142 68 L110 35" stroke="white" strokeWidth="2" strokeLinejoin="round" fill="none"/>
        {/* Collar */}
        <path d="M50 35 L65 28 L80 32 L95 28 L110 35" stroke="white" strokeWidth="2" fill="none"/>
        {/* Lapels */}
        <path d="M65 28 L70 55 L80 60" stroke="white" strokeWidth="1.5" fill="none"/>
        <path d="M95 28 L90 55 L80 60" stroke="white" strokeWidth="1.5" fill="none"/>
        {/* Center zipper */}
        <line x1="80" y1="60" x2="80" y2="162" stroke="rgba(255,255,255,0.5)" strokeWidth="2"/>
        {/* Zip teeth */}
        {[70,80,90,100,110,120,130,140,150].map((y, i) => (
          <line key={i} x1="77" y1={y} x2="83" y2={y} stroke="rgba(255,255,255,0.25)" strokeWidth="1"/>
        ))}
        {/* Sleeves */}
        <path d="M50 35 L18 68 L32 78 L50 58 Z" stroke="white" strokeWidth="1.5" fill="rgba(255,255,255,0.05)"/>
        <path d="M110 35 L142 68 L128 78 L110 58 Z" stroke="white" strokeWidth="1.5" fill="rgba(255,255,255,0.05)"/>
        {/* Pockets */}
        <rect x="38" y="112" width="28" height="18" rx="2" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" fill="none"/>
        <rect x="94" y="112" width="28" height="18" rx="2" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" fill="none"/>
        {/* Hem */}
        <line x1="32" y1="155" x2="128" y2="155" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
      </svg>
    ),
  },
  {
    name: 'Shirt',
    file: '/tech-packs/techpack-shirt.pdf',
    svg: (
      <svg viewBox="0 0 160 185" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: 140, height: 'auto' }}>
        {/* Body */}
        <path d="M50 38 L20 65 L35 75 L35 158 L125 158 L125 75 L140 65 L110 38" stroke="white" strokeWidth="2" strokeLinejoin="round" fill="none"/>
        {/* Collar points */}
        <path d="M50 38 L65 30 L75 50 L80 38 L85 50 L95 30 L110 38" stroke="white" strokeWidth="2" fill="none"/>
        {/* Button placket */}
        <line x1="80" y1="50" x2="80" y2="158" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
        {/* Buttons */}
        {[62,78,94,110,126,142].map((y, i) => (
          <circle key={i} cx="80" cy={y} r="2.5" stroke="rgba(255,255,255,0.5)" strokeWidth="1" fill="none"/>
        ))}
        {/* Sleeves */}
        <path d="M50 38 L20 65 L35 75 L50 56 Z" stroke="white" strokeWidth="1.5" fill="rgba(255,255,255,0.05)"/>
        <path d="M110 38 L140 65 L125 75 L110 56 Z" stroke="white" strokeWidth="1.5" fill="rgba(255,255,255,0.05)"/>
        {/* Cuffs */}
        <rect x="20" y="65" width="15" height="10" rx="2" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none"/>
        <rect x="125" y="65" width="15" height="10" rx="2" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none"/>
        {/* Hem */}
        <line x1="35" y1="152" x2="125" y2="152" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
      </svg>
    ),
  },
  {
    name: 'Dress',
    file: '/tech-packs/techpack-dress.pdf',
    svg: (
      <svg viewBox="0 0 160 210" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: 140, height: 'auto' }}>
        {/* Bodice */}
        <path d="M55 25 L42 45 L42 95 L118 95 L118 45 L105 25" stroke="white" strokeWidth="2" fill="none"/>
        {/* Neckline */}
        <path d="M55 25 Q80 40 105 25" stroke="white" strokeWidth="2" fill="none"/>
        {/* Straps */}
        <path d="M55 25 L52 12" stroke="white" strokeWidth="2"/>
        <path d="M105 25 L108 12" stroke="white" strokeWidth="2"/>
        {/* Waist seam */}
        <line x1="42" y1="95" x2="118" y2="95" stroke="rgba(255,255,255,0.5)" strokeWidth="2"/>
        {/* Skirt */}
        <path d="M42 95 L22 190 L138 190 L118 95 Z" stroke="white" strokeWidth="2" fill="none"/>
        {/* Skirt panels */}
        <line x1="62" y1="95" x2="54" y2="190" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="4 3"/>
        <line x1="80" y1="95" x2="80" y2="190" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="4 3"/>
        <line x1="98" y1="95" x2="106" y2="190" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="4 3"/>
        {/* Hem */}
        <line x1="22" y1="183" x2="138" y2="183" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    name: 'Sweater',
    file: '/tech-packs/techpack-sweater.pdf',
    svg: (
      <svg viewBox="0 0 160 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: 140, height: 'auto' }}>
        {/* Body */}
        <path d="M48 42 L18 72 L34 82 L34 155 L126 155 L126 82 L142 72 L112 42" stroke="white" strokeWidth="2" strokeLinejoin="round" fill="none"/>
        {/* Ribbed collar */}
        <path d="M48 42 Q80 56 112 42" stroke="white" strokeWidth="2.5" fill="none"/>
        <path d="M52 42 Q80 52 108 42" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
        {/* Rib texture on collar */}
        {[56,62,68,74,80,86,92,98,104].map((x, i) => (
          <line key={i} x1={x} y1="42" x2={x - 2} y2="50" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
        ))}
        {/* Sleeves */}
        <path d="M48 42 L18 72 L34 82 L48 62 Z" stroke="white" strokeWidth="1.5" fill="rgba(255,255,255,0.05)"/>
        <path d="M112 42 L142 72 L126 82 L112 62 Z" stroke="white" strokeWidth="1.5" fill="rgba(255,255,255,0.05)"/>
        {/* Cuffs ribbed */}
        <rect x="18" y="68" width="16" height="14" rx="2" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="rgba(255,255,255,0.05)"/>
        <rect x="126" y="68" width="16" height="14" rx="2" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="rgba(255,255,255,0.05)"/>
        {/* Waist rib */}
        <rect x="34" y="146" width="92" height="14" rx="2" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="rgba(255,255,255,0.05)"/>
        {/* Knit texture lines */}
        {[55,70,85,100,115,130].map((y, i) => (
          <line key={i} x1="34" y1={y} x2="126" y2={y} stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
        ))}
      </svg>
    ),
  },
]

export default function TechPackPage() {
  return (
    <main style={{ background: '#0a0a0a', color: '#fff', minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{ padding: '7rem 2rem 3rem', textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
        <span style={{ display: 'inline-block', background: 'rgba(255,71,87,0.12)', color: '#ff4757', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '6px 16px', borderRadius: 50, marginBottom: '1.5rem' }}>
          Free Downloads
        </span>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.5px', lineHeight: 1.1, marginBottom: '1.1rem' }}>
          Tech Pack Templates
        </h1>
        <p style={{ color: '#777', fontSize: '1rem', lineHeight: 1.75 }}>
          Download our free garment tech pack templates. Each PDF includes flat technical drawings,
          a measurement spec table, material call-out fields, and construction notes — ready to fill in and send to any factory.
        </p>
      </section>

      {/* Info bar */}
      <div style={{ maxWidth: 900, margin: '0 auto 3rem', padding: '0 2rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          {['Free to download', 'PDF — opens in browser', 'Factory-ready format', '9 garment types'].map((t) => (
            <span key={t} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 50, padding: '6px 18px', fontSize: '0.8rem', color: '#aaa' }}>
              ✓ &nbsp;{t}
            </span>
          ))}
        </div>
      </div>

      {/* Product grid */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem 6rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
          {products.map(({ name, file, svg }) => (
            <div
              key={name}
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
            >
              {/* Drawing area */}
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem 1.5rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 200 }}>
                {svg}
              </div>

              {/* Name + button */}
              <div style={{ padding: '1rem 1.25rem 1.4rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <p style={{ fontWeight: 700, fontSize: '1rem', margin: 0 }}>{name}</p>
                <p style={{ color: '#555', fontSize: '0.78rem', margin: 0 }}>
                  Spec sheet · BOM · Measurements
                </p>
                <a
                  href={file}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', background: 'rgba(255,71,87,0.12)', border: '1px solid rgba(255,71,87,0.3)', color: '#ff4757', borderRadius: 50, padding: '9px 0', fontWeight: 700, fontSize: '0.8rem', textDecoration: 'none', letterSpacing: '0.04em', textTransform: 'uppercase', transition: 'background 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,71,87,0.22)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,71,87,0.12)')}
                >
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 15V3M6 9l6 6 6-6M3 17v2a2 2 0 002 2h14a2 2 0 002-2v-2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Download PDF
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ marginTop: '4rem', textAlign: 'center', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '3rem 2rem' }}>
          <h2 style={{ fontWeight: 900, fontSize: '1.4rem', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
            Need a Custom Tech Pack?
          </h2>
          <p style={{ color: '#777', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '2rem', maxWidth: 500, margin: '0 auto 2rem' }}>
            Our technical team can create a complete, factory-ready tech pack for your specific design.
            Starting from your sketch or reference image — 7-day turnaround.
          </p>
          <Link href="/contact" style={{ display: 'inline-block', background: 'linear-gradient(135deg, #ff4757, #ff6b6b)', color: '#fff', padding: '13px 36px', borderRadius: 50, fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none', letterSpacing: '0.05em', textTransform: 'uppercase', boxShadow: '0 8px 30px rgba(255,71,87,0.3)' }}>
            Get a Custom Tech Pack
          </Link>
        </div>
      </section>
    </main>
  )
}
