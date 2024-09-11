import React, { useState, useEffect } from 'react';
import mouse1 from '../assets/mouse1.jpg';
import mouse2 from '../assets/mouse2.jpg';
import mouse3 from '../assets/mouse3.jpg';
import mouse4 from '../assets/mouse4.jpg';
import { getProduct } from '../utils/api';
import { useParams } from 'react-router-dom';
import Loading from '../components/organisms/Loading'; // Import Loading component

const ProductDetailsPage = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetchedProduct, setProduct] = useState(null);

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
        <Loading /> {/* Use the Loading component */}
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!fetchedProduct) {
    return <p>No product found.</p>;
  }

  const handlePrevClick = () => {
    setCurrentImageIndex((currentImageIndex + fetchedProduct.images.length - 1) % fetchedProduct.images.length);
  };

  const handleNextClick = () => {
    setCurrentImageIndex((currentImageIndex + 1) % fetchedProduct.images.length);
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleAddToCart = () => {
    // Implement add to cart logic here
    console.log('Adding to cart:', fetchedProduct.name);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap -mx-4">
        {/* Left side (Images) */}
        <div className="w-full md:w-1/2 xl:w-1/2 p-4">
          <div className="relative">
            <img
              src={fetchedProduct.images[currentImageIndex]}
              alt={`Product image ${currentImageIndex + 1}`}
              className="w-full h-auto object-cover rounded-lg shadow-md"
            />
            <button
              onClick={handlePrevClick}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNextClick}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-4">
            {fetchedProduct.images.slice(1).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Product image ${index + 2}`}
                className="w-full h-auto object-cover rounded-lg shadow-md cursor-pointer hover:opacity-75 transition-opacity duration-300 ease-in-out"
                onClick={() => handleThumbnailClick(index + 1)}
              />
            ))}
          </div>
        </div>

        {/* Right side (Details) */}
        <div className="w-full md:w-1/2 xl:w-1/2 p-4">
          <h1 className="text-3xl font-bold mb-4">{fetchedProduct.name}</h1>
          <div className="flex items-center mb-4">
            <span className="text-yellow-500 mr-2">{fetchedProduct.rating}</span>
            <span className="text-gray-600">/ 5</span>
          </div>
          <p className="text-gray-700 mb-6">{fetchedProduct.description}</p>
          <div className="flex items-center justify-between mb-6">
            <span className="text-2xl font-bold">${fetchedProduct.price}</span>
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
              {fetchedProduct.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductDetailsPage.defaultProps = {
  product: {
    name: 'Gaming Mouse',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    rating: '4.5',
    price: 99.99,
    images: [mouse1, mouse2, mouse3, mouse4],
    details: ['Material: Cotton', 'Color: Blue', 'Size: Large', 'Weight: 500g']
  }
};

export default ProductDetailsPage;
