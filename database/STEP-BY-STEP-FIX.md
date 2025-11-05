# 🚨 XAMPP 403 Forbidden Fix - Step by Step

## Current Status
✅ Apache is running (XAMPP welcome page works)  
✅ MySQL is running  
❌ phpMyAdmin blocked with 403 Forbidden  

## The Problem
Apache's security configuration is blocking access to phpMyAdmin directory.

## Solution Steps

### Step 1: Run PowerShell as Administrator
1. **Press Windows Key + X**
2. **Select "Windows PowerShell (Admin)" or "Terminal (Admin)"**
3. **Click "Yes" when prompted**

### Step 2: Navigate to Your Project
```powershell
cd "C:\Users\miche\Web1Repo\Web1\database"
```

### Step 3: Run the Fix Script
```powershell
PowerShell -ExecutionPolicy Bypass -File "Fix-phpMyAdmin-Access.ps1"
```

### Step 4: Test Access
Open your browser and go to:
- **http://127.0.0.1/phpmyadmin**
- **http://localhost/phpmyadmin**

### Step 5: Login to phpMyAdmin
- **Username:** root
- **Password:** (leave empty)

## Alternative Quick Fix (Manual)
If you prefer to do it manually:

1. **Open as Administrator:** `C:\xampp\apache\conf\extra\httpd-xampp.conf`
2. **Find this section (around line 92-96):**
   ```apache
   <Directory "C:/xampp/phpMyAdmin">
       AllowOverride AuthConfig
       Require local
       ErrorDocument 403 /error/XAMPP_FORBIDDEN.html.var
   </Directory>
   ```
3. **Change `Require local` to `Require all granted`**
4. **Save the file**
5. **Restart Apache in XAMPP Control Panel**

## After You're Done
Run the restore script to secure your installation:
```powershell
PowerShell -ExecutionPolicy Bypass -File "Restore-Security.ps1"
```

## Next Steps (Once phpMyAdmin Works)
1. Create database: `lynns_database`
2. Import your SQL file
3. Connect your backend application

---
**The key is running PowerShell as Administrator to modify the Apache configuration!**