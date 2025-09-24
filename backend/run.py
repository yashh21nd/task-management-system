import os
from app import create_app

app = create_app()

# Initialize database tables when requested
if os.getenv('INIT_DB', 'false').lower() == 'true' or __name__ == '__main__':
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
    print("Starting Flask server...")
    port = int(os.getenv('PORT', 5000))
    app.run(debug=False, host='0.0.0.0', port=port)
else:
    # For production (Gunicorn will handle this)
    port = int(os.getenv('PORT', 10000))
    if os.getenv('FLASK_ENV') == 'production':
        print(f"Production server starting on port {port}")
        app.run(debug=False, host='0.0.0.0', port=port)