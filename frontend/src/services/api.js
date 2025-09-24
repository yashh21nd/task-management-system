import axios from 'axios';

// API Configuration - Updated for production deployment
// Last updated: September 24, 2025
// FORCING CORRECT URL - TEMPORARY FIX
const baseURL = 'https://task-management-system-1-cabp.onrender.com/api';

// Debug: Log the API URL being used
console.log('API Base URL:', baseURL);
console.log('Environment API URL (ignored):', process.env.REACT_APP_API_URL);

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`Response received:`, response.data);
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Task API functions
export const getTasks = async (status = null, priority = null) => {
  const params = {};
  if (status && status !== 'all') params.status = status;
  if (priority && priority !== 'all') params.priority = priority;
  
  return api.get('/tasks', { params });
};

export const getTask = async (id) => {
  return api.get(`/tasks/${id}`);
};

export const createTask = async (taskData) => {
  return api.post('/tasks', taskData);
};

export const updateTask = async (id, taskData) => {
  return api.put(`/tasks/${id}`, taskData);
};

export const deleteTask = async (id) => {
  return api.delete(`/tasks/${id}`);
};

export const getTaskStats = async () => {
  return api.get('/tasks/stats');
};

// Comment API functions
export const getTaskComments = async (taskId) => {
  return api.get(`/tasks/${taskId}/comments`);
};

export const createComment = async (taskId, commentData) => {
  return api.post(`/tasks/${taskId}/comments`, commentData);
};

export const getComment = async (commentId) => {
  return api.get(`/comments/${commentId}`);
};

export const updateComment = async (commentId, commentData) => {
  return api.put(`/comments/${commentId}`, commentData);
};

export const deleteComment = async (commentId) => {
  return api.delete(`/comments/${commentId}`);
};

export default api;