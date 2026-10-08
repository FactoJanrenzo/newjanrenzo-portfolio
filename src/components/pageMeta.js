import { createContext } from "react";
import { siteConfig } from "../data/siteContent";

// Provided only while prerendering, so each static HTML file can be written with its own head tags.
export const PageMetaContext = createContext(null);

export function resolvePageMeta({
  title,
  description = siteConfig.description,
  path = "/",
  image = siteConfig.socialImage,
  noIndex = false,
}) {
  return {
    title: `${title} | ${siteConfig.name}`,
    description,
    canonicalUrl: `${siteConfig.url}${path === "/" ? "" : path}`,
    image: image.startsWith("http") ? image : `${siteConfig.url}${image}`,
    robots: noIndex ? "noindex, nofollow" : "index, follow",
  };
}
