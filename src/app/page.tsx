"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import PressStart from "@/components/boot/PressStart";
import { useIntroSkip } from "@/hooks/useIntroSkip";

type Stage = "boot" | "start" | "console";

const ShaderBackgroundWrapper = dynamic(
  () => import("@/components/webgl/ShaderBackgroundWrapper"),
  {
    ssr: false,
    loading: () => null,
  }
);

const BootIntro = dynamic(() => import("@/components/boot/BootIntro"), {
  ssr: false,
  loading: () => null,
});

const ConsoleShell = dynamic(() => import("@/components/console/ConsoleShell"), {
  ssr: false,
  loading: () => null,
});

const ConsoleMenu = dynamic(() => import("@/components/console/ConsoleMenu"), {
  ssr: false,
  loading: () => null,
});

const ReverseCrtTransition = dynamic(
  () => import("@/components/motion/ReverseCrtTransition"),
  {
    ssr: false,
    loading: () => null,
  }
);

export default function Home() {
  const { shouldSkip, hydrated, markVisited, replay } = useIntroSkip();
  const [stage, setStage] = useState<Stage>("start");
  const [incomingStage, setIncomingStage] = useState<Stage | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const [startViaTransition, setStartViaTransition] = useState(false);
  const stageStatus =
    stage === "console"
      ? "Console loaded. Seven active modules available."
      : stage === "boot"
        ? "Boot intro playing."
        : "Start screen ready.";

  // Once hydrated, apply the skip decision. The first paint stays on PressStart
  // so the primary title is immediately available for LCP.
  useEffect(() => {
    if (!hydrated) return;
    const raf = requestAnimationFrame(() => {
      if (shouldSkip) {
        setStage("console");
        markVisited();
      }
    });
    return () => cancelAnimationFrame(raf);
  }, [hydrated, shouldSkip, markVisited]);

  const handleBootComplete = useCallback(() => {
    setIncomingStage("start");
    setTransitioning(true);
  }, []);

  const handleBootTransitionDone = useCallback(() => {
    setStage("start");
    setIncomingStage(null);
    setTransitioning(false);
    setStartViaTransition(true);
  }, []);

  const handleStart = useCallback(() => {
    if (transitioning) return;
    setIncomingStage("console");
    setTransitioning(true);
  }, [transitioning]);

  const handleStartTransitionDone = useCallback(() => {
    setStage("console");
    setIncomingStage(null);
    setTransitioning(false);
    markVisited();
  }, [markVisited]);

  const handleReplayIntro = useCallback(() => {
    replay();
    setStage("boot");
    setIncomingStage(null);
    setTransitioning(false);
    setStartViaTransition(false);
  }, [replay]);

  return (
    <>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {transitioning ? "System transition in progress." : stageStatus}
      </p>

      {stage === "console" && !transitioning && <ShaderBackgroundWrapper />}

      {/* ── BOOT stage ── */}
      {stage === "boot" && !transitioning && (
        <main id="main-content" tabIndex={-1} className="focus:outline-none">
          <BootIntro key="boot" onComplete={handleBootComplete} />
        </main>
      )}

      {/* ── START stage ── */}
      {stage === "start" && !transitioning && (
        <main id="main-content" tabIndex={-1} className="focus:outline-none">
          <PressStart key="start" onStart={handleStart} skipCrt={startViaTransition} />
        </main>
      )}

      {/* ── CONSOLE stage ── */}
      {stage === "console" && !transitioning && (
        <ConsoleShell key="console" onReplayIntro={handleReplayIntro} mode="hub">
          <ConsoleMenu />
        </ConsoleShell>
      )}

      {/* ── Incoming stage + overlay (during any transition) ── */}
      {transitioning && (
        <>
          {/* Incoming stage mounted behind overlay */}
          {incomingStage === "start" && (
            <main id="main-content" tabIndex={-1} className="fixed inset-0 z-30 focus:outline-none">
              <PressStart key="start-incoming" onStart={() => {}} skipCrt />
            </main>
          )}
          {incomingStage === "console" && (
            <div className="fixed inset-0 z-30">
              <ConsoleShell key="console-incoming" mode="hub">
                <ConsoleMenu />
              </ConsoleShell>
            </div>
          )}

          {/* CRT overlay on top */}
          <ReverseCrtTransition
            active
            onComplete={
              incomingStage === "start"
                ? handleBootTransitionDone
                : handleStartTransitionDone
            }
          />
        </>
      )}
    </>
  );
}
