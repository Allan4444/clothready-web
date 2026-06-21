'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import { Menu, X, User, ShoppingCart } from 'lucide-react'
import { useCart } from '@/components/CartContext'
import { toast } from 'sonner'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/products/custom', label: 'Products' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

function GoogleG() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

export default function Navbar() {
  const pathname  = usePathname()
  const isLight   = pathname !== '/'
  const { count } = useCart()
  const [scrolled, setScrolled]       = useState(false)
  const [mobileOpen, setMobileOpen]   = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const accountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false); setAccountOpen(false) }, [pathname])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) setAccountOpen(false)
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  const navBg     = isLight ? 'bg-white/95 backdrop-blur-sm border-b border-black/[0.08]' : scrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/10' : ''
  const linkActive   = isLight ? 'text-gray-900' : 'text-white'
  const linkInactive = isLight ? 'text-gray-500 hover:text-gray-900' : 'text-white/70 hover:text-white'
  const mobBg  = isLight ? 'bg-white border-t border-black/[0.08]' : 'bg-black border-t border-white/10'
  const mobLink = isLight ? 'text-gray-700 hover:text-gray-900' : 'text-white/80 hover:text-white'
  const mobDiv  = isLight ? 'border-black/[0.06]' : 'border-white/5'

  const btnStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg,#ff4757,#ff6b6b)',
    width: 40, height: 40, borderRadius: '50%',
    border: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s',
    flexShrink: 0,
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all ${navBg}`}>
      <div className="container-1200 flex items-center justify-between h-[72px]">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img src="/logo.png" alt="ClothReady" className="h-9 w-auto"
            style={{ filter: isLight ? 'brightness(0)' : 'none', transition: 'filter 0.2s' }}
          />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-7 text-sm">
          {NAV_LINKS.map((l) => {
            const active = pathname === l.href || pathname?.startsWith(l.href + '/')
            return (
              <li key={l.href}>
                <Link href={l.href} className={`relative font-medium transition-colors ${active ? linkActive : linkInactive}`}>
                  {l.label}
                  {active && <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary" />}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Right: Get Quote | Account | Cart */}
        <div className="hidden md:flex items-center gap-3">

          {/* Get Quote */}
          <Link href="/products/custom" className="btn btn-primary text-xs">Get Quote</Link>

          {/* Account — sign-in popup */}
          <div ref={accountRef} className="relative">
            <button type="button" onClick={() => setAccountOpen(!accountOpen)}
              style={btnStyle} aria-label="Sign In"
              onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(255,71,87,0.4)' }}
              onMouseOut={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <User size={18} color="#fff" />
            </button>

            {accountOpen && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 14px)', right: 0,
                width: 288, background: '#fff', borderRadius: 16,
                boxShadow: '0 12px 48px rgba(0,0,0,0.18)', padding: '1.25rem',
                border: '1px solid rgba(0,0,0,0.07)', zIndex: 100,
              }}>
                <input type="email" placeholder="Your Email Address"
                  style={{ width: '100%', padding: '10px 14px', background: '#f4f4f4', border: 'none', borderRadius: 9, marginBottom: '0.65rem', fontSize: '0.88rem', color: '#333', outline: 'none', boxSizing: 'border-box' }}
                />
                <input type="password" placeholder="Password"
                  style={{ width: '100%', padding: '10px 14px', background: '#f4f4f4', border: 'none', borderRadius: 9, marginBottom: '0.9rem', fontSize: '0.88rem', color: '#333', outline: 'none', boxSizing: 'border-box' }}
                />
                <button
                  onClick={() => toast.info('Account system coming soon!')}
                  style={{ width: '100%', padding: '11px', background: 'linear-gradient(135deg,#ff4757,#ff6b6b)', color: '#fff', border: 'none', borderRadius: 9, fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', marginBottom: '1rem', letterSpacing: '0.02em' }}
                >
                  Sign in
                </button>
                <div style={{ textAlign: 'center', fontSize: '0.78rem', color: '#aaa', marginBottom: '0.65rem' }}>Sign In With:</div>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                  <button
                    onClick={() => toast.info('Google sign-in coming soon!')}
                    style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid rgba(0,0,0,0.12)', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <GoogleG />
                  </button>
                </div>
                <button
                  onClick={() => toast.info('Registration coming soon!')}
                  style={{ width: '100%', padding: '10px', background: '#fff', border: '1.5px solid #ff4757', color: '#ff4757', borderRadius: 9, fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer', marginBottom: '0.85rem', letterSpacing: '0.02em' }}
                >
                  Join Free
                </button>
                <div style={{ textAlign: 'center' }}>
                  <a href="/contact" style={{ fontSize: '0.78rem', color: '#aaa', textDecoration: 'none' }}>Forgot your password?</a>
                </div>
              </div>
            )}
          </div>

          {/* Cart button */}
          <div className="relative">
            <Link href="/account/orders"
              style={btnStyle}
              aria-label="My Orders"
              onMouseOver={(e: any) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(255,71,87,0.4)' }}
              onMouseOut={(e: any) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <ShoppingCart size={18} color="#fff" />
            </Link>
            {count > 0 && (
              <span style={{
                position: 'absolute', top: -6, right: -6,
                minWidth: 18, height: 18, background: '#111', color: '#fff',
                fontSize: '0.65rem', fontWeight: 800, borderRadius: 9,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '0 4px', border: '2px solid #fff', lineHeight: 1,
              }}>
                {count}
              </span>
            )}
          </div>
        </div>

        {/* Mobile burger */}
        <button className={`md:hidden ${isLight ? 'text-gray-800' : 'text-white'}`}
          onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className={`md:hidden ${mobBg}`}>
          <ul className="container-1200 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((l, i) => (
              <li key={l.href}>
                <Link href={l.href} className={`block py-3 ${mobLink} ${i > 0 ? `border-t ${mobDiv}` : ''}`}>{l.label}</Link>
              </li>
            ))}
            <li className={`border-t ${mobDiv} pt-3 mt-1 flex gap-3`}>
              <Link href="/products/custom" className="btn btn-primary text-xs flex-1 text-center">Get Quote</Link>
              <Link href="/account/orders" className="btn btn-outline text-xs flex items-center gap-1">
                <ShoppingCart size={14} />
                {count > 0 && <span className="font-bold text-primary">{count}</span>}
                Orders
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}
