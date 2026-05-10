"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "motion/react";
import { menuItems, profile } from "@/data/profile";
import PageTransition from "@/components/motion/PageTransition";

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

const activeMenuItems = menuItems.filter((m) => m.status === "Active");

export default function ConsoleShell({ children, showNav = true, onReplayIntro, mode = "page" }: ConsoleShellProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hasVisited, setHasVisited] = useState(false);
  const modulesButtonRef = useRef<HTMLButtonElement>(null);
  const normalizedPathname = pathname.replace(/^\/wpm-portfolio(?=\/|$)/, "") || "/";
  const currentItem = activeMenuItems.find(
    (item) =>
      normalizedPathname === item.href ||
      (item.href !== "/" && normalizedPathname.startsWith(`${item.href}/`))
  );
  
  const currentLabel = mode === "hub" ? "SISTEMA OPERACIONAL" : currentItem?.label ?? "ARQUIVO";

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

      {/* Modern High-Tech Header */}
      <header className="fixed top-0 left-0 right-0 z-30 h-16 bg-[#050509]/90 backdrop-blur-xl border-b border-white/[0.08]">
        <div className="mx-auto h-full flex items-center justify-between px-6">
          
          {/* Logo & Status */}
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center gap-3 group"
            >
              <div className="relative flex h-9 w-9 items-center justify-center border border-wpm-cyan/30 bg-wpm-cyan/5">
                 <motion.div 
                   animate={{ opacity: [0.4, 1, 0.4] }}
                   transition={{ duration: 2, repeat: Infinity }}
                   className="h-1.5 w-1.5 bg-wpm-cyan shadow-[0_0_8px_rgba(116,247,255,0.8)]" 
                 />
                 <div className="absolute top-0 left-0 h-1.5 w-1.5 border-t border-l border-wpm-cyan" />
                 <div className="absolute bottom-0 right-0 h-1.5 w-1.5 border-b border-r border-wpm-cyan" />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[10px] font-black tracking-[0.3em] text-wpm-white leading-none">WPM.OS</span>
                <span className="font-mono text-[7px] text-wpm-cyan/50 tracking-[0.2em] mt-1 uppercase">KERNEL_V1.0</span>
              </div>
            </Link>

            <div className="hidden h-10 w-px bg-white/10 sm:block" />

            <div className="hidden flex-col sm:flex">
               <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-wpm-muted">NODE_STATUS</span>
               <div className="flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-wpm-success animate-pulse" />
                  <span className="font-mono text-[10px] uppercase font-bold text-wpm-white/80">{currentLabel}</span>
               </div>
            </div>
          </div>

          {showNav && (
            <>
              {/* Desktop Refined Tactical Nav */}
              <nav className="hidden lg:flex items-center h-full gap-1">
                {activeMenuItems.map((item, idx) => {
                  const active = currentItem?.id === item.id;
                  
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={`relative flex items-center px-6 h-12 transition-all duration-300 group overflow-hidden
                               ${active 
                                 ? "bg-wpm-cyan/[0.04] border border-wpm-cyan/20" 
                                 : "border border-white/5 hover:border-white/20 hover:bg-white/[0.02]"
                               }`}
                    >
                      {/* Internal corner decoration */}
                      <div className={`absolute top-0 left-0 h-1 w-1 border-t border-l transition-colors ${active ? 'border-wpm-cyan' : 'border-white/10'}`} />
                      
                      <div className="flex items-center gap-3 relative z-10">
                        {/* THE LED */}
                        <div className="relative flex items-center justify-center">
                          <div className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                            active 
                              ? "bg-wpm-cyan shadow-[0_0_10px_rgba(116,247,255,1)]" 
                              : "bg-white/10 group-hover:bg-wpm-cyan/40"
                          }`} />
                          {active && (
                            <motion.div 
                              layoutId="led-ring"
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 2.5, opacity: 0 }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                              className="absolute h-1.5 w-1.5 rounded-full border border-wpm-cyan"
                            />
                          )}
                        </div>

                        <div className="flex flex-col">
                           <span className={`font-mono text-[10px] font-bold tracking-[0.15em] uppercase transition-colors ${
                             active ? "text-wpm-white" : "text-wpm-muted group-hover:text-wpm-white"
                           }`}>
                             {item.label}
                           </span>
                           <span className="font-mono text-[6px] tracking-widest text-white/10 uppercase group-hover:text-wpm-cyan/20 transition-colors">
                             ID_SUBSYS_0{idx + 1}
                           </span>
                        </div>
                      </div>

                      {/* Hover/Active Background Glow */}
                      <div className={`absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity`} />
                      
                      {active && (
                        <motion.div 
                          layoutId="nav-active-indicator"
                          className="absolute bottom-0 left-2 right-2 h-0.5 bg-wpm-cyan shadow-[0_0_15px_rgba(116,247,255,0.8)]" 
                        />
                      )}
                    </Link>
                  );
                })}
              </nav>

              {/* Mobile Menu Toggle */}
              <button
                ref={modulesButtonRef}
                className="lg:hidden flex items-center gap-4 px-5 py-2 border border-wpm-cyan/20 bg-wpm-cyan/[0.03] active:bg-wpm-cyan/[0.1] transition-all"
                onClick={() => setDrawerOpen(true)}
              >
                <div className="flex flex-col gap-1.5">
                   <div className="h-0.5 w-5 bg-wpm-cyan shadow-[0_0_5px_rgba(116,247,255,0.5)]" />
                   <div className="h-0.5 w-3 bg-wpm-cyan shadow-[0_0_5px_rgba(116,247,255,0.5)]" />
                </div>
                <span className="font-mono text-[10px] uppercase font-black tracking-[0.2em] text-wpm-cyan">Modules</span>
              </button>
            </>
          )}
        </div>
      </header>

      {/* Footer bar */}
      <footer className="fixed bottom-0 left-0 right-0 z-30 hidden h-10 items-center justify-between border-t border-white/[0.08] bg-[#050509]/90 px-6 backdrop-blur-md md:flex">
        <div className="flex items-center gap-4">
           <div className="h-2 w-2 rounded-full bg-wpm-success shadow-[0_0_8px_rgba(91,255,199,0.5)]" />
           <span className="font-mono text-[9px] text-wpm-white/60 uppercase tracking-widest font-bold">
            {profile.name} <span className="text-wpm-cyan/40">USER_AUTH_OK</span>
          </span>
        </div>
        
        <div className="flex items-center gap-6">
          {mode === "hub" && hasVisited && (
            <button
              className="wpm-btn-ripple font-mono text-[9px] text-wpm-muted hover:text-wpm-cyan transition-colors uppercase tracking-[0.2em]"
              onClick={handleReplayIntro}
            >
              [ RE-BOOT_SYSTEM ]
            </button>
          )}
          
          <div className="flex items-center gap-2">
             <span className="font-mono text-[9px] text-wpm-muted uppercase">SYSTEM_STATE:</span>
             <span className="font-mono text-[9px] text-wpm-success font-bold uppercase tracking-widest italic animate-pulse">OPERATIONAL</span>
          </div>
          
          {mode === "page" && (
            <span className="font-mono text-[9px] text-wpm-muted border-l border-white/10 pl-6">
              TECLE <span className="text-wpm-white font-bold">[ESC]</span> PARA RETORNAR
            </span>
          )}
        </div>
      </footer>

      {/* Main content area */}
      <main id="main-content" tabIndex={-1} className="pt-16 pb-16 min-h-screen focus:outline-none relative z-10">
        <PageTransition>{children}</PageTransition>
      </main>

      <MobileNavDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      {/* Floating Back Button for Mobile */}
      {mode === "page" && (
        <Link
          href="/console"
          className="fixed bottom-14 right-6 z-40 flex h-14 w-14 items-center justify-center border border-wpm-cyan/40 bg-wpm-black/90 text-wpm-cyan shadow-[0_0_30px_rgba(116,247,255,0.2)] backdrop-blur-lg hover:bg-wpm-cyan hover:text-wpm-black transition-all active:scale-90 lg:hidden"
          aria-label="Voltar ao console"
        >
          <span className="font-mono text-xl font-black italic">{"<"}</span>
        </Link>
      )}

      {/* CRT Effects */}
      <div className="crt-overlay pointer-events-none" />
      <div className="crt-vignette pointer-events-none" />
    </div>
  );
}
