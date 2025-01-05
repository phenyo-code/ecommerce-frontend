import React from 'react';
import './hero.css';  // Optional: for styling

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Shop the Latest Fashion</h1>
        <p className="hero-description">
          Explore our collection of trendy clothes for men and women.
        </p>
        <a href="/products" className="hero-btn">Shop Now</a>
      </div>
      <div className="hero-image">
        <img src="https://via.placeholder.com/1200x600" alt="Fashion Collection" />
      </div>
    </section>
  );
};

export default Hero;
