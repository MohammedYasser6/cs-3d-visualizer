"use client";

import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import Link from "next/link";
import StackQueueVisualizer, {
  StackQueueItem,
} from "../../components/canvas/StackQueueVisualizer";
import CodeViewer from "../../components/ui/CodeViewer";

const SQ_CODE = {
  "C++": `// Stack built using an Array (LIFO)\n#include <vector>\nusing namespace std;\n\nvector<int> stack;\nstack.push_back(10); // Push\nstack.pop_back();    // Pop\n\n// ---------------------------\n// Queue built using Linked Nodes (FIFO)\n#include <queue>\nqueue<int> q;\n\nq.push(10); // Enqueue at Back\nq.pop();    // Dequeue from Front`,
  Java: `// Stack (LIFO)\nStack<Integer> stack = new Stack<>();\nstack.push(10);\nstack.pop();\n\n// Queue (FIFO) - Uses LinkedList under the hood\nQueue<Integer> q = new LinkedList<>();\nq.add(10); // Enqueue\nq.poll();  // Dequeue`,
  Kotlin: `// Stack (LIFO) - usually built on ArrayDeque\nval stack = ArrayDeque<Int>()\nstack.addLast(10) // Push\nstack.removeLast() // Pop\n\n// Queue (FIFO)\nval queue = ArrayDeque<Int>()\nqueue.addLast(10) // Enqueue\nqueue.removeFirst() // Dequeue`,
  Python: `# Stack (LIFO) using standard List\nstack = []\nstack.append(10) # Push\nstack.pop()      # Pop from end\n\n# Queue (FIFO) using optimized deque\nfrom collections import deque\nqueue = deque()\nqueue.append(10) # Enqueue\nqueue.popleft()  # Dequeue from front`,
};

export default function StacksQueuesPage() {
  const [items, setItems] = useState<StackQueueItem[]>([
    { id: 1, value: 10 },
    { id: 2, value: 24 },
  ]);
  const [mode, setMode] = useState<"stack" | "queue">("stack");
  const [activeTab, setActiveTab] = useState<"theory" | "code">("theory");

  const addRandomItem = () =>
    setItems([
      ...items,
      {
        id: Date.now() + Math.random(),
        value: Math.floor(Math.random() * 100),
      },
    ]);
  const removeStackItem = () => setItems(items.slice(0, -1));
  const removeQueueItem = () => setItems(items.slice(1));

  const toggleMode = (newMode: "stack" | "queue") => {
    setMode(newMode);
    setItems([]);
  };

  return (
    <section className="flex h-full w-full overflow-hidden">
      {/* LEFT COLUMN: Educational Theory & Code */}
      <div className="w-1/3 min-w-[350px] max-w-[500px] bg-slate-900 border-r border-slate-800 flex flex-col z-10 shadow-2xl animate-slide-up">
        <div className="p-8 pb-0">
          <p className="text-amber-500 font-bold tracking-widest uppercase text-sm mb-1">
            Tier 1 • Module 6
          </p>
          <h2 className="text-3xl font-bold text-white drop-shadow-md mb-6">
            Stacks & Queues
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
              className={`flex-1 py-2 text-sm font-bold rounded transition-colors ${activeTab === "code" ? "bg-amber-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-300"}`}
            >
              Implementation
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 pt-0 flex flex-col">
          {activeTab === "theory" ? (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="text-white font-bold mb-2 text-lg">
                  Constrained Data Structures:
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  Under the hood, these can be built using Arrays or Linked
                  Lists. The difference is the <strong>rules</strong> of how
                  data gets added and removed.
                </p>
              </div>

              <div className="flex bg-slate-950 p-1 rounded-lg mb-6 border border-slate-800">
                <button
                  onClick={() => toggleMode("stack")}
                  className={`flex-1 py-2 text-sm font-bold rounded transition-colors ${mode === "stack" ? "bg-amber-600 text-white" : "text-slate-400 hover:text-white"}`}
                >
                  Stack (LIFO)
                </button>
                <button
                  onClick={() => toggleMode("queue")}
                  className={`flex-1 py-2 text-sm font-bold rounded transition-colors ${mode === "queue" ? "bg-teal-600 text-white" : "text-slate-400 hover:text-white"}`}
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
                        <strong>Last In, First Out:</strong> Add (Push) to the
                        top, remove (Pop) from the top.
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
                        <strong>First In, First Out:</strong> Join (Enqueue) at
                        the back, get served (Dequeue) from the front.
                      </li>
                    </ul>
                  </>
                )}
              </div>
            </div>
          ) : (
            <CodeViewer
              snippets={SQ_CODE}
              explanation="Notice how Stacks typically use Arrays under the hood (pushing/popping from the end is O(1)), while Queues usually use Linked Lists to allow O(1) removal from the front."
            />
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: 3D Canvas */}
      <div className="flex-1 flex flex-col relative bg-slate-950 animate-fade-in">
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
                  className="px-6 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded font-medium transition active:scale-95 shadow-md"
                >
                  Push
                </button>
                <button
                  onClick={removeStackItem}
                  disabled={items.length === 0}
                  className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded font-medium transition disabled:opacity-40 disabled:pointer-events-none active:scale-95"
                >
                  Pop
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={addRandomItem}
                  className="px-6 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded font-medium transition active:scale-95 shadow-md"
                >
                  Enqueue
                </button>
                <button
                  onClick={removeQueueItem}
                  disabled={items.length === 0}
                  className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded font-medium transition disabled:opacity-40 disabled:pointer-events-none active:scale-95"
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
