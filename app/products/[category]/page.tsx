import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { CATEGORIES, getCategoryBySlug } from '@/lib/categories'
import CategoryLandingPage from '@/components/seo/CategoryLandingPage'

type Props = { params: { category: string } }

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cat = getCategoryBySlug(params.category)
  if (!cat) return { title: 'Not Found' }
  return {
    title: cat.metaTitle,
    description: cat.metaDesc,
    alternates: { canonical: `https://clothready.com/products/${cat.slug}` },
  }
}

export default function CategoryPage({ params }: Props) {
  const cat = getCategoryBySlug(params.category)
  if (!cat) notFound()

  return <CategoryLandingPage cat={cat} breadcrumbHref="/products" breadcrumbLabel="Products" />
}
