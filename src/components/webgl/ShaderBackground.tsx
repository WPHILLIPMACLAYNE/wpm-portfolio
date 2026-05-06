"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import ShaderBackgroundFallback from "./ShaderBackgroundFallback";

/* ── types ──────────────────────────────────────────────── */

interface ShaderBackgroundProps {
  /** Reduce particle count for low-performance mode (default false) */
  lowPerf?: boolean;
}

/* ── particle field ─────────────────────────────────────── */

function ParticleField({ lowPerf = false }: { lowPerf?: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const { pointer } = useThree();

  const particleCount = lowPerf ? 200 : 600;

  // Deterministic pseudo-random (lint-safe, stable across renders)
  const hash = (i: number, seed: number) =>
    (((i * 2654435761 + seed * 0x9e3779b9) >>> 0) & 0xffff) / 0xffff;

  const { positions, colors, velocities } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    const vel = new Float32Array(particleCount * 2);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      pos[i3] = (hash(i, 1) - 0.5) * 24;
      pos[i3 + 1] = (hash(i, 2) - 0.5) * 12;
      pos[i3 + 2] = (hash(i, 3) - 0.5) * 10 - 3;

      const t = (pos[i3 + 1] + 6) / 12;
      col[i3] = 0.4 + t * 0.2;
      col[i3 + 1] = 0.25 + t * 0.15;
      col[i3 + 2] = 0.6 + t * 0.4;

      vel[i * 2] = (hash(i, 4) - 0.5) * 0.08;
      vel[i * 2 + 1] = (hash(i, 5) - 0.5) * 0.06;
    }

    return { positions: pos, colors: col, velocities: vel };
  }, [particleCount]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const posAttr = pointsRef.current.geometry.attributes.position;
    const arr = posAttr.array as Float32Array;

    // Mouse parallax — gentle sway of the entire field
    const mx = pointer.x * 1.5; // -1.5 to 1.5
    const my = pointer.y * 0.8;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const i2 = i * 2;

      // Drift
      arr[i3] += velocities[i2] * delta;
      arr[i3 + 2] += velocities[i2 + 1] * delta;

      // Wrap around
      if (arr[i3] > 12) arr[i3] = -12;
      if (arr[i3] < -12) arr[i3] = 12;
      if (arr[i3 + 2] > 2) arr[i3 + 2] = -8;
      if (arr[i3 + 2] < -8) arr[i3 + 2] = 2;
    }

    posAttr.needsUpdate = true;

    // Gentle rotation of entire field toward mouse
    pointsRef.current.rotation.y += (mx - pointsRef.current.rotation.y) * 0.02;
    pointsRef.current.rotation.x += (my - pointsRef.current.rotation.x) * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

/* ── ambient mist plane ─────────────────────────────────── */

function MistPlane() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.z += delta * 0.015;
  });

  return (
    <mesh ref={meshRef} position={[0, -1.5, -4]}>
      <planeGeometry args={[20, 8]} />
      <meshBasicMaterial
        color="#071B3A"
        transparent
        opacity={0.08}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

/* ── scene ───────────────────────────────────────────────── */

function Scene({ lowPerf }: { lowPerf?: boolean }) {
  return (
    <>
      <color attach="background" args={["#050509"]} />
      <fog attach="fog" args={["#050509", 6, 18]} />
      <ambientLight intensity={0.1} />
      <ParticleField lowPerf={lowPerf} />
      <MistPlane />
    </>
  );
}

/* ── main component ──────────────────────────────────────── */

export default function ShaderBackground({ lowPerf = false }: ShaderBackgroundProps) {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true">
      <Suspense fallback={<ShaderBackgroundFallback />}>
        <Canvas
          dpr={lowPerf ? 1 : [1, 1.5]}
          gl={{
            antialias: false,
            powerPreference: "low-power",
            alpha: false,
          }}
          camera={{ position: [0, 0, 8], fov: 60, near: 0.5, far: 30 }}
          style={{ position: "absolute", inset: 0 }}
        >
          <Scene lowPerf={lowPerf} />
        </Canvas>
      </Suspense>
    </div>
  );
}
