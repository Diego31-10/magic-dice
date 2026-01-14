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
 * Props:
 * - number: Número del dado a mostrar (1-6)
 * - isShaking: Si el dado está siendo agitado
 * - style: Estilos personalizados del contenedor
 */
export function Dice3D({ 
  number = null, 
  isShaking = false,
  style 
}: Dice3DProps) {
  const { rotation, isAnimating } = useDiceAnimation(number, isShaking);

  return (
    <View style={[styles.container, style]}>
      <Scene 
        rotation={rotation}
        diceScale={2}
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