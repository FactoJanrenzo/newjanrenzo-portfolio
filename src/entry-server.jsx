import { StrictMode } from "react";
import { prerender } from "react-dom/static";
import { StaticRouter } from "react-router-dom";
import SiteShell from "./components/SiteShell.jsx";
import { PageMetaContext } from "./components/pageMeta.js";
import { publicProjects } from "./data/siteContent.js";

export const prerenderRoutes = [
  "/",
  "/about",
  "/services",
  "/portfolio",
  "/contact",
  ...publicProjects.map(({ id }) => `/portfolio/${id}`),
];

async function renderOnce(url) {
  let meta = null;
  const { prelude } = await prerender(
    <StrictMode>
      <PageMetaContext value={(value) => { meta = value; }}>
        <StaticRouter location={url}>
          <SiteShell prerendered />
        </StaticRouter>
      </PageMetaContext>
    </StrictMode>,
    // Large boundaries are otherwise streamed out of order with inline reveal scripts, which the CSP blocks.
    { progressiveChunkSize: Number.POSITIVE_INFINITY },
  );
  const html = await new Response(prelude).text();
  return { html, meta };
}

// Static pages must be plain HTML: retry while any boundary is still emitted with an inline script.
export async function render(url) {
  let result;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    result = await renderOnce(url);
    if (!result.html.includes("<script")) return result;
  }
  const scriptIndex = result.html.indexOf("<script");
  throw new Error(`Prerendering ${url} still produced inline scripts near: ${result.html.slice(Math.max(0, scriptIndex - 300), scriptIndex + 120)}`);
}
