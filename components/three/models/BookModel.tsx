'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

export default function BookModel() {
  const groupRef = useRef<THREE.Group>(null);
  const sunRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
      groupRef.current.rotation.x = 0.2 + Math.sin(Date.now() * 0.001) * 0.05;
    }
    if (sunRef.current) {
      sunRef.current.rotation.z += delta * 0.6;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.25}>
      <group ref={groupRef} scale={1.2}>
        {/* Left Hardcover */}
        <RoundedBox args={[1.3, 1.9, 0.08]} position={[-0.65, 0, -0.05]} rotation={[0, 0.25, 0]} radius={0.03} smoothness={2}>
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.6} />
        </RoundedBox>

        {/* Right Hardcover */}
        <RoundedBox args={[1.3, 1.9, 0.08]} position={[0.65, 0, -0.05]} rotation={[0, -0.25, 0]} radius={0.03} smoothness={2}>
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.6} />
        </RoundedBox>

        {/* Left Open Pages Block */}
        <RoundedBox args={[1.2, 1.8, 0.12]} position={[-0.6, 0.02, 0.03]} rotation={[0, 0.25, 0]} radius={0.02} smoothness={2}>
          <meshStandardMaterial color="#f8fafc" roughness={0.7} />
        </RoundedBox>

        {/* Right Open Pages Block */}
        <RoundedBox args={[1.2, 1.8, 0.12]} position={[0.6, 0.02, 0.03]} rotation={[0, -0.25, 0]} radius={0.02} smoothness={2}>
          <meshStandardMaterial color="#f1f5f9" roughness={0.7} />
        </RoundedBox>

        {/* Left Page Checklist Lines */}
        <mesh position={[-0.6, 0.45, 0.14]} rotation={[0, 0.25, 0]}>
          <planeGeometry args={[0.9, 0.08]} />
          <meshBasicMaterial color="#10b981" />
        </mesh>
        <mesh position={[-0.6, 0.25, 0.14]} rotation={[0, 0.25, 0]}>
          <planeGeometry args={[0.8, 0.06]} />
          <meshBasicMaterial color="#475569" />
        </mesh>
        <mesh position={[-0.6, 0.05, 0.14]} rotation={[0, 0.25, 0]}>
          <planeGeometry args={[0.85, 0.06]} />
          <meshBasicMaterial color="#475569" />
        </mesh>

        {/* Right Page Task Items */}
        <mesh position={[0.6, 0.45, 0.14]} rotation={[0, -0.25, 0]}>
          <planeGeometry args={[0.9, 0.08]} />
          <meshBasicMaterial color="#f59e0b" />
        </mesh>
        <mesh position={[0.6, 0.25, 0.14]} rotation={[0, -0.25, 0]}>
          <planeGeometry args={[0.85, 0.06]} />
          <meshBasicMaterial color="#475569" />
        </mesh>
        <mesh position={[0.6, 0.05, 0.14]} rotation={[0, -0.25, 0]}>
          <planeGeometry args={[0.8, 0.06]} />
          <meshBasicMaterial color="#475569" />
        </mesh>

        {/* Bookmark Silk Ribbon */}
        <mesh position={[0, -0.3, 0.16]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[0.1, 1.4, 0.02]} />
          <meshStandardMaterial color="#f59e0b" roughness={0.3} />
        </mesh>

        {/* Morning Sun Crest Icon floating above */}
        <mesh ref={sunRef} position={[0, 1.3, 0]}>
          <octahedronGeometry args={[0.28, 0]} />
          <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={0.8} />
        </mesh>
      </group>
    </Float>
  );
}
