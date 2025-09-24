from flask import Blueprint, request, jsonify
from datetime import datetime
from app import db
from app.models.task import Task

tasks_bp = Blueprint('tasks', __name__)

@tasks_bp.route('/tasks', methods=['GET'])
def get_tasks():
    """Get all tasks with optional filtering"""
    try:
        # Get query parameters
        status = request.args.get('status')
        priority = request.args.get('priority')
        
        # Start with base query
        query = Task.query
        
        # Apply filters
        if status:
            query = query.filter(Task.status == status)
        if priority:
            query = query.filter(Task.priority == priority)
        
        # Order by created_at desc
        tasks = query.order_by(Task.created_at.desc()).all()
        
        return jsonify({
            'success': True,
            'tasks': [task.to_dict() for task in tasks],
            'count': len(tasks)
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@tasks_bp.route('/tasks', methods=['POST'])
def create_task():
    """Create a new task"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({
                'success': False,
                'error': 'No data provided'
            }), 400
        
        # Create new task
        task = Task(
            title=data.get('title'),
            description=data.get('description', ''),
            status=data.get('status', 'pending'),
            priority=data.get('priority', 'medium')
        )
        
        # Parse due_date if provided
        if data.get('due_date'):
            try:
                task.due_date = datetime.fromisoformat(data['due_date'].replace('Z', '+00:00'))
            except ValueError:
                return jsonify({
                    'success': False,
                    'error': 'Invalid due_date format. Use ISO format.'
                }), 400
        
        # Validate task
        validation_errors = task.validate()
        if validation_errors:
            return jsonify({
                'success': False,
                'error': 'Validation failed',
                'validation_errors': validation_errors
            }), 400
        
        # Save to database
        db.session.add(task)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Task created successfully',
            'task': task.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@tasks_bp.route('/tasks/<int:task_id>', methods=['GET'])
def get_task(task_id):
    """Get a specific task by ID"""
    try:
        task = Task.query.get(task_id)
        
        if not task:
            return jsonify({
                'success': False,
                'error': 'Task not found'
            }), 404
        
        # Get task with comments
        task_dict = task.to_dict()
        task_dict['comments'] = [comment.to_dict() for comment in task.comments]
        
        return jsonify({
            'success': True,
            'task': task_dict
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@tasks_bp.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    """Update a specific task"""
    try:
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
        
        # Update fields
        if 'title' in data:
            task.title = data['title']
        if 'description' in data:
            task.description = data['description']
        if 'status' in data:
            task.status = data['status']
        if 'priority' in data:
            task.priority = data['priority']
        if 'due_date' in data:
            if data['due_date']:
                try:
                    task.due_date = datetime.fromisoformat(data['due_date'].replace('Z', '+00:00'))
                except ValueError:
                    return jsonify({
                        'success': False,
                        'error': 'Invalid due_date format. Use ISO format.'
                    }), 400
            else:
                task.due_date = None
        
        # Validate updated task
        validation_errors = task.validate()
        if validation_errors:
            return jsonify({
                'success': False,
                'error': 'Validation failed',
                'validation_errors': validation_errors
            }), 400
        
        # Update timestamp
        task.updated_at = datetime.utcnow()
        
        # Save changes
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Task updated successfully',
            'task': task.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@tasks_bp.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    """Delete a specific task"""
    try:
        task = Task.query.get(task_id)
        
        if not task:
            return jsonify({
                'success': False,
                'error': 'Task not found'
            }), 404
        
        # Delete task (comments will be deleted due to cascade)
        db.session.delete(task)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Task deleted successfully'
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@tasks_bp.route('/tasks/stats', methods=['GET'])
def get_task_stats():
    """Get task statistics"""
    try:
        total_tasks = Task.query.count()
        pending_tasks = Task.query.filter(Task.status == 'pending').count()
        in_progress_tasks = Task.query.filter(Task.status == 'in_progress').count()
        completed_tasks = Task.query.filter(Task.status == 'completed').count()
        
        high_priority_tasks = Task.query.filter(Task.priority == 'high').count()
        medium_priority_tasks = Task.query.filter(Task.priority == 'medium').count()
        low_priority_tasks = Task.query.filter(Task.priority == 'low').count()
        
        return jsonify({
            'success': True,
            'stats': {
                'total_tasks': total_tasks,
                'by_status': {
                    'pending': pending_tasks,
                    'in_progress': in_progress_tasks,
                    'completed': completed_tasks
                },
                'by_priority': {
                    'high': high_priority_tasks,
                    'medium': medium_priority_tasks,
                    'low': low_priority_tasks
                }
            }
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500