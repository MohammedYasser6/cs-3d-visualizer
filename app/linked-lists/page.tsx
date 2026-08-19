"use client";

import { useState, Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import LinkedListVisualizer from "../../components/canvas/LinkedListVisualizer";
import { useStore } from "../../store/useStore";

export default function LinkedListsPage() {
  const [list, setList] = useState<number[]>([10]);
  const [targetLength] = useState(4);
  const completeModule = useStore((state) => state.completeModule);

  const addNode = () => setList([...list, Math.floor(Math.random() * 100)]);
  const removeNode = () => setList(list.slice(0, -1));

  const isLevelComplete = list.length === targetLength;

  useEffect(() => {
    if (isLevelComplete) {
      completeModule("linked-lists", 50);
    }
  }, [isLevelComplete, completeModule]);

  return (
    <section className="relative flex flex-col h-full w-full">
      {/* Header Info & Gamification Panel */}
      <div className="absolute top-6 left-8 right-8 z-10 flex justify-between items-start pointer-events-none">
        <div>
          <h2 className="text-3xl font-bold text-white drop-shadow-md">
            Dynamic Memory: Linked Lists
          </h2>
          <p className="text-slate-300 mt-2 max-w-xl drop-shadow">
            Unlike arrays, linked lists are not stored contiguously in memory.
            Each node contains its data AND a pointer (memory address) to the
            next node in the chain.
          </p>
        </div>

        {/* Challenge UI */}
        <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700 p-5 rounded-xl shadow-2xl pointer-events-auto text-right min-w-[250px]">
          <p className="text-xs text-pink-400 font-bold uppercase tracking-widest mb-1">
            Current Challenge
          </p>
          <p className="text-lg text-white font-medium">
            Link <span className="text-pink-400 font-bold">{targetLength}</span>{" "}
            nodes together
          </p>

          <div className="mt-3 h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ease-out ${isLevelComplete ? "bg-green-400" : "bg-pink-500"}`}
              style={{
                width: `${Math.min((list.length / targetLength) * 100, 100)}%`,
              }}
            />
          </div>

          {isLevelComplete && (
            <p className="mt-3 text-green-400 font-bold animate-pulse text-sm">
              +50 XP Awarded!
            </p>
          )}
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="flex-1 w-full h-full cursor-grab active:cursor-grabbing">
        <Canvas camera={{ position: [0, 2, 10], fov: 45 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 10, 5]} intensity={1.2} />

            <LinkedListVisualizer listData={list} />

            <OrbitControls enableDamping minDistance={3} maxDistance={20} />
            <Environment preset="city" />
          </Suspense>
        </Canvas>
      </div>

      {/* Interactive Controls */}
      <div className="h-24 border-t border-slate-800 bg-slate-900 flex items-center justify-center gap-4 z-10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <button
          onClick={addNode}
          className="px-6 py-2 bg-pink-600 hover:bg-pink-500 text-white rounded font-medium transition active:scale-95"
        >
          Append Node (Tail)
        </button>
        <button
          onClick={removeNode}
          disabled={list.length === 1}
          className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded font-medium transition disabled:opacity-50 active:scale-95"
        >
          Remove Node (Tail)
        </button>
      </div>
    </section>
  );
}
