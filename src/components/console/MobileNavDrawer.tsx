"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useRouter } from "next/navigation";
import { menuItems } from "@/data/profile";
import type { MenuItem } from "@/data/profile";
import Icon from "@/components/ui/Icon";
import type { IconName } from "@/components/ui/Icon";

interface MobileNavDrawerProps {
  open: boolean;
  onClose: () => void;
  returnFocusRef: React.RefObject<HTMLButtonElement | null>;
}

const iconMap: Record<string, IconName> = {
  projects: "projects",
  about: "about",
  skills: "skills",
  resume: "resume",
  lab: "lab",
  hobbies: "hobbies",
  contact: "contact",
  settings: "settings",
  secret: "secret",
};

function getItemStyle(item: MenuItem): { clickable: boolean; hint: string; className: string } {
  if (item.status === "Active") return { clickable: true, hint: "", className: "" };
  if (item.status === "Coming Soon")
    return { clickable: false, hint: "Coming Soon", className: "opacity-40" };
  return { clickable: false, hint: "Locked", className: "opacity-40" };
}

export default function MobileNavDrawer({ open, onClose, returnFocusRef }: MobileNavDrawerProps) {
  const router = useRouter();
  const prefersReduced = useReducedMotion();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Focus trap using live selector query
  useEffect(() => {
    if (!open) return;
    const handleTrap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const items = drawerRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href]'
      );
      if (!items || items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", handleTrap);
    return () => window.removeEventListener("keydown", handleTrap);
  }, [open]);

  // Focus first focusable item on open
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => {
      const first = drawerRef.current?.querySelector<HTMLElement>(
        'button:not([disabled])'
      );
      first?.focus();
    }, 100);
    return () => clearTimeout(t);
  }, [open]);

  // Return focus on close
  useEffect(() => {
    if (open) return;
    const t = setTimeout(() => returnFocusRef.current?.focus(), 100);
    return () => clearTimeout(t);
  }, [open, returnFocusRef]);

  // Close on Escape — stop propagation to prevent ConsoleShell from intercepting
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKey, true); // capture phase
    return () => window.removeEventListener("keydown", handleKey, true);
  }, [open, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleSelect = (item: MenuItem) => {
    if (item.status === "Active") {
      onClose();
      router.push(item.href);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReduced ? 0 : 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            ref={drawerRef}
            className="fixed top-12 right-0 bottom-8 z-50 w-72 max-w-[85vw] bg-wpm-black border-l border-white/[0.06] overflow-y-auto"
            id="mobile-nav-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              duration: prefersReduced ? 0 : 0.25,
              ease: [0.33, 0, 0.1, 1],
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Drawer header */}
            <div className="p-4 border-b border-white/[0.04]">
              <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-wpm-lavender/90">
                Navigation
              </p>
              <p className="font-mono text-[11px] text-wpm-gray/90 mt-1">
                Select a module
              </p>
            </div>

            {/* Menu items */}
            <nav aria-label="Mobile navigation" className="p-2">
              {menuItems.map((item) => {
                const { clickable, hint, className } = getItemStyle(item);
                const iconName = iconMap[item.id];
                const descriptionId = `mobile-nav-desc-${item.id}`;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item)}
	                    disabled={!clickable}
	                    aria-disabled={!clickable}
	                    aria-describedby={!clickable ? descriptionId : undefined}
                    className={`w-full flex items-center gap-3 p-3 rounded-sm text-left
                              transition-colors duration-150
                              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wpm-purple/50
                              ${clickable
                                ? "text-wpm-gray/90 hover:text-wpm-white hover:bg-white/[0.03] cursor-pointer"
                                : "text-wpm-gray/90 cursor-default"}
                              ${className}`}
                    style={{ minHeight: 48 }}
                  >
                    <span className="w-7 flex justify-center">
                      <Icon name={iconName} size="sm" />
                    </span>
                    <span className="font-mono text-xs tracking-wide flex-1">
                      {item.label}
                    </span>
	                    <span className="font-mono text-[11px] tracking-wider min-w-[60px] text-right">
	                      {hint || item.type}
	                    </span>
	                    {!clickable && (
	                      <span id={descriptionId} className="sr-only">
	                        This module is not available in the public portfolio yet.
	                      </span>
	                    )}
	                  </button>
                );
              })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-white/[0.04]">
              <p className="font-mono text-[11px] text-wpm-gray/90">
                WPM.OS v1.0
              </p>
              <p className="font-mono text-[11px] text-wpm-gray/90 mt-0.5">
                ESC or tap outside to close
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
