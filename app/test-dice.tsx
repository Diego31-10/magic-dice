import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useState } from 'react';
import { Dice3D } from '../components/three/Dice3D';
import { useRouter } from 'expo-router';

export default function TestDice() {
  const router = useRouter();
  const [testNumber, setTestNumber] = useState<number>(1);

  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>← Volver</Text>
      </Pressable>

      <Text style={styles.title}>🎲 Calibrador de Dado</Text>
      
      <View style={styles.diceContainer}>
        <Dice3D 
          number={testNumber}
          isShaking={false}
        />
      </View>

      <Text style={styles.currentNumber}>
        Mostrando número: {testNumber}
      </Text>

      <View style={styles.buttonGrid}>
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <Pressable
            key={num}
            style={[styles.button, testNumber === num && styles.buttonActive]}
            onPress={() => {
              console.log('Cambiando a número:', num);
              setTestNumber(num);
            }}
          >
            <Text style={styles.buttonText}>{num}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.instructionsBox}>
        <Text style={styles.instructionsTitle}>📝 Instrucciones:</Text>
        <Text style={styles.instructions}>
          1. Presiona cada número (1-6){'\n'}
          2. Verifica que la cara correcta esté arriba{'\n'}
          3. Si no coincide, ajusta rotations.ts{'\n'}
          4. Reinicia la app y prueba de nuevo
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    padding: 20,
  },
  backButton: {
    marginTop: 40,
    marginBottom: 10,
  },
  backText: {
    color: '#6c5ce7',
    fontSize: 16,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  diceContainer: {
    width: '100%',
    height: 300,
    marginBottom: 20,
    backgroundColor: '#16213e',
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#6c5ce7',
  },
  currentNumber: {
    fontSize: 24,
    color: '#6c5ce7',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 15,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#16213e',
    width: 70,
    height: 70,
    borderRadius: 15,
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
    fontSize: 28,
    fontWeight: 'bold',
  },
  instructionsBox: {
    backgroundColor: '#16213e',
    padding: 20,
    borderRadius: 15,
  },
  instructionsTitle: {
    color: '#6c5ce7',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  instructions: {
    color: '#a0a0a0',
    fontSize: 14,
    lineHeight: 22,
  },
});