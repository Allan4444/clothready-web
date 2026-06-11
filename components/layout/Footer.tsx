'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer style={{ background: '#0a0a0a', color: '#fff' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '5rem 3rem 2.5rem' }}>

        {/* 4-column grid: left col = ~33%, other 3 = ~22% each */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 0.55fr 0.55fr 0.7fr', gap: '3rem', alignItems: 'start' }}>

          {/* ── Column 1: Logo + tagline + social ── */}
          <div>
            <Link href="/">
              <Image
                src="/logo - white.png"
                alt="ClothReady"
                width={170}
                height={46}
                style={{ objectFit: 'contain', marginBottom: '1.1rem', display: 'block' }}
              />
            </Link>

            <p style={{ color: '#777', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: '1.75rem', maxWidth: 340 }}>
              Premium B2B manufacturing for fitness wear and streetwear brands.
              Direct from our factory in Dongguan, China to your customers worldwide.
            </p>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: '0.55rem' }}>
              {[
                {
                  label: 'Instagram',
                  href: 'https://instagram.com/clothready',
                  svg: (
                    <svg width="17" height="17" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  ),
                },
                {
                  label: 'TikTok',
                  href: 'https://tiktok.com/@clothready',
                  svg: (
                    <svg width="17" height="17" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.28 8.28 0 004.84 1.56V6.78a4.86 4.86 0 01-1.07-.09z"/>
                    </svg>
                  ),
                },
                {
                  label: 'YouTube',
                  href: 'https://youtube.com/@clothready',
                  svg: (
                    <svg width="17" height="17" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  ),
                },
              ].map(({ label, href, svg }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="footer-social"
                >
                  {svg}
                </a>
              ))}
            </div>
          </div>

          {/* ── Column 2: Company ── */}
          <div>
            <h4 className="footer-heading">Company</h4>
            <ul className="footer-list">
              <li><Link href="/about" className="footer-link">About Us</Link></li>
              <li><Link href="/products" className="footer-link">Products</Link></li>
              <li><Link href="/about#social-feed" className="footer-link">Social Feed</Link></li>
              <li><Link href="/contact" className="footer-link">Contact</Link></li>
            </ul>
          </div>

          {/* ── Column 3: Services ── */}
          <div>
            <h4 className="footer-heading">Services</h4>
            <ul className="footer-list">
              <li><Link href="/sample-order" className="footer-link">Sample Order</Link></li>
              <li>
                <a href="https://www.faire.com" target="_blank" rel="noopener noreferrer" className="footer-link">
                  Bulk Order
                </a>
              </li>
              <li><Link href="/contact" className="footer-link">Custom Manufacturing</Link></li>
              <li><Link href="/tech-pack" className="footer-link">Tech Pack</Link></li>
            </ul>
          </div>

          {/* ── Column 4: Contact ── */}
          <div>
            <h4 className="footer-heading">Contact</h4>
            <ul className="footer-list">
              <li>
                <a href="tel:+8613412044008" className="footer-link footer-contact-row">
                  {/* Phone */}
                  <svg width="14" height="14" fill="white" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  +86 134 1204 4008
                </a>
              </li>
              <li>
                <a href="mailto:info@clothready.com" className="footer-link footer-contact-row">
                  {/* Email */}
                  <svg width="14" height="14" fill="white" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  info@clothready.com
                </a>
              </li>
              <li>
                <span className="footer-contact-row" style={{ color: '#777', fontSize: '0.875rem' }}>
                  {/* WeChat */}
                  <svg width="14" height="14" fill="white" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                    <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-3.99-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 01.598.082l1.584.926a.272.272 0 00.14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 01-.023-.156.49.49 0 01.201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-7.063-6.122zm-3.74 3.504c.537 0 .972.44.972.982a.977.977 0 01-.972.979.977.977 0 01-.972-.979c0-.542.435-.982.972-.982zm3.712 0c.537 0 .972.44.972.982a.977.977 0 01-.972.979.977.977 0 01-.972-.979c0-.542.436-.982.972-.982z"/>
                  </svg>
                  WeChat: +86 134 1204 4008
                </span>
              </li>
              <li>
                <span className="footer-contact-row" style={{ color: '#777', fontSize: '0.875rem' }}>
                  {/* WhatsApp */}
                  <svg width="14" height="14" fill="white" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp: +86 134 1204 4008
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid #1f1f1f', marginTop: '3.5rem', paddingTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ color: '#444', fontSize: '0.8rem' }}>© 2026 ClothReady. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link href="/privacy" className="footer-link" style={{ fontSize: '0.8rem', color: '#444' }}>Privacy Policy</Link>
            <Link href="/terms" className="footer-link" style={{ fontSize: '0.8rem', color: '#444' }}>Terms of Use</Link>
          </div>
        </div>
      </div>

      <style>{`
        .footer-heading {
          color: #fff;
          font-weight: 700;
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 1.25rem;
        }
        .footer-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
        }
        .footer-link {
          color: #777;
          font-size: 0.875rem;
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-link:hover { color: #fff; }
        .footer-contact-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .footer-social {
          width: 38px;
          height: 38px;
          border-radius: 9px;
          background: #1a1a1a;
          border: 1px solid #2e2e2e;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #aaa;
          transition: color 0.2s, border-color 0.2s, background 0.2s;
          text-decoration: none;
        }
        .footer-social:hover {
          color: #fff;
          border-color: #555;
          background: #222;
        }
      `}</style>
    </footer>
  )
}
