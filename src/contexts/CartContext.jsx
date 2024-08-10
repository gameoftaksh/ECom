import React, { createContext, useState, useContext, useEffect } from 'react';
import { getCart, addToCart, removeFromCart, updateCartItem } from '../utils/api';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
  
    useEffect(() => {
      fetchCart();
    }, []);
  
    const fetchCart = async () => {
      try {
        const response = await getCart();
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    const removeItemFromCart = async (productId) => {
        try {
          await removeFromCart(productId);
          fetchCart(); // Refresh cart after removing item
        } catch (error) {
          console.error('Error removing item from cart:', error);
        }
    };
    

  const updateItemQuantity = async (productId, quantity) => {
    try {
      await updateCartItem(productId, { quantity });
      fetchCart(); // Refresh cart after updating quantity
    } catch (error) {
      console.error('Error updating item quantity:', error);
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };
  return (
    <CartContext.Provider value={{ 
      fetchCart, 
      addToCart, 
      removeItemFromCart, 
      updateItemQuantity, 
      clearCart, 
      getCartTotal,
      getCartItemCount
    }}>
      {children}
    </CartContext.Provider>
  );
};