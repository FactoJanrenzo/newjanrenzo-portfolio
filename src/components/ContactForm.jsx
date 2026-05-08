import { useState } from "react";
import { ArrowIcon } from "./Icons";

export default function ContactForm() {
  const [formStatus, setFormStatus] = useState("idle");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("form-name", "contact");
    setFormStatus("sending");

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      });

      if (!response.ok) throw new Error("Form submission failed");

      const payload = Object.fromEntries(formData.entries());
      try {
        await fetch("/.netlify/functions/send-contact-emails", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } catch (error) {
        console.warn("Contact email function failed", error);
      }

      setFormStatus("success");
      form.reset();
      window.location.href = "/thank-you.html";
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit} className="space-y-4 text-left">
      <input type="hidden" name="form-name" value="contact" />
      <p style={{ position: "absolute", overflow: "hidden", clip: "rect(0 0 0 0)", height: "1px", width: "1px", margin: "-1px", padding: 0, border: 0 }}>
        <label>Don't fill this out if you're human: <input name="bot-field" tabIndex="-1" autoComplete="off" /></label>
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="group block">
          <span className="mb-2 block text-xs font-black uppercase tracking-[0.24em] text-white/40">Name</span>
          <input name="name" required placeholder="Your full name" className="w-full rounded-3xl border border-white/10 bg-white/[0.04] px-5 py-4 text-white outline-none transition placeholder:text-white/25 focus:border-lime-300/60 focus:bg-white/[0.07]" />
        </label>
        <label className="group block">
          <span className="mb-2 block text-xs font-black uppercase tracking-[0.24em] text-white/40">Email</span>
          <input name="email" type="email" required placeholder="you@example.com" className="w-full rounded-3xl border border-white/10 bg-white/[0.04] px-5 py-4 text-white outline-none transition placeholder:text-white/25 focus:border-lime-300/60 focus:bg-white/[0.07]" />
        </label>
      </div>

      <label className="group block">
        <span className="mb-2 block text-xs font-black uppercase tracking-[0.24em] text-white/40">Subject</span>
        <input name="subject" required placeholder="Website redesign, landing page, GHL setup..." className="w-full rounded-3xl border border-white/10 bg-white/[0.04] px-5 py-4 text-white outline-none transition placeholder:text-white/25 focus:border-lime-300/60 focus:bg-white/[0.07]" />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="group block">
          <span className="mb-2 block text-xs font-black uppercase tracking-[0.24em] text-white/40">Project Type</span>
          <select name="projectType" className="w-full rounded-3xl border border-white/10 bg-[#121212] px-5 py-4 text-white outline-none transition focus:border-lime-300/60 focus:bg-[#171717]">
            <option>WordPress Website</option>
            <option>Landing Page</option>
            <option>GoHighLevel Funnel</option>
            <option>SEO / Speed Optimization</option>
            <option>Frontend Customization</option>
          </select>
        </label>
        <label className="group block">
          <span className="mb-2 block text-xs font-black uppercase tracking-[0.24em] text-white/40">Budget Range</span>
          <select name="budget" className="w-full rounded-3xl border border-white/10 bg-[#121212] px-5 py-4 text-white outline-none transition focus:border-lime-300/60 focus:bg-[#171717]">
            <option>Still planning</option>
            <option>$300 - $700</option>
            <option>$700 - $1,500</option>
            <option>$1,500+</option>
          </select>
        </label>
      </div>

      <label className="group block">
        <span className="mb-2 block text-xs font-black uppercase tracking-[0.24em] text-white/40">Project Details</span>
        <textarea name="message" required rows="6" placeholder="Tell me about your website, funnel, timeline, goals, and what you want to improve." className="w-full resize-none rounded-[2rem] border border-white/10 bg-white/[0.04] px-5 py-4 text-white outline-none transition placeholder:text-white/25 focus:border-lime-300/60 focus:bg-white/[0.07]" />
      </label>

      {formStatus === "success" && <div className="rounded-3xl border border-lime-300/30 bg-lime-300/10 px-5 py-4 text-sm font-bold text-lime-200">Message sent successfully. I'll review your inquiry and respond as soon as possible.</div>}
      {formStatus === "error" && <div className="rounded-3xl border border-red-400/30 bg-red-500/10 px-5 py-4 text-sm font-bold text-red-200">Something went wrong. Please email me directly at janrenzofacto@gmail.com.</div>}

      <button type="submit" disabled={formStatus === "sending"} className="group inline-flex w-full items-center justify-center rounded-full bg-lime-300 px-8 py-5 text-sm font-black uppercase tracking-[0.14em] text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">
        {formStatus === "sending" ? "Sending..." : "Send Message"} <ArrowIcon className="ml-2 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
      </button>
    </form>
  );
}
