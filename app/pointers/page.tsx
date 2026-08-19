"use client";

import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import Link from "next/link";
import PointerVisualizer from "../../components/canvas/PointerVisualizer";

export default function PointersPage() {
  const [isLinked, setIsLinked] = useState(false);

  return (
    <section className="relative flex flex-col h-full w-full">
      {/* Header Info (Sandbox Mode) */}
      <div className="absolute top-6 left-8 z-10 pointer-events-none">
        <p className="text-blue-500 font-bold tracking-widest uppercase text-sm mb-1">
          Tier 1 • Module 4
        </p>
        <h2 className="text-3xl font-bold text-white drop-shadow-md">
          Memory References: Pointers
        </h2>
        <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700 p-4 rounded-xl shadow-xl mt-4 max-w-lg pointer-events-auto">
          <p className="text-slate-300 text-sm leading-relaxed">
            A pointer doesn't store a normal value (like the number 42).
            Instead, it stores the exact memory address of another variable. By
            connecting the pointer, you create a reference to that memory block.
          </p>
        </div>
      </div>

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

      <div className="h-24 border-t border-slate-800 bg-slate-900 flex items-center justify-between px-8 z-10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <div className="flex gap-4">
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
        <Link
          href="/pointers/quiz"
          className="px-8 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold transition shadow-lg shadow-green-900/50"
        >
          Take the Exam →
        </Link>
      </div>
    </section>
  );
}
