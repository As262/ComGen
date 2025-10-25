import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/helpers';
import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import './CartSidebar.css';

const CartSidebar = () => {
  const { 
    cartItems, 
    cartTotal, 
    cartItemCount,
    isCartOpen, 
    closeCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="cart-backdrop" onClick={closeCart} />
      
      {/* Sidebar */}
      <div className="cart-sidebar">
        {/* Header */}
        <div className="cart-header">
          <h2>
            <ShoppingBag size={24} />
            Shopping Cart ({cartItemCount})
          </h2>
          <button className="cart-close" onClick={closeCart} aria-label="Close cart">
            <X size={24} />
          </button>
        </div>

        {/* Items */}
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <ShoppingBag size={64} />
              <h3>Your cart is empty</h3>
              <p>Add some products to get started!</p>
              <button className="btn btn-primary" onClick={closeCart}>
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.images?.main || item.image} alt={item.name} />
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p className="cart-item-category">{item.category}</p>
                  <p className="cart-item-price">
                    {formatCurrency(item.price)}
                  </p>
                  <div className="cart-item-quantity">
                    <button 
                      onClick={() => decrementQuantity(item.id)}
                      aria-label="Decrease quantity"
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      onClick={() => incrementQuantity(item.id)}
                      aria-label="Increase quantity"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
                <button 
                  className="cart-item-remove"
                  onClick={() => removeFromCart(item.id)}
                  aria-label="Remove item"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-subtotal">
              <span>Subtotal:</span>
              <span className="subtotal-amount">{formatCurrency(cartTotal)}</span>
            </div>
            <p className="cart-tax-note">Taxes and shipping calculated at checkout</p>
            <button className="btn btn-primary btn-large" style={{ width: '100%' }}>
              Proceed to Checkout
            </button>
            <button 
              className="btn btn-outline btn-large" 
              style={{ width: '100%', marginTop: '0.5rem' }}
              onClick={closeCart}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
