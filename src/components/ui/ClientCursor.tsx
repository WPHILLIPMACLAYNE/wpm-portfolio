"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Cursor = dynamic(() => import("./Cursor"), {
  ssr: false,
  loading: () => null,
});

export default function ClientCursor() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mql.matches) return;

    const timeout = window.setTimeout(() => setEnabled(true), 1200);
    return () => window.clearTimeout(timeout);
  }, []);

  return enabled ? <Cursor /> : null;
}
