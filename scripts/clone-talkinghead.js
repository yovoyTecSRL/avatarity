const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔄 Clonando repositorio TalkingHead...');

try {
  // Crear directorio public si no existe
  if (!fs.existsSync('public')) {
    fs.mkdirSync('public');
  }

  // Clonar repositorio TalkingHead
  execSync('git clone --depth 1 https://github.com/met4citizen/TalkingHead.git temp_talkinghead', { stdio: 'inherit' });
  
  // Copiar archivos necesarios
  const filesToCopy = [
    'index.html',
    'siteconfig.js',
    'modules/',
    'avatars/',
    'animations/',
    'audio/',
    'images/'
  ];

  filesToCopy.forEach(file => {
    const src = path.join('temp_talkinghead', file);
    const dest = path.join('public', file);
    
    if (fs.existsSync(src)) {
      if (fs.lstatSync(src).isDirectory()) {
        // Copiar directorio
        execSync(`cp -r ${src} ${dest}`, { stdio: 'inherit' });
      } else {
        // Copiar archivo
        fs.copyFileSync(src, dest);
      }
      console.log(`✅ Copiado: ${file}`);
    } else {
      console.log(`⚠️  No encontrado: ${file}`);
    }
  });

  // Limpiar directorio temporal
  execSync('rm -rf temp_talkinghead', { stdio: 'inherit' });

  console.log('✅ TalkingHead clonado exitosamente');
  console.log('🎯 Archivos listos en directorio public/');
  
} catch (error) {
  console.error('❌ Error al clonar TalkingHead:', error.message);
  process.exit(1);
}
