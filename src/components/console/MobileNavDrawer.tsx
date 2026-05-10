"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "next/navigation";
import { menuItems, profile } from "@/data/profile";
import type { MenuItem } from "@/data/profile";

interface MobileNavDrawerProps {
  open: boolean;
  onClose: () => void;
}

function getItemStyle(item: MenuItem): { clickable: boolean; hint: string; status: string } {
  if (item.status === "Active") return { clickable: true, hint: "ACESSO_LIBERADO", status: "ONLINE" };
  if (item.status === "Coming Soon")
    return { clickable: false, hint: "SETOR_EM_DESENVOLVIMENTO", status: "WAIT" };
  return { clickable: false, hint: "ARQUIVO_CRIPTOGRAFADO", status: "LOCKED" };
}

export default function MobileNavDrawer({ open, onClose }: MobileNavDrawerProps) {
  const router = useRouter();
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleTrap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const items = drawerRef.current?.querySelectorAll<HTMLElement>('button:not([disabled])');
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

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => {
      const first = drawerRef.current?.querySelector<HTMLElement>('button:not([disabled])');
      first?.focus();
    }, 150);
    return () => clearTimeout(t);
  }, [open]);

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
          <motion.div
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            ref={drawerRef}
            className="fixed top-0 right-0 bottom-0 z-50 w-[80vw] max-w-sm bg-[#050509] border-l border-wpm-cyan/20 shadow-[-20px_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col"
            id="mobile-nav-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegacao tatico"
          >
            {/* Tactical Background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #74F7FF 1px, transparent 0)', backgroundSize: '24px 24px' }} />

            {/* Header */}
            <div className="relative p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
              <div className="flex flex-col">
                <span className="font-mono text-[10px] tracking-[0.3em] text-wpm-cyan uppercase font-black">Sub_Systems</span>
                <span className="font-mono text-[8px] text-wpm-muted mt-1 uppercase">Deploy_Interface_v1.0</span>
              </div>
              <button 
                onClick={onClose}
                className="h-10 w-10 flex items-center justify-center border border-white/10 text-wpm-muted active:text-wpm-cyan active:border-wpm-cyan/40 transition-colors"
              >
                <span className="font-mono text-lg">X</span>
              </button>
            </div>

            {/* Content / Scrollable Area */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
              {menuItems.map((item, idx) => {
                const { clickable, hint, status } = getItemStyle(item);
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    disabled={!clickable}
                    className={`relative w-full flex flex-col p-4 border transition-all duration-200 text-left group
                              ${clickable 
                                ? "border-white/5 bg-white/[0.02] active:bg-wpm-cyan/[0.05] active:border-wpm-cyan/30" 
                                : "border-transparent opacity-30"}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                       <div className="flex items-center gap-3">
                          <div className={`h-1.5 w-1.5 rounded-full ${clickable ? 'bg-wpm-cyan shadow-[0_0_8px_#74F7FF]' : 'bg-white/10'}`} />
                          <span className="font-mono text-[8px] tracking-[0.2em] text-wpm-muted uppercase">SYS_NODE_0{idx + 1}</span>
                       </div>
                       <span className={`font-mono text-[8px] font-bold px-1.5 py-0.5 border ${clickable ? 'border-wpm-cyan/40 text-wpm-cyan' : 'border-white/10 text-white/20'}`}>
                          {status}
                       </span>
                    </div>

                    <span className={`font-sans text-lg font-black uppercase italic tracking-tighter ${clickable ? 'text-wpm-white group-active:text-wpm-cyan' : 'text-wpm-muted'}`}>
                      {item.label}
                    </span>
                    
                    <span className="font-mono text-[9px] mt-2 text-wpm-muted leading-tight uppercase tracking-widest">
                      {hint}
                    </span>

                    {/* Corner decoration */}
                    {clickable && (
                      <div className="absolute bottom-0 right-0 h-2 w-2 border-b border-r border-white/10 group-active:border-wpm-cyan/40" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Footer Area */}
            <div className="p-6 border-t border-white/5 bg-white/[0.01] relative">
               <div className="flex items-center gap-3 mb-4">
                  <div className="h-1 w-1 bg-wpm-success animate-pulse" />
                  <span className="font-mono text-[9px] text-wpm-success uppercase tracking-widest font-bold">Encrypted_Session</span>
               </div>
               <p className="font-mono text-[8px] text-wpm-muted leading-relaxed uppercase">
                 User: {profile.name} <br/>
                 Auth_Status: Authorized_Master
               </p>
               
               {/* Aesthetic scanning line for the footer */}
               <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-wpm-cyan/20 to-transparent" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
