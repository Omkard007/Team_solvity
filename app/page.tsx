<<<<<<< HEAD
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

        {/* 5. Benefits (tone purple) */}
        <BenefitsGrid />

        {/* 6. Result Manager (tone purple) */}
        <ResultManager />

        {/* 7. Key Facts (tone purple) */}
        <KeyFactsSection />

        {/* 8. Torn-edge divider into --section-bg lavender-gray area */}
        <BrushEdge fillColor="var(--section-bg, #F6F5FB)" />

        {/* 9. Feature Tabs (purple on --section-bg) */}
        <FeatureTabs />

        {/* 10. How It Works (purple on --section-bg) */}
        <HowItWorks />

        {/* 11. Who It Helps (purple on --section-bg) */}
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
=======
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert h-5 w-[100px]"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the{" "}
            <code className="rounded bg-black/[.06] px-1.5 py-0.5 font-mono text-[0.9em] dark:bg-white/[.08]">
              page.tsx
            </code>{" "}
            file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert h-[14px] w-4"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={14}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
>>>>>>> 400e29e56c8ee22766cc431c124e5023890ee4a2
    </div>
  );
}
