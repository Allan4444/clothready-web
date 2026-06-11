'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/about', label: 'About' },
  { href: '/tracking', label: 'Track' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all ${
        scrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/10' : ''
      }`}
    >
      <div className="container-1200 flex items-center justify-between h-[72px]">
        <Link href="/" className="flex items-center">
          <img
            src="/logo.png"
            alt="ClothReady"
            className="h-9 w-auto"
            style={{ mixBlendMode: 'screen' }}
          />
        </Link>

        <ul className="hidden md:flex items-center gap-8 text-sm">
          {NAV_LINKS.map((l) => {
            const active = pathname === l.href
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`relative font-medium transition-colors ${
                    active ? 'text-white' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {l.label}
                  {active && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary" />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="hidden md:block">
          <Link href="/sample-order" className="btn btn-primary text-xs">
            Get Quote
          </Link>
        </div>

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
          <ul className="container-1200 py-4 flex flex-col gap-3">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="block py-2 text-white/80 hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/sample-order" className="btn btn-primary text-xs inline-block mt-2">
                Get Quote
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}
