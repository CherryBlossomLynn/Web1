# XAMPP phpMyAdmin 403 Fix Script
# This script temporarily allows access to phpMyAdmin by modifying Apache configuration

Write-Host "=== XAMPP phpMyAdmin 403 Fix ===" -ForegroundColor Green
Write-Host ""

# Check if running as administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "❌ This script needs to run as Administrator!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please:" -ForegroundColor Yellow
    Write-Host "1. Right-click on PowerShell" -ForegroundColor White
    Write-Host "2. Select 'Run as administrator'" -ForegroundColor White
    Write-Host "3. Run this script again" -ForegroundColor White
    Write-Host ""
    Write-Host "Or run this command as Administrator:" -ForegroundColor Cyan
    Write-Host "PowerShell -ExecutionPolicy Bypass -File '$PSCommandPath'" -ForegroundColor Gray
    pause
    exit
}

$configFile = "C:\xampp\apache\conf\extra\httpd-xampp.conf"
$backupFile = "C:\xampp\apache\conf\extra\httpd-xampp.conf.backup"

Write-Host "🔍 Checking XAMPP configuration..." -ForegroundColor Yellow

# Check if config file exists
if (-not (Test-Path $configFile)) {
    Write-Host "❌ XAMPP configuration file not found!" -ForegroundColor Red
    Write-Host "Expected location: $configFile" -ForegroundColor Gray
    pause
    exit
}

# Create backup if it doesn't exist
if (-not (Test-Path $backupFile)) {
    Write-Host "💾 Creating backup of original configuration..." -ForegroundColor Cyan
    Copy-Item $configFile $backupFile
    Write-Host "✅ Backup created: $backupFile" -ForegroundColor Green
}

# Read current configuration
$content = Get-Content $configFile

# Check if already fixed
$alreadyFixed = $content | Select-String "Require all granted" | Where-Object { $_.Line -match "phpMyAdmin" -or $_.LineNumber -gt 90 -and $_.LineNumber -lt 100 }

if ($alreadyFixed) {
    Write-Host "✅ Configuration already allows phpMyAdmin access!" -ForegroundColor Green
} else {
    Write-Host "🔧 Applying fix to Apache configuration..." -ForegroundColor Yellow
    
    # Replace "Require local" with "Require all granted" in phpMyAdmin section
    $newContent = $content -replace '(\s*<Directory "C:/xampp/phpMyAdmin">[\s\S]*?)Require local', '$1Require all granted'
    
    # Write the new configuration
    $newContent | Set-Content $configFile -Encoding UTF8
    
    Write-Host "✅ Configuration updated!" -ForegroundColor Green
}

# Restart Apache
Write-Host "🔄 Restarting Apache..." -ForegroundColor Yellow

# Stop Apache processes
$apacheProcesses = Get-Process -Name "httpd" -ErrorAction SilentlyContinue
if ($apacheProcesses) {
    $apacheProcesses | Stop-Process -Force
    Start-Sleep -Seconds 2
}

# Start Apache using XAMPP
try {
    Start-Process -FilePath "C:\xampp\apache\bin\httpd.exe" -WindowStyle Hidden
    Start-Sleep -Seconds 3
    Write-Host "✅ Apache restarted!" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Could not restart Apache automatically" -ForegroundColor Yellow
    Write-Host "Please restart Apache from XAMPP Control Panel" -ForegroundColor White
}

Write-Host ""
Write-Host "🎉 Fix completed!" -ForegroundColor Green
Write-Host ""
Write-Host "Now try accessing:" -ForegroundColor Cyan
Write-Host "  http://127.0.0.1/phpmyadmin" -ForegroundColor White
Write-Host "  http://localhost/phpmyadmin" -ForegroundColor White
Write-Host ""
Write-Host "Login credentials:" -ForegroundColor Yellow
Write-Host "  Username: root" -ForegroundColor White
Write-Host "  Password: (leave empty)" -ForegroundColor White
Write-Host ""
Write-Host "⚠️  Security Note:" -ForegroundColor Red
Write-Host "This fix allows access from any IP address." -ForegroundColor White
Write-Host "To restore security, run the restore script later." -ForegroundColor White

pause