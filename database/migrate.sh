#!/bin/bash

# Database Migration Script
# This script will create the necessary tables for the DRW Foundation CMS

echo "🚀 Starting database migration..."

# Database connection details
DB_HOST="${DB_HOST:-localhost}"
DB_PORT="${DB_PORT:-3310}"
DB_USER="${DB_USER:-drwfoundation}"
DB_PASSWORD="${DB_PASSWORD:-drw123456}"
DB_NAME="${DB_NAME:-drwfoundation}"

# Run migration
echo "📝 Creating tables..."
docker exec drwfoundation-db mysql -u"$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" < database/schema.sql

if [ $? -eq 0 ]; then
    echo "✅ Migration completed successfully!"
    echo ""
    echo "📊 Tables created:"
    echo "   - posts (for blog content)"
    echo "   - images (for media tracking)"
    echo "   - users (for admin authentication)"
    echo ""
    echo "👤 Default admin user:"
    echo "   Email: admin@drwfoundation.com"
    echo "   Password: admin123"
    echo "   ⚠️  CHANGE THIS PASSWORD IN PRODUCTION!"
else
    echo "❌ Migration failed!"
    exit 1
fi
