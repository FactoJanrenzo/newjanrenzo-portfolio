import { useState } from "react";

function Field({ label, required = false, children }) {
  return (
    <label className="block min-w-0">
      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-white/60">
        {label}{required && <span className="text-lime-300"> *</span>}
      </span>
      {children}
    </label>
  );
}

export default function ContactForm() {
  const [formStatus, setFormStatus] = useState("idle");
  const [inquiryType, setInquiryType] = useState("");
  const isProjectInquiry = inquiryType === "Project inquiry";

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
      if (!response.ok) throw new Error(`Form submission failed with ${response.status}`);

      form.reset();
      setInquiryType("");
      setFormStatus("success");
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit} aria-busy={formStatus === "sending"} className="grid gap-5">
      <input type="hidden" name="form-name" value="contact" />
      <p hidden>
        <label>Do not fill this field if you are human: <input name="bot-field" tabIndex="-1" autoComplete="off" /></label>
      </p>

      <Field label="I'm reaching out about" required>
        <select className="field-control" name="inquiryType" required value={inquiryType} onChange={(event) => setInquiryType(event.target.value)}>
          <option value="" disabled>Choose one</option>
          <option>Project inquiry</option>
          <option>Employment opportunity</option>
          <option>Collaboration</option>
        </select>
      </Field>

      <div className="grid min-w-0 gap-5 sm:grid-cols-2">
        <Field label="Name" required>
          <input className="field-control" name="name" autoComplete="name" maxLength="100" required placeholder="Your full name" />
        </Field>
        <Field label="Email" required>
          <input className="field-control" name="email" type="email" autoComplete="email" maxLength="254" required placeholder="you@example.com" />
        </Field>
      </div>

      <Field label="Subject" required>
        <input className="field-control" name="subject" maxLength="160" required placeholder="What would you like to discuss?" />
      </Field>

      {isProjectInquiry && (
        <fieldset className="grid min-w-0 gap-5 border-y border-white/10 py-6">
          <legend className="px-2 text-xs font-bold uppercase tracking-[0.12em] text-lime-300">Optional project context</legend>
          <div className="grid min-w-0 gap-5 sm:grid-cols-3">
            <Field label="Project type">
              <select className="field-control" name="projectType" defaultValue="">
                <option value="">Choose one</option>
                <option>WordPress Website</option>
                <option>Landing Page</option>
                <option>GoHighLevel Funnel</option>
                <option>Website Optimization</option>
                <option>Frontend Customization</option>
              </select>
            </Field>
            <Field label="Budget range">
              <select className="field-control" name="budget" defaultValue="">
                <option value="">Choose one</option>
                <option>Still planning</option>
                <option>$300 - $700</option>
                <option>$700 - $1,500</option>
                <option>$1,500+</option>
              </select>
            </Field>
            <Field label="Preferred timeline">
              <select className="field-control" name="timeline" defaultValue="">
                <option value="">Choose one</option>
                <option>As soon as possible</option>
                <option>Within 2-4 weeks</option>
                <option>Within 1-2 months</option>
                <option>Flexible / planning</option>
              </select>
            </Field>
          </div>
          <Field label="Current website URL">
            <input className="field-control" name="websiteUrl" type="url" inputMode="url" maxLength="2048" placeholder="https://yourwebsite.com" />
          </Field>
        </fieldset>
      )}

      <Field label="Message" required>
        <textarea className="field-control min-h-40 resize-y" name="message" maxLength="3000" required placeholder="Share the goal, relevant context, timeline, and the next step you have in mind." />
      </Field>

      <p className="text-xs leading-5 text-white/70">Your details are used only to review and respond to this inquiry.</p>

      <div aria-live="polite">
        {formStatus === "success" && <p className="rounded-md border border-lime-300/30 bg-lime-300/10 px-4 py-4 text-sm text-lime-100">Your inquiry was sent. I will review the details and reply with the next step.</p>}
        {formStatus === "error" && <p className="rounded-md border border-red-400/30 bg-red-500/10 px-4 py-4 text-sm text-red-100">The form could not be sent. Please email janrenzofacto@gmail.com directly.</p>}
      </div>

      <button type="submit" disabled={formStatus === "sending"} className="button-primary w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-fit">
        {formStatus === "sending" ? "Sending..." : "Send Inquiry"}
      </button>
    </form>
  );
}
