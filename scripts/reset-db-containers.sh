#!/bin/bash

DB_NAME="honeypot"
DB_USER="postgres"
DB_CONTAINER="honeypot-db-1"
WEB_CONTAINER="honeypot-web-1"

echo "🔧 Resetting PostgreSQL database: $DB_NAME"

# Terminate active connections
docker exec -i $DB_CONTAINER psql -U $DB_USER -d postgres -c \
"SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = '$DB_NAME';"

# Drop DB
docker exec -i $DB_CONTAINER psql -U $DB_USER -d postgres -c "DROP DATABASE IF EXISTS $DB_NAME;"

# Create DB
docker exec -i $DB_CONTAINER psql -U $DB_USER -d postgres -c "CREATE DATABASE $DB_NAME;"

# Apply Prisma schema inside web container
docker exec -i $WEB_CONTAINER npx prisma db push

# Seed DB
docker exec -i $WEB_CONTAINER npm run seed

echo "✅ Database reset, schema applied, and seed completed!"