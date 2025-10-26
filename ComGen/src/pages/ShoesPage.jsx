import { useState, useEffect } from 'react';
import { Eye, ShoppingCart, Heart, Grid3x3, List, Plus, SlidersHorizontal, X, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { shoesProducts } from '../data/shoesProducts';
import './ShoesPage.css';

const ShoesPage = () => {
    const { addToCart } = useCart();
    const [filteredProducts, setFilteredProducts] = useState([...shoesProducts]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;
    const [wishlist, setWishlist] = useState(JSON.parse(localStorage.getItem('shoesWishlist')) || []);
    const [currentView, setCurrentView] = useState('grid');
    const [filtersActive, setFiltersActive] = useState(false);
    const [quickViewProduct, setQuickViewProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState('8');
    const [selectedColor, setSelectedColor] = useState('');
    const [filters, setFilters] = useState({
        category: 'all',
        price: 'all',
        brand: 'all',
        sort: 'featured'
    });

    useEffect(() => {
        localStorage.setItem('shoesWishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const filterProducts = () => {
        let filtered = [...shoesProducts];

        if (filters.category !== 'all') {
            filtered = filtered.filter(p => p.subcategory === filters.category);
        }

        if (filters.price !== 'all') {
            const [min, max] = filters.price.split('-').map(p => p.replace('+', ''));
            const minPrice = parseFloat(min);
            const maxPrice = max ? parseFloat(max) : Infinity;
            filtered = filtered.filter(p => p.price >= minPrice && p.price <= maxPrice);
        }

        if (filters.brand !== 'all') {
            filtered = filtered.filter(p => p.specifications.brand.toLowerCase() === filters.brand);
        }

        // Sorting
        switch (filters.sort) {
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
                filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            default:
                filtered.sort((a, b) => b.featured - a.featured);
        }

        setFilteredProducts(filtered);
        setCurrentPage(1);
    };

    useEffect(() => {
        filterProducts();
    }, [filters]);

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
    };

    const clearFilters = () => {
        setFilters({
            category: 'all',
            price: 'all',
            brand: 'all',
            sort: 'featured'
        });
    };

    const toggleFilters = () => {
        setFiltersActive(!filtersActive);
    };

    const toggleWishlist = (productId) => {
        setWishlist(prev => {
            if (prev.includes(productId)) {
                return prev.filter(id => id !== productId);
            } else {
                return [...prev, productId];
            }
        });
    };

    const openQuickView = (product) => {
        setQuickViewProduct(product);
        setSelectedColor(product.colors[0]);
        setSelectedSize(product.sizes[0]);
    };

    const closeQuickView = () => {
        setQuickViewProduct(null);
    };

    const handleAddToCart = (product, size = selectedSize, color = selectedColor) => {
        addToCart({
            ...product,
            selectedSize: size,
            selectedColor: color
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const getStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push('★');
        }
        if (hasHalfStar) {
            stars.push('☆');
        }
        while (stars.length < 5) {
            stars.push('☆');
        }
        return stars.join('');
    };

    const getBadgeClass = (tags) => {
        if (tags.includes('new')) return 'new';
        if (tags.includes('sale')) return 'sale';
        if (tags.includes('featured')) return 'featured';
        return '';
    };

    const getBadgeText = (tags) => {
        if (tags.includes('new')) return 'NEW';
        if (tags.includes('sale')) return 'SALE';
        if (tags.includes('featured')) return 'FEATURED';
        return '';
    };

    // Pagination
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const loadMore = () => {
        setCurrentPage(prev => prev + 1);
    };

    const brands = [...new Set(shoesProducts.map(p => p.specifications.brand.toLowerCase()))];
    const categories = [...new Set(shoesProducts.map(p => p.subcategory))];

    return (
        <div className="shoes-page">
            {/* Filters Section */}
            <section className="filters-section">
                <div className="section-container">
                    <div className="filters-header">
                        <h2>Footwear Collection</h2>
                        <button className="filter-toggle-btn" onClick={toggleFilters}>
                            <SlidersHorizontal size={20} />
                            Filters
                        </button>
                    </div>
                    
                    <div className={`filters-container ${filtersActive ? 'active' : ''}`}>
                        <div className="filter-group">
                            <label>Category</label>
                            <select 
                                value={filters.category}
                                onChange={(e) => handleFilterChange('category', e.target.value)}
                            >
                                <option value="all">All Categories</option>
                                {categories.map(category => (
                                    <option key={category} value={category}>
                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="filter-group">
                            <label>Price Range</label>
                            <select 
                                value={filters.price}
                                onChange={(e) => handleFilterChange('price', e.target.value)}
                            >
                                <option value="all">All Prices</option>
                                <option value="0-50">Under $50</option>
                                <option value="50-100">$50 - $100</option>
                                <option value="100-150">$100 - $150</option>
                                <option value="150-200">$150 - $200</option>
                                <option value="200+">$200+</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label>Brand</label>
                            <select 
                                value={filters.brand}
                                onChange={(e) => handleFilterChange('brand', e.target.value)}
                            >
                                <option value="all">All Brands</option>
                                {brands.map(brand => (
                                    <option key={brand} value={brand}>
                                        {brand.split(' ').map(word => 
                                            word.charAt(0).toUpperCase() + word.slice(1)
                                        ).join(' ')}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="filter-group">
                            <label>Sort By</label>
                            <select 
                                value={filters.sort}
                                onChange={(e) => handleFilterChange('sort', e.target.value)}
                            >
                                <option value="featured">Featured</option>
                                <option value="newest">Newest</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="rating">Customer Rating</option>
                            </select>
                        </div>

                        <div className="filter-actions">
                            <button className="btn btn-outline" onClick={clearFilters}>
                                Clear All
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <section className="products-section">
                <div className="section-container">
                    <div className="products-header">
                        <div className="products-info">
                            <h2>Shoes & Footwear</h2>
                            <p className="products-count">
                                Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} products
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
                        {currentProducts.map((product, index) => (
                            <div key={product.id} className="product-card fade-in">
                                <div className="product-image">
                                    <img src={product.images.main} alt={product.name} />
                                    {getBadgeText(product.tags) && (
                                        <div className={`product-badge ${getBadgeClass(product.tags)}`}>
                                            {getBadgeText(product.tags)}
                                        </div>
                                    )}
                                    <div className="product-overlay">
                                        <button 
                                            className="btn btn-primary"
                                            onClick={() => openQuickView(product)}
                                        >
                                            <Eye size={18} />
                                            Quick View
                                        </button>
                                        <button 
                                            className="btn btn-outline"
                                            onClick={() => handleAddToCart(product, product.sizes[0], product.colors[0])}
                                        >
                                            <ShoppingCart size={18} />
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                                <div className="product-info">
                                    <div className="product-brand">{product.specifications.brand}</div>
                                    <h3 className="product-name">{product.name}</h3>
                                    <p className="product-description">{product.description}</p>
                                    <div className="product-rating">
                                        <span className="stars">{getStars(product.rating)}</span>
                                        <span className="rating-text">({product.reviews} reviews)</span>
                                    </div>
                                    <div className="product-price">
                                        <span className="current-price">{formatCurrency(product.price)}</span>
                                        {product.originalPrice && (
                                            <>
                                                <span className="original-price">{formatCurrency(product.originalPrice)}</span>
                                                <span className="discount-badge">{product.discount}% OFF</span>
                                            </>
                                        )}
                                    </div>
                                    <div className="product-actions">
                                        <button 
                                            className="btn btn-primary"
                                            onClick={() => handleAddToCart(product, product.sizes[0], product.colors[0])}
                                        >
                                            <ShoppingCart size={18} />
                                            Add to Cart
                                        </button>
                                        <button 
                                            className={`btn btn-outline ${wishlist.includes(product.id) ? 'active' : ''}`}
                                            onClick={() => toggleWishlist(product.id)}
                                        >
                                            <Heart size={18} fill={wishlist.includes(product.id) ? 'currentColor' : 'none'} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Load More */}
                    {currentPage < totalPages && (
                        <div className="load-more-section">
                            <button className="btn btn-outline load-more-btn" onClick={loadMore}>
                                Load More Products
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Quick View Modal */}
            {quickViewProduct && (
                <div className="modal-overlay active" onClick={closeQuickView}>
                    <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeQuickView}>
                            <X size={24} />
                        </button>
                        <div className="modal-content">
                            <div className="modal-image">
                                <img src={quickViewProduct.images.main} alt={quickViewProduct.name} />
                                <div className="modal-badges">
                                    {getBadgeText(quickViewProduct.tags) && (
                                        <div className={`product-badge ${getBadgeClass(quickViewProduct.tags)}`}>
                                            {getBadgeText(quickViewProduct.tags)}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="modal-details">
                                <div className="modal-header">
                                    <h3>{quickViewProduct.name}</h3>
                                    <div className="modal-rating">
                                        <span className="stars">{getStars(quickViewProduct.rating)}</span>
                                        <span className="rating-text">({quickViewProduct.reviews} reviews)</span>
                                    </div>
                                </div>
                                <div className="modal-price">
                                    <span className="current-price">{formatCurrency(quickViewProduct.price)}</span>
                                    {quickViewProduct.originalPrice && (
                                        <>
                                            <span className="original-price">{formatCurrency(quickViewProduct.originalPrice)}</span>
                                            <span className="discount-badge">{quickViewProduct.discount}% OFF</span>
                                        </>
                                    )}
                                </div>
                                <p className="modal-description">{quickViewProduct.description}</p>
                                <div className="modal-options">
                                    <div className="size-selector">
                                        <label>Size</label>
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
                                        <label>Color</label>
                                        <div className="color-options">
                                            {quickViewProduct.colors.map(color => (
                                                <button
                                                    key={color}
                                                    className={`color-btn ${selectedColor === color ? 'selected' : ''}`}
                                                    style={{ backgroundColor: color.toLowerCase() }}
                                                    onClick={() => setSelectedColor(color)}
                                                    title={color}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-actions">
                                    <button 
                                        className="btn btn-primary"
                                        onClick={() => {
                                            handleAddToCart(quickViewProduct, selectedSize, selectedColor);
                                            closeQuickView();
                                        }}
                                    >
                                        <ShoppingCart size={18} />
                                        Add to Cart
                                    </button>
                                    <button 
                                        className={`btn btn-outline ${wishlist.includes(quickViewProduct.id) ? 'active' : ''}`}
                                        onClick={() => toggleWishlist(quickViewProduct.id)}
                                    >
                                        <Heart size={18} fill={wishlist.includes(quickViewProduct.id) ? 'currentColor' : 'none'} />
                                        {wishlist.includes(quickViewProduct.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Newsletter Section */}
            <section className="newsletter-section">
                <div className="newsletter-container">
                    <div className="newsletter-content">
                        <h2>Stay in Step with Style</h2>
                        <p>Get exclusive access to new shoe arrivals, special offers, and style inspiration delivered to your inbox.</p>
                        <form className="newsletter-form">
                            <input type="email" placeholder="Enter your email address" />
                            <button type="submit" className="btn btn-outline">Subscribe</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ShoesPage;