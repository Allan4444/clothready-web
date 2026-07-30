import type { Metadata } from 'next'
import { getSeoLandingPageBySlug } from '@/lib/seoLandingPages'
import CategoryLandingPage from '@/components/seo/CategoryLandingPage'

const cat = getSeoLandingPageBySlug('low-moq-clothing-factory')!

export const metadata: Metadata = {
  title: cat.metaTitle,
  description: cat.metaDesc,
  alternates: { canonical: 'https://clothready.com/low-moq-clothing-factory' },
}

export default function Page() {
  return <CategoryLandingPage cat={cat} breadcrumbHref="/" breadcrumbLabel="Home" />
}
