import { Link } from "react-router-dom";
import PageHeader, { PageMeta, SiteFooter } from "../components/PageHeader";
import { FinalCta, ServicesOverview } from "../components/Sections";
import { brandAvatarImage, projectRequirements, skillGroups } from "../data/siteContent";

const serviceFaqs = [
  ["Can you improve an existing website?", "Yes. Website Optimization is for focused responsive, speed, SEO-structure, form, and conversion-flow improvements without rebuilding everything."],
  ["Do I need final content before the project starts?", "Final approved content is ideal, but the project can begin with a clear offer, page priorities, available brand assets, and a practical content plan."],
  ["Are the listed prices fixed?", "No. They are starting ranges. The final quote reflects page count, content readiness, integrations, automation, and revision scope."],
];

export default function ServicesPage() {
  return (
    <>
      <PageMeta title="Services" description="WordPress website design, landing pages, GoHighLevel funnels, and website optimization services by Janrenzo Facto." path="/services" />
      <PageHeader />
      <main id="main-content" className="min-w-0 overflow-x-clip bg-[#070806] text-white">
        <section className="services-hero site-grid-bg border-b border-white/10 py-16 sm:py-20 lg:py-24">
          <div className="site-container grid min-w-0 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.55fr)] lg:items-end lg:gap-16">
            <div className="page-intro min-w-0">
              <p className="section-kicker">What I build</p>
              <h1 className="page-title max-w-4xl">Websites and lead systems for businesses ready to grow.</h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/70 sm:text-xl sm:leading-9">
                I design and build fast WordPress websites, landing pages, and GoHighLevel funnels that make your offer clearer, build trust, and generate better inquiries.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/contact" className="button-primary">Start a Project</Link>
                <Link to="/portfolio" className="button-secondary">View My Work</Link>
              </div>
            </div>

            <div className="services-hero-brand" aria-label="Janrenzo Facto profile">
              <div className="services-hero-mark-wrap">
                <img src={brandAvatarImage} alt="Janrenzo Facto" className="services-hero-mark" width="192" height="192" loading="lazy" decoding="async" />
              </div>
              <div className="services-hero-brand-label">
                <span>JF / SYSTEMS</span>
                <span>WEB / GHL / SEO</span>
              </div>
            </div>
          </div>
        </section>

        <section className="site-section services-offer-section">
          <div className="site-container">
            <div className="mb-12 grid min-w-0 gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <p className="section-kicker">What I offer</p>
                <h2 className="section-title">Built to make the next step obvious.</h2>
              </div>
              <p className="max-w-2xl text-lg leading-8 text-white/70 lg:justify-self-end">
                Every service is shaped around the business problem, the deliverables, and the path to launch. The ranges below are starting points, not fixed quotes.
              </p>
            </div>
            <ServicesOverview detailed />
          </div>
        </section>

        <section className="services-support-section border-y border-white/10 bg-[#0b0c0a] py-16 sm:py-20">
          <div className="site-container grid gap-12 lg:grid-cols-2">
            <div>
              <p className="section-kicker">Project requirements</p>
              <h2 className="text-3xl font-bold leading-tight sm:text-4xl">What helps a project move smoothly.</h2>
              <ul className="mt-8 border-t border-white/10">
                {projectRequirements.map((item, index) => (
                  <li key={item} className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-white/10 py-5 text-white/65"><span className="font-bold text-lime-300">0{index + 1}</span><span>{item}</span></li>
                ))}
              </ul>
            </div>

            <div>
              <p className="section-kicker">Supporting tools</p>
              <p className="mt-4 max-w-xl text-lg leading-8 text-white/70">The platform follows the project. Tools support the outcome instead of defining the service.</p>
              <div className="mt-8 grid gap-6 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {skillGroups.map((group) => (
                  <div key={group.title} className="min-w-0 border-t border-white/10 pt-5">
                    <h3 className="text-sm font-bold text-white">{group.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-white/70">{group.items.join(" / ")}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="site-section bg-[#f3f4ee] text-black">
          <div className="site-container grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-sm font-bold text-[#568400]">Common questions</p>
              <h2 className="section-title mt-4">Useful answers before a scope call.</h2>
            </div>
            <div className="border-t border-black/15">
              {serviceFaqs.map(([question, answer]) => (
                <article key={question} className="grid gap-3 border-b border-black/15 py-7 sm:grid-cols-[0.72fr_1fr]">
                  <h3 className="text-lg font-bold">{question}</h3>
                  <p className="leading-7 text-black/65">{answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
