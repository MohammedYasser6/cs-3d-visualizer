"use client";

import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import Link from "next/link";
import PointerVisualizer from "../../components/canvas/PointerVisualizer";
// 1. IMPORT THE CODE VIEWER
import CodeViewer from "../../components/ui/CodeViewer";

// 2. DEFINE THE SNIPPETS
const POINTER_CODE = {
  "C++": `int main() {
    int val = 42;
    // ptr physically holds the memory address of val
    int* ptr = &val; 

    // Dereference (*) to change the original value
    *ptr = 99; 
}`,
  Java: `// Java hides pointers, but uses References for objects
class Node { int val = 42; }

public void demo() {
    Node a = new Node();
    // b points to the EXACT same memory address as a
    Node b = a; 

    // Modifies the original object in RAM
    b.val = 99; 
}`,
  Kotlin: `// Kotlin uses References just like Java
class Node(var val: Int = 42)

fun demo() {
    val a = Node()
    // b references the exact same object in memory
    val b = a 

    // Changes are reflected in 'a'
    b.val = 99 
}`,
  Python: `# Python uses references for mutable objects
val = [42]
# ptr points to the same list in memory
ptr = val 

# Modifies the original list in RAM
ptr[0] = 99`,
};

export default function PointersPage() {
  const [targetValue, setTargetValue] = useState(42);
  const [pointerAddress, setPointerAddress] = useState("0x7FFF");
  const [activeTab, setActiveTab] = useState<"theory" | "code">("theory"); // 3. ADD TAB STATE

  const updateValue = () => setTargetValue(Math.floor(Math.random() * 100));
  const reallocateMemory = () =>
    setPointerAddress(
      `0x${Math.floor(Math.random() * 65535)
        .toString(16)
        .toUpperCase()}`,
    );

  return (
    <section className="flex h-full w-full overflow-hidden">
      {/* 4. UPDATE THE LEFT COLUMN */}
      <div className="w-1/3 min-w-[350px] max-w-[500px] bg-slate-900 border-r border-slate-800 flex flex-col z-10 shadow-2xl animate-slide-up">
        <div className="p-8 pb-0">
          <p className="text-purple-500 font-bold tracking-widest uppercase text-sm mb-1">
            Tier 1 • Module 4
          </p>
          <h2 className="text-3xl font-bold text-white drop-shadow-md mb-6">
            Pointers
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
              className={`flex-1 py-2 text-sm font-bold rounded transition-colors ${activeTab === "code" ? "bg-purple-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-300"}`}
            >
              Implementation
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 pt-0">
          {activeTab === "theory" ? (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="text-white font-bold mb-2 text-lg">
                  Variables that hold Addresses:
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  A pointer doesn't hold data like `42` or `"Hello"`. It holds a
                  physical memory address (like `0x7FFF`). It literally "points"
                  to where the real data lives in your RAM.
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
                <h4 className="text-purple-400 font-bold mb-2 text-sm">
                  Key Concepts:
                </h4>
                <ul className="text-slate-300 text-sm space-y-2 list-disc pl-4">
                  <li>
                    <strong>Reference:</strong> Finding out where a variable
                    lives in memory.
                  </li>
                  <li>
                    <strong>Dereference:</strong> Following the pointer to read
                    or change the actual data.
                  </li>
                  <li>
                    <strong className="text-red-400">Null Pointer:</strong> A
                    pointer that points to nothing, which causes crashes if you
                    try to use it.
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <CodeViewer
              snippets={POINTER_CODE}
              explanation="C++ forces you to manage memory addresses manually using * and &. Modern languages like Java, Kotlin, and Python hide the memory addresses, treating objects as automatic References."
            />
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: 3D Canvas */}
      <div className="flex-1 flex flex-col relative bg-slate-950 animate-fade-in">
        <div className="flex-1 w-full h-full cursor-grab active:cursor-grabbing">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[5, 10, 5]} intensity={1.2} />
              
              {/* FIXED: Explicitly casting properties to bypass unaligned PointerProps declarations */}
              <PointerVisualizer
                {...({
                  targetValue: targetValue,
                  pointerAddress: pointerAddress,
                } as any)}
              />
              
              <OrbitControls enableDamping minDistance={3} maxDistance={20} />
              <Environment preset="city" />
            </Suspense>
          </Canvas>
        </div>

        <div className="h-24 border-t border-slate-800 bg-slate-900 flex items-center justify-between px-8">
          <div className="flex gap-4">
            <button
              onClick={updateValue}
              className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded font-medium transition active:scale-95 shadow-md"
            >
              Dereference & Change Value
            </button>
            <button
              onClick={reallocateMemory}
              className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded font-medium transition active:scale-95 shadow-md"
            >
              Reallocate Memory Block
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
