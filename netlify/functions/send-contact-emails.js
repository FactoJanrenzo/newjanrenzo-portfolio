/* global process */

const personalEmail = process.env.CONTACT_TO_EMAIL || "janrenzofacto@gmail.com";
const replyEmail = process.env.CONTACT_REPLY_TO_EMAIL || personalEmail;
const siteUrl = process.env.SITE_URL || "https://janrenz.netlify.app";
const siteName = process.env.SITE_NAME || "Janrenzo Facto Portfolio";
const fromEmail = process.env.CONTACT_FROM_EMAIL || "Janrenzo Facto <onboarding@resend.dev>";

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const emailShell = ({ preview, title, body, footer }) => `
<!doctype html>
<html>
  <body style="margin:0;background:#050605;color:#ffffff;font-family:Arial,Helvetica,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preview)}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#050605;padding:28px 14px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;border:1px solid rgba(255,255,255,.12);border-radius:30px;background:#0b0d0b;overflow:hidden;">
            <tr>
              <td style="padding:34px 30px 18px;background:radial-gradient(circle at 18% 0%,rgba(190,255,47,.22),transparent 34%),linear-gradient(135deg,#10130d,#050605);">
                <div style="display:inline-block;border:1px solid rgba(190,255,47,.4);border-radius:999px;padding:9px 13px;color:#befc35;font-size:11px;font-weight:900;letter-spacing:.22em;text-transform:uppercase;">${siteName}</div>
                <h1 style="margin:22px 0 0;color:#ffffff;font-size:40px;line-height:.95;letter-spacing:-.05em;">${title}</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:30px;color:rgba(255,255,255,.72);font-size:16px;line-height:1.7;">
                ${body}
                <div style="margin-top:28px;padding:18px;border:1px solid rgba(190,255,47,.22);border-radius:22px;background:rgba(190,255,47,.08);color:#e9ffc4;">
                  <strong style="color:#befc35;">Website:</strong>
                  <a href="${siteUrl}" style="color:#ffffff;text-decoration:none;">${siteUrl}</a>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 30px 30px;color:rgba(255,255,255,.38);font-size:12px;line-height:1.6;">
                ${footer}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

const sendEmail = async ({ to, subject, html, replyTo }) => {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to,
      subject,
      html,
      reply_to: replyTo,
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Resend failed: ${response.status} ${details}`);
  }

  return response.json();
};

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  if (!process.env.RESEND_API_KEY) {
    return {
      statusCode: 200,
      body: JSON.stringify({ skipped: true, reason: "RESEND_API_KEY is not configured" }),
    };
  }

  try {
    const data = JSON.parse(event.body || "{}");
    const name = escapeHtml(data.name || "New lead");
    const email = escapeHtml(data.email || "");
    const subject = escapeHtml(data.subject || "New website inquiry");
    const projectType = escapeHtml(data.projectType || "Not specified");
    const budget = escapeHtml(data.budget || "Not specified");
    const message = escapeHtml(data.message || "").replaceAll("\n", "<br />");

    await Promise.all([
      sendEmail({
        to: personalEmail,
        replyTo: data.email || replyEmail,
        subject: `New portfolio inquiry: ${data.subject || "Website project"}`,
        html: emailShell({
          preview: `New inquiry from ${data.name || "a portfolio visitor"}`,
          title: "New Project Inquiry",
          body: `
            <p style="margin:0 0 18px;">A visitor submitted your portfolio contact form.</p>
            <p style="margin:0 0 10px;"><strong style="color:#ffffff;">Name:</strong> ${name}</p>
            <p style="margin:0 0 10px;"><strong style="color:#ffffff;">Email:</strong> ${email}</p>
            <p style="margin:0 0 10px;"><strong style="color:#ffffff;">Subject:</strong> ${subject}</p>
            <p style="margin:0 0 10px;"><strong style="color:#ffffff;">Project Type:</strong> ${projectType}</p>
            <p style="margin:0 0 18px;"><strong style="color:#ffffff;">Budget:</strong> ${budget}</p>
            <div style="margin-top:18px;padding:18px;border-radius:18px;background:rgba(255,255,255,.05);color:rgba(255,255,255,.78);">${message}</div>
          `,
          footer: `Replying to this notification should reply to ${email || "the submitter's email address"}.`,
        }),
      }),
      data.email &&
        sendEmail({
          to: data.email,
          replyTo: replyEmail,
          subject: `Thanks for contacting ${siteName}`,
          html: emailShell({
            preview: `Thanks for reaching out through ${siteName}.`,
            title: "Thanks For Reaching Out.",
            body: `
              <p style="margin:0 0 18px;">Hi ${name},</p>
              <p style="margin:0 0 18px;">Thanks for sending your project details through my website, <strong style="color:#ffffff;">${siteName}</strong>. I received your inquiry and will review your goals, timeline, and the best next step.</p>
              <p style="margin:0;">You can reply directly to this email if you want to add files, links, or extra notes. Replies go to my personal email: <a href="mailto:${replyEmail}" style="color:#befc35;text-decoration:none;">${replyEmail}</a>.</p>
            `,
            footer: `Janrenzo Facto - Freelance Web Designer. This message was sent after a contact form submission on ${siteName}.`,
          }),
        }),
    ]);

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: JSON.stringify({ error: "Unable to send email" }) };
  }
};
