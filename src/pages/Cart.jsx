import React from 'react';
import { useCart } from '../contexts/CartContext';
import Button from '../components/atoms/Button';
import ProductCard from '../components/molecules/ProductCard';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return <div className="container mx-auto px-4 py-4">Your cart is empty.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cartItems.map(item => (
          <div key={item.id} className="relative">
            <ProductCard product={item} />
            <div className="absolute top-0 right-0 p-2">
              <Button variant="secondary" onClick={() => removeFromCart(item.id)}>Remove</Button>
            </div>
            <div className="mt-2">
              <label htmlFor={`quantity-${item.id}`} className="block text-sm font-medium">
                Quantity
              </label>
              <input 
                type="number" 
                id={`quantity-${item.id}`} 
                value={item.quantity} 
                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
                className="border rounded w-16 px-2 mt-1"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6">
      <Button variant="primary" onClick={() => navigate('/checkout')}>
        Checkout
      </Button>
      </div>
    </div>
  );
};

export default Cart;
