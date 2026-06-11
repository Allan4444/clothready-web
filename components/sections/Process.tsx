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
          <div className="text-center mb-12">
            <div className="section-label"><i className="fas fa-cogs" /> Our Process</div>
            <h2 className="section-title">How We Work Together</h2>
            <p className="section-subtitle mx-auto">
              Our proven <strong className="text-white">6-step process</strong> from concept to your customers
            </p>
          </div>
        </Reveal>

        <div className="relative max-w-[1200px] mx-auto">
          {/* center vertical line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />

          {STEPS.map((s, i) => (
            <Reveal key={s.n}>
              <div className={`relative mb-12 md:flex ${i % 2 === 0 ? 'md:justify-start md:pr-[55%]' : 'md:justify-end md:pl-[55%]'}`}>
                {/* center dot */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-8 w-14 h-14 bg-white rounded-full items-center justify-center z-10">
                  <i className="fas fa-circle text-dark text-sm" />
                </div>

                <div className="card max-w-full md:max-w-[520px]">
                  <div className="text-5xl font-extrabold text-primary/30 mb-2">{s.n}</div>
                  <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                  <p className="text-gray-custom mb-3">{s.desc}</p>
                  <div className="inline-flex items-center gap-2 bg-primary/15 px-3 py-1.5 rounded-full text-xs mb-3">
                    <i className="fas fa-stopwatch text-primary" /> {s.time}
                  </div>
                  <ul className="space-y-1 text-sm text-gray-custom pl-5 list-disc">
                    {s.items.map((it) => <li key={it}>{it}</li>)}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}

          <div className="text-center mt-8">
            <div className="inline-block bg-white text-dark px-10 py-6 rounded-2xl">
              <div className="text-xs font-bold uppercase tracking-widest mb-1">Total Timeline</div>
              <div className="text-4xl font-extrabold">20-35 Days</div>
              <div className="text-sm text-gray-500">From First Call to Delivery</div>
            </div>
            <p className="mt-4 text-gray-custom">
              <i className="fas fa-bolt text-warning" /> <strong className="text-white">Rush orders available:</strong> Contact us for urgent projects
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
