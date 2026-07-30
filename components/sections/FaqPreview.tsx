import Link from 'next/link'
import Reveal from '@/components/ui/Reveal'
import { HOMEPAGE_FAQS, HOMEPAGE_FAQ_SUMMARIES } from '@/lib/faqs'
import FaqJsonLd from '@/components/seo/FaqJsonLd'

export default function FaqPreview() {
  return (
    <section className="section">
      <FaqJsonLd items={HOMEPAGE_FAQS} />
      <div className="container-1200">
        <Reveal>
          <div className="text-center mb-12">
            <div className="section-label"><i className="fas fa-circle-question" /> FAQ</div>
            <h2 className="section-title">Common Questions From New Clients</h2>
            <p className="section-subtitle mx-auto">
              The questions we hear most before a brand places their first order
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="grid-2" style={{ maxWidth: 900, margin: '0 auto' }}>
            {HOMEPAGE_FAQS.map((item, i) => (
              <div key={item.q} className="card">
                <h3 className="font-bold mb-2" style={{ fontSize: '0.95rem' }}>{item.q}</h3>
                <p className="text-gray-custom text-sm" style={{ lineHeight: 1.7 }}>
                  {HOMEPAGE_FAQ_SUMMARIES[i]}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="text-center mt-10">
          <Link href="/faq" className="btn btn-outline">
            View All FAQs <i className="fas fa-arrow-right" />
          </Link>
        </div>
      </div>
    </section>
  )
}
