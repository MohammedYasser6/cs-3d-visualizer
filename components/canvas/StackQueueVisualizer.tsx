"use client";

import { Text } from "@react-three/drei";
import { ThreeElements } from "@react-three/fiber";

// 1. Define a strict type for our data blocks
export interface StackQueueItem {
  id: number;
  value: number;
}

interface StackQueueProps {
  data: StackQueueItem[];
  mode: "stack" | "queue";
}

export default function StackQueueVisualizer({ data, mode }: StackQueueProps) {
  const spacing = 1.6;

  return (
    <group position={[0, mode === "stack" ? -2 : 0, 0]}>
      {data.map((item, index) => {
        const xPos =
          mode === "queue"
            ? index * spacing - (data.length * spacing) / 2 + spacing / 2
            : 0;
        const yPos = mode === "stack" ? index * spacing : 0;

        const isStack = mode === "stack";
        const isTop = index === data.length - 1;
        const isFront = index === 0;
        const isBack = index === data.length - 1;

        const labelText = isStack
          ? isTop
            ? "Top"
            : `[${index}]`
          : isFront
            ? "Front"
            : isBack
              ? "Back"
              : `[${index}]`;

        const labelX = isStack ? -1.1 : 0;
        const labelY = isStack ? 0 : -1.1;

        return (
          // 2. CRITICAL FIX: Use the unique item.id here, not the index
          <group key={item.id} position={[xPos, yPos, 0]}>
            <mesh>
              <boxGeometry
                args={[1.2, 1.2, 1.2]}
                {...({} as ThreeElements["boxGeometry"])}
              />
              <meshStandardMaterial
                color={isStack ? "#f59e0b" : "#14b8a6"}
                opacity={0.9}
                transparent
                {...({} as ThreeElements["meshStandardMaterial"])}
              />
            </mesh>

            <Text
              position={[0, 0, 0.65]}
              fontSize={0.45}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              {/* 3. Extract the value from the object */}
              {item.value.toString()}
            </Text>

            <Text
              position={[labelX, labelY, 0]}
              fontSize={0.35}
              color={isTop || isFront || isBack ? "#f8fafc" : "#64748b"}
              fontWeight={isTop || isFront || isBack ? "bold" : "normal"}
              anchorX={isStack ? "right" : "center"}
              anchorY="middle"
            >
              {labelText}
            </Text>
          </group>
        );
      })}
    </group>
  );
}
