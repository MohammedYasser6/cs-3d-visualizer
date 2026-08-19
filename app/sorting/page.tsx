"use client";

import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import Link from "next/link";
import SortingVisualizer from "../../components/canvas/SortingVisualizer";

// FIX: A fixed initial array prevents Hydration Mismatch between Server and Client
const INITIAL_ARRAY = [65, 22, 88, 14, 53, 31, 92, 45, 76, 11];

export default function SortingPage() {
  const [array, setArray] = useState<number[]>(INITIAL_ARRAY);
  const [comparing, setComparing] = useState<number[]>([]);
  const [sorted, setSorted] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [actionLog, setActionLog] = useState<string>(
    "Array loaded. Click 'Start Algorithm' to begin.",
  );

  // State Machine variables to track the loop manually
  const [i, setI] = useState(0);
  const [j, setJ] = useState(0);

  const startSort = () => {
    setIsSorting(true);
    setI(0);
    setJ(0);
    setSorted([]);
    setComparing([0, 1]);
    setActionLog(
      `Algorithm started.\nNext: Comparing Index [0] (${array[0]}) and Index [1] (${array[1]}).`,
    );
  };

  const nextStep = () => {
    let n = array.length;
    if (i >= n - 1) return; // Sort is complete

    let newArr = [...array];
    let log = `Compared [${j}] (${newArr[j]}) and [${j + 1}] (${newArr[j + 1]}). `;

    // 1. Evaluate and Swap
    if (newArr[j] > newArr[j + 1]) {
      let temp = newArr[j];
      newArr[j] = newArr[j + 1];
      newArr[j + 1] = temp;
      log += `Swapped!`;
    } else {
      log += `In order.`;
    }

    // 2. Advance the pointers
    let nextJ = j + 1;
    let nextI = i;

    // 3. Check if we reached the end of the current pass
    if (nextJ >= n - i - 1) {
      setSorted((prev) => [...prev, n - i - 1]);
      log += `\n🔒 Element ${newArr[n - i - 1]} is locked into position.`;
      nextI = i + 1;
      nextJ = 0;
    }

    setArray(newArr);

    // 4. Check if the entire sort is complete
    if (nextI >= n - 1) {
      setSorted((prev) => [...prev, 0]); // The very first element is automatically sorted
      setComparing([]);
      setIsSorting(false);
      setI(n); // Lock state
      log += `\n🎉 Bubble Sort Complete!`;
    } else {
      // Setup the next manual step
      setI(nextI);
      setJ(nextJ);
      setComparing([nextJ, nextJ + 1]);
      log += `\nNext: Comparing [${nextJ}] and [${nextJ + 1}]...`;
    }

    setActionLog(log);
  };

  const resetArray = () => {
    // Math.random is safe here because it only fires via user interaction on the client
    const randomArr = Array.from(
      { length: 10 },
      () => Math.floor(Math.random() * 80) + 10,
    );
    setArray(randomArr);
    setSorted([]);
    setComparing([]);
    setIsSorting(false);
    setActionLog("New array generated. Ready to sort.");
  };

  return (
    <section className="flex h-full w-full overflow-hidden">
      <div className="w-1/3 min-w-[350px] max-w-[450px] bg-slate-900 border-r border-slate-800 p-8 overflow-y-auto z-10 shadow-2xl flex flex-col animate-slide-up">
        <p className="text-orange-500 font-bold tracking-widest uppercase text-sm mb-1">
          Tier 3 • Module 10
        </p>
        <h2 className="text-3xl font-bold text-white drop-shadow-md mb-6">
          Sorting: Bubble Sort
        </h2>

        <div className="space-y-6 flex-1">
          <div>
            <h3 className="text-white font-bold mb-2 text-lg">
              Algorithms in Motion:
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              Now that we know how to store data, we need to know how to
              organize it. Bubble Sort is one of the simplest sorting
              algorithms.
            </p>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
            <h4 className="text-orange-400 font-bold mb-2 text-sm">
              How it works:
            </h4>
            <ul className="text-slate-300 text-sm space-y-2 list-disc pl-4">
              <li>It steps through the list and compares adjacent pairs.</li>
              <li>
                If the left item is larger than the right, it{" "}
                <strong>swaps</strong> them.
              </li>
              <li>
                With each pass, the largest unsorted item "bubbles" up to its
                correct position at the end of the array.
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 bg-slate-950 border border-orange-500/30 p-4 rounded-lg shadow-[0_0_15px_rgba(249,115,22,0.1)]">
          <p className="text-xs text-orange-500 font-bold uppercase tracking-widest mb-2">
            Algorithm Execution Log
          </p>
          <pre className="text-sm text-white font-mono leading-relaxed whitespace-pre-wrap">
            {actionLog}
          </pre>
        </div>
      </div>

      <div className="flex-1 flex flex-col relative bg-slate-950 animate-fade-in">
        <div className="flex-1 w-full h-full cursor-grab active:cursor-grabbing">
          <Canvas camera={{ position: [0, 1, 12], fov: 45 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[5, 10, 5]} intensity={1.2} />
              <SortingVisualizer
                array={array}
                comparing={comparing}
                sorted={sorted}
              />
              <OrbitControls enableDamping minDistance={3} maxDistance={20} />
              <Environment preset="city" />
            </Suspense>
          </Canvas>
        </div>

        <div className="h-24 border-t border-slate-800 bg-slate-900 flex items-center justify-between px-8">
          <div className="flex gap-4">
            {!isSorting && sorted.length !== array.length ? (
              <button
                onClick={startSort}
                className="px-6 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded font-medium transition active:scale-95 shadow-md"
              >
                Start Algorithm
              </button>
            ) : (
              <button
                onClick={nextStep}
                disabled={sorted.length === array.length}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded font-medium transition active:scale-95 shadow-md disabled:opacity-50"
              >
                Next Step →
              </button>
            )}
            <button
              onClick={resetArray}
              className="px-6 py-2 border border-red-500/30 text-red-400 hover:bg-red-500/10 rounded font-medium transition active:scale-95 disabled:opacity-50"
            >
              New Array
            </button>
          </div>
          <Link
            href="/sorting/quiz"
            className="px-8 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold transition"
          >
            Take the Exam →
          </Link>
        </div>
      </div>
    </section>
  );
}
