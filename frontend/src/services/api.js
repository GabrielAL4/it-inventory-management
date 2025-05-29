import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (username, password) => {
  const response = await api.post('/api/auth/login', { username, password });
  return response.data;
};

export const getEquipments = async () => {
  const response = await api.get('/api/equipment');
  return response.data;
};

export const getEquipment = async (id) => {
  const response = await api.get(`/api/equipment/${id}`);
  return response.data;
};

export const createEquipment = async (data) => {
  const response = await api.post('/api/equipment', data);
  return response.data;
};

export const updateEquipment = async (id, data) => {
  const response = await api.put(`/api/equipment/${id}`, data);
  return response.data;
};

export const deleteEquipment = async (id) => {
  await api.delete(`/api/equipment/${id}`);
};

export const getPlatforms = async () => {
  const response = await api.get('/api/platforms');
  return response.data;
};

export default api; 