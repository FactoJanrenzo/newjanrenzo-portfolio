import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";

function subscribe(onChange) {
  const mediaQuery = window.matchMedia(query);
  mediaQuery.addEventListener("change", onChange);
  return () => mediaQuery.removeEventListener("change", onChange);
}

const getSnapshot = () => window.matchMedia(query).matches;
// Prerendered HTML is always generated with motion enabled; hydration then switches to the real preference.
const getServerSnapshot = () => false;

export default function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
