/**
 * Tipos para el sistema de hamburguesas
 */

export type Ingredient = 'carne' | 'queso' | 'lechuga';

export type IngredientConfig = {
  type: Ingredient;
  name: string;
  modelPath: any; // Asset del modelo
  height: number; // Altura aproximada para apilamiento
  color: string;  // Color del botón
};

export const INGREDIENT_CONFIGS: Record<Ingredient, IngredientConfig> = {
  carne: {
    type: 'carne',
    name: 'Meat',
    modelPath: null, // Se llenará en la fase 2
    height: 0.3,
    color: '#8B4513',
  },
  queso: {
    type: 'queso',
    name: 'Cheese',
    modelPath: null,
    height: 0.2,
    color: '#FFD700',
  },
  lechuga: {
    type: 'lechuga',
    name: 'Lettuce',
    modelPath: null,
    height: 0.15,
    color: '#90EE90',
  },
};

export const MAX_INGREDIENTS = 7;

export const BASE_BUN_HEIGHT = 0.4;
export const TOP_BUN_HEIGHT = 0.4;