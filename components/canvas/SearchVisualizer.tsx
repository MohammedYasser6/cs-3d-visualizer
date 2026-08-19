"use client";

import { Text } from "@react-three/drei";
import { ThreeElements } from "@react-three/fiber";

interface SearchProps {
  array: number[];
  left: number;
  right: number;
  mid: number;
  foundAt: number | null;
}

export default function SearchVisualizer({
  array,
  left,
  right,
  mid,
  foundAt,
}: SearchProps) {
  const spacing = 1.2;
  const xOffset = -(array.length * spacing) / 2 + spacing / 2;

  return (
    <group position={[xOffset, -2, 0]}>
      {array.map((val, index) => {
        // Color Logic
        let barColor = "#334155"; // Slate-700 (Discarded / Out of bounds)
        let opacity = 0.3;

        if (foundAt === index) {
          barColor = "#22c55e"; // Green (Found!)
          opacity = 1;
        } else if (index >= left && index <= right) {
          barColor = "#3b82f6"; // Blue (Active search space)
          opacity = 0.9;
          if (index === mid) {
            barColor = "#eab308"; // Yellow (Currently checking)
            opacity = 1;
          }
        }

        const height = val / 15;

        return (
          <group key={index} position={[index * spacing, 0, 0]}>
            <mesh position={[0, height / 2, 0]}>
              <boxGeometry
                args={[0.8, height, 0.8]}
                {...({} as ThreeElements["boxGeometry"])}
              />
              <meshStandardMaterial
                color={barColor}
                opacity={opacity}
                transparent
                {...({} as ThreeElements["meshStandardMaterial"])}
              />
            </mesh>

            <Text
              position={[0, -0.6, 0]}
              fontSize={0.4}
              color={opacity === 1 ? "white" : "#64748b"}
              anchorX="center"
              anchorY="middle"
            >
              {val.toString()}
            </Text>

            {/* Pointer Labels */}
            {index === mid && foundAt === null && (
              <Text
                position={[0, height + 0.5, 0]}
                fontSize={0.3}
                color="#eab308"
              >
                Mid
              </Text>
            )}
            {index === left && foundAt === null && (
              <Text position={[0, -1.2, 0]} fontSize={0.25} color="#60a5fa">
                Left
              </Text>
            )}
            {index === right && foundAt === null && (
              <Text position={[0, -1.2, 0]} fontSize={0.25} color="#60a5fa">
                Right
              </Text>
            )}
          </group>
        );
      })}
    </group>
  );
}
