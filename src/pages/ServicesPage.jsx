import { ArrowRight, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { formatRange, shortTimeline } from "../components/format";
import PageHeader, { PageMeta, SiteFooter } from "../components/PageHeader";
import { FinalCta, HeroOrbs, ProcessSection, ServicesList } from "../components/Sections";
import { projectRequirements, serviceCategories, skillGroups } from "../data/siteContent";

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
      <main id="main-content">
        <section className="page-hero" aria-labelledby="services-title">
          <HeroOrbs />
          <div className="wrap">
            <p className="kicker rise">Services</p>
            <h1 className="page-title rise" id="services-title" style={{ "--d": "80ms" }}>Websites and lead systems for businesses ready to grow.</h1>
            <p className="lead rise" style={{ "--d": "160ms" }}>I design and build fast WordPress websites, landing pages, and GoHighLevel funnels that make your offer clearer, build trust, and generate better inquiries.</p>
            <div className="ctas rise" style={{ "--d": "220ms" }}>
              <Link to="/contact" className="btn btn-accent">Start a project <ArrowRight aria-hidden="true" /></Link>
              <Link to="/portfolio" className="btn btn-ghost">View my work</Link>
            </div>
            <ServicesList />
          </div>
        </section>

        <section className="section" aria-labelledby="details-title">
          <div className="wrap">
            <div className="section-head reveal">
              <div>
                <p className="kicker">What's included</p>
                <h2 className="h2" id="details-title">Built to make the next step obvious.</h2>
                <p className="lead">Every service is shaped around the business problem, the deliverables, and the path to launch. The ranges are starting points, not fixed quotes.</p>
              </div>
            </div>
            <div className="svc-panels">
              {serviceCategories.map((service, index) => (
                <article key={service.id} id={service.id} className="svc-panel reveal">
                  <div>
                    <span className="num">0{index + 1}</span>
                    <h3>{service.title}</h3>
                    <p>{service.summary}</p>
                    <div className="svc-facts">
                      <div><span className="mono-label">Starting range</span><b>{formatRange(service.priceBand)}</b></div>
                      <div><span className="mono-label">Typical timeline</span><span>{shortTimeline(service.timeline)}</span></div>
                    </div>
                    <Link to="/contact" className="btn btn-ghost" aria-label={`Discuss ${service.title}`}>Discuss this service <ArrowRight aria-hidden="true" /></Link>
                  </div>
                  <div className="svc-cols">
                    <div>
                      <p className="mono-label">Best for</p>
                      <p>{service.idealFor}</p>
                    </div>
                    <div>
                      <p className="mono-label">Included</p>
                      <ul className="plus-list">{service.includes.map((item) => <li key={item}>{item}</li>)}</ul>
                    </div>
                    <div>
                      <p className="mono-label">Deliverables</p>
                      <p>{service.deliverables}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <ProcessSection />

        <section className="section" aria-labelledby="requirements-title">
          <div className="wrap split">
            <div className="reveal">
              <p className="kicker">Project requirements</p>
              <h2 className="h2" id="requirements-title">What helps a project move smoothly.</h2>
              <ol className="num-list">
                {projectRequirements.map((item, index) => <li key={item}><span>0{index + 1}</span><span>{item}</span></li>)}
              </ol>
            </div>
            <div className="reveal" style={{ "--delay": "100ms" }}>
              <p className="kicker">Supporting tools</p>
              <h2 className="h2">The platform follows the project.</h2>
              <div className="tool-groups" style={{ gridTemplateColumns: "1fr" }}>
                {skillGroups.map((group) => (
                  <div key={group.title}>
                    <h3>{group.title}</h3>
                    <div className="tools">{group.items.map((item) => <span key={item}>{item}</span>)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="faq-title">
          <div className="wrap split">
            <div className="reveal">
              <p className="kicker">Common questions</p>
              <h2 className="h2" id="faq-title">Useful answers before a scope call.</h2>
            </div>
            <div className="faq reveal" style={{ marginTop: 0 }}>
              {serviceFaqs.map(([question, answer]) => (
                <details key={question}>
                  <summary>{question}<Plus aria-hidden="true" /></summary>
                  <p>{answer}</p>
                </details>
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
