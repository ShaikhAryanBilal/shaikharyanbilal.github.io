"use client";

import { useEffect, useRef, useState } from "react";

export default function Typewriter({
  text,
  className = "",
  dot = false,
  speed = 40,
  as: Tag = "h1",
}: {
  text: string;
  className?: string;
  dot?: boolean;
  speed?: number;
  as?: "h1" | "h2";
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [started, setStarted] = useState(false);
  const [count, setCount] = useState(0);
  const done = count >= text.length;

  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduceMotion) {
      setStarted(true);
      setCount(text.length);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setStarted(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [text.length, reduceMotion]);

  useEffect(() => {
    if (!started || done) return;
    const t = setTimeout(() => setCount((c) => c + 1), speed);
    return () => clearTimeout(t);
  }, [started, done, count, speed]);

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {text.slice(0, count)}
      {!done && <span className="caret" aria-hidden="true" />}
      {dot && <span className="dot">.</span>}
    </Tag>
  );
}
