"use client";

import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import Link from "next/link";
import SearchVisualizer from "../../components/canvas/SearchVisualizer";
import CodeViewer from "../../components/ui/CodeViewer";

const SEARCH_CODE = {
  "C++": `int binarySearch(vector<int>& arr, int target) {\n    int left = 0;\n    int right = arr.size() - 1;\n    \n    while (left <= right) {\n        // Prevents integer overflow in massive arrays\n        int mid = left + (right - left) / 2;\n        \n        if (arr[mid] == target) return mid;\n        if (arr[mid] < target) left = mid + 1;\n        else right = mid - 1;\n    }\n    return -1; // Not found\n}`,
  Java: `int binarySearch(int[] arr, int target) {\n    int left = 0;\n    int right = arr.length - 1;\n    \n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        \n        if (arr[mid] == target) return mid;\n        if (arr[mid] < target) left = mid + 1;\n        else right = mid - 1;\n    }\n    return -1; // Not found\n}`,
  Kotlin: `fun binarySearch(arr: IntArray, target: Int): Int {\n    var left = 0\n    var right = arr.lastIndex\n    \n    while (left <= right) {\n        val mid = left + (right - left) / 2\n        \n        if (arr[mid] == target) return mid\n        if (arr[mid] < target) left = mid + 1\n        else right = mid - 1\n    }\n    return -1 // Not found\n}`,
  Python: `def binary_search(arr, target):\n    left, right = 0, len(arr) - 1\n    \n    while left <= right:\n        mid = left + (right - left) // 2\n        \n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n            \n    return -1 # Not found`,
};

const SORTED_ARRAY = [12, 24, 31, 45, 52, 68, 71, 84, 90, 99];

export default function SearchPage() {
  const [target, setTarget] = useState<number>(71);
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(SORTED_ARRAY.length - 1);
  const [mid, setMid] = useState(-1);
  const [foundAt, setFoundAt] = useState<number | null>(null);

  const [isActive, setIsActive] = useState(false);
  const [actionLog, setActionLog] = useState<string>(
    "Array loaded. Enter a target and click 'Start Search'.",
  );
  const [activeTab, setActiveTab] = useState<"theory" | "code">("theory");

  const startSearch = () => {
    setIsActive(true);
    setLeft(0);
    setRight(SORTED_ARRAY.length - 1);
    setFoundAt(null);
    const initialMid = Math.floor((0 + SORTED_ARRAY.length - 1) / 2);
    setMid(initialMid);
    setActionLog(
      `Searching for ${target}.\nStep 1: Checking Midpoint [${initialMid}] (${SORTED_ARRAY[initialMid]}).`,
    );
  };

  const nextStep = () => {
    if (foundAt !== null || left > right) return;
    let log = "";
    const currentValue = SORTED_ARRAY[mid];

    if (currentValue === target) {
      setFoundAt(mid);
      setIsActive(false);
      log = `🎉 Target ${target} found at Index [${mid}]!`;
    } else if (currentValue < target) {
      const newLeft = mid + 1;
      setLeft(newLeft);
      if (newLeft > right) {
        log = `${currentValue} < ${target}. Left shifted to ${newLeft}.\n❌ Target not in array.`;
        setIsActive(false);
      } else {
        const newMid = Math.floor((newLeft + right) / 2);
        setMid(newMid);
        log = `${currentValue} < ${target}. Discarding left half.\nNext: Checking Midpoint [${newMid}] (${SORTED_ARRAY[newMid]}).`;
      }
    } else {
      const newRight = mid - 1;
      setRight(newRight);
      if (left > newRight) {
        log = `${currentValue} > ${target}. Right shifted to ${newRight}.\n❌ Target not in array.`;
        setIsActive(false);
      } else {
        const newMid = Math.floor((left + newRight) / 2);
        setMid(newMid);
        log = `${currentValue} > ${target}. Discarding right half.\nNext: Checking Midpoint [${newMid}] (${SORTED_ARRAY[newMid]}).`;
      }
    }
    setActionLog(log);
  };

  const resetSearch = () => {
    setIsActive(false);
    setLeft(0);
    setRight(SORTED_ARRAY.length - 1);
    setMid(-1);
    setFoundAt(null);
    setActionLog("Ready for a new search.");
  };

  return (
    <section className="flex h-full w-full overflow-hidden">
      <div className="w-1/3 min-w-[350px] max-w-[500px] bg-slate-900 border-r border-slate-800 flex flex-col z-10 shadow-2xl animate-slide-up">
        <div className="p-8 pb-0">
          <p className="text-cyan-500 font-bold tracking-widest uppercase text-sm mb-1">
            Tier 3 • Module 11
          </p>
          <h2 className="text-3xl font-bold text-white drop-shadow-md mb-6">
            Binary Search
          </h2>

          <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 mb-4">
            <button
              onClick={() => setActiveTab("theory")}
              className={`flex-1 py-2 text-sm font-bold rounded transition-colors ${activeTab === "theory" ? "bg-slate-800 text-white shadow-sm" : "text-slate-500 hover:text-slate-300"}`}
            >
              Theory
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={`flex-1 py-2 text-sm font-bold rounded transition-colors ${activeTab === "code" ? "bg-cyan-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-300"}`}
            >
              Implementation
            </button>
          </div>

          {/* Persist the target input so it's usable on the Code tab too */}
          <div className="flex flex-col gap-2 bg-slate-950 p-4 rounded-lg border border-slate-800 mb-6">
            <label className="text-sm font-bold text-slate-400">
              Target Number to Find:
            </label>
            <input
              type="number"
              value={target}
              onChange={(e) => setTarget(Number(e.target.value))}
              disabled={isActive}
              className="bg-slate-900 border border-slate-700 rounded p-2 text-white font-mono focus:border-cyan-500 outline-none transition-colors"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 pt-0 flex flex-col">
          {activeTab === "theory" ? (
            <>
              <div className="space-y-6 flex-1 animate-fade-in">
                <div>
                  <h3 className="text-white font-bold mb-2 text-lg">
                    The Power of Sorting:
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    If data is sorted, you can use Binary Search to find items
                    exponentially faster than checking one by one.
                  </p>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
                  <h4 className="text-cyan-400 font-bold mb-2 text-sm">
                    How it works:
                  </h4>
                  <ul className="text-slate-300 text-sm space-y-2 list-disc pl-4">
                    <li>
                      Check the <strong>middle</strong> of the array.
                    </li>
                    <li>If target is smaller, discard the right half.</li>
                    <li>If larger, discard the left half.</li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 bg-slate-950 border border-cyan-500/30 p-4 rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                <p className="text-xs text-cyan-500 font-bold uppercase tracking-widest mb-2">
                  Search Execution Log
                </p>
                <pre className="text-sm text-white font-mono leading-relaxed whitespace-pre-wrap">
                  {actionLog}
                </pre>
              </div>
            </>
          ) : (
            <CodeViewer
              snippets={SEARCH_CODE}
              explanation="Notice how we calculate mid as 'left + (right - left) / 2' instead of '(left + right) / 2'. This prevents integer overflow when dealing with massive arrays!"
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
              <SearchVisualizer
                array={SORTED_ARRAY}
                left={left}
                right={right}
                mid={mid}
                foundAt={foundAt}
              />
              <OrbitControls enableDamping minDistance={3} maxDistance={20} />
              <Environment preset="city" />
            </Suspense>
          </Canvas>
        </div>

        <div className="h-24 border-t border-slate-800 bg-slate-900 flex items-center justify-between px-8">
          <div className="flex gap-4">
            {!isActive && foundAt === null ? (
              <button
                onClick={startSearch}
                className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded font-medium transition active:scale-95 shadow-md"
              >
                Start Search
              </button>
            ) : (
              <button
                onClick={nextStep}
                disabled={foundAt !== null || left > right}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded font-medium transition active:scale-95 shadow-md disabled:opacity-50"
              >
                Next Step →
              </button>
            )}
            <button
              onClick={resetSearch}
              className="px-6 py-2 border border-red-500/30 text-red-400 hover:bg-red-500/10 rounded font-medium transition active:scale-95"
            >
              Reset
            </button>
          </div>
          <Link
            href="/search/quiz"
            className="px-8 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold transition"
          >
            Take the Exam →
          </Link>
        </div>
      </div>
    </section>
  );
}
