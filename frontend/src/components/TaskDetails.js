import React, { useState, useEffect } from 'react';
import { getTaskComments, createComment } from '../services/api';

const TaskDetails = ({ task, onClose, onEdit, onDelete }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  const [loadingComments, setLoadingComments] = useState(true);
  const [addingComment, setAddingComment] = useState(false);

  useEffect(() => {
    loadComments();
  }, [task.id]);

  const loadComments = async () => {
    try {
      setLoadingComments(true);
      const response = await getTaskComments(task.id);
      setComments(response.data.comments);
    } catch (error) {
      console.error('Error loading comments:', error);
    } finally {
      setLoadingComments(false);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    
    if (!newComment.trim()) return;
    
    try {
      setAddingComment(true);
      const response = await createComment(task.id, {
        content: newComment,
        author: commentAuthor || 'Anonymous'
      });
      
      setComments(prev => [response.data.comment, ...prev]);
      setNewComment('');
      setCommentAuthor('');
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setAddingComment(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'status-pending';
      case 'in_progress': return 'status-in_progress';
      case 'completed': return 'status-completed';
      default: return 'status-pending';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return 'priority-medium';
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{task.title}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          {/* Task Details */}
          <div style={{ marginBottom: '2rem' }}>
            <div className="task-meta" style={{ marginBottom: '1rem' }}>
              <span className={`task-status ${getStatusColor(task.status)}`}>
                {task.status.replace('_', ' ')}
              </span>
              <span className={`task-priority ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </span>
            </div>

            {task.description && (
              <div style={{ marginBottom: '1rem' }}>
                <strong>Description:</strong>
                <p style={{ marginTop: '0.5rem', color: '#666', lineHeight: '1.5' }}>
                  {task.description}
                </p>
              </div>
            )}

            {task.due_date && (
              <div style={{ marginBottom: '1rem' }}>
                <strong>Due Date:</strong> {formatDate(task.due_date)}
              </div>
            )}

            <div style={{ marginBottom: '1rem' }}>
              <strong>Created:</strong> {formatDate(task.created_at)}
            </div>

            <div>
              <strong>Last Updated:</strong> {formatDate(task.updated_at)}
            </div>
          </div>

          {/* Comments Section */}
          <div>
            <h3 style={{ marginBottom: '1rem' }}>Comments ({comments.length})</h3>
            
            {/* Add Comment Form */}
            <form onSubmit={handleAddComment} style={{ marginBottom: '1.5rem' }}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Your name (optional)"
                  value={commentAuthor}
                  onChange={(e) => setCommentAuthor(e.target.value)}
                  className="form-input"
                  style={{ marginBottom: '0.5rem' }}
                />
                <textarea
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="form-textarea"
                  rows="3"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={addingComment || !newComment.trim()}
              >
                {addingComment ? 'Adding...' : 'Add Comment'}
              </button>
            </form>

            {/* Comments List */}
            {loadingComments ? (
              <div className="loading">Loading comments</div>
            ) : comments.length === 0 ? (
              <p style={{ color: '#666', textAlign: 'center', padding: '1rem' }}>
                No comments yet. Be the first to comment!
              </p>
            ) : (
              <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {comments.map(comment => (
                  <div 
                    key={comment.id} 
                    style={{
                      background: '#f8f9fa',
                      padding: '1rem',
                      borderRadius: '8px',
                      marginBottom: '0.5rem',
                      border: '1px solid #e9ecef'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '0.5rem'
                    }}>
                      <strong style={{ color: '#495057' }}>{comment.author}</strong>
                      <small style={{ color: '#6c757d' }}>
                        {formatDate(comment.created_at)}
                      </small>
                    </div>
                    <p style={{ margin: 0, color: '#495057' }}>{comment.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
          <button className="btn btn-primary" onClick={onEdit}>
            Edit Task
          </button>
          <button 
            className="btn btn-danger" 
            onClick={() => onDelete(task.id)}
          >
            Delete Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;