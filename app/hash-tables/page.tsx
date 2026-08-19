"use client";

import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import Link from "next/link";
import HashTableVisualizer, {
  HashEntry,
} from "../../components/canvas/HashTableVisualizer";
import CodeViewer from "../../components/ui/CodeViewer";

const HASH_CODE = {
  "C++": `struct HashNode {\n    string key;\n    HashNode* next; // For collision chaining\n};\n\n// Array of pointers (The 5 Buckets)\nHashNode* buckets[5] = {nullptr};\n\n// The Hashing Math\nint getBucketIndex(string key) {\n    int asciiSum = 0;\n    for(char c : key) {\n        asciiSum += c;\n    }\n    return asciiSum % 5;\n}`,
  Java: `class HashNode {\n    String key;\n    HashNode next; // For collision chaining\n}\n\n// Array of object references (The 5 Buckets)\nHashNode[] buckets = new HashNode[5];\n\n// The Hashing Math\nint getBucketIndex(String key) {\n    int asciiSum = 0;\n    for(char c : key.toCharArray()) {\n        asciiSum += c;\n    }\n    return asciiSum % 5;\n}`,
  Kotlin: `class HashNode(val key: String, var next: HashNode? = null)\n\n// Array of object references (The 5 Buckets)\nval buckets = Array<HashNode?>(5) { null }\n\n// The Hashing Math\nfun getBucketIndex(key: String): Int {\n    return key.sumOf { it.code } % 5\n}`,
  Python: `class HashNode:\n    def __init__(self, key):\n        self.key = key\n        self.next = None # For collision chaining\n\n# Array of references (The 5 Buckets)\nbuckets = [None] * 5\n\n# The Hashing Math\ndef get_bucket_index(key: str) -> int:\n    ascii_sum = sum(ord(c) for c in key)\n    return ascii_sum % 5`,
};

const SAMPLE_KEYS = [
  "Apple",
  "CPU",
  "RAM",
  "Data",
  "Node",
  "React",
  "Java",
  "Bug",
  "Pixel",
  "Web",
];

export default function HashTablesPage() {
  const [buckets, setBuckets] = useState<HashEntry[][]>([[], [], [], [], []]);
  const [actionLog, setActionLog] = useState<string>("Hash Table initialized.");
  const [activeTab, setActiveTab] = useState<"theory" | "code">("theory");

  const insertData = () => {
    const randomKey =
      SAMPLE_KEYS[Math.floor(Math.random() * SAMPLE_KEYS.length)];
    let asciiSum = 0;
    for (let i = 0; i < randomKey.length; i++)
      asciiSum += randomKey.charCodeAt(i);
    const bucketIndex = asciiSum % 5;

    const newBuckets = [...buckets];
    const isCollision = newBuckets[bucketIndex].length > 0;
    newBuckets[bucketIndex] = [
      ...newBuckets[bucketIndex],
      { id: Date.now() + Math.random(), keyStr: randomKey },
    ];
    setBuckets(newBuckets);

    let log = `Hashing "${randomKey}":\n1. ASCII Sum = ${asciiSum}\n2. Index = ${asciiSum} % 5 = [${bucketIndex}]\n`;
    log += isCollision
      ? `3. [!] COLLISION in Bucket ${bucketIndex}. Chaining to Linked List.`
      : `3. Placed directly in empty Bucket ${bucketIndex}.`;
    setActionLog(log);
  };

  const clearTable = () => {
    setBuckets([[], [], [], [], []]);
    setActionLog("Table cleared.");
  };

  return (
    <section className="flex h-full w-full overflow-hidden">
      <div className="w-1/3 min-w-[350px] max-w-[500px] bg-slate-900 border-r border-slate-800 flex flex-col z-10 shadow-2xl animate-slide-up">
        <div className="p-8 pb-0">
          <p className="text-blue-500 font-bold tracking-widest uppercase text-sm mb-1">
            Tier 1 • Module 7
          </p>
          <h2 className="text-3xl font-bold text-white drop-shadow-md mb-6">
            Hash Tables
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

        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 pt-0 flex flex-col">
          {activeTab === "theory" ? (
            <>
              <div className="space-y-6 flex-1 animate-fade-in">
                <div>
                  <h3 className="text-white font-bold mb-2 text-lg">
                    Instant Lookup Magic:
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    Databases find one specific user out of billions instantly
                    using Hash Tables. Instead of searching, they use math to
                    calculate exactly where the data lives.
                  </p>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
                  <h4 className="text-blue-400 font-bold mb-2 text-sm">
                    How it works:
                  </h4>
                  <ul className="text-slate-300 text-sm space-y-2 list-disc pl-4">
                    <li>
                      <strong>Hash Function:</strong> Converts a string into a
                      number.
                    </li>
                    <li>
                      <strong>Modulo (%):</strong> Compresses that number into
                      an Array Index.
                    </li>
                    <li>
                      <strong className="text-red-400">Collisions:</strong>{" "}
                      Created via Linked Lists (Separate Chaining).
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 bg-slate-950 border border-blue-500/30 p-4 rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                <p className="text-xs text-blue-500 font-bold uppercase tracking-widest mb-2">
                  Algorithm Execution Log
                </p>
                <pre className="text-sm text-white font-mono leading-relaxed whitespace-pre-wrap">
                  {actionLog}
                </pre>
              </div>
            </>
          ) : (
            <CodeViewer
              snippets={HASH_CODE}
              explanation="Notice how every language implements a Hash Table using an Array of Linked List Nodes to handle collisions."
            />
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col relative bg-slate-950 animate-fade-in">
        <div className="flex-1 w-full h-full cursor-grab active:cursor-grabbing">
          <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[5, 10, 5]} intensity={1.2} />
              <HashTableVisualizer buckets={buckets} />
              <OrbitControls enableDamping minDistance={3} maxDistance={20} />
              <Environment preset="city" />
            </Suspense>
          </Canvas>
        </div>

        <div className="h-24 border-t border-slate-800 bg-slate-900 flex items-center justify-between px-8">
          <div className="flex gap-4">
            <button
              onClick={insertData}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded font-medium transition active:scale-95 shadow-md"
            >
              Hash & Insert Word
            </button>
            <button
              onClick={clearTable}
              className="px-6 py-2 border border-red-500/30 text-red-400 hover:bg-red-500/10 rounded font-medium transition active:scale-95"
            >
              Reset
            </button>
          </div>
          <Link
            href="/hash-tables/quiz"
            className="px-8 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold transition"
          >
            Take the Exam →
          </Link>
        </div>
      </div>
    </section>
  );
}
