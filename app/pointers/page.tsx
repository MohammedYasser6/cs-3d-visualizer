"use client";

import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import Link from "next/link";
import PointerVisualizer from "../../components/canvas/PointerVisualizer";

export default function PointersPage() {
  const [isLinked, setIsLinked] = useState(false);

  return (
    <section className="flex h-full w-full overflow-hidden">
      {/* LEFT COLUMN: Educational Theory */}
      <div className="w-1/3 min-w-[350px] max-w-[450px] bg-slate-900 border-r border-slate-800 p-8 overflow-y-auto z-10 shadow-2xl">
        <p className="text-blue-500 font-bold tracking-widest uppercase text-sm mb-1">
          Tier 1 • Module 4
        </p>
        <h2 className="text-3xl font-bold text-white drop-shadow-md mb-6">
          Memory References: Pointers
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-white font-bold mb-2 text-lg">
              The Power & Danger of Pointers:
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              A pointer doesn't store a normal value (like the number 42).
              Instead, it stores the exact memory address of another variable.
              By connecting the pointer, you create a reference to that memory
              block.
            </p>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
            <h4 className="text-purple-400 font-bold mb-2 text-sm">
              Key Concepts:
            </h4>
            <ul className="text-slate-300 text-sm space-y-2 list-disc pl-4">
              <li>
                <strong>Indirection:</strong> The pointer stores{" "}
                <code>0x7FFA</code>, the physical location of where 42 lives in
                RAM, rather than the number itself.
              </li>
              <li>
                <strong>Efficiency:</strong> Instead of copying massive files
                between functions, you just pass a tiny 8-byte pointer to its
                location.
              </li>
              <li>
                <strong className="text-red-400">Segmentation Faults:</strong>{" "}
                If you forget to set the pointer to NULL after the target
                variable is deleted, it points to "garbage data" (a Dangling
                Pointer), which causes program crashes.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: 3D Canvas & Controls */}
      <div className="flex-1 flex flex-col relative bg-slate-950">
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

        <div className="h-24 border-t border-slate-800 bg-slate-900 flex items-center justify-between px-8">
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
            className="px-8 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold transition"
          >
            Take the Exam →
          </Link>
        </div>
      </div>
    </section>
  );
}
