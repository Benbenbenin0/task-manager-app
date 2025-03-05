#!/bin/bash

# Task Manager App Setup Script
# This script helps set up the project after cloning from GitHub

echo "🚀 Setting up Task Manager App..."
echo "=================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v18 or later."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d 'v' -f 2 | cut -d '.' -f 1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version $NODE_VERSION detected. Please use Node.js v18 or later."
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Setup backend
echo -e "\n📦 Setting up backend..."
cd backend

# Install dependencies
echo "Installing backend dependencies..."
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file from example..."
    cp .env.example .env
    echo "⚠️  Please update the .env file with your database credentials"
fi

# Setup frontend
echo -e "\n📦 Setting up frontend..."
cd ../frontend

# Install dependencies
echo "Installing frontend dependencies..."
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file from example..."
    cp .env.example .env
fi

# Return to project root
cd ..

echo -e "\n✅ Setup completed successfully!"
echo -e "\n📋 Next steps:"
echo "1. Update the environment variables in backend/.env and frontend/.env"
echo "2. Set up your database (see SETUP_DATABASE.md for options)"
echo "3. Run database migrations: cd backend && npx prisma migrate dev"
echo "4. Start the backend: cd backend && npm run dev"
echo "5. Start the frontend: cd frontend && npm run dev"
echo -e "\nAlternatively, use Docker Compose: docker-compose up -d"
echo -e "\nHappy coding! 🎉"
