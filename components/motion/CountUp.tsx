"use client";

import { useInView } from "@/hooks/useInView";
import { useCountUp } from "@/hooks/useCountUp";

export interface CountUpProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  isCurrency?: boolean;
  className?: string;
}

export function CountUp({
  end,
  duration = 800,
  prefix = "",
  suffix = "",
  isCurrency = false,
  className,
}: CountUpProps) {
  const [ref, inView] = useInView({ threshold: 0.1, once: true });
  const displayValue = useCountUp(end, inView, { duration, prefix, suffix, isCurrency });

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
}
