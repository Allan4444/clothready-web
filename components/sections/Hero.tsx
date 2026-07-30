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

        <h1 className="text-4xl md:text-6xl font-extrabold uppercase leading-tight tracking-tight animate-fade-up">
          Premium Activewear &amp; Streetwear<br />
          <span className="bg-gradient-primary bg-clip-text text-transparent">Manufacturer For Emerging Brands</span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-white font-semibold">
          Low MOQ Starting From 50pcs
        </p>
        <p className="mt-2 text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
          Helping Fitness &amp; Streetwear Brands Launch Faster
        </p>
        <p className="mt-3 text-sm text-white/60 max-w-2xl mx-auto">
          Located in Dongguan, China&apos;s largest apparel manufacturing hub
        </p>

        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Link href="/contact" className="btn btn-white">
            Get Quote <i className="fas fa-arrow-right" />
          </Link>
          <Link href="/products/custom" className="btn btn-outline">
            <i className="fas fa-th-large" /> View Products
          </Link>
        </div>
      </div>
    </section>
  )
}
