// import React from 'react';
// import ProductList from '../components/organisms/ProductList';

// const Home = () => {
//   // This is mock data. In a real application, you'd fetch this from an API
//   const mockProducts = [
//     { id: 1, name: 'Product 1', price: 19.99, image: 'https://via.placeholder.com/150' },
//     { id: 2, name: 'Product 2', price: 29.99, image: 'https://via.placeholder.com/150' },
//     { id: 3, name: 'Product 3', price: 39.99, image: 'https://via.placeholder.com/150' },
//     { id: 4, name: 'Product 4', price: 49.99, image: 'https://via.placeholder.com/150' },
//   ];

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6">Welcome to Our Store</h1>
//       <ProductList products={mockProducts} />
//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect } from 'react';
import ProductList from '../components/organisms/ProductList';
import { getProducts } from '../utils/api'; 

  
const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts(); // Fetch products from API
        console.log(response.data.results);
        setProducts(response.data.results); // Assuming response.data contains the array of products
        setLoading(false);
      } catch (err) {
        setError('Failed to load products');
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1 className='bg-red-600 hover:bg-yellow-700 text-white text-center focus:ring-blue-500 height-20'>Welcome to Our Store</h1>
      <ProductList products={products} /> {/* Pass products to ProductList component */}
    </div>
  );
};

export default Home;
