import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import Button from '../components/atoms/Button';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/" className="text-blue-600 hover:text-blue-800">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cartItems.map((item) => (
        <div key={item.id} className="flex items-center justify-between border-b py-4">
          <div className="flex items-center">
            <img src={item.image} alt={item.title} className="w-16 h-16 object-cover mr-4" />
            <div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p>${item.price.toFixed(2)}</p>
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="px-2 py-1 bg-gray-200 rounded"
            >
              -
            </button>
            <span className="mx-2">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="px-2 py-1 bg-gray-200 rounded"
            >
              +
            </button>
            <Button onClick={() => removeFromCart(item.id)} variant="secondary" className="ml-4">
              Remove
            </Button>
          </div>
        </div>
      ))}
      <div className="mt-8">
        <p className="text-xl font-bold">Total: ${getCartTotal().toFixed(2)}</p>
        <Link to="/checkout">
          <Button className="mt-4">Proceed to Checkout</Button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;