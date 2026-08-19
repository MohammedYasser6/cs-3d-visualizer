"use client";

import { Text } from "@react-three/drei";

interface ArrayVisualizerProps {
  arrayData: number[];
}

export default function ArrayVisualizer({ arrayData }: ArrayVisualizerProps) {
  const spacing = 1.5;
  const xOffset = -(arrayData.length * spacing) / 2 + spacing / 2;

  return (
    <group position={[xOffset, 0, 0]}>
      {arrayData.map((val, index) => (
        <group key={index} position={[index * spacing, 0, 0]}>
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#0ea5e9" opacity={0.9} transparent />
          </mesh>
          <Text position={[0, 0, 0.51]} fontSize={0.5} color="white">
            {val.toString()}
          </Text>
          <Text position={[0, -0.7, 0]} fontSize={0.3} color="#94a3b8">
            Index [{index}]
          </Text>
          {/* Added educational memory addresses (assuming 4 bytes per integer) */}
          <Text position={[0, -1.1, 0]} fontSize={0.2} color="#475569">
            0x{1000 + index * 4}
          </Text>
        </group>
      ))}
    </group>
  );
}
