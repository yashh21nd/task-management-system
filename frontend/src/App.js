import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskModal from './components/TaskModal';
import TaskDetails from './components/TaskDetails';
import About from './components/About';
import { getTasks, createTask, updateTask, deleteTask } from './services/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  
  // Filter states
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  // Load tasks on component mount
  useEffect(() => {
    loadTasks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      console.log('Loading tasks from API...');
      const response = await getTasks(statusFilter, priorityFilter);
      console.log('API Response:', response);
      setTasks(response.data.tasks);
      setError(null);
    } catch (error) {
      console.error('Error loading tasks - Full error:', error);
      console.error('Error response:', error.response);
      console.error('Error message:', error.message);
      setError(`Failed to load tasks: ${error.message}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  // Reload tasks when filters change
  useEffect(() => {
    loadTasks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, priorityFilter]);

  const handleCreateTask = async (taskData) => {
    try {
      const response = await createTask(taskData);
      setTasks(prev => [response.data.task, ...prev]);
      setShowCreateModal(false);
      setError(null);
    } catch (error) {
      console.error('Error creating task:', error);
      setError('Failed to create task. Please try again.');
      throw error;
    }
  };

  const handleUpdateTask = async (taskId, taskData) => {
    try {
      const response = await updateTask(taskId, taskData);
      setTasks(prev => prev.map(task => 
        task.id === taskId ? response.data.task : task
      ));
      setShowEditModal(false);
      setSelectedTask(null);
      setError(null);
    } catch (error) {
      console.error('Error updating task:', error);
      setError('Failed to update task. Please try again.');
      throw error;
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(taskId);
        setTasks(prev => prev.filter(task => task.id !== taskId));
        setShowDetailsModal(false);
        setSelectedTask(null);
        setError(null);
      } catch (error) {
        console.error('Error deleting task:', error);
        setError('Failed to delete task. Please try again.');
      }
    }
  };

  const handleViewTask = (task) => {
    setSelectedTask(task);
    setShowDetailsModal(true);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setShowEditModal(true);
  };

  const handleStatusChange = (taskId, newStatus) => {
    handleUpdateTask(taskId, { status: newStatus });
  };

  return (
    <div className="container">
      <header className="header">
        <div>
          <h1>Task Management System</h1>
          <p>Organize and track your tasks efficiently</p>
        </div>
        <button 
          className="btn btn-secondary"
          onClick={() => setShowAboutModal(true)}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(10px)',
            padding: '0.75rem 1.25rem'
          }}
        >
          About
        </button>
      </header>

      {error && (
        <div className="error-message" style={{
          background: '#f8d7da',
          color: '#721c24',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '1rem',
          border: '1px solid #f5c6cb'
        }}>
          {error}
          <button 
            onClick={() => setError(null)}
            style={{
              float: 'right',
              background: 'none',
              border: 'none',
              fontSize: '1.2rem',
              cursor: 'pointer',
              color: '#721c24'
            }}
          >
            ×
          </button>
        </div>
      )}

      <div className="task-controls">
        <div className="filter-controls">
          <button 
            className={`filter-btn ${statusFilter === 'all' ? 'active' : ''}`}
            onClick={() => setStatusFilter('all')}
          >
            All Status
          </button>
          <button 
            className={`filter-btn ${statusFilter === 'pending' ? 'active' : ''}`}
            onClick={() => setStatusFilter('pending')}
          >
            Pending
          </button>
          <button 
            className={`filter-btn ${statusFilter === 'in_progress' ? 'active' : ''}`}
            onClick={() => setStatusFilter('in_progress')}
          >
            In Progress
          </button>
          <button 
            className={`filter-btn ${statusFilter === 'completed' ? 'active' : ''}`}
            onClick={() => setStatusFilter('completed')}
          >
            Completed
          </button>
          
          <div style={{ width: '20px' }}></div>
          
          <button 
            className={`filter-btn ${priorityFilter === 'all' ? 'active' : ''}`}
            onClick={() => setPriorityFilter('all')}
          >
            All Priority
          </button>
          <button 
            className={`filter-btn ${priorityFilter === 'high' ? 'active' : ''}`}
            onClick={() => setPriorityFilter('high')}
          >
            High
          </button>
          <button 
            className={`filter-btn ${priorityFilter === 'medium' ? 'active' : ''}`}
            onClick={() => setPriorityFilter('medium')}
          >
            Medium
          </button>
          <button 
            className={`filter-btn ${priorityFilter === 'low' ? 'active' : ''}`}
            onClick={() => setPriorityFilter('low')}
          >
            Low
          </button>
        </div>

        <button 
          className="add-task-btn"
          onClick={() => setShowCreateModal(true)}
        >
          + Add Task
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading tasks</div>
      ) : (
        <TaskList
          tasks={tasks}
          onViewTask={handleViewTask}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
          onStatusChange={handleStatusChange}
        />
      )}

      {/* Create Task Modal */}
      {showCreateModal && (
        <TaskModal
          title="Create New Task"
          onSubmit={handleCreateTask}
          onClose={() => setShowCreateModal(false)}
        />
      )}

      {/* Edit Task Modal */}
      {showEditModal && selectedTask && (
        <TaskModal
          title="Edit Task"
          task={selectedTask}
          onSubmit={(taskData) => handleUpdateTask(selectedTask.id, taskData)}
          onClose={() => {
            setShowEditModal(false);
            setSelectedTask(null);
          }}
        />
      )}

      {/* Task Details Modal */}
      {showDetailsModal && selectedTask && (
        <TaskDetails
          task={selectedTask}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedTask(null);
          }}
          onEdit={() => {
            setShowDetailsModal(false);
            setShowEditModal(true);
          }}
          onDelete={handleDeleteTask}
        />
      )}

      {/* About Modal */}
      {showAboutModal && (
        <About onClose={() => setShowAboutModal(false)} />
      )}
    </div>
  );
}

export default App;