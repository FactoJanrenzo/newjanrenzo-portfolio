import { useEffect, useState } from "react";
import { ArrowLeft, ArrowUpRight, Play } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import PageHeader, { PageMeta, SiteFooter } from "../components/PageHeader";
import { FinalCta, HeroOrbs } from "../components/Sections";
import { publicProjects } from "../data/siteContent";
import NotFoundPage from "./NotFoundPage";

const webCategory = "Websites & Funnels";

function LazyVideo({ project }) {
  const [playing, setPlaying] = useState(false);
  const portrait = project.videoOrientation === "portrait";

  return (
    <div className={`cs-video ${portrait ? "is-portrait" : ""}`}>
      {playing ? (
        <video controls autoPlay playsInline preload="none" poster={project.poster} aria-label={`${project.title} video`}>
          <source src={project.video} type="video/mp4" />
          Your browser does not support the video element.
        </video>
      ) : (
        <button type="button" className="cs-play" onClick={() => setPlaying(true)} aria-label={`Play ${project.title}`}>
          <img src={project.poster} alt="" width={portrait ? 900 : 1200} height={portrait ? 1600 : 900} decoding="async" />
          <span className="play-badge" aria-hidden="true"><Play fill="currentColor" /></span>
          <span className="glass play-label" aria-hidden="true">Load and play video</span>
        </button>
      )}
    </div>
  );
}

function BrowserBar({ label }) {
  return <div className="browser-bar" aria-hidden="true"><i /><i /><i /><span>{label}</span></div>;
}

function ProjectMedia({ project }) {
  const host = project.frameLabel ?? (project.liveUrl ? new URL(project.liveUrl).host : project.status);

  if (project.video) {
    return (
      <>
        <span className="mono-label">{project.videoLabel || "Video preview"}</span>
        <LazyVideo key={project.id} project={project} />
      </>
    );
  }

  if (project.gallery?.length) {
    return (
      <>
        <span className="mono-label">{project.galleryLabel || "Project gallery"}</span>
        <div className={`cs-gallery ${project.galleryColumns === 2 ? "is-two" : ""}`}>
          {project.gallery.map((item) => (
            <figure key={item.src} className={`cs-figure ${item.wide ? "is-wide" : ""}`}>
              <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
              <figcaption>{item.label}</figcaption>
            </figure>
          ))}
        </div>
      </>
    );
  }

  if (project.device === "laptop" || project.singlePreview) {
    return (
      <>
        <span className="mono-label">{project.mediaLabel || "Project preview"}</span>
        <div className="cs-stage is-padded">
          <div className="browser">
            <BrowserBar label={host} />
            <div className="cs-shot"><img src={project.image} alt={`${project.title} ${project.projectType} preview`} decoding="async" /></div>
          </div>
        </div>
      </>
    );
  }

  if (project.category === webCategory && project.image) {
    return (
      <>
        <span className="mono-label">{project.mockupOnly ? "Full Figma homepage design" : "Full website preview"} · scroll inside the window</span>
        <div className="cs-stage">
          <div className="browser">
            <BrowserBar label={host} />
            {project.scrollableImage ? (
              <div className="cs-scroll" tabIndex={0} aria-label={`Scrollable full-page preview of ${project.title}`}>
                <img src={project.image} alt={`${project.title} full-page ${project.mockupOnly ? "design" : "website preview"}`} decoding="async" />
              </div>
            ) : (
              <div className="cs-shot"><img src={project.image} alt={`${project.title} preview`} decoding="async" /></div>
            )}
          </div>
        </div>
        {project.scrollableImage && (
          <a href={project.image} target="_blank" rel="noopener noreferrer" className="link-arrow cs-open">Open the full image <ArrowUpRight aria-hidden="true" /></a>
        )}
      </>
    );
  }

  if (project.category === webCategory) {
    return (
      <>
        <span className="mono-label">Concept preview</span>
        <div className="cs-stage is-padded">
          <div className="browser">
            <BrowserBar label={project.status} />
            <div className="concept" aria-hidden="true"><strong>{project.title}</strong><span /><span /><em /></div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <span className="mono-label">Project artwork</span>
      <div className="cs-stage">
        <div className="cs-art"><img src={project.image} alt={`${project.title} ${project.projectType}`} decoding="async" /></div>
      </div>
    </>
  );
}

function Detail({ title, children, wide = false, outcome = false }) {
  return (
    <div className={`cs-detail ${wide ? "is-wide" : ""} ${outcome ? "is-outcome" : ""}`}>
      <h3>{title}</h3>
      {children}
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
      <main id="main-content">
        <section className="cs-hero" aria-labelledby="case-title">
          <HeroOrbs />
          <div className="wrap">
            <Link to="/portfolio" className="cs-back"><ArrowLeft aria-hidden="true" /> All work</Link>
            <p className="cs-label card-label rise">
              <span>{project.client ?? project.category}</span>
              <span className="chip">{project.chip ?? project.status}</span>
            </p>
            <h1 className="cs-title rise" id="case-title" style={{ "--d": "80ms" }}>{project.headline ?? project.title}</h1>
            <div className="cs-intro rise" style={{ "--d": "160ms" }}>
              <p>{project.description}</p>
              <div>
                <dl className="cs-meta">
                  <div><dt className="mono-label">Project</dt><dd>{project.headline ? project.title : project.projectType}</dd></div>
                  <div><dt className="mono-label">Industry</dt><dd>{project.industry}</dd></div>
                  <div><dt className="mono-label">Role</dt><dd>{project.services.join(" / ")}</dd></div>
                  <div><dt className="mono-label">Tools</dt><dd>{project.tools.join(" / ")}</dd></div>
                </dl>
                {project.liveUrl && (
                  <div className="cs-live">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-accent">Open {project.liveLabel} <ArrowUpRight aria-hidden="true" /></a>
                    <span className="mono-label">{project.liveStatus}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="cs-media" aria-label="Project media">
          <div className="wrap reveal"><ProjectMedia project={project} /></div>
        </section>

        {project.highlights?.length > 0 && (
          <section className="section" aria-label="Highlights" style={{ paddingTop: 0, borderTop: 0 }}>
            <div className="wrap">
              <dl className="cs-highlights reveal">
                {project.highlights.map((highlight) => (
                  <div key={highlight.label}><dt className="mono-label">{highlight.label}</dt><dd>{highlight.value}</dd></div>
                ))}
              </dl>
            </div>
          </section>
        )}

        {project.sampleLinks?.length > 0 && (
          <section className="section" aria-labelledby="samples-title">
            <div className="wrap">
              <div className="section-head reveal">
                <div>
                  <p className="kicker">Verified live samples</p>
                  <h2 className="h2" id="samples-title">See the work on the live pages.</h2>
                </div>
              </div>
              <div className="cs-samples reveal">
                {[
                  { label: "Primary samples", items: primarySamples },
                  { label: "Additional verified titles", items: additionalSamples },
                ].map((group) => (
                  <div key={group.label}>
                    <p className="mono-label">{group.label}</p>
                    {group.items.map((sample) => (
                      <a key={sample.url} href={sample.url} target="_blank" rel="noopener noreferrer">
                        {sample.label} <ArrowUpRight aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="section" aria-labelledby="breakdown-title">
          <div className="wrap cs-breakdown">
            <div className="reveal">
              <p className="kicker">Project breakdown</p>
              <h2 className="h2" id="breakdown-title">Decisions behind the work.</h2>
            </div>
            <div className="cs-details reveal" style={{ "--delay": "100ms" }}>
              <Detail title="Challenge"><p>{project.challenge}</p></Detail>
              <Detail title="Strategy"><p>{project.strategy}</p></Detail>
              <Detail title="Solution"><p>{project.solution}</p></Detail>
              <Detail title="Deliverables">
                <ul>{project.deliverables.map((item) => <li key={item}>{item}</li>)}</ul>
              </Detail>
              <Detail title="Outcome" wide outcome><p>{project.result}</p></Detail>
            </div>
          </div>
        </section>

        <nav className="wrap cs-nav" aria-label="More projects">
          <Link to={`/portfolio/${previousProject.id}`}>
            <span className="mono-label">Previous project</span>
            <strong>{previousProject.title}</strong>
          </Link>
          <Link to={`/portfolio/${nextProject.id}`}>
            <span className="mono-label">Next project</span>
            <strong>{nextProject.title}</strong>
          </Link>
        </nav>

        <FinalCta title="Need a website or lead system like this?" />
      </main>
      <SiteFooter />
    </>
  );
}
