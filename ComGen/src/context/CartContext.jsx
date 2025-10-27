import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { 
  getFromLocalStorage, 
  saveToLocalStorage, 
  calculateCartTotal, 
  calculateCartItemCount 
} from '../utils/helpers';
import { STORAGE_KEYS, MAX_CART_QUANTITY } from '../utils/constants';
import ToastContainer from '../components/ToastContainer';
import { useAuth } from './AuthContext';

// Create Cart Context
const CartContext = createContext();

// Helper function to create unique cart item identifier
const getCartItemKey = (item) => {
  return `${item.id}_${item.selectedSize || 'default'}_${item.selectedColor || 'default'}`;
};

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const { user, isAuthenticated } = useAuth();

  // Get cart key for current user or guest
  const getCartKey = () => {
    if (isAuthenticated && user) {
      return `${STORAGE_KEYS.USER_CARTS}_${user.id}`;
    }
    return STORAGE_KEYS.CART; // Guest cart
  };

  // Load cart from localStorage on mount or when user changes
  useEffect(() => {
    const cartKey = getCartKey();
    const savedCart = getFromLocalStorage(cartKey, []);
    setCartItems(savedCart);
  }, [user, isAuthenticated]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    const cartKey = getCartKey();
    saveToLocalStorage(cartKey, cartItems);
  }, [cartItems, user, isAuthenticated]);

  // Show toast notification
  const showToast = (message, type = 'success', duration = 3000) => {
    const id = Date.now() + Math.random(); // More unique ID
    const newToast = { id, message, type, duration };
    setToasts(prev => {
      // Prevent duplicate messages
      const isDuplicate = prev.some(toast => toast.message === message);
      if (isDuplicate) return prev;
      return [...prev, newToast];
    });
    return id;
  };

  // Hide toast
  const hideToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // Add item to cart
  const addToCart = (product, quantity = 1) => {
    let itemAdded = false;
    
    setCartItems(prevItems => {
      // Find existing item with same id, size, and color
      const productKey = getCartItemKey(product);
      const existingItem = prevItems.find(item => getCartItemKey(item) === productKey);

      if (existingItem) {
        // Update quantity if item with same id, size, and color already exists
        itemAdded = true;
        return prevItems.map(item =>
          getCartItemKey(item) === productKey
            ? { 
                ...item, 
                quantity: Math.min(item.quantity + quantity, MAX_CART_QUANTITY) 
              }
            : item
        );
      } else {
        // Add new item to cart as separate entry
        itemAdded = true;
        return [...prevItems, { 
          ...product, 
          quantity: Math.min(quantity, MAX_CART_QUANTITY),
          addedAt: new Date().toISOString(),
          cartItemKey: productKey // Store the key for easier lookup
        }];
      }
    });
    
    // Show success toast
    if (itemAdded) {
      showToast(`${product.name} added to cart!`, 'success', 3000);
    }
  };

  // Remove item from cart (by composite key)
  const removeFromCart = (cartItemKey) => {
    setCartItems(prevItems => prevItems.filter(item => getCartItemKey(item) !== cartItemKey));
  };

  // Update item quantity (by composite key)
  const updateQuantity = (cartItemKey, quantity) => {
    if (quantity <= 0) {
      removeFromCart(cartItemKey);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        getCartItemKey(item) === cartItemKey
          ? { ...item, quantity: Math.min(quantity, MAX_CART_QUANTITY) }
          : item
      )
    );
  };

  // Increment quantity (by composite key)
  const incrementQuantity = (cartItemKey) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        getCartItemKey(item) === cartItemKey && item.quantity < MAX_CART_QUANTITY
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrement quantity (by composite key)
  const decrementQuantity = (cartItemKey) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        getCartItemKey(item) === cartItemKey && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Check if item is in cart (checks if ANY variant of product is in cart)
  const isInCart = (productId) => {
    return cartItems.some(item => item.id === productId);
  };

  // Get total quantity for a product ID (sum of all variants)
  const getItemQuantity = (productId) => {
    return cartItems
      .filter(item => item.id === productId)
      .reduce((total, item) => total + item.quantity, 0);
  };

  // Check if specific variant is in cart
  const isVariantInCart = (productId, size, color) => {
    const key = getCartItemKey({ id: productId, selectedSize: size, selectedColor: color });
    return cartItems.some(item => getCartItemKey(item) === key);
  };

  // Toggle cart sidebar
  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };

  // Open cart
  const openCart = () => {
    setIsCartOpen(true);
  };

  // Close cart
  const closeCart = () => {
    setIsCartOpen(false);
  };

  // Lock/unlock body scroll when cart opens/closes
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  // Close cart on ESC key press
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isCartOpen) {
        closeCart();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isCartOpen]);

  // Calculate totals
  const cartTotal = calculateCartTotal(cartItems);
  const cartItemCount = calculateCartItemCount(cartItems);

  const value = {
    cartItems,
    cartTotal,
    cartItemCount,
    isCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    clearCart,
    isInCart,
    getItemQuantity,
    isVariantInCart,
    getCartItemKey,
    toggleCart,
    openCart,
    closeCart,
    showToast
  };

  return (
    <CartContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} onClose={hideToast} />
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
