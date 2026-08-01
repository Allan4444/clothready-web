import Reveal from '@/components/ui/Reveal'

const STEPS = [
  { n: '01', title: 'Initial Consultation', desc: 'Share your vision, designs, and requirements with us', time: '1-2 days', items: ['Free consultation call/video chat', 'Discuss designs, fabrics, quantities', 'Get rough price estimate', 'Understand your brand goals'] },
  { n: '02', title: 'Sample Development', desc: 'We create samples based on your specifications', time: '5-7 days', items: ['Tech pack review & optimization', 'Fabric selection & sourcing', 'First sample production', 'Fit adjustments & revisions'] },
  { n: '03', title: 'Sample Approval', desc: 'You review and approve the final sample', time: '2-3 days', items: ['Sample shipped to you for review', 'Free revisions until satisfied', 'Final spec sheet confirmation', 'Production quote finalized'] },
  { n: '04', title: 'Mass Production', desc: 'Fast production with quality control at every step', time: '7-15 days', items: ['Fabric cutting & preparation', 'Sewing & assembly', 'Quality inspection (3 checkpoints)', 'Printing/embroidery/labels'] },
  { n: '05', title: 'Quality Control & Packaging', desc: 'Final inspection and professional packaging', time: '2-3 days', items: ['100% final quality check', 'Professional folding & bagging', 'Custom labels & hang tags', 'Box packing for shipping'] },
  { n: '06', title: 'Shipping & Delivery', desc: 'Safe delivery to your warehouse or fulfillment center', time: '3-7 days (express) / 20-30 days (sea)', items: ['Express air freight (DHL/FedEx)', 'Or economical sea shipping', 'Full tracking & updates', 'Customs clearance support'] },
]

export default function Process() {
  return (
    <section className="section">
      <div className="container-1200">
        <Reveal>
          <div className="text-center mb-10">
            <div className="section-label"><i className="fas fa-cogs" /> Our Process</div>
            <h2 className="section-title">How We Work Together</h2>
            <p className="section-subtitle mx-auto">
              Our proven <strong style={{ color: '#111' }}>6-step process</strong> from concept to your customers
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {STEPS.map((s) => (
            <Reveal key={s.n}>
              <div className="card h-full">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary text-xs font-extrabold">{s.n}</span>
                  </div>
                  <h3 className="text-base font-bold leading-tight">{s.title}</h3>
                </div>
                <p className="text-gray-custom text-sm mb-2">{s.desc}</p>
                <div className="inline-flex items-center gap-1.5 bg-primary/15 px-2.5 py-1 rounded-full text-[0.7rem] mb-2.5">
                  <i className="fas fa-stopwatch text-primary" /> {s.time}
                </div>
                <ul className="space-y-0.5 text-xs text-gray-custom pl-4 list-disc">
                  {s.items.map((it) => <li key={it}>{it}</li>)}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="text-center mt-8">
          <div className="inline-block bg-dark text-white px-10 py-5 rounded-2xl">
            <div className="text-xs font-bold uppercase tracking-widest mb-1">Total Timeline</div>
            <div className="text-3xl font-extrabold">20-35 Days</div>
            <div className="text-sm text-gray-500">From First Call to Delivery</div>
          </div>
          <p className="mt-4 text-gray-custom">
            <i className="fas fa-bolt text-warning" /> <strong style={{ color: '#111' }}>Rush orders available:</strong> Contact us for urgent projects
          </p>
        </div>
      </div>
    </section>
  )
}
