import Hero from '@/components/sections/Hero'
import TrustBar from '@/components/sections/TrustBar'
import WhyChooseUs from '@/components/sections/WhyChooseUs'
import Guarantees from '@/components/sections/Guarantees'
import WhoWeWorkWith from '@/components/sections/WhoWeWorkWith'
import Process from '@/components/sections/Process'
import SocialFeed from '@/components/sections/SocialFeed'
import FaqPreview from '@/components/sections/FaqPreview'
import CTA from '@/components/sections/CTA'
import BuildBrand from '@/components/sections/BuildBrand'

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <WhyChooseUs />
      <Guarantees />
      <WhoWeWorkWith />
      <Process />
      <SocialFeed />
      <FaqPreview />
      <CTA />
      <BuildBrand />
    </>
  )
}
