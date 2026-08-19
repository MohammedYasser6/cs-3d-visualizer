"use client";

import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import PointerVisualizer from "../../components/canvas/PointerVisualizer";

export default function PointersPage() {
  const [isLinked, setIsLinked] = useState(false);

  return (
    <section className="relative flex flex-col h-full w-full">
      {/* Header Info & Gamification Panel */}
      <div className="absolute top-6 left-8 right-8 z-10 flex justify-between items-start pointer-events-none">
        <div>
          <h2 className="text-3xl font-bold text-white drop-shadow-md">
            Memory References: Pointers
          </h2>
          <p className="text-slate-300 mt-2 max-w-lg drop-shadow">
            A pointer is a variable whose value is the exact memory address of
            another variable.
          </p>
        </div>

        {/* Challenge UI */}
        <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700 p-5 rounded-xl shadow-2xl pointer-events-auto text-right min-w-[250px]">
          <p className="text-xs text-purple-400 font-bold uppercase tracking-widest mb-1">
            Current Challenge
          </p>
          <p className="text-lg text-white font-medium">
            Link <span className="text-purple-400">ptr</span> to the variable.
          </p>

          <div className="mt-3 h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ease-out ${isLinked ? "bg-green-400 w-full" : "bg-purple-500 w-0"}`}
            />
          </div>

          {isLinked && (
            <p className="mt-3 text-green-400 font-bold animate-pulse text-sm">
              ✓ Challenge Complete!
            </p>
          )}
        </div>
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

      {/* Interactive Controls */}
      <div className="h-24 border-t border-slate-800 bg-slate-900 flex items-center justify-center gap-4 z-10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <button
          onClick={() => setIsLinked(true)}
          className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded font-medium transition active:scale-95"
        >
          ptr = &variable;
        </button>
        <button
          onClick={() => setIsLinked(false)}
          className="px-6 py-2 border border-slate-600 text-slate-400 hover:bg-slate-800 rounded font-medium transition active:scale-95"
        >
          ptr = NULL;
        </button>
      </div>
    </section>
  );
}
