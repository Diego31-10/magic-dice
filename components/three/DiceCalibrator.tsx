import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useState } from 'react';
import { Dice3D } from './Dice3D';

/**
 * Componente para calibrar las rotaciones del dado
 * Usa esto para encontrar las rotaciones correctas de tu modelo
 */
export function DiceCalibrator() {
  const [testNumber, setTestNumber] = useState(1);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calibrador de Dado</Text>
      
      <View style={styles.diceContainer}>
        <Dice3D 
          number={testNumber}
          isShaking={false}
        />
      </View>

      <Text style={styles.currentNumber}>Mostrando: {testNumber}</Text>

      <View style={styles.buttonGrid}>
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <Pressable
            key={num}
            style={[styles.button, testNumber === num && styles.buttonActive]}
            onPress={() => setTestNumber(num)}
          >
            <Text style={styles.buttonText}>{num}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.instructions}>
        Presiona cada número y verifica que la cara correcta esté arriba.
        Si no coincide, ajusta las rotaciones en rotations.ts
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  diceContainer: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
  currentNumber: {
    fontSize: 20,
    color: '#6c5ce7',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#16213e',
    width: 60,
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#2d3561',
  },
  buttonActive: {
    backgroundColor: '#6c5ce7',
    borderColor: '#a29bfe',
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  instructions: {
    color: '#a0a0a0',
    textAlign: 'center',
    fontSize: 12,
  },
});