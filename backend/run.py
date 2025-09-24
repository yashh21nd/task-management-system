from app import create_app

app = create_app()

if __name__ == '__main__':
    with app.app_context():
        from app.models import task, comment
        from app import db
        db.create_all()
        print("Database tables created successfully!")
    
    print("Starting Flask server...")
    app.run(debug=True, host='0.0.0.0', port=5000)