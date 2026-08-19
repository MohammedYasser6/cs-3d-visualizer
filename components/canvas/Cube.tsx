"use client"; // This tells Next.js this component runs in the browser, required for 3D

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

export default function Cube() {
  // We use a reference to directly access the 3D mesh
  const meshRef = useRef<Mesh>(null);

  // useFrame runs on every single frame (typically 60 times per second)
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 1.2;
    }
  });

  return (
    <mesh ref={meshRef}>
      {/* The geometry is the mathematical shape (a box) */}
      <boxGeometry args={[2, 2, 2]} />
      {/* The material is how it looks (color, reaction to light) */}
      <meshStandardMaterial color="#3b82f6" wireframe={false} />
    </mesh>
  );
}
