import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = ({ shopLinks, email }) => {
    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        const emailInput = e.target.querySelector('input[type="email"]').value;
        if (emailInput) {
            alert('Thank you for subscribing to ComGen newsletter!');
            e.target.reset();
        }
    };

    return (
        <footer className="footer">
            {/* Newsletter Section */}
            <div className="newsletter-section">
                <div className="newsletter-content">
                    <h2 className="newsletter-title">Stay in Style</h2>
                    <p className="newsletter-subtitle">Subscribe to get exclusive updates on fashion trends and offers</p>
                    <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                        <input type="email" className="newsletter-input" placeholder="Enter your email" required />
                        <button type="submit" className="btn btn-accent">Subscribe</button>
                    </form>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="footer-main">
                <div className="footer-container">
                    <div className="footer-grid">
                        {/* Brand Section */}
                        <div className="footer-brand">
                            <h2>ComGen</h2>
                            <p>Your premier destination for sophisticated fashion. Where style meets substance, and quality is never compromised.</p>
                            
                            {/* Contact Info */}
                            <ul className="contact-info">
                                <li>
                                    <Phone className="contact-icon" size={20} />
                                    <span>1-800-COM-GEN</span>
                                </li>
                                <li>
                                    <Mail className="contact-icon" size={20} />
                                    <span>{email || 'hello@ComGen.com'}</span>
                                </li>
                                <li>
                                    <MapPin className="contact-icon" size={20} />
                                    <span>123 Fashion Ave, Style City, SC 12345</span>
                                </li>
                            </ul>
                        </div>

                        {/* Shop Links */}
                        <div className="footer-section">
                            <h4>{shopLinks?.title || 'Shop'}</h4>
                            <ul className="footer-links">
                                {shopLinks?.links?.map((link, index) => (
                                    <li key={index}><a href={link.href}>{link.text}</a></li>
                                )) || (
                                    <>
                                        <li><a href="#shirts">Clothing</a></li>
                                        <li><a href="#accessories">Accessories</a></li>
                                        <li><a href="#shoes">Shoes</a></li>
                                        <li><a href="#appliances">Appliances</a></li>
                                    </>
                                )}
                            </ul>
                        </div>

                        {/* Customer Care */}
                        <div className="footer-section">
                            <h4>Customer Care</h4>
                            <ul className="footer-links">
                                <li><Link to="/contact">Contact Us</Link></li>
                                <li><a href="#size-guide">Size Guide</a></li>
                                <li><a href="#shipping">Shipping Info</a></li>
                                <li><a href="#returns">Returns & Exchanges</a></li>
                                <li><a href="#track">Track Order</a></li>
                                <li><a href="#faq">FAQ</a></li>
                            </ul>
                        </div>

                        {/* Company */}
                        <div className="footer-section">
                            <h4>Company</h4>
                            <ul className="footer-links">
                                <li><a href="#about">About ComGen</a></li>
                                <li><a href="#careers">Careers</a></li>
                                <li><a href="#sustainability">Sustainability</a></li>
                                <li><a href="#press">Press & Media</a></li>
                                <li><a href="#privacy">Privacy Policy</a></li>
                                <li><a href="#terms">Terms of Service</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Social Media & Trust Badges */}
                    <div className="footer-bottom">
                        <div className="footer-bottom-content">
                            {/* Social Links */}
                            <div className="social-links">
                                <span style={{ color: 'rgb(255, 255, 255)', fontWeight: 500, marginRight: '1rem' }}>Follow Us:</span>
                                <a href="#" className="social-link" aria-label="Facebook">
                                    <Facebook size={20} />
                                </a>
                                <a href="#" className="social-link" aria-label="Instagram">
                                    <Instagram size={20} />
                                </a>
                                <a href="#" className="social-link" aria-label="Twitter">
                                    <Twitter size={20} />
                                </a>
                                <a href="#" className="social-link" aria-label="YouTube">
                                    <Youtube size={20} />
                                </a>
                            </div>

                            {/* Trust Badges */}
                            <div className="trust-badges">
                                <span>🔒 Secure Checkout</span>
                                <span>📦 Free Shipping</span>
                                <span>↩️ Easy Returns</span>
                            </div>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="footer-copyright">
                        <p>&copy; 2025 ComGen. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
