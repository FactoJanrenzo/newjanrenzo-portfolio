import { useContext, useEffect, useRef, useState } from "react";
import { Briefcase, Home, Mail, User, Wrench } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { brandAvatarImage, navLinks, siteConfig } from "../data/siteContent";
import Dock from "./Dock";
import { PageMetaContext, resolvePageMeta } from "./pageMeta";

const dockIcons = {
  About: User,
  Portfolio: Briefcase,
  Services: Wrench,
  Contact: Mail,
};

const dockItems = [
  { label: "Home", href: "/", icon: Home },
  ...navLinks.map((link) => ({ ...link, icon: dockIcons[link.label] })),
];

function setMeta(selector, attributes) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
}

export function PageMeta(props) {
  const reportMeta = useContext(PageMetaContext);
  const meta = resolvePageMeta(props);
  reportMeta?.(meta);
  const { title, description, canonicalUrl, image, robots } = meta;

  useEffect(() => {
    document.title = title;
    setMeta('meta[name="description"]', { name: "description", content: description });
    setMeta('meta[name="robots"]', { name: "robots", content: robots });
    setMeta('meta[property="og:title"]', { property: "og:title", content: title });
    setMeta('meta[property="og:description"]', { property: "og:description", content: description });
    setMeta('meta[property="og:url"]', { property: "og:url", content: canonicalUrl });
    setMeta('meta[property="og:image"]', { property: "og:image", content: image });
    setMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    setMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    setMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title });
    setMeta('meta[name="twitter:description"]', { name: "twitter:description", content: description });
    setMeta('meta[name="twitter:image"]', { name: "twitter:image", content: image });

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
  }, [canonicalUrl, description, image, robots, title]);

  return null;
}

export default function PageHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    const updateHeader = () => setCompact(window.scrollY > 32);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  return (
    <header className={`v2-site-header ${compact ? "is-compact" : ""}`}>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <div className="site-header-shell">
        <Link to="/" onClick={() => setMenuOpen(false)} className="flex min-w-0 items-center gap-3 rounded-md focus-ring">
          <img src={brandAvatarImage} alt="" width="40" height="40" className="site-header-avatar h-10 w-10 shrink-0 rounded-full border border-lime-300/70 object-cover object-center ring-2 ring-lime-300/10" />
          <span className="min-w-0">
            <span className="block truncate text-sm font-bold text-white">{siteConfig.name}</span>
            <span className="mt-0.5 block truncate text-xs text-white/65">{siteConfig.role}</span>
          </span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden min-w-0 items-center md:flex">
          <Dock items={dockItems} />
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/contact" className="button-primary site-header-cta hidden sm:inline-flex">
            Start a Project
          </Link>
          <button
            ref={menuButtonRef}
            type="button"
            className="menu-button focus-ring md:hidden"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
            <span aria-hidden="true" className={menuOpen ? "menu-icon is-open" : "menu-icon"}>
              <span />
              <span />
            </span>
          </button>
        </div>

        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          aria-hidden={!menuOpen}
          inert={!menuOpen}
          className={`mobile-navigation-panel md:hidden ${menuOpen ? "is-open" : ""}`}
        >
          <div className="grid gap-1">
            {navLinks.map((link) => (
              <NavLink key={link.label} to={link.href} onClick={() => setMenuOpen(false)} className={({ isActive }) => `mobile-nav-link focus-ring ${isActive ? "bg-lime-300 text-black" : "text-white/75"}`}>
                {link.label}
              </NavLink>
            ))}
            <Link to="/contact" onClick={() => setMenuOpen(false)} className="button-primary mt-2 justify-center sm:hidden">
              Start a Project
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black text-white">
      <div className="site-container grid gap-10 py-12 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <Link to="/" className="inline-flex items-center gap-3 rounded-md focus-ring">
            <img src={brandAvatarImage} alt="" width="40" height="40" loading="lazy" decoding="async" className="h-10 w-10 rounded-full border border-lime-300/70 object-cover object-center ring-2 ring-lime-300/10" />
            <span>
              <span className="block text-sm font-bold">{siteConfig.name}</span>
              <span className="mt-1 block text-xs text-white/65">{siteConfig.role}</span>
            </span>
          </Link>
          <p className="mt-5 max-w-xl text-sm leading-6 text-white/65">
            WordPress websites, landing pages, GoHighLevel funnels, and lead systems for businesses ready to grow.
          </p>
        </div>

        <div className="lg:text-right">
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-3 lg:justify-end">
            {navLinks.map((link) => (
              <Link key={link.label} to={link.href} className="rounded-sm text-sm text-white/70 transition hover:text-lime-300 focus-ring">
                {link.label}
              </Link>
            ))}
          </nav>
          <p className="mt-6 text-xs text-white/65">
            &copy; 2026 {siteConfig.name}. <span className="ml-2 text-lime-300/80">v{siteConfig.version}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
