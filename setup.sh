#!/bin/bash

# Script de configuración inicial para TalkingHead

echo "🎭 Configurando ambiente TalkingHead..."

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Por favor instala Node.js primero."
    exit 1
fi

# Verificar si npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ npm no está instalado. Por favor instala npm primero."
    exit 1
fi

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

# Ejecutar script de clonación
echo "🔄 Descargando TalkingHead..."
npm run clone-talkinghead

# Mensaje de éxito
echo ""
echo "✅ ¡Configuración completada!"
echo "🚀 Para iniciar el servidor, ejecuta: npm start"
echo "📱 Luego abre: http://localhost:8000"
echo ""
echo "💡 Consejos:"
echo "   - Usa Chrome o Edge para mejor rendimiento"
echo "   - Para usar TTS/AI, necesitarás configurar API keys"
echo "   - Consulta README.md para más información"
