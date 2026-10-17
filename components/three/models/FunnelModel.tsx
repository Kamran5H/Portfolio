'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export default function FunnelModel() {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.45;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.7;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.25} floatIntensity={0.3}>
      <group ref={groupRef} scale={1.2}>
        {/* Upper Funnel Cone Body */}
        <mesh position={[0, 0.4, 0]}>
          <coneGeometry args={[1.35, 1.2, 32, 1, true]} />
          <meshStandardMaterial
            color="#1e293b"
            roughness={0.25}
            metalness={0.7}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Lower Funnel Spout Tube */}
        <mesh position={[0, -0.6, 0]}>
          <cylinderGeometry args={[0.32, 0.32, 0.8, 32, 1, true]} />
          <meshStandardMaterial
            color="#0f172a"
            roughness={0.25}
            metalness={0.8}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Glowing Filter Mesh Ring inside */}
        <mesh ref={ringRef} position={[0, -0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.05, 0.35, 24]} />
          <meshStandardMaterial
            color="#34d399"
            emissive="#10b981"
            emissiveIntensity={0.8}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Upper Incoming Clutter Nodes (Being Triaged) */}
        <mesh position={[-0.55, 1.1, 0.2]}>
          <sphereGeometry args={[0.13, 16, 16]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.4} />
        </mesh>
        <mesh position={[0.45, 1.25, -0.1]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#64748b" roughness={0.4} />
        </mesh>
        <mesh position={[0.1, 0.95, 0.4]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#475569" roughness={0.4} />
        </mesh>

        {/* Lower Purified Output Clean Nodes */}
        <mesh position={[0, -1.2, 0]}>
          <octahedronGeometry args={[0.22, 0]} />
          <meshStandardMaterial color="#10b981" emissive="#34d399" emissiveIntensity={0.9} />
        </mesh>
        <mesh position={[0.4, -1.45, 0.2]}>
          <octahedronGeometry args={[0.15, 0]} />
          <meshStandardMaterial color="#f59e0b" emissive="#fbbf24" emissiveIntensity={0.8} />
        </mesh>
      </group>
    </Float>
  );
}
