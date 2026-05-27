import PageHeader from "../components/PageHeader";
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
      <PageHeader
        active="Contact"
        subtitle="Project Inquiry"
        ctaLabel="Email Me"
        ctaHref="mailto:janrenzofacto@gmail.com"
      />

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
