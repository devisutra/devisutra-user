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
  (response) => response.data, // Return full response for pagination metadata
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
  getAll: async (filters?: { 
    category?: string; 
    search?: string; 
    sort?: string;
    page?: number;
    limit?: number;
  }) => {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.search) params.append('search', filters.search);
    if (filters?.sort) params.append('sort', filters.sort);
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());
    
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
    const response = await axiosInstance.post('/api/auth/signup', data);
    return response.data || response;
  },

  login: async (data: { email?: string; phone?: string; password?: string }) => {
    const response = await axiosInstance.post('/api/auth/login', data);
    return response.data || response;
  },

  logout: async () => {
    const response = await axiosInstance.post('/api/auth/logout');
    return response.data || response;
  },

  sendOTP: async (phone: string) => {
    const response = await axiosInstance.post('/api/auth/send-otp', { phone });
    return response.data || response;
  },

  verifyOTP: async (phone: string, otp: string) => {
    const response = await axiosInstance.post('/api/auth/verify-otp', { phone, otp });
    return response.data || response;
  },

  getSession: async () => {
    const response = await axiosInstance.get('/api/auth/session');
    return response.data || response;
  },

  updateProfile: async (data: { fullName?: string; email?: string; phone?: string }) => {
    const response = await axiosInstance.put('/api/auth/update-profile', data);
    return response.data || response;
  },
};

/**
 * Cart API
 */
export const cartAPI = {
  get: async () => {
    const response = await axiosInstance.get('/api/cart');
    return response.data || response;
  },

  add: async (productId: string, quantity: number = 1) => {
    const response = await axiosInstance.post('/api/cart/add', { productId, quantity });
    return response.data || response;
  },

  update: async (itemId: string, quantity: number) => {
    const response = await axiosInstance.put(`/api/cart/update/${itemId}`, { quantity });
    return response.data || response;
  },

  remove: async (itemId: string) => {
    const response = await axiosInstance.delete(`/api/cart/remove/${itemId}`);
    return response.data || response;
  },

  clear: async () => {
    const response = await axiosInstance.delete('/api/cart/clear');
    return response.data || response;
  },
};

/**
 * Orders API
 */
export const ordersAPI = {
  create: async (customerDetails: Record<string, unknown>, paymentMethod: string = 'COD') => {
    const response = await axiosInstance.post('/api/orders/create', { customerDetails, paymentMethod });
    return response.data || response;
  },

  getAll: async () => {
    const response = await axiosInstance.get('/api/orders');
    return response.data || response;
  },

  getById: async (orderId: string) => {
    const response = await axiosInstance.get(`/api/orders/${orderId}`);
    return response.data || response;
  },

  cancel: async (orderId: string) => {
    const response = await axiosInstance.patch(`/api/orders/${orderId}/cancel`);
    return response.data || response;
  },
};

/**
 * Reviews API
 * Handles all review-related operations
 */
export const reviewsAPI = {
  /**
   * Get reviews for a product
   * @param productId - Product ID
   * @returns Review data including reviews array and average rating
   */
  getByProduct: async (productId: string) => {
    const response = await axiosInstance.get(`/api/reviews?productId=${productId}`);
    const data = response?.data || response;
    return {
      reviews: data?.reviews || [],
      averageRating: data?.averageRating || 0,
      totalReviews: data?.totalReviews || 0,
    };
  },

  /**
   * Submit a new review
   * @param reviewData - Review data including product ID, rating, comment, name, and optional images
   * @returns Created review object
   */
  create: async (reviewData: {
    productId: string;
    rating: number;
    comment: string;
    customerName: string;
    images?: string[];
  }) => {
    // Validate review data
    if (!reviewData.productId || !reviewData.rating || !reviewData.comment || !reviewData.customerName) {
      throw new Error('Product ID, rating, comment, and customer name are required');
    }

    if (reviewData.rating < 1 || reviewData.rating > 5) {
      throw new Error('Rating must be between 1 and 5');
    }

    if (reviewData.comment.trim().length < 10) {
      throw new Error('Comment must be at least 10 characters long');
    }

    const response = await axiosInstance.post('/api/reviews', reviewData);
    return response?.data || response;
  },

  /**
   * Get single review by ID
   * @param reviewId - Review ID
   * @returns Review object
   */
  getById: async (reviewId: string) => {
    const response = await axiosInstance.get(`/api/reviews/${reviewId}`);
    return response?.data || response;
  },
};

/**
 * User API
 */
export const userAPI = {
  getProfile: async () => {
    const response = await axiosInstance.get('/api/user/profile');
    return response.data || response;
  },

  updateProfile: async (data: { fullName?: string; email?: string; phone?: string }) => {
    const response = await axiosInstance.put('/api/user/profile', data);
    return response.data || response;
  },

  changePassword: async (data: { currentPassword: string; newPassword: string }) => {
    const response = await axiosInstance.put('/api/user/change-password', data);
    return response.data || response;
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
