import React from 'react';
import Button from '../atoms/Button';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg">
      <img src={product.image} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4">Rs. {product.price}</p>
        <p className="text-gray-600 mb-4">{product.description}</p>

        <div className="flex space-x-8">
          <Button onClick={() => addToCart(product)}>
            Add to Cart
          </Button>
          <Link to={`/product/${product.id}`} className="mt-auto">
            <Button variant='secondary'>View Details</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;