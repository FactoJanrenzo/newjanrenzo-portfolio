import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { featuredProjects, publicProjects, workProjects } from "../src/data/siteContent.js";

const repositoryRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const expectedFeaturedIds = [
  "junk-n-tow-website",
  "vital-factory-supplement-funnel",
  "umlc-church-monitoring-dashboard",
  "seo-for-real-estate-homepage",
  "beauty-rocio-cosmetic-institute",
];

assert.deepEqual(featuredProjects.map(({ id }) => id), expectedFeaturedIds, "Featured projects must match the verified launch set.");
assert(featuredProjects.every(({ category }) => category === "Websites & Funnels"), "Featured work must stay focused on websites and funnels.");
assert.equal(new Set(workProjects.map(({ id }) => id)).size, workProjects.length, "Project IDs must be unique.");
assert(workProjects.every(({ visibility }) => ["featured", "archive", "private"].includes(visibility)), "Every project must declare a supported visibility.");
assert(!publicProjects.some(({ visibility }) => visibility === "private"), "Private projects must not appear in the public project collection.");
assert(!publicProjects.some(({ id }) => id === "james-christian-cosmetic-website"), "The watermarked James Christian project must remain private.");
const privateProject = workProjects.find(({ id }) => id === "james-christian-cosmetic-website");
assert.equal(privateProject?.visibility, "private", "The private project tombstone must retain its visibility contract.");
assert(!privateProject?.image && !privateProject?.liveUrl, "Private project media and destination metadata must not enter the client bundle.");

const sitemap = readFileSync(join(repositoryRoot, "public", "sitemap.xml"), "utf8");
const sitemapLocations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, location]) => location);
assert.equal(new Set(sitemapLocations).size, sitemapLocations.length, "Sitemap URLs must be unique.");
assert.equal(sitemapLocations.length, publicProjects.length + 5, "Sitemap must contain the five public pages and every public project exactly once.");
for (const { id } of publicProjects) {
  assert(sitemap.includes(`/portfolio/${id}</loc>`), `Sitemap is missing public project ${id}.`);
}
assert(!sitemap.includes("james-christian-cosmetic-website"), "Private projects must not appear in the sitemap.");

const removedFunctionPath = join(repositoryRoot, "netlify", "functions", "send-contact-emails.js");
assert(!existsSync(removedFunctionPath), "The public email relay must remain removed.");

const contactForm = readFileSync(join(repositoryRoot, "src", "components", "ContactForm.jsx"), "utf8");
assert(!contactForm.includes("/.netlify/functions/"), "ContactForm must not call a public email function.");
assert(contactForm.includes('fetch("/"'), "ContactForm must submit through Netlify Forms.");
assert(contactForm.includes("response.ok"), "ContactForm must check the Netlify Forms response.");
assert(!/data-netlify|netlify-honeypot/.test(contactForm), "The prerendered ContactForm must not carry Netlify attributes; Netlify would rewrite it and break hydration.");

const redirects = readFileSync(join(repositoryRoot, "public", "_redirects"), "utf8");
assert(!/^\/\*\s/m.test(redirects), "A catch-all rewrite would turn unknown URLs into soft 404s; prerendered pages and 404.html cover every route.");

const documentShell = readFileSync(join(repositoryRoot, "index.html"), "utf8");
for (const fieldName of ["inquiryType", "name", "email", "subject", "message", "bot-field"]) {
  assert(documentShell.includes(`name="${fieldName}"`), `Static Netlify form is missing ${fieldName}.`);
}

const globalStyles = readFileSync(join(repositoryRoot, "src", "index.css"), "utf8");
const entryModule = readFileSync(join(repositoryRoot, "src", "main.jsx"), "utf8");
assert(globalStyles.includes('--font: "Geist Variable"') && entryModule.includes('import "@fontsource-variable/geist";'), "The self-hosted font face must match the global font-family declaration.");
assert(globalStyles.includes('--mono: "Geist Mono Variable"') && entryModule.includes('import "@fontsource-variable/geist-mono";'), "The self-hosted mono font must match the global mono declaration.");
assert(!globalStyles.includes("infinite"), "Decorative motion must be bounded rather than continuous.");

const publicPrivateAsset = join(repositoryRoot, "public", "portfolio", "james-christian-cosmetic-preview.webp");
const archivedPrivateAsset = join(repositoryRoot, "private-media", "james-christian-cosmetic-preview.webp");
assert(!existsSync(publicPrivateAsset), "Private media must not be copied into the public build.");
assert(existsSync(archivedPrivateAsset), "Private media must remain recoverable outside the public build.");

console.log(`Verified ${featuredProjects.length} featured and ${publicProjects.length} public projects, sitemap visibility, and the Netlify-only contact path.`);
