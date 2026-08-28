import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { NavLink } from "react-router-dom";

const dockSpring = { mass: 0.1, stiffness: 150, damping: 12 };

function DockItem({ item, mouseX, distance, baseItemSize, magnification, reducedMotion }) {
  const itemRef = useRef(null);
  const distanceFromPointer = useTransform(mouseX, (value) => {
    const element = itemRef.current;
    if (!element) return distance;

    const bounds = element.getBoundingClientRect();
    return value - (bounds.left + bounds.width / 2);
  });
  const scaleValue = useTransform(
    distanceFromPointer,
    [-distance, 0, distance],
    [1, magnification / baseItemSize, 1],
  );
  const scale = useSpring(scaleValue, dockSpring);
  const Icon = item.icon;

  return (
    <motion.div
      ref={itemRef}
      className="dock-item"
      style={{ height: baseItemSize, scale: reducedMotion ? 1 : scale }}
    >
      <NavLink
        to={item.href}
        end={item.href === "/"}
        aria-label={item.label}
        className={({ isActive }) => `dock-item-link ${isActive ? "is-active" : ""} ${item.className || ""}`}
      >
        <Icon aria-hidden="true" focusable="false" size={19} strokeWidth={1.8} />
        <span className="dock-item-label">{item.label}</span>
      </NavLink>
    </motion.div>
  );
}

export default function Dock({ items, className = "", distance = 170, panelHeight = 58, baseItemSize = 44, magnification = 60 }) {
  const mouseX = useMotionValue(-1000);
  const reducedMotion = useReducedMotion();

  return (
    <div
      className={`dock-panel ${className}`}
      style={{ minHeight: panelHeight }}
      onMouseMove={(event) => {
        if (!reducedMotion) mouseX.set(event.clientX);
      }}
      onMouseLeave={() => mouseX.set(-1000)}
    >
      {items.map((item) => (
        <DockItem
          key={item.label}
          item={item}
          mouseX={mouseX}
          distance={distance}
          baseItemSize={baseItemSize}
          magnification={magnification}
          reducedMotion={reducedMotion}
        />
      ))}
    </div>
  );
}
