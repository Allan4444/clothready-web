import type { Metadata } from 'next'
import { getSeoLandingPageBySlug } from '@/lib/seoLandingPages'
import CategoryLandingPage from '@/components/seo/CategoryLandingPage'

const cat = getSeoLandingPageBySlug('custom-hoodie-manufacturer')!

export const metadata: Metadata = {
  title: cat.metaTitle,
  description: cat.metaDesc,
  alternates: { canonical: 'https://clothready.com/custom-hoodie-manufacturer' },
}

export default function Page() {
  return <CategoryLandingPage cat={cat} breadcrumbHref="/" breadcrumbLabel="Home" />
}
