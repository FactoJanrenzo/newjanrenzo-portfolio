import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PageHeader, { PageMeta, SiteFooter } from "../components/PageHeader";
import { ProjectVisual } from "../components/PortfolioShowcase";
import WorkReel from "../components/WorkReel";
import { designWorkProjects, featuredProjects, moreWebProjects, publicProjects } from "../data/siteContent";

const designCategories = ["All", "Campaign Creative", "Graphic Design", "Video & Motion", "Presentation Design"];
const pageSize = 6;

function ArchiveCard({ project, showCategory }) {
  return (
    <article className="surface-card surface-card-interactive flex min-w-0 flex-col overflow-hidden">
      <Link to={`/portfolio/${project.id}`} aria-label={`View ${project.title} case study`} className="block focus-ring">
        <ProjectVisual project={project} />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="tag border-lime-300/25 text-lime-200">{showCategory ? project.category : project.status}</span>
          {showCategory && <span className="text-xs font-semibold text-white/65">{project.status}</span>}
        </div>
        {project.cardDetail && <p className="mt-4 text-xs font-bold uppercase tracking-[0.08em] text-white/65">{project.cardDetail}</p>}
        <h3 className="mt-5 text-xl font-bold leading-tight">{project.title}</h3>
        <p className="mt-3 text-sm leading-6 text-white/70">{project.description}</p>
        <p className="mt-5 border-t border-white/10 pt-4 text-xs font-semibold uppercase tracking-[0.08em] text-white/65">Role / {project.services[0]}</p>
        <Link to={`/portfolio/${project.id}`} className="project-action mt-auto inline-flex min-h-11 items-center pt-6 text-sm font-bold text-white underline decoration-lime-300 decoration-2 underline-offset-4 focus-ring">
          View Case Study
        </Link>
      </div>
    </article>
  );
}

function ProjectArchive({ id, kicker, title, description, projects, categories, className = "" }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const filters = categories?.filter((category) => category === "All" || projects.some((project) => project.category === category));
  const visibleProjects = activeCategory === "All" ? projects : projects.filter((project) => project.category === activeCategory);
  const displayedProjects = visibleProjects.slice(0, visibleCount);

  return (
    <section id={id} className={`site-section scroll-mt-28 border-b border-white/10 ${className}`}>
      <div className="site-container min-w-0">
        <div className="grid gap-7 lg:grid-cols-[1fr_0.75fr] lg:items-end">
          <div>
            <p className="section-kicker">{kicker}</p>
            <h2 className="section-title">{title}</h2>
          </div>
          <p className="max-w-xl text-lg leading-8 text-white/70 lg:justify-self-end">{description}</p>
        </div>

        {filters && (
          <div className="mt-10 flex max-w-full flex-wrap gap-2 border-b border-white/10 pb-4" role="group" aria-label={`Filter ${kicker.toLowerCase()} by category`}>
            {filters.map((category) => {
              const count = category === "All" ? projects.length : projects.filter((project) => project.category === category).length;
              const active = activeCategory === category;
              return (
                <button key={category} type="button" onClick={() => { setActiveCategory(category); setVisibleCount(pageSize); }} aria-pressed={active} className={`filter-button min-h-11 shrink-0 rounded-full border px-4 text-xs font-bold uppercase tracking-[0.08em] transition ${active ? "border-lime-300 bg-lime-300 text-black" : "border-white/20 bg-white/[0.03] text-white/75 hover:border-white/40 hover:text-white"}`}>
                  {category} <span className="ml-2 opacity-55">{count}</span>
                </button>
              );
            })}
          </div>
        )}

        <p className="sr-only" role="status" aria-live="polite">
          Showing {displayedProjects.length} of {visibleProjects.length} projects{filters ? ` in ${activeCategory === "All" ? kicker : activeCategory}` : ""}.
        </p>

        <div className={`${filters ? "mt-8" : "mt-12"} grid min-w-0 gap-5 sm:grid-cols-2 lg:grid-cols-3`}>
          {displayedProjects.map((project) => <ArchiveCard key={project.id} project={project} showCategory={Boolean(filters)} />)}
        </div>

        {displayedProjects.length < visibleProjects.length && (
          <div className="mt-10 flex justify-center">
            <button type="button" onClick={() => setVisibleCount((count) => count + pageSize)} className="button-secondary focus-ring">
              Show More Work ({visibleProjects.length - displayedProjects.length})
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
      <main id="main-content" className="min-w-0 overflow-x-clip bg-[#070806] text-white">
        <WorkReel projects={featuredProjects} />

        <ProjectArchive
          id="more-web-work"
          kicker="More web work"
          title="Homepage designs and template explorations."
          description="Completed Figma homepage designs for real-estate, tax, and service businesses, each labeled by status."
          projects={moreWebProjects}
          className="bg-[#0a0b09]"
        />

        <ProjectArchive
          id="design-motion"
          kicker="Design & motion"
          title="Ecommerce creative, video, and campaign design."
          description="Amazon A+ content, short-form video, presentations, and campaign graphics, kept separate from the web work."
          projects={designWorkProjects}
          categories={designCategories}
        />

        <section className="bg-lime-300 py-14 text-black sm:py-16">
          <div className="site-container flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-black/55">Have a project in mind?</p>
              <h2 className="mt-4 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">Build the next piece around a clear business goal.</h2>
            </div>
            <Link to="/contact" className="button-primary shrink-0 bg-black text-lime-300 hover:bg-white hover:text-black">Start a Project</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
