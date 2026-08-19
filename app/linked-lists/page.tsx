"use client";

import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import Link from "next/link";
import LinkedListVisualizer from "../../components/canvas/LinkedListVisualizer";
import CodeViewer from "../../components/ui/CodeViewer";

const LL_CODE = {
  "C++": `// 1. Define the Node struct
struct Node {
    int data;
    Node* next;
    // Constructor
    Node(int d) : data(d), next(nullptr) {}
};

// 2. Create nodes and link them
Node* head = new Node(10);
head->next = new Node(24);`,

  Java: `// 1. Define the Node class
class Node {
    int data;
    Node next;
    // Constructor
    Node(int d) { 
        data = d; 
        next = null; 
    }
}

// 2. Create nodes and link them
Node head = new Node(10);
head.next = new Node(24);`,

  Kotlin: `// 1. Define a concise Data Class
class Node(var data: Int, var next: Node? = null)

// 2. Create nodes and link them
val head = Node(10)
head.next = Node(24)`,

  Python: `# 1. Define the Node class
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

# 2. Create nodes and link them
head = Node(10)
head.next = Node(24)`,
};

export default function LinkedListsPage() {
  const [list, setList] = useState<number[]>([10]);
  const [activeTab, setActiveTab] = useState<"theory" | "code">("theory");

  const addNode = () => {
    if (list.length < 6) setList([...list, Math.floor(Math.random() * 100)]);
  };
  const removeNode = () => {
    if (list.length > 1) setList(list.slice(0, -1));
  };

  return (
    <section className="flex h-full w-full overflow-hidden">
      {/* LEFT COLUMN: Educational Theory & Code */}
      <div className="w-1/3 min-w-[350px] max-w-[500px] bg-slate-900 border-r border-slate-800 flex flex-col z-10 shadow-2xl animate-slide-up">
        {/* Header & Tabs */}
        <div className="p-8 pb-0">
          <p className="text-blue-500 font-bold tracking-widest uppercase text-sm mb-1">
            Tier 1 • Module 5
          </p>
          <h2 className="text-3xl font-bold text-white drop-shadow-md mb-6">
            Linked Lists
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
              className={`flex-1 py-2 text-sm font-bold rounded transition-colors ${activeTab === "code" ? "bg-pink-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-300"}`}
            >
              Implementation
            </button>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 pt-0 flex flex-col">
          {activeTab === "theory" ? (
            <div className="space-y-6 flex-1 animate-fade-in">
              <div>
                <h3 className="text-white font-bold mb-2 text-lg">
                  Overcoming Array Limitations:
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  Unlike arrays, linked lists can be scattered anywhere in RAM.
                  They stay connected because each node contains a pointer that
                  holds the exact memory address of the next node. The last node
                  always points to NULL.
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
                <h4 className="text-pink-400 font-bold mb-2 text-sm">
                  Key Concepts:
                </h4>
                <ul className="text-slate-300 text-sm space-y-2 list-disc pl-4">
                  <li>
                    <strong>Dynamic Sizing:</strong> Nodes do not need a
                    contiguous block. They can be allocated anywhere there is
                    free space in memory.
                  </li>
                  <li>
                    <strong>Fast Insertions:</strong> Adding a node to the
                    middle of the list is O(1). You just change two pointers. In
                    an array, you would have to shift every single element down.
                  </li>
                  <li>
                    <strong className="text-red-400">Slow Lookups:</strong>{" "}
                    Because memory isn't math-based anymore, getting the 4th
                    element takes O(N) time. The CPU must follow the pointers
                    from node 0 to 1 to 2 to 3.
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <CodeViewer
              snippets={LL_CODE}
              explanation="A Linked List fundamentally relies on creating a 'Node' object that holds two things: the data itself, and a reference (pointer) to the next Node object."
            />
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: 3D Canvas & Controls */}
      <div className="flex-1 flex flex-col relative bg-slate-950 animate-fade-in">
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

        <div className="h-24 border-t border-slate-800 bg-slate-900 flex items-center justify-between px-8">
          <div className="flex gap-4">
            <button
              onClick={addNode}
              disabled={list.length >= 6}
              className="px-6 py-2 bg-pink-600 hover:bg-pink-500 text-white rounded font-medium transition active:scale-95 disabled:opacity-50"
            >
              Append Node
            </button>
            <button
              onClick={removeNode}
              disabled={list.length === 1}
              className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded font-medium transition disabled:opacity-50 active:scale-95"
            >
              Remove Node
            </button>
          </div>
          <Link
            href="/linked-lists/quiz"
            className="px-8 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold transition"
          >
            Take the Exam →
          </Link>
        </div>
      </div>
    </section>
  );
}
