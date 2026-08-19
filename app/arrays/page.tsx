"use client";

import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import Link from "next/link";
import ArrayVisualizer from "../../components/canvas/ArrayVisualizer";

export default function ArraysPage() {
  const [array, setArray] = useState<number[]>([10, 24, 42]);

  const addElement = () =>
    setArray([...array, Math.floor(Math.random() * 100)]);
  const removeElement = () => setArray(array.slice(0, -1));
  const clearArray = () => setArray([]);

  return (
    <section className="relative flex flex-col h-full w-full">
      {/* Header Info (No more progress bar here!) */}
      <div className="absolute top-6 left-8 z-10 pointer-events-none">
        <p className="text-blue-500 font-bold tracking-widest uppercase text-sm mb-1">
          Tier 1 • Module 3
        </p>
        <h2 className="text-3xl font-bold text-white drop-shadow-md">
          Contiguous Memory: Arrays
        </h2>
        <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700 p-4 rounded-xl shadow-xl mt-4 max-w-lg pointer-events-auto">
          <p className="text-slate-300 text-sm leading-relaxed">
            An array stores data sequentially in memory. Because the blocks are
            right next to each other (contiguous), the computer can find any
            item instantly using its index (e.g., Index [2]). Play with the
            memory blocks below.
          </p>
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="flex-1 w-full h-full cursor-grab active:cursor-grabbing">
        <Canvas camera={{ position: [0, 2, 8], fov: 45 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 10, 5]} intensity={1.2} />
            <ArrayVisualizer arrayData={array} />
            <OrbitControls enableDamping minDistance={3} maxDistance={20} />
            <Environment preset="city" />
          </Suspense>
        </Canvas>
      </div>

      {/* Interactive Controls & Exam Button */}
      <div className="h-24 border-t border-slate-800 bg-slate-900 flex items-center justify-between px-8 z-10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        {/* Array Controls */}
        <div className="flex gap-4">
          <button
            onClick={addElement}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded font-medium transition active:scale-95"
          >
            Push Element
          </button>
          <button
            onClick={removeElement}
            disabled={array.length === 0}
            className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded font-medium transition disabled:opacity-50 active:scale-95"
          >
            Pop Element
          </button>
          <button
            onClick={clearArray}
            className="px-6 py-2 border border-red-500/30 text-red-400 hover:bg-red-500/10 rounded font-medium transition active:scale-95"
          >
            Clear Memory
          </button>
        </div>

        {/* The New Exam Route */}
        <Link
          href="/arrays/quiz"
          className="px-8 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold transition shadow-lg shadow-green-900/50"
        >
          Take the Exam →
        </Link>
      </div>
    </section>
  );
}
