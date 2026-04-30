/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

// Layer 1: Core rising embers — main orange-red fire particles
const EmberField = ({ count = 380 }: { count?: number }) => {
  const mesh = useRef<THREE.InstancedMesh>(null);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 32,
        y: (Math.random() - 0.5) * 22,
        z: (Math.random() - 0.5) * 14 - 5,
        speed: 0.009 + Math.random() * 0.024,
        offset: Math.random() * Math.PI * 2,
        scaleBase: 0.9 + Math.random() * 1.6,
      });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.y += p.speed;
      if (p.y > 11) {
        p.y = -11;
        p.x = (Math.random() - 0.5) * 32;
      }

      const swayX = Math.sin(time * 0.55 + p.offset) * 1.4;
      const swayZ = Math.cos(time * 0.38 + p.offset) * 0.7;
      const pulse = Math.sin(time * 3.2 + p.offset) * 0.35 + 1;

      dummy.position.set(p.x + swayX, p.y, p.z + swayZ);
      dummy.scale.setScalar(p.scaleBase * pulse);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.065, 8, 8]} />
      <meshBasicMaterial
        color="#FF4500"
        transparent
        opacity={0.78}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </instancedMesh>
  );
};

// Layer 2: Bright golden sparks — fast, tiny, short-lived
const SparkField = ({ count = 200 }: { count?: number }) => {
  const mesh = useRef<THREE.InstancedMesh>(null);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 30,
        y: -9 + Math.random() * 4,
        z: (Math.random() - 0.5) * 10 - 3,
        speedY: 0.024 + Math.random() * 0.045,
        speedX: (Math.random() - 0.5) * 0.018,
        life: Math.random(),
      });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(() => {
    if (!mesh.current) return;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.y += p.speedY;
      p.x += p.speedX;
      p.life += 0.018;

      if (p.y > 10 || p.life > 1) {
        p.y = -9 + Math.random() * 3;
        p.x = (Math.random() - 0.5) * 30;
        p.life = 0;
        p.speedY = 0.024 + Math.random() * 0.045;
        p.speedX = (Math.random() - 0.5) * 0.018;
      }

      const scale = Math.max(0.1, 1 - p.life) * 0.85 + 0.15;
      dummy.position.set(p.x, p.y, p.z);
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.032, 6, 6]} />
      <meshBasicMaterial
        color="#FFD000"
        transparent
        opacity={0.95}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </instancedMesh>
  );
};

// Layer 3: Large ambient fire body — slow, big, amber glow
const FireBody = ({ count = 70 }: { count?: number }) => {
  const mesh = useRef<THREE.InstancedMesh>(null);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 22,
        y: -7 + Math.random() * 9,
        z: (Math.random() - 0.5) * 8 - 6,
        speed: 0.003 + Math.random() * 0.007,
        offset: Math.random() * Math.PI * 2,
        scale: 1.8 + Math.random() * 2.8,
      });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.y += p.speed;
      if (p.y > 9) {
        p.y = -8;
        p.x = (Math.random() - 0.5) * 22;
      }

      const swayX = Math.sin(time * 0.22 + p.offset) * 2.2;
      const pulse = Math.sin(time * 1.6 + p.offset) * 0.45 + 1;

      dummy.position.set(p.x + swayX, p.y, p.z);
      dummy.scale.setScalar(p.scale * pulse);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.09, 8, 8]} />
      <meshBasicMaterial
        color="#FF6B00"
        transparent
        opacity={0.28}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </instancedMesh>
  );
};

export const TechBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0">
      {/* CSS radial fire glow at canvas base */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90%',
          height: '45%',
          background:
            'radial-gradient(ellipse at bottom, rgba(255,69,0,0.22) 0%, rgba(255,120,0,0.1) 38%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
        <color attach="background" args={['#050505']} />
        <fog attach="fog" args={['#050505', 12, 30]} />

        {/* Fire point lights — cast warm glow from below */}
        <pointLight position={[0, -5, 2]} color="#FF4500" intensity={4} distance={22} />
        <pointLight position={[-5, -3, 1]} color="#FF6B00" intensity={2} distance={16} />
        <pointLight position={[5, -3, 1]} color="#FF8C00" intensity={2} distance={16} />
        <ambientLight intensity={0.15} />

        {/* Fire layers — back to front */}
        <FireBody count={70} />
        <EmberField count={380} />
        <SparkField count={200} />

        {/* Background stars for depth */}
        <Stars radius={100} depth={50} count={1000} factor={2.5} saturation={0} fade speed={0.4} />
      </Canvas>
    </div>
  );
};

export const HeroScene = () => null;
export const QuantumComputerScene = () => null;
