/**
 * Mapeo de números del dado (1-6) a rotaciones en radianes
 * NOTA: Estas rotaciones dependen de cómo esté orientado tu modelo dice.glb
 * Puede que necesites ajustarlas según tu modelo específico
 */

export type DiceRotation = {
  x: number;
  y: number;
  z: number;
};

/**
 * Rotaciones para cada número del dado
 * IMPORTANTE: Ajusta estos valores según tu modelo específico
 * 
 * Para calibrar:
 * 1. Pon el dado en 0,0,0 y ve qué número muestra
 * 2. Ajusta las rotaciones hasta que cada número se vea arriba
 */
export const DICE_ROTATIONS: Record<number, DiceRotation> = {
  1: { x: 0, y: -Math.PI / 2, z: 0 },
  2: { x: 0, y: 0, z: 0 },
  3: { x: -Math.PI / 2, y: 0, z: 0 },
  4: { x: Math.PI / 2, y: 0, z: 0 },
  5: { x: 0, y: Math.PI, z: 0 },
  6: { x: 0, y: Math.PI / 2, z: 0 },
};

/**
 * Obtiene la rotación correspondiente a un número del dado
 * @param number - Número del dado (1-6)
 * @returns Rotación en radianes para los ejes X, Y, Z
 */
export const getRotationForNumber = (number: number): DiceRotation => {
  if (number < 1 || number > 6) {
    console.warn(`Número inválido: ${number}. Usando 1 por defecto.`);
    return DICE_ROTATIONS[1];
  }
  return DICE_ROTATIONS[number];
};

/**
 * Genera una rotación aleatoria para simular el shake
 * @returns Rotación aleatoria en radianes
 */
export const getRandomRotation = (): DiceRotation => {
  return {
    x: Math.random() * Math.PI * 4 - Math.PI * 2, // -2π a 2π
    y: Math.random() * Math.PI * 4 - Math.PI * 2,
    z: Math.random() * Math.PI * 4 - Math.PI * 2,
  };
};