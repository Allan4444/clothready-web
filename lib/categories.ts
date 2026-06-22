export interface CategoryProduct {
  id: string
  name: string
  img: string
  tag: string
}

export interface CategoryFAQ {
  q: string
  a: string
}

export interface Category {
  slug: string
  h1: string
  metaTitle: string
  metaDesc: string
  intro: string
  why: { title: string; desc: string }[]
  faqs: CategoryFAQ[]
  products: CategoryProduct[]
  relatedCategories: string[]
}

export const CATEGORIES: Category[] = [
  {
    slug: 'gym-wear-manufacturer',
    h1: 'Custom Gym Wear Manufacturer — MOQ 50 Pieces',
    metaTitle: 'Gym Wear Manufacturer China | Custom Gym Clothes MOQ 50 | ClothReady',
    metaDesc: 'ClothReady is a top gym wear manufacturer in China. Custom gym clothes, performance fabrics, MOQ 50pcs. Private label & OEM. Get a free sample.',
    intro: 'ClothReady is a leading gym wear manufacturer based in Dongguan, China, producing high-performance gym clothing for fitness brands worldwide. We specialize in custom compression shorts, gym tanks, training tees, and athletic sets — all with a low MOQ of 50 pieces per style. Whether you are launching a new fitness brand or scaling an existing line, our factory handles design-to-delivery with full quality control.',
    why: [
      { title: 'Performance Fabrics', desc: 'We source 4-way stretch nylon/spandex and moisture-wicking polyester blends designed specifically for high-intensity training.' },
      { title: 'Low MOQ — Start at 50 Pcs', desc: 'Test new gym wear styles without overcommitting. Our MOQ 50 policy helps emerging brands move fast and stay lean.' },
      { title: 'Full Custom Options', desc: 'Custom cuts, sublimation printing, silicone logos, waistband branding, and heat-transfer labels — total brand control.' },
      { title: 'Fast Sampling (7-10 Days)', desc: 'Receive physical samples before committing to bulk production, so you can verify fit, fabric, and finish before launch.' },
    ],
    faqs: [
      { q: 'What is the MOQ for custom gym wear?', a: 'Our minimum order quantity is 50 pieces per style per color. For new brands testing the market, we can discuss sample runs.' },
      { q: 'How long does gym wear production take?', a: 'Sample production takes 7-10 business days. Bulk orders typically ship in 25-35 business days depending on quantity and complexity.' },
      { q: 'What fabrics do you use for gym wear?', a: 'We primarily use 80% nylon/20% spandex and 88% polyester/12% spandex blends with moisture-wicking and 4-way stretch properties.' },
      { q: 'Can I add my brand logo to gym wear?', a: 'Yes. We offer embroidery, heat transfer, woven labels, silicone prints, and custom packaging — full private label service.' },
      { q: 'Do you produce gym wear for women and men?', a: "Yes. We produce men's and women's gym wear including leggings, shorts, sports bras, tanks, hoodies, and full athletic sets." },
    ],
    products: [
      { id: 'gym-compression-shorts', name: 'Compression Shorts', img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80', tag: 'MOQ 50' },
      { id: 'gym-training-tee', name: 'Performance Training Tee', img: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=80', tag: 'Custom Print' },
      { id: 'gym-tank-top', name: 'Muscle Tank Top', img: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=600&q=80', tag: 'OEM Ready' },
      { id: 'gym-full-set', name: 'Athletic Training Set', img: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=600&q=80', tag: 'New' },
    ],
    relatedCategories: ['yoga-pants-manufacturer', 'activewear-manufacturer', 'sports-bra-manufacturer'],
  },
  {
    slug: 'custom-hoodies-manufacturer',
    h1: 'Custom Hoodies Manufacturer — Private Label from MOQ 50',
    metaTitle: 'Custom Hoodies Manufacturer China | Private Label Hoodies MOQ 50 | ClothReady',
    metaDesc: 'ClothReady manufactures custom hoodies in China. Heavyweight fleece, embroidery, screen print, MOQ 50pcs. Ideal for streetwear and fitness brands.',
    intro: 'ClothReady is a custom hoodies manufacturer in Dongguan, China, producing premium hoodies for streetwear labels, fitness brands, and corporate merchandise. We offer heavyweight 380gsm fleece pullover hoodies, zip-up styles, cropped fits, and oversized silhouettes — all fully customizable with your branding. With MOQ starting at 50 pieces, we help growing brands launch private label hoodies without large upfront minimums.',
    why: [
      { title: 'Premium Fleece Options', desc: 'Choose from 280gsm to 420gsm cotton-fleece blends including French terry, brushed fleece, and heavyweight boxy styles.' },
      { title: 'Any Branding Method', desc: 'Embroidery, puff print, screen print, DTF, heat transfer — we match your brand aesthetic with the right technique.' },
      { title: 'Streetwear Sizing', desc: 'XS to 3XL with oversized boxy fits, dropped shoulders, and extended lengths available — built for modern streetwear aesthetics.' },
      { title: 'Rapid Sampling', desc: 'Pre-production samples ready in 7-10 days so you can review quality, fit, and logo placement before bulk production.' },
    ],
    faqs: [
      { q: 'What is the MOQ for custom hoodies?', a: 'MOQ is 50 pieces per style per color. Mix sizes within one style to reach MOQ.' },
      { q: 'Can I order oversized / boxy fit hoodies?', a: 'Yes. We offer oversized, cropped, and regular fits. Our pattern team can also develop custom fits from your tech packs.' },
      { q: 'What hoodie fabric weights do you offer?', a: 'We offer 280gsm, 320gsm, 360gsm, and 420gsm options. Our most popular is 380gsm brushed fleece for premium streetwear.' },
      { q: 'How do I add my logo to custom hoodies?', a: 'Common methods include embroidery (front chest, sleeve), screen print (chest, back), puff print, and woven label inside the hood.' },
      { q: 'Do you make zip-up as well as pullover hoodies?', a: 'Yes — we produce pullover, zip-up, half-zip, and cropped hoodies. All can be custom branded.' },
    ],
    products: [
      { id: 'heavyweight-pullover', name: 'Heavyweight Pullover Hoodie', img: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80', tag: '380gsm' },
      { id: 'zipup-hoodie', name: 'Zip-Up Hoodie', img: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80', tag: 'Custom' },
      { id: 'oversized-hoodie', name: 'Oversized Boxy Hoodie', img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80', tag: 'Streetwear' },
      { id: 'cropped-hoodie', name: 'Cropped Hoodie', img: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80', tag: 'MOQ 50' },
    ],
    relatedCategories: ['streetwear-manufacturer', 'custom-joggers', 'oversized-tshirt-manufacturer'],
  },
  {
    slug: 'yoga-pants-manufacturer',
    h1: 'Yoga Pants Manufacturer — Custom Leggings from MOQ 50',
    metaTitle: 'Yoga Pants Manufacturer China | Custom Leggings MOQ 50 | ClothReady',
    metaDesc: 'ClothReady manufactures custom yoga pants and leggings in China. Squat-proof, 4-way stretch, MOQ 50pcs. Private label yoga wear for your brand.',
    intro: 'ClothReady is a specialized yoga pants manufacturer in Dongguan, China, producing squat-proof, high-waisted leggings and yoga pants for activewear brands globally. Our yoga pants are made with 4-way stretch nylon-spandex fabrics that provide compression, breathability, and opacity — essential for the yoga and pilates market. Starting at MOQ 50 pieces, we make it accessible for small brands to launch quality private label yoga pants.',
    why: [
      { title: 'Squat-Proof Guaranteed', desc: 'We test all legging fabrics for opacity at full stretch. Our nylon-spandex blends are specifically chosen to eliminate sheerness.' },
      { title: 'High-Waist & Seamless Options', desc: 'Offer your customers high-waist compression waistbands, seamless construction, and flattering contouring panel designs.' },
      { title: 'Custom Waistband Printing', desc: 'Add your brand name, logo or pattern directly onto the waistband — a premium branding detail your customers will love.' },
      { title: 'Eco-Friendly Fabrics Available', desc: 'We offer REPREVE recycled nylon and GRS-certified recycled polyester options for sustainable yoga wear lines.' },
    ],
    faqs: [
      { q: 'What fabric do you use for yoga pants?', a: 'We primarily use 80% nylon/20% spandex and 72% nylon/28% spandex for yoga pants — soft, squat-proof, and highly stretchable.' },
      { q: 'Are your yoga pants squat-proof?', a: 'Yes. All our legging fabrics are tested for opacity at full stretch before bulk production approval.' },
      { q: 'Can I get custom prints on yoga pants?', a: 'Yes — sublimation printing allows full all-over custom designs on our yoga pants. Minimum order for print styles is 50 pieces.' },
      { q: 'What is the MOQ for custom yoga pants?', a: 'MOQ is 50 pieces per style per color. For sublimation prints, MOQ is 50 pieces per print design.' },
      { q: 'Do you offer eco-friendly yoga pants?', a: 'Yes. We offer yoga pants made from REPREVE recycled nylon for brands with sustainability commitments.' },
    ],
    products: [
      { id: 'highwaist-leggings', name: 'High-Waist Yoga Leggings', img: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80', tag: 'Squat-Proof' },
      { id: 'printed-leggings', name: 'Sublimation Print Leggings', img: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=600&q=80', tag: 'Custom Print' },
      { id: 'seamless-leggings', name: 'Seamless Yoga Pants', img: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=600&q=80', tag: 'Seamless' },
      { id: 'flare-leggings', name: 'Flare Yoga Pants', img: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=600&q=80', tag: 'New Style' },
    ],
    relatedCategories: ['gym-wear-manufacturer', 'sports-bra-manufacturer', 'activewear-manufacturer'],
  },
  {
    slug: 'activewear-manufacturer',
    h1: 'Activewear Manufacturer China — Full-Line Athletic Wear from MOQ 50',
    metaTitle: 'Activewear Manufacturer China | Custom Athletic Wear MOQ 50 | ClothReady',
    metaDesc: 'ClothReady is an activewear manufacturer in China producing custom athletic wear. Leggings, sports bras, shorts, sets — MOQ 50pcs, private label ready.',
    intro: 'ClothReady is a full-service activewear manufacturer based in Dongguan, China. We produce complete athletic wear collections including leggings, sports bras, shorts, training tees, and matching sets for brands targeting the fitness, yoga, and outdoor markets. Our factory handles every step from fabric sourcing and pattern making to cut-and-sew and final quality inspection — giving your brand a reliable activewear manufacturing partner with MOQ from 50 pieces.',
    why: [
      { title: 'Full Collection Manufacturing', desc: 'We can produce your entire activewear line — matching sets, individual pieces, and accessories — from one factory.' },
      { title: 'Technical Performance Fabrics', desc: 'Moisture-wicking, UPF 50+, anti-odor, and compression fabrics available. We source from certified fabric mills in China and Taiwan.' },
      { title: 'OEM & ODM Services', desc: 'Bring your own designs (OEM) or let our design team create styles for your brand brief (ODM). Both services available.' },
      { title: 'Reliable Quality Control', desc: '3-stage quality inspection: fabric inspection, in-line production checks, and final shipment inspection with AQL 2.5 standard.' },
    ],
    faqs: [
      { q: 'What types of activewear do you manufacture?', a: 'We manufacture leggings, sports bras, shorts, tank tops, training tees, hoodies, joggers, and full athletic sets.' },
      { q: 'What is the MOQ for activewear?', a: 'MOQ is 50 pieces per style per color. We can mix sizes within a style to reach MOQ.' },
      { q: 'Do you provide activewear design services?', a: 'Yes. Our ODM service includes trend-based design, pattern making, and sample development for brands without in-house designers.' },
      { q: 'Can I order activewear in custom colors?', a: 'Yes. We can dye to Pantone color matching for most fabrics. Custom colorways available from MOQ 50 pieces per color.' },
      { q: 'What certifications do your fabrics have?', a: 'Our fabrics carry OEKO-TEX Standard 100 certification. We also work with GRS-certified recycled fabric suppliers upon request.' },
    ],
    products: [
      { id: 'activewear-set', name: 'Matching Activewear Set', img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80', tag: 'Full Set' },
      { id: 'training-shorts', name: 'Training Shorts', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80', tag: 'MOQ 50' },
      { id: 'sports-tank', name: 'Sports Tank Top', img: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=600&q=80', tag: 'OEM Ready' },
      { id: 'windbreaker', name: 'Lightweight Windbreaker', img: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600&q=80', tag: 'Technical' },
    ],
    relatedCategories: ['gym-wear-manufacturer', 'yoga-pants-manufacturer', 'sports-bra-manufacturer'],
  },
  {
    slug: 'streetwear-manufacturer',
    h1: 'Streetwear Manufacturer China — Custom Streetwear from MOQ 50',
    metaTitle: 'Streetwear Manufacturer China | Custom Streetwear MOQ 50 | ClothReady',
    metaDesc: 'ClothReady manufactures custom streetwear in China. Hoodies, joggers, oversized tees, drop-shoulder — private label streetwear from MOQ 50pcs.',
    intro: 'ClothReady is a streetwear manufacturer in Dongguan, China, producing custom streetwear collections for emerging and established urban fashion brands. We specialize in heavyweight hoodies, oversized graphic tees, wide-leg joggers, and drop-shoulder sweatshirts — silhouettes built for the modern streetwear aesthetic. With MOQ starting at 50 pieces, we help streetwear brands produce limited drops and seasonal collections without heavy inventory risk.',
    why: [
      { title: 'Streetwear-Specific Fits', desc: 'Drop-shoulder, boxy oversized, and wide-leg silhouettes available. Our pattern team specializes in contemporary streetwear construction.' },
      { title: 'Premium Heavyweight Fabrics', desc: 'We use 320-420gsm fleece and 220-280gsm cotton jersey — the weight that gives streetwear its premium hand feel.' },
      { title: 'Graphic & Embroidery Expertise', desc: 'Complex multi-color screen prints, puff prints, discharge prints, embroidery patches — all handled in-house.' },
      { title: 'Limited Drop Friendly', desc: 'MOQ 50 per style means you can produce exclusive limited drops and maintain scarcity — a core streetwear strategy.' },
    ],
    faqs: [
      { q: 'What streetwear items do you manufacture?', a: 'We manufacture hoodies, sweatshirts, oversized tees, joggers, cargo pants, track jackets, and full co-ord sets.' },
      { q: 'Can you do complex graphic prints for streetwear?', a: 'Yes. We offer screen printing (up to 8 colors), DTF printing, discharge printing, and puff printing for streetwear graphics.' },
      { q: 'What is the MOQ for streetwear?', a: 'MOQ is 50 pieces per style per color. This applies to hoodies, tees, joggers, and all other streetwear categories.' },
      { q: 'Do you manufacture oversized streetwear fits?', a: 'Yes. Oversized, boxy, and drop-shoulder silhouettes are our specialty. Provide measurements or reference pieces for custom grading.' },
      { q: 'How long does streetwear production take?', a: 'Sampling takes 10-15 days. Bulk production typically takes 30-40 days from sample approval depending on complexity.' },
    ],
    products: [
      { id: 'oversized-sweatshirt', name: 'Oversized Crewneck Sweatshirt', img: 'https://images.unsplash.com/photo-1583744946564-b52d01a7b321?w=600&q=80', tag: '380gsm' },
      { id: 'wide-leg-jogger', name: 'Wide-Leg Jogger Pants', img: 'https://images.unsplash.com/photo-1542574271-7f3b92e6c821?w=600&q=80', tag: 'Streetwear' },
      { id: 'graphic-tee', name: 'Heavy Graphic Tee', img: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=600&q=80', tag: 'Screen Print' },
      { id: 'track-jacket', name: 'Track Jacket', img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80', tag: 'OEM Ready' },
    ],
    relatedCategories: ['custom-hoodies-manufacturer', 'custom-joggers', 'oversized-tshirt-manufacturer'],
  },
  {
    slug: 'custom-joggers',
    h1: 'Custom Joggers Manufacturer — Private Label Jogger Pants from MOQ 50',
    metaTitle: 'Custom Joggers Manufacturer China | Private Label Jogger Pants MOQ 50 | ClothReady',
    metaDesc: 'ClothReady manufactures custom joggers in China. Tapered, wide-leg, cargo joggers — private label from MOQ 50pcs. French terry, fleece, and more.',
    intro: 'ClothReady is a custom joggers manufacturer in Dongguan, China, producing tapered, wide-leg, and cargo jogger pants for fitness, streetwear, and loungewear brands. Whether you need lightweight French terry joggers for warm climates or heavyweight fleece styles for colder markets, we produce them with full custom branding from MOQ 50 pieces. Our jogger collection covers every market segment — from premium fitness wear to casual urban lifestyle.',
    why: [
      { title: 'Multiple Jogger Silhouettes', desc: 'Tapered, wide-leg, cargo, slim, and relaxed fits available. We can also develop custom silhouettes from your tech packs.' },
      { title: 'Range of Fabric Weights', desc: 'Lightweight French terry (200gsm), mid-weight fleece (300gsm), and heavyweight fleece (380gsm) options for every climate.' },
      { title: 'Functional Details', desc: 'Zippered pockets, drawstring waistbands, ankle cuffs, cargo pockets — we build functional details that your customers value.' },
      { title: 'Custom Waistband Options', desc: 'Jacquard woven waistbands, printed elastic, branded drawstrings, and custom hardware are all available as add-ons.' },
    ],
    faqs: [
      { q: 'What types of joggers do you make?', a: 'We produce tapered joggers, wide-leg joggers, cargo joggers, slim joggers, and drawstring lounge pants.' },
      { q: 'What is the MOQ for custom joggers?', a: 'MOQ is 50 pieces per style per color. Size mix within a style is allowed to reach MOQ.' },
      { q: 'What fabrics are available for custom joggers?', a: 'We offer French terry (200-240gsm), cotton fleece (280-320gsm), heavyweight fleece (380-420gsm), and nylon shell joggers.' },
      { q: 'Can you add pockets to custom joggers?', a: 'Yes. Side pockets, zippered pockets, back pockets, and cargo pockets are all available. Specify in your tech pack.' },
      { q: 'How long does custom jogger production take?', a: 'Sample production: 7-10 days. Bulk production: 25-35 days from sample approval.' },
    ],
    products: [
      { id: 'tapered-jogger', name: 'Tapered Fleece Joggers', img: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&q=80', tag: '300gsm' },
      { id: 'cargo-jogger', name: 'Cargo Jogger Pants', img: 'https://images.unsplash.com/photo-1614786269829-d24616faf56d?w=600&q=80', tag: 'Streetwear' },
      { id: 'wideleg-jogger', name: 'Wide-Leg Sweat Pants', img: 'https://images.unsplash.com/photo-1542574271-7f3b92e6c821?w=600&q=80', tag: 'Trending' },
      { id: 'lightweight-jogger', name: 'Lightweight French Terry Joggers', img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80', tag: 'MOQ 50' },
    ],
    relatedCategories: ['streetwear-manufacturer', 'custom-hoodies-manufacturer', 'activewear-manufacturer'],
  },
  {
    slug: 'sports-bra-manufacturer',
    h1: 'Sports Bra Manufacturer — Custom Sports Bras from MOQ 50',
    metaTitle: 'Sports Bra Manufacturer China | Custom Sports Bras MOQ 50 | ClothReady',
    metaDesc: 'ClothReady manufactures custom sports bras in China. Low, medium, and high-impact styles, custom print, MOQ 50pcs. Private label activewear manufacturer.',
    intro: 'ClothReady is a sports bra manufacturer in Dongguan, China, producing custom sports bras for activewear brands targeting the yoga, gym, and fitness markets. We produce low-impact bralette styles, medium-impact pullover sports bras, and high-impact underwire or racerback sports bras — all in squat-proof nylon-spandex blends. With MOQ at 50 pieces, launching a custom sports bra is accessible for brands at any stage.',
    why: [
      { title: 'All Impact Levels Covered', desc: 'We manufacture low (yoga/pilates), medium (training/cycling), and high-impact (running/HIIT) sports bra styles.' },
      { title: 'Premium Compression Fabrics', desc: 'Our sports bra fabrics provide 4-way stretch, compression, moisture-wicking, and opacity — tested through multiple wash cycles.' },
      { title: 'Custom Strap & Back Designs', desc: 'Racerback, cross-back, crisscross, wide straps, and removable padding options — all configurable for your brand line.' },
      { title: 'Matching Set Capability', desc: 'Order sports bras alongside matching leggings or shorts for cohesive activewear sets — all produced in the same factory.' },
    ],
    faqs: [
      { q: 'What sports bra styles do you manufacture?', a: 'We manufacture bralettes, pullover sports bras, racerback sports bras, underwire sports bras, and longline sports bras.' },
      { q: 'Can sports bras have removable padding?', a: 'Yes. We can add removable molded cups to any sports bra style. Specify in your tech pack or sample request.' },
      { q: 'What is the MOQ for custom sports bras?', a: 'MOQ is 50 pieces per style per color. You can mix cup sizes (S/M/L/XL) within one style to reach MOQ.' },
      { q: 'Can I get custom prints on sports bras?', a: 'Yes — we offer sublimation printing for all-over custom prints on sports bras, minimum 50 pieces per design.' },
      { q: 'Do your sports bras match leggings from the same collection?', a: "Yes. We produce matching sets where the sports bra and leggings use the same fabric, print, and colorway for brand consistency." },
    ],
    products: [
      { id: 'racerback-sports-bra', name: 'Racerback Sports Bra', img: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=600&q=80', tag: 'Medium Impact' },
      { id: 'longline-sports-bra', name: 'Longline Sports Bra', img: 'https://images.unsplash.com/photo-1554284126-aa88f22d8b74?w=600&q=80', tag: 'Custom Print' },
      { id: 'strappy-sports-bra', name: 'Strappy Cross-Back Bra', img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80', tag: 'Yoga' },
      { id: 'high-impact-bra', name: 'High-Impact Sports Bra', img: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=600&q=80', tag: 'MOQ 50' },
    ],
    relatedCategories: ['yoga-pants-manufacturer', 'gym-wear-manufacturer', 'activewear-manufacturer'],
  },
  {
    slug: 'oversized-tshirt-manufacturer',
    h1: 'Oversized T-Shirt Manufacturer — Custom Oversized Tees from MOQ 50',
    metaTitle: 'Oversized T-Shirt Manufacturer China | Custom Oversized Tees MOQ 50 | ClothReady',
    metaDesc: 'ClothReady manufactures custom oversized t-shirts in China. Drop-shoulder, heavyweight 220-280gsm, screen print & embroidery, MOQ 50pcs.',
    intro: 'ClothReady is a custom oversized t-shirt manufacturer in Dongguan, China, producing heavyweight drop-shoulder tees for streetwear brands, fitness labels, and lifestyle apparel companies. Our oversized t-shirts come in 220gsm to 280gsm cotton-jersey fabrics with boxy, extended, and drop-shoulder silhouettes — the essential blank and branded canvas for graphic collections. Starting from MOQ 50 pieces, we help brands produce oversized tee drops efficiently.',
    why: [
      { title: 'True Oversized Construction', desc: 'Drop-shoulder seams, extended lengths, and boxy body widths that create authentic oversized proportions — not just sized up.' },
      { title: 'Heavyweight Cotton Options', desc: 'Available in 220gsm, 240gsm, and 280gsm cotton-jersey for a substantial hand feel that photographs and wears well.' },
      { title: 'Print-Ready for Graphics', desc: 'Our oversized tees are optimized for large chest prints, full-back graphics, and sleeve prints — ideal for graphic-driven brands.' },
      { title: 'Quick Turnaround for Drops', desc: 'Sampling in 7-10 days. Bulk production in 25-30 days — fast enough to support limited drop marketing strategies.' },
    ],
    faqs: [
      { q: 'What is the MOQ for oversized t-shirts?', a: 'MOQ is 50 pieces per style per color. For printed tees, 50 pieces per print design applies.' },
      { q: 'What fabric weight do oversized tees come in?', a: 'We offer 200gsm, 220gsm, 240gsm, and 280gsm cotton-jersey. 240gsm is our most popular for premium oversized streetwear tees.' },
      { q: 'Can I get custom graphics on oversized tees?', a: 'Yes. We offer screen printing (up to 8 colors), DTF printing, discharge printing, and heat transfer for oversized tee graphics.' },
      { q: 'What sizes do you offer for oversized tees?', a: 'We produce XS through 4XL. We can also develop custom size grading if your brand uses non-standard sizing charts.' },
      { q: 'Do you make acid-wash or garment-dyed oversized tees?', a: 'Yes — garment dyeing and acid wash finishing are available for an added unit cost. Minimum 100 pieces per wash treatment.' },
    ],
    products: [
      { id: 'boxy-tee', name: 'Boxy Drop-Shoulder Tee', img: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=600&q=80', tag: '240gsm' },
      { id: 'extended-tee', name: 'Extended Length Tee', img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80', tag: 'Screen Print' },
      { id: 'graphic-oversized', name: 'Full-Back Graphic Tee', img: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80', tag: 'Custom' },
      { id: 'washed-oversized', name: 'Garment-Dyed Oversized Tee', img: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=80', tag: 'Vintage Wash' },
    ],
    relatedCategories: ['streetwear-manufacturer', 'custom-hoodies-manufacturer', 'custom-joggers'],
  },
]

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug)
}

export function getCategoryName(slug: string): string {
  const names: Record<string, string> = {
    'gym-wear-manufacturer': 'Gym Wear',
    'custom-hoodies-manufacturer': 'Custom Hoodies',
    'yoga-pants-manufacturer': 'Yoga Pants',
    'activewear-manufacturer': 'Activewear',
    'streetwear-manufacturer': 'Streetwear',
    'custom-joggers': 'Custom Joggers',
    'sports-bra-manufacturer': 'Sports Bras',
    'oversized-tshirt-manufacturer': 'Oversized T-Shirts',
  }
  return names[slug] ?? slug
}
