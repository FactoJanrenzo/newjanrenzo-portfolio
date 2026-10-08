import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";

const webCategory = "Websites & Funnels";

function frameLabel(project) {
  if (project.frameLabel) return project.frameLabel;
  if (project.liveUrl) return new URL(project.liveUrl).host;
  if (project.status === "Figma Mockup") return "Figma · Homepage design";
  return project.status;
}

// The device or artwork shown inside a card's stage. Card images are decorative: the card text names the project.
export function ProjectFrame({ project, eager = false }) {
  const loading = eager ? "eager" : "lazy";

  if (project.video) {
    return (
      <>
        <div className="stage-art"><img src={project.poster} alt="" loading={loading} decoding="async" /></div>
        <span className="play-badge" aria-hidden="true"><Play fill="currentColor" /></span>
      </>
    );
  }

  if (project.device === "laptop") {
    return (
      <div className="laptop">
        <div className="laptop-screen"><img src={project.image} alt="" loading={loading} decoding="async" /></div>
        <div className="laptop-base" aria-hidden="true" />
      </div>
    );
  }

  if (project.category === webCategory) {
    return (
      <div className="device">
        <div className="browser">
          <div className="browser-bar" aria-hidden="true"><i /><i /><i /><span>{frameLabel(project)}</span></div>
          {project.image ? (
            <img className={project.scrollableImage ? "shot scrolls" : "shot"} src={project.image} alt="" loading={loading} decoding="async" />
          ) : (
            <div className="concept" aria-hidden="true"><strong>{project.title}</strong><span /><span /><em /></div>
          )}
        </div>
      </div>
    );
  }

  return <div className="stage-art"><img src={project.image} alt="" loading={loading} decoding="async" /></div>;
}

function cardText(project, featured) {
  if (featured) {
    return {
      label: project.client ?? project.title,
      chip: project.chip ?? project.status,
      title: project.headline ?? project.title,
      sub: project.meta ?? project.projectType,
    };
  }
  const web = project.category === webCategory;
  return {
    label: web ? project.status : project.category,
    chip: web ? null : project.cardMeta ?? project.status,
    title: project.title,
    description: project.description,
    sub: project.cardDetail ?? `Role / ${project.services[0]}`,
  };
}

export function WorkCard({ project, featured = false, delay = 0, eager = false }) {
  const { label, chip, title, description, sub } = cardText(project, featured);

  return (
    <Link to={`/portfolio/${project.id}`} className="work-card reveal" data-tilt data-cursor="view" style={delay ? { "--delay": `${delay}ms` } : undefined}>
      <div className="stage">
        <span className="glare" aria-hidden="true" />
        <ProjectFrame project={project} eager={eager} />
      </div>
      <div className="card-meta">
        <p className="card-label"><span>{label}</span>{chip && <span className="chip">{chip}</span>}</p>
        <h3 className="card-title">{title}</h3>
        {description && <p className="card-desc">{description}</p>}
        <p className="card-sub">{sub}</p>
      </div>
    </Link>
  );
}

export function FeatureWork({ project, eager = false }) {
  const { label, chip, title, sub } = cardText(project, true);
  const href = `/portfolio/${project.id}`;

  return (
    <article className="work-feature reveal" data-tilt="flat">
      <div className="feature-copy">
        <p className="card-label"><span>{label}</span><span className="chip">{chip}</span></p>
        <h3>{title}</h3>
        <p>{project.description}</p>
        <p className="card-sub">{sub}</p>
        <Link to={href} className="link-arrow">View case study <ArrowRight aria-hidden="true" /></Link>
      </div>
      {/* The preview repeats the case-study link for pointer users; keyboard users get the text link above. */}
      <Link to={href} className="stage" tabIndex={-1} aria-hidden="true" data-cursor="view">
        <span className="glare" />
        <ProjectFrame project={project} eager={eager} />
      </Link>
    </article>
  );
}

export function WorkShowcase({ projects, eager = false }) {
  const [feature, ...rest] = projects;

  return (
    <>
      <FeatureWork project={feature} eager={eager} />
      <div className="work-grid">
        {rest.map((project, index) => <WorkCard key={project.id} project={project} featured delay={index % 2 ? 80 : 0} />)}
      </div>
    </>
  );
}
