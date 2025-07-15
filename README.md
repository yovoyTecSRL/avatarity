# TalkingHead - Ambiente Local

Este proyecto configura un ambiente local para ejecutar TalkingHead, una librería JavaScript para avatares 3D interactivos.

## Características

- Avatares 3D con lip-sync en tiempo real
- Soporte para Ready Player Me avatars (GLB)
- Integración con servicios TTS (Google, Azure, ElevenLabs)
- Animaciones y expresiones faciales
- Funciona completamente en el navegador

## Instalación y Uso

1. **Clonar el repositorio TalkingHead:**
   ```bash
   npm run clone-talkinghead
   ```

2. **Iniciar servidor local:**
   ```bash
   npm start
   ```

3. **Abrir en navegador:**
   ```
   http://localhost:8000
   ```

## Estructura del Proyecto

```
/
├── public/                 # Archivos públicos del servidor
│   ├── index.html         # Aplicación principal
│   ├── modules/           # Módulos TalkingHead
│   ├── avatars/           # Avatares 3D (.glb)
│   ├── animations/        # Animaciones (.fbx)
│   ├── audio/             # Archivos de audio
│   └── siteconfig.js      # Configuración del sitio
├── scripts/               # Scripts de configuración
└── package.json          # Configuración npm
```

## Configuración API (Opcional)

Para usar servicios TTS y AI, agrega tus API keys en la configuración:

- Google TTS: Cloud Text-to-Speech API
- ElevenLabs: Text-to-Speech API
- OpenAI: GPT API
- Azure: Speech Services

## Scripts Disponibles

- `npm start` - Inicia servidor local
- `npm run clone-talkinghead` - Descarga TalkingHead
- `npm run setup` - Configuración inicial completa

## Tecnologías

- Three.js para renderizado 3D
- WebGL para gráficos
- Web Audio API para audio
- JavaScript ES6 modules