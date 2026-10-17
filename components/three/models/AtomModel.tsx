'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export default function AtomModel() {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);
  const ring3Ref = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.9;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z += delta * 0.7;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z += delta * 0.8;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={groupRef} scale={1.2}>
        {/* Atomic Nucleus (Clustered Protons / Neutrons) */}
        <group>
          {/* Central Nucleon 1 */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.3, 24, 24]} />
            <meshStandardMaterial
              color="#10b981"
              emissive="#10b981"
              emissiveIntensity={0.9}
              roughness={0.2}
              metalness={0.6}
            />
          </mesh>

          {/* Nucleon 2 */}
          <mesh position={[0.22, 0.18, 0.1]}>
            <sphereGeometry args={[0.24, 20, 20]} />
            <meshStandardMaterial
              color="#f59e0b"
              emissive="#f59e0b"
              emissiveIntensity={0.8}
              roughness={0.2}
            />
          </mesh>

          {/* Nucleon 3 */}
          <mesh position={[-0.2, -0.15, 0.15]}>
            <sphereGeometry args={[0.22, 20, 20]} />
            <meshStandardMaterial
              color="#0d9488"
              emissive="#0d9488"
              emissiveIntensity={0.6}
              roughness={0.3}
            />
          </mesh>

          {/* Nucleon 4 */}
          <mesh position={[0.1, -0.22, -0.15]}>
            <sphereGeometry args={[0.2, 20, 20]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#0284c7"
              emissiveIntensity={0.5}
            />
          </mesh>

          {/* Nucleon 5 */}
          <mesh position={[-0.15, 0.2, -0.12]}>
            <sphereGeometry args={[0.21, 20, 20]} />
            <meshStandardMaterial
              color="#10b981"
              emissive="#059669"
              emissiveIntensity={0.6}
            />
          </mesh>
        </group>

        {/* Orbital Ring 1 (Tilted 60 deg X) */}
        <group rotation={[Math.PI / 3, 0, 0]}>
          <group ref={ring1Ref}>
            <mesh>
              <torusGeometry args={[1.5, 0.02, 16, 64]} />
              <meshStandardMaterial
                color="#10b981"
                emissive="#10b981"
                emissiveIntensity={0.4}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
            {/* Electron on Ring 1 */}
            <mesh position={[1.5, 0, 0]}>
              <sphereGeometry args={[0.09, 16, 16]} />
              <meshStandardMaterial
                color="#f8fafc"
                emissive="#34d399"
                emissiveIntensity={1.5}
              />
            </mesh>
          </group>
        </group>

        {/* Orbital Ring 2 (Tilted -60 deg X, 45 deg Y) */}
        <group rotation={[-Math.PI / 3, Math.PI / 4, 0]}>
          <group ref={ring2Ref}>
            <mesh>
              <torusGeometry args={[1.5, 0.02, 16, 64]} />
              <meshStandardMaterial
                color="#f59e0b"
                emissive="#f59e0b"
                emissiveIntensity={0.4}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
            {/* Electron on Ring 2 */}
            <mesh position={[0, 1.5, 0]}>
              <sphereGeometry args={[0.09, 16, 16]} />
              <meshStandardMaterial
                color="#f8fafc"
                emissive="#fbbf24"
                emissiveIntensity={1.5}
              />
            </mesh>
          </group>
        </group>

        {/* Orbital Ring 3 (Tilted around Z and Y) */}
        <group rotation={[0, Math.PI / 3, Math.PI / 3]}>
          <group ref={ring3Ref}>
            <mesh>
              <torusGeometry args={[1.5, 0.02, 16, 64]} />
              <meshStandardMaterial
                color="#38bdf8"
                emissive="#38bdf8"
                emissiveIntensity={0.4}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
            {/* Electron on Ring 3 */}
            <mesh position={[-1.5, 0, 0]}>
              <sphereGeometry args={[0.09, 16, 16]} />
              <meshStandardMaterial
                color="#f8fafc"
                emissive="#38bdf8"
                emissiveIntensity={1.5}
              />
            </mesh>
          </group>
        </group>
      </group>
    </Float>
  );
}
