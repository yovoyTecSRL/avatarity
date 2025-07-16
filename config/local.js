// Configuración personalizada para el ambiente local
export const localConfig = {
  // Configuración del servidor
  server: {
    port: 8000,
    host: 'localhost',
    cors: true
  },

  // Configuración de avatares por defecto
  defaultAvatar: {
    url: './avatars/brunette.glb',
    body: 'F',
    avatarMood: 'neutral',
    ttsLang: 'es-ES',
    ttsVoice: 'es-ES-Standard-A',
    lipsyncLang: 'en' // Cambiar a 'es' cuando esté disponible
  },

  // API endpoints (opcional - para desarrollo local)
  apiEndpoints: {
    // Configurar solo si tienes API keys
    googleTTS: null,
    elevenLabs: null,
    openAI: null,
    azure: null
  },

  // Configuración de desarrollo
  development: {
    debug: true,
    verbose: true,
    autoReload: true,
    branch: 'dev',
    version: '1.0.0-dev'
  },

  // Configuración de avatares personalizados
  customAvatars: {
    // Agregar avatares personalizados aquí
    // 'nombre': { url: './avatars/custom.glb', body: 'M' }
  },

  // Configuración de animaciones
  animations: {
    // Animaciones personalizadas
    // 'nombre': { url: './animations/custom.fbx' }
  },

  // Configuración de idioma
  language: {
    default: 'es',
    supported: ['es', 'en', 'fi']
  }
};

// Exportar configuración para uso en cliente
if (typeof window !== 'undefined') {
  window.localConfig = localConfig;
}
