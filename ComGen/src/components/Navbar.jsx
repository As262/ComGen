import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { formatCurrency } from '../utils/helpers';
import './Navbar.css';

const Navbar = () => {
    const { cartItemCount, toggleCart } = useCart();
    const { products, loading: productsLoading } = useProducts();
    const navigate = useNavigate();
    
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showSearchDropdown, setShowSearchDropdown] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchExpanded, setSearchExpanded] = useState(false);
    
    const searchRef = useRef(null);
    const searchInputRef = useRef(null);
    const searchTimeoutRef = useRef(null);

    const toggleMobileMenu = () => {
        setMobileMenuActive(!mobileMenuActive);
    };

    // Debounced search function
    const performSearch = (query) => {
        if (!query.trim()) {
            setSearchResults([]);
            setShowSearchDropdown(false);
            setSearchLoading(false);
            return;
        }

        setSearchLoading(true);
        
        // Clear previous timeout
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        // Debounce search by 300ms
        searchTimeoutRef.current = setTimeout(() => {
            const lowercaseQuery = query.toLowerCase().trim();
            
            const results = products.filter(product => 
                product.name.toLowerCase().includes(lowercaseQuery) ||
                product.category.toLowerCase().includes(lowercaseQuery) ||
                product.subcategory?.toLowerCase().includes(lowercaseQuery) ||
                product.description?.toLowerCase().includes(lowercaseQuery)
            ).slice(0, 5); // Limit to 5 results

            setSearchResults(results);
            setShowSearchDropdown(true);
            setSearchLoading(false);
        }, 300);
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        performSearch(value);
    };

    const handleSearchClear = () => {
        setSearchTerm('');
        setSearchResults([]);
        setShowSearchDropdown(false);
        setSearchExpanded(false);
    };

    const handleSearchExpand = () => {
        setSearchExpanded(true);
        setTimeout(() => {
            searchInputRef.current?.focus();
        }, 300);
    };

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
        handleSearchClear();
    };

    const handleViewAllResults = () => {
        if (searchTerm.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
            handleSearchClear();
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
            handleSearchClear();
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSearchDropdown(false);
                if (window.innerWidth > 768) {
                    setSearchExpanded(false);
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, []);

    return (
        <nav className="navbar">
            <div className="nav-container">
                <Link to="/" className="logo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '4rem' }}>
                    <img src="/logo-png.png" alt="ComGen Logo" style={{ height: '3.5rem', width: '10.5rem', display: 'block', margin: '0 auto' }} />
                </Link>

                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/men">Men</Link></li>
                    <li><Link to="/women">Women</Link></li>
                    <li><a href="/#shoes">Shoes</a></li>
                    <li><a href="/#appliances">Appliances</a></li>
                </ul>

                <div className="search-container" ref={searchRef}>
                    <form 
                        onSubmit={handleSearchSubmit}
                        className="search-form"
                    >
                        <Search className="search-icon" size={16} />
                        <input 
                            ref={searchInputRef}
                            type="text" 
                            placeholder="Search products..." 
                            className="search-input"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            aria-label="Search products"
                        />
                        {searchTerm && (
                            <button 
                                type="button"
                                className="search-clear"
                                onClick={handleSearchClear}
                                aria-label="Clear search"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </form>
                    
                    {/* Search Dropdown */}
                    {showSearchDropdown && (
                        <div className="search-dropdown">
                            {searchLoading ? (
                                <div className="search-dropdown-loading">
                                    <div className="spinner"></div>
                                    <span>Searching...</span>
                                </div>
                            ) : searchResults.length > 0 ? (
                                <>
                                    <div className="search-results">
                                        {searchResults.map(product => (
                                            <div 
                                                key={product.id}
                                                className="search-result-item"
                                                onClick={() => handleProductClick(product.id)}
                                            >
                                                <img 
                                                    src={product.images?.main || product.image} 
                                                    alt={product.name}
                                                    className="search-result-image"
                                                />
                                                <div className="search-result-info">
                                                    <h4 className="search-result-name">{product.name}</h4>
                                                    <p className="search-result-category">{product.category}</p>
                                                    <p className="search-result-price">
                                                        {formatCurrency(product.price)}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <button 
                                        className="search-view-all"
                                        onClick={handleViewAllResults}
                                    >
                                        View all results for "{searchTerm}"
                                    </button>
                                </>
                            ) : (
                                <div className="search-no-results">
                                    <Search size={32} />
                                    <p>No products found for "{searchTerm}"</p>
                                    <small>Try different keywords</small>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="nav-actions">
                    <Link to="/login" className="btn btn-ghost">
                        <User size={20} />
                        Login
                    </Link>

                    <Link to="/cart" className="btn btn-ghost cart-btn" style={{ position: 'relative' }}>
                        <ShoppingBag size={20} />
                        {cartItemCount > 0 && (
                            <span className="cart-count">{cartItemCount}</span>
                        )}
                    </Link>
                </div>

                <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
                    {mobileMenuActive ? <X size={24} /> : <Menu size={24} />}
                </button>

                <div className={`mobile-menu ${mobileMenuActive ? 'active' : ''}`}>
                    <form onSubmit={handleSearchSubmit} className="search-container mobile-search">
                        <Search className="search-icon" size={16} />
                        <input 
                            type="text" 
                            placeholder="Search products..." 
                            className="search-input"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        {searchTerm && (
                            <button 
                                type="button"
                                className="search-clear"
                                onClick={handleSearchClear}
                            >
                                <X size={16} />
                            </button>
                        )}
                    </form>
                    
                    <ul className="nav-links">
                        <li><Link to="/" onClick={toggleMobileMenu}>Home</Link></li>
                        <li><Link to="/men" onClick={toggleMobileMenu}>Men</Link></li>
                        <li><Link to="/women" onClick={toggleMobileMenu}>Women</Link></li>
                        <li><a href="/#shoes" onClick={toggleMobileMenu}>Shoes</a></li>
                        <li><a href="/#appliances" onClick={toggleMobileMenu}>Appliances</a></li>
                    </ul>
                    
                    <div className="nav-actions">
                        <Link to="/login" className="btn btn-ghost">
                            <User size={20} />
                            Login
                        </Link>
                        <button className="btn btn-ghost" onClick={toggleCart}>
                            <ShoppingBag size={20} />
                            Cart ({cartItemCount})
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
