# Check Existing XAMPP Database Script
# This script will analyze your current Contact_Manager database and show what needs to be preserved

import mysql.connector
import json
from datetime import datetime

# Default XAMPP connection settings
config = {
    'host': 'localhost',
    'user': 'root',
    'password': '',  # Empty password is default for XAMPP
    'port': 3306
}

def check_database():
    try:
        # Connect to MySQL
        conn = mysql.connector.connect(**config)
        cursor = conn.cursor()
        
        print("🔍 Analyzing existing XAMPP databases...")
        
        # List all databases
        cursor.execute("SHOW DATABASES")
        databases = cursor.fetchall()
        
        print("\n📋 Available databases:")
        for db in databases:
            if db[0] not in ['information_schema', 'performance_schema', 'mysql', 'sys']:
                print(f"  - {db[0]}")
        
        # Check if Contact_Manager exists
        if ('contact_manager',) in databases or ('Contact_Manager',) in databases:
            db_name = 'contact_manager' if ('contact_manager',) in databases else 'Contact_Manager'
            print(f"\n✅ Found Contact_Manager database: {db_name}")
            
            # Switch to the database
            cursor.execute(f"USE {db_name}")
            
            # List all tables
            cursor.execute("SHOW TABLES")
            tables = cursor.fetchall()
            
            print(f"\n📊 Tables in {db_name}:")
            for table in tables:
                print(f"  - {table[0]}")
                
                # Get table structure
                cursor.execute(f"DESCRIBE {table[0]}")
                structure = cursor.fetchall()
                
                print(f"    Structure:")
                for column in structure:
                    print(f"      {column[0]} ({column[1]}) - {column[2]}")
                
                # Get row count
                cursor.execute(f"SELECT COUNT(*) FROM {table[0]}")
                count = cursor.fetchone()[0]
                print(f"    Rows: {count}")
                
                # Show sample data
                if count > 0:
                    cursor.execute(f"SELECT * FROM {table[0]} LIMIT 3")
                    sample_data = cursor.fetchall()
                    print(f"    Sample data:")
                    for row in sample_data:
                        print(f"      {row}")
                print()
            
        else:
            print("\n❌ Contact_Manager database not found")
            print("Available non-system databases:")
            for db in databases:
                if db[0] not in ['information_schema', 'performance_schema', 'mysql', 'sys']:
                    print(f"  - {db[0]}")
        
        cursor.close()
        conn.close()
        
    except mysql.connector.Error as err:
        print(f"❌ Error connecting to database: {err}")
        if err.errno == 2003:
            print("💡 Make sure MySQL is running in XAMPP Control Panel")
        elif err.errno == 1045:
            print("💡 Check your MySQL username/password settings")

if __name__ == "__main__":
    check_database()