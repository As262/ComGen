import React from 'react';
import { ShoppingCart, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import './WomenSection.css';

const WomenSection = () => {
  const products = [
    {
      id: 1,
      name: 'Elegant Baby Pink Blazer',
      price: 299,
      originalPrice: 399,
      category: 'Formals',
      image: 'https://plus.unsplash.com/premium_photo-1675186049366-64a655f8f537?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 2,
      name: 'Designer Dress',
      price: 599,
      category: 'Dresses',
      image: 'https://img.clevup.in/352617/women-latest-new-dress-trending-1707799811540_SKU-3920_0.jpg?width=600&format=webp'
    },
    {
      id: 3,
      name: 'Silk Suit',
      price: 149,
      originalPrice: 199,
      category: 'Suit',
      image: 'https://img.faballey.com/images/Product/XKS04397Z/d3.jpg'
    }
  ];

  return (
    <section id="women" className="section bg-secondary">
      <div className="section-container">
        <div className="section-header">
          <div>
            <h2 className="section-title">Women's Collection</h2>
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
          <a href="#women">
            <button className="btn btn-accent px-8 py-3 text-lg">View All Women's Fashion</button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default WomenSection;
