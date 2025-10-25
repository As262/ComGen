import { useState, useEffect } from 'react';
import { Eye, ShoppingCart, Heart, Grid3x3, List, Plus, SlidersHorizontal, X, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { menProducts } from '../data/menProducts';
import './MenPage.css';

const MenPage = () => {
    const { addToCart } = useCart();
    const [filteredProducts, setFilteredProducts] = useState([...menProducts]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;
    const [wishlist, setWishlist] = useState(JSON.parse(localStorage.getItem('menWishlist')) || []);
    const [currentView, setCurrentView] = useState('grid');
    const [filtersActive, setFiltersActive] = useState(false);
    const [quickViewProduct, setQuickViewProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState('M');
    const [selectedColor, setSelectedColor] = useState('');
    const [filters, setFilters] = useState({
        category: 'all',
        price: 'all',
        brand: 'all',
        sort: 'featured'
    });

    useEffect(() => {
        localStorage.setItem('menWishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const filterProducts = () => {
        let filtered = [...menProducts];

        if (filters.category !== 'all') {
            filtered = filtered.filter(p => p.category === filters.category);
        }

        if (filters.price !== 'all') {
            const [min, max] = filters.price.split('-').map(p => p.replace('+', ''));
            const minPrice = parseFloat(min);
            const maxPrice = max ? parseFloat(max) : Infinity;
            filtered = filtered.filter(p => p.price >= minPrice && p.price <= maxPrice);
        }

        if (filters.brand !== 'all') {
            filtered = filtered.filter(p => p.brand.toLowerCase() === filters.brand);
        }

        setFilteredProducts(filtered);
        setCurrentPage(1);
    };

    const sortProducts = () => {
        let sorted = [...filteredProducts];

        switch (filters.sort) {
            case 'price-low':
                sorted.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                sorted.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                sorted.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'rating':
                sorted.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
                sorted.sort((a, b) => b.id - a.id);
                break;
            default:
                break;
        }

        setFilteredProducts(sorted);
        setCurrentPage(1);
    };

    useEffect(() => {
        filterProducts();
    }, [filters.category, filters.price, filters.brand]);

    useEffect(() => {
        sortProducts();
    }, [filters.sort]);

    const clearFilters = () => {
        setFilters({ category: 'all', price: 'all', brand: 'all', sort: 'featured' });
        setFilteredProducts([...menProducts]);
        setCurrentPage(1);
    };

    const handleAddToCart = (productId, size = 'M', color = '') => {
        const product = menProducts.find(p => p.id === productId);
        if (!product) return;

        addToCart({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            selectedSize: size || 'M',
            selectedColor: color || product.colors[0]
        });
        
        showNotification(`${product.name} added to cart!`);
    };

    const toggleWishlist = (productId) => {
        if (wishlist.includes(productId)) {
            setWishlist(wishlist.filter(id => id !== productId));
            showNotification('Removed from wishlist');
        } else {
            setWishlist([...wishlist, productId]);
            showNotification('Added to wishlist');
        }
    };

    const showNotification = (message) => {
        // Simple notification implementation
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--accent);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: var(--shadow-premium);
            z-index: 1001;
            font-weight: 500;
            animation: slideIn 0.3s ease;
        `;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 3000);
    };

    const ProductCard = ({ product }) => {
        const discountPercentage = product.originalPrice
            ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
            : 0;
        const stars = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));

        return (
            <div className="product-card fade-in">
                <div className="product-image">
                    <img src={product.image} alt={product.name} loading="lazy" />
                    {product.badge && (
                        <div className={`product-badge ${product.badge}`}>{product.badge.toUpperCase()}</div>
                    )}
                    <div className="product-overlay">
                        <button className="btn btn-primary" onClick={() => setQuickViewProduct(product)}>
                            <Eye size={20} />
                            Quick View
                        </button>
                        <button className="btn btn-outline" onClick={() => toggleWishlist(product.id)}>
                            <Heart size={20} />
                        </button>
                    </div>
                </div>
                <div className="product-info">
                    <div className="product-brand">{product.brand}</div>
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <div className="product-rating">
                        <div className="stars">{stars}</div>
                        <span className="rating-text">({product.rating}) {product.reviews} reviews</span>
                    </div>
                    <div className="product-price">
                        <span className="current-price">${product.price}</span>
                        {product.originalPrice && (
                            <span className="original-price">${product.originalPrice}</span>
                        )}
                        {discountPercentage > 0 && (
                            <span className="discount-badge">{discountPercentage}% OFF</span>
                        )}
                    </div>
                    <div className="product-actions">
                        <button className="btn btn-accent" onClick={() => handleAddToCart(product.id)}>
                            <ShoppingCart size={20} />
                            Add to Cart
                        </button>
                        <button className="btn btn-outline" onClick={() => setQuickViewProduct(product)}>
                            <Eye size={20} />
                            Quick View
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToShow = filteredProducts.slice(startIndex, endIndex);

    return (
        <div className="men-page">
            {/* Filters Section */}
            <section className="filters-section">
                <div className="section-container">
                    <div className="filters-header">
                        <h2>Filter & Search</h2>
                        <button className="filter-toggle-btn" onClick={() => setFiltersActive(!filtersActive)}>
                            <SlidersHorizontal size={20} />
                            Filters
                        </button>
                    </div>

                    <div className={`filters-container ${filtersActive ? 'active' : ''}`}>
                        <div className="filter-group">
                            <label htmlFor="category-filter">Category</label>
                            <select
                                id="category-filter"
                                value={filters.category}
                                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                            >
                                <option value="all">All Categories</option>
                                <option value="shirts">Shirts</option>
                                <option value="pants">Pants & Trousers</option>
                                <option value="jackets">Jackets & Outerwear</option>
                                <option value="accessories">Accessories</option>
                                <option value="formal">Formal Wear</option>
                                <option value="casual">Casual Wear</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label htmlFor="price-filter">Price Range</label>
                            <select
                                id="price-filter"
                                value={filters.price}
                                onChange={(e) => setFilters({ ...filters, price: e.target.value })}
                            >
                                <option value="all">All Prices</option>
                                <option value="0-50">Under $50</option>
                                <option value="50-100">$50 - $100</option>
                                <option value="100-200">$100 - $200</option>
                                <option value="200-500">$200 - $500</option>
                                <option value="500+">$500+</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label htmlFor="brand-filter">Brand</label>
                            <select
                                id="brand-filter"
                                value={filters.brand}
                                onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                            >
                                <option value="all">All Brands</option>
                                <option value="comgen">ComGen</option>
                                <option value="premium">Premium Collection</option>
                                <option value="classic">Classic Line</option>
                                <option value="modern">Modern Style</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label htmlFor="sort-filter">Sort By</label>
                            <select
                                id="sort-filter"
                                value={filters.sort}
                                onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                            >
                                <option value="featured">Featured</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="name">Name A-Z</option>
                                <option value="rating">Rating</option>
                                <option value="newest">Newest</option>
                            </select>
                        </div>

                        <div className="filter-actions">
                            <button className="btn btn-outline" onClick={clearFilters}>Clear All</button>
                            <button className="btn btn-primary" onClick={() => setFiltersActive(false)}>Apply Filters</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <section className="products-section">
                <div className="section-container">
                    <div className="products-header">
                        <div className="products-info">
                            <h2>Premium Men's Collection</h2>
                            <p className="products-count">
                                Showing {Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length}+ products
                            </p>
                        </div>
                        <div className="view-toggle">
                            <button
                                className={`view-btn ${currentView === 'grid' ? 'active' : ''}`}
                                onClick={() => setCurrentView('grid')}
                            >
                                <Grid3x3 size={20} />
                            </button>
                            <button
                                className={`view-btn ${currentView === 'list' ? 'active' : ''}`}
                                onClick={() => setCurrentView('list')}
                            >
                                <List size={20} />
                            </button>
                        </div>
                    </div>

                    <div className={`products-grid ${currentView === 'list' ? 'list-view' : ''}`}>
                        {productsToShow.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    {endIndex < filteredProducts.length && (
                        <div className="load-more-section">
                            <button className="btn btn-accent load-more-btn" onClick={() => setCurrentPage(currentPage + 1)}>
                                <Plus size={20} />
                                Load More Products
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Quick View Modal */}
            {quickViewProduct && (
                <div className="modal-overlay active" onClick={() => setQuickViewProduct(null)}>
                    <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setQuickViewProduct(null)}>
                            <X size={24} />
                        </button>

                        <div className="modal-content">
                            <div className="modal-image">
                                <img src={quickViewProduct.image} alt={quickViewProduct.name} />
                                {quickViewProduct.badge && (
                                    <div className="modal-badges">
                                        <div className={`product-badge ${quickViewProduct.badge}`}>
                                            {quickViewProduct.badge.toUpperCase()}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="modal-details">
                                <div className="modal-header">
                                    <h3>{quickViewProduct.name}</h3>
                                    <div className="modal-rating">
                                        <div className="stars">{'★'.repeat(Math.floor(quickViewProduct.rating)) + '☆'.repeat(5 - Math.floor(quickViewProduct.rating))}</div>
                                        <span className="rating-text">({quickViewProduct.rating}) {quickViewProduct.reviews} reviews</span>
                                    </div>
                                </div>

                                <div className="modal-price">
                                    <span className="current-price">${quickViewProduct.price}</span>
                                    {quickViewProduct.originalPrice && (
                                        <>
                                            <span className="original-price">${quickViewProduct.originalPrice}</span>
                                            <span className="discount-badge">
                                                {Math.round(((quickViewProduct.originalPrice - quickViewProduct.price) / quickViewProduct.originalPrice) * 100)}% OFF
                                            </span>
                                        </>
                                    )}
                                </div>

                                <div className="modal-description">
                                    <p>{quickViewProduct.description}</p>
                                </div>

                                <div className="modal-options">
                                    <div className="size-selector">
                                        <label>Size:</label>
                                        <div className="size-options">
                                            {quickViewProduct.sizes.map(size => (
                                                <button
                                                    key={size}
                                                    className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                                                    onClick={() => setSelectedSize(size)}
                                                >
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="color-selector">
                                        <label>Color:</label>
                                        <div className="color-options">
                                            {quickViewProduct.colors.map(color => (
                                                <button
                                                    key={color}
                                                    className={`color-btn ${selectedColor === color ? 'selected' : ''}`}
                                                    style={{ background: getColorCode(color) }}
                                                    onClick={() => setSelectedColor(color)}
                                                    title={color}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="modal-actions">
                                    <button
                                        className="btn btn-primary add-to-cart-btn"
                                        onClick={() => {
                                            handleAddToCart(quickViewProduct.id, selectedSize, selectedColor || quickViewProduct.colors[0]);
                                            setQuickViewProduct(null);
                                        }}
                                    >
                                        <ShoppingCart size={20} />
                                        Add to Cart
                                    </button>
                                    <button className="btn btn-outline wishlist-btn" onClick={() => toggleWishlist(quickViewProduct.id)}>
                                        <Heart size={20} />
                                        Wishlist
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const getColorCode = (colorName) => {
    const colorCodes = {
        'White': '#ffffff',
        'Black': '#000000',
        'Navy': '#001f3f',
        'Light Blue': '#87ceeb',
        'Grey': '#808080',
        'Charcoal': '#36454f',
        'Brown': '#8b4513',
        'Cognac': '#9f4a00',
        'Burgundy': '#800020',
        'Khaki': '#c3b091',
        'Olive': '#808000',
        'Silver': '#c0c0c0',
        'Gold': '#ffd700',
        'Red': '#ff0000',
        'Dark Blue': '#000080',
        'Camel': '#c19a6b',
        'Black/Brown': '#000000'
    };
    return colorCodes[colorName] || '#cccccc';
};

export default MenPage;
