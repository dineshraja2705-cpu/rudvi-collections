import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, TorusKnot, Icosahedron } from "@react-three/drei";
import * as THREE from "three";

// Shared scroll progress (0..1-ish based on viewport scroll), updated outside React.
const scrollRef = { current: 0 };
if (typeof window !== "undefined") {
  window.addEventListener(
    "scroll",
    () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = max > 0 ? window.scrollY / max : 0;
    },
    { passive: true },
  );
}

const GOLD = "#d8b25a";
const GOLD_BRIGHT = "#f0d486";

function GoldenDust() {
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const count = 700;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 26;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 26;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 16;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.03 + scrollRef.current * 1.5;
    ref.current.rotation.x = scrollRef.current * 0.6;
    ref.current.position.y = Math.sin(t * 0.2) * 0.3;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color={GOLD_BRIGHT}
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function FloatingForms() {
  const knot = useRef<THREE.Mesh>(null!);
  const ico = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const s = scrollRef.current;
    if (knot.current) {
      knot.current.rotation.x = t * 0.15 + s * 4;
      knot.current.rotation.y = t * 0.2 + s * 3;
      knot.current.position.x = 4.2 - s * 2;
      knot.current.position.y = -1 + Math.sin(t * 0.4) * 0.4 + s * 2;
    }
    if (ico.current) {
      ico.current.rotation.y = -t * 0.18 - s * 3;
      ico.current.rotation.z = t * 0.1;
      ico.current.position.x = -4.5 + s * 2.5;
      ico.current.position.y = 1.5 - s * 3;
    }
  });

  return (
    <>
      <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.1}>
        <TorusKnot ref={knot} args={[0.9, 0.26, 160, 24]} position={[4.2, -1, -1]}>
          <meshStandardMaterial color={GOLD} metalness={1} roughness={0.22} wireframe />
        </TorusKnot>
      </Float>
      <Float speed={1.1} rotationIntensity={0.8} floatIntensity={1.4}>
        <Icosahedron ref={ico} args={[1.1, 0]} position={[-4.5, 1.5, -2]}>
          <meshStandardMaterial color={GOLD_BRIGHT} metalness={1} roughness={0.15} flatShading />
        </Icosahedron>
      </Float>
    </>
  );
}

export default function Scene3D() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 55 }}
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[6, 6, 6]} intensity={2.2} color={GOLD_BRIGHT} />
        <pointLight position={[-6, -4, 4]} intensity={1.3} color={GOLD} />
        <GoldenDust />
        <FloatingForms />
      </Canvas>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 30%, transparent 30%, oklch(0.14 0.012 70 / 0.7) 100%)",
        }}
      />
    </div>
  );
}
