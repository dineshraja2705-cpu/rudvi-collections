import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { TorusKnot } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import logo from "@/assets/WhatsApp Image 2026-06-27 at 1.36.07 PM.jpeg";

function SpinningJewel() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.x = t * 0.9;
    ref.current.rotation.y = t * 1.3;
  });
  return (
    <TorusKnot ref={ref} args={[1, 0.34, 200, 32]}>
      <meshStandardMaterial color="#e9c873" metalness={1} roughness={0.18} />
    </TorusKnot>
  );
}

export default function IntroOverlay() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDone(true), 3200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.9, ease: "easeInOut" } }}
        >
          <div className="h-44 w-44 sm:h-56 sm:w-56">
            <Canvas camera={{ position: [0, 0, 4.2], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[4, 4, 4]} intensity={3} color="#f0d486" />
              <pointLight position={[-4, -2, 2]} intensity={1.5} color="#d8b25a" />
              <SpinningJewel />
            </Canvas>
          </div>

          <motion.img
            src={logo}
            alt="Rudvi Collection"
            className="mt-3 h-24 w-24 rounded-full border border-primary/30 object-cover shadow-luxe sm:h-32 sm:w-32"
            width={1280}
            height={1280}
            initial={{ opacity: 0, scale: 0.86 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.9, duration: 0.9, ease: "easeOut" }}
          />

          <motion.h1
            className="mt-2 text-center font-display text-4xl tracking-wide-2 text-gradient-gold sm:text-6xl"
            initial={{ opacity: 0, y: 24, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, y: 0, letterSpacing: "0.12em" }}
            transition={{ delay: 0.5, duration: 1.4, ease: "easeOut" }}
          >
            Rudvi Collection
          </motion.h1>

          <motion.p
            className="mt-4 text-xs uppercase tracking-luxe text-muted-foreground sm:text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1.2 }}
          >
            Where Elegance Is Woven
          </motion.p>

          <motion.div
            className="mt-8 h-px w-40 gold-line"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.8, duration: 1.2 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
