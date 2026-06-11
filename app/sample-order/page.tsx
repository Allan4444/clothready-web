'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import Reveal from '@/components/ui/Reveal'
import { samplesApi } from '@/lib/api'

export default function SampleOrderPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ order_no: string } | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const fd = new FormData(e.currentTarget)
    const data = {
      contact_name: String(fd.get('contact_name') || ''),
      company: String(fd.get('company') || ''),
      email: String(fd.get('email') || ''),
      country: String(fd.get('country') || ''),
      garment_type: String(fd.get('garment_type') || ''),
      fabric: String(fd.get('fabric') || ''),
      sample_qty: parseInt(String(fd.get('sample_qty') || '1')),
      bulk_qty: String(fd.get('bulk_qty') || ''),
      requirements: String(fd.get('requirements') || ''),
      courier: String(fd.get('courier') || 'DHL'),
    }

    try {
      const res = await samplesApi.create(data)
      setResult({ order_no: res.order_no })
      toast.success(`Sample order ${res.order_no} created!`)
    } catch (err: any) {
      toast.error(err.message || 'Submission failed')
    } finally {
      setLoading(false)
    }
  }

  if (result) {
    return (
      <section className="section pt-32 min-h-[60vh]">
        <div className="container-1200">
          <div className="card max-w-2xl mx-auto text-center py-16">
            <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-check text-success text-3xl" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Order Submitted!</h1>
            <p className="text-gray-custom mb-2">Your sample order number is:</p>
            <div className="text-3xl font-mono font-bold text-primary mb-6">{result.order_no}</div>
            <p className="text-sm text-gray-custom mb-6">
              Save this number to track your order. We&apos;ll send a confirmation email shortly.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <a href={`/tracking?order=${result.order_no}`} className="btn btn-primary">
                Track Order <i className="fas fa-arrow-right" />
              </a>
              <button onClick={() => setResult(null)} className="btn btn-outline">
                Submit Another
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="section pt-32">
        <div className="container-1200 text-center">
          <Reveal>
            <div className="section-label"><i className="fas fa-vial" /> Sample Order</div>
            <h1 className="section-title">Order a Sample</h1>
            <p className="section-subtitle mx-auto">
              Quote within 48 hours · Sample cost credited to bulk order
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-1200">
          <div className="card max-w-3xl mx-auto">
            <form onSubmit={onSubmit} className="space-y-6">
              {/* Contact */}
              <div>
                <h3 className="text-xs uppercase tracking-widest text-primary mb-4">Contact Info</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="Contact Name *" name="contact_name" required />
                  <Field label="Company *" name="company" required />
                  <Field label="Email *" name="email" type="email" required />
                  <Field label="Country *" name="country" required />
                </div>
              </div>

              {/* Product */}
              <div>
                <h3 className="text-xs uppercase tracking-widest text-primary mb-4 pt-4 border-t border-white/10">
                  Product Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select label="Garment Type *" name="garment_type" required
                    options={['T-Shirt', 'Hoodie', 'Leggings', 'Sports Bra', 'Joggers', 'Tank Top', 'Jacket', 'Custom']} />
                  <Select label="Fabric Preference" name="fabric"
                    options={['100% Cotton', 'Cotton Blend', 'Polyester', 'Nylon/Spandex', 'French Terry', 'Fleece', 'To advise']} />
                  <Field label="Sample Quantity" name="sample_qty" type="number" defaultValue="1" />
                  <Select label="Expected Bulk Qty" name="bulk_qty"
                    options={['50-300', '300-1000', '1000-5000', '5000+']} />
                </div>
                <div className="mt-4">
                  <label className="block text-xs uppercase tracking-wider text-gray-custom mb-2">
                    Special Requirements
                  </label>
                  <textarea
                    name="requirements"
                    rows={4}
                    placeholder="Colors, sizes, branding, prints, embroidery..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-custom focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Shipping */}
              <div>
                <h3 className="text-xs uppercase tracking-widest text-primary mb-4 pt-4 border-t border-white/10">
                  Shipping
                </h3>
                <Select label="Preferred Courier" name="courier"
                  options={['DHL', 'FedEx', 'UPS', 'TNT', 'EMS']} />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full justify-center text-base py-4 disabled:opacity-60"
              >
                {loading ? 'Submitting...' : (<>Submit Sample Order <i className="fas fa-arrow-right" /></>)}
              </button>
              <p className="text-xs text-gray-custom text-center">
                Sample cost (USD 50–200) credited toward bulk order. We confirm within 48 hours.
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

function Field({ label, name, type = 'text', required = false, defaultValue }: any) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-wider text-gray-custom mb-2">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        defaultValue={defaultValue}
        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-custom focus:outline-none focus:border-primary"
      />
    </div>
  )
}

function Select({ label, name, options, required = false }: any) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-wider text-gray-custom mb-2">{label}</label>
      <select
        name={name}
        required={required}
        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary"
      >
        <option value="">Select...</option>
        {options.map((o: string) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  )
}
