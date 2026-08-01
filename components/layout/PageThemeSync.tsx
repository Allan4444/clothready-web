'use client'
import { useEffect } from 'react'

export default function PageThemeSync() {
  useEffect(() => {
    document.body.classList.add('light-page')
  }, [])
  return null
}
