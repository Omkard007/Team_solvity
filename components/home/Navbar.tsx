"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/content";
import { cn } from "@/lib/utils";

export interface NavbarProps {
  variant?: "default" | "compact";
}

export function Navbar({ variant = "default" }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isCompact = variant === "compact";

  return (
    <header className={cn("sticky top-0 z-50 w-full border-b border-[#E6E8E7]/80 bg-white/85 backdrop-blur-md transition-colors", isCompact && "bg-white/95")}>
      <div className={cn("mx-auto flex max-w-[1180px] items-center justify-between px-6 md:px-8", isCompact ? "h-16" : "h-20")}>
        {/* Brand wordmark with section symbol § */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-lg p-1"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-[var(--accent)] font-bold text-lg select-none transition-transform group-hover:scale-105">
            §
          </span>
          <span className="text-xl tracking-tight">
            <strong className="font-extrabold text-[#1E2923]">Legal</strong>{" "}
            <span className="font-medium text-[#4B5651]">Aid</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        {!isCompact && (
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-8 text-[13px] font-semibold tracking-[0.08em] text-[#4B5651] uppercase"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-[#1E2923] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-sm px-1 py-0.5"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        {/* Desktop CTA / Back */}
        <div className="hidden md:flex items-center gap-3">
          {isCompact ? (
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-[#ECEEED] bg-white px-4 py-1.5 text-xs font-semibold text-[#5B6661] hover:text-[#1E2923] hover:border-[#D0D4D2] transition-colors"
            >
              ← Back to Home
            </Link>
          ) : (
            <Link
              href="/analyze"
              className="inline-flex items-center justify-center rounded-xl bg-[var(--accent-soft)] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[var(--accent-ink)] transition-all hover:brightness-95 active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            >
              OPEN APP →
            </Link>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            className="p-2 text-[#1E2923] hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-lg"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E6E8E7] bg-white px-6 py-6 shadow-xl animate-in slide-in-from-top-2">
          <nav className="flex flex-col gap-4 text-sm font-semibold tracking-[0.08em] uppercase text-[#4B5651]">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 transition-colors hover:text-[#1E2923]"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-[#E6E8E7]">
              <Link
                href="/analyze"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex w-full items-center justify-center rounded-xl bg-[var(--accent-soft)] py-3 text-xs font-bold uppercase tracking-wider text-[var(--accent-ink)]"
              >
                OPEN APP →
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
