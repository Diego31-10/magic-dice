import { View, Text, StyleSheet } from 'react-native';
import { useAccelerometer } from '../../lib/modules/sensors/accelerometer/useAccelerometer';

export default function DiceGame() {
  const { data, isAvailable } = useAccelerometer();

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
      <Text style={styles.title}>📱 Sensor Test</Text>
      
      <View style={styles.dataContainer}>
        <Text style={styles.label}>Valores del Acelerómetro:</Text>
        
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
      </View>

      <Text style={styles.instruction}>
        🔄 Mueve el dispositivo para ver los cambios
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
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 40,
  },
  dataContainer: {
    backgroundColor: '#16213e',
    padding: 30,
    borderRadius: 15,
    width: '100%',
    maxWidth: 350,
  },
  label: {
    fontSize: 16,
    color: '#a0a0a0',
    marginBottom: 20,
    textAlign: 'center',
  },
  valueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  axis: {
    fontSize: 24,
    color: '#6c5ce7',
    fontWeight: 'bold',
    width: 40,
  },
  value: {
    fontSize: 24,
    color: '#fff',
    fontFamily: 'monospace',
    flex: 1,
    textAlign: 'right',
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
