import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

const profileImage = "data:image/webp;base64,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";

const portfolioItems = [
  { title: "High-Converting WordPress Landing Pages", category: "WordPress", description: "Elementor and Divi landing pages built for speed, clarity, and lead generation.", meta: "Design • Build • Launch" },
  { title: "GoHighLevel Funnel + CRM Automation", category: "GHL", description: "Funnels, forms, pipelines, triggers, calendars, and email/SMS automation flows.", meta: "Funnels • CRM • Workflows" },
  { title: "SEO-Friendly Service Business Websites", category: "SEO", description: "Responsive websites structured with conversion copy, local SEO, and clear calls-to-action.", meta: "SEO • UX • Performance" },
  { title: "Real Estate Brand Website + API Support", category: "Frontend", description: "Frontend customization, landing page layouts, API support, and campaign-ready pages.", meta: "Frontend • API • Branding" },
  { title: "Meta Creative Landing Page Systems", category: "Design", description: "Ad-friendly landing pages and creative layouts that match campaign messaging.", meta: "Ads • Design • CTA" },
  { title: "Website Speed + Core Web Vitals Cleanup", category: "Performance", description: "Plugin cleanup, theme optimization, responsive fixes, and PageSpeed improvements.", meta: "Speed • UX • Cleanup" },
];

const services = [
  { icon: "▦", title: "WordPress Design & Development", text: "Custom Elementor, Divi, Kadence, Beaver Builder, Avada, and Enfold builds designed for real business results." },
  { icon: "⚡", title: "GoHighLevel Funnels & Automations", text: "Landing pages, workflows, pipelines, calendars, forms, triggers, SMS, and email automation setup." },
  { icon: "◎", title: "SEO + Conversion Structure", text: "Content structure, page hierarchy, local-service messaging, trust blocks, and CTA placement for better leads." },
  { icon: "</>", title: "Frontend Customization", text: "HTML, CSS, JavaScript, ACF, responsive fixes, custom sections, integrations, and lightweight enhancements." },
];

const toolsTop = ["WordPress", "Elementor", "Divi", "GoHighLevel", "HTML", "CSS", "JavaScript", "ACF", "SEO", "PageSpeed", "Canva", "Adobe Suite"];
const toolsBottom = ["Kadence", "Beaver Builder", "Avada", "Enfold", "GHL Funnels", "GHL CRM", "GHL Workflows", "Landing Pages", "Core Web Vitals", "API Support", "Responsive Design", "Front-End Customization"];

const process = ["Audit your current site or offer", "Plan sitemap, sections, and conversion flow", "Design premium responsive layouts", "Build in WordPress, GHL, or custom frontend", "Optimize speed, SEO, and launch details"];
const filters = ["All", "WordPress", "GHL", "SEO", "Frontend", "Design", "Performance"];

const creativeOrbitItems = [
  { label: "Developer", symbol: "</>" },
  { label: "WordPress", symbol: "WP" },
  { label: "GHL", symbol: "⚡" },
  { label: "Design", symbol: "✦" },
  { label: "SEO", symbol: "◎" },
  { label: "Video", symbol: "▶" },
];

const professionalHistory = [
  {
    period: "May–Dec 2025",
    role: "Web Developer / GoHighLevel Automation Specialist / Graphic Designer",
    company: "Clinic Envy",
    text: "Built and managed WordPress sites end-to-end, created service and lead-generation pages, supported GHL funnels and landing pages, maintained design consistency, and structured pages for SEO-ready campaigns.",
  },
  {
    period: "Nov–Dec 2024",
    role: "Full-Time SEO + Front-End Developer",
    company: "Real Estate Brand",
    text: "Handled Elementor website builds, frontend customizations, API support, funnel design, and conversion-minded layouts for a real estate-focused digital presence.",
  },
  {
    period: "5+ Years",
    role: "Freelance WordPress Website Designer",
    company: "Client Projects & Portfolio Builds",
    text: "Designed and developed responsive websites using Elementor, Divi, Kadence, Beaver Builder, Avada, Enfold, ACF, HTML, CSS, JavaScript, SEO structure, speed optimization, and content-led page layouts.",
  },
];

const experienceReviews = [
  {
    score: "01",
    title: "Clear Strategy Before Design",
    text: "Every build starts with offer clarity, sitemap planning, page flow, and conversion goals before jumping into visual layout.",
  },
  {
    score: "02",
    title: "Premium Look With Practical Execution",
    text: "The design direction stays modern and high-end, but the backend remains easy to manage through WordPress, Elementor, or GHL.",
  },
  {
    score: "03",
    title: "Built For Leads, Speed, And Trust",
    text: "Sections are structured around trust signals, direct CTAs, fast-loading layouts, mobile responsiveness, and SEO-friendly content hierarchy.",
  },
];

const portfolioGraphics = [
  { title: "Business Website Promo", category: "Web Design", image: "https://raw.githubusercontent.com/FactoJanrenzo/PortfolioSimpleModern/main/PorfolioSite%20Janrenzo/assets/portfolio/website-business.jpg" },
  { title: "Vortex VA Hiring Creative", category: "Recruitment Graphic", image: "https://raw.githubusercontent.com/FactoJanrenzo/PortfolioSimpleModern/main/PorfolioSite%20Janrenzo/assets/portfolio/vortex-hiring-va.jpg" },
  { title: "Vortex Quote Design", category: "Brand Social", image: "https://raw.githubusercontent.com/FactoJanrenzo/PortfolioSimpleModern/main/PorfolioSite%20Janrenzo/assets/portfolio/vortex-quote.jpg" },
  { title: "Mushroom Benefits Campaign", category: "Health Creative", image: "https://raw.githubusercontent.com/FactoJanrenzo/PortfolioSimpleModern/main/PorfolioSite%20Janrenzo/assets/portfolio/mushroom-benefits.jpg" },
  { title: "Power Outage Solar Creative", category: "Solar Marketing", image: "https://raw.githubusercontent.com/FactoJanrenzo/PortfolioSimpleModern/main/PorfolioSite%20Janrenzo/assets/portfolio/power-outage.jpg" },
  { title: "Mother’s Day Service Post", category: "Event Creative", image: "https://raw.githubusercontent.com/FactoJanrenzo/PortfolioSimpleModern/main/PorfolioSite%20Janrenzo/assets/portfolio/mothers-day.jpg" },
  { title: "Empowerment Night", category: "Church Event", image: "https://raw.githubusercontent.com/FactoJanrenzo/PortfolioSimpleModern/main/PorfolioSite%20Janrenzo/assets/portfolio/empowerment-night.jpg" },
  { title: "Leaders Convergence", category: "Event Branding", image: "https://raw.githubusercontent.com/FactoJanrenzo/PortfolioSimpleModern/main/PorfolioSite%20Janrenzo/assets/portfolio/leaders-convergence.jpg" },
  { title: "Power Night", category: "Social Media", image: "https://raw.githubusercontent.com/FactoJanrenzo/PortfolioSimpleModern/main/PorfolioSite%20Janrenzo/assets/portfolio/power-night.jpg" },
];

const websitePortfolio = [
  { title: "Clinic Growth Landing Page", type: "Healthcare / Wellness", accent: "from-lime-300 to-emerald-400", meta: "WordPress • GHL • Lead Form" },
  { title: "Real Estate Brand Funnel", type: "Real Estate", accent: "from-orange-500 to-amber-300", meta: "Elementor • SEO • API Support" },
  { title: "Service Business Website", type: "Local Business", accent: "from-sky-400 to-lime-300", meta: "Responsive • CTA • PageSpeed" },
];

const clientTestimonials = [
  { role: "Marketing Lead", company: "Health & Wellness Brand", quote: "Janrenzo helped us turn a basic service page into a cleaner landing page with stronger CTA flow and better mobile structure." },
  { role: "Business Owner", company: "Local Service Company", quote: "The website felt more premium after the redesign. The layout was clearer, faster to browse, and easier for clients to contact us." },
  { role: "Agency Partner", company: "Digital Marketing Team", quote: "He understood both design and implementation. That made the handoff easier because the pages were not just nice-looking — they were usable." },
  { role: "Project Coordinator", company: "Real Estate Campaign", quote: "The frontend updates, page layout, and funnel direction helped us move quickly without losing brand consistency." },
  { role: "Founder", company: "Online Coaching Offer", quote: "He organized the content, built the page flow, and made the offer easier to understand. Communication was straightforward." },
  { role: "Operations Lead", company: "Client Acquisition System", quote: "The GHL workflow support made our lead process smoother. Forms, calendar, and follow-up logic were easier to manage." },
];

function ArrowIcon({ className = "" }) {
  return <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7" /><path d="M7 7h10v10" /></svg>;
}

function PlayIcon({ className = "" }) {
  return <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="m10 8 6 4-6 4V8Z" /></svg>;
}

function MailIcon({ className = "" }) {
  return <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-10 6L2 7" /></svg>;
}

function ToolGlyph({ type = "code", className = "" }) {
  const paths = {
    code: <><path d="m8 9-4 3 4 3" /><path d="m16 9 4 3-4 3" /><path d="m14 5-4 14" /></>,
    design: <><path d="M12 3 4 7l8 4 8-4-8-4Z" /><path d="M4 12l8 4 8-4" /><path d="M4 17l8 4 8-4" /></>,
    funnel: <><path d="M4 5h16l-6 7v5l-4 2v-7L4 5Z" /></>,
    speed: <><path d="M4 13a8 8 0 1 1 16 0" /><path d="m13 13 4-4" /><path d="M12 13h.01" /></>,
  };

  return <svg className={className} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[type]}</svg>;
}

function Button({ children, variant = "primary", className = "", as: Component = "button", ...props }) {
  const styles = variant === "outline" ? "border border-white/20 bg-white/5 text-white hover:bg-white hover:text-black" : "bg-lime-300 text-black hover:bg-white";
  return <Component className={`inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-black uppercase tracking-[0.12em] transition ${styles} ${className}`} {...props}>{children}</Component>;
}

function CustomCursor() {
  const outerRef = useRef(null);
  const labelRef = useRef(null);
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
        {isActive && <span ref={labelRef} className="text-[10px] font-black uppercase tracking-[0.22em]">{cursorMode === "view" ? "View" : "Click"}</span>}
      </div>
      <div className="absolute left-0 top-0 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/25 transition-transform duration-300" />
    </div>
  );
}

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const body = document.body;
      const scrollTop = window.scrollY || doc.scrollTop || body.scrollTop || 0;
      const scrollHeight = Math.max(
        body.scrollHeight,
        doc.scrollHeight,
        body.offsetHeight,
        doc.offsetHeight,
        body.clientHeight,
        doc.clientHeight
      );
      const viewportHeight = window.innerHeight || doc.clientHeight;
      const maxScroll = Math.max(1, scrollHeight - viewportHeight);
      const distanceToBottom = Math.max(0, maxScroll - scrollTop);
      const bottomThreshold = Math.max(220, viewportHeight * 0.24);
      const boostedProgress = (scrollTop + viewportHeight * 0.18) / maxScroll;
      const currentProgress = distanceToBottom <= bottomThreshold ? 1 : Math.min(1, Math.max(0, boostedProgress));
      setProgress(currentProgress);
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

function HeroParticleField() {
  const particles = useMemo(() => Array.from({ length: 42 }, (_, index) => {
    const x = (index * 37) % 100;
    const wave = 45 + Math.sin(index * 0.62) * 15;
    const y = Math.max(8, Math.min(86, wave + ((index % 9) - 4) * 3.5));
    const size = 1 + (index % 6) * 0.75;
    const delay = (index % 12) * -0.45;
    const drift = ((index % 7) - 3) * 10;
    const opacity = 0.18 + (index % 5) * 0.11;
    return { x, y, size, delay, drift, opacity };
  }), []);

  return (
    <div className="hero-particle-field absolute inset-0 overflow-hidden">
      <div className="hero-noise absolute inset-0" />
      <div className="hero-wave absolute left-[-8%] top-[28%] h-[46%] w-[116%] rotate-[-2deg] rounded-[50%] bg-white/[0.045] blur-[26px]" />
      <div className="hero-wave hero-wave-two absolute left-[-10%] top-[38%] h-[32%] w-[120%] rotate-[3deg] rounded-[50%] bg-lime-300/[0.055] blur-[34px]" />
      {particles.map((particle, index) => (
        <span
          key={index}
          className="hero-dot absolute rounded-full bg-white"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            '--delay': `${particle.delay}s`,
            '--drift': `${particle.drift}px`,
          }}
        />
      ))}
    </div>
  );
}

function ToolMarquee({ items, reverse = false }) {
  const doubled = [...items, ...items, ...items];
  return (
    <div className="overflow-hidden py-2">
      <div className={`flex w-max gap-3 ${reverse ? "animate-[marqueeReverse_26s_linear_infinite]" : "animate-[marquee_28s_linear_infinite]"}`}>
        {doubled.map((tool, index) => (
          <span key={`${tool}-${index}`} className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white/75 backdrop-blur transition hover:border-lime-300/50 hover:text-lime-200">
            {tool}
          </span>
        ))}
      </div>
    </div>
  );
}

function HeroScrollAccents() {
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

function HeroParallaxAccents() {
  return <HeroScrollAccents />;
}

function HeroAwards() {
  return (
    <div className="hero-awards relative z-20 mx-auto mt-8 hidden w-full max-w-4xl grid-cols-3 gap-5 text-center md:grid">
      {[
        ["5+", "Years WordPress"],
        ["GHL", "Funnels + CRM"],
        ["SEO", "Speed + Structure"],
      ].map(([value, label]) => (
        <div key={label} className="rounded-[1.6rem] border border-white/10 bg-black/40 px-6 py-5 shadow-2xl backdrop-blur-xl">
          <p className="text-4xl font-black tracking-[-0.06em] text-lime-300">{value}</p>
          <p className="mt-2 text-xs font-black uppercase tracking-[0.24em] text-white/45">{label}</p>
        </div>
      ))}
    </div>
  );
}

function StudioRoomBackground() {
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

function ScrollRevealText({ text, className = "mx-auto max-w-6xl text-center text-4xl font-black leading-[1.02] tracking-[-0.06em] sm:text-6xl lg:text-8xl", activeClass = "text-white", inactiveClass = "text-white/12" }) {
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

function OrbitingProfessionVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[420px]">
      {/* MOBILE VERSION — clean, no orbit cards, no eclipse */}
      <div className="relative mx-auto grid aspect-square w-full max-w-[280px] place-items-center overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-2xl backdrop-blur-xl sm:hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(163,230,53,0.22),transparent_42%),radial-gradient(circle_at_80%_20%,rgba(249,115,22,0.16),transparent_34%)]" />

        <div className="absolute inset-[10%] rounded-full border border-dashed border-white/10" />
        <div className="absolute inset-[22%] rounded-full border border-white/10" />

        <div className="relative z-10 grid aspect-square w-[58%] min-w-[145px] place-items-center rounded-full bg-black shadow-[0_0_70px_rgba(190,252,53,0.18)] ring-1 ring-lime-300/10">
          <div className="text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.42em] text-lime-300">
              Creative
            </p>

            <h3 className="mt-3 text-3xl font-black tracking-[-0.08em] text-white">
              Builder
            </h3>

            <p className="mt-4 text-[10px] font-black uppercase tracking-[0.22em] text-white/40">
              Web • GHL • SEO
            </p>
          </div>
        </div>
      </div>

      {/* TABLET / DESKTOP VERSION — orbit effect only on bigger screens */}
      <div className="relative mx-auto hidden h-[460px] w-full max-w-[420px] place-items-center overflow-hidden rounded-[3rem] border border-white/10 bg-white/[0.035] p-6 shadow-2xl backdrop-blur-xl sm:grid">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(163,230,53,0.22),transparent_38%),radial-gradient(circle_at_80%_20%,rgba(249,115,22,0.22),transparent_32%)]" />

        <div className="absolute h-[82%] w-[82%] rounded-full border border-dashed border-white/15" />
        <div className="absolute h-[62%] w-[62%] rounded-full border border-white/10" />

        <div className="orbit-ring absolute grid h-[76%] w-[76%] place-items-center rounded-full">
          {creativeOrbitItems.map((item, index) => {
            const angle = (360 / creativeOrbitItems.length) * index;

            return (
              <div
                key={item.label}
                className="absolute left-1/2 top-1/2"
                style={{
                  transform: `rotate(${angle}deg) translateX(150px)`,
                }}
              >
                <div className="orbit-counter -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-white/10 bg-black/70 px-4 py-3 text-center shadow-2xl backdrop-blur-xl">
                  <p className="text-lg font-black text-lime-300">
                    {item.symbol}
                  </p>
                  <p className="mt-1 text-[9px] font-black uppercase tracking-[0.2em] text-white/45">
                    {item.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="relative z-10 grid aspect-square w-[44%] min-w-[165px] place-items-center rounded-full bg-black shadow-[0_0_80px_rgba(190,252,53,0.18)] ring-1 ring-lime-300/10">
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-[0.45em] text-lime-300">
              Creative
            </p>

            <h3 className="mt-3 text-4xl font-black tracking-[-0.08em] text-white">
              Builder
            </h3>

            <p className="mt-4 text-xs font-black uppercase tracking-[0.24em] text-white/40">
              Web • GHL • SEO
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function HistoryTimeline() {
  return (
    <section id="history" className="relative bg-[#090909] px-5 py-24 text-white sm:px-8 lg:px-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(163,230,53,0.10),transparent_34%),radial-gradient(circle_at_85%_80%,rgba(249,115,22,0.10),transparent_30%)]" />
      <div className="relative mb-12 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-lime-300">Work History</p>
          <ScrollRevealText text="Previous work that shaped my execution." className="text-5xl font-black leading-[0.9] tracking-[-0.07em] sm:text-7xl" />
        </div>
        <p className="max-w-2xl text-lg leading-relaxed text-white/55">A focused career snapshot showing where my WordPress, GoHighLevel, frontend, SEO, design, and campaign experience comes from.</p>
      </div>
      <div className="relative grid gap-5">
        {professionalHistory.map((item, index) => (
          <article key={item.role} className="glass-card group grid gap-6 rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl transition hover:border-lime-300/30 md:grid-cols-[180px_1fr] md:p-8">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-orange-400">{item.period}</p>
              <p className="mt-4 text-5xl font-black text-white/10">0{index + 1}</p>
            </div>
            <div>
              <p className="mb-2 text-sm font-black uppercase tracking-[0.22em] text-lime-300">{item.company}</p>
              <h3 className="text-3xl font-black tracking-[-0.05em]">{item.role}</h3>
              <p className="mt-4 max-w-4xl text-lg leading-relaxed text-white/55">{item.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ExperienceReviewSection() {
  return (
    <section className="relative overflow-hidden bg-[#0b0b0b] px-5 py-24 text-white sm:px-8 lg:px-12">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:84px_84px] opacity-25" />
      <div className="relative mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-orange-400">Experience Review</p>
          <ScrollRevealText text="A premium client experience, not just a good-looking page." className="max-w-4xl text-5xl font-black leading-[0.9] tracking-[-0.07em] sm:text-7xl" />
        </div>
        <div className="rounded-full border border-white/10 bg-white/[0.045] px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-white/60 backdrop-blur-xl">Glass UI System</div>
      </div>
      <div className="relative grid gap-5 md:grid-cols-3">
        {experienceReviews.map((review) => (
          <article key={review.title} className="glass-card min-h-[330px] rounded-[2rem] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl transition hover:border-lime-300/30 hover:bg-white/[0.07]">
            <div className="mb-10 flex items-center justify-between">
              <span className="text-sm font-black uppercase tracking-[0.28em] text-lime-300">{review.score}</span>
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/35">★★★★★</span>
            </div>
            <h3 className="text-3xl font-black leading-none tracking-[-0.05em]">{review.title}</h3>
            <p className="mt-5 leading-relaxed text-white/55">{review.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ClientTestimonialsSection() {
  return (
    <section className="relative overflow-hidden bg-[#050505] px-5 py-24 text-white sm:px-8 lg:px-12">
      <StudioRoomBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/60 to-black" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-14 grid gap-8 border-t border-white/10 pt-6 lg:grid-cols-[0.7fr_1.3fr_0.2fr] lg:items-start">
          <div className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full border-2 border-orange-500" />
            <p className="text-xs font-black uppercase tracking-[0.32em] text-white/75">Client Experience</p>
          </div>
          <ScrollRevealText text="Realistic feedback a client should feel after working with me." className="text-center text-4xl font-black leading-[1.05] tracking-[-0.05em] sm:text-6xl lg:text-7xl" />
          <p className="text-right text-sm font-black text-orange-500">08</p>
        </div>
        <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
          {clientTestimonials.map((item, index) => (
            <article key={`${item.role}-${index}`} className="group">
              <div className="glass-card rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-7 backdrop-blur-xl transition group-hover:border-orange-500/40 group-hover:bg-white/[0.06]">
                <div className="mb-5 flex gap-2 text-orange-500">
                  {Array.from({ length: 5 }).map((_, star) => <span key={star} className="h-2 w-2 rounded-full border border-current" />)}
                </div>
                <p className="text-lg leading-relaxed text-white/70">“{item.quote}”</p>
              </div>
              <div className="mt-5 flex items-center gap-4 pl-7">
                <div className="grid h-14 w-14 place-items-center rounded-full bg-lime-300 text-sm font-black text-black">{String(index + 1).padStart(2, "0")}</div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-500">{item.role}</p>
                  <p className="mt-1 text-lg font-black tracking-[-0.03em]">{item.company}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-10 max-w-3xl text-sm leading-relaxed text-white/35">Note: These are placeholder client-style reviews for presentation only. Replace them with verified testimonials once your portfolio is ready to publish.</p>
      </div>
    </section>
  );
}

function GeneratedPortfolioVisual({ item, compact = false }) {
  const title = item?.title || "Portfolio Preview";
  const category = item?.category || item?.type || "Website Preview";
  const meta = item?.meta || "WordPress • Design • Lead Flow";

  return (
    <div className={`relative h-full min-h-[260px] w-full overflow-hidden rounded-[1.5rem] bg-[#111] ${compact ? "aspect-[4/3]" : "aspect-[16/10]"}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(163,230,53,0.32),transparent_28%),radial-gradient(circle_at_80%_22%,rgba(249,115,22,0.25),transparent_25%),linear-gradient(135deg,#111_0%,#050505_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:42px_42px] opacity-35" />
      <div className="absolute left-6 right-6 top-6 flex items-center justify-between rounded-full border border-white/10 bg-black/35 px-4 py-3 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-orange-500" />
          <span className="h-3 w-3 rounded-full bg-lime-300" />
          <span className="h-3 w-3 rounded-full bg-white/30" />
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.24em] text-white/45">Generated Preview</span>
      </div>
      <div className="absolute bottom-6 left-6 right-6">
        <p className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-lime-300">{category}</p>
        <h3 className="max-w-xl text-4xl font-black leading-none tracking-[-0.07em] text-white sm:text-5xl">{title}</h3>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {meta.split("•").map((label) => (
            <span key={label} className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-3 text-center text-[10px] font-black uppercase tracking-[0.18em] text-white/55 backdrop-blur-xl">{label.trim()}</span>
          ))}
        </div>
      </div>
      <div className="absolute right-8 top-1/2 hidden h-40 w-40 -translate-y-1/2 rounded-full border border-lime-300/20 bg-lime-300/10 blur-[1px] sm:block" />
      <div className="absolute right-14 top-1/2 hidden h-24 w-24 -translate-y-1/2 rounded-full border border-white/15 sm:block" />
    </div>
  );
}

function PortfolioImageCard({ item, onOpen }) {
  const [imageLoaded, setImageLoaded] = useState(true);

  return (
    <article className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-3 backdrop-blur-xl transition hover:border-lime-300/35 hover:bg-white/[0.06]" data-cursor="project">
      <button type="button" onClick={() => onOpen({ ...item, imageLoaded })} className="block w-full overflow-hidden rounded-[1.5rem] bg-black text-left">
        {imageLoaded ? (
          <img src={item.image} alt={item.title} onError={() => setImageLoaded(false)} className="aspect-[4/3] h-full w-full object-contain bg-black transition duration-700 group-hover:scale-[1.02]" loading="lazy" />
        ) : (
          <GeneratedPortfolioVisual item={item} compact />
        )}
      </button>
      <div className="p-5">
        <p className="mb-2 text-xs font-black uppercase tracking-[0.24em] text-orange-400">{item.category}</p>
        <div className="flex items-center justify-between gap-5">
          <h3 className="text-2xl font-black tracking-[-0.05em]">{item.title}</h3>
          <button type="button" onClick={() => onOpen({ ...item, imageLoaded })} className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/10 text-white/65 transition hover:border-lime-300 hover:text-lime-300"><ArrowIcon /></button>
        </div>
      </div>
    </article>
  );
}

function WebsiteMockup({ item, index, onOpen }) {
  return (
    <button type="button" onClick={() => onOpen({ ...item, generated: true, category: item.type })} className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 text-left backdrop-blur-xl transition hover:border-lime-300/35 hover:bg-white/[0.06]" data-cursor="project">
      <div className="overflow-hidden rounded-[1.4rem] border border-white/10 bg-[#101010]">
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-orange-500" />
          <span className="h-3 w-3 rounded-full bg-lime-300" />
          <span className="h-3 w-3 rounded-full bg-white/30" />
          <span className="ml-auto rounded-full bg-black/50 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/35">Open Preview</span>
        </div>
        <GeneratedPortfolioVisual item={{ ...item, category: item.type }} compact />
      </div>
      <div className="pt-6">
        <p className="mb-2 text-xs font-black uppercase tracking-[0.24em] text-lime-300">{item.type}</p>
        <h3 className="text-2xl font-black tracking-[-0.05em]">{item.title}</h3>
        <p className="mt-3 text-sm text-white/45">{item.meta}</p>
      </div>
    </button>
  );
}

function PreviewModal({ activePreview, onClose }) {
  const [modalImageLoaded, setModalImageLoaded] = useState(true);
  const [modalImageReady, setModalImageReady] = useState(false);

  useEffect(() => {
    setModalImageLoaded(true);
    setModalImageReady(false);
  }, [activePreview]);

  useEffect(() => {
    if (!activePreview) return;

    const body = document.body;
    const html = document.documentElement;
    const originalBodyOverflow = body.style.overflow;
    const originalHtmlOverflow = html.style.overflow;
    const originalBodyOverscroll = body.style.overscrollBehavior;
    const originalHtmlOverscroll = html.style.overscrollBehavior;

    body.style.overflow = "hidden";
    html.style.overflow = "hidden";
    body.style.overscrollBehavior = "none";
    html.style.overscrollBehavior = "none";

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      body.style.overflow = originalBodyOverflow;
      html.style.overflow = originalHtmlOverflow;
      body.style.overscrollBehavior = originalBodyOverscroll;
      html.style.overscrollBehavior = originalHtmlOverscroll;
    };
  }, [activePreview, onClose]);

  if (!activePreview || typeof document === "undefined") return null;

  const showGenerated = activePreview.generated || !activePreview.image || activePreview.imageLoaded === false || !modalImageLoaded;

  return createPortal(
    <div className="portfolio-modal fixed inset-0 z-[2147483647] flex items-center justify-center bg-black/95 p-4 backdrop-blur-2xl sm:p-6" onMouseDown={onClose} role="dialog" aria-modal="true">
      <div className="relative flex h-[min(92vh,900px)] w-full max-w-[1180px] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0b0b] p-3 shadow-2xl sm:p-4" onMouseDown={(event) => event.stopPropagation()}>
        <div className="flex shrink-0 items-center justify-between gap-4 px-2 pb-3 sm:px-3">
          <div className="min-w-0">
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-lime-300">{activePreview.category || activePreview.type}</p>
            <h3 className="mt-1 truncate text-lg font-black tracking-[-0.04em] text-white sm:text-2xl">{activePreview.title}</h3>
          </div>
          <button type="button" onMouseDown={(event) => { event.stopPropagation(); onClose(); }} aria-label="Close preview" className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-xl font-black text-black transition hover:bg-lime-300">×</button>
        </div>

        <div className="portfolio-modal-stage relative grid min-h-0 flex-1 place-items-center overflow-hidden rounded-[1.5rem] bg-black p-3 sm:p-5">
          {!showGenerated && !modalImageReady && (
            <div className="absolute inset-0 grid place-items-center text-xs font-black uppercase tracking-[0.28em] text-white/35">Loading Preview</div>
          )}
          {showGenerated ? (
            <div className="h-full max-h-[calc(92vh-120px)] w-full max-w-[980px]">
              <GeneratedPortfolioVisual item={activePreview} />
            </div>
          ) : (
            <img
              src={activePreview.image}
              alt={activePreview.title}
              onLoad={() => setModalImageReady(true)}
              onError={() => setModalImageLoaded(false)}
              className={`block h-auto max-h-[calc(92vh-120px)] w-auto max-w-full rounded-[1.2rem] object-contain transition-opacity duration-300 ${modalImageReady ? "opacity-100" : "opacity-0"}`}
            />
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

function PortfolioShowcaseSection() {
  const [activePreview, setActivePreview] = useState(null);
  const closePreview = useCallback(() => setActivePreview(null), []);

  return (
    <section id="portfolio-gallery" className="relative overflow-hidden bg-[#090909] px-5 py-24 text-white sm:px-8 lg:px-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(163,230,53,0.12),transparent_30%),radial-gradient(circle_at_90%_60%,rgba(249,115,22,0.10),transparent_30%)]" />
      <div className="relative mb-12 grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-lime-300">Portfolio Gallery</p>
          <ScrollRevealText text="Graphic design and website preview work." className="text-5xl font-black leading-[0.9] tracking-[-0.07em] sm:text-7xl" />
        </div>
        <p className="max-w-2xl text-lg leading-relaxed text-white/55">A visual section for your homepage and portfolio page. Clients can preview designs, view images, and understand your range across websites, creatives, funnels, and social graphics.</p>
      </div>

      <div className="relative mb-14 grid gap-5 lg:grid-cols-3">
        {websitePortfolio.map((item, index) => <WebsiteMockup key={item.title} item={item} index={index} onOpen={setActivePreview} />)}
      </div>

      <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {portfolioGraphics.map((item) => <PortfolioImageCard key={item.title} item={item} onOpen={setActivePreview} />)}
      </div>

      <PreviewModal activePreview={activePreview} onClose={closePreview} />
    </section>
  );
}

function ContactForm() {
  const [formStatus, setFormStatus] = useState("idle");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("form-name", "contact");

    setFormStatus("sending");

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      });

      if (!response.ok) throw new Error("Form submission failed");

      setFormStatus("success");
      form.reset();
      window.location.href = "/thank-you.html";
    } catch (error) {
      setFormStatus("error");
    }
  };

  return (
    <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit} className="space-y-4 text-left">
      <input type="hidden" name="form-name" value="contact" />
      <p style={{ position: "absolute", overflow: "hidden", clip: "rect(0 0 0 0)", height: "1px", width: "1px", margin: "-1px", padding: 0, border: 0 }}>
        <label>Don’t fill this out if you’re human: <input name="bot-field" tabIndex="-1" autoComplete="off" /></label>
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="group block">
          <span className="mb-2 block text-xs font-black uppercase tracking-[0.24em] text-white/40">Name</span>
          <input name="name" required placeholder="Your full name" className="w-full rounded-3xl border border-white/10 bg-white/[0.04] px-5 py-4 text-white outline-none transition placeholder:text-white/25 focus:border-lime-300/60 focus:bg-white/[0.07]" />
        </label>
        <label className="group block">
          <span className="mb-2 block text-xs font-black uppercase tracking-[0.24em] text-white/40">Email</span>
          <input name="email" type="email" required placeholder="you@example.com" className="w-full rounded-3xl border border-white/10 bg-white/[0.04] px-5 py-4 text-white outline-none transition placeholder:text-white/25 focus:border-lime-300/60 focus:bg-white/[0.07]" />
        </label>
      </div>

      <label className="group block">
        <span className="mb-2 block text-xs font-black uppercase tracking-[0.24em] text-white/40">Subject</span>
        <input name="subject" required placeholder="Website redesign, landing page, GHL setup..." className="w-full rounded-3xl border border-white/10 bg-white/[0.04] px-5 py-4 text-white outline-none transition placeholder:text-white/25 focus:border-lime-300/60 focus:bg-white/[0.07]" />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="group block">
          <span className="mb-2 block text-xs font-black uppercase tracking-[0.24em] text-white/40">Project Type</span>
          <select name="projectType" className="w-full rounded-3xl border border-white/10 bg-[#121212] px-5 py-4 text-white outline-none transition focus:border-lime-300/60 focus:bg-[#171717]">
            <option>WordPress Website</option>
            <option>Landing Page</option>
            <option>GoHighLevel Funnel</option>
            <option>SEO / Speed Optimization</option>
            <option>Frontend Customization</option>
          </select>
        </label>
        <label className="group block">
          <span className="mb-2 block text-xs font-black uppercase tracking-[0.24em] text-white/40">Budget Range</span>
          <select name="budget" className="w-full rounded-3xl border border-white/10 bg-[#121212] px-5 py-4 text-white outline-none transition focus:border-lime-300/60 focus:bg-[#171717]">
            <option>Still planning</option>
            <option>$300 - $700</option>
            <option>$700 - $1,500</option>
            <option>$1,500+</option>
          </select>
        </label>
      </div>

      <label className="group block">
        <span className="mb-2 block text-xs font-black uppercase tracking-[0.24em] text-white/40">Project Details</span>
        <textarea name="message" required rows="6" placeholder="Tell me about your website, funnel, timeline, goals, and what you want to improve." className="w-full resize-none rounded-[2rem] border border-white/10 bg-white/[0.04] px-5 py-4 text-white outline-none transition placeholder:text-white/25 focus:border-lime-300/60 focus:bg-white/[0.07]" />
      </label>

      {formStatus === "success" && (
        <div className="rounded-3xl border border-lime-300/30 bg-lime-300/10 px-5 py-4 text-sm font-bold text-lime-200">
          Message sent successfully. I’ll review your inquiry and respond as soon as possible.
        </div>
      )}

      {formStatus === "error" && (
        <div className="rounded-3xl border border-red-400/30 bg-red-500/10 px-5 py-4 text-sm font-bold text-red-200">
          Something went wrong. Please email me directly at janrenzofacto@gmail.com.
        </div>
      )}

      <button type="submit" disabled={formStatus === "sending"} className="group inline-flex w-full items-center justify-center rounded-full bg-lime-300 px-8 py-5 text-sm font-black uppercase tracking-[0.14em] text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">
        {formStatus === "sending" ? "Sending..." : "Send Message"} <ArrowIcon className="ml-2 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
      </button>
    </form>
  );
}

export default function JanrenzoPortfolio() {
  const mainRef = useRef(null);
  const heroRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [navScrolled, setNavScrolled] = useState(false);
  const filteredItems = useMemo(() => activeFilter === "All" ? portfolioItems : portfolioItems.filter((item) => item.category === activeFilter), [activeFilter]);

  const navLinks = [
    { label: "Portfolio", href: "/portfolio" },
    { label: "Work", href: "#work" },
    { label: "Tools", href: "#tools" },
    { label: "Services", href: "#services" },
    { label: "Process", href: "#process" },
    { label: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let rafId = null;

    const updateHeroProgress = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const maxTravel = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / maxTravel));
      heroRef.current.style.setProperty("--hero-progress", progress.toFixed(3));
      heroRef.current.style.setProperty("--hero-content-y", `${progress * -16}vh`);
      heroRef.current.style.setProperty("--hero-text-y", `${progress * -7}vh`);
      heroRef.current.style.setProperty("--hero-card-x", `${progress * -5}vw`);
      heroRef.current.style.setProperty("--hero-card-y", `${progress * -9}vh`);
      heroRef.current.style.setProperty("--hero-card-scale", `${1 - progress * 0.05}`);
      heroRef.current.style.setProperty("--hero-main-opacity", `${Math.max(0.62, 1 - progress * 0.24)}`);
      heroRef.current.style.setProperty("--hero-awards-opacity", `${Math.min(1, Math.max(0, (progress - 0.18) * 4.2))}`);
      heroRef.current.style.setProperty("--hero-awards-y", `${Math.max(0, (1 - progress) * 34)}px`);
      rafId = null;
    };

    const requestUpdate = () => {
      if (!rafId) rafId = requestAnimationFrame(updateHeroProgress);
    };

    updateHeroProgress();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll("section:not(:first-child), article, .motion-card"));
    targets.forEach((target, index) => {
      target.classList.add("reveal-on-scroll");
      target.style.setProperty("--delay", `${Math.min(index * 35, 240)}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
          else entry.target.classList.remove("is-visible");
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [activeFilter]);

  return (
    <main ref={mainRef} className="portfolio-page min-h-screen cursor-none overflow-hidden bg-[#090909] text-white" style={{ fontFamily: 'Space Grotesk, Inter, Arial Black, Helvetica Neue, sans-serif' }}>
      <CustomCursor />
      <ScrollToTopButton />
      <nav
        className={`site-header fixed top-4 z-[999] flex items-center justify-between border px-5 backdrop-blur-2xl transition-all duration-500 ${navScrolled ? "rounded-full border-white/10 bg-black/80 py-3 shadow-2xl shadow-black/60" : "rounded-[2rem] border-white/10 bg-white/[0.035] py-4"}`}
        style={{ left: "50%", width: navScrolled ? "min(calc(100vw - 2rem), 1120px)" : "min(calc(100vw - 2rem), 1480px)" }}
      >
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-lime-300 font-black text-black">JF</div>
          <div><p className="text-sm font-semibold leading-none">Janrenzo Facto</p><p className="mt-1 text-xs text-white/45">Freelance Web Designer</p></div>
        </div>
        <div className="hidden items-center gap-7 text-sm text-white/65 md:flex">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="transition hover:text-white">
              {link.label}
            </a>
          ))}
        </div>

        <details className="group relative md:hidden">
          <summary className="grid h-11 w-11 cursor-pointer list-none place-items-center rounded-full border border-white/10 bg-white/[0.06] text-xl font-black text-white [&::-webkit-details-marker]:hidden">
            <span className="group-open:hidden">☰</span>
            <span className="hidden group-open:block">×</span>
          </summary>

          <div className="absolute right-0 top-[calc(100%+0.75rem)] z-[999] w-[min(82vw,320px)] rounded-[1.75rem] border border-white/10 bg-black/95 p-3 shadow-2xl backdrop-blur-2xl">
            <nav className="grid gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="rounded-2xl px-4 py-3 text-sm font-black uppercase tracking-[0.14em] text-white/70 transition hover:bg-white/10 hover:text-lime-300"
                >
                  {link.label}
                </a>
              ))}

              <a
                href="#contact"
                className="mt-2 rounded-full bg-lime-300 px-4 py-4 text-center text-sm font-black uppercase tracking-[0.14em] text-black"
              >
                Hire Me
              </a>
            </nav>
          </div>
        </details>

      </nav>
      <section ref={heroRef} className="hero-section relative min-h-screen overflow-hidden px-5 pb-16 pt-28 sm:px-8 lg:px-12 lg:pt-32" style={{ "--hero-progress": 0, "--hero-content-y": "0vh", "--hero-text-y": "0vh", "--hero-card-x": "0vw", "--hero-card-y": "0vh", "--hero-card-scale": 1, "--hero-main-opacity": 1, "--hero-awards-opacity": 0, "--hero-awards-y": "90px" }}>
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(163,230,53,0.10),transparent_28%),radial-gradient(circle_at_78%_30%,rgba(249,115,22,0.08),transparent_24%),linear-gradient(135deg,#070707_0%,#111111_46%,#040404_100%)]" />
          <HeroParticleField />
          <HeroScrollAccents />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/55 to-transparent" />
        </div>

        <div className="hero-sticky relative z-10 flex min-h-[calc(100vh-9rem)] flex-col">
          <div className="hero-content relative z-10 grid flex-1 items-center gap-8 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="hero-text-block animate-[fadeUp_0.7s_ease-out_both]">
              <div className="mb-7 flex items-center gap-3 text-xs font-black uppercase tracking-[0.26em] text-lime-300/90">
                <span className="h-px w-10 bg-lime-300/70" />
                Available Worldwide for Freelance Projects
              </div>
              <h1 className="hero-headline text-[12vw] font-black uppercase leading-[0.86] tracking-[-0.08em] sm:text-[8.2vw] lg:text-[5.8vw] xl:text-[5.25vw]">
                <span className="hero-word-box"><span>Websites</span></span>
                <span className="hero-word-box hero-word-box-light"><span>That Sell.</span></span>
                <span className="hero-word-box hero-word-box-muted"><span>Systems</span></span>
                <span className="hero-word-box hero-word-box-muted"><span>That Scale.</span></span>
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/65 sm:text-xl">I help businesses turn their websites, funnels, and automations into clean, fast, conversion-focused digital systems — from sitemap to layout, content, build, launch, and optimization.</p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row"><Button as="a" href="#portfolio-gallery">View My Work <PlayIcon className="ml-2" /></Button><Button as="a" href="#contact" variant="outline">Let’s Build Your Site</Button></div>
            </div>

            <div className="hero-card-shell relative animate-[fadeUp_0.7s_ease-out_0.15s_both]">
              <div className="absolute -inset-6 rounded-[3rem] bg-white/5 blur-[70px]" />
              <div className="hero-project-card relative overflow-hidden rounded-[2.3rem] border border-white/10 bg-black/35 p-4 shadow-2xl backdrop-blur-xl">
                <div className="relative min-h-[380px] overflow-hidden rounded-[1.8rem] bg-[#151515] lg:min-h-[460px]">
                  <img src={profileImage} alt="Janrenzo Facto profile" className="absolute inset-0 h-full w-full object-cover object-[center_32%] scale-100 grayscale-[10%]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/10" />
                  <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/45 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-white/70 backdrop-blur-xl">Digital Portfolio</div>
                  <div className="absolute bottom-5 left-5 right-5 rounded-[1.5rem] border border-white/10 bg-black/55 p-5 backdrop-blur-xl">
                    <div className="flex items-center justify-between gap-5">
                      <div>
                        <p className="text-sm font-black uppercase tracking-[0.22em] text-lime-300">Hire for project</p>
                        <p className="mt-2 text-2xl font-black tracking-[-0.05em]">WordPress • GHL • SEO</p>
                      </div>
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/15 text-white/70"><ArrowIcon /></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <HeroAwards />
        </div>
      </section>

      <div className="overflow-hidden border-y border-white/10 bg-lime-300 py-5 text-black"><div className="flex animate-[marquee_18s_linear_infinite] gap-12 whitespace-nowrap text-3xl font-black uppercase tracking-[-0.04em] sm:text-5xl">{Array.from({ length: 8 }).map((_, index) => <span key={index}>WordPress • GHL • Funnels • SEO • Frontend • Speed •</span>)}</div></div>

      <section className="bg-[#090909] px-5 py-28 sm:px-8 lg:px-12">
        <p className="mb-8 text-center text-xs uppercase tracking-[0.45em] text-lime-300">Scroll Story</p>
        <ScrollRevealText text="I build premium websites with strategy, speed, automation, and conversion in mind — so your online presence does more than look good." />
      </section>

      <section id="tools" className="border-y border-white/10 bg-[#0d0d0d] px-5 py-20 sm:px-8 lg:px-12">
        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div><p className="mb-4 text-xs uppercase tracking-[0.4em] text-lime-300">Tools & Stack</p><ScrollRevealText text="The tools I use to build, launch, and optimize." className="max-w-3xl text-5xl font-black leading-[0.9] tracking-[-0.06em] sm:text-7xl" /></div>
          <p className="max-w-xl text-lg leading-relaxed text-white/55">A moving toolkit section to quickly show clients your WordPress, funnel, SEO, frontend, and design capability.</p>
        </div>
        <div className="space-y-3"><ToolMarquee items={toolsTop} /><ToolMarquee items={toolsBottom} reverse /></div>
      </section>

      <section className="relative overflow-hidden bg-[#090909] px-5 py-24 text-white sm:px-8 lg:px-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(249,115,22,0.16),transparent_26%),radial-gradient(circle_at_85%_70%,rgba(163,230,53,0.14),transparent_30%)]" />
        <div className="relative grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-3 w-3 rounded-full border-2 border-orange-500" />
              <p className="text-xs font-black uppercase tracking-[0.38em] text-white/70">Why Choose Me?</p>
            </div>
            <ScrollRevealText text="Brands and clients — take a look at the systems I can build." className="max-w-4xl text-5xl font-black leading-[0.9] tracking-[-0.07em] sm:text-7xl" />
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              <div className="glass-card rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl">
                <p className="text-4xl font-black text-lime-300">5+</p>
                <p className="mt-2 text-sm font-black uppercase tracking-[0.2em] text-white/35">Years WordPress</p>
                <p className="mt-5 text-white/55">Experienced in Elementor, Divi, Kadence, Beaver Builder, Avada, Enfold, ACF, speed, and SEO structure.</p>
              </div>
              <div className="glass-card rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl">
                <p className="text-4xl font-black text-orange-400">360°</p>
                <p className="mt-2 text-sm font-black uppercase tracking-[0.2em] text-white/35">Digital Execution</p>
                <p className="mt-5 text-white/55">From layout and copy direction to GHL funnels, CRM workflows, frontend tweaks, and launch support.</p>
              </div>
              <div className="glass-card rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl md:col-span-2">
                <p className="text-2xl font-black tracking-[-0.04em]">Not just design — a conversion-ready web system.</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {['Developer', 'Graphic Designer', 'Video Editor'].map((item) => <span key={item} className="rounded-full border border-white/10 bg-black/30 px-4 py-3 text-center text-xs font-black uppercase tracking-[0.16em] text-white/55">{item}</span>)}
                </div>
              </div>
            </div>
          </div>
          <OrbitingProfessionVisual />
        </div>
      </section>

      <PortfolioShowcaseSection />

      <section id="work" className="px-5 py-24 sm:px-8 lg:px-12">
        <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"><div><p className="mb-4 text-xs uppercase tracking-[0.4em] text-lime-300">Selected Work</p><ScrollRevealText text="Creative builds with business purpose." className="max-w-4xl text-5xl font-black leading-[0.9] tracking-[-0.06em] sm:text-7xl" /></div><div className="flex max-w-xl flex-wrap gap-2">{filters.map((filter) => <button key={filter} onClick={() => setActiveFilter(filter)} className={`rounded-full border px-4 py-2 text-sm transition ${activeFilter === filter ? "border-white bg-white text-black" : "border-white/15 bg-white/[0.03] text-white/60 hover:text-white"}`}>{filter}</button>)}</div></div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{filteredItems.map((item) => <article key={item.title} className="group relative flex min-h-[360px] flex-col justify-between overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 transition hover:bg-white/[0.07]"><div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-lime-300/0 blur-3xl transition group-hover:bg-lime-300/15" /><div><div className="mb-8 flex items-start justify-between"><span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/60">{item.category}</span><ArrowIcon className="text-white/35 transition group-hover:text-lime-300" /></div><h3 className="mb-5 text-3xl font-black leading-none tracking-[-0.04em]">{item.title}</h3><p className="leading-relaxed text-white/55">{item.description}</p></div><div className="border-t border-white/10 pt-10 text-sm text-white/40">{item.meta}</div></article>)}</div>
      </section>

      <section id="services" className="rounded-t-[3rem] bg-white px-5 py-24 text-black sm:px-8 lg:px-12">
        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]"><div className="lg:sticky lg:top-8"><p className="mb-4 text-xs uppercase tracking-[0.4em] text-black/45">What I Do</p><ScrollRevealText text="Websites, funnels, and digital systems." className="text-5xl font-black leading-[0.9] tracking-[-0.07em] sm:text-7xl" activeClass="text-black" inactiveClass="text-black/15" /><p className="mt-7 text-lg leading-relaxed text-black/60">I combine design, frontend, SEO structure, and automation thinking so your online presence looks premium and works harder.</p></div><div className="grid gap-4 sm:grid-cols-2">{services.map((service, index) => <div key={service.title} className="group flex min-h-[320px] flex-col justify-between overflow-hidden rounded-[2rem] border border-black/10 bg-black/[0.03] p-7 transition hover:bg-black/[0.055]"><div className="relative mb-8 grid h-28 place-items-center rounded-[1.5rem] bg-black text-lime-300"><div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(163,230,53,0.22),transparent_58%)]" /><ToolGlyph type={index === 0 ? 'design' : index === 1 ? 'funnel' : index === 2 ? 'speed' : 'code'} className="relative z-10 transition group-hover:scale-110" /></div><div><h3 className="mb-4 text-2xl font-black tracking-[-0.04em]">{service.title}</h3><p className="leading-relaxed text-black/60">{service.text}</p></div></div>)}</div></div>
      </section>

      <HistoryTimeline />

      <section id="process" className="bg-white px-5 py-24 text-black sm:px-8 lg:px-12"><div className="relative overflow-hidden rounded-[3rem] bg-[#090909] p-6 text-white sm:p-10 lg:p-14"><div className="absolute right-0 top-0 h-[480px] w-[480px] rounded-full bg-lime-300/15 blur-[130px]" /><div className="relative grid gap-12 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="mb-4 text-xs uppercase tracking-[0.4em] text-lime-300">Process</p><ScrollRevealText text="Simple steps. Strong execution." className="text-5xl font-black leading-[0.9] tracking-[-0.07em] sm:text-7xl" /></div><div className="space-y-3">{process.map((step, index) => <div key={step} className="flex items-center gap-5 rounded-3xl border border-white/10 bg-white/[0.04] p-5"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-lime-300 font-black text-black">{String(index + 1).padStart(2, "0")}</span><p className="text-xl font-semibold tracking-tight">{step}</p></div>)}</div></div></div></section>

      <ClientTestimonialsSection />

      <ExperienceReviewSection />

      <section className="bg-white px-5 py-24 text-black sm:px-8 lg:px-12"><div className="grid gap-5 lg:grid-cols-3"><div className="flex min-h-[420px] flex-col justify-between rounded-[2rem] bg-lime-300 p-8 lg:col-span-1"><p className="text-sm uppercase tracking-[0.35em] text-black/55">Why Work With Me</p><ScrollRevealText text="Clean design. Clear strategy. Fast execution." className="text-5xl font-black leading-[0.9] tracking-[-0.07em]" activeClass="text-black" inactiveClass="text-black/20" /></div><div className="grid gap-5 sm:grid-cols-2 lg:col-span-2">{["I can own the full website process from planning to launch.", "I understand both design and technical implementation.", "I build with conversion, speed, and SEO structure in mind.", "I can support WordPress, GoHighLevel, frontend, and creative assets."].map((text) => <div key={text} className="flex items-start gap-4 rounded-[2rem] border border-black/10 p-7"><span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-black text-sm text-lime-300">✓</span><p className="text-xl font-semibold leading-snug">{text}</p></div>)}</div></div></section>

      <section className="bg-white px-5 py-24 text-black sm:px-8 lg:px-12">
        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative overflow-hidden rounded-[3rem] bg-[#090909] p-8 text-white sm:p-12 lg:p-16">
            <div className="absolute -right-20 -top-20 h-[360px] w-[360px] rounded-full bg-lime-300/20 blur-[100px]" />
            <div className="relative">
              <p className="mb-5 text-xs uppercase tracking-[0.4em] text-lime-300">Quick Contact</p>
              <ScrollRevealText text="Got a website idea? Let’s turn it into something premium." className="max-w-4xl text-5xl font-black leading-[0.9] tracking-[-0.07em] sm:text-7xl" />
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/60">Use the contact page below to send your project details. When this goes live on Netlify, submissions can be saved in your dashboard and sent to your email.</p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a href="#contact" className="inline-flex items-center justify-center rounded-full bg-lime-300 px-8 py-4 text-sm font-black uppercase tracking-[0.12em] text-black transition hover:bg-white">Start a Project <ArrowIcon className="ml-2" /></a>
                <a href="mailto:janrenzofacto@gmail.com" className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:bg-white hover:text-black"><MailIcon className="mr-2" /> Email Me</a>
              </div>
            </div>
          </div>
          <div className="rounded-[3rem] border border-black/10 bg-lime-300 p-8 sm:p-10">
            <p className="mb-12 text-xs font-black uppercase tracking-[0.35em] text-black/50">Response Flow</p>
            <div className="space-y-5">
              {["You send your project details", "I review the scope and goals", "We align on timeline and deliverables", "I build, optimize, and launch"].map((item, index) => (
                <div key={item} className="flex items-center gap-4 rounded-3xl bg-black/[0.06] p-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-black font-black text-lime-300">{String(index + 1).padStart(2, "0")}</span>
                  <p className="text-lg font-black leading-tight tracking-[-0.03em]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="relative bg-[#090909] px-5 py-24 text-white sm:px-8 lg:px-12">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-10%] top-10 h-[480px] w-[480px] rounded-full bg-lime-300/10 blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-10%] h-[520px] w-[520px] rounded-full bg-white/5 blur-[120px]" />
        </div>
        <div className="relative grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="lg:sticky lg:top-8">
            <p className="mb-5 text-xs uppercase tracking-[0.4em] text-lime-300">Contact Page</p>
            <ScrollRevealText text="Let’s build your next website." className="text-6xl font-black leading-[0.85] tracking-[-0.08em] sm:text-8xl" />
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/60">Fill out the form with your project details, preferred timeline, and the kind of website or funnel you need. This section is designed to become your dedicated contact page when we package the site for Netlify.</p>
            <div className="mt-10 grid gap-3">
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5"><p className="text-xs uppercase tracking-[0.28em] text-white/35">Primary Service</p><p className="mt-2 text-xl font-black">WordPress + GHL Website Systems</p></div>
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5"><p className="text-xs uppercase tracking-[0.28em] text-white/35">Availability</p><p className="mt-2 text-xl font-black text-lime-200">Available Worldwide</p></div>
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5"><p className="text-xs uppercase tracking-[0.28em] text-white/35">Email</p><p className="mt-2 break-all text-xl font-black">janrenzofacto@gmail.com</p></div>
            </div>
          </div>
          <div className="rounded-[3rem] border border-white/10 bg-white/[0.045] p-5 shadow-2xl backdrop-blur-xl sm:p-8 lg:p-10">
            <div className="mb-8 flex flex-col gap-3 border-b border-white/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.32em] text-white/35">Project Inquiry</p>
                <h3 className="mt-3 text-3xl font-black tracking-[-0.05em] sm:text-4xl">Tell me what you need.</h3>
              </div>
              <span className="w-fit rounded-full border border-lime-300/30 bg-lime-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-lime-200">Netlify Ready</span>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="bg-[#090909] px-5 pb-24 text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl border-t border-white/10 pt-12">
          <div className="mb-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.4em] text-lime-300">FAQ</p>
              <ScrollRevealText text="Before we start, here are answers clients usually ask." className="text-5xl font-black leading-[0.9] tracking-[-0.07em] sm:text-7xl" />
            </div>
            <p className="max-w-2xl text-lg leading-relaxed text-white/55">This keeps the contact page more complete and reduces friction before clients send an inquiry.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ["What services do you offer?", "WordPress website design, Elementor/Divi builds, GoHighLevel funnels, CRM workflows, frontend customization, SEO structure, and speed cleanup."],
              ["Can you work on existing websites?", "Yes. I can redesign, improve performance, fix layout issues, optimize content flow, or build new sections into an existing WordPress site."],
              ["Do you handle GHL automations?", "Yes. I can set up forms, funnels, pipelines, calendars, triggers, email/SMS workflows, and lead follow-up systems."],
              ["How do we start?", "Send your project details through the form, then I’ll review your goals, scope, timeline, and the best setup for your website or funnel."],
            ].map(([question, answer]) => (
              <div key={question} className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-7 backdrop-blur-xl">
                <h3 className="text-2xl font-black tracking-[-0.04em]">{question}</h3>
                <p className="mt-4 leading-relaxed text-white/55">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="relative overflow-hidden border-t border-white/10 bg-black px-5 py-10 text-white sm:px-8 lg:px-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(190,255,47,0.10),transparent_28%)]" />
        <div className="relative mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-lime-300 font-black text-black">JF</div>
              <div>
                <p className="text-sm font-black tracking-[-0.02em]">Janrenzo Facto</p>
                <p className="text-xs uppercase tracking-[0.22em] text-white/35">Web Design • WordPress • GHL • Available Worldwide</p>
              </div>
            </div>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-white/55 md:text-right">
            © 2026 Janrenzo Facto. Crafted with strategy, speed, and conversion for digital growth. All rights reserved.
          </p>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');

        @media (min-width: 1024px) {
          .portfolio-page, .portfolio-page * { cursor: none !important; }
        }

        .portfolio-page h1,
        .portfolio-page h2,
        .portfolio-page h3 {
          font-stretch: condensed;
          text-wrap: balance;
        }

        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(44px) scale(0.985);
          filter: blur(10px);
          transition: opacity 900ms cubic-bezier(.16,1,.3,1), transform 900ms cubic-bezier(.16,1,.3,1), filter 900ms cubic-bezier(.16,1,.3,1);
          transition-delay: var(--delay, 0ms);
        }

        .reveal-on-scroll.is-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
          filter: blur(0);
        }

        .portfolio-page article,
        .portfolio-page button,
        .portfolio-page a {
          will-change: transform;
        }

        .portfolio-page article:hover {
          transform: translateY(-10px) rotate(-0.35deg);
          transition: transform 350ms cubic-bezier(.16,1,.3,1), background 350ms ease, border-color 350ms ease;
        }

        .portfolio-page button:hover,
        .portfolio-page a:hover {
          transform: translateY(-2px);
        }

        .portfolio-page img {
          transition: transform 700ms cubic-bezier(.16,1,.3,1);
        }

        .portfolio-page [data-cursor='project'] img:hover {
          transform: scale(1.025);
        }

        html { scroll-behavior: smooth; }

        .hero-section {
          contain: layout paint;
        }

        .hero-sticky {
          isolation: isolate;
        }

        .hero-content {
          transform: translateZ(0);
          opacity: 1;
          will-change: auto;
        }

        .hero-headline {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.06em;
        }

        .hero-word-box {
          position: relative;
          display: inline-flex;
          overflow: hidden;
          padding: 0.015em 0.06em 0.045em;
          margin-left: -0.06em;
          border-radius: 0.12em;
          border: 1px solid rgba(255,255,255,0.08);
          background: linear-gradient(110deg, rgba(255,255,255,0.07), rgba(255,255,255,0.015));
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.08), 0 28px 70px rgba(0,0,0,0.28);
          backdrop-filter: blur(12px);
        }

        .hero-word-box span {
          display: inline-block;
          animation: heroTextReveal 900ms cubic-bezier(.16,1,.3,1) both;
        }

        .hero-word-box:nth-child(2) span { animation-delay: 90ms; }
        .hero-word-box:nth-child(3) span { animation-delay: 180ms; }
        .hero-word-box:nth-child(4) span { animation-delay: 270ms; }

        .hero-word-box::after {
          content: "";
          position: absolute;
          inset: 0;
          transform: translateX(-120%);
          background: linear-gradient(90deg, transparent, rgba(190,255,70,0.18), transparent);
          animation: heroBoxSweep 4.8s ease-in-out infinite;
        }

        .hero-word-box-light {
          color: #fff;
        }

        .hero-word-box-muted {
          color: rgba(255,255,255,0.35);
        }

        .hero-text-block {
          transform: translateZ(0);
          will-change: auto;
        }

        .hero-card-shell {
          transform: translateZ(0);
          will-change: auto;
          transform-origin: center;
        }

        .hero-awards {
          opacity: 1;
          transform: translateZ(0);
          will-change: auto;
        }

        .hero-particle-field {
          transform: translateZ(0);
        }

        .hero-parallax {
          transform-style: preserve-3d;
        }

        .hero-layer,
        .hero-wireframe {
          will-change: transform, opacity;
        }

        .hero-layer-one {
          transform: translate3d(-18px, -12px, 0) rotate(-4deg);
          animation: heroLayerPulse 8s ease-in-out infinite;
        }

        .hero-layer-two {
          transform: translate3d(24px, 16px, 0) rotate(2deg);
          animation: heroLayerPulse 9s ease-in-out infinite reverse;
        }

        .hero-layer-three {
          transform: translate3d(-12px, 20px, 0) rotate(3deg);
          animation: heroLayerPulse 10s ease-in-out infinite;
        }

        .hero-wireframe {
          transform: translate3d(32px, -18px, 0) rotate(10deg);
          animation: wireframeSpin 28s linear infinite;
        }

        .hero-wireframe-two {
          transform: translate3d(44px, -22px, 0) rotate(-8deg);
          animation-direction: reverse;
          animation-duration: 34s;
        }

        .hero-noise {
          opacity: 0.22;
          background-image: radial-gradient(circle, rgba(255,255,255,0.38) 1px, transparent 1px);
          background-size: 22px 22px;
          mask-image: radial-gradient(ellipse at center, black 0%, black 48%, transparent 78%);
        }

        .hero-dot {
          animation: particleFloat 10s ease-in-out infinite;
          animation-delay: var(--delay);
          transform: translate3d(0,0,0);
        }

        .hero-wave {
          animation: waveShift 10s ease-in-out infinite alternate;
          transform: translate3d(0,0,0) rotate(-2deg);
        }

        .hero-wave-two {
          animation-duration: 13s;
          transform: translate3d(0,0,0) rotate(3deg);
        }

        .hero-project-card {
          transform: translateZ(0);
        }

        @keyframes heroTextReveal {
          from { transform: translateY(110%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes heroBoxSweep {
          0%, 46%, 100% { transform: translateX(-120%); }
          62% { transform: translateX(120%); }
        }

        @keyframes heroLayerPulse {
          0%, 100% { opacity: 0.35; filter: blur(0); }
          50% { opacity: 0.82; filter: blur(0.2px); }
        }

        @keyframes wireframeSpin {
          from { rotate: 0deg; }
          to { rotate: 360deg; }
        }

        @keyframes particleFloat {
          0%, 100% { transform: translate3d(0,0,0) scale(1); opacity: 0.18; }
          50% { transform: translate3d(var(--drift), -12px, 0) scale(1.18); opacity: 0.62; }
        }

        @keyframes waveShift {
          from { transform: translate3d(-2%, 0, 0) rotate(-2deg) scaleX(1); opacity: 0.55; }
          to { transform: translate3d(2%, -20px, 0) rotate(2deg) scaleX(1.04); opacity: 0.85; }
        }

        @keyframes heroCardFloat {
          0%, 100% { transform: translate3d(0,0,0); }
          50% { transform: translate3d(0,-12px,0); }
        }

        @keyframes heroDrift {
          from { transform: translateY(0); opacity: 1; }
          to { transform: translateY(-92px); opacity: 0.42; }
        }

        .site-header {
          transform: translate3d(-50%, 0, 0);
          will-change: width, border-radius, background, box-shadow;
          box-sizing: border-box;
        }

        .scroll-top {
          color: #fff;
        }

        .scroll-top:hover span:last-child {
          background: #befb2f;
        }

        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-900px); } }
        @keyframes marqueeReverse { from { transform: translateX(-900px); } to { transform: translateX(0); } }

        .hero-code-line {
          animation: linePulse 4.5s ease-in-out infinite;
        }

        .hero-code-line-two {
          animation-delay: 1.2s;
        }

        @keyframes linePulse {
          0%, 100% { opacity: 0.25; transform: scaleX(0.86); }
          50% { opacity: 1; transform: scaleX(1); }
        }
        .glass-card {
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.08), 0 24px 80px rgba(0,0,0,0.25);
          -webkit-backdrop-filter: blur(18px);
          backdrop-filter: blur(18px);
        }

        .orbit-ring {
          animation: orbitSpin 18s linear infinite;
          transform-origin: center;
        }

        .orbit-counter {
          animation: orbitCounterSpin 18s linear infinite;
          transform-origin: center;
        }

        @media (max-width: 640px) {
          .orbit-ring > div { transform: rotate(var(--angle, 0deg)) translateX(112px) !important; }
        }

        @keyframes orbitSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes orbitCounterSpin { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(-360deg); } }
        @media (prefers-reduced-motion: reduce) {
          .hero-content,
          .hero-dot,
          .hero-wave,
          .hero-project-card,
          .hero-layer,
          .hero-wireframe,
          .orbit-ring,
          .orbit-counter {
            animation: none !important;
          }
        }

        @keyframes fadeUp { from { opacity: 0; transform: translateY(26px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </main>
  );
}
