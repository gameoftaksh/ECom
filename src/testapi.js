
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api'; 
axios.get(`${API_URL}/products`)
  .then(response => {
    console.log('Products:', response.data);
  })
  .catch(error => {
    console.error('Error fetching products:', error);
  });
