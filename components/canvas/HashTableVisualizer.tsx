"use client";

import { Text, QuadraticBezierLine } from "@react-three/drei";
import { ThreeElements } from "@react-three/fiber";

export interface HashEntry {
  id: number;
  keyStr: string;
}

interface HashTableProps {
  buckets: HashEntry[][];
}

export default function HashTableVisualizer({ buckets }: HashTableProps) {
  const bucketSpacing = 2.5;
  const chainSpacing = 1.5;

  // Center the 5 buckets on the screen
  const xOffset = -(5 * bucketSpacing) / 2 + bucketSpacing / 2;

  return (
    <group position={[xOffset, 2, 0]}>
      {buckets.map((chain, bucketIndex) => (
        <group key={bucketIndex} position={[bucketIndex * bucketSpacing, 0, 0]}>
          {/* The Array Bucket Base */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry
              args={[1.8, 0.8, 1.8]}
              {...({} as ThreeElements["boxGeometry"])}
            />
            <meshStandardMaterial
              color="#3b82f6"
              opacity={0.3}
              transparent
              {...({} as ThreeElements["meshStandardMaterial"])}
            />
          </mesh>
          <Text position={[0, 0.6, 0]} fontSize={0.3} color="#94a3b8">
            Bucket [{bucketIndex}]
          </Text>

          {/* The Linked List Chain inside the bucket */}
          {chain.map((entry, chainIndex) => {
            const yPos = -0.8 - chainIndex * chainSpacing;
            const parentY =
              chainIndex === 0 ? 0 : -0.8 - (chainIndex - 1) * chainSpacing;

            return (
              <group key={entry.id}>
                {/* Pointer Line chaining to the next item */}
                {chainIndex > 0 && (
                  <QuadraticBezierLine
                    start={[0, parentY - 0.4, 0]}
                    end={[0, yPos + 0.4, 0]}
                    color="#60a5fa"
                    lineWidth={2}
                    dashed
                    dashScale={2}
                  />
                )}

                {/* The Data Node */}
                <mesh position={[0, yPos, 0]}>
                  <boxGeometry
                    args={[1.5, 0.8, 0.5]}
                    {...({} as ThreeElements["boxGeometry"])}
                  />
                  <meshStandardMaterial
                    color="#2563eb"
                    opacity={0.9}
                    transparent
                    {...({} as ThreeElements["meshStandardMaterial"])}
                  />
                </mesh>

                <Text
                  position={[0, yPos, 0.26]}
                  fontSize={0.35}
                  color="white"
                  anchorX="center"
                  anchorY="middle"
                >
                  {entry.keyStr}
                </Text>
              </group>
            );
          })}
        </group>
      ))}
    </group>
  );
}
