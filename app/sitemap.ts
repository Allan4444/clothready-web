import { MetadataRoute } from 'next'
import { CATEGORIES } from '@/lib/categories'
import { SEO_LANDING_PAGES } from '@/lib/seoLandingPages'
import { FAQ_LANDING_PAGES } from '@/lib/faqLandingPages'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.clothready.com'

  const staticPages = ['', '/about', '/products', '/contact', '/sample-order', '/tracking', '/tech-pack', '/faq', '/privacy', '/fabric-library']
  const categoryPages = CATEGORIES.map((c) => `/products/${c.slug}`)
  const seoPages = SEO_LANDING_PAGES.map((c) => `/${c.slug}`)
  const faqPages = FAQ_LANDING_PAGES.map((p) => `/${p.slug}`)

  const pages = [...staticPages, ...categoryPages, ...seoPages, ...faqPages]

  return pages.map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: p === '' ? 1.0 : 0.8,
  }))
}
