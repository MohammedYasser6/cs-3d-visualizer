"use client";

import { Text, QuadraticBezierLine } from "@react-three/drei";

interface LinkedListProps {
  listData: number[];
}

export default function LinkedListVisualizer({ listData }: LinkedListProps) {
  const spacing = 3; // Space between nodes
  const xOffset = -(listData.length * spacing) / 2 + spacing / 2;

  return (
    <group position={[xOffset, 0, 0]}>
      {listData.map((val, index) => {
        const isLast = index === listData.length - 1;

        return (
          <group key={index} position={[index * spacing, 0, 0]}>
            {/* The Node Block (Data + Pointer) */}
            <mesh position={[-0.5, 0, 0]}>
              <boxGeometry args={[1, 1.2, 1]} />
              <meshStandardMaterial color="#ec4899" opacity={0.8} transparent />
            </mesh>

            <mesh position={[0.5, 0, 0]}>
              <boxGeometry args={[1, 1.2, 1]} />
              <meshStandardMaterial color="#831843" opacity={0.9} transparent />
            </mesh>

            {/* Text */}
            <Text position={[-0.5, 0, 0.51]} fontSize={0.4} color="white">
              {val.toString()}
            </Text>
            <Text position={[0.5, 0, 0.51]} fontSize={0.25} color="#fbcfe8">
              {isLast ? "NULL" : "PTR"}
            </Text>
            <Text position={[0, -1, 0]} fontSize={0.3} color="#94a3b8">
              Node {index}
            </Text>

            {/* The Pointer Arrow (Curve to the next node) */}
            {!isLast && (
              <QuadraticBezierLine
                start={[0.5, 0.2, 0]} // Start at this node's PTR block
                end={[spacing - 0.5, 0.2, 0]} // End at the next node's Data block
                mid={[spacing / 2, 1.5, 0]} // Arc upwards
                color="#f472b6"
                lineWidth={3}
                dashed={true}
                dashScale={4}
              />
            )}
          </group>
        );
      })}
    </group>
  );
}
