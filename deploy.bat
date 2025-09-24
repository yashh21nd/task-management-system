@echo off
REM Task Management System - Windows Production Deployment Script
REM Built by Yash Shinde

echo.
echo 🚀 Task Management System - Production Deployment
echo =================================================
echo.

REM Check if Docker is installed
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Docker is not installed. Please install Docker Desktop first.
    pause
    exit /b 1
)

docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Docker Compose is not installed. Please install Docker Desktop first.
    pause
    exit /b 1
)

echo [INFO] Docker and Docker Compose found ✓
echo.

REM Stop existing containers
echo [INFO] Stopping existing containers...
docker-compose down 2>nul

REM Build and start services
echo [INFO] Building and starting services...
docker-compose up --build -d

REM Wait for services to be ready
echo [INFO] Waiting for services to start...
timeout /t 10 /nobreak >nul

REM Check if services are running
docker-compose ps | findstr "Up" >nul
if %errorlevel% equ 0 (
    echo.
    echo [SUCCESS] Services started successfully!
    echo.
    echo 📱 Frontend: http://localhost:3000
    echo 🔗 Backend API: http://localhost:5000
    echo 🏥 Health Check: http://localhost:5000/api/health
    echo.
    echo [INFO] To stop the application, run: docker-compose down
    echo [INFO] To view logs, run: docker-compose logs -f
    echo.
    echo 🎉 Task Management System deployed successfully!
    echo.
    echo Built and deployed by Yash Shinde
    echo GitHub: https://github.com/yashh21nd
    echo LinkedIn: https://www.linkedin.com/in/yash-shinde-dev
) else (
    echo [ERROR] Failed to start services. Check logs with: docker-compose logs
    pause
    exit /b 1
)

pause