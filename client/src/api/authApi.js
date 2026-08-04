import API from './axios';

// Login
export const loginUser = async (credentials) => {
  const response = await API.post('/users/login', credentials);
  return response.data;
};

// Register
export const registerUser = async (userData) => {
  const response = await API.post('/users/register', userData);
  return response.data;
};