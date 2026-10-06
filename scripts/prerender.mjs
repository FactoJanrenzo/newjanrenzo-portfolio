import { appendFile, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const repositoryRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const distDirectory = join(repositoryRoot, "dist");
const serverDirectory = join(repositoryRoot, "dist-ssr");
const manifestDirectory = join(distDirectory, ".vite");

const { render, prerenderRoutes } = await import(pathToFileURL(join(serverDirectory, "entry-server.js")).href);
const template = await readFile(join(distDirectory, "index.html"), "utf8");
const manifest = JSON.parse(await readFile(join(manifestDirectory, "manifest.json"), "utf8"));

const escapeText = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const escapeAttribute = (value) => escapeText(value).replaceAll('"', "&quot;");

function replaceOnce(html, pattern, replacement) {
  const matches = html.match(pattern) ?? [];
  if (matches.length !== 1) throw new Error(`Expected one match for ${pattern} in dist/index.html, found ${matches.length}.`);
  return html.replace(pattern, () => replacement);
}

function setMetaContent(html, attribute, key, value) {
  return replaceOnce(
    html,
    new RegExp(`<meta\\s+${attribute}="${key}"\\s+content="[^"]*"\\s*/?>`, "g"),
    `<meta ${attribute}="${key}" content="${escapeAttribute(value)}" />`,
  );
}

function collectChunkFiles(key, files = new Set()) {
  const chunk = manifest[key];
  if (!chunk || files.has(chunk.file)) return files;
  files.add(chunk.file);
  for (const importKey of chunk.imports ?? []) collectChunkFiles(importKey, files);
  return files;
}

// Modules the entry already preloads; route chunks below are preloaded on top of these.
const entryFiles = collectChunkFiles("index.html");

function routeModule(route) {
  if (route === "/") return "src/pages/HomePage.jsx";
  if (route === "/404") return "src/pages/NotFoundPage.jsx";
  if (route.startsWith("/portfolio/")) return "src/pages/ProjectCaseStudyPage.jsx";
  const pages = { "/about": "AboutPage", "/services": "ServicesPage", "/portfolio": "PortfolioPage", "/contact": "ContactPage" };
  return `src/pages/${pages[route]}.jsx`;
}

function buildPage(route, { html, meta }) {
  // React emits resource hints (image preloads) ahead of the app markup; they belong in the head.
  const [hoisted] = html.match(/^(?:<link\b[^>]*>)*/);
  const appHtml = html.slice(hoisted.length);
  const routePreloads = [...collectChunkFiles(routeModule(route))]
    .filter((file) => !entryFiles.has(file))
    .map((file) => `<link rel="modulepreload" crossorigin href="/${file}">`)
    .join("");

  let page = template;
  page = replaceOnce(page, /<title>[^<]*<\/title>/g, `<title>${escapeText(meta.title)}</title>`);
  page = setMetaContent(page, "name", "description", meta.description);
  page = setMetaContent(page, "name", "robots", meta.robots);
  page = setMetaContent(page, "property", "og:title", meta.title);
  page = setMetaContent(page, "property", "og:description", meta.description);
  page = setMetaContent(page, "property", "og:image", meta.image);
  page = setMetaContent(page, "property", "og:url", meta.canonicalUrl);
  page = setMetaContent(page, "name", "twitter:title", meta.title);
  page = setMetaContent(page, "name", "twitter:description", meta.description);
  page = setMetaContent(page, "name", "twitter:image", meta.image);
  page = replaceOnce(page, /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/g, `<link rel="canonical" href="${escapeAttribute(meta.canonicalUrl)}" />`);
  page = replaceOnce(page, /<\/head>/g, `${hoisted}${routePreloads}</head>`);
  page = replaceOnce(page, /<div id="root"><\/div>/g, `<div id="root">${appHtml}</div>`);
  return page;
}

const outputFile = (route) => (route === "/" ? "index.html" : `${route.slice(1)}.html`);
const routes = [...prerenderRoutes, "/404"];

for (const route of routes) {
  const result = await render(route);
  if (!result.meta) throw new Error(`Route ${route} rendered without PageMeta.`);
  const file = join(distDirectory, outputFile(route));
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, buildPage(route, result));
}

// Serve each page from its .html file at the extensionless URL; unknown paths fall through to 404.html.
const rewrites = prerenderRoutes
  .filter((route) => route !== "/")
  .map((route) => `${route}  /${outputFile(route)}  200`);
await appendFile(join(distDirectory, "_redirects"), `\n# Prerendered pages\n${rewrites.join("\n")}\n`);

await rm(manifestDirectory, { recursive: true, force: true });
await rm(serverDirectory, { recursive: true, force: true });
console.log(`Prerendered ${routes.length} pages (including 404.html).`);
