import { MetadataRoute } from 'next'
import { CATEGORIES } from '@/lib/categories'
import { SEO_LANDING_PAGES } from '@/lib/seoLandingPages'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.clothready.com'

  const staticPages = ['', '/about', '/products', '/contact', '/sample-order', '/tracking', '/tech-pack', '/faq', '/privacy']
  const categoryPages = CATEGORIES.map((c) => `/products/${c.slug}`)
  const seoPages = SEO_LANDING_PAGES.map((c) => `/${c.slug}`)

  const pages = [...staticPages, ...categoryPages, ...seoPages]

  return pages.map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: p === '' ? 1.0 : 0.8,
  }))
}
