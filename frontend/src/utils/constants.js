// App-wide constants

// API Configuration - Using relative URL since backend and frontend are on same domain
export const API_BASE_URL = '/api';

// Route paths
export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/product/:id',
  CATEGORY: '/products/:category',
  CART: '/cart',
  CHECKOUT: '/checkout',
  SEARCH: '/search',
  MEN: '/men',
  WOMEN: '/women',
  SHOES: '/shoes',
  APPLIANCES: '/appliances',
  LOGIN: '/login',
  NOT_FOUND: '*'
};

// Category constants
export const CATEGORIES = {
  MEN: 'men',
  WOMEN: 'women',
  SHOES: 'shoes',
  APPLIANCES: 'appliances'
};

// Sort options
export const SORT_OPTIONS = {
  NEWEST: 'newest',
  PRICE_LOW_HIGH: 'price_low_high',
  PRICE_HIGH_LOW: 'price_high_low',
  RATING: 'rating',
  POPULAR: 'popular'
};

// Filter constants
export const PRICE_RANGES = [
  { id: 'under_50', label: 'Under $50', min: 0, max: 50 },
  { id: '50_100', label: '$50 - $100', min: 50, max: 100 },
  { id: '100_200', label: '$100 - $200', min: 100, max: 200 },
  { id: '200_300', label: '$200 - $300', min: 200, max: 300 },
  { id: 'over_300', label: 'Over $300', min: 300, max: Infinity }
];

// Responsive breakpoints
export const BREAKPOINTS = {
  MOBILE: 320,
  MOBILE_LARGE: 480,
  TABLET: 768,
  DESKTOP: 1024,
  DESKTOP_LARGE: 1440,
  DESKTOP_XL: 1920
};

// Local storage keys
export const STORAGE_KEYS = {
  CART: 'comgen_cart',
  WISHLIST: 'comgen_wishlist',
  RECENT_VIEWS: 'comgen_recent_views',
  USER_PREFERENCES: 'comgen_preferences',
  USER_SESSION: 'comgen_user_session',
  REGISTERED_USERS: 'comgen_registered_users',
  USER_CARTS: 'comgen_user_carts'
};

// Toast notification types
export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

// Animation durations (ms)
export const ANIMATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500
};

// Image placeholders
export const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/400x400?text=No+Image';

// Pagination
export const ITEMS_PER_PAGE = 12;

// Maximum items in cart
export const MAX_CART_QUANTITY = 10;

// Shipping options
export const SHIPPING_OPTIONS = [
  { id: 'standard', name: 'Standard Shipping', price: 5.99, days: '5-7 business days' },
  { id: 'express', name: 'Express Shipping', price: 12.99, days: '2-3 business days' },
  { id: 'overnight', name: 'Overnight Shipping', price: 24.99, days: 'Next business day' }
];

// Payment methods
export const PAYMENT_METHODS = [
  { id: 'card', name: 'Credit/Debit Card', icon: 'credit-card' },
  { id: 'paypal', name: 'PayPal', icon: 'paypal' },
  { id: 'cod', name: 'Cash on Delivery', icon: 'banknote' }
];

// Rating stars
export const MAX_RATING = 5;

// Social media links
export const SOCIAL_LINKS = {
  FACEBOOK: 'https://facebook.com/comgen',
  INSTAGRAM: 'https://instagram.com/comgen',
  TWITTER: 'https://twitter.com/comgen',
  LINKEDIN: 'https://linkedin.com/company/comgen'
};

// Contact information
export const CONTACT_INFO = {
  EMAIL: 'hello@ComGenZ.com',
  PHONE: '+1 (555) 123-4567',
  ADDRESS: '123 Fashion Street, New York, NY 10001'
};

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  PRODUCT_NOT_FOUND: 'Product not found.',
  CART_ERROR: 'Unable to update cart. Please try again.',
  CHECKOUT_ERROR: 'Checkout failed. Please try again.',
  GENERIC_ERROR: 'Something went wrong. Please try again later.'
};

// Success messages
export const SUCCESS_MESSAGES = {
  ADDED_TO_CART: 'Product added to cart!',
  REMOVED_FROM_CART: 'Product removed from cart.',
  CART_UPDATED: 'Cart updated successfully.',
  ORDER_PLACED: 'Order placed successfully!',
  ADDED_TO_WISHLIST: 'Added to wishlist!'
};

// Validation rules
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^\+?[\d\s-()]+$/,
  ZIP_REGEX: /^\d{5}(-\d{4})?$/,
  MIN_PASSWORD_LENGTH: 8,
  MAX_NAME_LENGTH: 50,
  MAX_ADDRESS_LENGTH: 200
};

// Feature flags
export const FEATURES = {
  ENABLE_WISHLIST: true,
  ENABLE_REVIEWS: true,
  ENABLE_QUICK_VIEW: true,
  ENABLE_COMPARISON: true,
  ENABLE_SOCIAL_SHARE: true
};
