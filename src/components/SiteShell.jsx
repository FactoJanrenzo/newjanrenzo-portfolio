import { lazy, Suspense, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ScrollToTopButton } from "./PageEffects.jsx";

const HomePage = lazy(() => import("../pages/HomePage.jsx"));
const AboutPage = lazy(() => import("../pages/AboutPage.jsx"));
const ContactPage = lazy(() => import("../pages/ContactPage.jsx"));
const PortfolioPage = lazy(() => import("../pages/PortfolioPage.jsx"));
const ProjectCaseStudyPage = lazy(() => import("../pages/ProjectCaseStudyPage.jsx"));
const ServicesPage = lazy(() => import("../pages/ServicesPage.jsx"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage.jsx"));

export default function SiteShell() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) window.scrollTo({ top: 0, behavior: "auto" });
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const registered = new WeakSet();
    const observer = reducedMotion ? null : new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }),
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    const registerTargets = () => {
      const root = document.getElementById("main-content");
      if (!root) return;
      const targets = root.querySelectorAll("section:not(:first-child), article, .motion-card");
      Array.from(targets).forEach((target, index) => {
        if (registered.has(target)) return;
        registered.add(target);
        target.classList.add("reveal-on-scroll");
        target.style.setProperty("--delay", `${Math.min(index * 30, 180)}ms`);
        if (reducedMotion) target.classList.add("is-visible");
        else observer.observe(target);
      });
    };

    const frame = requestAnimationFrame(registerTargets);
    const mutations = new MutationObserver(registerTargets);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(frame);
      mutations.disconnect();
      observer?.disconnect();
    };
  }, [location.hash, location.pathname]);

  useEffect(() => {
    if (!location.hash) return undefined;
    let id;
    try {
      id = decodeURIComponent(location.hash.slice(1));
    } catch {
      return undefined;
    }
    let observer;
    const scrollToTarget = () => {
      const target = document.getElementById(id);
      if (!target) return false;
      target.scrollIntoView({ behavior: "auto", block: "start" });
      return true;
    };
    const frame = requestAnimationFrame(() => {
      if (scrollToTarget()) return;
      observer = new MutationObserver(() => {
        if (scrollToTarget()) observer.disconnect();
      });
      observer.observe(document.body, { childList: true, subtree: true });
    });
    const timeout = window.setTimeout(() => {
      scrollToTarget();
      observer?.disconnect();
    }, 1500);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
      observer?.disconnect();
    };
  }, [location.hash, location.pathname]);

  return (
    <div data-site-version="3.0.0" className="portfolio-page min-h-screen">
      <ScrollToTopButton />
      <Suspense fallback={<main id="main-content" className="min-h-screen bg-[#070806]" aria-busy="true" />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/portfolio/power-outage-solar" element={<Navigate to="/portfolio/sunday-family-cell-celebration" replace />} />
          <Route path="/portfolio/:projectId" element={<ProjectCaseStudyPage />} />
          <Route path="/work" element={<Navigate to="/portfolio" replace />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}
