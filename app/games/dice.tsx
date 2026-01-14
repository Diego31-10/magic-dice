import { View, Text, StyleSheet } from 'react-native';
import { useAccelerometer } from '../../lib/modules/sensors/accelerometer/useAccelerometer';
import { isShaking, calculateMagnitude } from '../../lib/core/logic/motion';
import { SHAKE_THRESHOLD } from '../../lib/core/constants';

export default function DiceGame() {
  const { data, isAvailable } = useAccelerometer();

  // Calcular magnitud y detectar shake
  const magnitude = calculateMagnitude(data);
  const shakeDetected = isShaking(data);

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
      
      {/* Indicador visual de shake */}
      <View style={[
        styles.shakeIndicator, 
        shakeDetected && styles.shakeIndicatorActive
      ]}>
        <Text style={styles.shakeText}>
          {shakeDetected ? '🔥 SHAKE DETECTADO!' : '⏳ En espera...'}
        </Text>
      </View>

      {/* Información del sensor */}
      <View style={styles.dataContainer}>
        <Text style={styles.sectionTitle}>Valores del Sensor:</Text>
        
        <View style={styles.valueRow}>
          <Text style={styles.axis}>X:</Text>
          <Text style={styles.value}>{data.x.toFixed(3)}</Text>
        </View>
        
        <View style={styles.valueRow}>
          <Text style={styles.axis}>Y:</Text>
          <Text style={styles.value}>{data.y.toFixed(3)}</Text>
        </View>
        
        <View style={styles.valueRow}>
          <Text style={styles.axis}>Z:</Text>
          <Text style={styles.value}>{data.z.toFixed(3)}</Text>
        </View>

        <View style={styles.divider} />

        {/* Magnitud calculada */}
        <View style={styles.magnitudeRow}>
          <Text style={styles.magnitudeLabel}>Magnitud:</Text>
          <Text style={[
            styles.magnitudeValue,
            magnitude > SHAKE_THRESHOLD && styles.magnitudeValueHigh
          ]}>
            {magnitude.toFixed(3)}
          </Text>
        </View>

        <View style={styles.thresholdRow}>
          <Text style={styles.thresholdLabel}>Umbral:</Text>
          <Text style={styles.thresholdValue}>{SHAKE_THRESHOLD.toFixed(3)}</Text>
        </View>
      </View>

      <Text style={styles.instruction}>
        📱 Agita el dispositivo para detectar shake
      </Text>
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
    marginBottom: 30,
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
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  dataContainer: {
    backgroundColor: '#16213e',
    padding: 25,
    borderRadius: 15,
    width: '100%',
    maxWidth: 350,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#a0a0a0',
    marginBottom: 15,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  valueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  axis: {
    fontSize: 20,
    color: '#6c5ce7',
    fontWeight: 'bold',
    width: 40,
  },
  value: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'monospace',
    flex: 1,
    textAlign: 'right',
  },
  divider: {
    height: 1,
    backgroundColor: '#2d3561',
    marginVertical: 15,
  },
  magnitudeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  magnitudeLabel: {
    fontSize: 16,
    color: '#a0a0a0',
    fontWeight: '600',
  },
  magnitudeValue: {
    fontSize: 24,
    color: '#74b9ff',
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
  magnitudeValueHigh: {
    color: '#00b894',
  },
  thresholdRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  thresholdLabel: {
    fontSize: 14,
    color: '#636e72',
  },
  thresholdValue: {
    fontSize: 16,
    color: '#636e72',
    fontFamily: 'monospace',
  },
  instruction: {
    fontSize: 14,
    color: '#a0a0a0',
    marginTop: 30,
    textAlign: 'center',
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
