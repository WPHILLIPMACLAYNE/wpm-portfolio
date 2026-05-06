"use client";

import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";

interface PageTransitionProps {
  children: React.ReactNode;
  /** Unique key for the page — usually the pathname */
  pageKey?: string;
}

const variants = {
  initial: {
    opacity: 0,
    y: 12,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -12,
  },
};

export default function PageTransition({ children, pageKey }: PageTransitionProps) {
  const pathname = usePathname();
  const key = pageKey ?? pathname;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={key}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{
          duration: 0.35,
          ease: "easeOut",
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
