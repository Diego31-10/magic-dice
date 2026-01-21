import { View, StyleSheet } from 'react-native';
import { Text } from '../atoms/Text';
import { Icon } from '../atoms/Icon';
import { Ingredient, INGREDIENT_CONFIGS, BASE_BUN_PRICE } from '../../lib/types/burger.types';

type PriceDisplayProps = {
  ingredients: Ingredient[];
  totalPrice: number;
};

export function PriceDisplay({ ingredients, totalPrice }: PriceDisplayProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="Receipt" size={20} color="#6c5ce7" />
        <Text variant="body" color="accent" bold>
          Order Summary
        </Text>
      </View>

      {/* Lista de items */}
      <View style={styles.itemList}>
        {/* Panes base */}
        <View style={styles.item}>
          <Text variant="caption" color="secondary">
            Buns (Top + Bottom)
          </Text>
          <Text variant="caption" color="secondary">
            ${BASE_BUN_PRICE.toFixed(2)}
          </Text>
        </View>

        {/* Ingredientes */}
        {ingredients.length === 0 ? (
          <Text variant="caption" color="secondary" style={styles.emptyText}>
            No ingredients added yet
          </Text>
        ) : (
          ingredients.map((ing, index) => {
            const config = INGREDIENT_CONFIGS[ing];
            return (
              <View key={index} style={styles.item}>
                <Text variant="caption" color="secondary">
                  {config.name}
                </Text>
                <Text variant="caption" color="secondary">
                  ${config.price.toFixed(2)}
                </Text>
              </View>
            );
          })
        )}
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Total */}
      <View style={styles.totalRow}>
        <Text variant="body" color="primary" bold>
          Total:
        </Text>
        <Text variant="title" color="accent" bold style={styles.totalPrice}>
          ${totalPrice.toFixed(2)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#16213e',
    padding: 20,
    borderRadius: 15,
    gap: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 5,
  },
  itemList: {
    gap: 8,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  emptyText: {
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#2d3561',
    marginVertical: 5,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 5,
  },
  totalPrice: {
    fontSize: 28,
  },
});