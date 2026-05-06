"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

const CURSOR_SIZE = 24;
const CURSOR_Z_INDEX = 90;

const INTERACTIVE_SELECTOR =
  "a, button, input, textarea, select, [contenteditable=\"true\"], [role=\"button\"]";

function shouldHideCustomCursor(el: Element | null): boolean {
  if (!el) return false;
  // Hide custom cursor over any native interactive element (including disabled)
  return el.closest(INTERACTIVE_SELECTOR) !== null;
}

export default function Cursor() {
  const prefersReduced = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const visible = useMotionValue(1);

  const springX = useSpring(x, { stiffness: 200, damping: 30, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 200, damping: 30, mass: 0.5 });
  const springVisible = useSpring(visible, { stiffness: 300, damping: 25 });

  useEffect(() => {
    if (prefersReduced) return;

    const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
    let enabled = mql.matches;

    function syncEnabled(matches: boolean) {
      enabled = matches;
      if (enabled) {
        document.documentElement.classList.add("custom-cursor-active");
      } else {
        document.documentElement.classList.remove("custom-cursor-active");
        visible.set(0);
      }
    }

    // Initial sync
    syncEnabled(mql.matches);

    function onMQChange(e: MediaQueryListEvent) {
      syncEnabled(e.matches);
    }
    mql.addEventListener("change", onMQChange);

    if (!mql.matches) {
      // Listen for future changes, but don't short-circuit — pointer listeners stay registered
    }

    function onPointerMove(e: PointerEvent) {
      if (!enabled || e.pointerType !== "mouse") return;
      x.set(e.clientX - CURSOR_SIZE / 2);
      y.set(e.clientY - CURSOR_SIZE / 2);
    }

    function updateInteractive(e: PointerEvent | MouseEvent) {
      if (!enabled) return;
      if (e instanceof PointerEvent && e.pointerType !== "mouse") return;
      visible.set(shouldHideCustomCursor(e.target as Element | null) ? 0 : 1);
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerover", updateInteractive, { passive: true });
    window.addEventListener("pointerout", updateInteractive, { passive: true });
    window.addEventListener("mouseover", updateInteractive, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerover", updateInteractive);
      window.removeEventListener("pointerout", updateInteractive);
      window.removeEventListener("mouseover", updateInteractive);
      mql.removeEventListener("change", onMQChange);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [prefersReduced, x, y, visible]);

  if (prefersReduced) return null;

  return (
    <motion.div
      className="fixed pointer-events-none"
      aria-hidden="true"
      style={{
        zIndex: CURSOR_Z_INDEX,
        left: springX,
        top: springY,
        width: CURSOR_SIZE,
        height: CURSOR_SIZE,
        opacity: springVisible,
      }}
    >
      {/* Glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          opacity: springVisible,
          boxShadow:
            "0 0 12px 4px rgba(108,77,255,0.4), 0 0 24px 8px rgba(116,247,255,0.2)",
        }}
      />
      {/* Core dot */}
      <motion.div
        className="absolute rounded-full bg-[#EAF2FF]"
        style={{
          left: "50%",
          top: "50%",
          width: 4,
          height: 4,
          marginLeft: -2,
          marginTop: -2,
          opacity: springVisible,
        }}
      />
    </motion.div>
  );
}
