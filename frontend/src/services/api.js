import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api'
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (username, password) => {
  try {
    const response = await api.post('/auth/login', { username, password });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify({
      username: response.data.username,
      role: response.data.role
    }));
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getEquipments = async () => {
  const response = await api.get('/equipment');
  return response.data;
};

export const getEquipment = async (id) => {
  const response = await api.get(`/equipment/${id}`);
  return response.data;
};

export const createEquipment = async (data) => {
  const response = await api.post('/equipment', data);
  return response.data;
};

export const updateEquipment = async (id, data) => {
  const response = await api.put(`/equipment/${id}`, data);
  return response.data;
};

export const deleteEquipment = async (id) => {
  await api.delete(`/equipment/${id}`);
};

export const getPlatforms = async () => {
  const response = await api.get('/platforms');
  return response.data;
};

export default api; 