import {
  Navbar,
  Hero,
  TrustStrip,
  SplitFeature,
  BenefitsGrid,
  ResultManager,
  KeyFactsSection,
  FeatureTabs,
  HowItWorks,
  PersonaCards,
  FaqSection,
  FinalCta,
  FloatingHelpButton,
} from "@/components/home";
import { BrushEdge } from "@/components/brush";
import { SiteFooter } from "@/components/layout";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-[#1E2923] overflow-x-clip selection:bg-[var(--accent-soft)] selection:text-[var(--accent-ink)]">
      <Navbar />
      <main className="flex-1">
        {/* 2. Hero (tone green) */}
        <Hero />

        {/* 3. Trust Strip */}
        <TrustStrip />

        {/* 4. Split Feature (tone green) */}
        <SplitFeature />

        {/* 5. Benefits (tone purple - marketing section 1) */}
        <BenefitsGrid />

        {/* 6. Result Manager (tone green - live results preview) */}
        <ResultManager />

        {/* 7. Key Facts (tone green) */}
        <KeyFactsSection />

        {/* 8. Torn-edge divider into --section-bg gray area */}
        <BrushEdge fillColor="var(--section-bg, #F6F5FA)" />

        {/* 9. Feature Tabs (tone purple - marketing section 2) */}
        <FeatureTabs />

        {/* 10. How It Works (tone green) */}
        <HowItWorks />

        {/* 11. Who It Helps (tone green) */}
        <PersonaCards />

        {/* 12. FAQ Accordion (neutral on --section-bg) */}
        <FaqSection />

        {/* 13. Final CTA (tone green) */}
        <FinalCta />
      </main>

      {/* 14. Footer (tone neutral) */}
      <SiteFooter />

      {/* Floating 56px round green help button */}
      <FloatingHelpButton />
    </div>
  );
}
