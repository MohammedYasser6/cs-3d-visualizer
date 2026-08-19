"use client";

import { Text } from "@react-three/drei";
import { ThreeElements } from "@react-three/fiber";

interface SortingProps {
  array: number[];
  comparing: number[]; // Indices currently being compared
  sorted: number[]; // Indices that are fully sorted
}

export default function SortingVisualizer({
  array,
  comparing,
  sorted,
}: SortingProps) {
  const spacing = 1.2;
  const xOffset = -(array.length * spacing) / 2 + spacing / 2;

  return (
    <group position={[xOffset, -2, 0]}>
      {array.map((val, index) => {
        const isComparing = comparing.includes(index);
        const isSorted = sorted.includes(index);

        // Color logic based on algorithm state
        let barColor = "#3b82f6"; // Default Blue
        if (isSorted)
          barColor = "#22c55e"; // Green
        else if (isComparing) barColor = "#eab308"; // Yellow

        // Scale height based on value (assume max value is ~100)
        const height = val / 15;

        return (
          <group key={index} position={[index * spacing, 0, 0]}>
            {/* The Bar */}
            {/* We position Y at height/2 so it grows upwards from the floor */}
            <mesh position={[0, height / 2, 0]}>
              <boxGeometry
                args={[0.8, height, 0.8]}
                {...({} as ThreeElements["boxGeometry"])}
              />
              <meshStandardMaterial
                color={barColor}
                opacity={0.9}
                transparent
                {...({} as ThreeElements["meshStandardMaterial"])}
              />
            </mesh>

            {/* The Value Label underneath */}
            <Text
              position={[0, -0.6, 0]}
              fontSize={0.4}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              {val.toString()}
            </Text>
          </group>
        );
      })}
    </group>
  );
}
