import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import Button from '../components/atoms/Button';
import { fetchProductById } from '../utils/api';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch product details. Please try again later.');
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-red-500">{error}</div>;
  }

  if (!product) {
    return <div className="container mx-auto px-4 py-8">Product not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2 pr-4 mb-4 md:mb-0">
          <img src={product.image} alt={product.title} className="w-full h-auto" />
        </div>
        <div className="w-full md:w-1/2 pl-4">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-xl mb-4">${product.price.toFixed(2)}</p>
          <p className="mb-4">{product.description}</p>
          <Button onClick={() => addToCart(product)}>Add to Cart</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;