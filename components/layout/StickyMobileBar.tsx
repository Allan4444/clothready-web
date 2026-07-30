'use client'

import Link from 'next/link'

export default function StickyMobileBar() {
  return (
    <div
      className="md:hidden"
      style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 60,
        display: 'flex', borderTop: '1px solid rgba(0,0,0,0.08)',
        background: '#fff', boxShadow: '0 -4px 20px rgba(0,0,0,0.08)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <a
        href="https://wa.me/8613412044008"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          padding: '14px 0', background: '#25D366', color: '#fff', fontWeight: 700, fontSize: '0.9rem',
          textDecoration: 'none',
        }}
      >
        <i className="fab fa-whatsapp" style={{ fontSize: '1.1rem' }} /> WhatsApp
      </a>
      <Link
        href="/contact"
        style={{
          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          padding: '14px 0', background: 'linear-gradient(135deg,#ff4757,#ff6b6b)', color: '#fff',
          fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none',
        }}
      >
        Get Quote <i className="fas fa-arrow-right" />
      </Link>
    </div>
  )
}
