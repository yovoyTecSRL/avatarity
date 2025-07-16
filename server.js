const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Cargar configuración local
const { localConfig } = require('./config/local.js');

const app = express();
const PORT = localConfig.server.port;

// Live reload setup for development
if (localConfig.development.livereload) {
  try {
    const livereload = require('livereload');
    const connectLivereload = require('connect-livereload');
    
    // Create livereload server
    const liveReloadServer = livereload.createServer();
    liveReloadServer.watch(path.join(__dirname, 'public'));
    
    // Ping browser on Express server restart
    liveReloadServer.server.once("connection", () => {
      setTimeout(() => {
        liveReloadServer.refresh("/");
      }, 100);
    });
    
    // Add livereload middleware
    app.use(connectLivereload());
  } catch (error) {
    if (localConfig.development.debug) {
      console.log('⚠️  LiveReload no disponible (instalar con: npm install livereload connect-livereload)');
    }
  }
}

// Middleware
app.use(cors(localConfig.server.cors));
app.use(express.json());
app.use(express.static('public'));

// Rutas principales
app.get('/', (req, res) => {
  // Verificar si TalkingHead está configurado
  const talkingHeadIndex = path.join(__dirname, 'public', 'index.html');
  const setupPage = path.join(__dirname, 'public', 'setup.html');
  
  if (req.path === '/' && !req.query.force) {
    // Verificar si existe el archivo index.html de TalkingHead
    if (fs.existsSync(talkingHeadIndex)) {
      // Verificar si es el archivo real de TalkingHead (buscar TalkingHead en el contenido)
      const content = fs.readFileSync(talkingHeadIndex, 'utf8');
      if (content.includes('TalkingHead') && content.includes('three.js')) {
        res.sendFile(talkingHeadIndex);
        return;
      }
    }
    
    // Si no está configurado, mostrar página de setup
    res.sendFile(setupPage);
  } else {
    res.sendFile(talkingHeadIndex);
  }
});

// Ruta para demo
app.get('/demo', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'demo.html'));
});

// Ruta para setup
app.get('/setup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'setup.html'));
});

// Ruta para servir archivos estáticos
app.use('/avatars', express.static(path.join(__dirname, localConfig.staticFiles.avatarsPath.replace('./', ''))));
app.use('/animations', express.static(path.join(__dirname, localConfig.staticFiles.animationsPath.replace('./', ''))));
app.use('/audio', express.static(path.join(__dirname, localConfig.staticFiles.audioPath.replace('./', ''))));
app.use('/modules', express.static(path.join(__dirname, localConfig.staticFiles.modulesPath.replace('./', ''))));

// Ruta para obtener configuración (solo para desarrollo)
if (localConfig.development.debug) {
  app.get('/config', (req, res) => {
    // Ocultar API keys sensibles
    const safeConfig = {
      ...localConfig,
      apiEndpoints: {
        googleTTS: localConfig.apiEndpoints.googleTTS ? '***' : null,
        elevenLabs: localConfig.apiEndpoints.elevenLabs ? '***' : null,
        openAI: localConfig.apiEndpoints.openAI ? '***' : null,
        azure: {
          key: localConfig.apiEndpoints.azure.key ? '***' : null,
          region: localConfig.apiEndpoints.azure.region
        }
      }
    };
    res.json(safeConfig);
  });
}

// Ruta de salud
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    config: {
      environment: process.env.NODE_ENV || 'development',
      debug: localConfig.development.debug,
      language: localConfig.language.default
    }
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  if (localConfig.development.debug) {
    console.error('Error stack:', err.stack);
  } else {
    console.error('Error:', err.message);
  }
  res.status(500).json({ error: 'Something went wrong!' });
});

// Iniciar servidor
app.listen(PORT, localConfig.server.host, () => {
  console.log(`🚀 Servidor TalkingHead iniciado en puerto ${PORT}`);
  console.log(`📱 Abrir en navegador: http://${localConfig.server.host}:${PORT}`);
  console.log(`💡 Para mejores resultados, usa Chrome o Edge`);
  
  if (localConfig.development.debug) {
    console.log(`🔧 Modo debug activado`);
    console.log(`🌐 Idioma por defecto: ${localConfig.language.default}`);
    console.log(`📁 Archivos estáticos: ${Object.keys(localConfig.staticFiles).join(', ')}`);
  }
  
  if (localConfig.development.verbose) {
    console.log('📋 Configuración cargada:', {
      server: localConfig.server,
      language: localConfig.language,
      development: localConfig.development
    });
  }
});

module.exports = app;
