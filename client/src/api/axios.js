import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8181/api', 
});

// Interceptor: מוסיף את ה-Token לכל בקשה אם הוא קיים ב-localStorage
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;