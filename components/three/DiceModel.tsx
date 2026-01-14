import { useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber/native';
import { Asset } from 'expo-asset';
import { GLTFLoader } from 'three-stdlib';
import { useRef } from 'react';
import { DiceRotation } from './utils/rotations';
import * as THREE from 'three';

type DiceModelProps = {
  rotation: DiceRotation;
  scale?: number;
};

/**
 * Componente que carga y renderiza el modelo 3D del dado
 * Maneja la carga asíncrona del archivo .glb
 */
export function DiceModel({ rotation, scale = 1 }: DiceModelProps) {
  const [model, setModel] = useState<any>(null);
  const meshRef = useRef<THREE.Group | null>(null);

  // Cargar el modelo usando GLTFLoader de three-stdlib
  useEffect(() => {
    async function loadModel() {
      try {
        // Cargar asset
        const asset = Asset.fromModule(require('../../../assets/models/dice.glb'));
        await asset.downloadAsync();
        
        // Crear loader
        const loader = new GLTFLoader();
        
        // Cargar modelo
        loader.load(
          asset.localUri || asset.uri,
          (gltf) => {
            setModel(gltf.scene);
          },
          undefined,
          (error) => {
            console.error('Error cargando modelo 3D:', error);
          }
        );
      } catch (error) {
        console.error('Error al preparar asset:', error);
      }
    }
    loadModel();
  }, []);

  // Actualizar rotación suavemente en cada frame
  useFrame(() => {
    if (meshRef.current) {
      // Interpolar hacia la rotación objetivo (suavizado)
      meshRef.current.rotation.x += (rotation.x - meshRef.current.rotation.x) * 0.1;
      meshRef.current.rotation.y += (rotation.y - meshRef.current.rotation.y) * 0.1;
      meshRef.current.rotation.z += (rotation.z - meshRef.current.rotation.z) * 0.1;
    }
  });

  if (!model) {
    return null; // Mostrar nada mientras carga
  }

  return (
    <primitive
      ref={meshRef}
      object={model}
      scale={scale}
    />
  );
}