'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  LayoutGrid,
  Mail,
  Package,
  Users,
  Tag,
  FileText,
  LogOut,
} from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutGrid },
  { label: 'Inquiries', href: '/admin/inquiries', icon: Mail },
  { label: 'Samples', href: '/admin/samples', icon: Package },
  { label: 'Customers', href: '/admin/customers', icon: Users },
  { label: 'Products', href: '/admin/products', icon: Tag },
  { label: 'Tech Packs', href: '/admin/techpacks', icon: FileText },
]

function getPageTitle(pathname: string) {
  const item = NAV_ITEMS.find(n => n.href === pathname)
  return item ? item.label : 'Admin'
}

function formatTime(date: Date) {
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [time, setTime] = useState(() => formatTime(new Date()))

  useEffect(() => {
    const interval = setInterval(() => setTime(formatTime(new Date())), 60000)
    return () => clearInterval(interval)
  }, [])

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  // Don't render sidebar on login page
  if (pathname === '/admin/login') return <>{children}</>

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0a0a', fontFamily: 'system-ui, sans-serif' }}>
      {/* Sidebar */}
      <aside style={{
        width: 220,
        background: '#111',
        borderRight: '1px solid #1e1e1e',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        zIndex: 50,
      }}>
        {/* Logo */}
        <div style={{
          padding: '20px 20px 16px',
          borderBottom: '1px solid #1e1e1e',
        }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', letterSpacing: '-0.3px' }}>
            ClothReady
          </div>
          <div style={{ fontSize: 11, color: '#555', marginTop: 2, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Admin Panel
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '12px 8px', overflow: 'auto' }}>
          {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
            const active = pathname === href
            return (
              <a
                key={href}
                href={href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '9px 12px',
                  borderRadius: 6,
                  marginBottom: 2,
                  color: active ? '#fff' : '#888',
                  background: active ? '#1e1e1e' : 'transparent',
                  textDecoration: 'none',
                  fontSize: 14,
                  fontWeight: active ? 600 : 400,
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => {
                  if (!active) (e.currentTarget as HTMLAnchorElement).style.color = '#ccc'
                }}
                onMouseLeave={e => {
                  if (!active) (e.currentTarget as HTMLAnchorElement).style.color = '#888'
                }}
              >
                <Icon size={16} />
                {label}
              </a>
            )
          })}
        </nav>

        {/* Logout */}
        <div style={{ padding: '12px 8px', borderTop: '1px solid #1e1e1e' }}>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              width: '100%',
              padding: '9px 12px',
              borderRadius: 6,
              background: 'transparent',
              border: '1px solid #333',
              color: '#888',
              fontSize: 14,
              cursor: 'pointer',
            }}
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div style={{ marginLeft: 220, flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Top bar */}
        <header style={{
          background: '#111',
          borderBottom: '1px solid #1e1e1e',
          padding: '0 24px',
          height: 56,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 40,
        }}>
          <h1 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: '#fff' }}>
            {getPageTitle(pathname)}
          </h1>
          <span style={{ color: '#555', fontSize: 13 }}>{time}</span>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, padding: 24, overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  )
}
