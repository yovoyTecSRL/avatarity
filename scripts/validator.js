const { FileUtils, Logger } = require('../utils');
const path = require('path');
const fs = require('fs');

// Validador de archivos TalkingHead
class TalkingHeadValidator {
  static validateSetup() {
    const results = {
      valid: true,
      errors: [],
      warnings: [],
      info: []
    };

    // Verificar archivos principales
    const requiredFiles = [
      'public/index.html',
      'public/siteconfig.js',
      'public/modules/talkinghead.mjs'
    ];

    requiredFiles.forEach(file => {
      const filePath = path.join(process.cwd(), file);
      if (!fs.existsSync(filePath)) {
        results.valid = false;
        results.errors.push(`Archivo requerido faltante: ${file}`);
      } else {
        results.info.push(`Archivo encontrado: ${file}`);
      }
    });

    // Verificar directorios
    const requiredDirs = [
      'public/modules',
      'public/avatars',
      'public/animations',
      'public/audio'
    ];

    requiredDirs.forEach(dir => {
      const dirPath = path.join(process.cwd(), dir);
      if (!fs.existsSync(dirPath)) {
        results.warnings.push(`Directorio faltante: ${dir}`);
      } else {
        results.info.push(`Directorio encontrado: ${dir}`);
      }
    });

    // Verificar avatares
    const avatarsDir = path.join(process.cwd(), 'public/avatars');
    if (fs.existsSync(avatarsDir)) {
      const avatars = fs.readdirSync(avatarsDir).filter(file => 
        FileUtils.isValidGLBFile(path.join(avatarsDir, file))
      );
      
      if (avatars.length === 0) {
        results.warnings.push('No se encontraron avatares (.glb) en el directorio avatars/');
      } else {
        results.info.push(`Avatares encontrados: ${avatars.length}`);
      }
    }

    // Verificar animaciones
    const animationsDir = path.join(process.cwd(), 'public/animations');
    if (fs.existsSync(animationsDir)) {
      const animations = fs.readdirSync(animationsDir).filter(file => 
        FileUtils.isValidFBXFile(path.join(animationsDir, file))
      );
      
      if (animations.length === 0) {
        results.warnings.push('No se encontraron animaciones (.fbx) en el directorio animations/');
      } else {
        results.info.push(`Animaciones encontradas: ${animations.length}`);
      }
    }

    return results;
  }

  static generateReport() {
    const validation = this.validateSetup();
    
    Logger.info('=== REPORTE DE VALIDACIÓN TALKINGHEAD ===');
    
    if (validation.valid) {
      Logger.success('✅ Configuración válida');
    } else {
      Logger.error('❌ Configuración incompleta');
    }

    if (validation.errors.length > 0) {
      Logger.error('ERRORES:');
      validation.errors.forEach(error => Logger.error(`  - ${error}`));
    }

    if (validation.warnings.length > 0) {
      Logger.warning('ADVERTENCIAS:');
      validation.warnings.forEach(warning => Logger.warning(`  - ${warning}`));
    }

    if (validation.info.length > 0) {
      Logger.info('INFORMACIÓN:');
      validation.info.forEach(info => Logger.info(`  - ${info}`));
    }

    return validation;
  }
}

module.exports = TalkingHeadValidator;
