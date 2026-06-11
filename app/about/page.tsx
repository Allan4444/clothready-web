'use client'

import Reveal from '@/components/ui/Reveal'
import Link from 'next/link'


const FEATURES = [
  { icon: 'fa-handshake', title: 'Direct Factory Access', desc: 'No middlemen. You work directly with factory owners and production managers.' },
  { icon: 'fa-microscope', title: 'Rigorous Quality Control', desc: '7-point inspection process ensures every piece meets your standards.' },
  { icon: 'fa-rocket', title: 'Fast Turnaround', desc: '20-35 days from first call to delivery. Rush orders available.' },
  { icon: 'fa-users', title: 'Small Brand Friendly', desc: '50-piece MOQ means you can test the market without massive inventory risk.' },
]

const SOCIAL_FEEDS = [
  { platform: 'Instagram', icon: 'fab fa-instagram', color: '#E4405F', handle: '@clothready', url: 'https://instagram.com/clothready', posts: [
    { img: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&q=80', caption: 'Precision cutting for our latest activewear collection 🔥', likes: '2.4K' },
    { img: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=400&q=80', caption: 'Matching sets dropping this season ✨', likes: '1.8K' },
    { img: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&q=80', caption: 'Quality check station — every piece inspected', likes: '3.1K' },
  ]},
  { platform: 'TikTok', icon: 'fab fa-tiktok', color: '#000', handle: '@clothready', url: 'https://tiktok.com/@clothready', posts: [
    { img: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&q=80', caption: 'POV: Walking our factory floor 🏭', likes: '196K' },
    { img: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=400&q=80', caption: 'Fabric sourcing day — so many options!', likes: '87K' },
    { img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80', caption: 'Packaging ASMR 📦 Satisfying!', likes: '121K' },
  ]},
  { platform: 'YouTube', icon: 'fab fa-youtube', color: '#FF0000', handle: 'ClothReady', url: 'https://youtube.com/@clothready', posts: [
    { img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80', caption: 'Full Factory Tour 2026 — 12 Production Lines', likes: '48K views' },
    { img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80', caption: 'How to Write a Tech Pack That Works', likes: '23K views' },
    { img: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&q=80', caption: 'From PO to Port: Complete Export Journey', likes: '31K views' },
  ]},
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="section" style={{ paddingTop: '8rem' }}>
        <div className="container-1200 text-center">
          <Reveal>
            <div className="section-label"><i className="fas fa-info-circle" /> Our Story</div>
            <h1 className="section-title">About ClothReady</h1>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              20+ years specializing in fitness wear and streetwear for global brands
            </p>
          </Reveal>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container-1200">
          <Reveal>
            <div className="text-center">
              <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.5rem)', fontWeight: 800, marginBottom: '1.25rem' }}>Why Choose ClothReady?</h2>
              <p style={{ fontSize: '1.05rem', color: '#888', maxWidth: 720, margin: '0 auto 3rem', lineHeight: 1.8 }}>
                We&apos;re not just a factory — we&apos;re your strategic manufacturing partner. With over 15 years of
                specialized experience in fitness and leisure wear, we understand the unique challenges small and
                medium brands face.
              </p>
            </div>
          </Reveal>

          <div className="grid-4">
            {FEATURES.map((f) => (
              <Reveal key={f.title}>
                <div className="card" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem 1.5rem' }}>
                  <div style={{ width: 64, height: 64, background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                    <i className={`fas ${f.icon}`} style={{ fontSize: '1.4rem', color: '#0a0a0a' }} />
                  </div>
                  <h4 style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '1.05rem' }}>{f.title}</h4>
                  <p style={{ fontSize: '0.9rem', color: '#888', lineHeight: 1.7 }}>{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="section" style={{ background: '#050505' }}>
        <div className="container-1200">
          <Reveal>
            <div className="text-center" style={{ marginBottom: '3rem' }}>
              <div className="section-label"><i className="fas fa-hashtag" /> Social Media</div>
              <h2 className="section-title">Follow Our Journey</h2>
              <p className="section-subtitle" style={{ margin: '0 auto' }}>
                Behind the scenes from our factory floor to your feed
              </p>
            </div>
          </Reveal>

          {SOCIAL_FEEDS.map(platform => (
            <Reveal key={platform.platform}>
              <div style={{ marginBottom: '3rem' }}>
                {/* Platform header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: platform.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <i className={platform.icon} style={{ color: '#fff', fontSize: '1.1rem' }} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '1rem' }}>{platform.platform}</div>
                      <div style={{ fontSize: '0.8rem', color: '#888' }}>{platform.handle}</div>
                    </div>
                  </div>
                  <a href={platform.url} target="_blank" rel="noopener noreferrer"
                    className="btn btn-outline" style={{ fontSize: '0.75rem', padding: '6px 16px' }}>
                    Follow <i className="fas fa-external-link-alt" style={{ fontSize: '0.65rem' }} />
                  </a>
                </div>

                {/* Posts grid */}
                <div className="grid-3">
                  {platform.posts.map((post, i) => (
                    <a key={i} href={platform.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                      <div className="card" style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }}>
                        <div style={{ position: 'relative', overflow: 'hidden' }}>
                          <img src={post.img} alt={post.caption}
                            style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block', transition: 'transform 0.4s' }}
                            onMouseOver={(e: any) => (e.currentTarget.style.transform = 'scale(1.05)')}
                            onMouseOut={(e: any) => (e.currentTarget.style.transform = 'scale(1)')}
                          />
                          <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(0,0,0,0.6)', borderRadius: 50, padding: '3px 10px', fontSize: '0.7rem', color: '#fff' }}>
                            <i className={platform.icon} style={{ marginRight: 4 }} />{platform.platform}
                          </div>
                        </div>
                        <div style={{ padding: '1rem' }}>
                          <p style={{ fontSize: '0.85rem', color: '#ccc', lineHeight: 1.5, marginBottom: '0.5rem' }}>{post.caption}</p>
                          <div style={{ fontSize: '0.75rem', color: '#888' }}>
                            <i className="fas fa-heart" style={{ color: '#ff4757', marginRight: 4 }} />{post.likes}
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container-1200 text-center">
          <Reveal>
            <h2 className="section-title">Ready to Work Together?</h2>
            <p style={{ color: '#888', fontSize: '1.1rem', marginBottom: '2rem', maxWidth: 600, margin: '0 auto 2rem' }}>
              From your first sketch to the final shipment — we&apos;re with you every step.
            </p>
            <Link href="/products/custom" className="btn btn-primary">
              Start Your Project <i className="fas fa-arrow-right" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
