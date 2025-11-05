# Contact_Manager Database Access Guide

## 🗄️ Database Connection Details
- **Host:** localhost
- **Port:** 3307 (XAMPP MySQL)
- **Database:** contact_manager
- **Username:** root
- **Password:** (empty)

## 📊 Direct Access Methods

### 1. phpMyAdmin (Web Interface)
- **Main URL:** http://localhost/phpmyadmin
- **Direct Database:** http://localhost/phpmyadmin/index.php?route=/database/structure&db=contact_manager

### 2. Command Line Access
```bash
# Windows (XAMPP)
"C:\xampp\mysql\bin\mysql.exe" -u root -P 3307 -h localhost contact_manager

# Alternative
mysql -u root -P 3307 -h localhost contact_manager
```

### 3. Database Status Check
- **Status Page:** http://localhost/Web1/database/check-database.php

## 📋 Key Tables

### Original Contact_Manager Tables:
1. **contacts** - Your real contacts (Kathy, Michael, Nathan, Willie, Scarlett)
2. **games** - Game columns (Uno, Minecraft, VR, Monopoly)  
3. **gametypes** - Game type columns (VideoGame, CardGame, VirtualReality, BoardGame)

### Enhanced Interests Tables (if created):
1. **interest_categories** - Categories (videogames, physicalGames, media)
2. **interests** - All 44 specific interests with descriptions
3. **contact_interests** - Junction table linking contacts to interests

## 🔍 Useful SQL Queries

### View All Contacts:
```sql
SELECT * FROM contacts;
```

### View Contact Interest Assignments (if enhanced tables exist):
```sql
SELECT c.Name, ic.name as category, i.name as interest 
FROM contacts c
JOIN contact_interests ci ON c.ID = ci.contact_id  
JOIN interests i ON ci.interest_id = i.id
JOIN interest_categories ic ON i.category_id = ic.id
ORDER BY c.Name, ic.name;
```

### Count Interests by Category:
```sql
SELECT ic.name as category, COUNT(i.id) as interest_count
FROM interest_categories ic
LEFT JOIN interests i ON ic.id = i.category_id  
GROUP BY ic.id, ic.name;
```

### View All Available Interests:
```sql
SELECT ic.name as category, i.name as interest_name, i.description
FROM interest_categories ic
JOIN interests i ON ic.id = i.category_id
ORDER BY ic.name, i.name;
```

## 🛠️ Setup Commands

### Create Enhanced Interests Structure:
Run this in phpMyAdmin SQL tab or visit: http://localhost/Web1/database/setup-interests.php

### Backup Database:
```sql
-- Export through phpMyAdmin or use mysqldump
mysqldump -u root -P 3307 -h localhost contact_manager > contact_manager_backup.sql
```

## 🔗 Quick Links
- 📊 [phpMyAdmin](http://localhost/phpmyadmin)
- 📋 [Contact_Manager DB](http://localhost/phpmyadmin/index.php?route=/database/structure&db=contact_manager)
- 🔧 [Setup Enhanced Interests](http://localhost/Web1/database/setup-interests.php)
- ✅ [Database Status Check](http://localhost/Web1/database/check-database.php)
- 🧪 [Complete Interests Test](http://localhost/Web1/frontend/complete-interests-test.html)