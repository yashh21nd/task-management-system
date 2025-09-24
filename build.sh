#!/bin/bash
# Build script for Render deployment

echo "Installing backend dependencies..."
cd backend
pip install -r requirements.txt

echo "Installing frontend dependencies..."
cd ../frontend
npm install

echo "Building frontend for production..."
npm run build

echo "Build completed successfully!"