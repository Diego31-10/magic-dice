import { useEffect, useState } from 'react';
import { SensorService } from './accelerometer.service';

/**
 * Tipo de dato que representa los valores del acelerómetro
 */
export type AccelerometerData = {
  x: number;
  y: number;
  z: number;
};

/**
 * Hook personalizado para usar el acelerómetro en componentes React
 * Maneja el ciclo de vida (mount/unmount) automáticamente
 */
export const useAccelerometer = () => {
  const [data, setData] = useState<AccelerometerData>({ x: 0, y: 0, z: 0 });
  const [isAvailable, setIsAvailable] = useState<boolean>(true);

  useEffect(() => {
    let subscription: any;

    // Intentar suscribirse al sensor
    try {
      subscription = SensorService.subscribe((sensorData) => {
        setData({
          x: sensorData.x,
          y: sensorData.y,
          z: sensorData.z,
        });
      });
    } catch (error) {
      console.error('Error al acceder al acelerómetro:', error);
      setIsAvailable(false);
    }

    // Cleanup: Desuscribirse cuando el componente se desmonte
    return () => {
      SensorService.unsubscribe(subscription);
    };
  }, []); // Array vacío = solo se ejecuta al montar/desmontar

  return {
    data,        // Valores actuales del sensor
    isAvailable, // Si el sensor está disponible
  };
};