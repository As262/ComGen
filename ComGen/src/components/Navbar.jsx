import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ cartCount, onCartToggle, onSearch }) => {
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const toggleMobileMenu = () => {
        setMobileMenuActive(!mobileMenuActive);
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (onSearch) {
            onSearch(value);
        }
    };

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

                <div className="search-container">
                    <Search className="search-icon" size={16} />
                    <input 
                        type="text" 
                        placeholder="Search products..." 
                        className="search-input"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>

                <div className="nav-actions">
                    <Link to="/login" className="btn btn-ghost">
                        <User size={20} />
                        Login
                    </Link>

                    <button className="btn btn-ghost cart-btn" style={{ position: 'relative' }} onClick={onCartToggle}>
                        <ShoppingBag size={20} />
                        <span className="cart-count">{cartCount}</span>
                    </button>
                </div>

                <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
                    {mobileMenuActive ? <X size={24} /> : <Menu size={24} />}
                </button>

                <div className={`mobile-menu ${mobileMenuActive ? 'active' : ''}`}>
                    <div className="search-container">
                        <Search className="search-icon" size={16} />
                        <input 
                            type="text" 
                            placeholder="Search products..." 
                            className="search-input"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                    
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
                        <button className="btn btn-ghost" onClick={onCartToggle}>
                            <ShoppingBag size={20} />
                            Cart ({cartCount})
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
