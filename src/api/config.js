import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to refresh token on page load
const refreshTokenOnLoad = async () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/refresh-token`, { token });
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        return true;
      }
    } catch (error) {
      console.error('Failed to refresh token on page load:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      window.location.href = '/login';
      return false;
    }
  }
  return false;
};

// Call the refresh function when the module is loaded
refreshTokenOnLoad();

// Create a multipart instance for file uploads
export const multipartApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

// Add auth token to multipartApi requests
multipartApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors and token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If the error is 401 and we haven't tried to refresh the token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to refresh the token using Redux action
        const store = await import('../Redux/store').then(module => module.default);
        await store.dispatch(await import('../Redux/slices/authSlice').then(module => module.refreshAccessToken));
        
        // Get the new token from localStorage
        const newToken = localStorage.getItem('token');
        
        if (newToken) {
          // Update the Authorization header with the new token
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          // Retry the original request with the new token
          return axios(originalRequest);
        }
      } catch (refreshError) {
        // If refresh token fails, log out the user
        localStorage.removeItem('token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    // For other errors or if token refresh failed
    return Promise.reject(error);
  }
);

export default api;