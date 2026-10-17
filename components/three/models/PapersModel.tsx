'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

export default function PapersModel() {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.45;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.8;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.25} floatIntensity={0.35}>
      <group ref={groupRef} scale={1.15}>
        {/* Base Folder Cover */}
        <RoundedBox args={[2.0, 2.5, 0.08]} position={[0, -0.15, -0.1]} rotation={[0.1, 0, -0.05]} radius={0.04} smoothness={2}>
          <meshStandardMaterial color="#0f766e" roughness={0.3} metalness={0.4} />
        </RoundedBox>

        {/* Paper Sheet 1 */}
        <RoundedBox args={[1.7, 2.3, 0.04]} position={[-0.05, 0, 0]} rotation={[0.05, 0.05, 0.02]} radius={0.02} smoothness={2}>
          <meshStandardMaterial color="#f8fafc" roughness={0.6} />
        </RoundedBox>

        {/* Paper Sheet 2 (Offset angle) */}
        <RoundedBox args={[1.7, 2.3, 0.04]} position={[0.05, 0.05, 0.08]} rotation={[-0.04, -0.03, -0.04]} radius={0.02} smoothness={2}>
          <meshStandardMaterial color="#e2e8f0" roughness={0.6} />
        </RoundedBox>

        {/* Top Featured Manuscript Sheet */}
        <RoundedBox args={[1.7, 2.3, 0.04]} position={[0, 0.1, 0.16]} rotation={[0, 0, 0.02]} radius={0.02} smoothness={2}>
          <meshStandardMaterial color="#ffffff" roughness={0.5} />
        </RoundedBox>

        {/* Printed Title Block lines */}
        <mesh position={[0, 0.7, 0.19]}>
          <planeGeometry args={[1.3, 0.12]} />
          <meshBasicMaterial color="#0f172a" />
        </mesh>
        <mesh position={[-0.2, 0.45, 0.19]}>
          <planeGeometry args={[0.9, 0.06]} />
          <meshBasicMaterial color="#334155" />
        </mesh>
        <mesh position={[-0.1, 0.3, 0.19]}>
          <planeGeometry args={[1.1, 0.06]} />
          <meshBasicMaterial color="#475569" />
        </mesh>
        <mesh position={[0, 0.15, 0.19]}>
          <planeGeometry args={[1.3, 0.06]} />
          <meshBasicMaterial color="#64748b" />
        </mesh>

        {/* Metallic Binder Clip */}
        <RoundedBox args={[0.45, 0.2, 0.28]} position={[-0.6, 1.05, 0.16]} radius={0.03} smoothness={3}>
          <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.2} />
        </RoundedBox>

        {/* Orbiting Download Data Ring */}
        <mesh ref={ringRef} position={[0, 0, 0.1]} rotation={[1.2, 0, 0]}>
          <torusGeometry args={[1.45, 0.03, 16, 64]} />
          <meshStandardMaterial color="#10b981" emissive="#34d399" emissiveIntensity={0.6} />
        </mesh>
      </group>
    </Float>
  );
}
