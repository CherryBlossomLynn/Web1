# XAMPP MySQL Fix Script
# This script helps resolve common XAMPP MySQL startup issues

Write-Host "=== XAMPP MySQL Troubleshooting Script ===" -ForegroundColor Green

# Step 1: Stop any conflicting services
Write-Host "`n1. Stopping conflicting MySQL services..." -ForegroundColor Yellow
try {
    Stop-Service -Name "mysql" -ErrorAction SilentlyContinue
    Set-Service -Name "mysql" -StartupType Disabled -ErrorAction SilentlyContinue
    Write-Host "   ✅ Windows MySQL service disabled" -ForegroundColor Green
} catch {
    Write-Host "   ℹ️  No conflicting MySQL service found" -ForegroundColor Cyan
}

# Step 2: Kill any hanging MySQL processes
Write-Host "`n2. Checking for hanging MySQL processes..." -ForegroundColor Yellow
$mysqlProcesses = Get-Process -Name "*mysql*" -ErrorAction SilentlyContinue
if ($mysqlProcesses) {
    $mysqlProcesses | Stop-Process -Force
    Write-Host "   ✅ Stopped hanging MySQL processes" -ForegroundColor Green
} else {
    Write-Host "   ✅ No hanging MySQL processes found" -ForegroundColor Green
}

# Step 3: Check port availability
Write-Host "`n3. Checking port 3306 availability..." -ForegroundColor Yellow
$portInUse = netstat -ano | findstr :3306
if ($portInUse) {
    Write-Host "   ⚠️  Port 3306 is in use:" -ForegroundColor Red
    Write-Host $portInUse
} else {
    Write-Host "   ✅ Port 3306 is available" -ForegroundColor Green
}

# Step 4: Check XAMPP installation
Write-Host "`n4. Checking XAMPP installation..." -ForegroundColor Yellow
if (Test-Path "C:\xampp\mysql\bin\mysqld.exe") {
    Write-Host "   ✅ XAMPP MySQL found at C:\xampp\mysql\" -ForegroundColor Green
} else {
    Write-Host "   ❌ XAMPP MySQL not found at C:\xampp\mysql\" -ForegroundColor Red
    Write-Host "   Please check your XAMPP installation path" -ForegroundColor Red
    exit
}

# Step 5: Backup and clean MySQL data (if needed)
Write-Host "`n5. Checking MySQL data directory..." -ForegroundColor Yellow
$dataPath = "C:\xampp\mysql\data"
if (Test-Path $dataPath) {
    Write-Host "   ✅ MySQL data directory exists" -ForegroundColor Green
    
    # Check for error logs
    $errorLogs = Get-ChildItem "$dataPath\*.err" -ErrorAction SilentlyContinue
    if ($errorLogs) {
        Write-Host "   ⚠️  Found error logs:" -ForegroundColor Yellow
        $errorLogs | ForEach-Object { Write-Host "      - $($_.Name)" -ForegroundColor Yellow }
    }
} else {
    Write-Host "   ❌ MySQL data directory not found" -ForegroundColor Red
}

Write-Host "`n=== Next Steps ===" -ForegroundColor Green
Write-Host "1. In XAMPP Control Panel, try starting MySQL again" -ForegroundColor White
Write-Host "2. If it still fails, click the 'Logs' button to see specific errors" -ForegroundColor White
Write-Host "3. You may need to reset the MySQL data directory" -ForegroundColor White

Write-Host "`n=== Alternative: Reset MySQL Data ===" -ForegroundColor Cyan
Write-Host "If MySQL still won't start, you can reset the data directory:" -ForegroundColor White
Write-Host "1. Stop XAMPP completely" -ForegroundColor White
Write-Host "2. Rename C:\xampp\mysql\data to C:\xampp\mysql\data_backup" -ForegroundColor White
Write-Host "3. Copy C:\xampp\mysql\backup to C:\xampp\mysql\data" -ForegroundColor White
Write-Host "4. Start XAMPP MySQL again" -ForegroundColor White
Write-Host "WARNING: This will remove all existing databases!" -ForegroundColor Red