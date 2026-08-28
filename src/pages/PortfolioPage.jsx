import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PageHeader, { PageMeta, SiteFooter } from "../components/PageHeader";
import { ProjectVisual } from "../components/PortfolioShowcase";
import WorkReel from "../components/WorkReel";
import { archiveProjects, featuredProjects, publicProjects } from "../data/siteContent";

const archiveCategories = ["All Work", "Websites & Funnels", "Graphic Design", "Campaign Creative", "Presentation Design", "Video & Motion"];

function DesignArchiveCard({ project }) {
  return (
    <article className="surface-card surface-card-interactive flex min-w-0 flex-col overflow-hidden">
      <Link to={`/portfolio/${project.id}`} aria-label={`View ${project.title} case study`} className="block focus-ring">
        <ProjectVisual project={project} />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="tag border-lime-300/25 text-lime-200">{project.category}</span>
          <span className="text-xs font-semibold text-white/65">{project.status}</span>
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

export default function PortfolioPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All Work");
  const [visibleCount, setVisibleCount] = useState(6);
  const visibleProjects = useMemo(
    () => activeCategory === "All Work" ? archiveProjects : archiveProjects.filter((project) => project.category === activeCategory),
    [activeCategory],
  );
  const displayedProjects = visibleProjects.slice(0, visibleCount);

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
      <PageMeta title="Selected Work" description="Selected website, funnel, presentation, graphic design, campaign, and video work by Janrenzo Facto, with concepts clearly labeled." path="/portfolio" />
      <PageHeader />
      <main id="main-content" className="min-w-0 overflow-x-clip bg-[#070806] text-white">
        <WorkReel projects={featuredProjects} />

        <section className="site-section border-b border-white/10 bg-[#0a0b09]">
          <div className="site-container min-w-0">
            <div className="grid gap-7 lg:grid-cols-[1fr_0.75fr] lg:items-end">
              <div>
                <p className="section-kicker">Project archive</p>
                <h2 className="section-title">More work, clearly labeled by status.</h2>
              </div>
              <p className="max-w-xl text-lg leading-8 text-white/70 lg:justify-self-end">
                Development previews, template explorations, presentations, and supporting creative work remain available without competing with the verified selection above.
              </p>
            </div>

            <div className="mt-10 flex max-w-full flex-wrap gap-2 border-b border-white/10 pb-4" role="group" aria-label="Filter design work by category">
              {archiveCategories.map((category) => {
                const count = category === "All Work" ? archiveProjects.length : archiveProjects.filter((project) => project.category === category).length;
                const active = activeCategory === category;
                return (
                  <button key={category} type="button" onClick={() => { setActiveCategory(category); setVisibleCount(6); }} aria-pressed={active} className={`filter-button min-h-11 shrink-0 rounded-full border px-4 text-xs font-bold uppercase tracking-[0.08em] transition ${active ? "border-lime-300 bg-lime-300 text-black" : "border-white/20 bg-white/[0.03] text-white/75 hover:border-white/40 hover:text-white"}`}>
                    {category} <span className="ml-2 opacity-55">{count}</span>
                  </button>
                );
              })}
            </div>

            <p className="sr-only" role="status" aria-live="polite">Showing {displayedProjects.length} of {visibleProjects.length} projects in {activeCategory}.</p>

            <div className="mt-8 grid min-w-0 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {displayedProjects.map((project) => <DesignArchiveCard key={project.id} project={project} />)}
            </div>

            {displayedProjects.length < visibleProjects.length && (
              <div className="mt-10 flex justify-center">
                <button type="button" onClick={() => setVisibleCount((count) => count + 6)} className="button-secondary focus-ring">
                  Show More Work ({visibleProjects.length - displayedProjects.length})
                </button>
              </div>
            )}
          </div>
        </section>

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
