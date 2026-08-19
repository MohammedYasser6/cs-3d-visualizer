"use client";

import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import ArrayVisualizer from "../components/canvas/ArrayVisualizer";

export default function ArraysPage() {
  const [array, setArray] = useState<number[]>([10, 24, 42]);

  // Phase 2: Gamification State (Target array length to win the level)
  const [targetLength, setTargetLength] = useState(5);

  const addElement = () =>
    setArray([...array, Math.floor(Math.random() * 100)]);
  const removeElement = () => setArray(array.slice(0, -1));
  const clearArray = () => setArray([]);

  // Check if the user successfully completed the challenge
  const isLevelComplete = array.length === targetLength;

  return (
    <section className="relative flex flex-col h-full w-full">
      {/* Top Header & Gamification Panel */}
      <div className="absolute top-6 left-8 right-8 z-10 flex justify-between items-start pointer-events-none">
        {/* Module Info */}
        <div>
          <h2 className="text-3xl font-bold text-white drop-shadow-md">
            Contiguous Memory: Arrays
          </h2>
          <p className="text-slate-300 mt-2 max-w-lg drop-shadow">
            An array stores data sequentially in memory. Push or pop elements to
            see how memory is allocated and freed.
          </p>
        </div>

        {/* The Challenge UI (pointer-events-auto lets the user click it if we add buttons later) */}
        <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700 p-5 rounded-xl shadow-2xl pointer-events-auto text-right min-w-[250px]">
          <p className="text-xs text-blue-400 font-bold uppercase tracking-widest mb-1">
            Current Challenge
          </p>
          <p className="text-lg text-white font-medium">
            Make the array exactly{" "}
            <span className="text-blue-400 font-bold">{targetLength}</span>{" "}
            elements long
          </p>

          <div className="mt-3 h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ease-out ${isLevelComplete ? "bg-green-400" : "bg-blue-500"}`}
              style={{
                width: `${Math.min((array.length / targetLength) * 100, 100)}%`,
              }}
            />
          </div>

          {isLevelComplete && (
            <p className="mt-3 text-green-400 font-bold animate-pulse text-sm">
              ✓ Challenge Complete!
            </p>
          )}
        </div>
      </div>

      {/* 3D Canvas (Cleaned up) */}
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
      <div className="h-24 border-t border-slate-800 bg-slate-900 flex items-center justify-center gap-4 z-10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <button
          onClick={addElement}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded shadow-lg shadow-blue-900/50 font-medium transition active:scale-95"
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
    </section>
  );
}
