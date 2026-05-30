const API_URL = '/api';

// Interceptor wrapper for fetch to attach tokens
export const fetchApi = async (endpoint, options = {}) => {
  const token = localStorage.getItem('farmFreshUser') 
    ? JSON.parse(localStorage.getItem('farmFreshUser')).token 
    : null;

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('API Request Error:', error.message);
    throw error;
  }
};
