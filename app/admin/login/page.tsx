'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.ok) {
        router.push('/admin/dashboard')
      } else {
        setError('Incorrect password')
      }
    } catch {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, sans-serif',
    }}>
      <div style={{
        background: '#111',
        border: '1px solid #1e1e1e',
        borderRadius: 12,
        padding: '40px',
        width: '100%',
        maxWidth: 380,
      }}>
        <div style={{ marginBottom: 32, textAlign: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#fff', letterSpacing: '-0.5px' }}>
            ClothReady Admin
          </div>
          <div style={{ color: '#666', marginTop: 6, fontSize: 14 }}>Sign in to continue</div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#aaa', fontSize: 13, marginBottom: 6 }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoFocus
              style={{
                width: '100%',
                background: '#1a1a1a',
                border: '1px solid #2e2e2e',
                borderRadius: 6,
                padding: '10px 12px',
                color: '#fff',
                fontSize: 14,
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {error && (
            <div style={{ color: '#ff4757', fontSize: 13, marginBottom: 12 }}>{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              background: '#ff4757',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              padding: '11px',
              fontSize: 14,
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
