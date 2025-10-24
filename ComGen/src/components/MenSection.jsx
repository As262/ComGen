import React from 'react';
import { ShoppingCart, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import './MenSection.css';

const MenSection = () => {
  const products = [
    {
      id: 1,
      name: 'Premium Denim Shirt',
      price: 129,
      originalPrice: 179,
      category: 'Shirts',
      image: 'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?q=80&w=669&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 2,
      name: 'Designer Coat',
      price: 399,
      category: 'Outerwear',
      image: 'https://images.unsplash.com/photo-1715090364409-161e8dd5ab8e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 3,
      name: 'Luxury Polo',
      price: 89,
      originalPrice: 119,
      category: 'Polo Shirts',
      image: 'https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-1352639_alternate10?$rl_4x5_pdp$'
    }
  ];

  return (
    <section id="men" className="section">
      <div className="section-container">
        <div className="section-header">
          <div>
            <h2 className="section-title">Men's Collection</h2>
            <p className="section-subtitle">Curated selections for the discerning individual</p>
          </div>
          <div className="carousel-nav">
            <button className="carousel-btn">
              <ChevronLeft size={20} />
            </button>
            <button className="carousel-btn">
              <ChevronRight size={20} />
            </button>
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
                  <button className="btn btn-primary">
                    <ShoppingCart size={20} />
                    Quick Shop
                  </button>
                  <button className="btn btn-outline" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}>
                    <Heart size={20} />
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
