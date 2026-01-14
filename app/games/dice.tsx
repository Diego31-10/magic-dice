import { View, Text, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { useAccelerometer } from '../../lib/modules/sensors/accelerometer/useAccelerometer';
import { isShaking, calculateMagnitude } from '../../lib/core/logic/motion';
import { generateRandomNumber, canGenerateNumber } from '../../lib/core/logic/dice';
import { SHAKE_THRESHOLD, SHAKE_COOLDOWN } from '../../lib/core/constants';
import { Dice3D } from '../../components/three/Dice3D';

export default function DiceGame() {
  const { data, isAvailable } = useAccelerometer();
  
  // Estado del juego
  const [diceNumber, setDiceNumber] = useState<number | null>(null);
  const [lastShakeTime, setLastShakeTime] = useState<number | null>(null);
  const [isInCooldown, setIsInCooldown] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Calcular magnitud y detectar shake
  const magnitude = calculateMagnitude(data);
  const shakeDetected = isShaking(data);

  // Efecto para generar número cuando se detecta shake
  useEffect(() => {
    if (shakeDetected && canGenerateNumber(lastShakeTime, SHAKE_COOLDOWN)) {
      // Activar animación
      setIsAnimating(true);

      // Generar nuevo número después de un breve delay
      setTimeout(() => {
        const newNumber = generateRandomNumber();
        setDiceNumber(newNumber);
        setIsAnimating(false);
      }, 800);
      
      // Actualizar tiempo del último shake
      const now = Date.now();
      setLastShakeTime(now);
      
      // Activar cooldown visual
      setIsInCooldown(true);
      
      // Desactivar cooldown después del tiempo configurado
      setTimeout(() => {
        setIsInCooldown(false);
      }, SHAKE_COOLDOWN);
    }
  }, [shakeDetected, lastShakeTime]);

  if (!isAvailable) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>❌ Acelerómetro no disponible</Text>
        <Text style={styles.errorSubtext}>
          Este dispositivo no soporta el sensor requerido
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎲 Magic Dice</Text>
      
      {/* Contenedor del dado 3D */}
      <View style={styles.diceContainer}>
        <Dice3D 
          number={diceNumber}
          isAnimating={isAnimating}
          style={styles.dice3D}
        />
      </View>

      {/* Resultado numérico */}
      {diceNumber !== null && !isAnimating && (
        <View style={styles.resultBadge}>
          <Text style={styles.resultNumber}>{diceNumber}</Text>
        </View>
      )}

      {/* Indicador de estado */}
      <View style={styles.statusContainer}>
        {isAnimating ? (
          <Text style={styles.statusText}>🎲 Rodando...</Text>
        ) : isInCooldown ? (
          <Text style={styles.statusText}>⏱️ Cooldown...</Text>
        ) : diceNumber === null ? (
          <Text style={styles.statusText}>📱 Agita el dispositivo</Text>
        ) : (
          <Text style={styles.statusText}>✨ Resultado: {diceNumber}</Text>
        )}
      </View>

      {/* Información de debug (opcional - puedes quitarla) */}
      <View style={styles.debugContainer}>
        <Text style={styles.debugTitle}>Debug:</Text>
        <Text style={styles.debugText}>
          Magnitud: {magnitude.toFixed(3)} / Umbral: {SHAKE_THRESHOLD}
        </Text>
        <Text style={styles.debugText}>
          X: {data.x.toFixed(2)} Y: {data.y.toFixed(2)} Z: {data.z.toFixed(2)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 36,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  diceContainer: {
    width: 300,
    height: 300,
    backgroundColor: '#16213e',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#6c5ce7',
  },
  dice3D: {
    width: '100%',
    height: '100%',
  },
  resultBadge: {
    backgroundColor: '#6c5ce7',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  resultNumber: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
  },
  statusContainer: {
    backgroundColor: '#16213e',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 30,
  },
  statusText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  debugContainer: {
    backgroundColor: '#16213e',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    maxWidth: 350,
  },
  debugTitle: {
    fontSize: 12,
    color: '#636e72',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  debugText: {
    fontSize: 11,
    color: '#a0a0a0',
    fontFamily: 'monospace',
    marginBottom: 3,
  },
  errorText: {
    fontSize: 24,
    color: '#ff6b6b',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  errorSubtext: {
    fontSize: 14,
    color: '#a0a0a0',
    textAlign: 'center',
  },
});
