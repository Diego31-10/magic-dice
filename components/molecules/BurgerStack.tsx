import { useRef, useMemo } from 'react';
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
 * Calcula posiciones verticales automáticamente y centra la hamburguesa
 */
function BurgerScene({ ingredients }: BurgerStackProps) {
  const groupRef = useRef<THREE.Group>(null!);

  // Rotación continua en eje Y
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.013;//Velocidad de girox
    }
  });

  // Calcular altura total de la hamburguesa (SIEMPRE incluye ambos panes)
  const totalHeight = useMemo(() => {
    let height = BASE_BUN_HEIGHT + TOP_BUN_HEIGHT; // ✅ Ambos panes siempre
    
    // Sumar altura de cada ingrediente
    ingredients.forEach(ingredient => {
      height += INGREDIENT_CONFIGS[ingredient].height;
    });
    
    return height;
  }, [ingredients]);

  // Offset para centrar (la mitad de la altura total)
  const centerOffset = -totalHeight / 2;

  // Calcular posición Y para cada elemento (relativa al centro)
  const calculateYPosition = (index: number): number => {
    let yPosition = centerOffset + BASE_BUN_HEIGHT;
    
    for (let i = 0; i < index; i++) {
      const ingredient = ingredients[i];
      yPosition += INGREDIENT_CONFIGS[ingredient].height;
    }
    
    return yPosition;
  };

  // Posición del pan superior (calculada dinámicamente)
  const topBunYPosition = useMemo(() => {
    let yPosition = centerOffset + BASE_BUN_HEIGHT;
    
    // Sumar altura de todos los ingredientes
    ingredients.forEach(ingredient => {
      yPosition += INGREDIENT_CONFIGS[ingredient].height;
    });
    
    return yPosition;
  }, [ingredients, centerOffset]);

  return (
    <>
      {/* Luces */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-5, -5, 5]} intensity={0.4} />

      {/* Grupo con rotación - ahora centrado */}
      <group ref={groupRef}>
        {/* Pan de abajo (base) - SIEMPRE visible */}
        <GLTFModel 
          modelPath={BUN_MODELS.bottom}
          position={[0, centerOffset, 0]}
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

        {/* Pan de arriba - ✅ SIEMPRE visible (incluso sin ingredientes) */}
        <GLTFModel
          modelPath={BUN_MODELS.top}
          position={[0, topBunYPosition, 0]}
          scale={1}
        />
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