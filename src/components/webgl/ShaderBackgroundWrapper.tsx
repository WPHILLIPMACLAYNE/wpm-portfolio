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
   - Desktop + WebGL disponível + sem prefers-reduced-motion → Canvas com partículas
   - Mobile → sempre CSS fallback (nem consulta WebGL, nunca carrega Three.js/R3F)
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
    // Defer detection to next frame to avoid sync setState in effect.
    // Mobile MUST be detected first — we skip WebGL detection on mobile
    // to avoid creating a temporary canvas.getContext("webgl") context.
    requestAnimationFrame(() => {
      if (cancelled) return;
      const mobile = detectMobile();
      setIsMobile(mobile);
      // Only desktop runs WebGL detection (creates canvas context)
      setWebglOk(mobile ? false : detectWebGL());
    });
    return () => { cancelled = true; };
  }, []);

  // Still detecting — show nothing (prevents flash)
  if (webglOk === null) return null;

  // Reduced motion → CSS fallback immediately
  if (prefersReduced) return <ShaderBackgroundFallback />;

  // No WebGL (or mobile — webglOk forced false) → CSS fallback
  if (!webglOk) return <ShaderBackgroundFallback />;

  // Safety net: mobile (should already be caught by !webglOk)
  if (isMobile) return <ShaderBackgroundFallback />;

  // Desktop com WebGL disponível
  return <ShaderBackgroundDynamic />;
}
