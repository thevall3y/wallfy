@echo off
echo Setting up Wallify local server...

:: Check if Python is installed
python --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Python is not installed or not in PATH.
    echo Please install Python from https://www.python.org/downloads/
    echo Make sure to check "Add Python to PATH" during installation.
    pause
    exit /b 1
)

:: Force reinstall Flask and Werkzeug with the correct versions
echo Installing required packages...
pip install --force-reinstall -r requirements.txt

:: Create data directory if it doesn't exist
if not exist data mkdir data

:: Run the server
echo Starting Wallify server...
echo.
echo Open these URLs in your browser:
echo - Main site: http://localhost:5000/index.html
echo - Admin panel: http://localhost:5000/admin.html
echo.
echo Press Ctrl+C to stop the server
echo.
python server.py

pause 