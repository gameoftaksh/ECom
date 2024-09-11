import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 


const Dropdown = ({}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* <button onClick={toggleDropdown} className="flex items-center space-x-2 hover:text-blue-600">
        <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full" />
        <span>{user.name}</span>
      </button> */}
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-10">
          <ul>
            <li className="px-4 py-2 hover:bg-gray-100">
              <Link to="/profile">Profile</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100">
              <Link to="/orders">My Orders</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100">
              <button onClick={() => logout()}>Log Out</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
