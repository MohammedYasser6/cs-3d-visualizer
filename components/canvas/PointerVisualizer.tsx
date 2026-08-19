"use client";

import { Text } from "@react-three/drei";

interface PointerProps {
  isLinked: boolean;
}

export default function PointerVisualizer({ isLinked }: PointerProps) {
  return (
    <group position={[0, 0, 0]}>
      {/* 1. The Standard Variable (Target) */}
      <group position={[2, 0, 0]}>
        <mesh>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <meshStandardMaterial color="#22c55e" opacity={0.8} transparent />
        </mesh>
        <Text position={[0, 0, 0.76]} fontSize={0.4} color="white">
          Value: 42
        </Text>
        <Text position={[0, -1.2, 0]} fontSize={0.25} color="#94a3b8">
          Address: 0x7FFA
        </Text>
      </group>

      {/* 2. The Pointer Variable */}
      <group position={[-2, 0, 0]}>
        <mesh>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          {/* Changes color if it is holding the address (linked) */}
          <meshStandardMaterial
            color={isLinked ? "#a855f7" : "#ef4444"}
            opacity={0.8}
            transparent
          />
        </mesh>
        <Text position={[0, 0, 0.76]} fontSize={0.3} color="white">
          {isLinked ? "0x7FFA" : "NULL"}
        </Text>
        <Text position={[0, -1.2, 0]} fontSize={0.25} color="#94a3b8">
          Pointer: ptr
        </Text>
      </group>
    </group>
  );
}
