import { useEffect, useMemo, useRef, useState } from "react";

export function CustomCursor() {
  const outerRef = useRef(null);
  const [cursorMode, setCursorMode] = useState("default");
  const rafRef = useRef(null);
  const mouseRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const render = () => {
      if (outerRef.current) {
        outerRef.current.style.transform = `translate3d(${mouseRef.current.x}px, ${mouseRef.current.y}px, 0)`;
      }
      rafRef.current = null;
    };

    const move = (event) => {
      mouseRef.current = { x: event.clientX, y: event.clientY };
      if (!rafRef.current) rafRef.current = requestAnimationFrame(render);
    };

    const detect = (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest("button, a")) setCursorMode("click");
      else if (target.closest("article, [data-cursor='project']")) setCursorMode("view");
      else setCursorMode("default");
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", detect);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", detect);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const isActive = cursorMode !== "default";

  return (
    <div ref={outerRef} className="pointer-events-none fixed left-0 top-0 z-[9999] hidden mix-blend-difference lg:block">
      <div className={`grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/60 bg-white text-black transition-all duration-200 ease-out ${isActive ? "h-24 w-24 scale-100" : "h-5 w-5 scale-100"}`}>
        {isActive && <span className="text-[10px] font-black uppercase tracking-[0.22em]">{cursorMode === "view" ? "View" : "Click"}</span>}
      </div>
      <div className="absolute left-0 top-0 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/25 transition-transform duration-300" />
    </div>
  );
}

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const body = document.body;
      const scrollTop = window.scrollY || doc.scrollTop || body.scrollTop || 0;
      const scrollHeight = Math.max(body.scrollHeight, doc.scrollHeight, body.offsetHeight, doc.offsetHeight, body.clientHeight, doc.clientHeight);
      const viewportHeight = window.innerHeight || doc.clientHeight;
      const maxScroll = Math.max(1, scrollHeight - viewportHeight);
      const distanceToBottom = Math.max(0, maxScroll - scrollTop);
      const bottomThreshold = Math.max(220, viewportHeight * 0.24);
      const boostedProgress = (scrollTop + viewportHeight * 0.18) / maxScroll;
      setProgress(distanceToBottom <= bottomThreshold ? 1 : Math.min(1, Math.max(0, boostedProgress)));
      setVisible(scrollTop > 620);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <button
      type="button"
      aria-label="Scroll back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`scroll-top fixed bottom-6 right-6 z-[80] grid h-16 w-16 place-items-center rounded-full p-[3px] text-white shadow-2xl transition-all duration-300 hover:text-black lg:bottom-8 lg:right-8 ${visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-5 opacity-0"}`}
      style={{ "--scroll-progress": `${Math.round(progress * 360)}deg` }}
    >
      <span className="absolute inset-0 rounded-full bg-[conic-gradient(currentColor_var(--scroll-progress),rgba(255,255,255,0.14)_0deg)]" />
      <span className="relative grid h-full w-full place-items-center rounded-full bg-black/85 backdrop-blur-xl transition group-hover:bg-lime-300">
        <svg className="relative z-10" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m18 15-6-6-6 6" /></svg>
      </span>
    </button>
  );
}

export function HeroParticleField() {
  const particles = useMemo(() => Array.from({ length: 42 }, (_, index) => ({
    x: (index * 37) % 100,
    y: Math.max(8, Math.min(86, 45 + Math.sin(index * 0.62) * 15 + ((index % 9) - 4) * 3.5)),
    size: 1 + (index % 6) * 0.75,
    delay: (index % 12) * -0.45,
    drift: ((index % 7) - 3) * 10,
    opacity: 0.18 + (index % 5) * 0.11,
  })), []);

  return (
    <div className="hero-particle-field absolute inset-0 overflow-hidden">
      <div className="hero-noise absolute inset-0" />
      <div className="hero-wave absolute left-[-8%] top-[28%] h-[46%] w-[116%] rotate-[-2deg] rounded-[50%] bg-white/[0.045] blur-[26px]" />
      <div className="hero-wave hero-wave-two absolute left-[-10%] top-[38%] h-[32%] w-[120%] rotate-[3deg] rounded-[50%] bg-lime-300/[0.055] blur-[34px]" />
      {particles.map((particle, index) => (
        <span key={index} className="hero-dot absolute rounded-full bg-white" style={{ left: `${particle.x}%`, top: `${particle.y}%`, width: `${particle.size}px`, height: `${particle.size}px`, opacity: particle.opacity, "--delay": `${particle.delay}s`, "--drift": `${particle.drift}px` }} />
      ))}
    </div>
  );
}

export function HeroScrollAccents() {
  return (
    <div className="hero-scroll-accents pointer-events-none absolute inset-0 hidden lg:block">
      <div className="hero-layer hero-layer-one absolute left-[7%] top-[18%] h-36 w-64 rounded-[2rem] border border-white/10 bg-white/[0.018]" />
      <div className="hero-layer hero-layer-two absolute right-[12%] top-[20%] h-20 w-80 rounded-full border border-lime-300/12 bg-lime-300/[0.025]" />
      <div className="hero-layer hero-layer-three absolute bottom-[18%] left-[40%] h-24 w-72 rounded-[1.5rem] border border-white/10 bg-black/15" />
      <div className="hero-wireframe absolute right-[35%] top-[32%] h-52 w-52 rounded-full border border-white/10" />
      <div className="hero-wireframe hero-wireframe-two absolute right-[34%] top-[31%] h-40 w-40 rounded-full border border-lime-300/10" />
    </div>
  );
}

export function HeroAwards() {
  return (
    <div className="hero-awards relative z-20 mx-auto mt-8 hidden w-full max-w-4xl grid-cols-3 gap-5 text-center md:grid">
      {[["5+", "Years WordPress"], ["GHL", "Funnels + CRM"], ["SEO", "Speed + Structure"]].map(([value, label]) => (
        <div key={label} className="rounded-[1.6rem] border border-white/10 bg-black/40 px-6 py-5 shadow-2xl backdrop-blur-xl">
          <p className="text-4xl font-black tracking-[-0.06em] text-lime-300">{value}</p>
          <p className="mt-2 text-xs font-black uppercase tracking-[0.24em] text-white/45">{label}</p>
        </div>
      ))}
    </div>
  );
}

export function StudioRoomBackground() {
  return (
    <div className="studio-bg pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(110deg,#050505_0%,#111_45%,#050505_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(255,255,255,0.14),transparent_21%),radial-gradient(circle_at_55%_8%,rgba(255,255,255,0.10),transparent_18%),radial-gradient(circle_at_88%_20%,rgba(163,230,53,0.10),transparent_25%)]" />
      <div className="absolute left-[4%] top-[18%] h-[54%] w-[26%] rounded-[50%] bg-black/65 blur-[12px]" />
      <div className="absolute bottom-0 left-0 h-[38%] w-[34%] bg-[radial-gradient(ellipse_at_bottom,rgba(0,0,0,0.9),transparent_72%)]" />
      <div className="absolute bottom-0 right-0 h-[54%] w-[42%] bg-[radial-gradient(ellipse_at_bottom,rgba(0,0,0,0.92),transparent_70%)]" />
      <div className="absolute right-[8%] top-[8%] grid h-[50%] w-[28%] grid-cols-4 grid-rows-3 gap-[1px] opacity-20">
        {Array.from({ length: 12 }).map((_, index) => <span key={index} className="bg-white/35" />)}
      </div>
      <div className="absolute left-[18%] top-[5%] h-44 w-44 rounded-full bg-white/10 blur-[70px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.22)_1px,transparent_1px)] bg-[size:32px_32px] opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/62 to-black/92" />
    </div>
  );
}
