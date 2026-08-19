"use client";

import { Text, Line } from "@react-three/drei";
import { ThreeElements } from "@react-three/fiber";

export interface GraphNode {
  id: number;
  label: string;
  position: [number, number, number];
}

export interface GraphEdge {
  sourceId: number;
  targetId: number;
}

interface GraphProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export default function GraphVisualizer({ nodes, edges }: GraphProps) {
  return (
    <group position={[0, 0, 0]}>
      {/* 1. Draw the Edges (Lines) First so they sit behind the nodes */}
      {edges.map((edge, index) => {
        const sourceNode = nodes.find((n) => n.id === edge.sourceId);
        const targetNode = nodes.find((n) => n.id === edge.targetId);

        if (!sourceNode || !targetNode) return null;

        return (
          <Line
            key={`edge-${index}`}
            points={[sourceNode.position, targetNode.position]}
            color="#94a3b8"
            lineWidth={2}
            opacity={0.5}
            transparent
          />
        );
      })}

      {/* 2. Draw the Vertices (Nodes) */}
      {nodes.map((node) => (
        <group key={`node-${node.id}`} position={node.position}>
          <mesh>
            <sphereGeometry
              args={[0.6, 32, 32]}
              {...({} as ThreeElements["sphereGeometry"])}
            />
            <meshStandardMaterial
              color="#8b5cf6"
              opacity={0.9}
              transparent
              roughness={0.2}
              {...({} as ThreeElements["meshStandardMaterial"])}
            />
          </mesh>
          <Text
            position={[0, 0, 0.65]}
            fontSize={0.35}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {node.label}
          </Text>
        </group>
      ))}
    </group>
  );
}
