"use client";

import { Text, QuadraticBezierLine, RoundedBox } from "@react-three/drei";

interface PointerProps {
  isLinked: boolean;
}

export default function PointerVisualizer({ isLinked }: PointerProps) {
  return (
    <group position={[0, 0, 0]}>
      {/* 1. The Standard Variable (Target) */}
      <group position={[2, 0, 0]}>
        <RoundedBox args={[1.5, 1.5, 1.5]} radius={0.15} smoothness={4}>
          <meshPhysicalMaterial
            color="#22c55e"
            metalness={0.1}
            roughness={0.2}
            transmission={0.8}
            thickness={0.5}
            envMapIntensity={2}
            emissive="#22c55e"
            emissiveIntensity={0.1}
          />
        </RoundedBox>
        <Text position={[0, 0, 0.76]} fontSize={0.4} color="white">
          Value: 42
        </Text>
        <Text position={[0, -1.2, 0]} fontSize={0.25} color="#94a3b8">
          Address: 0x7FFA
        </Text>
      </group>

      {/* 2. The Pointer Variable */}
      <group position={[-2, 0, 0]}>
        <RoundedBox args={[1.5, 1.5, 1.5]} radius={0.15} smoothness={4}>
          <meshPhysicalMaterial
            color={isLinked ? "#a855f7" : "#ef4444"}
            metalness={0.1}
            roughness={0.2}
            transmission={0.8}
            thickness={0.5}
            envMapIntensity={2}
            emissive={isLinked ? "#a855f7" : "#ef4444"}
            emissiveIntensity={0.1}
          />
        </RoundedBox>
        <Text position={[0, 0, 0.76]} fontSize={0.3} color="white">
          {isLinked ? "0x7FFA" : "NULL"}
        </Text>
        <Text position={[0, -1.2, 0]} fontSize={0.25} color="#94a3b8">
          Pointer: ptr
        </Text>
      </group>

      {/* 3. The 3D Pointer Arc */}
      {isLinked && (
        <QuadraticBezierLine
          start={[-2, 0.5, 0]}
          end={[2, 0.5, 0]}
          mid={[0, 3, 0]}
          color="#a855f7"
          lineWidth={3}
          dashed={true}
          dashScale={5}
        />
      )}
    </group>
  );
}
