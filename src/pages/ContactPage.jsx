import ContactForm from "../components/ContactForm";
import PageHeader, { PageMeta, SiteFooter } from "../components/PageHeader";
import { HeroOrbs } from "../components/Sections";
import { contactSteps, siteConfig } from "../data/siteContent";

export default function ContactPage() {
  return (
    <>
      <PageMeta title="Contact" description="Start a WordPress website, landing page, GoHighLevel funnel, or website optimization project with Janrenzo Facto." path="/contact" />
      <PageHeader />
      <main id="main-content">
        <section className="page-hero" aria-labelledby="contact-title">
          <HeroOrbs />
          <div className="wrap">
            <p className="kicker rise">Project / role / collaboration</p>
            <h1 className="page-title rise" id="contact-title" style={{ "--d": "80ms" }}>Tell me what you want to build next.</h1>
            <p className="lead rise" style={{ "--d": "160ms" }}>Share the goal and the context that matters. I will review the details and respond with a practical next step.</p>
          </div>
        </section>

        <section className="section" style={{ paddingTop: "8px", borderTop: 0 }} aria-label="Contact details and form">
          <div className="wrap contact-grid">
            <aside className="contact-aside reveal">
              <dl className="info-list">
                <div><dt className="mono-label">Availability</dt><dd>{siteConfig.availability}</dd></div>
                <div><dt className="mono-label">Expected response</dt><dd>{siteConfig.responseTime}</dd></div>
                <div><dt className="mono-label">Email</dt><dd><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></dd></div>
              </dl>
              <div className="next-steps">
                <h2>What happens next</h2>
                <ol>
                  {contactSteps.map((step, index) => <li key={step}><span>0{index + 1}</span><span>{step}</span></li>)}
                </ol>
              </div>
            </aside>

            <div className="form-card reveal" style={{ "--delay": "100ms" }}>
              <p className="kicker">Start the conversation</p>
              <h2 className="h3" style={{ marginTop: "14px" }}>Inquiry details</h2>
              <p>Five required fields keep the first step focused. Project specifics are optional.</p>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
