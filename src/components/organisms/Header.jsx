import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import Button from '../atoms/Button';
import { useAuth0 } from "@auth0/auth0-react";
import Dropdown from '../../components/atoms/Dropdown';

const Header = () => {
  const { cartItems } = useCart();
  const { user, loginWithRedirect, logout, isAuthenticated} = useAuth0();

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">My E-com Store</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
            {isAuthenticated?(
              
              <li>
                <Dropdown user={user} logout={logout} />
              </li>

            ):(
              <li><button onClick={() => loginWithRedirect()}>Log In</button></li>
            )}

            <li>
              <Link to="/cart">
                <Button variant="secondary">
                  Cart ({cartItems.length})
                </Button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
