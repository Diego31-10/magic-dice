import { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { 
  Ingredient, 
  MAX_INGREDIENTS, 
  INGREDIENT_CONFIGS,
  BASE_BUN_PRICE 
} from '../lib/types/burger.types';

type BurgerContextType = {
  ingredients: Ingredient[];
  addIngredient: (ingredient: Ingredient) => void;
  removeLastIngredient: () => void;
  clearBurger: () => void;
  canAddMore: boolean;
  ingredientCount: number;
  totalPrice: number; // ✅ NUEVO
};

const BurgerContext = createContext<BurgerContextType | undefined>(undefined);

type BurgerProviderProps = {
  children: ReactNode;
};

export function BurgerProvider({ children }: BurgerProviderProps) {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const addIngredient = (ingredient: Ingredient) => {
    if (ingredients.length < MAX_INGREDIENTS) {
      setIngredients(prev => [...prev, ingredient]);
      console.log(`Ingrediente agregado: ${ingredient}`);
    } else {
      console.warn(`Máximo de ingredientes alcanzado (${MAX_INGREDIENTS})`);
    }
  };

  const removeLastIngredient = () => {
    if (ingredients.length > 0) {
      setIngredients(prev => prev.slice(0, -1));
      console.log('Último ingrediente removido');
    }
  };

  const clearBurger = () => {
    setIngredients([]);
    console.log('Hamburguesa reiniciada');
  };

  const canAddMore = ingredients.length < MAX_INGREDIENTS;
  const ingredientCount = ingredients.length;

  // ✅ NUEVO: Calcular precio total
  const totalPrice = useMemo(() => {
    // Precio base de los panes
    let price = BASE_BUN_PRICE;
    
    // Sumar precio de cada ingrediente
    ingredients.forEach(ingredient => {
      price += INGREDIENT_CONFIGS[ingredient].price;
    });
    
    return price;
  }, [ingredients]);

  return (
    <BurgerContext.Provider
      value={{
        ingredients,
        addIngredient,
        removeLastIngredient,
        clearBurger,
        canAddMore,
        ingredientCount,
        totalPrice, // ✅ NUEVO
      }}
    >
      {children}
    </BurgerContext.Provider>
  );
}

export function useBurger() {
  const context = useContext(BurgerContext);
  
  if (context === undefined) {
    throw new Error('useBurger must be used within a BurgerProvider');
  }
  
  return context;
}