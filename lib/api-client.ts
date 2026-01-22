/**
 * API Client for Devi Sutra User Frontend
 * Centralized API calls to backend service using Axios
 */

import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Send cookies for auth
});

// Response interceptor for error handling and data extraction
axiosInstance.interceptors.response.use(
  (response) => response.data.data || response.data,
  (error) => {
    console.error(`API Error:`, error);
    const message = error.response?.data?.message || error.response?.data?.error || error.message || 'API request failed';
    throw new Error(message);
  }
);

/**
 * Products API
 */
export const productsAPI = {
  getAll: async (filters?: { category?: string; search?: string; sort?: string }) => {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.search) params.append('search', filters.search);
    if (filters?.sort) params.append('sort', filters.sort);
    
    const queryString = params.toString();
    return axiosInstance.get(`/api/products${queryString ? `?${queryString}` : ''}`);
  },

  getById: async (id: string) => {
    return axiosInstance.get(`/api/products/${id}`);
  },

  search: async (query: string) => {
    return axiosInstance.get(`/api/products/search?q=${encodeURIComponent(query)}`);
  },

  getByCategory: async (category: string) => {
    return axiosInstance.get(`/api/products?category=${encodeURIComponent(category)}`);
  },
};

/**
 * Authentication API
 */
export const authAPI = {
  signup: async (data: { fullName: string; email?: string; phone?: string; password?: string }) => {
    return axiosInstance.post('/api/auth/signup', data);
  },

  login: async (data: { email?: string; phone?: string; password?: string }) => {
    return axiosInstance.post('/api/auth/login', data);
  },

  logout: async () => {
    return axiosInstance.post('/api/auth/logout');
  },

  sendOTP: async (phone: string) => {
    return axiosInstance.post('/api/auth/send-otp', { phone });
  },

  verifyOTP: async (phone: string, otp: string) => {
    return axiosInstance.post('/api/auth/verify-otp', { phone, otp });
  },

  getSession: async () => {
    return axiosInstance.get('/api/auth/session');
  },

  updateProfile: async (data: { fullName?: string; email?: string; phone?: string }) => {
    return axiosInstance.put('/api/auth/update-profile', data);
  },
};

/**
 * Cart API
 */
export const cartAPI = {
  get: async () => {
    return axiosInstance.get('/api/cart');
  },

  add: async (productId: string, quantity: number = 1) => {
    return axiosInstance.post('/api/cart/add', { productId, quantity });
  },

  update: async (itemId: string, quantity: number) => {
    return axiosInstance.put(`/api/cart/update/${itemId}`, { quantity });
  },

  remove: async (itemId: string) => {
    return axiosInstance.delete(`/api/cart/remove/${itemId}`);
  },

  clear: async () => {
    return axiosInstance.delete('/api/cart/clear');
  },
};

/**
 * Orders API
 */
export const ordersAPI = {
  create: async (customerDetails: any, paymentMethod: string = 'COD') => {
    return axiosInstance.post('/api/orders/create', { customerDetails, paymentMethod });
  },

  getAll: async () => {
    return axiosInstance.get('/api/orders');
  },

  getById: async (orderId: string) => {
    return axiosInstance.get(`/api/orders/${orderId}`);
  },

  cancel: async (orderId: string) => {
    return axiosInstance.patch(`/api/orders/${orderId}/cancel`);
  },
};

/**
 * Reviews API
 */
export const reviewsAPI = {
  getByProduct: async (productId: string) => {
    const response = await axiosInstance.get(`/api/reviews?productId=${productId}`);
    // Return the reviews array from the nested data structure
    return response.reviews || [];
  },

  create: async (reviewData: {
    productId: string;
    rating: number;
    comment: string;
    customerName: string;
    images?: string[];
  }) => {
    return axiosInstance.post('/api/reviews', reviewData);
  },
};

/**
 * User API
 */
export const userAPI = {
  getProfile: async () => {
    return axiosInstance.get('/api/user/profile');
  },

  updateProfile: async (data: { fullName?: string; email?: string; phone?: string }) => {
    return axiosInstance.put('/api/user/profile', data);
  },

  changePassword: async (data: { currentPassword: string; newPassword: string }) => {
    return axiosInstance.put('/api/user/change-password', data);
  },
};

// Export all as default
const apiClient = {
  products: productsAPI,
  auth: authAPI,
  cart: cartAPI,
  orders: ordersAPI,
  reviews: reviewsAPI,
  user: userAPI,
};

export default apiClient;
