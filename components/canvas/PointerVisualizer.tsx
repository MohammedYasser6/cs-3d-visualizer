"use client";

import { Text, QuadraticBezierLine } from "@react-three/drei";
import { ThreeElements } from "@react-three/fiber";

interface PointerProps {
  targetValue: number;
  pointerAddress: string;
}

export default function PointerVisualizer({
  targetValue,
  pointerAddress,
}: PointerProps) {
  return (
    <group position={[0, 0, 0]}>
      {/* Target Data Block (RAM) */}
      <group position={[2, 0, 0]}>
        <mesh>
          <boxGeometry
            args={[1.5, 1.5, 1.5]}
            {...({} as ThreeElements["boxGeometry"])}
          />
          <meshStandardMaterial
            color="#10b981"
            opacity={0.9}
            transparent
            {...({} as ThreeElements["meshStandardMaterial"])}
          />
        </mesh>
        <Text
          position={[0, 0, 0.76]}
          fontSize={0.6}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {targetValue.toString()}
        </Text>
        <Text position={[0, -1.2, 0]} fontSize={0.3} color="#94a3b8">
          Data in RAM
        </Text>
        <Text position={[0, 1.1, 0]} fontSize={0.25} color="#34d399">
          {pointerAddress}
        </Text>
      </group>

      {/* Pointer Variable */}
      <group position={[-3, 0, 0]}>
        <mesh>
          <boxGeometry
            args={[1.5, 1.5, 1.5]}
            {...({} as ThreeElements["boxGeometry"])}
          />
          <meshStandardMaterial
            color="#8b5cf6"
            opacity={0.8}
            transparent
            {...({} as ThreeElements["meshStandardMaterial"])}
          />
        </mesh>
        <Text
          position={[0, 0, 0.76]}
          fontSize={0.35}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {pointerAddress}
        </Text>
        <Text position={[0, -1.2, 0]} fontSize={0.3} color="#94a3b8">
          *ptr
        </Text>
      </group>

      {/* Connection Line representing the memory reference */}
      <QuadraticBezierLine
        start={[-2.2, 0, 0]}
        end={[1.2, 0, 0]}
        mid={[-0.5, 1.5, 0]}
        color="#c4b5fd"
        lineWidth={3}
        dashed
        dashScale={2}
      />
    </group>
  );
}
