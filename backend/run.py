import os
from app import create_app

app = create_app()

# Initialize database tables when requested
if os.getenv('INIT_DB', 'false').lower() == 'true':
    with app.app_context():
        try:
            from app import db
            from app.models.task import Task
            from app.models.comment import Comment
            db.create_all()
            print("Database tables created successfully!")
        except Exception as e:
            print(f"Error creating database tables: {e}")

if __name__ == '__main__':
    # Only run development server when called directly
    print("Starting Flask development server...")
    port = int(os.getenv('PORT', 5000))
    app.run(debug=False, host='0.0.0.0', port=port)