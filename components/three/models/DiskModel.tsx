'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

export default function DiskModel() {
  const groupRef = useRef<THREE.Group>(null);
  const platterRef = useRef<THREE.Mesh>(null);
  const armRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.35;
    }
    if (platterRef.current) {
      platterRef.current.rotation.y += delta * 4.0; // High speed rotation
    }
    if (armRef.current) {
      armRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 3) * 0.35 - 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.25}>
      <group ref={groupRef} rotation={[0.4, 0, 0]} scale={1.15}>
        {/* Drive Chassis Base */}
        <RoundedBox args={[2.5, 2.7, 0.2]} radius={0.06} smoothness={3}>
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.7} />
        </RoundedBox>

        {/* Recessed Platter Well */}
        <mesh position={[0, -0.05, 0.11]}>
          <cylinderGeometry args={[1.08, 1.08, 0.04, 36]} />
          <meshStandardMaterial color="#020617" roughness={0.5} />
        </mesh>

        {/* Spinning Magnetic Platter Disk */}
        <mesh ref={platterRef} position={[0, -0.05, 0.14]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.98, 0.98, 0.02, 48]} />
          <meshStandardMaterial
            color="#94a3b8"
            roughness={0.08}
            metalness={0.98}
            emissive="#10b981"
            emissiveIntensity={0.08}
          />
        </mesh>

        {/* Center Spindle Motor Cap */}
        <mesh position={[0, -0.05, 0.17]}>
          <cylinderGeometry args={[0.26, 0.26, 0.05, 24]} />
          <meshStandardMaterial color="#334155" roughness={0.2} metalness={0.8} />
        </mesh>

        {/* Actuator Arm Base & Pivot */}
        <group position={[0.78, 0.85, 0.14]}>
          <mesh>
            <cylinderGeometry args={[0.2, 0.2, 0.08, 20]} />
            <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.3} />
          </mesh>

          {/* Sweeping Read/Write Arm */}
          <group ref={armRef}>
            <mesh position={[-0.45, -0.5, 0.04]} rotation={[0, 0, 0.7]}>
              <boxGeometry args={[0.08, 1.1, 0.02]} />
              <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.1} />
            </mesh>
            {/* Actuator Head Tip */}
            <mesh position={[-0.75, -0.85, 0.04]}>
              <boxGeometry args={[0.1, 0.1, 0.04]} />
              <meshStandardMaterial color="#10b981" emissive="#34d399" emissiveIntensity={0.8} />
            </mesh>
          </group>
        </group>

        {/* Activity LED */}
        <mesh position={[-0.95, -1.05, 0.12]}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshStandardMaterial color="#34d399" emissive="#10b981" emissiveIntensity={1.0} />
        </mesh>
      </group>
    </Float>
  );
}
