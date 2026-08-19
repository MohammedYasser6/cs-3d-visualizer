"use client";

import { Text } from "@react-three/drei";
import { ThreeElements } from "@react-three/fiber";

interface StackQueueProps {
  data: number[];
  mode: "stack" | "queue";
}

export default function StackQueueVisualizer({ data, mode }: StackQueueProps) {
  const spacing = 1.6; // Slightly increased spacing to give labels breathing room

  return (
    <group position={[0, mode === "stack" ? -2 : 0, 0]}>
      {data.map((val, index) => {
        // Stack piles UP (y-axis), Queue lines up HORIZONTALLY (x-axis)
        const xPos =
          mode === "queue"
            ? index * spacing - (data.length * spacing) / 2 + spacing / 2
            : 0;
        const yPos = mode === "stack" ? index * spacing : 0;

        // Isolate label behavior per data structural rule set
        const isStack = mode === "stack";
        const isTop = index === data.length - 1;
        const isFront = index === 0;
        const isBack = index === data.length - 1;

        // Compute labels to avoid rendering inside structural bounding shapes
        const labelText = isStack
          ? isTop
            ? "Top"
            : `[${index}]`
          : isFront
            ? "Front"
            : isBack
              ? "Back"
              : `[${index}]`;

        // Dynamic structural positioning for label offsets
        // Stack text pushes LEFT of the column, Queue text pushes DOWN below row
        const labelX = isStack ? -1.1 : 0;
        const labelY = isStack ? 0 : -1.1;

        return (
          <group key={index} position={[xPos, yPos, 0]}>
            {/* 3D Visual Box Element */}
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

            {/* Inner Value Label (Pushed further outward along Z-axis) */}
            <Text
              position={[0, 0, 0.65]}
              fontSize={0.45}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              {val.toString()}
            </Text>

            {/* Structural Tracking Label (Moved out of collision spaces) */}
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
