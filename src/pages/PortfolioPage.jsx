import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PageHeader, { PageMeta, SiteFooter } from "../components/PageHeader";
import { FinalCta, HeroOrbs } from "../components/Sections";
import { WorkCard, WorkShowcase } from "../components/WorkCards";
import { designWorkProjects, featuredProjects, moreWebProjects, publicProjects } from "../data/siteContent";

const designCategories = ["All", "Campaign Creative", "Graphic Design", "Video & Motion", "Presentation Design"];
const pageSize = 6;

function ProjectArchive({ id, kicker, title, description, projects, categories }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const filters = categories?.filter((category) => category === "All" || projects.some((project) => project.category === category));
  const visibleProjects = activeCategory === "All" ? projects : projects.filter((project) => project.category === activeCategory);
  const displayedProjects = visibleProjects.slice(0, visibleCount);

  return (
    <section id={id} className="section" aria-labelledby={`${id}-title`}>
      <div className="wrap">
        <div className="section-head reveal">
          <div>
            <p className="kicker">{kicker}</p>
            <h2 className="h2" id={`${id}-title`}>{title}</h2>
            <p className="lead">{description}</p>
          </div>
        </div>

        {filters && (
          <div className="filters" role="group" aria-label={`Filter ${kicker.toLowerCase()} by category`}>
            {filters.map((category) => {
              const count = category === "All" ? projects.length : projects.filter((project) => project.category === category).length;
              return (
                <button key={category} type="button" className="filter" aria-pressed={activeCategory === category} onClick={() => { setActiveCategory(category); setVisibleCount(pageSize); }}>
                  {category} <span>{count}</span>
                </button>
              );
            })}
          </div>
        )}

        <p className="visually-hidden" role="status" aria-live="polite">
          Showing {displayedProjects.length} of {visibleProjects.length} projects{filters ? ` in ${activeCategory === "All" ? kicker : activeCategory}` : ""}.
        </p>

        <div className="archive-grid">
          {displayedProjects.map((project, index) => <WorkCard key={project.id} project={project} delay={(index % 3) * 70} />)}
        </div>

        {displayedProjects.length < visibleProjects.length && (
          <div className="more">
            <button type="button" className="btn btn-ghost" onClick={() => setVisibleCount((count) => count + pageSize)}>
              Show more work ({visibleProjects.length - displayedProjects.length})
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default function PortfolioPage() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let legacyId;
    try {
      legacyId = decodeURIComponent(location.hash.slice(1));
    } catch {
      return;
    }
    if (legacyId && publicProjects.some((project) => project.id === legacyId)) {
      navigate(`/portfolio/${legacyId}`, { replace: true });
    }
  }, [location.hash, navigate]);

  return (
    <>
      <PageMeta title="Selected Work" description="Websites, landing pages, and web apps by Janrenzo Facto, plus Amazon A+ content, video, and campaign design, with every project labeled by status." path="/portfolio" />
      <PageHeader />
      <main id="main-content">
        <section className="page-hero" aria-labelledby="portfolio-title">
          <HeroOrbs />
          <div className="wrap">
            <p className="kicker rise">Selected web work / {String(featuredProjects.length).padStart(2, "0")}</p>
            <h1 className="page-title rise" id="portfolio-title" style={{ "--d": "80ms" }}>Websites, landing pages, and web apps.</h1>
            <p className="lead rise" style={{ "--d": "160ms" }}>A focused edit of web projects, each shown with the role, status, and decisions behind the build. More web work and design &amp; motion projects follow below.</p>
            <WorkShowcase projects={featuredProjects} eager />
          </div>
        </section>

        <ProjectArchive
          id="more-web-work"
          kicker="More web work"
          title="Homepage designs and template explorations."
          description="Completed Figma homepage designs for real-estate, tax, and service businesses, each labeled by status."
          projects={moreWebProjects}
        />

        <ProjectArchive
          id="design-motion"
          kicker="Design & motion"
          title="Ecommerce creative, video, and campaign design."
          description="Amazon A+ content, short-form video, presentations, and campaign graphics, kept separate from the web work."
          projects={designWorkProjects}
          categories={designCategories}
        />

        <FinalCta kicker="Have a project in mind?" title="Build the next piece around a clear goal." />
      </main>
      <SiteFooter />
    </>
  );
}
