"use client";

import { useEffect } from "react";
import Script from "next/script";
import { Languages } from "lucide-react";
import { cn } from "@/lib/utils";

export interface GoogleTranslateProps {
  className?: string;
}

export default function GoogleTranslate({ className }: GoogleTranslateProps) {
  useEffect(() => {
    // If the Google Translate script is already loaded in the window,
    // initialize the translate element immediately on mount.
    if (
      typeof window !== "undefined" &&
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).google?.translate?.TranslateElement
    ) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        new (window as any).google.translate.TranslateElement(
          { pageLanguage: "en", autoDisplay: false },
          "google_translate_element"
        );
      } catch {
        // Already initialized
      }
    }
  }, []);

  return (
    <div
      className={cn(
        "google-translate-container z-30 transition-all",
        className
      )}
      aria-label="Translate document language"
    >
      <Languages
        className="h-3.5 w-3.5 shrink-0 text-[var(--accent-ink)]"
        aria-hidden="true"
      />
      <div id="google_translate_element" className="min-h-[22px] flex items-center" />

      {/* Define the init callback first, then load Google's script */}
      <Script id="google-translate-init" strategy="afterInteractive">
        {`
          function googleTranslateElementInit() {
            if (window.google && window.google.translate) {
              new window.google.translate.TranslateElement(
                { pageLanguage: 'en', autoDisplay: false },
                'google_translate_element'
              );
            }
          }
        `}
      </Script>
      <Script
        id="google-translate-script"
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
    </div>
  );
}