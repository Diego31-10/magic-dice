import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from '../../components/atoms/Text';
import { Button } from '../../components/atoms/Button';
import { Icon } from '../../components/atoms/Icon';
import { useBurger } from '../../context/BurgerContext';
import { BurgerStack } from '../../components/molecules/BurgerStack';
import { PriceDisplay } from '../../components/molecules/PriceDisplay';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BurgerBuilder() {
  const { 
    ingredients, 
    addIngredient, 
    removeLastIngredient,
    clearBurger,
    canAddMore,
    ingredientCount,
    totalPrice, // ✅ NUEVO
  } = useBurger();

  return (
    <SafeAreaView style={styles.safe}>
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

      {/* ✅ NUEVO: Display de precios */}
      <PriceDisplay ingredients={ingredients} totalPrice={totalPrice} />

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
          <View style={styles.buttonContent}>
            <Text variant="body" bold>Meat</Text>
            <Text variant="caption" style={styles.priceTag}>$1.00</Text>
          </View>
        </Button>

        <Button
          onPress={() => addIngredient('queso')}
          variant="primary"
          size="small"
          disabled={!canAddMore}
          style={[styles.ingredientButton, { backgroundColor: '#FFD700' }]}
        >
          <Icon name="Pizza" size={20} color="#ffffff" />
          <View style={styles.buttonContent}>
            <Text variant="body" bold>Cheese</Text>
            <Text variant="caption" style={styles.priceTag}>$0.75</Text>
          </View>
        </Button>

        <Button
          onPress={() => addIngredient('lechuga')}
          variant="primary"
          size="small"
          disabled={!canAddMore}
          style={[styles.ingredientButton, { backgroundColor: '#90EE90' }]}
        >
          <Icon name="Salad" size={20} color="#ffffff" />
          <View style={styles.buttonContent}>
            <Text variant="body" bold>Lettuce</Text>
            <Text variant="caption" style={styles.priceTag}>$0.50</Text>
          </View>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#1a1a2e',
      },
      scrollView: {
        flex: 1,
      },
      container: {
        padding: 15,
        gap: 20,
        paddingBottom: 15,
    },
  viewer3D: {
    height: 350,
    backgroundColor: '#16213e',
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#6c5ce7',
    overflow: 'hidden',
  },
  buttonGroup: {
    gap: 10,
  },
  ingredientButton: {
    minWidth: 0,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  },
  buttonContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceTag: {
    color: '#ffffff',
    opacity: 0.9,
  },
  controlButtons: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
  
});