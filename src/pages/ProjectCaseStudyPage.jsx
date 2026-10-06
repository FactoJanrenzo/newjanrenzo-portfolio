import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PageHeader, { PageMeta, SiteFooter } from "../components/PageHeader";
import { ProjectVisual } from "../components/PortfolioShowcase";
import { publicProjects } from "../data/siteContent";
import NotFoundPage from "./NotFoundPage";

function LazyVideo({ project }) {
  const [playing, setPlaying] = useState(false);

  if (!playing) {
    return (
      <button type="button" onClick={() => setPlaying(true)} className="group relative block w-full overflow-hidden bg-[#090a08] text-white focus-ring" aria-label={`Play ${project.title}`}>
        <img src={project.poster} alt="" width={project.videoOrientation === "portrait" ? 900 : 1200} height={project.videoOrientation === "portrait" ? 1600 : 900} loading="lazy" decoding="async" className="max-h-[78vh] w-full object-contain" />
        <span className="absolute inset-0 bg-black/20 transition group-hover:bg-black/10" />
        <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-lime-300 text-xl text-black shadow-2xl transition group-hover:scale-105" aria-hidden="true">&#9654;</span>
        <span className="absolute bottom-5 left-5 text-xs font-bold uppercase tracking-[0.12em]">Load and play video</span>
      </button>
    );
  }

  return (
    <video controls autoPlay playsInline preload="none" poster={project.poster} aria-label={`${project.title} video preview`}>
      <source src={project.video} type="video/mp4" />
      Your browser does not support the video element.
    </video>
  );
}

function ProjectMedia({ project }) {
  if (project.video) {
    return (
      <div className="case-study-artwork is-wide">
        <p className="case-study-media-label">{project.videoLabel || "Video preview"}</p>
        <div className={`case-study-video-frame ${project.videoOrientation === "portrait" ? "is-portrait" : "is-landscape"}`}>
          <LazyVideo key={project.id} project={project} />
        </div>
      </div>
    );
  }

  if (project.gallery?.length) {
    const twoColumnGallery = project.galleryColumns === 2;

    return (
      <div className="case-study-artwork is-wide">
        <p className="case-study-media-label">{project.galleryLabel || "Project gallery"}</p>
        <div className={`grid min-w-0 gap-x-5 gap-y-8 sm:grid-cols-2 ${twoColumnGallery ? "" : "lg:grid-cols-3"}`}>
          {project.gallery.map((item) => (
            <figure key={item.src} className={`min-w-0 border-t border-black/12 pt-4 ${item.wide ? `sm:col-span-2 ${twoColumnGallery ? "" : "lg:col-span-3"}` : ""}`}>
              <div className="overflow-hidden bg-[#090a08]">
                <img src={item.src} alt={item.alt} width="1600" height="900" loading="lazy" decoding="async" className="h-auto w-full object-contain" />
              </div>
              <figcaption className="mt-3 text-xs font-bold uppercase tracking-[0.08em] text-black/65">{item.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    );
  }

  if (project.singlePreview) {
    return (
      <div className="case-study-artwork is-wide">
        <p className="case-study-media-label">{project.mediaLabel || "Project preview"}</p>
        <div className="case-study-media-panel">
          <img src={project.image} alt={`${project.title} ${project.projectType} preview`} width="1600" height="1000" loading="lazy" decoding="async" className="h-auto w-full" />
        </div>
      </div>
    );
  }

  if (project.scrollableImage) {
    return (
      <div className={`case-study-website-grid ${project.mockupOnly ? "is-single" : ""}`}>
        <div className="min-w-0">
          <p className="case-study-media-label">{project.mockupOnly ? "Full Figma homepage mockup" : "Full website preview"}</p>
          <div className="case-study-preview-crop">
            <img src={project.image} alt={`${project.title} full-page ${project.mockupOnly ? "Figma design mockup" : "website preview"}`} width="1600" height="2400" loading="lazy" decoding="async" className="h-auto w-full" />
          </div>
          <a href={project.image} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center text-sm font-bold text-black underline decoration-[#568400] decoration-2 underline-offset-4 focus-ring">View Full Design <span aria-hidden="true" className="ml-2">&#8599;</span></a>
        </div>
        {!project.mockupOnly && (
          <div className="min-w-0">
            <p className="case-study-media-label">Mobile framing</p>
            <div className="case-study-phone-frame">
              <ProjectVisual project={project} mobile />
            </div>
          </div>
        )}
      </div>
    );
  }

  if (project.category === "Websites & Funnels") {
    return (
      <div className="case-study-website-grid">
        <div className="min-w-0">
          <p className="case-study-media-label">{project.liveUrl ? "Website preview" : "Desktop concept"}</p>
          <div className="case-study-media-panel">
            <ProjectVisual project={project} />
          </div>
        </div>
        <div className="min-w-0">
          <p className="case-study-media-label">{project.liveUrl ? "Responsive framing" : "Mobile concept"}</p>
          <div className="case-study-phone-frame">
            <ProjectVisual project={project} mobile />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="case-study-artwork">
      <p className="case-study-media-label">Project artwork</p>
      <ProjectVisual project={project} />
    </div>
  );
}

function DetailBlock({ title, children, wide = false }) {
  return (
    <div className={`case-study-detail ${wide ? "sm:col-span-2" : ""}`}>
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  );
}

export default function ProjectCaseStudyPage() {
  const { projectId } = useParams();
  const projectIndex = publicProjects.findIndex((item) => item.id === projectId);
  const project = publicProjects[projectIndex];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [projectId]);

  if (!project) return <NotFoundPage />;

  const previousProject = publicProjects[(projectIndex - 1 + publicProjects.length) % publicProjects.length];
  const nextProject = publicProjects[(projectIndex + 1) % publicProjects.length];
  const primarySamples = project.sampleLinks?.filter((sample) => sample.primary) || [];
  const additionalSamples = project.sampleLinks?.filter((sample) => !sample.primary) || [];

  return (
    <>
      <PageMeta title={project.title} description={project.description} path={`/portfolio/${project.id}`} image={project.image || project.poster} />
      <PageHeader />
      <main id="main-content" className="min-w-0 overflow-x-clip bg-[#f3f4ee] text-[#090a08]">
        <section className="border-b border-black/12">
          <div className="site-container page-intro py-12 sm:py-16 lg:py-20">
            <Link to="/portfolio" className="focus-ring inline-flex min-h-11 items-center gap-2 text-sm font-bold text-black/55 hover:text-black">
              <span aria-hidden="true">&#8592;</span> Work Index
            </Link>

            <div className="case-study-tags mt-10 flex flex-wrap items-center gap-2">
              <span className="tag">{project.status}</span>
              <span className="tag">{project.category}</span>
            </div>

            <h1 className="case-study-title mt-7">{project.title}</h1>

            <div className="mt-10 grid gap-8 border-t border-black/12 pt-7 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
              <p className="max-w-3xl text-xl leading-8 text-black/72 sm:text-2xl sm:leading-9">{project.description}</p>
              <div>
                <dl className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-[0.12em] text-black/65">Project type</dt>
                    <dd className="mt-2 text-sm font-semibold leading-6">{project.projectType}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-[0.12em] text-black/65">Industry</dt>
                    <dd className="mt-2 text-sm font-semibold leading-6">{project.industry}</dd>
                  </div>
                </dl>
                {project.liveUrl && (
                  <div className="mt-7">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="button-primary focus-ring">
                      Open {project.liveLabel}
                    </a>
                    <p className="mt-3 text-xs font-semibold uppercase tracking-[0.08em] text-black/65">{project.liveStatus}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {project.highlights?.length > 0 && (
          <section className="border-b border-black/12 bg-[#e5e7df]">
            <dl className="site-container grid sm:grid-cols-3">
              {project.highlights.map((highlight, index) => (
                <div key={highlight.label} className={`py-6 sm:px-6 sm:py-8 ${index > 0 ? "border-t border-black/12 sm:border-l sm:border-t-0" : ""} ${index === 0 ? "sm:pl-0" : ""}`}>
                  <dt className="text-xs font-bold uppercase tracking-[0.12em] text-black/65">{highlight.label}</dt>
                  <dd className="mt-2 text-base font-bold leading-6 text-black/78">{highlight.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        <section className="case-study-media-section">
          <div className="site-container min-w-0">
            <ProjectMedia project={project} />
          </div>
        </section>

        {project.sampleLinks?.length > 0 && (
          <section className="border-t border-black/12 bg-[#e5e7df]">
            <div className="site-container py-14 sm:py-16">
              <p className="text-sm font-bold text-[#568400]">Verified live samples</p>
              <div className="mt-4 grid gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
                <h2 className="section-title text-black">Amazon pages using the A+ content system.</h2>
                <div className="grid gap-8 sm:grid-cols-2">
                  {[
                    { label: "Primary samples", items: primarySamples },
                    { label: "Additional verified titles", items: additionalSamples },
                  ].map((group) => (
                    <div key={group.label}>
                      <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-black/65">{group.label}</p>
                      {group.items.map((sample) => (
                        <a key={sample.url} href={sample.url} target="_blank" rel="noopener noreferrer" className="focus-ring group flex min-h-14 items-center justify-between gap-4 border-t border-black/15 py-4 text-sm font-bold text-black/70 transition hover:text-black">
                          <span>{sample.label}</span>
                          <span aria-hidden="true" className="text-[#568400]">&#8599;</span>
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="border-y border-black/12 bg-white">
          <div className="site-container grid gap-12 py-16 lg:grid-cols-[0.62fr_1.38fr] lg:py-24">
            <div>
              <p className="text-sm font-bold text-[#568400]">Project breakdown</p>
              <h2 className="section-title mt-4 text-black">Decisions behind the work.</h2>
            </div>

            <div className="grid gap-x-8 sm:grid-cols-2">
              <DetailBlock title="Challenge">{project.challenge}</DetailBlock>
              <DetailBlock title="Strategy">{project.strategy}</DetailBlock>
              <DetailBlock title="Solution">{project.solution}</DetailBlock>
              <DetailBlock title="Services / role">{project.services.join(" / ")}</DetailBlock>
              <DetailBlock title="Tools used">{project.tools.join(" / ")}</DetailBlock>
              <DetailBlock title="Deliverables">
                <ul className="grid gap-2">
                  {project.deliverables.map((item) => <li key={item}>- {item}</li>)}
                </ul>
              </DetailBlock>
              <DetailBlock title="Outcome"><strong>{project.result}</strong></DetailBlock>
            </div>
          </div>
        </section>

        <nav aria-label="Case study navigation" className="border-b border-black/12">
          <div className="site-container grid sm:grid-cols-2">
            <Link to={`/portfolio/${previousProject.id}`} className="case-study-project-nav focus-ring border-b border-black/12 sm:border-b-0 sm:border-r">
              <span>Previous project</span>
              <strong>{previousProject.title}</strong>
            </Link>
            <Link to={`/portfolio/${nextProject.id}`} className="case-study-project-nav focus-ring sm:text-right">
              <span>Next project</span>
              <strong>{nextProject.title}</strong>
            </Link>
          </div>
        </nav>

        <section className="bg-[#080907] py-16 text-white sm:py-20">
          <div className="site-container grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="section-kicker">Start a project</p>
              <h2 className="max-w-4xl text-4xl font-bold leading-tight sm:text-6xl">Need a website or lead system with a clearer path to action?</h2>
            </div>
            <Link to="/contact" className="button-primary">Start a Project</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
