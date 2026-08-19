"use client";

import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import Link from "next/link";
import StackQueueVisualizer from "../../components/canvas/StackQueueVisualizer";

export default function StacksQueuesPage() {
  const [items, setItems] = useState<number[]>([10, 24]);
  const [mode, setMode] = useState<"stack" | "queue">("stack");

  // Logic functions
  const addRandomItem = () =>
    setItems([...items, Math.floor(Math.random() * 100)]);
  const removeStackItem = () => setItems(items.slice(0, -1)); // LIFO: Removes from the end
  const removeQueueItem = () => setItems(items.slice(1)); // FIFO: Removes from the front

  const toggleMode = (newMode: "stack" | "queue") => {
    setMode(newMode);
    setItems([]); // Clear items when switching modes to avoid confusion
  };

  return (
    <section className="flex h-full w-full overflow-hidden">
      {/* LEFT COLUMN: Educational Theory */}
      <div className="w-1/3 min-w-[350px] max-w-[450px] bg-slate-900 border-r border-slate-800 p-8 overflow-y-auto z-10 shadow-2xl">
        <p className="text-amber-500 font-bold tracking-widest uppercase text-sm mb-1">
          Tier 1 • Module 6
        </p>
        <h2 className="text-3xl font-bold text-white drop-shadow-md mb-6">
          Stacks & Queues
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-white font-bold mb-2 text-lg">
              Constrained Data Structures:
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              Under the hood, these can be built using Arrays or Linked Lists.
              The difference is the <strong>rules</strong> of how data gets
              added and removed. We restrict random access to maintain strict
              order.
            </p>
          </div>

          {/* Mode Toggles */}
          <div className="flex bg-slate-950 p-1 rounded-lg mb-6 border border-slate-800">
            <button
              onClick={() => toggleMode("stack")}
              className={`flex-1 py-2 text-sm font-bold rounded ${mode === "stack" ? "bg-amber-600 text-white" : "text-slate-400 hover:text-white"}`}
            >
              Stack (LIFO)
            </button>
            <button
              onClick={() => toggleMode("queue")}
              className={`flex-1 py-2 text-sm font-bold rounded ${mode === "queue" ? "bg-teal-600 text-white" : "text-slate-400 hover:text-white"}`}
            >
              Queue (FIFO)
            </button>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
            {mode === "stack" ? (
              <>
                <h4 className="text-amber-400 font-bold mb-2 text-sm">
                  Stack Theory (LIFO):
                </h4>
                <ul className="text-slate-300 text-sm space-y-2 list-disc pl-4">
                  <li>
                    <strong>Last In, First Out:</strong> Like a stack of plates,
                    you can only add (Push) to the top, and remove (Pop) from
                    the top.
                  </li>
                  <li>
                    <strong>Real World Use:</strong> Your browser's "Back"
                    button, or the "Undo" feature in text editors.
                  </li>
                </ul>
              </>
            ) : (
              <>
                <h4 className="text-teal-400 font-bold mb-2 text-sm">
                  Queue Theory (FIFO):
                </h4>
                <ul className="text-slate-300 text-sm space-y-2 list-disc pl-4">
                  <li>
                    <strong>First In, First Out:</strong> Like a line at a
                    store, you join (Enqueue) at the back, and get served
                    (Dequeue) from the front.
                  </li>
                  <li>
                    <strong>Real World Use:</strong> Printer jobs waiting in
                    line, or handling website traffic requests.
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: 3D Canvas & Controls */}
      <div className="flex-1 flex flex-col relative bg-slate-950">
        <div className="flex-1 w-full h-full cursor-grab active:cursor-grabbing">
          <Canvas camera={{ position: [0, 2, 10], fov: 45 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[5, 10, 5]} intensity={1.2} />
              <StackQueueVisualizer data={items} mode={mode} />
              <OrbitControls enableDamping minDistance={3} maxDistance={20} />
              <Environment preset="city" />
            </Suspense>
          </Canvas>
        </div>

        <div className="h-24 border-t border-slate-800 bg-slate-900 flex items-center justify-between px-8">
          <div className="flex gap-4">
            {mode === "stack" ? (
              <>
                <button
                  onClick={addRandomItem}
                  className="px-6 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded font-medium transition active:scale-95"
                >
                  Push
                </button>
                <button
                  onClick={removeStackItem}
                  disabled={items.length === 0}
                  className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded font-medium transition disabled:opacity-50 active:scale-95"
                >
                  Pop
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={addRandomItem}
                  className="px-6 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded font-medium transition active:scale-95"
                >
                  Enqueue
                </button>
                <button
                  onClick={removeQueueItem}
                  disabled={items.length === 0}
                  className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded font-medium transition disabled:opacity-50 active:scale-95"
                >
                  Dequeue
                </button>
              </>
            )}
          </div>
          <Link
            href="/stacks-queues/quiz"
            className="px-8 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold transition"
          >
            Take the Exam →
          </Link>
        </div>
      </div>
    </section>
  );
}
