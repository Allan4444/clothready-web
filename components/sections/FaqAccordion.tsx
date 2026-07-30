'use client'

import { useState } from 'react'
import type { FAQItem } from '@/lib/faqs'
import FaqAnswer from './FaqAnswer'

interface Props {
  items: FAQItem[]
  startIndexAt?: number
}

export default function FaqAccordion({ items, startIndexAt = 0 }: Props) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {items.map((item, i) => (
        <div
          key={item.q}
          style={{
            background: open === i ? 'rgba(255,71,87,0.03)' : '#fff',
            border: `1px solid ${open === i ? 'rgba(255,71,87,0.3)' : 'rgba(0,0,0,0.09)'}`,
            borderRadius: 14, overflow: 'hidden', transition: 'border-color 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          }}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 1.5rem', background: 'none', border: 'none', color: '#111', cursor: 'pointer', textAlign: 'left', gap: '1rem' }}
          >
            <span style={{ fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.4 }}>
              <span style={{ color: '#ff4757', marginRight: '0.75rem', fontWeight: 900 }}>
                {String(startIndexAt + i + 1).padStart(2, '0')}
              </span>
              {item.q}
            </span>
            <span style={{ flexShrink: 0, width: 24, height: 24, borderRadius: '50%', background: open === i ? '#ff4757' : 'rgba(0,0,0,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s, transform 0.3s', transform: open === i ? 'rotate(45deg)' : 'none' }}>
              <svg width="12" height="12" fill="none" stroke={open === i ? 'white' : '#555'} strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M12 5v14M5 12h14" strokeLinecap="round"/>
              </svg>
            </span>
          </button>
          {open === i && (
            <div style={{ padding: '0 1.5rem 1.5rem 1.5rem' }}>
              <div style={{ paddingLeft: '2.25rem' }}>
                <FaqAnswer text={item.a} />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
