"use client";

import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import Link from "next/link";
import SortingVisualizer from "../../components/canvas/SortingVisualizer";
import CodeViewer from "../../components/ui/CodeViewer";

const SORT_CODE = {
  "C++": `void bubbleSort(vector<int>& arr) {\n    int n = arr.size();\n    for (int i = 0; i < n - 1; i++) {\n        bool swapped = false;\n        for (int j = 0; j < n - i - 1; j++) {\n            if (arr[j] > arr[j + 1]) {\n                swap(arr[j], arr[j + 1]);\n                swapped = true;\n            }\n        }\n        // If no elements were swapped, array is sorted\n        if (!swapped) break;\n    }\n}`,
  Java: `void bubbleSort(int[] arr) {\n    int n = arr.length;\n    for (int i = 0; i < n - 1; i++) {\n        boolean swapped = false;\n        for (int j = 0; j < n - i - 1; j++) {\n            if (arr[j] > arr[j + 1]) {\n                int temp = arr[j];\n                arr[j] = arr[j + 1];\n                arr[j + 1] = temp;\n                swapped = true;\n            }\n        }\n        if (!swapped) break;\n    }\n}`,
  Kotlin: `fun bubbleSort(arr: IntArray) {\n    val n = arr.size\n    for (i in 0 until n - 1) {\n        var swapped = false\n        for (j in 0 until n - i - 1) {\n            if (arr[j] > arr[j + 1]) {\n                val temp = arr[j]\n                arr[j] = arr[j + 1]\n                arr[j + 1] = temp\n                swapped = true\n            }\n        }\n        if (!swapped) break\n    }\n}`,
  Python: `def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n - 1):\n        swapped = False\n        for j in range(n - i - 1):\n            if arr[j] > arr[j + 1]:\n                arr[j], arr[j + 1] = arr[j + 1], arr[j]\n                swapped = True\n        if not swapped:\n            break`,
};

const INITIAL_ARRAY = [65, 22, 88, 14, 53, 31, 92, 45, 76, 11];

export default function SortingPage() {
  const [array, setArray] = useState<number[]>(INITIAL_ARRAY);
  const [comparing, setComparing] = useState<number[]>([]);
  const [sorted, setSorted] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [actionLog, setActionLog] = useState<string>(
    "Array loaded. Click 'Start Algorithm' to begin.",
  );
  const [activeTab, setActiveTab] = useState<"theory" | "code">("theory");

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
    if (i >= n - 1) return;

    let newArr = [...array];
    let log = `Compared [${j}] (${newArr[j]}) and [${j + 1}] (${newArr[j + 1]}). `;

    if (newArr[j] > newArr[j + 1]) {
      let temp = newArr[j];
      newArr[j] = newArr[j + 1];
      newArr[j + 1] = temp;
      log += `Swapped!`;
    } else {
      log += `In order.`;
    }

    let nextJ = j + 1;
    let nextI = i;

    if (nextJ >= n - i - 1) {
      setSorted((prev) => [...prev, n - i - 1]);
      log += `\n🔒 Element ${newArr[n - i - 1]} is locked into position.`;
      nextI = i + 1;
      nextJ = 0;
    }

    setArray(newArr);

    if (nextI >= n - 1) {
      setSorted((prev) => [...prev, 0]);
      setComparing([]);
      setIsSorting(false);
      setI(n);
      log += `\n🎉 Bubble Sort Complete!`;
    } else {
      setI(nextI);
      setJ(nextJ);
      setComparing([nextJ, nextJ + 1]);
      log += `\nNext: Comparing [${nextJ}] and [${nextJ + 1}]...`;
    }

    setActionLog(log);
  };

  const resetArray = () => {
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
      <div className="w-1/3 min-w-[350px] max-w-[500px] bg-slate-900 border-r border-slate-800 flex flex-col z-10 shadow-2xl animate-slide-up">
        <div className="p-8 pb-0">
          <p className="text-orange-500 font-bold tracking-widest uppercase text-sm mb-1">
            Tier 3 • Module 10
          </p>
          <h2 className="text-3xl font-bold text-white drop-shadow-md mb-6">
            Bubble Sort
          </h2>

          <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 mb-6">
            <button
              onClick={() => setActiveTab("theory")}
              className={`flex-1 py-2 text-sm font-bold rounded transition-colors ${activeTab === "theory" ? "bg-slate-800 text-white shadow-sm" : "text-slate-500 hover:text-slate-300"}`}
            >
              Theory
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={`flex-1 py-2 text-sm font-bold rounded transition-colors ${activeTab === "code" ? "bg-orange-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-300"}`}
            >
              Implementation
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 pt-0 flex flex-col">
          {activeTab === "theory" ? (
            <>
              <div className="space-y-6 flex-1 animate-fade-in">
                <div>
                  <h3 className="text-white font-bold mb-2 text-lg">
                    Algorithms in Motion:
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    Bubble Sort steps through the list, compares adjacent pairs,
                    and swaps them if they are in the wrong order.
                  </p>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
                  <h4 className="text-orange-400 font-bold mb-2 text-sm">
                    Key Concepts:
                  </h4>
                  <ul className="text-slate-300 text-sm space-y-2 list-disc pl-4">
                    <li>
                      <strong>Nested Loops:</strong> It requires a loop inside a
                      loop, making it an $O(N^2)$ algorithm.
                    </li>
                    <li>
                      <strong>Bubbling:</strong> With each pass, the largest
                      unsorted item "bubbles" up to its correct position at the
                      end.
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
            </>
          ) : (
            <CodeViewer
              snippets={SORT_CODE}
              explanation="Notice the nested loops. The outer loop tracks how many elements are sorted, and the inner loop pushes the largest remaining element to the end."
            />
          )}
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
