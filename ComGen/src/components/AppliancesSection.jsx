import React from 'react';
import './AppliancesSection.css';

const AppliancesSection = () => {
  const appliances = [
    {
      id: 1,
      title: 'Coffee Makers',
      description: 'Premium brewing systems for the perfect cup',
      features: ['Automated brewing', 'Temperature control', 'Premium materials'],
      image: 'https://images.unsplash.com/photo-1642466075403-cc922174becf?q=80&w=738&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      imageSize: '5rem'
    },
    {
      id: 2,
      title: 'Blenders & Mixers',
      description: 'High-performance tools for culinary creativity',
      features: ['Variable speeds', 'Durable blades', 'Easy cleaning'],
      image: 'https://contentgrid.homedepot-static.com/hdus/en_US/DTCCOMNEW/Articles/best-blenders-for-your-kitchen-2022-section-1.jpg',
      imageSize: '7rem'
    },
    {
      id: 3,
      title: 'Smart Microwaves',
      description: 'Intelligent cooking with modern convenience',
      features: ['Smart controls', 'Even heating', 'Multiple presets'],
      image: 'https://cdn.thewirecutter.com/wp-content/media/2025/07/NN-CV87KS_handout_from_Panasonic-1-scaled.jpg',
      imageSize: '5rem'
    },
    {
      id: 4,
      title: 'Refrigeration',
      description: 'Advanced cooling solutions for fresh living',
      features: ['Energy efficient', 'Smart technology', 'Spacious design'],
      image: 'https://www.electrolux.in/contentassets/3ddf61ff44ac428ca03bee505168c496/pseerf220ma00001-750x730.jpg?width=464',
      imageSize: '5rem'
    },
    {
      id: 5,
      title: 'Kitchen Tools',
      description: 'Professional-grade utensils and accessories',
      features: ['Ergonomic design', 'Durable materials', 'Chef approved'],
      image: 'https://fnsharp.com/cdn/shop/articles/greek-cooking-tools-featured_850x.jpg?v=1617738818',
      imageSize: '5rem'
    },
    {
      id: 6,
      title: 'Cooking Equipment',
      description: 'Complete solutions for gourmet cooking',
      features: ['Precision control', 'Even heating', 'Professional quality'],
      image: 'https://png.pngtree.com/png-clipart/20250121/original/pngtree-a-functional-group-of-kitchen-utensils-ready-for-meal-preparation-and-png-image_20034684.png',
      imageSize: '5rem'
    }
  ];

  return (
    <section id="appliances" className="section">
      <div className="section-container">
        {/* Hero Banner */}
        <div className="appliances-banner">
          <img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=400&fit=crop" alt="Premium Kitchen Appliances" />
          <div className="appliances-overlay">
            <div className="appliances-content">
              <h2>Premium Appliances</h2>
              <p>Transform your kitchen with intelligent design and cutting-edge technology</p>
              <a href="appliances">
              <button className="btn btn-accent px-8 py-3 text-lg">Explore Collection</button>
              </a>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="appliances-grid">
          {appliances.map((appliance) => (
            <div key={appliance.id} className="appliance-card">
              <div className="appliance-img">
                <img 
                  src={appliance.image} 
                  alt={appliance.title}
                  style={{ 
                    width: appliance.imageSize, 
                    height: appliance.imageSize, 
                    objectFit: 'cover', 
                    borderRadius: appliance.imageSize === '7rem' ? '1.5rem' : '1rem' 
                  }}
                />
              </div>
              <h3 className="appliance-title">{appliance.title}</h3>
              <p className="appliance-description">{appliance.description}</p>
              <ul className="appliance-features">
                {appliance.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <button className="btn btn-outline" style={{ width: '100%' }}>View Products</button>
            </div>
          ))}
        </div>

        <br>
        </br>
        <br>
        </br>
      </div>
    </section>
  );
};

export default AppliancesSection;
