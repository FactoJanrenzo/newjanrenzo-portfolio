import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import PageHeader, { PageMeta, SiteFooter } from "../components/PageHeader";
import { HeroOrbs } from "../components/Sections";

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
      <main id="main-content">
        <section className="notfound" aria-labelledby="notfound-title">
          <HeroOrbs />
          <div className="wrap">
            <span className="notfound-code rise" aria-hidden="true">404</span>
            <p className="kicker rise" style={{ "--d": "80ms", marginTop: "32px" }}>Off the grid</p>
            <h1 className="page-title rise" id="notfound-title" style={{ "--d": "140ms" }}>This page is not part of the system.</h1>
            <p className="lead rise" style={{ "--d": "200ms", marginTop: "24px" }}>The link may be outdated, private, or mistyped. Return to the work index or start from the homepage.</p>
            <div className="ctas rise" style={{ "--d": "260ms" }}>
              <Link to="/" className="btn btn-accent">Back home <ArrowRight aria-hidden="true" /></Link>
              <Link to="/portfolio" className="btn btn-ghost">View selected work</Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
