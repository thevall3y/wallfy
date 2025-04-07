@echo off
echo Deploying Wallify to Vercel...

:: Check if vercel CLI is installed
vercel --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Installing Vercel CLI...
    npm install -g vercel
    if %ERRORLEVEL% NEQ 0 (
        echo Failed to install Vercel CLI. Make sure you have Node.js installed.
        echo Download Node.js from https://nodejs.org/
        pause
        exit /b 1
    )
)

:: Login to Vercel if needed
echo Please login to Vercel if prompted...
vercel whoami >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    vercel login
)

:: Deploy to Vercel
echo Deploying your app...
vercel

echo.
echo If you want to deploy to production, use:
echo vercel --prod
echo.
echo For more information, see DEPLOY.md

pause 