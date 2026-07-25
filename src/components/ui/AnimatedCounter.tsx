"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, motion, useSpring, useTransform } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
  className?: string;
}

export default function AnimatedCounter({
  value,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  // Extract numeric part and suffix (e.g., "500+" → 500 and "+")
  const numericMatch = value.match(/^(\d+)/);
  const isNumeric = numericMatch !== null;
  const numericValue = isNumeric ? parseInt(numericMatch[1], 10) : 0;
  const suffix = isNumeric ? value.replace(/^\d+/, "") : "";

  const spring = useSpring(0, { stiffness: 50, damping: 20, duration: 1.5 });
  const display = useTransform(spring, (v) => Math.round(v));
  const [displayValue, setDisplayValue] = useState(isNumeric ? "0" : value);

  useEffect(() => {
    if (isInView && !hasAnimated && isNumeric) {
      spring.set(numericValue);
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated, isNumeric, numericValue, spring]);

  useEffect(() => {
    if (!isNumeric) return;
    const unsubscribe = display.on("change", (v) => {
      setDisplayValue(`${v}${suffix}`);
    });
    return unsubscribe;
  }, [display, suffix, isNumeric]);

  if (!isNumeric) {
    return (
      <motion.span
        ref={ref}
        className={className}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {value}
      </motion.span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {isInView ? displayValue : "0"}
    </span>
  );
}
