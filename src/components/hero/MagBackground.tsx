"use client";

import { useEffect, useRef } from "react";

/**
 * MagBackground — WebGL particle background with mouse-interactive ring effect.
 * Uses the Mag library (https://github.com/manojkumards656/Mag).
 *
 * Renders as a fixed full-screen canvas behind all content.
 */
export default function MagBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<{ destroy: () => void } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Dynamically import Mag to keep it client-only (uses WebGL + DOM)
    let cancelled = false;

    import("Mag").then(({ Mag }) => {
      if (cancelled || !container) return;

      // Destroy any previous instance (e.g. from React strict-mode double mount)
      if (instanceRef.current) {
        instanceRef.current.destroy();
        instanceRef.current = null;
      }

      const instance = Mag.init(container, {
        theme: "light",
        density: 220,
        particlesScale: 0.59,
        interactive: true,
        color1: "#1d4ed8", // Outer ring: Darker Royal Blue
        color2: "#3b82f6", // Middle ring: Medium Vibrant Blue
        color3: "#93c5fd", // Inner ring: Lighter Sky Blue
      } as any);

      instanceRef.current = instance;
    });

    return () => {
      cancelled = true;
      if (instanceRef.current) {
        instanceRef.current.destroy();
        instanceRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full z-0"
      aria-hidden="true"
    />
  );
}
