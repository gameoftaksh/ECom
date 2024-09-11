import React, { useState } from 'react';

const CheckoutForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    paymentMethod: 'creditCard',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>
      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleChange}
        className="border rounded w-full px-3 py-2"
        required
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        className="border rounded w-full px-3 py-2"
        required
      />
      <input
        type="text"
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
        className="border rounded w-full px-3 py-2"
        required
      />
      <input
        type="text"
        name="postalCode"
        placeholder="Postal Code"
        value={formData.postalCode}
        onChange={handleChange}
        className="border rounded w-full px-3 py-2"
        required
      />
      <input
        type="text"
        name="country"
        placeholder="Country"
        value={formData.country}
        onChange={handleChange}
        className="border rounded w-full px-3 py-2"
        required
      />
      <h3 className="text-lg font-semibold mb-4">Payment Information</h3>
      <select
        name="paymentMethod"
        value={formData.paymentMethod}
        onChange={handleChange}
        className="border rounded w-full px-3 py-2"
        required
      >
        <option value="creditCard">Credit Card</option>
        <option value="paypal">UPI</option>
        <option value="paypal">Net Banking</option>

      </select>
      {formData.paymentMethod === 'creditCard' && (
        <>
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            value={formData.cardNumber}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2"
            required
          />
          <input
            type="text"
            name="expiryDate"
            placeholder="Expiry Date (MM/YY)"
            value={formData.expiryDate}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2"
            required
          />
          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            value={formData.cvv}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2"
            required
          />
        </>
      )}
      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
        Place Order
      </button>
    </form>
  );
};

export default CheckoutForm;
