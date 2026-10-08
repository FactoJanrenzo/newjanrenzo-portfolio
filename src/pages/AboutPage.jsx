import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import PageHeader, { PageMeta, SiteFooter } from "../components/PageHeader";
import { ExperienceList, FinalCta, HeroOrbs, HeroPortrait } from "../components/Sections";
import { skillGroups } from "../data/siteContent";

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
      <main id="main-content">
        <section className="hero" aria-labelledby="about-title">
          <HeroOrbs />
          <div className="wrap">
            <div className="hero-grid">
              <HeroPortrait caption="Design / WordPress / GHL / Frontend" />
              <div>
                <p className="kicker rise">About Janrenzo</p>
                <h1 id="about-title" className="page-title rise" style={{ "--d": "80ms" }}>A web designer who thinks through the build.</h1>
                <p className="lead rise" style={{ "--d": "160ms" }}>I specialize in WordPress websites, GoHighLevel funnels, responsive frontend work, SEO structure, and digital design. Clients hire me when they need the visual and technical sides of a web project to stay connected.</p>
                <div className="ctas rise" style={{ "--d": "220ms" }}>
                  <Link to="/contact" className="btn btn-accent">Start a project <ArrowRight aria-hidden="true" /></Link>
                  <a href="#experience" className="btn btn-ghost">View experience</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="reasons-title">
          <div className="wrap">
            <div className="section-head reveal">
              <div>
                <p className="kicker">Why clients hire me</p>
                <h2 className="h2" id="reasons-title">One project, fewer handoffs.</h2>
              </div>
            </div>
            <div className="rows reveal">
              {reasons.map(([title, text], index) => (
                <article key={title} className="row">
                  <span className="num">0{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="experience" aria-labelledby="experience-title">
          <div className="wrap about-grid">
            <div className="reveal">
              <p className="kicker">Work history</p>
              <h2 className="h2" id="experience-title">Experience that shaped the process.</h2>
            </div>
            <div className="reveal" style={{ "--delay": "100ms" }}>
              <ExperienceList withNotes />
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="skills-title">
          <div className="wrap">
            <div className="section-head reveal">
              <div>
                <p className="kicker">Skills</p>
                <h2 className="h2" id="skills-title">Specialized across the full web workflow.</h2>
              </div>
            </div>
            <div className="tool-groups reveal">
              {skillGroups.map((group) => (
                <div key={group.title}>
                  <h3>{group.title}</h3>
                  <div className="tools">{group.items.map((item) => <span key={item}>{item}</span>)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FinalCta
          kicker="For teams and employers"
          title="Need a designer who can carry the idea through the build?"
          text="Share the role, the team, and the work you need covered, and I'll reply with how I can help."
          primary={{ to: "/contact", label: "Discuss a role" }}
        />
      </main>
      <SiteFooter />
    </>
  );
}
