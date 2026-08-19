"use client";

import { Text, QuadraticBezierLine } from "@react-three/drei";
import { ThreeElements } from "@react-three/fiber";

interface TreeProps {
  // We now accept nulls to represent empty gaps in the tree
  data: (number | null)[];
}

export default function TreeVisualizer({ data }: TreeProps) {
  // Helper to calculate X and Y positions based on array index
  const getPosition = (index: number): [number, number, number] => {
    if (index === 0) return [0, 2.5, 0]; // Root node

    const level = Math.floor(Math.log2(index + 1));
    const y = 2.5 - level * 1.8; // Move down 1.8 units per level

    // Calculate horizontal spread per level hierarchy
    const offset = Math.pow(2, level) - 1;
    const positionInLevel = index - offset;
    const totalNodesInLevel = Math.pow(2, level);

    // Reliable spacing structure that keeps gaps visually accurate
    const totalWidth = 6.5;
    const step = totalWidth / totalNodesInLevel;
    const x = -totalWidth / 2 + step * positionInLevel + step / 2;

    return [x, y, 0];
  };

  return (
    <group position={[0, 0, 0]}>
      {data.map((val, index) => {
        // If there is no data at this index, render nothing (leave a gap)
        if (val === null || val === undefined) return null;

        const pos = getPosition(index);

        const parentIndex = Math.floor((index - 1) / 2);
        // Ensure the parent actually exists before trying to draw a line to it
        const hasParent =
          index > 0 &&
          data[parentIndex] !== null &&
          data[parentIndex] !== undefined;
        const parentPos = hasParent ? getPosition(parentIndex) : null;

        return (
          <group key={index}>
            {/* 1. The Branch (Drawn first so it goes behind the node) */}
            {parentPos && (
              <QuadraticBezierLine
                start={[parentPos[0], parentPos[1] - 0.2, 0]}
                end={[pos[0], pos[1] + 0.2, 0]}
                mid={[
                  (parentPos[0] + pos[0]) / 2,
                  (parentPos[1] + pos[1]) / 2,
                  0,
                ]}
                color="#34d399"
                lineWidth={2}
              />
            )}

            {/* 2. The Node (Rotation property correctly added here) */}
            <group position={pos}>
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry
                  args={[0.6, 0.6, 0.2, 32]}
                  {...({} as ThreeElements["cylinderGeometry"])}
                />
                <meshStandardMaterial
                  color="#10b981"
                  opacity={0.9}
                  transparent
                  {...({} as ThreeElements["meshStandardMaterial"])}
                />
              </mesh>

              {/* Text values floating clearly on front surface */}
              <Text
                position={[0, 0, 0.15]}
                fontSize={0.4}
                color="white"
                anchorX="center"
                anchorY="middle"
              >
                {val.toString()}
              </Text>

              {/* Optional Index Label */}
              <Text position={[0, -0.8, 0]} fontSize={0.25} color="#94a3b8">
                {index === 0 ? "Root" : `[${index}]`}
              </Text>
            </group>
          </group>
        );
      })}
    </group>
  );
}
