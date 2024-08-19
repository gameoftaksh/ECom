import React from 'react';

const Button = ({ children, onClick, variant = 'primary', size = 'medium', className = '' }) => {
  const baseClasses = 'font-bold rounded focus:outline-none focus:ring-2 focus:ring-opacity-50';
  const variantClasses = {
    primary: 'bg-red-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    secondary: 'bg-yellow-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500',
    tertiary: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500',
  };
  const sizeClasses = {
    small: 'px-2 py-1 text-sm',
    medium: 'px-4 py-2',
    large: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;