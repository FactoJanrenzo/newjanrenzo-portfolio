import {
  clientTestimonials,
  creativeOrbitItems,
  experienceReviews,
  faqs,
  processSteps,
  professionalHistory,
  responseFlow,
  services,
  toolsBottom,
  toolsTop,
  whyWorkWithMe,
} from "../data/siteContent";
import ContactForm from "./ContactForm";
import ScrollRevealText from "./ScrollRevealText";
import { ArrowIcon, MailIcon, ToolGlyph } from "./Icons";
import { StudioRoomBackground } from "./PageEffects";

export function ToolMarquee({ items, reverse = false }) {
  const doubled = [...items, ...items, ...items];
  return (
    <div className="overflow-hidden py-2">
      <div className={`flex w-max gap-3 ${reverse ? "animate-[marqueeReverse_26s_linear_infinite]" : "animate-[marquee_28s_linear_infinite]"}`}>
        {doubled.map((tool, index) => <span key={`${tool}-${index}`} className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white/75 backdrop-blur transition hover:border-lime-300/50 hover:text-lime-200">{tool}</span>)}
      </div>
    </div>
  );
}

export function OrbitingProfessionVisual() {
  return (
    <div className="relative mx-auto grid h-[340px] w-full max-w-[320px] place-items-center overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.035] p-5 shadow-2xl backdrop-blur-xl sm:h-[460px] sm:max-w-[420px] sm:rounded-[3rem] sm:p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(163,230,53,0.22),transparent_38%),radial-gradient(circle_at_80%_20%,rgba(249,115,22,0.22),transparent_32%)]" />
      <div className="absolute h-[82%] w-[82%] rounded-full border border-dashed border-white/15" />
      <div className="absolute h-[62%] w-[62%] rounded-full border border-white/10" />
      <div className="absolute h-[44%] w-[44%] rounded-full border border-lime-300/10" />

      <div className="orbit-ring absolute grid h-[72%] w-[72%] place-items-center rounded-full [--orbit-radius:96px] sm:h-[76%] sm:w-[76%] sm:[--orbit-radius:150px]">
        {creativeOrbitItems.map((item, index) => (
          <div key={item.label} className="orbit-item absolute left-1/2 top-1/2" style={{ "--angle": `${(360 / creativeOrbitItems.length) * index}deg` }}>
            <div className="orbit-counter grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-black/75 text-center shadow-2xl backdrop-blur-xl sm:h-auto sm:w-auto sm:rounded-3xl sm:px-4 sm:py-3">
              <p className="text-sm font-black text-lime-300 sm:text-lg">{item.symbol}</p>
              <p className="mt-1 hidden text-[9px] font-black uppercase tracking-[0.2em] text-white/45 sm:block">{item.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-10 grid aspect-square w-[43%] min-w-[126px] place-items-center rounded-full bg-black shadow-[0_0_80px_rgba(190,252,53,0.2)] ring-1 ring-lime-300/10 sm:w-[44%] sm:min-w-[165px]">
        <div className="text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.38em] text-lime-300 sm:text-xs sm:tracking-[0.45em]">Creative</p>
          <h3 className="mt-3 text-3xl font-black tracking-[-0.08em] text-white sm:text-4xl">Builder</h3>
          <p className="mt-4 text-[10px] font-black uppercase tracking-[0.18em] text-white/40 sm:text-xs sm:tracking-[0.24em]">Web / GHL / SEO</p>
        </div>
      </div>
    </div>
  );
}

export function ToolsSection() {
  return (
    <section id="tools" className="border-y border-white/10 bg-[#0d0d0d] px-5 py-20 sm:px-8 lg:px-12">
      <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-lime-300">Tools & Stack</p>
          <ScrollRevealText text="The tools I use to build, launch, and optimize." className="max-w-3xl text-5xl font-black leading-[0.9] tracking-[-0.06em] sm:text-7xl" />
        </div>
        <p className="max-w-xl text-lg leading-relaxed text-white/55">A moving toolkit section to quickly show clients your WordPress, funnel, SEO, frontend, and design capability.</p>
      </div>
      <div className="space-y-3"><ToolMarquee items={toolsTop} /><ToolMarquee items={toolsBottom} reverse /></div>
    </section>
  );
}

export function WhyChooseSection() {
  return (
    <section className="relative overflow-hidden bg-[#090909] px-5 py-24 text-white sm:px-8 lg:px-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(249,115,22,0.16),transparent_26%),radial-gradient(circle_at_85%_70%,rgba(163,230,53,0.14),transparent_30%)]" />
      <div className="relative grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <div>
          <div className="mb-6 flex items-center gap-3"><span className="h-3 w-3 rounded-full border-2 border-orange-500" /><p className="text-xs font-black uppercase tracking-[0.38em] text-white/70">Why Choose Me?</p></div>
          <ScrollRevealText text="Brands and clients, take a look at the systems I can build." className="max-w-4xl text-5xl font-black leading-[0.9] tracking-[-0.07em] sm:text-7xl" />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="glass-card rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl"><p className="text-4xl font-black text-lime-300">5+</p><p className="mt-2 text-sm font-black uppercase tracking-[0.2em] text-white/35">Years WordPress</p><p className="mt-5 text-white/55">Experienced in Elementor, Divi, Kadence, Beaver Builder, Avada, Enfold, ACF, speed, and SEO structure.</p></div>
            <div className="glass-card rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl"><p className="text-4xl font-black text-orange-400">360</p><p className="mt-2 text-sm font-black uppercase tracking-[0.2em] text-white/35">Digital Execution</p><p className="mt-5 text-white/55">From layout and copy direction to GHL funnels, CRM workflows, frontend tweaks, and launch support.</p></div>
            <div className="glass-card rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl md:col-span-2">
              <p className="text-2xl font-black tracking-[-0.04em]">Not just design, a conversion-ready web system.</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">{["Developer", "Graphic Designer", "Video Editor"].map((item) => <span key={item} className="rounded-full border border-white/10 bg-black/30 px-4 py-3 text-center text-xs font-black uppercase tracking-[0.16em] text-white/55">{item}</span>)}</div>
            </div>
          </div>
        </div>
        <OrbitingProfessionVisual />
      </div>
    </section>
  );
}

export function ServicesSection() {
  return (
    <section id="services" className="rounded-t-[3rem] bg-white px-5 py-24 text-black sm:px-8 lg:px-12">
      <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-8">
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-black/45">What I Do</p>
          <ScrollRevealText text="Websites, funnels, and digital systems." className="text-5xl font-black leading-[0.9] tracking-[-0.07em] sm:text-7xl" activeClass="text-black" inactiveClass="text-black/15" />
          <p className="mt-7 text-lg leading-relaxed text-black/60">I combine design, frontend, SEO structure, and automation thinking so your online presence looks premium and works harder.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {services.map((service) => (
            <div key={service.title} className="group flex min-h-[320px] flex-col justify-between overflow-hidden rounded-[2rem] border border-black/10 bg-black/[0.03] p-7 transition hover:bg-black/[0.055]">
              <div className="relative mb-8 grid h-28 place-items-center rounded-[1.5rem] bg-black text-lime-300"><div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(163,230,53,0.22),transparent_58%)]" /><ToolGlyph type={service.iconType} className="relative z-10 transition group-hover:scale-110" /></div>
              <div><h3 className="mb-4 text-2xl font-black tracking-[-0.04em]">{service.title}</h3><p className="leading-relaxed text-black/60">{service.text}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HistoryTimeline() {
  return (
    <section id="history" className="relative bg-[#090909] px-5 py-24 text-white sm:px-8 lg:px-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(163,230,53,0.10),transparent_34%),radial-gradient(circle_at_85%_80%,rgba(249,115,22,0.10),transparent_30%)]" />
      <div className="relative mb-12 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
        <div><p className="mb-4 text-xs uppercase tracking-[0.4em] text-lime-300">Work History</p><ScrollRevealText text="Previous work that shaped my execution." className="text-5xl font-black leading-[0.9] tracking-[-0.07em] sm:text-7xl" /></div>
        <p className="max-w-2xl text-lg leading-relaxed text-white/55">A focused career snapshot showing where my WordPress, GoHighLevel, frontend, SEO, design, and campaign experience comes from.</p>
      </div>
      <div className="relative grid gap-5">
        {professionalHistory.map((item, index) => (
          <article key={item.role} className="glass-card group grid gap-6 rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl transition hover:border-lime-300/30 md:grid-cols-[180px_1fr] md:p-8">
            <div><p className="text-xs font-black uppercase tracking-[0.3em] text-orange-400">{item.period}</p><p className="mt-4 text-5xl font-black text-white/10">0{index + 1}</p></div>
            <div><p className="mb-2 text-sm font-black uppercase tracking-[0.22em] text-lime-300">{item.company}</p><h3 className="text-3xl font-black tracking-[-0.05em]">{item.role}</h3><p className="mt-4 max-w-4xl text-lg leading-relaxed text-white/55">{item.text}</p></div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ProcessSection() {
  return (
    <section id="process" className="bg-white px-5 py-24 text-black sm:px-8 lg:px-12">
      <div className="relative overflow-hidden rounded-[3rem] bg-[#090909] p-6 text-white sm:p-10 lg:p-14">
        <div className="absolute right-0 top-0 h-[480px] w-[480px] rounded-full bg-lime-300/15 blur-[130px]" />
        <div className="relative grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div><p className="mb-4 text-xs uppercase tracking-[0.4em] text-lime-300">Process</p><ScrollRevealText text="Simple steps. Strong execution." className="text-5xl font-black leading-[0.9] tracking-[-0.07em] sm:text-7xl" /></div>
          <div className="space-y-3">{processSteps.map((step, index) => <div key={step} className="flex items-center gap-5 rounded-3xl border border-white/10 bg-white/[0.04] p-5"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-lime-300 font-black text-black">{String(index + 1).padStart(2, "0")}</span><p className="text-xl font-semibold tracking-tight">{step}</p></div>)}</div>
        </div>
      </div>
    </section>
  );
}

export function ClientTestimonialsSection() {
  return (
    <section className="relative overflow-hidden bg-[#050505] px-5 py-24 text-white sm:px-8 lg:px-12">
      <StudioRoomBackground /><div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/60 to-black" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-14 grid gap-8 border-t border-white/10 pt-6 lg:grid-cols-[0.7fr_1.3fr_0.2fr] lg:items-start">
          <div className="flex items-center gap-3"><span className="h-3 w-3 rounded-full border-2 border-orange-500" /><p className="text-xs font-black uppercase tracking-[0.32em] text-white/75">Client Experience</p></div>
          <ScrollRevealText text="Realistic feedback a client should feel after working with me." className="text-center text-4xl font-black leading-[1.05] tracking-[-0.05em] sm:text-6xl lg:text-7xl" />
          <p className="text-right text-sm font-black text-orange-500">08</p>
        </div>
        <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
          {clientTestimonials.map((item, index) => (
            <article key={`${item.role}-${index}`} className="group">
              <div className="glass-card rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-7 backdrop-blur-xl transition group-hover:border-orange-500/40 group-hover:bg-white/[0.06]">
                <div className="mb-5 flex gap-2 text-orange-500">{Array.from({ length: 5 }).map((_, star) => <span key={star} className="h-2 w-2 rounded-full border border-current" />)}</div>
                <p className="text-lg leading-relaxed text-white/70">"{item.quote}"</p>
              </div>
              <div className="mt-5 flex items-center gap-4 pl-7"><div className="grid h-14 w-14 place-items-center rounded-full bg-lime-300 text-sm font-black text-black">{String(index + 1).padStart(2, "0")}</div><div><p className="text-xs font-black uppercase tracking-[0.2em] text-orange-500">{item.role}</p><p className="mt-1 text-lg font-black tracking-[-0.03em]">{item.company}</p></div></div>
            </article>
          ))}
        </div>
        <p className="mt-10 max-w-3xl text-sm leading-relaxed text-white/35">Note: These are placeholder client-style reviews for presentation only. Replace them with verified testimonials once your portfolio is ready to publish.</p>
      </div>
    </section>
  );
}

export function ExperienceReviewSection() {
  return (
    <section className="relative overflow-hidden bg-[#0b0b0b] px-5 py-24 text-white sm:px-8 lg:px-12">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:84px_84px] opacity-25" />
      <div className="relative mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div><p className="mb-4 text-xs uppercase tracking-[0.4em] text-orange-400">Experience Review</p><ScrollRevealText text="A premium client experience, not just a good-looking page." className="max-w-4xl text-5xl font-black leading-[0.9] tracking-[-0.07em] sm:text-7xl" /></div>
        <div className="rounded-full border border-white/10 bg-white/[0.045] px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-white/60 backdrop-blur-xl">Glass UI System</div>
      </div>
      <div className="relative grid gap-5 md:grid-cols-3">
        {experienceReviews.map((review) => <article key={review.title} className="glass-card min-h-[330px] rounded-[2rem] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl transition hover:border-lime-300/30 hover:bg-white/[0.07]"><div className="mb-10 flex items-center justify-between"><span className="text-sm font-black uppercase tracking-[0.28em] text-lime-300">{review.score}</span><span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/35">5/5</span></div><h3 className="text-3xl font-black leading-none tracking-[-0.05em]">{review.title}</h3><p className="mt-5 leading-relaxed text-white/55">{review.text}</p></article>)}
      </div>
    </section>
  );
}

export function WhyWorkWithMeSection() {
  return (
    <section className="bg-white px-5 py-24 text-black sm:px-8 lg:px-12">
      <div className="grid gap-5 lg:grid-cols-3">
        <div className="flex min-h-[420px] flex-col justify-between rounded-[2rem] bg-lime-300 p-8 lg:col-span-1"><p className="text-sm uppercase tracking-[0.35em] text-black/55">Why Work With Me</p><ScrollRevealText text="Clean design. Clear strategy. Fast execution." className="text-5xl font-black leading-[0.9] tracking-[-0.07em]" activeClass="text-black" inactiveClass="text-black/20" /></div>
        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-2">{whyWorkWithMe.map((text) => <div key={text} className="flex items-start gap-4 rounded-[2rem] border border-black/10 p-7"><span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-black text-sm text-lime-300">✓</span><p className="text-xl font-semibold leading-snug">{text}</p></div>)}</div>
      </div>
    </section>
  );
}

export function QuickContactSection() {
  return (
    <section className="bg-white px-5 py-24 text-black sm:px-8 lg:px-12">
      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative overflow-hidden rounded-[3rem] bg-[#090909] p-8 text-white sm:p-12 lg:p-16">
          <div className="absolute -right-20 -top-20 h-[360px] w-[360px] rounded-full bg-lime-300/20 blur-[100px]" />
          <div className="relative">
            <p className="mb-5 text-xs uppercase tracking-[0.4em] text-lime-300">Quick Contact</p>
            <ScrollRevealText text="Got a website idea? Let's turn it into something premium." className="max-w-4xl text-5xl font-black leading-[0.9] tracking-[-0.07em] sm:text-7xl" />
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/60">Use the contact page to send your project details. When this goes live on Netlify, submissions can be saved in your dashboard and sent to your email.</p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row"><a href="/contact" className="inline-flex items-center justify-center rounded-full bg-lime-300 px-8 py-4 text-sm font-black uppercase tracking-[0.12em] text-black transition hover:bg-white">Start a Project <ArrowIcon className="ml-2" /></a><a href="mailto:janrenzofacto@gmail.com" className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:bg-white hover:text-black"><MailIcon className="mr-2" /> Email Me</a></div>
          </div>
        </div>
        <div className="rounded-[3rem] border border-black/10 bg-lime-300 p-8 sm:p-10">
          <p className="mb-12 text-xs font-black uppercase tracking-[0.35em] text-black/50">Response Flow</p>
          <div className="space-y-5">{responseFlow.map((item, index) => <div key={item} className="flex items-center gap-4 rounded-3xl bg-black/[0.06] p-5"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-black font-black text-lime-300">{String(index + 1).padStart(2, "0")}</span><p className="text-lg font-black leading-tight tracking-[-0.03em]">{item}</p></div>)}</div>
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="relative bg-[#090909] px-5 py-24 text-white sm:px-8 lg:px-12">
      <div className="pointer-events-none absolute inset-0"><div className="absolute left-[-10%] top-10 h-[480px] w-[480px] rounded-full bg-lime-300/10 blur-[120px]" /><div className="absolute bottom-[-20%] right-[-10%] h-[520px] w-[520px] rounded-full bg-white/5 blur-[120px]" /></div>
      <div className="relative grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="lg:sticky lg:top-8">
          <p className="mb-5 text-xs uppercase tracking-[0.4em] text-lime-300">Contact Page</p>
          <ScrollRevealText text="Let's build your next website." className="text-6xl font-black leading-[0.85] tracking-[-0.08em] sm:text-8xl" />
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/60">Fill out the form with your project details, preferred timeline, and the kind of website or funnel you need. This page gives potential clients a clear place to start a project with you.</p>
          <div className="mt-10 grid gap-3">
            {["WordPress + GHL Website Systems", "Available Worldwide", "janrenzofacto@gmail.com"].map((value, index) => <div key={value} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5"><p className="text-xs uppercase tracking-[0.28em] text-white/35">{["Primary Service", "Availability", "Email"][index]}</p><p className={`mt-2 text-xl font-black ${index === 1 ? "text-lime-200" : ""} ${index === 2 ? "break-all" : ""}`}>{value}</p></div>)}
          </div>
        </div>
        <div className="rounded-[3rem] border border-white/10 bg-white/[0.045] p-5 shadow-2xl backdrop-blur-xl sm:p-8 lg:p-10">
          <div className="mb-8 flex flex-col gap-3 border-b border-white/10 pb-8 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-black uppercase tracking-[0.32em] text-white/35">Project Inquiry</p><h3 className="mt-3 text-3xl font-black tracking-[-0.05em] sm:text-4xl">Tell me what you need.</h3></div><span className="w-fit rounded-full border border-lime-300/30 bg-lime-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-lime-200">Netlify Ready</span></div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section className="bg-[#090909] px-5 pb-24 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl border-t border-white/10 pt-12">
        <div className="mb-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end"><div><p className="mb-4 text-xs uppercase tracking-[0.4em] text-lime-300">FAQ</p><ScrollRevealText text="Before we start, here are answers clients usually ask." className="text-5xl font-black leading-[0.9] tracking-[-0.07em] sm:text-7xl" /></div><p className="max-w-2xl text-lg leading-relaxed text-white/55">This keeps the contact page more complete and reduces friction before clients send an inquiry.</p></div>
        <div className="grid gap-4 md:grid-cols-2">{faqs.map(([question, answer]) => <div key={question} className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-7 backdrop-blur-xl"><h3 className="text-2xl font-black tracking-[-0.04em]">{question}</h3><p className="mt-4 leading-relaxed text-white/55">{answer}</p></div>)}</div>
      </div>
    </section>
  );
}
