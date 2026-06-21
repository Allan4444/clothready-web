'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, X, User, ShoppingCart } from 'lucide-react'
import { useCart } from '@/components/CartContext'
import { useSession } from 'next-auth/react'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/products/custom', label: 'Products' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const pathname  = usePathname()
  const router    = useRouter()
  const isLight   = pathname !== '/'
  const { count } = useCart()
  const { data: session } = useSession()
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  const navBg      = isLight ? 'bg-white/95 backdrop-blur-sm border-b border-black/[0.08]' : scrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/10' : ''
  const linkActive   = isLight ? 'text-gray-900' : 'text-white'
  const linkInactive = isLight ? 'text-gray-500 hover:text-gray-900' : 'text-white/70 hover:text-white'
  const mobBg   = isLight ? 'bg-white border-t border-black/[0.08]' : 'bg-black border-t border-white/10'
  const mobLink = isLight ? 'text-gray-700 hover:text-gray-900' : 'text-white/80 hover:text-white'
  const mobDiv  = isLight ? 'border-black/[0.06]' : 'border-white/5'

  const btnBase: React.CSSProperties = {
    width: 40, height: 40, borderRadius: '50%',
    border: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s',
    flexShrink: 0, overflow: 'hidden', padding: 0,
    background: 'linear-gradient(135deg,#ff4757,#ff6b6b)',
  }
  const hoverOn  = (e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(255,71,87,0.4)' }
  const hoverOff = (e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all ${navBg}`}>
      <div className="container-1200 flex items-center justify-between h-[72px]">

        <Link href="/" className="flex items-center">
          <img src="/logo.png" alt="ClothReady" className="h-9 w-auto"
            style={{ filter: isLight ? 'brightness(0)' : 'none', transition: 'filter 0.2s' }}
          />
        </Link>

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

        <div className="hidden md:flex items-center gap-3">
          <Link href="/products/custom" className="btn btn-primary text-xs">Get Quote</Link>

          {/* Account button — avatar if signed in, person icon if not */}
          {session ? (
            <Link
              href="/account"
              style={btnBase}
              aria-label="My Account"
              onMouseOver={hoverOn} onMouseOut={hoverOff}
            >
              {session.user?.image
                ? <img src={session.user.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#fff' }}>{(session.user?.name || 'U')[0].toUpperCase()}</span>
              }
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => router.push('/login')}
              style={btnBase}
              aria-label="Sign In"
              onMouseOver={hoverOn} onMouseOut={hoverOff}
            >
              <User size={18} color="#fff" />
            </button>
          )}

          {/* Cart */}
          <div className="relative">
            <Link href="/cart" style={btnBase} aria-label="Cart" onMouseOver={hoverOn} onMouseOut={hoverOff}>
              <ShoppingCart size={18} color="#fff" />
            </Link>
            {count > 0 && (
              <span style={{
                position: 'absolute', top: -6, right: -6,
                minWidth: 18, height: 18, background: '#111', color: '#fff',
                fontSize: '0.65rem', fontWeight: 800, borderRadius: 9,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '0 4px', border: '2px solid #fff', lineHeight: 1,
                pointerEvents: 'none',
              }}>
                {count}
              </span>
            )}
          </div>
        </div>

        <button className={`md:hidden ${isLight ? 'text-gray-800' : 'text-white'}`}
          onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

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
              <Link href={session ? '/account' : '/login'} className="btn btn-outline text-xs flex items-center gap-1">
                {session ? 'My Account' : 'Sign In'}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}
