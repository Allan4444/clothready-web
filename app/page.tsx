import Hero from '@/components/sections/Hero'
import TrustBar from '@/components/sections/TrustBar'
import CertBar from '@/components/sections/CertBar'
import WhyChooseUs from '@/components/sections/WhyChooseUs'
import WhoWeWorkWith from '@/components/sections/WhoWeWorkWith'
import Process from '@/components/sections/Process'
import ProductionCapability from '@/components/sections/ProductionCapability'
import FaqPreview from '@/components/sections/FaqPreview'
import BuildBrand from '@/components/sections/BuildBrand'

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <CertBar />
      <WhyChooseUs />
      <WhoWeWorkWith />
      <Process />
      <ProductionCapability />
      <FaqPreview />
      <BuildBrand />
    </>
  )
}
