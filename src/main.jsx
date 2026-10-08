import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import "./index.css";
import SiteShell from "./components/SiteShell.jsx";

const rootElement = document.getElementById("root");
// Production pages are prerendered at build time; the dev server serves an empty root.
const prerendered = rootElement.hasChildNodes();
const app = (
  <StrictMode>
    <BrowserRouter>
      <SiteShell prerendered={prerendered} />
    </BrowserRouter>
  </StrictMode>
);

if (prerendered) hydrateRoot(rootElement, app);
else createRoot(rootElement).render(app);
