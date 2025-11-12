import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import './ShoesSection.css';

const ShoesSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    'https://ca-times.brightspotcdn.com/dims4/default/8fe0b21/2147483647/strip/true/crop/6122x4081+0+1/resize/1440x960!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F0b%2F7b%2F5b56302840069c22cf1fa46957be%2F1351750-fi-sneaker-buyer-coolkicks-jlc-16172-009.jpg',
    'https://obtaind.com/cdn/shop/products/LV2_2d8a0733-f0bf-46c0-98f4-4ca47711ebd3.jpg?v=1671137725&width=1946',
    'https://images.unsplash.com/photo-1646747859549-56d6c2ee3e6e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1595909236612-9fd30b476365?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const products = [
    {
      id: 1,
      name: 'Premium Athletic Sneaker',
      price: 189,
      originalPrice: 249,
      rating: 4.8,
      reviews: 127,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=320&fit=crop'
    },
    {
      id: 2,
      name: 'Classic Leather Loafer',
      price: 299,
      rating: 4.9,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 3,
      name: 'Designer Shoe-Top',
      price: 349,
      originalPrice: 399,
      rating: 4.7,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&h=320&fit=crop'
    }
  ];

  return (
    <section id="shoes" className="shoes-section">
      <div className="section-container">
        <div className="shoes-hero">
          <div className="hero-tagline">
            <h1 className="section-title">Step into Style</h1>
          </div>
          <p style={{ fontSize: '1.25rem', color: 'var(--muted-foreground)', maxWidth: '32rem', margin: '0 auto' }}>
            From athletic performance to sophisticated elegance, discover footwear that elevates every step
          </p>
          <br />
          <div className="shoes-slideshow-wrapper">
            <div className="shoes-slideshow">
              {slides.map((slide, index) => (
                <img
                  key={index}
                  src={slide}
                  className="slide-img"
                  style={{
                    opacity: currentSlide === index ? 1 : 0,
                    zIndex: currentSlide === index ? 2 : 1
                  }}
                  alt={`Sneaker Slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="products-grid">
          {products.map((product, index) => (
            <div 
              key={product.id} 
              className="product-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="product-image shoes-product-image">
                <img src={product.image} alt={product.name} />
              </div>
              
              <div className="product-info">
                <div className="product-brand">Footwear</div>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">Premium quality with superior comfort</p>
                <div className="product-rating">
                  <div className="stars">{'★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating))}</div>
                  <span className="rating-text">({product.rating}) {product.reviews} reviews</span>
                </div>
                <div className="product-price">
                  <span className="current-price">${product.price}</span>
                  {product.originalPrice && (
                    <>
                      <span className="original-price">${product.originalPrice}</span>
                      <span className="discount-badge">{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF</span>
                    </>
                  )}
                </div>
                <div className="product-actions">
                  <button className="btn btn-accent">
                    <ShoppingCart size={20} />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-3">
          <a href="shoes">
          <button className="btn btn-accent px-8 py-3 text-lg">View All Footwear</button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ShoesSection;
