import { SHAKE_THRESHOLD } from '../constants';

/**
 * Tipo de dato que representa un vector tridimensional
 * Corresponde a los ejes X, Y, Z del acelerómetro
 */
export type Vector3 = {
  x: number;
  y: number;
  z: number;
};

/**
 * Calcula la magnitud euclidiana de un vector 3D
 * 
 * Fórmula: √(x² + y² + z²)
 * 
 * @param data - Vector con valores x, y, z del acelerómetro
 * @returns Magnitud del vector (intensidad del movimiento)
 * 
 * Ejemplo:
 * - En reposo: magnitud ≈ 1.0 (solo gravedad)
 * - Agitando: magnitud > 1.78 (movimiento + gravedad)
 */
export const calculateMagnitude = (data: Vector3): number => {
  return Math.sqrt(
    data.x ** 2 + 
    data.y ** 2 + 
    data.z ** 2
  );
};

/**
 * Determina si el dispositivo está siendo agitado
 * 
 * @param data - Vector con valores x, y, z del acelerómetro
 * @returns true si la magnitud supera el umbral, false en caso contrario
 * 
 * Lógica:
 * 1. Calcula la magnitud del vector de aceleración
 * 2. Compara contra SHAKE_THRESHOLD
 * 3. Si supera el umbral = shake detectado
 */
export const isShaking = (data: Vector3): boolean => {
  const magnitude = calculateMagnitude(data);
  return magnitude > SHAKE_THRESHOLD;
};