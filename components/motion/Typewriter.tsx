"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

export interface TypewriterProps {
  text: string;
  totalDuration?: number; // default ~1200ms
  className?: string;
  onComplete?: () => void;
}

export function Typewriter({
  text,
  totalDuration = 1200,
  className,
  onComplete,
}: TypewriterProps) {
  const reducedMotion = usePrefersReducedMotion();
  const words = useMemo(() => text.split(" "), [text]);
  const [visibleCount, setVisibleCount] = useState(reducedMotion ? words.length : 0);
  const isComplete = visibleCount >= words.length;

  const skipToEnd = useCallback(() => {
    setVisibleCount(words.length);
    onComplete?.();
  }, [words.length, onComplete]);

  useEffect(() => {
    if (reducedMotion) {
      setVisibleCount(words.length);
      onComplete?.();
      return;
    }

    const intervalTime = Math.max(25, Math.floor(totalDuration / Math.max(words.length, 1)));
    const timer = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev + 1 >= words.length) {
          clearInterval(timer);
          onComplete?.();
          return words.length;
        }
        return prev + 1;
      });
    }, intervalTime);

    // Keyboard listener to skip on any keypress
    const handleKeyDown = () => skipToEnd();
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [words, totalDuration, reducedMotion, onComplete, skipToEnd]);

  // Format words: check for rupees (₹ or Rs.) and dates (e.g. 15th, 2024, etc.)
  const isRupee = (w: string) => /₹|Rs\.|Lakh|Crore/i.test(w);
  const isDateOrTime = (w: string) => /\b(January|February|March|April|May|June|July|August|September|October|November|December|\d{1,2}(st|nd|rd|th)?|\d{4})\b/i.test(w);

  return (
    <p
      onClick={skipToEnd}
      className={cn(
        "cursor-pointer select-none leading-relaxed transition-opacity",
        className
      )}
      title="Click or press any key to skip typewriter reveal"
    >
      {words.slice(0, visibleCount).map((word, idx) => {
        const isHighlightRupee = isRupee(word);
        const isHighlightDate = isDateOrTime(word);

        if (isHighlightRupee) {
          return (
            <span key={idx} className="marker-highlight font-semibold">
              {word}{" "}
            </span>
          );
        }

        if (isHighlightDate) {
          return (
            <span key={idx} className="marker-highlight-amber font-semibold">
              {word}{" "}
            </span>
          );
        }

        return <span key={idx}>{word} </span>;
      })}

      {!isComplete && !reducedMotion && (
        <span className="inline-block w-1.5 h-4 bg-[var(--accent)] animate-pulse align-middle ml-0.5" />
      )}
    </p>
  );
}
