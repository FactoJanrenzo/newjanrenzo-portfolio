import { Link } from "react-router-dom";
import { processSteps, serviceCategories } from "../data/siteContent";

export function ServicesOverview({ detailed = false }) {
  return (
    <div className="grid min-w-0 gap-4 lg:grid-cols-3">
      {serviceCategories.map((service, index) => (
        <article key={service.id} className="service-card surface-card surface-card-interactive flex min-w-0 flex-col p-6 sm:p-7">
          <div className="flex items-center justify-between gap-4">
            <span className="service-card-number text-sm font-bold text-lime-300">0{index + 1}</span>
            <span className="tag">{service.timeline.split(":")[1]?.split(",")[0]?.trim() || service.timeline}</span>
          </div>
          <h3 className="service-card-title mt-8 text-2xl font-bold leading-tight">{service.title}</h3>
          <p className="mt-4 leading-7 text-white/70">{service.summary}</p>

          <div className="mt-7 border-t border-white/10 pt-5">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-white/65">Best for</p>
            <p className="mt-2 text-sm leading-6 text-white/60">{service.idealFor}</p>
          </div>

          <div className="mt-6">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-white/65">Included</p>
            <ul className="mt-3 grid gap-2 text-sm leading-6 text-white/65">
              {service.includes.slice(0, detailed ? service.includes.length : 3).map((item) => <li key={item} className="flex gap-3"><span className="text-lime-300">+</span><span>{item}</span></li>)}
            </ul>
          </div>

          <div className="mt-auto pt-7">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-white/65">Deliverables</p>
            <p className="mt-2 text-sm leading-6 text-white/60">{service.deliverables}</p>
            {detailed && (
              <>
                <div className="service-card-pricing mt-6 border-y border-white/10 py-4">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-white/65">Typical starting range</p>
                  <p className="mt-2 text-2xl font-bold text-lime-200">{service.priceBand}</p>
                  <p className="mt-1 text-xs leading-5 text-white/65">{service.timeline}</p>
                </div>
                <p className="mt-4 text-xs leading-5 text-white/65">Final quote depends on scope, content, integrations, and revisions.</p>
                <Link to="/contact" aria-label={`Discuss ${service.title}`} className="button-secondary mt-6 w-full focus-ring">
                  Discuss this service
                </Link>
              </>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

export function ProcessSection({ light = false }) {
  return (
    <section className={light ? "site-section bg-[#f3f4ee] text-black" : "site-section bg-[#0a0b09] text-white"}>
      <div className="site-container grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
        <div>
          <p className={`section-kicker ${light ? "text-[#568400]" : ""}`}>Process</p>
          <h2 className="section-title">A clear path from idea to launch.</h2>
          <p className={`mt-6 max-w-lg text-lg leading-8 ${light ? "text-black/70" : "text-white/70"}`}>
            Each phase has a purpose, a decision to make, and a visible deliverable before the project moves forward.
          </p>
        </div>

        <ol className={`border-t ${light ? "border-black/15" : "border-white/10"}`}>
          {processSteps.map((step, index) => (
            <li key={step.title} className={`grid gap-4 border-b py-7 sm:grid-cols-[5rem_0.55fr_1fr] sm:items-start ${light ? "border-black/15" : "border-white/10"}`}>
              <span className={`text-sm font-bold ${light ? "text-[#568400]" : "text-lime-300"}`}>0{index + 1}</span>
              <h3 className="text-xl font-bold">{step.title}</h3>
              <p className={`leading-7 ${light ? "text-black/70" : "text-white/70"}`}>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="bg-lime-300 py-16 text-black sm:py-20">
      <div className="site-container grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.12em] text-black/55">Have an idea?</p>
          <h2 className="mt-5 max-w-4xl text-4xl font-bold leading-tight sm:text-6xl">
            Let's turn it into something clear, premium, and ready to grow.
          </h2>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <Link to="/contact" className="button-primary bg-black text-lime-300 hover:bg-white hover:text-black">Start a Project</Link>
          <Link to="/portfolio" className="button-secondary border-black/25 bg-transparent text-black hover:border-black hover:bg-black hover:text-white">View My Work</Link>
        </div>
      </div>
    </section>
  );
}
