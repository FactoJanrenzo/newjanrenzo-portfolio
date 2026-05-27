import { useEffect, useRef, useState } from "react";
import {
  navLinks,
  profileImage,
  services,
  toolsTop,
  websitePortfolio,
  whyWorkWithMe,
} from "../data/siteContent";
import Button from "../components/Button";
import { GeneratedPortfolioVisual } from "../components/PortfolioShowcase";
import { ArrowIcon, PlayIcon, ToolGlyph } from "../components/Icons";
import {
  CustomCursor,
  HeroAwards,
  HeroParticleField,
  HeroScrollAccents,
  ScrollToTopButton,
} from "../components/PageEffects";
import "../styles/portfolioAnimations.css";

function Header({ navScrolled }) {
  return (
    <nav
      className={`site-header fixed top-4 z-[999] flex items-center justify-between border px-5 backdrop-blur-2xl transition-all duration-500 ${navScrolled ? "rounded-full border-white/10 bg-black/80 py-3 shadow-2xl shadow-black/60" : "rounded-[2rem] border-white/10 bg-white/[0.035] py-4"}`}
      style={{
        left: "50%",
        width: navScrolled
          ? "min(calc(100vw - 2rem), 1120px)"
          : "min(calc(100vw - 2rem), 1480px)",
      }}
    >
      <a href="/" className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-full bg-lime-300 font-black text-black">
          JF
        </div>
        <div>
          <p className="text-sm font-semibold leading-none">Janrenzo Facto</p>
          <p className="mt-1 text-xs text-white/45">
            Freelance Web Designer
          </p>
        </div>
      </a>

      <div className="hidden items-center gap-7 text-sm text-white/65 md:flex">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="transition hover:text-white"
          >
            {link.label}
          </a>
        ))}
      </div>

      <details className="group relative md:hidden">
        <summary className="grid h-11 w-11 cursor-pointer list-none place-items-center rounded-full border border-white/10 bg-white/[0.06] text-xs font-black uppercase tracking-[0.08em] text-white [&::-webkit-details-marker]:hidden">
          <span className="group-open:hidden">Menu</span>
          <span className="hidden group-open:block">x</span>
        </summary>
        <div className="absolute right-0 top-[calc(100%+0.75rem)] z-[999] w-[min(82vw,320px)] rounded-[1.75rem] border border-white/10 bg-black/95 p-3 shadow-2xl backdrop-blur-2xl">
          <div className="grid gap-2">
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
              href="/contact"
              className="mt-2 rounded-full bg-lime-300 px-4 py-4 text-center text-sm font-black uppercase tracking-[0.14em] text-black"
            >
              Hire Me
            </a>
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
      style={{
        "--hero-progress": 0,
        "--hero-content-y": "0vh",
        "--hero-text-y": "0vh",
        "--hero-card-x": "0vw",
        "--hero-card-y": "0vh",
        "--hero-card-scale": 1,
        "--hero-main-opacity": 1,
        "--hero-awards-opacity": 0,
        "--hero-awards-y": "90px",
      }}
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
            <div className="mb-7 flex items-center gap-3 text-xs font-black uppercase tracking-[0.26em] text-lime-300/90">
              <span className="h-px w-10 bg-lime-300/70" />
              Available Worldwide for Freelance Projects
            </div>
            <h1 className="hero-headline text-[12vw] font-black uppercase leading-[0.86] tracking-[-0.08em] sm:text-[8.2vw] lg:text-[5.8vw] xl:text-[5.25vw]">
              <span className="hero-word-box">
                <span>Websites</span>
              </span>
              <span className="hero-word-box hero-word-box-light">
                <span>That Sell.</span>
              </span>
              <span className="hero-word-box hero-word-box-muted">
                <span>Systems</span>
              </span>
              <span className="hero-word-box hero-word-box-muted">
                <span>That Scale.</span>
              </span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/65 sm:text-xl">
              I build fast, premium websites, WordPress pages, GoHighLevel
              funnels, and conversion-ready digital systems for businesses that
              want more clarity and better leads.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button as="a" href="/contact">
                Start a Project <PlayIcon className="ml-2" />
              </Button>
              <Button as="a" href="#featured-work" variant="outline">
                View Featured Work
              </Button>
            </div>
          </div>

          <div className="hero-card-shell relative animate-[fadeUp_0.7s_ease-out_0.15s_both]">
            <div className="absolute -inset-6 rounded-[3rem] bg-white/5 blur-[70px]" />
            <div className="hero-project-card relative overflow-hidden rounded-[2.3rem] border border-white/10 bg-black/35 p-4 shadow-2xl backdrop-blur-xl">
              <div className="relative min-h-[380px] overflow-hidden rounded-[1.8rem] bg-[#151515] lg:min-h-[460px]">
                <img
                  src={profileImage}
                  alt="Janrenzo Facto profile"
                  className="absolute inset-0 h-full w-full scale-100 object-cover object-[center_32%] grayscale-[10%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/10" />
                <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/45 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-white/70 backdrop-blur-xl">
                  Digital Portfolio
                </div>
                <div className="absolute bottom-5 left-5 right-5 rounded-[1.5rem] border border-white/10 bg-black/55 p-5 backdrop-blur-xl">
                  <div className="flex items-center justify-between gap-5">
                    <div>
                      <p className="text-sm font-black uppercase tracking-[0.22em] text-lime-300">
                        Hire for project
                      </p>
                      <p className="mt-2 text-2xl font-black tracking-[-0.05em]">
                        WordPress / GHL / SEO
                      </p>
                    </div>
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/15 text-white/70">
                      <ArrowIcon />
                    </span>
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

function ToolStripSection() {
  const compactTools = toolsTop.slice(0, 10);

  return (
    <section className="border-y border-white/10 bg-lime-300 px-5 py-6 text-black sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-black/60">
          Tools I build with
        </p>
        <div className="flex flex-wrap gap-2">
          {compactTools.map((tool) => (
            <span
              key={tool}
              className="rounded-full border border-black/10 bg-black/[0.06] px-4 py-2 text-xs font-black uppercase tracking-[0.14em]"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesPreviewSection() {
  return (
    <section id="services" className="bg-[#090909] px-5 py-24 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.4em] text-lime-300">
              Services
            </p>
            <h2 className="max-w-3xl text-5xl font-black leading-[0.9] tracking-[-0.06em] sm:text-7xl">
              What I can build for you.
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-relaxed text-white/55">
            A focused preview of the work clients usually hire me for. The
            deeper story, process, and background live on the About page.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <article
              key={service.title}
              className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl transition hover:border-lime-300/35 hover:bg-white/[0.07]"
            >
              <div className="mb-8 grid h-14 w-14 place-items-center rounded-2xl bg-lime-300 text-black">
                <ToolGlyph type={service.iconType} />
              </div>
              <h3 className="text-2xl font-black tracking-[-0.04em]">
                {service.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-white/55">
                {service.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedWorkSection() {
  return (
    <section
      id="featured-work"
      className="relative overflow-hidden bg-white px-5 py-24 text-black sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-4 text-xs font-black uppercase tracking-[0.35em] text-black/45">
              Featured Work
            </p>
            <h2 className="max-w-3xl text-5xl font-black leading-[0.9] tracking-[-0.06em] sm:text-7xl">
              Website systems with clear business purpose.
            </h2>
          </div>
          <Button as="a" href="/portfolio" className="w-fit">
            Full Portfolio <ArrowIcon className="ml-2" />
          </Button>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {websitePortfolio.map((item) => (
            <article
              key={item.title}
              className="rounded-[2rem] border border-black/10 bg-black/[0.03] p-4 transition hover:-translate-y-1 hover:bg-black/[0.055]"
            >
              <GeneratedPortfolioVisual
                item={{ ...item, category: item.type }}
                compact
              />
              <div className="p-4">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-lime-700">
                  {item.type}
                </p>
                <h3 className="mt-3 text-2xl font-black tracking-[-0.05em]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm font-semibold text-black/50">
                  {item.meta}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProofSection() {
  return (
    <section className="bg-[#090909] px-5 py-24 text-white sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-lime-300">
            Why Work With Me
          </p>
          <h2 className="text-5xl font-black leading-[0.9] tracking-[-0.06em] sm:text-7xl">
            Clean design, clear strategy, fast execution.
          </h2>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/55">
            I understand both the visual side and the technical side, so the
            site does more than look polished. It has structure, speed, and a
            clear path for leads.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Button as="a" href="/about">
              About Me <ArrowIcon className="ml-2" />
            </Button>
            <Button as="a" href="/contact" variant="outline">
              Hire Me
            </Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {whyWorkWithMe.map((item) => (
            <div
              key={item}
              className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl"
            >
              <span className="mb-8 grid h-10 w-10 place-items-center rounded-full bg-lime-300 font-black text-black">
                +
              </span>
              <p className="text-xl font-semibold leading-snug">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCtaSection() {
  return (
    <section className="bg-lime-300 px-5 py-20 text-black sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="mb-4 text-xs font-black uppercase tracking-[0.35em] text-black/55">
            Ready to build?
          </p>
          <h2 className="max-w-4xl text-5xl font-black leading-[0.9] tracking-[-0.06em] sm:text-7xl">
            Send the project details and I will help shape the next step.
          </h2>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <a
            href="/contact"
            className="inline-flex justify-center rounded-full bg-black px-8 py-4 text-sm font-black uppercase tracking-[0.12em] text-lime-300 transition hover:bg-white hover:text-black"
          >
            Contact Me
          </a>
          <a
            href="/portfolio"
            className="inline-flex justify-center rounded-full border border-black/20 px-8 py-4 text-sm font-black uppercase tracking-[0.12em] text-black transition hover:bg-black hover:text-white"
          >
            View Work
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black px-5 py-10 text-white sm:px-8 lg:px-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(190,255,47,0.10),transparent_28%)]" />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-lime-300 font-black text-black">
            JF
          </div>
          <div>
            <p className="text-sm font-black tracking-[-0.02em]">
              Janrenzo Facto
            </p>
            <p className="text-xs uppercase tracking-[0.22em] text-white/35">
              Web Design / WordPress / GHL / Available Worldwide
            </p>
          </div>
        </div>
        <p className="max-w-xl text-sm leading-relaxed text-white/55 md:text-right">
          (c) 2026 Janrenzo Facto. Crafted with strategy, speed, and conversion
          for digital growth. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default function JanrenzoPortfolio() {
  const heroRef = useRef(null);
  const [navScrolled, setNavScrolled] = useState(false);

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
  }, []);

  return (
    <main
      className="portfolio-page min-h-screen cursor-none overflow-hidden bg-[#090909] text-white"
      style={{
        fontFamily:
          "Space Grotesk, Inter, Arial Black, Helvetica Neue, sans-serif",
      }}
    >
      <CustomCursor />
      <ScrollToTopButton />
      <Header navScrolled={navScrolled} />
      <HeroSection heroRef={heroRef} />
      <ToolStripSection />
      <ServicesPreviewSection />
      <FeaturedWorkSection />
      <ProofSection />
      <FinalCtaSection />
      <Footer />
    </main>
  );
}
