import { View, Text, StyleSheet } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import { useAccelerometer } from '../../lib/modules/sensors/accelerometer/useAccelerometer';
import { isShaking, calculateMagnitude } from '../../lib/core/logic/motion';
import { generateRandomNumber, canGenerateNumber } from '../../lib/core/logic/dice';
import { SHAKE_THRESHOLD, SHAKE_COOLDOWN } from '../../lib/core/constants';

export default function DiceGame() {
  const { data, isAvailable } = useAccelerometer();
  
  // Estado del juego
  const [diceNumber, setDiceNumber] = useState<number | null>(null);
  const [lastShakeTime, setLastShakeTime] = useState<number | null>(null);
  const [isInCooldown, setIsInCooldown] = useState(false);

  // Calcular magnitud y detectar shake
  const magnitude = calculateMagnitude(data);
  const shakeDetected = isShaking(data);

  // Efecto para generar número cuando se detecta shake
  useEffect(() => {
    if (shakeDetected && canGenerateNumber(lastShakeTime, SHAKE_COOLDOWN)) {
      // Generar nuevo número
      const newNumber = generateRandomNumber();
      setDiceNumber(newNumber);
      
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
      
      {/* Resultado del dado */}
      <View style={styles.resultContainer}>
        {diceNumber === null ? (
          <>
            <Text style={styles.waitingIcon}>🎲</Text>
            <Text style={styles.waitingText}>Agita el dispositivo</Text>
          </>
        ) : (
          <>
            <Text style={styles.diceNumber}>{diceNumber}</Text>
            <Text style={styles.resultLabel}>Resultado</Text>
          </>
        )}
      </View>

      {/* Indicador de cooldown */}
      {isInCooldown && (
        <View style={styles.cooldownIndicator}>
          <Text style={styles.cooldownText}>⏱️ Cooldown activo...</Text>
        </View>
      )}

      {/* Indicador de shake */}
      <View style={[
        styles.shakeIndicator, 
        shakeDetected && !isInCooldown && styles.shakeIndicatorActive
      ]}>
        <Text style={styles.shakeText}>
          {shakeDetected && !isInCooldown ? '🔥 SHAKE!' : '⏳ En espera...'}
        </Text>
      </View>

      {/* Información del sensor (para debug) */}
      <View style={styles.debugContainer}>
        <Text style={styles.debugTitle}>Debug Info:</Text>
        
        <View style={styles.debugRow}>
          <Text style={styles.debugLabel}>Magnitud:</Text>
          <Text style={[
            styles.debugValue,
            magnitude > SHAKE_THRESHOLD && styles.debugValueHigh
          ]}>
            {magnitude.toFixed(3)}
          </Text>
        </View>

        <View style={styles.debugRow}>
          <Text style={styles.debugLabel}>Umbral:</Text>
          <Text style={styles.debugValue}>{SHAKE_THRESHOLD.toFixed(3)}</Text>
        </View>

        <View style={styles.debugRow}>
          <Text style={styles.debugLabel}>X / Y / Z:</Text>
          <Text style={styles.debugValue}>
            {data.x.toFixed(2)} / {data.y.toFixed(2)} / {data.z.toFixed(2)}
          </Text>
        </View>
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
    marginBottom: 40,
  },
  resultContainer: {
    backgroundColor: '#16213e',
    width: 200,
    height: 200,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    borderWidth: 3,
    borderColor: '#6c5ce7',
  },
  waitingIcon: {
    fontSize: 64,
    marginBottom: 10,
  },
  waitingText: {
    fontSize: 16,
    color: '#a0a0a0',
    textAlign: 'center',
  },
  diceNumber: {
    fontSize: 96,
    color: '#6c5ce7',
    fontWeight: 'bold',
  },
  resultLabel: {
    fontSize: 14,
    color: '#a0a0a0',
    marginTop: 10,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  cooldownIndicator: {
    backgroundColor: '#ff6b6b',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 15,
  },
  cooldownText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  shakeIndicator: {
    backgroundColor: '#16213e',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 30,
    borderWidth: 2,
    borderColor: '#2d3561',
  },
  shakeIndicatorActive: {
    backgroundColor: '#6c5ce7',
    borderColor: '#a29bfe',
  },
  shakeText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  debugContainer: {
    backgroundColor: '#16213e',
    padding: 20,
    borderRadius: 15,
    width: '100%',
    maxWidth: 350,
  },
  debugTitle: {
    fontSize: 12,
    color: '#636e72',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  debugRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  debugLabel: {
    fontSize: 12,
    color: '#a0a0a0',
  },
  debugValue: {
    fontSize: 12,
    color: '#74b9ff',
    fontFamily: 'monospace',
  },
  debugValueHigh: {
    color: '#00b894',
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