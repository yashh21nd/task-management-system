from datetime import datetime
from app import db

class Task(db.Model):
    __tablename__ = 'tasks'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=True)
    status = db.Column(db.String(20), nullable=False, default='pending')  # pending, in_progress, completed
    priority = db.Column(db.String(10), nullable=False, default='medium')  # low, medium, high
    due_date = db.Column(db.DateTime, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    
    # Relationship with comments
    comments = db.relationship('Comment', backref='task', lazy=True, cascade='all, delete-orphan')
    
    def __repr__(self):
        return f'<Task {self.id}: {self.title}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'status': self.status,
            'priority': self.priority,
            'due_date': self.due_date.isoformat() if self.due_date else None,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat(),
            'comments_count': len(self.comments)
        }
    
    def validate(self):
        """Validate task data"""
        errors = []
        
        if not self.title or len(self.title.strip()) < 1:
            errors.append("Title is required and cannot be empty")
        
        if self.title and len(self.title) > 200:
            errors.append("Title cannot exceed 200 characters")
        
        valid_statuses = ['pending', 'in_progress', 'completed']
        if self.status not in valid_statuses:
            errors.append(f"Status must be one of: {', '.join(valid_statuses)}")
        
        valid_priorities = ['low', 'medium', 'high']
        if self.priority not in valid_priorities:
            errors.append(f"Priority must be one of: {', '.join(valid_priorities)}")
        
        return errors