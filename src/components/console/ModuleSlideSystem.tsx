"use client";

import { useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const FOCUSABLE =
  "a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex='-1'])";

function isVisibleFocusable(element: HTMLElement): boolean {
  if (element.hasAttribute("disabled")) return false;
  if (element.getAttribute("aria-hidden") === "true") return false;

  const style = window.getComputedStyle(element);
  if (style.display === "none" || style.visibility === "hidden") return false;

  return element.getClientRects().length > 0;
}

interface ModuleSlideSystemProps {
  activeModule: string | null;
  onClose: () => void;
  children: React.ReactNode;
}

const REDUCED_VARIANTS = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.15 } },
  exit: { opacity: 0, transition: { duration: 0.1 } },
};

const SLIDE_VARIANTS = {
  hidden: { x: "100%", opacity: 0.6 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.45, ease: [0.32, 0.72, 0, 1] as const } },
  exit: { x: "100%", opacity: 0.6, transition: { duration: 0.3, ease: [0.55, 0, 1, 0.45] as const } },
};

export default function ModuleSlideSystem({
  activeModule,
  onClose,
  children,
}: ModuleSlideSystemProps) {
  const prefersReduced = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const isOpen = activeModule !== null;

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
      ).filter(isVisibleFocusable);
      if (focusable.length === 0) {
        event.preventDefault();
        panelRef.current.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (!panelRef.current.contains(document.activeElement)) {
        event.preventDefault();
        first.focus();
        return;
      }

      const focused = document.activeElement;

      if (event.shiftKey) {
        if (focused === first || focused === panelRef.current) {
          event.preventDefault();
          last.focus();
        }
      } else {
        if (focused === last || focused === panelRef.current) {
          event.preventDefault();
          first.focus();
        }
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      document.addEventListener("keydown", handleKeyDown);
      const timer = setTimeout(() => panelRef.current?.focus(), 300);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        clearTimeout(timer);
      };
    } else {
      previousFocusRef.current?.focus();
    }
  }, [isOpen, handleKeyDown]);

  const variants = prefersReduced ? REDUCED_VARIANTS : SLIDE_VARIANTS;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="overlay"
            className="fixed inset-0 z-40 hidden bg-black/55 backdrop-blur-md md:block"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } }}
            initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.3 }}
            onClick={onClose} aria-hidden="true"
          />
          <motion.div
            key="panel" ref={panelRef}
            className="fixed inset-y-0 right-0 z-50 flex w-full flex-col border-l border-white/[0.08] bg-wpm-elevated shadow-[0_0_120px_rgba(0,0,0,0.62)] focus:outline-none md:w-[74vw] lg:w-[68vw]"
            variants={variants} initial="hidden" animate="visible" exit="exit"
            role="region" aria-label={activeModule ? `${activeModule} panel` : "Module panel"} tabIndex={-1}
            id="module-panel"
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
