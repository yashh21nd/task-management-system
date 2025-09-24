from datetime import datetime
from app import db

class Comment(db.Model):
    __tablename__ = 'comments'
    
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    author = db.Column(db.String(100), nullable=True, default='Anonymous')
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    
    # Foreign key to tasks
    task_id = db.Column(db.Integer, db.ForeignKey('tasks.id'), nullable=False)
    
    def __repr__(self):
        return f'<Comment {self.id} for Task {self.task_id}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'author': self.author,
            'task_id': self.task_id,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }
    
    def validate(self):
        """Validate comment data"""
        errors = []
        
        if not self.content or len(self.content.strip()) < 1:
            errors.append("Comment content is required and cannot be empty")
        
        if self.content and len(self.content) > 1000:
            errors.append("Comment cannot exceed 1000 characters")
        
        if self.author and len(self.author) > 100:
            errors.append("Author name cannot exceed 100 characters")
        
        return errors