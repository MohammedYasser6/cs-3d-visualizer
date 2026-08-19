"use client";

import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import Link from "next/link";
import TreeVisualizer from "../../components/canvas/TreeVisualizer";
import CodeViewer from "../../components/ui/CodeViewer";

const TREE_CODE = {
  "C++": `struct TreeNode {\n    int value;\n    TreeNode* left;\n    TreeNode* right;\n    \n    TreeNode(int val) : value(val), left(nullptr), right(nullptr) {}\n};\n\n// BST Insertion\nTreeNode* insert(TreeNode* root, int val) {\n    if (!root) return new TreeNode(val);\n    \n    if (val < root->value)\n        root->left = insert(root->left, val);\n    else if (val > root->value)\n        root->right = insert(root->right, val);\n        \n    return root;\n}`,
  Java: `class TreeNode {\n    int value;\n    TreeNode left, right;\n    \n    TreeNode(int val) {\n        this.value = val;\n        left = right = null;\n    }\n}\n\n// BST Insertion\nTreeNode insert(TreeNode root, int val) {\n    if (root == null) return new TreeNode(val);\n    \n    if (val < root.value)\n        root.left = insert(root.left, val);\n    else if (val > root.value)\n        root.right = insert(root.right, val);\n        \n    return root;\n}`,
  Kotlin: `class TreeNode(\n    var value: Int,\n    var left: TreeNode? = null,\n    var right: TreeNode? = null\n)\n\n// BST Insertion\nfun insert(root: TreeNode?, val: Int): TreeNode {\n    if (root == null) return TreeNode(val)\n    \n    if (val < root.value)\n        root.left = insert(root.left, val)\n    else if (val > root.value)\n        root.right = insert(root.right, val)\n        \n    return root\n}`,
  Python: `class TreeNode:\n    def __init__(self, val):\n        self.value = val\n        self.left = None\n        self.right = None\n\n# BST Insertion\ndef insert(root, val):\n    if not root:\n        return TreeNode(val)\n        \n    if val < root.value:\n        root.left = insert(root.left, val)\n    elif val > root.value:\n        root.right = insert(root.right, val)\n        \n    return root`,
};

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
  const [actionLog, setActionLog] = useState<string>("AVL Tree initialized.");
  const [activeTab, setActiveTab] = useState<"theory" | "code">("theory");

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
      <div className="w-1/3 min-w-[350px] max-w-[500px] bg-slate-900 border-r border-slate-800 flex flex-col z-10 shadow-2xl animate-slide-up">
        <div className="p-8 pb-0">
          <p className="text-emerald-500 font-bold tracking-widest uppercase text-sm mb-1">
            Tier 2 • Module 8
          </p>
          <h2 className="text-3xl font-bold text-white drop-shadow-md mb-6">
            AVL Trees
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
              className={`flex-1 py-2 text-sm font-bold rounded transition-colors ${activeTab === "code" ? "bg-emerald-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-300"}`}
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
                    The Problem with BSTs:
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    If you insert sorted data into a normal BST, it forms a
                    straight line. You lose the $O(\log N)$ speed.
                  </p>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
                  <h4 className="text-emerald-400 font-bold mb-2 text-sm">
                    The AVL Solution:
                  </h4>
                  <ul className="text-slate-300 text-sm space-y-2 list-disc pl-4">
                    <li>
                      <strong>Balance Factor:</strong> Height(Left) -
                      Height(Right).
                    </li>
                    <li>
                      <strong>The Rule:</strong> If this factor goes beyond `1`
                      or `-1`, the tree rotates to fix it.
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 bg-slate-950 border border-emerald-500/30 p-4 rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                <p className="text-xs text-emerald-500 font-bold uppercase tracking-widest mb-2">
                  Algorithm Execution Log
                </p>
                <p className="text-sm text-white font-mono leading-relaxed">
                  {actionLog}
                </p>
              </div>
            </>
          ) : (
            <CodeViewer
              snippets={TREE_CODE}
              explanation="Trees use Node objects with 'Left' and 'Right' pointers. The insert function uses recursion to traverse down the branches."
            />
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col relative bg-slate-950 animate-fade-in">
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
