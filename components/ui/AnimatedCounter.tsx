"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring, useTransform, motion } from "framer-motion";

type AnimatedCounterProps = {
  target: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
};

export default function AnimatedCounter({ target, prefix = "", suffix = "", decimals = 0 }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true });

  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, {
    duration: 2000,
    ease: [0.16, 1, 0.3, 1],
  });

  useEffect(() => {
    if (!isInView) return;
    motionVal.set(target);
  }, [isInView, motionVal, target]);

  const formatted = useTransform(spring, (latest) => {
    const d = Math.max(0, decimals);
    const fixed = latest.toFixed(d);
    const num = Number(fixed);
    const withCommas = num.toLocaleString("en-US", {
      minimumFractionDigits: d,
      maximumFractionDigits: d,
    });
    return `${prefix}${withCommas}${suffix}`;
  });

  return (
    <motion.span ref={ref} style={{ display: "inline-block" }} className="font-mono font-bold">
      {formatted}
    </motion.span>
  );
}

