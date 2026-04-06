/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

const ParticleField = ({ count = 150 }) => {
  const mesh = useRef<THREE.InstancedMesh>(null);
  
  // Initial positions and drift parameters
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 25; // Wide spread horizontally
      const y = (Math.random() - 0.5) * 20; // Spread vertically
      const z = (Math.random() - 0.5) * 15 - 5; // Depth mostly behind
      const speed = 0.002 + Math.random() * 0.008; // Varied slow upward speed
      const offset = Math.random() * 100; // Random offset for sine wave phase
      const scaleBase = 0.5 + Math.random() * 0.5;
      temp.push({ x, y, z, speed, offset, scaleBase });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!mesh.current) return;
    
    const time = state.clock.getElapsedTime();

    particles.forEach((particle, i) => {
      // Upward drift
      particle.y += particle.speed;
      
      // Reset if moves out of view (top)
      if (particle.y > 10) {
        particle.y = -10;
        particle.x = (Math.random() - 0.5) * 25; // Reset X to keep distribution random
      }

      // Gentle swaying motion (like dust motes or embers in air)
      const swayX = Math.sin(time * 0.3 + particle.offset) * 0.8;
      const swayZ = Math.cos(time * 0.2 + particle.offset) * 0.5;

      // Pulse size for "glowing" effect
      const pulse = Math.sin(time * 2 + particle.offset) * 0.2 + 1;
      const finalScale = particle.scaleBase * pulse;

      dummy.position.set(
        particle.x + swayX,
        particle.y,
        particle.z + swayZ
      );
      dummy.scale.set(finalScale, finalScale, finalScale);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.04, 12, 12]} />
      {/* Additive blending makes overlapping particles brighter, simulating light/fire */}
      <meshBasicMaterial 
        color="#FF4500" 
        transparent 
        opacity={0.6} 
        blending={THREE.AdditiveBlending} 
      />
    </instancedMesh>
  );
};

export const TechBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
        <color attach="background" args={['#050505']} />
        <fog attach="fog" args={['#050505', 8, 25]} />
        <ambientLight intensity={0.5} />
        
        {/* Main Ember/Particle Field */}
        <ParticleField count={120} />
        
        {/* Background Stars for subtle depth */}
        <Stars radius={100} depth={50} count={1500} factor={3} saturation={0} fade speed={0.5} />
      </Canvas>
    </div>
  );
};

// Deprecated components kept empty to satisfy imports if any remain
export const HeroScene = () => null;
export const QuantumComputerScene = () => null;