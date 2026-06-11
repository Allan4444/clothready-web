import Reveal from '@/components/ui/Reveal'

const ITEMS = [
  { icon: 'fa-shield-alt', title: '100% Quality Guarantee', desc: 'Premium materials & craftsmanship' },
  { icon: 'fa-check-circle', title: 'On-Time Delivery', desc: '7-day production guarantee' },
  { icon: 'fa-award', title: 'Sample Approval', desc: 'Free revisions until perfect' },
  { icon: 'fa-chart-line', title: 'Success Support', desc: 'Brand building guidance included' },
]

export default function Guarantees() {
  return (
    <section className="section">
      <div className="container-1200">
        <Reveal>
          <div className="text-center mb-12">
            <div className="section-label"><i className="fas fa-shield-alt" /> Our Promise</div>
            <h2 className="section-title">Our Ironclad Guarantees</h2>
            <p className="section-subtitle mx-auto">Your success is our success. We stand behind every order.</p>
          </div>
        </Reveal>

        <Reveal>
          <div className="grid-4">
            {ITEMS.map((item) => (
              <div key={item.title} className="card text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className={`fas ${item.icon} text-dark text-xl`} />
                </div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-custom">{item.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
