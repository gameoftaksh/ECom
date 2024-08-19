import React from 'react';
import CheckoutForm from '../components/organisms/CheckoutForm';
import OrderSummary from '../components/molecules/OrderSummary';
import { useCart } from '../contexts/CartContext';

const Checkout = () => {
  const { clearCart } = useCart();

  const handleOrderSubmit = (formData) => {
    // Here, you would typically send formData to the server
    console.log('Order submitted:', formData);

    // Clear the cart after order submission
    clearCart();

    // Navigate to an order confirmation page or show a confirmation message
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <CheckoutForm onSubmit={handleOrderSubmit} />
        <OrderSummary />
      </div>
    </div>
  );
};

export default Checkout;
