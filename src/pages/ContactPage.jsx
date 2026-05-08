import { Link } from "react-router-dom";
import { ContactSection, FaqSection } from "../components/Sections";

export default function ContactPage() {
  return (
    <main
      className="min-h-screen overflow-x-hidden bg-[#090909] text-white"
      style={{
        fontFamily:
          "Space Grotesk, Inter, Arial Black, Helvetica Neue, sans-serif",
      }}
    >
      <header className="fixed left-3 right-3 top-4 z-50 mx-auto max-w-7xl rounded-full border border-white/10 bg-black/70 px-4 py-3 backdrop-blur-2xl sm:left-6 sm:right-6">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-lime-300 text-sm font-black text-black">
              JF
            </div>
            <div>
              <p className="text-sm font-black leading-none">Janrenzo Facto</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/35">
                Project Inquiry
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 text-sm text-white/65 md:flex">
            <Link to="/" className="transition hover:text-white">
              Home
            </Link>
            <Link to="/portfolio" className="transition hover:text-white">
              Portfolio
            </Link>
            <Link to="/contact" className="text-lime-300">
              Contact
            </Link>
          </nav>

          <a
            href="mailto:janrenzofacto@gmail.com"
            className="hidden rounded-full bg-lime-300 px-5 py-3 text-xs font-black uppercase tracking-[0.12em] text-black transition hover:bg-white sm:inline-flex"
          >
            Email Me
          </a>
        </div>
      </header>

      <section className="px-5 pb-6 pt-32 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="mb-5 text-xs font-black uppercase tracking-[0.4em] text-lime-300">
            Hire Janrenzo
          </p>
          <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-end">
            <h1 className="text-5xl font-black leading-[0.9] tracking-[-0.07em] sm:text-7xl lg:text-8xl">
              Let's talk about your next website.
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-white/55">
              Send the scope, timeline, and goals for your website, funnel, or
              automation project. I will review the details and reply with the
              best next step.
            </p>
          </div>
        </div>
      </section>

      <ContactSection />
      <FaqSection />
    </main>
  );
}
