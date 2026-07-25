"use client";

import { useEffect, useRef, useState } from "react";

export default function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Don't show on touch devices
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    // Check reduced motion preference
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    setVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      if (ref.current) {
        ref.current.style.setProperty("--glow-x", `${e.clientX}px`);
        ref.current.style.setProperty("--glow-y", `${e.clientY}px`);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 z-30"
      style={{
        background:
          "radial-gradient(600px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(139, 92, 246, 0.04), transparent 40%)",
      }}
    />
  );
}
