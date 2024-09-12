import React, { useState, useEffect } from 'react';
import { getProduct } from '../utils/api';
import { useParams } from 'react-router-dom';
import Loading from '../components/organisms/Loading';

const ProductDetailsPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>No product found.</p>;
  }

  const handleAddToCart = () => {
    console.log('Adding to cart:', product.name);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap -mx-4">
        {/* Left side (Image) */}
        <div className="w-full md:w-1/2 xl:w-1/2 p-4">
          <div className="relative">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-auto object-cover rounded-lg shadow-md"
            />
          </div>
        </div>

        {/* Right side (Details) */}
        <div className="w-full md:w-1/2 xl:w-1/2 p-4">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <div className="flex items-center justify-between mb-6">
            <span className="text-2xl font-bold">${product.price}</span>
            <button
              onClick={handleAddToCart}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add to Cart
            </button>
          </div>
          <div className="border-t pt-4">
            <h2 className="text-xl font-semibold mb-2">Product Details</h2>
            <ul className="list-disc pl-5 text-gray-600">
              <li>Quantity: {product.quantity}</li>
              <li>Category ID: {product.category}</li>
              <li>Created: {new Date(product.created_at).toLocaleDateString()}</li>
              <li>Last Updated: {new Date(product.updated_at).toLocaleDateString()}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
