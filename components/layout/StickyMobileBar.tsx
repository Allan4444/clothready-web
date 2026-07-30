'use client'

export default function StickyMobileBar() {
  return (
    <div
      className="md:hidden"
      style={{
        position: 'fixed', right: 16, bottom: '18%', zIndex: 60,
      }}
    >
      <a
        href="https://wa.me/8613412044008"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        style={{
          width: 44, height: 44, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'linear-gradient(135deg,#ff4757,#ff6b6b)', color: '#fff', fontSize: '1.5rem',
          boxShadow: '0 4px 16px rgba(255,71,87,0.4)', textDecoration: 'none',
        }}
      >
        <i className="fab fa-whatsapp" />
      </a>
    </div>
  )
}
