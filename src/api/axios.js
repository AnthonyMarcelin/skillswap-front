// src/api/index.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 10_000,      // 10 s
  withCredentials: true // garde les cookies si ton backend s’en sert
});

export default api;
