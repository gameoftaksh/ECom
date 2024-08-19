// import React, { createContext, useContext, useState } from 'react';

// // Create the context
// const CartContext = createContext();

// // Create a provider component
// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);

//   // Add item to cart
//   const addToCart = (product) => {
//     setCartItems((prevItems) => {
//       const itemExists = prevItems.find(item => item.id === product.id);
//       if (itemExists) {
//         return prevItems.map(item =>
//           item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
//         );
//       }
//       return [...prevItems, { ...product, quantity: 1 }];
//     });
//   };

//   // Remove item from cart
//   const removeFromCart = (productId) => {
//     setCartItems((prevItems) => prevItems.filter(item => item.id !== productId));
//   };

//   // Update item quantity in cart
//   const updateQuantity = (productId, quantity) => {
//     setCartItems((prevItems) => 
//       prevItems.map(item => 
//         item.id === productId ? { ...item, quantity } : item
//       )
//     );
//   };

//   return (
//     <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// // Custom hook to use the CartContext
// export const useCart = () => useContext(CartContext);


import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { getCart, addToCart, removeFromCart, updateCartItem } from '../utils/api';  

// Create the context
const CartContext = createContext();

// Create a provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  // Load cart items when user logs in
  useEffect(() => {
    const loadCart = async () => {
      if (isAuthenticated && user) {
        try {
          const token = await getAccessTokenSilently();
          const response = await getCart({
            user_sub: user.sub,
            headers: { Authorization: `Bearer ${token}` },
          });
          setCartItems(response.data.items);
        } catch (error) {
          console.error('Failed to load cart:', error);
        }
      }
    };
    loadCart();
  }, [isAuthenticated, user]);

  // Add item to cart
  const addToCartHandler = async (product) => {
    if (isAuthenticated && user) {
      try {
        const token = await getAccessTokenSilently();
        const response = await addToCart({
          user_sub: user.sub,
          product_id: product.id,
          quantity: 1,
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems(response.data.items);
      } catch (error) {
        console.error('Failed to add item to cart:', error);
      }
    } else {
      setCartItems((prevItems) => {
        const itemExists = prevItems.find(item => item.id === product.id);
        if (itemExists) {
          return prevItems.map(item =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        }
        return [...prevItems, { ...product, quantity: 1 }];
      });
    }
  };

  // Remove item from cart
  const removeFromCartHandler = async (productId) => {
    if (isAuthenticated && user) {
      try {
        const token = await getAccessTokenSilently();
        const response = await removeFromCart({
          user_sub: user.sub,
          product_id: productId,
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems(response.data.items);
      } catch (error) {
        console.error('Failed to remove item from cart:', error);
      }
    } else {
      setCartItems((prevItems) => prevItems.filter(item => item.id !== productId));
    }
  };

  // Update item quantity in cart
  const updateQuantityHandler = async (productId, quantity) => {
    if (isAuthenticated && user) {
      try {
        const token = await getAccessTokenSilently();
        const response = await updateCartItem(productId, {
          user_sub: user.sub,
          quantity,
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems(response.data.items);
      } catch (error) {
        console.error('Failed to update cart item quantity:', error);
      }
    } else {
      setCartItems((prevItems) => 
        prevItems.map(item => 
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart: addToCartHandler, removeFromCart: removeFromCartHandler, updateQuantity: updateQuantityHandler }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext
export const useCart = () => useContext(CartContext);
