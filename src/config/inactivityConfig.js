// Configuración global para el detector de inactividad
export const INACTIVITY_CONFIG = {
  // Tiempo de inactividad en milisegundos (5 minutos por defecto)
  INACTIVITY_TIME: 30000, // 5 minutos = 300000 ms
  
  // Tiempo de espera para respuesta del usuario (8 segundos)
  COUNTDOWN_TIME: 8000, // 8 segundos = 8000 ms
  
  // Intervalo de throttling para eventos frecuentes (mousemove) en ms
  THROTTLE_FREQUENT_EVENTS: 2000, // 2 segundos
  
  // Intervalo de throttling para otros eventos en ms
  THROTTLE_OTHER_EVENTS: 1000, // 1 segundo
};

