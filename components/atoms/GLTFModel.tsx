import { useRef } from 'react';
import { useGLTF } from '@react-three/drei/native';
import * as THREE from 'three';
import { GLTF } from 'three-stdlib';

type GLTFModelProps = {
  modelPath: any;
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
};

/**
 * Componente atómico para renderizar un modelo GLTF individual
 * Carga y muestra un archivo .glb con posición y escala configurables
 */
export function GLTFModel({ 
  modelPath, 
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0],
}: GLTFModelProps) {
  const meshRef = useRef<THREE.Group>(null!);

  // Cargar modelo GLTF con tipo correcto
  const gltf = useGLTF(modelPath) as GLTF;

  return (
    <primitive
      ref={meshRef}
      object={gltf.scene.clone()}
      position={position}
      scale={scale}
      rotation={rotation}
    />
  );
}