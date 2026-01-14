import { useState, useEffect, useRef } from 'react';
import { getRotationForNumber, getRandomRotation, DiceRotation } from '../utils/rotations';
import { ANIMATION_DURATION } from '../../../lib/core/constants';

type AnimationState = 'idle' | 'shaking' | 'settling';

export function useDiceAnimation(targetNumber: number | null, isShaking: boolean) {
  const [rotation, setRotation] = useState<DiceRotation>({ x: 0, y: 0, z: 0 });
  const [animationState, setAnimationState] = useState<AnimationState>('idle');
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    // Si está agitando, hacer rotaciones aleatorias rápidas
    if (isShaking && animationState !== 'shaking') {
      setAnimationState('shaking');
      startTimeRef.current = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTimeRef.current;
        
        if (elapsed < 800) { // 800ms de rotación rápida
          // Generar rotación aleatoria
          const randomRot = getRandomRotation();
          setRotation(randomRot);
          animationFrameRef.current = requestAnimationFrame(animate);
        } else {
          // Terminar fase de shake
          setAnimationState('settling');
        }
      };
      
      animate();
    }

    // Cuando termina el shake, interpolar hacia el número final
    if (animationState === 'settling' && targetNumber !== null) {
      const targetRot = getRotationForNumber(targetNumber);
      const startRot = rotation;
      startTimeRef.current = Date.now();
      
      const settle = () => {
        const elapsed = Date.now() - startTimeRef.current;
        const duration = 700; // 700ms para asentarse
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out cubic para desaceleración suave
        const eased = 1 - Math.pow(1 - progress, 3);
        
        // Interpolar rotación
        const currentRot: DiceRotation = {
          x: startRot.x + (targetRot.x - startRot.x) * eased,
          y: startRot.y + (targetRot.y - startRot.y) * eased,
          z: startRot.z + (targetRot.z - startRot.z) * eased,
        };
        
        setRotation(currentRot);
        
        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(settle);
        } else {
          setAnimationState('idle');
        }
      };
      
      settle();
    }

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isShaking, targetNumber, animationState]);

  return {
    rotation,
    isAnimating: animationState !== 'idle',
  };
}