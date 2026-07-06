#!/bin/bash

# MEAN Stack Contact Management System - Quick Start
# This script starts both backend and frontend

echo "🚀 Starting MEAN Stack Contact Management System..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "${GREEN}✓ Node.js is installed${NC}"
echo ""

# Check if MongoDB is running
echo "${BLUE}Checking MongoDB connection...${NC}"
if ! mongosh --eval "db.adminCommand('ping')" &> /dev/null; then
    echo "${YELLOW}⚠️  Warning: MongoDB might not be running${NC}"
    echo "   Start MongoDB with: brew services start mongodb-community"
    echo ""
fi

# Start Backend
echo "${BLUE}Starting Express Backend...${NC}"
cd "backend" || exit 1


if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
fi

# Start backend in background
npm run dev &
BACKEND_PID=$!
echo "${GREEN}✓ Backend started (PID: $BACKEND_PID)${NC}"
sleep 2
echo ""

# Start Frontend
cd "../frontend" || exit 1

echo "${BLUE}Starting React Frontend...${NC}"

if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi

# Start frontend
npm run dev &
FRONTEND_PID=$!
echo "${GREEN}✓ Frontend started (PID: $FRONTEND_PID)${NC}"
echo ""

# Display information
echo "${GREEN}========================================${NC}"
echo "${GREEN}✓ Application is Starting!${NC}"
echo "${GREEN}========================================${NC}"
echo ""
echo "📍 Frontend:  http://localhost:5173"
echo "📍 Backend:   http://localhost:3000"
echo "🔐 Admin Password: 123"
echo ""
echo "Press Ctrl+C to stop both services"
echo ""

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
