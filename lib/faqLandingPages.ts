import { ALL_FAQS, FAQItem } from './faqs'

function pick(indexes: number[]): FAQItem[] {
  return indexes.map((i) => ALL_FAQS[i])
}

export interface FaqLandingPage {
  slug: string
  metaTitle: string
  metaDesc: string
  h1: string
  intro: string
  faqs: FAQItem[]
}

export const FAQ_LANDING_PAGES: FaqLandingPage[] = [
  {
    slug: 'custom-activewear-manufacturer-faq',
    metaTitle: 'Custom Activewear Manufacturer FAQ | MOQ, Fabrics, Lead Time',
    metaDesc: 'Answers to the most common questions brands ask a custom activewear manufacturer — MOQ, fabrics, sampling, production time, and quality control.',
    h1: 'Custom Activewear Manufacturer — FAQ',
    intro: "If you're sourcing custom activewear — leggings, sports bras, gym sets, compression wear — from a China-based factory for the first time, these are the questions that come up most. For our full FAQ covering every product category, see the main FAQ page.",
    faqs: [
      ...pick([2, 1, 10, 11, 8, 9, 12, 4, 14, 16]),
      {
        q: 'Do you offer performance testing on activewear fabrics?',
        a: 'Yes. For orders using compression or moisture-wicking fabrics, we can arrange stretch recovery, pilling, and colorfastness testing before bulk production, and share lab reports on request.',
      },
    ],
  },
  {
    slug: 'private-label-clothing-manufacturer-faq',
    metaTitle: 'Private Label Clothing Manufacturer FAQ | Branding, MOQ, NDA',
    metaDesc: 'Everything brands ask before starting a private label clothing line — custom labels, packaging, MOQ, NDA protection, and how to get a quote.',
    h1: 'Private Label Clothing Manufacturer — FAQ',
    intro: "Private label manufacturing means every piece ships under your brand — not ours. These are the questions we hear most from founders building their first private label collection. For our full FAQ, see the main FAQ page.",
    faqs: [
      ...pick([4, 3, 6, 11, 18, 15, 17, 16, 19, 2]),
      {
        q: 'Do you offer packaging design help, or just apply my existing artwork?',
        a: "Both. If you already have label and packaging artwork, we apply it directly to production. If you don't, our team can suggest layouts and packaging formats commonly used by activewear and streetwear brands, which you then approve before we produce."
      },
    ],
  },
]

export function getFaqLandingPageBySlug(slug: string): FaqLandingPage | undefined {
  return FAQ_LANDING_PAGES.find((p) => p.slug === slug)
}
