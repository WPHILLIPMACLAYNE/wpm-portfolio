"use client";

import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { menuItems } from "@/data/profile";

interface PageTransitionProps {
  children: React.ReactNode;
}

const routeIndexMap: Record<string, number> = {
  "/": 0,
  "/console": 1,
};

menuItems.forEach((item, idx) => {
  // Garantir que mapeamos tanto a versão absoluta quanto a relativa se necessário
  routeIndexMap[item.href] = idx + 2;
});

export default function PageTransition({ children }: PageTransitionProps) {
  const rawPathname = usePathname();
  
  // Segurança: se rawPathname for null (raro no Next), default para root
  const safePathname = rawPathname || "/";
  
  // Normalizar removendo o base path para busca no mapa
  const normalizedPathname = safePathname.replace(/^\/wpm-portfolio(?=\/|$)/, "") || "/";
  
  const prefersReduced = useReducedMotion();
  const [direction, setDirection] = useState(0); 
  const prevPathRef = useRef(normalizedPathname);

  useEffect(() => {
    const prevIndex = routeIndexMap[prevPathRef.current] ?? 0;
    const currentIndex = routeIndexMap[normalizedPathname] ?? 0;

    if (currentIndex > prevIndex) {
      setDirection(1);
    } else if (currentIndex < prevIndex) {
      setDirection(-1);
    } else {
      setDirection(0);
    }

    prevPathRef.current = normalizedPathname;
  }, [normalizedPathname]);

  const variants = {
    initial: (dir: number) => ({
      x: dir > 0 ? "50%" : dir < 0 ? "-50%" : 0,
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-50%" : dir < 0 ? "50%" : 0,
      opacity: 0,
    })
  };

  return (
    <div className="relative w-full overflow-hidden">
      <AnimatePresence mode="wait" custom={direction} initial={false}>
        <motion.div
          key={normalizedPathname}
          custom={direction}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ 
            duration: prefersReduced ? 0 : 0.4, 
            ease: [0.23, 1, 0.32, 1],
            opacity: { duration: 0.2 }
          }}
          className="w-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
