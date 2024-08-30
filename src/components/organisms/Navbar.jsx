import React from 'react';
import { Link } from 'react-router-dom';
// import { useCart } from '../../contexts/CartContext';
import Button from '../atoms/Button';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../reducer/Actions";

const Navbar = () => {

  // const { cartItems } = useCart();


  

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">E-com Store</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:text-blue-600 cursor-pointer">Home</Link></li>
            
              { isAuthenticated? (
                        <>
                        <li><Dropdown>
                              <li><Link to="/change-password" className="hover:text-blue-600 cursor-pointer" onClick={HandleChangePass}>Change Password</Link></li>
                              <li><Link className="hover:text-blue-600 cursor-pointer" onClick={ logout }>Logout</Link></li>
                            </Dropdown>
                        </li>
                        </>
                    ): (
                        <>
                        <li><Link to="/login" className="hover:text-blue-600 cursor-pointer" onClick={handleLogin}>Login</Link></li>
                        </>
                    ) }
            <li>
              <Link to="/cart">
                <Button variant="secondary">
                  {/* Cart ({cartItems.length}) */}
                  Cart
                </Button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

const mapStateToProps = ( state ) => {
  return {
      isAuthenticated: state.AuthReducer.isAuthenticated
  }
}

export default connect(mapStateToProps, { logout })(Navbar)
