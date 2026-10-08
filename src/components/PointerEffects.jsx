import { useEffect, useRef } from "react";

const settledWithin = 0.3;

// Mouse-driven background glow, cursor ring, hero depth, card tilt, and process-card lighting.
// Touch screens and reduced motion keep the static page.
export default function PointerEffects() {
  const fxRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return undefined;

    const root = document.documentElement;
    const fx = fxRef.current;
    const ring = ringRef.current;
    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 3 };
    const glow = { ...pointer };
    const trail = { ...pointer };
    let frame = 0;
    let activeCard = null;

    // One eased loop moves the glow, the ring, and any hero depth layers on the current page.
    const tick = () => {
      glow.x += (pointer.x - glow.x) * 0.08;
      glow.y += (pointer.y - glow.y) * 0.08;
      trail.x += (pointer.x - trail.x) * 0.2;
      trail.y += (pointer.y - trail.y) * 0.2;
      fx.style.setProperty("--px", `${glow.x}px`);
      fx.style.setProperty("--py", `${glow.y}px`);
      ring.style.transform = `translate3d(${trail.x}px, ${trail.y}px, 0)`;

      const offsetX = glow.x / window.innerWidth - 0.5;
      const offsetY = glow.y / window.innerHeight - 0.5;
      document.querySelectorAll("[data-depth]").forEach((layer) => {
        const depth = Number(layer.dataset.depth);
        layer.style.transform = `translate3d(${offsetX * depth}px, ${offsetY * depth}px, 0)`;
      });
      const portrait = document.querySelector("[data-tilt-portrait]");
      if (portrait) {
        portrait.style.transform = `rotateY(${offsetX * 9}deg) rotateX(${offsetY * -7}deg)`;
        portrait.style.setProperty("--gx", `${(offsetX + 0.5) * 100}%`);
        portrait.style.setProperty("--gy", `${(offsetY + 0.5) * 100}%`);
      }

      const settled = Math.abs(pointer.x - glow.x) < settledWithin && Math.abs(pointer.y - glow.y) < settledWithin
        && Math.abs(pointer.x - trail.x) < settledWithin && Math.abs(pointer.y - trail.y) < settledWithin;
      frame = settled ? 0 : requestAnimationFrame(tick);
    };
    const wake = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const partsOf = (card) => {
      const stage = card.querySelector(".stage");
      return { stage, mover: stage?.querySelector(".device, .laptop, .stage-art") };
    };
    const resetCard = (card) => {
      if (!card) return;
      const { stage, mover } = partsOf(card);
      if (stage) stage.style.transform = "";
      if (mover) mover.style.transform = "";
    };
    // Previews tilt toward the pointer while the device inside drifts the other way.
    const tiltCard = (card, event) => {
      const { stage, mover } = partsOf(card);
      if (!stage) return;
      const bounds = stage.getBoundingClientRect();
      const x = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));
      const y = Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height));
      stage.style.setProperty("--gx", `${x * 100}%`);
      stage.style.setProperty("--gy", `${y * 100}%`);
      if (card.dataset.tilt !== "flat") stage.style.transform = `perspective(1100px) rotateX(${(0.5 - y) * 7}deg) rotateY(${(x - 0.5) * 9}deg)`;
      if (mover) mover.style.transform = `translate3d(${(x - 0.5) * -18}px, ${(y - 0.5) * -12 - 8}px, 0)`;
    };
    // Process cards share one spotlight, so their borders light up as the pointer crosses them.
    const lightSteps = (steps, event) => {
      steps.querySelectorAll(".step").forEach((step) => {
        const bounds = step.getBoundingClientRect();
        step.style.setProperty("--sx", `${event.clientX - bounds.left}px`);
        step.style.setProperty("--sy", `${event.clientY - bounds.top}px`);
      });
    };

    const onPointerMove = (event) => {
      if (event.pointerType !== "mouse") return;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      if (!root.classList.contains("has-pointer")) {
        Object.assign(glow, pointer);
        Object.assign(trail, pointer);
        root.classList.add("has-pointer");
      }
      wake();

      const target = event.target instanceof Element ? event.target : null;
      const card = target?.closest("[data-tilt]") ?? null;
      if (card !== activeCard) {
        resetCard(activeCard);
        activeCard = card;
      }
      if (card) tiltCard(card, event);
      const steps = target?.closest(".steps");
      if (steps) lightSteps(steps, event);
    };
    // The ring grows over controls and becomes a "View" bubble over project previews.
    const onPointerOver = (event) => {
      const control = event.target instanceof Element
        ? event.target.closest("[data-cursor], a, button, summary, select, input, textarea, label")
        : null;
      const view = control?.dataset.cursor === "view";
      ring.classList.toggle("is-view", view);
      ring.classList.toggle("is-link", Boolean(control) && !view);
    };
    const onLeave = () => {
      root.classList.remove("has-pointer");
      resetCard(activeCard);
      activeCard = null;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerover", onPointerOver);
    root.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerover", onPointerOver);
      root.removeEventListener("mouseleave", onLeave);
      root.classList.remove("has-pointer");
    };
  }, []);

  return (
    <>
      <div className="fx" ref={fxRef} aria-hidden="true">
        <div className="fx-layer fx-glow" />
        <div className="fx-layer fx-dots" />
      </div>
      <div className="cursor-ring" ref={ringRef} aria-hidden="true"><span>View</span></div>
    </>
  );
}
