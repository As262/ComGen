import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './WomenSection.css';

const WomenSection = () => {
  const { addToCart, isInCart } = useCart();

  const products = [
    {
      id: 1,
      name: 'Elegant Baby Pink Blazer',
      price: 299,
      originalPrice: 399,
      category: 'Formals',
      stock: 8,
      rating: 4.7,
      reviews: 34,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Baby Pink', 'White', 'Black'],
      images: {
        main: 'https://plus.unsplash.com/premium_photo-1675186049366-64a655f8f537?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      image: 'https://plus.unsplash.com/premium_photo-1675186049366-64a655f8f537?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 2,
      name: 'Designer Dress',
      price: 599,
      category: 'Dresses',
      stock: 12,
      rating: 4.9,
      reviews: 56,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Blue', 'Red', 'Black'],
      images: {
        main: 'https://img.clevup.in/352617/women-latest-new-dress-trending-1707799811540_SKU-3920_0.jpg?width=600&format=webp'
      },
      image: 'https://img.clevup.in/352617/women-latest-new-dress-trending-1707799811540_SKU-3920_0.jpg?width=600&format=webp'
    },
    {
      id: 3,
      name: 'Silk Suit',
      price: 149,
      originalPrice: 199,
      category: 'Suit',
      stock: 20,
      rating: 4.4,
      reviews: 28,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Cream', 'Pink', 'Gold'],
      images: {
        main: 'https://img.faballey.com/images/Product/XKS04397Z/d3.jpg'
      },
      image: 'https://img.faballey.com/images/Product/XKS04397Z/d3.jpg'
    }
  ];

  const handleAddToCart = (product) => {
    addToCart({
      ...product,
      selectedSize: product.sizes?.[0] || 'M',
      selectedColor: product.colors?.[0] || 'Default'
    });
    // Cart will automatically open - no need for alert
  };

  return (
    <section id="women" className="section bg-secondary">
      <div className="section-container">
        <div className="section-header">
          <div>
            <h2 className="section-title">Women's Collection</h2>
            <p className="section-subtitle">Curated selections for the discerning individual</p>
          </div>
        </div>

        <div className="products-grid">
          {products.map((product, index) => (
            <div 
              key={product.id} 
              className="product-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <div className="product-overlay">
                  <button 
                    className="btn btn-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                  >
                    <ShoppingCart size={20} />
                    {isInCart(product.id) ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                </div>
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <div className="product-price">
                  <span className="price-current">${product.price}</span>
                  {product.originalPrice && (
                    <span className="price-original">${product.originalPrice}</span>
                  )}
                </div>
                <p className="product-category">{product.category}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-3">
          <a href="#women">
            <button className="btn btn-accent px-8 py-3 text-lg">View All Women's Fashion</button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default WomenSection;
