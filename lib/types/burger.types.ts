/**
 * Tipos para el sistema de hamburguesas
 */

// Imports de modelos
import panArribaModel from '../../assets/models/burger/panSuperior.glb';
import carneModel from '../../assets/models/burger/carne.glb';
import quesoModel from '../../assets/models/burger/queso.glb';
import lechugaModel from '../../assets/models/burger/lechuga.glb';
import panAbajoModel from '../../assets/models/burger/panInferior.glb';

export type Ingredient = 'carne' | 'queso' | 'lechuga';

export type IngredientConfig = {
  type: Ingredient;
  name: string;
  modelPath: any;
  height: number;
  color: string;
  price: number; // ✅ NUEVO
};

export const INGREDIENT_CONFIGS: Record<Ingredient, IngredientConfig> = {
  carne: {
    type: 'carne',
    name: 'Meat',
    modelPath: carneModel,
    height: 0.3,
    color: '#8B4513',
    price: 1.00, // ✅ NUEVO
  },
  queso: {
    type: 'queso',
    name: 'Cheese',
    modelPath: quesoModel,
    height: 0.2,
    color: '#FFD700',
    price: 0.75, // ✅ NUEVO
  },
  lechuga: {
    type: 'lechuga',
    name: 'Lettuce',
    modelPath: lechugaModel,
    height: 0.15,
    color: '#90EE90',
    price: 0.50, // ✅ NUEVO
  },
};

// Modelos de panes
export const BUN_MODELS = {
  top: panArribaModel,
  bottom: panAbajoModel,
};

// Precio base de los panes
export const BASE_BUN_PRICE = 1; // ✅ NUEVO

export const MAX_INGREDIENTS = 7;

export const BASE_BUN_HEIGHT = 0.4;
export const TOP_BUN_HEIGHT = 0.4;