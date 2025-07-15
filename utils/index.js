const fs = require('fs');
const path = require('path');

// Utilitarios para manejo de archivos
class FileUtils {
  static ensureDirectoryExists(dir) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  static copyFile(src, dest) {
    const destDir = path.dirname(dest);
    this.ensureDirectoryExists(destDir);
    fs.copyFileSync(src, dest);
  }

  static copyDirectory(src, dest) {
    this.ensureDirectoryExists(dest);
    const files = fs.readdirSync(src);
    
    files.forEach(file => {
      const srcPath = path.join(src, file);
      const destPath = path.join(dest, file);
      
      if (fs.lstatSync(srcPath).isDirectory()) {
        this.copyDirectory(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    });
  }

  static isValidGLBFile(filePath) {
    if (!fs.existsSync(filePath)) return false;
    
    const ext = path.extname(filePath).toLowerCase();
    return ext === '.glb' || ext === '.gltf';
  }

  static isValidFBXFile(filePath) {
    if (!fs.existsSync(filePath)) return false;
    
    const ext = path.extname(filePath).toLowerCase();
    return ext === '.fbx';
  }

  static getFileSize(filePath) {
    if (!fs.existsSync(filePath)) return 0;
    return fs.statSync(filePath).size;
  }

  static formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

// Utilitarios para configuración
class ConfigUtils {
  static loadConfig(configPath) {
    try {
      if (fs.existsSync(configPath)) {
        const configContent = fs.readFileSync(configPath, 'utf8');
        return JSON.parse(configContent);
      }
    } catch (error) {
      console.error('Error loading config:', error);
    }
    return {};
  }

  static saveConfig(configPath, config) {
    try {
      const configDir = path.dirname(configPath);
      FileUtils.ensureDirectoryExists(configDir);
      fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
      return true;
    } catch (error) {
      console.error('Error saving config:', error);
      return false;
    }
  }

  static validateApiKey(apiKey) {
    return apiKey && typeof apiKey === 'string' && apiKey.length > 10;
  }
}

// Utilitarios para logging
class Logger {
  static log(message, level = 'info') {
    const timestamp = new Date().toISOString();
    const levels = {
      'info': '📝',
      'success': '✅',
      'warning': '⚠️',
      'error': '❌',
      'debug': '🔍'
    };
    
    const icon = levels[level] || '📝';
    console.log(`${icon} [${timestamp}] ${message}`);
  }

  static info(message) {
    this.log(message, 'info');
  }

  static success(message) {
    this.log(message, 'success');
  }

  static warning(message) {
    this.log(message, 'warning');
  }

  static error(message) {
    this.log(message, 'error');
  }

  static debug(message) {
    this.log(message, 'debug');
  }
}

module.exports = {
  FileUtils,
  ConfigUtils,
  Logger
};
