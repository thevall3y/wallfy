@echo off
echo Deploying Wallify to Vercel with MongoDB support...

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

:: Ask for MongoDB connection string if not set in .env
set /p MONGODB_URI="Enter your MongoDB connection string (press Enter to use the one in .env): "

:: Deploy to Vercel with the environment variable
if "%MONGODB_URI%" == "" (
    echo Using MongoDB connection string from .env file
    vercel --env MONGODB_URI=@mongodb-uri
) else (
    echo Using provided MongoDB connection string
    vercel --env MONGODB_URI="%MONGODB_URI%"
)

echo.
echo If you want to deploy to production, use:
echo vercel --prod --env MONGODB_URI="%MONGODB_URI%"
echo.

pause 