import os
from app import create_app

# Create the Flask app
app = create_app()

if __name__ == '__main__':
    # Only run when called directly (development mode)
    print("Starting Flask development server...")
    
    # Initialize database in development
    with app.app_context():
        try:
            from app import db
            from app.models.task import Task
            from app.models.comment import Comment
            db.create_all()
            print("Database tables created successfully!")
        except Exception as e:
            print(f"Error creating database tables: {e}")
    
    port = int(os.getenv('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)