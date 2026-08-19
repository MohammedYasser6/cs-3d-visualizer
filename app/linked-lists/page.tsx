"use client";

import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing"; // IMPORTED
import Link from "next/link";
import LinkedListVisualizer from "../../components/canvas/LinkedListVisualizer";

export default function LinkedListsPage() {
  const [list, setList] = useState<number[]>([10]);

  const addNode = () => setList([...list, Math.floor(Math.random() * 100)]);
  const removeNode = () => setList(list.slice(0, -1));

  return (
    <section className="relative flex flex-col h-full w-full">
      <div className="absolute top-6 left-8 z-10 pointer-events-none">
        <p className="text-blue-500 font-bold tracking-widest uppercase text-sm mb-1">
          Tier 1 • Module 5
        </p>
        <h2 className="text-3xl font-bold text-white drop-shadow-md">
          Dynamic Memory: Linked Lists
        </h2>
        <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700 p-4 rounded-xl shadow-xl mt-4 max-w-lg pointer-events-auto">
          <p className="text-slate-300 text-sm leading-relaxed">
            Unlike arrays, linked lists can be scattered anywhere in RAM. They
            stay connected because each node contains a pointer that holds the
            exact memory address of the next node. The last node always points
            to NULL.
          </p>
        </div>
      </div>

      <div className="flex-1 w-full h-full cursor-grab active:cursor-grabbing">
        <Canvas camera={{ position: [0, 2, 10], fov: 45 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 10, 5]} intensity={1.2} />

            <LinkedListVisualizer listData={list} />

            <OrbitControls enableDamping minDistance={3} maxDistance={20} />
            <Environment preset="city" />

            {/* ADDED CINEMATIC BLOOM */}
            <EffectComposer>
              <Bloom
                luminanceThreshold={0.2}
                luminanceSmoothing={0.9}
                intensity={1.5}
                mipmapBlur
              />
            </EffectComposer>
          </Suspense>
        </Canvas>
      </div>

      <div className="h-24 border-t border-slate-800 bg-slate-900 flex items-center justify-between px-8 z-10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <div className="flex gap-4">
          <button
            onClick={addNode}
            className="px-6 py-2 bg-pink-600 hover:bg-pink-500 text-white rounded font-medium transition active:scale-95"
          >
            Append Node
          </button>
          <button
            onClick={removeNode}
            disabled={list.length === 1}
            className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded font-medium transition disabled:opacity-50 active:scale-95"
          >
            Remove Node
          </button>
        </div>
        <Link
          href="/linked-lists/quiz"
          className="px-8 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold transition shadow-lg shadow-green-900/50"
        >
          Take the Exam →
        </Link>
      </div>
    </section>
  );
}
