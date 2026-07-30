import type { Metadata } from 'next'
import { getSeoLandingPageBySlug } from '@/lib/seoLandingPages'
import CategoryLandingPage from '@/components/seo/CategoryLandingPage'

const cat = getSeoLandingPageBySlug('activewear-manufacturer-china')!

export const metadata: Metadata = {
  title: cat.metaTitle,
  description: cat.metaDesc,
  alternates: { canonical: 'https://clothready.com/activewear-manufacturer-china' },
}

export default function Page() {
  return <CategoryLandingPage cat={cat} breadcrumbHref="/" breadcrumbLabel="Home" />
}
