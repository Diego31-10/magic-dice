import { useEffect, useRef, useState } from 'react';
import { DICE_ROTATIONS, getRandomRotation, DiceRotation } from '../utils/rotations';
import { useAudioPlayer, setAudioModeAsync } from 'expo-audio';
import { Vibration } from 'react-native';

export function useDiceAnimation(
  number: number | null,
  isShaking: boolean
): DiceRotation {

  const [rotation, setRotation] = useState<DiceRotation>({ x: 0, y: 0, z: 0 });

  const shakeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const settlingRef = useRef(false);
  const targetRotationRef = useRef<DiceRotation | null>(null);
  const dicePlayer = useAudioPlayer(
    require('../../../assets/sounds/dice.mp3')
  );

  // 🔊 Configurar audio (OBLIGATORIO para iOS)
  useEffect(() => {
    setAudioModeAsync({
      playsInSilentMode: true,
    });
  }, []);

  // 🎲 SHAKE (más lento)
  useEffect(() => {
    if (isShaking) {
      settlingRef.current = false;
      targetRotationRef.current = null;
      dicePlayer.seekTo(0);
      dicePlayer.play();
      shakeIntervalRef.current = setInterval(() => {
        setRotation(prev => ({
          x: prev.x + 0.06,
          y: prev.y + 0.09,
          z: prev.z + 0.05,
        }));
      }, 32); // 🔥 más lento
    }

    return () => {
      if (shakeIntervalRef.current) {
        clearInterval(shakeIntervalRef.current);
        shakeIntervalRef.current = null;
      }
    };
  }, [isShaking]);

  // 🎯 PREPARAR CAÍDA LIMPIA
  useEffect(() => {
    if (!isShaking && number !== null) {
      settlingRef.current = true;

      // 🔒 reset limpio
      setRotation({ x: 0, y: 0, z: 0 });

      // objetivo final
      targetRotationRef.current = DICE_ROTATIONS[number];
      Vibration.vibrate(100);
    }
  }, [number, isShaking]);

  return targetRotationRef.current ?? rotation;
}
