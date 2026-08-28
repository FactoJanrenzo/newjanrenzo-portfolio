import { Link } from "react-router-dom";
import { ProjectVisual } from "./PortfolioShowcase";

function FeaturedProjectCard({ project, index }) {
  const prominent = index < 2;

  return (
    <article className={`surface-card surface-card-interactive group flex min-w-0 flex-col overflow-hidden ${prominent ? "lg:col-span-6" : "lg:col-span-4"}`}>
      <Link to={`/portfolio/${project.id}`} aria-label={`View ${project.title} case study`} className="block overflow-hidden focus-ring">
        <ProjectVisual project={project} eager={index === 0} />
      </Link>
      <div className="flex flex-1 flex-col p-5 sm:p-7">
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs font-bold tracking-[0.12em] text-lime-300">{String(index + 1).padStart(2, "0")}</span>
          <span className="tag border-white/12 text-white/70">{project.status}</span>
        </div>
        <h2 className={`mt-6 font-bold leading-[1.05] ${prominent ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"}`}>{project.title}</h2>
        <p className="mt-3 text-sm leading-6 text-white/65">{project.description}</p>
        <dl className="mt-7 grid grid-cols-2 gap-4 border-t border-white/10 pt-5 text-xs">
          <div>
            <dt className="font-bold uppercase tracking-[0.1em] text-white/65">Format</dt>
            <dd className="mt-2 leading-5 text-white/75">{project.projectType}</dd>
          </div>
          <div>
            <dt className="font-bold uppercase tracking-[0.1em] text-white/65">Role</dt>
            <dd className="mt-2 leading-5 text-white/75">{project.services[0]}</dd>
          </div>
        </dl>
        <Link to={`/portfolio/${project.id}`} className="project-action mt-auto inline-flex min-h-11 items-center pt-6 text-sm font-bold text-white underline decoration-lime-300 decoration-2 underline-offset-4 focus-ring">
          View Case Study
        </Link>
      </div>
    </article>
  );
}

export default function WorkReel({ projects }) {
  return (
    <section className="site-grid-bg border-b border-white/10 py-16 sm:py-20 lg:py-24">
      <div className="site-container">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <div>
            <p className="section-kicker">Selected work / 07</p>
            <h1 className="page-title max-w-5xl">A focused edit of work that is ready to be judged.</h1>
          </div>
          <p className="max-w-xl text-lg leading-8 text-white/65 lg:justify-self-end">
            Verified websites, product interfaces, campaign systems, and motion work—presented with role, status, and context instead of unsupported outcomes.
          </p>
        </div>

        <div className="mt-12 grid min-w-0 gap-5 lg:grid-cols-12">
          {projects.map((project, index) => <FeaturedProjectCard key={project.id} project={project} index={index} />)}
        </div>
      </div>
    </section>
  );
}
