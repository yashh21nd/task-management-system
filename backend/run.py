import os
from app import create_app

# Create the Flask app
app = create_app()

# Always initialize database tables on startup
with app.app_context():
    try:
        from app import db
        from app.models.task import Task
        from app.models.comment import Comment
        db.create_all()
        print("Database tables initialized successfully!")
    except Exception as e:
        print(f"Error initializing database tables: {e}")

if __name__ == '__main__':
    # Development server (only when run directly)
    print("Starting Flask development server...")
    port = int(os.getenv('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)