@echo off
echo.
echo Starting browser cache clearing process...
echo.

:: Clear Chrome cache (if installed)
echo Attempting to clear Chrome cache...
if exist "%LOCALAPPDATA%\Google\Chrome\User Data" (
  taskkill /F /IM chrome.exe /T > nul 2>&1
  timeout /t 1 /nobreak > nul
  del /q /s /f "%LOCALAPPDATA%\Google\Chrome\User Data\Default\Cache\*.*" > nul 2>&1
  del /q /s /f "%LOCALAPPDATA%\Google\Chrome\User Data\Default\Code Cache\*.*" > nul 2>&1
  del /q /s /f "%LOCALAPPDATA%\Google\Chrome\User Data\Default\Service Worker\*.*" > nul 2>&1
  echo Chrome cache cleared successfully.
) else (
  echo Chrome not found or not installed.
)

:: Clear Edge cache (if installed)
echo Attempting to clear Edge cache...
if exist "%LOCALAPPDATA%\Microsoft\Edge\User Data" (
  taskkill /F /IM msedge.exe /T > nul 2>&1
  timeout /t 1 /nobreak > nul
  del /q /s /f "%LOCALAPPDATA%\Microsoft\Edge\User Data\Default\Cache\*.*" > nul 2>&1
  del /q /s /f "%LOCALAPPDATA%\Microsoft\Edge\User Data\Default\Code Cache\*.*" > nul 2>&1
  del /q /s /f "%LOCALAPPDATA%\Microsoft\Edge\User Data\Default\Service Worker\*.*" > nul 2>&1
  echo Edge cache cleared successfully.
) else (
  echo Edge not found or not installed.
)

:: Clear Firefox cache (if installed)
echo Attempting to clear Firefox cache...
if exist "%APPDATA%\Mozilla\Firefox\Profiles" (
  taskkill /F /IM firefox.exe /T > nul 2>&1
  timeout /t 1 /nobreak > nul
  for /d %%x in ("%APPDATA%\Mozilla\Firefox\Profiles\*.*") do (
    del /q /s /f "%%x\cache2\*.*" > nul 2>&1
    del /q /s /f "%%x\storage\default\*.*" > nul 2>&1
  )
  echo Firefox cache cleared successfully.
) else (
  echo Firefox not found or not installed.
)

:: Clear localStorage for Wallify app
echo.
echo Attempting to clear localStorage for Wallify...
if exist "%LOCALAPPDATA%\Wallify" (
  del /q /s /f "%LOCALAPPDATA%\Wallify\*.*" > nul 2>&1
  echo Wallify app data cleared.
) else (
  echo No dedicated Wallify data found.
)

:: Clear browser localStorage for common paths
echo Clearing localStorage from all browsers...
:: Chrome
if exist "%LOCALAPPDATA%\Google\Chrome\User Data\Default\Local Storage\leveldb" (
  del /q /s /f "%LOCALAPPDATA%\Google\Chrome\User Data\Default\Local Storage\leveldb\*.*" > nul 2>&1
  echo Chrome localStorage cleared.
)
:: Edge
if exist "%LOCALAPPDATA%\Microsoft\Edge\User Data\Default\Local Storage\leveldb" (
  del /q /s /f "%LOCALAPPDATA%\Microsoft\Edge\User Data\Default\Local Storage\leveldb\*.*" > nul 2>&1
  echo Edge localStorage cleared.
)
:: Firefox
for /d %%x in ("%APPDATA%\Mozilla\Firefox\Profiles\*.*") do (
  if exist "%%x\storage\default\*.*" (
    del /q /s /f "%%x\storage\default\*.*" > nul 2>&1
    echo Firefox localStorage cleared.
  )
)

echo.
echo Browser cache clearing process completed.
echo.
echo Note: For complete Wallify app cache clearing:
echo 1. Open the browser and navigate to your Wallify app
echo 2. Use the built-in Clear Cache button in the app interface
echo 3. Refresh the page or restart the browser
echo.
echo Press any key to exit...
pause 