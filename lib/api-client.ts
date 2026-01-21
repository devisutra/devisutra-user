/**
 * API Client for Devi Sutra User Frontend
 * Centralized API calls to backend service
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Base fetch wrapper with error handling
 */
async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const url = `${API_URL}${endpoint}`;
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include', // Send cookies for auth
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.error || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
}

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
    const response = await apiFetch(`/api/products${queryString ? `?${queryString}` : ''}`);
    return response.data || response; // Extract data from { success, data, count } structure
  },

  getById: async (id: string) => {
    const response = await apiFetch(`/api/products/${id}`);
    return response.data || response;
  },

  search: async (query: string) => {
    const response = await apiFetch(`/api/products/search?q=${encodeURIComponent(query)}`);
    return response.data || response;
  },

  getByCategory: async (category: string) => {
    const response = await apiFetch(`/api/products?category=${encodeURIComponent(category)}`);
    return response.data || response;
  },
};

/**
 * Authentication API
 */
export const authAPI = {
  signup: async (data: { fullName: string; email?: string; phone?: string; password?: string }) => {
    return apiFetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  login: async (data: { email?: string; phone?: string; password?: string }) => {
    return apiFetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  logout: async () => {
    return apiFetch('/api/auth/logout', {
      method: 'POST',
    });
  },

  sendOTP: async (phone: string) => {
    return apiFetch('/api/auth/send-otp', {
      method: 'POST',
      body: JSON.stringify({ phone }),
    });
  },

  verifyOTP: async (phone: string, otp: string) => {
    return apiFetch('/api/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ phone, otp }),
    });
  },

  getSession: async () => {
    return apiFetch('/api/auth/session');
  },

  updateProfile: async (data: { fullName?: string; email?: string; phone?: string }) => {
    return apiFetch('/api/auth/update-profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
};

/**
 * Cart API
 */
export const cartAPI = {
  get: async () => {
    const response = await apiFetch('/api/cart');
    return response.data || response;
  },

  add: async (productId: string, quantity: number = 1) => {
    return apiFetch('/api/cart/add', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    });
  },

  update: async (itemId: string, quantity: number) => {
    return apiFetch(`/api/cart/update/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    });
  },

  remove: async (itemId: string) => {
    return apiFetch(`/api/cart/remove/${itemId}`, {
      method: 'DELETE',
    });
  },

  clear: async () => {
    return apiFetch('/api/cart/clear', {
      method: 'DELETE',
    });
  },
};

/**
 * Orders API
 */
export const ordersAPI = {
  create: async (customerDetails: any, paymentMethod: string = 'COD') => {
    return apiFetch('/api/orders/create', {
      method: 'POST',
      body: JSON.stringify({ customerDetails, paymentMethod }),
    });
  },

  getAll: async () => {
    const response = await apiFetch('/api/orders');
    return response.data || response;
  },

  getById: async (orderId: string) => {
    const response = await apiFetch(`/api/orders/${orderId}`);
    return response.data || response;
  },

  cancel: async (orderId: string) => {
    return apiFetch(`/api/orders/${orderId}/cancel`, {
      method: 'PATCH',
    });
  },
};

/**
 * Reviews API
 */
export const reviewsAPI = {
  getByProduct: async (productId: string) => {
    return apiFetch(`/api/reviews?productId=${productId}`);
  },

  create: async (reviewData: {
    productId: string;
    rating: number;
    comment: string;
    customerName: string;
    images?: string[];
  }) => {
    return apiFetch('/api/reviews', {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });
  },
};

/**
 * User API
 */
export const userAPI = {
  getProfile: async () => {
    return apiFetch('/api/user/profile');
  },

  updateProfile: async (data: { fullName?: string; email?: string; phone?: string }) => {
    return apiFetch('/api/user/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  changePassword: async (data: { currentPassword: string; newPassword: string }) => {
    return apiFetch('/api/user/change-password', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
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
