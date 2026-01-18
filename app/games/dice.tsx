import { View, StyleSheet } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import { useAccelerometer } from '../../lib/modules/sensors/accelerometer/useAccelerometer';
import { isShaking, calculateMagnitude } from '../../lib/core/logic/motion';
import { generateRandomNumber, canGenerateNumber } from '../../lib/core/logic/dice';
import { SHAKE_THRESHOLD, SHAKE_COOLDOWN } from '../../lib/core/constants';
import { Dice3D } from '../../components/three/Dice3D';
import { Text } from '../../components/atoms/Text';
import { StatusCard } from '../../components/molecules/StatusCard';
import { DebugPanel } from '../../components/molecules/DebugPanel';

export default function DiceGame() {
  const { data, isAvailable } = useAccelerometer();
  
  const [diceNumber, setDiceNumber] = useState<number | null>(null);
  const [isCurrentlyShaking, setIsCurrentlyShaking] = useState(false);
  const [isInCooldown, setIsInCooldown] = useState(false);

  const lastShakeTimeRef = useRef<number>(0);
  const isProcessingRef = useRef<boolean>(false);

  const magnitude = calculateMagnitude(data);
  const shakeDetected = isShaking(data);

  useEffect(() => {
    if (isProcessingRef.current) return;

    if (shakeDetected && canGenerateNumber(lastShakeTimeRef.current, SHAKE_COOLDOWN)) {
      isProcessingRef.current = true;
      lastShakeTimeRef.current = Date.now();

      console.log('Shake detectado - iniciando animación');
      
      setIsCurrentlyShaking(true);
      setDiceNumber(null);
      setIsInCooldown(true);

      setTimeout(() => {
        const newNumber = generateRandomNumber();
        console.log('Número generado:', newNumber);
        setDiceNumber(newNumber);
        setIsCurrentlyShaking(false);
        
        setTimeout(() => {
          isProcessingRef.current = false;
          setIsInCooldown(false);
        }, SHAKE_COOLDOWN);
      }, 1500);
    }
  }, [shakeDetected]);

  if (!isAvailable) {
    return (
      <View style={styles.container}>
        <Text variant="title" color="error" align="center">
          Accelerometer Unavailable
        </Text>
        <Text variant="body" color="secondary" align="center">
          This device does not support the required sensor
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text variant="title">Magic Dice</Text>
      
      <View style={styles.diceContainer}>
        <Dice3D 
          number={diceNumber}
          isShaking={isCurrentlyShaking}
          style={styles.dice3D}
        />
      </View>

     

      {isCurrentlyShaking ? (
        <StatusCard icon="Loader2" message="Rolling..." variant="active" />
      ) : isInCooldown ? (
        <StatusCard icon="Clock" message="Cooldown..." variant="default" />
      ) : diceNumber === null ? (
        <StatusCard icon="Smartphone" message="Shake device to roll" variant="default" />
      ) : (
        <StatusCard icon="Sparkles" message={`Result: ${diceNumber}`} variant="success" />
      )}

      <DebugPanel
        data={{
          'Magnitude': magnitude.toFixed(3),
          'Threshold': SHAKE_THRESHOLD.toFixed(3),
          'Shake': shakeDetected ? 'YES' : 'NO',
          'Animating': isCurrentlyShaking ? 'YES' : 'NO',
          'Number': diceNumber ?? 'null',
          'Cooldown': isInCooldown ? 'YES' : 'NO',
        }}
      />
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
    gap: 20,
  },
  diceContainer: {
    width: 300,
    height: 300,
    backgroundColor: '#16213e',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#6c5ce7',
  },
  dice3D: {
    width: '100%',
    height: '100%',
  },
});