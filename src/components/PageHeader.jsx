import { useContext, useEffect, useRef, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { brandAvatarImage, navLinks, siteConfig } from "../data/siteContent";
import { PageMetaContext, resolvePageMeta } from "./pageMeta";

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

const navClass = ({ isActive }) => (isActive ? "is-active" : undefined);

export default function PageHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 8);
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

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <div className="wrap header-inner">
        <Link to="/" className="logo" onClick={closeMenu} aria-label={`${siteConfig.name}, home`}>
          <img className="logo-avatar" src={brandAvatarImage} alt="" width="40" height="40" />
          <span>{siteConfig.name}</span>
        </Link>

        <nav className="nav" aria-label="Primary">
          {navLinks.map((link) => <NavLink key={link.href} to={link.href} className={navClass}>{link.label}</NavLink>)}
        </nav>

        <div className="header-actions">
          <span className="status"><i aria-hidden="true" />Available for projects</span>
          <Link to="/contact" className="btn btn-accent">Start a project</Link>
          <button
            ref={menuButtonRef}
            type="button"
            className="menu-btn"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      <nav id="mobile-navigation" className="wrap mobile-nav" aria-label="Mobile" hidden={!menuOpen}>
        {navLinks.map((link) => <NavLink key={link.href} to={link.href} className={navClass} onClick={closeMenu}>{link.label}</NavLink>)}
        <Link to="/contact" className="btn btn-accent" onClick={closeMenu}>Start a project <ArrowRight aria-hidden="true" /></Link>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="logo" aria-label={`${siteConfig.name}, home`}>
              <img className="logo-avatar" src={brandAvatarImage} alt="" width="40" height="40" loading="lazy" decoding="async" />
              <span>{siteConfig.name}</span>
            </Link>
            <p>WordPress websites, landing pages, GoHighLevel funnels, and lead systems for businesses ready to grow.</p>
          </div>
          <nav className="footer-nav" aria-label="Footer">
            <Link to="/">Home</Link>
            {navLinks.map((link) => <Link key={link.href} to={link.href}>{link.label}</Link>)}
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© 2026 {siteConfig.name}</span>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        </div>
      </div>
    </footer>
  );
}
