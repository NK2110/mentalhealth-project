import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Cylinder, Float, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface HumanBodyProps {
  highlightedOrgans?: string[];
  hormoneColor?: string;
  hormoneIntensity?: number;
  pulseSpeed?: number;
  onOrganHover?: (organ: string | null) => void;
  onOrganClick?: (organ: string) => void;
}

export const HumanBody: React.FC<HumanBodyProps> = ({ 
  highlightedOrgans = [], 
  hormoneColor = '#4d79ff',
  hormoneIntensity = 1,
  pulseSpeed = 1,
  onOrganHover,
  onOrganClick
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const heartRef = useRef<THREE.Mesh>(null);
  const brainRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
    
    const time = state.clock.getElapsedTime();
    
    if (heartRef.current) {
      const s = 1 + Math.sin(time * 4 * pulseSpeed) * 0.05;
      heartRef.current.scale.set(s, s, s);
    }

    if (brainRef.current && highlightedOrgans.includes('brain')) {
      const glow = 0.5 + Math.sin(time * 2) * 0.5;
      (brainRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = glow * 2;
    }
  });

  // Hormone particles
  const particleCount = 500;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      // Confine to a rough human shape
      const y = (Math.random() - 0.5) * 4;
      const r = Math.max(0.1, (2 - Math.abs(y)) * 0.4);
      const angle = Math.random() * Math.PI * 2;
      pos[i * 3] = Math.cos(angle) * r * Math.random();
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(angle) * r * Math.random();
    }
    return pos;
  }, []);

  const particlesRef = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (particlesRef.current) {
      const time = state.clock.getElapsedTime();
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] -= 0.01 * hormoneIntensity;
        if (positions[i * 3 + 1] < -2) positions[i * 3 + 1] = 2;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const handlePointerOver = (e: any, organ: string) => {
    e.stopPropagation();
    document.body.style.cursor = 'pointer';
    onOrganHover?.(organ);
  };

  const handlePointerOut = () => {
    document.body.style.cursor = 'auto';
    onOrganHover?.(null);
  };

  return (
    <group ref={groupRef}>
      {/* Head */}
      <Sphere args={[0.4, 32, 32]} position={[0, 1.8, 0]}>
        <meshStandardMaterial 
          color="#e0e0e0" 
          transparent 
          opacity={0.3} 
          wireframe 
        />
      </Sphere>

      {/* Brain */}
      <Sphere 
        ref={brainRef}
        args={[0.25, 16, 16]} 
        position={[0, 1.85, 0]}
        onPointerOver={(e) => handlePointerOver(e, 'brain')}
        onPointerOut={handlePointerOut}
        onClick={() => onOrganClick?.('brain')}
      >
        <meshStandardMaterial 
          color={highlightedOrgans.includes('brain') ? "#ff4d4d" : "#ff9999"} 
          emissive={highlightedOrgans.includes('brain') ? "#ff0000" : "#000000"}
          emissiveIntensity={0}
        />
      </Sphere>

      {/* Torso */}
      <Cylinder args={[0.5, 0.4, 1.5, 32]} position={[0, 0.8, 0]}>
        <meshStandardMaterial color="#e0e0e0" transparent opacity={0.2} wireframe />
      </Cylinder>

      {/* Heart */}
      <Sphere 
        ref={heartRef}
        args={[0.12, 16, 16]} 
        position={[0.1, 1.1, 0.2]}
        onPointerOver={(e) => handlePointerOver(e, 'heart')}
        onPointerOut={handlePointerOut}
        onClick={() => onOrganClick?.('heart')}
      >
        <meshStandardMaterial 
          color={highlightedOrgans.includes('heart') ? "#ff0000" : "#cc0000"} 
        />
      </Sphere>

      {/* Adrenals (Simplified as small spheres near kidneys area) */}
      <Sphere 
        args={[0.08, 16, 16]} 
        position={[0.2, 0.6, 0.1]}
        onPointerOver={(e) => handlePointerOver(e, 'adrenals')}
        onPointerOut={handlePointerOut}
        onClick={() => onOrganClick?.('adrenals')}
      >
        <meshStandardMaterial color={highlightedOrgans.includes('adrenals') ? "#ffa64d" : "#cc7a00"} />
      </Sphere>
      <Sphere 
        args={[0.08, 16, 16]} 
        position={[-0.2, 0.6, 0.1]}
        onPointerOver={(e) => handlePointerOver(e, 'adrenals')}
        onPointerOut={handlePointerOut}
        onClick={() => onOrganClick?.('adrenals')}
      >
        <meshStandardMaterial color={highlightedOrgans.includes('adrenals') ? "#ffa64d" : "#cc7a00"} />
      </Sphere>

      {/* Arms */}
      <Cylinder args={[0.1, 0.1, 1.2, 16]} position={[0.7, 1.1, 0]} rotation={[0, 0, Math.PI / 4]}>
        <meshStandardMaterial color="#e0e0e0" transparent opacity={0.2} wireframe />
      </Cylinder>
      <Cylinder args={[0.1, 0.1, 1.2, 16]} position={[-0.7, 1.1, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <meshStandardMaterial color="#e0e0e0" transparent opacity={0.2} wireframe />
      </Cylinder>

      {/* Legs */}
      <Cylinder args={[0.15, 0.1, 1.8, 16]} position={[0.25, -0.8, 0]}>
        <meshStandardMaterial color="#e0e0e0" transparent opacity={0.2} wireframe />
      </Cylinder>
      <Cylinder args={[0.15, 0.1, 1.8, 16]} position={[-0.25, -0.8, 0]}>
        <meshStandardMaterial color="#e0e0e0" transparent opacity={0.2} wireframe />
      </Cylinder>

      {/* Hormone Particles */}
      <Points ref={particlesRef} positions={positions} stride={3}>
        <PointMaterial
          transparent
          color={hormoneColor}
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>

      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
    </group>
  );
};
