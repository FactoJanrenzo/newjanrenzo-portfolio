import { Link } from "react-router-dom";
import PageHeader, { PageMeta, SiteFooter } from "../components/PageHeader";
import { professionalHistory, profileImage, skillGroups } from "../data/siteContent";

const reasons = [
  ["Strategy before screens", "The offer, audience, page structure, and conversion path are clarified before visual design starts."],
  ["Design and implementation", "The same person can shape the layout, build it, fix responsive details, and connect the lead flow."],
  ["Practical handoff", "The final site is organized for real use in WordPress or GoHighLevel, with testing and launch details included."],
];

export default function AboutPage() {
  return (
    <>
      <PageMeta title="About" description="About Janrenzo Facto, a freelance web designer specializing in WordPress, GoHighLevel, frontend development, SEO structure, and design." path="/about" />
      <PageHeader />
      <main id="main-content" className="min-w-0 overflow-x-clip bg-[#070806] text-white">
        <section className="site-grid-bg border-b border-white/10">
          <div className="site-container grid min-w-0 gap-10 py-14 lg:grid-cols-[1fr_0.8fr] lg:items-center lg:py-20">
            <div>
              <p className="section-kicker">About Janrenzo</p>
              <h1 className="page-title">A web designer who thinks through the build.</h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/60 sm:text-xl sm:leading-9">
                I specialize in WordPress websites, GoHighLevel funnels, responsive frontend work, SEO structure, and digital design. Clients hire me when they need the visual and technical sides of a web project to stay connected.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link to="/contact" className="button-primary">Start a Project</Link>
                <Link to="/about#experience" className="button-secondary">View Experience</Link>
              </div>
            </div>

            <div className="relative min-h-[430px] min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-[#11130f] sm:min-h-[560px]">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:52px_52px]" />
              <img src={profileImage} alt="Janrenzo Facto wearing a light gray suit" width="1280" height="1600" loading="lazy" decoding="async" className="portrait-mask absolute inset-0 h-full w-full object-cover object-[center_22%]" />
              <p className="absolute bottom-6 left-6 z-10 text-sm font-semibold text-white/75">Design / WordPress / GHL / Frontend</p>
            </div>
          </div>
        </section>

        <section className="site-section bg-[#f3f4ee] text-black">
          <div className="site-container">
            <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
              <div>
                <p className="text-sm font-bold text-[#568400]">Why clients hire me</p>
                <h2 className="section-title mt-4">One project, fewer handoffs.</h2>
              </div>
              <div className="border-t border-black/15">
                {reasons.map(([title, text], index) => (
                  <article key={title} className="grid gap-3 border-b border-black/15 py-7 sm:grid-cols-[4rem_0.65fr_1fr]">
                    <span className="font-bold text-[#568400]">0{index + 1}</span>
                    <h3 className="text-xl font-bold">{title}</h3>
                    <p className="leading-7 text-black/60">{text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="site-section scroll-mt-28">
          <div className="site-container grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="section-kicker">Work history</p>
              <h2 className="section-title">Experience that shaped the process.</h2>
            </div>
            <ol className="border-t border-white/10">
              {professionalHistory.map((item) => (
                <li key={`${item.period}-${item.role}`} className="border-b border-white/10 py-7">
                  <div className="grid gap-4 sm:grid-cols-[9rem_1fr]">
                    <p className="text-sm font-bold text-lime-300">{item.period}</p>
                    <div>
                      <p className="text-sm text-white/65">{item.company}</p>
                      <h3 className="mt-2 text-xl font-bold leading-tight">{item.role}</h3>
                      <p className="mt-3 leading-7 text-white/70">{item.text}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#0b0c0a] py-16 sm:py-20">
          <div className="site-container">
            <h2 className="text-3xl font-bold sm:text-4xl">Specialized across the full web workflow.</h2>
            <div className="mt-9 grid gap-6 md:grid-cols-3">
              {skillGroups.map((group) => (
                <div key={group.title} className="border-t border-white/10 pt-5">
                  <h3 className="font-bold text-lime-300">{group.title}</h3>
                  <p className="mt-3 leading-7 text-white/70">{group.items.join(" / ")}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 bg-lime-300 py-12 text-black sm:py-14">
          <div className="site-container flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-black/60">For teams and employers</p>
              <h2 className="mt-4 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl">Need a designer who can carry the idea through the build?</h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to="/contact" className="button-primary shrink-0 bg-black text-lime-300 hover:bg-white hover:text-black">Discuss a Role</Link>
              <Link to="/portfolio" className="button-secondary shrink-0 border-black/35 bg-transparent text-black hover:border-black hover:bg-black hover:text-white">Review the Work</Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
