import Link from 'next/link'
import Reveal from '@/components/ui/Reveal'

export default function CTA() {
  return (
    <section className="section bg-darker">
      <div className="container-1200 text-center">
        <Reveal>
          <h2 className="section-title">Ready to Start?</h2>
          <p className="text-lg text-gray-custom mb-8 max-w-2xl mx-auto">
            Working with multiple Europe/USA niche brands.{' '}
            <strong className="text-white">Many clients reorder monthly.</strong>
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/sample-order" className="btn btn-white">
              Get Instant Quote <i className="fas fa-arrow-right" />
            </Link>
            <Link href="/contact" className="btn btn-outline">
              <i className="fas fa-download" /> Free Resources
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
