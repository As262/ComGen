import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, ShoppingBag, Menu, X, LogOut, UserCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { formatCurrency } from '../utils/helpers';
import './Navbar.css';

const Navbar = () => {
    const { cartItemCount, toggleCart } = useCart();
    const { products, loading: productsLoading } = useProducts();
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showSearchDropdown, setShowSearchDropdown] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchExpanded, setSearchExpanded] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    
    const searchRef = useRef(null);
    const searchInputRef = useRef(null);
    const searchTimeoutRef = useRef(null);
    const userMenuRef = useRef(null);

    const toggleMobileMenu = () => {
        setMobileMenuActive(!mobileMenuActive);
    };

    const handleLogout = () => {
        logout();
        setShowUserMenu(false);
        navigate('/');
    };

    const toggleUserMenu = () => {
        setShowUserMenu(!showUserMenu);
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

    const handleProductClick = (product) => {
        // Determine which page to redirect based on product category
        const category = product.category?.toLowerCase() || '';
        const subcategory = product.subcategory?.toLowerCase() || '';
        let redirectPath = '/';
        
        // Map category to appropriate route
        // Check for Women's products first (more specific keywords)
        if (category.includes('women') || subcategory.includes('women') ||
            ['dress', 'dresses', 'skirt', 'skirts', 'blouse', 'blouses', 'suit', 'suits', 
             'saree', 'sarees', 'top', 'tops', 'bottom', 'bottoms', 'legging', 'leggings'].some(cat => 
                category.includes(cat) || subcategory.includes(cat))) {
            redirectPath = '/women';
        } 
        // Check for Men's products
        else if (category.includes('men') || subcategory.includes('men') ||
            ['shirt', 'shirts', 'pant', 'pants', 'jacket', 'jackets', 'jean', 'jeans', 
             'blazer', 'blazers', 'trouser', 'trousers'].some(cat => 
                category.includes(cat) || subcategory.includes(cat))) {
            redirectPath = '/men';
        } 
        // Check for Shoes
        else if (category.includes('shoe') || category.includes('footwear') || 
                 subcategory.includes('shoe') || subcategory.includes('footwear') ||
            ['sneaker', 'sneakers', 'boot', 'boots', 'sandal', 'sandals', 
             'loafer', 'loafers', 'heel', 'heels'].some(cat => 
                category.includes(cat) || subcategory.includes(cat))) {
            redirectPath = '/shoes';
        } 
        // Check for Appliances
        else if (category.includes('appliance') || category.includes('kitchen') ||
                 subcategory.includes('appliance') || subcategory.includes('kitchen') ||
            ['coffee', 'blender', 'microwave', 'refrigerator', 'mixer', 'toaster'].some(cat => 
                category.includes(cat) || subcategory.includes(cat))) {
            redirectPath = '/appliances';
        }
        
        navigate(redirectPath);
        handleSearchClear();
        setMobileMenuActive(false); // Close mobile menu if open
    };

    // Determine which page to redirect based on search term and results
    const getPageRedirectFromSearch = () => {
        if (!searchTerm.trim() || searchResults.length === 0) return null;
        
        const lowercaseQuery = searchTerm.toLowerCase().trim();
        
        // Check if search term directly matches a category
        if (lowercaseQuery.includes('men') || lowercaseQuery.includes('shirt') || 
            lowercaseQuery.includes('pant') || lowercaseQuery.includes('jacket') ||
            lowercaseQuery.includes('jeans') || lowercaseQuery.includes('blazer')) {
            return '/men';
        }
        
        if (lowercaseQuery.includes('women') || lowercaseQuery.includes('dress') || 
            lowercaseQuery.includes('skirt') || lowercaseQuery.includes('blouse') ||
            lowercaseQuery.includes('suit') || lowercaseQuery.includes('saree')) {
            return '/women';
        }
        
        if (lowercaseQuery.includes('shoe') || lowercaseQuery.includes('sneaker') || 
            lowercaseQuery.includes('boot') || lowercaseQuery.includes('sandal') ||
            lowercaseQuery.includes('loafer') || lowercaseQuery.includes('heel')) {
            return '/shoes';
        }
        
        if (lowercaseQuery.includes('appliance') || lowercaseQuery.includes('kitchen') || 
            lowercaseQuery.includes('coffee') || lowercaseQuery.includes('blender') ||
            lowercaseQuery.includes('microwave') || lowercaseQuery.includes('refrigerator') ||
            lowercaseQuery.includes('mixer')) {
            return '/appliances';
        }
        
        // Check the category of the first search result
        if (searchResults.length > 0) {
            const firstProduct = searchResults[0];
            const category = firstProduct.category?.toLowerCase() || '';
            
            // Map category to route
            if (category.includes('men') || 
                ['shirts', 'pants', 'jackets', 'jeans', 'blazers'].some(cat => category.includes(cat))) {
                return '/men';
            }
            
            if (category.includes('women') || 
                ['dresses', 'skirts', 'blouses', 'suits', 'sarees'].some(cat => category.includes(cat))) {
                return '/women';
            }
            
            if (category.includes('shoe') || category.includes('footwear') ||
                ['sneakers', 'boots', 'sandals', 'loafers', 'heels'].some(cat => category.includes(cat))) {
                return '/shoes';
            }
            
            if (category.includes('appliance') || category.includes('kitchen') ||
                ['coffee', 'blender', 'microwave', 'refrigerator'].some(cat => category.includes(cat))) {
                return '/appliances';
            }
        }
        
        return null;
    };

    const handleViewAllResults = () => {
        if (searchTerm.trim()) {
            const redirectPage = getPageRedirectFromSearch();
            if (redirectPage) {
                navigate(redirectPage);
            } else {
                navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
            }
            handleSearchClear();
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            const redirectPage = getPageRedirectFromSearch();
            if (redirectPage) {
                navigate(redirectPage);
            } else {
                navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
            }
            handleSearchClear();
            setMobileMenuActive(false); // Close mobile menu after search
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
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setShowUserMenu(false);
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
                    <li><Link to="/shoes">Shoes</Link></li>
                    <li><Link to="/appliances">Appliances</Link></li>
                    <li><Link to="/contact">Contact Us</Link></li>
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
                                                onClick={() => handleProductClick(product)}
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
                    {isAuthenticated && user ? (
                        <div className="user-menu-container" ref={userMenuRef}>
                            <button 
                                className="btn btn-ghost user-menu-trigger" 
                                onClick={toggleUserMenu}
                                aria-label="User menu"
                            >
                                <UserCircle size={20} />
                                <span className="user-name">{user.name || 'User'}</span>
                            </button>
                            
                            {showUserMenu && (
                                <div className="user-dropdown">
                                    <div className="user-dropdown-header">
                                        <UserCircle size={32} />
                                        <div>
                                            <p className="user-dropdown-name">{user.name}</p>
                                            <p className="user-dropdown-email">{user.email}</p>
                                        </div>
                                    </div>
                                    <div className="user-dropdown-divider"></div>
                                    <button 
                                        className="user-dropdown-item" 
                                        onClick={handleLogout}
                                    >
                                        <LogOut size={16} />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login" className="btn btn-ghost" aria-label="Login">
                            <User size={20} />
                            <span className="btn-text">Login</span>
                        </Link>
                    )}

                    <Link to="/cart" className="btn btn-ghost cart-btn" style={{ position: 'relative' }} aria-label="Shopping Cart">
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
                        <li><Link to="/shoes" onClick={toggleMobileMenu}>Shoes</Link></li>
                        <li><Link to="/appliances" onClick={toggleMobileMenu}>Appliances</Link></li>
                        <li><Link to="/contact" onClick={toggleMobileMenu}>Contact Us</Link></li>
                    </ul>
                    
                    <div className="nav-actions">
                        {isAuthenticated && user ? (
                            <>
                                <div className="user-info-mobile">
                                    <UserCircle size={20} />
                                    <span>{user.name}</span>
                                </div>
                                <button className="btn btn-ghost" onClick={handleLogout}>
                                    <LogOut size={20} />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link to="/login" className="btn btn-ghost">
                                <User size={20} />
                                Login
                            </Link>
                        )}
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
