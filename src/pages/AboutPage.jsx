import { Link } from "react-router-dom";
import { profileImage } from "../data/siteContent";
import PageHeader from "../components/PageHeader";
import {
  ClientTestimonialsSection,
  ExperienceReviewSection,
  FaqSection,
  HistoryTimeline,
  ProcessSection,
  QuickContactSection,
  ServicesSection,
  ToolsSection,
  WhyChooseSection,
  WhyWorkWithMeSection,
} from "../components/Sections";

function AboutHero() {
  const skills = ["WordPress", "GoHighLevel", "Frontend", "SEO", "Design"];

  return (
    <section className="relative overflow-hidden px-5 pb-20 pt-32 text-white sm:px-8 lg:px-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_15%,rgba(163,230,53,0.15),transparent_28%),radial-gradient(circle_at_86%_20%,rgba(249,115,22,0.12),transparent_24%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="mb-5 text-xs font-black uppercase tracking-[0.4em] text-lime-300">
            About Janrenzo
          </p>
          <h1 className="text-6xl font-black leading-[0.88] tracking-[-0.08em] sm:text-8xl lg:text-9xl">
            Web builder with design and systems thinking.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/60 sm:text-xl">
            I help businesses shape websites, funnels, and digital workflows
            that feel premium, load fast, and guide visitors toward action.
            This page carries the deeper story behind the short homepage.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white/70"
              >
                {skill}
              </span>
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/contact"
              className="inline-flex justify-center rounded-full bg-lime-300 px-8 py-4 text-sm font-black uppercase tracking-[0.12em] text-black transition hover:bg-white"
            >
              Start a Project
            </Link>
            <Link
              to="/portfolio"
              className="inline-flex justify-center rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:bg-white hover:text-black"
            >
              View Portfolio
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 rounded-[3rem] bg-lime-300/10 blur-[80px]" />
          <div className="relative overflow-hidden rounded-[2.4rem] border border-white/10 bg-white/[0.04] p-4 shadow-2xl backdrop-blur-xl">
            <div className="relative min-h-[420px] overflow-hidden rounded-[1.8rem] bg-[#151515]">
              <img
                src={profileImage}
                alt="Janrenzo Facto"
                className="absolute inset-0 h-full w-full object-cover object-[center_32%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 rounded-[1.5rem] border border-white/10 bg-black/60 p-5 backdrop-blur-xl">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-lime-300">
                  Freelance Web Designer
                </p>
                <p className="mt-2 text-3xl font-black tracking-[-0.05em]">
                  Janrenzo Facto
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutFooter() {
  return (
    <footer className="border-t border-white/10 bg-black px-5 py-10 text-white sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
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
          (c) 2026 Janrenzo Facto. Built around clarity, speed, and conversion.
        </p>
      </div>
    </footer>
  );
}

export default function AboutPage() {
  return (
    <main
      className="min-h-screen overflow-x-hidden bg-[#090909] text-white"
      style={{
        fontFamily:
          "Space Grotesk, Inter, Arial Black, Helvetica Neue, sans-serif",
      }}
    >
      <PageHeader active="About" subtitle="About Me" />
      <AboutHero />
      <WhyChooseSection />
      <ServicesSection />
      <HistoryTimeline />
      <ToolsSection />
      <ProcessSection />
      <ExperienceReviewSection />
      <WhyWorkWithMeSection />
      <ClientTestimonialsSection />
      <FaqSection />
      <QuickContactSection />
      <AboutFooter />
    </main>
  );
}
