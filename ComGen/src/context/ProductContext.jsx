import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import productsData from '../data/products.json';
import { 
  sortProducts, 
  filterByCategory, 
  filterByPriceRange, 
  searchProducts 
} from '../utils/helpers';

// Create Product Context
const ProductContext = createContext();

// Product Provider Component
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters state
  const [filters, setFilters] = useState({
    category: null,
    subcategory: null,
    priceRange: { min: 0, max: Infinity },
    sortBy: 'newest',
    searchQuery: ''
  });

  // Load products and categories from JSON
  useEffect(() => {
    try {
      setLoading(true);
      setProducts(productsData.products);
      setCategories(productsData.categories);
      setFilteredProducts(productsData.products);
      setError(null);
    } catch (err) {
      setError('Failed to load products');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Apply filters whenever filters change
  useEffect(() => {
    let result = [...products];

    // Filter by search query
    if (filters.searchQuery) {
      result = searchProducts(result, filters.searchQuery);
    }

    // Filter by category
    if (filters.category) {
      result = filterByCategory(result, filters.category);
    }

    // Filter by subcategory
    if (filters.subcategory) {
      result = result.filter(product => product.subcategory === filters.subcategory);
    }

    // Filter by price range
    if (filters.priceRange) {
      result = filterByPriceRange(
        result, 
        filters.priceRange.min, 
        filters.priceRange.max
      );
    }

    // Sort products
    if (filters.sortBy) {
      result = sortProducts(result, filters.sortBy);
    }

    setFilteredProducts(result);
  }, [filters, products]);

  // Get product by ID
  const getProductById = (productId) => {
    return products.find(product => product.id === productId);
  };

  // Get products by category
  const getProductsByCategory = (category) => {
    return products.filter(product => product.category === category);
  };

  // Get featured products
  const getFeaturedProducts = () => {
    return products.filter(product => product.featured);
  };

  // Get products on sale
  const getSaleProducts = () => {
    return products.filter(product => 
      product.originalPrice && product.originalPrice > product.price
    );
  };

  // Get related products
  const getRelatedProducts = (productId, count = 4) => {
    const product = getProductById(productId);
    if (!product) return [];

    return products
      .filter(p => 
        p.id !== productId && 
        (p.category === product.category || p.subcategory === product.subcategory)
      )
      .slice(0, count);
  };

  // Set category filter
  const setCategoryFilter = (category) => {
    setFilters(prev => ({ ...prev, category, subcategory: null }));
  };

  // Set subcategory filter
  const setSubcategoryFilter = (subcategory) => {
    setFilters(prev => ({ ...prev, subcategory }));
  };

  // Set price range filter
  const setPriceRangeFilter = (min, max) => {
    setFilters(prev => ({ 
      ...prev, 
      priceRange: { min, max } 
    }));
  };

  // Set sort option
  const setSortBy = (sortBy) => {
    setFilters(prev => ({ ...prev, sortBy }));
  };

  // Set search query
  const setSearchQuery = (query) => {
    setFilters(prev => ({ ...prev, searchQuery: query }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      category: null,
      subcategory: null,
      priceRange: { min: 0, max: Infinity },
      sortBy: 'newest',
      searchQuery: ''
    });
  };

  // Clear specific filter
  const clearFilter = (filterName) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      
      switch (filterName) {
        case 'category':
          newFilters.category = null;
          newFilters.subcategory = null;
          break;
        case 'subcategory':
          newFilters.subcategory = null;
          break;
        case 'priceRange':
          newFilters.priceRange = { min: 0, max: Infinity };
          break;
        case 'search':
          newFilters.searchQuery = '';
          break;
        default:
          break;
      }
      
      return newFilters;
    });
  };

  const value = {
    products,
    categories,
    filteredProducts,
    loading,
    error,
    filters,
    getProductById,
    getProductsByCategory,
    getFeaturedProducts,
    getSaleProducts,
    getRelatedProducts,
    setCategoryFilter,
    setSubcategoryFilter,
    setPriceRangeFilter,
    setSortBy,
    setSearchQuery,
    clearFilters,
    clearFilter
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

ProductProvider.propTypes = {
  children: PropTypes.node.isRequired
};

// Custom hook to use product context
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export default ProductContext;
