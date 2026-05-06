"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

interface UseRovingTabIndexOptions {
  itemCount: number;
  gridCols: number;
  onSelect?: (index: number) => void;
  /** If true, Enter/Space calls onSelect instead of router.push */
  handleSelect?: boolean;
}

export function useRovingTabIndex({
  itemCount,
  gridCols,
  onSelect,
  handleSelect = false,
}: UseRovingTabIndexOptions) {
  const router = useRouter();
  const [focusedIdx, setFocusedIdx] = useState(0);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const rowCount = Math.ceil(itemCount / gridCols);

  const clamp = useCallback(
    (idx: number) => Math.max(0, Math.min(idx, itemCount - 1)),
    [itemCount]
  );

  // Focus the active item
  useEffect(() => {
    itemRefs.current[focusedIdx]?.focus({ preventScroll: true });
  }, [focusedIdx]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // Only handle keys when focus is inside the grid
      const active = document.activeElement as HTMLElement | null;
      if (!active || !itemRefs.current.includes(active)) return;

      const row = Math.floor(focusedIdx / gridCols);
      const col = focusedIdx % gridCols;

      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          if (col < gridCols - 1 && focusedIdx + 1 < itemCount)
            setFocusedIdx(clamp(focusedIdx + 1));
          break;
        case "ArrowLeft":
          e.preventDefault();
          if (col > 0) setFocusedIdx(clamp(focusedIdx - 1));
          break;
        case "ArrowDown":
          e.preventDefault();
          if (row < rowCount - 1) setFocusedIdx(clamp(focusedIdx + gridCols));
          break;
        case "ArrowUp":
          e.preventDefault();
          if (row > 0) setFocusedIdx(clamp(focusedIdx - gridCols));
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          if (handleSelect && onSelect) {
            onSelect(focusedIdx);
          }
          break;
        case "Home":
          e.preventDefault();
          setFocusedIdx(0);
          break;
        case "End":
          e.preventDefault();
          setFocusedIdx(itemCount - 1);
          break;
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [focusedIdx, itemCount, gridCols, rowCount, clamp, handleSelect, onSelect, router]);

  return {
    focusedIdx,
    setFocusedIdx,
    itemRefs,
  };
}
