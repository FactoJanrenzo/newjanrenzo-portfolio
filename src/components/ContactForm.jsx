import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "../data/siteContent";

function Field({ label, required = false, children }) {
  return (
    <label className="field">
      <span className="field-label">{label}{required && <b aria-hidden="true"> *</b>}</span>
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
    // Netlify registers this form from the static copy in index.html; netlify attributes here would make
    // Netlify rewrite the prerendered markup and break hydration.
    <form name="contact" method="POST" onSubmit={handleSubmit} aria-busy={formStatus === "sending"} className="form">
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

      <div className="form-row">
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
        <fieldset className="fieldset">
          <legend>Optional project context</legend>
          <div className="form-row is-three">
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
        <textarea className="field-control" name="message" maxLength="3000" required placeholder="Share the goal, relevant context, timeline, and the next step you have in mind." />
      </Field>

      <p className="form-note">Your details are used only to review and respond to this inquiry.</p>

      <div aria-live="polite">
        {formStatus === "success" && <p className="form-status is-success">Your inquiry was sent. I will review the details and reply with the next step.</p>}
        {formStatus === "error" && <p className="form-status is-error">The form could not be sent. Please email {siteConfig.email} directly.</p>}
      </div>

      <div>
        <button type="submit" disabled={formStatus === "sending"} className="btn btn-accent">
          {formStatus === "sending" ? "Sending..." : "Send inquiry"} {formStatus !== "sending" && <ArrowRight aria-hidden="true" />}
        </button>
      </div>
    </form>
  );
}
