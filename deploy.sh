#!/bin/bash

# Task Management System - Local Production Deployment Script
# Built by Yash Shinde

set -e

echo "🚀 Task Management System - Production Deployment"
echo "================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

print_status "Docker and Docker Compose found ✓"

# Stop existing containers
print_status "Stopping existing containers..."
docker-compose down 2>/dev/null || true

# Build and start services
print_status "Building and starting services..."
docker-compose up --build -d

# Wait for services to be ready
print_status "Waiting for services to start..."
sleep 10

# Check if services are running
if docker-compose ps | grep -q "Up"; then
    print_success "Services started successfully!"
    echo ""
    echo "📱 Frontend: http://localhost:3000"
    echo "🔗 Backend API: http://localhost:5000"
    echo "🏥 Health Check: http://localhost:5000/api/health"
    echo ""
    print_status "To stop the application, run: docker-compose down"
    print_status "To view logs, run: docker-compose logs -f"
else
    print_error "Failed to start services. Check logs with: docker-compose logs"
    exit 1
fi

print_success "🎉 Task Management System deployed successfully!"
echo ""
echo "Built and deployed by Yash Shinde"
echo "GitHub: https://github.com/yashh21nd"
echo "LinkedIn: https://www.linkedin.com/in/yash-shinde-dev"