"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface HologramProps {
  id: string;
}

function HologramScene({ id }: HologramProps) {
  const meshRef = useRef<THREE.Group>(null);
  const scannerRef = useRef<THREE.Mesh>(null);
  const extraRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.4;
      meshRef.current.position.y = Math.sin(t * 0.8) * 0.08;
    }
    if (extraRef.current) {
      extraRef.current.rotation.y = -t * 0.6;
      extraRef.current.rotation.z = t * 0.2;
    }
    if (scannerRef.current) {
      scannerRef.current.position.y = Math.sin(t * 1.2) * 1.8;
    }
  });

  const Artifact = useMemo(() => {
    const lightCyan = "#74F7FF";
    const deepPurple = "#6C4DFF";
    const successGreen = "#5BFFC7";
    const warningGold = "#FFCF6B";
    const experimentalPink = "#FF7AD9";

    // Common material factory for high performance
    const getWireframe = (color: string, opacity = 1) => 
      new THREE.MeshBasicMaterial({ 
        color, 
        wireframe: true, 
        transparent: opacity < 1, 
        opacity,
        blending: THREE.AdditiveBlending
      });

    switch (id) {
      case "about":
        return (
          <group ref={meshRef}>
            <mesh position={[0, 0.6, 0]}>
              <sphereGeometry args={[0.45, 20, 20]} />
              <primitive object={getWireframe(lightCyan)} attach="material" />
            </mesh>
            <mesh position={[0, -0.4, 0]}>
              <cylinderGeometry args={[0.6, 0.9, 1.2, 10]} />
              <primitive object={getWireframe(lightCyan)} attach="material" />
            </mesh>
            <mesh position={[0, 0.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
               <torusGeometry args={[0.65, 0.005, 16, 40]} />
               <meshBasicMaterial color={deepPurple} transparent opacity={0.4} />
            </mesh>
          </group>
        );
      case "projects":
        return (
          <group ref={meshRef}>
            <mesh>
              <boxGeometry args={[0.85, 0.85, 0.85]} />
              <primitive object={getWireframe(lightCyan)} attach="material" />
            </mesh>
            <group ref={extraRef}>
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1.25, 0.01, 16, 50]} />
                <meshBasicMaterial color={deepPurple} />
              </mesh>
              <mesh rotation={[0, Math.PI / 2, 0]}>
                <torusGeometry args={[1.55, 0.008, 16, 50]} />
                <meshBasicMaterial color={lightCyan} transparent opacity={0.2} />
              </mesh>
            </group>
          </group>
        );
      case "skills":
        return (
          <group ref={meshRef}>
            <mesh>
              <icosahedronGeometry args={[0.9, 1]} />
              <primitive object={getWireframe(successGreen)} attach="material" />
            </mesh>
            <group ref={extraRef}>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <mesh key={i} position={[
                  Math.sin((i / 6) * Math.PI * 2) * 1.6, 
                  Math.cos((i / 6) * Math.PI * 2) * 1.6, 
                  Math.sin(i) * 0.4
                ]}>
                  <sphereGeometry args={[0.1, 12, 12]} />
                  <meshBasicMaterial color={successGreen} />
                </mesh>
              ))}
            </group>
          </group>
        );
      case "resume":
        return (
          <group ref={meshRef}>
            {[0, 1, 2].map((i) => (
              <mesh key={i} position={[0, i * 0.6 - 0.6, 0]}>
                <boxGeometry args={[1.3, 0.35, 0.85]} />
                <primitive object={getWireframe(warningGold)} attach="material" />
              </mesh>
            ))}
            <mesh position={[0.75, 0, 0]}>
               <cylinderGeometry args={[0.03, 0.03, 2.2, 8]} />
               <meshBasicMaterial color={warningGold} transparent opacity={0.3} />
            </mesh>
          </group>
        );
      case "lab":
        return (
          <group ref={meshRef}>
            <mesh>
              <octahedronGeometry args={[1.3, 0]} />
              <primitive object={getWireframe(experimentalPink)} attach="material" />
            </mesh>
            <mesh scale={0.5}>
              <octahedronGeometry args={[1.3, 0]} />
              <meshBasicMaterial color={experimentalPink} />
            </mesh>
            <group ref={extraRef}>
               <mesh>
                 <sphereGeometry args={[2, 20, 20]} />
                 <primitive object={getWireframe(experimentalPink, 0.05)} attach="material" />
               </mesh>
            </group>
          </group>
        );
      case "hobbies":
        return (
          <group ref={meshRef}>
            <mesh>
              <coneGeometry args={[0.9, 1.4, 4]} />
              <primitive object={getWireframe("#8B95A5")} attach="material" />
            </mesh>
            <mesh rotation={[Math.PI, 0, 0]} position={[0, -1.4, 0]}>
              <coneGeometry args={[0.9, 1.4, 4]} />
              <primitive object={getWireframe("#8B95A5")} attach="material" />
            </mesh>
          </group>
        );
      case "contact":
        return (
          <group ref={meshRef}>
            <mesh position={[0, -0.9, 0]}>
              <cylinderGeometry args={[0.08, 0.18, 1.6, 12]} />
              <primitive object={getWireframe(lightCyan)} attach="material" />
            </mesh>
            <group>
               {[1, 2, 3].map(i => (
                 <mesh key={i} position={[0, 0.6, 0]} rotation={[Math.PI/2, 0, 0]}>
                    <torusGeometry args={[i * 0.45, 0.005, 8, 40]} />
                    <meshBasicMaterial color={lightCyan} transparent opacity={1 / (i * 1.5)} />
                 </mesh>
               ))}
            </group>
          </group>
        );
      default:
        return (
          <mesh ref={meshRef as React.RefObject<THREE.Group>}>
            <torusKnotGeometry args={[0.7, 0.18, 80, 16]} />
            <primitive object={getWireframe(lightCyan)} attach="material" />
          </mesh>
        );
    }
  }, [id]);

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} color="#74F7FF" intensity={1.5} />
      
      {Artifact}

      {/* Scanner Laser */}
      <mesh ref={scannerRef} rotation-x={Math.PI / 2}>
        <planeGeometry args={[4.5, 4.5]} />
        <meshBasicMaterial 
          color="#74F7FF" 
          transparent 
          opacity={0.12} 
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Grid Support */}
      <gridHelper args={[10, 10, 0x74F7FF, 0x74F7FF]} rotation-x={Math.PI/2} position={[0, 0, -2]}>
         <primitive object={new THREE.MeshBasicMaterial({ color: 0x74F7FF, transparent: true, opacity: 0.04 })} attach="material" />
      </gridHelper>
    </>
  );
}

export default function HologramStage({ id }: HologramProps) {
  return (
    <div className="w-full h-full min-h-[350px] relative pointer-events-none" aria-hidden="true">
      <Suspense fallback={null}>
        <Canvas 
          camera={{ position: [0, 0, 5], fov: 40 }}
          dpr={[1, 1.5]}
          gl={{ 
            antialias: false, 
            powerPreference: "high-performance",
            alpha: true 
          }}
        >
          <HologramScene id={id} />
        </Canvas>
      </Suspense>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(116,247,255,0.01)_1px,transparent_1px)] bg-[size:100%_3px]" />
    </div>
  );
}
