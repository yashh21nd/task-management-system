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
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///task_management.db')
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
        return {'status': 'healthy', 'message': 'Task Management API is running'}
    
    # Register blueprints
    from app.routes.tasks import tasks_bp
    from app.routes.comments import comments_bp
    
    app.register_blueprint(tasks_bp, url_prefix='/api')
    app.register_blueprint(comments_bp, url_prefix='/api')
    
    return app