"use client";

import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import Link from "next/link";
import GraphVisualizer, {
  GraphNode,
  GraphEdge,
} from "../../components/canvas/GraphVisualizer";

// Pre-calculated aesthetic positions for up to 8 nodes
const POSITIONS: [number, number, number][] = [
  [0, 2.5, 0],
  [-2.5, 1, 0],
  [2.5, 1, 0],
  [-1.5, -1.5, 0],
  [1.5, -1.5, 0],
  [-3.5, -0.5, -1],
  [3.5, -0.5, -1],
  [0, -3, 0],
];
const LABELS = ["A", "B", "C", "D", "E", "F", "G", "H"];

export default function GraphsPage() {
  const [nodes, setNodes] = useState<GraphNode[]>([
    { id: 0, label: "A", position: POSITIONS[0] },
  ]);
  const [edges, setEdges] = useState<GraphEdge[]>([]);
  const [actionLog, setActionLog] = useState<string>(
    "Graph initialized with Vertex A.",
  );

  const addVertex = () => {
    if (nodes.length >= POSITIONS.length) {
      setActionLog("Maximum vertices reached for this visualizer.");
      return;
    }
    const newId = nodes.length;
    const newNode = {
      id: newId,
      label: LABELS[newId],
      position: POSITIONS[newId],
    };
    setNodes([...nodes, newNode]);
    setActionLog(`Added Vertex ${newNode.label}.`);
  };

  const addRandomEdge = () => {
    if (nodes.length < 2) {
      setActionLog("Need at least 2 vertices to create an edge.");
      return;
    }

    // Pick two random, distinct nodes
    let source = Math.floor(Math.random() * nodes.length);
    let target = Math.floor(Math.random() * nodes.length);
    while (source === target) {
      target = Math.floor(Math.random() * nodes.length);
    }

    // Check if edge already exists (Undirected graph: A->B is the same as B->A)
    const edgeExists = edges.some(
      (e) =>
        (e.sourceId === source && e.targetId === target) ||
        (e.sourceId === target && e.targetId === source),
    );

    if (edgeExists) {
      setActionLog(
        `Edge between ${LABELS[source]} and ${LABELS[target]} already exists. Tried again.`,
      );
      return;
    }

    setEdges([...edges, { sourceId: source, targetId: target }]);
    setActionLog(
      `Created Edge: connected Vertex ${LABELS[source]} to Vertex ${LABELS[target]}.`,
    );
  };

  const clearGraph = () => {
    setNodes([{ id: 0, label: "A", position: POSITIONS[0] }]);
    setEdges([]);
    setActionLog("Graph reset.");
  };

  return (
    <section className="flex h-full w-full overflow-hidden">
      <div className="w-1/3 min-w-[350px] max-w-[450px] bg-slate-900 border-r border-slate-800 p-8 overflow-y-auto z-10 shadow-2xl flex flex-col animate-slide-up">
        <p className="text-violet-500 font-bold tracking-widest uppercase text-sm mb-1">
          Tier 2 • Module 9
        </p>
        <h2 className="text-3xl font-bold text-white drop-shadow-md mb-6">
          Graphs & Networks
        </h2>

        <div className="space-y-6 flex-1">
          <div>
            <h3 className="text-white font-bold mb-2 text-lg">
              The Web of Data:
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              A Graph is a collection of nodes (Vertices) connected by lines
              (Edges). Unlike a Tree, there is no strict "Root" and loops
              (cycles) are completely allowed.
            </p>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
            <h4 className="text-violet-400 font-bold mb-2 text-sm">
              Graph Terminology:
            </h4>
            <ul className="text-slate-300 text-sm space-y-2 list-disc pl-4">
              <li>
                <strong>Vertex (Node):</strong> The entities (e.g., a person on
                Facebook, a city on Google Maps).
              </li>
              <li>
                <strong>Edge:</strong> The relationship or path between two
                vertices.
              </li>
              <li>
                <strong>Directed vs. Undirected:</strong> An Instagram follow is
                Directed (one-way). A Facebook friendship is Undirected
                (two-way). This visualizer uses Undirected edges.
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 bg-slate-950 border border-violet-500/30 p-4 rounded-lg shadow-[0_0_15px_rgba(139,92,246,0.1)]">
          <p className="text-xs text-violet-500 font-bold uppercase tracking-widest mb-2">
            Network Log
          </p>
          <pre className="text-sm text-white font-mono leading-relaxed whitespace-pre-wrap">
            {actionLog}
          </pre>
        </div>
      </div>

      <div className="flex-1 flex flex-col relative bg-slate-950 animate-fade-in">
        <div className="flex-1 w-full h-full cursor-grab active:cursor-grabbing">
          <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[5, 10, 5]} intensity={1.2} />
              <GraphVisualizer nodes={nodes} edges={edges} />
              <OrbitControls enableDamping minDistance={3} maxDistance={20} />
              <Environment preset="city" />
            </Suspense>
          </Canvas>
        </div>

        <div className="h-24 border-t border-slate-800 bg-slate-900 flex items-center justify-between px-8">
          <div className="flex gap-4">
            <button
              onClick={addVertex}
              disabled={nodes.length >= POSITIONS.length}
              className="px-6 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded font-medium transition active:scale-95 shadow-md disabled:opacity-50"
            >
              Add Vertex
            </button>
            <button
              onClick={addRandomEdge}
              disabled={nodes.length < 2}
              className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded font-medium transition active:scale-95 shadow-md disabled:opacity-50"
            >
              Add Random Edge
            </button>
            <button
              onClick={clearGraph}
              className="px-6 py-2 border border-red-500/30 text-red-400 hover:bg-red-500/10 rounded font-medium transition active:scale-95"
            >
              Reset
            </button>
          </div>
          <Link
            href="/graphs/quiz"
            className="px-8 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold transition"
          >
            Take the Exam →
          </Link>
        </div>
      </div>
    </section>
  );
}
