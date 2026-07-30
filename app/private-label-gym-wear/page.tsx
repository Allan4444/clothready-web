import type { Metadata } from 'next'
import { getSeoLandingPageBySlug } from '@/lib/seoLandingPages'
import CategoryLandingPage from '@/components/seo/CategoryLandingPage'

const cat = getSeoLandingPageBySlug('private-label-gym-wear')!

export const metadata: Metadata = {
  title: cat.metaTitle,
  description: cat.metaDesc,
  alternates: { canonical: 'https://clothready.com/private-label-gym-wear' },
}

export default function Page() {
  return <CategoryLandingPage cat={cat} breadcrumbHref="/" breadcrumbLabel="Home" />
}
