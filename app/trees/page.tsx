"use client";

import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import Link from "next/link";
import TreeVisualizer from "../../components/canvas/TreeVisualizer";

// --- AVL TREE LOGIC ---
type AVLNode = {
  value: number;
  left: AVLNode | null;
  right: AVLNode | null;
  height: number;
};

const getHeight = (node: AVLNode | null) => (node ? node.height : 0);
const getBalance = (node: AVLNode | null) =>
  node ? getHeight(node.left) - getHeight(node.right) : 0;

const rightRotate = (y: AVLNode): AVLNode => {
  const x = y.left!;
  const T2 = x.right;
  x.right = y;
  y.left = T2;
  y.height = Math.max(getHeight(y.left), getHeight(y.right)) + 1;
  x.height = Math.max(getHeight(x.left), getHeight(x.right)) + 1;
  return x;
};

const leftRotate = (x: AVLNode): AVLNode => {
  const y = x.right!;
  const T2 = y.left;
  y.left = x;
  x.right = T2;
  x.height = Math.max(getHeight(x.left), getHeight(x.right)) + 1;
  y.height = Math.max(getHeight(y.left), getHeight(y.right)) + 1;
  return y;
};

const insertAVL = (
  node: AVLNode | null,
  value: number,
  logs: string[],
): AVLNode => {
  if (!node) {
    logs.push(`Placed ${value}.`);
    return { value, left: null, right: null, height: 1 };
  }

  // Clone node for React state immutability
  const newNode = { ...node };

  if (value < newNode.value) {
    logs.push(`${value} < ${newNode.value} (Left)`);
    newNode.left = insertAVL(newNode.left, value, logs);
  } else if (value > newNode.value) {
    logs.push(`${value} > ${newNode.value} (Right)`);
    newNode.right = insertAVL(newNode.right, value, logs);
  } else {
    logs.push(`Duplicate ${value} ignored.`);
    return newNode;
  }

  newNode.height =
    1 + Math.max(getHeight(newNode.left), getHeight(newNode.right));
  const balance = getBalance(newNode);

  // Check for Imbalances and Rotate
  if (balance > 1 && value < newNode.left!.value) {
    logs.push(`[!] Imbalance at ${newNode.value}. Performing Right Rotation.`);
    return rightRotate(newNode);
  }
  if (balance < -1 && value > newNode.right!.value) {
    logs.push(`[!] Imbalance at ${newNode.value}. Performing Left Rotation.`);
    return leftRotate(newNode);
  }
  if (balance > 1 && value > newNode.left!.value) {
    logs.push(
      `[!] Imbalance at ${newNode.value}. Performing Left-Right Rotation.`,
    );
    newNode.left = leftRotate(newNode.left!);
    return rightRotate(newNode);
  }
  if (balance < -1 && value < newNode.right!.value) {
    logs.push(
      `[!] Imbalance at ${newNode.value}. Performing Right-Left Rotation.`,
    );
    newNode.right = rightRotate(newNode.right!);
    return leftRotate(newNode);
  }

  return newNode;
};

// Convert object tree back to array for 3D Visualizer (Max 31 nodes / 5 levels)
const treeToArray = (root: AVLNode | null): (number | null)[] => {
  const arr: (number | null)[] = Array(31).fill(null);
  const traverse = (node: AVLNode | null, index: number) => {
    if (!node || index >= 31) return;
    arr[index] = node.value;
    traverse(node.left, 2 * index + 1);
    traverse(node.right, 2 * index + 2);
  };
  traverse(root, 0);
  return arr;
};

export default function TreesPage() {
  const [root, setRoot] = useState<AVLNode | null>({
    value: 50,
    left: null,
    right: null,
    height: 1,
  });
  const [nodeCount, setNodeCount] = useState(1);
  const [actionLog, setActionLog] = useState<string>(
    "AVL Tree initialized. Click 'Insert' to start.",
  );

  const insertNode = () => {
    if (nodeCount >= 15) {
      setActionLog("Maximum node limit reached for visualizer.");
      return;
    }
    const val = Math.floor(Math.random() * 100);
    const logs: string[] = [`Inserting ${val}: `];

    const newRoot = insertAVL(root, val, logs);

    setRoot(newRoot);
    setNodeCount(nodeCount + 1);
    setActionLog(logs.join(" → "));
  };

  const clearTree = () => {
    setRoot({ value: 50, left: null, right: null, height: 1 });
    setNodeCount(1);
    setActionLog("Tree reset. Click 'Insert' to start.");
  };

  const visualizerData = treeToArray(root);

  return (
    <section className="flex h-full w-full overflow-hidden">
      {/* LEFT COLUMN: Educational Theory */}
      <div className="w-1/3 min-w-[350px] max-w-[450px] bg-slate-900 border-r border-slate-800 p-8 overflow-y-auto z-10 shadow-2xl flex flex-col">
        <p className="text-emerald-500 font-bold tracking-widest uppercase text-sm mb-1">
          Tier 2 • Module 7
        </p>
        <h2 className="text-3xl font-bold text-white drop-shadow-md mb-6">
          AVL Trees (Self-Balancing)
        </h2>

        <div className="space-y-6 flex-1">
          <div>
            <h3 className="text-white font-bold mb-2 text-lg">
              The Problem with BSTs:
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              If you insert sorted data (e.g., 10, 20, 30) into a normal BST, it
              forms a straight line. You lose the $O(\log N)$ speed and it
              degrades into a slow Linked List.
            </p>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
            <h4 className="text-emerald-400 font-bold mb-2 text-sm">
              The AVL Solution:
            </h4>
            <ul className="text-slate-300 text-sm space-y-2 list-disc pl-4">
              <li>
                <strong>Balance Factor:</strong> Every node calculates:{" "}
                <code>Height(Left) - Height(Right)</code>.
              </li>
              <li>
                <strong>The Rule:</strong> If this factor ever becomes greater
                than `1` or less than `-1`, the tree is mathematically
                unbalanced.
              </li>
              <li>
                <strong>Rotations:</strong> The tree will physically rotate
                nodes (Left, Right, Left-Right, or Right-Left) to fix the
                imbalance instantly.
              </li>
            </ul>
          </div>
        </div>

        {/* ALGORITHM ACTION LOG UI */}
        <div className="mt-8 bg-slate-950 border border-emerald-500/30 p-4 rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.1)]">
          <p className="text-xs text-emerald-500 font-bold uppercase tracking-widest mb-2">
            Algorithm Execution Log
          </p>
          <p className="text-sm text-white font-mono leading-relaxed">
            {actionLog}
          </p>
        </div>
      </div>

      {/* RIGHT COLUMN: 3D Canvas */}
      <div className="flex-1 flex flex-col relative bg-slate-950">
        <div className="flex-1 w-full h-full cursor-grab active:cursor-grabbing">
          <Canvas camera={{ position: [0, 1, 10], fov: 45 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[5, 10, 5]} intensity={1.2} />
              <TreeVisualizer data={visualizerData} />
              <OrbitControls enableDamping minDistance={3} maxDistance={20} />
              <Environment preset="city" />
            </Suspense>
          </Canvas>
        </div>

        <div className="h-24 border-t border-slate-800 bg-slate-900 flex items-center justify-between px-8">
          <div className="flex gap-4">
            <button
              onClick={insertNode}
              disabled={nodeCount >= 15}
              className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-medium transition active:scale-95 shadow-md disabled:opacity-50"
            >
              Insert (AVL Balance)
            </button>
            <button
              onClick={clearTree}
              className="px-6 py-2 border border-red-500/30 text-red-400 hover:bg-red-500/10 rounded font-medium transition active:scale-95"
            >
              Reset Tree
            </button>
          </div>
          <Link
            href="/trees/quiz"
            className="px-8 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold transition"
          >
            Take the Exam →
          </Link>
        </div>
      </div>
    </section>
  );
}
