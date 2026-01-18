import { Canvas } from '@react-three/fiber/native';
import { Suspense } from 'react';
import { DiceModel } from './DiceModel';
import { DiceRotation } from './utils/rotations';

type SceneProps = {
  rotation: DiceRotation;
  diceScale?: number;
  isAnimating?: boolean; // Nuevo
};

/**
 * Componente de escena Three.js
 * Configura cámara, luces y renderiza el dado
 */
export function Scene({ rotation, diceScale = 2, isAnimating = false }: SceneProps) {
  return (
    <Canvas
      camera={{
        position: [0, 0, 8],
        fov: 50,
      }}
      gl={{ antialias: true }}
    >
      {/* Luz ambiental suave */}
      <ambientLight intensity={0.5} />
      
      {/* Luz direccional principal */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
      />
      
      {/* Luz de relleno */}
      <directionalLight
        position={[-5, -5, 5]}
        intensity={0.3}
      />

      {/* Modelo del dado con Suspense para carga asíncrona */}
      <Suspense fallback={null}>
        <DiceModel 
          rotation={rotation} 
          scale={diceScale}
          isAnimating={isAnimating} 
        />
      </Suspense>
    </Canvas>
  );
}