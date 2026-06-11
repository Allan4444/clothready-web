'use client'

import { useState } from 'react'
import Link from 'next/link'

const faqs = [
  {
    q: 'What is your minimum order quantity (MOQ)?',
    a: 'Our standard MOQ is 50 pieces per style per colorway for custom manufacturing. For sample orders, you can start with just 1–3 pieces. If you need smaller quantities, check our In-Stock shop where no minimum applies.',
  },
  {
    q: 'How long does production take?',
    a: 'Sample production takes 7–14 business days. Bulk orders typically take 25–35 business days after sample approval and deposit payment. Rush production (15–20 days) is available for an additional fee — contact us to confirm availability.',
  },
  {
    q: 'Do you provide samples before bulk production?',
    a: 'Yes — we strongly recommend ordering a sample first. You can request a custom sample via our Sample Order page. Sample costs are credited back against your bulk order invoice once you proceed.',
  },
  {
    q: 'What fabrics and materials do you work with?',
    a: 'We work with a wide range of fabrics including cotton, polyester, nylon, spandex blends, French terry, fleece, mesh, and sustainable options like recycled polyester and organic cotton. We can source specific fabrics on request.',
  },
  {
    q: 'Can I use my own brand labels and packaging?',
    a: 'Absolutely. We offer full private-label service: woven labels, hang tags, heat transfer labels, custom poly bags, tissue paper, and branded boxes. Send us your artwork files and we handle the rest.',
  },
  {
    q: 'What is a Tech Pack and do I need one?',
    a: 'A tech pack is a detailed technical document that tells the factory exactly how to build your garment — measurements, materials, stitching, and construction details. It is the most important step to get samples right the first time. If you don\'t have one, we can create it for you. Download our free Tech Pack templates on the Tech Pack page.',
  },
  {
    q: 'How do I send my design files?',
    a: 'We accept Adobe Illustrator (.ai), PDF, high-resolution JPG or PNG, and CLO3D files. For prints, please provide vector files at 300 dpi minimum. You can email files to info@clothready.com or share a Google Drive / Dropbox link.',
  },
  {
    q: 'What are your payment terms?',
    a: 'We require a 30% deposit to begin production, with the remaining 70% due before shipment. For first-time orders, payment is via wire transfer (T/T) or PayPal. Established clients may be eligible for net-15 terms.',
  },
  {
    q: 'How do you ship orders and what are typical lead times?',
    a: 'We ship via DHL, FedEx, UPS, sea freight, and air freight depending on order size and budget. Express air (3–7 days), standard air (7–14 days), and sea freight (25–45 days to most destinations). We provide a tracking number as soon as the order ships.',
  },
  {
    q: 'How do you ensure quality control?',
    a: 'Every order goes through a 3-stage QC process: fabric inspection before cutting, inline inspection during production, and a final 100% inspection before packing. We provide a QC report with photos for every bulk order. Third-party inspection (e.g. SGS, Bureau Veritas) can be arranged on request.',
  },
]

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <main style={{ background: '#0a0a0a', color: '#fff', minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{ padding: '7rem 2rem 4rem', textAlign: 'center', maxWidth: 700, margin: '0 auto' }}>
        <span style={{ display: 'inline-block', background: 'rgba(255,71,87,0.12)', color: '#ff4757', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '6px 16px', borderRadius: 50, marginBottom: '1.5rem' }}>
          FAQ
        </span>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.5px', lineHeight: 1.1, marginBottom: '1rem' }}>
          Frequently Asked Questions
        </h1>
        <p style={{ color: '#777', fontSize: '1rem', lineHeight: 1.7 }}>
          Everything you need to know before starting your custom garment order.
          Can't find your answer? <Link href="/contact" style={{ color: '#ff4757', textDecoration: 'none' }}>Contact us directly.</Link>
        </p>
      </section>

      {/* FAQ accordion */}
      <section style={{ maxWidth: 820, margin: '0 auto', padding: '0 2rem 6rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {faqs.map((item, i) => (
            <div
              key={i}
              style={{ background: open === i ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.03)', border: `1px solid ${open === i ? 'rgba(255,71,87,0.35)' : 'rgba(255,255,255,0.07)'}`, borderRadius: 14, overflow: 'hidden', transition: 'border-color 0.2s' }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 1.5rem', background: 'none', border: 'none', color: '#fff', cursor: 'pointer', textAlign: 'left', gap: '1rem' }}
              >
                <span style={{ fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.4 }}>
                  <span style={{ color: '#ff4757', marginRight: '0.75rem', fontWeight: 900 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {item.q}
                </span>
                <span style={{ flexShrink: 0, width: 24, height: 24, borderRadius: '50%', background: open === i ? '#ff4757' : 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s, transform 0.3s', transform: open === i ? 'rotate(45deg)' : 'none' }}>
                  <svg width="12" height="12" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M12 5v14M5 12h14" strokeLinecap="round"/>
                  </svg>
                </span>
              </button>
              {open === i && (
                <div style={{ padding: '0 1.5rem 1.5rem 1.5rem' }}>
                  <p style={{ color: '#aaa', fontSize: '0.9rem', lineHeight: 1.75, margin: 0, paddingLeft: '2.25rem' }}>
                    {item.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ marginTop: '3.5rem', textAlign: 'center', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: '2.5rem 2rem' }}>
          <h3 style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: '0.5rem' }}>Still Have Questions?</h3>
          <p style={{ color: '#777', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Our team responds within 24 hours.</p>
          <Link href="/contact" style={{ display: 'inline-block', background: 'linear-gradient(135deg, #ff4757, #ff6b6b)', color: '#fff', padding: '12px 32px', borderRadius: 50, fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  )
}
