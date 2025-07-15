@echo off
echo 🎭 Configurando ambiente TalkingHead...

REM Verificar si Node.js está instalado
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js no está instalado. Por favor instala Node.js primero.
    pause
    exit /b 1
)

REM Verificar si npm está instalado
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm no está instalado. Por favor instala npm primero.
    pause
    exit /b 1
)

REM Instalar dependencias
echo 📦 Instalando dependencias...
npm install

REM Ejecutar script de clonación
echo 🔄 Descargando TalkingHead...
npm run clone-talkinghead

REM Mensaje de éxito
echo.
echo ✅ ¡Configuración completada!
echo 🚀 Para iniciar el servidor, ejecuta: npm start
echo 📱 Luego abre: http://localhost:8000
echo.
echo 💡 Consejos:
echo    - Usa Chrome o Edge para mejor rendimiento
echo    - Para usar TTS/AI, necesitarás configurar API keys
echo    - Consulta README.md para más información
pause
