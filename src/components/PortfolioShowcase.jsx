export function ProjectVisual({ project, mobile = false, eager = false }) {
  if (project.video) {
    return (
      <div className={`project-media relative flex items-center justify-center bg-[#090a08] ${mobile ? "aspect-[9/16]" : "aspect-[4/3]"}`}>
        <img
          src={project.poster}
          alt={`${project.title} ${project.projectType} poster`}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={eager ? "high" : "auto"}
          width={mobile ? 900 : 1200}
          height={mobile ? 1600 : 900}
          className="project-video-poster h-full w-full object-contain"
        />
        <span className="pointer-events-none absolute left-4 top-4 rounded-full border border-white/15 bg-black/65 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-white/75">Video & Motion</span>
        <span aria-hidden="true" className="pointer-events-none absolute bottom-4 right-4 grid h-11 w-11 place-items-center rounded-full border border-lime-300/60 bg-lime-300 text-sm text-black shadow-lg">&#9654;</span>
      </div>
    );
  }

  if (project.image) {
    const desktopAspect = project.category === "Websites & Funnels" ? "aspect-[16/10]" : project.category === "Presentation Design" ? "aspect-video" : "aspect-[4/3]";
    const containArtwork = project.category === "Presentation Design";
    const width = mobile ? 900 : project.category === "Graphic Design" || project.category === "Campaign Creative" ? 1200 : 1600;
    const height = mobile ? 1600 : project.category === "Presentation Design" ? 900 : project.category === "Websites & Funnels" ? 1000 : 900;

    return (
      <div className={`project-media ${mobile ? "aspect-[9/16]" : desktopAspect}`}>
        <img
          src={project.image}
          alt={`${project.title} ${project.projectType} preview`}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={eager ? "high" : "auto"}
          width={width}
          height={height}
          className={`${containArtwork ? "object-contain" : "object-cover"} object-top`}
        />
      </div>
    );
  }

  return (
    <div className={`concept-visual ${mobile ? "is-mobile" : ""}`} data-theme={project.visualTheme || "clinic"} role="img" aria-label={`${project.title} ${project.status} preview`}>
      <div className="concept-browser-bar" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="concept-canvas" aria-hidden="true">
        <div className="concept-copy">
          <p className="concept-label">{project.status}</p>
          <p className="concept-title">{project.title}</p>
          <div className="concept-line" />
          <div className="concept-line short" />
          <div className="concept-cta" />
        </div>
        <div className="concept-panel" />
      </div>
    </div>
  );
}
