"use client";

import { useState, useEffect, useCallback } from "react";
import BootIntro from "@/components/boot/BootIntro";
import PressStart from "@/components/boot/PressStart";
import ConsoleShell from "@/components/console/ConsoleShell";
import ConsoleMenu from "@/components/console/ConsoleMenu";
import ReverseCrtTransition from "@/components/motion/ReverseCrtTransition";
import ShaderBackgroundWrapper from "@/components/webgl/ShaderBackgroundWrapper";
import { useIntroSkip } from "@/hooks/useIntroSkip";

type Stage = "boot" | "start" | "console";

export default function Home() {
  const { shouldSkip, hydrated, markVisited, replay } = useIntroSkip();
  const [stage, setStage] = useState<Stage>("boot");
  const [incomingStage, setIncomingStage] = useState<Stage | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const [startViaTransition, setStartViaTransition] = useState(false);

  // Once hydrated, apply the skip decision
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
      {/* Ambient particle field behind all stages */}
      <ShaderBackgroundWrapper />

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
