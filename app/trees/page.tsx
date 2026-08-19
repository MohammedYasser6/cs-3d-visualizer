"use client";

import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import Link from "next/link";
import TreeVisualizer from "../../components/canvas/TreeVisualizer";

export default function TreesPage() {
  const [nodes, setNodes] = useState<(number | null)[]>([50]);

  // New state to track what the algorithm is thinking
  const [actionLog, setActionLog] = useState<string>(
    "Tree initialized. Click 'Insert' to start the algorithm.",
  );

  const insertBSTNode = () => {
    const val = Math.floor(Math.random() * 100);
    let newNodes = [...nodes];
    let currentIndex = 0;

    // Start building our explanation string
    let log = `Inserting ${val}: `;

    while (currentIndex <= 14) {
      if (
        newNodes[currentIndex] === null ||
        newNodes[currentIndex] === undefined
      ) {
        newNodes[currentIndex] = val;
        log += `Found empty space. Placed.`;
        break;
      }

      if (val === newNodes[currentIndex]) {
        log += `Duplicate found. Discarding.`;
        break;
      }

      // Explain the traversal logic dynamically
      if (val < newNodes[currentIndex]!) {
        log += `${val} < ${newNodes[currentIndex]} (Go Left) → `;
        currentIndex = 2 * currentIndex + 1;
      } else {
        log += `${val} > ${newNodes[currentIndex]} (Go Right) → `;
        currentIndex = 2 * currentIndex + 2;
      }
    }

    if (currentIndex > 14) {
      log += `Max depth reached for this visualizer.`;
    }

    for (let i = 0; i < newNodes.length; i++) {
      if (newNodes[i] === undefined) newNodes[i] = null;
    }

    setNodes(newNodes);
    setActionLog(log); // Update the UI with the explanation
  };

  const clearTree = () => {
    setNodes([50]);
    setActionLog("Tree reset. Click 'Insert' to start.");
  };

  return (
    <section className="flex h-full w-full overflow-hidden">
      <div className="w-1/3 min-w-[350px] max-w-[450px] bg-slate-900 border-r border-slate-800 p-8 overflow-y-auto z-10 shadow-2xl flex flex-col">
        <p className="text-emerald-500 font-bold tracking-widest uppercase text-sm mb-1">
          Tier 2 • Module 7
        </p>
        <h2 className="text-3xl font-bold text-white drop-shadow-md mb-6">
          Binary Search Trees (BST)
        </h2>

        <div className="space-y-6 flex-1">
          <div>
            <h3 className="text-white font-bold mb-2 text-lg">
              The BST Algorithm:
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              A Binary Search Tree organizes data as it gets inserted to make
              searching incredibly fast.
            </p>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
            <h4 className="text-emerald-400 font-bold mb-2 text-sm">
              The Golden Rules:
            </h4>
            <ul className="text-slate-300 text-sm space-y-2 list-disc pl-4">
              <li>
                <strong>Left Child:</strong> Must be strictly <em>less</em> than
                its parent.
              </li>
              <li>
                <strong>Right Child:</strong> Must be strictly <em>greater</em>{" "}
                than its parent.
              </li>
            </ul>
          </div>
        </div>

        {/* ALGORITHM ACTION LOG UI */}
        <div className="mt-8 bg-slate-950 border border-emerald-500/30 p-4 rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.1)]">
          <p className="text-xs text-emerald-500 font-bold uppercase tracking-widest mb-2">
            Algorithm Execution Log
          </p>
          <p className="text-sm text-white font-mono leading-relaxed">
            {actionLog}
          </p>
        </div>
      </div>

      <div className="flex-1 flex flex-col relative bg-slate-950">
        <div className="flex-1 w-full h-full cursor-grab active:cursor-grabbing">
          <Canvas camera={{ position: [0, 1, 9], fov: 45 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[5, 10, 5]} intensity={1.2} />
              <TreeVisualizer data={nodes} />
              <OrbitControls enableDamping minDistance={3} maxDistance={20} />
              <Environment preset="city" />
            </Suspense>
          </Canvas>
        </div>

        <div className="h-24 border-t border-slate-800 bg-slate-900 flex items-center justify-between px-8">
          <div className="flex gap-4">
            <button
              onClick={insertBSTNode}
              className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-medium transition active:scale-95 shadow-md"
            >
              Insert (BST Rules)
            </button>
            <button
              onClick={clearTree}
              className="px-6 py-2 border border-red-500/30 text-red-400 hover:bg-red-500/10 rounded font-medium transition active:scale-95"
            >
              Reset Tree
            </button>
          </div>
          <Link
            href="/trees/quiz"
            className="px-8 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold transition"
          >
            Take the Exam →
          </Link>
        </div>
      </div>
    </section>
  );
}
