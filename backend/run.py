import os
from app import create_app

app = create_app()

# Initialize database tables when not in production or when explicitly requested
if __name__ == '__main__' or os.getenv('INIT_DB', 'false').lower() == 'true':
    with app.app_context():
        try:
            from app.models import task, comment
            from app import db
            db.create_all()
            print("Database tables created successfully!")
        except Exception as e:
            print(f"Error creating database tables: {e}")

if __name__ == '__main__':
    print("Starting Flask server...")
    app.run(debug=True, host='0.0.0.0', port=5000)