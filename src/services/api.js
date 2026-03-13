
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://carwashbackend-nd3v.onrender.com';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  getProfile: () => api.get('/auth/profile'),
};

// Customers API
export const customersAPI = {
  getAll: () => api.get('/customers'),
  getById: (id) => api.get(`/customers/${id}`),
  create: (data) => api.post('/customers', data),
  update: (id, data) => api.put(`/customers/${id}`, data),
  delete: (id) => api.delete(`/customers/${id}`),
};

// Appointments API
export const appointmentsAPI = {
  getAll: () => api.get('/appointments'),
  getById: (id) => api.get(`/appointments/${id}`),
  create: (data) => api.post('/appointments', data),
  update: (id, data) => api.put(`/appointments/${id}`, data),
  delete: (id) => api.delete(`/appointments/${id}`),
  updateStatus: (id, status) => api.patch(`/appointments/${id}/status`, { status }),
};

// Job Sheets API
export const jobSheetsAPI = {
  getAll: () => api.get('/jobsheets'),
  getById: (id) => api.get(`/jobsheets/${id}`),
  create: (data) => api.post('/jobsheets', data),
  update: (id, data) => api.put(`/jobsheets/${id}`, data),
  delete: (id) => api.delete(`/jobsheets/${id}`),
  updateStatus: (id, data) => api.patch(`/jobsheets/${id}/status`, data),
  uploadPhotos: (id, formData) => api.post(`/jobsheets/${id}/photos`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
};

// Inventory API
export const inventoryAPI = {
  getAll: () => api.get('/inventory'),
  getById: (id) => api.get(`/inventory/${id}`),
  create: (data) => api.post('/inventory', data),
  update: (id, data) => api.put(`/inventory/${id}`, data),
  delete: (id) => api.delete(`/inventory/${id}`),
  updateStock: (id, quantity) => api.patch(`/inventory/${id}/stock`, { quantity }),
};

// Expenses API
export const expensesAPI = {
  getAll: () => api.get('/expenses'),
  getById: (id) => api.get(`/expenses/${id}`),
  create: (data) => api.post('/expenses', data),
  update: (id, data) => api.put(`/expenses/${id}`, data),
  delete: (id) => api.delete(`/expenses/${id}`),
  approve: (id) => api.patch(`/expenses/${id}/approve`),
};

// Packages API
export const packagesAPI = {
  getAll: () => api.get('/packages'),
  getById: (id) => api.get(`/packages/${id}`),
  create: (data) => api.post('/packages', data),
  update: (id, data) => api.put(`/packages/${id}`, data),
  delete: (id) => api.delete(`/packages/${id}`),
};

// Staff API
export const staffAPI = {
  getAll: () => api.get('/staff'),
  getById: (id) => api.get(`/staff/${id}`),
  create: (data) => api.post('/staff', data),
  update: (id, data) => api.put(`/staff/${id}`, data),
  delete: (id) => api.delete(`/staff/${id}`),
  attendance: (id, data) => api.post(`/staff/${id}/attendance`, data),
};

// Reports API
export const reportsAPI = {
  getRevenue: (params) => api.get('/reports/revenue', { params }),
  getExpenses: (params) => api.get('/reports/expenses', { params }),
  getCustomers: (params) => api.get('/reports/customers', { params }),
  getTopServices: (params) => api.get('/reports/top-services', { params }),
  getDailyStats: (params) => api.get('/reports/daily', { params }),
  getDashboardSummary: () => api.get('/reports/dashboard'),
};

export default api;


