"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import Cube from "../components/canvas/Cube";

export default function Home() {
  return (
    <main className="relative h-screen w-full bg-slate-900">
      {/* HTML UI overlaid on top (pointer-events-none lets clicks pass through to the 3D canvas) */}
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-start pt-10 text-white">
        <h1 className="text-4xl font-bold">Data Structures: 3D Engine</h1>
        <p className="mt-2 text-gray-400">Drag to rotate. Scroll to zoom.</p>
      </div>

      {/* 3D Canvas takes up the absolute full background */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />

          <Cube />

          <OrbitControls enableDamping />
          <Environment preset="city" />
        </Canvas>
      </div>
    </main>
  );
}
