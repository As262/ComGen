import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/helpers';
import './CartPage.css';

const CartPage = () => {
    const { 
        cartItems, 
        removeFromCart, 
        updateQuantity, 
        cartTotal, 
        clearCart 
    } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="cart-page">
                <div className="section-container">
                    <div className="empty-cart-container">
                        <ShoppingBag size={80} className="empty-cart-icon" />
                        <h2>Your cart is empty</h2>
                        <p>Add some products to get started!</p>
                        <Link to="/men" className="btn btn-primary">
                            Continue Shopping
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="section-container">
                <div className="cart-header">
                    <h1>Shopping Cart</h1>
                    <p className="cart-count">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}</p>
                </div>

                <div className="cart-layout">
                    <div className="cart-items-section">
                        <div className="cart-items-header">
                            <span className="header-product">Product</span>
                            <span className="header-price">Price</span>
                            <span className="header-quantity">Quantity</span>
                            <span className="header-total">Total</span>
                            <span className="header-actions"></span>
                        </div>

                        <div className="cart-items-list">
                            {cartItems.map((item) => (
                                <div key={item.id} className="cart-item-row">
                                    <div className="cart-item-product">
                                        <div className="cart-item-image">
                                            <img src={item.image} alt={item.name} />
                                        </div>
                                        <div className="cart-item-info">
                                            <h3 className="cart-item-name">{item.name}</h3>
                                            <p className="cart-item-details">
                                                Size: {item.selectedSize || 'M'}, Color: {item.selectedColor || 'Default'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="cart-item-price">
                                        {formatCurrency(item.price)}
                                    </div>

                                    <div className="cart-item-quantity">
                                        <button 
                                            className="quantity-btn"
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus size={18} strokeWidth={2.5} />
                                        </button>
                                        <span className="quantity-display">{item.quantity}</span>
                                        <button 
                                            className="quantity-btn"
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        >
                                            <Plus size={18} strokeWidth={2.5} />
                                        </button>
                                    </div>

                                    <div className="cart-item-total">
                                        {formatCurrency(item.price * item.quantity)}
                                    </div>

                                    <div className="cart-item-actions">
                                        <button 
                                            className="remove-btn"
                                            onClick={() => removeFromCart(item.id)}
                                            aria-label="Remove item"
                                        >
                                            <Trash2 size={20} strokeWidth={2} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="cart-actions">
                            <Link to="/men" className="btn btn-outline">
                                Continue Shopping
                            </Link>
                            <button 
                                className="btn btn-outline btn-danger"
                                onClick={clearCart}
                            >
                                Clear Cart
                            </button>
                        </div>
                    </div>

                    <div className="cart-summary-section">
                        <div className="cart-summary-card">
                            <h3>Order Summary</h3>
                            
                            <div className="summary-line">
                                <span>Subtotal</span>
                                <span>{formatCurrency(cartTotal)}</span>
                            </div>
                            
                            <div className="summary-line">
                                <span>Shipping</span>
                                <span className="free-shipping">Free</span>
                            </div>
                            
                            <div className="summary-line">
                                <span>Tax</span>
                                <span>Calculated at checkout</span>
                            </div>
                            
                            <div className="summary-divider"></div>
                            
                            <div className="summary-total">
                                <span>Total</span>
                                <span className="total-amount">{formatCurrency(cartTotal)}</span>
                            </div>

                            <button className="btn btn-primary btn-checkout">
                                Proceed to Checkout
                                <ArrowRight size={20} />
                            </button>

                            <div className="checkout-benefits">
                                <div className="benefit-item">
                                    <svg className="benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M9 12l2 2 4-4" />
                                        <circle cx="12" cy="12" r="10" />
                                    </svg>
                                    <span>Free shipping on all orders</span>
                                </div>
                                <div className="benefit-item">
                                    <svg className="benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M9 12l2 2 4-4" />
                                        <circle cx="12" cy="12" r="10" />
                                    </svg>
                                    <span>30-day return policy</span>
                                </div>
                                <div className="benefit-item">
                                    <svg className="benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M9 12l2 2 4-4" />
                                        <circle cx="12" cy="12" r="10" />
                                    </svg>
                                    <span>Secure checkout</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
