import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import Button from '../atoms/Button';

const Header = () => {
  const { cartItems } = useCart();

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">My E-commerce Store</Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
            <li><Link to="/cart" className="hover:text-blue-600">
              <Button variant="secondary">
                Cart ({cartItems.length})
              </Button>
            </Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;