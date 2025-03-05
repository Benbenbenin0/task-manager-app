# Database Setup Guide

When you see the error `P1001: Can't reach database server at localhost:5432`, it means PostgreSQL isn't running or accessible. Here are three ways to solve this:

## Option 1: Install PostgreSQL Locally

### macOS (using Homebrew)
```bash
# Install PostgreSQL
brew install postgresql@15

# Start PostgreSQL service (Method 1 - using brew services)
brew services start postgresql@15

# If you encounter the error "Could not enable service: 125: Domain does not support specified action",
# try one of these alternative methods:

# Method 2 - Start PostgreSQL manually
pg_ctl -D /opt/homebrew/var/postgresql@15 start

# Method 3 - Start PostgreSQL manually (alternative path)
pg_ctl -D $(brew --prefix)/var/postgresql@15 start

# Create database
createdb taskmanager
```

If you continue to have issues with PostgreSQL on macOS, consider using one of the other options below (Docker or SQLite).

### Windows
1. Download and install PostgreSQL from [postgresql.org](https://www.postgresql.org/download/windows/)
2. During installation, set password for postgres user
3. Open pgAdmin (installed with PostgreSQL)
4. Create a new database named "taskmanager"

### Linux (Ubuntu/Debian)
```bash
# Install PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib

# Start PostgreSQL service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database (switch to postgres user first)
sudo -u postgres createdb taskmanager
```

## Option 2: Use Docker for PostgreSQL (Easiest)

If you have Docker installed, you can run PostgreSQL in a container:

```bash
# Run PostgreSQL container
docker run --name postgres-taskmanager -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=taskmanager -p 5432:5432 -d postgres:15-alpine

# Verify it's running
docker ps
```

Then update your .env file to match these credentials:
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/taskmanager?schema=public"
```

## Option 3: Use SQLite for Development (No Installation Required)

For quick development, you can use SQLite instead of PostgreSQL (no installation required):

### Using the Database Switcher Script (Recommended)

We've included a helper script to easily switch between PostgreSQL and SQLite:

```bash
# Switch to SQLite
npm run db:sqlite
# or directly: node switch-db.js sqlite

# Switch to PostgreSQL (when you're ready)
npm run db:postgres
# or directly: node switch-db.js postgres
```

The script will:
1. Update your schema.prisma file
2. Update your .env file with the correct DATABASE_URL
3. Guide you through the next steps

### Manual Setup

If you prefer to set it up manually:

1. Copy the SQLite schema file to replace the PostgreSQL schema:
```bash
cp prisma/schema.sqlite.prisma prisma/schema.prisma
```

2. Update your .env file:
```
DATABASE_URL="file:./prisma/dev.db"
```

3. Run migrations:
```bash
npx prisma migrate dev
```

This is the simplest option for getting started quickly, as it doesn't require any database server setup.

## After Setting Up the Database

Once your database is running, you can run the migrations:

```bash
npx prisma migrate dev
```

This will create all the necessary tables in your database.

## Using Docker Compose (All-in-One Solution)

For the easiest setup that includes the database, backend, and frontend all together:

```bash
# From the project root directory
docker-compose up -d
```

This will start PostgreSQL, the backend, and the frontend all in separate containers, properly configured to work together.
