"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "wpm-os-visited";
const SKIP_WINDOW = 24 * 60 * 60 * 1000; // 24h

export function useIntroSkip() {
  const [shouldSkip, setShouldSkip] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const lastVisit = parseInt(stored, 10);
          const elapsed = Date.now() - lastVisit;
          if (elapsed > 0 && elapsed < SKIP_WINDOW) {
            setShouldSkip(true);
          }
        }
      } catch {
        // localStorage unavailable (private browsing, SSR, etc.)
      }
      setHydrated(true);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  const markVisited = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {
      // silent fail
    }
  }, []);

  const replay = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // silent fail
    }
    setShouldSkip(false);
  }, []);

  return { shouldSkip, hydrated, markVisited, replay };
}
