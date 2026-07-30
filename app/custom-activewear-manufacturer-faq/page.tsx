import type { Metadata } from 'next'
import { getFaqLandingPageBySlug } from '@/lib/faqLandingPages'
import FaqLandingPageView from '@/components/seo/FaqLandingPage'

const page = getFaqLandingPageBySlug('custom-activewear-manufacturer-faq')!

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDesc,
  alternates: { canonical: 'https://clothready.com/custom-activewear-manufacturer-faq' },
}

export default function Page() {
  return <FaqLandingPageView page={page} />
}
