import { useEffect, useMemo, useRef, useState } from "react";

export default function ScrollRevealText({
  text,
  className = "mx-auto max-w-6xl text-center text-4xl font-black leading-[1.02] tracking-[-0.06em] sm:text-6xl lg:text-8xl",
  activeClass = "text-white",
  inactiveClass = "text-white/12",
}) {
  const ref = useRef(null);
  const words = useMemo(() => text.split(" "), [text]);
  const [activeWords, setActiveWords] = useState(0);

  useEffect(() => {
    const update = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const viewHeight = window.innerHeight || document.documentElement.clientHeight;
      const start = viewHeight * 0.86;
      const end = viewHeight * 0.28;
      const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
      setActiveWords(Math.round(progress * words.length));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [words.length]);

  return (
    <h2 ref={ref} className={className}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className={`transition-colors duration-300 ${index < activeWords ? activeClass : inactiveClass}`}>{word}{" "}</span>
      ))}
    </h2>
  );
}
