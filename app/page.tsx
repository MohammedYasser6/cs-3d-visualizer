"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import ArrayVisualizer from "../components/canvas/ArrayVisualizer";

export default function Home() {
  // State to hold our array data
  const [array, setArray] = useState<number[]>([10, 24, 42]);

  // Functions to interact with the array
  const addElement = () =>
    setArray([...array, Math.floor(Math.random() * 100)]);
  const removeElement = () => setArray(array.slice(0, -1));
  const clearArray = () => setArray([]);

  return (
    <main className="flex h-screen w-full bg-slate-950 text-slate-200">
      {/* LEFT SIDEBAR: Navigation */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900 p-6 flex flex-col z-10">
        <h1 className="text-2xl font-bold text-white mb-8">CS 3D Vis</h1>
        <nav className="flex flex-col gap-2">
          <div className="rounded bg-blue-600/20 text-blue-400 p-3 font-semibold cursor-pointer border border-blue-500/30">
            1. Arrays
          </div>
          <div className="rounded p-3 text-slate-400 hover:bg-slate-800 cursor-pointer transition">
            2. Pointers (Locked)
          </div>
          <div className="rounded p-3 text-slate-400 hover:bg-slate-800 cursor-pointer transition">
            3. Linked Lists (Locked)
          </div>
        </nav>
      </aside>

      {/* CENTER & BOTTOM: 3D Canvas & Controls */}
      <section className="relative flex flex-col flex-1 h-full">
        {/* Title overlay */}
        <div className="absolute top-6 left-8 z-10 pointer-events-none">
          <h2 className="text-3xl font-bold text-white">
            Contiguous Memory: Arrays
          </h2>
          <p className="text-slate-400 mt-2 max-w-lg">
            An array stores data sequentially in memory. Notice how each new
            block is placed right next to the previous one, allowing for
            constant-time index lookups.
          </p>
        </div>

        {/* 3D Canvas */}
        <div className="flex-1 w-full h-full cursor-grab active:cursor-grabbing">
          <Canvas camera={{ position: [0, 2, 8], fov: 45 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 10, 5]} intensity={1.2} />

            {/* Render our interactive array */}
            <ArrayVisualizer arrayData={array} />

            <OrbitControls enableDamping minDistance={3} maxDistance={20} />
            <Environment preset="city" />
          </Canvas>
        </div>

        {/* BOTTOM PANEL: User Controls */}
        <div className="h-24 border-t border-slate-800 bg-slate-900 flex items-center justify-center gap-4 z-10">
          <button
            onClick={addElement}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded font-medium transition"
          >
            Push Element
          </button>
          <button
            onClick={removeElement}
            className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded font-medium transition disabled:opacity-50"
            disabled={array.length === 0}
          >
            Pop Element
          </button>
          <button
            onClick={clearArray}
            className="px-6 py-2 border border-red-500/50 text-red-400 hover:bg-red-500/10 rounded font-medium transition"
          >
            Clear Memory
          </button>
        </div>
      </section>
    </main>
  );
}
