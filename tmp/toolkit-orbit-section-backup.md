# Homepage "Connected toolkit" orbit section (removed 2026-10-06)

Backup of the orbit visual removed from the homepage during the trim, including the uncommitted icon + connector-linework version. Restore by pasting these pieces back into the listed files.

## src/pages/HomePage.jsx

```jsx
import { useEffect, useRef, useState } from "react";
import ConnectorLinework from "../components/ConnectorLinework";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";
import { Code2, GitBranch, Globe2, Search } from "lucide-react";

const orbitItems = [
  { icon: Globe2, label: "WordPress" },
  { icon: GitBranch, label: "Lead systems" },
  { icon: Code2, label: "Frontend" },
  { icon: Search, label: "Optimization" },
];

function OrbitingCapabilitiesVisual() {
  const visualRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();
  const [inView, setInView] = useState(false);
  const isActive = inView || reducedMotion;

  useEffect(() => {
    if (isActive) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setInView(true);
      observer.disconnect();
    }, { threshold: 0.35 });

    if (visualRef.current) observer.observe(visualRef.current);
    return () => observer.disconnect();
  }, [isActive]);

  return (
    <div ref={visualRef} aria-label="Connected toolkit: WordPress, lead systems, frontend, and optimization" className="relative mx-auto grid h-[340px] w-full max-w-[320px] place-items-center overflow-hidden sm:h-[460px] sm:max-w-[420px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,251,69,0.18),transparent_38%)]" />
      <div className="absolute h-[82%] w-[82%] rounded-full border border-dashed border-white/15" />
      <div className="absolute h-[62%] w-[62%] rounded-full border border-white/10" />
      <div className="absolute h-[44%] w-[44%] rounded-full border border-lime-300/10" />
      <ConnectorLinework variant="toolkit" />

      <div className={`orbit-ring absolute grid h-[72%] w-[72%] place-items-center rounded-full [--orbit-radius:96px] sm:h-[76%] sm:w-[76%] sm:[--orbit-radius:150px] ${isActive ? "is-active" : ""}`}>
        {orbitItems.map((item, index) => (
          <div
            key={item.label}
            className="orbit-item absolute left-1/2 top-1/2"
            style={{
              "--angle": `${(360 / orbitItems.length) * index}deg`,
              "--counter-angle": `${(360 / orbitItems.length) * index * -1}deg`,
            }}
          >
            <div title={item.label} aria-label={item.label} className={`orbit-counter grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-black/80 text-center shadow-2xl backdrop-blur-xl sm:h-auto sm:w-auto sm:rounded-3xl sm:px-4 sm:py-3 ${isActive ? "is-active" : ""}`}>
              <item.icon aria-hidden="true" className="h-5 w-5 text-lime-300 sm:h-6 sm:w-6" strokeWidth={1.8} />
              <span className="sr-only">{item.label}</span>
              <p aria-hidden="true" className="mt-1 hidden text-[9px] font-black uppercase tracking-[0.2em] text-white/65 sm:block">{item.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-10 grid aspect-square w-[43%] min-w-[126px] place-items-center rounded-full bg-black shadow-[0_0_80px_rgba(190,252,53,0.2)] ring-1 ring-lime-300/10 sm:w-[44%] sm:min-w-[165px]">
        <div className="text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.38em] text-lime-300 sm:text-xs sm:tracking-[0.45em]">Connected</p>
          <h3 className="mt-3 text-3xl font-black text-white sm:text-4xl">Systems</h3>
          <p className="mt-4 text-[10px] font-black uppercase tracking-[0.18em] text-white/65 sm:text-xs sm:tracking-[0.24em]">Web / GHL / SEO</p>
        </div>
      </div>
    </div>
  );
}

function CapabilitiesMotionSection() {
  return (
    <section className="site-section overflow-hidden border-b border-white/10 bg-[#0c0d0b]">
      <div className="site-container">
        <div className="grid min-w-0 items-center gap-12 lg:grid-cols-[1fr_0.8fr]">
          <div className="min-w-0">
            <p className="section-kicker">Connected toolkit</p>
            <ScrollRevealText text="The right tools around one clear customer journey." className="section-title max-w-[13ch]" />
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
              WordPress, GoHighLevel, frontend work, and optimization are selected around the project outcome rather than treated as separate layers.
            </p>
          </div>
          <OrbitingCapabilitiesVisual />
        </div>
      </div>
      <div className="mt-12 w-full border-y border-white/10">
        <ToolMarquee items={capabilityTools} />
      </div>
    </section>
  );
}
```

## src/components/ConnectorLinework.jsx (full file at the time of removal)

```jsx
const connectorVariants = {
  toolkit: { viewBox: "0 0 100 100", preserveAspectRatio: "xMidYMid meet" },
  process: { viewBox: "0 0 1 100", preserveAspectRatio: "none" },
};

export default function ConnectorLinework({ variant, className = "" }) {
  const config = connectorVariants[variant];
  if (!config) return null;

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={`connector-linework connector-linework--${variant} ${className}`.trim()}
      viewBox={config.viewBox}
      preserveAspectRatio={config.preserveAspectRatio}
    >
      {variant === "toolkit" ? (
        <g>
          <line pathLength="1" x1="50" y1="50" x2="50" y2="8" />
          <line pathLength="1" x1="50" y1="50" x2="92" y2="50" />
          <line pathLength="1" x1="50" y1="50" x2="50" y2="92" />
          <line pathLength="1" x1="50" y1="50" x2="8" y2="50" />
          <circle cx="50" cy="8" r="1.3" />
          <circle cx="92" cy="50" r="1.3" />
          <circle cx="50" cy="92" r="1.3" />
          <circle cx="8" cy="50" r="1.3" />
        </g>
      ) : (
        <line pathLength="1" x1="0.5" y1="0" x2="0.5" y2="100" />
      )}
    </svg>
  );
}
```

## src/styles/portfolioAnimations.css

```css
.connector-linework--toolkit {
  top: 50%;
  left: 50%;
  width: 72%;
  height: 72%;
  transform: translate(-50%, -50%);
}

.orbit-ring {
  transform-origin: center;
}

.orbit-ring.is-active {
  animation: orbitSpin 4.8s cubic-bezier(0.22, 0.61, 0.36, 1) both;
}

.orbit-item {
  transform: rotate(var(--angle)) translateX(var(--orbit-radius));
  transform-origin: 0 0;
}

.orbit-counter {
  transform: translate(-50%, -50%) rotate(var(--counter-angle));
  transform-origin: center;
}

.orbit-counter.is-active {
  animation: orbitCounterSpin 4.8s cubic-bezier(0.22, 0.61, 0.36, 1) both;
}

@keyframes orbitSpin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes orbitCounterSpin {
  from { transform: translate(-50%, -50%) rotate(var(--counter-angle)); }
  to { transform: translate(-50%, -50%) rotate(calc(var(--counter-angle) - 360deg)); }
}

/* inside @media (prefers-reduced-motion: reduce) */
  .orbit-ring.is-active,
  .orbit-counter.is-active {
    animation: none;
  }
```
