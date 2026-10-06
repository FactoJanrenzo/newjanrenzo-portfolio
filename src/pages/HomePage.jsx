import PageHeader, { PageMeta, SiteFooter } from "../components/PageHeader";
import { HeroParticleField, HeroScrollAccents } from "../components/PageEffects";
import { ProjectVisual } from "../components/PortfolioShowcase";
import ScrollRevealText from "../components/ScrollRevealText";
import { FinalCta, ProcessSection, ServicesOverview, TestimonialsSection } from "../components/Sections";
import { credibilityItems, featuredProjects, profileImage, siteConfig, skillGroups } from "../data/siteContent";
import { Link } from "react-router-dom";

const capabilityTools = [...new Set(skillGroups.flatMap((group) => group.items))];

function HeroSection() {
  return (
    <section
      className="hero-section site-grid-bg relative min-h-[calc(100svh-5rem)] overflow-hidden border-b border-white/10"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(184,251,69,0.10),transparent_28%),radial-gradient(circle_at_82%_32%,rgba(255,255,255,0.045),transparent_25%),linear-gradient(135deg,rgba(7,8,6,0.82),rgba(16,18,15,0.7))]" />
        <HeroParticleField />
        <HeroScrollAccents />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#070806] via-[#070806]/45 to-transparent" />
      </div>

      <div className="hero-sticky site-container relative z-10">
        <div className="hero-content grid min-w-0 gap-10 py-12 lg:min-h-[calc(100vh-5rem)] lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:py-14">
          <div className="hero-text-block min-w-0">
            <p className="section-kicker">{siteConfig.availability}</p>
            <h1 className="hero-headline display-title" aria-label="Websites and lead systems for businesses ready to grow.">
              <span className="hero-word-box"><span>Websites and</span></span>
              <span className="hero-word-box hero-word-box-light"><span>lead systems</span></span>
              <span className="hero-word-box hero-word-box-muted"><span>for businesses</span></span>
              <span className="hero-word-box hero-word-box-muted"><span>ready to grow.</span></span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/62 sm:text-xl sm:leading-9">
              I design and build fast WordPress websites, landing pages, and GoHighLevel funnels that make your offer clearer, build trust, and generate better inquiries.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link to="/contact" className="button-primary">Start a Project</Link>
              <Link to="/about#experience" className="button-secondary">Hiring? View Experience</Link>
            </div>
          </div>

          <div className="hero-card-shell relative min-h-[390px] min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-[#11130f] sm:min-h-[520px] lg:min-h-[650px]">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:52px_52px]" />
            <p aria-hidden="true" className="absolute left-5 top-6 z-10 text-6xl font-bold uppercase leading-none text-white/[0.06] sm:text-8xl">Janrenzo</p>
            <img src={profileImage} alt="Janrenzo Facto wearing a light gray suit" width="1280" height="1600" decoding="async" className="portrait-mask absolute inset-0 h-full w-full object-cover object-[center_23%]" fetchPriority="high" />
            <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 p-5 sm:p-7">
              <div>
                <p className="text-sm font-bold text-white">Janrenzo Facto</p>
                <p className="mt-1 text-xs text-white/70">WordPress / GoHighLevel / Frontend</p>
              </div>
              <span className="tag border-lime-300/30 text-lime-200">Available worldwide</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CredibilityStrip() {
  return (
    <section aria-label="Experience and capabilities" className="border-b border-white/10 bg-[#0b0c0a]">
      <div className="site-container grid sm:grid-cols-2 lg:grid-cols-4">
        {credibilityItems.map((item) => (
          <div key={item.value} className="motion-card min-w-0 border-b border-white/10 py-6 sm:px-5 sm:odd:border-r lg:border-b-0 lg:border-r lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0">
            <p className="text-lg font-bold text-white">{item.value}</p>
            <p className="mt-1 text-sm text-white/70">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturedWorkSection() {
  return (
    <section className="site-section bg-[#f3f4ee] text-black">
      <div className="site-container">
        <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-sm font-bold text-[#568400]">Selected work</p>
            <ScrollRevealText text="Proof through the work itself." className="section-title mt-4" activeClass="text-black" inactiveClass="text-black/50" />
            <p className="mt-6 max-w-2xl text-lg leading-8 text-black/60">
              Websites, landing pages, and web apps, each with the role, status, and decisions behind the build.
            </p>
          </div>
          <Link to="/portfolio" className="button-secondary w-fit border-black/20 bg-transparent text-black hover:border-black hover:bg-black hover:text-white">Explore All Work</Link>
        </div>

        <div className="mt-12 grid min-w-0 gap-4 md:grid-cols-2 lg:grid-cols-12">
          {featuredProjects.map((project, index) => (
            <article key={project.id} className={`surface-card-interactive flex w-full min-w-0 flex-col overflow-hidden rounded-lg border border-black/12 bg-white ${index < 2 ? "lg:col-span-6" : "lg:col-span-4"} ${index === featuredProjects.length - 1 && featuredProjects.length % 2 === 1 ? "md:col-span-2 lg:col-span-4" : ""}`}>
              <ProjectVisual project={project} />
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="tag border-black/15 text-black/55">{project.status}</span>
                  <span className="text-xs font-semibold text-black/65">{project.projectType}</span>
                </div>
                <h3 className={`mt-5 font-bold leading-tight ${index === 0 ? "text-3xl" : "text-2xl"}`}>{project.title}</h3>
                <p className="mt-3 text-sm leading-6 text-black/58">{project.description}</p>
                <div className="mt-auto pt-6">
                  <p className="text-xs font-semibold text-black/65">{project.services.join(" / ")}</p>
                  <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                    <Link to={`/portfolio/${project.id}`} className="project-action inline-flex min-h-11 items-center rounded-sm text-sm font-bold text-black underline decoration-[#74a918] decoration-2 underline-offset-4">View Case Study</Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-black/12 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm leading-6 text-black/65">
            Also in the portfolio: Amazon A+ content live on nine listings, short-form video, presentations, and campaign graphics.
          </p>
          <Link to="/portfolio#design-motion" className="project-action inline-flex min-h-11 shrink-0 items-center rounded-sm text-sm font-bold text-black underline decoration-[#74a918] decoration-2 underline-offset-4">See Design &amp; Motion Work</Link>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="site-section overflow-hidden border-y border-white/10 bg-[#080907]">
      <div className="site-container">
        <div className="mb-12 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <ScrollRevealText text="Three ways I can help." className="section-title" />
          <p className="max-w-2xl text-lg leading-8 text-white/70 lg:justify-self-end">
            Each service is organized around the business problem, the deliverable, and the path to launch. The tools follow the project.
          </p>
        </div>
        <ServicesOverview />
        <Link to="/services" className="button-secondary mt-8">View Service Details</Link>
      </div>
      <div className="mt-14 w-full border-y border-white/10">
        <ToolMarquee items={capabilityTools} />
      </div>
    </section>
  );
}

function ToolMarquee({ items }) {
  return (
    <div className="tool-marquee py-3" aria-label="Tools and capabilities">
      <div className="tool-marquee-track flex w-max">
        {[0, 1].map((groupIndex) => (
          <div key={groupIndex} className="flex shrink-0 gap-3 pr-3" aria-hidden={groupIndex === 1 ? "true" : undefined}>
            {items.map((tool) => (
              <span key={`${groupIndex}-${tool}`} className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white/75 backdrop-blur transition hover:border-lime-300/50 hover:text-lime-200">
                {tool}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <PageMeta title="Websites and Lead Systems" path="/" />
      <PageHeader />
      <main id="main-content" className="min-w-0 overflow-x-clip bg-[#070806] text-white">
        <HeroSection />
        <CredibilityStrip />
        <FeaturedWorkSection />
        <TestimonialsSection />
        <ServicesSection />
        <ProcessSection light />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
