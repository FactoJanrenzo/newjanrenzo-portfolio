import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { portfolioGraphics, websitePortfolio } from "../data/siteContent";
import ScrollRevealText from "./ScrollRevealText";
import { ArrowIcon } from "./Icons";

function GeneratedPortfolioVisual({ item, compact = false }) {
  const title = item?.title || "Portfolio Preview";
  const category = item?.category || item?.type || "Website Preview";
  const meta = item?.meta || "WordPress / Design / Lead Flow";

  return (
    <div className={`relative h-full min-h-[260px] w-full overflow-hidden rounded-[1.5rem] bg-[#111] ${compact ? "aspect-[4/3]" : "aspect-[16/10]"}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(163,230,53,0.32),transparent_28%),radial-gradient(circle_at_80%_22%,rgba(249,115,22,0.25),transparent_25%),linear-gradient(135deg,#111_0%,#050505_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:42px_42px] opacity-35" />
      <div className="absolute left-6 right-6 top-6 flex items-center justify-between rounded-full border border-white/10 bg-black/35 px-4 py-3 backdrop-blur-xl">
        <div className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-orange-500" /><span className="h-3 w-3 rounded-full bg-lime-300" /><span className="h-3 w-3 rounded-full bg-white/30" /></div>
        <span className="text-[10px] font-black uppercase tracking-[0.24em] text-white/45">Generated Preview</span>
      </div>
      <div className="absolute bottom-6 left-6 right-6">
        <p className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-lime-300">{category}</p>
        <h3 className="max-w-xl text-4xl font-black leading-none tracking-[-0.07em] text-white sm:text-5xl">{title}</h3>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {meta.split("/").map((label) => (
            <span key={label} className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-3 text-center text-[10px] font-black uppercase tracking-[0.18em] text-white/55 backdrop-blur-xl">{label.trim()}</span>
          ))}
        </div>
      </div>
      <div className="absolute right-8 top-1/2 hidden h-40 w-40 -translate-y-1/2 rounded-full border border-lime-300/20 bg-lime-300/10 blur-[1px] sm:block" />
      <div className="absolute right-14 top-1/2 hidden h-24 w-24 -translate-y-1/2 rounded-full border border-white/15 sm:block" />
    </div>
  );
}

function PortfolioImageCard({ item, onOpen }) {
  const [imageLoaded, setImageLoaded] = useState(true);

  return (
    <article className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-3 backdrop-blur-xl transition hover:border-lime-300/35 hover:bg-white/[0.06]" data-cursor="project">
      <button type="button" onClick={() => onOpen({ ...item, imageLoaded })} className="block w-full overflow-hidden rounded-[1.5rem] bg-black text-left">
        {imageLoaded ? <img src={item.image} alt={item.title} onError={() => setImageLoaded(false)} className="aspect-[4/3] h-full w-full object-contain bg-black transition duration-700 group-hover:scale-[1.02]" loading="lazy" /> : <GeneratedPortfolioVisual item={item} compact />}
      </button>
      <div className="p-5">
        <p className="mb-2 text-xs font-black uppercase tracking-[0.24em] text-orange-400">{item.category}</p>
        <div className="flex items-center justify-between gap-5">
          <h3 className="text-2xl font-black tracking-[-0.05em]">{item.title}</h3>
          <button type="button" onClick={() => onOpen({ ...item, imageLoaded })} className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/10 text-white/65 transition hover:border-lime-300 hover:text-lime-300"><ArrowIcon /></button>
        </div>
      </div>
    </article>
  );
}

function WebsiteMockup({ item, onOpen }) {
  return (
    <button type="button" onClick={() => onOpen({ ...item, generated: true, category: item.type })} className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 text-left backdrop-blur-xl transition hover:border-lime-300/35 hover:bg-white/[0.06]" data-cursor="project">
      <div className="overflow-hidden rounded-[1.4rem] border border-white/10 bg-[#101010]">
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-orange-500" /><span className="h-3 w-3 rounded-full bg-lime-300" /><span className="h-3 w-3 rounded-full bg-white/30" />
          <span className="ml-auto rounded-full bg-black/50 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/35">Open Preview</span>
        </div>
        <GeneratedPortfolioVisual item={{ ...item, category: item.type }} compact />
      </div>
      <div className="pt-6">
        <p className="mb-2 text-xs font-black uppercase tracking-[0.24em] text-lime-300">{item.type}</p>
        <h3 className="text-2xl font-black tracking-[-0.05em]">{item.title}</h3>
        <p className="mt-3 text-sm text-white/45">{item.meta}</p>
      </div>
    </button>
  );
}

function PreviewModal({ activePreview, onClose }) {
  const [modalImageLoaded, setModalImageLoaded] = useState(true);
  const [modalImageReady, setModalImageReady] = useState(false);

  useEffect(() => {
    if (!activePreview) return undefined;

    const body = document.body;
    const html = document.documentElement;
    const originalBodyOverflow = body.style.overflow;
    const originalHtmlOverflow = html.style.overflow;
    const originalBodyOverscroll = body.style.overscrollBehavior;
    const originalHtmlOverscroll = html.style.overscrollBehavior;
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    body.style.overflow = "hidden";
    html.style.overflow = "hidden";
    body.style.overscrollBehavior = "none";
    html.style.overscrollBehavior = "none";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      body.style.overflow = originalBodyOverflow;
      html.style.overflow = originalHtmlOverflow;
      body.style.overscrollBehavior = originalBodyOverscroll;
      html.style.overscrollBehavior = originalHtmlOverscroll;
    };
  }, [activePreview, onClose]);

  if (!activePreview || typeof document === "undefined") return null;

  const showGenerated = activePreview.generated || !activePreview.image || activePreview.imageLoaded === false || !modalImageLoaded;

  return createPortal(
    <div className="portfolio-modal fixed inset-0 z-[2147483647] flex items-center justify-center bg-black/95 p-4 backdrop-blur-2xl sm:p-6" onMouseDown={onClose} role="dialog" aria-modal="true">
      <div className="relative flex h-[min(92vh,900px)] w-full max-w-[1180px] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0b0b] p-3 shadow-2xl sm:p-4" onMouseDown={(event) => event.stopPropagation()}>
        <div className="flex shrink-0 items-center justify-between gap-4 px-2 pb-3 sm:px-3">
          <div className="min-w-0">
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-lime-300">{activePreview.category || activePreview.type}</p>
            <h3 className="mt-1 truncate text-lg font-black tracking-[-0.04em] text-white sm:text-2xl">{activePreview.title}</h3>
          </div>
          <button type="button" onMouseDown={(event) => { event.stopPropagation(); onClose(); }} aria-label="Close preview" className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-xl font-black text-black transition hover:bg-lime-300">x</button>
        </div>

        <div className="portfolio-modal-stage relative grid min-h-0 flex-1 place-items-center overflow-hidden rounded-[1.5rem] bg-black p-3 sm:p-5">
          {!showGenerated && !modalImageReady && <div className="absolute inset-0 grid place-items-center text-xs font-black uppercase tracking-[0.28em] text-white/35">Loading Preview</div>}
          {showGenerated ? (
            <div className="h-full max-h-[calc(92vh-120px)] w-full max-w-[980px]"><GeneratedPortfolioVisual item={activePreview} /></div>
          ) : (
            <img src={activePreview.image} alt={activePreview.title} onLoad={() => setModalImageReady(true)} onError={() => setModalImageLoaded(false)} className={`block h-auto max-h-[calc(92vh-120px)] w-auto max-w-full rounded-[1.2rem] object-contain transition-opacity duration-300 ${modalImageReady ? "opacity-100" : "opacity-0"}`} />
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function PortfolioShowcaseSection() {
  const [activePreview, setActivePreview] = useState(null);
  const closePreview = useCallback(() => setActivePreview(null), []);
  const previewKey = activePreview ? `${activePreview.title}-${activePreview.image || "generated"}` : "empty";

  return (
    <section id="portfolio-gallery" className="relative overflow-hidden bg-[#090909] px-5 py-24 text-white sm:px-8 lg:px-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(163,230,53,0.12),transparent_30%),radial-gradient(circle_at_90%_60%,rgba(249,115,22,0.10),transparent_30%)]" />
      <div className="relative mb-12 grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-lime-300">Portfolio Gallery</p>
          <ScrollRevealText text="Graphic design and website preview work." className="text-5xl font-black leading-[0.9] tracking-[-0.07em] sm:text-7xl" />
        </div>
        <p className="max-w-2xl text-lg leading-relaxed text-white/55">A visual section for your homepage and portfolio page. Clients can preview designs, view images, and understand your range across websites, creatives, funnels, and social graphics.</p>
      </div>

      <div className="relative mb-14 grid gap-5 lg:grid-cols-3">{websitePortfolio.map((item) => <WebsiteMockup key={item.title} item={item} onOpen={setActivePreview} />)}</div>
      <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{portfolioGraphics.map((item) => <PortfolioImageCard key={item.title} item={item} onOpen={setActivePreview} />)}</div>
      <PreviewModal key={previewKey} activePreview={activePreview} onClose={closePreview} />
    </section>
  );
}

export { GeneratedPortfolioVisual };
