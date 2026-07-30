export interface FAQItem {
  q: string
  a: string
}

export const ALL_FAQS: FAQItem[] = [
  {
    q: 'Are you a manufacturer or a trading company?',
    a: 'ClothReady is a professional apparel manufacturer based in Dongguan, China. We specialize in custom activewear, fitness apparel, streetwear, and private label clothing production. From fabric sourcing and pattern development to sampling, production, quality inspection, and shipping coordination, we provide a complete OEM/ODM manufacturing service.',
  },
  {
    q: 'What types of clothing can you manufacture?',
    a: 'We manufacture a wide range of custom apparel, including:\n• Activewear sets\n• Gym wear\n• Yoga wear\n• Sports bras\n• Leggings\n• Compression wear\n• T-shirts\n• Hoodies\n• Sweatshirts\n• Joggers\n• Streetwear collections\n\nIf you have a design idea, reference product, or tech pack, our team can help turn it into a finished garment.',
  },
  {
    q: 'What is your minimum order quantity (MOQ)?',
    a: 'Our standard MOQ starts from 50 pieces per style, making ClothReady suitable for new clothing brands, startup businesses, fitness influencers, small retailers, and growing fashion companies. MOQ may vary depending on fabric, customization requirements, and production complexity.',
  },
  {
    q: 'Can you help new brands create their first collection?',
    a: 'Yes. We work with many emerging brands that need support from concept to production. Our team can help with fabric selection, product development, pattern adjustment, size grading, label design, packaging solutions, and production planning. You do not need to be an apparel expert to start your brand.',
  },
  {
    q: 'Do you offer OEM and private label services?',
    a: 'Yes. We provide full OEM/private label solutions, including custom designs, custom colors, custom fabrics, private labels, hang tags, packaging, and custom logos. Your brand identity remains unique throughout the production process.',
  },
  {
    q: 'I only have a design idea. Can you help develop the product?',
    a: 'Yes. You can send us sketches, reference images, existing samples, tech packs, or product links. Our development team can help analyze construction, materials, production feasibility, and estimated cost, then recommend the best manufacturing solution.',
  },
  {
    q: 'Can you produce from my tech pack?',
    a: 'Yes. If you provide a complete tech pack, we can follow your specifications for measurements, fabric requirements, stitching details, artwork placement, labels, and packaging. If your tech pack needs improvement, our team can also provide production suggestions.',
  },
  {
    q: 'Can you make samples before bulk production?',
    a: 'Yes. Before mass production, we create samples for approval. The sample process allows you to confirm fabric quality, fit, color, logo placement, and construction details. Bulk production starts only after sample approval.',
  },
  {
    q: 'How long does sample development take?',
    a: 'Normally, samples take around 7–15 working days, depending on product complexity, fabric availability, custom requirements, and number of revisions. Complex designs may require additional development time.',
  },
  {
    q: 'How long does production take?',
    a: 'Our typical production timeline is 20–35 days after sample approval. The exact timeline depends on order quantity, product category, fabric availability, and customization requirements. We always provide a production schedule before starting your order.',
  },
  {
    q: 'What fabrics can you provide?',
    a: 'We work with various apparel fabrics, including:\n\nActivewear fabrics: Nylon Spandex, Polyester Spandex, compression fabrics, moisture-wicking materials, breathable performance fabrics.\n\nStreetwear fabrics: Cotton, cotton fleece, French terry, heavyweight jersey.\n\nOur team can recommend fabrics based on target market, product function, price range, and brand positioning.',
  },
  {
    q: 'What customization options do you offer?',
    a: 'Logo customization: screen printing, heat transfer, embroidery, silicone logo, woven labels.\n\nProduct customization: custom colors, custom patterns, custom cuts, custom stitching, custom packaging.',
  },
  {
    q: 'How do you control product quality?',
    a: 'Quality control is performed throughout production. Our QC process includes: (1) fabric inspection, (2) cutting inspection, (3) sewing inspection, (4) measurement checking, (5) logo/application checking, (6) final product inspection, and (7) packing inspection. We focus on consistent quality from the first sample to bulk production.',
  },
  {
    q: 'Can you provide product photos or samples?',
    a: 'Yes. We can provide product photos, sample photos, fabric information, and development updates. For customized projects, we recommend creating a physical sample before bulk production.',
  },
  {
    q: 'Do you ship internationally?',
    a: 'Yes. We work with customers worldwide and can assist with shipping solutions including express shipping, air freight, and sea freight. Shipping options depend on destination country, order volume, and required delivery time.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We normally accept bank transfer (T/T) and other secure payment methods depending on order requirements. Payment terms will be confirmed before production begins.',
  },
  {
    q: 'How do I get a quotation?',
    a: 'Simply send us: (1) product type, (2) quantity, (3) design images or tech pack, (4) fabric requirements, and (5) destination country. Our team will review your project and provide feedback and pricing.',
  },
  {
    q: 'Why should I choose ClothReady instead of another supplier?',
    a: 'ClothReady focuses on helping brands grow, not only producing garments. Our advantages: low MOQ starting from 50pcs, an experienced manufacturing team, complete OEM service, flexible customization, quality-focused production, and support for startup brands. We aim to become your long-term production partner.',
  },
  {
    q: 'Can you sign an NDA to protect my designs?',
    a: 'Yes. We understand that your designs and product ideas are valuable. For confidential projects, we can discuss NDA agreements before sharing sensitive product information.',
  },
  {
    q: 'Do you work with small businesses or only large brands?',
    a: 'We work with both. Many of our customers are new fashion startups, online clothing brands, fitness companies, boutique retailers, and established apparel businesses. Our low MOQ model allows smaller brands to test products before scaling.',
  },
]

// Curated 8-question subset for the homepage preview — highest-intent
// questions buyers ask before ever reaching the contact form.
export const HOMEPAGE_FAQ_INDEXES = [2, 0, 1, 4, 8, 9, 12, 16]
export const HOMEPAGE_FAQS: FAQItem[] = HOMEPAGE_FAQ_INDEXES.map((i) => ALL_FAQS[i])

export function getFaqByQuestion(q: string): FAQItem | undefined {
  return ALL_FAQS.find((f) => f.q === q)
}
