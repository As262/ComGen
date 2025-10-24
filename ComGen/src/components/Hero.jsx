import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-grid">
          {/* Men's Section */}
          <div className="hero-panel">
            <img 
              src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Men's Premium Fashion Collection" 
            />
            <div className="hero-overlay"></div>
            <div className="hero-content">
              <h2>Men's Collection</h2>
              <p>Discover sophisticated styles and timeless elegance</p>
              <a href="#men">
                <button className="btn btn-accent">Shop Men's</button>
              </a>
            </div>
          </div>

          {/* Women's Section */}
          <div className="hero-panel">
            <img 
              src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Women's Premium Fashion Collection" 
            />
            <div className="hero-overlay"></div>
            <div className="hero-content">
              <h2>Women's Collection</h2>
              <p>Embrace luxury and contemporary fashion</p>
              <a href="#women">
                <button className="btn btn-accent">Shop Women's</button>
              </a>
            </div>
          </div>
        </div>

        {/* Central Tagline */}
        <div className="hero-tagline">
          <h1>Style Redefined</h1>
          <p>Where premium fashion meets modern convenience. Discover curated collections and exclusive appliances for the sophisticated lifestyle.</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
