/**
 * Constantes de configuración del proyecto
 */

/**
 * SHAKE_THRESHOLD: Umbral de detección de agitación
 * 
 * Valor: 1.78g
 * 
 * Razón:
 * - En reposo, el acelerómetro detecta ~1g (gravedad terrestre)
 * - Un valor > 1g indica movimiento adicional
 * - 1.78g es suficiente para detectar una agitación intencional
 * - Evita falsos positivos por movimientos sutiles
 * 
 * Ajustar según sensibilidad deseada:
 * - Valores bajos (1.3 - 1.5): Más sensible, puede dar falsos positivos
 * - Valores altos (2.0 - 2.5): Menos sensible, requiere agitación fuerte
 */
export const SHAKE_THRESHOLD = 1.78;

/**
 * Valores del dado
 */
export const MIN_DICE_VALUE = 1;
export const MAX_DICE_VALUE = 6;

/**
 * SHAKE_COOLDOWN: Tiempo mínimo entre detecciones de shake (en milisegundos)
 * 
 * Valor: 500ms
 * 
 * Razón:
 * - Evita que una sola agitación genere múltiples números
 * - El acelerómetro se actualiza 10 veces por segundo (cada 100ms)
 * - Una agitación típica dura 200-400ms
 * - 500ms es suficiente para distinguir entre agitaciones separadas
 */
export const SHAKE_COOLDOWN = 500;