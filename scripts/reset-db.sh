#!/bin/bash

# --- CONFIG ---
DB_USER="hy13dev"
DB_NAME="honeypot"

PROJECT_ROOT="$(dirname "$(dirname "$0")")"

echo "🔧 Resetting PostgreSQL database: $DB_NAME"

# Terminate all active sessions on the DB
echo "🔨 Terminating active connections..."
psql -U "$DB_USER" -d postgres -c \
"SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = '$DB_NAME';"

# Drop DB
echo "🗑 Dropping database..."
psql -U "$DB_USER" -d postgres -c "DROP DATABASE IF EXISTS $DB_NAME;"

# Create DB
echo "📦 Creating fresh database..."
psql -U "$DB_USER" -d postgres -c "CREATE DATABASE $DB_NAME;"

# Move to project root
cd "$PROJECT_ROOT"

echo "📐 Applying Prisma schema..."
npx prisma db push

echo "🌱 Seeding database..."
npx prisma db seed

echo "✅ Database reset, schema applied, and seed completed!"