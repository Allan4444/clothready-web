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
  { href: '/account/orders', label: 'My Orders & Tracking', icon: '📦' },
]

export default function Navbar() {
  const pathname = usePathname()
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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all ${
        scrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/10' : ''
      }`}
    >
      <div className="container-1200 flex items-center justify-between h-[72px]">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img src="/logo.png" alt="ClothReady" className="h-9 w-auto" />
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
                    className={`flex items-center gap-1 font-medium transition-colors ${
                      active ? 'text-white' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {l.label}
                    <ChevronDown size={14} className={`transition-transform ${productsOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {active && <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary" />}

                  {productsOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[280px] bg-[#141414] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                      {l.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-5 py-4 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                        >
                          <div className="text-white font-medium text-sm">{child.label}</div>
                          <div className="text-white/40 text-xs mt-0.5">{child.desc}</div>
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              )
            }

            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`relative font-medium transition-colors ${
                    active ? 'text-white' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {l.label}
                  {active && <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary" />}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Right side: Account icon + Get Quote */}
        <div className="hidden md:flex items-center gap-3">
          {/* Account button — same style as Get Quote */}
          <div ref={accountRef} className="relative">
            <button
              onClick={() => setAccountOpen(!accountOpen)}
              className="btn btn-primary text-xs flex items-center gap-2"
            >
              <User size={15} />
              My Account
            </button>

            {accountOpen && (
              <div className="absolute top-full right-0 mt-3 w-[240px] bg-[#141414] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                <div className="px-5 py-3 border-b border-white/5">
                  <div className="text-xs text-white/40 uppercase tracking-wider">My Account</div>
                </div>
                {ACCOUNT_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 px-5 py-3 hover:bg-white/5 transition-colors"
                  >
                    <span>{link.icon}</span>
                    <span className="text-sm text-white/80">{link.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/products/custom" className="btn btn-primary text-xs">
            Get Quote
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-black border-t border-white/10">
          <ul className="container-1200 py-4 flex flex-col gap-1">
            <li><Link href="/" className="block py-3 text-white/80 hover:text-white">Home</Link></li>
            <li className="border-t border-white/5 pt-2 mt-1">
              <div className="text-xs text-white/40 uppercase tracking-wider py-2">Products</div>
              <Link href="/products/custom" className="block py-3 pl-4 text-white/80 hover:text-white">
                Custom Manufacturing
              </Link>
              <Link href="/products/in-stock" className="block py-3 pl-4 text-white/80 hover:text-white">
                In Stock / Shop
              </Link>
            </li>
            <li><Link href="/about" className="block py-3 text-white/80 hover:text-white border-t border-white/5">About</Link></li>
            <li><Link href="/contact" className="block py-3 text-white/80 hover:text-white border-t border-white/5">Contact</Link></li>
            <li className="border-t border-white/5 pt-2 mt-1">
              <div className="text-xs text-white/40 uppercase tracking-wider py-2">My Account</div>
              {ACCOUNT_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className="block py-3 pl-4 text-white/80 hover:text-white">
                  {link.icon} {link.label}
                </Link>
              ))}
            </li>
            <li className="pt-3">
              <Link href="/products/custom" className="btn btn-primary text-xs inline-block">
                Get Quote
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}
