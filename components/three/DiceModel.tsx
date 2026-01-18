import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber/native';
import { useGLTF } from '@react-three/drei/native';
import * as THREE from 'three';
import { DiceRotation } from './utils/rotations';
import { GLTF } from 'three-stdlib';

type DiceModelProps = {
  rotation: DiceRotation;
  scale?: number;
  isAnimating?: boolean;
};

export function DiceModel({
  rotation,
  scale = 1,
  isAnimating = false,
}: DiceModelProps) {
  const meshRef = useRef<THREE.Group>(null!);

  const gltf = useGLTF(
    require('../../assets/models/dice.glb')
  ) as GLTF;

  // 🎲 INTERPOLACIÓN SOLO DURANTE SHAKE
  useFrame(() => {
    if (!meshRef.current) return;
  
    const current = meshRef.current.rotation;
    const target = rotation;
  
    // velocidad más lenta
    const speed = 0.08;
  
    current.x += (target.x - current.x) * speed;
    current.y += (target.y - current.y) * speed;
    current.z += (target.z - current.z) * speed;
  
    // 🎯 rebote sutil
    const epsilon = 0.005;
  
    if (
      Math.abs(current.x - target.x) < epsilon &&
      Math.abs(current.y - target.y) < epsilon &&
      Math.abs(current.z - target.z) < epsilon
    ) {
      current.set(
        target.x + 0.04,
        target.y,
        target.z
      );
  
      setTimeout(() => {
        current.set(target.x, target.y, target.z);
      }, 60);
    }
  });
  
  

  return (
    <primitive
      ref={meshRef}
      object={gltf.scene}   // 👈 MUY IMPORTANTE
      scale={scale}
    />
  );
}

useGLTF.preload(
  require('../../assets/models/dice.glb')
);
