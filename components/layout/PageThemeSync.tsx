'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function PageThemeSync() {
  const pathname = usePathname()
  useEffect(() => {
    document.body.classList.toggle('light-page', pathname !== '/')
  }, [pathname])
  return null
}
