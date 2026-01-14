import { useEffect, useState } from 'react';
import { useLoader } from '@react-three/fiber/native';
import { Asset } from 'expo-asset';
import { GLTFLoader } from 'three-stdlib';

type DiceModelProps = {
  rotation: [number, number, number];
  scale?: number;
};

/**
 * Componente que carga y renderiza el modelo 3D del dado
 * Maneja la carga asíncrona del archivo .glb
 */
export function DiceModel({ rotation, scale = 1 }: DiceModelProps) {
  const [modelUri, setModelUri] = useState<string | null>(null);

  // Cargar el asset del modelo
  useEffect(() => {
    async function loadModel() {
      try {
        const asset = Asset.fromModule(require('../../../assets/models/dice.glb'));
        await asset.downloadAsync();
        setModelUri(asset.localUri || asset.uri);
      } catch (error) {
        console.error('Error cargando modelo 3D:', error);
      }
    }
    loadModel();
  }, []);

  // Cargar el modelo GLTF
  const gltf = modelUri ? useLoader(GLTFLoader, modelUri) : null;

  if (!gltf) {
    return null; // Mostrar nada mientras carga
  }

  return (
    <primitive
      object={gltf.scene}
      rotation={rotation}
      scale={scale}
    />
  );
}