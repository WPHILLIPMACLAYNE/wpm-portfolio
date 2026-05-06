"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { menuItems, profile } from "@/data/profile";
import PageTransition from "@/components/motion/PageTransition";
import Icon from "@/components/ui/Icon";
import type { IconName } from "@/components/ui/Icon";

const MobileNavDrawer = dynamic(() => import("./MobileNavDrawer"), {
  ssr: false,
  loading: () => null,
});

const STORAGE_KEY = "wpm-os-visited";

interface ConsoleShellProps {
  children: React.ReactNode;
  showNav?: boolean;
  onReplayIntro?: () => void;
  mode?: "hub" | "page";
}

const navIconNames: Record<string, IconName> = {
  projects: "projects",
  about: "about",
  skills: "skills",
  resume: "resume",
  lab: "lab",
  hobbies: "hobbies",
  contact: "contact",
};

// Only show modules that have real routes
const activeMenuItems = menuItems.filter((m) => m.status === "Active");

export default function ConsoleShell({ children, showNav = true, onReplayIntro, mode = "page" }: ConsoleShellProps) {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hasVisited, setHasVisited] = useState(false);
  const modulesButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      try {
        if (localStorage.getItem(STORAGE_KEY)) {
          setHasVisited(true);
        }
      } catch {
        // silent
      }
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleReplayIntro = useCallback(() => {
    if (onReplayIntro) {
      onReplayIntro();
      return;
    }
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // silent
    }
    setHasVisited(false);
    router.push("/");
  }, [router, onReplayIntro]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't navigate if drawer is open
      if (drawerOpen) return;
      if (
        e.key === "Escape" &&
        window.location.pathname !== "/console" &&
        window.location.pathname !== "/"
      ) {
        e.preventDefault();
        router.push("/console");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router, drawerOpen]);

  return (
    <div className="min-h-screen bg-wpm-black relative">
      {/* Grid background */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(108,77,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(108,77,255,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-30 h-12 border-b border-white/[0.04] bg-wpm-black/80 backdrop-blur-sm flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="font-mono text-sm tracking-widest text-wpm-cyan/80 hover:text-wpm-cyan transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wpm-purple/50 focus-visible:ring-offset-2 focus-visible:ring-offset-wpm-black rounded-sm"
            aria-label="WPM.OS Home"
          >
            WPM.OS
          </Link>
          <span className="font-mono text-[10px] text-wpm-gray/70 hidden sm:inline">v1.0</span>
        </div>

        {showNav && (
          <>
            {/* Desktop nav — icon row */}
            <nav
              aria-label="Quick navigation"
              className="hidden md:flex items-center gap-0.5"
            >
              {activeMenuItems.map((item) => {
                const iconName = navIconNames[item.id];
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="relative font-mono text-[10px] text-wpm-gray/75 hover:text-wpm-cyan
                             px-2 py-1 transition-colors duration-200 group
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wpm-purple/50 focus-visible:ring-offset-2 focus-visible:ring-offset-wpm-black rounded-sm"
                    aria-label={item.label}
                  >
                    <span className="text-wpm-purple/80 group-hover:text-wpm-purple transition-colors">
                      <Icon name={iconName} size="sm" />
                    </span>
                    <span className="ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity hidden lg:inline">
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* Mobile nav button */}
            <button
              ref={modulesButtonRef}
              className="md:hidden font-mono text-[11px] text-wpm-gray/75 hover:text-wpm-cyan transition-colors
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wpm-purple/50 rounded-sm px-2 py-1"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={drawerOpen}
              aria-controls="mobile-nav-drawer"
            >
              MODULES
            </button>
          </>
        )}
      </header>

      {/* Bottom bar */}
      <footer className="fixed bottom-0 left-0 right-0 z-30 h-8 border-t border-white/[0.04] bg-wpm-black/80 backdrop-blur-sm flex items-center justify-between px-4 md:px-6">
        <span className="font-mono text-[10px] text-wpm-gray/70">
          {profile.name}
        </span>
        <div className="flex items-center gap-4">
          {mode === "hub" && hasVisited && (
            <button
              className="font-mono text-[10px] text-wpm-gray/65 hover:text-wpm-cyan/80 transition-colors
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wpm-purple/50 rounded-sm px-1"
              onClick={handleReplayIntro}
            >
              Replay Intro
            </button>
          )}
          {mode === "page" && (
            <span className="font-mono text-[10px] text-wpm-gray/65">
              ESC to return
            </span>
          )}
          {mode === "hub" && (
            <span className="font-mono text-[10px] text-wpm-gray/65">WPM.OS v1.0</span>
          )}
        </div>
      </footer>

      {/* Main content */}
      <main id="main-content" tabIndex={-1} className="pt-12 pb-16 min-h-screen focus:outline-none">
        <PageTransition>{children}</PageTransition>
      </main>

      {/* Mobile drawer */}
      <MobileNavDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} returnFocusRef={modulesButtonRef} />

      {/* CRT overlays */}
      <div className="crt-overlay" />
      <div className="crt-vignette" />
    </div>
  );
}
