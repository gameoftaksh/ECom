const API_URL = 'https://fakestoreapi.com'; // Using a fake store API for demonstration

export const fetchProducts = async () => {
  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};

export const fetchProductById = async (id) => {
  const response = await fetch(`${API_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  return response.json();
};



// import axios from 'axios';

// const API_BASE_URL = 'http://your-backend-url.com/api'; // Replace with your actual backend URL

// // Create an axios instance with default config
// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Add a request interceptor to include the auth token in requests
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // API functions
// export const login = (credentials) => api.post('/auth/login', credentials);
// export const register = (userData) => api.post('/auth/register', userData);
// export const logout = () => api.post('/auth/logout');

// export const getUserProfile = () => api.get('/users/me');
// export const updateUserProfile = (data) => api.put('/users/me', data);
// export const updatePassword = (data) => api.put('/users/me/password', data);

// export const getAddresses = () => api.get('/users/me/addresses');
// export const createAddress = (data) => api.post('/users/me/addresses', data);
// export const getAddress = (id) => api.get(`/users/me/addresses/${id}`);
// export const updateAddress = (id, data) => api.put(`/users/me/addresses/${id}`, data);
// export const deleteAddress = (id) => api.delete(`/users/me/addresses/${id}`);

// export const getProducts = (params) => api.get('/products', { params });
// export const getProduct = (id) => api.get(`/products/${id}`);
// export const searchProducts = (params) => api.get('/products/search', { params });
// export const getCategories = () => api.get('/products/categories');

// export const getProductReviews = (productId) => api.get(`/products/${productId}/reviews`);
// export const createProductReview = (productId, data) => api.post(`/products/${productId}/reviews`, data);

// export const getCart = () => api.get('/carts');
// export const addToCart = (data) => api.post('/carts/items', data);
// export const removeFromCart = (productId) => api.delete(`/carts/items/${productId}`);
// export const updateCartItem = (productId, data) => api.put(`/carts/items/${productId}`, data);

// export const createOrder = (data) => api.post('/orders', data);
// export const getOrder = (orderId) => api.get(`/orders/${orderId}`);
// export const updateOrderStatus = (orderId, data) => api.put(`/orders/${orderId}/status`, data);
// export const cancelOrder = (orderId) => api.post(`/orders/${orderId}/cancel`);
// export const getOrderHistory = () => api.get('/orders');

// export const initiatePayment = (data) => api.post('/payments', data);
// export const getPaymentStatus = (paymentId) => api.get(`/payments/${paymentId}/status`);

// export default api;