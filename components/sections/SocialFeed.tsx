'use client'

import { useState } from 'react'
import Reveal from '@/components/ui/Reveal'

const FEEDS = [
  { img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&h=700&fit=crop',
    caption: 'Precision cutting for our latest activewear collection 🔥 Quality starts here',
    stats: '❤️ 2.4K  💬 89  ➡️ 156' },
  { img: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=500&h=700&fit=crop',
    caption: 'From sketch to stitch 🧵 Watch how we bring your designs to life',
    stats: '❤️ 45.2K  💬 1.2K  ➡️ 3.4K' },
  { img: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500&h=700&fit=crop',
    caption: 'Our 7-Point Quality Inspection Process — See how we ensure perfection',
    stats: '👁 12.8K  👍 892  💬 234' },
  { img: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500&h=700&fit=crop',
    caption: 'New streetwear drop coming soon 👀 Custom embroidery details on point',
    stats: '❤️ 5.1K  💬 203  ➡️ 445' },
  { img: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500&h=700&fit=crop',
    caption: "POV: You're choosing fabrics for your next collection ✨ So many options!",
    stats: '❤️ 28.7K  💬 892  ➡️ 1.1K' },
  { img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=700&fit=crop',
    caption: 'Satisfying packaging ASMR 📦 Your orders are carefully packed and ready to ship',
    stats: '👁 8.3K  👍 567  💬 123' },
  { img: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=500&h=700&fit=crop',
    caption: 'Quality check station — every piece inspected before shipping 🔍',
    stats: '❤️ 3.1K  💬 147  ➡️ 289' },
  { img: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=500&h=700&fit=crop',
    caption: 'Factory floor tour 🏭 12 production lines running at full capacity',
    stats: '❤️ 196K  💬 4.2K  ➡️ 8.7K' },
]

export default function SocialFeed() {
  const [page, setPage] = useState(0)
  const totalPages = 2
  const perPage = 4
  const visible = FEEDS.slice(page * perPage, page * perPage + perPage)

  return (
    <section id="social-feed" style={{ background: '#050505', padding: '5rem 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
        <Reveal>
          <div className="text-center" style={{ marginBottom: '2.5rem' }}>
            <div className="section-label"><i className="fas fa-hashtag" /> Social Feed</div>
            <h2 className="section-title">Follow Our Journey</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Behind the scenes from our factory floor to your feed
            </p>
          </div>
        </Reveal>

        <div className="social-grid">
          {visible.map((f, i) => (
            <div key={page + '-' + i} className="social-item">
              <div style={{ overflow: 'hidden', height: 380 }}>
                <img src={f.img} alt={f.caption}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s' }}
                  onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.06)')}
                  onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
                />
              </div>
              <div style={{ padding: '1rem 1.25rem' }}>
                <p style={{ fontSize: '0.9rem', color: '#ddd', lineHeight: 1.55, marginBottom: '0.75rem', minHeight: 44 }}>
                  {f.caption}
                </p>
                <div style={{ fontSize: '0.8rem', color: '#888' }}>{f.stats}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '2rem' }}>
          <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}
            style={{ width: 44, height: 44, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: page === 0 ? '#444' : '#fff', cursor: page === 0 ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="fas fa-chevron-left" />
          </button>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button key={i} onClick={() => setPage(i)}
                style={{ width: page === i ? 24 : 8, height: 8, borderRadius: 4, background: page === i ? '#ff4757' : 'rgba(255,255,255,0.2)', border: 'none', cursor: 'pointer', transition: 'all 0.3s' }} />
            ))}
          </div>
          <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page === totalPages - 1}
            style={{ width: 44, height: 44, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: page === totalPages - 1 ? '#444' : '#fff', cursor: page === totalPages - 1 ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="fas fa-chevron-right" />
          </button>
        </div>
      </div>

      <style>{`
        .social-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; }
        .social-item { background: #111; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; overflow: hidden; transition: transform 0.3s, border-color 0.3s; cursor: pointer; }
        .social-item:hover { transform: translateY(-4px); border-color: rgba(255,71,87,0.3); }
        @media (max-width: 1024px) { .social-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) { .social-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  )
}
