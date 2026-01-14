/**
 * Mapeo de números del dado (1-6) a rotaciones en radianes
 * Cada número del dado corresponde a una rotación específica
 * para que esa cara quede hacia arriba
 */

export type DiceRotation = {
    x: number;
    y: number;
    z: number;
  };
  
  /**
   * Rotaciones para cada número del dado
   * Estas rotaciones asumen un modelo de dado estándar:
   * - 1 opuesto a 6
   * - 2 opuesto a 5
   * - 3 opuesto a 4
   */
  export const DICE_ROTATIONS: Record<number, DiceRotation> = {
    1: { x: 0, y: 0, z: 0 },                          // Cara 1 arriba
    2: { x: 0, y: 0, z: -Math.PI / 2 },              // Cara 2 arriba
    3: { x: 0, y: 0, z: Math.PI },                   // Cara 3 arriba
    4: { x: 0, y: 0, z: Math.PI / 2 },               // Cara 4 arriba
    5: { x: Math.PI / 2, y: 0, z: 0 },               // Cara 5 arriba
    6: { x: -Math.PI / 2, y: 0, z: 0 },              // Cara 6 arriba
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
      x: Math.random() * Math.PI * 2,
      y: Math.random() * Math.PI * 2,
      z: Math.random() * Math.PI * 2,
    };
  };