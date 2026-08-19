"use client";

import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import Link from "next/link";
import HashTableVisualizer, {
  HashEntry,
} from "../../components/canvas/HashTableVisualizer";

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
  // Initialize 5 empty buckets
  const [buckets, setBuckets] = useState<HashEntry[][]>([[], [], [], [], []]);
  const [actionLog, setActionLog] = useState<string>(
    "Hash Table initialized with 5 empty buckets.",
  );

  const insertData = () => {
    const randomKey =
      SAMPLE_KEYS[Math.floor(Math.random() * SAMPLE_KEYS.length)];

    // 1. The Hash Function (Summing ASCII values)
    let asciiSum = 0;
    for (let i = 0; i < randomKey.length; i++) {
      asciiSum += randomKey.charCodeAt(i);
    }

    // 2. The Modulo Operator to find the bucket (0 to 4)
    const bucketIndex = asciiSum % 5;

    const newBuckets = [...buckets];
    const isCollision = newBuckets[bucketIndex].length > 0;

    // Add to the specific bucket's linked list
    newBuckets[bucketIndex] = [
      ...newBuckets[bucketIndex],
      { id: Date.now() + Math.random(), keyStr: randomKey },
    ];

    setBuckets(newBuckets);

    // Update the educational log
    let log = `Hashing "${randomKey}":\n`;
    log += `1. ASCII Sum = ${asciiSum}\n`;
    log += `2. Index = ${asciiSum} % 5 = [${bucketIndex}]\n`;
    if (isCollision) {
      log += `3. [!] COLLISION in Bucket ${bucketIndex}. Chaining to Linked List.`;
    } else {
      log += `3. Placed directly in empty Bucket ${bucketIndex}.`;
    }

    setActionLog(log);
  };

  const clearTable = () => {
    setBuckets([[], [], [], [], []]);
    setActionLog("Table cleared.");
  };

  return (
    <section className="flex h-full w-full overflow-hidden">
      <div className="w-1/3 min-w-[350px] max-w-[450px] bg-slate-900 border-r border-slate-800 p-8 overflow-y-auto z-10 shadow-2xl flex flex-col">
        <p className="text-blue-500 font-bold tracking-widest uppercase text-sm mb-1">
          Tier 1 • Module 8
        </p>
        <h2 className="text-3xl font-bold text-white drop-shadow-md mb-6">
          Hash Tables
        </h2>

        <div className="space-y-6 flex-1">
          <div>
            <h3 className="text-white font-bold mb-2 text-lg">
              Instant Lookup Magic:
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              How do databases find one specific user out of billions instantly?
              They use Hash Tables. Instead of searching, they use math to
              calculate exactly where the data lives.
            </p>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
            <h4 className="text-blue-400 font-bold mb-2 text-sm">
              How it works:
            </h4>
            <ul className="text-slate-300 text-sm space-y-2 list-disc pl-4">
              <li>
                <strong>Hash Function:</strong> Takes a string (like a username)
                and converts it into a giant number.
              </li>
              <li>
                <strong>Modulo (%):</strong> Compresses that giant number into a
                valid Array Index (Bucket).
              </li>
              <li>
                <strong className="text-red-400">Collisions:</strong> If two
                different strings hash to the same bucket, we don't overwrite
                data. We create a Linked List chaining downwards (Separate
                Chaining).
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
      </div>

      <div className="flex-1 flex flex-col relative bg-slate-950">
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
