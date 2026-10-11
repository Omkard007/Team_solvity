"use client";

import { useState, useEffect } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

export interface UseCountUpOptions {
  duration?: number;
  prefix?: string;
  suffix?: string;
  isCurrency?: boolean;
}

export function useCountUp(
  target: number,
  start: boolean = true,
  options: UseCountUpOptions = {}
): string {
  const { duration = 800, prefix = "", suffix = "", isCurrency = false } = options;
  const reducedMotion = usePrefersReducedMotion();
  const [current, setCurrent] = useState(reducedMotion ? target : 0);

  useEffect(() => {
    if (!start) return;
    if (reducedMotion) {
      setCurrent(target);
      return;
    }

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutExpo / easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const val = Math.floor(eased * target);
      setCurrent(val);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCurrent(target);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [target, start, duration, reducedMotion]);

  if (isCurrency) {
    const formatted = new Intl.NumberFormat("en-IN").format(current);
    return `${prefix}${formatted}${suffix}`;
  }

  return `${prefix}${current}${suffix}`;
}
