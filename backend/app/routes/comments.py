from flask import Blueprint, request, jsonify
from datetime import datetime
from app import db
from app.models.comment import Comment
from app.models.task import Task

comments_bp = Blueprint('comments', __name__)

@comments_bp.route('/tasks/<int:task_id>/comments', methods=['GET'])
def get_task_comments(task_id):
    """Get all comments for a specific task"""
    try:
        # Check if task exists
        task = Task.query.get(task_id)
        if not task:
            return jsonify({
                'success': False,
                'error': 'Task not found'
            }), 404
        
        # Get comments for this task
        comments = Comment.query.filter(Comment.task_id == task_id)\
                                .order_by(Comment.created_at.desc()).all()
        
        return jsonify({
            'success': True,
            'comments': [comment.to_dict() for comment in comments],
            'count': len(comments)
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@comments_bp.route('/tasks/<int:task_id>/comments', methods=['POST'])
def create_comment(task_id):
    """Create a new comment for a task"""
    try:
        # Check if task exists
        task = Task.query.get(task_id)
        if not task:
            return jsonify({
                'success': False,
                'error': 'Task not found'
            }), 404
        
        data = request.get_json()
        if not data:
            return jsonify({
                'success': False,
                'error': 'No data provided'
            }), 400
        
        # Create new comment
        comment = Comment(
            content=data.get('content'),
            author=data.get('author', 'Anonymous'),
            task_id=task_id
        )
        
        # Validate comment
        validation_errors = comment.validate()
        if validation_errors:
            return jsonify({
                'success': False,
                'error': 'Validation failed',
                'validation_errors': validation_errors
            }), 400
        
        # Save to database
        db.session.add(comment)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Comment created successfully',
            'comment': comment.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@comments_bp.route('/comments/<int:comment_id>', methods=['GET'])
def get_comment(comment_id):
    """Get a specific comment by ID"""
    try:
        comment = Comment.query.get(comment_id)
        
        if not comment:
            return jsonify({
                'success': False,
                'error': 'Comment not found'
            }), 404
        
        return jsonify({
            'success': True,
            'comment': comment.to_dict()
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@comments_bp.route('/comments/<int:comment_id>', methods=['PUT'])
def update_comment(comment_id):
    """Update a specific comment"""
    try:
        comment = Comment.query.get(comment_id)
        
        if not comment:
            return jsonify({
                'success': False,
                'error': 'Comment not found'
            }), 404
        
        data = request.get_json()
        if not data:
            return jsonify({
                'success': False,
                'error': 'No data provided'
            }), 400
        
        # Update fields
        if 'content' in data:
            comment.content = data['content']
        if 'author' in data:
            comment.author = data['author']
        
        # Validate updated comment
        validation_errors = comment.validate()
        if validation_errors:
            return jsonify({
                'success': False,
                'error': 'Validation failed',
                'validation_errors': validation_errors
            }), 400
        
        # Update timestamp
        comment.updated_at = datetime.utcnow()
        
        # Save changes
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Comment updated successfully',
            'comment': comment.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@comments_bp.route('/comments/<int:comment_id>', methods=['DELETE'])
def delete_comment(comment_id):
    """Delete a specific comment"""
    try:
        comment = Comment.query.get(comment_id)
        
        if not comment:
            return jsonify({
                'success': False,
                'error': 'Comment not found'
            }), 404
        
        # Delete comment
        db.session.delete(comment)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Comment deleted successfully'
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500