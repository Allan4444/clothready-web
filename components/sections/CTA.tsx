import Link from 'next/link'
import Reveal from '@/components/ui/Reveal'

export default function CTA() {
  return (
    <section className="section bg-darker">
      <div className="container-1200 text-center">
        <Reveal>
          <h2 className="section-title">Ready to Build Your Brand?</h2>
          <p className="text-lg text-gray-custom mb-8 max-w-2xl mx-auto">
            From your first sketch to bulk shipment —&nbsp;
            <strong className="text-white">we handle the full OEM process.</strong>
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/sample-order" className="btn btn-white">
              Start Sample Order <i className="fas fa-arrow-right" />
            </Link>
            <Link href="/products/custom" className="btn btn-outline">
              <i className="fas fa-th-large" /> View Products
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
