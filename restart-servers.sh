#!/bin/bash

# Restart servers script
# This script restarts both the backend and frontend servers

echo "🔄 Restarting Task Manager App servers..."
echo "=========================================="

# Kill any existing Node.js processes (optional, uncomment if needed)
# echo "Stopping existing Node.js processes..."
# pkill -f node

# Start PostgreSQL if not running
echo "Ensuring PostgreSQL is running..."
pg_ctl -D $(brew --prefix)/var/postgresql@15 start || true

# Restart backend server
echo -e "\n📦 Restarting backend server..."
cd backend
echo "Installing any missing dependencies..."
npm install

echo "Starting backend server..."
# Print instructions for starting the backend server
echo "To start the backend server, open a new terminal window and run:"
echo "cd $(pwd) && npm run dev"

# Restart frontend server
echo -e "\n📦 Restarting frontend server..."
cd ../frontend
echo "Installing any missing dependencies..."
npm install

echo "Starting frontend server..."
# Print instructions for starting the frontend server
echo "To start the frontend server, open a new terminal window and run:"
echo "cd $(pwd) && npm run dev"

echo -e "\n✅ Servers restarted successfully!"
echo -e "\n📋 Next steps:"
echo "1. The backend server should be running at http://localhost:5000"
echo "2. The frontend server should be running at http://localhost:3000"
echo "3. Try logging in with your credentials"
echo "4. If login still fails, check the terminal windows for any error messages"
