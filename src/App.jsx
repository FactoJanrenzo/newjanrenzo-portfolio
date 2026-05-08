import { useEffect, useMemo, useRef, useState } from "react";
import {
  filters,
  navLinks,
  portfolioItems,
  profileImage,
} from "./data/siteContent";
import Button from "./components/Button";
import PortfolioShowcaseSection from "./components/PortfolioShowcase";
import ScrollRevealText from "./components/ScrollRevealText";
import { ArrowIcon, PlayIcon } from "./components/Icons";
import {
  CustomCursor,
  HeroAwards,
  HeroParticleField,
  HeroScrollAccents,
  ScrollToTopButton,
} from "./components/PageEffects";
import {
  ClientTestimonialsSection,
  ContactSection,
  ExperienceReviewSection,
  FaqSection,
  HistoryTimeline,
  ProcessSection,
  QuickContactSection,
  ServicesSection,
  ToolsSection,
  WhyChooseSection,
  WhyWorkWithMeSection,
} from "./components/Sections";
import "./styles/portfolioAnimations.css";

function Header({ navScrolled }) {
  return (
    <nav
      className={`site-header fixed top-4 z-[999] flex items-center justify-between border px-5 backdrop-blur-2xl transition-all duration-500 ${navScrolled ? "rounded-full border-white/10 bg-black/80 py-3 shadow-2xl shadow-black/60" : "rounded-[2rem] border-white/10 bg-white/[0.035] py-4"}`}
      style={{ left: "50%", width: navScrolled ? "min(calc(100vw - 2rem), 1120px)" : "min(calc(100vw - 2rem), 1480px)" }}
    >
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-full bg-lime-300 font-black text-black">JF</div>
        <div><p className="text-sm font-semibold leading-none">Janrenzo Facto</p><p className="mt-1 text-xs text-white/45">Freelance Web Designer</p></div>
      </div>

      <div className="hidden items-center gap-7 text-sm text-white/65 md:flex">
        {navLinks.map((link) => <a key={link.label} href={link.href} className="transition hover:text-white">{link.label}</a>)}
      </div>

      <details className="group relative md:hidden">
        <summary className="grid h-11 w-11 cursor-pointer list-none place-items-center rounded-full border border-white/10 bg-white/[0.06] text-xl font-black text-white [&::-webkit-details-marker]:hidden">
          <span className="group-open:hidden">☰</span>
          <span className="hidden group-open:block">x</span>
        </summary>
        <div className="absolute right-0 top-[calc(100%+0.75rem)] z-[999] w-[min(82vw,320px)] rounded-[1.75rem] border border-white/10 bg-black/95 p-3 shadow-2xl backdrop-blur-2xl">
          <div className="grid gap-2">
            {navLinks.map((link) => <a key={link.label} href={link.href} className="rounded-2xl px-4 py-3 text-sm font-black uppercase tracking-[0.14em] text-white/70 transition hover:bg-white/10 hover:text-lime-300">{link.label}</a>)}
            <a href="/contact" className="mt-2 rounded-full bg-lime-300 px-4 py-4 text-center text-sm font-black uppercase tracking-[0.14em] text-black">Hire Me</a>
          </div>
        </div>
      </details>
    </nav>
  );
}

function HeroSection({ heroRef }) {
  return (
    <section
      ref={heroRef}
      className="hero-section relative min-h-screen overflow-hidden px-5 pb-16 pt-28 sm:px-8 lg:px-12 lg:pt-32"
      style={{ "--hero-progress": 0, "--hero-content-y": "0vh", "--hero-text-y": "0vh", "--hero-card-x": "0vw", "--hero-card-y": "0vh", "--hero-card-scale": 1, "--hero-main-opacity": 1, "--hero-awards-opacity": 0, "--hero-awards-y": "90px" }}
    >
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
            <div className="mb-7 flex items-center gap-3 text-xs font-black uppercase tracking-[0.26em] text-lime-300/90"><span className="h-px w-10 bg-lime-300/70" />Available Worldwide for Freelance Projects</div>
            <h1 className="hero-headline text-[12vw] font-black uppercase leading-[0.86] tracking-[-0.08em] sm:text-[8.2vw] lg:text-[5.8vw] xl:text-[5.25vw]">
              <span className="hero-word-box"><span>Websites</span></span>
              <span className="hero-word-box hero-word-box-light"><span>That Sell.</span></span>
              <span className="hero-word-box hero-word-box-muted"><span>Systems</span></span>
              <span className="hero-word-box hero-word-box-muted"><span>That Scale.</span></span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/65 sm:text-xl">I help businesses turn their websites, funnels, and automations into clean, fast, conversion-focused digital systems, from sitemap to layout, content, build, launch, and optimization.</p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row"><Button as="a" href="#portfolio-gallery">View My Work <PlayIcon className="ml-2" /></Button><Button as="a" href="/contact" variant="outline">Let's Build Your Site</Button></div>
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
                    <div><p className="text-sm font-black uppercase tracking-[0.22em] text-lime-300">Hire for project</p><p className="mt-2 text-2xl font-black tracking-[-0.05em]">WordPress / GHL / SEO</p></div>
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
  );
}

function SelectedWorkSection({ activeFilter, setActiveFilter, filteredItems }) {
  return (
    <section id="work" className="px-5 py-24 sm:px-8 lg:px-12">
      <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div><p className="mb-4 text-xs uppercase tracking-[0.4em] text-lime-300">Selected Work</p><ScrollRevealText text="Creative builds with business purpose." className="max-w-4xl text-5xl font-black leading-[0.9] tracking-[-0.06em] sm:text-7xl" /></div>
        <div className="flex max-w-xl flex-wrap gap-2">{filters.map((filter) => <button key={filter} onClick={() => setActiveFilter(filter)} className={`rounded-full border px-4 py-2 text-sm transition ${activeFilter === filter ? "border-white bg-white text-black" : "border-white/15 bg-white/[0.03] text-white/60 hover:text-white"}`}>{filter}</button>)}</div>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredItems.map((item) => (
          <article key={item.title} className="group relative flex min-h-[360px] flex-col justify-between overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 transition hover:bg-white/[0.07]">
            <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-lime-300/0 blur-3xl transition group-hover:bg-lime-300/15" />
            <div><div className="mb-8 flex items-start justify-between"><span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/60">{item.category}</span><ArrowIcon className="text-white/35 transition group-hover:text-lime-300" /></div><h3 className="mb-5 text-3xl font-black leading-none tracking-[-0.04em]">{item.title}</h3><p className="leading-relaxed text-white/55">{item.description}</p></div>
            <div className="border-t border-white/10 pt-10 text-sm text-white/40">{item.meta}</div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black px-5 py-10 text-white sm:px-8 lg:px-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(190,255,47,0.10),transparent_28%)]" />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-full bg-lime-300 font-black text-black">JF</div><div><p className="text-sm font-black tracking-[-0.02em]">Janrenzo Facto</p><p className="text-xs uppercase tracking-[0.22em] text-white/35">Web Design / WordPress / GHL / Available Worldwide</p></div></div>
        <p className="max-w-xl text-sm leading-relaxed text-white/55 md:text-right">© 2026 Janrenzo Facto. Crafted with strategy, speed, and conversion for digital growth. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default function JanrenzoPortfolio() {
  const mainRef = useRef(null);
  const heroRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [navScrolled, setNavScrolled] = useState(false);
  const filteredItems = useMemo(() => activeFilter === "All" ? portfolioItems : portfolioItems.filter((item) => item.category === activeFilter), [activeFilter]);

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
      (entries) => entries.forEach((entry) => entry.target.classList.toggle("is-visible", entry.isIntersecting)),
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [activeFilter]);

  return (
    <main ref={mainRef} className="portfolio-page min-h-screen cursor-none overflow-hidden bg-[#090909] text-white" style={{ fontFamily: "Space Grotesk, Inter, Arial Black, Helvetica Neue, sans-serif" }}>
      <CustomCursor />
      <ScrollToTopButton />
      <Header navScrolled={navScrolled} />
      <HeroSection heroRef={heroRef} />
      <div className="overflow-hidden border-y border-white/10 bg-lime-300 py-5 text-black"><div className="flex animate-[marquee_18s_linear_infinite] gap-12 whitespace-nowrap text-3xl font-black uppercase tracking-[-0.04em] sm:text-5xl">{Array.from({ length: 8 }).map((_, index) => <span key={index}>WordPress / GHL / Funnels / SEO / Frontend / Speed /</span>)}</div></div>
      <section className="bg-[#090909] px-5 py-28 sm:px-8 lg:px-12"><p className="mb-8 text-center text-xs uppercase tracking-[0.45em] text-lime-300">Scroll Story</p><ScrollRevealText text="I build premium websites with strategy, speed, automation, and conversion in mind, so your online presence does more than look good." /></section>
      <ToolsSection />
      <WhyChooseSection />
      <PortfolioShowcaseSection />
      <SelectedWorkSection activeFilter={activeFilter} setActiveFilter={setActiveFilter} filteredItems={filteredItems} />
      <ServicesSection />
      <HistoryTimeline />
      <ProcessSection />
      <ClientTestimonialsSection />
      <ExperienceReviewSection />
      <WhyWorkWithMeSection />
      <QuickContactSection />
      <ContactSection />
      <FaqSection />
      <Footer />
    </main>
  );
}
