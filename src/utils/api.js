import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api'; 
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });


export const getProducts = (params) => api.get('/products', { params });
export const getProduct = (id) => api.get(`/products/${id}`);
export const searchProducts = (params) => api.get('/products/search', { params });
export const getCategories = () => api.get('/categories');