import React from 'react';
import Button from '../atoms/Button';

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
        <Button onClick={() => console.log('Add to cart:', product.id)}>
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;