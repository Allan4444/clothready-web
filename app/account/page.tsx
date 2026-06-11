'use client'

import Link from 'next/link'
import Reveal from '@/components/ui/Reveal'

const SECTIONS = [
  { href: '/account', icon: 'fa-user', title: 'My Information', desc: 'Name, email, company details', active: true },
  { href: '/account/orders', icon: 'fa-box', title: 'My Orders & Tracking', desc: 'Order history, status, tracking numbers' },
  { href: '/account/addresses', icon: 'fa-map-marker-alt', title: 'My Addresses', desc: 'Shipping and billing addresses' },
]

export default function AccountPage() {
  return (
    <>
      <section className="section" style={{ paddingTop: '8rem' }}>
        <div className="container-1200" style={{ maxWidth: 800 }}>
          <Reveal>
            <div className="text-center" style={{ marginBottom: '2.5rem' }}>
              <div className="section-label"><i className="fas fa-user-circle" /> Account</div>
              <h1 className="section-title" style={{ fontSize: 'clamp(1.8rem,4vw,2.5rem)' }}>My Account</h1>
            </div>
          </Reveal>

          {/* Navigation cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
            {SECTIONS.map(s => (
              <Link key={s.href} href={s.href} style={{ textDecoration: 'none' }}>
                <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', cursor: 'pointer', padding: '1.5rem' }}>
                  <div style={{ width: 48, height: 48, background: 'rgba(255,71,87,0.1)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <i className={`fas ${s.icon}`} style={{ color: '#ff4757', fontSize: '1.1rem' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, marginBottom: 2 }}>{s.title}</div>
                    <div style={{ fontSize: '0.85rem', color: '#888' }}>{s.desc}</div>
                  </div>
                  <i className="fas fa-chevron-right" style={{ color: '#555', fontSize: '0.8rem' }} />
                </div>
              </Link>
            ))}
          </div>

          {/* My Information form */}
          <Reveal>
            <div className="card">
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.5rem' }}>
                <i className="fas fa-user" style={{ color: '#ff4757', marginRight: '0.5rem' }} />
                My Information
              </h2>
              <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="grid-2">
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888', marginBottom: '0.4rem' }}>First Name</label>
                    <input type="text" placeholder="Jane" style={{ width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888', marginBottom: '0.4rem' }}>Last Name</label>
                    <input type="text" placeholder="Smith" style={{ width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', outline: 'none' }} />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888', marginBottom: '0.4rem' }}>Email</label>
                  <input type="email" placeholder="jane@mybrand.com" style={{ width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888', marginBottom: '0.4rem' }}>Company</label>
                  <input type="text" placeholder="My Brand Ltd" style={{ width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', outline: 'none' }} />
                </div>
                <div className="grid-2">
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888', marginBottom: '0.4rem' }}>Phone / WhatsApp</label>
                    <input type="tel" placeholder="+1 555-0100" style={{ width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888', marginBottom: '0.4rem' }}>Country</label>
                    <input type="text" placeholder="United States" style={{ width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', outline: 'none' }} />
                  </div>
                </div>
                <button type="button" className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }}
                  onClick={() => alert('Account features will be connected in Week 5')}>
                  Save Changes
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
