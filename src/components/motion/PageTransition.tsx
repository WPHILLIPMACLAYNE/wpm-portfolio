"use client";

import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const prefersReduced = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: prefersReduced ? 0 : 0.15, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
