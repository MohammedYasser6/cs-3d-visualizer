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
    // We changed this to a flex row layout
    <section className="flex h-full w-full overflow-hidden">
      {/* LEFT COLUMN: Educational Theory */}
      <div className="w-1/3 min-w-[350px] max-w-[450px] bg-slate-900 border-r border-slate-800 p-8 overflow-y-auto z-10 shadow-2xl">
        <p className="text-blue-500 font-bold tracking-widest uppercase text-sm mb-1">
          Tier 1 • Module 3
        </p>
        <h2 className="text-3xl font-bold text-white drop-shadow-md mb-6">
          Contiguous Memory: Arrays
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-white font-bold mb-2 text-lg">
              How it works under the hood:
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              An array stores data sequentially in memory. Because the blocks
              are right next to each other (contiguous), the computer can find
              any item instantly using its index.
            </p>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
            <h4 className="text-blue-400 font-bold mb-2 text-sm">
              Key Concepts:
            </h4>
            <ul className="text-slate-300 text-sm space-y-2 list-disc pl-4">
              <li>
                <strong>Contiguous Allocation:</strong> All blocks are placed
                side-by-side in RAM. Notice the memory addresses increasing by
                exactly 4 bytes each time.
              </li>
              <li>
                <strong>O(1) Lookup Speed:</strong> The CPU calculates the
                physical location instantly using math:{" "}
                <code>Base + (Index * 4)</code>.
              </li>
              <li>
                <strong className="text-red-400">The Downside:</strong> If the
                array runs out of unbroken space in RAM, the entire structure
                must be copied to a new, larger location.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: 3D Canvas & Controls */}
      <div className="flex-1 flex flex-col relative bg-slate-950">
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

        {/* Interactive Controls */}
        <div className="h-24 border-t border-slate-800 bg-slate-900 flex items-center justify-between px-8">
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
      </div>
    </section>
  );
}
