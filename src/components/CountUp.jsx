import { useEffect, useRef, useState } from "react";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

// Shows the final value (also in prerendered HTML), then counts up once when scrolled into view.
export default function CountUp({ value, duration = 1400 }) {
  const ref = useRef(null);
  const reducedMotion = usePrefersReducedMotion();
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (reducedMotion) return undefined;
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const started = performance.now();
      const step = (now) => {
        const progress = Math.min(1, (now - started) / duration);
        setDisplay(Math.round(value * (1 - (1 - progress) ** 3)));
        if (progress < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    }, { threshold: 0.6 });
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [duration, reducedMotion, value]);

  return <span ref={ref}>{display}</span>;
}
