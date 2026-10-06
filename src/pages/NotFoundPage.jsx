import { Link } from "react-router-dom";
import PageHeader, { PageMeta, SiteFooter } from "../components/PageHeader";

export default function NotFoundPage() {
  return (
    <>
      <PageMeta
        title="Page Not Found"
        description="The requested page could not be found."
        path="/404"
        noIndex
      />
      <PageHeader />
      <main id="main-content" className="site-grid-bg grid min-h-[calc(100svh-5rem)] place-items-center overflow-hidden bg-[#070806] px-5 py-24 text-white">
        <section className="page-intro relative w-full max-w-6xl border-y border-white/10 py-16 sm:py-24">
          <p className="section-kicker">404 / Off the grid</p>
          <div className="page-intro-copy mt-7 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h1 className="page-title max-w-4xl">This page is not part of the system.</h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/65">
                The link may be outdated, private, or mistyped. Return to the work index or start from the homepage.
              </p>
            </div>
            <span aria-hidden="true" className="text-[clamp(7rem,20vw,15rem)] font-bold leading-[0.72] tracking-[-0.1em] text-lime-300/15">404</span>
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link to="/" className="button-primary">Back Home</Link>
            <Link to="/portfolio" className="button-secondary">View Selected Work</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
