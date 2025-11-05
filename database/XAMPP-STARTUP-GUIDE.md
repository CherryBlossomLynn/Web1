# XAMPP MySQL Startup Guide

## Quick Start Instructions

### Method 1: Using XAMPP Control Panel (Recommended)
1. **Open XAMPP Control Panel**
   - You should see it running already (we started it)
   - If not visible, look for it in your system tray

2. **Start MySQL Service**
   - In the XAMPP Control Panel, find the "MySQL" row
   - Click the "Start" button next to MySQL
   - Wait for the status to change to "Running" (green background)

3. **Verify MySQL is Running**
   - You should see "Running" status with a green background
   - Port should show 3306

### Method 2: Run as Administrator
If Method 1 doesn't work:

1. **Close current XAMPP Control Panel**
2. **Right-click on XAMPP Control Panel icon**
3. **Select "Run as administrator"**
4. **Click "Start" next to MySQL**

### Method 3: Command Line (Alternative)
```powershell
# Run PowerShell as Administrator, then:
net start mysql
```

## Access phpMyAdmin
Once MySQL is running:
1. Open browser
2. Go to: `http://localhost/phpmyadmin`
3. Username: `root`
4. Password: (leave empty)

## Troubleshooting

### If MySQL won't start:
1. **Check if port 3306 is in use:**
   ```powershell
   netstat -an | findstr :3306
   ```

2. **Check XAMPP error logs:**
   - Look in `C:\xampp\mysql\data\` for error log files

3. **Restart XAMPP completely:**
   - Stop all services in XAMPP Control Panel
   - Close XAMPP Control Panel
   - Restart as administrator

### Common Issues:
- **Port 3306 already in use** → Stop other MySQL services
- **Permission denied** → Run XAMPP as administrator
- **Service won't start** → Check Windows Services for conflicting MySQL installations

## Next Steps (After MySQL is Running)
1. ✅ Access phpMyAdmin at `http://localhost/phpmyadmin`
2. 📋 Create database `lynns_database`
3. 📊 Import the SQL file from your database folder
4. 🔧 Update backend configuration to use XAMPP defaults

## XAMPP Default Settings
- **Host:** localhost
- **Username:** root
- **Password:** (empty)
- **Port:** 3306