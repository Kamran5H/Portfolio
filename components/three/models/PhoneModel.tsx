'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

export default function PhoneModel() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 1.2) * 0.08;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={groupRef} position={[0, 0, 0]} scale={1.1}>
        {/* Phone Body */}
        <RoundedBox args={[1.5, 2.7, 0.15]} radius={0.12} smoothness={4}>
          <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
        </RoundedBox>

        {/* Screen Display */}
        <RoundedBox args={[1.36, 2.52, 0.02]} position={[0, 0, 0.08]} radius={0.06} smoothness={2}>
          <meshStandardMaterial color="#064e3b" roughness={0.4} metalness={0.2} />
        </RoundedBox>

        {/* Top Header Bar */}
        <mesh position={[0, 1.05, 0.1]}>
          <planeGeometry args={[1.2, 0.22]} />
          <meshBasicMaterial color="#052e16" />
        </mesh>

        {/* Notch / Speaker */}
        <RoundedBox args={[0.35, 0.06, 0.02]} position={[0, 1.2, 0.1]} radius={0.02} smoothness={2}>
          <meshStandardMaterial color="#020617" roughness={0.1} />
        </RoundedBox>

        {/* Feed Cards on Screen */}
        <mesh position={[0, 0.65, 0.1]}>
          <planeGeometry args={[1.15, 0.35]} />
          <meshStandardMaterial color="#10b981" roughness={0.3} emissive="#064e3b" />
        </mesh>

        <mesh position={[0, 0.15, 0.1]}>
          <planeGeometry args={[1.15, 0.4]} />
          <meshStandardMaterial color="#0f766e" roughness={0.3} />
        </mesh>

        <mesh position={[0, -0.4, 0.1]}>
          <planeGeometry args={[1.15, 0.45]} />
          <meshStandardMaterial color="#065f46" roughness={0.3} />
        </mesh>

        {/* Bottom Navigation Pill */}
        <RoundedBox args={[0.5, 0.04, 0.02]} position={[0, -1.15, 0.1]} radius={0.02} smoothness={2}>
          <meshBasicMaterial color="#f8fafc" />
        </RoundedBox>

        {/* Orbiting Verification Shield Badge */}
        <mesh position={[0.9, 0.8, 0.3]} rotation={[0, 0.2, 0.1]}>
          <sphereGeometry args={[0.16, 16, 16]} />
          <meshStandardMaterial color="#34d399" emissive="#10b981" emissiveIntensity={0.6} />
        </mesh>
      </group>
    </Float>
  );
}
