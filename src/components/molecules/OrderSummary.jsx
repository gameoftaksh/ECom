import React from 'react';
import { useCart } from '../../contexts/CartContext';

const OrderSummary = () => {
  const { cartItems } = useCart();

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="bg-gray-100 p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id} className="flex justify-between items-center mb-2">
            <div>
              <h4 className="font-medium">{item.name}</h4>
              <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
            </div>
            <p>${(item.price * item.quantity).toFixed(2)}</p>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center mt-4">
        <p className="text-lg font-semibold">Total:</p>
        <p className="text-lg font-semibold">${totalAmount.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default OrderSummary;
