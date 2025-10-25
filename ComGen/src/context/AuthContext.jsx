import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getFromLocalStorage, saveToLocalStorage, removeFromLocalStorage } from '../utils/helpers';
import { STORAGE_KEYS } from '../utils/constants';

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load user session from localStorage on mount
  useEffect(() => {
    const savedUser = getFromLocalStorage(STORAGE_KEYS.USER_SESSION);
    if (savedUser && savedUser.sessionExpiry > Date.now()) {
      setUser(savedUser);
      setIsAuthenticated(true);
    } else {
      // Clear expired session
      removeFromLocalStorage(STORAGE_KEYS.USER_SESSION);
    }
    setLoading(false);
  }, []);

  // Save user session whenever it changes
  useEffect(() => {
    if (user) {
      saveToLocalStorage(STORAGE_KEYS.USER_SESSION, user);
    }
  }, [user]);

  // Login function
  const login = (email, password, name = null) => {
    // In a real app, you would validate against a backend API
    // For now, we'll use a simple validation
    
    // Get registered users from localStorage
    const registeredUsers = getFromLocalStorage(STORAGE_KEYS.REGISTERED_USERS, []);
    
    // Check if user exists
    const existingUser = registeredUsers.find(u => u.email === email);
    
    if (existingUser) {
      // Validate password
      if (existingUser.password === password) {
        const userData = {
          id: existingUser.id,
          email: existingUser.email,
          name: existingUser.name,
          sessionExpiry: Date.now() + (7 * 24 * 60 * 60 * 1000), // 7 days
          loginTime: new Date().toISOString()
        };
        
        setUser(userData);
        setIsAuthenticated(true);
        return { success: true, message: 'Login successful!' };
      } else {
        return { success: false, message: 'Invalid password' };
      }
    } else {
      return { success: false, message: 'User not found. Please sign up first.' };
    }
  };

  // Signup function
  const signup = (name, email, password) => {
    // Get registered users from localStorage
    const registeredUsers = getFromLocalStorage(STORAGE_KEYS.REGISTERED_USERS, []);
    
    // Check if user already exists
    if (registeredUsers.some(u => u.email === email)) {
      return { success: false, message: 'User already exists with this email' };
    }
    
    // Create new user
    const newUser = {
      id: `user_${Date.now()}`,
      email,
      password, // In a real app, this should be hashed
      name,
      createdAt: new Date().toISOString()
    };
    
    // Save to registered users
    registeredUsers.push(newUser);
    saveToLocalStorage(STORAGE_KEYS.REGISTERED_USERS, registeredUsers);
    
    return { success: true, message: 'Account created successfully!' };
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    removeFromLocalStorage(STORAGE_KEYS.USER_SESSION);
  };

  // Update user profile
  const updateProfile = (updates) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      
      // Also update in registered users
      const registeredUsers = getFromLocalStorage(STORAGE_KEYS.REGISTERED_USERS, []);
      const updatedUsers = registeredUsers.map(u => 
        u.id === user.id ? { ...u, ...updates } : u
      );
      saveToLocalStorage(STORAGE_KEYS.REGISTERED_USERS, updatedUsers);
      
      return { success: true, message: 'Profile updated successfully!' };
    }
    return { success: false, message: 'No user logged in' };
  };

  // Check if session is valid
  const isSessionValid = () => {
    if (!user || !user.sessionExpiry) return false;
    return user.sessionExpiry > Date.now();
  };

  // Extend session
  const extendSession = () => {
    if (user) {
      const updatedUser = {
        ...user,
        sessionExpiry: Date.now() + (7 * 24 * 60 * 60 * 1000) // Extend by 7 days
      };
      setUser(updatedUser);
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    signup,
    logout,
    updateProfile,
    isSessionValid,
    extendSession
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
