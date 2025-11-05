# Quick Manual Fix for phpMyAdmin 403 Error

## Problem
phpMyAdmin shows 403 Forbidden error even though Apache and MySQL are running.

## Quick Solution

### Option 1: Manual Config Edit (5 minutes)
1. **Right-click Notepad → "Run as administrator"**
2. **Open this file**: `C:\xampp\apache\conf\extra\httpd-xampp.conf`
3. **Find this section** (around line 92-96):
   ```apache
   <Directory "C:/xampp/phpMyAdmin">
       AllowOverride AuthConfig
       Require local
       ErrorDocument 403 /error/XAMPP_FORBIDDEN.html.var
   </Directory>
   ```
4. **Change `Require local` to `Require all granted`**:
   ```apache
   <Directory "C:/xampp/phpMyAdmin">
       AllowOverride AuthConfig
       Require all granted
       ErrorDocument 403 /error/XAMPP_FORBIDDEN.html.var
   </Directory>
   ```
5. **Save the file**
6. **In XAMPP Control Panel: Stop Apache → Wait 3 seconds → Start Apache**
7. **Test**: http://127.0.0.1/phpmyadmin

### Option 2: Command Line Fix
```powershell
# Run PowerShell as Administrator, then:
(Get-Content "C:\xampp\apache\conf\extra\httpd-xampp.conf") -replace 'Require local', 'Require all granted' | Set-Content "C:\xampp\apache\conf\extra\httpd-xampp.conf"

# Restart Apache
Get-Process httpd -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Process "C:\xampp\apache\bin\httpd.exe" -WindowStyle Hidden
```

### Option 3: Alternative Access Methods
Try these URLs in order:
- http://127.0.0.1/phpmyadmin/
- http://localhost/phpmyadmin/
- http://127.0.0.1:80/phpmyadmin

## After Fix Works

### Login to phpMyAdmin:
- **Username**: root
- **Password**: (leave empty)

### Access Your Database:
1. Click "Contact_Manager" in the left panel
2. You should see your contacts table
3. Click "Browse" to view your existing contacts

### Run the Migration:
1. Click "Import" tab
2. Choose file: `migrate-contact-manager.sql`
3. Click "Go"

## If Still Having Issues

### Check XAMPP Control Panel:
- Apache should show **green "Running"**
- MySQL should show **green "Running"**
- Try clicking "Admin" button next to MySQL

### Restart XAMPP as Administrator:
1. Close XAMPP Control Panel
2. Right-click XAMPP Control Panel → "Run as administrator" 
3. Start Apache and MySQL services
4. Try accessing phpMyAdmin again

---
**Try Option 1 (manual edit) first - it's the most reliable!**