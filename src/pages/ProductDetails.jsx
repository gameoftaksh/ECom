import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from '../utils/api';
import Button from '../components/atoms/Button';
import ErrorMessage from '../components/atoms/ErrorMessage';
import LoadingSpinner from '../components/atoms/LoadingSpinner';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await getProduct(id);
        setProduct(response.data);
      } catch (err) {
        setError('Failed to fetch product details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!product) return <ErrorMessage message="Product not found" />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <img src={product.image} alt={product.name} className="w-full h-auto object-cover" />
        </div>
        <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          {/* <p className="text-xl text-gray-600 mb-4">${product.price.toFixed(2)}</p> */}
          <p className="mb-4">{product.description}</p>
          <Button>Add to Cart</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;