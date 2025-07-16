# Configuración del Ambiente Local

Este archivo `config/local.js` contiene la configuración personalizada para el entorno de desarrollo local de TalkingHead.

## Estructura de Configuración

### Servidor
- **puerto**: Puerto del servidor (por defecto: 8000)
- **host**: Dirección del servidor (por defecto: localhost)
- **cors**: Configuración de CORS para permitir peticiones desde otros orígenes

### Avatar por Defecto
- **url**: Ruta al archivo del avatar por defecto (formato GLB)
- **body**: Tipo de cuerpo del avatar (F/M)
- **avatarMood**: Estado de ánimo por defecto
- **ttsLang**: Idioma para Text-to-Speech
- **ttsVoice**: Voz específica para TTS

### API Endpoints
Configuración opcional para servicios externos:
- **googleTTS**: API key para Google Text-to-Speech
- **elevenLabs**: API key para ElevenLabs
- **openAI**: API key para OpenAI
- **azure**: Configuración para Azure Speech Services

### Opciones de Desarrollo
- **debug**: Habilitar modo debug
- **verbose**: Mostrar información detallada
- **autoReload**: Recarga automática de archivos
- **livereload**: Recarga automática en navegador

### Avatares y Animaciones Personalizadas
Secciones para agregar avatares y animaciones personalizadas.

### Configuración de Idioma
- **default**: Idioma por defecto
- **supported**: Lista de idiomas soportados

## Variables de Entorno

Puedes configurar las siguientes variables de entorno:

```bash
# Configuración del servidor
PORT=8000
HOST=localhost
CORS_ORIGIN=*

# API Keys (opcional)
GOOGLE_TTS_API_KEY=tu_api_key_aquí
ELEVEN_LABS_API_KEY=tu_api_key_aquí
OPENAI_API_KEY=tu_api_key_aquí
AZURE_SPEECH_KEY=tu_key_aquí
AZURE_SPEECH_REGION=tu_region_aquí

# Configuración de desarrollo
NODE_ENV=development
VERBOSE=true
```

## Uso

La configuración se carga automáticamente cuando se inicia el servidor:

```bash
# Modo producción
npm start

# Modo desarrollo
npm run dev

# Con variables de entorno
NODE_ENV=development VERBOSE=true npm start
```

## Endpoints de Configuración

En modo debug, puedes acceder a:
- `/config` - Ver configuración actual (API keys ocultas)
- `/health` - Estado del servidor con información de configuración