"use client";

import { Text, RoundedBox } from "@react-three/drei";

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
          {/* The Upgraded Premium Block */}
          <RoundedBox args={[1, 1, 1]} radius={0.15} smoothness={4}>
            <meshPhysicalMaterial
              color="#0ea5e9"
              metalness={0.1}
              roughness={0.2}
              transmission={0.8} /* Makes it look like glass */
              thickness={0.5}
              envMapIntensity={2} /* Reflects the city environment brightly */
              emissive="#0ea5e9" /* Makes the block emit its own light */
              emissiveIntensity={0.1}
            />
          </RoundedBox>

          <Text position={[0, 0, 0.51]} fontSize={0.5} color="white">
            {val.toString()}
          </Text>

          <Text position={[0, -0.8, 0]} fontSize={0.3} color="#94a3b8">
            Index [{index}]
          </Text>
        </group>
      ))}
    </group>
  );
}
