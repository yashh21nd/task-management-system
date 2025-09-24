import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onViewTask, onEditTask, onDeleteTask, onStatusChange }) => {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <h3>No tasks found</h3>
        <p>Create your first task to get started!</p>
      </div>
    );
  }

  return (
    <div className="tasks-grid">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onView={() => onViewTask(task)}
          onEdit={() => onEditTask(task)}
          onDelete={() => onDeleteTask(task.id)}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
};

export default TaskList;