import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import Button from '../components/atoms/Button';
import { getProduct, getProductReviews } from '../utils/api';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addItemToCart } = useCart();

  useEffect(() => {
    const loadProductAndReviews = async () => {
      try {
        const [productResponse, reviewsResponse] = await Promise.all([
          getProduct(id),
          getProductReviews(id)
        ]);
        setProduct(productResponse.data);
        setReviews(reviewsResponse.data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch product details. Please try again later.');
        setIsLoading(false);
      }
    };

    loadProductAndReviews();
  }, [id]);

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome to Our Store</h1>
      <ProductList 
        products={products}
        renderProduct={(product) => (
          <div key={product.id} className="border rounded-lg overflow-hidden shadow-lg p-4">
            <img src={product.image} alt={product.title} className="w-full h-48 object-cover mb-4" />
            <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
            <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
            <div className="flex justify-between items-center">
              <Link to={`/product/${product.id}`}>
                <Button variant="secondary">View Details</Button>
              </Link>
              <Button onClick={() => addToCart(product)}>Add to Cart</Button>
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default Home;