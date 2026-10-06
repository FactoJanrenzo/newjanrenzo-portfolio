import { useEffect, useImperativeHandle, useRef } from "react";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

// The light build is the SVG-only player without expression support, so it never needs eval under the CSP.
const loadPlayer = () => import("lottie-web/build/player/lottie_light");

export default function LottieIcon({ ref, loadAnimation, delay = 0, className = "" }) {
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  useImperativeHandle(ref, () => ({
    replay() {
      const animation = animationRef.current;
      if (animation && !reducedMotion && animation.isPaused) animation.goToAndPlay(0, true);
    },
  }), [reducedMotion]);

  useEffect(() => {
    const container = containerRef.current;
    let cancelled = false;
    let playTimer;

    // The player and the icon data load only when the icon approaches the viewport, then play once.
    const observer = new IntersectionObserver(async ([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const [{ default: lottie }, { default: animationData }] = await Promise.all([loadPlayer(), loadAnimation()]);
      if (cancelled) return;
      const animation = lottie.loadAnimation({
        container,
        renderer: "svg",
        loop: false,
        autoplay: false,
        animationData,
        rendererSettings: { focusable: false, preserveAspectRatio: "xMidYMid meet" },
      });
      animationRef.current = animation;
      if (reducedMotion) animation.goToAndStop(animation.totalFrames - 1, true);
      else playTimer = window.setTimeout(() => animation.play(), delay);
    }, { rootMargin: "0px 0px -12% 0px" });

    observer.observe(container);
    return () => {
      cancelled = true;
      observer.disconnect();
      window.clearTimeout(playTimer);
      animationRef.current?.destroy();
      animationRef.current = null;
    };
  }, [delay, loadAnimation, reducedMotion]);

  return <span ref={containerRef} aria-hidden="true" className={className} />;
}
