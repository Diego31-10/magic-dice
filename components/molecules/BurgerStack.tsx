import { useRef } from 'react';
import { useFrame } from '@react-three/fiber/native';
import { Canvas } from '@react-three/fiber/native';
import { Suspense } from 'react';
import * as THREE from 'three';
import { GLTFModel } from '../atoms/GLTFModel';
import { 
  Ingredient, 
  INGREDIENT_CONFIGS, 
  BUN_MODELS,
  BASE_BUN_HEIGHT,
  TOP_BUN_HEIGHT,
} from '../../lib/types/burger.types';

type BurgerStackProps = {
  ingredients: Ingredient[];
};

/**
 * Componente molecular que renderiza la pila completa de la hamburguesa
 * Calcula posiciones verticales automáticamente y aplica rotación continua
 */
function BurgerScene({ ingredients }: BurgerStackProps) {
  const groupRef = useRef<THREE.Group>(null!);

  // Rotación continua en eje Y
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005; // Rotación lenta
    }
  });

  // Calcular altura acumulada para apilar ingredientes
  const calculateYPosition = (index: number): number => {
    let totalHeight = BASE_BUN_HEIGHT;
    
    for (let i = 0; i < index; i++) {
      const ingredient = ingredients[i];
      totalHeight += INGREDIENT_CONFIGS[ingredient].height;
    }
    
    return totalHeight;
  };

  return (
    <>
      {/* Luces */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-5, -5, 5]} intensity={0.4} />

      {/* Grupo con rotación */}
      <group ref={groupRef}>
        {/* Pan de abajo (base) */}
        <GLTFModel 
          modelPath={BUN_MODELS.bottom}
          position={[0, 0, 0]}
          scale={1}
        />

        {/* Ingredientes apilados */}
        {ingredients.map((ingredient, index) => {
          const yPosition = calculateYPosition(index);
          
          return (
            <GLTFModel
              key={`${ingredient}-${index}`}
              modelPath={INGREDIENT_CONFIGS[ingredient].modelPath}
              position={[0, yPosition, 0]}
              scale={1}
            />
          );
        })}

        {/* Pan de arriba */}
        {ingredients.length > 0 && (
          <GLTFModel
            modelPath={BUN_MODELS.top}
            position={[0, calculateYPosition(ingredients.length), 0]}
            scale={1}
          />
        )}
      </group>
    </>
  );
}

export function BurgerStack({ ingredients }: BurgerStackProps) {
  return (
    <Canvas
      camera={{
        position: [0, 2, 5],
        fov: 50,
      }}
      gl={{ antialias: true }}
    >
      <Suspense fallback={null}>
        <BurgerScene ingredients={ingredients} />
      </Suspense>
    </Canvas>
  );
}