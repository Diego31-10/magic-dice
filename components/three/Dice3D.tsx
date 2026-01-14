import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Scene } from './Scene';
import { useState, useEffect } from 'react';
import { getRotationForNumber } from './utils/rotations'; // ✅ Esta ruta está correcta

type Dice3DProps = {
  number?: number | null;
  isAnimating?: boolean;
  style?: StyleProp<ViewStyle>;
};

/**
 * Componente principal del dado 3D
 * Props:
 * - number: Número del dado a mostrar (1-6)
 * - isAnimating: Si el dado está en animación
 * - style: Estilos personalizados del contenedor
 */
export function Dice3D({ 
  number = null, 
  isAnimating = false,
  style 
}: Dice3DProps) {
  const [rotation, setRotation] = useState<[number, number, number]>([0, 0, 0]);

  // Actualizar rotación cuando cambia el número
  useEffect(() => {
    if (number !== null) {
      const targetRotation = getRotationForNumber(number);
      setRotation([targetRotation.x, targetRotation.y, targetRotation.z]);
    }
  }, [number]);

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
