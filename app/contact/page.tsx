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
      first_name: String(fd.get('first_name') || ''),
      last_name: String(fd.get('last_name') || ''),
      company: String(fd.get('company') || ''),
      email: String(fd.get('email') || ''),
      phone: String(fd.get('phone') || ''),
      country: String(fd.get('country') || ''),
      product_category: String(fd.get('product_category') || ''),
      quantity_range: String(fd.get('quantity_range') || ''),
      message: String(fd.get('message') || ''),
    }

    try {
      await enquiriesApi.create(data)
      setSubmitted(true)
      toast.success('Enquiry sent! We\'ll reply within 24 hours.')
      ;(e.target as HTMLFormElement).reset()
    } catch (err: any) {
      toast.error(err.message || 'Failed to send. Please try again.')
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Info column */}
            <Reveal>
              <div className="card">
                <h3 className="font-bold mb-4 text-lg">Get in Touch</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <div className="text-xs text-gray-custom uppercase tracking-wider mb-1">Email</div>
                    <a href="mailto:info@clothready.com" className="text-white hover:text-primary">
                      info@clothready.com
                    </a>
                  </div>
                  <div>
                    <div className="text-xs text-gray-custom uppercase tracking-wider mb-1">WhatsApp / WeChat</div>
                    <span className="text-white">+86 134-1204-4008</span>
                  </div>
                  <div>
                    <div className="text-xs text-gray-custom uppercase tracking-wider mb-1">Response Time</div>
                    <span className="text-primary font-bold">&lt; 24 Hours</span>
                  </div>
                  <div>
                    <div className="text-xs text-gray-custom uppercase tracking-wider mb-1">Business Hours</div>
                    <span className="text-white">Mon–Sat 9:00–18:00 CST</span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Form */}
            <Reveal className="md:col-span-2">
              <div className="card">
                {submitted ? (
                  <div className="py-12 text-center">
                    <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="fas fa-check text-success text-2xl" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                    <p className="text-gray-custom">
                      Your enquiry has been received. We&apos;ll reply within 24 hours.
                    </p>
                    <button onClick={() => setSubmitted(false)} className="btn btn-outline mt-6 text-sm">
                      Send Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField label="First Name *" name="first_name" required />
                      <FormField label="Last Name" name="last_name" />
                    </div>
                    <FormField label="Company *" name="company" required />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField label="Email *" name="email" type="email" required />
                      <FormField label="Phone" name="phone" type="tel" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField label="Country" name="country" />
                      <FormSelect
                        label="Quantity Range"
                        name="quantity_range"
                        options={['50-300', '300-1000', '1000-5000', '5000+']}
                      />
                    </div>
                    <FormSelect
                      label="Product Category"
                      name="product_category"
                      options={['Fitness Wear', 'Streetwear', 'Casual', 'Custom OEM']}
                    />
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-gray-custom mb-2">
                        Message
                      </label>
                      <textarea
                        name="message"
                        rows={4}
                        placeholder="Tell us about your project..."
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-custom focus:outline-none focus:border-primary"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn btn-primary w-full justify-center disabled:opacity-60"
                    >
                      {loading ? 'Sending...' : (<>Send Enquiry <i className="fas fa-arrow-right" /></>)}
                    </button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}

function FormField({ label, name, type = 'text', required = false }: any) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-wider text-gray-custom mb-2">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-custom focus:outline-none focus:border-primary"
      />
    </div>
  )
}

function FormSelect({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-wider text-gray-custom mb-2">{label}</label>
      <select
        name={name}
        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary"
      >
        <option value="">Select...</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  )
}
