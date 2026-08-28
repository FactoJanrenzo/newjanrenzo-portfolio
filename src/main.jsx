import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "@fontsource-variable/space-grotesk";
import "./index.css";
import "./styles/portfolioAnimations.css";
import "./styles/workExperience.css";
import SiteShell from "./components/SiteShell.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <SiteShell />
    </BrowserRouter>
  </StrictMode>
);
