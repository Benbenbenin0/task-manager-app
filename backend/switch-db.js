#!/usr/bin/env node

/**
 * Script to switch between PostgreSQL and SQLite database providers
 * Usage: node switch-db.js [postgres|sqlite]
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Define paths
const schemaPath = path.join(__dirname, 'prisma', 'schema.prisma');
const sqliteSchemaPath = path.join(__dirname, 'prisma', 'schema.sqlite.prisma');
const postgresSchemaPath = path.join(__dirname, 'prisma', 'schema.postgres.prisma');
const envPath = path.join(__dirname, '.env');

// Check if schema files exist
if (!fs.existsSync(schemaPath)) {
  console.error('Error: schema.prisma not found');
  process.exit(1);
}

// Backup current schema if postgres backup doesn't exist
if (!fs.existsSync(postgresSchemaPath)) {
  console.log('Backing up current PostgreSQL schema...');
  fs.copyFileSync(schemaPath, postgresSchemaPath);
}

// Get command line argument
const dbType = process.argv[2]?.toLowerCase();

if (!dbType || (dbType !== 'postgres' && dbType !== 'sqlite')) {
  console.log('Usage: node switch-db.js [postgres|sqlite]');
  console.log('  postgres - Switch to PostgreSQL database');
  console.log('  sqlite   - Switch to SQLite database');
  process.exit(0);
}

// Update schema and .env based on selected database type
if (dbType === 'sqlite') {
  // Check if SQLite schema exists
  if (!fs.existsSync(sqliteSchemaPath)) {
    console.error('Error: SQLite schema file not found (schema.sqlite.prisma)');
    process.exit(1);
  }

  // Copy SQLite schema to schema.prisma
  fs.copyFileSync(sqliteSchemaPath, schemaPath);
  console.log('Switched schema to SQLite');

  // Update .env file
  if (fs.existsSync(envPath)) {
    let envContent = fs.readFileSync(envPath, 'utf8');
    envContent = envContent.replace(
      /DATABASE_URL=.*/,
      'DATABASE_URL="file:./prisma/dev.db"'
    );
    fs.writeFileSync(envPath, envContent);
    console.log('Updated .env with SQLite connection string');
  }
} else if (dbType === 'postgres') {
  // Check if PostgreSQL schema exists
  if (!fs.existsSync(postgresSchemaPath)) {
    console.error('Error: PostgreSQL schema file not found (schema.postgres.prisma)');
    process.exit(1);
  }

  // Copy PostgreSQL schema to schema.prisma
  fs.copyFileSync(postgresSchemaPath, schemaPath);
  console.log('Switched schema to PostgreSQL');

  // Update .env file
  if (fs.existsSync(envPath)) {
    let envContent = fs.readFileSync(envPath, 'utf8');
    if (!envContent.includes('postgresql://')) {
      envContent = envContent.replace(
        /DATABASE_URL=.*/,
        'DATABASE_URL="postgresql://postgres:postgres@localhost:5432/taskmanager?schema=public"'
      );
      fs.writeFileSync(envPath, envContent);
      console.log('Updated .env with PostgreSQL connection string');
    }
  }
}

console.log(`\nSuccessfully switched to ${dbType} database!`);
console.log('\nNext steps:');
console.log('1. Make sure your database is running');
console.log('2. Run: npx prisma migrate dev');
console.log('3. Start your server: npm run dev');
