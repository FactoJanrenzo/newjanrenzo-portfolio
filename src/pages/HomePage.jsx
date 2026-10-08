import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import CountUp from "../components/CountUp";
import PageHeader, { PageMeta, SiteFooter } from "../components/PageHeader";
import { ExperienceList, FinalCta, HeroOrbs, HeroPortrait, ProcessSection, ServicesList, TestimonialsSection } from "../components/Sections";
import { WorkShowcase } from "../components/WorkCards";
import { designWorkProjects, featuredProjects, publicProjects } from "../data/siteContent";

const amazonListings = designWorkProjects.find((project) => project.id === "millsco-amazon-aplus-content")?.sampleLinks.length ?? 0;
const designTiles = [
  { id: "millsco-amazon-aplus-content", label: "Amazon A+ · MillsCo" },
  { id: "commercial-solar-reel", label: "Video" },
  { id: "untold-story-editorial", label: "Editorial graphic" },
].map((tile) => ({ ...tile, project: designWorkProjects.find((project) => project.id === tile.id) })).filter((tile) => tile.project);
const homeTools = ["WordPress", "Elementor", "Divi", "ACF", "GoHighLevel", "HTML / CSS / JS", "PageSpeed", "SEO structure"];

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <HeroOrbs />
      <div className="wrap">
        <div className="hero-grid">
          <HeroPortrait />
          <div>
            <p className="kicker rise">Freelance web designer</p>
            <h1 id="hero-title" className="hero-name rise" style={{ "--d": "80ms" }}>Janrenzo Facto</h1>
            <p className="value rise" style={{ "--d": "160ms" }}>Websites and lead systems for businesses ready to grow.</p>
            <p className="lead rise" style={{ "--d": "220ms" }}>
              I design and build fast WordPress websites, landing pages, and GoHighLevel funnels that make your offer clearer, build trust, and generate better inquiries. Most recently I built WordPress service pages and supported GoHighLevel funnels at <strong>Clinic Envy</strong>, after Elementor and SEO work for a <strong>real-estate brand</strong> and 5+ years of freelance WordPress projects.
            </p>
            <div className="ctas rise" style={{ "--d": "280ms" }}>
              <Link to="/contact" className="btn btn-accent">Start a project <ArrowRight aria-hidden="true" /></Link>
              <Link to="/portfolio" className="btn btn-ghost">View selected work</Link>
            </div>
            <p className="reply rise" style={{ "--d": "320ms" }}>Usually replies within 1–2 business days</p>
          </div>
        </div>

        <ul className="stats reveal" aria-label="At a glance">
          <li className="stat"><b><CountUp value={5} /><sup>+</sup></b><span>years building WordPress websites</span></li>
          <li className="stat"><b><CountUp value={publicProjects.length} /></b><span>projects in the portfolio</span></li>
          <li className="stat"><b><CountUp value={amazonListings} /></b><span>live Amazon listings with my A+ content</span></li>
          <li className="stat"><b>3–6</b><span>weeks for a typical website build</span></li>
        </ul>
      </div>
    </section>
  );
}

function SelectedWork() {
  return (
    <section className="section" aria-labelledby="work-title">
      <div className="wrap">
        <div className="section-head reveal">
          <div>
            <p className="kicker">Selected work</p>
            <h2 className="h2" id="work-title">Websites built to make the next step obvious.</h2>
          </div>
          <Link to="/portfolio" className="link-arrow">All work <ArrowRight aria-hidden="true" /></Link>
        </div>

        <WorkShowcase projects={featuredProjects} />

        <div className="also reveal">
          <div>
            <p className="kicker">Also in the portfolio</p>
            <h3 className="h3">Ecommerce creative, video, and campaign design.</h3>
            <p>Amazon A+ content live on {amazonListings} listings, short-form video, presentations, and campaign graphics.</p>
            <Link to="/portfolio#design-motion" className="link-arrow">See design &amp; motion work <ArrowRight aria-hidden="true" /></Link>
          </div>
          <div className="tiles">
            {designTiles.map(({ id, label, project }) => (
              <Link key={id} to={`/portfolio/${id}`} className="tile" aria-label={`${project.title} case study`}>
                <img src={project.poster ?? project.image} alt="" loading="lazy" decoding="async" />
                <span className="glass" aria-hidden="true">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="section" aria-labelledby="services-title">
      <div className="wrap">
        <div className="section-head reveal">
          <div>
            <p className="kicker">Services</p>
            <h2 className="h2" id="services-title">Three ways I can help.</h2>
            <p className="lead">Each service is organized around the business problem, the deliverable, and the path to launch. The tools follow the project.</p>
          </div>
          <Link to="/services" className="link-arrow">Service details <ArrowRight aria-hidden="true" /></Link>
        </div>
        <ServicesList />
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section" aria-labelledby="about-title">
      <div className="wrap about-grid">
        <div className="reveal">
          <p className="kicker">About</p>
          <h2 className="h2" id="about-title">A designer who thinks through the build.</h2>
          <p className="lead">Clients hire me when they need the visual and technical sides of a web project to stay connected: strategy before screens, design and implementation by the same person, and a practical handoff in WordPress or GoHighLevel.</p>
          <div className="tools" aria-label="Tools">
            {homeTools.map((tool) => <span key={tool}>{tool}</span>)}
          </div>
          <Link to="/about" className="link-arrow" style={{ marginTop: "20px" }}>More about me <ArrowRight aria-hidden="true" /></Link>
        </div>
        <div className="reveal" style={{ "--delay": "120ms" }}>
          <ExperienceList />
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <PageMeta title="Websites and Lead Systems" path="/" />
      <PageHeader />
      <main id="main-content">
        <Hero />
        <SelectedWork />
        <Services />
        <ProcessSection />
        <TestimonialsSection />
        <About />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
