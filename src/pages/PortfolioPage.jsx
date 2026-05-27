import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { GeneratedPortfolioVisual } from "../components/PortfolioShowcase";
import { websitePortfolio } from "../data/siteContent";

const graphicPortfolioItems = [
  {
    title: "Business Website Promo",
    category: "Web Design",
    image: "/portfolio/website-business.jpg",
  },
  {
    title: "Vortex VA Hiring Creative",
    category: "Recruitment Graphic",
    image: "/portfolio/vortex-hiring-va.jpg",
  },
  {
    title: "Vortex Quote Design",
    category: "Brand Social",
    image: "/portfolio/vortex-quote.jpg",
  },
  {
    title: "Mushroom Benefits Campaign",
    category: "Health Creative",
    image: "/portfolio/mushroom-benefits.jpg",
  },
  {
    title: "Power Outage Solar Creative",
    category: "Solar Marketing",
    image: "/portfolio/power-outage.jpg",
  },
  {
    title: "Mother's Day Service Post",
    category: "Event Creative",
    image: "/portfolio/mothers-day.jpg",
  },
  {
    title: "Empowerment Night",
    category: "Church Event",
    image: "/portfolio/empowerment-night.jpg",
  },
  {
    title: "Leaders Convergence",
    category: "Event Branding",
    image: "/portfolio/leaders-convergence.jpg",
  },
  {
    title: "Power Night",
    category: "Social Media",
    image: "/portfolio/power-night.jpg",
  },
];

function PortfolioModal({ item, onClose }) {
  useEffect(() => {
    if (!item) return;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  const isGenerated = item.generated || !item.image;
  const isScrollableImage = Boolean(item.scrollableImage && item.image);

  return (
    <div
      className="fixed inset-0 z-[9999] grid place-items-center bg-black/90 p-4 backdrop-blur-xl"
      onMouseDown={onClose}
    >
      <div
        className="relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0b0b] p-3 shadow-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-white/10 px-2 pb-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-lime-300">
              {item.category || item.type}
            </p>
            <h2 className="mt-1 text-xl font-black tracking-[-0.04em] text-white sm:text-2xl">
              {item.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-xl font-black text-black transition hover:bg-lime-300"
          >
            ×
          </button>
        </div>

        <div className="grid min-h-0 flex-1 place-items-center overflow-hidden pt-3">
          {isGenerated ? (
            <div className="h-full max-h-[76vh] w-full max-w-5xl">
              <GeneratedPortfolioVisual item={item} />
            </div>
          ) : isScrollableImage ? (
            <div className="h-full w-full overflow-y-auto rounded-[1.5rem] bg-black">
              <img
                src={item.image}
                alt={item.title}
                className="mx-auto h-auto w-full max-w-5xl rounded-[1.5rem]"
              />
            </div>
          ) : (
            <img
              src={item.image}
              alt={item.title}
              className="max-h-[76vh] w-full rounded-[1.5rem] object-contain"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  const [activeItem, setActiveItem] = useState(null);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050605] text-white">
      <PageHeader active="Portfolio" />

      <section className="px-5 pb-16 pt-32 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="mb-5 text-xs font-black uppercase tracking-[0.4em] text-lime-300">
            Selected Works
          </p>

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <h1 className="text-6xl font-black leading-[0.88] tracking-[-0.08em] sm:text-8xl lg:text-9xl">
              Portfolio
              <span className="block text-white/25">Gallery</span>
            </h1>

            <p className="max-w-2xl text-lg leading-relaxed text-white/55">
              A collection of website visuals, social creatives, event graphics,
              and campaign design work built with clarity, premium layout,
              and conversion in mind.
            </p>
          </div>

          <div className="mt-12">
            <p className="mb-5 text-xs font-black uppercase tracking-[0.28em] text-white/35">
              Website Projects
            </p>
            <div className="grid gap-5 lg:grid-cols-3">
              {websitePortfolio.map((item) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() =>
                    setActiveItem({
                      ...item,
                      category: item.type,
                      generated: !item.image,
                    })
                  }
                  className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-4 text-left transition hover:-translate-y-1 hover:border-lime-300/40 hover:bg-white/[0.06]"
                >
                  {item.image ? (
                    <div className="overflow-hidden rounded-[1.5rem] bg-black">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="aspect-[4/3] h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <GeneratedPortfolioVisual
                      item={{ ...item, category: item.type }}
                      compact
                    />
                  )}
                  <div className="p-4">
                    <p className="text-xs font-black uppercase tracking-[0.24em] text-lime-300">
                      {item.type}
                    </p>
                    <h2 className="mt-3 text-2xl font-black tracking-[-0.05em]">
                      {item.title}
                    </h2>
                    <p className="mt-4 text-sm text-white/45">
                      {item.scrollableImage ? "Click to scroll the website preview." : item.meta}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <p className="mb-5 text-xs font-black uppercase tracking-[0.28em] text-white/35">
              Graphic & Campaign Work
            </p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {graphicPortfolioItems.map((item) => (
              <button
                key={item.title}
                type="button"
                onClick={() => setActiveItem(item)}
                className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] text-left transition hover:-translate-y-1 hover:border-lime-300/40 hover:bg-white/[0.06]"
              >
                <div className="aspect-[4/5] overflow-hidden bg-white/5">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="p-5">
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-lime-300">
                    {item.category}
                  </p>
                  <h2 className="mt-3 text-2xl font-black tracking-[-0.05em]">
                    {item.title}
                  </h2>
                  <p className="mt-4 text-sm text-white/45">
                    Click to preview the full design.
                  </p>
                </div>
              </button>
            ))}
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/"
              className="inline-flex justify-center rounded-full bg-white px-7 py-4 text-sm font-black uppercase tracking-[0.14em] text-black transition hover:bg-lime-300"
            >
              Back to Home
            </Link>

            <Link
              to="/contact"
              className="inline-flex justify-center rounded-full border border-white/15 bg-white/[0.04] px-7 py-4 text-sm font-black uppercase tracking-[0.14em] text-white transition hover:bg-white hover:text-black"
            >
              Start a Project
            </Link>
          </div>
        </div>
      </section>

      <PortfolioModal item={activeItem} onClose={() => setActiveItem(null)} />
    </main>
  );
}
