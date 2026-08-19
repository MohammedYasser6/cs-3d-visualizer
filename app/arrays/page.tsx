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
      <div className="absolute top-6 left-8 z-10 pointer-events-none max-w-md">
        <p className="text-blue-500 font-bold tracking-widest uppercase text-sm mb-1">
          Tier 1 • Module 3
        </p>
        <h2 className="text-3xl font-bold text-white drop-shadow-md">
          Contiguous Memory: Arrays
        </h2>

        {/* Expanded Educational Panel */}
        <div className="bg-slate-900/95 border border-slate-700 p-5 rounded-xl shadow-xl mt-4 pointer-events-auto">
          <h3 className="text-white font-bold mb-2">
            How it works under the hood:
          </h3>
          <ul className="text-slate-300 text-sm space-y-2 mb-4 list-disc pl-4">
            <li>
              <strong>Contiguous Allocation:</strong> All blocks are placed
              side-by-side in RAM. Notice the memory addresses below increasing
              by exactly 4 bytes each time.
            </li>
            <li>
              <strong>O(1) Lookup Speed:</strong> The CPU doesn't search for
              Index 2. It calculates it instantly using math:{" "}
              <code>Address = Base + (Index * 4)</code>.
            </li>
            <li>
              <strong>The Downside:</strong> If the array runs out of unbroken
              space in RAM, the entire structure must be copied to a new, larger
              location.
            </li>
          </ul>
        </div>
      </div>

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

      <div className="h-24 border-t border-slate-800 bg-slate-900 flex items-center justify-between px-8 z-10">
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
        <Link
          href="/arrays/quiz"
          className="px-8 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold transition"
        >
          Take the Exam →
        </Link>
      </div>
    </section>
  );
}
