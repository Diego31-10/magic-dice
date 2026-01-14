import { MIN_DICE_VALUE, MAX_DICE_VALUE } from '../constants';

/**
 * Genera un número aleatorio entre min y max (inclusive)
 * 
 * @param min - Valor mínimo (por defecto 1)
 * @param max - Valor máximo (por defecto 6)
 * @returns Número entero aleatorio entre min y max
 * 
 * Ejemplo: generateRandomNumber(1, 6) puede retornar: 1, 2, 3, 4, 5 o 6
 */
export const generateRandomNumber = (
  min: number = MIN_DICE_VALUE,
  max: number = MAX_DICE_VALUE
): number => {
  // Math.random() genera 0.0 - 0.999...
  // Multiplicamos por (max - min + 1) para obtener el rango
  // Sumamos min para ajustar al rango deseado
  // Math.floor() redondea hacia abajo para obtener un entero
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Verifica si ha pasado suficiente tiempo desde el último shake
 * para evitar generaciones múltiples en una sola agitación
 * 
 * @param lastShakeTime - Timestamp del último shake detectado
 * @param cooldownMs - Tiempo mínimo entre shakes (por defecto 500ms)
 * @returns true si puede generar nuevo número, false si está en cooldown
 */
export const canGenerateNumber = (
  lastShakeTime: number | null,
  cooldownMs: number = 500
): boolean => {
  if (lastShakeTime === null) {
    return true; // Primera vez, puede generar
  }

  const now = Date.now();
  const timeSinceLastShake = now - lastShakeTime;
  
  return timeSinceLastShake >= cooldownMs;
};