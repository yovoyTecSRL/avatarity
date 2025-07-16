const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8000;

// Live reload setup for development
if (process.env.NODE_ENV !== 'production') {
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
}

// Middleware
app.use(cors());
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
app.use('/avatars', express.static(path.join(__dirname, 'public', 'avatars')));
app.use('/animations', express.static(path.join(__dirname, 'public', 'animations')));
app.use('/audio', express.static(path.join(__dirname, 'public', 'audio')));
app.use('/modules', express.static(path.join(__dirname, 'public', 'modules')));

// Ruta de salud
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor TalkingHead iniciado en puerto ${PORT}`);
  console.log(`📱 Abrir en navegador: http://localhost:${PORT}`);
  console.log(`💡 Para mejores resultados, usa Chrome o Edge`);
});

module.exports = app;
