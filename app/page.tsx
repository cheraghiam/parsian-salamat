import { LanguageProvider } from '@/lib/i18n'
import { Navbar } from '@/components/navbar'
import { HeroSection } from '@/components/hero-section'
import { ProductIntro } from '@/components/product-intro'
import { SignalsGrid } from '@/components/signals-grid'
import { LiveDashboard } from '@/components/live-dashboard'
import { HowItWorks } from '@/components/how-it-works'
import { CapabilitiesGrid } from '@/components/capabilities-grid'
import { ArchitectureSection } from '@/components/architecture-section'
import { SpecsSection } from '@/components/specs-section'
import { ApplicationsSection } from '@/components/applications-section'
import { GallerySection } from '@/components/gallery-section'
import { DemoSection } from '@/components/demo-section'
import { CtaFooter } from '@/components/cta-footer'

export default function Page() {
  return (
    <LanguageProvider>
      <Navbar />
      <main>
        <HeroSection />
        <ProductIntro />
        <SignalsGrid />
        <LiveDashboard />
        <HowItWorks />
        <CapabilitiesGrid />
        <ArchitectureSection />
        <SpecsSection />
        <ApplicationsSection />
        <GallerySection />
        <DemoSection />
        <CtaFooter />
      </main>
    </LanguageProvider>
  )
}
