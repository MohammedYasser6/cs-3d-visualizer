"use client";

import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import Link from "next/link";
import ArrayVisualizer from "../../components/canvas/ArrayVisualizer";
import CodeViewer from "../../components/ui/CodeViewer";

const ARRAY_CODE = {
  "C++": `// 1. Declare a fixed-size array in RAM
int arr[5] = {10, 20, 30, 40, 50};

// 2. O(1) Instant Access using math:
// Address = Base + (Index * SizeOf(int))
int thirdElement = arr[2]; 

// 3. Modifying an element
arr[4] = 99;`,

  Java: `// 1. Declare a fixed-size array in RAM
int[] arr = new int[]{10, 20, 30, 40, 50};

// 2. O(1) Instant Access using math
int thirdElement = arr[2]; 

// 3. Modifying an element
arr[4] = 99;`,

  Kotlin: `// 1. Declare a fixed-size primitive array
val arr = intArrayOf(10, 20, 30, 40, 50)

// 2. O(1) Instant Access
val thirdElement = arr[2] 

// 3. Modifying an element
arr[4] = 99`,

  Python: `# Python uses dynamic Lists instead of strict Arrays,
# but under the hood in CPython, they are implemented as arrays.

# 1. Declare a list
arr = [10, 20, 30, 40, 50]

# 2. O(1) Instant Access
third_element = arr[2]

# 3. Modifying an element
arr[4] = 99`,
};

export default function ArraysPage() {
  const [arrayData, setArrayData] = useState([10, 24, 32, 41]);
  const [activeTab, setActiveTab] = useState<"theory" | "code">("theory");

  const addElement = () => {
    if (arrayData.length < 8)
      setArrayData([...arrayData, Math.floor(Math.random() * 100)]);
  };
  const removeElement = () => {
    if (arrayData.length > 1) setArrayData(arrayData.slice(0, -1));
  };

  return (
    <section className="flex h-full w-full overflow-hidden">
      {/* LEFT COLUMN: Educational Theory & Code */}
      <div className="w-1/3 min-w-[350px] max-w-[500px] bg-slate-900 border-r border-slate-800 flex flex-col z-10 shadow-2xl animate-slide-up">
        {/* Header & Tabs */}
        <div className="p-8 pb-0">
          <p className="text-blue-500 font-bold tracking-widest uppercase text-sm mb-1">
            Tier 1 • Module 3
          </p>
          <h2 className="text-3xl font-bold text-white drop-shadow-md mb-6">
            Arrays
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
              className={`flex-1 py-2 text-sm font-bold rounded transition-colors ${activeTab === "code" ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-300"}`}
            >
              Implementation
            </button>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 pt-0">
          {activeTab === "theory" ? (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="text-white font-bold mb-2 text-lg">
                  Contiguous Memory:
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  An array stores data in a single, unbroken block of RAM.
                  Because everything is perfectly aligned, the computer uses
                  simple math to find any item instantly.
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
                <h4 className="text-blue-400 font-bold mb-2 text-sm">
                  Key Concepts:
                </h4>
                <ul className="text-slate-300 text-sm space-y-2 list-disc pl-4">
                  <li>
                    <strong>Zero-Indexed:</strong> The first element is at Index
                    0.
                  </li>
                  <li>
                    <strong>O(1) Access:</strong> Getting the 100th element
                    takes the exact same time as getting the 1st.
                  </li>
                  <li>
                    <strong className="text-red-400">Fixed Size:</strong> In
                    low-level languages, you cannot change an array's size after
                    creating it.
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <CodeViewer
              snippets={ARRAY_CODE}
              explanation="Notice how strict languages like Java and C++ require you to define the type and size up front, while Python handles the underlying memory allocation for you automatically."
            />
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: 3D Canvas */}
      <div className="flex-1 flex flex-col relative bg-slate-950 animate-fade-in">
        <div className="flex-1 w-full h-full cursor-grab active:cursor-grabbing">
          <Canvas camera={{ position: [0, 2, 8], fov: 45 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[5, 10, 5]} intensity={1.2} />
              <ArrayVisualizer arrayData={arrayData} />
              <OrbitControls enableDamping minDistance={3} maxDistance={20} />
              <Environment preset="city" />
            </Suspense>
          </Canvas>
        </div>

        <div className="h-24 border-t border-slate-800 bg-slate-900 flex items-center justify-between px-8">
          <div className="flex gap-4">
            <button
              onClick={addElement}
              disabled={arrayData.length >= 8}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded font-medium transition active:scale-95 disabled:opacity-50"
            >
              Add Element
            </button>
            <button
              onClick={removeElement}
              disabled={arrayData.length === 1}
              className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded font-medium transition active:scale-95 disabled:opacity-50"
            >
              Remove Element
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
