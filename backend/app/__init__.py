from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Initialize extensions
db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    
    # Configuration
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')
    
    # Fix PostgreSQL URL for newer versions
    database_url = os.getenv('DATABASE_URL', 'sqlite:///task_management.db')
    if database_url.startswith('postgres://'):
        database_url = database_url.replace('postgres://', 'postgresql://', 1)
    
    app.config['SQLALCHEMY_DATABASE_URI'] = database_url
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # Initialize extensions with app
    db.init_app(app)
    CORS(app, resources={
        r"/api/*": {
            "origins": [
                "http://localhost:3000", 
                "http://127.0.0.1:3000", 
                "http://localhost:3001",
                "https://*.onrender.com",
                "https://*.vercel.app",
                os.getenv('FRONTEND_URL', 'http://localhost:3000')
            ],
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"],
            "supports_credentials": True
        }
    })
    
    # Add basic routes for testing
    @app.route('/')
    def root():
        return {'message': 'Task Management API', 'status': 'running'}
    
    # Add a simple health check endpoint
    @app.route('/api/health')
    def health_check():
        try:
            # Test database connection
            db.session.execute('SELECT 1')
            return {'status': 'healthy', 'message': 'Task Management API is running', 'database': 'connected'}
        except Exception as e:
            return {'status': 'unhealthy', 'message': 'Database connection failed', 'error': str(e)}, 500
    
    # Add database initialization endpoint
    @app.route('/api/init-db')
    def init_database():
        try:
            db.create_all()
            return {'status': 'success', 'message': 'Database tables created successfully'}
        except Exception as e:
            return {'status': 'error', 'message': 'Failed to create database tables', 'error': str(e)}, 500
    
    # Register blueprints
    from app.routes.tasks import tasks_bp
    from app.routes.comments import comments_bp
    
    app.register_blueprint(tasks_bp, url_prefix='/api')
    app.register_blueprint(comments_bp, url_prefix='/api')
    
    return app