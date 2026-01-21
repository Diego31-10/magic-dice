import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from '../../components/atoms/Text';
import { Button } from '../../components/atoms/Button';
import { Icon } from '../../components/atoms/Icon';
import { useBurger } from '../../context/BurgerContext';
import { BurgerStack } from '../../components/molecules/BurgerStack';
import { INGREDIENT_CONFIGS } from '../../lib/types/burger.types';

export default function BurgerBuilder() {
  const { 
    ingredients, 
    addIngredient, 
    removeLastIngredient,
    clearBurger,
    canAddMore,
    ingredientCount 
  } = useBurger();

  return (
    <ScrollView 
      style={styles.scrollView}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text variant="title" align="center">
        Burger Builder
      </Text>

      {/* Visualizador 3D */}
      <View style={styles.viewer3D}>
        <BurgerStack ingredients={ingredients} />
      </View>

      {/* Lista de ingredientes */}
      <View style={styles.ingredientList}>
        <Text variant="body" color="accent" bold>
          Ingredients ({ingredientCount}/7):
        </Text>
        {ingredients.length === 0 ? (
          <Text variant="caption" color="secondary">
            No ingredients yet - Add some below!
          </Text>
        ) : (
          ingredients.map((ing, index) => (
            <Text key={index} variant="caption" color="secondary">
              {index + 1}. {INGREDIENT_CONFIGS[ing].name}
            </Text>
          ))
        )}
      </View>

      {/* Botones de ingredientes */}
      <View style={styles.buttonGroup}>
        <Text variant="label" color="secondary">Add Ingredients:</Text>
        
        <Button
          onPress={() => addIngredient('carne')}
          variant="primary"
          size="small"
          disabled={!canAddMore}
          style={[styles.ingredientButton, { backgroundColor: '#8B4513' }]}
        >
          <Icon name="Beef" size={20} color="#ffffff" />
          <Text variant="body" bold>Meat</Text>
        </Button>

        <Button
          onPress={() => addIngredient('queso')}
          variant="primary"
          size="small"
          disabled={!canAddMore}
          style={[styles.ingredientButton, { backgroundColor: '#FFD700' }]}
        >
          <Icon name="Pizza" size={20} color="#ffffff" />
          <Text variant="body" bold>Cheese</Text>
        </Button>

        <Button
          onPress={() => addIngredient('lechuga')}
          variant="primary"
          size="small"
          disabled={!canAddMore}
          style={[styles.ingredientButton, { backgroundColor: '#90EE90' }]}
        >
          <Icon name="Salad" size={20} color="#ffffff" />
          <Text variant="body" bold>Lettuce</Text>
        </Button>
      </View>

      {/* Botones de control */}
      <View style={styles.controlButtons}>
        <Button
          onPress={removeLastIngredient}
          variant="secondary"
          size="small"
          disabled={ingredientCount === 0}
        >
          <Icon name="Undo" size={16} color="#ffffff" />
          <Text variant="caption" bold>Remove Last</Text>
        </Button>

        <Button
          onPress={clearBurger}
          variant="secondary"
          size="small"
          disabled={ingredientCount === 0}
        >
          <Icon name="RotateCcw" size={16} color="#ffffff" />
          <Text variant="caption" bold>Clear All</Text>
        </Button>
      </View>

      {!canAddMore && (
        <Text variant="caption" color="error" align="center">
          Maximum ingredients reached!
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  container: {
    padding: 20,
    gap: 20,
    paddingBottom: 40,
  },
  viewer3D: {
    height: 350,
    backgroundColor: '#16213e',
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#6c5ce7',
    overflow: 'hidden',
  },
  ingredientList: {
    backgroundColor: '#16213e',
    padding: 15,
    borderRadius: 10,
    gap: 5,
  },
  buttonGroup: {
    gap: 10,
  },
  ingredientButton: {
    minWidth: 0,
  },
  controlButtons: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
});