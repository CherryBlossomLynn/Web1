# Restore XAMPP Security Script
# This script restores the original Apache configuration for security

Write-Host "=== Restore XAMPP Security ===" -ForegroundColor Green
Write-Host ""

# Check if running as administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "❌ This script needs to run as Administrator!" -ForegroundColor Red
    pause
    exit
}

$configFile = "C:\xampp\apache\conf\extra\httpd-xampp.conf"
$backupFile = "C:\xampp\apache\conf\extra\httpd-xampp.conf.backup"

if (Test-Path $backupFile) {
    Write-Host "🔄 Restoring original configuration..." -ForegroundColor Yellow
    Copy-Item $backupFile $configFile
    
    # Restart Apache
    $apacheProcesses = Get-Process -Name "httpd" -ErrorAction SilentlyContinue
    if ($apacheProcesses) {
        $apacheProcesses | Stop-Process -Force
        Start-Sleep -Seconds 2
    }
    
    Start-Process -FilePath "C:\xampp\apache\bin\httpd.exe" -WindowStyle Hidden
    
    Write-Host "✅ Security settings restored!" -ForegroundColor Green
    Write-Host "phpMyAdmin is now restricted to localhost only." -ForegroundColor White
} else {
    Write-Host "⚠️  No backup file found. Security was not modified." -ForegroundColor Yellow
}

pause