"use client";

import { MessageSquareText } from "lucide-react";

export function FloatingHelpButton() {
  const scrollToFaq = () => {
    const faqElement = document.getElementById("faq");
    if (faqElement) {
      faqElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button
      type="button"
      onClick={scrollToFaq}
      aria-label="Help and Frequently Asked Questions"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent,#4CAF6A)] text-white shadow-xl shadow-[var(--accent,#4CAF6A)]/30 transition-all duration-200 hover:scale-105 hover:brightness-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent,#4CAF6A)] focus-visible:ring-offset-2"
    >
      <MessageSquareText className="h-6 w-6" aria-hidden="true" />
    </button>
  );
}
