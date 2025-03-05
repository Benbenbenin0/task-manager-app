#!/bin/bash

# Start servers script
# This script starts both the backend and frontend servers

echo "🚀 Starting Task Manager App servers..."
echo "=========================================="

# Start PostgreSQL if not running
echo "Ensuring PostgreSQL is running..."
pg_ctl -D $(brew --prefix)/var/postgresql@15 start || true

# Start backend server
echo -e "\n📦 Starting backend server..."
cd backend
echo "Installing any missing dependencies..."
npm install

echo "Starting backend server..."
# Start in a new terminal window
osascript -e 'tell app "Terminal" to do script "cd '$PWD' && npm run dev"'

# Start frontend server
echo -e "\n📦 Starting frontend server..."
cd ../frontend
echo "Installing any missing dependencies..."
npm install

echo "Starting frontend server..."
# Start in a new terminal window
osascript -e 'tell app "Terminal" to do script "cd '$PWD' && npm run dev"'

echo -e "\n✅ Servers started successfully!"
echo -e "\n📋 Next steps:"
echo "1. The backend server should be running at http://localhost:5000"
echo "2. The frontend server should be running at http://localhost:3001"
echo "3. Open your browser and navigate to http://localhost:3001"
echo "4. Try logging in with your credentials"
echo "5. If login still fails, check the terminal windows for any error messages"
