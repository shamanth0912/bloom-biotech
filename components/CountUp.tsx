"use client";

import { useEffect, useRef, useState } from "react";

export function CountUp({
  value,
  decimals = 0,
  suffix = "",
  prefix = "",
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}) {
  const [n, setN] = useState(0);
  const [bump, setBump] = useState(false);
  const seen = useRef(false);
  const el = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = el.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || seen.current) return;
        seen.current = true;
        const start = performance.now();
        const dur = 900;
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          setN(value * eased);
          if (p < 1) requestAnimationFrame(tick);
          else {
            setN(value);
            setBump(true);
          }
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [value]);

  return (
    <span
      ref={el}
      className={`inline-block origin-bottom ${bump ? "stat-bump" : ""}`}
    >
      {prefix}
      {n.toFixed(decimals)}
      {suffix}
    </span>
  );
}
