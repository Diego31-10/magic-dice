import { Accelerometer } from 'expo-sensors';

/**
 * Servicio de acceso directo al acelerómetro del dispositivo
 * Responsabilidad: Conexión con el hardware
 */
export const SensorService = {
  /**
   * Método para iniciar la escucha del hardware
   * @param callback - Función que recibe los datos del sensor
   * @returns Subscription objeto para desuscribirse
   */
  subscribe: (callback: (data: any) => void) => {
    // Configurar intervalo de actualización: 100ms = 10 lecturas por segundo
    Accelerometer.setUpdateInterval(100);
    
    // Suscribirse al sensor y retornar el objeto de suscripción
    return Accelerometer.addListener(callback);
  },

  /**
   * Limpieza para evitar memory leaks
   * @param subscription - Objeto de suscripción a remover
   */
  unsubscribe: (subscription: any) => {
    if (subscription) {
      subscription.remove();
    }
  }
};