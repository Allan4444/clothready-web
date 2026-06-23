'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import Reveal from '@/components/ui/Reveal'
import { enquiriesApi } from '@/lib/api'

export default function ContactPage() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const fd = new FormData(e.currentTarget)
    const data = {
      first_name: String(fd.get('name') || ''),
      last_name: '',
      company: String(fd.get('company') || ''),
      email: String(fd.get('email') || ''),
      phone: String(fd.get('phone') || ''),
      country: '',
      product_category: String(fd.get('subject') || ''),
      quantity_range: '',
      message: String(fd.get('message') || ''),
    }
    try {
      await Promise.all([
        enquiriesApi.create(data),
        fetch('/api/send-inquiry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: data.first_name,
            email: data.email,
            company: data.company,
            phone: data.phone,
            product: data.product_category,
            quantity: data.quantity_range,
            message: data.message,
          }),
        }),
      ])
      setSubmitted(true)
      toast.success("Enquiry sent! We'll reply within 24 hours.")
      ;(e.target as HTMLFormElement).reset()
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong. Please email us directly at info@clothready.com')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section className="section pt-32">
        <div className="container-1200 text-center">
          <Reveal>
            <div className="section-label"><i className="fas fa-envelope" /> Contact Us</div>
            <h1 className="section-title">Let&apos;s Build Together</h1>
            <p className="section-subtitle mx-auto">
              Send us your project details — we reply within 24 hours
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-1200">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '2rem', alignItems: 'start' }} className="contact-grid">

            {/* ── Left: Contact Information ── */}
            <Reveal>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h2 style={{ fontWeight: 800, fontSize: '1.25rem', marginBottom: '1.5rem', color: '#111' }}>Contact Information</h2>

                <div style={rowStyle}>
                  <div style={iconBox}><i className="fas fa-envelope" style={{ color: '#ff4757', fontSize: '1rem' }} /></div>
                  <div>
                    <div style={rowLabel}>Email</div>
                    <a href="mailto:info@clothready.com" style={{ color: '#ff4757', fontSize: '0.9rem', textDecoration: 'none' }}>info@clothready.com</a>
                  </div>
                </div>

                <div style={rowStyle}>
                  <div style={iconBox}><i className="fas fa-phone" style={{ color: '#ff4757', fontSize: '1rem' }} /></div>
                  <div>
                    <div style={rowLabel}>Phone / WhatsApp / WeChat</div>
                    <div style={{ color: '#ff4757', fontWeight: 700, fontSize: '0.95rem' }}>+86 134 1204 4008</div>
                    <div style={{ color: '#888', fontSize: '0.8rem', marginTop: 2 }}>Mon-Fri: 9AM-6PM CST</div>
                  </div>
                </div>

                <div style={rowStyle}>
                  <div style={iconBox}><i className="fas fa-map-marker-alt" style={{ color: '#ff4757', fontSize: '1rem' }} /></div>
                  <div>
                    <div style={rowLabel}>Address</div>
                    <div style={{ color: '#777', fontSize: '0.85rem', lineHeight: 1.7 }}>
                      Room 1205, Caijie Yunchuang Phase II<br />
                      No. 34, Boyong Road<br />
                      Humen Town, Dongguan<br />
                      Guangdong, China
                    </div>
                  </div>
                </div>

                <div style={{ ...rowStyle, borderBottom: 'none', paddingBottom: 0 }}>
                  <div style={iconBox}><i className="fas fa-clock" style={{ color: '#ff4757', fontSize: '1rem' }} /></div>
                  <div>
                    <div style={rowLabel}>Business Hours</div>
                    <div style={{ color: '#777', fontSize: '0.85rem', lineHeight: 1.7 }}>
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 9:00 AM - 1:00 PM<br />
                      Sunday: Closed
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '1.75rem', background: '#fff', border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', borderRadius: 16, padding: '1.25rem 1.5rem' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.5rem', color: '#111' }}>
                    ⚡ Quick Response Guarantee
                  </div>
                  <p style={{ color: '#777', fontSize: '0.82rem', lineHeight: 1.65, marginBottom: '1.1rem' }}>
                    We typically respond to all inquiries within 24 hours during business days.
                  </p>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <a href="mailto:info@clothready.com"
                      style={{ flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', padding: '10px 0', borderRadius: 50, background: 'linear-gradient(135deg,#ff4757,#ff6b6b)', color: '#fff', fontWeight: 600, fontSize: '0.82rem', textDecoration: 'none' }}>
                      <i className="fas fa-envelope" /> Email
                    </a>
                    <a href="https://wa.me/8613412044008" target="_blank" rel="noopener noreferrer"
                      style={{ flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', padding: '10px 0', borderRadius: 50, border: '1px solid rgba(0,0,0,0.15)', color: '#111', fontWeight: 600, fontSize: '0.82rem', textDecoration: 'none', background: 'transparent' }}>
                      <i className="fab fa-whatsapp" /> WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* ── Right: Send Us a Message ── */}
            <Reveal>
              <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 2px 20px rgba(0,0,0,0.06)', borderRadius: 20, padding: '2rem' }}>
                {submitted ? (
                  <div style={{ padding: '3rem 0', textAlign: 'center' }}>
                    <div style={{ width: 64, height: 64, background: 'rgba(42,157,92,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                      <i className="fas fa-check" style={{ color: '#2a9d5c', fontSize: '1.5rem' }} />
                    </div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem', color: '#111' }}>Thank You!</h3>
                    <p style={{ color: '#777' }}>Your enquiry has been received. We&apos;ll reply within 24 hours.</p>
                    <button onClick={() => setSubmitted(false)}
                      style={{ marginTop: '1.5rem', padding: '10px 28px', borderRadius: 50, border: '1px solid rgba(0,0,0,0.15)', background: 'transparent', color: '#111', cursor: 'pointer', fontSize: '0.85rem' }}>
                      Send Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={onSubmit}>
                    <h2 style={{ fontWeight: 800, fontSize: '1.25rem', marginBottom: '1.5rem', color: '#111' }}>Send Us a Message</h2>

                    <div style={formRow}>
                      <Field label="Your Name *" name="name" placeholder="John Smith" required />
                      <Field label="Email Address *" name="email" type="email" placeholder="john@company.com" required />
                    </div>
                    <div style={formRow}>
                      <Field label="Company Name" name="company" placeholder="Your Company Ltd." />
                      <Field label="Phone Number" name="phone" type="tel" placeholder="+1 (555) 123-4567" />
                    </div>

                    <div style={{ marginBottom: '1.1rem' }}>
                      <label style={labelStyle}>Subject *</label>
                      <select name="subject" required style={inputStyle}>
                        <option value="">Select a subject</option>
                        <option value="Custom Manufacturing">Custom Manufacturing</option>
                        <option value="In-Stock Order">In-Stock Order</option>
                        <option value="Sample Request">Sample Request</option>
                        <option value="Tech Pack Enquiry">Tech Pack Enquiry</option>
                        <option value="Partnership">Partnership</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                      <label style={labelStyle}>Your Message *</label>
                      <textarea name="message" rows={5} required
                        placeholder="Tell us about your project requirements, estimated quantities, product types, and timeline..."
                        style={{ ...inputStyle, resize: 'vertical' as const, minHeight: 120 }}
                      />
                    </div>

                    <button type="submit" disabled={loading}
                      style={{ width: '100%', padding: '14px', borderRadius: 50, background: loading ? 'rgba(255,71,87,0.5)' : 'linear-gradient(135deg,#ff4757,#ff6b6b)', color: '#fff', fontWeight: 700, fontSize: '0.95rem', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', boxShadow: '0 8px 24px rgba(255,71,87,0.25)' }}>
                      {loading ? 'Sending...' : <><span>Send Message</span><i className="fas fa-paper-plane" /></>}
                    </button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  )
}

const rowStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'flex-start', gap: '1rem',
  paddingBottom: '1.25rem', marginBottom: '1.25rem',
  borderBottom: '1px solid rgba(0,0,0,0.08)',
}
const iconBox: React.CSSProperties = {
  width: 42, height: 42, borderRadius: 10, flexShrink: 0,
  background: 'rgba(255,71,87,0.08)', border: '1px solid rgba(255,71,87,0.15)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
}
const rowLabel: React.CSSProperties = { fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.25rem', color: '#111' }
const formRow: React.CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.1rem' }
const labelStyle: React.CSSProperties = { display: 'block', fontSize: '0.82rem', color: '#666', marginBottom: '0.4rem' }
const inputStyle: React.CSSProperties = {
  width: '100%', padding: '11px 14px', borderRadius: 10,
  background: '#f7f7f7', border: '1px solid rgba(0,0,0,0.1)',
  color: '#111', fontSize: '0.875rem', outline: 'none',
}

function Field({ label, name, type = 'text', placeholder = '', required = false }: any) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input type={type} name={name} placeholder={placeholder} required={required} style={inputStyle} />
    </div>
  )
}
