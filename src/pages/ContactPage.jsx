import ContactForm from "../components/ContactForm";
import PageHeader, { PageMeta, SiteFooter } from "../components/PageHeader";
import { contactSteps, siteConfig } from "../data/siteContent";

export default function ContactPage() {
  return (
    <>
      <PageMeta title="Contact" description="Start a WordPress website, landing page, GoHighLevel funnel, or website optimization project with Janrenzo Facto." path="/contact" />
      <PageHeader />
      <main id="main-content" className="min-w-0 overflow-x-clip bg-[#070806] text-white">
        <section className="site-grid-bg border-b border-white/10 py-16 sm:py-20">
          <div className="site-container page-intro grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-end">
            <div className="page-intro-copy">
              <p className="section-kicker">Project / role / collaboration</p>
              <h1 className="page-title">Tell me what you want to build next.</h1>
            </div>
            <p className="page-intro-support max-w-xl text-lg leading-8 text-white/70 lg:justify-self-end">
              Share the goal and the context that matters. I will review the details and respond with a practical next step.
            </p>
          </div>
        </section>

        <section className="site-section">
          <div className="site-container grid min-w-0 gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <aside className="min-w-0 lg:sticky lg:top-28">
              <div className="border-t border-white/10">
                <div className="border-b border-white/10 py-5">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-white/65">Availability</p>
                  <p className="mt-2 font-semibold text-lime-200">{siteConfig.availability}</p>
                </div>
                <div className="border-b border-white/10 py-5">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-white/65">Expected response</p>
                  <p className="mt-2 font-semibold text-white/75">{siteConfig.responseTime}</p>
                </div>
                <div className="border-b border-white/10 py-5">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-white/65">Email</p>
                  <a href={`mailto:${siteConfig.email}`} className="mt-2 block break-all font-semibold text-white/75 underline decoration-lime-300/60 underline-offset-4 focus-ring">{siteConfig.email}</a>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-2xl font-bold">What happens next</h2>
                <ol className="mt-5 grid gap-5">
                  {contactSteps.map((step, index) => (
                    <li key={step} className="grid grid-cols-[2rem_1fr] gap-3 text-sm leading-6 text-white/70"><span className="font-bold text-lime-300">0{index + 1}</span><span>{step}</span></li>
                  ))}
                </ol>
              </div>
            </aside>

            <div className="surface-card min-w-0 p-5 sm:p-8 lg:p-10">
              <div className="mb-8 border-b border-white/10 pb-7">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-lime-300">Start the conversation</p>
                <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Inquiry details</h2>
                <p className="mt-3 max-w-2xl leading-7 text-white/65">Five required fields keep the first step focused. Project specifics are optional.</p>
              </div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
