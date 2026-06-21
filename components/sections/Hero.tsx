import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-12">
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80"
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      >
        <source
          src="https://assets.mixkit.co/videos/preview/mixkit-woman-doing-squats-with-a-barbell-40711-large.mp4"
          type="video/mp4"
        />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />

      <div className="container-1200 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-xs font-bold uppercase tracking-widest text-primary mb-6 animate-fade-up">
          <i className="fas fa-fire" /> OEM · ODM · Private Label
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold uppercase leading-tight tracking-tight animate-fade-up">
          Fitness &amp; Leisure<br />
          Wear Factory<br />
          <span className="bg-gradient-primary bg-clip-text text-transparent">Since 2010</span>
        </h1>

        <p className="mt-6 text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
          MOQ 50 pieces &nbsp;•&nbsp; Tech pack support included<br />
          Direct to factory owner · Dongguan, China
        </p>

        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Link href="/sample-order" className="btn btn-white">
            Start Sample Order <i className="fas fa-arrow-right" />
          </Link>
          <Link href="/products/custom" className="btn btn-outline">
            <i className="fas fa-th-large" /> View Products
          </Link>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-8 md:gap-12">
          {[
            { icon: '🏭', n: '15+', l: 'Years Experience' },
            { icon: '📐', n: '50pcs', l: 'Minimum Order' },
            { icon: '⚡', n: '20–35d', l: 'Lead Time' },
            { icon: '✅', n: '100%', l: 'QC Inspected' },
          ].map((s, i) => (
            <div key={i} className="text-center min-w-[120px]">
              <div className="text-3xl mb-1">{s.icon}</div>
              <div className="text-xl md:text-2xl font-extrabold text-primary">{s.n}</div>
              <div className="text-xs text-gray-custom mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
