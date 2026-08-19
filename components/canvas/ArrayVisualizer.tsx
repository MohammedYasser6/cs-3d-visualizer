"use client";

import { Text } from "@react-three/drei";

interface ArrayVisualizerProps {
  arrayData: number[];
}

export default function ArrayVisualizer({ arrayData }: ArrayVisualizerProps) {
  // Calculate the total width to center the array on the screen
  const spacing = 1.5;
  const xOffset = -(arrayData.length * spacing) / 2 + spacing / 2;

  return (
    <group position={[xOffset, 0, 0]}>
      {arrayData.map((val, index) => (
        <group key={index} position={[index * spacing, 0, 0]}>
          {/* The Memory Block */}
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#0ea5e9" opacity={0.8} transparent />
          </mesh>

          {/* The Data Value inside the block */}
          <Text
            position={[0, 0, 0.51]}
            fontSize={0.5}
            color="white"
            font="/fonts/Inter-Bold.woff"
          >
            {val.toString()}
          </Text>

          {/* The Array Index below the block */}
          <Text position={[0, -0.8, 0]} fontSize={0.3} color="#94a3b8">
            Index [{index}]
          </Text>
        </group>
      ))}
    </group>
  );
}
