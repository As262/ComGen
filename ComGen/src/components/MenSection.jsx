import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './MenSection.css';

const MenSection = () => {
  const { addToCart, isInCart } = useCart();

  const products = [
    {
      id: 1,
      name: 'Premium Denim Shirt',
      price: 129,
      originalPrice: 179,
      category: 'Shirts',
      stock: 10,
      rating: 4.5,
      reviews: 45,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Blue', 'Black', 'White'],
      images: {
        main: 'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?q=80&w=669&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      image: 'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?q=80&w=669&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 2,
      name: 'Designer Coat',
      price: 399,
      category: 'Outerwear',
      stock: 5,
      rating: 4.8,
      reviews: 23,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Black', 'Grey', 'Navy'],
      images: {
        main: 'https://images.unsplash.com/photo-1715090364409-161e8dd5ab8e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      image: 'https://images.unsplash.com/photo-1715090364409-161e8dd5ab8e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 3,
      name: 'Luxury Polo',
      price: 89,
      originalPrice: 119,
      category: 'Polo Shirts',
      stock: 15,
      rating: 4.6,
      reviews: 67,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Navy', 'White', 'Grey'],
      images: {
        main: 'https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-1352639_alternate10?$rl_4x5_pdp$'
      },
      image: 'https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-1352639_alternate10?$rl_4x5_pdp$'
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
    <section id="men" className="section">
      <div className="section-container">
        <div className="section-header">
          <div>
            <h2 className="section-title">Men's Collection</h2>
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
          <a href="#men">
            <button className="btn btn-accent px-8 py-3 text-lg">View All Men's Fashion</button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default MenSection;
