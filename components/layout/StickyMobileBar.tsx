'use client'

import Link from 'next/link'

export default function StickyMobileBar() {
  return (
    <div
      className="md:hidden"
      style={{
        position: 'fixed', right: 16, bottom: '18%', zIndex: 60,
        display: 'flex', flexDirection: 'column', gap: 12,
      }}
    >
      <a
        href="https://wa.me/8613412044008"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        style={{
          width: 52, height: 52, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: '#25D366', color: '#fff', fontSize: '1.5rem',
          boxShadow: '0 4px 16px rgba(0,0,0,0.25)', textDecoration: 'none',
        }}
      >
        <i className="fab fa-whatsapp" />
      </a>
      <Link
        href="/contact"
        aria-label="Get a Quote"
        style={{
          width: 52, height: 52, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'linear-gradient(135deg,#ff4757,#ff6b6b)', color: '#fff', fontSize: '1.2rem',
          boxShadow: '0 4px 16px rgba(255,71,87,0.4)', textDecoration: 'none',
        }}
      >
        <i className="fas fa-file-invoice-dollar" />
      </Link>
    </div>
  )
}
