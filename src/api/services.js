import api, { multipartApi } from './config';

// Auth services
export const authService = {
    login: (credentials) => api.post('/api/auth/login', credentials),
    register: (userData) => api.post('/api/auth/register', userData),
    refreshToken: (token) => api.post('/api/auth/refresh-token', { token }),
};

// Laptop services
export const laptopService = {
    getAllLaptops: () => api.get('/api/laptops'),
    getLaptopById: (id) => api.get(`/api/laptops/${id}`),
    createLaptop: (laptopData) => {
        // With Firebase Storage, we're now sending image URLs directly
        return api.post('/api/laptops', laptopData);
    },
    updateLaptop: (id, laptopData) => {
        // With Firebase Storage, we're now sending image URLs directly
        return api.put(`/api/laptops/${id}`, laptopData);
    },
    deleteLaptop: (id) => api.delete(`/api/laptops/${id}`),
};

// Order services
export const orderService = {
    getAllOrders: () => api.get('/api/orders'),
    getOrderById: (id) => api.get(`/api/orders/${id}`),
    createOrder: (orderData) => api.post('/api/orders', orderData),
    updateOrderStatus: (id, statusData) => api.patch(`/api/orders/${id}/status`, statusData),
    assignOrder: (id, assignData) => api.patch(`/api/orders/${id}/assign`, assignData),
    getUserOrders: () => api.get('/api/orders/user'),
};