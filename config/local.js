// Configuración personalizada para el ambiente local
const localConfig = {
  // Configuración del servidor
  server: {
    port: process.env.PORT || 8000,
    host: process.env.HOST || 'localhost',
    cors: {
      origin: process.env.CORS_ORIGIN || '*',
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
    }
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
    googleTTS: process.env.GOOGLE_TTS_API_KEY || null,
    elevenLabs: process.env.ELEVEN_LABS_API_KEY || null,
    openAI: process.env.OPENAI_API_KEY || null,
    azure: {
      key: process.env.AZURE_SPEECH_KEY || null,
      region: process.env.AZURE_SPEECH_REGION || null
    }
  },

  // Configuración de desarrollo
  development: {
  dev
    debug: true,
    verbose: true,
    autoReload: true,
    branch: 'dev',
    version: '1.0.0-dev'

    debug: process.env.NODE_ENV === 'development',
    verbose: process.env.VERBOSE === 'true',
    autoReload: process.env.NODE_ENV === 'development',
    livereload: process.env.NODE_ENV === 'development'
    copilot/fix-a7db1158-368f-4139-b9dc-b1c71047bdb7
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
  },

  // Configuración de archivos estáticos
  staticFiles: {
    avatarsPath: './public/avatars',
    animationsPath: './public/animations',
    audioPath: './public/audio',
    modulesPath: './public/modules'
  }
};

// Exportar configuración para uso en CommonJS
module.exports = { localConfig };

// Exportar configuración para uso en cliente (si está disponible)
if (typeof window !== 'undefined') {
  window.localConfig = localConfig;
}
