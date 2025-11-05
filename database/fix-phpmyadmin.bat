@echo off
echo === XAMPP phpMyAdmin 403 Fix ===
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
echo 🔧 Fixing Apache configuration...

:: Backup original config
if not exist "C:\xampp\apache\conf\extra\httpd-xampp.conf.backup" (
    copy "C:\xampp\apache\conf\extra\httpd-xampp.conf" "C:\xampp\apache\conf\extra\httpd-xampp.conf.backup" >nul
    echo ✅ Created backup of original configuration
)

:: Replace "Require local" with "Require all granted" in phpMyAdmin section
powershell -Command "(Get-Content 'C:\xampp\apache\conf\extra\httpd-xampp.conf') -replace 'Require local', 'Require all granted' | Set-Content 'C:\xampp\apache\conf\extra\httpd-xampp.conf'"

echo ✅ Configuration updated

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
echo 🎉 Fix completed!
echo.
echo Now try accessing: http://127.0.0.1/phpmyadmin
echo Login: Username = root, Password = (empty)
echo.
echo ⚠️ Security Note: This allows phpMyAdmin access from any IP
echo To restore security later, run: restore-security.bat
echo.

pause