'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export default function MorphModel() {
  const cubeRef = useRef<THREE.Mesh>(null);
  const organicRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x += delta * 0.4;
      cubeRef.current.rotation.y += delta * 0.3;
    }
    if (organicRef.current) {
      organicRef.current.rotation.y += delta * 0.5;
      organicRef.current.rotation.z += delta * 0.2;
    }
    if (coreRef.current) {
      const scale = 0.9 + Math.sin(Date.now() * 0.003) * 0.15;
      coreRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <Float speed={2.2} rotationIntensity={0.3} floatIntensity={0.35}>
      <group scale={1.2}>
        {/* Left Side: Rigid Wireframe Machine Cube (Stiff AI) */}
        <mesh ref={cubeRef} position={[-0.85, 0, 0]}>
          <boxGeometry args={[1.3, 1.3, 1.3]} />
          <meshStandardMaterial
            color="#0ea5e9"
            wireframe
            roughness={0.1}
            emissive="#0284c7"
            emissiveIntensity={0.6}
          />
        </mesh>

        {/* Center Transformation Node */}
        <mesh position={[0, 0, 0]}>
          <octahedronGeometry args={[0.22, 0]} />
          <meshStandardMaterial color="#f59e0b" emissive="#fbbf24" emissiveIntensity={0.9} />
        </mesh>

        {/* Right Side: Smooth Natural Organic Torus / Sphere (Natural Human Prose) */}
        <group ref={organicRef} position={[0.85, 0, 0]}>
          {/* Smooth Torus */}
          <mesh>
            <torusGeometry args={[0.7, 0.22, 24, 48]} />
            <meshStandardMaterial
              color="#10b981"
              roughness={0.2}
              metalness={0.5}
              emissive="#059669"
              emissiveIntensity={0.4}
            />
          </mesh>

          {/* Inner Glowing Warm Core */}
          <mesh ref={coreRef}>
            <sphereGeometry args={[0.32, 24, 24]} />
            <meshStandardMaterial
              color="#fbbf24"
              emissive="#f59e0b"
              emissiveIntensity={0.8}
              roughness={0.1}
            />
          </mesh>
        </group>
      </group>
    </Float>
  );
}
