"use client";

import { Text, QuadraticBezierLine, RoundedBox } from "@react-three/drei";

interface LinkedListProps {
  listData: number[];
}

export default function LinkedListVisualizer({ listData }: LinkedListProps) {
  const spacing = 3;
  const xOffset = -(listData.length * spacing) / 2 + spacing / 2;

  return (
    <group position={[xOffset, 0, 0]}>
      {listData.map((val, index) => {
        const isLast = index === listData.length - 1;

        return (
          <group key={index} position={[index * spacing, 0, 0]}>
            {/* The Data Block */}
            <RoundedBox
              args={[1, 1.2, 1]}
              radius={0.1}
              smoothness={4}
              position={[-0.5, 0, 0]}
            >
              <meshPhysicalMaterial
                color="#ec4899"
                metalness={0.1}
                roughness={0.2}
                transmission={0.8}
                thickness={0.5}
                envMapIntensity={2}
                emissive="#ec4899"
                emissiveIntensity={0.4}
              />
            </RoundedBox>

            {/* The Pointer Block */}
            <RoundedBox
              args={[1, 1.2, 1]}
              radius={0.1}
              smoothness={4}
              position={[0.5, 0, 0]}
            >
              <meshPhysicalMaterial
                color="#831843"
                metalness={0.1}
                roughness={0.2}
                transmission={0.8}
                thickness={0.5}
                envMapIntensity={2}
                emissive="#831843"
                emissiveIntensity={0.1}
              />
            </RoundedBox>

            <Text position={[-0.5, 0, 0.51]} fontSize={0.4} color="white">
              {val.toString()}
            </Text>
            <Text position={[0.5, 0, 0.51]} fontSize={0.25} color="#fbcfe8">
              {isLast ? "NULL" : "PTR"}
            </Text>
            <Text position={[0, -1, 0]} fontSize={0.3} color="#94a3b8">
              Node {index}
            </Text>

            {!isLast && (
              <QuadraticBezierLine
                start={[0.5, 0.2, 0]}
                end={[spacing - 0.5, 0.2, 0]}
                mid={[spacing / 2, 1.5, 0]}
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
