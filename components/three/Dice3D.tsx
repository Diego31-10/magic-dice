import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Scene } from './Scene';
import { useDiceAnimation } from './hooks/useDiceAnimation';

type Dice3DProps = {
  number?: number | null;
  isShaking?: boolean;
  style?: StyleProp<ViewStyle>;
};

/**
 * Componente principal del dado 3D
 */
export function Dice3D({ 
  number = null, 
  isShaking = false,
  style 
}: Dice3DProps) {
  const rotation = useDiceAnimation(number, isShaking);

  return (
    <View style={[styles.container, style]}>
      <Scene 
        rotation={rotation}
        diceScale={2}
        isAnimating={isShaking} // Pasar estado de animación
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});