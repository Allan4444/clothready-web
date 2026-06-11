import Reveal from '@/components/ui/Reveal'

export const metadata = {
  title: 'About — Premium Fitness & Streetwear Manufacturer',
  description: 'Learn about ClothReady — 20+ years specialized experience manufacturing premium fitness wear and streetwear for European and American brands.',
}

const FEATURES = [
  { icon: 'fa-handshake', title: 'Direct Factory Access', desc: 'No middlemen. You work directly with factory owners and production managers.' },
  { icon: 'fa-microscope', title: 'Rigorous Quality Control', desc: '7-point inspection process ensures every piece meets your standards.' },
  { icon: 'fa-rocket', title: 'Fast Turnaround', desc: '20-35 days from first call to delivery. Rush orders available.' },
  { icon: 'fa-users', title: 'Small Brand Friendly', desc: '50-piece MOQ means you can test the market without massive inventory risk.' },
]

export default function AboutPage() {
  return (
    <>
      <section className="section pt-32">
        <div className="container-1200 text-center">
          <Reveal>
            <div className="section-label"><i className="fas fa-info-circle" /> Our Story</div>
            <h1 className="section-title">About ClothReady</h1>
            <p className="section-subtitle mx-auto">
              20+ years specializing in fitness wear and streetwear for global brands
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-1200">
          <Reveal>
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-5">Why Choose ClothReady?</h2>
              <p className="text-lg text-gray-custom max-w-3xl mx-auto leading-relaxed mb-12">
                We&apos;re not just a factory — we&apos;re your strategic manufacturing partner. With over 15 years of
                specialized experience in fitness and leisure wear, we understand the unique challenges small and
                medium brands face.
              </p>
            </div>
          </Reveal>

          <div className="grid-4">
            {FEATURES.map((f) => (
              <Reveal key={f.title}>
                <div className="card text-center flex flex-col items-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-5">
                    <i className={`fas ${f.icon} text-dark text-xl`} />
                  </div>
                  <h4 className="font-bold mb-2 text-lg">{f.title}</h4>
                  <p className="text-sm text-gray-custom leading-relaxed">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-darker">
        <div className="container-1200">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">By the Numbers</h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { n: '20+', l: 'Years Experience' },
              { n: '500+', l: 'Brand Partners' },
              { n: '50-5000', l: 'Pieces per Order' },
              { n: '20-35 days', l: 'Average Lead Time' },
            ].map((s, i) => (
              <Reveal key={i}>
                <div className="card text-center">
                  <div className="text-3xl md:text-4xl font-extrabold text-primary mb-2">{s.n}</div>
                  <div className="text-xs text-gray-custom uppercase tracking-widest">{s.l}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
