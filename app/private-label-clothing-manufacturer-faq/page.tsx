import type { Metadata } from 'next'
import { getFaqLandingPageBySlug } from '@/lib/faqLandingPages'
import FaqLandingPageView from '@/components/seo/FaqLandingPage'

const page = getFaqLandingPageBySlug('private-label-clothing-manufacturer-faq')!

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDesc,
  alternates: { canonical: 'https://clothready.com/private-label-clothing-manufacturer-faq' },
}

export default function Page() {
  return <FaqLandingPageView page={page} />
}
