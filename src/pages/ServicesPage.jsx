import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import {
  ProcessSection,
  QuickContactSection,
  ServicesSection,
  ToolsSection,
} from "../components/Sections";
import { services } from "../data/siteContent";
import { ArrowIcon } from "../components/Icons";

function ServicesHero() {
  return (
    <section className="relative overflow-hidden px-5 pb-20 pt-32 text-white sm:px-8 lg:px-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(163,230,53,0.16),transparent_28%),radial-gradient(circle_at_85%_18%,rgba(249,115,22,0.12),transparent_24%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-end">
        <div>
          <p className="mb-5 text-xs font-black uppercase tracking-[0.4em] text-lime-300">
            Services
          </p>
          <h1 className="text-6xl font-black leading-[0.88] tracking-[-0.08em] sm:text-8xl lg:text-9xl">
            Website services built for leads.
          </h1>
        </div>
        <div>
          <p className="text-lg leading-relaxed text-white/60 sm:text-xl">
            From WordPress builds and GoHighLevel funnels to SEO structure,
            frontend customization, and launch support, this page gives clients
            a clear view of what I can build.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/contact"
              className="inline-flex justify-center rounded-full bg-lime-300 px-8 py-4 text-sm font-black uppercase tracking-[0.12em] text-black transition hover:bg-white"
            >
              Start a Project <ArrowIcon className="ml-2" />
            </Link>
            <Link
              to="/portfolio"
              className="inline-flex justify-center rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:bg-white hover:text-black"
            >
              View Work
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceSnapshot() {
  return (
    <section className="border-y border-white/10 bg-[#0d0d0d] px-5 py-10 text-white sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {services.map((service) => (
          <article
            key={service.title}
            className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6"
          >
            <p className="text-xs font-black uppercase tracking-[0.22em] text-lime-300">
              {service.title}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/50">
              {service.text}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ServicesFooter() {
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
              Web Design / WordPress / GHL / SEO
            </p>
          </div>
        </div>
        <p className="max-w-xl text-sm leading-relaxed text-white/55 md:text-right">
          Services built around clear structure, smooth handoff, and better
          lead flow.
        </p>
      </div>
    </footer>
  );
}

export default function ServicesPage() {
  return (
    <main
      className="min-h-screen overflow-x-hidden bg-[#090909] text-white"
      style={{
        fontFamily:
          "Space Grotesk, Inter, Arial Black, Helvetica Neue, sans-serif",
      }}
    >
      <PageHeader active="Services" subtitle="Website Services" />
      <ServicesHero />
      <ServiceSnapshot />
      <ServicesSection />
      <ProcessSection />
      <ToolsSection />
      <QuickContactSection />
      <ServicesFooter />
    </main>
  );
}
