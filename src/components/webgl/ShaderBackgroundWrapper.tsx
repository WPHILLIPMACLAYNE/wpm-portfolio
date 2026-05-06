"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";
import ShaderBackgroundFallback from "./ShaderBackgroundFallback";

/* ───────────────────────────────────────────────────────────
   ShaderBackground — Smart Wrapper

   Onde usar no Next.js App Router:

   1. No RootLayout (src/app/layout.tsx):
      ── Adiciona o fundo em TODAS as páginas.

      <body>
        <ShaderBackgroundWrapper />
        {children}
      </body>

   2. Em uma página específica (ex: page.tsx):
      ── Fundo apenas na home.

      export default function Home() {
        return (
          <>
            <ShaderBackgroundWrapper />
            <BootIntro ... />
          </>
        );
      }

   Comportamento automático:
   - WebGL disponível + sem prefers-reduced-motion → Canvas com partículas
   - WebGL indisponível → fallback CSS (gradient + dots)
   - prefers-reduced-motion ativo → fallback CSS
   - Só carrega o código WebGL após a página estar pronta (dynamic import ssr:false)
   - Nunca bloqueia o carregamento da página
   ─────────────────────────────────────────────────────────── */

const ShaderBackgroundDynamic = dynamic(
  () => import("./ShaderBackground"),
  {
    ssr: false,
    loading: () => <ShaderBackgroundFallback />,
  }
);

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      canvas.getContext("webgl") || canvas.getContext("webgl2")
    );
  } catch {
    return false;
  }
}

function detectMobile(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
}

export default function ShaderBackgroundWrapper() {
  const prefersReduced = useReducedMotion();
  const [webglOk, setWebglOk] = useState<boolean | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    let cancelled = false;
    // Defer detection to next frame to avoid sync setState in effect
    requestAnimationFrame(() => {
      if (cancelled) return;
      setWebglOk(detectWebGL());
      setIsMobile(detectMobile());
    });
    return () => { cancelled = true; };
  }, []);

  // Still detecting — show nothing (prevents flash)
  if (webglOk === null) return null;

  // Reduced motion → CSS fallback immediately
  if (prefersReduced) return <ShaderBackgroundFallback />;

  // No WebGL → CSS fallback
  if (!webglOk) return <ShaderBackgroundFallback />;

  // Mobile → WebGL com lowPerf (menos partículas, DPR 1)
  return <ShaderBackgroundDynamic lowPerf={isMobile} />;
}
