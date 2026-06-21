'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import { Menu, X, User, ShoppingCart, LogOut } from 'lucide-react'
import { useCart } from '@/components/CartContext'
import { useSession, signOut } from 'next-auth/react'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/products/custom', label: 'Products' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const pathname     = usePathname()
  const router       = useRouter()
  const isLight      = pathname !== '/'
  const { count }    = useCart()
  const { data: session } = useSession()
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

  const navBg      = isLight ? 'bg-white/95 backdrop-blur-sm border-b border-black/[0.08]' : scrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/10' : ''
  const linkActive   = isLight ? 'text-gray-900' : 'text-white'
  const linkInactive = isLight ? 'text-gray-500 hover:text-gray-900' : 'text-white/70 hover:text-white'
  const mobBg   = isLight ? 'bg-white border-t border-black/[0.08]' : 'bg-black border-t border-white/10'
  const mobLink = isLight ? 'text-gray-700 hover:text-gray-900' : 'text-white/80 hover:text-white'
  const mobDiv  = isLight ? 'border-black/[0.06]' : 'border-white/5'

  const btnStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg,#ff4757,#ff6b6b)',
    width: 40, height: 40, borderRadius: '50%',
    border: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s',
    flexShrink: 0, overflow: 'hidden', padding: 0,
  }

  const hoverOn  = (e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(255,71,87,0.4)' }
  const hoverOff = (e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }

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

          <Link href="/products/custom" className="btn btn-primary text-xs">Get Quote</Link>

          {/* Account */}
          {session ? (
            /* Signed-in: show avatar with dropdown */
            <div ref={accountRef} className="relative">
              <button
                type="button"
                onClick={() => setAccountOpen(!accountOpen)}
                style={btnStyle}
                aria-label="Account"
                onMouseOver={hoverOn} onMouseOut={hoverOff}
              >
                {session.user?.image
                  ? <img src={session.user.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#fff' }}>{(session.user?.name || 'U')[0].toUpperCase()}</span>
                }
              </button>

              {accountOpen && (
                <div style={{
                  position: 'absolute', top: 'calc(100% + 12px)', right: 0,
                  width: 240, background: '#fff', borderRadius: 14,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.14)', padding: '1rem',
                  border: '1px solid rgba(0,0,0,0.07)', zIndex: 100,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem', paddingBottom: '0.85rem', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
                    {session.user?.image
                      ? <img src={session.user.image} alt="" style={{ width: 38, height: 38, borderRadius: '50%', flexShrink: 0 }} />
                      : <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg,#ff4757,#ff6b6b)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#fff', flexShrink: 0 }}>{(session.user?.name || 'U')[0].toUpperCase()}</div>
                    }
                    <div style={{ overflow: 'hidden' }}>
                      <div style={{ fontWeight: 700, color: '#111', fontSize: '0.88rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{session.user?.name}</div>
                      <div style={{ fontSize: '0.72rem', color: '#999', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{session.user?.email}</div>
                    </div>
                  </div>
                  <Link href="/cart" onClick={() => setAccountOpen(false)}
                    style={{ display: 'block', padding: '9px 12px', background: 'rgba(255,71,87,0.06)', borderRadius: 8, color: '#ff4757', fontWeight: 600, fontSize: '0.85rem', textDecoration: 'none', marginBottom: '0.5rem' }}
                  >
                    My Cart & Orders
                  </Link>
                  <button
                    onClick={() => { signOut(); setAccountOpen(false) }}
                    style={{ width: '100%', padding: '9px 12px', background: 'none', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 8, color: '#777', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                  >
                    <LogOut size={14} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Not signed in: link to /login */
            <button
              type="button"
              onClick={() => router.push('/login')}
              style={btnStyle}
              aria-label="Sign In"
              onMouseOver={hoverOn} onMouseOut={hoverOff}
            >
              <User size={18} color="#fff" />
            </button>
          )}

          {/* Cart */}
          <div className="relative">
            <Link href="/cart" style={btnStyle} aria-label="Cart" onMouseOver={hoverOn} onMouseOut={hoverOff}>
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
              <Link href={session ? '/cart' : '/login'} className="btn btn-outline text-xs flex items-center gap-1">
                {session ? <><ShoppingCart size={14} />{count > 0 && <span className="font-bold text-primary">{count}</span>} Cart</> : 'Sign In'}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}
