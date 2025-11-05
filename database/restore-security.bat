@echo off
echo === Restore phpMyAdmin Security ===
echo.

:: Check if running as administrator
net session >nul 2>&1
if %errorLevel% == 0 (
    echo ✅ Running as Administrator
) else (
    echo ❌ Not running as Administrator
    echo Right-click this file and select "Run as administrator"
    pause
    exit /b 1
)

echo.
echo 🔒 Restoring secure configuration...

:: Restore original config if backup exists
if exist "C:\xampp\apache\conf\extra\httpd-xampp.conf.backup" (
    copy "C:\xampp\apache\conf\extra\httpd-xampp.conf.backup" "C:\xampp\apache\conf\extra\httpd-xampp.conf" >nul
    echo ✅ Original configuration restored
) else (
    echo ⚠️ No backup found, manually restoring...
    powershell -Command "(Get-Content 'C:\xampp\apache\conf\extra\httpd-xampp.conf') -replace 'Require all granted', 'Require local' | Set-Content 'C:\xampp\apache\conf\extra\httpd-xampp.conf'"
    echo ✅ Security configuration restored
)

echo.
echo 🔄 Restarting Apache...

:: Stop Apache
taskkill /f /im httpd.exe >nul 2>&1

:: Wait a moment
timeout /t 3 /nobreak >nul

:: Start Apache
start "" "C:\xampp\apache\bin\httpd.exe"

echo ✅ Apache restarted

echo.
echo 🔒 Security restored!
echo phpMyAdmin is now restricted to localhost only.
echo.

pause