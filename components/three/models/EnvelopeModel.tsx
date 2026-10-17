'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

export default function EnvelopeModel() {
  const groupRef = useRef<THREE.Group>(null);
  const flapRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.45;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 1.2) * 0.07;
    }
    if (flapRef.current) {
      flapRef.current.rotation.x = -0.4 + Math.sin(state.clock.elapsedTime * 2.0) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={groupRef} scale={1.2}>
        {/* Envelope Back Body */}
        <RoundedBox args={[2.5, 1.7, 0.1]} radius={0.05} smoothness={3}>
          <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.5} />
        </RoundedBox>

        {/* Inner Clean Letter Pulling Out */}
        <RoundedBox args={[2.2, 1.5, 0.04]} position={[0, 0.4, 0.02]} radius={0.02} smoothness={2}>
          <meshStandardMaterial color="#f8fafc" roughness={0.4} />
        </RoundedBox>

        {/* Letter Text Lines */}
        <mesh position={[0, 0.75, 0.06]}>
          <planeGeometry args={[1.7, 0.08]} />
          <meshBasicMaterial color="#0f766e" />
        </mesh>
        <mesh position={[0, 0.55, 0.06]}>
          <planeGeometry args={[1.5, 0.06]} />
          <meshBasicMaterial color="#334155" />
        </mesh>
        <mesh position={[0, 0.38, 0.06]}>
          <planeGeometry args={[1.6, 0.06]} />
          <meshBasicMaterial color="#475569" />
        </mesh>

        {/* Front Envelope Pocket */}
        <RoundedBox args={[2.52, 1.1, 0.08]} position={[0, -0.3, 0.08]} radius={0.04} smoothness={3}>
          <meshStandardMaterial color="#0f172a" roughness={0.25} metalness={0.6} />
        </RoundedBox>

        {/* Flap Hinged at Top of Pocket */}
        <group ref={flapRef} position={[0, 0.25, 0.12]}>
          <RoundedBox args={[2.4, 0.9, 0.04]} position={[0, -0.4, 0]} rotation={[0, 0, 0]} radius={0.03} smoothness={3}>
            <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.5} />
          </RoundedBox>
        </group>

        {/* Emerald Wax / Zenith Seal Emblem */}
        <mesh position={[0, -0.15, 0.18]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.06, 24]} />
          <meshStandardMaterial color="#10b981" emissive="#059669" emissiveIntensity={0.5} metalness={0.4} roughness={0.2} />
        </mesh>

        {/* Orbiting Inbox Filter Node */}
        <mesh position={[1.4, 0.3, 0.2]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#f59e0b" emissive="#fbbf24" emissiveIntensity={0.8} />
        </mesh>
      </group>
    </Float>
  );
}
