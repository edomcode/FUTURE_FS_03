import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;
const baseURL = apiUrl
  ? apiUrl.replace(/\/$/, '').replace(/\/api$/, '') + '/api'
  : '/api';

const api = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
