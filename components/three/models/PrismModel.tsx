'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export default function PrismModel() {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
    }
    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.3;
      coreRef.current.rotation.z += delta * 0.2;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.8;
      ringRef.current.rotation.x += delta * 0.2;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.3} floatIntensity={0.4}>
      <group ref={groupRef} position={[0, 0, 0]} scale={1.15}>
        {/* Central Refraction Crystal / Prism */}
        <mesh ref={coreRef}>
          <octahedronGeometry args={[1.05, 0]} />
          <meshPhysicalMaterial
            color="#38bdf8"
            roughness={0.1}
            metalness={0.1}
            transmission={0.7}
            thickness={1.2}
            ior={1.5}
            emissive="#0284c7"
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* Inner energy core */}
        <mesh>
          <sphereGeometry args={[0.35, 16, 16]} />
          <meshStandardMaterial
            color="#10b981"
            emissive="#10b981"
            emissiveIntensity={1.2}
            roughness={0.2}
          />
        </mesh>

        {/* Orbiting Download Stream Accelerator Ring */}
        <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1.4, 0.04, 16, 64]} />
          <meshStandardMaterial
            color="#f59e0b"
            emissive="#f59e0b"
            emissiveIntensity={0.6}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Media Stream Inflow Beam (Left) */}
        <mesh position={[-1.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.04, 0.04, 1.2, 12]} />
          <meshStandardMaterial
            color="#94a3b8"
            emissive="#64748b"
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* Split Spectrum Beams (Right - Video, Audio, Data) */}
        {/* Beam 1: Emerald (Video 1080p) */}
        <mesh position={[1.1, 0.5, 0]} rotation={[0, 0, -Math.PI / 5]}>
          <cylinderGeometry args={[0.035, 0.035, 1.1, 12]} />
          <meshStandardMaterial
            color="#10b981"
            emissive="#10b981"
            emissiveIntensity={0.8}
          />
        </mesh>

        {/* Beam 2: Gold (Audio 320k) */}
        <mesh position={[1.2, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <cylinderGeometry args={[0.035, 0.035, 1.2, 12]} />
          <meshStandardMaterial
            color="#f59e0b"
            emissive="#f59e0b"
            emissiveIntensity={0.8}
          />
        </mesh>

        {/* Beam 3: Cyan (Fast Stream) */}
        <mesh position={[1.1, -0.5, 0]} rotation={[0, 0, -Math.PI * 0.8]}>
          <cylinderGeometry args={[0.035, 0.035, 1.1, 12]} />
          <meshStandardMaterial
            color="#06b6d4"
            emissive="#06b6d4"
            emissiveIntensity={0.8}
          />
        </mesh>

        {/* Floating stream packets */}
        <mesh position={[0.7, 0.9, 0.4]}>
          <boxGeometry args={[0.16, 0.16, 0.16]} />
          <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.5} />
        </mesh>

        <mesh position={[-0.8, -0.7, 0.3]}>
          <boxGeometry args={[0.14, 0.14, 0.14]} />
          <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.5} />
        </mesh>
      </group>
    </Float>
  );
}
