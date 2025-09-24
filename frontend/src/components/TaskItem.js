import React from 'react';

const TaskItem = ({ task, onView, onEdit, onDelete, onStatusChange }) => {
  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
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

  const handleStatusChange = (e) => {
    onStatusChange(task.id, e.target.value);
  };

  return (
    <div className="task-card">
      <div className="task-header">
        <div>
          <h3 className="task-title">{task.title}</h3>
          {task.description && (
            <p className="task-description">
              {task.description.length > 100 
                ? `${task.description.substring(0, 100)}...` 
                : task.description
              }
            </p>
          )}
        </div>
      </div>

      <div className="task-meta">
        <span className={`task-status ${getStatusColor(task.status)}`}>
          {task.status.replace('_', ' ')}
        </span>
        <span className={`task-priority ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </span>
      </div>

      {task.due_date && (
        <div className="task-due-date">
          <strong>Due:</strong> {formatDate(task.due_date)}
        </div>
      )}

      {task.comments_count > 0 && (
        <div className="task-comments-count">
          💬 {task.comments_count} comment{task.comments_count !== 1 ? 's' : ''}
        </div>
      )}

      <div className="task-actions">
        <button className="btn btn-primary" onClick={onView}>
          View
        </button>
        <button className="btn btn-secondary" onClick={onEdit}>
          Edit
        </button>
        <select 
          value={task.status} 
          onChange={handleStatusChange}
          className="btn"
          style={{
            background: '#28a745',
            color: 'white',
            border: 'none'
          }}
        >
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button className="btn btn-danger" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;