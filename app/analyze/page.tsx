import type { Metadata } from "next";
import { BackLink, PageHeader, SiteFooter } from "@/components/layout";
import { Navbar } from "@/components/home";
import { SimplifyForm } from "@/components/analyze";

export const metadata: Metadata = {
  title: "Analyze Court Document – Legal Aid",
  description:
    "Upload a court order or judgment PDF and get it in simple English.",
};

export default function AnalyzePage() {
  return (
    <div
      data-tone="green"
      className="flex min-h-screen flex-col bg-[var(--section-bg,#F6F5FA)] text-[#1E2923] selection:bg-[var(--accent-soft)] selection:text-[var(--accent-ink)]"
    >
      <Navbar variant="compact" />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 sm:px-6 py-8 sm:py-12">
        <div className="space-y-6 sm:space-y-8">
          <BackLink />
          <PageHeader
            title="Analyze Court Document"
            subtitle="Upload a court order or judgment PDF and get it in simple English."
          />
          <SimplifyForm />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
