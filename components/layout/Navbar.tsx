'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import { Menu, X, User, ChevronDown } from 'lucide-react'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  {
    href: '/products',
    label: 'Products',
    children: [
      { href: '/products/custom', label: 'Custom Manufacturing', desc: 'MOQ 50pcs, your design' },
      { href: '/products/in-stock', label: 'In Stock / Shop', desc: 'Ready to ship, 1-50pcs' },
    ],
  },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

const ACCOUNT_LINKS = [
  { href: '/account', label: 'My Account', icon: '👤' },
  { href: '/account/orders', label: 'My Order', icon: '📦' },
]

export default function Navbar() {
  const pathname = usePathname()
  const isLight = pathname !== '/'
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const productsRef = useRef<HTMLLIElement>(null)
  const accountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setProductsOpen(false)
    setAccountOpen(false)
  }, [pathname])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (productsRef.current && !productsRef.current.contains(e.target as Node)) setProductsOpen(false)
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) setAccountOpen(false)
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  const navBg = isLight
    ? 'bg-white/95 backdrop-blur-sm border-b border-black/[0.08]'
    : scrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/10' : ''

  const linkActive   = isLight ? 'text-gray-900'               : 'text-white'
  const linkInactive = isLight ? 'text-gray-500 hover:text-gray-900' : 'text-white/70 hover:text-white'
  const dropBg    = isLight ? 'bg-white border-black/[0.08] shadow-xl'  : 'bg-[#141414] border-white/10 shadow-2xl'
  const dropHover = isLight ? 'hover:bg-gray-50'  : 'hover:bg-white/5'
  const dropDiv   = isLight ? 'border-black/[0.06]' : 'border-white/5'
  const dropLabel = isLight ? 'text-gray-900'  : 'text-white'
  const dropDesc  = isLight ? 'text-gray-400'  : 'text-white/40'
  const dropMeta  = isLight ? 'text-gray-400'  : 'text-white/40'
  const mobBg     = isLight ? 'bg-white border-t border-black/[0.08]' : 'bg-black border-t border-white/10'
  const mobLink   = isLight ? 'text-gray-700 hover:text-gray-900'    : 'text-white/80 hover:text-white'
  const mobDiv    = isLight ? 'border-black/[0.06]' : 'border-white/5'
  const mobSec    = isLight ? 'text-gray-400'  : 'text-white/40'

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

            if (l.children) {
              return (
                <li key={l.href} ref={productsRef} className="relative">
                  <button
                    onClick={() => setProductsOpen(!productsOpen)}
                    className={`flex items-center gap-1 font-medium transition-colors ${active ? linkActive : linkInactive}`}
                  >
                    {l.label}
                    <ChevronDown size={14} className={`transition-transform ${productsOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {active && <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary" />}
                  {productsOpen && (
                    <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[280px] border rounded-xl overflow-hidden ${dropBg}`}>
                      {l.children.map((child) => (
                        <Link key={child.href} href={child.href}
                          className={`block px-5 py-4 transition-colors border-b last:border-0 ${dropHover} ${dropDiv}`}
                        >
                          <div className={`font-medium text-sm ${dropLabel}`}>{child.label}</div>
                          <div className={`text-xs mt-0.5 ${dropDesc}`}>{child.desc}</div>
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              )
            }

            return (
              <li key={l.href}>
                <Link href={l.href}
                  className={`relative font-medium transition-colors ${active ? linkActive : linkInactive}`}
                >
                  {l.label}
                  {active && <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary" />}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          <div ref={accountRef} className="relative">
            <button type="button" onClick={() => setAccountOpen(!accountOpen)}
              style={{ background: 'linear-gradient(135deg,#ff4757,#ff6b6b)' }}
              className="w-10 h-10 rounded-full border-0 flex items-center justify-center transition-all hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
              aria-label="My Account"
            >
              <User size={18} className="text-white" />
            </button>
            {accountOpen && (
              <div className={`absolute top-full right-0 mt-3 w-[240px] border rounded-xl overflow-hidden ${dropBg}`}>
                <div className={`px-5 py-3 border-b ${dropDiv}`}>
                  <div className={`text-xs uppercase tracking-wider ${dropMeta}`}>My Account</div>
                </div>
                {ACCOUNT_LINKS.map((link) => (
                  <Link key={link.href} href={link.href}
                    className={`flex items-center gap-3 px-5 py-3 transition-colors ${dropHover}`}
                  >
                    <span>{link.icon}</span>
                    <span className={`text-sm ${isLight ? 'text-gray-700' : 'text-white/80'}`}>{link.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link href="/products/custom" className="btn btn-primary text-xs">Get Quote</Link>
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
            <li><Link href="/" className={`block py-3 ${mobLink}`}>Home</Link></li>
            <li className={`border-t ${mobDiv} pt-2 mt-1`}>
              <div className={`text-xs uppercase tracking-wider py-2 ${mobSec}`}>Products</div>
              <Link href="/products/custom" className={`block py-3 pl-4 ${mobLink}`}>Custom Manufacturing</Link>
              <Link href="/products/in-stock" className={`block py-3 pl-4 ${mobLink}`}>In Stock / Shop</Link>
            </li>
            <li><Link href="/about" className={`block py-3 ${mobLink} border-t ${mobDiv}`}>About</Link></li>
            <li><Link href="/contact" className={`block py-3 ${mobLink} border-t ${mobDiv}`}>Contact</Link></li>
            <li className={`border-t ${mobDiv} pt-2 mt-1`}>
              <div className={`text-xs uppercase tracking-wider py-2 ${mobSec}`}>My Account</div>
              {ACCOUNT_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className={`block py-3 pl-4 ${mobLink}`}>
                  {link.icon} {link.label}
                </Link>
              ))}
            </li>
            <li className="pt-3">
              <Link href="/products/custom" className="btn btn-primary text-xs inline-block">Get Quote</Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}
