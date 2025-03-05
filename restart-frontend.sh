#!/bin/bash

# Restart frontend script
# This script restarts the frontend server with the updated configuration

echo "🚀 Restarting Task Manager App frontend..."
echo "=========================================="

# Navigate to the frontend directory
cd frontend

# Install any missing dependencies
echo "Installing any missing dependencies..."
npm install

# Start the frontend server
echo "Starting frontend server..."
npm run dev

echo -e "\n✅ Frontend server started successfully!"
echo -e "\n📋 Next steps:"
echo "1. The frontend server should be running at http://localhost:3001"
echo "2. Open your browser and navigate to http://localhost:3001"
echo "3. Try logging in with your credentials"
echo "4. If login still fails, check the terminal for any error messages"
