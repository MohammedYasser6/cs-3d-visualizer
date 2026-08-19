"use client";

import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import PointerVisualizer from "../../components/canvas/PointerVisualizer";

export default function PointersPage() {
  const [isLinked, setIsLinked] = useState(false);

  return (
    <section className="relative flex flex-col h-full w-full">
      {/* Header Info */}
      <div className="absolute top-6 left-8 z-10 pointer-events-none">
        <h2 className="text-3xl font-bold text-white drop-shadow-md">
          Memory References: Pointers
        </h2>
        <p className="text-slate-300 mt-2 max-w-lg drop-shadow">
          A pointer is a variable whose value is the exact memory address of
          another variable.
        </p>
      </div>

      {/* 3D Canvas */}
      <div className="flex-1 w-full h-full cursor-grab active:cursor-grabbing">
        <Canvas camera={{ position: [0, 2, 8], fov: 45 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 10, 5]} intensity={1.2} />

            <PointerVisualizer isLinked={isLinked} />

            <OrbitControls enableDamping minDistance={3} maxDistance={20} />
            <Environment preset="city" />
          </Suspense>
        </Canvas>
      </div>

      {/* Bottom Controls */}
      <div className="h-24 border-t border-slate-800 bg-slate-900 flex items-center justify-center gap-4 z-10">
        <button
          onClick={() => setIsLinked(true)}
          className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded font-medium transition"
        >
          ptr = &variable; (Assign Address)
        </button>
        <button
          onClick={() => setIsLinked(false)}
          className="px-6 py-2 border border-slate-600 text-slate-400 hover:bg-slate-800 rounded font-medium transition"
        >
          ptr = NULL;
        </button>
      </div>
    </section>
  );
}
