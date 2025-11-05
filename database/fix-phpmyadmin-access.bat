@echo off
echo === XAMPP Apache phpMyAdmin Fix ===
echo.

echo Step 1: Stopping Apache...
taskkill /F /IM httpd.exe >nul 2>&1

echo Step 2: Backing up Apache configuration...
copy "C:\xampp\apache\conf\extra\httpd-xampp.conf" "C:\xampp\apache\conf\extra\httpd-xampp.conf.backup" >nul 2>&1

echo Step 3: Creating temporary fix...
powershell -Command "(Get-Content 'C:\xampp\apache\conf\extra\httpd-xampp.conf') -replace 'Require local', 'Require all granted' | Set-Content 'C:\xampp\apache\conf\extra\httpd-xampp.conf'"

echo Step 4: Starting Apache again...
start "" "C:\xampp\apache\bin\httpd.exe"

echo.
echo ✅ Fix applied! Try accessing: http://127.0.0.1/phpmyadmin
echo.
echo ⚠️  SECURITY WARNING: This allows access from anywhere!
echo    After you're done, run restore-security.bat to restore original settings.
echo.

pause