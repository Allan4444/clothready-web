'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import { Menu, X, User, ShoppingCart, ChevronDown } from 'lucide-react'
import { useCart } from '@/components/CartContext'
import { useSession } from 'next-auth/react'

const CATEGORY_LINKS = [
  { href: '/products/gym-wear-manufacturer', label: 'Gym Wear' },
  { href: '/products/custom-hoodies-manufacturer', label: 'Custom Hoodies' },
  { href: '/products/yoga-pants-manufacturer', label: 'Yoga Pants' },
  { href: '/products/activewear-manufacturer', label: 'Activewear' },
  { href: '/products/streetwear-manufacturer', label: 'Streetwear' },
  { href: '/products/custom-joggers', label: 'Custom Joggers' },
  { href: '/products/sports-bra-manufacturer', label: 'Sports Bras' },
  { href: '/products/oversized-tshirt-manufacturer', label: 'Oversized T-Shirts' },
  { href: '/products/custom-jackets-manufacturer', label: 'Custom Jackets' },
  { href: '/products/custom-swimsuits-manufacturer', label: 'Custom Swimsuits' },
]

const SIMPLE_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const pathname  = usePathname()
  const router    = useRouter()
  const isLight   = pathname !== '/'
  const { count } = useCart()
  const { data: session } = useSession()
  const [scrolled, setScrolled]         = useState(false)
  const [mobileOpen, setMobileOpen]     = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const productsRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false); setProductsOpen(false) }, [pathname])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (productsRef.current && !productsRef.current.contains(e.target as Node)) setProductsOpen(false)
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

  const btnBase: React.CSSProperties = {
    width: 40, height: 40, borderRadius: '50%',
    border: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s',
    flexShrink: 0, overflow: 'hidden', padding: 0,
    background: 'linear-gradient(135deg,#ff4757,#ff6b6b)',
  }
  const hoverOn  = (e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(255,71,87,0.4)' }
  const hoverOff = (e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }

  const productsActive = pathname === '/products' || pathname?.startsWith('/products/')

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all ${navBg}`}>
      <div className="container-1200 flex items-center justify-between h-[72px]">

        <Link href="/" className="flex items-center">
          <img src="/logo.png" alt="ClothReady" className="h-9 w-auto"
            style={{ filter: isLight ? 'brightness(0)' : 'none', transition: 'filter 0.2s' }}
          />
        </Link>

        <ul className="hidden md:flex items-center gap-7 text-sm">
          {/* Home */}
          <li>
            <Link href="/" className={`relative font-medium transition-colors ${pathname === '/' ? linkActive : linkInactive}`}>
              Home
              {pathname === '/' && <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary" />}
            </Link>
          </li>

          {/* Products dropdown */}
          <li ref={productsRef} className="relative">
            <button
              onClick={() => setProductsOpen(!productsOpen)}
              className={`flex items-center gap-1 font-medium transition-colors ${productsActive ? linkActive : linkInactive}`}
            >
              Products
              <ChevronDown size={14} className={`transition-transform ${productsOpen ? 'rotate-180' : ''}`} />
            </button>
            {productsActive && <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary" />}

            {productsOpen && (
              <div
                className="absolute top-full mt-3 rounded-xl overflow-hidden shadow-2xl"
                style={{ left: '50%', transform: 'translateX(-50%)', width: 540, background: isLight ? '#fff' : '#141414', border: isLight ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.1)' }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                  {/* Left: order types */}
                  <div style={{ borderRight: isLight ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ padding: '10px 16px 6px', fontSize: '0.7rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>Order Type</div>
                    <Link href="/products/custom" className={`block px-4 py-3 transition-colors border-b ${isLight ? 'border-black/5 hover:bg-black/5 text-gray-800' : 'border-white/5 hover:bg-white/5 text-white'}`}>
                      <div className="font-medium text-sm">Custom Manufacturing</div>
                      <div className={`text-xs mt-0.5 ${isLight ? 'text-gray-400' : 'text-white/40'}`}>MOQ 50pcs, your design</div>
                    </Link>
                    <Link href="/products/in-stock" className={`block px-4 py-3 transition-colors ${isLight ? 'hover:bg-black/5 text-gray-800' : 'hover:bg-white/5 text-white'}`}>
                      <div className="font-medium text-sm">In Stock / Shop</div>
                      <div className={`text-xs mt-0.5 ${isLight ? 'text-gray-400' : 'text-white/40'}`}>Ready to ship, 1-50pcs</div>
                    </Link>
                  </div>
                  {/* Right: categories */}
                  <div>
                    <div style={{ padding: '10px 16px 6px', fontSize: '0.7rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>Categories</div>
                    {CATEGORY_LINKS.map((cat) => (
                      <Link key={cat.href} href={cat.href}
                        className={`block px-4 py-1.5 text-sm transition-colors ${isLight ? 'text-gray-600 hover:text-gray-900 hover:bg-black/5' : 'text-white/70 hover:text-white hover:bg-white/5'}`}
                      >
                        {cat.label}
                      </Link>
                    ))}
                  </div>
                </div>
                <div style={{ borderTop: isLight ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.06)', padding: '10px 16px' }}>
                  <Link href="/products" className={`text-xs transition-colors ${isLight ? 'text-gray-400 hover:text-gray-700' : 'text-white/40 hover:text-white/80'}`}>
                    View all categories →
                  </Link>
                </div>
              </div>
            )}
          </li>

          {/* About, Contact */}
          {SIMPLE_LINKS.map((l) => {
            const active = pathname === l.href
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

          {/* Account button */}
          {session ? (
            <Link href="/account" style={btnBase} aria-label="My Account" onMouseOver={hoverOn} onMouseOut={hoverOff}>
              {session.user?.image
                ? <img src={session.user.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#fff' }}>{(session.user?.name || 'U')[0].toUpperCase()}</span>
              }
            </Link>
          ) : (
            <button type="button" onClick={() => router.push('/login')} style={btnBase} aria-label="Sign In" onMouseOver={hoverOn} onMouseOut={hoverOff}>
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
            <li><Link href="/" className={`block py-3 ${mobLink}`}>Home</Link></li>
            <li className={`border-t ${mobDiv} pt-2 mt-1`}>
              <div className={`text-xs uppercase tracking-wider py-2 ${isLight ? 'text-gray-400' : 'text-white/40'}`}>Products</div>
              <Link href="/products/custom" className={`block py-2 pl-4 ${mobLink}`}>Custom Manufacturing</Link>
              <Link href="/products/in-stock" className={`block py-2 pl-4 ${mobLink}`}>In Stock / Shop</Link>
              <div className={`text-xs uppercase tracking-wider py-2 pl-4 mt-1 ${isLight ? 'text-gray-300' : 'text-white/30'}`}>Categories</div>
              {CATEGORY_LINKS.map((cat) => (
                <Link key={cat.href} href={cat.href} className={`block py-1.5 pl-8 text-sm ${isLight ? 'text-gray-500 hover:text-gray-900' : 'text-white/60 hover:text-white'}`}>
                  {cat.label}
                </Link>
              ))}
            </li>
            <li className={`border-t ${mobDiv}`}><Link href="/about" className={`block py-3 ${mobLink}`}>About</Link></li>
            <li className={`border-t ${mobDiv}`}><Link href="/contact" className={`block py-3 ${mobLink}`}>Contact</Link></li>
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
